#!/usr/bin/env python
# -*- coding: utf8 -*-

#Generates a payload file

from ast import literal_eval
from codecs import open as copen
from collections import defaultdict
from itertools import chain
from json import load, dumps, dump
from os import listdir
from pdb import set_trace
from re import findall, match
from math import sqrt


stopwords = set(['secondly', 'all', 'consider', 'whoever', 'four', 'edu', 'go', 'causes', 'seemed', 'rd', 'certainly', 'vs', 'to', 'asking', 'th', 'under', 'sorry', 'sent',
					 'far', 'every', 'yourselves', 'went', 'did', 'forth', 'try', 'says', 'yourself', 'likely', 'further', 'even', 'what', 'appear', 'brief', 'goes', 'sup', 'new',
					 'ever', 'hasn', 'whose', 'respectively', 'never', 'here', 'shouldn', 'let', 'others', 'alone', 'along', 'quite', 'allows', 'howbeit', 'usually', 'whereupon',
					 'changes', 'thats', 'hither', 'via', 'followed', 'merely', 'while', 'viz', 'everybody', 'use', 'from', 'would', 'contains', 'two', 'next', 'few', 'therefore',
					 'taken', 'themselves', 'thru', 'tell', 'more', 'knows', 'becomes', 'hereby', 'herein', 'everywhere', 'particular', 'known', 'must', 'me', 'none', 'this', 'oh',
					 'anywhere', 'nine', 'can', 'theirs', 'following', 'my', 'example', 'indicated', 'indicates', 'something', 'want', 'needs', 'rather', 'meanwhile', 'how', 'instead',
					 'okay', 'tried', 'may', 'after', 'different', 'hereupon', 'such', 'a', 'third', 'whenever', 'maybe', 'appreciate', 'ones', 'so', 'specifying', 'allow',
					 'keeps', 'six', 'help', 'indeed', 'over', 'mainly', 'soon', 'course', 'through', 'looks', 'still', 'its', 'before', 'thank', 'thence', 'selves', 'inward',
					 'll', 'actually', 'better', 'willing', 'thanx', 'ours', 'might', 'then', 'non', 'someone', 'somebody', 'than', 'they', 'not', 'now', 'nor', 'several',
					 'hereafter', 'always','reasonably', 'didn', 'whither', 'each', 'entirely', 'mean', 'everyone', 'doing', 'eg', 'weren', 'ex', 'our', 'beyond', 'out', 'them',
					 'furthermore', 'since', 'looking', 're', 'seriously', 'got', 'cause', 'thereupon', 'given', 'like', 'que', 'besides', 'ask', 'anyhow', 'couldn', 'could',
					 'tries', 'keep', 'isn', 'ltd', 'hence', 'onto', 'think', 'first', 'already', 'seeming', 'thereafter', 'one', 'done', 'another', 'wasn', 'awfully', 'little',
					 'their', 'accordingly', 'least', 'name', 'anyone', 'indicate', 'too', 'gives', 'mostly', 'behind', 'nobody', 'took', 'immediate', 'regards', 'somewhat', 'off',
					 'believe', 'herself', 'haven', 'specify', 'unfortunately', 'gotten', 'second', 'i', 'were', 'toward', 'are', 'and', 'beforehand', 'say', 'unlikely', 'have', 'need',
					 'seen', 'seem', 'saw', 'any', 'relatively', 'zero', 'thoroughly', 'latter', 'that', 'downwards', 'aside', 'thorough', 'also', 'take', 'which', 'exactly', 'unless',
					 'shall', 'who', 'most', 'eight', 'but', 'nothing', 'why', 'sub', 'don', 'especially', 'noone', 'later', 'm', 'yours', 'definitely', 'normally', 'came', 'saying',
					 'particularly', 'anyway', 'fifth', 'hadn', 'outside', 'should', 'only', 'going', 'do', 'his', 'above', 'get', 'between', 'overall', 'truly', 'cannot', 'nearly',
					 'despite', 'during', 'him', 'regarding', 'qv', 'twice', 'she', 'contain', 'where', 'thanks', 'ignored', 'namely', 'anyways', 'best', 'wonder', 'said', 'away',
					 'currently', 'please', 'enough', 'won', 'various', 'hopefully', 'probably', 'neither', 'across', 'available', 'we', 'useful', 'however', 'come', 'both', 'c',
					 'last', 'many', 'whereafter', 'according', 'against', 'etc', 's', 'became', 'com', 'comes', 'otherwise', 'among', 'presumably', 'co', 'afterwards', 'seems',
					 'whatever', 'hers', 'moreover', 'throughout', 'considering', 'sensible', 'described', 'three', 'been', 'whom', 'much', 'wherein', 'hardly', 'wants', 'corresponding',
					 'latterly', 'concerning', 'else', 'former', 'those', 'myself', 'novel', 'look', 'these', 'value', 'will', 'near', 'ain', 'theres', 'seven', 've', 'wouldn',
					 'almost', 'wherever', 'is', 'thus', 'it', 'cant', 'itself', 'in', 'ie', 'if', 'containing', 'thereby', 'perhaps', 'insofar', 'same', 'clearly', 'beside',
					 'when', 'gets', 'used', 'see', 'somewhere', 'upon', 'uses', 'kept', 'whereby', 'nevertheless', 'whole', 'well', 'anybody', 'obviously',
					 'without', 'very', 'the', 'self', 'know', 'lest', 'just', 'less', 'being', 'able', 'liked', 'greetings', 'regardless', 'yes', 'yet', 'unto', 'had', 'except',
					 'has', 'ought', 'around', 'possible', 'five', 'mon', 'using', 'apart', 'necessary', 'd', 'follows', 't', 'become', 'towards', 'therein', 'because', 'old',
					 'often', 'some', 'somehow', 'sure', 'specified', 'ourselves', 'happens', 'for', 'though', 'per', 'everything', 'does', 'provides', 'tends', 'either', 'be',
					 'nowhere', 'although', 'by', 'on', 'about', 'ok', 'anything', 'getting', 'of', 'whence', 'plus', 'consequently', 'or', 'seeing', 'own', 'formerly', 'into',
					 'within', 'down', 'appropriate', 'right', 'your', 'her', 'aren', 'there', 'inasmuch', 'inner', 'way', 'was', 'himself', 'elsewhere', 'becoming', 'amongst',
					 'hi', 'trying', 'with', 'he', 'whether', 'wish', 'up', 'us', 'until', 'placed', 'below', 'un', 'gone', 'sometimes', 'associated', 'certain', 'am', 'doesn', 'an',
					 'as', 'sometime', 'at', 'et', 'inc', 'again', 'no', 'whereas', 'nd', 'lately', 'other', 'you', 'really', 'welcome', 'together', 'having', 'serious', 'hello', 'once'])

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
		'architectural': 'architecture',
		'gospel': 'christianity',
		'military': 'military',
		'musical': 'music',
		'biblical': 'christianity',
		u'universities_and_colleges': 'university',
		'afc': 'soccer',
		u'singers_from': 'music',
		u'mathematical': 'mathematics',
		'programming': 'programming',
		'wars': 'military',
		'plants_with': 'botany',
		'jesus': 'christianity',
		'planetary': 'astronomy',
		'bdsm': 'sexuality',
		
	},
	'enders': {
		'agriculture': set(['agriculture']),
		'air travel': set(['aircraft']),
		'animals': set(['fish', u'sphodromantis', u'strepsiptera', u'thrips', u'megaloptera', 'lice', 'flies', u'tarachodes', u'rivetina', u'phasmatodea', u'miomantis', u'mirosternus', u'psocoptera', 'earwigs', u'plecoptera', u'oxyothespis', u'adephaga', u'polyphaga', 'cockroaches', 'beetles', u'eremiaphila', u'rhombodera', 'termites', u'cimicomorpha', u'acromantis', u'amantis', u'xyletobius', 'fleas', 'mayflies']),
		'anthropology': set(['peoples', 'tribe', 'clan']),
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
		'horse_racing': set([u'horse_racing']),
		'judaism': set(['rabbis']),
		'law': set(['law', 'lawyers']),
		'languages': set(['languages']),
		'literature': set(['literature', 'fiction', 'novels', 'books', 'writers']),
		'military': set(['warfare', 'weapons', 'war']),
		'movies': set(['films']),
		'music': set(['music', 'musical_groups', 'singers', 'composers', 'musicians', 'orchestras', 'albums', 'guitarists', 'songs', 'rock', 'punk', 'quintets', u'music_genres', u'musicians', u'records_artists']),
		'news': set(['newspapers']),
		'philosophy': set(['philosophy', 'philosophers']),
		'poetry': set(['poets', 'poems']),
		'politics': set(['_republicans', 'democrats', 'politicians', u'nationalism', u'uk_mps']),
		'physics': set(['_physicists']),
		'religion': set(['gods']),
		'soccer': set(['footballers', 'f.c.', 'a.f.c.']),
		'television': set(['television_series']),
		'trains': set(['railroads', 'locomotives']),
		'university': set(['university', 'universities']),
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
					  u'news_corporation_subsidiaries', u'economy_of_maharashtra', u's&p_cnx_nifty', u'american_people_of_english_descent', u'motorboat_racing', u'ufo_religions', 'sloan_fellowship', u'submarine_bases',
					  u'video_game_companies_of_the_united_kingdom', u'neoclassical_palaces', u'autumn_holidays', u'pacific_ocean', u'water_management', u'twin_cities', u'media_companies_of_japan', u'euphemisms',
					  u'1803_disestablishments', u'holding_companies_of_norway', u'autumn_festivals', u'populated_places_established_in_1956', u'populated_places_established_in_1850', u'high-technology_business_districts',
					  u'historical_hindu_kingdoms', u'states_and_territories_established_in_1815', u'french_psychoanalysts', u'ice_skating', u'populated_places_established_in_1818', u'biosphere_reserves_of_germany',
					  u'carpathian_ruthenia', u'electronics_companies_of_the_united_kingdom', u'embedded_operating_systems', u'former_nationalised_industries_of_the_united_kingdom', u'companies_based_in_california',
					  u'companies_established_in_1988', u'mass_media', u'sports_clubs_established_in_1993', u'significant_places_in_mormonism', u'populated_places_established_in_1883']
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
	occupations = u"ists inas als oets ity ics ians ers ists es ors ars js nts ds eople ats eens ings ces cesses esses msps mps ews iahs".split()
	
	if "_" in text:
		text = text.split("_")
		for nation in nations:
			if text[0].endswith(nation):
				for occupation in occupations:
					if text[1].endswith(occupation):
						return True
	return False

def matches_occupation(text):
	"""Copied from larger version"""
	occupations = u"ists inas als oets ity ics ians ers ists es ors ars js nts ds eople ats eens ings ces cesses esses msps mps ews iahs".split()
	
	if "_" in text:
		text = text.split("_")
		for occupation in occupations:
			if text[-1].endswith(occupation):
				return True
	return False

def matches_nation(text):
	"""Copied from larger version"""
	nations = u"-american por bi can ais lav van 's tis sex rdu ogp eda ndu lan lay ara ese ian ish an qi ch ss li no can ean ad iet oo ee lsh ari iac land yan sey ni eek male female lgbt".split()
	
	if "_" in text:
		text = text.split("_")
		for nation in nations:
			if text[0].endswith(nation):
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
	
	"""
	
	#first load the heirarchy into memory
	with open('mozcat_heirarchy.json') as f:
		tree = load(f)
		
		all_cats = set() #change tree's lists to sets since these avoid dupes
		for top,subs in tree.iteritems():
			all_cats.update([top])
			all_cats.update(subs)
		
		for top_level in tree.iterkeys():
			tree[top_level] = set(tree[top_level])
	
	#remove things from the taxonomy that we know aren't used
	sub_cat_remove = set([u'cell phones', u'hotel', u'graduate school', u'local news', u'windows ', u'north_korea', u'greenland', u'sri_lanka', 'greenland'])
	top_level_remove = set([])
	
	for x in top_level_remove:
		if x in all_cats:
			all_cats.remove(x)
		if x in tree:
			del tree[x]
	
	for x in sub_cat_remove:
		if x in all_cats:
			all_cats.remove(x)
		for k,v in tree.iteritems():
			if x in v:
				tree[k].remove(x)
	
	#now clean up some of the mappings that contain extra whitespace, upper case, underscores etc
	cleaned = {}
	for k,v in category_mapping.iteritems():
		v = v.replace("_", " ").strip().lower()
		cleaned[k] = v #insert
	category_mapping = cleaned
	cleaned = 0 #free up memory
	
	
	#these are basic corrections:
	corrections = {
		u'al-azhar_university': 'university',
		u'achievement_tests': 'education',
		u'lichtenfels_(district)': 'germany',
		u'labor_schools': 'del',
		u'metopoceras': 'del',
		u'sotogahama,_aomori': 'japan',
		u'sourdough_breads': 'baking',
		u'ishinomaki_line': 'trains',
		u'exhibition_designers': 'del',
		u'west_lancashire': 'united kingdom',
		u'unesco_directors-general': 'del',
		u'geum_(plant)': 'botany',
		u'bled': 'del',
		u'oklahoma_statutes': 'del',
		u'oman-related_lists': 'oman',
		u'dutch-speaking_countries': 'netherlands',
		u'somalia-related_lists': 'somalia',
		u'meitetsu_group': 'del',
		u'rai_(broadcaster)': 'television',
		u'kuwait-related_lists': 'kuwait',
		u'amphetamine_alkaloids': 'del',
		u'welfare_reform': 'del',
		u'sports_ministries': 'del',
		u'muraena': 'del',
		u'nationalization': 'del',
		u'zambia-related_lists': 'zambia',
		u'sage_group': 'del',
		u'presidential_scholars': 'del',
		u'dental_examinations': 'dental care',
		u'media_industry': 'del',
		u'bucharest-related_lists': 'hungary',
		u'canadian_tire': 'del',
		u'olive_cultivars': 'del',
		u'http_clients': 'internet technology',
		u'hominina': 'del',
		u'combination_events': 'del',
		u'callionima': 'del',
		u'dental_consonants': 'del',
		u'naples-related_lists': 'italy',
		u'lada_vehicles': 'del',
		u'mexican-american_cuisine': 'american cuisine',
		u'nakano,_tokyo': 'japan',
		u'night_lizards': 'reptiles',
		u'belize-related_lists': 'belize',
		u'germanic_studies': 'germany',
		u'joinville': 'del',
		u'mexborough': 'del',
		u'tajik_cuisine': 'food & drink',
		u'syria-related_lists': 'syria',
		u'luxembourg-related_lists': 'luxembourg',
		u'twin_studies': 'pregnancy',
		u'thysanura': 'del',
		u'zoologists': 'del',
		u'ter_alsace': 'del',
		u'botswana-related_lists': 'botswana',
		u'togo-related_lists': 'togo',
		u'schizophrenia-related_organisations': 'psychology & psychiatry',
		u'yemen-related_lists': 'yemen',
		u'dymi': 'del',
		u'schreder_aircraft': 'air_travel',		
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
		'saskpower': 'energy', 'slave_trade': 'history', 'hospitality_companies': 'hotels', 'agent-owned_companies': 'del', 'food_companies': 'business', 'photography_companies': 'photography',
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
		u'postcard publishers': 'del',
		u'sloan_fellowship': 'del',
		u'english_drama': 'del',
		u'english_poetry': 'del',
		u'natural_units': 'del',
		u'measurement': 'del',
		u'mcclatchy_publications': 'del',
		u'error': 'del',
		u'dimensional_analysis': 'del',
		u'metrology': 'del',
		u'midlatitude_weather': 'weather',
		u'meteorological_stations': 'weather',
		u'itv_weather': 'weather',
		u'weather': 'weather',
		u'anomalous_weather': 'weather',
		'meteorology': 'weather',
		u'pathological_science': 'del',
		u'mud\xe9jar_architecture': 'architecture',
		u'ch\xe2teauesque_architecture': 'architecture',
		u'revues': 'del',
		u'norse-gaels': 'del',
		u'transliteration': 'del',
		u'man-eaters': 'del',
		u'ptolemaic_court': 'del',
		u'motorcycle_racing': 'motorcycles',
		u'rally_racing': 'motorcycles',
		u'pigeon_racing': 'del',
		u'skeleton_racing': 'del',
		u'boat_racing': 'sailing',
		u'motorboat_racing': 'sailing',
		u'cycle_racing': 'cycling',
		u'greyhound_racing': 'dogs',
		u'air_racing': 'del',
		u'knowledge_engineering': 'del',
		u'hellenistic_engineering': 'del',
		u'fire_protection': 'del',
		u'coastal_engineering': 'del',
		u'home_automation': 'home appliances',
		u'building_engineering': 'construction',
		u'petroleum_engineering': 'energy',
		u'aerospace_engineering': 'military',
		u'aerospace_materials': 'military',
		u'mechanical_engineering': 'mechanics',
		u'transport_engineering': 'del',
		u'cost_engineering': 'del',
		u'software_engineering': 'computer programming',
		u'automotive_engineering': 'auto parts',
		u'civil_engineering': 'mechanics',
		u'power_engineering': 'del',
		u'diving_engineering': 'del',
		u'mining_engineering': 'mining',
		u'pavement_engineering': 'del',
		u'dbs_bank': 'investing',
		u'method_engineering': 'del',
		u'offshore_engineering': 'del',
		u'neural_engineering': 'del',
		u'superhero_fiction': 'comics',
		u'polish\u2013soviet_war': 'military',
		u'car_windows': 'auto parts',
		u'a\xe9rospatiale_aircraft': 'air travel',
		u'russia\u2013georgia_war': 'military',
		u'windows_xp': 'windows',
		u'microsoft_windows': 'windows',
		u'gothic_fiction': 'literature',
		u'yuma_war': 'military',
		u'm\u0101ori_history': 'new zealand',
		u'robotics_events': 'physics',
		u'medical_robotics': 'biotech',
		u'industrial_robotics': 'physics',
		u'oda_clan': 'japan',
		u'archie_comics': 'comics',
		u'maeda_clan': 'japan',
		u'ethnic_humor': 'humor',
		u'computer_humor': 'humor',
		u'surface_mining': 'mining',
		u'uranium_mining': 'mining',
		u'tin_mining': 'mining',
		u'web_humor': 'internet culture',
		u'underground_mining': 'mining',
		u'coal_mining': 'mining',
		u'professional_humor': 'humor',
		u'm\u0101ori_music': 'music',
		u'd\u014djin_music': 'music',
		u'copper_mining': 'mining',
		u'lead_mining': 'mining',
		u'silver_mining': 'mining',
		u'book_collecting': 'literature',
		'postcard_publishers': 'del'
	}
	
	for wiki, iab in corrections.iteritems():
		category_mapping[wiki] = iab
	
	#these are completely new sub categories to add to the ontology
	#they need to be nested under existing top level categories
	new_sub_categories = {
		u'golf': 'nest_sports','hockey': 'nest_sports',u'tennis': 'nest_sports','cricket': 'nest_sports',
		u'rugby': 'nest_sports',u'volleyball': 'nest_sports', u'skating': 'nest_sports', u'darts': 'nest_sports',
		
		'university': 'nest_education',
		'writing': 'nest_hobbies & interests',u'scouting': 'nest_hobbies & interests',
		u'stamps': 'nest_hobbies & interests',
		u'cardiac arrest': 'nest_health & fitness',u'smoking cessation': 'nest_health & fitness',
		u'windows': 'nest_technology & computing',
		'theatre': 'nest_arts & entertainment',
		u'journalism': 'nest_news',
		'weather': 'nest_news',
		u'fencing': 'nest_sports',
		u'sociology': 'nest_society',
		u'design': 'nest_arts & entertainment',
		u'chinese cuisine': 'nest_food & drink',
		u'weather': 'nest_news',
		u'rowing': 'nest_sports',
		'hotels': 'nest_travel',
		u'mining': 'nest_business', u'shipping': 'nest_business',
		u'cats': 'nest_pets',
		'energy': 'nest_business',
		'cellphones': 'nest_technology & computing',
		'motorcycles': 'nest_automotive',
		
		'kosovo': 'nest_travel','north korea': 'nest_travel','senegal': 'nest_travel','gabon': 'nest_travel','guinea': 'nest_travel','barbados': 'nest_travel','bhutan': 'nest_travel','micronesia': 'nest_travel','kuwait': 'nest_travel','belarus': 'nest_travel','liberia': 'nest_travel','latvia': 'nest_travel',
		'kyrgyzstan': 'nest_travel', 'haiti': 'nest_travel','zambia': 'nest_travel','lebanon': 'nest_travel','luxembourg': 'nest_travel',u'greenland': 'nest_travel','honduras': 'nest_travel','palau': 'nest_travel','mozambique': 'nest_travel',
		'armenia': 'nest_travel','kiribati': 'nest_travel','belize': 'nest_travel','tunisia': 'nest_travel','oman': 'nest_travel',u'colombia': 'nest_travel',
		'niger': 'nest_travel','fiji': 'nest_travel','comoros': 'nest_travel','slovenia': 'nest_travel','dominica': 'nest_travel','turkmenistan': 'nest_travel',
		'slovakia': 'nest_travel','suriname': 'nest_travel',u'bolivia': 'nest_travel','malawi': 'nest_travel','ecuador': 'nest_travel',
		'algeria': 'nest_travel','montenegro': 'nest_travel','togo': 'nest_travel','cambodia': 'nest_travel','ethiopia': 'nest_travel','argentina': 'nest_travel',
		u'yemen': 'nest_travel','portugal': 'nest_travel','lesotho': 'nest_travel','uganda': 'nest_travel','burundi': 'nest_travel',
		u'turkey': 'nest_travel','madagascar': 'nest_travel','antigua': 'nest_travel','mali': 'nest_travel', 'vanuatu': 'nest_travel',
		'trains': 'nest_travel','sri lanka': 'nest_travel',u'columbia': 'nest_travel','chad': 'nest_travel','mauritius': 'nest_travel',u'moldova': 'nest_travel',
		'botswana': 'nest_travel', 'congo': 'nest_travel',
		'theme parks': 'nest_travel'}
	
	for new_cat, under_what in new_sub_categories.iteritems():
		top_level = under_what[5:]
		if top_level not in all_cats:
			print "Nesting Stage: Mistake: {0} is a top level that doesn't exist in all_cats".format(top_level)
		else:
			tree[top_level].update([new_cat]) #nest
			all_cats.update([new_cat])
	
	#these are spelling mistakes that have been made in category names, not errors in the categorization themselves
	category_corrections = {
		'south korea': 'travel_south korea',
		'the_maldives': 'travel_maldives',
		'the central african republic': 'travel_central african republic',
		'the_czech_republic': 'travel_czech republic',
		'the_dominican_republic': 'travel_dominican republic',
		'sierra_leone': 'travel_sierra leone',
		'saint_kitts_and_nevis': 'travel_saint kitts and nevis',
		'the_bahamas': 'travel_the bahamas',
		'the_united_arab_emirates': 'travel_united arab emirates',
		'saint_lucia': 'travel_saint lucia',
		'burkina': 'travel_burkina faso',
		'the_united_kingdom': 'travel_united kingdom',
		'cape_verde': 'travel_cape verde',
		'east_timor': 'travel_east timor',
		u'Bosnia and Herzegovina': 'travel_bosnia and herzegovina',
		'trinidad_and_tobago': 'travel_trinidad and tobago',
		'the_marshall_islands': 'travel_the marshall islands',
		'el_salvador': 'travel_el salvador',
		'the_gambia': 'travel_the gambia',
		'the_central_african_republic': 'travel_central african republic',
		u'the republic of ireland': 'travel_ireland',
		u'the united arab emirates': 'travel_united arab emirates',
		'the czech republic': 'travel_czech republic',
		'the dominican republic': 'travel_dominican republic',
		'the philippines': 'travel_philippines',
		'the united states': 'travel_usa',
		'the maldives': 'travel_maldives',
		'the united kingdom': 'travel_united kingdom',
		u'ships': 'business_shipping',
		u'art history': 'arts & entertainment_fine art',
		u'aimals': 'biology_animals',
		u'telecommunication': 'cell phones',
		'hotel': 'travel_hotels',
		u'cooking techniques': 'food & drink_cooking',
		u'buddhist': 'religion_buddhism',
		u'metal': 'hobbies & interests_metalworking',
		u'potter': 'hobbies & interests_pottery',
		u'sleep disorders': 'health & fitness_sleeping disorders',
		'chemical mixtures': 'science_chemistry',
		'luxury car': 'automotive_luxury cars',
		u'children': 'education_parenting children',
		u'linguistics': 'education_languages',
		u'wales': 'travel_united kingdom',
		u'universitiy': 'education_university',
		'trucks': 'automotive_pickup trucks',
		'toddlers': 'education_parenting children',
		u'radio ': 'arts & entertainment_radio',
		u'psychology': 'health & fitness_psychology & psychiatry',
		'south_korea': 'travel_south korea',
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
		u'instruments': 'arts & entertainment_music',
		u'educatoin': 'education',
		u'surding': 'sports_surfing',
		u'anime': 'arts & entertainment_animation',
		u'theater': 'arts & entertainment_theatre',
		u'miltary': 'military',
		u'ballet': 'arts & entertainment_dance',
		u'dancing': 'arts & entertainment_dance',
		u'journalims': 'news_journalism',
		u'anthrpology': 'society_anthropology',
		u'lanaguages': 'education_languages',
		u'chemistr': 'science_chemistry',
		u'sport': 'sports',
		u'bird watching': 'hobbies & interests_birdwatching',
		u'foklore': 'folklore',
		u'litea': 'arts & entertainment_literature',
		u'motorcycling': 'automotive_motorcycles',
		'motorcycling': 'automotive_motorcycles',
		u'fashio': 'fashion',
		u'cell phones': u'technology & computing_cellphones',
		u'family': 'family & parenting',
	}
	
	for old,new in category_corrections.iteritems():
		#split up v
		new = new.split('_')
		if len(new) == 1: #process top level items with no subcat
			new = v[0]
			if new not in all_cats:
				all_cats.update([new])
				tree[new] = set([])
			
			for wiki in category_mapping.iterkeys():
				if category_mapping[wiki] == old:
					category_mapping[wiki] = new
		else:
			#v is in two parts
			top_level = v[0]
			sub_cat = v[1]
			
			#make sure top level exists
			if top_level not in all_cats:
				all_cats.update([top_level])
				tree[top_level] = set([])
			
			#make sure sub cat exists
			if sub_cat not in all_cats:
				all_cats.update([sub_cat])
				tree[top_level].update([sub_cat])
			
			#nest it
			for wiki in category_mapping.iterkeys():
				if category_mapping[wiki] == old:
					category_mapping[wiki] = sub_cat
	
	
	#now check for del or del(_)parent
	to_delete = set()
	del_matchers = set([u'de', u'dell',  u'de;', u'dek', 'del', 'del_parent', 'delparent', 'del parent'])
	for k,v in category_mapping.iteritems():
		if v in del_matchers:
			to_delete.update([k])
	
	for x in to_delete:
		del category_mapping[x]
	
	#check that there's nothing that's never been seen
	print "Unknown: " + unicode(set([v for k,v in category_mapping.iteritems() if v not in all_cats]))
	
	for k in tree.iterkeys(): #change sets to lists
		tree[k] = list(tree[k])
	
	used_cats = set(category_mapping.values())
	print "Un-used cats: {0}".format([x for x in all_cats if x not in used_cats])
	
	
	#consider removing travel category
	
	return category_mapping, tree

#optimal processing

def describe(ckm, cam, category_mapping, what):
	"""Describes a category"""
	print "{0} exist in category mapping, has value <{1}>".format(what, category_mapping[what]) if what in category_mapping else "{0} not in category mapping"
	print "{0} not in CKM".format(what) if what not in ckm else "{0} has {1} keywords in CKM:\n{2}".format(what, len(ckm[what]), ckm[what])
	print "{0} not in CAM".format(what) if what not in cam else "{0} has {1} child articles:\nIn CM: {2}\nDeleted: {3}".format(what, len(cam[what]), [x for x in cam[what] if (x in category_mapping) and (category_mapping[x] != '')], [x for x in cam[what] if x not in category_mapping])
	print "{0} is a child of parents: {1}".format(what, [x for x in cam if what in cam[x]])

def find_most_popular_words_for_each_IAB(category_mapping, ckm):
	"""Finds popular words for each category, suggests others containing them"""
	
	with open('mozcat_heirarchy.json') as f:
		tree = load(f)
		all_cats = [x for x in chain(*tree.values())] + tree.keys()
	
	#sort them v -> k
	buckets = defaultdict(list)
	kw_dists = defaultdict(lambda: defaultdict(int)) #kw counts per bucket
	for k,v in category_mapping.iteritems():
		if k in ckm:
			if v != "":
				buckets[v].append(k)
				for w,x in ckm[k].iteritems():
					kw_dists[v][w] += x #or just raw freq?
	
	#sort descending
	for k,v in kw_dists.iteritems():
		kw_dists[k] = set([x[0] for x in sorted(v.items(), key=lambda x: x[1], reverse=True)[:5]])
	
	#now find some more things
	sim = defaultdict(list) #say search top 5 kws?
	for k,v in category_mapping.iteritems():
		if v == "":
			if k in ckm:
				words = set(ckm[k])
				for category, kws in kw_dists.iteritems():
					islen = len(words.intersection(kws))
					if islen > 1:
						sim[category].append([k, islen])
	
	#now sort to get top matches
	#and save
	fn = 'cx_popular_words_similar_cats_1.txt'
	with copen(fn, 'w', encoding='utf8') as f:
		count = 0
		for k,v in sim.iteritems():
			relevant = sorted(v, key=lambda x:x[1], reverse=True)
			for x in relevant[:25]:
				f.write(u'{0}\t\t{1}?\n'.format(x[0], k))
				count += 1
	
	print "wrote {0} to {1}".format(count, fn)

def find_categories_with_most_words(ckm, category_mapping):
	"""Sorted descending"""
	a = [k for k,v in category_mapping.iteritems() if v == '']
	print "Found {0} empty items".format(len(a))
	a = [[x, len(ckm[x])] for x in a]
	a = sorted(a, key=lambda x: x[1], reverse=True)
	print "Returning 1000 of {0}".format(len(a))
	a = a[:1000]
	with copen('cx_everything_11.txt', 'w', encoding='utf8') as f:
		for x in a:
			f.write(u'{0}\t\t{1}\n'.format(x[0], x[1]))

def find_categories_with_the_most_individual_words(category_mapping, ckm):
	"""Sorted descending"""
	words = defaultdict(int)
	for k,v in ckm.iteritems():
		for x in v:
			words[x] += 1
	
	scores = defaultdict(int)
	for x in category_mapping.iterkeys():
		if category_mapping[x] == "":
			if x in ckm:
				for word in ckm[x]:
					if words[word] == 1:
						scores[x] += 1
	
	scores = sorted(scores.items(), key=lambda x: x[1], reverse=True)
	return scores

def find_categories_with_near_unique_words(category_mapping, ckm):
	"""WSYIWYG"""
	
	words = defaultdict(int)
	for k,v in ckm.iteritems():
		for x in v:
			words[x] += 1
	
	scores = defaultdict(int)
	for x in category_mapping.iterkeys():
		if category_mapping[x] == "":
			if x in ckm:
				for word in ckm[x]:
					if words[word] < 3:
						scores[x] += 1
	
	scores = sorted(scores.items(), key=lambda x: x[1], reverse=True)
	return scores

def find_deleted_consensus(category_mapping, cam, ckm):
	"""Finds categories where nearly all the children have been deleted.
	Using the compiled file for everything so might bring out something.
	A bit hard since it is difficult to tell if something was deleted."""
	
	fn = 'cx_all_everything_so_far_pass_20141015.txt'
	
	deleted = set()
	deleted.update(hand_deleted_categories())
	
	print "deleted is of length {0}".format(len(deleted))
	
	with copen(fn, encoding='utf8') as f:
		for line in f:
			if len(line) > 5:
				line = line[:-1].split('\t')
				if len(line) == 2:
					wiki = line[0]
					iab = line[1]
					if iab == 'del':
						deleted.update([wiki])
	
	print "Deleted is of length {0}".format(len(deleted))
	
	#calculate deletion consensus
	useful = {}
	stages = [0, 0, 0, 0]
	for category, articles in cam.iteritems():
		d = []
		blank = []
		for article in articles:
			if article in deleted:
				d.append(article)
			elif (article in category_mapping) and (category_mapping[article] == ''):
				blank.append(article)
			#elif article not in category_mapping:
			#	if article in ckm:
			#		if len(ckm[article]) >= 25:
			#			d.append(article)
			else:
				break
		stages[0] += 1
		if len(d) > 0:
			stages[1] += 1
			if len(blank) > 0:
				stages[2] += 1
				if len(d) + len(blank) == len(articles):
					stages[3] += 1
					useful[category] = [d, blank]
	
	print "Found {0} useful categories, stages: {1}".format(len(useful), stages)
	useful = sorted(useful.items(), key=lambda x: len(x[1][1]), reverse=True)
	
	with copen('cx_deleted_cons_1.txt', 'w', encoding='utf8') as f:
		for x in useful:
			f.write(u'###Category:\t\n'.format(x[0]))
			f.write(u'Deleted:\t{0}\n'.format(x[1]))
			f.write(u'Blank:\t{0}\n'.format(x[2]))
			f.write(u'All/incdel:\t\n\n')
	
	return useful

def find_things_that_sound_like_people(ender, category_mapping):
	"""E.g. something_players"""
	
	#find all the occupation suffixes
	enders = [k for k,v in category_mapping.iteritems() if (v=='') and k.endswith(ender)]
	
	#arrange by most common prefix
	prefixes = defaultdict(list)
	for x in enders:
		if "_" in x:
			prefix = x.split("_")[0]
			prefixes[prefix].append(ender)
	
	prefixes = sorted(prefixes.items(), key=lambda x: len(x), reverse=True)
	
	return prefixes

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
	
	with copen('cx_consensus_11.txt', 'w', encoding='utf8') as f:
		for x in suggestions:
			f.write(u'category:\t' + x[0] + u'\n')
			f.write(u'consensus:\t' + x[1]['consensus'] + u"\t(" + u', '.join(x[1]['consensus_items']) + u")\n")
			f.write(u'need classification:\t' + u'\t'.join(x[1]['blank']) + u"\n")
			f.write(u'all:\t\n\n')
	
	print "Outputted {0} suggestions - in cx_consensus_12.txt".format(len(suggestions))

def find_single_siblings_for_consensus(cam, category_mapping):
	"""Finds parents with a single classified child"""
	
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
					if len(classifications[consensus]) == 1:
						suggestions[parent]["blank"] = blank
						suggestions[parent]["consensus"] = consensus
						suggestions[parent]["consensus_items"] = classifications[consensus]
	
	suggestions = sorted(suggestions.items(), key=lambda x: len(x[1]['blank']), reverse=True)
	
	with copen('cx_consensus_single_sibling_1.txt', 'w', encoding='utf8') as f:
		for x in suggestions:
			f.write(u'category:\t' + x[0] + u'\n')
			f.write(u'consensus:\t' + x[1]['consensus'] + u"\t(" + u', '.join(x[1]['consensus_items']) + u")\n")
			f.write(u'need classification:\t' + u'\t'.join(x[1]['blank']) + u"\n")
			f.write(u'all:\t\n\n')
	
	print "Outputted {0} suggestions - in cx_consensus_single_sibling_1.txt".format(len(suggestions))

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
	
	with copen('cx_parent_counts_4.txt', 'w', encoding='utf8') as f:
		for article, parents in parent_counts:
			f.write(u"article:\t{0}\n".format(article))
			f.write(u"parents:\t{0}\n".format(u'\t'.join([x for x in parents])))
			f.write(u'Article IAB:\t\n')
			f.write(u'\n')
	
	print "outputted to cx_parent_counts_4.txt"

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

def find_all_unclassified(category_mapping, ckm):
	
	data = [[x, len(ckm[x])] for x in category_mapping if (x in ckm) and (category_mapping[x] == "")]
	data = sorted(data, key=lambda x:x[1], reverse=True)
	
	with copen('cx_all_9.txt', 'w', encoding='utf') as f:
		for x in data:
			f.write(u"{0}\t\t{1}\n".format(x[0], x[1]))
	
	print "outputted to cx_all_9.txt"

def find_words_unique_to_category(ckm, category_mapping):
	"""Finds words that are unique to a particular classification.
	Then, finds more unclassified categories that all contain that word that are unclassified"""
	
	#cm unc
	cm_unc = set([x for x in category_mapping if category_mapping[x] == ''])
	
	words = defaultdict(lambda: defaultdict(int))
	
	for category, keywords in ckm.iteritems():
		if category in category_mapping:
			if category_mapping[category] != "":
				for word in keywords:
					words[word][category_mapping[category]] += 1
	
	print "Processed {0} words".format(len(words))
	
	#now just get those that have 1 category, and more than 1 hit
	useful_words = {}
	for n, (word, categories) in enumerate(words.iteritems()):
		if len(categories) == 1:
			cat = categories.keys()[0]
			count = categories[cat]
			if count > 1:
				#how many have this keyword but are uncategorized?
				uncats = []
				for k in cm_unc:
					if word in ckm[k]:
						uncats.append(k)
				if len(uncats) > 0:
					if len(uncats) < 20:
						useful_words[word] = [cat, count, uncats]
		if n % 10000 == 0:
			print "Processed {0}/{1}, useful is of size: {2}".format(n, len(words), len(useful_words))
	
	words = 0 #clear memory
	
	#sort
	useful_words = sorted(useful_words.items(), key=lambda x: len(x[1][2]), reverse=True)[:500]
	print "returning {0} useful words".format(len(useful_words))
	
	fn = 'cx_keyword_cons_3.txt'
	
	with copen(fn, 'w', encoding='utf8') as f:
		for x in useful_words:
			f.write(u'###word {0} has been classified as <{1}> {2} times\n'.format(x[0], x[1][0], x[1][1]))
			f.write(u'blank:\t{0}\n'.format(x[1][2]))
			f.write(u'all:\t\n\n')
	
	print "outputted {0} to filename: {1}".format(len(useful_words), fn)

def find_most_common_suffixes(category_mapping):
	suffixes = defaultdict(int)
	for k,v in category_mapping.iteritems():
		if v == "":
			if '_' in k:
				k = k.split('_')
				suffixes[k[-1]] += 1
	
	suffixes = sorted(suffixes.items(), key=lambda x: x[1], reverse=True)
	return suffixes

def find_not_single_single_relationships(cam, category_mapping):
	"""Many categories, after pruning are 1 child within a parent, where the parent==child. Which ones aren't like that?"""
	
	#not effective at finding things
	
	ok = set()
	for category, articles in cam.iteritems():
		if category in category_mapping:
			if category_mapping[category] == "":
				if len([x for x in articles if x in category_mapping]) > 1:
						ok.update([category])
	
	#print len(ok)
	#for x in list(ok)[:15]:
	#	print x, [y for y in cam[x] if y in category_mapping]
	
	return ok

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

def find_stubs(cam, category_mapping):
	"""Finds stubs, i.e. parents with no parent and no children"""
	
	print "CAM is of length {0}".format(len(cam))
	
	#find definite top level parents
	parents = set(cam.keys())
	not_top_level = set()
	
	for parent, children in cam.iteritems():
		for child in children:
			if child in parents:
				not_top_level.update([child])
	
	top_level = [x for x in parents if x not in not_top_level]
	top_level_in_cm = [x for x in top_level if x in category_mapping]
	top_level_unclass = [x for x in top_level if (x in category_mapping) and (category_mapping[x] == '')]
	print "Found {0} truly top level items, {1} are in category mapping, {2} of which are unclassified".format(
			len(top_level),
			len(top_level_in_cm),
			len(top_level_unclass)
		)
	
	no_children = [x for x in top_level if len(cam[x]) == 0]
	print "Found {0} top level items with no children".format(len(no_children))
	
	one_child = [x for x in top_level if len(cam[x]) == 1]
	print "Found {0} top level items with one child".format(len(one_child))

def find_entries_with_single_frequencies(ckm, category_mapping):
	"""Finds categories where each associated keyword has a frequency of only 1"""
	
	single_counts = set()
	for category, keywords in ckm.iteritems():
		if sum(keywords.values()) == len(keywords):
			if category in category_mapping:
				if category_mapping[category] == "":
					single_counts.update([category])
	
	return single_counts

def find_entries_with_all_same_words(ckm, category_mapping):
	"""Groups entries with all the same words - either only unc-unc or unc-c as well"""
	
	#keys are represented as 1_45_99 etc
	entries = defaultdict(list)
	
	#create word:index database
	#create word_vector:[article, article] database
	words = defaultdict(int)
	for article in category_mapping.iterkeys():
		if article in ckm:
			r = []
			for k in ckm[article]:
				if k not in words:
					words[k] = len(words)
				r.append(words[k])
			r = '_'.join([str(x) for x in sorted(r)])
			entries[r].append(article)
	
	print "Found {0} different words".format(len(words))
	print "Found {0} different combinations".format(len(entries))
	
	already_set = {}
	for k in entries.keys():
		already_set[k] = set([int(x) for x in k.split('_')])
	
	#now have to calculate 90% similarity between the articles
	entries_keys = entries.keys()
	count = 0
	used = set()
	for n, word_vector in enumerate(entries_keys):
		word_vector_set = already_set[word_vector] #get set of word vector for quick comparisons 
		word_vector_length = float(len(word_vector_set))
		threshold = 0.5
		similar = set()
		intersection_percents = defaultdict(int)
		for other_word_vector in entries_keys[n+1:]:
			if other_word_vector != word_vector:
				other_word_vector_set = already_set[other_word_vector]
				intersection_size = float(len(word_vector_set.intersection(other_word_vector_set)))
				intersection_percent = intersection_size/word_vector_length
				
				if intersection_percent >= threshold:
					similar.update(entries[other_word_vector])
				
				intersection_percents[intersection_percent] += 1
		
		#print len(similar), sorted(intersection_percents.items(), reverse=True)[:5]
		
		if len(similar) > 1:
			similar = [x for x in similar if (x in category_mapping) and (category_mapping[x] == '')]
			similar += [x for x in entries[word_vector] if (x in category_mapping) and (category_mapping[x] == '')]
			if len(similar) > 1:
				count += 1
				used.update(similar)
				with copen('cx_keyword_intersection_8.txt', 'a', encoding='utf8') as f:
					f.write(unicode(similar))
					f.write(u'\nall:\t\n\n')
			
		if n % 250 == 0:
			print "Done {0}/{1}, written {2}, used {3}".format(n, len(entries), count, len(used))

def find_words_that_have_never_been_classified(category_mapping, ckm):
	"""Finds groups of categories with words that have never been classified"""
	
	#dataset of word: [cat, cat, cat]
	word_to_category = defaultdict(list)
	for category in category_mapping.iterkeys():
		if category in ckm:
			for word in ckm[category]:
				word_to_category[word].append(category)
	
	print "word to category has {0} words".format(len(word_to_category))
	
	#which ones are entirely made up of unclassified items?
	useful = {}
	used = set()
	for word, categories in word_to_category.iteritems():
		if len(categories) > 1:
			used.update(categories)
			ok = True
			for category in categories:
				if category in category_mapping:
					if category_mapping[category] != "":
						ok = False
						break
			if ok:
				useful[word] = categories
	
	word_to_category = 0 #clear memory
	print "Found {0} useful words, spanning {1} categories".format(len(useful), len(used))
	
	useful = sorted(useful.items(), key=lambda x: len(x[1]), reverse=True)
	
	fn = 'cx_unclassified_words_1.txt'
	with copen(fn, 'w', encoding='utf8') as f:
		for x in useful:
			f.write(u"\t\t<{0}> is in: {1}\n".format(x[0], x[1]))

def find_categories_with_most_surnames(category_mapping, ckm):
	
	surnames = set()
	with copen('surnames.txt', encoding='utf8') as f:
		for line in f:
			if len(line) > 1:
				line = line[:-1]
				line = line.lower()
				surnames.update([line])
	
	print "searching {0} surnames".format(len(surnames))
	
	useful = {}
	for category, mapping in category_mapping.iteritems():
		if mapping == "":
			if category in ckm:
				count = len([x for x in ckm[category] if x in surnames])
				if count > 0:
					useful[category] = [count, len(ckm[category]), float(count)/float(len(ckm[category]))]
	
	print "found {0} useful categories".format(len(useful))
	
	useful = sorted(useful.items(), key=lambda x: x[1][2], reverse=True)
	
	fn = 'cx_surname_spotter_2.txt'
	with copen(fn, 'w', encoding='utf8') as f:
		for x in useful:
			f.write(u"{0}\t\t{1}\t{2}\t{3}\n".format(x[0], x[1][0], x[1][1], x[1][2]))

def find_categories_where_children_are_mostly_names(category_mapping, ckm, cam):
	names = set()
	with copen('surnames.txt', encoding='utf8') as f:
		for line in f:
			if len(line) > 1:
				line = line[:-1]
				line = line.lower()
				names.update([line])
	
	print "searching {0} names".format(len(names))
	
	useful = {}
	for category, articles in cam.iteritems():
		if category in category_mapping:
			if category_mapping[category] == "":
				name_count = 0.0
				for article in articles:
					for word in article.split('_'):
						if word in names:
							name_count += 1
							break
				pc = name_count/float(len(articles))
				useful[category] = [pc, len(cam[category])]
	
	print "found {0} useful categories".format(len(useful))
	
	useful = sorted(useful.items(), key=lambda x: x[1][0], reverse=True)
	
	fn = 'cx_child_name_spotter_2.txt'
	with copen(fn, 'w', encoding='utf8') as f:
		for x in useful:
			f.write(u"{0}\t\t{1}\t{2}\n".format(x[0], x[1][0], x[1][1]))

def find_cosim_suggestions(category_mapping, ckm):
	"""Suggest a category based on cosine similarity - 2meta4me"""
	
	#build the tree
	with copen('mozcat_heirarchy.json', encoding='utf8') as f:
		tree = load(f)
		all_cats = set([x for x in chain(*tree.values())] + tree.keys())
	
	iab_vectors = defaultdict(lambda: defaultdict(int))
	to_classify = {}
	
	for wiki, iab in category_mapping.iteritems():
		if wiki in ckm:
			if iab == "":
				to_classify[wiki] = sqrt(sum([v**2 for k,v in ckm[wiki].iteritems()]))
			else:
				for word, count in ckm[wiki].iteritems():
					iab_vectors[iab][word] += count
	
	#calculate iab magnitudes
	iab_mags = {}
	for cat, kws in iab_vectors.iteritems():
		iab_mags[cat] = sqrt(sum([v**2 for k,v in kws.iteritems()]))
	
	#rest of cosim
	count = 0
	all_results = []
	for unc, mag in to_classify.iteritems():
		
		results = []
		
		for category, iab_kws in iab_vectors.iteritems():
			#dot product
			dot_product = 0
			for kw, value in ckm[unc].iteritems():
				if kw in iab_kws:
					dot_product += (value * iab_kws[kw])
			
			denominator = mag * iab_mags[category]
			if denominator != 0:
				similarity = dot_product / denominator
				results.append([category, similarity])
		
		if len(results) > 0:
			results = sorted(results, key=lambda x:x[1], reverse=True)
			results = results[:10]
			all_results.append([unc, results])
			count += 1
		
		if count % 100 == 0:
			print "done {0}/{1} in total".format(count, len(to_classify))

	
	all_results = sorted(all_results, key=lambda x: x[1][0][0], reverse=True) #sorted(all_results, key=lambda x: x[1][0][1], reverse=True)
	
	with copen('cx_cosim_10.txt', 'w', encoding='utf8') as f:
		for x in all_results:
			f.write(u"{0}\t\t{1}\n".format(x[0], u"\t".join([unicode(y[0])+"#"+unicode(round(y[1], 4)) for y in x[1]])))
	
	print "wrote {0} to file using cosim".format(count)

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
		if ('cx' in fn) and ('consensus' in fn) and ('pass' in fn) and ('keyword' not in fn):
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

def process_keyword_consensus(category_mapping):
	"""Processes keyword consensus files"""
	
	print "Category mapping has {0}/{1} items still blank".format(len([0 for x in category_mapping if category_mapping[x] == ""]), len(category_mapping))
	
	new_categories = set()
	with copen('mozcat_heirarchy.json', encoding='utf8') as f:
		f = load(f)
		mozcat = set(f.keys() + list(chain(*f.values()))) #flatten
	
	count = 0
	for fn in listdir("."):
		if ('pass' in fn) and ('keyword_consensus' in fn):
			with copen(fn, encoding='utf8') as f:
				contents = f.read()
				contents = contents.split('###word')
				for entry in contents:
					if len(entry.strip()) > 5:
						entry = entry.split('\n')
						blanks = literal_eval(entry[1].split('\t')[1])
						decision = entry[2].split('\t')[1]
						
						if decision != "":
							if decision == 'del':
								for x in blanks:
									if x in category_mapping:
										del category_mapping[x]
										count += 1
							else:
								if decision not in mozcat:
									if decision not in new_categories:
										new_categories.update([decision])
								for x in blanks:
									category_mapping[x] = decision
									count += 1
	
	if len(new_categories) > 0:
		print u"New categories:" + unicode(new_categories)
	
	print "Classified {0} using keyword consensus. There are {1}/{2} blank items left".format(count, len([0 for x in category_mapping if category_mapping[x] == ""]), len(category_mapping))
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
							if "'" in line:
								prefix = line.split("'")[1]
								decision = line.split('\t')
								if len(decision) > 1:
									if decision[1] != "":
										mapping[prefix] = decision[1]
							else:
								line = line.split('\t')
								prefix = line[0]
								decision = line[1]
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
		if ('everything' in fn) or ("_all" in fn):
			if 'pass' in fn:
				print "Processing file: " + fn
				with copen(fn, encoding='utf8') as f:
					try:
						for line in f:
							if len(line) > 3:
								line = line[:-1].split('\t')
								if len(line) > 1:
									category = line[0]
									decision = line[1]
									if decision != "":
										if category in category_mapping:
											if category_mapping[category] == "":
												category_mapping[category] = decision
												classified += 1
					except Exception, e:
						print Exception, e, line
	
	print "Classified {0} using process_everything".format(classified)
	
	return category_mapping

def process_keyword_intersection(category_mapping):
	"""Processes the keyword intersection files """
	count = 0
	used = set()
	stages = [0,0,0,0]
	for fn in listdir('.'):
		if ("keyword_intersection" in fn) and ('pass' in fn):
			with copen(fn, encoding='utf8') as f:
				data = f.read()
				data = data.split('\n\t\t\t\t')
				print "data is of len {0}".format(len(data))
				for x in data:
					if len(x) > 5:
						x = x.split('\n')
						blanks = []
						decision = ""
						if x[0].strip() == "":
							if len(x) > 2:
								blanks = literal_eval(x[1].strip())
								d = x[2].strip().split('\t')
								if len(d) > 1:
									decision = d[1] #urgh
						else:
							if len(x) > 2:
								blanks = literal_eval(x[0].strip())
								d = x[1].strip().split('\t')
								if len(d) > 1:
									decision = d[1]
						if blanks and decision:
							used.update(blanks)
							for blank in blanks:
								if blank in category_mapping:
									if category_mapping[blank] == '':
										category_mapping[blank] = decision
										count += 1
	
	print "Classified {0} items, leaving {1}/{2} left, used {3}, stages {4}".format(count, len([x for x in category_mapping if category_mapping[x] == ""]), len(category_mapping), len(used), stages)
	return category_mapping

def process_unclassified_words(category_mapping):
	"""Does what it says"""
	
	count = 0
	for fn in listdir('.'):
		if "cx_unclassified_words_pass" in fn:
			with copen(fn, encoding='utf8') as f:
				for line in f:
					if len(line) > 5:
						line = line.split('\t')
						decision = line[0]
						categories = literal_eval(line[2].split('is in: ')[1])
						if decision != "":
							for category in categories:
								if category in category_mapping:
									if category_mapping[category] == "":
										category_mapping[category] = decision
										count += 1
	
	print "Classified {0} using unknown words".format(count)
	
	return category_mapping

def process_popular_words(category_mapping):
	"""Processes categories that were categorized using the "likely candidates" method"""
	
	count = 0
	deleted = 0
	for fn in listdir("."):
		if ("pass" in fn) and ("popular_words" in fn):
			with copen(fn, encoding='utf8') as f:
				for line in f:
					if len(line) > 4:
						line = line[:-2]
						line = line.split('\t')
						wiki = line[0]
						decision = line[1]
						suggestion = line[2]
						if decision != "":
							if wiki in category_mapping:
								if category_mapping[wiki] == "":
									if decision in ["3", 'del']:
										del category_mapping[wiki]
										deleted += 1
									elif decision in ["1", "y", "yes"]:
										category_mapping[wiki] = suggestion
										count += 1
									elif decision in ['2', 'no', 'n']:
										continue
									else:
										category_mapping[wiki] = decision
										count += 1
	
	print "classified {0} and deleted {1} using popular words".format(count, deleted)
	return category_mapping

def process_cosim(category_mapping):
	count = 0
	deleted = 0
	numbers = [str(x) for x in range(1,11)]
	for fn in listdir("."):
		if ("pass" in fn) and ("cosim" in fn):
			with copen(fn, encoding='utf8') as f:
				for line in f:
					if len(line) > 4:
						line = line[:-1].split('\t')
						category = line[0]
						decision = line[1]
						items = line[2:]
						if decision != "":
							if category in category_mapping:
								if category_mapping[category] == "":
									if decision == 'del':
										del category_mapping[category]
										deleted += 1
									elif decision in numbers:
										decision = items[int(decision) - 1].split("#")[0]
										category_mapping[category] = decision
										count += 1
									else:
										category_mapping[category] = decision
										count += 1
	
	print "classified {0} and deleted {1} using cosim".format(count, deleted)
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
			
			suffix = parent.split('_')[-1]
			if suffix in enders:
				mapping[parent] = enders[suffix]
				parent_assigned = enders[suffix]
				classified += 1
				break
			
			if not parent_assigned:
				prefix = parent.split('_')[0]
				if prefix in partial_matchers['starters']:
					mapping[parent] = partial_matchers['starters'][prefix]
					parent_assigned = partial_matchers['starters'][prefix]
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
				
				suffix = child.split('_')[-1]
				if suffix in enders:
					mapping[child] = enders[suffix]
					child_assigned = enders[suffix]
					classified += 1
					break
				
				if not child_assigned:
					prefix = child.split('_')[0]
					if prefix in partial_matchers['starters']:
							mapping[child] = partial_matchers['starters'][prefix]
							child_assigned = partial_matchers['starters'][prefix]
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
	wiki_iab = process_keyword_consensus(wiki_iab)
	wiki_iab = process_keyword_intersection(wiki_iab)
	wiki_iab = process_unclassified_words(wiki_iab)
	wiki_iab = process_popular_words(wiki_iab)
	wiki_iab = process_cosim(wiki_iab)
	
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
		payload = dumps(to_save)
		payload = "payload = " + payload
		f.write(payload)
	
	print "Saved to new_payload.json"

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
