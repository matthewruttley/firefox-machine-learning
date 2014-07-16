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
	
	#have to first titles organize per domain
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
		words = words[:5]#now get top 5?
		
		#get time info etc
		start = session[0][2]
		end = session[-1][2]
		duration = ((end - start)/1000000)/60 #minutes
		date = epoch_to_day(session[-1][2]/1000000) #of last item
		total_pages_viewed = len(session)
		#output
		print "{0}\t{1} minutes\t{2} page views\tqueries: {3}...".format(date, duration, total_pages_viewed, words)





















