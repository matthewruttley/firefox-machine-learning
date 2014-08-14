#Convert various wiki and dbpedia MySQL/ttl dump files into useful datasets

from codecs import open as copen
from codecs import decode, encode
from re import match
from collections import defaultdict

def convert_page_file():
	"""Converts the enwiki-latest-page.sql file into a useful id-tab-pagename file"""
	
	dump = copen("/Users/mruttley/Downloads/enwiki-latest-page.sql", encoding='utf-8')
	output = copen("id_to_page.tsv", 'w', encoding='utf-8')
	
	for n, line in enumerate(dump):
		start = "INSERT INTO `page` VALUES "
		if line.startswith(start) and line.endswith(';\n'):
			line = line[27:-3]
			line = line.split('),(')
			for entry in line:
				entry = entry.split(',')
				page_id = entry[0]
				page_title = entry[2][1:-1]
				output.write(u"{0}\t{1}\n".format(page_id, page_title))
		if n % 50 == 0:
			print "Processed {0} lines of ~3500".format(n)
	
	dump.close()
	output.close()

def clean_page_file():
	"""Once convert_page has been run, we can remove other things too"""
	#currently 33 million lines
	#removes 10 million of them
	#file is called id_to_page_no_numbers.tsv
	#actually would have been easier to do with a grep and redirect in the terminal
	#but this way there are stats
	
	all_pages = copen("id_to_page.tsv", 'r', encoding='utf-8')
	output = copen("id_to_page_no_numbers.tsv", 'w', encoding='utf-8')
	
	for n, line in enumerate(all_pages):
		if not match("^.*\t.*[0-9].*", line):
			output.write(line)
		if n % 200000 == 0:
			print n
	
	all_pages.close();output.close()

def convert_category_file():
	"""Converts the enwiki-latest-page.sql file into a useful id-tab-pagename file"""
	
	#some annoying unicode error makes it easier to just do this in the command line
	#logic is the same
	
	dump = open("/Users/mruttley/Downloads/enwiki-latest-category.sql")
	output = copen("id_to_category.tsv", 'w', encoding='utf-8')
	
	try:
		for n, line in enumerate(dump):
			start = "INSERT INTO `category` VALUES "
			if line.startswith(start) and line.endswith(';\n'):
				line = line[31:-3]
				line = line.split('),(')
				for entry in line:
					entry = entry.split(',')
					page_id = entry[0]
					page_title = entry[1][1:-1]
					output.write(u"{0}\t{1}\n".format(page_id, page_title))
			if n % 10 == 0:
				print "Processed {0} lines of ~150".format(n)
	except Exception, e:
		print e
		print n
		print len(line)
		exit()
	dump.close()
	output.close()

def convert_category_file_2():
	category_dump = open("/Users/mruttley/Downloads/enwiki-latest-category.sql")
	output = copen("id_to_category.tsv", 'w', encoding='utf-8')

	lines = [x[30:-3] for x in category_dump if x.startswith('INSERT INTO')]
	
	categories = []
	for line in lines:
		line = line.split("),(")
		for entry in line:
			categories.append(entry)

	for entry in categories:
		#splitting is a little bit difficult
		
		#cases like:
		# 42,'Thirty_Years\'_War',41,5,0
		# 309831,'Fav_phrase_is_\"Let_me_tell_you_this\"_and_\"Know_THAT!\"',0,0,0 #random spam
		
		#have to basically work your way forwards and backwards to find the first and last quote punctuation instances
		
		start = 0
		end = 0
		for x in range(len(entry)):
			if entry[x] in ['"', "'"]:
				start = x
				break
		
		for x in reversed(range(len(entry))):
			if entry[x] in ['"', "'"]:
				end = x
				break
		
		try:
			
			page_count = int(entry[end:].split(",")[1])
			
			if page_count > 1:
				page_title = entry[start+1:end]
				page_id = entry[:start][:-1]
			
				output.write(u"{0}\t{1}\n".format(page_id, decode(page_title, 'utf-8')))
		
		except IndexError:
			print entry
			print start
			print end
			print entry[start+1:end]

	category_dump.close()
	output.close()

def clean_category_file():
	"""Once convert_category has been run, we can remove other things too"""
	#962862 id_to_category.tsv

	all_pages = copen("id_to_category.tsv", 'r', encoding='utf-8')
	output = copen("id_to_category_cleaned.tsv", 'w', encoding='utf-8')
	
	for n, line in enumerate(all_pages):
		if not match("^.*\t.*[0-9].*", line):
			if "/" not in line:
				output.write(line)
		if n % 200000 == 0:
			print n
	
	all_pages.close();output.close() # 763742 id_to_category_cleaned.tsv
	
def category_name_stats():
	"""One way of detecting higher level categories is to
	find categories that have no more than 2 words in them"""
	
	# how many are there? 318775
	# cat id_to_category_cleaned.tsv | grep -E "^[0-9]+\t[A-Za-z]+_*[A-Za-z]+\n$" > id_to_category_short.tsv
	# wc -l id_to_category_short.tsv 
	# 111851 id_to_category_short.tsv
	
	f = copen('id_to_category_cleaned.tsv', encoding="utf-8")
	f.close()

def convert_categorylinks_to_tsv():
	
	all_pages = open("/Users/mruttley/Downloads/enwiki-latest-categorylinks.sql")
	output = copen("enwiki-latest-categorylinks.tsv", 'w', encoding='utf-8')
	
	for n, line in enumerate(all_pages):
		if line.startswith("INSERT INTO"):
			#(251,'Unprintworthy_redirects','ABERDEENSOUTHDAKOTA','2006-09-08 04:28:17','','uppercase','page')
			line = line[36:-3].split("),(")
			for x in line:
				output.write(decode(x, 'utf-8')+"\n")
	all_pages.close()
	output.close()

def dbpedia_article_categories():
	"""Cleans file and returns category\tarticle"""

	f = copen("/Users/mruttley/Downloads/article_categories_en.ttl", encoding='utf8')
	output = copen("article_categories_en.tsv", "w", encoding='utf8')
	
	for n, line in enumerate(f):
		if line.startswith("<"):
			#<http://dbpedia.org/resource/Albedo> <http://purl.org/dc/terms/subject> <http://dbpedia.org/resource/Category:Climate_forcing> .\n
			line = line.split(" ")
			article = line[0]
			category = line[2]
			
			article = article.split("/")[-1][:-1]
			category = category.split(":")[-1][:-1]
			
			output.write(u"{0}\t{1}\n".format(category, article))
		if n % 250000 == 0:
			print "processed {0} of 16.5m".format(n)
	
	output.close()
	f.close()

def dbp_remove_long_categories():
	"""One idea is that any category with more than 2 words is probably
	quite specific, so worth removing"""
	
	f = copen("article_categories_en.tsv", encoding='utf8')
	output = copen("article_categories_en_short.tsv", "w", encoding='utf8')
	
	for n, line in enumerate(f): #16.5m lines
		
		items = line.split('\t')
		if items[0].count("_") < 2:
			output.write(line)
			
		if n % 250000 == 0:
			print "processed {0} of 16.5m".format(n)
	
	output.close() #5.4m results
	f.close()

def dbp_category_article_matrix():
	"""Creates a file like: category article article article"""
	
	f = copen("article_categories_en_short.tsv", encoding='utf8')
	output = copen("article_category_matrix.tsv", "w", encoding='utf8')
	
	d = defaultdict(list)
	
	for n, line in enumerate(f): #5.4m lines
		
		items = line[:-1].split('\t')
		d[items[0]].append(items[1])
		
		if n % 100000 == 0:
			print "processed {0} of 5.4m".format(n)

	for category, articles in d.iteritems():
		output.write(u"{0}\t{1}\n".format(category, '\t'.join(articles)))
	
	output.close() 
	f.close()

def create_category_phrase_matrix():
	"""Category <tab> phrase <tab> phrase .... etc"""
	pass

