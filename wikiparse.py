#!/usr/bin/env python

#Wikipedia parser

from collections import Counter, defaultdict
from codecs import open as copen
from re import sub, findall, compile

from acora import AcoraBuilder
from nltk import pos_tag

def wiki_article_generator(file_location="/Users/mruttley/Downloads/enwiki-latest-pages-articles.xml"):
	"""Generates anything that starts and ends with <page></page>"""
	
	article_buffer = []
	accept = False
	
	with copen(file_location, encoding='utf8') as f:
		for line in f:
			if "<page>" in line:
				article_buffer = []
				accept = True
			elif "</page>" in line:
				accept = False
				yield article_buffer
			else:
				#normal line
				if accept:
					article_buffer.append(line[:-1])
		yield article_buffer

class WordRemover:
	def __init__(self):
		#with copen("stoplist.txt", encoding='utf8') as f:	#import stoplist
		#	self.stoplist = set([x[:-1].lower() for x in f.readlines() if x != ""])
		self.stoplist = frozenset("a,able,about,above,according,accordingly,across,actually,after,afterwards,again,against,ain,t,all,allow,allows,almost,alone,along,already,also,although,always,am,among,amongst,an,and,another,any,anybody,anyhow,anyone,anything,anyway,anyways,anywhere,apart,appear,appreciate,appropriate,are,aren,t,around,as,aside,ask,asking,associated,at,available,away,awfully,be,became,because,become,becomes,becoming,been,before,beforehand,behind,being,believe,below,beside,besides,best,better,between,beyond,both,brief,but,by,c,mon,c,s,came,can,can,t,cannot,cant,cause,causes,certain,certainly,changes,clearly,co,com,come,comes,concerning,consequently,consider,considering,contain,containing,contains,corresponding,could,couldn,t,course,currently,definitely,described,despite,did,didn,t,different,do,does,doesn,t,doing,don,t,done,down,downwards,during,each,edu,eg,eight,either,else,elsewhere,enough,entirely,especially,et,etc,even,ever,every,everybody,everyone,everything,everywhere,ex,exactly,example,except,far,few,fifth,first,five,followed,following,follows,for,former,formerly,forth,four,from,further,furthermore,get,gets,getting,given,gives,go,goes,going,gone,got,gotten,greetings,had,hadn,t,happens,hardly,has,hasn,t,have,haven,t,having,he,he,s,hello,help,hence,her,here,here,s,hereafter,hereby,herein,hereupon,hers,herself,hi,him,himself,his,hither,hopefully,how,howbeit,however,i,d,i,ll,i,m,i,ve,ie,if,ignored,immediate,in,inasmuch,inc,indeed,indicate,indicated,indicates,inner,insofar,instead,into,inward,is,isn,t,it,it,d,it,ll,it,s,its,itself,just,keep,keeps,kept,know,knows,known,last,lately,later,latter,latterly,least,less,lest,let,let,s,like,liked,likely,little,look,looking,looks,ltd,mainly,many,may,maybe,me,mean,meanwhile,merely,might,more,moreover,most,mostly,much,must,my,myself,name,namely,nd,near,nearly,necessary,need,needs,neither,never,nevertheless,new,next,nine,no,nobody,non,none,noone,nor,normally,not,nothing,novel,now,nowhere,obviously,of,off,often,oh,ok,okay,old,on,once,one,ones,only,onto,or,other,others,otherwise,ought,our,ours,ourselves,out,outside,over,overall,own,particular,particularly,per,perhaps,placed,please,plus,possible,presumably,probably,provides,que,quite,qv,rather,rd,re,really,reasonably,regarding,regardless,regards,relatively,respectively,right,said,same,saw,say,saying,says,second,secondly,see,seeing,seem,seemed,seeming,seems,seen,self,selves,sensible,sent,serious,seriously,seven,several,shall,she,should,shouldn,t,since,six,so,some,somebody,somehow,someone,something,sometime,sometimes,somewhat,somewhere,soon,sorry,specified,specify,specifying,still,sub,such,sup,sure,t,s,take,taken,tell,tends,th,than,thank,thanks,thanx,that,that,s,thats,the,their,theirs,them,themselves,then,thence,there,there,s,thereafter,thereby,therefore,therein,theres,thereupon,these,they,they,d,they,ll,they,re,they,ve,think,third,this,thorough,thoroughly,those,though,three,through,throughout,thru,thus,to,together,too,took,toward,towards,tried,tries,truly,try,trying,twice,two,un,under,unfortunately,unless,unlikely,until,unto,up,upon,us,use,used,useful,uses,using,usually,value,various,very,via,viz,vs,want,wants,was,wasn,t,way,we,we,d,we,ll,we,re,we,ve,welcome,well,went,were,weren,t,what,what,s,whatever,when,whence,whenever,where,where,s,whereafter,whereas,whereby,wherein,whereupon,wherever,whether,which,while,whither,who,who,s,whoever,whole,whom,whose,why,will,willing,wish,with,within,without,won,t,wonder,would,would,wouldn,t,yes,yet,you,you,d,you,ll,you,re,you,ve,your,yours,yourself,yourselves,zero".split(','))
		with copen("/usr/share/dict/words", encoding='utf8') as f:	#import unix dictionary
			self.words = frozenset([x[:-1].lower() for x in f.readlines() if x != ""])

	def remove_words(self, word_iterable):
		"""Given a list of words, will only return those that are not stopwords and in the dictionary."""
		ok = []
		for word in word_iterable:
			word = word.lower()
			if word not in self.stoplist:
				if word in self.words:
					ok.append(word)
		return ok
	
def bag_of_words(lines, word_remover):
	"""Cleans unwanted formatting elements from the page"""
	#typically if there's a tag, there's just one per line
	#can eliminate all of these except if the tag contains the article title
	
	title = ""
	text = []
	categories = []
	
	for line in lines:
		if "<title>" in line:
			title = line.split("<title>")[1].split("</title>")[0]
		elif line.strip().startswith("[[Category:"):
			category = line.split('[[Category:')[1].split("]]")[0]
			categories.append(category)
		else:
			#have to check for stop-cases
			if ("<" in line) or (">" in line): #remove <tag>line</tag> since those are typically components
				continue
			
			line = sub("{{.*}}", "", line) #remove {{things}}
			
			#remove html &quot; style entities
			line = sub("&[a-zA-z]+;", "", line)
			
			#words must be at least 4 characters
			words = findall("[a-zA-Z]{4,}", line)
			
			#pos tag all the words
			words = [x[0] for x in pos_tag(words) if x[1].startswith("NN")]
			
			#words must be nouns that are in the word list but not in the stop list
			words = word_remover.remove_words(words)
			
			text += words
			
	#now generate a counter distribution
	text = Counter(text)
	return [title, text, categories]

def acora_matcher():
	pass


def fast_wiki_parse(limit):
	"""Combines the functions in this module for fewer function calls etc"""
	#string matching stuff
	quot_bracket_remover = compile("&[a-zA-Z]+;|{{.*}}")
	word_finder = compile("[a-zA-Z]{4,}").findall
	stoplist = frozenset([x for x in u"a,able,about,above,according,accordingly,across,actually,after,afterwards,again,against,ain,aint,all,allow,allows,almost,alone,along,already,also,although,always,am,among,amongst,an,and,another,any,anybody,anyhow,anyone,anything,anyway,anyways,anywhere,apart,appear,appreciate,appropriate,are,aren,t,around,as,aside,ask,asking,associated,at,available,away,awfully,be,became,because,become,becomes,becoming,been,before,beforehand,behind,being,believe,below,beside,besides,best,better,between,beyond,both,brief,but,by,c,mon,c,s,came,can,can,t,cannot,cant,cause,causes,certain,certainly,changes,clearly,co,com,come,comes,concerning,consequently,consider,considering,contain,containing,contains,corresponding,could,couldn,t,course,currently,definitely,described,despite,did,didn,t,different,do,does,doesn,t,doing,don,t,done,down,downwards,during,each,edu,eg,eight,either,else,elsewhere,enough,entirely,especially,et,etc,even,ever,every,everybody,everyone,everything,everywhere,ex,exactly,example,except,far,few,fifth,first,five,followed,following,follows,for,former,formerly,forth,four,from,further,furthermore,get,gets,getting,given,gives,go,goes,going,gone,got,gotten,greetings,had,hadn,t,happens,hardly,has,hasn,t,have,haven,t,having,he,he,s,hello,help,hence,her,here,here,s,hereafter,hereby,herein,hereupon,hers,herself,hi,him,himself,his,hither,hopefully,how,howbeit,however,i,d,i,ll,i,m,i,ve,ie,if,ignored,immediate,in,inasmuch,inc,indeed,indicate,indicated,indicates,inner,insofar,instead,into,inward,is,isn,t,it,it,d,it,ll,it,s,its,itself,just,keep,keeps,kept,know,knows,known,last,lately,later,latter,latterly,least,less,lest,let,let,s,like,liked,likely,little,look,looking,looks,ltd,mainly,many,may,maybe,me,mean,meanwhile,merely,might,more,moreover,most,mostly,much,must,my,myself,name,namely,nd,near,nearly,necessary,need,needs,neither,never,nevertheless,new,next,nine,no,nobody,non,none,noone,nor,normally,not,nothing,novel,now,nowhere,obviously,of,off,often,oh,ok,okay,old,on,once,one,ones,only,onto,or,other,others,otherwise,ought,our,ours,ourselves,out,outside,over,overall,own,particular,particularly,per,perhaps,placed,please,plus,possible,presumably,probably,provides,que,quite,qv,rather,rd,re,really,reasonably,regarding,regardless,regards,relatively,respectively,right,said,same,saw,say,saying,says,second,secondly,see,seeing,seem,seemed,seeming,seems,seen,self,selves,sensible,sent,serious,seriously,seven,several,shall,she,should,shouldn,t,since,six,so,some,somebody,somehow,someone,something,sometime,sometimes,somewhat,somewhere,soon,sorry,specified,specify,specifying,still,sub,such,sup,sure,t,s,take,taken,tell,tends,th,than,thank,thanks,thanx,that,that,s,thats,the,their,theirs,them,themselves,then,thence,there,there,s,thereafter,thereby,therefore,therein,theres,thereupon,these,they,they,d,they,ll,they,re,they,ve,think,third,this,thorough,thoroughly,those,though,three,through,throughout,thru,thus,to,together,too,took,toward,towards,tried,tries,truly,try,trying,twice,two,un,under,unfortunately,unless,unlikely,until,unto,up,upon,us,use,used,useful,uses,using,usually,value,various,very,via,viz,vs,want,wants,was,wasn,t,way,we,we,d,we,ll,we,re,we,ve,welcome,well,went,were,weren,t,what,what,s,whatever,when,whence,whenever,where,where,s,whereafter,whereas,whereby,wherein,whereupon,wherever,whether,which,while,whither,who,who,s,whoever,whole,whom,whose,why,will,willing,wish,with,within,without,won,t,wonder,would,would,wouldn,t,yes,yet,you,you,d,you,ll,you,re,you,ve,your,yours,yourself,yourselves,zero".split(',') if len(x) > 3])
	ac = AcoraBuilder(*stoplist)
	stoplist = ac.build()
	gen = wiki_article_generator()
	articles = {}
	for n, article in enumerate(gen):
		if n > limit:
			break
		title = ""
		word_distribution = defaultdict(int)
		categories = []
		for line in article:
			if "<title>" in line:
				title = line.split("<title>")[1].split("</title>")[0]
			elif line.strip().startswith("[[Category:"):
				category = line.split('[[Category:')[1].split("]]")[0]
				categories.append(category)
			else:
				#have to check for stop-cases
				if line.startswith("<"):
					continue
				#remove html &quot; style entities as well as {{things}}
				line = quot_bracket_remover.sub("", line)
				#words must be at least 4 characters
				words = word_finder(line)
				#pos tag all the words
				for word in pos_tag(words):
					if word[1].startswith("NN"):
						add = True
						for x in stoplist.finditer(word[0]):
							add = False
							break
						for x in real_words.finditer(word[0]):
							add = False
							break
						if add:
							word_distribution[word[0]] += 1
		if n+1 == limit:
			print "last lines: ".format(str(article[-10:]))
		articles[title] = {"words": word_distribution, "cats":categories}
	return articles

def test2():
	"""To be copied into the terminal"""
	from wikiparse import *
	a = fast_wiki_parse(5000)

def test():
	"""To be copied into the terminal"""
	from wikiparse import *
	wr = WordRemover()
	gen = wiki_article_generator()
	a = [gen.next() for x in range(5000)]
	bag_of_words(a[17], wr)
