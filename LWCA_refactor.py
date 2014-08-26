#!/usr/bin/env python

#LWCA refactor
#Refactor of code for session classification
#Uses IAB Top Level + Wikipedia Keywords from subcats + Session page Titles only

from codecs import open as copen
from collections import defaultdict, Counter
from math import sqrt
from os import listdir
from os.path import isdir, exists
from re import findall, compile
from sqlite3 import connect
from subprocess import call
from time import time

def find_repositories_on_computer():
	"""Finds firefox browsing history sqlite files
	 - returns a list of strings
	 - for usage on a mac"""
	
	sqlite_locations = []
	
	for user in listdir("/Users"): #iterate through users
		if (user not in ['Shared']) and (user.startswith(".")==False):
			profile_dir = "/Users/{0}/Library/Application Support/Firefox/Profiles/".format(user)
			if isdir(profile_dir):
				for profile in listdir(profile_dir):
					full_path = profile_dir + profile + "/places.sqlite"
					if exists(full_path):
						sqlite_locations.append(full_path)
	
	return sqlite_locations

def epoch_time_x_days_ago(x):
	"""Returns epoch time x days ago, with no decimal point,
	as per firefox places.sqlite timestamps"""
	day_seconds = x * 24 * 60 * 60 #how many seconds for x many days
	current_time = time()
	cutoff = current_time - day_seconds
	return int(str(cutoff).replace('.', '')) #decimal point is removed in places.sqlite

def sessionized_visit_group_generator(db_location, days_in_the_past):
	"""Digs into the history and yields historical browsing sessions
	Sessions are defined as having a 30 minute gap between page views"""
	
	cutoff = epoch_time_x_days_ago(days_in_the_past) 
	
	#now grab anything with a timestamp larger than that
	conn = connect(db_location)
	c = conn.cursor()
	
	query = "SELECT moz_places.url, moz_places.title, moz_historyvisits.visit_date FROM moz_places "
	query += "INNER JOIN moz_historyvisits "
	query += "ON moz_historyvisits.place_id=moz_places.id "
	query += "WHERE moz_historyvisits.visit_date >= {0} ".format(cutoff) #remember to insert date
	query += 'AND moz_places.title != ""'
	query += 'ORDER BY moz_historyvisits.visit_date'
	results = c.execute(query)
	
	#epoch time is 10 digits with points after
	#places.sqlite adds an extra six
	session_cutoff = 30 * 60 * 1000000 #30 mins
	
	urls = [results.fetchone()]
	while True:
		next_url = results.fetchone()
		if next_url:
			if next_url[2] - urls[-1][2] > session_cutoff:
				to_yield = urls
				urls = [next_url]
				yield to_yield
			else:
				urls.append(next_url)
		else:
			yield urls #yield whatever is left
			break
	conn.close()

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
	
	session_titles = [x for x in session_titles] #code needs a big cleanup
	
	domain_urls = defaultdict(list)
	
	#have to first organize titles per domain
	for n, session in enumerate(session_titles):
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
	deleted = 0
	for domain, component_counts in suffixes.iteritems():
		tmp_component_counts = {}
		for component, count in component_counts.iteritems():
			if count > 1:
				tmp_component_counts[component] = 0
			else:
				deleted += 1
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
	
	print "removing title components"
	
	#iterate through again, and remove title components
	session_titles_new = []
	for session in session_titles:
		tmp_session = []
		for url_title_query in session:
			utq = list(url_title_query)
			domain = get_domain(url_title_query[0])
			if domain in suffixes:
				for component in suffixes[domain]:
					if component in url_title_query[1]:
						utq[1] = url_title_query[1].replace(component, "")
						break
			tmp_session.append(utq)
		session_titles_new.append(tmp_session)
	
	print "{0} sessions being returned".format(len(session_titles_new))
	
	return session_titles_new

class Ontology:
	def __init__(self):
		"""Creates an ontology object that we can use to classify sessions"""
		
		self.iab_keywords = defaultdict(dict)
		self.magnitude_sqrts = defaultdict(int)
		with copen("iab_wiki_keywords.tsv", encoding='utf8') as f:
			for line in f:
				if line != "":
					line = line[:-1].split("\t")
					category = line[0]
					for x in range(0, len(line[1:]), 2):
						count = int(line[x+2])
						self.iab_keywords[category][line[x+1]] = count
						self.magnitude_sqrts[category] += count ** 2
		
		self.keyword_sets = {} #sets of keywords for quick lookups
		for category, keywords in self.iab_keywords.iteritems():
			self.keyword_sets[category] = set(keywords.keys())
		
		for category in self.magnitude_sqrts.keys(): #precalculated sqrts of magnitudes per category
			self.magnitude_sqrts[category] = sqrt(self.magnitude_sqrts[category])
		
		#add in stoplist and wordlists
		self.wordlist = []
		with copen("dictnostops.txt", encoding='utf8') as f:
			for line in f:
				self.wordlist.append(line[:-1])
		self.wordlist = set(self.wordlist)

	def classify_text(self, text):
		"""Classifies text against the IAB keywords dataset
		using their cosine similarity."""
		
		#format correctly into count of keywords
		keyword_distribution = defaultdict(int)
		for kw in findall("[a-z]+", text.lower()):
			if kw in self.wordlist:
				keyword_distribution[kw] += 1
		
		#calculate vector magnitude from final counts
		#calculate the dot product at the same time
		magnitude = 0
		
		dot_products = [[category, 0] for category in self.iab_keywords.keys()]
		
		for keyword, count in keyword_distribution.iteritems():
			magnitude += count ** 2
			for n, (category, _) in enumerate(dot_products):
				if keyword in self.keyword_sets[category]:
					dot_products[n][1] += self.iab_keywords[category][keyword] * count
		
		#calculate final scores
		scores = []
		magnitude = sqrt(magnitude)
		for category, dot_product in dot_products:
			denom = self.magnitude_sqrts[category] * magnitude
			if denom != 0:
				scores.append((category, dot_product / denom))
		
		#or just try keyword overlap lol
		#text_set = set(keyword_distribution.keys())
		#scores = []
		#for category, kwset in self.keyword_sets.iteritems():
		#	intersection = len(kwset.intersection(text_set))
		#	scores.append([category, intersection/float(len(kwset)) * 100])
		
		scores = sorted(scores, key=lambda x: x[1], reverse=True)[:5]
		return scores

def classify():
	"""Classifies user sessions"""
	
	#Some HTML to format the session classification results
	html_start = """<html><head><meta charset="UTF-8"> <style>body {font-family: arial;} td, th {border:0.5px solid black;} table {border-collapse: collapse;}</style></head><body><h1>Session Classifications - LWCA v0.4</h1><table><tr><th>#</th><th>Page views</th><th style="width: 50%;">Top Title Keywords</th><th>Classification</th></tr>"""
	row_template = 	"<tr><td>{{NUMBER}}</td><td>{{PAGEVIEWS}}</td><td>{{KEYWORDS}}</td><td>{{CLASSIFICATION}}</td></tr>\n"
	html_end = """</table></body></html>"""
	
	print "Getting user data..."
	dbloc = find_repositories_on_computer()
	dbloc = [x for x in dbloc if "Test" in x][0]
	sessions = sessionized_visit_group_generator(dbloc, 30)
	print "done."
	
	print "Cleaning page titles of persistent components..."
	sessions = remove_persistent_title_components_across_sessions(sessions)
	print "done."
	
	print "Building Ontology in memory...",
	o = Ontology()
	print "done."
	
	print "Iterating through sessions...",
	classifications = []
	for session in sessions:
		results = {}
		results['NUMBER'] = len(classifications)
		results['PAGEVIEWS'] = len(session)
		
		session_bow = "\n".join([visit[1] for visit in session])
		
		results['KEYWORDS'] = session_bow[:1000]
		
		classification = o.classify_text(session_bow)
		results['CLASSIFICATION'] = u"<br>".join([u"{0}-{1}".format(x[0], round(x[1],2)) for x in classification])
		classifications.append(results)
		
	print "classified {0} in total".format(len(classifications))
	
	print "Formatting and saving to sessions.html...",
	with copen("sessions.html",'w', encoding='utf8') as f:
		f.write(html_start)
		for x in classifications:
			tmp_row = row_template
			for key, value in x.iteritems():
				tmp_row = tmp_row.replace("{{" + key + "}}", unicode(value))
			f.write(tmp_row)
		f.write(html_end)
	print "done."

if __name__ == '__main__': #command line handler
	classify()
	call(["open", "sessions.html"])