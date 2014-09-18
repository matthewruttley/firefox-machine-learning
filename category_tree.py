#!/usr/bin/env python

#how to build a gigantic wikipedia tree?
from pdb import set_trace
try:
	from codecs import open as copen
	from collections import defaultdict, Counter
	import re
	
	parents = defaultdict(set)
	is_child = set()
	
	anything_with = set("fictional births deaths redirect living year".split())
	nations = set(u"-american por bi can ais lav van 's tis sex rdu ogp eda ndu lan lay ara ese ian ish an qi ch ss li no can ean ad iet oo ee lsh ari iac land yan sey ni eek male female lgbt".split())
	occupations = set(u"als oets ity ics ians ers ists es ors ars js nts ds eople ats eens ings ces cesses esses msps mps ews iahs".split())
	def matches(x):
		if "_" in x:
			x = x.split("_")
			for s in nations:
				if x[0].endswith(s):
					for z in occupations:
						if x[1].endswith(z):
							return True
		return False
	
	removed = 0
	
	with copen('article_categories_en.tsv', encoding='utf8') as f:
		for n, line in enumerate(f):
			if len(line) > 2:
				line = line[:-1].split("\t")
				parent = line[0]
				child = line[1]
				
				#check parent and child
				
				
				
				for x in line:
					
					if x.count("_") > 1:
						continue
					
					if matches(x):
						continue
					
					if re.match("^\d+_[a-z]+$", x):
						removed += 1
						continue
				
					for y in anything_with:
						if y in x:
							removed += 1
							continue
				
				
				parents[parent].update(child)
				is_child.update(child)
				
			if n % 1000000 == 0:
				print n
	
	print "{0} total, {1} removed, leaving {2}".format(n, removed, n-removed)
	not_children = set([x for x in parents.iterkeys() if x not in is_child])
	print "there are {0} root nodes".format(len(not_children))
except Exception, e:
	print e
	set_trace()
	
