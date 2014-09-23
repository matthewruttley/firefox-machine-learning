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
				line = line.lower().split(" ")
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
			
			line = line[:-1].lower().split('\t') #remove the newline character and separate title from rest
			
			article_title = line[0]
			
			keywords = line[1].split('"')[-1]
			
			keywords = findall("[a-z]{3,}", keywords)
			
			title_keywords = findall("[a-z]{3,}", article_title)
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
		if match(".*\d.*", category): continue
		
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

def classify_children_as_parents(current_mapping, cam):
	"""Inference classification method:
	Find the parent category of all pages.
	If the parent is classified, classify the child as the same.
	Accepts the current mapping, and a category article matrix
	"""
	for category, articles in cam.iteritems():
		category = category.lower()
		if category in current_mapping:
			if current_mapping[category] != "":
				for article in articles:
					article = article.lower()
					if article in current_mapping:
						if current_mapping[article] == "":
							current_mapping[article] = current_mapping[category]
	return current_mapping

def find_useful_categories_for_geographic_auto_classification(cam, geographical_matchers, current_mapping):
	"""Precompute useful categories to search through"""
	
	print "There are {0} categories in the category-article matrix".format(len(cam))
	
	cam_useful = set()
	
	for category, articles in cam.iteritems():
		for gm in geographical_matchers:
			if gm in category:
				for article in articles:
					if article in current_mapping:
						if current_mapping[article] == "":
							cam_useful.update([category])
	
	return cam_useful

def geo_classify(current_mapping, geographical_areas, cam, cam_useful, geographical_matchers):
	"""Try to geo classify places based on the existence of geographical matchers"""
	
	total_classified = 0
	
	#iterate through all geographical areas
	for n, area in enumerate(geographical_areas):
		eliminated = []
		#print "Processing {0}/{1} which is {2}. Have to search {3} parents".format(n, len(geographical_areas), area, len(cam_useful))
		for matcher in geographical_matchers:
			matcher = matcher + "_" + area
			for parent in cam_useful:
				if parent.endswith(matcher):
					for child in cam[parent]:
						if child in current_mapping:
							if current_mapping[child] == "":
								current_mapping[child] = area
								total_classified += 1
					eliminated.append(parent)
		for x in eliminated:
			cam_useful.remove(x)
	
	print "Classified a total of {0} categories".format(total_classified)
	
	return current_mapping

def other_classify(current_mapping, geographical_areas, cam, cam_useful, other_matchers):
	"""Try to classify places based on the existence of various matchers"""
	
	total_classified = 0
	
	#iterate through all geographical areas
	for n, area in enumerate(geographical_areas):
		eliminated = []
		#print "Processing {0}/{1} which is {2}. Have to search {3} parents".format(n, len(geographical_areas), area, len(cam_useful))
		for matcher, classification in other_matchers.iteritems():
			matcher = matcher + "_" + area
			for parent in cam_useful:
				if parent.endswith(matcher):
					for child in cam[parent]:
						if child in current_mapping:
							if current_mapping[child] == "":
								current_mapping[child] = classification
								total_classified += 1
					eliminated.append(parent)
		for x in eliminated:
			cam_useful.remove(x)
	
	print "Classified a total of {0} categories".format(total_classified)
	return current_mapping

def find_useful_categories(cam, other_matchers, wiki_iab):
	"""Finds useful categories"""
	useful = set()
	for category, articles in cam.iteritems():
		for matcher in other_matchers.iterkeys():
			if matcher in category:
				for article in articles:
					if article in wiki_iab:
						if wiki_iab[article] == "":
							useful.update([category])
							break
	return useful

def find_consensus_classifications():
	"""Finds classified children in a parent category and suggests assignment to unclassified children"""
	
	suggestions = defaultdict(dict)
	
	for k,v in category_article_matrix.iteritems():
		classifications = defaultdict(int)
		blank = 0
		for article in v:
			if article in category_mapping:
				mapping = category_mapping[article]
				if mapping == "":
					blank += 1
				else:
					classifications[mapping] += 1
	
		if blank > 0:
			if len(classifications) == 1:
				consensus = classifications.keys()[0]
				if classifications[consensus] > 1:
					suggestions[k]["blank"] = blank
					suggestions[k]["consensus"] = consensus
					suggestions[k]["consensus_size"] = classifications[consensus]
	
	return suggestions

def find_blank_parents():
	"""Finds parents who's children are entirely blank"""

def find_unclassified_categories_with_lots_of_parents():
	"""Finds things with lots of parents that are unclassified, in the hope that this will help others"""

def assign_iab_categories(ckm, cam):
	"""Tries to assign IAB categories to the wiki categories
	This is either by doing lookups in the list of hand classified categories
	or by existing rules
	Outputs stats and returns a dictionary wiki:iab"""
	
	#get hand classified mappings (those classified previously as deletions were already removed during the pruning phase)
	from new_mappings import new_mappings
	
	#iterate through ckm and try to classify as many as possible
	wiki_iab = {}
	for category in ckm.iterkeys():
		wiki_iab[category] = new_mappings[category] if category in new_mappings else ""
	
	wiki_iab = classify_children_as_parents(wiki_iab, cam) #infer child classifications
	
	#now try and find geographical locations
	#'congo {democratic rep}', 'congo',
	#'sao tome & principe', 
	
	countries = ['the_bahamas', "the_gambia"
					  'bosnia_and_herzegovina', 'the_central_african_republic', 'the_czech_republic',
					  'the_dominican_republic', 'the_republic_of_ireland', 'north_korea', 'south_korea',
					  'the_marshall_islands', 'the_maldives', 'myanmar', 'burma', 'saint_kitts_and_nevis', 'saint_lucia',
					  'saint_vincent_and_the_grenadines', 'the_solomon_islands', 'trinidad_and_tobago', 'the_united_arab_emirates', 'the_united_kingdom',
					  'the_united_states',
					  'vatican_city']
	countries += ['afghanistan',
				 'albania', 'algeria', 'andorra', 'angola', 'antigua', 'argentina', 'armenia', 'australia', 'austria', 'azerbaijan', 'bahrain', 'bangladesh',
				 'barbados', 'belarus', 'belgium', 'belize', 'benin', 'bhutan', 'bolivia', 'botswana', 'brazil', 'brunei', 'bulgaria', 'burkina', 'burundi', 'cambodia', 'cameroon',
				 'canada', 'cape_verde', 'chad', 'chile', 'china', 'colombia', 'comoros', 'costa_rica', 'croatia', 'cuba', 'cyprus', 'denmark', 'djibouti', 'dominica', 'east_timor',
				 'ecuador', 'egypt', 'el_salvador', 'equatorial_guinea', 'eritrea', 'estonia', 'ethiopia', 'fiji', 'finland', 'france', 'gabon', 'georgia', 'germany',
				 'ghana', 'greece', 'grenada', 'guatemala', 'guinea', 'guinea-bissau', 'guyana', 'haiti', 'honduras', 'hungary', 'iceland', 'india', 'indonesia', 'iran', 'iraq', 'israel',
				 'italy', 'jamaica', 'japan', 'jordan', 'kazakhstan', 'kenya', 'kiribati', 'kosovo', 'kuwait', 'kyrgyzstan', 'laos', 'latvia', 'lebanon', 'lesotho', 'liberia', 'libya',
				 'liechtenstein', 'lithuania', 'luxembourg', 'macedonia', 'madagascar', 'malawi', 'malaysia', 'mali', 'malta', 'mauritania', 'mauritius', 'mexico', 'micronesia',
				 'moldova', 'monaco', 'mongolia', 'montenegro', 'morocco', 'mozambique', 'namibia', 'nauru', 'nepal', 'netherlands', 'new_zealand', 'nicaragua', 'niger', 'nigeria',
				 'norway', 'oman', 'pakistan', 'palau', 'panama', 'new_guinea', 'paraguay', 'peru', 'philippines', 'poland', 'portugal', 'qatar', 'romania', 'russia', 'rwanda',
				 'samoa', 'san_marino', 'saudi_arabia', 'senegal', 'serbia', 'seychelles', 'sierra_leone', 'singapore', 'slovakia', 'slovenia', 'somalia', 'south_africa', 'spain',
				 'sri_lanka', 'sudan', 'suriname', 'swaziland', 'sweden', 'switzerland', 'syria', 'taiwan', 'tajikistan', 'tanzania', 'thailand', 'togo', 'tonga', 'tunisia', 'turkey',
				 'turkmenistan', 'tuvalu', 'uganda', 'ukraine', 'uruguay', 'uzbekistan', 'vanuatu', 'venezuela', 'vietnam', 'yemen', 'zambia', 'zimbabwe']
	states = ['alabama',
			  'alaska', 'arizona', 'arkansas', 'california', 'colorado', 'connecticut', 'delaware', 'florida', 'georgia', 'hawaii', 'idaho', 'illinois', 'indiana', 'iowa', 'kansas', 'kentucky', 'louisiana', 'maine', 'maryland', 'massachusetts', 'michigan', 'minnesota', 'mississippi', 'missouri', 'montana', 'nebraska', 'nevada', 'new_hampshire', 'new_jersey', 'new_mexico', 'new_york', 'north_carolina', 'north_dakota', 'ohio', 'oklahoma', 'oregon', 'pennsylvania', 'rhode_island', 'south_carolina', 'south_dakota', 'tennessee', 'texas', 'utah', 'vermont', 'virginia', 'washington', 'west_virginia', 'wisconsin', 'wyoming']
	geo_matchers = ['towns_in', 'villages_in', 'cities_in', 'districts_of', 'provinces_of']
	
	cam_useful = find_useful_categories_for_geographic_auto_classification(cam, geo_matchers, wiki_iab) #precompute those to actually search for in parent list (from cam)
	
	wiki_iab = geo_classify(wiki_iab, countries, cam, cam_useful, geo_matchers)
	wiki_iab = geo_classify(wiki_iab, states, cam, cam_useful, geo_matchers)
	
	other_matchers = {
		'football_clubs_in': 'soccer',
		'mosques_in': 'del',
		'chapels_in': 'del',
		'ballet_companies_in': 'dance',
		'government_of': 'government',
		'languages_of': 'languages'
	}
	
	ending_matchers = {
		"_cuisine": "food & drink",
		
	}
	
	cam_useful = find_useful_categories(cam, other_matchers, wiki_iab)
	
	wiki_iab = other_classify(wiki_iab, countries, cam, cam_useful, other_matchers)
	wiki_iab = other_classify(wiki_iab, states, cam, cam_useful, other_matchers)
	
	print "Still have to classify {0}/{1} wiki-iab".format(len([k for k,v in wiki_iab.iteritems() if v == ""]), len(wiki_iab))
	
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
	
	#now export those that need to be hand classified
	find_consensus_classifications()
	find_blank_parents()
