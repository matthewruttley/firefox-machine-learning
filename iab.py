#!/usr/bin/env python

#IAB process
#IAB taxonomy is somewhat out of date and has many irrelevancies
#e.g. "Palmtops/PDAs", "Web Clip Art", "Soap Making" or separate topics combined such as
#coins/stamps, australia/nz
#IAB24 is "uncategorized"

iab = {
	"IAB1": "Arts & Entertainment",
	"IAB1-1": "Literature",
	"IAB1-2": "Celebrities",
	"IAB1-2a": "Gossip",
	"IAB1-3": "Fine Art",
	"IAB1-4": "Humor",
	"IAB1-5": "Movies",
	"IAB1-6": "Music",
	"IAB1-7": "Television",
	"IAB2": "Automotive",
	"IAB2-1": "Auto Parts",
	"IAB2-2": "Auto Repair",
	"IAB2-3": "Buying Cars",
	"IAB2-3a": "Selling Cars",
	"IAB2-4": "Car Culture",
	"IAB2-5": "Certified Pre-Owned",
	"IAB2-6": "Convertible",
	"IAB2-7": "Coupe",
	"IAB2-8": "Crossover",
	"IAB2-9": "Diesel",
	"IAB2-10": "Electric Vehicle",
	"IAB2-11": "Hatchback",
	"IAB2-12": "Hybrid",
	"IAB2-13": "Luxury",
	"IAB2-14": "MiniVan",
	"IAB2-15": "Mororcycles",
	"IAB2-16": "Off-Road Vehicles",
	"IAB2-17": "Performance Vehicles",
	"IAB2-18": "Pickup",
	"IAB2-19": "Road-Side Assistance",
	"IAB2-20": "Sedan",
	"IAB2-21": "Trucks",
	"IAB2-22": "Vintage Cars",
	"IAB2-23": "Wagon",
	"IAB3": "Business",
	"IAB3-1": "Advertising",
	"IAB3-2": "Agriculture",
	"IAB3-3": "Biotech",
	"IAB3-3a": "Biomedical",
	"IAB3-4": "Business Software",
	"IAB3-5": "Construction",
	"IAB3-6": "Forestry",
	"IAB3-7": "Government",
	"IAB3-8": "Green Solutions",
	"IAB3-9": "Human Resources",
	"IAB3-10": "Logistics",
	"IAB3-11": "Marketing",
	"IAB3-12": "Metals",
	"IAB4": "Careers",
	"IAB4-1": "Career Planning",
	"IAB4-2": "College",
	"IAB4-3": "Financial Aid",
	"IAB4-4": "Job Fairs",
	"IAB4-5": "Job Search",
	"IAB4-6": "Resume Writing Advice",
	"IAB4-7": "Nursing",
	"IAB4-8": "Scholarships",
	"IAB4-9": "Telecommuting",
	"IAB4-10": "U.S. Military",
	"IAB4-11": "Career Advice",
	"IAB5": "Education",
	"IAB5-1": "7-12 Education",
	"IAB5-2": "Adult Education",
	"IAB5-3": "Art History",
	"IAB5-4": "Colledge Administration",
	"IAB5-5": "College Life",
	"IAB5-6": "Distance Learning",
	"IAB5-7": "English as a 2nd Language",
	"IAB5-8": "Language Learning",
	"IAB5-9": "Graduate School",
	"IAB5-10": "Homeschooling",
	"IAB5-11": "Homework",
	"IAB5-12": "K-6 Educators",
	"IAB5-13": "Private School",
	"IAB5-14": "Special Education",
	"IAB5-15": "Studying Business",
	"IAB6": "Family & Parenting",
	"IAB6-1": "Adoption",
	"IAB6-2": "Babies & Toddlers",
	"IAB6-3": "Daycare",
	"IAB6-3a": "Preschool",
	"IAB6-4": "Family Internet",
	"IAB6-5": "Parenting - K-6 Kids",
	"IAB6-6": "Parenting teens",
	"IAB6-7": "Pregnancy",
	"IAB6-8": "Special Needs Kids",
	"IAB6-9": "Eldercare",
	"IAB7": "Health & Fitness",
	"IAB7-1": "Exercise",
	"IAB7-2": "A.D.D.",
	"IAB7-3": "AIDS HIV",
	"IAB7-4": "Allergies",
	"IAB7-5": "Alternative Medicine",
	"IAB7-6": "Arthritis",
	"IAB7-7": "Asthma",
	"IAB7-8": "Autism PDD",
	"IAB7-9": "Bipolar Disorder",
	"IAB7-10": "Brain Tumor",
	"IAB7-11": "Cancer",
	"IAB7-12": "Cholesterol",
	"IAB7-13": "Chronic Fatigue Syndrome",
	"IAB7-14": "Chronic Pain",
	"IAB7-15": "Cold Flu",
	"IAB7-16": "Deafness",
	"IAB7-17": "Dental Care",
	"IAB7-18": "Depression",
	"IAB7-19": "Dermatology",
	"IAB7-20": "Diabetes",
	"IAB7-21": "Epilepsy",
	"IAB7-22": "GERD Acid Reflux",
	"IAB7-23": "Headaches Migraines",
	"IAB7-24": "Heart Disease",
	"IAB7-25": "Herbs for Health",
	"IAB7-26": "Holistic Healing",
	"IAB7-27": "IBS Crohn's Disease",
	"IAB7-28": "Incest Abuse Support",
	"IAB7-29": "Incontinence",
	"IAB7-30": "Infertility",
	"IAB7-31": "Men's Health",
	"IAB7-32": "Nutrition",
	"IAB7-33": "Orthopedics",
	"IAB7-34": "Panic Anxiety Disorders",
	"IAB7-35": "Pediatrics",
	"IAB7-36": "Physical Therapy",
	"IAB7-37": "Psychology/Psychiatry",
	"IAB7-38": "Senor Health",
	"IAB7-39": "Sexuality",
	"IAB7-40": "Sleep Disorders",
	"IAB7-41": "Smoking Cessation",
	"IAB7-42": "Substance Abuse",
	"IAB7-43": "Thyroid Disease",
	"IAB7-44": "Weight Loss",
	"IAB7-45": "Women's Health",
	"IAB8": "Food & Drink",
	"IAB8-1": "American Cuisine",
	"IAB8-2": "Barbecues Grilling",
	"IAB8-3": "Cajun Creole",
	"IAB8-4": "Chinese Cuisine",
	"IAB8-5": "Cocktails",
	"IAB8-5a": "Beer",
	"IAB8-6": "Coffee",
	"IAB8-6a": "Tea",
	"IAB8-7": "Cuisine-Specific",
	"IAB8-8": "Desserts",
	"IAB8-8": "Baking",
	"IAB8-9": "Dining Out",
	"IAB8-10": "Food Allergies",
	"IAB8-11": "French Cuisine",
	"IAB8-12": "Health Lowfat Cooking",
	"IAB8-13": "Italian Cuisine",
	"IAB8-14": "Japanese Cuisine",
	"IAB8-15": "Mexican Cuisine",
	"IAB8-16": "Vegan",
	"IAB8-17": "Vegetarian",
	"IAB8-18": "Wine",
	"IAB9": "Hobbies & Interests",
	"IAB9-2": "Arts & Crafts",
	"IAB9-3": "Beadwork",
	"IAB9-4": "Birdwatching",
	"IAB9-5": "Board Games",
	"IAB9-5A": "Puzzles",
	"IAB9-6": "Candle Making",
	"IAB9-6a": "Soap Making",
	"IAB9-7": "Card Games",
	"IAB9-8": "Chess",
	"IAB9-9": "Cigars",
	"IAB9-10": "Collecting",
	"IAB9-11": "Comic Books",
	"IAB9-12": "Drawing",
	"IAB9-12a": "Sketching",
	"IAB9-13": "Freelance Writing",
	"IAB9-14": "Genealogy",
	"IAB9-15": "Getting Published",
	"IAB9-16": "Guitar",
	"IAB9-17": "Home Recording",
	"IAB9-18": "Investors",
	"IAB9-18a": "Patents",
	"IAB9-19": "Jewelry Making",
	"IAB9-20": "Magic & Illusion",
	"IAB9-21": "Needlework",
	"IAB9-22": "Painting",
	"IAB9-23": "Photography",
	"IAB9-24": "Radio",
	"IAB9-25": "Roleplaying Games",
	"IAB9-26": "Sci-Fi",
	"IAB9-26a": "Fantasy",
	"IAB9-27": "Scrapbooking",
	"IAB9-28": "Screenwriting",
	"IAB9-29": "Stamps",
	"IAB9-29a": "Coins",
	"IAB9-30": "Video Games",
	"IAB9-31": "Woodworking",
	"IAB9-32": "Pornography",
	"IAB10": "Gardening",
	"IAB10-1": "Home Appliances",
	"IAB10-2": "Entertaining",
	"IAB10-3": "Environmental Safety",
	"IAB10-4": "Gardening",
	"IAB10-5": "Home Repair",
	"IAB10-6": "Home Theater",
	"IAB10-7": "Interior Decorating",
	"IAB10-8": "Landscaping",
	"IAB10-9": "Construction",
	"IAB11": "Law",
	"IAB11a": "Government",
	"IAB11b": "Politics",
	"IAB11-1": "Immigration",
	"IAB12": "News",
	"IAB12-1": "International News",
	"IAB12-2": "National News",
	"IAB12-3": "Local News",
	"IAB13": "Personal Finance",
	"IAB13-2": "Credit/Debt & Loans",
	"IAB13-3": "Financial News",
	"IAB13-4": "Financial Planning",
	"IAB13-5": "Hedge Fund",
	"IAB13-6": "Insurance",
	"IAB13-7": "Investing",
	"IAB13-8": "Mutual Funds",
	"IAB13-10": "Retirement Planning",
	"IAB13-11": "Stocks",
	"IAB13-12": "Tax Planning",
	"IAB14": "Society",
	"IAB14-1": "Dating",
	"IAB14-2": "Divorce Support",
	"IAB14-3": "Gay Life",
	"IAB14-4": "Marriage",
	"IAB14-5": "Senior Living",
	"IAB14-6": "Teens",
	"IAB14-7": "Weddings",
	"IAB15": "Science",
	"IAB15-1": "Astrology",
	"IAB15-2": "Biology",
	"IAB15-3": "Chemistry",
	"IAB15-4": "Geology",
	"IAB15-5": "Paranormal Phenomena",
	"IAB15-6": "Physics",
	"IAB15-7": "Space/Astronomy",
	"IAB15-8": "Geography",
	"IAB15-9": "Botany",
	"IAB15-10": "Weather",
	"IAB16": "Pets",
	"IAB16-1": "Aquariums",
	"IAB16-2": "Birds",
	"IAB16-3": "Cats",
	"IAB16-4": "Dogs",
	"IAB16-6": "Reptiles",
	"IAB16-7": "Veterinary Medicine",
	"IAB17": "Sports",
	"IAB17-1": "Auto Racing",
	"IAB17-2": "Baseball",
	"IAB17-3": "Bicycling",
	"IAB17-4": "Bodybuilding",
	"IAB17-5": "Boxing",
	"IAB17-6": "Kayaking",
	"IAB17-7": "Cheerleading",
	"IAB17-8": "Climbing",
	"IAB17-9": "Cricket",
	"IAB17-10": "Figure Skating",
	"IAB17-11": "Fly Fishing",
	"IAB17-12": "Football",
	"IAB17-13": "Freshwater Fishing",
	"IAB17-14": "Game & Fish",
	"IAB17-15": "Golf",
	"IAB17-16": "Horse Racing",
	"IAB17-17": "Horses",
	"IAB17-18": "Hunting",
	"IAB17-18": "Shooting",
	"IAB17-19": "Inline Skating",
	"IAB17-20": "Martial Arts",
	"IAB17-21": "Mountain Biking",
	"IAB17-22": "NASCAR Racing",
	"IAB17-23": "Olympics",
	"IAB17-24": "Paintball",
	"IAB17-25": "Motorcycles",
	"IAB17-26": "Basketball",
	"IAB17-27": "Ice Hockey",
	"IAB17-28": "Rodeo",
	"IAB17-29": "Rugby",
	"IAB17-30": "Running",
	"IAB17-30a": "Jogging",
	"IAB17-31": "Sailing",
	"IAB17-32": "Saltwater Fishing",
	"IAB17-33": "Scuba Diving",
	"IAB17-34": "Skateboarding",
	"IAB17-35": "Skiing",
	"IAB17-36": "Snowboarding",
	"IAB17-37": "Surfing",
	"IAB17-38": "Swimming",
	"IAB17-39": "Table Tennis",
	"IAB17-40": "Tennis",
	"IAB17-41": "Volleyball",
	"IAB17-42": "Walking",
	"IAB17-43": "Waterskiing",
	"IAB17-43": "Wakeboarding",
	"IAB17-44": "Soccer",
	"IAB18": "Fashion",
	"IAB18-1": "Beauty",
	"IAB18-2": "Body Art",
	"IAB18-3": "Fashion",
	"IAB18-4": "Jewelry",
	"IAB18-5": "Clothing",
	"IAB18-6": "Accessories",
	"IAB19": "Technology & Computing",
	"IAB19-1": "3-D Graphics",
	"IAB19-2": "Animation",
	"IAB19-3": "Antivirus Software",
	"IAB19-4": "C/C++",
	"IAB19-5": "Cameras & Camcorders",
	"IAB19-6": "Cell Phones",
	"IAB19-7": "Computer Certification",
	"IAB19-8": "Computer Networking",
	"IAB19-9": "Computer Peripherals",
	"IAB19-10": "Computer Reviews",
	"IAB19-11": "Data Centers",
	"IAB19-12": "Databases",
	"IAB19-13": "Desktop Publishing",
	"IAB19-14": "Desktop Video",
	"IAB19-15": "Email",
	"IAB19-16": "Graphics Software",
	"IAB19-17": "DVD",
	"IAB19-18": "Internet Technology",
	"IAB19-19": "Java",
	"IAB19-20": "JavaScript",
	"IAB19-21": "Mac Support",
	"IAB19-22": "MP3/MIDI",
	"IAB19-23": "Net Conferencing",
	"IAB19-24": "Net for Beginners",
	"IAB19-25": "Network Security",
	"IAB19-26": "Mobile Computing",
	"IAB19-27": "PC Support",
	"IAB19-28": "Portable",
	"IAB19-29": "Entertainment",
	"IAB19-30": "Freeware",
	"IAB19-31": "Unix",
	"IAB19-32": "Visual Basic",
	"IAB19-34": "Web Design",
	"IAB19-34b": "HTML",
	"IAB19-35": "Web Search",
	"IAB19-36": "Windows",
	"IAB20": "Travel",
	"IAB20-1": "Adventure",
	"IAB20-2": "Africa",
	"IAB20-3": "Air Travel",
	"IAB20-4": "Australia",
	"IAB20-4": "New Zealand",
	"IAB20-5": "Bed & Breakfasts",
	"IAB20-6": "Budget Travel",
	"IAB20-7": "Business Travel",
	"IAB20-9": "Camping",
	"IAB20-10": "Canada",
	"IAB20-11": "Caribbean",
	"IAB20-12": "Cruises",
	"IAB20-13": "Eastern Europe",
	"IAB20-14": "Europe",
	"IAB20-15": "France",
	"IAB20-16": "Greece",
	"IAB20-17": "Honeymoon",
	"IAB20-18": "Hotel",
	"IAB20-19": "Italy",
	"IAB20-20": "Japan",
	"IAB20-21": "Mexico",
	"IAB20-21b": "Central America",
	"IAB20-22": "US National Parks",
	"IAB20-23": "South America",
	"IAB20-24": "Spas",
	"IAB20-25": "Theme Parks",
	"IAB20-27": "United Kingdom",
	"IAB21": "Real Estate",
	"IAB21-1": "Apartments",
	"IAB21-2": "Architects",
	"IAB21-3": "Buying/Selling Homes",
	"IAB22": "Shopping",
	"IAB22-2": "Coupon",
	"IAB22-3": "Price Comparison",
	"IAB23": "Religion",
	"IAB23-2": "Atheism",
	"IAB23-3": "Buddhism",
	"IAB23-4": "Catholicism",
	"IAB23-5": "Christianity",
	"IAB23-6": "Hinduism",
	"IAB23-7": "Islam",
	"IAB23-8": "Judaism",
	"IAB23-9": "Latter-Day Saints",
	"IAB23-10": "Wicca",
}

from collections import defaultdict, Counter
from codecs import open as copen
from datetime import datetime
from os import listdir
from re import findall, sub

def find_nearest_category_text():
	"""Finds closest article to process for each IAB sub category."""
	
	#grab IAB subcats
	# - must be lower case
	# - must have spaces replaced by underscores
	iab_sub_cats = []
	cats = create_category_dictionary(iab)
	for k,v in cats.iteritems():
		for x in v:
			iab_sub_cats.append(x.lower().replace(" ", "_"))
	iab_sub_cats = set(iab_sub_cats)
	
	#process titles in file
	
	nearest_titles = defaultdict(list)
	
	with copen("id_to_page.tsv", encoding='utf8') as f:
		for n, line in enumerate(f):
			if line != "":
				try:
					title = line[:-1].split('\t')[1]
					comparison_title = title.lower()
					if comparison_title in iab_sub_cats:
						nearest_titles[comparison_title].append(title)
					
				except Exception, e:
					print Exception, e
			
			if n % 1000000 == 0:
				print "Done {0} found {1} of {2}".format(n, len(nearest_titles), len(iab_sub_cats))
	
	return {'nearest_titles': nearest_titles, "unfound": [x for x in iab_sub_cats if x not in nearest_titles]}

def get_articles_text():
	"""Tries to get relevant article text for each of the found subcats"""
	
	start = datetime.now()
	
	#get found categories
	subcats = []
	with open("nearest_titles.txt") as f:
		for line in f:
			if "#" in line:
				break
			else:
				subcats.append(line[:-1])
	subcats = set(subcats)
	
	#iterate through wiki articles
	from wikiparse import wiki_article_generator
	gen = wiki_article_generator()
	
	processed = 0
	for n, article in enumerate(gen):
		#grab title
		title = False
		for line in article:
			if line.strip().startswith("<title>"):
				try:
					original = line.split("<title>")[1].split("</title>")[0]
					title = original.lower().replace(" ", "_")
					break
				except Exception, e:
					pass
		if title:
			if title in subcats:
				try:
					with copen("iabsubcat_"+str(n)+"____"+title+".txt", "w", encoding='utf8') as f:
						f.write(u'\n'.join(article))
					processed += 1
					print "Found article \"{0}\" (called {1} in subcats)".format(original, title)
				except Exception, e:
					print Exception, e
		if n % 100000 == 0:
			current = datetime.now()
			current = round((start-current).seconds / 60.0, 2)
			remain = (current / 100000.0) * (33000000 - n)
			print "Scanned {0} articles, {1} of {2} subcats found, took {3} mins, est {4} remaining".format(n, processed, len(subcats), current, remain)

def create_category_dictionary(iab_dict):
	cats = defaultdict(list)
	last_cat = ""
	for key, value in sorted(iab_dict.items()):
		if "-" in key:
			#remove slashes or ampersands
			values = []
			for x in ["&/"]:
				if x in value:
					values = value.split(x)
			if values == []:
				values = [value]
			for x in values:
				cats[last_cat].append(value.strip().lower())
		else:
			last_cat = value
	return cats

def ngrams(text, n):
	"""Returns n-grams in some text"""
	ngrams = []
	text = text.split()
	for i in range(len(text)-n+1):
		ngrams.append(text[i:i+n])
	return ngrams

def create_top_level_distributions():
	"""Creates bigram/keyword distributions for the top level categories"""
	
	#Create cat dictionary and storage for the end
	cats = create_category_dictionary(iab)
	top_level_distribs = defaultdict(lambda: defaultdict(list))
	
	#get all filenames
	all_filenames = listdir(".")
	
	#setup stopwords
	from lda_gensim import STOPWORDS
	
	#pruning
	#import words file
	WORDLIST = []
	with copen('/usr/share/dict/words', encoding='utf8') as f:
		for line in f:
			line = line[:-1]
			WORDLIST.append(line.lower())
	WORDLIST = set(WORDLIST)
	
	for filename in all_filenames:
		if "iabsubcat" in filename:
			subcat_name = filename.split("____")[1].split(".txt")[0]#assign filenames to top level categories
			top_level = [k for k,v in cats.iteritems() if subcat_name.lower().replace("_", " ") in v][0]
			
			#prune filenames that are just redirects
			is_redirect = False
			with copen(filename, encoding='utf8') as f:
				for line in f:
					if ("#REDIRECT" in line) or ("may refer to" in line):
						is_redirect = True
						break
					
			if not is_redirect: #get text from articles
				text = []
				text_open = False
				with copen(filename, encoding='utf8') as f:
					for line in f:
						if '<text xml:space="preserve">' in line:
							text_open = True
							text.append(line.split('<text xml:space="preserve">')[1])
						elif "</text>" in line:
							text_open = False
							text.append(line.split("</text>")[0])
							break
						else:
							if text_open:
								line = line[:-1]
								
								#remove anything like {{thing}}
								line = sub("\{\{.*\}\}", " ", line)
								
								#remove things like &quot; &gt;
								line = sub("&.+;", " ", line)
								
								text.append(line)
				
				#get nouns/bigrams from articles
				conc_text = " ".join(text).lower()
				keywords = []
				to_add = findall("[a-z]+", conc_text)
				for x in to_add:
					if x not in STOPWORDS:
						if x in WORDLIST:
							keywords.append(x)
				
				#bigrams
				bigrams = []
				for line in text:
					to_add = ngrams(line, 2)
					for x in to_add:
						if x[0] not in STOPWORDS:#eliminate stopwords
							if x[1] not in STOPWORDS:
								if x[0] in WORDLIST:
									if x[1] in WORDLIST:
										bigrams += x
				
				#save to object
				top_level_distribs[top_level]["keywords"] += keywords
				top_level_distribs[top_level]["bigrams"] += keywords

	#create counters for main object
	tld = defaultdict(dict)
	for k,v in top_level_distribs.iteritems():
		for ngram, things in v.iteritems():
			tld[k][ngram] = Counter(things)

	#TODO: normalization?
	
	#TODO: prune 1-count entries?
	
	#remove anything with len 4 or less
	
	#save category: top x keywords
	#save category: top x bigrams
	
	return tld
	
	









