#!/usr/bin/env python

# Various functions to turn browsing history into something useful
# for Machine Learning.

# Created by mruttley, 2014-07-14
# Last Updated: 2014-07-15

#TODO:
# - Organize and maybe rename the modules to make it more consistent
# - Optimize functions. Currently too many passes over the entire history.

#IMPORTS
import sqlite3, time, urlparse, re
from collections import defaultdict
from os import listdir
from os.path import isdir, exists
from codecs import open as copen

#SUBROUTINES
def find_repositories_on_computer():
	"""Finds Firefox sqlite repositories
	 - returns a list of strings
	 - for usage on a mac"""
	
	sqlite_locations = []
	
	for user in listdir("/Users"): #iterate through users
		if (user not in ['Shared']) and (user.startswith(".")==False):
			profile_dir = "/Users/" + user + "/Library/Application Support/Firefox/Profiles/"
			if isdir(profile_dir):
				for profile in listdir(profile_dir):
					full_path = profile_dir + profile + "/places.sqlite"
					if exists(full_path):
						sqlite_locations.append(full_path)
	
	return sqlite_locations if sqlite_locations else False #return False if nothing found

def epoch_time_x_days_ago(x):
	"""Returns epoch time with no decimal point"""
	#calculate the Unix timestamp for exactly 15 days ago
	#= 15 days * 24 hours * 60 minutes * 60 seconds
	day_seconds = x * 24 * 60 * 60
	current_time = time.time()
	cutoff = current_time - day_seconds
	return int(str(cutoff).replace('.', '')) #decimal point was removed in db

def get_last_x_days_of_browsing_urls(db_location, x, must_match=None):
	"""Grabs URLs from the last x days
	 - if x is 0 then it gets all
	 - visit_date field is a unix timestamp
	 - could be gigantic depending on the user's history size"""
	
	urls = [] #a flat list of lists containing URL, title, timestamp
	
	cutoff = epoch_time_x_days_ago(x)
	
	#now grab anything with a timestamp larger than that
	conn = sqlite3.connect(db_location)
	c = conn.cursor()
	query = "SELECT moz_places.url, moz_places.title, moz_historyvisits.visit_date FROM moz_places "
	query += "INNER JOIN moz_historyvisits "
	query += "ON moz_historyvisits.place_id=moz_places.id "
	if x == 0: #all
		query += 'WHERE moz_places.title != ""'
	else: #some
		cutoff = epoch_time_x_days_ago(x)
		query += "WHERE moz_historyvisits.visit_date >= {0} ".format(cutoff) #remember to insert date
		query += 'AND moz_places.title != ""'
	
	if must_match: #just in case the urls have to look like something
		query += 'AND moz_places.url LIKE "%' + must_match + '%";'
	else:
		query += ";"
	
	results = c.execute(query)
	urls = results.fetchall() #possibly too much data
	conn.close()
	
	return urls

def get_ngrams_from_titles(titles, n):
	"""Returns n-gram counts from a list of page title strings"""
	ngrams = defaultdict(int) #ngram : count
	for title in titles:
		title = title.split()
		for i in range(len(title)-n+1):
			ngrams[' '.join(title[i:i+n])] += 1
	return ngrams

def longest_common_ngram_suffix(s1, s2):
	""" - Finds the longest common suffix made of full words/ngrams
	 - Needs optimization but works (split and len could be avoided)
	 - Assumes that the two strings are inequal"""
	
	s1, s2 = s1.split(), s2.split()
	s1len, s2len = len(s1), len(s2)
	smallest = s1len if s1len < s2len else s2len
	
	if smallest == 1: #base case
		return ""

	for x in range(-1, -smallest-1, -1):
		if s1[x] != s2[x]:
			if x == -1:
				return ""
			else:
				return ' '.join(s1[x+1:])
	return ' '.join(s1[x:])
	
def spot_persistent_title_components(url_data):
	"""Code to spot page title things that don't change like:
	 - Computer - Wikipedia, the free encyclopedia
	 - Japanese language - Wikipedia, the free encyclopedia
	 - natural language processing - Google Scholar
	 - machine learning - Google Scholar
	 - Silver  MA Coin stores with 500.000 Coins and Medals - German Coins and Ancient Coins, World
	 - Greek  MA Coin stores with 500.000 Coins and Medals - German Coins and Ancient Coins, World
	These can skew algorithms.
	This is basically just http://en.wikipedia.org/wiki/Longest_common_substring_problem
	 """
	
	domain_urls = defaultdict(list)
	
	#have to first organize titles per domain
	for item in url_data:
		url = item[0]
		if "://" in url:
			domain = url.split("://")[1]
			if "/" in domain:
				domain_urls[domain.split('/')[0]].append(item[1])
			else:
				if "?" in domain:
					domain_urls[domain.split('?')[0]].append(item[1])
				else:
					domain_urls[domain].append(item[1])
	
	#what are the most common suffixes?
	suffixes = defaultdict(lambda: defaultdict(int))
	for domain, title_group in domain_urls.iteritems():
		for x in range(len(title_group)-1):
			if title_group[x] != title_group[x+1]:
				lcns = longest_common_ngram_suffix(title_group[x], title_group[x+1])
				if lcns != "":
					suffixes[domain][lcns] +=1
	
	#now clean single occurrences and output domain -> title component -> count
	dtc = []
	for domain, title_counts in suffixes.iteritems():
		for title, count, in title_counts.iteritems():
			dtc.append([domain, title, count])
	dtc = [x for x in sorted(dtc, key=lambda x: x[2], reverse=True) if x[2] != 1]
	
	#top 20% are usually good
	return dtc[:int(len(dtc)*0.20)]

def get_domain(url):
	"""Simple way to fetch the domain including subdomain"""
	if "://" in url:
		domain = url.split("://")[1]
		
		if "/" in domain:
			domain = domain.split('/')[0]
		else:
			if "?" in domain:
				domain = domain.split('?')[0]
		
		return domain
	else:
		return None
	

def remove_persistent_title_components_across_sessions(session_titles):
	"""Code to remove persistent title components by comparing different titles across sessions
	Accepts a list of sessions, each session being a list of [url, title] pairs
	Returns a list of the titles with the components removed"""
	
	domain_urls = defaultdict(list)
	
	#have to first organize titles per domain
	for session in session_titles:
		for item in session:
			domain = get_domain(item[0])
			if domain:
				domain_urls[domain].append(item[1])
	
	#what are the most common suffixes?
	suffixes = defaultdict(lambda: defaultdict(int))
	for domain, title_group in domain_urls.iteritems():
		for x in range(len(title_group)-1):
			if title_group[x] != title_group[x+1]:
				lcns = longest_common_ngram_suffix(title_group[x], title_group[x+1])
				if lcns != "":
					suffixes[domain][lcns] +=1
	
	#delete single occurrences
	suffixes2 = {}
	for domain, component_counts in suffixes.iteritems():
		tmp_component_counts = {}
		for component, count in component_counts.iteritems():
			if count > 1:
				tmp_component_counts[component] = 0
		suffixes2[domain] = tmp_component_counts
	suffixes = 0 #clear memory
	
	#delete title components that only appear in one session
	#first need to iterate through all sessions again,
	#noting down the suffix components counts
	for session in session_titles:
		#make a mini dict per session
		tmp_dict = defaultdict(lambda: defaultdict(int))
		for url_title_pair in session:
			domain = get_domain(url_title_pair[0])
			#check for component existence in suffixes2
			if domain in suffixes2:			
				for component in suffixes2[domain]:
					if component in url_title_pair[1]:
						tmp_dict[domain][component] += 1
						
		#now add 1 for each item in the tmp_dict
		for domain, component_count in tmp_dict.iteritems():
			for component, count in component_count.iteritems():
				suffixes2[domain][component] += 1
	#now we actually remove those that only appear in one session
	suffixes = {}
	for domain, component_count in suffixes2.iteritems():
		components = set([comp for comp, count in component_count.iteritems() if count > 1])
		suffixes[domain] = components
	
	#iterate through again, and remove title components
	session_titles_new = []
	for session in session_titles:
		tmp_session = []
		for url_title_query in session:
			domain = get_domain(url_title_query[0])
			if domain in suffixes:
				for component in suffixes[domain]:
					if component in url_title_query[1]:
						url_title_query[1] = url_title_query[1].replace(component, "")
						break
			tmp_session.append(url_title_query)
		session_titles_new.append(tmp_session)
	
	return session_titles_new

def sessionized_visit_group_generator(db_location):
	"""Digs into the history and yields historical browsing sessions
	Sessions are defined as having a 30 minute gap between page views"""
	
	#iterate through sessions, if it is longer than 30 minutes ago,
	#output
	#else just append to a list
	#if cursor has finished, then output
	
	cutoff = epoch_time_x_days_ago(15) #short term interests
	
	#now grab anything with a timestamp larger than that
	conn = sqlite3.connect(db_location)
	c = conn.cursor()
	
	query = "SELECT moz_places.url, moz_places.title, moz_historyvisits.visit_date FROM moz_places "
	query += "INNER JOIN moz_historyvisits "
	query += "ON moz_historyvisits.place_id=moz_places.id "
	query += "WHERE moz_historyvisits.visit_date >= {0} ".format(cutoff) #remember to insert date
	query += 'AND moz_places.title != ""'
	query += 'ORDER BY moz_historyvisits.visit_date'
	results = c.execute(query)
	
	session_cutoff = 30 * 60 * 1000000 #30 mins
	
	urls = [results.fetchone()]
	while True:
		next_url = results.fetchone()
		if next_url:
			#epoch time is 10 digits with points after
			#mozilla adds an extra six
			if next_url[2] - urls[-1][2] > session_cutoff:
				to_yield = urls
				urls = [next_url]
				yield to_yield
			else:
				urls.append(next_url)
		else:
			break
	conn.close()

def epoch_to_day(epoch):
	"""Converts epoch time to a nice looking date string"""
	return time.strftime('%Y-%m-%d', time.localtime(epoch))

def scan_for_search_variables(url_data):
	"""Scans for search GET variables per domain
	 - input is a list of lists [[url,title,timestamp],...]"""
	
	search_variables = defaultdict(lambda: defaultdict(int))
	
	for item in url_data:
		#parse url
		url = item[0]
		parsed = urlparse.urlparse(url)
		get_variables = urlparse.parse_qs(parsed.query)#get GET variables
		#find those that look like searches
		for variable, value in get_variables.iteritems():
			if re.search(".+(%20|\+|\s).+", value[0]):
				search_variables[parsed.netloc][variable] += 1
	
	return search_variables

class QueryFinder:
	"""A lookup table for domain query variables that is generated
	based on existing firefox profiles on disk.
	Set an argument for how many days into the past to scan. 
	"""
	def __init__(self, history_length_to_scan):
		#scan x days of history
		domain_variables = defaultdict(lambda: defaultdict(int))
		for dbloc in find_repositories_on_computer():
			d = get_last_x_days_of_browsing_urls(dbloc, history_length_to_scan, "?")
			v = scan_for_search_variables(d)
			#merge
			for domain, varvalue in v.iteritems():
				for var, value in varvalue.iteritems():
					domain_variables[domain][var] += value
		
		#convert to a dict of domain: [vars]
		d = {}
		for domain, varvalue in domain_variables.iteritems():
				search_vars = []
				for var, value in varvalue.iteritems():
					if value > 1:#eliminate those with a count of 1
						search_vars.append(var)
				if len(search_vars) > 1: #eliminate domains with nothing
					d[domain] = set(search_vars) #convert list to set for easy lookups
		#make it accessible
		self.lookup_table = d

def session_bag_of_words_generator_with_titles():
	"""A generator that yields strings containing every search
	keyword the user made in that session as well as titles"""
	
	#create Query Lookup Table
	q = QueryFinder(0) #zero for all days
	
	#get browsing data
	dbloc = find_repositories_on_computer()
	dbloc = [x for x in dbloc if "Test" in x][0]
	sessions = sessionized_visit_group_generator(dbloc)
	
	for session in sessions:
		queries_and_titles = [] #similar code to test_sessionizer_with_queries
		for url in session:
			up = urlparse.urlparse(url[0])
			if up.netloc in q.lookup_table:
				for get_var, value in urlparse.parse_qs(up.query).iteritems():
					if get_var in q.lookup_table[up.netloc]:
						query = value[0]
						title = url[1]
						#dedupe runs
						if queries_and_titles == []:
							queries_and_titles.append([query, title])
						else:
							if queries_and_titles[-1] != [query, title]:
								queries_and_titles.append([query, title])
		queries_and_titles = "\n".join(['\n'.join(x) for x in queries_and_titles])
		yield queries_and_titles

def get_search_query(qf_object, url):
	"""Gets a search query. If none found, returns False"""
	up = urlparse.urlparse(url)
	if up.netloc in qf_object.lookup_table:
		for get_var, value in urlparse.parse_qs(up.query).iteritems():
			if get_var in qf_object.lookup_table[up.netloc]:
				query = value[0]
				if query != "":
					return query
	return False

def one_session_bow_per_line():
	"""Returns a list of strings.
	Each string contains all queries and page titles
	The titles have had common suffixes removed
	They haven't been cleaned yet (e.g. stopwords, stemming etc)"""
	
	#create Query Lookup Table
	q = QueryFinder(0) #zero for all days
	
	#get browsing data
	dbloc = find_repositories_on_computer()
	dbloc = [x for x in dbloc if "Test" in x][0]
	sessions = sessionized_visit_group_generator(dbloc)
	
	session_data = [] #finalized session data

	#get all session and title data
	for session in sessions:
		clicks = [] #tmp session object [[url, title, query]]
		for url in session:
			query = get_search_query(q, url[0])
			click = [url[0], url[1], query]
			if clicks == []:
				clicks.append(click)
			else:
				if clicks[-1] != click:
					clicks.append(click)
		session_data.append(clicks)

	#now remove persistent title suffixes
	session_data = remove_persistent_title_components_across_sessions(session_data)
	
	#now format per line
	session_bows = []
	for session in session_data:
		session_bows.append(' '.join([' '.join(x[1:]) if x[-1] != False else x[1] for x in session]))
	
	return session_bows

def session_bag_of_words_generator():
	"""A generator that yields strings containing every search
	keyword the user made in that session as well as titles"""
	
	#create Query Lookup Table
	q = QueryFinder(0) #zero for all days
	
	#get browsing data
	dbloc = find_repositories_on_computer()
	dbloc = [x for x in dbloc if "Test" in x][0]
	sessions = sessionized_visit_group_generator(dbloc)
	
	for session in sessions:
		queries = [] #similar code to test_sessionizer_with_queries
		for url in session:
			up = urlparse.urlparse(url[0])
			if up.netloc in q.lookup_table:
				for get_var, value in urlparse.parse_qs(up.query).iteritems():
					if get_var in q.lookup_table[up.netloc]:
						#dedupe runs
						if queries == []:
							queries.append(value[0])
						else:
							if value[0] != queries[-1]:
								queries.append(value[0])
		queries = "\n".join(queries)
		yield queries

def test_search_scanner():
	"""Scans for search variables"""
	dbloc = find_repositories_on_computer()
	dbloc = [x for x in dbloc if "Test" in x][0]
	
	d = get_last_x_days_of_browsing_urls(dbloc, 0, "?")
	print "analyzing {0} urls...".format(len(d))
	v = scan_for_search_variables(d)
	#convert v to a list of lists
	stats = []
	for domain, vs in v.iteritems():
		stats.append([domain, sorted(vs.items(), key=lambda x: x[1], reverse=True)])
	for x in sorted(stats):
		print x

def test_sessionizer():
	"""Displays all the user's sessions"""
	dbloc = find_repositories_on_computer()
	dbloc = [x for x in dbloc if "Test" in x][0]
	
	sessions = sessionized_visit_group_generator(dbloc)
	
	for session in sessions:
		start = session[0][2]
		end = session[-1][2]
		duration = ((end - start)/1000000)/60 #minutes
		date = epoch_to_day(session[-1][2]/1000000) #of last item
		total = len(session)
		
		print "{0}\t{1} minutes\t{2} page views".format(date, duration, total)

def test_bow_titles():
	"""Tests session bag of words with titles output"""
	sessions = session_bag_of_words_generator_with_titles()
	with copen('queries_and_titles.txt', 'w', encoding='utf8') as f:
		f.write('\n'.join([x for x in sessions]))

def test_persistent_title_component_remover():
	""""""
	pass

#TODO

def test_sessionizer_with_queries():
	"""Displays sessions, but also with query info"""
	
	#create Query Lookup Table
	q = QueryFinder(0) #zero for all days
	
	#get browsing data
	dbloc = find_repositories_on_computer()
	dbloc = [x for x in dbloc if "Test" in x][0]
	sessions = sessionized_visit_group_generator(dbloc)
	
	for session in sessions:
		#get queries
		words = defaultdict(int)
		for url in session:
			up = urlparse.urlparse(url[0])
			if up.netloc in q.lookup_table:
				for get_var, value in urlparse.parse_qs(up.query).iteritems():
					if get_var in q.lookup_table[up.netloc]:
						for x in value[0].split():
							words[x] += 1
		words = sorted(words.items(), key=lambda x: x[1], reverse=True)
		
		#get time info etc
		start = session[0][2]
		end = session[-1][2]
		duration = ((end - start)/1000000)/60 #minutes
		date = epoch_to_day(session[-1][2]/1000000) #of last item
		total_pages_viewed = len(session)
		#output
		print "{0}\t{1} minutes\t{2} page views\t{3} words: {4}...".format(date, duration, total_pages_viewed, len(words), words[:5])
