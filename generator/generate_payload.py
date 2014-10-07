#!/usr/bin/env python
# -*- coding: utf8 -*-

#Generates a payload file

from codecs import open as copen
from collections import defaultdict
from pdb import set_trace
from re import findall, match
from os import listdir
from json import load, dumps, dump

geo = {
	'countries': [	'the_bahamas', "the_gambia", 'bosnia_and_herzegovina', 'the_central_african_republic', 'the_czech_republic', 'the_dominican_republic', 'the_republic_of_ireland', 'north_korea', 'south_korea',
					'the_marshall_islands', 'the_maldives', 'myanmar', 'burma', 'saint_kitts_and_nevis', 'saint_lucia', 'saint_vincent_and_the_grenadines', 'the_solomon_islands', 'trinidad_and_tobago', 'the_united_arab_emirates', 'the_united_kingdom',
					'the_united_states', 'vatican_city', 'afghanistan',
					'albania', 'algeria', 'andorra', 'angola', 'antigua', 'argentina', 'armenia', 'australia', 'austria', 'azerbaijan', 'bahrain', 'bangladesh',
					'barbados', 'belarus', 'belgium', 'belize', 'benin', 'bhutan', 'bolivia', 'botswana', 'brazil', 'brunei', 'bulgaria', 'burkina', 'burundi', 'cambodia', 'cameroon',
					'canada', 'cape_verde', 'chad', 'chile', 'china', 'colombia', 'comoros', 'costa_rica', 'croatia', 'cuba', 'cyprus', 'denmark', 'djibouti', 'dominica', 'east_timor',
					'ecuador', 'egypt', 'el_salvador', 'equatorial_guinea', 'eritrea', 'estonia', 'ethiopia', 'fiji', 'finland', 'france', 'gabon', 'georgia', 'germany',
					'ghana', 'greece', 'grenada', 'guatemala', 'guinea', 'guinea-bissau', 'guyana', 'haiti', 'honduras', 'hungary', 'iceland', 'india', 'indonesia', 'iran', 'iraq', 'israel',
					'italy', 'jamaica', 'japan', 'jordan', 'kazakhstan', 'kenya', 'kiribati', 'kosovo', 'kuwait', 'kyrgyzstan', 'laos', 'latvia', 'lebanon', 'lesotho', 'liberia', 'libya',
					'liechtenstein', 'lithuania', 'luxembourg', 'macedonia', 'madagascar', 'malawi', 'malaysia', 'mali', 'malta', 'mauritania', 'mauritius', 'mexico', 'micronesia',
					'moldova', 'monaco', 'mongolia', 'montenegro', 'morocco', 'mozambique', 'namibia', 'nauru', 'nepal', 'netherlands', 'new_zealand', 'nicaragua', 'niger', 'nigeria',
					'norway', 'oman', 'pakistan', 'palau', 'panama', 'new_guinea', 'paraguay', 'peru', 'the_philippines', 'poland', 'portugal', 'qatar', 'romania', 'russia', 'rwanda',
					'samoa', 'san_marino', 'saudi_arabia', 'senegal', 'serbia', 'seychelles', 'sierra_leone', 'singapore', 'slovakia', 'slovenia', 'somalia', 'south_africa', 'spain',
					'sri_lanka', 'sudan', 'suriname', 'swaziland', 'sweden', 'switzerland', 'syria', 'taiwan', 'tajikistan', 'tanzania', 'thailand', 'togo', 'tonga', 'tunisia', 'turkey',
					'turkmenistan', 'tuvalu', 'uganda', 'ukraine', 'uruguay', 'uzbekistan', 'vanuatu', 'venezuela', 'vietnam', 'yemen', 'zambia', 'zimbabwe'],
	'states': [
		'alabama', 'alaska', 'arizona', 'arkansas', 'california', 'colorado', 'connecticut', 'delaware', 'florida', 'georgia', 'hawaii', 'idaho', 'illinois', 'indiana', 'iowa', 'kansas',
		'kentucky', 'louisiana', 'maine', 'maryland', 'massachusetts', 'michigan', 'minnesota', 'mississippi', 'missouri', 'montana', 'nebraska', 'nevada', 'new_hampshire', 'new_jersey',
		'new_mexico', 'new_york', 'north_carolina', 'north_dakota', 'ohio', 'oklahoma', 'oregon', 'pennsylvania', 'rhode_island', 'south_carolina', 'south_dakota', 'tennessee', 'texas',
		'utah', 'vermont', 'virginia', 'washington', 'west_virginia', 'wisconsin', 'wyoming'],
	
	'matchers': [u'municipalities_of', u'islands_of', 'towns_in', 'villages_in', 'cities_in', 'districts_of', 'provinces_of', 'regional_units_of', 'regions_of',
				 'states_and_territories_of', 'states_of', 'prefectures_of', 'populated_places_in', u'provincial_capitals', u'district_capitals', u'world_heritage_sites_in',
				 'counties_of', 'prefectures_in']
}

partial_matchers = {
	'starters': {
		'ballet_companies_in': 'dance',
		'ethnic_groups': 'anthropology',
		'architectural_': 'architecture',
		'gospel_': 'christianity',
		'military_': 'military',
		'musical_': 'music',
		'biblical_': 'christianity',
		u'universities_and_colleges': 'university',
		'afc_': 'soccer',
		u'singers_from': 'music',
		u'mathematical_': 'mathematics',
		'programming_': 'programming',
		'wars_': 'military',
		'plants_with': 'botany',
		'jesus': 'christianity',
		'planetary': 'astronomy',
	},
	'enders': {
		'agriculture': set(['agriculture']),
		'air travel': set(['aircraft']),
		'animals': set(['fish', u'sphodromantis', u'strepsiptera', u'thrips', u'megaloptera', 'lice', 'flies', u'tarachodes', u'rivetina', u'phasmatodea', u'miomantis', u'mirosternus', u'psocoptera', 'earwigs', u'plecoptera', u'oxyothespis', u'adephaga', u'polyphaga', 'cockroaches', 'beetles', u'eremiaphila', u'rhombodera', 'termites', u'cimicomorpha', u'acromantis', u'amantis', u'xyletobius', 'fleas', 'mayflies']),
		'anthropology': set(['peoples']),
		'architecture': set(['architects']),
		'automotive': set(['vehicles']),
		'astronomy': set(['planets']),
		'botany': set([u'vegetables', u'bryales', u'dicranales', u'marchantiales', u'jungermanniales', u'metzgeriales']),
		'buddhism': set(['_buddhism']),
		'chemistry': set(['_chemistry', '(element)', 'acids', 'gases', 'gas']),
		'comics': set(['comics']),
		'cricket': set(['cricketers']),
		'economics': set(['economics', 'economists']),
		'fine_art': set(['painters']),
		'folklore': set(['folklore', 'mythology']),
		'food & drink': set(['cuisine']),
		'geology': set(['minerals', 'rocks']),
		'health & fitness': set(['diseases']),
		'history': set(['history']),
		'hockey': set(['(nhl)']),
		'horse_racing': set([u'horse racing']),
		'judaism': set(['rabbis']),
		'law': set(['law', 'lawyers']),
		'languages': set(['languages']),
		'literature': set(['literature', 'fiction', 'novels', 'books', 'writers']),
		'military': set(['warfare', 'weapons', 'war']),
		'movies': set(['films']),
		'music': set(['music', 'musical_groups', 'singers', 'composers', 'musicians', 'orchestras',
					  'albums', 'guitarists', 'songs', 'rock', 'punk', 'quintets', u'music_genres', u'musicians', u'records_artists']),
		'news': set(['newspapers']),
		'philosophy': set(['philosophy', 'philosophers']),
		'poetry': set(['poets', 'poems']),
		'politics': set(['_republicans', 'democrats', 'politicians', u'nationalism', u'uk_mps']),
		'physics': set(['_physicists']),
		'religion': set(['gods']),
		'soccer': set(['footballers', 'f.c.', 'a.f.c.']),
		'television': set(['television_series']),
		'trains': set(['railroads', 'locomotives']),
		'university': set(['university']),
		'usa': set(['massachusetts', 'connecticut']),
	},
	'all_children': {
		'chemical_engineering': 'chemistry',
		'transition_metals': 'chemistry',
		'political_systems': 'politics',
		'ancient_languages': 'languages',
		'marxist_theory': 'politics',
		'chemical_elements': 'chemistry',
		'chemical_processes': 'chemistry',
		'political_theories': 'politics',
		'television_franchises': 'television',
		'fixed_shooters': 'computer_gaming',
		'dos_games': 'computer_gaming',
		'mobile_games': 'computer_gaming',
		'msx_games': 'computer_gaming',
		'architecture': 'architecture',
		'statistics': 'mathematics',
		'linear_algebra': 'mathematics',
		'discreet_groups': 'mathematics',
		'harmonic_analysis': 'mathematics',
	},
	'anything': {
		'government_of': 'government',
		'languages_of': 'languages',
		'football_clubs_in': 'soccer',
		'mosques_in': 'islam',
		'chapels_in': 'christianity',
		'castles': 'military',
		'forts': 'military',
		'anarchism': 'politics',
		'warfare': 'military',
		'wars': 'military',
		u'geology': 'geology',
		u'styles_of_music': 'music',
		u'singer-songwriters': 'music',
		u'music_genres': 'music',
		'bilateral_relations': 'politics',
		'premier_leagues': 'soccer',
		'army_brigades': 'military',
		'funk': 'music',
		'algebra': 'mathematics',
		'mathematical': 'mathematics',
	},
	'delparent': set(['former_countries_in_south_asia', 'american_television_personalities', 'american_inventors', u'1998_deaths', u'people_celebrated_in_the_lutheran_liturgical_calendar', u'glaad_media_award_winners',
					  u'american_humanitarians', u'exempt_charities', u'history_of_colonialism', u'fandom', u'english_novelists', u'transcendental_meditation_practitioners', u'pacific_coast_ranges',
					  u'members_of_the_order_of_the_british_empire', u'victorian_novelists', u'history_of_the_united_states_(1865\u20131918)', u'american_fashion_businesspeople', u'publicly_traded_sports_companies',
					  u'burials_at_forest_lawn_memorial_park_(glendale)', u'honorary_knights_grand_cross_of_the_order_of_the_bath', u'virgin_records_artists', u'recipients_of_the_pour_le_m\xe9rite_(civil_class)',
					  u'metalogic', u'american_cosmetics_businesspeople', u'officers_of_the_order_of_the_british_empire', u'blog_hosting_services', u'internet_standards', u'mexican_plateau', u'haidian_district',
					  u'buddhism_in_afghanistan', u'karelian_isthmus', u'states_and_territories_established_in_2000', u'companies_based_in_jacksonville,_florida', u'american_women_in_business',
					  u'displaced_persons_camps_in_the_aftermath_of_world_war_ii', u'pacific_ranges', u'burials_at_ferncliff_cemetery', u'code_names', u'former_french_colonies', u'months', u'olympic_sports',
					  u'news_corporation_subsidiaries', u'economy_of_maharashtra', u's&p_cnx_nifty', u'american_people_of_english_descent', u'motorboat_racing', u'ufo_religions', 'sloan_fellowship']
	),
}

#main objects

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

#pruning

def all_matchers_checker():
	"""Creates a set of all matchers, for checking"""
	
	checker = set()
	
	#starters, enders, all_children, anything
	checker.update(partial_matchers['starters'].keys())
	
	for x in partial_matchers['enders'].values():
		checker.update(x)
	
	checker.update(partial_matchers['all_children'].keys())
	
	checker.update(partial_matchers['anything'].keys())

	#also do geo
	checker.update(geo['matchers'])
	
	#add pointless underscores
	underscored = [u"_" + x for x in checker]
	underscored2 = [x+u'_' for x in checker]
	checker.update(underscored)
	checker.update(underscored2)
	
	return checker

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

def remove_due_to_ender(category):
	"""List of unhelpful enders"""
	
	enders = set(['businesspeople', 'executives', 'powerlifters', 'boxers', 'riders', 'characters'])
	
	for x in enders:
		if category.endswith(x):
			return True
		
	return False

def prune(ckm):
	"""Prunes bad articles and bad keywords from the category keyword matrix"""
		
	print "beforehand: {0} categories".format(len(ckm))
	deleted = hand_deleted_categories()
	
	pruned_ckm = {}
	for category, keywords in ckm.iteritems():
		category = category.lower()
		
		#make sure it wasn't deleted
		if category in deleted: continue
		
		#if it ends in something we want to specifically remove
		if remove_due_to_ender(category): continue
		
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

def resolve_mistakes(category_mapping):
	"""Resolves mistakes or abbreviations in the hand classification
	
	TODO:
	- Look into unclassified category for coverage metric
	- make sure things like university actually exist
	
	how do these exist
	mistakes = {
		u'delparent': '',
		u'del': '',
		u'del_parent': '',
	}
	
	#weather category - local news???
	
	"""
	
	#change hotel to hotels for all
	
	#first load mozcat
	with open('mozcat_heirarchy.json') as f:
		tree = load(f)
	
	#make flat list
	all_cats = set()
	for k,v in tree.iteritems():
		all_cats.update([k])
		all_cats.update(v)
	
	cleaned = {}
	#clean up mappings
	for k,v in category_mapping.iteritems():
		v = v.strip() #remove whitespace
		v = v.lower() #lower case
		v = v.replace("_", " ") #replace underscores
		cleaned[k] = v #insert
	category_mapping = cleaned
	cleaned = 0 #free up memory
	
	nest = {
		u'golf': 'nest_sports','hockey': 'nest_sports',u'tennis': 'nest_sports','cricket': 'nest_sports',
		u'rugby': 'nest_sports',u'volleyball': 'nest_sports',
		
		'university': 'nest_education',
		'writing': 'nest_hobbies & interests',
		u'cardiac arrest': 'nest_health & fitness',
		u'windows ': 'nest_technology & computing',
		'theatre': 'nest_arts & entertainment',
		u'journalism': 'nest_news',
		
		'kosovo': 'nest_travel','north_korea': 'nest_travel','senegal': 'nest_travel','gabon': 'nest_travel','guinea': 'nest_travel','barbados': 'nest_travel','bhutan': 'nest_travel','micronesia': 'nest_travel','kuwait': 'nest_travel','belarus': 'nest_travel','liberia': 'nest_travel','latvia': 'nest_travel',
		'kyrgyzstan': 'nest_travel', 'haiti': 'nest_travel','zambia': 'nest_travel','lebanon': 'nest_travel','luxembourg': 'nest_travel',u'greenland': 'nest_travel','honduras': 'nest_travel','palau': 'nest_travel','mozambique': 'nest_travel',
		'armenia': 'nest_travel','kiribati': 'nest_travel','belize': 'nest_travel','tunisia': 'nest_travel','oman': 'nest_travel',u'colombia': 'nest_travel',
		'niger': 'nest_travel','fiji': 'nest_travel','comoros': 'nest_travel','slovenia': 'nest_travel','dominica': 'nest_travel','turkmenistan': 'nest_travel',
		'slovakia': 'nest_travel','suriname': 'nest_travel',u'bolivia': 'nest_travel','malawi': 'nest_travel','ecuador': 'nest_travel',
		'algeria': 'nest_travel','montenegro': 'nest_travel','togo': 'nest_travel','cambodia': 'nest_travel','ethiopia': 'nest_travel','argentina': 'nest_travel',
		u'yemen': 'nest_travel','portugal': 'nest_travel','lesotho': 'nest_travel','uganda': 'nest_travel','burundi': 'nest_travel',
		u'turkey': 'nest_travel','madagascar': 'nest_travel','antigua': 'nest_travel','mali': 'nest_travel', 'vanuatu': 'nest_travel',
		'trains': 'nest_travel','sri_lanka': 'nest_travel',u'columbia': 'nest_travel','chad': 'nest_travel','mauritius': 'nest_travel',
		'botswana': 'nest_travel',
		'theme parks': 'nest_travel'}

	for k,v in nest.iteritems():
		under_what = v[5:]
		if under_what not in all_cats:
			print "Mistake: {0} doesn't exist in all_cats".format(v)
		else:
			category_mapping[k] = k #create
			tree[under_what].append(k) #nest
			all_cats.update([k])
	
	change_then_nest_under_travel = {
		'the_maldives': 'maldives',
		'the_czech_republic': 'czech republic',
		'the_dominican_republic': 'dominican republic',
		'sierra_leone': 'sierra leone',
		'saint_kitts_and_nevis': 'saint kitts and nevis',
		'the_bahamas': 'the bahamas',
		'the_united_arab_emirates': 'united arab emirates',
		'saint_lucia': 'saint lucia',
		'burkina': 'burkina faso',
		'the_united_kingdom': 'united kingdom',
		'cape_verde': 'cape verde',
		'east_timor': 'east timor',
		u'Bosnia and Herzegovina': 'bosnia and herzegovina',
		'trinidad_and_tobago': 'trinidad and tobago',
		'the_marshall_islands': 'the marshall islands',
		'el_salvador': 'el salvador',
		'the_gambia': 'the gambia',
		'the_central_african_republic': 'central african republic',
	}
	
	for k,v in change_then_nest_under_travel.iteritems():
		to_change = [x for x in category_mapping if category_mapping[x] == k]
		#correct them
		for x in to_change:
			category_mapping[x] = v
		
		#if v doesn't exist, create it
		if v not in all_cats:
			tree['travel'].append(v) #and nest it under travel
	
	redirects = {
		#redirects (typically mistakes or abbreviations)
		'luxury car': 'automotive_luxury cars',
		u'children': 'education_parenting children',
		u'linguistics': 'education_languages',
		u'wales': 'travel_united kingdom',
		u'universitiy': 'education_university',
		'trucks': 'automotive_pickup trucks',
		'toddlers': 'education_parenting children',
		u'radio ': 'arts & entertainment_radio',
		u'psychology': 'health & fitness_psychology & psychiatry',
		'south_korea': 'travel_korea',
		'burma': 'travel_myanmar',
		u'chemical_mixtures': 'science_chemistry',
		u'video': 'technology & computing_desktop video',
		u'boats': 'sports_sailing',
		'the_united_states': 'travel_usa',
		u'greenland': 'travel_greenland',
		u'greeland': 'travel_greenland',
		'the_republic_of_ireland': 'travel_ireland',
		u'phyics': 'science_physics',
		u'operas': 'arts & entertainment_opera',
		u'train': 'travel_trains',
		u'food & drinks': 'food & drink',
		'programming': 'technology & computing_computer programming',
		u'sports ': 'sports',
		'piano': 'music',
	}
	
	for k,v in redirects.iteritems():
		#split up v
		v = v.split('_')
		if len(v) == 1:
			#v is top level
			#might need to make it
			if v[0] not in all_cats:
				all_cats.update([v[0]])
				tree[v[0]] = []
			
			for x in category_mapping.iterkeys():
				if category_mapping[x] == k:
					category_mapping[x] = v[0]
		else:
			#v is in two parts
			top_level = v[0]
			sub_cat = v[1]
			
			#make sure top level exists
			if top_level not in all_cats:
				all_cats.update([top_level])
				tree[top_level] = []
			
			#make sure sub cat exists
			if sub_cat not in all_cats:
				all_cats.update([sub_cat])
				tree[top_level].append(sub_cat)
			
			#nest it
			for x in category_mapping.iterkeys():
				if category_mapping[x] == k:
					category_mapping[x] = v[1]
	
	#add some extra categories (this module needs reorganization)
	#to_add = ['business_energy']
	tree['business'].append('energy')
	all_cats.update(['energy'])
	
	corrections = {
		'shipping_companies': 'business',
		'pharmaceutical_companies': 'business', 'dental_companies': 'dental care', 'ontario_hydro': 'energy', 'performance_management': 'business', 'translation_companies': 'languages', 'imperial_tobacco': 'smoking',
		'trade': 'business', 'genomics_companies': 'biotech', 'guano_trade': 'business', 'internet_companies': 'internet', 'nb_power': 'energy', 'ice_trade': 'energy', 'petrochemical_companies': 'energy',
		'clothing_companies': 'clothing', 'amiga_companies': 'computer gaming', 'robotics_companies': 'physics', 'free_market': 'business', 'biotechnology_companies': 'biotech', 'skateboarding_companies': 'skateboarding',
		'berkshire_hathaway': 'investing', 'reinsurance_companies': 'insurance', 'fair_trade': 'business', 'signage_companies': 'business', 'florist_companies': 'business', 'tamiya_corporation': 'childrens',
		'software_companies': 'business', 'tea_companies': 'tea', 'permira_companies': 'business', 'gazprom': 'energy', 'aerospace': 'military', 'foodservice_companies': 'logistics', 'televisa': 'television',
		'wine_companies': 'wine', 'glassmaking_companies': 'business', 'computer_companies': 'computer hardware', 'xcel_energy': 'energy', 'tobacco_companies': 'smoking', 'cosmetics_companies': 'beauty',
		'aerospace_companies': 'military', 'mitsubishi_companies': 'business', 'apple_inc.': 'apple mac', 'accounting_scandals': 'business', 'oil_companies': 'energy', 'newspaper_companies': 'news',
		'printing_companies': 'publishing', 'slavery': 'history', 'theatre_companies': 'theatre', 'glaxosmithkline': 'biomedical', 'duke_energy': 'energy', 'fragrance_companies': 'beauty', 'bridgestone': 'racing',
		'unilever_companies': 'business', 'outsourcing': 'business', 'tata_group': 'metals', 'process_management': 'business', 'statoil': 'energy', 'technology_companies': 'technology & computing',
		'viz_media': 'comics', 'mitterrand-pasqua_affair': 'politics', 'exxonmobil': 'energy', 'seed_companies': 'gardening', 'energy_companies': 'energy', 'business': 'business',
		'holding_companies': 'business', 'online_companies': 'del', 'franchises': 'business', 'self-organization': 'del', 'burmah-castrol': 'energy', 'nanotechnology_companies': 'business',
		'weapons_trade': 'military', 'branding_companies': 'marketing', 'mitsui': 'business', 'windows_live': 'windows', 'dvd_companies': 'dvd', 'total_s.a.': 'energy', 'industry': 'business',
		'telecommunications_companies': 'business', 'ballet_companies': 'dance', 'voip_companies': 'computer networking', 'trading_companies': 'business', 'packaging_companies': 'business',
		'map_companies': 'geography', 'amazon.com': 'ecommerce', 'icici_bank': 'personal finance', 'hentai_companies': 'pornography', 'opec': 'energy', 'security_companies': 'military',
		'cryptography_companies': 'computer security', 'compuserve': 'technology & computing', 'sugar_companies': 'food & drink', 'management': 'business', 'museum_companies': 'history',
		'human_trafficking': 'crime', 'dual-listed_companies': 'business', 'texaco': 'energy', 'aluminium_companies': 'metals', 'computer_security': 'computer security', 'film_companies': 'movies',
		'msn': 'internet', 'georgia_power': 'energy', 'enron': 'crime', 'accountancy': 'business', 'mining': 'business', 'taxicab_companies': 'travel', 'meteorological_companies': 'geography',
		'poker_companies': 'gambling', 'employee-owned_companies': 'business', 'nikon': 'photography', 'pasta_companies': 'italian cuisine', 'norsk_hydro': 'energy', 'petrobras': 'energy',
		'commerce': 'commerce', 'cartels': 'business', 'ibm': 'technology & computing', 'texas_instruments': 'science', 'red_hat': 'unix', 'engineering_companies': 'business', 'collegehumor': 'humor',
		'saskpower': 'energy', 'slave_trade': 'history', 'hospitality_companies': 'hotel', 'agent-owned_companies': 'del', 'food_companies': 'business', 'photography_companies': 'photography',
		'business_analysis': 'business', 'lukoil': 'energy', 'podcasting_companies': 'radio', 'motherboard_companies': 'computer hardware', 'non-profit_corporations': 'business',
		'agriculture_companies': 'agriculture', 'investment_companies': 'investing', 'snowboarding_companies': 'snowboarding', 'chemical_companies': 'business', 'railway_companies': 'trains',
		'chartered_companies': 'business', 'e.on': 'energy', 'corporations': 'del', 'fertilizer_companies': 'agriculture', 'moving_companies': 'interior design', 'lenovo': 'computer hardware',
		'networking_companies': 'computer networking', 'bhp_billiton': 'energy', 'access_control': 'del', 'bandai_visual': 'comics', 'database_companies': 'databases', 'standard_oil': 'energy',
		'samsung_electronics': 'business', 'cement_companies': 'construction', 'sports_business': 'business', 'brave_series': 'comics', 'self-publishing_companies': 'publishing',
		'television_companies': 'television', 'chevron_corporation': 'automotive', 'dance_companies': 'dance', 'linux_companies': 'unix', 'seiko_epson': 'business', 'capitalism': 'business',
		'e-commerce': 'ecommerce', 'small_business': 'business', 'wargame_companies': 'board games', 'training_companies': 'human resources', 'microsoft': 'windows', 'coolie_trade': 'history',
		'opera_companies':'opera',
		u'energy': 'energy',
		'gaza_strip': 'politics',
		'logistics_companies':'logistics',
		'mahindra_group':'business',
		'watco_companies':'business',
		'outsourcing_companies':'business',
		'bristol-myers_squibb':'biomedical',
		'textile_companies':'fashion',
		'loblaw_companies':'food & drink',
		'swire_group':'business',
		'gis_companies':'business',
		'bridge_companies':'construction',
		'flavor_companies':'food & drink',
		'bel-mid_companies':'business',
		'defence_companies':'military',
		'infosys':'business',
		'commodore_international':'computer hardware',
		'levant_company':'history',
		'jingle_companies':'marketing',
		'sunoco':'energy',
		'eads':'air travel',
		'insurance_companies':'insurance',
		'pink_pineapple':'pornography',
		'conglomerate_companies':'business',
		'media_blasters':'comics',
		'hat_companies':'clothing',
		'leasing_companies':'logistics',
		'livery_companies':'del',
		'jewellery_companies':'jewelry',
		'eni':'energy',
		'international_business':'business',
		'entergy':'energy',
		'bofors_scandal':'crime',
		'parking_companies':'logistics',
		're-established_companies':'del',
		'petronas':'energy',
		'alfa_group':'business',
		'service_companies':'del',
		'itt_corporation':'manufacturing',
		'multinational_companies':'del',
		'weyerhaeuser':'forestry',
		'geophysical_companies':'geology',
		'prisa':'news',
		'education_companies':'education',
		'southern_company':'energy',
		'montgomery_ward':'commerce',
		'seafood_companies':'food & drink',
		'design_companies':'del',
		'avionics_companies':'air travel',
		'rtl_group':'news',
		'cloud_storage':'computer software',
		'electronics_companies':'technology & computing',
		'rosneft':'energy',
		'offshoring':'business',
		'mining_companies':'business',
		'anime_companies':'comics',
		'cms_energy':'energy',
		'siemens':'technology & computing',
		'plastics_companies':'business',
		'marathon_oil':'energy',
		'navistar_international':'pickup trucks',
		'corporatism':'business',
		'sistema':'business',
		'bottling_companies':'del',
		'hydro-québec':'energy',
		'arco':'business',
		'conocophillips':'energy',
		'rpg_group':'business',
		'keiretsu':'business',
		'bse_sensex':'business',
		'atco':'gardening',
		'reliance_industries':'manufacturing',
		'hutchison_whampoa':'business',
		'basque_companies':'spain',
		'semiconductor_companies':'technology & computing',
		'vimpelcom_ltd.':'cell phones',
		'dupont':'biotech',
		'monopolies':'business',
		'essel_group':'business',
		'manufacturing_companies':'manufacturing',
		'aniplex':'comics',
		'neopets':'childrens',
		'yukos':'energy',
		'waste_companies':'logistics',
		u'world_forestry': 'forestry',
		u'sumba': 'indonesia',
		u'rwe': 'energy',
		u'strychnos': 'botany',
		u'logging': 'forestry',
		u'coal': 'energy',
		u'seram_island': 'indonesia',
		u'urban_forestry': 'forestry',
		'destroyed_landmarks': 'del',
	}
	
	#hope this will work in-place without any dictionary size change errors
	seen = set()
	for k,v in category_mapping.iteritems():
		if k in corrections:
			#make sure the new subcat exists
			if corrections[k] not in all_cats:
				if corrections[k] not in seen:				
					print "Correction not seen: {0}".format(corrections[k])
					seen.update([corrections[k]])
			else:
				category_mapping[k] = corrections[k]
	
	#now check for del or del(_)parent
	to_delete = set()
	delparent = set()
	for k,v in category_mapping.iteritems():
		if v == 'del':
			to_delete.update([k])
		if (v == 'del_parent') or (v == 'delparent'):
			delparent.update([k])
	
	for x in to_delete:
		del category_mapping[x]
	
	print "delparent:"
	print [x for x in delparent if x not in partial_matchers['delparent']]
	
	return category_mapping, tree

#optimal processing

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

def find_consensus_classifications(cam, category_mapping):
	"""Finds classified children in a parent category and suggests assignment to unclassified children"""
	
	suggestions = defaultdict(dict)
	
	for parent, articles in cam.iteritems():
		if parent not in partial_matchers['delparent']:
			classifications = defaultdict(list)
			blank = []
			for article in articles:
				if article in category_mapping:
					mapping = category_mapping[article]
					if mapping == "":
						blank.append(article)
					else:
						classifications[mapping].append(article)
		
			if len(blank) > 0:
				if len(classifications) == 1:
					consensus = classifications.keys()[0]
					if len(classifications[consensus]) > 1:
						suggestions[parent]["blank"] = blank
						suggestions[parent]["consensus"] = consensus
						suggestions[parent]["consensus_items"] = classifications[consensus]
	
	suggestions = sorted(suggestions.items(), key=lambda x: len(x[1]['blank']), reverse=True)
	
	with copen('cx_consensus_6.txt', 'w', encoding='utf8') as f:
		for x in suggestions:
			f.write(u'category:\t' + x[0] + u'\n')
			f.write(u'consensus:\t' + x[1]['consensus'] + u"\t(" + u', '.join(x[1]['consensus_items']) + u")\n")
			f.write(u'need classification:\t' + u'\t'.join(x[1]['blank']) + u"\n")
			f.write(u'all:\t\n\n')
	
	print "Outputted {0} suggestions - in cx_consensus_6.txt".format(len(suggestions))

def find_blank_parents(cam, category_mapping):
	"""Finds parents with entirely blank children"""
	
	added = 0
	to_add = []
	ignore = [
		"births",
		'deaths',
		'surnames',
		'unknown',
		"uncertain",
		"established_in",
		
	]
	
	with copen('cx_blank_parents_5.txt', 'w', encoding='utf8') as f:
		for parent, children in cam.iteritems():
			#have to prune the more extreme categories
			
			if len(children) > 200:
				continue
			if len(children) < 5:
				continue
			
			ignore_parent = False
			for x in ignore:
				if x in parent:
					ignore_parent = True
					break
			if ignore_parent:
				continue
			
			empty = []
			for child in children:
				if child in category_mapping:
					if category_mapping[child] != "":
						all_empty = False
						break
					else:
						empty.append(child)
			if empty:
				entry = []	
				entry.append(u"category:\t" + parent + u"\n")
				entry.append(u'\t'.join([x for x in empty]) + "\n")
				entry.append(u'Your choice:\t\n')
				entry.append(u'\n')
				to_add.append(entry)
				added += 1
		
		to_add = sorted(to_add, key=lambda x: x[1].count('\t'), reverse=True)
		to_add = to_add[:1000] #temporary fix since the ouput file is a 47mb tsv lol
		for x in to_add:
			for line in x:
				f.write(line)
	
	print "Outputted 1000 categories to cx_blank_parents_5".format(added)
	
def find_unclassified_categories_with_lots_of_parents(cam, category_mapping):
	"""Finds things with lots of parents that are unclassified, in the hope that this will help others"""
	
	#organize by parent count
	parent_counts = defaultdict(set)
	
	for k,v in cam.iteritems():
		if k in category_mapping:
			for article in v:
				if article in category_mapping:
					if category_mapping[article] == "":
						parent_counts[article].update([k])
	
	parent_counts = sorted(parent_counts.items(), key=lambda x: len(x[1]), reverse=True)
	
	with copen('cx_parent_counts_3.txt', 'w', encoding='utf8') as f:
		for article, parents in parent_counts:
			f.write(u"article:\t{0}\n".format(article))
			f.write(u"parents:\t{0}\n".format(u'\t'.join([x for x in parents])))
			f.write(u'Article IAB:\t\n')
			f.write(u'\n')
	
	print "outputted to cx_parent_counts_3.txt"

def find_children_with_lots_of_children(category_mapping, cam):
	"""Finds parents that have children with lots of children - sorted descending"""
	
	#metric is the largest average number of children per child
	#need to create an object of parent -> child -> children
	
	#pulls out some stuff but the categories aren't homogenous, but rather very rich
	
	nest = defaultdict(lambda: defaultdict(set))
	
	for category, articles in cam.iteritems():
		for article in articles:
			if article in category_mapping:
				if category_mapping[article] == "":
					if article in cam:
						for child_article in cam[article]:
							if child_article in category_mapping:
								if category_mapping[child_article] == "":
									nest[category][article].update([child_article])
	
	nest = sorted(nest.items(), key=lambda x: sum([len(v) for k,v in x[1].iteritems()])/float(len(x[1])), reverse=True)
	
	return nest

def find_all_unclassified(category_mapping):
	with copen('cx_all_2.txt', 'w', encoding='utf') as f:
		for k,v in category_mapping.iteritems():
			if v == "":
				f.write(u"{0}\t\n".format(k))
	
	print "outputted to cx_all_2.txt"

def find_most_common_suffixes(category_mapping):
	suffixes = defaultdict(int)
	for k,v in category_mapping.iteritems():
		if v == "":
			if '_' in k:
				k = k.split('_')
				suffixes[k[-1]] += 1
	
	suffixes = sorted(suffixes.items(), key=lambda x: x[1], reverse=True)
	return suffixes

def find_most_common_prefixes(category_mapping):
	prefixes = defaultdict(int)
	for k,v in category_mapping.iteritems():
		if v == "":
			if '_' in k:
				k = k.split('_')
				prefixes[k[0]] += 1
	
	prefixes = sorted(prefixes.items(), key=lambda x: x[1], reverse=True)
	return prefixes

def find_geo_matcher_items(category_mapping):
	"""Finds unclassified things that contain geo matchers"""
	
	gm = geo['matchers']
	items = set()
	
	for wiki, iab in category_mapping.iteritems():
		if iab == "":
			for g in gm:
				if g in wiki:
					items.update([wiki])
					break
	
	print "Found {0} items".format(len(items))

	return items

def get_children(o, cam):
	to_add = set()
	for x in o:
		if x in cam:
			to_add.update(cam[x])
	o.update(to_add)
	return o

def iterate_through_graph(cam, category_mapping, start):
	"""Iterates through the graph, looking at children of children"""
	
	master = cam[start]
	prev_size = 0
	if len(master) > prev_size:
		print prev_size
		prev_size = len(master)
		master = get_children(master, cam)
	
	master = [x for x in master if x in category_mapping]
	print len(master)
	return master

#process hand classifications

def process_blank_classifications(category_mapping, show_not_found=False):
	"""Processes blank classifications"""
	
	not_found = set()
	classified = set()
	checker = all_matchers_checker()
	matchers = set()
	delparent = set()
	
	for fn in listdir('.'):
		if ("cx" in fn) and ("blank" in fn) and ('pass' in fn):
			with copen(fn, encoding='utf8') as f:
				data = f.read()
				data = data.split('category:')[1:]
				for entry in data:
					entry = entry.split('\n')
					category = entry[0].replace('\t', '')
					items = [x for x in entry[1].split('\t') if x != '']
					choice = entry[2].split('\t')[1]
					other = entry[2].split('\t')[2:]
					
					for x in other:
						if x != "":
							if x not in checker:
								matchers.update([x])
					
					if choice != '':
						if choice == 'delparent':
							if category not in partial_matchers['delparent']:
								delparent.update([category])
						else:
							if category in category_mapping:
								if category_mapping[category] == "":
									category_mapping[category] = choice
							for x in items:
								if x in category_mapping:
									if category_mapping[x] == "":
										category_mapping[x] = choice
										classified.update([x])
								else:
									not_found.update([x])
	
	if show_not_found:
		print "Not found:"
		print not_found
	
	if len(delparent) > 0:
		print 'delparent:'
		print delparent
	
	if len(matchers) > 0:
		print "Matchers to add:"
		print matchers
	
	print "classified a total of {0} blank items".format(len(classified))
	
	return category_mapping

def process_consensus_classifications(category_mapping, show_not_found=False):
	"""Processes the consensus classifications"""
	
	not_found = set()
	classified = set()
	delparent = set()
	other = set()
	checker = all_matchers_checker()
	
	for fn in listdir("."):
		if ('cx' in fn) and ('consensus' in fn) and ('pass' in fn):
			with copen(fn, encoding='utf8') as f:
				data = f.read()
				data = data.split('category:')[1:]
				
				for entry in data:
					if len(entry) > 5:
						entry = entry.split('\n')
						category = entry[0].replace('\t', '')
						consensus_line = entry[1].split('\t')
						consensus = consensus_line[1]
						consensus_items = consensus_line[2][1:-1].split(', ')
						try:
							need_classification = entry[2].split('\t')[1:]
						except Exception, e:
							print e
							raw_input(entry)
							continue
						decision = entry[3].split('\t')[1]
						new_matchers = [x for x in entry[3].split('\t')[2:] if x != '']
						
						#check if other exists in matchers
						if len(new_matchers) > 0:
							for x in new_matchers:
								if x not in checker:
									other.update([x])
						
						if decision == 'review':
							for item in need_classification:
								if item in category_mapping:
									category_mapping[item] = ""
							for item in consensus_items:
								if item in category_mapping:
									category_mapping[item] = ""
							continue
						
						if decision == u'delparent':
							if category not in partial_matchers['delparent']:
								delparent.update([category])
							continue
						
						if decision != "":
							if decision == 'delparent':
								raw_input('something is wrong....')
								print "entry: {0}".format(entry)
								print "category: {0}".format(category)
								print "consensus line: {0}".format(consensus_line)
								print "consensus: {0}".format(consensus)
								print "consensus items: {0}".format(consensus_items)
								print "need classification: {0}".format(need_classification)
								print "decision: {0}".format([decision])
								print "new matchers: {0}".format(new_matchers)
								raw_input()
							for item in need_classification:
								if item not in category_mapping:
									not_found.update([item])
								else:
									if category_mapping[item] == "":
										category_mapping[item] = decision
										classified.update([item])
	
	if show_not_found:
		print "Not found:"
		print not_found
	
	if len(delparent) > 0:
		print "delparent"
		print delparent
	
	if len(other) > 0:
		print "consensus new flags:"
		print [x for x in other if x not in checker]
		
	
	print "Classified {0} items total by consensus processing".format(len(classified))
	return category_mapping

def process_lots_of_parents_classifications(category_mapping):
	"""Processes "lots of parents"/parent_counts classification files"""
	
	matchers_to_use = set()
	added = set()
	seen = set()
	checker = all_matchers_checker()
	
	for fn in listdir('.'):
		if ('cx' in fn) and ('parent_counts' in fn):
			if 'pass' in fn:
				with copen(fn, encoding='utf8') as f:
					data = f.read()
					data = data.split('article:')[1:]
					
					for entry in data:
						entry = entry.split('\n')
						article = entry[0].replace('\t', '')
						decision = entry[2].split('\t')[1:]
						
						if decision[0] != "":
							choice = decision[0]
							
							if article in category_mapping:
								seen.update([article])
								if category_mapping[article] == "":
									category_mapping[article] = choice
									added.update([article])
							
							#matchers
							for x in decision[1:]:
								if x != "":
									if x not in checker:
										matchers_to_use.update([x])
	
	if len(matchers_to_use) > 0:
		print "Matchers to add:"
		print matchers_to_use
	
	print "Saw {0} but added {1} classifications via 'lots of parents' method".format(len(seen), len(added))
	
	return category_mapping

def process_suffix_classifications(category_mapping):
	"""Processes cx_suffix pass files"""
	
	classified = 0
	mapping = {}
	
	for fn in listdir("."):
		if 'suffix' in fn:
			if 'pass' in fn:
				with copen(fn, encoding='utf8') as f:
					for line in f:
						if len(line) > 3:
							#(u'culture', 303)	society
							#(u'organizations', 255)
							line = line[:-1]
							suffix = line.split("'")[1]
							decision = line.split('\t')
							if len(decision) > 1:
								if decision[1] != "":
									mapping[suffix] = decision[1]
	
	for wiki, iab in category_mapping.iteritems():
		if iab == "":
			components = wiki.split('_')
			if len(components) > 1:
				if components[-1] in mapping:
					category_mapping[wiki] = mapping[components[-1]]
					classified += 1
	
	print "Classified {0} items using suffix maps".format(classified)
	
	return category_mapping

def process_prefix_classifications(category_mapping):
	"""Processes cx_prefix pass files"""
	
	classified = 0
	mapping = {}
	
	for fn in listdir("."):
		if 'prefix' in fn:
			if 'pass' in fn:
				with copen(fn, encoding='utf8') as f:
					for line in f:
						if len(line) > 3:
							#(u'culture', 303)	society
							#(u'organizations', 255)
							line = line[:-1]
							prefix = line.split("'")[1]
							decision = line.split('\t')
							if len(decision) > 1:
								if decision[1] != "":
									mapping[prefix] = decision[1]
	
	for wiki, iab in category_mapping.iteritems():
		if iab == "":
			components = wiki.split('_')
			if len(components) > 1:
				if components[-1] in mapping:
					category_mapping[wiki] = mapping[components[-1]]
					classified += 1
	
	print "Classified {0} items using prefix maps".format(classified)
	
	return category_mapping

def process_everything(category_mapping):
	"""Processes everything files"""
	
	classified = 0
	
	for fn in listdir("."):
		if 'everything' in fn:
			if 'pass' in fn:
				with copen(fn, encoding='utf8') as f:
					for line in f:
						if len(line) > 3:
							line = line[:-1].split('\t')
							category = line[0]
							decision = line[1]
							if decision != "":
								if category in category_mapping:
									if category_mapping[category] == "":
										category_mapping[category] = decision
										classified += 1
	
	print "Classified {0} using process_everything".format(classified)
	
	return category_mapping

#auto classify

def classify_using_components(cam, category_mapping):
	"""Auto classifies things based on prefixes and suffixes"""
	
	classified = 0
	
	enders = {} #have to switch from k-v to v-k
	for k,v in partial_matchers['enders'].iteritems():
		for x in v:
			enders[x] = k
	
	#first iterate through all_child matchers
	for k,v in partial_matchers['all_children'].iteritems():
		if k in category_mapping:
			category_mapping[k] = v
			classified += 1
		if k in cam:
			for child in cam[k]:
				if child in category_mapping:
					if category_mapping[child] == "":
						category_mapping[child] = v
						classified += 1
	
	mapping = {}
	
	#iterate through everything, assigning starters, enders and 'anything' matchers
	print "cam is of size {0}".format(len(cam))
	for n, (parent, articles) in enumerate(cam.iteritems()):
		
		parent_assigned = False
		if parent not in mapping:
			
			for ender, mapto in enders.iteritems():
				if parent.endswith(ender):
					mapping[parent] = mapto
					parent_assigned = mapto
					classified += 1
					break
			
			if not parent_assigned:
				for starter, mapto in partial_matchers['starters'].iteritems():
					if parent.startswith(starter):
						mapping[parent] = mapto
						parent_assigned = mapto
						classified += 1
						break
				
			if not parent_assigned:
				for k,v in partial_matchers['anything'].iteritems():
					if k in parent:
						mapping[parent] = v
						parent_assigned = v
						classified += 1
						break
		else:
			if parent in category_mapping:
				parent_assigned = category_mapping[parent]
		
		for child in articles:
			if child not in mapping:
				child_assigned = False
				
				for ender, mapto in enders.iteritems():
					if child.endswith(ender):
						mapping[child] = mapto
						child_assigned = mapto
						classified += 1
						break
				
				if not child_assigned:
					for starter, mapto in partial_matchers['starters'].iteritems():
						if child.startswith(starter):
							mapping[child] = mapto
							child_assigned = mapto
							classified += 1
							break
					
				if not child_assigned:
					for k,v in partial_matchers['anything'].iteritems():
						if k in child:
							mapping[child] = v
							child_assigned = v
							classified += 1
							break
				
				if not child_assigned:
					if parent_assigned:
						mapping[child] = parent_assigned
						classified += 1
		
		if n % 100000 == 0:
			print "Processed {0} components, mapping size is {1}".format(n, len(mapping))

	#now transfer mappings to real mappings
	for k,v in mapping.iteritems():
		if k in category_mapping:
			if category_mapping[k] == "":
				category_mapping[k] = v
	
	print "Classified {0} entries based on starters and enders".format(classified)
	
	return category_mapping

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

def classify_geo_locations(category_mapping, cam):
	"""Revised geo classifications"""
	
	#things must contain at least 1 country or state
	#and at least one geo matchers
	
	geo_matchers = geo['matchers']
	countries = geo['countries']
	states = geo['states']
	
	useful = set()
	print "cam size is {0}".format(len(cam))
	for n, (category, articles) in enumerate(cam.iteritems()):
		articles.update([category])
		for article in articles:
			for matcher in geo_matchers:
				if matcher in article:
					useful.update([article])
					break
		if n % 100000 == 0:
			print "Processed {0} cam items for geo".format(n)
	
	print "Found {0} useful entries for geo classification".format(len(useful))
	
	mapping = {}
	
	for item in useful:
		for country in countries:
			if country in item:
				mapping[item] = country			
				break
	
	for item in useful:
		for state in states:
			if state in item:
				mapping[item] = 'usa'
	
	to_add = {}
	for category, classification in mapping.iteritems():
		if category in cam:
			for child in cam[category]:
				to_add[child] = mapping[category]
	
	#now combine
	for k,v in to_add.iteritems():
		mapping[k] = v
	
	seen = 0
	total = 0
	#now add to category_mapping
	for k,v in mapping.iteritems():
		if k in category_mapping:
			seen += 1
			if category_mapping[k] == "":
				category_mapping[k] = v
				total += 1
	
	print "Geo: saw {0} items, classified {1}".format(seen, total)
	
	return category_mapping

def assign_iab_categories(ckm, cam):
	"""Tries to automatically assign IAB categories to the wiki categories.
	This is either by doing lookups in the list of hand classified categories or by existing rules
	Outputs stats and returns a dictionary wiki:iab which is generally called category_mappings in the module"""
	
	#get original hand classified mappings (those classified previously as deletions were already removed during the pruning phase)
	from new_mappings import new_mappings
	
	#iterate through ckm and try to classify as many as possible from the hand classifications
	wiki_iab = {}
	for category in ckm.iterkeys():
		wiki_iab[category] = new_mappings[category] if category in new_mappings else ""
	
	#now try and find geographical locations
	wiki_iab = classify_geo_locations(wiki_iab, cam)
	
	#process components
	wiki_iab = classify_using_components(cam, wiki_iab)
	
	#process hand classifications
	wiki_iab = process_consensus_classifications(wiki_iab, show_not_found=True)
	wiki_iab = process_blank_classifications(wiki_iab, show_not_found=True)
	wiki_iab = process_lots_of_parents_classifications(wiki_iab)
	wiki_iab = process_suffix_classifications(wiki_iab)
	wiki_iab = process_prefix_classifications(wiki_iab)
	wiki_iab = process_everything(wiki_iab)
	
	#infer child classifications
	wiki_iab = classify_children_as_parents(wiki_iab, cam); print "omg 10" if '' in wiki_iab else 'nope not there'
	
	print "Still have to classify {0}/{1} wiki-iab".format(len([k for k,v in wiki_iab.iteritems() if v == ""]), len(wiki_iab))
	return wiki_iab

#saving

def save_payload_items(category_mapping, mozcat_heirarchy):
	"""Saves the arguments to both json and python"""
	
	#clear empties from category mapping
	empty = set([k for k,v in category_mapping.iteritems() if v == ""])
	for x in empty:
		del category_mapping[x]
	
	#save to json
	with copen('new_mappings.json', 'w', encoding='utf8') as f:
		f.write("new_mappings = " + dumps(category_mapping))
	
	with copen('mozcat_heirarchy.json', 'w', encoding='utf8') as f:
		f.write("tree = " + dumps(mozcat_heirarchy))
	
	#save to python
	with copen('new_mappings.py', 'w', encoding='utf8') as f:
		f.write("new_mappings = " + dumps(category_mapping))
	
def generate_payload(ckm, category_mapping):
	"""Actually generates a new payload
		This is basically anything in the category keyword matrix that exists in the category mapping"""
	
	#eliminate those not in the category mapping
	to_save = {}
	for k,v in ckm.iteritems():
		if k in category_mapping:
			to_save[k] = v
	
	#now save
	with copen('new_payload.json', 'w', encoding='utf8') as f:
		dump(to_save, f)
	
	print "Saved to new_payload.json"
	#////////////////////////NOTE FOR TOMORROW:
	#code written to generate new payload.
	#rerun this whole module.
	#save new mappings, payload etc,
	#then rerun on NYTimes links. see how it goes.
	#Next up is persistent store (in SQLITE?),
	#then more hand classification
	

#handle all the functions

def create_payload():
	"""Handler function"""
	
	category_article_matrix = generate_payload.load_category_article_matrix() #Found 753,062 categories total
	topic_signatures = generate_payload.load_topic_signatures() #Total: 3,495,585 articles
	category_keyword_matrix = generate_payload.create_category_keyword_matrix(category_article_matrix, topic_signatures)
	
	#clear some memory
	topic_signatures = 0
	
	#now prune stopwords and useless categories
	#tmp = prune(category_keyword_matrix)
	category_keyword_matrix = generate_payload.prune(category_keyword_matrix) # beforehand: 657397 categories .... after: 34959 categories (deleted 623205)
	
	#now auto assign IAB categories to each category
	category_mapping = generate_payload.assign_iab_categories(category_keyword_matrix, category_article_matrix)
	
	#make sure the categories aren't mistakes
	category_mapping, mozcat_heirarchy = generate_payload.resolve_mistakes(category_mapping)
	
	#save the new category_mapping and mozcat_heirarchy
	generate_payload.save_payload_items(category_mapping, mozcat_heirarchy)
	
	#now export those that need to be hand classified
	#find_children_with_lots_of_children(category_mapping, cam)
	#generate_payload.find_consensus_classifications(category_article_matrix, category_mapping)
	#generate_payload.find_blank_parents(category_article_matrix, category_mapping)
	#generate_payload.find_unclassified_categories_with_lots_of_parents(category_article_matrix, category_mapping)
	#generate_payload.find_all_unclassified(category_mapping)
	
	#now actually generate a new payload
	generate_payload.generate_payload(category_keyword_matrix, category_mapping)
