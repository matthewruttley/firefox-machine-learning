#!/usr/bin/env python

#Convert payload.lwca to JSON

from json import dumps
from codecs import open as copen

#parse original 
category_keywords = {}
with copen("payload.lwca", encoding='utf8') as f:
	for line in f:
		line = line.split("\t")
		category = line[0]
		keywords = {}
		for x in range(0, len(line[1:]), 2):
			keywords[line[x+1]] = int(line[x+2])
		category_keywords[category] = keywords

#TODO: Pruning stage

#save
with copen("payload.json", 'w', encoding='utf8') as f:
	category_keywords = dumps(category_keywords, ensure_ascii=False, indent=4, sort_keys=True)
	f.write(category_keywords)

