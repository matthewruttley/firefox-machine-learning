#!/usr/bin/env python

#Latent Dirichlet Analysis which treats a session's search engine keywords as a document.

from dataset_preparation import session_bag_of_words_generator

def test_data_extraction():
	for textblock in session_bag_of_words_generator():
		print "========================"
		print textblock