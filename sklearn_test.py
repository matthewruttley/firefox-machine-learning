#!/usr/bin/env python

#Tests out TFIDF-COSINE in sklearn as per stackoverflow

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from iab import *
from LWCA_refactor import *
from os import listdir
from codecs import open as copen
from re import findall
from collections import defaultdict, Counter
from operator import itemgetter

def get_subcat_text():
	"""Attempts to retrieve wiki data for subcats and save it to a folder called wiki_subcat_text"""
	
	from codecs import open as copen
	import wikipedia
	from collections import defaultdict
	
	cats = create_category_dictionary(iab)
	top_level_distribs = defaultdict(str) #category: list of lower case stopworded tokens with no punctuation
	
	for top_level, sub_cats in cats.iteritems():
		for subcat in sub_cats:
			#search for it on wikipedia and grab top match
			
			nearest_match = wikipedia.search(subcat)
			if len(nearest_match) == 0:
				try_again = raw_input("Try again: ")
				nearest_match = wikipedia.search(try_again)
			
			print u"{0} ---> {1}".format(subcat, nearest_match[:5])
			
			
			#grab article
			try:
				article = wikipedia.page(nearest_match[0])
			except wikipedia.exceptions.DisambiguationError:
				print "Too many things to disambiguate!"
				try_again = raw_input("Try again: ")
				nearest_match = wikipedia.search(try_again)
				print "used article: {0}".format(nearest_match[0])
				article = wikipedia.page(nearest_match[0])
				continue
			
			with copen("wiki_subcat_text/" + top_level.replace(" ", "_") + "___" + subcat.replace(" ", "_") + "___" + nearest_match[0].replace(" ", "_").replace("/", "_&_") + ".txt", 'w', encoding='utf8') as f:
				f.write(article.content)

def classify_sessions_to_top_level():
	"""Uses sklearn to classify sessions to top level cats
	Test with:
	from sklearn_test import classify_sessions_to_top_level;a=classify_sessions_to_top_level()
	"""
	
	#get sessions
	print "Getting user data..."
	dbloc = find_repositories_on_computer()
	dbloc = [x for x in dbloc if "Test" in x][0]
	sessions = sessionized_visit_group_generator(dbloc, 30)
	print "done."
	print "Cleaning page titles of persistent components..."
	sessions = remove_persistent_title_components_across_sessions(sessions)
	sessions = ["\n".join([y[1] for y in x]) for x in sessions]
	print "done."
	
	session_name_vector = ["session_{0}".format(x) for x in xrange(len(sessions))]
	
	#get top level
	print "Getting top level...",
	tl_content = []
	tl_name_vector = []
	tl_dir = "/Users/mruttley/Documents/2014-07-14 Python User Profile Analysis/firefox-machine-learning/wiki_top_level_text/"
	for tl_file in listdir(tl_dir):
		tl_name = tl_file.replace("wiki_top_level_", "")
		tl_name_vector.append(tl_name)
		with copen(tl_dir + tl_file, encoding='utf8') as f:
			tl_content.append(f.read())
	print "done."
	
	print "Concatenating and setting up wordlist...",
	#now wang them together
	all_data = sessions + tl_content
	all_names = session_name_vector + tl_name_vector
	#get correct wordlist
	wordlist = []
	with copen('dictnostops.txt', encoding='utf8') as f:
		for line in f:
			wordlist.append(line[:-1])
	wordlist = set(wordlist)
	print "Done."
	
	
	#clean the data
	print "Cleaning data...",
	new_all_data = []
	for bow in all_data:
		bow = findall("[a-z]{3,}", bow.lower())
		new_bow = []
		for word in bow:
			if len(word) > 2:
				if not word.isdigit():
					if word in wordlist:
						new_bow.append(word)
		new_all_data.append(" ".join(new_bow))
	print "done.'"
	
	#transform into matrix
	print "Transforming into matrix...",
	tfidf = TfidfVectorizer().fit_transform(new_all_data)
	print "done"

	#now compare each session to the top_levels
	print "Calculating cosine similarities of sessions to top-level IAB"
	to_return = []
	for n, doc_name in enumerate(all_names):
		if "session" in doc_name:
			print "Calculating score for: {0}".format(doc_name)
			common = Counter(new_all_data[n].split()).most_common(100)
			print "Looks like: {0}".format(common[:15] if len(common) > 14 else common)
			cosine_similarities = linear_kernel(tfidf[n], tfidf).flatten()
			related_document_indices = cosine_similarities.argsort()[:-50:-1] #names
			cs_scores = cosine_similarities[related_document_indices] #scores
			
			scores = []
			for z, x in enumerate(related_document_indices):
				match_name = all_names[x]
				score = cs_scores[z]
				scores.append([match_name, score])
			
			scores = sorted(scores, key=lambda x: x[1], reverse=True)
			tl_scores = [x for x in scores if "session" not in x[0]]
			print "top match: {0}".format(tl_scores[0] if len(tl_scores) > 0 else "No matches!")
			
			
			to_add = {}
			#each item in this object is:
			# session_name : {
			#	"content": "xyz"
			#	"top_5_top_level": [[tl1, 10], [tl2, 9], ...]
			#	"all_scores": [[x, 10], [y, 9], ...]
			#}
			
			#to_add["content"] = new_all_data[n]
			to_add["KEYWORDS"] = common
			to_add["CLASSIFICATION"] = "<br>".join([" - ".join([unicode(y) for y in x]) for x in tl_scores[:5]])
			#to_add["all_scores"] = scores
			to_add["NUMBER"] = int(doc_name.replace("session_", ""))
			to_add["PAGEVIEWS"] = all_data[n].count("\n")
			to_return.append(to_add)
	
	html_start = """<html><head><meta charset="UTF-8"> <style>body {font-family: arial;} td, th {border:0.5px solid black;} table {border-collapse: collapse;}</style></head>
					<body><h1>Session Classifications - LWCA v0.4</h1><form><table>
					<tr><th>#</th><th>Page views</th><th style="width: 50%;">Top Title Keywords</th><th>Classification</th><th>Accurate?</th></tr>"""
	row_template = 	"<tr><td>{{NUMBER}}</td><td>{{PAGEVIEWS}}</td><td>{{KEYWORDS}}</td><td>{{CLASSIFICATION}}</td><td>Yes<input type='radio' value='yes'>No<input type='radio' value='no'><td></tr>\n"
	html_end = """</table></form></body></html>"""
	
	print "Formatting and saving to sessions.html...",
	with copen("sessions.html",'w', encoding='utf8') as f:
		f.write(html_start)
		for x in sorted(to_return, key=itemgetter("NUMBER")):
			tmp_row = row_template
			for key, value in x.iteritems():
				tmp_row = tmp_row.replace("{{" + key + "}}", unicode(value))
			f.write(tmp_row)
		f.write(html_end)
	print "done."
	
	call(["open", "sessions.html"])

def classify_sessions_sub_cat_level():
	"""Uses sklearn to classify sessions to top level cats
	Test with:
	from sklearn_test import classify_sessions_sub_cat_level;a=classify_sessions_sub_cat_level()
	"""
	
	#get sessions
	print "Getting user data..."
	dbloc = find_repositories_on_computer()
	dbloc = [x for x in dbloc if "Test" in x][0]
	sessions = sessionized_visit_group_generator(dbloc, 30)
	print "done."
	print "Cleaning page titles of persistent components..."
	sessions = remove_persistent_title_components_across_sessions(sessions)
	sessions = ["\n".join([y[1] for y in x]) for x in sessions]
	print "done."
	
	session_name_vector = ["session_{0}".format(x) for x in xrange(len(sessions))]
	
	#get top level
	print "Getting top level...",
	sc_content = []
	sc_name_vector = []
	sc_dir = "/Users/mruttley/Documents/2014-07-14 Python User Profile Analysis/firefox-machine-learning/wiki_subcat_text/"
	for sc_file in listdir(sc_dir):
		sc_name = sc_file.split("___")[1].split(".txt")[0]
		sc_name_vector.append(sc_name)
		with copen(sc_dir + sc_file, encoding='utf8') as f:
			sc_content.append(f.read())
	print "done."
	
	
	print "Concatenating and setting up wordlist...",
	#now wang them together
	all_data = sessions + sc_content
	all_names = session_name_vector + sc_name_vector
	#get correct wordlist
	wordlist = []
	with copen('dictnostops.txt', encoding='utf8') as f:
		for line in f:
			wordlist.append(line[:-1])
	wordlist = set(wordlist)
	print "Done."
	
	
	#clean the data
	print "Cleaning data...",
	new_all_data = []
	for bow in all_data:
		bow = findall("[a-z]{3,}", bow.lower())
		new_bow = []
		for word in bow:
			if len(word) > 2:
				if not word.isdigit():
					if word in wordlist:
						new_bow.append(word)
		new_all_data.append(" ".join(new_bow))
	print "done.'"
	
	#transform into matrix
	print "Transforming into matrix...",
	tfidf = TfidfVectorizer().fit_transform(new_all_data)
	print "done"

	#now compare each session to the top_levels
	print "Calculating cosine similarities of sessions to top-level IAB"
	to_return = []
	for n, doc_name in enumerate(all_names):
		if "session" in doc_name:
			print "Calculating score for: {0}".format(doc_name)
			common = Counter(new_all_data[n].split()).most_common(100)
			print "Looks like: {0}".format(common[:15] if len(common) > 14 else common)
			cosine_similarities = linear_kernel(tfidf[n], tfidf).flatten()
			related_document_indices = cosine_similarities.argsort()[:-50:-1] #names
			cs_scores = cosine_similarities[related_document_indices] #scores
			
			scores = []
			for z, x in enumerate(related_document_indices):
				match_name = all_names[x]
				score = cs_scores[z]
				scores.append([match_name, score])
			
			scores = sorted(scores, key=lambda x: x[1], reverse=True)
			sc_scores = [x for x in scores if "session" not in x[0]]
			print "top match: {0}".format(sc_scores[0] if len(sc_scores) > 0 else "No matches!")
			
			
			to_add = {}
			#each item in this object is:
			# session_name : {
			#	"content": "xyz"
			#	"top_5_top_level": [[tl1, 10], [tl2, 9], ...]
			#	"all_scores": [[x, 10], [y, 9], ...]
			#}
			
			#to_add["content"] = new_all_data[n]
			to_add["KEYWORDS"] = common
			try:
				to_add["CLASSIFICATION"] = u"<br>".join([u" - ".join([unicode(y) for y in x]) for x in sc_scores[:5]])
			except UnicodeDecodeError:
				print sc_scores[:5]
				exit()
			#to_add["all_scores"] = scores
			to_add["NUMBER"] = int(doc_name.replace("session_", ""))
			to_add["PAGEVIEWS"] = all_data[n].count("\n")
			to_return.append(to_add)
	
	html_start = """<html><head><meta charset="UTF-8"> <style>body {font-family: arial;} td, th {border:0.5px solid black;} table {border-collapse: collapse;}</style></head>
					<body><h1>Session Classifications - LWCA v0.4</h1><form><table>
					<tr><th>#</th><th>Page views</th><th style="width: 50%;">Top Title Keywords</th><th>Classification</th><th>Accurate?</th></tr>"""
	row_template = 	"<tr><td>{{NUMBER}}</td><td>{{PAGEVIEWS}}</td><td>{{KEYWORDS}}</td><td>{{CLASSIFICATION}}</td><td>Yes<input type='radio' value='yes'>No<input type='radio' value='no'><td></tr>\n"
	html_end = """</table></form></body></html>"""
	
	print "Formatting and saving to sessions.html...",
	with copen("sessions.html",'w', encoding='utf8') as f:
		f.write(html_start)
		for x in sorted(to_return, key=itemgetter("NUMBER")):
			tmp_row = row_template
			for key, value in x.iteritems():
				tmp_row = tmp_row.replace("{{" + key + "}}", unicode(value))
			f.write(tmp_row)
		f.write(html_end)
	print "done."
	
	call(["open", "sessions.html"])

if __name__ == '__main__':
	classify_sessions_to_top_level()
	classify_sessions_sub_cat_level()
	#a=document.getElementsByTagName('input');var yes=0;var no=0;for(x=0;x<a.length;x++){if(a[x].checked==true){if(a[x].value=='yes'){yes+=1}else{no+=1}}}
