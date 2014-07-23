#!/usr/bin/env python

#Calculates Session Similarity

# - started 2014-07-23

#TODO:
# - consolidate functionality so that only one pass is made over history

from collections import defaultdict
from scipy.spatial.distance import cosine
import networkx as nx
from dataset_preparation import session_bag_of_words_generator

class Vocab:
	"""A list of all words present in the sessions. Each entry returns an index"""
	def __init__(self, sessions):
		#create a frequency table
		d = defaultdict(lambda: len(d))
		for session in sessions:
			session = session.split() #tokenize
			for word in session:
				if word not in d:
					d[word] #initialize
		#this is now a lookup table which returns an index,
		#useful for creating sparse matrices
		self.lookup_table = d

class SessionVector:
	"""A sparse vector per session"""
	def __init__(self, session, vocabulary):
		#create a frequency table
		sv = [0 for x in range(len(vocabulary.lookup_table))]
		session = session.split() #tokenize
		for word in session:
			sv[vocabulary.lookup_table[word]] += 1
		self.vector = sv

class SessionGraph:
	"""Given a list of sessions, this outputs a networkx graph
	object that weights nodes according to vector similarity"""
	def __init__(self, sessions):
		#gather data
		sessions = [x for x in sessions] #load all from the generator
		vocabulary = Vocab(sessions)
		session_vectors = [[n, SessionVector(x, vocabulary)] for n, x in enumerate(sessions)]
		
		#input data to the graph object
		g = nx.Graph()
		g.add_nodes_from([x[0] for x in session_vectors])
		
		#iterate through nodes
		for x in xrange(len(g.nodes())):
			for y in range(x):
				if y != x:
					if tuple(sorted((x, y))) not in g.edges(): #has to be a better way to check edge existence, or is this even necessary given x, x+1 iterations?
						#calculate the weight as the cosine similarity
						sc = cosine(session_vectors[x][1].vector, session_vectors[y][1].vector)
						g.add_weighted_edges_from([[x, y, sc]])
		
		self.graph = g
		self.vocabulary = vocabulary
		self.session_vectors = session_vectors
		self.sessions = sessions
	
	def most_related_sessions(self):
		weight = 1
		edge = 0
		for edge in self.graph.edges():
			for other_edge, info in self.graph.edge[edge[0]].iteritems():
				if info['weight'] < weight:
					weight = info[weight]
					edge = [edge, other_edge]
		print "edge {0} with weight {1} is the most related".format(edge, weight)
		print "Session {0}:".format(edge[0])
		print self.sessions[edge[0]]
		print "Session {0}:".format(edge[1])
		print self.sessions[edge[1]]
		
	def output_gexf(self, where_to):
		nx.write_gexf(self.graph, where_to)

def test_data_extraction():
	"""How to retrieve sessions as blocks of queries"""
	for textblock in session_bag_of_words_generator():
		print "=" * 25 #spacer
		print textblock

def test_vocab():
	"""Tests creation of a vocabulary table"""
	sessions = [x for x in session_bag_of_words_generator()]
	v = Vocab(sessions)
	return v

def test_session_vectors():
	"""Outputs a list of session vectors, truncated at 100 characters"""
	sessions = [x for x in session_bag_of_words_generator()]
	v = Vocab(sessions)
	for session in sessions:
		x = SessionVector(session, v)
		print str(x.vector)[:100]

def test_graph_output():
	"""Run this to output a graph of all sessions"""
	sessions = [x for x in session_bag_of_words_generator()]
	sg = SessionGraph(sessions)
	sg.output_gexf("/tmp/test.gexf")

def test_related_sessions():
	sessions = [x for x in session_bag_of_words_generator()]
	sg = SessionGraph(sessions)
	sg.most_related_sessions()
