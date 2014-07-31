#!/usr/bin/env python

#Testing gensim for LDA

import logging, bz2
from codecs import open as copen
from os import listdir
from sys import argv

from gensim import corpora, models, similarities
from nltk.tokenize import RegexpTokenizer
from nltk.stem.porter import PorterStemmer
from dataset_preparation import session_bag_of_words_generator_with_titles

CORPUS_DIR = "/Users/mruttley/Documents/2014-07-14 Python User Profile Analysis/lda_test_corpus"
STOPWORDS = set("a,able,about,above,according,accordingly,across,actually,after,afterwards,again,against,ain,t,all,allow,allows,almost,alone,along,already,also,although,always,am,among,amongst,an,and,another,any,anybody,anyhow,anyone,anything,anyway,anyways,anywhere,apart,appear,appreciate,appropriate,are,aren,t,around,as,aside,ask,asking,associated,at,available,away,awfully,be,became,because,become,becomes,becoming,been,before,beforehand,behind,being,believe,below,beside,besides,best,better,between,beyond,both,brief,but,by,c,mon,c,s,came,can,can,t,cannot,cant,cause,causes,certain,certainly,changes,clearly,co,com,come,comes,concerning,consequently,consider,considering,contain,containing,contains,corresponding,could,couldn,t,course,currently,definitely,described,despite,did,didn,t,different,do,does,doesn,t,doing,don,t,done,down,downwards,during,each,edu,eg,eight,either,else,elsewhere,enough,entirely,especially,et,etc,even,ever,every,everybody,everyone,everything,everywhere,ex,exactly,example,except,far,few,fifth,first,five,followed,following,follows,for,former,formerly,forth,four,from,further,furthermore,get,gets,getting,given,gives,go,goes,going,gone,got,gotten,greetings,had,hadn,t,happens,hardly,has,hasn,t,have,haven,t,having,he,he,s,hello,help,hence,her,here,here,s,hereafter,hereby,herein,hereupon,hers,herself,hi,him,himself,his,hither,hopefully,how,howbeit,however,i,d,i,ll,i,m,i,ve,ie,if,ignored,immediate,in,inasmuch,inc,indeed,indicate,indicated,indicates,inner,insofar,instead,into,inward,is,isn,t,it,it,d,it,ll,it,s,its,itself,just,keep,keeps,kept,know,knows,known,last,lately,later,latter,latterly,least,less,lest,let,let,s,like,liked,likely,little,look,looking,looks,ltd,mainly,many,may,maybe,me,mean,meanwhile,merely,might,more,moreover,most,mostly,much,must,my,myself,name,namely,nd,near,nearly,necessary,need,needs,neither,never,nevertheless,new,next,nine,no,nobody,non,none,noone,nor,normally,not,nothing,novel,now,nowhere,obviously,of,off,often,oh,ok,okay,old,on,once,one,ones,only,onto,or,other,others,otherwise,ought,our,ours,ourselves,out,outside,over,overall,own,particular,particularly,per,perhaps,placed,please,plus,possible,presumably,probably,provides,que,quite,qv,rather,rd,re,really,reasonably,regarding,regardless,regards,relatively,respectively,right,said,same,saw,say,saying,says,second,secondly,see,seeing,seem,seemed,seeming,seems,seen,self,selves,sensible,sent,serious,seriously,seven,several,shall,she,should,shouldn,t,since,six,so,some,somebody,somehow,someone,something,sometime,sometimes,somewhat,somewhere,soon,sorry,specified,specify,specifying,still,sub,such,sup,sure,t,s,take,taken,tell,tends,th,than,thank,thanks,thanx,that,that,s,thats,the,their,theirs,them,themselves,then,thence,there,there,s,thereafter,thereby,therefore,therein,theres,thereupon,these,they,they,d,they,ll,they,re,they,ve,think,third,this,thorough,thoroughly,those,though,three,through,throughout,thru,thus,to,together,too,took,toward,towards,tried,tries,truly,try,trying,twice,two,un,under,unfortunately,unless,unlikely,until,unto,up,upon,us,use,used,useful,uses,using,usually,value,various,very,via,viz,vs,want,wants,was,wasn,t,way,we,we,d,we,ll,we,re,we,ve,welcome,well,went,were,weren,t,what,what,s,whatever,when,whence,whenever,where,where,s,whereafter,whereas,whereby,wherein,whereupon,wherever,whether,which,while,whither,who,who,s,whoever,whole,whom,whose,why,will,willing,wish,with,within,without,won,t,wonder,would,would,wouldn,t,yes,yet,you,you,d,you,ll,you,re,you,ve,your,yours,yourself,yourselves,zero".split(','))

def import_austen_corpora():
	"""Returns a corpus and dictionary from Austen texts"""
	
	#clean and load all texts
	books = []
	for book in listdir(CORPUS_DIR):
		with copen(CORPUS_DIR + "/" + book, encoding='utf8') as f:
			text = clean_sentence(f.read())
			books.append(text)
			text = 0 #clear
	
	#create and save a dictionary
	dictionary = corpora.Dictionary(books)
	dictionary.save("/tmp/austen_dicts.txt")
	
	#convert tokenized documents to vectors
	corpus = [dictionary.doc2bow(text) for text in books]
	corpora.MmCorpus.serialize("/tmp/austen.mm", corpus)
	
	return {"corpus": corpus, "dictionary": dictionary, "len": len(books)}

def import_sessions():
	"""Imports sessions for use in gensim LDA"""
	
	sessions = session_bag_of_words_generator_with_titles()
	documents = []
	for session in sessions:
		text = clean_sentence(session)
		documents.append(text)
	
	#create and save a dictionary
	dictionary = corpora.Dictionary(documents)
	dictionary.save("/tmp/sessions_dict.txt")
	
	#convert tokenized documents to vectors
	corpus = [dictionary.doc2bow(text) for text in documents]
	corpora.MmCorpus.serialize("/tmp/sessions.mm", corpus)
	
	return {"corpus": corpus, "dictionary": dictionary, "len": len(documents)}

def clean_sentence(s):
	"""	1) Tokenizes, removing all punctuation
		2) Removes stop words
		3) Stems
	"""
	
	tokenizer = RegexpTokenizer("\w+")
	stemmer = PorterStemmer()
	
	return [stemmer.stem(x) for x in tokenizer.tokenize(s) if (x not in STOPWORDS) and (len(x) > 2)]

if __name__ == "__main__":
	"""Runs LDA from gensim when the module is called from the command line"""
	
	logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)
	
	if argv[1] == "austen":
		document_info = import_austen_corpus() #load the documents
	
	if argv[1] == "sessions":
		document_info = import_sessions() #load the documents
	
	id2word = document_info['dictionary'] # load id->word mapping (the dictionary)
	mm = document_info['corpus'] #Load corpus iterator
	# extract 10 LDA topics, using 50 passes and updating once every 1 chunk (10 documents)
	lda = models.ldamodel.LdaModel(corpus=mm, id2word=id2word, num_topics=10, update_every=1, chunksize=1, passes=50)
	lda.print_topics(10)














