#!/usr/bin/env python

#Generates a payload file
#New, consolidated file

from codecs import open as copen
from collections import defaultdict
from pdb import set_trace
from re import findall, match

def load_category_article_matrix():
	"""returns a category article matrix in the form of a dictionary of sets"""
	
	category_article_matrix = defaultdict(set)
	
	with copen("/Users/mruttley/Downloads/article_categories_en.ttl", encoding='utf8') as input_file:
		for n, line in enumerate(input_file):
			if line.startswith("<"):
				#<http://dbpedia.org/resource/Albedo> <http://purl.org/dc/terms/subject> <http://dbpedia.org/resource/Category:Climate_forcing> .\n
				line = line.split(" ")
				article = line[0]
				category = line[2]
				
				article = article.split("/")[-1][:-1]
				category = category.split(":")[-1][:-1]
				
				category_article_matrix[category].update([article])
				
			if n % 1000000 == 0:
				print "processed {0} of 16.5m".format(n)
	
	print "Found {0} categories total".format(len(category_article_matrix))
	
	return category_article_matrix

def load_topic_signatures():
	"""Returns a list of articles, each with a list of topic signatures"""
	article_keywords = {}	#"Down_to_Earth_%28Justin_Bieber_song%29": ['one', 'girl']
	with copen("topic_signatures_en.tsv", encoding='utf8') as raw:
		for n, line in enumerate(raw):
			
			line = line[:-1].split('\t') #remove the newline character and separate title from rest
			
			article_title = line[0]
			
			keywords = line[1].split('"')[-1]
			
			keywords = findall("[a-z]{3,}", keywords.lower())
			
			title_keywords = findall("[a-z]{3,}", article_title.lower())
			for k in title_keywords:
				if k not in keywords:
					keywords.append(k)
			
			if len(keywords) > 0:
				article_keywords[article_title] = keywords
			
			if n % 100000 == 0:
				print "Loaded {0}% of the topic signatures".format(round((n/3500000.0)*100), 2)
		
	print "Total: {0} articles".format(len(article_keywords))
	
	return article_keywords	

def create_category_keyword_matrix(category_articles, topic_signatures):
	"""Returns a dictionary of dictionaries; which are: category > keyword counts"""
	
	category_keyword_matrix = defaultdict(lambda: defaultdict(int))
	
	for n, (category, articles) in enumerate(category_articles.iteritems()):
		for article in articles:
			if article in topic_signatures:
				keywords = topic_signatures[article]
				for keyword in keywords:
					category_keyword_matrix[category][keyword] += 1
				
		if n % 100000 == 0:
			print "Processed {0} of {1} categories".format(n, len(category_articles))
	
	return category_keyword_matrix

def matches_nation_people(text):
	"""Tries to eliminate listings in the form of:
	 - 'english_poets' --> ...ish_....ets"""
	
	nations = u"-american por bi can ais lav van 's tis sex rdu ogp eda ndu lan lay ara ese ian ish an qi ch ss li no can ean ad iet oo ee lsh ari iac land yan sey ni eek male female lgbt".split()
	occupations = u"als oets ity ics ians ers ists es ors ars js nts ds eople ats eens ings ces cesses esses msps mps ews iahs".split()
	
	if "_" in text:
		text = text.split("_")
		for nation in nations:
			if text[0].endswith(nation):
				for occupation in occupations:
					if text[1].endswith(occupation):
						return True
	return False

def matches_species(text):
	"""Looks like a species, not needed"""
	bio_suffixes = "idea,donts,saurs,dae,cetes,tini,sids,_positions,rids,ides,lians,eae,zoa,species,hus,oma,ates,gens,family".split(",")
	for s in bio_suffixes:
		if text.endswith(s):
			return True
	return False

def matches_meta(text):
	"""either a meta category or something unhelpful"""
	stopwords = ["birth", 'death', 'redirect', 'fictional', 'muslim', 'singers', 'surnames']
	for stopword in stopwords:
		if stopword in text:
			return True
	return False

def remove_stopwords(keywords):
	stopwords = set(['a', 'able', 'about', 'above', 'abst', 'accordance', 'according', 'accordingly', 'across', 'act', 'actually', 'added', 'adj', 'affected', 'affecting', 'affects', 'after', 'afterwards', 'again', 'against', 'ah', 'all', 'almost', 'alone', 'along', 'already', 'also', 'although', 'always', 'am', 'among', 'amongst', 'an', 'and', 'announce', 'another', 'any', 'anybody', 'anyhow', 'anymore', 'anyone', 'anything', 'anyway', 'anyways', 'anywhere', 'apparently', 'approximately', 'are', 'aren', 'arent', 'arise', 'around', 'as', 'aside', 'ask', 'asking', 'at', 'auth', 'available', 'away', 'awfully', 'b', 'back', 'be', 'became', 'because', 'become', 'becomes', 'becoming', 'been', 'before', 'beforehand', 'begin', 'beginning', 'beginnings', 'begins', 'behind', 'being', 'believe', 'below', 'beside', 'besides', 'between', 'beyond', 'biol', 'both', 'brief', 'briefly', 'but', 'by', 'c', 'ca', 'came', 'can', 'cannot', 'cause', 'causes', 'certain', 'certainly', 'co', 'com', 'come', 'comes', 'contain', 'containing', 'contains', 'could', 'couldnt', 'd', 'date', 'did', 'different', 'do', 'does', 'doing', 'done', 'down', 'downwards', 'due', 'during', 'e', 'each', 'ed', 'edu', 'effect', 'eg', 'eight', 'eighty', 'either', 'else', 'elsewhere', 'end', 'ending', 'enough', 'especially', 'et', 'et-al', 'etc', 'even', 'ever', 'every', 'everybody', 'everyone', 'everything', 'everywhere', 'ex', 'except', 'f', 'far', 'few', 'ff', 'fifth', 'first', 'five', 'fix', 'followed', 'following', 'follows', 'for', 'former', 'formerly', 'forth', 'found', 'four', 'from', 'further', 'furthermore', 'g', 'gave', 'get', 'gets', 'getting', 'give', 'given', 'gives', 'giving', 'go', 'goes', 'gone', 'got', 'gotten', 'h', 'had', 'happens', 'hardly', 'has', 'have', 'having', 'he', 'hed', 'hence', 'her', 'here', 'hereafter', 'hereby', 'herein', 'heres', 'hereupon', 'hers', 'herself', 'hes', 'hi', 'hid', 'him', 'himself', 'his', 'hither', 'home', 'how', 'howbeit', 'however', 'hundred', 'i', 'id', 'ie', 'if', 'im', 'immediate', 'immediately', 'importance', 'important', 'in', 'inc', 'indeed', 'index', 'information', 'instead', 'into', 'invention', 'inward', 'is', 'it', 'itd', 'its', 'itself', 'j', 'just', 'k', 'keep', 'keeps', 'kept', 'kg', 'km', 'know', 'known', 'knows', 'l', 'largely', 'last', 'lately', 'later', 'latter', 'latterly', 'least', 'less', 'lest', 'let', 'lets', 'like', 'liked', 'likely', 'line', 'little', 'look', 'looking', 'looks', 'ltd', 'm', 'made', 'mainly', 'make', 'makes', 'many', 'may', 'maybe', 'me', 'mean', 'means', 'meantime', 'meanwhile', 'merely', 'mg', 'might', 'million', 'miss', 'ml', 'more', 'moreover', 'most', 'mostly', 'mr', 'mrs', 'much', 'mug', 'must', 'my', 'myself', 'n', 'na', 'name', 'namely', 'nay', 'nd', 'near', 'nearly', 'necessarily', 'necessary', 'need', 'needs', 'neither', 'never', 'nevertheless', 'new', 'next', 'nine', 'ninety', 'no', 'nobody', 'non', 'none', 'nonetheless', 'noone', 'nor', 'normally', 'nos', 'not', 'noted', 'nothing', 'now', 'nowhere', 'o', 'obtain', 'obtained', 'obviously', 'of', 'off', 'often', 'oh', 'ok', 'okay', 'old', 'omitted', 'on', 'once', 'one', 'ones', 'only', 'onto', 'or', 'ord', 'other', 'others', 'otherwise', 'ought', 'our', 'ours', 'ourselves', 'out', 'outside', 'over', 'overall', 'owing', 'own', 'p', 'page', 'pages', 'part', 'particular', 'particularly', 'past', 'per', 'perhaps', 'placed', 'please', 'plus', 'poorly', 'possible', 'possibly', 'potentially', 'pp', 'predominantly', 'present', 'previously', 'primarily', 'probably', 'promptly', 'proud', 'provides', 'put', 'q', 'que', 'quickly', 'quite', 'qv', 'r', 'ran', 'rather', 'rd', 're', 'readily', 'really', 'recent', 'recently', 'ref', 'refs', 'regarding', 'regardless', 'regards', 'related', 'relatively', 'research', 'respectively', 'resulted', 'resulting', 'results', 'right', 'run', 's', 'said', 'same', 'saw', 'say', 'saying', 'says', 'sec', 'section', 'see', 'seeing', 'seem', 'seemed', 'seeming', 'seems', 'seen', 'self', 'selves', 'sent', 'seven', 'several', 'shall', 'she', 'shed', 'shes', 'should', 'show', 'showed', 'shown', 'showns', 'shows', 'significant', 'significantly', 'similar', 'similarly', 'since', 'six', 'slightly', 'so', 'some', 'somebody', 'somehow', 'someone', 'somethan', 'something', 'sometime', 'sometimes', 'somewhat', 'somewhere', 'soon', 'sorry', 'specifically', 'specified', 'specify', 'specifying', 'still', 'stop', 'strongly', 'sub', 'substantially', 'successfully', 'such', 'sufficiently', 'suggest', 'sup', 'sure'])
	new_keywords = {}
	for k,v in keywords.iteritems():
		if len(k) > 2:
			if not k.isdigit():
				if k not in stopwords:
					new_keywords[k] = v
	return new_keywords

def hand_deleted_categories():
	"""Finds categories that have been deleted by hand"""
	hc_del = set()
	with copen("/Users/mruttley/Documents/2014-07-14 Python User Profile Analysis/hand_classification/hand_classifications.tsv", encoding='utf8') as f:
		for line in f:
			line = line[:-1].split("\t")
			wiki = line[0]
			iab = [x for x in line[1:] if x != ""]
			if len(iab) > 0:
				if iab[-1] == 'del':
					hc_del.update([wiki])
	return hc_del

def prune(ckm):
	"""Prunes bad articles and bad keywords from the category keyword matrix"""
		
	print "beforehand: {0} categories".format(len(ckm))
	deleted = hand_deleted_categories()
	
	pruned_ckm = {}
	for category, keywords in ckm.iteritems():
		category = category.lower()
		
		#make sure it wasn't deleted
		if category in deleted: continue
		
		#can only have short titles
		underscores = category.count("_")
		if underscores > 1: continue
		
		#unhelpful categories removed
		if matches_meta(category): continue
		
		#remove any category with a number in it
		if match("\d", category): continue
		
		#remove anything that sounds like a list of people
		if matches_nation_people(category): continue
		
		#remove anything that sounds like a species
		if matches_species(category): continue
		
		#remove stopwords from keywords
		keywords = remove_stopwords(keywords)
		
		#must have lots of keywords
		if len(keywords) < 25: continue
		
		pruned_ckm[category] = keywords
	
	print "after: {0} categories (deleted {1})".format(len(pruned_ckm), len(ckm)-len(pruned_ckm))
	return pruned_ckm

def assign_iab_categories(ckm, cam):
	"""Tries to assign IAB categories to the wiki categories
	This is either by doing lookups in the list of hand classified categories
	or by existing rules
	Outputs stats and returns a dictionary wiki:iab"""
	
	#get hand classified mappings (different from those in hc_del)
	from new_mappings import new_mappings
	
	wiki_iab = {}
	
	#iterate through ckm and try to classify as many as possible
	for category in ckm.iterkeys():
		if category in new_mappings:
			wiki_iab[category] = new_mappings[category]
		else:
			wiki_iab[category] = ""
	
	#inference method:
	#find the parent category of all pages
	#if the parent is classified, classify the child as the same
	
	parent_count = 0
	parent_hand_classified_count = 0
	articles_classified = defaultdict(int)
	articles_seen = defaultdict(int)
	
	for category, articles in cam.iteritems():
		category = category.lower()
		if category in wiki_iab:
			parent_count += 1
			if wiki_iab[category] != "":
				parent_hand_classified_count += 1
				for article in articles:
					article = article.lower()
					if article in wiki_iab:
						articles_seen[article] += 1
						if wiki_iab[article] == "":
							articles_classified[article] += 1
							wiki_iab[article] = wiki_iab[category]
	
	print "Found {0} parents".format(parent_count)
	print "{0} of which were hand classified before".format(parent_hand_classified_count)
	print "{0} articles were seen in total".format(len(articles_seen))
	print "{0} articles were classified this session".format(len(articles_classified))
	print "there are {0}/{1} left to hand or auto classify".format(len([k for k,v in wiki_iab.iteritems() if v == ""]), len(wiki_iab))
	
	return wiki_iab

def create_payload():
	"""Handler function"""
	
	category_article_matrix = load_category_article_matrix() #Found 753,466 categories total
	topic_signatures = load_topic_signatures() #Total: 3,497,639 articles
	category_keyword_matrix = create_category_keyword_matrix(category_article_matrix, topic_signatures)
	
	#clear some memory
	#category_article_matrix = 0
	topic_signatures = 0
	
	#now prune stopwords and useless categories
	#tmp = prune(category_keyword_matrix)
	category_keyword_matrix = prune(category_keyword_matrix) # beforehand: 657397 categories .... after: 34944 categories (deleted 622453)
	
	#now assign IAB categories to each category
	category_mapping = assign_iab_categories(category_keyword_matrix, category_article_matrix)

