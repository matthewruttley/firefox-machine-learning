// LWCA - Latent Wiki Category Allocation
// JavaScript implementation
// mruttley - 2014-08-27
//09-03~4 - modified to classify each URL individually.

const {Cc, Ci, Cu, ChromeWorker} = require("chrome");

function getHistory(){
	//Generator that yields the most recent history urls one by one
	
	//create the history service
	let historyService = Cc["@mozilla.org/browser/nav-history-service;1"].getService(Ci.nsINavHistoryService);

	//make a blank query
	let options = historyService.getNewQueryOptions();
	let query = historyService.getNewQuery();
	let result = historyService.executeQuery(query, options);

	//open up the results
	var cont = result.root;
	cont.containerOpen = true;
	
	//yield whatever there is
	for(let i=0; i < cont.childCount; i++){
		let node = cont.getChild(i);
		yield [node.uri, node.title, node.time];
	}
	
	//close the results container
	cont.containerOpen = false;
}

function getDomain(url) {
	//returns the (sub)domain of a url
	if (url.indexOf("://") != -1) {
		url = url.split("://")[1]
		if (url.indexOf("/") != -1) {
			url = url.split("/")[0]
		}
		if (url.indexOf("?") != -1) {
			url = url.split("?")[0]
		}
	}else{
		return false
	}
	return url
}

function longestCommonNgramSuffix(s1, s2){
	//Does what it says on the tin
	s1 = s1.split(" ")
	s2 = s2.split(" ")
	min_len = s1.length < s2.length ? s1.length : s2.length
	
	result = false
	for (x=1;x<min_len+1;x++){
		if (s1[s1.length-x] != s2[s2.length-x]) {
			result = s1.slice(s1.length-x+1)
		}
	}
	
	if (result==false) {
		return false
	}else if (result==[]) {
		return false
	}else{
		return result.join(" ")
	}
}

String.prototype.endsWith = function(suffix) {
	//http://stackoverflow.com/a/2548133/849354
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

function sortDescendingBySecondElement(first, second) {
	//function to be used in sort(some_function)
	//does what it says on the tin
	first = first[1]
	second = second[1]
	if (first == second) {
		return 0
	}else{
		if (first > second) {
			return false
		}else{
			return true
		}
	}	
}

function sortDescendingByElementLength(first, second) {
	//sorting function to sort a list of strings
	return second.length - first.length
}

function removePersistentTitleComponents(visits){
	//Removes common title endings such as " - Google Search"
	//Expects a list of lists:
	//where each visit is a list of [url, title, timstamp]
	//Returns the same, but with better titles
	
	domain_titles = {}
	domain_suffixes = {}
	
	//arrange visits by domain
	for (let visit of visits){
		domain = getDomain(visit[0])
		if (domain_titles.hasOwnProperty(domain)==false) {
			domain_titles[domain] = []
		}
		domain_titles[domain].push(visit[1])
	}
	
	//what are the most common suffixes?
	for (let domain in domain_titles){
		suffixes = {}
		titles = domain_titles[domain]
		for (x=0;x<titles.length;x++){
			for (y=x;y<titles.length;y++){
				if (x!=y) {
					lcns = longestCommonNgramSuffix(titles[x], titles[x+1])
					if (lcns!=false) {
						if (suffixes.hasOwnProperty(lcns) == false) {
							suffixes[lcns] = 0
						}
						suffixes[lcns] += 1
					}
				}
			}
		}
		//eliminate those that only appear once 
		to_add = []
		for (let suffix in suffixes) {
			let count = suffixes[suffix]
			if (count > 1) {
				to_add.push(suffix)
			}
		}
		//to_add must be sorted in descending order of length
		//as largest matches should be eliminated first
		to_add = to_add.sort(sortDescendingByElementLength)
		domain_suffixes[domain] = to_add
	}
	
	//iterate through visits again, and remove title components
	
	for (x=0;x<visits.length;x++) {
		visit = visits[x]
		domain = getDomain(visit[0])
		if (domain_suffixes.hasOwnProperty(domain)) {
			for (let suffix in domain_suffixes[domain]) {
				if (visit[1].endsWith(suffix)) {
					//chop suffix from end
					visits[x][1] = visit[1].slice(0, visit[1].length-suffix-length)
					break
				}
			}
		}
	}
	
	return visits
}

function explain(thing, identifier) {
	//useful for debugging, explains things about an object
	console.log(identifier + " is of type: " +typeof(thing)+ " with length " + Object.keys(thing).length)
}

function Classifier(){
	//Returns an array of arrays [[], [], ...]
	//Each sub-array like: [start_id, end_id, classification]
	
	this.init = function(){
		//console.log("Getting user data..."); let visits = getHistory()
		//console.log("Cleaning page titles of persistent components...")
		//visits = removePersistentTitleComponents(visits)
		
		console.log("Reading in wordlist")
		const fileIO = require("sdk/io/file")
		let dict = fileIO.read("/Users/mruttley/Documents/lwca_debug/data/dictnostops.txt")
		this.wordlist = {} //interpreted as an object as lookups are O(1) rather than O(n)
		for (let word of dict.split("\n")) {
			this.wordlist[word] = 1
		}
		explain(this.wordlist, "wordlist")
		console.log(Object.keys(this.wordlist).slice(0, 10))
		
		this.wordFinder = RegExp("[a-z]{3,}", "g") //to find words in a sentence
		
		console.log("Reading in category payload and creating tfidf_matrix per category")
		let payloadfile = fileIO.read("/Users/mruttley/Documents/lwca_debug/data/iab_wiki_keywords.tsv").split("\n")
		
		//todo: payload file should be precalculated tfidf 
		category_vectors = {}
		df = {}
		for (let line of payloadfile) {
			line = line.split("\t")
			category = line[0]
			tf = {}
			
			for (x=1;x<line.length;x+=2) { //process logs of each count
				tf[line[x]] = 1 + Math.log(parseInt(line[x+1]))
			}
			
			for (let t in tf){  //process document frequencies
				if (df.hasOwnProperty(t)) {
					df[t] += 1
				}else{
					df[t] = 1
				}
			}
			category_vectors[category] = tf //add to main object
		}
		
		let N = category_vectors.length
		this.idf = {} //calculate IDF for each word
		for (let word in df) {
			this.idf[word] = Math.log(N/df[word])
		}
		df = 0 //clear memory
		
		this.category_tfidf = {}
		for (let category in category_vectors) {
			let vector = category_vectors[category]
			for (let word in vector) {
				let tf = vector[word]
				let word_idf = this.idf[word]
				vector[word] = tf * word_idf
			}
			this.category_tfidf[category] = vector
		}
		
		category_vectors = 0 //clear memory
	}
	
	this.classify = function(text){
		let vector = {}
		for(let token of text.toLowerCase().match(this.wordFinder)){ //tokenize
			//console.log("token: " + token)
			if (this.wordlist.hasOwnProperty(token)) { //check that words are valid
				//console.log("in word list: " + token)
				if (this.idf.hasOwnProperty(token)) { //find those that exist in the categories
					//console.log("in idf: " + token)
					if (vector.hasOwnProperty(token)) { //add to assoc array
						vector[token] += 1
					}else{
						vector[token] = 1
					}
				}
			}
		}
		console.log(vector)
		//TF-IDF
		for (let word in vector) {
			let tf = Math.log(vector[word])
			let word_idf = this.idf[word]
			vector[word] = tf * word_idf
		}
		console.log(vector)
		//Now cosine similarity
		let results = []
		
		for (let category in this.category_tfidf) {
			let category_vector = this.category_tfidf[category]
			
			//dot product
			let dot_product = 0
			let mag1 = 0
			let mag2 = 0
			
			for (let word in vector) {
				if (category_vector.hasOwnProperty(word)) {
					let v_w = vector[word]
					let c_w = category_vector[word]
					dot_product += v_w * c_w
					mag1 += Math.pow(v_w, 2)
					mag2 += Math.pow(c_w, 2)
				}
			}
			
			let denom = Math.sqrt(mag1) * Math.sqrt(mag2)
			
			if (denom != 0) {
				let sim = dot_product / denom
				if (sim != 0) {
					results.push([category, sim])
				}
			}
			
		}
		console.log(results)
		results = results.sort(sortDescendingBySecondElement)
		results = results.slice(0, 5)
		return results
	}
	
}

exports.Classifier = Classifier