//LWCA refined
//2014-09-08 mruttley
//Refined version of LWCA algorithm/process

//Three stages:
// - Pre-processing
// - Classification
// - Post-processing

// Pre-processors

function spotDefinites(url, title){
	//function to spot a definite classification
	//e.g. "real estate" is definitely real estate
	
	let definites = {
		"real estate": "Real Estate"
	}
	
	for (let definiteMatch of definites) {
		if (title.indexOf(definiteMatch) != -1) {
			return definites[definiteMatch]
		}
	}
	
	return false //false if nothing found
}

function removePersistentTitleComponents(url, title) {
	//Removes common suffixes such as " - Google Search"
}



// Classification

// Post Processing

function augmentRepeatWords(args) {
	//code
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

function post_processing_rerank(url, results, qdb) {
	//wangs the results through the post-processing functions
	
	results = augmentQueries(url, results, qdb)

	results_domain = augmentDomainMatchers(results)
	if (results == results_domain) { //i.e. no change
		results = augmentRepeatWords(results)
		return results
	}else{
		return results_domain
	}

}

// Auxiliary Functions
const {Cc, Ci, Cu, ChromeWorker} = require("chrome");

const {domainRules} = require("domainRules.json") //TODO: debug accessing this file

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

var wordFinder = RegExp("[a-z]{3,}", "g")