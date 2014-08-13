#!/usr/bin/env python

#Modifies DBPedia Topic Signatures

from codecs import open as copen
from collections import defaultdict
from sys import argv
import re

from lda_gensim import stopwords as STOPWORDS;STOPWORDS=STOPWORDS() #maybe a better way of doing that

REMOTE_DIR = "http://wifo5-04.informatik.uni-mannheim.de/downloads/datasets/" #3.5m raw topic signatures 
LOCAL_FILE = "topic_signatures_en.tsv"

def ngrams(s, n):
	"""Given a string s, splits it into ngrams"""
	ngrams = []
	s = s.split()
	for i in range(len(s)-n+1):
		ngrams.append(' '.join(s[i:i+n]))
	return ngrams

def stoplist_ngrams(s, n):
	"""Converts a string to ngrams.
	Avoids concatenating words that had a stopword between them."""
	#Process looks like:
	#1) the cat sat on the mat
	#2) _ cat sat _ _ mat
	#3) bigrams: "cat sat"
	#rather than "cat sat", "sat mat"
	
	ngrams = []
	s = s.lower().split()
	for i in range(len(s)-n+1):
		ngram = s[i:i+n]
		add = True
		for x in ngram:
			if x in STOPWORDS:
				add = False
				break
		if add:
			ngrams.append(' '.join(ngram))
	return ngrams

class Ontology:
	def __init__(self, raw_file_location):
		"""Generates keyword matrices"""
		
		# Lines could look anything like:
		# 1) Portal:Justin_Bieber	+"Portal:Justin Bieber" 
		# 2) Bigger_%28Justin_Bieber_song%29	+"Bigger" +"Justin Bieber song" one girl me
		# 3) Down_to_Earth_%28Justin_Bieber_song%29	+"Down to Earth" +"Justin Bieber song" one girl
		
		self.wikipedia_page_keywords = {}		#3) "Down_to_Earth_%28Justin_Bieber_song%29": ['one', 'girl']
		self.bigram_keyword_distributions = defaultdict(lambda: defaultdict(int))	#3) justin bieber: {'one': 1, 'girl': 1},
												#	  bieber song: {'one': 1, 'girl': 1},
		self.keyword_keyword_distributions = defaultdict(lambda: defaultdict(int)) #3) all three keywords as above
		
		with copen(raw_file_location, encoding='utf8') as raw:
			for n, line in enumerate(raw):
				
				#First have to split the line up into useful bits
				line = line[:-1].split('\t') #remove the newline character and separate title from rest
				
				wiki_article_title = line[0] #useful
				
				rest = line[1].split('"')
				page_text_salient_keywords = [x for x in rest[-1].split() if x not in STOPWORDS] #useful
				
				if 'its' in page_text_salient_keywords:
					print page_text_salient_keywords
					print wiki_article_title
					print rest[-1]
					print rest[-1].split()
					print [True for x in rest[-1].split() if x in STOPWORDS]
					
					raise Exception("FFFFFFFFFFFUUUU")
					exit()
				
				title_components = [x for x in rest[:-1] if "+" not in x.strip()]
				
				for x in title_components:
					for y in stoplist_ngrams(x, 1):
						for kw in page_text_salient_keywords:
							self.keyword_keyword_distributions[y][kw] += 1
					for y in stoplist_ngrams(x, 2):
						for kw in page_text_salient_keywords:
							self.bigram_keyword_distributions[y][kw] += 1
				
				self.wikipedia_page_keywords[wiki_article_title] = page_text_salient_keywords
				
				if n % 100000 == 0:
					print "Processed {0}% of the pages".format((n/3500000.0)*100)
			print "Total: {0} articles {1} bigrams {2} keywords".format(len(self.wikipedia_page_keywords), len(self.bigram_keyword_distributions), len(self.keyword_keyword_distributions))
	
	def describe_phrase(self, phrase):
		"""Takes a phrase and returns either the bigram or keyword results, sorted descending"""
		
		if phrase in self.wikipedia_page_keywords:
			return self.wikipedia_page_keywords[phrase] #not a consistent format with other outputs
		
		elif phrase in self.keyword_keyword_distributions:
			return sorted(self.keyword_keyword_distributions[phrase].items(), key=lambda x: x[1], reverse=True)
		
		elif phrase in self.bigram_keyword_distributions:
			return sorted(self.bigram_keyword_distributions[phrase].items(), key=lambda x: x[1], reverse=True)
		
		else:
			return None #could raise an exception but hmmm
		
	def classify_webpage(self, url, title): #might change this to *kwargs
		"""Attempts to classify a given webpage.
		Returns the top 10 tier 1 keyword-categories and top 10 tier 1 bigram-categories"""
		#this requires a matrix of words and bigrams to category words and bigrams


if __name__ == '__main__':
	o = Ontology(LOCAL_FILE)
	o.describe_phrase(argv[1])
