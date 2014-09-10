//LWCA refined
//2014-09-08 mruttley
//Refined version of LWCA algorithm/process

//Three stages:
// - Pre-processing
// - Classification
// - Post-processing

//How to use? Simply:
// > var lwca = new LWCAClassifier()
// > lwca.classify("http://www.bbc.com/some_very_interesting_article", "Apple reveals shiny new gadget")
// >>> ['computers', 0.75]

function LWCAClassifier(){
	// Main handler class
	
	//Initialize various processors
	console.log("Initializing...")
	let cdb = new ComponentDatabase() //helps match title components and query variables
	let ce = new ClassificationEngine()
	
	//Handle requests
	this.classify = function(url, title){
		
		//pre process
			console.log("Pre processing")
			//shortcuts
			let sd = spotDefinites(url, title)
			if (sd) { return sd }
		
			//cleaning
			title = removePersistentTitleComponents(url, title, cdb.persistentTitleComponents)
		
		//classify
			console.log("Classifying")
			//cosine similarity
			let scores = ce.classify(url, title)
			
			if (scores.length == 0) {
				return false
			}
		
		//post process
			console.log("Post processing")
			
			let domain_scores = augmentDomainMatchers(url, title, scores)
			if (domain_scores === scores) {
				return domain_scores.sort(sortDescendingBySecondElement)[0]
			}
			
			//if that didn't change anything, last resort is using queries and repeats
			scores = augmentQueries(url, scores, cdb.queryVariables)
			scores = augmentRepeatWords(scores)
		
		//finish up
			console.log("Finishing up")
			return scores.sort(sortDescendingBySecondElement)[0]
	}
}

// Pre-processors

function spotDefinites(url, title){
	//function to spot a definite classification
	//e.g. "real estate" is definitely real estate
	
	let definites = {
		"real estate": "Real Estate", //TODO: moarr
	}
	
	for (let definiteMatch of definites) {
		if (title.indexOf(definiteMatch) != -1) {
			return definites[definiteMatch]
		}
	}
	
	return false //false if nothing found
}

function ComponentDatabase() {
	//creates a database of known query variables and persistent title components
	
	//initialization
	this.queryVariables = {}
	this.persistentTitleComponents = {}
	let history = getHistory()
	
	//try and do the two together
	//arrange visits by domain
	let domain_titles = {}

	history_total = 0
	for (let visit of history){
		
		url = visit[0]
		url = parseUri(url)
		let domain = url.host
		
		//scan components
		for (let var_name in url.queryKey) {
			if (spaceFinder.test(url.queryKey[var_name])) {
				//Note: the following spaghetti is why you use a decent language like python
				//with sets/defaultdicts
				if (this.queryVariables.hasOwnProperty(domain) == false) {
					this.queryVariables[domain] = {}
				}
				if (this.queryVariables[domain].hasOwnProperty(var_name) == false) {
					this.queryVariables[domain][var_name] = 0
				}
				this.queryVariables[domain][var_name] += 1
			}
		}
		
		//sort title
		if (domain_titles.hasOwnProperty(domain)==false) {
			domain_titles[domain] = []
		}
		
		if (visit[1] != null) {
			domain_titles[domain].push(visit[1])
		}
		history_total += 1
	}
	console.log("Total history items loaded: " + history_total)
	
	console.log("Finding common suffixes in " + Object.keys(domain_titles).length + " domains ")
	//what are the most common suffixes?
	for (let domain in domain_titles){
		let suffixes = {}
		let titles = domain_titles[domain]
		for (let x=0;x<titles.length;x++){
			for (let y=x+1;y<titles.length;y++){
				if (titles[x]!=titles[y]) {
					let lcns = longestCommonNgramSuffix(titles[x], titles[y])
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
		let to_add = []
		for (let suffix in suffixes) {
			let count = suffixes[suffix]
			if (count > 1) {
				to_add.push(suffix)
			}
		}
		//to_add must be sorted in descending order of length
		//as largest matches should be eliminated first
		to_add = to_add.sort(sortDescendingByElementLength)
		this.persistentTitleComponents[domain] = to_add
	}
	console.log('Done!')
}

function removePersistentTitleComponents(url, title, cdb){
	//Removes common title endings such as " - Google Search" using the component database
	
	domain = getDomain(url)
	if (cdb.hasOwnProperty(domain)) {
		for (let suffix in cdb[domain]) {
			if (title.endsWith(suffix)) {
				//chop suffix from end
				title = title.slice(0, visit[1].length-suffix-length)
				break
			}
		}
	}
	
	return title
}

// Classification

function cosineSimilarity(text, category_keywords){
	//calculates the cosine similarity between the two arguments
	//expects text to be an array of strings
	//expects category_keywords to be an object of string: int
	//returns a float
	
	//create vector
	let vector = {} //object of word: [text count, category count]
	for (let word of text) {
		if (category_keywords.hasOwnProperty(word)) {
			if (vector.hasOwnProperty(word)) {
				vector[word][0] += 1
			}else{
				vector[word] = [1, category_keywords[word]]
			}
		}
	}
	
	//calculate dot product
	
	let dot_product = 0
	let mag1 = 0
	let mag2 = 0
	
	for(let word of vector){
		dot_product += (vector[word][0] * vector[word][1])
		mag1 += Math.pow(vector[word][0], 2)
		mag2 += Math.pow(vector[word][1], 2)
	}
	
	let denominator = Math.sqrt(mag1) * Math.sqrt(mag2)
	
	if (denominator != 0) {
		return dot_product / denom
	}
	
	return 0
}

function ClassificationEngine(){
	//a class that can classify a visit 
	
	//initializer
	
	//possible pruning
	// - must have (25?) keys
	// - must contain a unique key
	
	//build inverse index
	this.id_to_article = {}
	this.inverse_index = {}
	
	let categories = Object.keys(payload)
	for(index=0;index<categories.length;index++){
		category = categories[i]
		keywords = payload[category]
		
		this.id_to_article[index] = category
		for(let k in keywords){
			if (this.inverse_index.hasOwnProperty(k)==false) {
				this.inverse_index[k] = [index]
			}else{
				this.inverse_index[k].push(index)
			}
		}
	}

	
	//classifier
	this.classify = function(url, title){
		
		title = title.toLowerCase().match(wordFinder)
		
		let matches = []
		
		//can't do the actual intersection since cosim doesn't need exact matches.
		//just needs articles with at least 1 of the matches
		
		articles = {} // a set of articles worth looking at, auto-deduped
		
		for (let keyword in title) { //set intersection
			for (let article of this.inverse_index[keyword]) {
				if (articles.hasOwnProperty(article)==false) {
					articles[article] = true 
				}
			}
		}
		
		let scores = [] //classify against each category
		for (let article_number in articles) {
			let category = this.id_to_article[article_number]
			let words = payload[category]
			let similarity = cosineSimilarity(title, words)
			if (similarity != 0) {
				scores.push([category, similarity])
			}
		}
		
		scores = scores.sort(sortDescendingBySecondElement)
		return scores.slice(0, 10)
	}
	
}

// Post processing

function augmentRepeatWords(results) {
	//Adds 1 to the score of any result containing a repeated word
	
	wordCounts = {}
	for (i=0;i<results.length;i++) {
		tokens = results[i][0].toLowerCase().match(wordFinder)
		for (let token of tokens) {
			if (wordCounts.hasOwnProperty(token)==false) {
				wordCounts[token] = 0
			}
			wordCounts[token] += 1
		}
	}
	
	//now go through again and find the repeats
	for (i=0;i<results.length;i++) {
		tokens = results[i][0].toLowerCase().match(wordFinder)
		for (let token of tokens) {
			if (wordCounts[token] > 1) { //must be a repeat
				results[i][1] += 1
			}
		}
	}
	
	return results
}

function augmentDomainMatchers(url, title, results) {
	// grab domain classifications and multiply those that have
	// matching word lemmas/stems

	//typically anything called society or reference is a bad classification
	ignore = {
		'society': true,
		'reference': true, 
		'uncategorized': true,
		'__news_counter': true,
		'marketing': true,
	}
	
	class_maps = {
		'history': ['histor'],
		'sports': ['sport', 'gam'],
		'computers': ['comput', 'tech', 'algorithm', 'model'],
		'science': ['theor', 'hypothes', 'species', 'scien'],
		'shopping': ['store', 'shop', 'brand', 'outlet', 'inc', 'ltd', 'compan'],
		'news': ['the ', 'daily', 'morning', 'times', 'new'],
		'health': ['diet', 'health'],
		'hobby': ['interest', 'coin', 'stamp', 'hobb'],
		'cuisine': ['cuisine', 'culinary', 'food', 'sauce', 'method', 'cook', 'technique', 'style'],
		'travel': ['city', 'travel', 'rout', 'hotel', 'town', 'countr', 'state', 'region'],
		'education': ['school', 'education', 'class', 'university', 'college', 'campus'],
		'family': ['parent', 'famil', 'child', 'matern', 'father', 'mother', 'pat', 'mat', 'sister', 'brother', 'pregnan'],
		'finance': ['bank', 'financ', 'institut', 'loan', 'rate', 'tax'],
		'business': ['compan', 'inc', 'ltd', 'business'],
		'video-games': ['gam', 'video', 'computer', 'system', 'console'],
		'fashion': ['brand', 'design', 'fashion'],
		'tv': ['telev', 'tv', 'show', 'series', 'episode', 'season', 'character', 'act', 'theme'],
		'movies': ['film', 'movie', 'direct', 'act', 'prod', 'cinem', 'studio', 'set'],
		'technology': ['tech', 'digit', 'elec'],
		'food': ['recipe', 'restaurant', 'bar', 'cuisine', 'food', 'sauce', 'cook', 'technique', 'style'],
		'women': ['wom', 'fem'],
		'government': ['gov', 'admin', 'dept', 'nationa', 'polic'],
		'discounts': ['coupon', 'discount'],
		'consumer-electronics': ['model', 'brand', 'series', 'inc'],
		'arts': ['artist', 'paint', 'direct'],
		'politics': ['gov', 'polit', 'polic', 'law', 'charter', 'treat', 'part', 'coalition', 'bill', 'usc', 'parl', 'tax', 'camp'],
		'music': ['music', 'band', 'album', 'single', 'side', 'release', 'song', 'sing', 'lyric', 'genre', 'style'],
		'banking': ['bank', 'financ', 'institut', 'account', 'credit', 'debit'],
		'drinks': ['drink', 'ingredient'],
		'religion': ['religi', 'church', 'temple', 'congregat'],
		'cars': ['car', 'model', 'engin', 'moto', 'auto'],
		'outdoors': ['range', 'rout'],
		'reading': ['read', 'book', 'novel', 'ser', 'auth'],
		'games': ['game', 'lotter'],
		'home': ['home', 'style'],
		'career': ['career', 'job', 'pro'],
		'weather': ['hurr', 'season'],
		'photography': ['style'],
		'entertainment': ['entertain'],
		'blogging': ['blog'],
		'reviews': ['review'],
		'image-sharing': ['imag', 'shar'],
		'relationship': ['relation'],
		'clothes': ['brand', 'cloth', 'design', 'fashion'],
		'shoes': ['shoe', 'foot'],
		'email': ['mail'],
		'law': ['law', 'bill', 'treat', 'armis', 'cease', 'peace', 'legal', 'camp'],
		'real-estate': ['real', 'estate', 'zone', 'house', 'apart'],
		'radio': ['radio', 'channel', 'station'],
		'men': ['male', 'man', 'masc', 'men'],
		'pets': ['spec', 'breed', 'type', 'animal', 'pet'],
		'maps': ['map', 'chart', 'cart', 'projec'],
		'writing': ['author', 'book', 'series', 'issue', 'style', 'writ'],
		'motorcycles': ['bike', 'motor'],
		'dance': ['danc'],
	}
	
	url = parseUri(url)
	title = title.toLowerCase()
	//have to basically iteratively check if bits of the url are in domainRules
	//e.g. http://something.search.domain.com should first search for everything,
	//then search.domain.com, then domain.com
	//no point in searching for just .com
	
	domain = url.host.split(".")
	for (let dot_count in domain){
		key = domain.slice(dot_count).join(".")
		if (domainRules.hasOwnProperty(key)) {
			//found an entry in domainRules
			
			//For example:
			//   "engadget.com" : {
			//		"topics robots" : "science",
			//		"imac" : "computers",
			//		"__ANY" : [
			//		   "technology",
			//		   "shopping",
			//		   "consumer-electronics"
			//		],
			//		"review" : "reviews",
			//		"tag nintendowiiu" : "video-games"
			//	 },
			
			category_matchers = domainRules[key]
			decision = false
			keys = Object.keys(category_matchers).sort()
			
			//iterate through all keys, __ANY comes last to see if one matches
			for (let k in Object.keys(category_matchers)) {
				if (k != "__ANY") {
					tokens = k.split(" ")
					match_count = 0
					if (title.indexOf(token)!=-1) {
						match_count += 1
					}
					if (match_count == tokens.length) {
						decision = category_matchers[k]
						break
					}
				}
			}
			
			//check if decision was made
			if (decision == false) {
				if (category_matchers.hasOwnProperty("__ANY")) { //if not, look at __ANY
					decision = category_matchers['__ANY']
				}else{
					return results //if there's still nothing, just return the original results from the argument
				}
			}
			
			//now try and rerank results based on components
			if(typeof decision === "string"){ //decision could be 1 or more categories, make it consistent
				decision = [decision]
			}
			
			//now iterate through the decision categories and add 1 to each result
			//category that contains the stems
			
			for(let category of decision){
				if (class_maps.hasOwnProperty(category)) {
					for (i=0;i<results.length;i++) {
						for (let stem of class_maps[category]) {
							if (results[i][0].toLowerCase().indexOf(stem) != -1) {
								results[i][1] += 1
								break
							}
						}
					}
				}
			}
			break
		}
	}
	return results
}

function augmentQueries(url, results, queryDatabase) {
	//Tries to spot any search queries in the url
	//Doubles the score of anything that contains a search query word
	
	queries = [] //a list of strings
	url = parseUri(url) //
	
	if (queryDatabase.hasOwnProperty(url.host)) { //if the domain is in the db
		for (let variable in url.queryKey) { //iterate through url get variables
			if (queryDatabase[url.host].hasOwnProperty(variable)) { //if in the db
				query = unescape(url.queryKey[variable]) //append to list
				query = query.match()
				queries.concat(query.match(wordFinder))
			}
		}
	}
	
	//now find any result that contains a query word
	for(let result in results){
		for (let word of queries) {
			if (results[result][0].indexOf(word) != -1) {
				results[result][1] *= 2 //double the score
			}
		}
	}
	
	return results
}

// Auxiliary functions, matchers, options etc

const {Cc, Ci, Cu, ChromeWorker} = require("chrome");
const {data} = require("sdk/self"); //not quite sure why this is necessary
let scriptLoader = Cc["@mozilla.org/moz/jssubscript-loader;1"].getService(Ci.mozIJSSubScriptLoader);
scriptLoader.loadSubScript(data.url("domainRules.json")); //TODO: test this, also clean up the file
scriptLoader.loadSubScript(data.url("payload.json")); //TODO: test this

function getDomain(url) {
	//returns the (sub)domain of a url
	//subdomains are treated as different entities to top level urls
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

function getHistory(){
	//Generator that yields the most recent history urls one by one
	//Returned in the form [url, title, timestamp]
	
	//create the history service
	let historyService = Cc["@mozilla.org/browser/nav-history-service;1"].getService(Ci.nsINavHistoryService);

	//make a blank query
	let options = historyService.getNewQueryOptions();
	let query = historyService.getNewQuery();
	let result = historyService.executeQuery(query, options);

	//open up the results
	let cont = result.root;
	cont.containerOpen = true;
	
	//yield whatever there is
	for(let i=0; i < cont.childCount; i++){
		let node = cont.getChild(i);
		yield [node.uri, node.title, node.time];
	}
	
	//close the results container
	cont.containerOpen = false;
}

function parseUri (str) {
	// parseUri 1.2.2
	// (c) Steven Levithan <stevenlevithan.com>
	// MIT License
	// http://blog.stevenlevithan.com/archives/parseuri
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;

	while (i--) uri[o.key[i]] = m[i] || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	return uri;
};

parseUri.options = {
	strictMode: false,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};

function longestCommonNgramSuffix(s1, s2){
	//Does what it says on the tin
	s1 = s1.split(" ")
	s2 = s2.split(" ")
	min_len = s1.length < s2.length ? s1.length : s2.length
	
	result = false
	for (let a=1;a<min_len+1;a++){
		if (s1[s1.length-a] != s2[s2.length-a]) {
			result = s1.slice(s1.length-a+1)
			break
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

var wordFinder = RegExp("[a-z]{3,}", "g") //tokenizes english sentences
var spaceFinder = RegExp(/.+(%20|\+|\s).+/g) //finds get variable values that have spaces in them
//bizarrely, if spaceFinder is declared in the way wordFinder is (two args), it returns an error. Oh JS...

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

exports.LWCAClassifier = LWCAClassifier //for the extension main.js to access