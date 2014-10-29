/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

//const {Controller} = require("Controller");
//const {StudyApp} = require("Application");
//exports.main = function(options, callbacks) {
  //let controller = new Controller();
  //StudyApp.init(controller);
  //StudyApp.start(options);
//};
//exports.onUnload = function (reason) {
//  StudyApp.unload(reason);
//};

console.log("Importing")

const {Cu, ChromeWorker} = require("chrome");
Cu.import("resource://gre/modules/Task.jsm");

const {LWCAClassifier} = require("lwca_refined");
const {data} = require("sdk/self");

console.log("Running")

function sortDescBy2ndElem(f,s){f=f[1];s=s[1];if(f==s){return 0}else{if(f>s){return false}else{return true}}} //sorter

exports.main = function(options, callbacks) {
	let c;
	let worker = new ChromeWorker(data.url("lwcaWorker.js"));
	let callback = function() {
		
		let cnnTest = {
			business: {
			 "name": "business",
			 "expectedCat": "business",
			 "visits": [
			  [
			   "http://us.cnn.com/2014/10/22/business/countering-the-counterfeiters-art-money/index.html?hpt=hp_c4",
			   "The world's sexiest bank note?",
			   "Future Finance showcases future trends related to the global financial system. \n\n(CNN) -- Legend has it that when the surrealist painter Salvador Dali had to pay for an expensive restaurant meal he would twizzle his famous mustache and arch his eyebrows before beguiling his host into letting him dine for free.\n\nThe crafty Catalan, it is said, would write out a check for the required amount and sign on the dotted line. Just before handing the payment over, however, he would pull the piece of paper back and pen an elaborate doodle on the opposite side.\n\n\"An original from the master Dali. I will never cash this check,\" would inevitably be the reply from the starstruck restaurant owner thrilled to be gifted an artwork that would doubtless be of greater value than the amount on the check itself.\n\nBy perfecting the magic checkbook technique, Dali would rarely, if ever, have to pay for his dining habits.\n\nPeople might not hoard the recently revealed 100 Norwegian Krone ($15) banknote in the s"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/20/business/body-language-work/index.html",
			   "Body language for success",
			   "Editor's note: 'Thinking Business' focuses on the psychology of getting ahead in the workplace by exploring techniques to boost employee performance, increase creativity and productivity. \n\nLondon (CNN) -- Imagine your boss as a caveman.\n\nHe's running across the Savannah -- chasing Palaeolithic game with a rock, wearing only a loincloth.\n\nHe spots you and halts! Assuming a defensive position, his eyes carefully scan you for signs: Are you friend or foe?\n\nThe verdict takes seconds for him to reach, and with no verbal language to inform him, his decision is based primarily on your body language.\n\nBelieve it or not, this is similar to what happens in office environments around the world, every day.\n\nThe power of body language \n\n\"In the first few seconds of meeting someone, they will determine whether you are friend or predator, and the rest of the time their brains will be gathering information to support that,\" says Mark Bowden, author of Winning Body Language.\n\n\"In business, first impre"
			  ],
			  [
			   "http://money.cnn.com/2014/10/07/smallbusiness/minneapolis-immigrant-business/index.html",
			   "Immigrants help revitalize Minneapolis",
			   "Omer Kissi used a loan from St. Paul's Neighborhood Development Center to start a business that now employs nine people. NEW YORK (CNNMoney) Cities often struggle with two distinct but related problems: Revitalizing neighborhoods and employing immigrants. Minneapolis-St. Paul has found a way to do both. \n\nSince 1993, the Neighborhood Development Center has provided training and $11 million in loans to immigrant and minority entrepreneurs. There are now over 500 center-backed businesses in the Twin Cities employing some 2,500 people -- many in economically distressed areas. \n\nOromiya Transportation Services was started in 2011 when Omer Kissi, a 45-year-old immigrant from Ethiopia, bought a used Dodge Caravan for $6,200. \n\nKissi, who followed his fiance to the United States in 2008, used the Caravan to shuttle elderly patients to the drug store or doctor's office. He wanted to expand his business, but he had trouble getting access to capital. And although he was trained in Ethiopia as a"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/tech/smart-meters-africa-smart-business/index.html?hpt=te_r1",
			   "Prepaid smart meters outwit Africa's power thieves",
			   "Editor's note: Smart Business explores the ways companies are thinking smart to thrive in our digitized world. \n\n(CNN) -- In the narrow winding lanes of Old Delhi, the knotted masses of electrical wiring hanging across the streets are sometimes so thickly entwined they blot out the sun.\n\nIn the streets of Bangkok, electricity wires loop and run in chaotic bundles from concrete power poles. In the slums of Mumbai to the townships of South Africa, electricity infrastructure is a triumph of make and mend.\n\nFor power utilities in emerging markets, collecting the bills from this tangled skein of wiring is a nightmare and slow payment - even outright energy theft - remains a powerful disincentive for new investment in the sector.\n\nSmart solutions\n\nOne company, however, says smart meters may hold the answers to the power problems of the world's emerging markets.\n\nWhile smart meters have been in use in the United States and Europe for more than a decade, in markets such as Africa they are set "
			  ],
			  [
			   "http://money.cnn.com/2014/10/07/smallbusiness/minneapolis-immigrant-business/index.html",
			   "Immigrants helping revitalize the Twin Cities",
			   "Omer Kissi used a loan from St. Paul's Neighborhood Development Center to start a business that now employs nine people. NEW YORK (CNNMoney) Cities often struggle with two distinct but related problems: Revitalizing neighborhoods and employing immigrants. Minneapolis-St. Paul has found a way to do both. \n\nSince 1993, the Neighborhood Development Center has provided training and $11 million in loans to immigrant and minority entrepreneurs. There are now over 500 center-backed businesses in the Twin Cities employing some 2,500 people -- many in economically distressed areas. \n\nOromiya Transportation Services was started in 2011 when Omer Kissi, a 45-year-old immigrant from Ethiopia, bought a used Dodge Caravan for $6,200. \n\nKissi, who followed his fiance to the United States in 2008, used the Caravan to shuttle elderly patients to the drug store or doctor's office. He wanted to expand his business, but he had trouble getting access to capital. And although he was trained in Ethiopia as a"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/22/business/cape-town-world-design-capital/index.html",
			   "Inside Africa's most creative city",
			   "CNN Marketplace Africa is a weekly show offering a unique window into African business on and off the continent \n\n(CNN) -- Abandoned workshops and empty warehouses are getting a new lease of life in Cape Town. Spaces that once housed production lines are now becoming creative hotspots for artists, designers and musicians living in a city that holds the title of World Design Capital for 2014.\n\nThis urban regeneration might be most true in one of Cape Town's oldest suburbs: Woodstock. Visitors to the area can see the busy harbor to the north and the majestic Table Mountain to the south. But most people wandering around the area aren't here for the views -- with its craft stores, art markets, theaters and award-winning restaurants, this is a hot address for young urbanites.\n\nBased here is also the Old Biscuit Mill, a converted building that has now become a hive of retail activity.\n\n\"When we started we knew we had made the best decision to be based in Woodstock specifically,\" says Zizi Po"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/22/tech/smart-meters-africa-smart-business/index.html",
			   "How to outwit Africa's power thieves",
			   "Editor's note: Smart Business explores the ways companies are thinking smart to thrive in our digitized world. \n\n(CNN) -- In the narrow winding lanes of Old Delhi, the knotted masses of electrical wiring hanging across the streets are sometimes so thickly entwined they blot out the sun.\n\nIn the streets of Bangkok, electricity wires loop and run in chaotic bundles from concrete power poles. In the slums of Mumbai to the townships of South Africa, electricity infrastructure is a triumph of make and mend.\n\nFor power utilities in emerging markets, collecting the bills from this tangled skein of wiring is a nightmare and slow payment - even outright energy theft - remains a powerful disincentive for new investment in the sector.\n\nSmart solutions\n\nOne company, however, says smart meters may hold the answers to the power problems of the world's emerging markets.\n\nWhile smart meters have been in use in the United States and Europe for more than a decade, in markets such as Africa they are set "
			  ],
			  [
			   "http://www.cnn.com/video/#/video/business/2014/10/22/bizview-phillips-new-art-auction-facility.cnn",
			   "Phillips opens new auction HQ in London",
			   "__"
			  ],
			  [
			   "http://money.cnn.com/2014/10/07/smallbusiness/minneapolis-immigrant-business/index.html",
			   "Immigrants helping revitalize Minneapolis",
			   "Omer Kissi used a loan from St. Paul's Neighborhood Development Center to start a business that now employs nine people. NEW YORK (CNNMoney) Cities often struggle with two distinct but related problems: Revitalizing neighborhoods and employing immigrants. Minneapolis-St. Paul has found a way to do both. \n\nSince 1993, the Neighborhood Development Center has provided training and $11 million in loans to immigrant and minority entrepreneurs. There are now over 500 center-backed businesses in the Twin Cities employing some 2,500 people -- many in economically distressed areas. \n\nOromiya Transportation Services was started in 2011 when Omer Kissi, a 45-year-old immigrant from Ethiopia, bought a used Dodge Caravan for $6,200. \n\nKissi, who followed his fiance to the United States in 2008, used the Caravan to shuttle elderly patients to the drug store or doctor's office. He wanted to expand his business, but he had trouble getting access to capital. And although he was trained in Ethiopia as a"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/business/2014/10/22/bizview-burke-apple-pay-double-charges.cnn",
			   "Double-charged by Apple Pay",
			   "__"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/business/2014/10/22/spc-african-start-up-pink-foods-industries.cnn",
			   "Duo puts Ugandan chocolate on the map",
			   "__"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/business/2014/10/22/spc-smart-business-brooklyn-boulders.cnn",
			   "Hybrid space stimulates innovation",
			   "__"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/22/business/cape-town-world-design-capital/index.html?eref=edition",
			   "This is Africa's most creative city",
			   "CNN Marketplace Africa is a weekly show offering a unique window into African business on and off the continent \n\n(CNN) -- Abandoned workshops and empty warehouses are getting a new lease of life in Cape Town. Spaces that once housed production lines are now becoming creative hotspots for artists, designers and musicians living in a city that holds the title of World Design Capital for 2014.\n\nThis urban regeneration might be most true in one of Cape Town's oldest suburbs: Woodstock. Visitors to the area can see the busy harbor to the north and the majestic Table Mountain to the south. But most people wandering around the area aren't here for the views -- with its craft stores, art markets, theaters and award-winning restaurants, this is a hot address for young urbanites.\n\nBased here is also the Old Biscuit Mill, a converted building that has now become a hive of retail activity.\n\n\"When we started we knew we had made the best decision to be based in Woodstock specifically,\" says Zizi Po"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/22/tech/smart-meters-africa-smart-business/index.html?eref=edition",
			   "Prepaid smart meters outwit power thieves",
			   "Editor's note: Smart Business explores the ways companies are thinking smart to thrive in our digitized world. \n\n(CNN) -- In the narrow winding lanes of Old Delhi, the knotted masses of electrical wiring hanging across the streets are sometimes so thickly entwined they blot out the sun.\n\nIn the streets of Bangkok, electricity wires loop and run in chaotic bundles from concrete power poles. In the slums of Mumbai to the townships of South Africa, electricity infrastructure is a triumph of make and mend.\n\nFor power utilities in emerging markets, collecting the bills from this tangled skein of wiring is a nightmare and slow payment - even outright energy theft - remains a powerful disincentive for new investment in the sector.\n\nSmart solutions\n\nOne company, however, says smart meters may hold the answers to the power problems of the world's emerging markets.\n\nWhile smart meters have been in use in the United States and Europe for more than a decade, in markets such as Africa they are set "
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/tech/smart-meters-africa-smart-business/index.html",
			   "Smart meters foil Africa's power thieves",
			   "Editor's note: Smart Business explores the ways companies are thinking smart to thrive in our digitized world. \n\n(CNN) -- In the narrow winding lanes of Old Delhi, the knotted masses of electrical wiring hanging across the streets are sometimes so thickly entwined they blot out the sun.\n\nIn the streets of Bangkok, electricity wires loop and run in chaotic bundles from concrete power poles. In the slums of Mumbai to the townships of South Africa, electricity infrastructure is a triumph of make and mend.\n\nFor power utilities in emerging markets, collecting the bills from this tangled skein of wiring is a nightmare and slow payment - even outright energy theft - remains a powerful disincentive for new investment in the sector.\n\nSmart solutions\n\nOne company, however, says smart meters may hold the answers to the power problems of the world's emerging markets.\n\nWhile smart meters have been in use in the United States and Europe for more than a decade, in markets such as Africa they are set "
			  ],
			  [
			   "http://edition.cnn.com/2014/10/22/business/cape-town-world-design-capital/index.html?eref=edition",
			   "Take a tour inside World Design Capital",
			   "CNN Marketplace Africa is a weekly show offering a unique window into African business on and off the continent \n\n(CNN) -- Abandoned workshops and empty warehouses are getting a new lease of life in Cape Town. Spaces that once housed production lines are now becoming creative hotspots for artists, designers and musicians living in a city that holds the title of World Design Capital for 2014.\n\nThis urban regeneration might be most true in one of Cape Town's oldest suburbs: Woodstock. Visitors to the area can see the busy harbor to the north and the majestic Table Mountain to the south. But most people wandering around the area aren't here for the views -- with its craft stores, art markets, theaters and award-winning restaurants, this is a hot address for young urbanites.\n\nBased here is also the Old Biscuit Mill, a converted building that has now become a hive of retail activity.\n\n\"When we started we knew we had made the best decision to be based in Woodstock specifically,\" says Zizi Po"
			  ],
			  [
			   "http://money.cnn.com/2014/10/07/smallbusiness/minneapolis-immigrant-business/index.html",
			   "Immigrants create jobs with help of loans",
			   "Omer Kissi used a loan from St. Paul's Neighborhood Development Center to start a business that now employs nine people. NEW YORK (CNNMoney) Cities often struggle with two distinct but related problems: Revitalizing neighborhoods and employing immigrants. Minneapolis-St. Paul has found a way to do both. \n\nSince 1993, the Neighborhood Development Center has provided training and $11 million in loans to immigrant and minority entrepreneurs. There are now over 500 center-backed businesses in the Twin Cities employing some 2,500 people -- many in economically distressed areas. \n\nOromiya Transportation Services was started in 2011 when Omer Kissi, a 45-year-old immigrant from Ethiopia, bought a used Dodge Caravan for $6,200. \n\nKissi, who followed his fiance to the United States in 2008, used the Caravan to shuttle elderly patients to the drug store or doctor's office. He wanted to expand his business, but he had trouble getting access to capital. And although he was trained in Ethiopia as a"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/business/cape-town-world-design-capital/index.html",
			   "Creating a new Cape Town through design",
			   "CNN Marketplace Africa is a weekly show offering a unique window into African business on and off the continent \n\n(CNN) -- Abandoned workshops and empty warehouses are getting a new lease of life in Cape Town. Spaces that once housed production lines are now becoming creative hotspots for artists, designers and musicians living in a city that holds the title of World Design Capital for 2014.\n\nThis urban regeneration might be most true in one of Cape Town's oldest suburbs: Woodstock. Visitors to the area can see the busy harbor to the north and the majestic Table Mountain to the south. But most people wandering around the area aren't here for the views -- with its craft stores, art markets, theaters and award-winning restaurants, this is a hot address for young urbanites.\n\nBased here is also the Old Biscuit Mill, a converted building that has now become a hive of retail activity.\n\n\"When we started we knew we had made the best decision to be based in Woodstock specifically,\" says Zizi Po"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/22/business/countering-the-counterfeiters-art-money/index.html?eref=edition",
			   "Is this the world's sexiest banknote?",
			   "Future Finance showcases future trends related to the global financial system. \n\n(CNN) -- Legend has it that when the surrealist painter Salvador Dali had to pay for an expensive restaurant meal he would twizzle his famous mustache and arch his eyebrows before beguiling his host into letting him dine for free.\n\nThe crafty Catalan, it is said, would write out a check for the required amount and sign on the dotted line. Just before handing the payment over, however, he would pull the piece of paper back and pen an elaborate doodle on the opposite side.\n\n\"An original from the master Dali. I will never cash this check,\" would inevitably be the reply from the starstruck restaurant owner thrilled to be gifted an artwork that would doubtless be of greater value than the amount on the check itself.\n\nBy perfecting the magic checkbook technique, Dali would rarely, if ever, have to pay for his dining habits.\n\nPeople might not horde the recently revealed 100 Norwegian Krone ($15) banknote in the s"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/22/business/countering-the-counterfeiters-art-money/index.html?eref=edition",
			   "Counterfeit notes",
			   "Future Finance showcases future trends related to the global financial system. \n\n(CNN) -- Legend has it that when the surrealist painter Salvador Dali had to pay for an expensive restaurant meal he would twizzle his famous mustache and arch his eyebrows before beguiling his host into letting him dine for free.\n\nThe crafty Catalan, it is said, would write out a check for the required amount and sign on the dotted line. Just before handing the payment over, however, he would pull the piece of paper back and pen an elaborate doodle on the opposite side.\n\n\"An original from the master Dali. I will never cash this check,\" would inevitably be the reply from the starstruck restaurant owner thrilled to be gifted an artwork that would doubtless be of greater value than the amount on the check itself.\n\nBy perfecting the magic checkbook technique, Dali would rarely, if ever, have to pay for his dining habits.\n\nPeople might not horde the recently revealed 100 Norwegian Krone ($15) banknote in the s"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/business/countering-the-counterfeiters-art-money/index.html",
			   "Countering the counterfeiters: The art of making money",
			   "Future Finance showcases future trends related to the global financial system. \n\n(CNN) -- Legend has it that when the surrealist painter Salvador Dali had to pay for an expensive restaurant meal he would twizzle his famous mustache and arch his eyebrows before beguiling his host into letting him dine for free.\n\nThe crafty Catalan, it is said, would write out a check for the required amount and sign on the dotted line. Just before handing the payment over, however, he would pull the piece of paper back and pen an elaborate doodle on the opposite side.\n\n\"An original from the master Dali. I will never cash this check,\" would inevitably be the reply from the starstruck restaurant owner thrilled to be gifted an artwork that would doubtless be of greater value than the amount on the check itself.\n\nBy perfecting the magic checkbook technique, Dali would rarely, if ever, have to pay for his dining habits.\n\nPeople might not horde the recently revealed 100 Norwegian Krone ($15) banknote in the s"
			  ],
			  [
			   "http://money.cnn.com/2014/10/21/media/joseph-weisenthal-business-insider-bloomberg/index.html?section=money_news_international",
			   "Business Insider editor joins Bloomberg",
			   "When your news site knows your pant size NEW YORK (CNNMoney) Joseph Weisenthal, the executive editor of Business Insider, will join Bloomberg as the host of a daily TV show and managing editor of its website's markets coverage, the company announced on Tuesday. \n\nThe move is surprising considering that Weisenthal was one of the first members of Business Insider and is a prominent part of the site's newsroom and operations. \n\nIt also comes during a hiring spree and new strategy at Bloomberg, which is grabbing up high-profile talent for coverage across all platforms. \n\nBloomberg TV did not specify a launch date or time slot for Weisenthal's show, but afternoon is likely, given his focus on market news. \n\nIt is expected to hire roughly a dozen people to work with Weisenthal on the markets section of its web site. \n\nIn recent months, Bloomberg has hired The Verge's co-founder Joshua Topolsky. It has also upped its political coverage by bringing on journalists John Heilemann and Mark Halper"
			  ],
			  [
			   "http://edition.cnn.com/video/data/2.0/video/business/2014/10/15/spc-virtual-think-tank-middle-class.cnn.html",
			   "Rise of China's middle classes",
			   "CNN's Andrew Stevens talks to a panel of experts about the rising spending power of the Chinese middle-class. \n  \nIf your browser has Adobe Flash Player installed, click above to play.  Otherwise, click below."
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/business/gene-simmons-book-kiss-boss-advice/index.html?hpt=ibu_c2",
			   "KISS singer gives business tips",
			   "Editor's note: Below is an extract from Gene Simmons' book Gene Simmons co-founded the rock supergroup KISS in the early 1970s. Since then, KISS has sold more than 80 million albums and performed more than 2,000 shows around the world. \n\n(CNN) -- On February 21, 1974, the first KISS album was released. That's forty years from this writing! What a crazy trip it's been.\n\nBy the summer of 1972, it looked like Wicked Lester wasn't going to work, even though we had a recording contract with Epic Records.\n\nSo Paul Stanley and I regrouped and started again. This time, we would put together the band we never saw onstage, the band that we wanted to be. This time, we would make sure we had the right lineup. This time, we would make sure we had the right songs.\n\nWe did it the right way.\n\nWe self-funded the band. We had no other partners. There were no investors. There was only us. Mostly, there was only Paul and myself.\n\nThis time we were going to do it for real.\n\nGo big, or go home.\n\nBut we had "
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/business/gene-simmons-book-kiss-boss-advice/index.html?eref=edition",
			   "Unleash your inner rock god",
			   "Editor's note: Below is an extract from Gene Simmon's book Gene Simmons co-founded the rock supergroup KISS in the early 1970s. Since then, KISS has sold more than 80 million albums and performed more than 2,000 shows around the world. \n\n(CNN) -- On February 21, 1974, the first KISS album was released. That's forty years from this writing! What a crazy trip it's been.\n\nBy the summer of 1972, it looked like Wicked Lester wasn't going to work, even though we had a recording contract with Epic Records.\n\nSo Paul Stanley and I regrouped and started again. This time, we would put together the band we never saw onstage, the band that we wanted to be. This time, we would make sure we had the right lineup. This time, we would make sure we had the right songs.\n\nWe did it the right way.\n\nWe self-funded the band. We had no other partners. There were no investors. There was only us. Mostly, there was only Paul and myself.\n\nThis time we were going to do it for real.\n\nGo big, or go home.\n\nBut we had "
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/business/gene-simmons-book-kiss-boss-advice/index.html?eref=edition",
			   "Musings of a rock god",
			   "Editor's note: Below is an extract from Gene Simmon's book Gene Simmons co-founded the rock supergroup KISS in the early 1970s. Since then, KISS has sold more than 80 million albums and performed more than 2,000 shows around the world. \n\n(CNN) -- On February 21, 1974, the first KISS album was released. That's forty years from this writing! What a crazy trip it's been.\n\nBy the summer of 1972, it looked like Wicked Lester wasn't going to work, even though we had a recording contract with Epic Records.\n\nSo Paul Stanley and I regrouped and started again. This time, we would put together the band we never saw onstage, the band that we wanted to be. This time, we would make sure we had the right lineup. This time, we would make sure we had the right songs.\n\nWe did it the right way.\n\nWe self-funded the band. We had no other partners. There were no investors. There was only us. Mostly, there was only Paul and myself.\n\nThis time we were going to do it for real.\n\nGo big, or go home.\n\nBut we had "
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/business/gene-simmons-book-kiss-boss-advice/index.html?eref=edition",
			   "The face of a great boss?",
			   "Editor's note: Below is an extract from Gene Simmon's book Gene Simmons co-founded the rock supergroup KISS in the early 1970s. Since then, KISS has sold more than 80 million albums and performed more than 2,000 shows around the world. \n\n(CNN) -- On February 21, 1974, the first KISS album was released. That's forty years from this writing! What a crazy trip it's been.\n\nBy the summer of 1972, it looked like Wicked Lester wasn't going to work, even though we had a recording contract with Epic Records.\n\nSo Paul Stanley and I regrouped and started again. This time, we would put together the band we never saw onstage, the band that we wanted to be. This time, we would make sure we had the right lineup. This time, we would make sure we had the right songs.\n\nWe did it the right way.\n\nWe self-funded the band. We had no other partners. There were no investors. There was only us. Mostly, there was only Paul and myself.\n\nThis time we were going to do it for real.\n\nGo big, or go home.\n\nBut we had "
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/business/gene-simmons-book-kiss-boss-advice/index.html",
			   "Choose your partners wisely, says rock legend Gene Simmons",
			   "Editor's note: Below is an extract from Gene Simmon's book Gene Simmons co-founded the rock supergroup KISS in the early 1970s. Since then, KISS has sold more than 80 million albums and performed more than 2,000 shows around the world. \n\n(CNN) -- On February 21, 1974, the first KISS album was released. That's forty years from this writing! What a crazy trip it's been.\n\nBy the summer of 1972, it looked like Wicked Lester wasn't going to work, even though we had a recording contract with Epic Records.\n\nSo Paul Stanley and I regrouped and started again. This time, we would put together the band we never saw onstage, the band that we wanted to be. This time, we would make sure we had the right lineup. This time, we would make sure we had the right songs.\n\nWe did it the right way.\n\nWe self-funded the band. We had no other partners. There were no investors. There was only us. Mostly, there was only Paul and myself.\n\nThis time we were going to do it for real.\n\nGo big, or go home.\n\nBut we had "
			  ],
			  [
			   "http://money.cnn.com/2014/10/21/media/joseph-weisenthal-business-insider-bloomberg/index.html",
			   "A top editor quits Business Insider",
			   "When your news site knows your pant size NEW YORK (CNNMoney) Joseph Weisenthal, the executive editor of Business Insider, will join Bloomberg as the host of a daily TV show and managing editor of its website's markets coverage, the company announced on Tuesday. \n\nThe move is surprising considering that Weisenthal was one of the first members of Business Insider and is a prominent part of the site's newsroom and operations. \n\nIt also comes during a hiring spree and new strategy at Bloomberg, which is grabbing up high-profile talent for coverage across all platforms. \n\nBloomberg TV did not specify a launch date or time slot for Weisenthal's show, but afternoon is likely, given his focus on market news. \n\nIt is expected to hire roughly a dozen people to work with Weisenthal on the markets section of its web site. \n\nIn recent months, Bloomberg has hired The Verge's co-founder Joshua Topolsky. It has also upped its political coverage by bringing on journalists John Heilemann and Mark Halper"
			  ],
			  [
			   "http://money.cnn.com/2014/10/21/media/joseph-weisenthal-business-insider-bloomberg/index.html",
			   "Joseph Weisenthal leaves Business Insider to host TV show at Bloomberg",
			   "When your news site knows your pant size NEW YORK (CNNMoney) Joseph Weisenthal, the executive editor of Business Insider, will join Bloomberg as the host of a daily TV show and managing editor of its website's markets coverage, the company announced on Tuesday. \n\nThe move is surprising considering that Weisenthal was one of the first members of Business Insider and is a prominent part of the site's newsroom and operations. \n\nIt also comes during a hiring spree and new strategy at Bloomberg, which is grabbing up high-profile talent for coverage across all platforms. \n\nBloomberg TV did not specify a launch date or time slot for Weisenthal's show, but afternoon is likely, given his focus on market news. \n\nIt is expected to hire roughly a dozen people to work with Weisenthal on the markets section of its web site. \n\nIn recent months, Bloomberg has hired The Verge's co-founder Joshua Topolsky. It has also upped its political coverage by bringing on journalists John Heilemann and Mark Halper"
			  ],
			  [
			   "http://money.cnn.com/2014/10/21/media/joseph-weisenthal-business-insider-bloomberg/index.html",
			   "Joseph Weisenthal leaves Business Insider to join Bloomberg",
			   "When your news site knows your pant size NEW YORK (CNNMoney) Joseph Weisenthal, the executive editor of Business Insider, will join Bloomberg as the host of a daily TV show and managing editor of its website's markets coverage, the company announced on Tuesday. \n\nThe move is surprising considering that Weisenthal was one of the first members of Business Insider and is a prominent part of the site's newsroom and operations. \n\nIt also comes during a hiring spree and new strategy at Bloomberg, which is grabbing up high-profile talent for coverage across all platforms. \n\nBloomberg TV did not specify a launch date or time slot for Weisenthal's show, but afternoon is likely, given his focus on market news. \n\nIt is expected to hire roughly a dozen people to work with Weisenthal on the markets section of its web site. \n\nIn recent months, Bloomberg has hired The Verge's co-founder Joshua Topolsky. It has also upped its political coverage by bringing on journalists John Heilemann and Mark Halper"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/business/2014/10/21/spc-one-square-meter-japan-hydroponic-vegetable-farms.cnn",
			   "Old factories turned into vegetable farms",
			   "__"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/business/2014/10/21/spc-future-finance-mobile-money.cnn",
			   "Is mobile money the future?",
			   "__"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/business/2014/10/21/spc-leading-women-jo-malone.cnn",
			   "Tough childhood inspired Jo Malone",
			   "__"
			  ],
			  [
			   "http://money.cnn.com/2014/10/21/smallbusiness/ag-tech-startups/index.html",
			   "Get ready for robot farmers",
			   "Matija Kopic, cofounder of Farmeron. NEW YORK (CNNMoney) On most lettuce farms, workers weave between rows to cull extra heads of lettuce crowding out the healthiest plants. The practice, called thinning, is labor-intensive and a labor shortage has made it difficult to find workers for the task. \n\nIn 2011, Jorge Heraud and Lee Redden came up with the idea to use robotics to mechanize lettuce thinning as part of their coursework in Stanford's executive MBA program. \n\n\"Mention robotics in agriculture and people think it's R2D2 and C3PO going into the field, but that's not quite what we do,\" says Heraud, the former head of precision agriculture for GPS tech giant Trimble Navigation. \n\nTheir product, the LettuceBot, is a \"smart\" farm implement that attaches to a tractor. Using cameras and algorithms, the machine measures plant size and assesses color, making split-second decisions about which lettuce plants to keep. \n\nThe pair launched their Sunnyvale, Calif., startup Blue River Technology"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/business/2014/10/21/spc-reading-for-leading-mark-carney.cnn",
			   "Bank of England boss reads up on conflict",
			   "__"
			  ],
			  [
			   "http://finance.fortune.cnn.com/2014/10/20/satya-nadella-power-every-business/",
			   "Microsoft's CEO emphasizes the cloud as consumer business faces challenges",
			   "TECH    MANAGEMENT    FINANCE    MARKETS    CAREERS    AUTOS    INTERNATIONAL    RETAIL    FEATURES    SMALL BUSINESS    VIDEO    MAGAZINE    FORTUNE CONFERENCES"
			  ],
			  [
			   "http://finance.fortune.cnn.com/2014/10/20/satya-nadella-power-every-business/",
			   "Amid trouble with consumers, Microsoft's CEO emphasizes the cloud",
			   "TECH    MANAGEMENT    FINANCE    MARKETS    CAREERS    AUTOS    INTERNATIONAL    RETAIL    FEATURES    SMALL BUSINESS    VIDEO    MAGAZINE    FORTUNE CONFERENCES"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/business/2014/10/20/wbt-will-i-am-smartwatch.cnn",
			   "Will.i.am creates fashionable smartwatch",
			   "__"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/business/2014/10/20/spc-marketplace-africa-cape-town-design.cnn",
			   "Cape Town invests in design",
			   "__"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/business/2014/10/20/spc-marketplace-africa-thundafund.cnn",
			   "Bringing crowd-funding to S. Africa",
			   "__"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/business/2014/10/20/wbt-intv-us-energy-growing.cnn",
			   "U.S. energy production is growing",
			   "__"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/business/2014/10/20/spc-marketplace-africa-thundafund.cnn",
			   "Bringing crowd-funding comes to S. Africa",
			   "__"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/business/2014/10/20/wbt-intv-west-africa-food-shortages.cnn",
			   "Food Shortages in West Africa",
			   "__"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/business/2014/10/20/qmb-boq-rfl-car-2.cnn",
			   "Reading for Leading with Mark Carney",
			   "__"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/20/business/body-language-work/index.html",
			   "Are you a big poser? You should be.",
			   "Editor's note: 'Thinking Business' focuses on the psychology of getting ahead in the workplace by exploring techniques to boost employee performance, increase creativity and productivity. \n\nLondon (CNN) -- Imagine your boss as a caveman.\n\nHe's running across the Savannah -- chasing Palaeolithic game with a rock, wearing only a loincloth.\n\nHe spots you and halts! Assuming a defensive position, his eyes carefully scan you for signs: Are you friend or foe?\n\nThe verdict takes seconds for him to reach, and with no verbal language to inform him, his decision is based primarily on your body language.\n\nBelieve it or not, this is similar to what happens in office environments around the world, every day.\n\nThe power of body language \n\n\"In the first few seconds of meeting someone, they will determine whether you are friend or predator, and the rest of the time their brains will be gathering information to support that,\" says Mark Bowden, author of Winning Body Language.\n\n\"In business, first impre"
			  ],
			  [
			   "http://finance.fortune.cnn.com/2014/10/20/is-it-do-svidanya-for-russia-and-the-west-one-businessman-thinks-so/",
			   "Is it 'do svidanya' for Russia and the West? One businessman thinks so",
			   "TECH    MANAGEMENT    FINANCE    MARKETS    CAREERS    AUTOS    INTERNATIONAL    RETAIL    FEATURES    SMALL BUSINESS    VIDEO    MAGAZINE    FORTUNE CONFERENCES"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/business/2014/10/20/wbt-intv-toms-shoes-haiti-help.cnn",
			   "TOMS Shoes backs Haiti",
			   "__"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/business/2014/10/20/wbt-intv-west-africa-food-shortages.cnn",
			   "West Africa food shortage causes concern",
			   "__"
			  ],
			  [
			   "http://www.cnn.com/2014/10/20/business/business-talent-group/index.html",
			   "Is this the end of the 9-5 working day?",
			   "Editor's note: Smart Business explores the ways companies are thinking smart to thrive in our digitized world. \n\n(CNN) -- High level workers are looking for an alternative to the 9 to 5. Armed with years of experience, a growing number of professionals are looking to fashion project-based careers where the monotony of office life is exchanged for a varied and tailored work schedule. Business Talent Group, the brainchild of Jody Miller, works with nearly 300 companies to provide projects for its highly experienced pool of workers. Roping in opportunities from sectors such as Healthcare, Media and Manufacturing, the 'full-time' employee may be a role of the past.\n\nCNN: What is the landscape like for employee recruitment? \n\nJody Miller: Typically, companies that have to get work done have two ways they look at it: one is that they usually hire full-time employees or they can go out to firms, consulting firms, outsourcing firms and have them do work. In fact, there's a growing population o"
			  ],
			  [
			   "http://money.cnn.com/2014/10/20/smallbusiness/high-point-market/index.html",
			   "How to make $2.7 billion in a week",
			   "High Point, N.C., generates billions in revenue each year by hosting two furniture markets. NEW YORK (CNNMoney) It's like Fashion Week for the furniture world. \n\nTwice a year, anyone who's anyone in furniture manufacturing and home goods gathers in North Carolina for the High Point Furniture Market. \n\nHigh Point, N.C., which has roughly 100,000 residents, nearly doubles in size for two weeks a year. The market hosts 75,000 attendees and 2,000 exhibitors for a week in April and then again in October. It brings $5.4 billion into the local economy -- and creates over 20,000 jobs. \n\n\"I can't imagine what the area economy would look like if we didn't have the market,\" said Tom Conley, CEO of High Point Market Authority. \n\nRay Wheatley and his wife Lisa own the Real Kitchen & Market, a High Point catering business. On a normal day, they have between 75-100 customers (usually picking up food for their families). During each market, they feed roughly 15,000 people. \n\nAs a result, sales during "
			  ],
			  [
			   "http://edition.cnn.com/2014/10/20/business/body-language-work/index.html?eref=edition",
			   "Strike a pose: Body language for success",
			   "Editor's note: 'Thinking Business' focuses on the psychology of getting ahead in the workplace by exploring techniques to boost employee performance, increase creativity and productivity. \n\nLondon (CNN) -- Imagine your boss as a caveman.\n\nHe's running across the Savannah -- chasing Palaeolithic game with a rock, wearing only a loincloth.\n\nHe spots you and halts! Assuming a defensive position, his eyes carefully scan you for signs: Are you friend or foe?\n\nThe verdict takes seconds for him to reach, and with no verbal language to inform him, his decision is based primarily on your body language.\n\nBelieve it or not, this is similar to what happens in office environments around the world, every day.\n\nThe power of body language \n\n\"In the first few seconds of meeting someone, they will determine whether you are friend or predator, and the rest of the time their brains will be gathering information to support that,\" says Mark Bowden, author of Winning Body Language.\n\n\"In business, first impre"
			  ],
			  [
			   "http://www.cnn.com/2014/10/20/business/body-language-work/index.html",
			   "Strike a pose: Body language that projects success",
			   "Editor's note: 'Thinking Business' focuses on the psychology of getting ahead in the workplace by exploring techniques to boost employee performance, increase creativity and productivity. \n\nLondon (CNN) -- Imagine your boss as a caveman.\n\nHe's running across the Savannah -- chasing Palaeolithic game with a rock, wearing only a loincloth.\n\nHe spots you and halts! Assuming a defensive position, his eyes carefully scan you for signs: Are you friend or foe?\n\nThe verdict takes seconds for him to reach, and with no verbal language to inform him, his decision is based primarily on your body language.\n\nBelieve it or not, this is similar to what happens in office environments around the world, every day.\n\nThe power of body language \n\n\"In the first few seconds of meeting someone, they will determine whether you are friend or predator, and the rest of the time their brains will be gathering information to support that,\" says Mark Bowden, author of Winning Body Language.\n\n\"In business, first impre"
			  ],
			  [
			   "http://us.cnn.com/video/data/2.0/video/business/2014/10/17/cnn-orig-what-is-venture-capital-cristina-alesci.cnn.html?hpt=hp_t4",
			   "The risky way to be a billionaire",
			   "CNNMoney's Cristina Alesci explains venture capital and and why it's risky. \n\nIf your browser has Adobe Flash Player installed, click above to play. Otherwise, click below."
			  ],
			  [
			   "http://edition.cnn.com/2014/10/20/business/smell-of-success-jo-malone/index.html?hpt=ibu_c2",
			   "This is a million dollar nose",
			   "Editor's note: Leading Women connects you to extraordinary women of our time -- remarkable professionals who have made it to the top in all areas of business, the arts, sport, culture, science and more. \n\n(CNN) -- Jo Malone must have one of the most lucrative noses on the planet.\n\nThe British entrepreneur's ability to create delicate scents -- apparently coveted by everyone from the Duchess of Cambridge to Jennifer Lopez -- helped her create a multi-million dollar fragrance empire.\n\nToday her name is synonymous with luxuriously scented cream-colored candles with minimalist black trim, delivered in an oversized carrier bag.\n\nMalone sold her namesake fragrance company to cosmetics giant Estée Lauder in 2006 in a rumored multi-million dollar deal, admitting \"I hadn't anticipated how much of my soul was in that business.\"\n\nFive years later she launched a new company -- Jo Loves -- which much like the original store, sells candles, bath oils, and perfumes, now with names like \"Shards of Ced"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/19/business/gallery/super-boss-route-to-the-top/index.html?section=money_news_international",
			   "Is this the face of a leader?",
			   "CNN's Route to the Top asked a number of leadership experts which CEOs and business leaders they thought embodied the essential qualities needed to be the best boss. With Warren Buffet's head for business and Jack Ma's honesty, is this what the ultimate super boss would look like?  Design: Jason Kwok/CNN Text: Sophie Brown"
			  ],
			  [
			   "http://www.cnn.com/2014/10/20/business/business-talent-group/index.html",
			   "End of the 9-5?",
			   "Editor's note: Smart Business explores the ways companies are thinking smart to thrive in our digitized world. \n\n(CNN) -- High level workers are looking for an alternative to the 9 to 5. Armed with years of experience, a growing number of professionals are looking to fashion project-based careers where the monotony of office life is exchanged for a varied and tailored work schedule. Business Talent Group, the brainchild of Jody Miller, works with nearly 300 companies to provide projects for its highly experienced pool of workers. Roping in opportunities from sectors such as Healthcare, Media and Manufacturing, the 'full-time' employee may be a role of the past.\n\nCNN: What is the landscape like for employee recruitment? \n\nJody Miller: Typically, companies that have to get work done have two ways they look at it: one is that they usually hire full-time employees or they can go out to firms, consulting firms, outsourcing firms and have them do work. In fact, there's a growing population o"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/20/business/smell-of-success-jo-malone/index.html?eref=edition",
			   "Smell of success: The 'million dollar nose'",
			   "Editor's note: Leading Women connects you to extraordinary women of our time -- remarkable professionals who have made it to the top in all areas of business, the arts, sport, culture, science and more. \n\n(CNN) -- Jo Malone must have one of the most lucrative noses on the planet.\n\nThe British entrepreneur's ability to create delicate scents -- apparently coveted by everyone from the Duchess of Cambridge to Jennifer Lopez -- helped her create a multi-million dollar fragrance empire.\n\nToday her name is synonymous with luxuriously scented cream-colored candles with minimalist black trim, delivered in an oversized carrier bag.\n\nMalone sold her namesake fragrance company to cosmetics giant Estée Lauder in 2006 in a rumored multi-million dollar deal, admitting \"I hadn't anticipated how much of my soul was in that business.\"\n\nFive years later she launched a new company -- Jo Loves -- which much like the original store, sells candles, bath oils, and perfumes, now with names like \"Shards of Ced"
			  ],
			  [
			   "http://www.cnn.com/2014/10/20/business/smell-of-success-jo-malone/index.html",
			   "Smell of success: Jo Malone's 'million dollar nose'",
			   "Editor's note: Leading Women connects you to extraordinary women of our time -- remarkable professionals who have made it to the top in all areas of business, the arts, sport, culture, science and more. \n\n(CNN) -- Jo Malone must have one of the most lucrative noses on the planet.\n\nThe British entrepreneur's ability to create delicate scents -- apparently coveted by everyone from the Duchess of Cambridge to Jennifer Lopez -- helped her create a multi-million dollar fragrance empire.\n\nToday her name is synonymous with luxuriously scented cream-colored candles with minimalist black trim, delivered in an oversized carrier bag.\n\nMalone sold her namesake fragrance company to cosmetics giant Estée Lauder in 2006 in a rumored multi-million dollar deal, admitting \"I hadn't anticipated how much of my soul was in that business.\"\n\nFive years later she launched a new company -- Jo Loves -- which much like the original store, sells candles, bath oils, and perfumes, now with names like \"Shards of Ced"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/19/business/gallery/super-boss-route-to-the-top/index.html?eref=edition",
			   "What would world's best boss look like?",
			   "CNN's Route to the Top asked a number of leadership experts which CEOs and business leaders they thought embodied the essential qualities needed to be the best boss. With Warren Buffet's head for business and Jack Ma's honesty, is this what the ultimate super boss would look like?"
			  ],
			  [
			   "http://www.cnn.com/2014/10/14/business/rocket-space-plane/index.html",
			   "Rocket-powered toy in stratosphere",
			   "(CNN) -- The first 3D-printed toy plane will soon jet off to the stratosphere.\n\nThe rocket-powered airplane will reach an altitude of between 25 and 30 kilometers (15 to 18 miles) -- three times higher than the cruising height of commercial airplanes.\n\n\"Without doubt, this is the most complicated amateur high-altitude mission ever undertaken,\" said Lester Haines, head of the Register's Special Projects Bureau that is behind the project.\n\nThe components of the airplane have been designed by postgraduate students at the University of Southampton and produced using a 3D printer.\n\n\"We don't know quite what will happen when the big day arrives, but one thing's for sure -- it's going to be quite a show,\" Heines, who also holds the Guinness World Record for the highest launch of a paper aeroplane, added.\n\nIt took the team four years, thousands of volunteer hours, and $60,000 from crowdfunding, to complete the \"Lohan.\" The nickname is short for \"Low Orbit Helium Assisted Navigator\" and, its in"
			  ],
			  [
			   "http://money.cnn.com/2014/10/17/smallbusiness/prefer-male-boss/index.html",
			   "Female entrepreneurs on the rise, but 33% still prefer a man",
			   "NEW YORK (CNNMoney) In the 1950s, Americans were asked, \"If you were taking a new job and had your choice of a boss, would you prefer to work for a man or a woman?\" \n\nIt's a question Gallup still asks. \n\nIn 1953, two-thirds said they'd prefer a man. In 2014, one-third said they would. So, 61 years and 33 percentage points. Depending on who you ask, that's either an improvement to be celebrated or a frustrating signal that sexism is still alive and well. Or both. There are about 9 million women-owned businesses in the U.S., and in the past year, women have started 1,200 new businesses each day, according to the 2014 State of Women-Owned Business Report, which was commissioned by American Express. \n\nHowever, while women-owned businesses continue to grow, the businesses are relatively small, employing just 6% of the country's workforce and contributing just under 4% of business revenues. That's about the same share as in 1997. \n\nIt isn't clear how employees' preferences on their boss' gen"
			  ],
			  [
			   "http://finance.fortune.cnn.com/2014/10/19/the-container-stores-ceo-unpacks-its-business-philosophy/",
			   "The Container Store's CEO unpacks his business philosophy",
			   "TECH    MANAGEMENT    FINANCE    MARKETS    CAREERS    AUTOS    INTERNATIONAL    RETAIL    FEATURES    SMALL BUSINESS    VIDEO    MAGAZINE    FORTUNE CONFERENCES"
			  ],
			  [
			   "http://finance.fortune.cnn.com/2014/10/19/the-container-stores-ceo-unpacks-its-business-philosophy/",
			   "The Container Store's CEO unpacks its business philosophy",
			   "TECH    MANAGEMENT    FINANCE    MARKETS    CAREERS    AUTOS    INTERNATIONAL    RETAIL    FEATURES    SMALL BUSINESS    VIDEO    MAGAZINE    FORTUNE CONFERENCES"
			  ],
			  [
			   "http://money.cnn.com/video/smallbusiness/2014/10/17/most-innovative-cities-san-francisco-sustainable-instruments.cnnmoney",
			   "SF company makes guitars from plants",
			   "Market indexes are shown in real time, except for the DJIA, which is delayed by two minutes. All times are ET. Disclaimer Morningstar: © 2014  Morningstar, Inc.  All Rights Reserved. Disclaimer The Dow Jones Indexes SM are proprietary to and distributed by Dow Jones & Company, Inc. and have been licensed for use.  All content of the Dow Jones Indexes SM © 2014 is proprietary to Dow Jones & Company, Inc. \r\nChicago Mercantile Association. The market data is the property of Chicago Mercantile Exchange Inc. and its licensors. All rights reserved. \r\nFactSet Research Systems Inc. 2014. All rights reserved. Most stock quote data provided by BATS."
			  ],
			  [
			   "http://www.cnn.com/video/#/video/business/2014/10/17/cnn-orig-what-is-venture-capital-cristina-alesci.cnn",
			   "How billion dollar companies are made",
			   "__"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/business/2014/10/17/qmb-rocky-markets-martin-sorrell-andy-haldane-intv.cnn",
			   "What to make of market's rocky week?",
			   "__"
			  ],
			  [
			   "http://money.cnn.com/2014/10/17/smallbusiness/prefer-male-boss/index.html",
			   "More people prefer a male boss",
			   "NEW YORK (CNNMoney) In the 1950s, Americans were asked, \"If you were taking a new job and had your choice of a boss, would you prefer to work for a man or a woman?\" \n\nIt's a question Gallup still asks. \n\nIn 1953, two-thirds said they'd prefer a man. In 2014, one-third said they would. So, 61 years and 33 percentage points. Depending on who you ask, that's either an improvement to be celebrated or a frustrating signal that sexism is still alive and well. Or both. There are about 9 million women-owned businesses in the U.S., and in the past year, women have started 1,200 new businesses each day, according to the 2014 State of Women-Owned Business Report, which was commissioned by American Express. \n\nHowever, while women-owned businesses continue to grow, the businesses are relatively small, employing just 6% of the country's workforce and contributing just under 4% of business revenues. That's about the same share as in 1997. \n\nIt isn't clear how employees' preferences on their boss' gen"
			  ],
			  [
			   "http://edition.cnn.com/video/data/2.0/video/business/2014/10/17/bizview-luxury-stocks-outlook-ollivier.cnn.html",
			   "Luxury hopes for Asia",
			   "A luxury brand analyst predicts Asia will remain an engine for growth for many luxury brands."
			  ],
			  [
			   "http://www.cnn.com/video/#/video/business/2014/10/17/spc-marketplace-middle-east-gateway-dubai-a.cnn",
			   "Dubai's trade links to Africa",
			   "__"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/business/2014/10/17/spc-marketplace-middle-east-africa-richest-man-b.cnn",
			   "Africa's rishest man on trade with Dubai",
			   "__"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/business/2014/10/17/bizview-luxury-stocks-outlook-ollivier.cnn",
			   "Luxury brands lower outlook",
			   "__"
			  ],
			  [
			   "http://finance.fortune.cnn.com/2014/10/17/small-business-challenges/",
			   "Small, but fierce: How tiny firms can pack a big punch",
			   "TECH    MANAGEMENT    FINANCE    MARKETS    CAREERS    AUTOS    INTERNATIONAL    RETAIL    FEATURES    SMALL BUSINESS    VIDEO    MAGAZINE    FORTUNE CONFERENCES"
			  ],
			  [
			   "http://edition.cnn.com/video/data/2.0/video/business/2014/10/15/spc-virtual-think-tank-middle-class.cnn.html",
			   "The rise of China's middle classes",
			   "CNN's Andrew Stevens talks to a panel of experts about the rising spending power of the Chinese middle-class. \n  \nIf your browser has Adobe Flash Player installed, click above to play.  Otherwise, click below."
			  ],
			  [
			   "http://finance.fortune.cnn.com/2014/10/17/oakland-business-growth/",
			   "Oakland: the next Brooklyn? It'd rather not go there.",
			   "TECH    MANAGEMENT    FINANCE    MARKETS    CAREERS    AUTOS    INTERNATIONAL    RETAIL    FEATURES    SMALL BUSINESS    VIDEO    MAGAZINE    FORTUNE CONFERENCES"
			  ],
			  [
			   "http://finance.fortune.cnn.com/2014/10/17/gender-equality-not-in-business-branding/",
			   "Gender equality? Not in business branding",
			   "TECH    MANAGEMENT    FINANCE    MARKETS    CAREERS    AUTOS    INTERNATIONAL    RETAIL    FEATURES    SMALL BUSINESS    VIDEO    MAGAZINE    FORTUNE CONFERENCES"
			  ],
			  [
			   "http://edition.cnn.com/video/data/2.0/video/business/2014/10/15/spc-virtual-think-tank-middle-class.cnn.html?hpt=ibu_c2",
			   "WATCH: Panel discussion -- the rise of China's middle classes",
			   "CNN's Andrew Stevens talks to a panel of experts about the rising spending power of the Chinese middle-class. \n  \nIf your browser has Adobe Flash Player installed, click above to play.  Otherwise, click below."
			  ],
			  [
			   "http://edition.cnn.com/2014/10/16/business/most-expensive-smartphone/index.html?eref=edition",
			   "Would you pay $250k for this bling phone?",
			   "Editor's note: Nina dos Santos is a news anchor and correspondent based in London. She is the host of CNN International's London-based business show, The Business View. Follow her on Twitter. \n\n(CNN) -- Smartphones just got smarter - or at least more expensive.\n\nWith a price tag of $250,000, Savelli smartphones come complete with 18-carat white gold casing encrusted with precious diamonds.\n\nIt's as much a piece of jewelery as a gadget.\n\nThe mission of its makers, the Geneva-based jeweler Savelli, was to \"elevate a phone into haute couture.\"\n\n\"It's the most important object one has with them all the time -- it's in your hand, it's in your pocket, it's next to you when you sleep, you can touch it 100 times a day,\" Alessandro Savelli, the firm's CEO, told CNN's Nina dos Santos.\n\nThe jeweler is hoping to win the hearts of luxury shoppers, with the brand focusing exclusively on women.\n\n\"I think our customers are really looking for something special, really a beautiful object which they use "
			  ],
			  [
			   "http://www.cnn.com/video/#/video/business/2014/10/16/the-fight-to-end-world-hunger.cnn",
			   "Berry, Kors fight to end world hunger",
			   "__"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/business/2014/10/16/qmb-tett.cnn",
			   "Emerging markets eye fed action",
			   "__"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/business/2014/10/16/qmb-lithuania.cnn",
			   "Lithuania FM: Extend pressure on Russia",
			   "__"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/business/2014/10/16/qmb-kros-berry.cnn",
			   "The crucial fight to end world hunger",
			   "__"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/business/2014/10/16/qmb-cable-cord-cutting-brian-stelter-intv.cnn",
			   "Why is HBO cutting the cable cord?",
			   "__"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/business/2014/10/16/qmb-flanders.cnn",
			   "Eurozone problems remain unresolved",
			   "__"
			  ],
			  [
			   "http://edition.cnn.com/video/data/2.0/video/business/2014/10/15/spc-virtual-think-tank-middle-class.cnn.html?eref=edition",
			   "China's booming spending power",
			   "CNN's Andrew Stevens talks to a panel of experts about the rising spending power of the Chinese middle-class. \n  \nIf your browser has Adobe Flash Player installed, click above to play.  Otherwise, click below."
			  ],
			  [
			   "http://edition.cnn.com/video/data/2.0/video/business/2014/10/16/wbt-lake-romans-us-economy-fed-ebola.cnn.html",
			   "Wall Street scared of Fed, not Ebola",
			   "CNN's Christine Romans says it's not Ebola, but the Fed getting out of the stimulus game that scares Wall Street. \n  \nIf your browser has Adobe Flash Player installed, click above to play.  Otherwise, click below."
			  ],
			  [
			   "http://edition.cnn.com/2014/10/16/business/most-expensive-smartphone/index.html",
			   "World's most expensive phone?",
			   "Editor's note: Nina dos Santos is a news anchor and correspondent based in London. She is the host of CNN International's London-based business show, The Business View. Follow her on Twitter. \n\n(CNN) -- Smartphones just got smarter - or at least more expensive.\n\nWith a price tag of $250,000, Savelli smartphones come complete with 18-carat white gold casing encrusted with precious diamonds.\n\nIt's as much a piece of jewelery as a gadget.\n\nThe mission of its makers, the Geneva-based jeweler Savelli, was to \"elevate a phone into haute couture.\"\n\n\"It's the most important object one has with them all the time -- it's in your hand, it's in your pocket, it's next to you when you sleep, you can touch it 100 times a day,\" Alessandro Savelli, the firm's CEO, told CNN's Nina dos Santos.\n\nThe jeweler is hoping to win the hearts of luxury shoppers, with the brand focusing exclusively on women.\n\n\"I think our customers are really looking for something special, really a beautiful object which they use "
			  ],
			  [
			   "http://www.cnn.com/2014/10/16/business/most-expensive-smartphone/index.html",
			   "The world's most expensive phone?",
			   "Editor's note: Nina dos Santos is a news anchor and correspondent based in London. She is the host of CNN International's London-based business show, The Business View. Follow her on Twitter. \n\n(CNN) -- Smartphones just got smarter - or at least more expensive.\n\nWith a price tag of $250,000, Savelli smartphones come complete with 18-carat white gold casing encrusted with precious diamonds.\n\nIt's as much a piece of jewelery as a gadget.\n\nThe mission of its makers, the Geneva-based jeweler Savelli, was to \"elevate a phone into haute couture.\"\n\n\"It's the most important object one has with them all the time -- it's in your hand, it's in your pocket, it's next to you when you sleep, you can touch it 100 times a day,\" Alessandro Savelli, the firm's CEO, told CNN's Nina dos Santos.\n\nThe jeweler is hoping to win the hearts of luxury shoppers, with the brand focusing exclusively on women.\n\n\"I think our customers are really looking for something special, really a beautiful object which they use "
			  ],
			  [
			   "http://www.cnn.com/video/#/video/business/2014/10/16/wbt-lake-romans-us-economy-fed-ebola.cnn",
			   "Fed exit, not Ebola worries Wall Street",
			   "__"
			  ],
			  [
			   "http://edition.cnn.com/video/data/2.0/video/business/2014/10/16/wbt-lake-romans-us-economy-fed-ebola.cnn.html?eref=edition",
			   "Fed exit, not Ebola worries Wall St",
			   "CNN's Christine Romans says it's not Ebola, but the Fed getting out of the stimulus game that scares Wall Street. \n  \nIf your browser has Adobe Flash Player installed, click above to play.  Otherwise, click below."
			  ],
			  [
			   "http://www.cnn.com/video/#/video/business/2014/10/16/spc-tomorrow-transformed-translator.cnn",
			   "Saying 'adiós' to translation books",
			   "__"
			  ],
			  [
			   "http://edition.cnn.com/video/data/2.0/video/business/2014/10/15/spc-virtual-think-tank-middle-class.cnn.html?eref=edition",
			   "The rise of the Chinese middle class",
			   "CNN's Andrew Stevens talks to a panel of experts about the rising spending power of the Chinese middle-class. \n  \nIf your browser has Adobe Flash Player installed, click above to play.  Otherwise, click below."
			  ],
			  [
			   "http://edition.cnn.com/video/data/2.0/video/business/2014/10/16/bizview-nestle-results-ebola-ceo-bulcke.cnn.html",
			   "Nestle slides on Ebola fears",
			   "Nestle CEO Paul Bulcke discusses latest sales figures and the impact of Ebola on cocoa supplies."
			  ],
			  [
			   "http://edition.cnn.com/2014/10/16/business/most-expensive-smartphone/index.html",
			   "Is this the most expensive phone?",
			   "Editor's note: Nina dos Santos is a news anchor and correspondent based in London. She is the host of CNN International's London-based business show, The Business View. Follow her on Twitter. \n\n(CNN) -- Smartphones just got smarter - or at least more expensive.\n\nWith a price tag of $250,000, Savelli smartphones come complete with 18-carat white gold casing encrusted with precious diamonds.\n\nIt's as much a piece of jewelery as a gadget.\n\nThe mission of its makers, the Geneva-based jeweler Savelli, was to \"elevate a phone into haute couture.\"\n\n\"It's the most important object one has with them all the time -- it's in your hand, it's in your pocket, it's next to you when you sleep, you can touch it 100 times a day,\" Alessandro Savelli, the firm's CEO, told CNN's Nina dos Santos.\n\nThe jeweler is hoping to win the hearts of luxury shoppers, with the brand focusing exclusively on women.\n\n\"I think our customers are really looking for something special, really a beautiful object which they use "
			  ],
			  [
			   "http://www.cnn.com/video/#/video/business/2014/10/16/bizview-roche-results-ceo-schwan.cnn",
			   "Roche results beat expectations",
			   "__"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/16/business/most-expensive-smartphone/index.html?eref=edition",
			   "Would you pay $250k for this phone?",
			   "Editor's note: Nina dos Santos is a news anchor and correspondent based in London. She is the host of CNN International's London-based business show, The Business View. Follow her on Twitter. \n\n(CNN) -- Smartphones just got smarter - or at least more expensive.\n\nWith a price tag of $250,000, Savelli smartphones come complete with 18-carat white gold casing encrusted with precious diamonds.\n\nIt's as much a piece of jewelery as a gadget.\n\nThe mission of its makers, the Geneva-based jeweler Savelli, was to \"elevate a phone into haute couture.\"\n\n\"It's the most important object one has with them all the time -- it's in your hand, it's in your pocket, it's next to you when you sleep, you can touch it 100 times a day,\" Alessandro Savelli, the firm's CEO, told CNN's Nina dos Santos.\n\nThe jeweler is hoping to win the hearts of luxury shoppers, with the brand focusing exclusively on women.\n\n\"I think our customers are really looking for something special, really a beautiful object which they use "
			  ],
			  [
			   "http://www.cnn.com/2014/10/16/business/most-expensive-smartphone/index.html",
			   "Like this phone? Are you prepared to pay $250,000 for it?",
			   "Editor's note: Nina dos Santos is a news anchor and correspondent based in London. She is the host of CNN International's London-based business show, The Business View. Follow her on Twitter. \n\n(CNN) -- Smartphones just got smarter - or at least more expensive.\n\nWith a price tag of $250,000, Savelli smartphones come complete with 18-carat white gold casing encrusted with precious diamonds.\n\nIt's as much a piece of jewelery as a gadget.\n\nThe mission of its makers, the Geneva-based jeweler Savelli, was to \"elevate a phone into haute couture.\"\n\n\"It's the most important object one has with them all the time -- it's in your hand, it's in your pocket, it's next to you when you sleep, you can touch it 100 times a day,\" Alessandro Savelli, the firm's CEO, told CNN's Nina dos Santos.\n\nThe jeweler is hoping to win the hearts of luxury shoppers, with the brand focusing exclusively on women.\n\n\"I think our customers are really looking for something special, really a beautiful object which they use "
			  ],
			  [
			   "http://www.cnn.com/video/#/video/business/2014/10/16/bizview-nestle-results-ebola-ceo-bulcke.cnn",
			   "Nestle's sales slide",
			   "__"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/business/2014/10/16/5-ways-to-use-your-ipad.cnn",
			   "5 weird ways to use your iPad",
			   "__"
			  ],
			  [
			   "http://us.cnn.com/video/data/2.0/video/business/2014/10/15/qmb-gamergate-school-threats-brianna-wu-intv.cnn.html?hpt=hp_c2",
			   "School shooting threat",
			   "CNN's Richard Quest speaks to video game designer Brianna Wu about how \"gamergate\" is shining a light on gaming culture. \n  \nIf your browser has Adobe Flash Player installed, click above to play.  Otherwise, click below."
			  ]
			 ]
			}
			,health: {
			 "name": "health",
			 "expectedCat": "health & fitness",
			 "visits": [
			  [
			   "http://www.cnn.com/2014/10/22/health/ebola-west-africa-cdc/index.html",
			   "CDC sets new rules for travelers from Ebola countries",
			   "(CNN) -- All travelers coming from Ebola-stricken Guinea, Liberia or Sierra Leone into the United States will be required to monitor their temperatures for 21 days and keep an eye on possible Ebola symptoms, starting on Monday, the Centers for Disease Control and Prevention announced Wednesday.\n\nAfter being screened in the country they are departing and being screened when they arrive in the United States, those travelers also will be required to report daily health information to state and local health department for 21 days, which is the maximum time for someone infected with Ebola to start getting sick.\n\nHealth officials will also be collecting detailed contact information, including two email addresses, two phone numbers and contact information for a relative or a friend, all in an effort to track anybody who has returned from a country with Ebola. If someone travels within a state or to another state, they have to inform health officials as well.\n\nDuring the monitoring period, tra"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/health/ebola-up-to-speed/index.html",
			   "Travelers from Ebola-affected countries to be monitored for 3 weeks",
			   "(CNN) -- Texas Health Presbyterian admits fault. A hospitalized cameraman is Ebola-free. And the U.S. Ebola czar starts his new job.\n\nWith multiple developments under way, here's the latest on the Ebola outbreak:\n\nU.S. DEVELOPMENTS All travelers coming from Ebola-affected areas will be actively monitored for 21 days starting Monday, CDC Director Dr. Thomas Frieden announced in a telebriefing on Wednesday. Contact information including email, two phone numbers and a physical U.S. address will be gathered from all people coming to the U.S. from Liberia, Guinea or Sierra Leone, Frieden said.\n\nTexas Health Presbyterian admits breakdown \n\nThe hospital system that owns Texas Health Presbyterian said it \"fell short\" several times in treating Ebola patient Thomas Eric Duncan, starting by not asking the right questions in the ER. When the Liberian native came in with a fever, the nurse wrote down he \"came from Africa\" but didn't specify which nation. A physician wrote that Duncan was a \"local r"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/health/tuberculosis-who-report/index.html",
			   "Curable disease killed 1.5 million in 2013",
			   "A World Health Organization report on tuberculosis shows that 9 million people developed the disease in 2013 and 1.5 million died, making it one of the world's deadliest communicable diseases."
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/health/tuberculosis-who-report/index.html",
			   "Tuberculosis killed 1.5 million people in 2013",
			   "(CNN) -- Thousands have died in the current Ebola outbreak in West Africa, and much of the global conversation has centered on the lack of an approved medication to treat the deadly disease.\n\nYet in 2013, 1.5 million people died from another infectious disease that has a cure.\n\nOn Wednesday, the World Health Organization released its 2014 Global Tuberculosis Report, which shows that 9 million people developed tuberculosis in 2013 and 1.5 million died, making it one of the world's deadliest communicable diseases.\n\n\"In addition, around 3 million people who fall ill from TB are still being 'missed' by health systems each year either because they are not diagnosed, or because they are diagnosed but not reported,\" the WHO said in a statement.\n\nTuberculosis, commonly called TB, is a bacterial infection that can be spread through the air. The bacteria usually attack patients' lungs but can also hit the kidney, spine and brain. Tuberculosis can be fatal, according to the Centers for Disease Co"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/opinion/moore-tanzania-health-care-africa/index.html",
			   "Mandy Moore: Africa health care cure",
			   "Editor's note: Mandy Moore is a singer-songwriter, actress, and an ambassador for Population Services International. The opinions expressed in this commentary are solely those of the writer. \n\n(CNN) -- I've just returned from a visit to Tanzania with the global health and development organization Population Services International to better understand the challenges facing health workers in the developing world. The outbreak of Ebola only underscores the dire need for trained health workers -- a global shortage of nearly 7.2 million health workers, according to the World Health Organization. and care can be unregulated and quality inconsistent. During my week on the ground, however, I met PSI community health workers, nurses, doctors and business owners who deliver controlled and quality health care across Tanzania.\n\nPSI has ensured quality care by applying proven commercial franchising strategies -- think McDonalds or Subway -- to health care. PSI operates a franchise network that span"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/opinion/moore-tanzania-health-care-africa/index.html",
			   "Mandy Moore: For Africa, health care that works",
			   "Mandy Moore says quality health care can be ensured by applying commercial franchising strategies to clinics in Africa."
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/health/breakfast-myths/index.html",
			   "The 5 biggest breakfast myths",
			   "Part of complete coverage on Eatocracy   SHARE THIS Print Email More sharing Reddit StumbleUpon Delicious The 5 biggest breakfast myths By Mallory Creveling, Life by DailyBurn updated 8:36 AM EDT, Wed October 22, 2014 Munching in the morning doesn't have a direct effect on dropping pounds. STORY HIGHLIGHTS Whole-grain cereal can lower cholesterol, but skip the sugar Eating in the morning can steady blood sugar levels throughout the day It's less about one meal and more about what you eat overall If weight loss is the goal, consult with a nutritionist to determine your breakfast plan (Life by DailyBurn) -- The first meal of the day can have a very different meaning for different people. For some, it's grabbing a granola bar to nibble on during the morning commute; for others, it includes a big omelet with a cup of coffee at home. Then there are the millions who forego grub in the a.m. altogether. But how do these morning behaviors really affect weight loss, energy levels and appetite th"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/opinion/moore-tanzania-health-care-africa/index.html",
			   "Mandy Moore: Franchise health care in Africa (Opinion)",
			   "Editor's note: Mandy Moore is a singer-songwriter, actress, and an ambassador for Population Services International. The opinions expressed in this commentary are solely those of the writer. \n\n(CNN) -- I've just returned from a visit to Tanzania with the global health and development organization Population Services International to better understand the challenges facing health workers in the developing world. The outbreak of Ebola only underscores the dire need for trained health workers -- a global shortage of nearly 7.2 million health workers, according to the World Health Organization. and care can be unregulated and quality inconsistent. During my week on the ground, however, I met PSI community health workers, nurses, doctors and business owners who deliver controlled and quality health care across Tanzania.\n\nPSI has ensured quality care by applying proven commercial franchising strategies -- think McDonalds or Subway -- to health care. PSI operates a franchise network that span"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/health/ebola-outbreak/index.html?eref=edition",
			   "U.S. cameraman tests Ebola-free",
			   "(CNN) -- Freelance cameraman Ashoka Mukpo no longer has the Ebola virus in his bloodstream and will be allowed to leave Nebraska Medical Center, the hospital said Tuesday.\n\n\"Just got my results,\" Mukpo tweeted. \"3 consecutive days negative. Ebola free and feeling so blessed. I fought and won, with lots of help. Amazing feeling.\"\n\nThe 33-year-old was working for NBC News when he tested positive for Ebola in Liberia. Mukpo was among a team working with Dr. Nancy Snyderman, the network's chief medical correspondent.\n\nMukpo spent about two weeks at the hospital in Omaha, Nebraska. The hospital said he can head back home to Rhode Island on Wednesday.\n\n\"Recovering from Ebola is a truly humbling feeling,\" the hospital quoted Mukpo as saying. \"Too many are not as fortunate and lucky as I've been. I'm very happy to be alive.\"\n\nTwo nurses undergoing treatment for the virus also got good news on Tuesday.\n\nThe National Institutes of Health said the condition of Nina Pham, a Texas nurse who contrac"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/health/ebola-up-to-speed/index.html",
			   "Ebola outbreak: Get up to speed with the latest",
			   "(CNN) -- Texas Presbyterian admits fault. A hospitalized cameraman is Ebola-free. And the U.S. Ebola czar takes office.\n\nWith multiple developments under way, here's the latest on the Ebola outbreak:\n\nU.S. DEVELOPMENTS\n\nTexas Presbyterian admits breakdown \n\nThe hospital says it \"fell short\" several times in treating Ebola patient Thomas Eric Duncan, starting by not asking the right questions in the ER. When the Liberian native came in with a fever, the nurse wrote down he \"came from Africa\" but didn't specify which nation, the hospital says. A physican wrote Duncan was a \"local resident,\" with \"no contact with sick people. No symptoms of nausea, vomiting, diarrhea.\"\n\nCameraman beats Ebola \n\nFreelance cameraman Ashoka Mukpo no longer has Ebola in his bloodstream and will be allowed to leave Nebraska Medical Center on Wednesday. The 33-year-old was working for NBC News when he tested positive for Ebola in Liberia. \"I fought and won, with lots of help,\" he tweeted.\n\nTexas nurse is getting"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/health/2014/10/22/pkg-lavandera-doctor-varga-interview-ebola.cnn",
			   "Texas hospital exec: We fell short",
			   "__"
			  ],
			  [
			   "http://us.cnn.com/2014/10/21/health/ebola-outbreak/index.html?hpt=hp_t1",
			   "Man contracted Ebola in Liberia but no longer has it",
			   "(CNN) -- Freelance cameraman Ashoka Mukpo no longer has the Ebola virus in his bloodstream and will be allowed to leave Nebraska Medical Center, the hospital said Tuesday.\n\n\"Just got my results,\" Mukpo tweeted. \"3 consecutive days negative. Ebola free and feeling so blessed. I fought and won, with lots of help. Amazing feeling.\"\n\nThe 33-year-old was working for NBC News when he tested positive for Ebola in Liberia. Mukpo was among a team working with Dr. Nancy Snyderman, the network's chief medical correspondent.\n\nMukpo spent about two weeks at the hospital in Omaha, Nebraska. The hospital said he can head back home to Rhode Island on Wednesday.\n\n\"Recovering from Ebola is a truly humbling feeling,\" the hospital quoted Mukpo as saying. \"Too many are not as fortunate and lucky as I've been. I'm very happy to be alive.\"\n\nTwo nurses undergoing treatment for the virus also got good news on Tuesday.\n\nThe National Institutes of Health said the condition of Nina Pham, a Texas nurse who contrac"
			  ],
			  [
			   "http://us.cnn.com/2014/10/21/health/ebola-outbreak/index.html?hpt=hp_t1",
			   "'I fought and won'",
			   "(CNN) -- Freelance cameraman Ashoka Mukpo no longer has the Ebola virus in his bloodstream and will be allowed to leave Nebraska Medical Center, the hospital said Tuesday.\n\n\"Just got my results,\" Mukpo tweeted. \"3 consecutive days negative. Ebola free and feeling so blessed. I fought and won, with lots of help. Amazing feeling.\"\n\nThe 33-year-old was working for NBC News when he tested positive for Ebola in Liberia. Mukpo was among a team working with Dr. Nancy Snyderman, the network's chief medical correspondent.\n\nMukpo spent about two weeks at the hospital in Omaha, Nebraska. The hospital said he can head back home to Rhode Island on Wednesday.\n\n\"Recovering from Ebola is a truly humbling feeling,\" the hospital quoted Mukpo as saying. \"Too many are not as fortunate and lucky as I've been. I'm very happy to be alive.\"\n\nTwo nurses undergoing treatment for the virus also got good news on Tuesday.\n\nThe National Institutes of Health said the condition of Nina Pham, a Texas nurse who contrac"
			  ],
			  [
			   "http://rss.cnn.com/~r/rss/cnn_health/~3/yhRz49T_Ryc/index.html",
			   "Tests show Spanish nurse’s aide free of Ebola",
			   "The Spanish nurse's aide who contracted Ebola after treating virus-stricken patients in Madrid is free of the virus, her doctors announced Tuesday after another test on her."
			  ],
			  [
			   "http://rss.cnn.com/~r/rss/cnn_health/~3/KVUXmah-moQ/index.html",
			   "That sweet drink may age you",
			   "Drinking sugar-sweetened beverages may make certain cells in your body age faster, a new study suggests."
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/health/ebola-outbreak/index.html",
			   "Man free of Ebola, can leave Nebraska hospital",
			   "(CNN) -- Freelance cameraman Ashoka Mukpo no longer has the Ebola virus in his bloodstream and will be allowed to leave Nebraska Medical Center, the hospital said Tuesday.\n\n\"Just got my results,\" Mukpo tweeted. \"3 consecutive days negative. Ebola free and feeling so blessed. I fought and won, with lots of help. Amazing feeling.\"\n\nThe 33-year-old was working for NBC News when he tested positive for Ebola in Liberia. Mukpo was among a team working with Dr. Nancy Snyderman, the network's chief medical correspondent.\n\nMukpo spent about two weeks at the hospital in Omaha, Nebraska. The hospital said he can head back home to Rhode Island on Wednesday.\n\n\"Recovering from Ebola is a truly humbling feeling,\" the hospital quoted Mukpo as saying. \"Too many are not as fortunate and lucky as I've been. I'm very happy to be alive.\"\n\nTwo nurses undergoing treatment for the virus also got good news on Tuesday.\n\nThe National Institutes of Health said the condition of Nina Pham, a Texas nurse who contrac"
			  ],
			  [
			   "http://us.cnn.com/2014/10/21/health/ebola-outbreak/index.html?hpt=hp_t1",
			   "Man contracted virus in Liberia but no longer has it",
			   "(CNN) -- Freelance cameraman Ashoka Mukpo no longer has the Ebola virus in his bloodstream and will be allowed to leave Nebraska Medical Center, the hospital said Tuesday.\n\n\"Just got my results,\" Mukpo tweeted. \"3 consecutive days negative. Ebola free and feeling so blessed. I fought and won, with lots of help. Amazing feeling.\"\n\nThe 33-year-old was working for NBC News when he tested positive for Ebola in Liberia. Mukpo was among a team working with Dr. Nancy Snyderman, the network's chief medical correspondent.\n\nMukpo spent about two weeks at the hospital in Omaha, Nebraska. The hospital said he can head back home to Rhode Island on Wednesday.\n\n\"Recovering from Ebola is a truly humbling feeling,\" the hospital quoted Mukpo as saying. \"Too many are not as fortunate and lucky as I've been. I'm very happy to be alive.\"\n\nTwo nurses undergoing treatment for the virus also got good news on Tuesday.\n\nThe National Institutes of Health said the condition of Nina Pham, a Texas nurse who contrac"
			  ],
			  [
			   "http://us.cnn.com/2014/10/21/health/ebola-outbreak/index.html?hpt=hp_t2",
			   "Ebola-free man to leave hospital",
			   "(CNN) -- Freelance cameraman Ashoka Mukpo no longer has the Ebola virus in his bloodstream and will be allowed to leave Nebraska Medical Center, the hospital said Tuesday.\n\n\"Just got my results,\" Mukpo tweeted. \"3 consecutive days negative. Ebola free and feeling so blessed. I fought and won, with lots of help. Amazing feeling.\"\n\nThe 33-year-old was working for NBC News when he tested positive for Ebola in Liberia. Mukpo was among a team working with Dr. Nancy Snyderman, the network's chief medical correspondent.\n\nMukpo spent about two weeks at the hospital in Omaha, Nebraska. The hospital said he can head back home to Rhode Island on Wednesday.\n\n\"Recovering from Ebola is a truly humbling feeling,\" the hospital quoted Mukpo as saying. \"Too many are not as fortunate and lucky as I've been. I'm very happy to be alive.\"\n\nTwo nurses undergoing treatment for the virus also got good news on Tuesday.\n\nThe National Institutes of Health said the condition of Nina Pham, a Texas nurse who contrac"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/health/2014/10/22/ac-cohen-nbc-cameraman-ebola-free.cnn",
			   "Cameraman 'Ebola free' in only two weeks",
			   "__"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/health/ebola-outbreak/index.html?eref=edition",
			   "U.S. cameraman free of Ebola",
			   "(CNN) -- Freelance cameraman Ashoka Mukpo no longer has the Ebola virus in his bloodstream and will be allowed to leave Nebraska Medical Center, the hospital said Tuesday.\n\n\"Just got my results,\" Mukpo tweeted. \"3 consecutive days negative. Ebola free and feeling so blessed. I fought and won, with lots of help. Amazing feeling.\"\n\nThe 33-year-old was working for NBC News when he tested positive for Ebola in Liberia. Mukpo was among a team working with Dr. Nancy Snyderman, the network's chief medical correspondent.\n\nMukpo spent about two weeks at the hospital in Omaha, Nebraska. The hospital said he can head back home to Rhode Island on Wednesday.\n\n\"Recovering from Ebola is a truly humbling feeling,\" the hospital quoted Mukpo as saying. \"Too many are not as fortunate and lucky as I've been. I'm very happy to be alive.\"\n\nTwo nurses undergoing treatment for the virus also got good news on Tuesday.\n\nThe National Institutes of Health said the condition of Nina Pham, a Texas nurse who contrac"
			  ],
			  [
			   "http://us.cnn.com/2014/10/21/health/ebola-outbreak/index.html?hpt=hp_t1",
			   "'Ebola free and feeling so blessed'",
			   "(CNN) -- Freelance cameraman Ashoka Mukpo no longer has the Ebola virus in his bloodstream and will be allowed to leave Nebraska Medical Center, the hospital said Tuesday.\n\n\"Just got my results,\" Mukpo tweeted. \"3 consecutive days negative. Ebola free and feeling so blessed. I fought and won, with lots of help. Amazing feeling.\"\n\nThe 33-year-old was working for NBC News when he tested positive for Ebola in Liberia. Mukpo was among a team working with Dr. Nancy Snyderman, the network's chief medical correspondent.\n\nMukpo spent about two weeks at the hospital in Omaha, Nebraska. The hospital said he can head back home to Rhode Island on Wednesday.\n\n\"Recovering from Ebola is a truly humbling feeling,\" the hospital quoted Mukpo as saying. \"Too many are not as fortunate and lucky as I've been. I'm very happy to be alive.\"\n\nTwo nurses undergoing treatment for the virus also got good news on Tuesday.\n\nThe National Institutes of Health said the condition of Nina Pham, a Texas nurse who contrac"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/health/ebola-outbreak/index.html",
			   "Journalist no longer has virus",
			   "(CNN) -- Freelance cameraman Ashoka Mukpo no longer has the Ebola virus in his bloodstream and will be allowed to leave Nebraska Medical Center, the hospital said Tuesday.\n\n\"Just got my results,\" Mukpo tweeted. \"3 consecutive days negative. Ebola free and feeling so blessed. I fought and won, with lots of help. Amazing feeling.\"\n\nThe 33-year-old was working for NBC News when he tested positive for Ebola in Liberia. Mukpo was among a team working with Dr. Nancy Snyderman, the network's chief medical correspondent.\n\nMukpo spent about two weeks at the hospital in Omaha, Nebraska. The hospital said he can head back home to Rhode Island on Wednesday.\n\n\"Recovering from Ebola is a truly humbling feeling,\" the hospital quoted Mukpo as saying. \"Too many are not as fortunate and lucky as I've been. I'm very happy to be alive.\"\n\nTwo nurses undergoing treatment for the virus also got good news on Tuesday.\n\nThe National Institutes of Health said the condition of Nina Pham, a Texas nurse who contrac"
			  ],
			  [
			   "http://www.cnn.com/2014/10/20/health/ebola-travelers-study/index.html",
			   "Study: 3 with Ebola will fly monthly",
			   "(CNN) -- Up to three Ebola-infected travelers might board an international flight each month in West Africa, according to a new study, and potentially spread the deadly virus to other countries.\n\nScientists used a model to predict that, on average, three people who are infected with Ebola will leave Guinea, Liberia or Sierra Leone in each of the coming months to fly to another country. They based their model on scheduled flights for September 1 to December 31, 2014, historic flight itineraries from 2013, and Ebola surveillance numbers from the current outbreak. The results were published in The Lancet this week.\n\n\"We understand there could be global risks associated with the current outbreak,\" said study author Dr. Isaac Bogoch, a specialist in infectious diseases and tropical medicine at the University of Toronto. \"We wanted to understand what those risks were.\"\n\nThree passengers per month, or 2.8 to be exact, was around what Bogoch was expecting. Considering the number of people livi"
			  ],
			  [
			   "http://www.cnn.com/2014/10/07/health/gallery/ebola-whos-who/index.html",
			   "Who's who in the Ebola outbreak?",
			   "_"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/health/ebola-outbreak/index.html?eref=edition",
			   "U.S. cameraman free of Ebola, cleared to go home",
			   "(CNN) -- Freelance cameraman Ashoka Mukpo no longer has the Ebola virus in his bloodstream and will be allowed to leave Nebraska Medical Center, the hospital said Tuesday.\n\n\"Just got my results,\" Mukpo tweeted. \"3 consecutive days negative. Ebola free and feeling so blessed. I fought and won, with lots of help. Amazing feeling.\"\n\nThe 33-year-old was working for NBC News when he tested positive for Ebola in Liberia. Mukpo was among a team working with Dr. Nancy Snyderman, the network's chief medical correspondent.\n\nMukpo spent about two weeks at the hospital in Omaha, Nebraska. The hospital said he can head back home to Rhode Island on Wednesday.\n\n\"Recovering from Ebola is a truly humbling feeling,\" the hospital quoted Mukpo as saying. \"Too many are not as fortunate and lucky as I've been. I'm very happy to be alive.\"\n\nTwo nurses undergoing treatment for the virus also got good news on Tuesday.\n\nThe National Institutes of Health said the condition of Nina Pham, a Texas nurse who contrac"
			  ],
			  [
			   "http://us.cnn.com/2014/10/21/health/ebola-outbreak/index.html?hpt=hp_t2",
			   "Ebola-free man can leave hospital",
			   "(CNN) -- Freelance cameraman Ashoka Mukpo no longer has the Ebola virus in his bloodstream and will be allowed to leave Nebraska Medical Center, the hospital said Tuesday.\n\n\"Just got my results,\" Mukpo tweeted. \"3 consecutive days negative. Ebola free and feeling so blessed. I fought and won, with lots of help. Amazing feeling.\"\n\nThe 33-year-old was working for NBC News when he tested positive for Ebola in Liberia. Mukpo was among a team working with Dr. Nancy Snyderman, the network's chief medical correspondent.\n\nMukpo spent about two weeks at the hospital in Omaha, Nebraska. The hospital said he can head back home to Rhode Island on Wednesday.\n\n\"Recovering from Ebola is a truly humbling feeling,\" the hospital quoted Mukpo as saying. \"Too many are not as fortunate and lucky as I've been. I'm very happy to be alive.\"\n\nTwo nurses undergoing treatment for the virus also got good news on Tuesday.\n\nThe National Institute of Health said the condition of Nina Pham, a Texas nurse who contract"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/health/ebola-outbreak/index.html",
			   "Cameraman free of Ebola, can leave Nebraska hospital",
			   "(CNN) -- Freelance cameraman Ashoka Mukpo no longer has the Ebola virus in his bloodstream and will be allowed to leave Nebraska Medical Center, the hospital said Tuesday.\n\n\"Just got my results,\" Mukpo tweeted. \"3 consecutive days negative. Ebola free and feeling so blessed. I fought and won, with lots of help. Amazing feeling.\"\n\nThe 33-year-old was working for NBC News when he tested positive for Ebola in Liberia. Mukpo was among a team working with Dr. Nancy Snyderman, the network's chief medical correspondent.\n\nMukpo spent about two weeks at the hospital in Omaha, Nebraska. The hospital said he can head back home to Rhode Island on Wednesday.\n\n\"Recovering from Ebola is a truly humbling feeling,\" the hospital quoted Mukpo as saying. \"Too many are not as fortunate and lucky as I've been. I'm very happy to be alive.\"\n\nTwo nurses undergoing treatment for the virus also got good news on Tuesday.\n\nThe National Institute of Health said the condition of Nina Pham, a Texas nurse who contract"
			  ],
			  [
			   "http://us.cnn.com/2014/10/21/health/ebola-outbreak/index.html?hpt=hp_t2",
			   "Man free of Ebola, can leave hospital",
			   "(CNN) -- Freelance cameraman Ashoka Mukpo no longer has the Ebola virus in his bloodstream and will be allowed to leave Nebraska Medical Center, the hospital said Tuesday.\n\n\"Just got my results,\" Mukpo tweeted. \"3 consecutive days negative. Ebola free and feeling so blessed. I fought and won, with lots of help. Amazing feeling.\"\n\nThe 33-year-old was working for NBC News when he tested positive for Ebola in Liberia. Mukpo was among a team working with Dr. Nancy Snyderman, the network's chief medical correspondent.\n\nMukpo spent about two weeks at the hospital in Omaha, Nebraska. The hospital said he can head back home to Rhode Island on Wednesday.\n\n\"Recovering from Ebola is a truly humbling feeling,\" the hospital quoted Mukpo as saying. \"Too many are not as fortunate and lucky as I've been. I'm very happy to be alive.\"\n\nTwo nurses undergoing treatment for the virus also got good news on Tuesday.\n\nThe National Institute of Health said the condition of Nina Pham, a Texas nurse who contract"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/health/ebola-outbreak/index.html",
			   "Tests show Spanish nurse's aide free of Ebola",
			   "SHARE THIS Print Email More sharing Reddit StumbleUpon Delicious Testing shows Spanish nurse's aide free of Ebola, Madrid hospital says By Holly Yan and Ashley Fantz, CNN updated 3:49 PM EDT, Tue October 21, 2014 STORY HIGHLIGHTS NEW: Texas to start facility to handle issues like infectious diseases such as Ebola Spanish nurse's aide is free of the Ebola virus after another test, doctors say National Institutes of Health has begun testing Ebola vaccine WHO hopes to start vaccine trials in West Africa by January 2015 (CNN) -- The Spanish nurse's aide who contracted Ebola after treating virus-stricken patients in Madrid is free of the virus, her doctors announced Tuesday after another test on her. Teresa Romero Ramos is clear of Ebola, physicians at Carlos III hospital said. An initial test showed there was none of the virus in her blood, doctors said Sunday. More tests were administered to be sure she was virus-free. While Spain welcomes the good news about Ebola, the United States is d"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/20/health/ebola-travelers-study/index.html?eref=edition",
			   "3 Ebola victims could fly each month",
			   "(CNN) -- Up to three Ebola-infected travelers might board an international flight each month in West Africa, according to a new study, and potentially spread the deadly virus to other countries.\n\nScientists used a model to predict that, on average, three people who are infected with Ebola will leave Guinea, Liberia or Sierra Leone in each of the coming months to fly to another country. They based their model on scheduled flights for September 1 to December 31, 2014, historic flight itineraries from 2013, and Ebola surveillance numbers from the current outbreak. The results were published in The Lancet this week.\n\n\"We understand there could be global risks associated with the current outbreak,\" said study author Dr. Isaac Bogoch, a specialist in infectious diseases and tropical medicine at the University of Toronto. \"We wanted to understand what those risks were.\"\n\nThree passengers per month, or 2.8 to be exact, was around what Bogoch was expecting. Considering the number of people livi"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/health/sugar-soda-age-faster/index.html",
			   "That sugary soda may make you age faster",
			   "(CNN) -- Drinking sugar-sweetened beverages may make certain cells in your body age faster, a new study suggests.\n\nThe study, published this week in the American Journal of Public Health, concludes that sugar-sweetened soda consumption prematurely ages white blood cells. The University of California, San Francisco researchers say sugary sodas may impact the health of these white blood cells on a scale that is comparable to smoking -- that people who drink soda on a regular basis put themselves at a higher risk for diabetes, heart disease and stroke.\n\nResearchers studied white blood cells in healthy adults, specifically looking at the ends of the study participants' chromosomes, called telomeres.\n\nThese telomeres are essential to cell division and naturally get shorter with the passage of time. When a telomere gets too short, its cell dies. Thus, scientists believe longer telomeres mean you're healthier and younger, while shorter telomeres mean you're less healthy and aging faster.\n\nRes"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/health/ebola-outbreak/index.html?eref=edition",
			   "Testing shows Spanish nurse's aide free of Ebola",
			   "(CNN) -- The Spanish nurse's aide who contracted Ebola after treating virus-stricken patients in Madrid is now free of the virus, her doctors announced Tuesday after another test on her.\n\nTeresa Romero Ramos is clear of Ebola, physicians at Carlos III hospital said.\n\nAn initial test showed there was none of the virus in her blood, doctors said Sunday. More tests were administered to be sure she was virus-free.\n\nWhile Spain welcomes the good news about Ebola, the United States is doing more to help prevent the spread of the virus. The Department of Homeland Security said Tuesday that all arriving passengers from West African countries that Ebola has hit hardest -- Liberia, Sierra Leone and Guinea -- must land in one of the five U.S. airports that have enhanced Ebola screening.\n\nThose airports are New York's John F. Kennedy International; D.C.'s Washington Dulles; New Jersey's Newark Liberty International; Chicago's O'Hare International; and Hartsfield-Jackson International in Atlanta.\n\n"
			  ],
			  [
			   "http://www.cnn.com/2014/10/20/health/ebola-travelers-study/index.html",
			   "Study: 3 with Ebola will fly each month",
			   "(CNN) -- Up to three Ebola-infected travelers might board an international flight each month in West Africa, according to a new study, and potentially spread the deadly virus to other countries.\n\nScientists used a model to predict that, on average, three people who are infected with Ebola will leave Guinea, Liberia or Sierra Leone in each of the coming months to fly to another country. They based their model on scheduled flights for September 1 to December 31, 2014, historic flight itineraries from 2013, and Ebola surveillance numbers from the current outbreak. The results were published in The Lancet this week.\n\n\"We understand there could be global risks associated with the current outbreak,\" said study author Dr. Isaac Bogoch, a specialist in infectious diseases and tropical medicine at the University of Toronto. \"We wanted to understand what those risks were.\"\n\nThree passengers per month, or 2.8 to be exact, was around what Bogoch was expecting. Considering the number of people livi"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/health/ebola-outbreak/index.html",
			   "Hospital: Tests show Spanish nurse's aide free of Ebola",
			   "(CNN) -- The Spanish nurse's aide who contracted Ebola after treating virus-stricken patients in Madrid is now free of the virus, her doctors announced Tuesday after a second test on her.\n\nTeresa Romero Ramos is clear of Ebola, physicians at Carlos III hospital said.\n\nShe received a first test, which turned up no virus in her blood, doctors said Sunday. They administered more tests to be sure.\n\nWhile Spain welcomes the good news about Ebola, testing on one vaccine has begun at the National Institutes of Health in Maryland, and a trial for a second vaccine, initially developed in Canada, has started at the Walter Reed Army Institute of Research in Silver Spring, the World Health Organization said Tuesday.\n\nThe goal is to launch vaccine trials in West Africa by January, said Dr. Marie Paule Kieny, the WHO's assistant director general for health systems and innovation.\n\nThe initial vaccine tests are being given to volunteers in countries such as Mali, the United States and England. It is "
			  ],
			  [
			   "http://www.cnn.com/video/#/video/health/2014/10/21/pkg-rivers-sierra-leone-ebola-uk-aid.itn",
			   "Protecting the dead to save the living",
			   "__"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/health/ebola-outbreak/index.html?eref=edition",
			   "Ebola vaccine tests could start within weeks: WHO",
			   "(CNN) -- Ebola vaccine testing could start in the next few weeks, the World Health Organization said Tuesday, as health officials scramble to quell the virus that has killed more than 4,500 people.\n\nThe goal is to launch vaccine trials in West Africa by January, said Dr. Marie Paule Kieny, WHO's assistant director general for health systems and innovation.\n\nIt's not clear when vaccines could be distributed to the masses. That won't be determined until after the testing results come in.\n\n\"There is no vaccine that has no side effects at all,\" Kieny said.\n\nBut she said it will be impossible to get sick with Ebola from the vaccines because they do not contain enough of the virus' genetic material.\n\nThe initial vaccine tests will be available to volunteers in countries such as Mali, the United States and England, Kieny said.\n\n\"It will be open to the general public. It can be you, me,\" she told reporters Tuesday.\n\nWhen the testing reaches West Africa, candidates could include relatives of in"
			  ],
			  [
			   "http://us.cnn.com/2014/10/21/health/ebola-outbreak/index.html?hpt=hp_t2",
			   "Ebola vaccine tests set for Africa",
			   "(CNN) -- Ebola vaccine testing could start in the next few weeks, the World Health Organization said Tuesday, as health officials scramble to quell the virus that has killed more than 4,500 people.\n\nThe goal is to launch vaccine trials in West Africa by January, said Dr. Marie Paule Kieny, WHO's assistant director general for health systems and innovation.\n\nIt's not clear when vaccines could be distributed to the masses. That won't be determined until after the testing results come in.\n\n\"There is no vaccine that has no side effects at all,\" Kieny said.\n\nBut she said it will be impossible to get sick with Ebola from the vaccines because they do not contain enough of the virus' genetic material.\n\nThe initial vaccine tests will be available to volunteers in countries such as Mali, the United States and England, Kieny said.\n\n\"It will be open to the general public. It can be you, me,\" she told reporters Tuesday.\n\nWhen the testing reaches West Africa, candidates could include relatives of in"
			  ],
			  [
			   "http://rss.cnn.com/~r/rss/cnn_health/~3/GuXVKLwVAV4/index.html",
			   "Egg-freezing a better deal for companies",
			   "Rene Almeling, Joanna Radin and Sarah S. Richardson say Apple and Facebook offering coverage for their female employees to freeze their eggs sidesteps the issue of long hours and work-life balance."
			  ],
			  [
			   "http://rss.cnn.com/~r/rss/cnn_health/~3/SdIUX1cVjMQ/index.html",
			   "6 health benefits of pumpkins",
			   "When you think about pumpkins, what comes to mind? Jack-o'-lanterns? Pumpkin pie? Charlie Brown? Pumpkin spice lattes?"
			  ],
			  [
			   "http://us.cnn.com/2014/10/21/health/ebola-outbreak/index.html?hpt=hp_t2",
			   "Ebola vaccine tests could come soon",
			   "(CNN) -- Ebola vaccine testing could start in the next few weeks, the World Health Organization said Tuesday, as health officials scramble to quell the virus that has killed more than 4,500 people.\n\nThe goal is to launch vaccine trials in West Africa by January, said Dr. Marie Paule Kieny, WHO's assistant director general for health systems and innovation.\n\nIt's not clear when vaccines could be distributed to the masses. That won't be determined until after the testing results come in.\n\n\"There is no vaccine that has no side effects at all,\" Kieny said.\n\nBut she said it will be impossible to get sick with Ebola from the vaccines because they do not contain enough of the virus' genetic material.\n\nThe initial vaccine tests will be available to volunteers in countries such as Mali, the United States and England, Kieny said.\n\n\"It will be open to the general public. It can be you, me,\" she told reporters Tuesday.\n\nWhen the testing reaches West Africa, candidates could include relatives of in"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/health/ebola-outbreak/index.html",
			   "Ebola: WHO outlines next steps",
			   "(CNN) -- Ebola vaccine testing could start in the next few weeks, the World Health Organization said Tuesday, as health officials scramble to quell the virus that has killed more than 4,500 people.\n\nThe goal is to launch vaccine trials in West Africa by January, said Dr. Marie Paule Kieny, WHO's assistant director general for health systems and innovation.\n\nIt's not clear when vaccines could be distributed to the masses. That won't be determined until after the testing results come in.\n\n\"There is no vaccine that has no side effects at all,\" Kieny said.\n\nBut she said it will be impossible to get sick with Ebola from the vaccines because they do not contain enough of the virus' genetic material.\n\nThe initial vaccine tests will be available to volunteers in countries such as Mali, the United States and England, Kieny said.\n\n\"It will be open to the general public. It can be you, me,\" she told reporters Tuesday.\n\nWhen the testing reaches West Africa, candidates could include relatives of in"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/19/health/ebola-crisis/index.html",
			   "Spanish patient is Ebola free",
			   "Madrid (CNN) -- Teresa Romero Ramos, a Spanish nurse's aide who had contracted Ebola after caring for a patient with the deadly disease, is now free of the virus, Spain's Special Ebola Committee said Sunday.\n\n\"Today I'm very happy, because it can be said that Teresa has overcome this illness,\" Romero's husband, Javier Limon, said in a video statement released by a family spokeswoman.\n\nTwo earlier tests showed that Ebola levels in the health worker were almost nil, and a third test came back negative.\n\n\"The last two measurements were in 'background' levels, and there is no significant statistical difference with negative results,\" Luis Enjuanes, an expert on viruses, said in a phone interview, in English, with CNN. \"If for three times, throughout one week, you are background, background, background, in practical terms it means you don't have the virus.\"\n\nOfficials have previously said that the amount of the Ebola virus in Romero's blood had decreased dramatically from the time she was r"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/health/health-benefits-of-pumpkin/index.html",
			   "6 surprising health benefits of pumpkins",
			   "Editor's note: This article was originally published on upwave.com.\n\n(CNN) -- When you think about pumpkins, what comes to mind? Jack-o'-lanterns? Pumpkin pie? Charlie Brown? Pumpkin spice lattes?\n\nWell, there's more to these orange gourds than Halloween and sugary (but delicious!) desserts and drinks. Pumpkins have numerous health benefits -- none of which take center stage in autumn's most frequent offerings.\n\nWhy you crave pumpkin flavors in the fall\n\nAre you skeptical about taking the pumpkin out of the pie (or cup)? These health benefits may change your mind:\n\nWeight loss\n\nPumpkin is rich in fiber, which slows digestion. \"Pumpkin keeps you feeling fuller longer,\" says Caroline Kaufman, MS, RDN and an upwave diet and nutrition expert. \"There's seven grams of fiber in a cup of canned pumpkin. That's more than what you'd get in two slices of whole-grain bread.\"\n\nPumpkin may be filling, but it's also a low-calorie superstar. \"Canned pumpkin is nearly 90 percent water, so besides the f"
			  ],
			  [
			   "http://www.cnn.com/2014/10/20/health/ebola-travelers-study/index.html",
			   "Study: 3 a month will fly with Ebola",
			   "SHARE THIS Print Email More sharing Reddit StumbleUpon Delicious Up to three Ebola-infected travelers might fly each month By Jacque Wilson, CNN updated 8:49 PM EDT, Mon October 20, 2014 Health workers bury the body of a woman who is suspected of having died of the Ebola virus on the outskirts of Monrovia, Liberia, on Monday, October 20. Health officials say the Ebola outbreak in West Africa is the deadliest ever. More than 4,000 people have died there, according to the World Health Organization. Christine Wade, a registered nurse at the University of Texas Medical Branch, greets Carnival Magic passengers disembarking in Galveston, Texas, on Sunday, October 19. Nurses met passengers with Ebola virus fact sheets and to answer any questions. A Dallas health care worker was in voluntary isolation, although she had shown no signs of the disease, in her cabin aboard the cruise ship because of her potential contact with the Ebola virus. Garteh Korkoryah, center, is comforted during a memoria"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/health/ebola-outbreak/index.html",
			   "WHO outlines next steps in Ebola crisis",
			   "(CNN) -- Ebola vaccines could be tested in the next few weeks, the World Health Organization said Tuesday, as health officials try to stymie the virus that has killed more than 4,500 people.\n\nThe agency is also visiting sites in the three countries most devastated by the disease -- Sierra Leone, Guinea and Liberia -- to see which treatment centers would be able to participate in the testing of Ebola drugs, said Dr. Marie Paule Kieny, WHO's assistant director general for health systems and innovation.\n\nThe news comes a day after the Centers for Disease Control and Prevention issued updated Ebola guidelines Monday, focusing on better protecting health care workers.\n\nCDC Director Dr. Tom Frieden stressed the importance of more training and supervision and said that no skin should be exposed when workers are wearing personal protective equipment, or PPE.\n\n\"We're increasing the margin of safety with a real consensus guideline that has three key changes. One, training, practicing -- demonstr"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/20/health/ebola-outbreak-roundup/index.html?eref=edition",
			   "CDC issues new Ebola guidance",
			   "(CNN) -- Under fire in the wake of Ebola cases involving two nurses, the Centers for Disease Control and Prevention issued updated Ebola guidelines Monday, focusing on better protecting health care workers.\n\n\"Even one health care worker infection is one too many,\" CDC Director Tom Frieden told reporters.\n\nHe stressed the importance of more training and supervision, and said that no skin should be exposed when workers are wearing personal protective equipment, or PPE.\n\n\"We're increasing the margin of safety with a real consensus guideline that has three key changes. One, training, practicing -- demonstrated hands-on experience so that the health care workers are comfortable donning and doffing PPE. Two, no skin exposure. Three, observation of every single step, putting on and taking off the PPE,\" Frieden said.\n\nThe changes come the same day the 21-day monitoring period ended for around four dozen people who had come into contact with Ebola patient Thomas Eric Duncan, who died from the v"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/20/health/ebola-outbreak-roundup/index.html?eref=edition",
			   "CDC issues new hospital guidance",
			   "(CNN) -- Under fire in the wake of Ebola cases involving two nurses, the Centers for Disease Control and Prevention issued updated Ebola guidelines Monday, focusing on better protecting health care workers.\n\n\"Even one health care worker infection is one too many,\" CDC Director Tom Frieden told reporters.\n\nHe stressed the importance of more training and supervision, and said that no skin should be exposed when workers are wearing personal protective equipment, or PPE.\n\n\"We're increasing the margin of safety with a real consensus guideline that has three key changes. One, training, practicing -- demonstrated hands-on experience so that the health care workers are comfortable donning and doffing PPE. Two, no skin exposure. Three, observation of every single step, putting on and taking off the PPE,\" Frieden said.\n\nThe changes come the same day the 21-day monitoring period ended for around four dozen people who had come into contact with Ebola patient Thomas Eric Duncan, who died from the v"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/health/2014/10/20/ac-intv-hatch-treating-ebola-patients-in-west-africa.cnn",
			   "Dr. describes Ebola's 'stream of death'",
			   "__"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/20/health/ebola-travelers-study/index.html?eref=edition",
			   "3 infected people could fly each month",
			   "(CNN) -- Up to three Ebola-infected travelers might board an international flight each month in West Africa, according to a new study, and potentially spread the deadly virus to other countries.\n\nScientists used a model to predict that, on average, three people who are infected with Ebola will leave Guinea, Liberia or Sierra Leone in each of the coming months to fly to another country. They based their model on scheduled flights for September 1 to December 31, 2014, historic flight itineraries from 2013, and Ebola surveillance numbers from the current outbreak.\n\n\"We understand there could be global risks associated with the current outbreak,\" said study author Dr. Isaac Bogoch, a specialist in infectious diseases and tropical medicine at the University of Toronto. \"We wanted to understand what those risks were.\"\n\nThree passengers per month, or 2.8 to be exact, was around what Bogoch was expecting. Considering the number of people living in these West African countries, he says, the pre"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/health/2014/10/21/ac-kth-ebola-conspiracy-theories.cnn",
			   "Ebola fears lead to conspiracy theories",
			   "__"
			  ],
			  [
			   "http://us.cnn.com/2014/10/20/health/ebola-travelers-study/index.html?hpt=hp_c2",
			   "Up to three Ebola-infected travelers might fly each month",
			   "(CNN) -- Up to three Ebola-infected travelers might board an international flight each month in West Africa, according to a new study, and potentially spread the deadly virus to other countries.\n\nScientists used a model to predict that, on average, three people who are infected with Ebola will leave Guinea, Liberia or Sierra Leone in each of the coming months to fly to another country. They based their model on scheduled flights for September 1 to December 31, 2014, historic flight itineraries from 2013, and Ebola surveillance numbers from the current outbreak.\n\n\"We understand there could be global risks associated with the current outbreak,\" said study author Dr. Isaac Bogoch, a specialist in infectious diseases and tropical medicine at the University of Toronto. \"We wanted to understand what those risks were.\"\n\nThree passengers per month, or 2.8 to be exact, was around what Bogoch was expecting. Considering the number of people living in these West African countries, he says, the pre"
			  ],
			  [
			   "http://www.cnn.com/2014/10/20/health/ebola-outbreak-roundup/index.html",
			   "CDC issues new hospital guidance for Ebola",
			   "(CNN) -- Under fire in the wake of Ebola cases involving two nurses, the Centers for Disease Control and Prevention issued updated Ebola guidelines Monday, focusing on better protecting health care workers.\n\n\"Even one health care worker infection is one too many,\" CDC Director Tom Frieden told reporters.\n\nHe stressed the importance of more training and supervision, and said that no skin should be exposed when workers are wearing personal protective equipment, or PPE.\n\n\"We're increasing the margin of safety with a real consensus guideline that has three key changes. One, training, practicing -- demonstrated hands-on experience so that the health care workers are comfortable donning and doffing PPE. Two, no skin exposure. Three, observation of every single step, putting on and taking off the PPE,\" Frieden said.\n\nThe changes come the same day the 21-day monitoring period ended for around four dozen people who had come into contact with Ebola patient Thomas Eric Duncan, who died from the v"
			  ],
			  [
			   "http://us.cnn.com/2014/10/20/health/ebola-overreaction/index.html?hpt=hp_c2",
			   "Epic overreaction",
			   "(CNN) -- This is getting ridiculous.\n\nWhile the threat of Ebola is very real in Africa, the paranoia it's generated in the United States is unreal.\n\nYou can count the number of documented cases in America on two hands -- and still have fingers to spare.\n\nThere are eight confirmed cases. And in each one, the patient was either infected in Liberia or Sierra Leone, or had contact with Thomas Eric Duncan, the Liberian returnee who's the sole fatality of the disease in the U.S.\n\nHealth care professionals, both within the government and those with little reason to parrot a party line, insist that the chances of any of us catching the virus are minuscule.\n\nIf we really need something to worry about, they say, worry about getting your flu shots. From 1976 through 2007, flu-related causes killed between 3,000 and 49,000 people in the U.S.\n\nAnd yet, the disproportionate hysteria over Ebola multiplies contagiously. \n\nMel Robbins, a CNN commentator and legal analyst, has given it a name: Fear-bola"
			  ],
			  [
			   "http://us.cnn.com/2014/10/20/health/ebola-how-do-some-survive/index.html?hpt=hp_c2",
			   "Why some survive",
			   "(CNN) -- There's no cure for Ebola. So why have some patients walked away healthy while others in the West died?\n\nDr. Kent Brantly, Nancy Writebol and Dr. Rick Sacra all contracted the disease while working in Liberia -- and all survived.\n\nSpanish nurse's aide Teresa Romero Ramos got the virus while tending to stricken patients. She too lived.\n\nBut like the patients above, Thomas Eric Duncan and Spanish priest Miguel Pajares also received treatment in the West. Yet they died.\n\nWhile there might not be a single, conclusive answer, a series of factors may contribute to survival.\n\nEarly, high-quality treatment\n\nThis may be the most critical factor in beating Ebola.\n\nThe survivors in the United States all have one thing in common -- they were rushed to two of the country's four hospitals that have been preparing for years to treat a highly infectious disease such as Ebola.\n\nBrantly and Writebol were successfully treated at Emory University Hospital in Atlanta; Sacra was released from the N"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/health/2014/10/20/erin-intv-tony-blair-founder-africa-governance-initiative.cnn",
			   "Blair: Ebola crisis is extremely serious",
			   "__"
			  ],
			  [
			   "http://www.cnn.com/2014/10/20/health/ebola-outbreak-roundup/index.html",
			   "CDC updates Ebola guidelines",
			   "(CNN) -- [Breaking news update, posted at 7:36 p.m. ET]\n\nUnder fire in the wake of Ebola cases involving two nurses and monitoring for dozens of people, the Centers for Disease Control and Prevention issued updated Ebola guidelines Monday, focusing on better protecting health care workers. \"Any infection is unacceptable,\" CDC Director Tom Frieden told reporters. He stressed the importance of more training and supervision.\n\n[Previous story, posted at 4:57 p.m. ET]\n\nForty-three people who came into contact with Ebola patient Thomas Eric Duncan are now officially cleared after not demonstrating any symptoms during a 21-day monitoring period, Dallas County Judge Clay Jenkins said Monday.\n\nOne more will be cleared later Monday, and four others will complete their 21-day monitoring period soon, he said.\n\n\"Thankfully, they are all asymptomatic, and it looks like none of them will get Ebola,\" said Jenkins, who is overseeing response efforts in Dallas.\n\nWhile there are signs of hope in the Unit"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/20/health/ebola-outbreak-roundup/index.html",
			   "U.N. staffer dies of Ebola; monitoring ends for 43 in Texas",
			   "(CNN) -- [Breaking news update, posted at 7:36 p.m. ET]\n\nUnder fire in the wake of Ebola cases involving two nurses and monitoring for dozens of people, the Centers for Disease Control and Prevention issued updated Ebola guidelines Monday, focusing on better protecting health care workers. \"Any infection is unacceptable,\" CDC Director Tom Frieden told reporters. He stressed the importance of more training and supervision.\n\n[Previous story, posted at 4:57 p.m. ET]\n\nForty-three people who came into contact with Ebola patient Thomas Eric Duncan are now officially cleared after not demonstrating any symptoms during a 21-day monitoring period, Dallas County Judge Clay Jenkins said Monday.\n\nOne more will be cleared later Monday, and four others will complete their 21-day monitoring period soon, he said.\n\n\"Thankfully, they are all asymptomatic, and it looks like none of them will get Ebola,\" said Jenkins, who is overseeing response efforts in Dallas.\n\nWhile there are signs of hope in the Unit"
			  ],
			  [
			   "http://us.cnn.com/2014/10/20/health/ohio-bridal-shop-ebola/index.html?hpt=hp_c2",
			   "Bridal shop deals with chaos",
			   "(CNN) -- For Anna Younker, owning a bridal shop means serving customers who are planning one of the happiest days of their lives. It's a job she loves.\n\n\"She's the salt of the earth,\" said her husband, Donald.\n\nBut since October 16, the couple's lives have been turned upside down. Ever since news broke that nurse Amber Vinson had visited their Ohio store just before being diagnosed with Ebola, the fallout has been unrelenting.\n\nThe couple's Coming Attractions Bridal Shop, a business they cultivated for nearly 25 years, is dark, they say, mainly thanks to Ebola hysteria.\n\n\"It's a little hard to believe that something like Ebola from halfway around the world can affect our lives right here in Akron,\" said Donald Younker. \"The world is clearly smaller than we think.\"\n\nOn Sunday, the bridal shop looked like a \"Star Trek\" set. Bright blue light beamed from five ultraviolet ray machines in an operation designed to eliminate any possible trace of the Ebola virus. It's called a TORCH UV system"
			  ],
			  [
			   "http://us.cnn.com/2014/10/20/health/ebola-overreaction/index.html?hpt=hp_c2",
			   "The epic overreaction",
			   "(CNN) -- This is getting ridiculous.\n\nWhile the threat of Ebola is very real in Africa, the paranoia it's generated in the United States is unreal.\n\nYou can count the number of documented cases in America on two hands -- and still have fingers to spare.\n\nThere are eight confirmed cases. And in each one, the patient was either infected in Liberia or Sierra Leone, or had contact with Thomas Eric Duncan, the Liberian returnee who's the sole fatality of the disease in the U.S.\n\nHealth care professionals, both within the government and those with little reason to parrot a party line, insist that the chances of any of us catching the virus are minuscule.\n\nIf we really need something to worry about, they say, worry about getting your flu shots. From 1976 through 2007, flu-related causes killed between 3,000 and 49,000 people in the U.S.\n\nAnd yet, the disproportionate hysteria over Ebola multiplies contagiously. \n\nMel Robbins, a CNN commentator and legal analyst, has given it a name: Fear-bola"
			  ],
			  [
			   "http://us.cnn.com/2014/10/20/health/ohio-bridal-shop-ebola/index.html?hpt=hp_c2",
			   "Fears put bridal shop in chaos",
			   "(CNN) -- For Anna Younker, owning a bridal shop means serving customers who are planning one of the happiest days of their lives. It's a job she loves.\n\n\"She's the salt of the earth,\" said her husband, Donald.\n\nBut since October 16, the couple's lives have been turned upside down. Ever since news broke that nurse Amber Vinson had visited their Ohio store just before being diagnosed with Ebola, the fallout has been unrelenting.\n\nThe couple's Coming Attractions Bridal Shop, a business they cultivated for nearly 25 years, is dark, they say, mainly thanks to Ebola hysteria.\n\n\"It's a little hard to believe that something like Ebola from halfway around the world can affect our lives right here in Akron,\" said Donald Younker. \"The world is clearly smaller than we think.\"\n\nOn Sunday, the bridal shop looked like a \"Star Trek\" set. Bright blue light beamed from five ultraviolet ray machines in an operation designed to eliminate any possible trace of the Ebola virus. It's called a TORCH UV system"
			  ],
			  [
			   "http://www.cnn.com/2014/10/20/health/ebola-travelers-study/index.html",
			   "Up to 3 Ebola-infected travelers might fly each month",
			   "(CNN) -- Up to three Ebola-infected travelers might board an international flight each month in West Africa, according to a new study, and potentially spread the deadly virus to other countries.\n\nScientists used a model to predict that, on average, three people who are infected with Ebola will leave Guinea, Liberia or Sierra Leone in each of the coming months to fly to another country. They based their model on scheduled flights for September 1 to December 31, 2014, historic flight itineraries from 2013, and Ebola surveillance numbers from the current outbreak.\n\n\"We understand there could be global risks associated with the current outbreak,\" said study author Dr. Isaac Bogoch, a specialist in infectious diseases and tropical medicine at the University of Toronto. \"We wanted to understand what those risks were.\"\n\nThree passengers per month, or 2.8 to be exact, was around what Bogoch was expecting. Considering the number of people living in these West African countries, he says, the pre"
			  ],
			  [
			   "http://us.cnn.com/2014/10/20/health/ebola-how-do-some-survive/index.html?hpt=hp_t2",
			   "Why some survive Ebola, some don't",
			   "(CNN) -- There's no cure for Ebola. So why have some patients walked away healthy while others in the West died?\n\nDr. Kent Brantly, Nancy Writebol and Dr. Rick Sacra all contracted the disease while working in Liberia -- and all survived.\n\nSpanish nurse's aide Teresa Romero Ramos got the virus while tending to stricken patients. She too lived.\n\nBut like the patients above, Thomas Eric Duncan and Spanish priest Miguel Pajares also received treatment in the West. Yet they died.\n\nWhile there might not be a single, conclusive answer, a series of factors may contribute to survival.\n\nEarly, high-quality treatment\n\nThis may be the most critical factor in beating Ebola.\n\nThe survivors in the United States all have one thing in common -- they were rushed to two of the country's four hospitals that have been preparing for years to treat a highly infectious disease such as Ebola.\n\nBrantly and Writebol were successfully treated at Emory University Hospital in Atlanta; Sacra was released from the N"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/health/2014/10/20/pkg-valencia-cdc-ebola-training-class.cnn",
			   "How to suit up to treat Ebola patients",
			   "__"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/20/health/ebola-how-do-some-survive/index.html?eref=edition",
			   "Ebola: Why some survive",
			   "(CNN) -- There's no cure for Ebola. So why have some patients walked away healthy while others in the West died?\n\nDr. Kent Brantly, Nancy Writebol and Dr. Rick Sacra all contracted the disease while working in Liberia -- and all survived.\n\nSpanish nurse's aide Teresa Romero Ramos got the virus while tending to stricken patients. She too lived.\n\nBut like the patients above, Thomas Eric Duncan and Spanish priest Miguel Pajares also received treatment in the West. Yet they died.\n\nWhile there might not be a single, conclusive answer, a series of factors may contribute to survival.\n\nEarly, high-quality treatment\n\nThis may be the most critical factor in beating Ebola.\n\nThe survivors in the United States all have one thing in common -- they were rushed to two of the country's four hospitals that have been preparing for years to treat a highly infectious disease such as Ebola.\n\nBrantly and Writebol were successfully treated at Emory University Hospital in Atlanta; Sacra was released from the N"
			  ],
			  [
			   "http://www.cnn.com/2014/10/20/health/ohio-bridal-shop-ebola/index.html",
			   "Ebola fears throw Ohio bridal shop owners' lives into chaos",
			   "(CNN) -- For Anna Younker, owning a bridal shop means serving customers who are planning one of the happiest days of their lives. It's a job she loves.\n\n\"She's the salt of the earth,\" said her husband, Donald.\n\nBut since October 16, the couple's lives have been turned upside down. Ever since news broke that nurse Amber Vinson had visited their Ohio store just before being diagnosed with Ebola, the fallout has been unrelenting.\n\nThe couple's Coming Attractions Bridal Shop, a business they cultivated for nearly 25 years, is dark, they say, mainly thanks to Ebola hysteria.\n\n\"It's a little hard to believe that something like Ebola from halfway around the world can affect our lives right here in Akron,\" said Donald Younker. \"The world is clearly smaller than we think.\"\n\nOn Sunday, the bridal shop looked like a \"Star Trek\" set. Bright blue light beamed from five ultraviolet ray machines in an operation designed to eliminate any possible trace of the Ebola virus. It's called a TORCH UV system"
			  ],
			  [
			   "http://us.cnn.com/2014/10/20/health/ohio-bridal-shop-ebola/index.html?hpt=hp_t1",
			   "Ebola fears put bridal shop in chaos",
			   "(CNN) -- For Anna Younker, owning a bridal shop means serving customers who are planning one of the happiest days of their lives. It's a job she loves.\n\n\"She's the salt of the earth,\" said her husband, Donald.\n\nBut since October 16, the couple's lives have been turned upside down. Ever since news broke that nurse Amber Vinson had visited their Ohio store just before being diagnosed with Ebola, the fallout has been unrelenting.\n\nThe couple's Coming Attractions Bridal Shop, a business they cultivated for nearly 25 years, is dark, they say, mainly thanks to Ebola hysteria.\n\n\"It's a little hard to believe that something like Ebola from halfway around the world can affect our lives right here in Akron,\" said Donald Younker. \"The world is clearly smaller than we think.\"\n\nOn Sunday, the bridal shop looked like a \"Star Trek\" set. Bright blue light beamed from five ultraviolet ray machines in an operation designed to eliminate any possible trace of the Ebola virus. It's called a TORCH UV system"
			  ],
			  [
			   "http://www.cnn.com/2014/10/09/health/ebola-q-and-a/index.html",
			   "Ebola Q and A: What you need to know",
			   "(CNN) -- The Ebola news keeps pouring in.\n\nTwo nurses who treated the first person diagnosed with Ebola in the United States are in isolation.\n\nA nursing assistant in Spain who contracted the disease has been declared free of the virus.\n\nHealth officials have cleared many of the people who came in contact with Texas patient Thomas Eric Duncan after monitoring their temperatures for 21 days.\n\nAs these facts and more are revealed, here's what you need to know about the deadly virus and what's being done to stop its spread:\n\nWhat are the symptoms of Ebola? \n\nSymptoms include fever, severe headache, muscle pain, weakness, diarrhea, vomiting, internal bleeding and stomach pain. The Centers for Disease Control and Prevention says the average time it takes for symptoms to appear after infection is eight to 10 days.\n\nWith all these cases in the U.S., should I be worried?\n\nEbola is difficult to catch. You would only be at risk if you came into close contact with the blood, saliva, sweat, feces,"
			  ],
			  [
			   "http://us.cnn.com/2014/10/20/health/ebola-outbreak-roundup/index.html?hpt=hp_t1",
			   "Hints of hope in fight to stop Ebola",
			   "(CNN) -- Forty-three people who came into contact with Ebola patient Thomas Eric Duncan are now officially cleared after not demonstrating any symptoms during a 21-day monitoring period, Dallas County Judge Clay Jenkins said Monday.\n\nOne more will be cleared later Monday, and four others will complete their 21-day monitoring period soon, he said.\n\n\"Thankfully, they are all asymptomatic, and it looks like none of them will get Ebola,\" said Jenkins, who is overseeing response efforts in Dallas.\n\nTexas officials' conflicting numbers\n\nThe news conflicted with information Jenkins provided to CNN on Sunday indicating that all 48 people would be cleared at midnight.\n\nDallas Mayor Mike Rawlings also provided numbers that conflicted with Jenkins' information from Sunday. Jenkins told CNN that in addition to the 48 people whose quarantine was ending Monday, there were 75 health workers being monitored.\n\nRawlings said 120 people were still being monitored. It was unclear how he came up with that "
			  ],
			  [
			   "http://us.cnn.com/2014/10/20/health/ebola-overreaction/index.html?hpt=hp_t1",
			   "Worry about flu, not Ebola, health care workers say",
			   "(CNN) -- This is getting ridiculous.\n\nWhile the threat of Ebola is very real in Africa, the paranoia it's generated in the United States is unreal.\n\nYou can count the number of documented cases in America on two hands -- and still have fingers to spare.\n\nThere are eight confirmed cases. And in each one, the patient was either infected in Liberia or Sierra Leone, or had contact with Thomas Eric Duncan, the Liberian returnee who's the sole fatality of the disease in the U.S.\n\nHealth care professionals, both within the government and those with little reason to parrot a party line, insist that the chances of any of us catching the virus are miniscule.\n\nIf we really need something to worry about, they say, worry about getting your flu shots. From 1976 through 2007, flu-related causes killed between 3,000 and 49,000 people in the U.S.\n\nAnd yet, the disproportionate hysteria over Ebola multiplies contagiously. \n\nMel Robbins, a CNN commentator and legal analyst, has given it a name: Fear-bola"
			  ],
			  [
			   "http://www.cnn.com/2014/10/20/health/ebola-outbreak-roundup/index.html",
			   "2 African countries free of Ebola",
			   "(CNN) -- Forty-three people who came into contact with Ebola patient Thomas Eric Duncan are now officially cleared after not demonstrating any symptoms during a 21-day monitoring period, Dallas County Judge Clay Jenkins said Monday.\n\nOne more will be cleared later Monday, and four others will complete their 21-day monitoring period soon, he said.\n\n\"Thankfully, they are all asymptomatic, and it looks like none of them will get Ebola,\" said Jenkins, who is overseeing response efforts in Dallas.\n\nTexas officials' conflicting numbers\n\nThe news conflicted with information Jenkins provided to CNN on Sunday indicating that all 48 people would be cleared at midnight.\n\nDallas Mayor Mike Rawlings also provided numbers that conflicted with Jenkins' information from Sunday. Jenkins told CNN that in addition to the 48 people whose quarantine was ending Monday, there were 75 health workers being monitored.\n\nRawlings said 120 people were still being monitored. It was unclear how he came up with that "
			  ],
			  [
			   "http://edition.cnn.com/video/data/2.0/video/health/2014/10/19/exp-nr-calming-ebola-fears-abby-haglage-mel-robbins-fearbola-.cnn.html?eref=edition",
			   "Is fear out of control?",
			   "Is fear taking over the actual threat of Ebola? Daily Beast reporter Abby Haglage and CNN's Mel Robbins seem to think so. \n  \nIf your browser has Adobe Flash Player installed, click above to play.  Otherwise, click below."
			  ],
			  [
			   "http://www.cnn.com/2014/10/20/health/ohio-bridal-shop-ebola/index.html",
			   "Ebola fears chaotic for Ohio bridal shop owners",
			   "(CNN) -- For Anna Younker, owning a bridal shop means serving customers who are planning one of the happiest days of their lives. It's a job she loves.\n\n\"She's the salt of the earth,\" said her husband, Donald.\n\nBut since October 16, the couple's lives have been turned upside down. Ever since news broke that nurse Amber Vinson had visited their Ohio store just before being diagnosed with Ebola, the fallout has been unrelenting.\n\nThe couple's Coming Attractions Bridal Shop, a business they cultivated for nearly 25 years, is dark, they say, mainly thanks to Ebola hysteria.\n\n\"It's a little hard to believe that something like Ebola from halfway around the world can affect our lives right here in Akron,\" said Donald Younker. \"The world is clearly smaller than we think.\"\n\nOn Sunday, the bridal shop looked like a \"Star Trek\" set. Bright blue light beamed from five ultraviolet ray machines in an operation designed to eliminate any possible trace of the Ebola virus. It's called a TORCH UV system"
			  ],
			  [
			   "http://www.cnn.com/2014/10/20/health/ebola-outbreak-roundup/index.html",
			   "Monitoring over for 43 Texans",
			   "(CNN) -- [Breaking news update at 9:22 a.m. ET]\n\nThere are 120 people still being monitored for symptoms during the 21-day incubation period that Ebola can develop, Dallas Mayor Mike Rawlings said Monday.\n\n[Breaking news update at 9:17 a.m. ET]\n\nRon Klain, the former chief of staff to two vice presidents who has been tapped as the Obama administration's \"Ebola czar,\" will begin his new duties Wednesday, White House press secretary Josh Earnest said.\n\n[Original story published at 9:06 a.m. ET]\n\nForty-three people who came into contact with Ebola patient Thomas Eric Duncan are now officially cleared after not demonstrating any symptoms during a 21-day monitoring period, Dallas County Judge Clay Jenkins said Monday.\n\nOne more will be officially cleared later Monday, and four others will complete their 21-day monitoring period soon, he said.\n\n\"Thankfully they are all asymptomatic, and it looks like none of them will get Ebola,\" Jenkins said Sunday.\n\nJenkins, who is overseeing response effo"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/20/health/ebola-outbreak-roundup/index.html?eref=edition",
			   "Nigeria officially Ebola free: WHO",
			   "(CNN) -- [Breaking news update at 9:17 a.m. ET]\n\nRon Klain, the former chief of staff to two vice presidents who has been tapped as the Obama administration's \"Ebola czar,\" will begin his new duties Wednesday, White House press secretary Josh Earnest said.\n\n[Original story published at 9:06 a.m. ET]\n\nForty-three people who came into contact with Ebola patient Thomas Eric Duncan are now officially cleared after not demonstrating any symptoms during a 21-day monitoring period, Dallas County Judge Clay Jenkins said Monday.\n\nOne more will be officially cleared later Monday, and four others will complete their 21-day monitoring period soon, he said.\n\n\"Thankfully they are all asymptomatic, and it looks like none of them will get Ebola,\" Jenkins said Sunday.\n\nJenkins, who is overseeing response efforts in Dallas, did not explain why Monday's news conflicted with information he provided to CNN on Sunday indicating that all 48 people would be cleared at midnight.\n\nAmong those in the clear is Du"
			  ],
			  [
			   "http://us.cnn.com/2014/10/20/health/ebola-outbreak-roundup/index.html?hpt=hp_t1",
			   "Monitoring over for most Texans",
			   "(CNN) -- [Breaking news update at 9:17 a.m. ET]\n\nRon Klain, the former chief of staff to two vice presidents who has been tapped as the Obama administration's \"Ebola czar,\" will begin his new duties Wednesday, White House press secretary Josh Earnest said.\n\n[Original story published at 9:06 a.m. ET]\n\nForty-three people who came into contact with Ebola patient Thomas Eric Duncan are now officially cleared after not demonstrating any symptoms during a 21-day monitoring period, Dallas County Judge Clay Jenkins said Monday.\n\nOne more will be officially cleared later Monday, and four others will complete their 21-day monitoring period soon, he said.\n\n\"Thankfully they are all asymptomatic, and it looks like none of them will get Ebola,\" Jenkins said Sunday.\n\nJenkins, who is overseeing response efforts in Dallas, did not explain why Monday's news conflicted with information he provided to CNN on Sunday indicating that all 48 people would be cleared at midnight.\n\nAmong those in the clear is Du"
			  ],
			  [
			   "http://us.cnn.com/2014/10/20/health/ebola-outbreak-roundup/index.html?hpt=hp_t1",
			   "Glimmers of hope in fight to stop Ebola",
			   "(CNN) -- Forty-three people who came into contact with Ebola patient Thomas Eric Duncan are now officially cleared after not demonstrating any symptoms during a 21-day monitoring period, Dallas County Judge Clay Jenkins said Monday.\n\nOne more will be officially cleared later Monday, and four others will complete their 21-day monitoring period soon, he said.\n\n\"Thankfully they are all asymptomatic, and it looks like none of them will get Ebola,\" Jenkins said Sunday.\n\nJenkins, who is overseeing response efforts in Dallas, did not explain why Monday's news conflicted with information he provided to CNN on Sunday indicating that all 48 people would be cleared at midnight.\n\nAmong those in the clear is Duncan's fiancée, Louise Troh. Monday marks the 21st day since her last contact with her Duncan, who was the first person to die of the disease in the United States.\n\n\"We are so happy this is coming to an end, and we are so grateful that none of us has shown any sign of illness,\" Troh said in a"
			  ],
			  [
			   "http://rss.cnn.com/~r/rss/cnn_health/~3/dokPDdh16Ag/index.html",
			   "College student with meningitis dies",
			   "An 18-year-old San Diego State University student diagnosed with meningitis died Friday, leaving university officials scrambling to notify up to 400 people with whom she may have come in contact."
			  ],
			  [
			   "http://rss.cnn.com/~r/rss/cnn_health/~3/YnHi7_3IeEk/exp-nr-pets-with-ebola-infected-owners-dan-riskin.cnn.html",
			   "Are pets exposed to Ebola a threat?",
			   "Do dogs exposed to Ebola pose a health risk to humans? Biologist and TV host Dan Riskin explains."
			  ],
			  [
			   "http://rss.cnn.com/~r/rss/cnn_health/~3/48PjE7rsKbM/index.html",
			   "Ebola: An epic, epidemic overreaction",
			   "If we really need something to worry about, worry about getting a flu shot -- not Ebola. And yet, the disproportionate hysteria over Ebola multiplies contagiously."
			  ],
			  [
			   "http://rss.cnn.com/~r/rss/cnn_health/~3/cFqY2oSBjj0/index.html",
			   "50 pounds lost for 50th reunion",
			   "In January, Carol Highsmith, 68, began a journey of threes. She had three milestones of 50 that she planned to reach by following three simple rules:"
			  ],
			  [
			   "http://www.cnn.com/2014/10/17/health/healthy-halloween-recipes/index.html",
			   "5 healthy Halloween treats",
			   "Part of complete coverage on Eatocracy   SHARE THIS Print Email More sharing Reddit StumbleUpon Delicious 5 scary good healthy Halloween treats By Sara Cheshire, Special to CNN updated 1:22 PM EDT, Fri October 17, 2014 STORY HIGHLIGHTS These Halloween recipes are healthy and fun alternatives to popular treats Try chocolate-covered fruit, a veggie cockail, jello brains or peanut butter pumpkins Editor's note: This article was originally published on upwave.com. (upwave) -- We love Halloween season. Sweets. Sweaters. Sipping hot cider (maybe spiked). Halloween can certainly get you in the spirit, and nothing warms our hearts like these healthy Halloween treats that help you stay energized instead of stuck in a sugar coma. Don't worry, we've included all the good stuff: cheese, chocolate and even a cocktail! English Muffin Creatures from Connecticut Working Moms We know how hard it is to resist buying those holiday-decorated sugar cookies at the grocery store. All those colors, shapes, sp"
			  ],
			  [
			   "http://www.cnn.com/2014/10/17/health/five-studies/index.html",
			   "Slow and steady may not win the weight loss race",
			   "(CNN) -- Here's a roundup of five medical studies published this week that might give you new insights into your health. Remember, correlation is not causation -- so if a study finds a connection between two things, it doesn't mean that one causes the other.\n\nSlow and steady may not matter in weight loss\n\nDoes it matter if you lose weight quickly or gradually? Apparently not. A new study published in The Lancet Diabetes & Endocrinology found obese individuals regained about the same amount of weight post-diet whether they are on fast or slow weight-loss regimen.\n\nMost medical guidelines recommend gradual weight loss because experts previously believed rapid weight loss would lead patients to rapidly regain the weight.\n\nThe study, led by Joseph Proietto of the Weight Control Clinic at Austin Health in Australia, showed that it didn't matter whether participants were placed on a 12-week rapid weight loss program or a 36-week gradual program. After they achieved a primary target loss of o"
			  ],
			  [
			   "http://www.cnn.com/2014/10/17/health/california-student-meningitis-death/index.html",
			   "San Diego State student with meningitis dies",
			   "(CNN) -- An 18-year-old San Diego State University student diagnosed with meningitis died Friday, leaving university officials scrambling to notify up to 400 people with whom she may have come in contact.\n\n\"Initially, we were thinking it was just a small group of people, but now we're in the range of estimates of 300-400 people that we're notifying,\" said Dr. Gregg Lichtenstein, director of SDSU student health services and clinical services.\n\n\"We've sent out a campuswide notification that all members of the Kappa Delta Sorority and those who attended certain fraternity parties on October 8 and 9 should receive preventive medication.\"\n\nUniversity officials say Sara Stelzer, a freshman studying pre-communications and a member of the sorority, was admitted to a local hospital Tuesday morning with flu-like symptoms.\n\n\"It is always difficult when a young life is lost, especially when that person is part of our SDSU family,\" Eric Rivera, vice president for student affairs, said in a statemen"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/20/health/ebola-outbreak-roundup/index.html",
			   "Nigeria officially Ebola free, WHO says",
			   "(CNN) -- While Ebola cases keep spiraling out of control in the three West African countries, there are glimmers of hope elsewhere in the world.\n\nNigeria was declared Ebola-free Monday, following an announcement that Senegal is now rid of the virus.\n\nA nurse's aide in Spain has also beaten Ebola after spending weeks hospitalized with the disease.\n\nAnd the fiancée of the first person diagnosed with Ebola in the United States ends her quarantine period, meaning she almost certainly doesn't have the virus -- and isn't a risk to the Dallas community.\n\nBut more complications remain. Here's the latest on the Ebola crisis around the world:\n\nNigeria: Ebola is gone\n\nNigeria was thrust in the Ebola spotlight in July after an infected air traveler introduced the virus to Lagos. The case spurred fears that the disease would spread across the city of 21 million and throughout Africa's most populous country.\n\nIn the end, Nigeria confirmed 19 Ebola cases, including seven deaths.\n\nThe World Health Org"
			  ],
			  [
			   "http://us.cnn.com/2014/10/20/health/ebola-overreaction/index.html?hpt=hp_t1",
			   "U.S. Ebola hysteria",
			   "(CNN) -- This is getting ridiculous.\n\nWhile the threat of Ebola is very real in Africa, the paranoia it's generated in the United States is unreal.\n\nYou can count the number of documented cases in America on two hands -- and still have fingers to spare.\n\nThere are eight confirmed cases. And in each one, the patient was either infected in Liberia or Sierra Leone, or had contact with Thomas Eric Duncan, the Liberian returnee who's the sole fatality of the disease in the U.S.\n\nHealth care professionals, both within the government and those with little reason to parrot a party line, insist that the chances of any of us catching the virus are miniscule.\n\nIf we really need something to worry about, they say, worry about getting your flu shots. From 1976 through 2007, flu-related causes killed between 3,000 and 49,000 people in the U.S.\n\nAnd yet, the disproportionate hysteria over Ebola multiplies contagiously. \n\nMel Robbins, a CNN commentator and legal analyst, has given it a name: Fear-bola"
			  ],
			  [
			   "http://www.cnn.com/2014/10/17/health/healthy-halloween-recipes/index.html",
			   "5 scary good healthy Halloween treats",
			   "Part of complete coverage on Eatocracy   SHARE THIS Print Email More sharing Reddit StumbleUpon Delicious 5 scary good healthy Halloween treats By Sara Cheshire, Special to CNN updated 1:22 PM EDT, Fri October 17, 2014 STORY HIGHLIGHTS These Halloween recipes are healthy and fun alternatives to popular treats Try chocolate-covered fruit, a veggie cockail, jello brains or peanut butter pumpkins Editor's note: This article was originally published on upwave.com. (upwave) -- We love Halloween season. Sweets. Sweaters. Sipping hot cider (maybe spiked). Halloween can certainly get you in the spirit, and nothing warms our hearts like these healthy Halloween treats that help you stay energized instead of stuck in a sugar coma. Don't worry, we've included all the good stuff: cheese, chocolate and even a cocktail! English Muffin Creatures from Connecticut Working Moms We know how hard it is to resist buying those holiday-decorated sugar cookies at the grocery store. All those colors, shapes, sp"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/20/health/ebola-overreaction/index.html?eref=edition",
			   "Ebola hysteria: An epic overreaction",
			   "(CNN) -- This is getting ridiculous.\n\nWhile the threat of Ebola is very real in Africa, the paranoia it's generated in the United States is unreal.\n\nYou can count the number of documented cases in America on two hands -- and still have fingers to spare.\n\nThere are eight confirmed cases. And in each one, the patient was either infected in Liberia or Sierra Leone, or had contact with Thomas Eric Duncan, the Liberian returnee who's the sole fatality of the disease in the U.S.\n\nHealth care professionals, both within the government and those with little reason to parrot a party line, insist that the chances of any of us catching the virus are miniscule.\n\nIf we really need something to worry about, they say, worry about getting your flu shots. From 1976 through 2007, flu-related causes killed between 3,000 and 49,000 people in the U.S.\n\nAnd yet, the disproportionate hysteria over Ebola multiplies contagiously. \n\nMel Robbins, a CNN commentator and legal analyst, has given it a name: Fear-bola"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/20/health/ebola-outbreak-roundup/index.html?eref=edition",
			   "Nigeria officially Ebola free, WHO declares",
			   "(CNN) -- While Ebola cases keep spiraling out of control in the three West African countries, there are glimmers of hope elsewhere in the world.\n\nNigeria was declared Ebola-free Monday, following an announcement that Senegal is now rid of the virus.\n\nA nurse's aide in Spain has also beaten Ebola after spending weeks hospitalized with the virus.\n\nAnd the fiancee of the first person diagnosed with Ebola in the United States ends her quarantine period, meaning she almost certainly doesn't have the virus -- and isn't a risk to the Dallas community.\n\nBut more complications remain. Here's the latest on the Ebola crisis around the world:\n\nNigeria: Ebola is gone\n\nNigeria was thrust in the Ebola spotlight in July after an infected air traveler introduced the virus to the capital city of Lagos. The case spurred fears that the disease would spread across the city of 21 million and throughout Africa's most populous country.\n\nBut in the end, Nigeria confirmed 19 Ebola cases, including seven deaths."
			  ],
			  [
			   "http://edition.cnn.com/2014/10/20/health/ebola-outbreak-roundup/index.html?eref=edition",
			   "Nigeria declared Ebola free",
			   "(CNN) -- While Ebola cases keep spiraling out of control in the three West Africa countries, there are glimmers of hope elsewhere in the world.\n\nNigeria was declared Ebola-free Monday, following the World Health Organization's announcement that Senegal is now rid of the virus.\n\nA nurse's aide in Spain has also beaten Ebola after spending weeks hospitalized with the virus.\n\nAnd the fiancee of the first person diagnosed with Ebola in the United States ends her quarantine period, meaning she almost certainly doesn't have the virus -- and isn't a risk to the Dallas community.\n\nBut more complications remain. Here's the latest on the Ebola crisis around the world:\n\nNigeria: Ebola is gone\n\nNigeria was thrust in the Ebola spotlight in July after an infected air traveler introduced the virus to the capital city of Lagos. The case spurred fears that the disease would spread across the city of 21 million and throughout Africa's most populous country.\n\nIn the end, Nigeria confirmed 19 Ebola cases,"
			  ],
			  [
			   "http://us.cnn.com/2014/10/20/health/weight-loss-carol-highsmith/index.html?hpt=hp_c3",
			   "She lost 50 pounds for her 50th reunion",
			   "Editor's note: Do you have a weight-loss success story to share? Tell us how you did it, and you could be featured in our weekly weight-loss story on CNN.com. \n\n(CNN) -- In January, Carol Highsmith, 68, began a journey of threes. She had three milestones of 50 that she planned to reach by following three simple rules:\n\nAt 175 pounds, the 5-foot-1 Highsmith was at her heaviest weight. She vowed to lose 50 pounds so she could fit into a 50-year-old dress from high school. Determined to stun all her old classmates, Highsmith saw her invitation to Minnehaha Academy's 50th reunion as the catalyst to spark a lifestyle change.\n\nVoted \"Most Mischievous\" by her classmates in 1964, the Takoma Park, Maryland, resident was determined to reclaim some of her youth.\n\n\"I wanted to go back [to high school] as I left,\" she says. \"Still having fun in life... looking slim and feeling as good as I did back then.\"\n\nLooking back, Highsmith would never have predicted she'd have weight problems.\n\n\"If I had see"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/health/2014/10/20/politician-quarantine-period-too-short-ebola-tulsi-gabbard.cnn",
			   "Politician: Quarantine period too short",
			   "__"
			  ],
			  [
			   "http://www.cnn.com/2014/10/20/health/weight-loss-carol-highsmith/index.html",
			   "Weight loss success: 50 pounds for a 50th reunion",
			   "Editor's note: Do you have a weight-loss success story to share? Tell us how you did it, and you could be featured in our weekly weight-loss story on CNN.com. \n\n(CNN) -- In January, Carol Highsmith, 68, began a journey of threes. She had three milestones of 50 that she planned to reach by following three simple rules:\n\nAt 175 pounds, the 5-foot-1 Highsmith was at her heaviest weight. She vowed to lose 50 pounds so she could fit into a 50-year-old dress from high school. Determined to stun all her old classmates, Highsmith saw her invitation to Minnehaha Academy's 50th reunion as the catalyst to spark a lifestyle change.\n\nVoted \"Most Mischievous\" by her classmates in 1964, the Takoma Park, Maryland, resident was determined to reclaim some of her youth.\n\n\"I wanted to go back [to high school] as I left,\" she says. \"Still having fun in life... looking slim and feeling as good as I did back then.\"\n\nLooking back, Highsmith would never have predicted she'd have weight problems.\n\n\"If I had see"
			  ],
			  [
			   "http://us.cnn.com/2014/10/20/health/ebola-outbreak-roundup/index.html?hpt=hp_t1",
			   "2 African countries Ebola-free",
			   "(CNN) -- While Ebola cases keep spiraling out of control in the three West Africa countries, there are glimmers of hope elsewhere in the world.\n\nNigeria was declared Ebola-free Monday, following the World Health Organization's announcement that Senegal is now rid of the virus.\n\nA nurse's aide in Spain has also beaten Ebola after spending weeks hospitalized with the virus.\n\nAnd the fiancee of the first person diagnosed with Ebola in the United States ends her quarantine period, meaning she almost certainly doesn't have the virus -- and isn't a risk to the Dallas community.\n\nBut more complications remain. Here's the latest on the Ebola crisis around the world:\n\nNigeria: Ebola is gone\n\nNigeria was thrust in the Ebola spotlight in July after an infected air traveler introduced the virus to the capital city of Lagos. The case spurred fears that the disease would spread through Africa's most populous country.\n\nWHO credits an aggressive government response and effective contact tracing for ke"
			  ],
			  [
			   "http://www.cnn.com/2014/10/20/health/ebola-outbreak-roundup/index.html",
			   "2 African countries freed of Ebola",
			   "(CNN) -- While Ebola cases keep spiraling out of control in the three West Africa countries, there are glimmers of hope elsewhere in the world.\n\nNigeria was declared Ebola-free Monday, following the World Health Organization's announcement that Senegal is now rid of the virus.\n\nA nurse's aide in Spain has also beaten Ebola after spending weeks hospitalized with the virus.\n\nAnd the fiancee of the first person diagnosed with Ebola in the United States ends her quarantine period, meaning she almost certainly doesn't have the virus -- and isn't a risk to the Dallas community.\n\nBut more complications remain. Here's the latest on the Ebola crisis around the world:\n\nNigeria: Ebola is gone\n\nNigeria was thrust in the Ebola spotlight in July after an infected air traveler introduced the virus to the capital city of Lagos. The case spurred fears that the disease would spread through Africa's most populous country.\n\nWHO credits an aggressive government response and effective contact tracing for ke"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/20/health/ebola-how-do-some-survive/index.html?eref=edition",
			   "Ebola: Why some survive, some don't",
			   "(CNN) -- There's no cure for Ebola. So why have some patients walked away healthy while others in the West died ?\n\nDr. Kent Brantly, Nancy Writebol and Dr. Rick Sacra all contracted the disease while working in Liberia -- and all survived.\n\nSpanish nurse's aide Teresa Romero Ramos got the virus while tending to stricken patients. She too lived.\n\nBut like the patients above, Thomas Eric Duncan and Spanish priest Miguel Pajares also received treatment in the West. Yet, they died.\n\nWhile there might not be a single, conclusive answer, a series of factors may contribute to survival.\n\nEarly, high-quality treatment\n\nThis may be the most critical factor in beating Ebola.\n\nThe survivors in the United States all have one thing in common -- they were rushed to two of the country's four hospitals that have been preparing for years to treat a highly infectious disease like Ebola.\n\nBrantly and Writebol were successfully treated at Emory University Hospital in Atlanta; Sacra was released from The Ne"
			  ],
			  [
			   "http://us.cnn.com/2014/10/19/health/us-ebola/index.html?hpt=hp_t1",
			   "Victim's fiancee",
			   "Are you on the front lines of Ebola? We'd like to hear your story. \n\n(CNN) -- For nearly 20 days, Louise Troh has had to endure tremendous fear, grief and isolation.\n\nWhen told of the death of her fiancee, Thomas Eric Duncan -- the first person diagnosed with Ebola in the United States -- she fell to the ground.\n\nThe man giving her the news couldn't even console her with a hug.\n\nBut day 21 is Monday: The day the quarantine period is expected to come to an end for Troh, her son and two nephews. If the four do not develop symptoms by Monday, they will have managed to not contract Ebola despite being in close proximity to Duncan.\n\n\"We are so happy this is coming to an end, and we are so grateful that none of us has shown any sign of illness,\" Troh said in a statement on Sunday. \"We have lost so much, but we have our lives and we have our faith in God, which always gives us hope.\"\n\nMark Wingfield, an associate pastor at Wilshire Baptist Church, told CNN that Troh will not be doing intervie"
			  ],
			  [
			   "http://us.cnn.com/2014/10/20/health/ebola-how-do-some-survive/index.html?hpt=hp_t1",
			   "Early, high quality Ebola treatment may be a factor",
			   "(CNN) -- There's no cure for Ebola. So why have some patients walked away healthy while others in the West died ?\n\nDr. Kent Brantly, Nancy Writebol and Dr. Rick Sacra all contracted the disease while working in Liberia -- and all survived.\n\nSpanish nurse's aide Teresa Romero Ramos got the virus while tending to stricken patients. She too lived.\n\nBut like the patients above, Thomas Eric Duncan and Spanish priest Miguel Pajares also received treatment in the West. Yet, they died.\n\nWhile there might not be a single, conclusive answer, a series of factors may contribute to survival.\n\nEarly, high-quality treatment\n\nThis may be the most critical factor in beating Ebola.\n\nThe survivors in the United States all have one thing in common -- they were rushed to two of the country's four hospitals that have been preparing for years to treat a highly infectious disease like Ebola.\n\nBrantly and Writebol were successfully treated at Emory University Hospital in Atlanta; Sacra was released from The Ne"
			  ],
			  [
			   "http://us.cnn.com/2014/10/20/health/ebola-overreaction/index.html?hpt=hp_t1",
			   "Ebola hysteria",
			   "(CNN) -- This is getting ridiculous.\n\nWhile the threat of Ebola is very real in Africa, the paranoia it's generated in the United States is unreal.\n\nYou can count the number of documented cases in America on both hands -- and still have fingers to spare.\n\nThere are eight confirmed cases. And in each one, the patient was either infected in Liberia or Sierra Leone, or had contact with Thomas Eric Duncan, the Liberian returnee who's the sole fatality of the disease in the U.S.\n\nHealth care professionals, both within the government and those with little reason to parrot a party line, insist that the chances of any of us catching the virus are miniscule.\n\nIf we really need something to worry about, they say, worry about getting our flu shots. From 1976 through 2007, flu-related causes killed between 3,000 and 49,000 people in the U.S.\n\nAnd yet, the disproportionate hysteria over Ebola multiplies contagiously. \n\nMel Robbins, a CNN commentator and legal analyst, has given it a name: Fear-bola"
			  ],
			  [
			   "http://us.cnn.com/2014/10/20/health/ebola-how-do-some-survive/index.html?hpt=hp_t1",
			   "Why some survive, some don't",
			   "(CNN) -- There's no cure for Ebola. So why have some patients walked away healthy while others in the West died ?\n\nDr. Kent Brantly, Nancy Writebol and Dr. Rick Sacra all contracted the disease while working in Liberia -- and all survived.\n\nSpanish nurse's aide Teresa Romero Ramos got the virus while tending to stricken patients. She too lived.\n\nBut like the patients above, Thomas Eric Duncan and Spanish priest Miguel Pajares also received treatment in the West. Yet, they died.\n\nWhile there might not be a single, conclusive answer, a series of factors may contribute to survival.\n\nEarly, high-quality treatment\n\nThis may be the most critical factor in beating Ebola.\n\nThe survivors in the United States all have one thing in common -- they were rushed to two of the country's four hospitals that have been preparing for years to treat a highly infectious disease like Ebola.\n\nBrantly and Writebol were successfully treated at Emory University Hospital in Atlanta; Sacra was released from The Ne"
			  ],
			  [
			   "http://www.cnn.com/2014/10/20/health/ebola-how-do-some-survive/index.html",
			   "Ebola in the West: Why some survive, others don't",
			   "(CNN) -- There's no cure for Ebola. So why have some patients walked away healthy while others in the West died ?\n\nDr. Kent Brantly, Nancy Writebol and Dr. Rick Sacra all contracted the disease while working in Liberia -- and all survived.\n\nSpanish nurse's aide Teresa Romero Ramos got the virus while tending to stricken patients. She too lived.\n\nBut like the patients above, Thomas Eric Duncan and Spanish priest Miguel Pajares also received treatment in the West. Yet, they died.\n\nWhile there might not be a single, conclusive answer, a series of factors may contribute to survival.\n\nEarly, high-quality treatment\n\nThis may be the most critical factor in beating Ebola.\n\nThe survivors in the United States all have one thing in common -- they were rushed to two of the country's four hospitals that have been preparing for years to treat a highly infectious disease like Ebola.\n\nBrantly and Writebol were successfully treated at Emory University Hospital in Atlanta; Sacra was released from The Ne"
			  ]
			 ]
			}
			,investing: {
			 "name": "investing",
			 "expectedCat": "personal finance",
			 "visits": [
			  [
			   "http://money.cnn.com/2014/10/22/investing/dominos-pizza-hot-again-stock-record/index.html",
			   "Guess what? Domino's Pizza is hot again",
			   "NEW YORK (CNNMoney) Domino's Pizza is all grown up. It is no longer just a desperate late night snack for college students. \n\nIt's gone from stale to sizzling. How many companies do you know that run ad campaigns around the fact that people basically say their food sucks? \n\nIt's also boosted profits by trying bold new menu items. Some of them sound questionable. The \"Specialty Pizza\" consists of lightly breaded chicken topped with cheese and such toppings as bacon and jalapeno. In other words, it's a pizza that swaps dough for chicken. \n\n\"Should i get pizza or those weird specialty chicken things from dominos?,\" remarked a commenter on Twitter recently. \n\nBut the point is, people are talking about Domino's again and they're ordering. Customers are back -- so much so that the company added 160 stores in the last quarter alone. Profits are up 16%, according to Domino's latest earnings report. \n\nWall Street has noticed. Shares of the delivery joint have skyrocketed 13% this month to an al"
			  ],
			  [
			   "http://money.cnn.com/2014/10/22/investing/apple-stock-record/index.html",
			   "Apple stock is at all-time high. It's still a good buy",
			   "Apple feels the iLove NEW YORK (CNNMoney) At risk of sounding like an iFanboy ... is Apple the perfect stock? \n\nApple hit a new all-time high Wednesday morning (over $104 a share). The company's on Monday proved to any doubters that Apple \n\nInvestors are now brushing aside the recent negative headlines about Apple. \n\nAll those concerns about floating around the Web after iCloud accounts were hacked? Wall Street isn't worried anymore. Problems with the ? Forgive and forget. The glitch with its new Apple Pay service that's caused some customers (including ) being charged twice? Investors have issued a collective iYawn. The truth is Apple isn't just a high-tech momentum play anymore. There's more to the story than excitement about the iPhone 6 and 6 Plus as well as Apple Pay and the upcoming Apple Watch. \n\nThe company is rewarding shareholders with a dividend that yields nearly 2%. That's only slightly lower than the rate for a plain vanilla . Apple is also buying back shares -- although "
			  ],
			  [
			   "http://money.cnn.com/2014/10/22/investing/dominos-pizza-hot-again-stock-record/index.html",
			   "Domino's Pizza is hot again",
			   "NEW YORK (CNNMoney) Domino's Pizza is all grown up. It is no longer just a desperate late night snack for college students. \n\nIt's gone from stale to sizzling. How many companies do you know that run ad campaigns around the fact that people basically say their food sucks? \n\nIt's also boosted profits by trying bold new menu items. Some of them sound questionable. The \"Specialty Pizza\" consists of lightly breaded chicken topped with cheese and such toppings as bacon and jalapeno. In other words, it's a pizza that swaps dough for chicken. \n\n\"Should i get pizza or those weird specialty chicken things from dominos?,\" remarked a commenter on Twitter recently. But the point is, people are talking about Domino's again and they're ordering. Customers are back -- so much so that the company added 160 stores in the last quarter alone. Profits are up 16%, according to Domino's latest earnings report. \n\nWall Street has noticed. Shares of the delivery joint have skyrocketed 13% this month to an all-"
			  ],
			  [
			   "http://money.cnn.com/2014/10/22/investing/apple-stock-record/index.html",
			   "Should Apple replace IBM in the Dow?",
			   "Apple feels the iLove NEW YORK (CNNMoney) At risk of sounding like an iFanboy ... is Apple the perfect stock? \n\nApple hit a new all-time high Wednesday morning (over $104 a share). The company's on Monday proved to any doubters that Apple \n\nInvestors are now brushing aside the recent negative headlines about Apple. \n\nAll those concerns about floating around the Web after iCloud accounts were hacked? Wall Street isn't worried anymore. Problems with the ? Forgive and forget. The glitch with its new Apple Pay service that's caused some customers (including ) being charged twice? Investors have issued a collective iYawn. The truth is Apple isn't just a high-tech momentum play anymore. There's more to the story than excitement about the iPhone 6 and 6 Plus as well as Apple Pay and the upcoming Apple Watch. \n\nThe company is rewarding shareholders with a dividend that yields nearly 2%. That's only slightly lower than the rate for a plain vanilla . Apple is also buying back shares -- although "
			  ],
			  [
			   "http://money.cnn.com/video/investing/2014/10/22/investing-the-buzz-apple-ibm-tim-cook.cnnmoney/index.html",
			   "Shares of Apple are near an all-time again",
			   "Market indexes are shown in real time, except for the DJIA, which is delayed by two minutes. All times are ET. Disclaimer Morningstar: © 2014  Morningstar, Inc.  All Rights Reserved. Disclaimer The Dow Jones Indexes SM are proprietary to and distributed by Dow Jones & Company, Inc. and have been licensed for use.  All content of the Dow Jones Indexes SM © 2014 is proprietary to Dow Jones & Company, Inc. \r\nChicago Mercantile Association. The market data is the property of Chicago Mercantile Exchange Inc. and its licensors. All rights reserved. \r\nFactSet Research Systems Inc. 2014. All rights reserved. Most stock quote data provided by BATS."
			  ],
			  [
			   "http://money.cnn.com/2014/10/21/investing/warren-buffett-berkshire-lost-2-billion/index.html?hpt=ibu_c2",
			   "Warren Buffett loses $2b in two days",
			   "      Warren Buffett in 90 seconds       NEW YORK (CNNMoney)  If you're having a bad week, consider that Warren Buffett has lost $2 billion and it's only Tuesday.  \nBuffett is known for shunning the quick buck and focusing on the long-term performance of his investments. He'd best not change that this week. \n \nHis Berkshire Hathaway  ( BRKB ) investment house holds big pieces of Coke and IBM, both of which have taken a drubbing in the past two days. \n \nHe took a $1 billion hit on Coke  ( KO ) , which fizzled 6% on Tuesday after the company reported earnings that didn't live up to expectations . Even worse, Coke said it doesn't expect a much better 2015. \n \nCoke is one of Buffett's largest investments. He holds 400 million shares and his son Howard sits on the beverage company's board. And he likes the products too. Buffett is often seen enjoying Cherry Coke. \n \n Related: Battle of the billionaires: Warren Buffett vs. Jack Ma  \n \nThe pain started on Monday for Buffett. IBM  ( IBM , Tech"
			  ],
			  [
			   "http://money.cnn.com/2014/10/22/investing/apple-stock-record/index.html",
			   "Is Apple the perfect stock?",
			   "Apple feels the iLove NEW YORK (CNNMoney) At risk of sounding like an iFanboy ... is Apple the perfect stock? \n\nApple hit a new all-time high Wednesday morning (over $104 a share). The company's on Monday proved to any doubters that Apple \n\nInvestors are now brushing aside some negative headlines about Apple from the past few months. \n\nAll those concerns about floating around the Web after iCloud accounts were hacked? Wall Street isn't worried anymore. Problems with the ? Forgive and forget. The glitch with its new Apple Pay service that's caused some customers (including ) being charged twice? Investors have issued a collective iYawn. But Apple isn't just a high-tech momentum play anymore. There's more to the story than excitement about the iPhone 6 and 6 Plus as well as Apple Pay and the upcoming Apple Watch. \n\nThe company is rewarding shareholders with a dividend that yields nearly 2%. That's only slightly lower than the rate for a plain vanilla . Apple is also buying back shares --"
			  ],
			  [
			   "http://money.cnn.com/2014/10/22/investing/turkey-economy-outlook/index.html?section=money_news_international",
			   "What next for Turkey's economy?",
			   "Obstacles for Turkey's economy Ankara, Turkey (CNNMoney) Turkey's status as an emerging market darling is at risk as growth slows and regional unrest spreads. \n\nJust a few years ago, the country was riding high on the back of low labor costs, a large population, access to EU markets and strong foreign investment. \n\nGrowth accelerated to 9% in 2010-2011 after averaging about 5.5% over the previous decade or so. \n\nIncomes have more than trebled since Recep Tayyip Erdogan became prime minister in 2003. He was elected president in August. \n\nBut the past 18 months have been bumpy for Turkey, and its backers. There have been vociferous protests against Erdogan, a deadly mining disaster, and the economy has slowed sharply. \n\nJust last week, the government cut its forecast for growth to just 3.3% this year, and 4% in 2015. The Turkish lira has fallen 12% against the dollar over the past 12 months. \n\nRecent volatility in financial markets has exposed Turkey's vulnerabilities. Finance Minister M"
			  ],
			  [
			   "http://money.cnn.com/video/investing/2014/10/22/investing-the-buzz-apple-ibm-tim-cook.cnnmoney/index.html",
			   "Apple feels the iLove",
			   "Market indexes are shown in real time, except for the DJIA, which is delayed by two minutes. All times are ET. Disclaimer Morningstar: © 2014  Morningstar, Inc.  All Rights Reserved. Disclaimer The Dow Jones Indexes SM are proprietary to and distributed by Dow Jones & Company, Inc. and have been licensed for use.  All content of the Dow Jones Indexes SM © 2014 is proprietary to Dow Jones & Company, Inc. \r\nChicago Mercantile Association. The market data is the property of Chicago Mercantile Exchange Inc. and its licensors. All rights reserved. \r\nFactSet Research Systems Inc. 2014. All rights reserved. Most stock quote data provided by BATS."
			  ],
			  [
			   "http://money.cnn.com/2014/10/22/investing/turkey-economy-outlook/index.html",
			   "What's next for Turkey's roller-coaster economy?",
			   "Obstacles for Turkey's economy Ankara, Turkey (CNNMoney) Turkey's status as an emerging market darling is at risk as growth slows and regional unrest spreads. \n\nJust a few years ago, the country was riding high on the back of low labor costs, a large population, access to EU markets and strong foreign investment. \n\nGrowth accelerated to 9% in 2010-2011 after averaging about 5.5% over the previous decade or so. \n\nIncomes have more than trebled since Recep Tayyip Erdogan became prime minister in 2003. He was elected president in August. \n\nBut the past 18 months have been bumpy for Turkey, and its backers. There have been vociferous protests against Erdogan, a deadly mining disaster, and the economy has slowed sharply. \n\nJust last week, the government cut its forecast for growth to just 3.3% this year, and 4% in 2015. The Turkish lira has fallen 12% against the dollar over the past 12 months. \n\nRecent volatility in financial markets has exposed Turkey's vulnerabilities. Finance Minister M"
			  ],
			  [
			   "http://money.cnn.com/2014/10/22/investing/turkey-economy-outlook/index.html",
			   "What next for Turkey's roller-coaster economy?",
			   "Obstacles for Turkey's economy Ankara, Turkey (CNNMoney) Turkey's status as an emerging market darling is at risk as growth slows and regional unrest spreads. \n\nJust a few years ago, the country was riding high on the back of low labor costs, a large population, access to EU markets and strong foreign investment. \n\nGrowth accelerated to 9% in 2010-2011 after averaging about 5.5% over the previous decade or so. \n\nIncomes have more than trebled since Recep Tayyip Erdogan became prime minister in 2003. He was elected president in August. \n\nBut the past 18 months have been bumpy for Turkey, and its backers. There have been vociferous protests against Erdogan, a deadly mining disaster, and the economy has slowed sharply. \n\nJust last week, the government cut its forecast for growth to just 3.3% this year, and 4% in 2015. The Turkish lira has fallen 12% against the dollar over the past 12 months. \n\nRecent volatility in financial markets has exposed Turkey's vulnerabilities. Finance Minister M"
			  ],
			  [
			   "http://money.cnn.com/2014/10/21/investing/stocks-market-rebound/index.html?section=money_markets",
			   "Rebound! Stocks erase most of October losses",
			   "NEW YORK (CNNMoney) What a difference a week makes. \n\nMere days ago, spooked investors were asking themselves: Is it time to get out of stocks? \n\nA double whammy of worsening European economic woes and the ongoing global crises from Ebola to ISIS had spread fear in the market. \n\nAt the worst point last week, nearly all the gains for the year were wiped out. \n\nBut today, stocks surged. People who have their money invested in funds that track the S&P 500 or tech-heavy Nasdaq are smiling. Both indexes have erased well over half their losses for October. \n\nOr put another way: The S&P 500 is now up over 5% for the year. \n\nAnd the Nasdaq, which had its best day of 2014 today, is up even higher. \n\nEven the Dow, which has struggled the most in recent weeks, is showing signs of a momentum change. The blue chip index surged 200 points, one of its best moves of the year. \n\nIn a small but important psychological shift, the Dow is finally positive again for 2014 \n\nThe market is clearly reacting pos"
			  ],
			  [
			   "http://money.cnn.com/2014/10/13/investing/fiat-chrysler-stock-trades-nyse/index.html",
			   "Chrysler finally returns to U.S. stock market",
			   "      Fiat Chrysler revs it up on Wall Street       NEW YORK (CNNMoney)  Columbus Day seems like a fitting debut for Fiat Chrysler on the New York Stock Exchange, don't you think? This is an Italian-American success story after all.  \nShares of Fiat Chrysler began trading on the NYSE Monday under the ticker symbol FCAU. Fiat Chrysler opened at $9 and quickly moved as high as $9.55 before pulling back a bit. \n \nChrysler hasn't been publicly traded in the United States in more than seven years. At that time it was known as DaimlerChrysler. Daimler  ( DDAIF ) agreed to sell Chrysler to private equity firm Cerberus in 2007. \n \nFiat's stock had previously traded as Fiat SpA  ( FIATY ) in Milan and the United States. Those shares have outperformed GM  ( GM ) and Ford  ( F ) so far this year, largely due to the resurgence of Chrysler -- the smallest of Detroit's Big Three. \n \nChrysler reported a sales increase of 19% in the United States last month compared to a year ago. That is Chrysler's 5"
			  ],
			  [
			   "http://money.cnn.com/2014/10/21/investing/warren-buffett-berkshire-lost-2-billion/index.html?iid=TL_Popular",
			   "Warren Buffett's Berkshire loses $2 billion in two days",
			   "Warren Buffett in 90 seconds NEW YORK (CNNMoney) If you're having a bad week, consider that Warren Buffett has lost $2 billion and it's only Tuesday. \n\nBuffett is known for shunning the quick buck and focusing on the long-term performance of his investments. He'd best not change that this week. He took a $1 billion hit on Coke \n\nCoke is one of Buffett's largest investments. He holds 400 million shares and his son Howard sits on the beverage company's board. And he likes the products too. Buffett is often seen enjoying Cherry Coke. The pain started on Monday for Buffett. IBM \n\nThe stock dropped 7% on Monday after then news was announced and slid again on Tuesday. It is off nearly 13% so far this year, and Buffett's company holds over 70 million shares. \n\nBuffett has made a lot of headlines this year for his misses. His investment in British grocery chain Tesco \n\nBut it's not all bad news for Berkshire. \n\nInvestors are sticking with their icon. Berkshire stock climbed slightly on Monday "
			  ],
			  [
			   "http://money.cnn.com/2014/10/21/investing/warren-buffett-berkshire-lost-2-billion/index.html",
			   "Warren Buffett loses $2 billion in two days",
			   "Warren Buffett in 90 seconds NEW YORK (CNNMoney) If you're having a bad week, consider that Warren Buffett has lost $2 billion and it's only Tuesday. \n\nBuffett is known for shunning the quick buck and focusing on the long-term performance of his investments. He'd best not change that this week. He took a $1 billion hit on Coke \n\nCoke is one of Buffett's largest investments. He holds 400 million shares and his son Howard sits on the beverage company's board. And he likes the products too. Buffett is often seen enjoying Cherry Coke. The pain started on Monday for Buffett. IBM \n\nThe stock dropped 7% on Monday after then news was announced and slid again on Tuesday. It is off nearly 13% so far this year, and Buffett's company holds over 70 million shares. \n\nBuffett has made a lot of headlines this year for his misses. His investment in British grocery chain Tesco \n\nBut it's not all bad news for Berkshire. \n\nInvestors are sticking with their icon. Berkshire stock climbed slightly on Monday "
			  ],
			  [
			   "http://money.cnn.com/2014/10/21/investing/stocks-market-rebound/index.html?section=money_news_international",
			   "U.S. stocks erase much of October losses",
			   "NEW YORK (CNNMoney) What a difference a week makes. \n\nMere days ago, spooked investors were asking themselves: Is it time to get out of stocks? \n\nA double whammy of worsening European economic woes and the ongoing global crises from Ebola to ISIS had spread fear in the market. \n\nAt the worst point last week, nearly all the gains for the year were wiped out. \n\nBut today, stocks surged. People who have their money invested in funds that track the S&P 500 or tech-heavy Nasdaq are smiling. Both indexes have erased well over half their losses for October. \n\nOr put another way: The S&P 500 is now up over 5% for the year. \n\nAnd the Nasdaq, which had its best day of 2014 today, is up even higher. \n\nEven the Dow, which has struggled the most in recent weeks, is showing signs of a momentum change. The blue chip index surged 200 points, one of its best moves of the year. \n\nIn a small but important psychological shift, the Dow is finally positive again for 2014 \n\nThe market is clearly reacting pos"
			  ],
			  [
			   "http://money.cnn.com/2014/10/21/investing/stocks-market-rebound/index.html",
			   "Rebound! Stocks erase much of October losses",
			   "NEW YORK (CNNMoney) What a difference a week makes. \n\nMere days ago, spooked investors were asking themselves: Is it time to get out of stocks? \n\nA double whammy of worsening European economic woes and the ongoing global crises from Ebola to ISIS had spread fear in the market. \n\nAt the worst point last week, nearly all the gains for the year were wiped out. \n\nBut today, stocks surged. People who have their money invested in funds that track the S&P 500 or tech-heavy Nasdaq are smiling. Both indexes have erased well over half their losses for October. \n\nOr put another way: The S&P 500 is now up over 5% for the year. The Nasdaq had its best day of 2014, rising 2.4%. \n\nEven the Dow, which has struggled the most in recent weeks, is showing signs of a momentum change. The blue chip index surged 200 points, one of its best moves of the year. \n\nThe Dow is finally positive again for 2014, a small but important psychological shift. \n\nThe market is clearly reacting positively to earnings from ma"
			  ],
			  [
			   "http://money.cnn.com/2014/10/21/investing/stocks-market-rebound/index.html",
			   "Rebound! Stocks erase most October losses",
			   "NEW YORK (CNNMoney) What a difference a week makes. \n\nMere days ago, spooked investors were asking themselves: Is it time to get out of stocks? \n\nA double whammy of worsening European economic woes and the ongoing global crises from Ebola to ISIS had spread fear in the market. \n\nAt the worst point last week, nearly all the gains for the year were wiped out. \n\nBut today, stocks surged. People who have their money invested in funds that track the S&P 500 or tech-heavy Nasdaq are smiling. Both indexes have erased well over half their losses for October. \n\nOr put another way: The S&P 500 is now up over 5% for the year. The Nasdaq had its best day of 2014, rising 2.4%. \n\nEven the Dow, which has struggled the most in recent weeks, is showing signs of a momentum change. The blue chip index surged 200 points, one of its best moves of the year. \n\nThe Dow is finally positive again for 2014, a small but important psychological shift. \n\nThe market is clearly reacting positively to earnings from ma"
			  ],
			  [
			   "http://money.cnn.com/video/investing/2014/10/21/investing-the-buzz-chipotle-qdoba.cnnmoney",
			   "Holy guacamole! Chipotle stumbles",
			   "Market indexes are shown in real time, except for the DJIA, which is delayed by two minutes. All times are ET. Disclaimer Morningstar: © 2014  Morningstar, Inc.  All Rights Reserved. Disclaimer The Dow Jones Indexes SM are proprietary to and distributed by Dow Jones & Company, Inc. and have been licensed for use.  All content of the Dow Jones Indexes SM © 2014 is proprietary to Dow Jones & Company, Inc. \r\nChicago Mercantile Association. The market data is the property of Chicago Mercantile Exchange Inc. and its licensors. All rights reserved. \r\nFactSet Research Systems Inc. 2014. All rights reserved. Most stock quote data provided by BATS."
			  ],
			  [
			   "http://money.cnn.com/2014/10/20/investing/total-ceo-dies/index.html",
			   "French CEO dies in plane crash with snowplow operated by drunk driver",
			   "Oil company CEO killed in plane crash HONG KONG (CNNMoney) French oil company Total's CEO died after his plane collided with a snowplow on the runway at Moscow international airport. \n\nRussian officials said the snowplow's driver was inebriated. Along with CEO Christophe de Margerie, three other members of the plane's crew were also found dead at the scene of the accident. \n\nRussian officials have said they would investigate other possible causes of the accident such as pilot and air traffic control error. The crash occurred when the landing gear of the Falcon airplane hit the snow-clearing machine during takeoff, then caught fire and crashed on the runway. \n\nThe death of the 63-year old de Margerie was immediately mourned by top leaders. Affectionately known as Big Mustache for his signature facial hair, de Margerie had a \"larger-than-life personality\" and was \"hugely respected\" in French business and political circles, according to the Financial Times \n\nDe Margerie attended Putin's a"
			  ],
			  [
			   "http://money.cnn.com/2014/10/21/investing/coca-cola-earnings-miss/index.html",
			   "Investors pour out of Coca-Cola",
			   "Investors dumped Coke Tuesday after an unimpressive earnings report. NEW YORK (CNNMoney) If you owned Coca-Cola (KO) stock on Monday, it was akin to having a refreshing bottle of the classic soft drink in your hand on a hot day. By Tuesday, that same bottle exploded all over your favorite shirt. \n\nShares of the beverage giant fizzled 6% after it reported disappointing revenue growth for the third quarter. Even worse, the company warned investors that 2015 doesn't look much better. \n\nThe stock has now erased its gains for the year. \n\n\"There's no question we need to improve our execution in various markets,\" said Coke CEO Muhtar Kent on a conference call with Wall Street analysts Tuesday. He blamed global economic headwinds and a slowdown in the overall beverage industry. \"There's a lot of volatility in the world,\" he added. The company has struggled to reinvent itself in the era of healthier beverage choices and increased competition. Investors are getting impatient, even demanding that"
			  ],
			  [
			   "http://money.cnn.com/2014/10/21/investing/mcdonalds-earnings-asia-china/index.html",
			   "Asia food scare eats into McDonald's profits",
			   "NEW YORK (CNNMoney) McDonald's sales in Asia are collapsing under the weight of a food scandal, aggravating the company's headaches in markets around the world. \n\nConsumers in the key markets of China and Japan were clearly spooked by a food scare at an American-owned McDonald's \n\nThe scare sparked a nearly 10% tumble in third-quarter sales at McDonald's Asia-Pacific, Middle East and Africa division (APMEA). Profits in that region plunged 55%. Problems around the world: McDonald's numbers were ugly in Asia, but the company stumbled in all of its markets during the third quarter. \n\nIn the U.S., McDonald's largest market, sales shrank by over 3% during the third quarter due to slower guest traffic amid \"sustained competitive activity.\" \n\nEurope wasn't much better. Strength in the U.K. was overshadowed by and tensions in Russia, where roughly half of its 446 locations are under investigation and \"The numbers are troublesome -- almost across the board,\" said Mark Kalinowski, an analyst who"
			  ],
			  [
			   "http://money.cnn.com/2014/10/21/investing/chipotle-qdoba-earnings-stock/index.html",
			   "Chipotle is still an amazing success story but Qdoba seems to have momentum",
			   "NEW YORK (CNNMoney) Chipotle is still the king (or rey) of Mexican restaurant chains. But are its best days behind it? Of course, long-term investors shouldn't be crying in their burrito bowls. The stock is up more than 650% in the past five years. \n\nBut Chipotle may be a victim of its own success. It has proven that there is demand for higher-priced burritos, tacos and quesadillas in a \"fast casual\" atmosphere in a way that Taco Bell (owned by Yum! Brands \n\nThe mighty Q. Enter Qdoba. Chipotle may have the most to fear from this burrito upstart, which currently has more than 600 locations nationwide. Chipotle has more than 1,700 restaurants. \n\nQdoba, a subsidiary of burger joint Jack in the Box \n\nThat's a bold move. It could hurt Qdoba's profit margins, particularly since the price of avocados, limes and many other food items used in Mexican cuisine are on the rise. But it's also a clear sign that Qdoba wants to take market share away from Chipotle. \n\nQdoba fans swear that its food is "
			  ],
			  [
			   "http://money.cnn.com/2014/10/21/investing/coca-cola-earnings-miss/index.html",
			   "Investors pour out of Coke",
			   "Investors dumped Coke Tuesday after an unimpressive earnings report. NEW YORK (CNNMoney) If you owned Coca-Cola (KO) stock on Monday, it was akin to having a refreshing bottle of the classic soft drink in your hand on a hot day. By Tuesday, that same bottle exploded all over your favorite shirt. \n\nShares of the beverage giant fizzled 6% after it reported disappointing revenue growth for the third quarter. Even worse, the company warned investors that 2015 doesn't look much better. \n\nThe stock has now erased its gains for the year. \n\n\"There's no question we need to improve our execution in various markets,\" said Coke CEO Muhtar Kent on a conference call with Wall Street analysts Tuesday. He blamed global economic headwinds and a slowdown in the overall beverage industry. \"There's a lot of volatility in the world,\" he added. The company has struggled to reinvent itself in the era of healthier beverage choices and increased competition. Investors are getting impatient, even demanding that"
			  ],
			  [
			   "http://money.cnn.com/2014/10/21/investing/chipotle-qdoba-earnings-stock/index.html",
			   "Chipotle vs. Qdoba: Investors like the Q",
			   "NEW YORK (CNNMoney) Chipotle is still the king (or rey) of Mexican restaurant chains. But are its best days behind it? Of course, long-term investors shouldn't be crying in their burrito bowls. The stock is up more than 650% in the past five years. \n\nBut Chipotle may be a victim of its own success. It has proven that there is demand for higher-priced burritos, tacos and quesadillas in a \"fast casual\" atmosphere in a way that Taco Bell (owned by Yum! Brands \n\nThe mighty Q. Enter Qdoba. Chipotle may have the most to fear from this burrito upstart, which currently has more than 600 locations nationwide. Chipotle has more than 1,700 restaurants. \n\nQdoba, a subsidiary of burger joint Jack in the Box \n\nThat's a bold move. It could hurt Qdoba's profit margins, particularly since the price of avocados, limes and many other food items used in Mexican cuisine are on the rise. But it's also a clear sign that Qdoba wants to take market share away from Chipotle. \n\nQdoba fans swear that its food is "
			  ],
			  [
			   "http://money.cnn.com/2014/10/20/investing/total-ceo-dies/index.html",
			   "French CEO dies in Moscow in plane crash with snowplow operated by drunk driver",
			   "Oil company CEO killed in plane crash HONG KONG (CNNMoney) French oil company Total's CEO died after his plane collided with a snowplow on the runway at Moscow international airport. \n\nRussian officials said the snowplow's driver was inebriated. Along with CEO Christophe de Margerie, three other members of the plane's crew were also found dead at the scene of the accident. \n\nRussian officials have said they would investigate other possible causes of the accident such as pilot and air traffic control error. The crash occurred when the landing gear of the Falcon airplane hit the snow-clearing machine during takeoff, then caught fire and crashed on the runway. \n\nThe death of the 63-year old de Margerie was immediately mourned by top leaders. Affectionately known as Big Mustache for his signature facial hair, de Margerie had a \"larger-than-life personality\" and was \"hugely respected\" in French business and political circles, according to the Financial Times \n\nDe Margerie attended Putin's a"
			  ],
			  [
			   "http://money.cnn.com/2014/10/20/investing/total-ceo-dies/index.html",
			   "Oil company CEO dies in plane crash",
			   "Oil company CEO killed in plane crash HONG KONG (CNNMoney) French oil company Total's CEO died after his plane collided with a snowplow on the runway at Moscow international airport. \n\nRussian officials said the snowplow's driver was inebriated. Along with CEO Christophe de Margerie, three other members of the plane's crew were also found dead at the scene of the accident. \n\nRussian officials have said they would investigate other possible causes of the accident such as pilot and air traffic control error. The crash occurred when the landing gear of the Falcon airplane hit the snow-clearing machine during takeoff, then caught fire and crashed on the runway. \n\nThe death of the 63-year old de Margerie was immediately mourned by top leaders. Affectionately known as Big Mustache for his signature facial hair, de Margerie had a \"larger-than-life personality\" and was \"hugely respected\" in French business and political circles, according to the Financial Times \n\nDe Margerie attended Putin's a"
			  ],
			  [
			   "http://money.cnn.com/2014/10/21/investing/mcdonalds-earnings-asia-china/index.html",
			   "McDonald's gets burned in Asia",
			   "NEW YORK (CNNMoney) McDonald's sales in Asia are collapsing under the weight of a food scandal, aggravating the company's headaches in markets around the world. \n\nConsumers in the key markets of China and Japan were clearly spooked by a food scare at an American-owned McDonald's \n\nThe scare sparked a nearly 10% tumble in third-quarter sales at McDonald's Asia-Pacific, Middle East and Africa division (APMEA). Profits in that region plunged 55%. Problems around the world: McDonald's numbers were ugly in Asia, but the company stumbled in all of its markets during the third quarter. \n\nIn the U.S., McDonald's largest market, sales shrank by over 3% during the third quarter due to slower guest traffic amid \"sustained competitive activity.\" McDonald's and other fast food giants have been hurt by increased competition from the likes of Chipotle \n\nEurope wasn't much better. Strength in the U.K. was overshadowed by and tensions in Russia, where roughly half of its 446 locations are under investi"
			  ],
			  [
			   "http://money.cnn.com/2014/10/20/investing/total-ceo-dies/index.html",
			   "Total CEO dies in Moscow plane crash",
			   "HONG KONG (CNNMoney) French oil company Total has confirmed the death of its chairman and CEO, Christophe de Margerie, in a crash between his private plane and a snowplow at Moscow international airport. \n\nThree members of the plane's crew were also found dead at the scene of the accident. \n\nRussian officials said they had already established that the snowplow driver was drunk but would also consider other possible causes such as pilot and air traffic control error. \n\n\"The thoughts of the management and employees of the group go out to Christophe de Margerie's wife, children and loved ones as well as to the families of the three other victims,\" Total said in a statement. \n\nThe Kremlin said that President Vladimir Putin had sent a telegram to his French counterpart, Francois Hollande, to express his condolences. \n\nIn the message, Putin praised de Margerie for his role in laying the foundation of \"long time fruitful cooperation between France and Russia in the energy sector.\" \n\nTotal is "
			  ],
			  [
			   "http://money.cnn.com/2014/10/20/investing/total-ceo-dies/index.html",
			   "Oil company Total CEO dies in plane crash",
			   "HONG KONG (CNNMoney) French oil company Total has confirmed the death of its chairman and CEO, Christophe de Margerie, who passed away in a private plane crash in Moscow. \n\nDe Margerie and three crew members were found dead at the scene of the accident, after the aircraft collided with a snow removal machine. \n\n\"The thoughts of the management and employees of the Group go out to Christophe de Margerie's wife, children and loved ones as well as to the families of the three other victims,\" the company said Tuesday in a statement. \n\nDe Margerie joined Total right after finishing university in 1974. He has held several positions with the company, including a job leading its Middle East operations. He was named CEO in 2007, and appointed Chairman in 2010. De Margerie and three crew members were found dead at the scene of the accident, after the aircraft collided with a snow removal machine. \"The thoughts of the management and employees of the Group go out to Christophe de Margerie's wife, c"
			  ],
			  [
			   "http://money.cnn.com/2014/10/20/investing/total-ceo-dies/index.html",
			   "Total CEO dies in plane crash",
			   "HONG KONG (CNNMoney) French oil company Total has confirmed the death of its chairman and CEO, Christophe de Margerie, who passed away in a private plane crash in Moscow. \n\nDe Margerie and three crew members were found dead at the scene of the accident, after the aircraft collided with a snow removal machine. \n\n\"The thoughts of the management and employees of the Group go out to Christophe de Margerie's wife, children and loved ones as well as to the families of the three other victims,\" the company said in a statement. \n\nDe Margerie joined Total right after finishing university in 1974. He has held several positions with the company, including a job leading its Middle East operations. He was named CEO in 2007, and appointed Chairman in 2010. De Margerie and three crew members were found dead at the scene of the accident, after the aircraft collided with a snow removal machine. \"The thoughts of the management and employees of the Group go out to Christophe de Margerie's wife, children "
			  ],
			  [
			   "http://money.cnn.com/2014/10/20/investing/ebola-stocks-markets-volatility-wall-street/index.html",
			   "Ebola is a fear factor for stock market",
			   "NEW YORK (CNNMoney) Fear has returned to Wall Street this fall and at least some of the heightened nervousness can be pinned on Ebola. \n\nThat's not to say the deadly virus is the number one thing keeping investors awake at night. There's concern about the global economy, deflation in Europe, and Federal Reserve policy. \n\nBut Ebola has contributed to the negative psychology that has sent stock prices reeling this month. \n\nNeed proof? The chart below shows how the VIX volatility index has spiked since the summer. At the same time, the number of searches on Bloomberg terminals (a key resource for many investors) for news related to the Ebola outbreak has also skyrocketed. Of course, correlation doesn't imply causality, but it's worth noting. \n\nEbola is \"not by itself directly responsible for everything, but it's obviously making things work,\" said Dan Greenhaus, chief global strategist at BTIG. \n\nGreenhaus, who published a similar chart in a note to clients Sunday night, said he's noticed"
			  ],
			  [
			   "http://money.cnn.com/2014/10/08/investing/tesla-d-stock/index.html",
			   "Elon Musk's $2 billion Tesla tweet",
			   "      Can Tesla 'D'-liver?       NEW YORK (CNNMoney)  How much is one mysterious tweet by Tesla CEO Elon Musk worth? About $2 billion.  \nThat's the gain in the electric car company's market value since Musk tweeted on October 1 that it \"was time to unveil the D and something else\" on October 9. \n \nShares of Tesla  ( TSLA ) are up nearly 6% in the past week -- a time when the broader market is slumping and gas guzzling rivals Ford  ( F ) and GM  ( GM ) are stuck spinning their wheels. (The stock was down about 2% on Wednesday though.) \n \nSo what will Musk be showing off at the company's big event Thursday night? It's not yet clear. It seems safe to say though that the D is not an entirely new model. \n \n D stands for drive? Or driverless? Most analysts and auto experts are predicting that Tesla will introduce an all-wheel drive, dual motor version of the Model S. Drive starts with D! So does dual! \n \nThere is also speculation that Tesla may tout new driverless (another D word) technology"
			  ],
			  [
			   "http://money.cnn.com/2014/10/20/investing/ebola-stocks-markets-volatility-wall-street/index.html",
			   "Ebola is a fear factor for the stock market",
			   "NEW YORK (CNNMoney) Fear has returned to Wall Street this fall and at least some of the heightened nervousness can be pinned on Ebola. \n\nThat's not to say the deadly virus is the number one thing keeping investors awake at night. There's concern about the global economy, deflation in Europe, and Federal Reserve policy. \n\nBut Ebola has contributed to the negative psychology that has sent stock prices reeling this month. \n\nNeed proof? The chart below shows how the VIX volatility index has spiked since the summer. At the same time, the number of searches on Bloomberg terminals (a key resource for many investors) for news related to the Ebola outbreak has also skyrocketed. Of course, correlation doesn't imply causality, but it's worth noting. \n\nEbola is \"not by itself directly responsible for everything, but it's obviously making things work,\" said Dan Greenhaus, chief global strategist at BTIG. \n\nGreenhaus, who published a similar chart in a note to clients Sunday night, said he's noticed"
			  ],
			  [
			   "http://money.cnn.com/2014/10/20/investing/stocks-market-calm-apple/index.html",
			   "Panic over? Calm returns to stocks",
			   "NEW YORK (CNNMoney) It feels like investors rolled out their yoga mats and took a deep breath Monday. \n\nCalm is back in the stock market. \n\nNot just calm, but some positive returns. The tech-heavy Nasdaq is up nearly 1%, and the S&P 500 is solidly higher as well. \n\nThe Dow would be up if it weren't for IBM IBM is a large component of the Dow, which only has 30 stocks to begin with. So a bad day for Big Blue is enough to pull the entire index down. \n\nBut the bigger story on Wall Street today is that investors just aren't selling everything as they did for much of last week. They are starting to step back and look at where value remains. \n\nIn short, they're focused on America and earnings. Whiplash subsides: While European markets almost all closed in the red Monday, the U.S. didn't follow their lead. Even more important: Volatility fell substantially. The topped 30 briefly last week -- often seen as an unofficial warning sign. Today the VIX is back down under 20. \n\n\"While investor senti"
			  ],
			  [
			   "http://money.cnn.com/2014/10/20/investing/ibm-sale-earnings/index.html?section=money_markets",
			   "IBM drags market down",
			   "IBM getting out of the chip business NEW YORK (CNNMoney) It's looking like a very blue Monday for Big Blue. \n\nIBM shares were sharply lower after the company dumped its chip unit at a loss and said it was disappointed with its earnings. \n\nThe computing company, a component of the , will take a $4.7 billion charge to sell its chip unit to Globalfoundaries, which will be a supplier of chips to IBM for the next three years. The chip unit lost another $100 million in the most recent quarter, roughly the same as the loss a year earlier. \n\nTo shed the money-losing unit, IBM will continue to invest $3 billion in chip research and development over the next five years, with Globalfoundaries benefiting from the results of that research. In return for that, Globalfoundaries will pay IBM only $1.5 billion over the next three years. IBM also reported lower earnings and revenue that were sharply below forecasts by Wall Street analysts. It said the poor results were due to a \"marked slowdown in Septe"
			  ],
			  [
			   "http://money.cnn.com/2014/10/20/investing/ibm-sale-earnings/index.html",
			   "It's a Blue Monday for IBM",
			   "IBM getting out of the chip business NEW YORK (CNNMoney) It's looking like a very blue Monday for Big Blue. \n\nIBM shares were sharply lower after the company dumped its chip unit at a loss and said it was disappointed with its earnings. \n\nThe computing company, a component of the , will take a $4.7 billion charge to sell its chip unit to Globalfoundaries, which will be a supplier of chips to IBM for the next three years. The chip unit lost another $100 million in the most recent quarter, roughly the same as the loss a year earlier. \n\nTo shed the money-losing unit, IBM will continue to invest $3 billion in chip research and development over the next five years, with Globalfoundaries benefiting from the results of that research. In return for that, Globalfoundaries will pay IBM only $1.5 billion over the next three years. IBM also reported lower earnings and revenue that were sharply below forecasts by Wall Street analysts. It said the poor results were due to a \"marked slowdown in Septe"
			  ],
			  [
			   "http://money.cnn.com/2014/10/20/investing/ibm-sale-earnings/index.html",
			   "IBM shares down after it dumps chip unit, posts disappointing earnings",
			   "NEW YORK (CNNMoney) It's looking like a very blue Monday for Big Blue. \n\nIBM shares were sharply lower in premarket trading after the company dumped its chip unit at a loss and said it was disappointed with its earnings. \n\nThe computing company, a component of the , will take a $4.7 billion charge to sell its chip unit to Globalfoundaries, which will be a supplier of chips to IBM for the next three years. The chip unit lost another $100 million in the most recent quarter, roughly the same as the loss a year earlier. \n\nTo shed the money-losing unit, IBM will continue to invest $3 billion in chip research and development over the next five years, with Globalfoundaries benefiting from the results of that research. In return for that, Globalfoundaries will pay IBM only $1.5 billion over the next three years. IBM also reported lower earnings and revenue that were sharply below forecasts by Wall Street analysts. It said the poor results were due to a \"marked slowdown in September\" in sales a"
			  ],
			  [
			   "http://money.cnn.com/2014/10/20/investing/ibm-sale-earnings/index.html",
			   "Blue Monday for Big Blue",
			   "NEW YORK (CNNMoney) It's looking like a very blue Monday for Big Blue. \n\nIBM shares were sharply lower in premarket trading after the company dumped its chip unit at a loss and said it was disappointed with its earnings. \n\nThe computing company, a component of the , will take a $4.7 billion charge to sell its chip unit to Globalfoundaries, which will be a supplier of chips to IBM for the next three years. The chip unit lost another $100 million in the most recent quarter, roughly the same as the loss a year earlier. \n\nTo shed the money-losing unit, IBM will continue to invest $3 billion in chip research and development over the next five years, with Globalfoundaries benefiting from the results of that research. In return for that, Globalfoundaries will pay IBM only $1.5 billion over the next three years. IBM also reported lower earnings and revenue that were sharply below forecasts by Wall Street analysts. It said the poor results were due to a \"marked slowdown in September\" in sales a"
			  ],
			  [
			   "http://money.cnn.com/2014/10/19/investing/stocks-market-lookahead-earnings-apple/index.html",
			   "Will earnings end the nightmare on Wall Street?",
			   "NEW YORK (CNNMoney) For a stock market that's effortlessly climbed higher for years, the past month has felt like something ripped out of a Hollywood horror film. \n\nFrightening plot twists like plunging oil prices and the Ebola outbreak teamed up with ghosts from the past (Greece, deflation jitters in Europe) to create a toxic mix of market scares. \n\nLast week even featured a few quasi-heroes like from corporate giants like General Electric \n\nWhen the dust finally settled, the Dow was left in a 1% hole for the year. The S&P 500 is up about 2% in 2014, but well off its all-time high. \n\nSo what's going to determine whether this week is another scary ride or something far more tame? \n\nSure, investors will continue paying attention to what's kept them awake at night like Ebola and Europe. But they'll also get the chance to hear from a massive parade of companies expected to reveal decent quarterly numbers, including Amazon.com \"Focusing on fundamentals is the best way for investors to avoi"
			  ],
			  [
			   "http://money.cnn.com/2014/10/19/investing/stocks-market-lookahead-earnings-apple/index.html?iid=TL_Popular",
			   "Can earnings end the market scare?",
			   "NEW YORK (CNNMoney) For a stock market that's effortlessly climbed higher for years, the past month has felt like something ripped out of a Hollywood horror film. \n\nFrightening plot twists like plunging oil prices and the Ebola outbreak teamed up with ghosts from the past (Greece, deflation jitters in Europe) to create a toxic mix of market scares. \n\nLast week even featured a few quasi-heroes like from corporate giants like General Electric \n\nWhen the dust finally settled, the Dow was left in a 1% hole for the year. The S&P 500 is up about 2% in 2014, but well off its all-time high. \n\nSo what's going to determine whether this week is another scary ride or something far more tame? \n\nSure, investors will continue paying attention to what's kept them awake at night like Ebola and Europe. But they'll also get the chance to hear from a massive parade of companies expected to reveal decent quarterly numbers, including Amazon.com \"Focusing on fundamentals is the best way for investors to avoi"
			  ],
			  [
			   "http://money.cnn.com/2014/10/19/investing/stocks-market-lookahead-earnings-apple/index.html",
			   "Nightmare on Wall Street: Is it over?",
			   "NEW YORK (CNNMoney) For a stock market that's effortlessly climbed higher for years, the past month has felt like something ripped out of a Hollywood horror film. \n\nFrightening plot twists like plunging oil prices and the Ebola outbreak teamed up with ghosts from the past (Greece, deflation jitters in Europe) to create a toxic mix of market scares. \n\nLast week even featured a few quasi-heroes like from corporate giants like General Electric \n\nWhen the dust finally settled, the Dow was left in a 1% hole for the year. The S&P 500 is up about 2% in 2014, but well off its all-time high. \n\nSo what's going to determine whether this week is another scary ride or something far more tame? \n\nSure, investors will continue paying attention to what's kept them awake at night like Ebola and Europe. But they'll also get the chance to hear from a massive parade of companies expected to reveal decent quarterly numbers, including Amazon.com \"Focusing on fundamentals is the best way for investors to avoi"
			  ],
			  [
			   "http://money.cnn.com/2014/10/17/investing/stocks-market-rally-earnings-fed/index.html",
			   "Finally! Stocks rally: 2nd best day of year",
			   "Whew! What a week for stocks! NEW YORK (CNNMoney) For one day at least, Wall Street remembered that earnings matter. \n\nStocks are storming higher Friday. The Dow rose 263 points, or 1.6%, its second best day of the entire year. Meanwhile the S&P 500 and Nasdaq each finished about 1% higher, and European markets rallied as well. While Friday's rebound is optimistic, stocks are still down heavily for October. This is the fourth week in a row that the Dow has closed with losses, and the tech-heavy Nasdaq index is down over 5% this month. \n\nThe doom and gloom from Europe (especially Germany) and Ebola remain. Even China is showing signs of slower growth. There's concern they could drag the U.S. economy down. \n\nJames Bullard, president of the St. Louis Fed, on Thursday that the Fed should weigh delaying the end to quantitative easing, or QE. The bond-buying experiment has helped send stocks to record highs, but it was set to end this month. \n\nThe reality is the Fed can't do much right now. "
			  ],
			  [
			   "http://money.cnn.com/video/investing/2014/10/17/investing-the-buzz-markets-nyse.cnnmoney",
			   "Whew! What a week for stocks!",
			   "Ebola fears and worries about Europe's economy caused stocks to tank this week. But will solid earnings and hopes of more Fed easing lead to a nice rebound?  \n  \r\n\r \r             \nCNNMoney assistant managing editor Paul LaMonica highlights the latest news from Wall Street and what's moving the markets in his daily investing commentary. \n@LaMonicaBuzz"
			  ],
			  [
			   "http://money.cnn.com/2014/10/17/investing/stock-market-protection/index.html?section=money_news_international",
			   "Can you protect yourself from a crash?",
			   "Some funds claim to guard against a market downturn. NEW YORK (CNNMoney) How can investors seek shelter from the stormy market? While there are a number of financial strategies designed to kick butt when the broader market tanks, they quickly become counterproductive to your portfolio once stocks rebound. Still, in a week of gut wrenching swings in the market, some investors will sleep better at night knowing that they have at least some protection. \n\nHere's a primer on the \"hedging products\" available to ordinary investors: \n\nInverse Exchange Traded Funds: Whatever direction the market is running, so-called \"inverse ETFs\" bolt in the opposite direction. Often times, these ETFs move faster than the market itself. The ProShares UltraShort S&P500 \n\nIt delivered on that goal recently. While the S&P 500 is down 5.5% this month, the ETF has soared 11%. The ProShares UltraPro Short S&P500 \n\nAs enticing as those returns sound, it's important to remember that they got hammered during stocks bi"
			  ],
			  [
			   "http://money.cnn.com/2014/10/17/investing/stocks-market-rally-earnings-fed/index.html",
			   "Finally! Stocks rally. But can it last?",
			   "Whew! What a week for stocks! NEW YORK (CNNMoney) For one day at least, Wall Street remembered that earnings matter. \n\nStocks stormed higher Friday morning. The Dow was up about over 250 points, or 1.5%, while the S&P 500 and Nasdaq each rose more than 1.5% As Europe, especially Germany, looks queasy and even China is showing signs of slower growth, there's concern they could drag the U.S. economy down. \n\nJames Bullard, president of the St. Louis Fed, on Thursday that the Fed should weigh delaying the end to quantitative easing, or QE. The bond-buying experiment has helped send stocks to record highs, but it was set to end this month. \n\nThe reality is the Fed can't do much right now. Interest rates are at historic lows near zero. Europe went so far as to cut interest rates to negative levels this year, but that has done little to stimulate the economy there. Investors understand that when a central bank takes such dramatic actions, it's a sign of big trouble. \"I view the probability of"
			  ],
			  [
			   "http://money.cnn.com/video/investing/2014/10/17/investing-the-buzz-markets-nyse.cnnmoney/index.html",
			   "The market volatility is frightening but is the worst finally over?",
			   "Ebola fears and worries about Europe's economy caused stocks to tank this week. But will solid earnings and hopes of more Fed easing lead to a nice rebound?  \n  \r\n\r \r             \nCNNMoney assistant managing editor Paul LaMonica highlights the latest news from Wall Street and what's moving the markets in his daily investing commentary. \n@LaMonicaBuzz"
			  ],
			  [
			   "http://money.cnn.com/2014/10/17/investing/stock-market-protection/index.html",
			   "Can you sidestep a market crash?",
			   "Some funds claim to guard against a market downturn. NEW YORK (CNNMoney) How can investors seek shelter from the stormy market? While there are a number of financial strategies designed to kick butt when the broader market tanks, they quickly become counterproductive to your portfolio once stocks rebound. Still, in a week of gut wrenching swings in the market, some investors will sleep better at night knowing that they have at least some protection. \n\nHere's a primer on the \"hedging products\" available to ordinary investors: \n\nInverse Exchange Traded Funds: Whatever direction the market is running, so-called \"inverse ETFs\" bolt in the opposite direction. Often times, these ETFs move faster than the market itself. The ProShares UltraShort S&P500 \n\nIt delivered on that goal recently. While the S&P 500 is down 5.5% this month, the ETF has soared 11%. The ProShares UltraPro Short S&P500 \n\nAs enticing as those returns sound, it's important to remember that they got hammered during stocks bi"
			  ],
			  [
			   "http://money.cnn.com/2014/10/17/investing/stock-market-protection/index.html",
			   "Can you protect yourself from a market crash?",
			   "Some funds claim to guard against a market downturn. NEW YORK (CNNMoney) How can investors seek shelter from the stormy market? While there are a number of financial strategies designed to kick butt when the broader market tanks, they quickly become counterproductive to your portfolio once stocks rebound. Still, in a week of gut wrenching swings in the market, some investors will sleep better at night knowing that they have at least some protection. \n\nHere's a primer on the \"hedging products\" available to ordinary investors: \n\nInverse Exchange Traded Funds: Whatever direction the market is running, so-called \"inverse ETFs\" bolt in the opposite direction. Often times, these ETFs move faster than the market itself. The ProShares UltraShort S&P500 \n\nIt delivered on that goal recently. While the S&P 500 is down 5.5% this month, the ETF has soared 11%. The ProShares UltraPro Short S&P500 \n\nAs enticing as those returns sound, it's important to remember that they got hammered during stocks bi"
			  ],
			  [
			   "http://money.cnn.com/2014/10/17/investing/premarkets/index.html?section=money_news_international",
			   "U.S. markets expected to bounce at open",
			   "Click chart for in-depth premarket data. LONDON (CNNMoney) It looks like it's time for a bounce after days of gut-wrenching volatility in the stock market. \n\nHere are the four things you need to know before the opening bell rings in New York: 1. Comeback time: were definitively higher and most European markets were rising by more than 1% in early trading. \n\nInvestors are clearly feeling steadier after panic flooded the markets over the previous few days. The Nasdaq briefly hit correction territory on Thursday, signaling a 10% decline from a recent peak. \n\nEven though markets had a wild ride on Thursday, stocks settled down at the end of the day and the indexes closed with only minor changes. The Dow lost 25 points, while the S&P 500 and Nasdaq edged into positive territory. CNNMoney's still shows investors are feeling extremely fearful. \n\nOver in Asia, the main stock markets were mixed at the close of the week. 2. Earnings and economics: Investors are waiting for General Electric \n\nThe"
			  ],
			  [
			   "http://money.cnn.com/2014/10/17/investing/premarkets/index.html",
			   "U.S. markets set to bounce at open",
			   "Click chart for in-depth premarket data. LONDON (CNNMoney) It looks like it's time for a bounce after days of gut-wrenching volatility in the stock market. \n\nHere are the four things you need to know before the opening bell rings in New York: 1. Comeback time: were definitively higher and most European markets were rising by more than 1% in early trading. \n\nInvestors are clearly feeling steadier after panic flooded the markets over the previous few days. The Nasdaq briefly hit correction territory on Thursday, signaling a 10% decline from a recent peak. \n\nEven though markets had a wild ride on Thursday, stocks settled down at the end of the day and the indexes closed with only minor changes. The Dow lost 25 points, while the S&P 500 and Nasdaq edged into positive territory. CNNMoney's still shows investors are feeling extremely fearful. \n\nOver in Asia, the main stock markets were mixed at the close of the week. 2. Earnings and economics: Investors are waiting for General Electric \n\nThe"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/investing/stocks-markets-wild-wall-street/index.html",
			   "Stock market panic takes a timeout",
			   "NEW YORK (CNNMoney) Apparently all Wall Street needed to end its panic attack was a little money printing talk. \n\nU.S. stocks ended another wild day of trading mostly unchanged, rebounding from an early 200-point plunge on the Dow that was sparked by fears of a global slowdown. \n\nThe big comeback was triggered by a Federal Reserve official who suggested the central bank could abandon its plan to pull away the easy money punch bowl that's been juicing stock prices for years. \n\n\"The market loves free money. If the Fed wants to print it, we go higher. Don't fight it,\" said Joe Saluzzi, co-head of trading at Themis Trading. \n\nFed officials are clearly taking notice of the extreme turbulence that has hit the markets in recent days due to fears about Europe's economy, the Ebola outbreak and plunging oil prices. Just look at Wednesday, when the but ended the day down \"only\" 173 points. \n\nThe wave of selling over the past month has left all three major indexes flirting with their first \"correc"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/investing/stocks-markets-wild-wall-street/index.html",
			   "Market panic eases: stocks close flat",
			   "NEW YORK (CNNMoney) Apparently all Wall Street needed to end its panic attack was a little money printing talk. \n\nU.S. stocks ended another of wild trading mostly unchanged, rebounding from an early 200-point plunge on the Dow that was sparked by more growth concerns. \n\nThe big comeback was triggered by a Federal Reserve official who suggested the central bank could abandon its plan to pull away the easy money punch bowl that's been juicing stock prices for years. \n\n\"The market loves free money. If the Fed wants to print it, we go higher. Don't fight it,\" said Joe Saluzzi, co-head of trading at Themis Trading. \n\nFed officials are clearly taking notice of the extreme turbulence that has hit the markets in recent days due to fears about Europe's economy, the Ebola outbreak and plunging oil prices. Just look at Wednesday, when the but ended the day down \"only\" 173 points. \n\nThe wave of selling over the past month has nearly wiped out the stock market's gains for the year and left all thre"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/investing/stocks-markets-wild-wall-street/index.html",
			   "Market panic eases",
			   "NEW YORK (CNNMoney) Apparently all Wall Street needed to end its panic attack was a little money printing talk. \n\nU.S. stocks ended another of wild trading mostly unchanged, rebounding from an early 200-point plunge on the Dow that was sparked by more growth concerns. \n\nThe big comeback was triggered by a Federal Reserve official who suggested the central bank could abandon its plan to pull away the easy money punch bowl that's been juicing stock prices for years. \n\n\"The market loves free money. If the Fed wants to print it, we go higher. Don't fight it,\" said Joe Saluzzi, co-head of trading at Themis Trading. \n\nFed officials are clearly taking notice of the extreme turbulence that has hit the markets in recent days due to fears about Europe's economy, the Ebola outbreak and plunging oil prices. Just look at Wednesday, when the but ended the day down \"only\" 173 points. \n\nThe wave of selling over the past month has nearly wiped out the stock market's gains for the year and left all thre"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/investing/stocks-markets-wild-wall-street/index.html?section=money_news_international",
			   "Stock market panic eases",
			   "NEW YORK (CNNMoney) Apparently all Wall Street needed to end its panic attack was a little money printing talk. \n\nU.S. stocks ended another of wild trading mostly unchanged, rebounding from an early 200-point plunge on the Dow that was sparked by more growth concerns. \n\nThe big comeback was triggered by a Federal Reserve official who suggested the central bank could abandon its plan to pull away the easy money punch bowl that's been juicing stock prices for years. \n\n\"The market loves free money. If the Fed wants to print it, we go higher. Don't fight it,\" said Joe Saluzzi, co-head of trading at Themis Trading. \n\nFed officials are clearly taking notice of the extreme turbulence that has hit the markets in recent days due to fears about Europe's economy, the Ebola outbreak and plunging oil prices. Just look at Wednesday, when the but ended the day down \"only\" 173 points. \n\nThe wave of selling over the past month has nearly wiped out the stock market's gains for the year and left all thre"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/investing/europe-stocks-investing?hpt=hp_t3",
			   "Turbulent day for stocks",
			   "The Parisian index has fallen by 17.5% since its latest peak in June.  LONDON (CNNMoney)  It's correction time!  \n European stocks have fallen hard and fast as markets around the world experience a swift bout of selling . \n \nEvery major market in Europe has now entered correction territory, which occurs when an index drops by at least 10% from a recent peak. \n \nThe FTSE 100 in London has been faring the best so far, dropping by \"only\" 12% since early September. \n \nBut Italy's FTSE MIB index has been swimming in the red, declining by 22% since mid-June. If it stays at this level for long enough, investors would call this a bear market. \n \nOver in Germany, the benchmark Dax index has fallen by nearly 16% from a peak in late June. \n \nThe CAC 40 in Paris has dropped by about 17.5% over roughly the same period. \n \n Related: This is not another financial crisis  \n \nInvestors have been pulling their money out of global markets as worries have come to the fore about slow economic growth, sprea"
			  ],
			  [
			   "http://money.cnn.com/video/investing/2014/10/16/time-to-bargain-shop-for-stocks.cnnmoney",
			   "Yes, it's time to go shopping for stocks",
			   "The recent market plunge has created a great buying opportunity for investors looking for quality stocks. Several auto, energy, tech and retail firms look attractive.  \n  \r\n\r \r             \nCNNMoney assistant managing editor Paul LaMonica highlights the latest news from Wall Street and what's moving the markets in his daily investing commentary. \n@LaMonicaBuzz"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/investing/stocks-to-buy-bargains/index.html",
			   "This is not the time to panic. It's the time to be opportunistic",
			   "Yes, it's time to go shopping for stocks NEW YORK (CNNMoney) Stocks are on sale. The market's sharp pullback should have investors excited instead of doing their best Chicken Little impersonation. \n\nYou read that correctly. While your heart may be telling you it's time to get out of the market, panicking while stocks are plunging has historically been the . Time and time again, savvy investors like Warren Buffett and the late Sir John Templeton made a killing by purchasing bargain stocks after big drops. \n\nTempleton was famous for saying that his investing philosophy was to buy when others were \"despondently selling\" and sell when others were \"avidly buying.\" \n\nThe trouble is that many stocks that have fallen on hard times have done so for very good reasons. A cheap stock might be too good to be true -- the market's version of the house that Tom Hanks and Shelley Long bought in \"The Money Pit.\" \n\nExperts even have a phrase for beaten down stocks that deserve to be in the dumps: a value"
			  ],
			  [
			   "http://money.cnn.com/2014/10/15/investing/stocks-plunge-not-like-2008/index.html?section=money_news_international",
			   "Don't panic. This is not another 2008 crisis",
			   "Markets go for a wild ride NEW YORK (CNNMoney) I'm going to come right out and say it. This market sell-off is ugly. It's not fun. It's scary. \n\nBut now it's time to take a deep breath and relax. (And not look at your 401(k) balance.) \n\nWe've been through this before. It's not the end of the world. It may not even be the end of the bull market that's been going on for more than five-and-a-half years. \n\n2008 was ten times scarier than this. A lot of people are going to be quick to say that the market turmoil of this September and October is similar to what happened in those two months of 2008. \n\nThat's BS. Really. What's going on now is not even close! It's really funny how short people's memories are. I'm not talking about ancient history. In the fall of 2008, stocks were already well below their all-time highs. The financial market was collapsing. That's not hyperbole. Lehman Brothers went under. Washington Mutual failed. AIG A has you running for the hills? Please. \n\nIn the autumn of"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/investing/stocks-markets-wild-wall-street/index.html?section=money_news_international",
			   "Wild ride: U.S. stocks hit by volatility",
			   "NEW YORK (CNNMoney) Wall Street's scary October ride isn't even close to being done. \n\nThe Dow plummeted about 200 points and briefly tumbled below the 16,000 level before rebounding dramatically. Now it's down again. \n\nSo what's driving the latest craziness? The early selling was sparked by continued concerns about global growth, especially in European countries like Greece and Spain. \n\nThen stocks bounced and even briefly turned positive on new signs the Federal Reserve could keep the easy money flowing due to the recent market turbulence. That would be very bullish for the stock market, which has soared to record highs thanks in part to the Fed's stimulus programs. \n\nFed officials are clearly taking notice of the extreme turbulence that has hit the markets in recent days due to fears about Europe's economy, the Ebola outbreak and plunging oil prices. Just look at Wednesday, when the but ended the day down \"only\" 173 points. \n\n\"Price action this morning is ridiculous, with currencies"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/investing/stocks-to-buy-bargains/index.html",
			   "Time to shop 'til you drop for cheap stocks",
			   "These stocks are 20% below their recent highs, pay dividends and should report decent earnings growth. Time to buy? NEW YORK (CNNMoney) Stocks are on sale. The market's sharp pullback should have investors excited instead of doing their best Chicken Little impersonation. \n\nYou read that correctly. While your heart may be telling you it's time to get out of the market, panicking while stocks are plunging has historically been the . Time and time again, savvy investors like Warren Buffett and the late Sir John Templeton made a killing by purchasing bargain stocks after big drops. \n\nTempleton was famous for saying that his investing philosophy was to buy when others were \"despondently selling\" and sell when others were \"avidly buying.\" \n\nThe trouble is that many stocks that have fallen on hard times have done so for very good reasons. A cheap stock might be too good to be true -- the market's version of the house that Tom Hanks and Shelley Long bought in \"The Money Pit.\" \n\nExperts even ha"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/investing/goldman-sachs-earnings-soar/index.html",
			   "Goldman Sachs is actually hiring as profit soars",
			   "Goldman Sachs Chief Lloyd Blankfein is probably pretty happy with his firm's earnings. NEW YORK (CNNMoney) If Goldman Sachs (GS) is any guide, the luster of Wall Street may be returning. \n\nThe investment banking powerhouse trounced earnings expectations Thursday when it reported a 25% jump in third quarter revenue compared to same period last year. \n\nIn a sign that the post-crisis cost cutting mentality on Wall Street may be ending, Goldman said it's total headcount increased 3% last quarter. And employees can expect big paychecks this year. The company's compensation and benefits for the quarter (which includes money set aside for bonuses) were $2.80 billion, 18% higher than the same three months in 2013. Goldman capitalized on the wave of mergers and acquisitions activity over the summer, bringing in almost $600 million alone from fees earned by advising companies on such transactions. \n\nManaging money for wealthy individuals and institutions also pays well, evidenced by the firm's 2"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/investing/stocks-markets-wild-wall-street/index.html?iid=TL_Popular",
			   "Turbulence: Another wild day on Wall Street",
			   "NEW YORK (CNNMoney) Wall Street's scary October ride isn't even close to being done. \n\nThe Dow plummeted about 200 points and briefly tumbled below the 16,000 level before rebounding dramatically. Now it's down again. \n\nSo what's driving the latest craziness? The early selling was sparked by continued concerns about global growth, especially in European countries like Greece and Spain. \n\nThen stocks bounced and even briefly turned positive on new signs the Federal Reserve could keep the easy money flowing due to the recent market turbulence. That would be very bullish for the stock market, which has soared to record highs thanks in part to the Fed's stimulus programs. \n\nFed officials are clearly taking notice of the extreme turbulence that has hit the markets in recent days due to fears about Europe's economy, the Ebola outbreak and plunging oil prices. Just look at Wednesday, when the but ended the day down \"only\" 173 points. \n\n\"Price action this morning is ridiculous, with currencies"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/investing/stocks-markets-wild-wall-street/index.html",
			   "Turbulence: Another wild day for stocks",
			   "NEW YORK (CNNMoney) Wall Street's scary October ride isn't even close to being done. \n\nThe Dow plummeted about 200 points and briefly tumbled below the 16,000 level before rebounding dramatically. Now it's down again. \n\nSo what's driving the latest craziness? The early selling was sparked by continued concerns about global growth, especially in European countries like Greece and Spain. \n\nThen stocks bounced and even briefly turned positive on new signs the Federal Reserve could keep the easy money flowing due to the recent market turbulence. That would be very bullish for the stock market, which has soared to record highs thanks in part to the Fed's stimulus programs. \n\nFed officials are clearly taking notice of the extreme turbulence that has hit the markets in recent days due to fears about Europe's economy, the Ebola outbreak and plunging oil prices. Just look at Wednesday, when the but ended the day down \"only\" 173 points. \n\n\"Price action this morning is ridiculous, with currencies"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/investing/stocks-markets-wild-wall-street/index.html?iid=TL_Popular",
			   "Wild markets: Stocks erase big early losses",
			   "NEW YORK (CNNMoney) Wall Street's scary October ride isn't even close to being done. \n\nThe Dow plummeted about 200 points and briefly tumbled below the 16,000 level before rebounding dramatically. Now it's down again. \n\nSo what's driving the latest craziness? The early selling was sparked by continued concerns about global growth, especially in European countries like Greece and Spain. \n\nThen stocks bounced and even briefly turned positive on new signs the Federal Reserve could keep the easy money flowing due to the recent market turbulence. That would be very bullish for the stock market, which has soared to record highs thanks in part to the Fed's stimulus programs. \n\nFed officials are clearly taking notice of the extreme turbulence that has hit the markets in recent days due to fears about Europe's economy, the Ebola outbreak and plunging oil prices. Just look at Wednesday, when the but ended the day down \"only\" 173 points. \n\n\"Price action this morning is ridiculous, with currencies"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/investing/stocks-markets-wild-wall-street/index.html",
			   "Wild markets: Stocks slide once again",
			   "NEW YORK (CNNMoney) Wall Street's scary October ride isn't even close to being done. \n\nThe Dow plummeted about 200 points and briefly tumbled below the 16,000 level before rebounding dramatically. Now it's down again. \n\nSo what's driving the latest craziness? The early selling was sparked by continued concerns about global growth, especially in European countries like Greece and Spain. \n\nThen stocks bounced and even briefly turned positive on new signs the Federal Reserve could keep the easy money flowing due to the recent market turbulence. That would be very bullish for the stock market, which has soared to record highs thanks in part to the Fed's stimulus programs. \n\nFed officials are clearly taking notice of the extreme turbulence that has hit the markets in recent days due to fears about Europe's economy, the Ebola outbreak and plunging oil prices. Just look at Wednesday, when the but ended the day down \"only\" 173 points. \n\n\"Price action this morning is ridiculous, with currencies"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/investing/stocks-markets-wild-wall-street/index.html",
			   "Wild markets: Stocks erase early dive",
			   "NEW YORK (CNNMoney) Wall Street's scary October ride isn't even close to being done. \n\nThe Dow plummeted about 200 points and briefly tumbled below the 16,000 level before rebounding dramatically. Now it's basically back to even on the day. \n\nSo what's driving the latest craziness? The early selling was sparked by continued concerns about global growth, especially in European countries like Greece and Spain. \n\nThen stocks bounced and eventually turned positive on new signs the Federal Reserve could keep the easy money flowing due to the recent market turbulence. That would be very bullish for the stock market, which has soared to record highs thanks in part to the Fed's stimulus programs. \n\nFed officials are clearly taking notice of the extreme turbulence that has hit the markets in recent days due to fears about Europe's economy, the Ebola outbreak and plunging oil prices. Just look at Wednesday, when the but ended the day down \"only\" 173 points. \n\n\"Price action this morning is ridicu"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/investing/europe-stocks-investing/index.html?section=money_news_international",
			   "European markets in correction territory",
			   "The Parisian index has fallen by 17.5% since its latest peak in June. LONDON (CNNMoney) It's correction time! \n\nEuropean stocks have fallen hard and fast as markets around the world experience a swift . Every major market in Europe has now entered correction territory, which occurs when an index drops by at least 10% from a recent peak. \n\nThe FTSE 100 in London has been faring the best so far, dropping by \"only\" 12% since early September. \n\nBut Italy's FTSE MIB index has been swimming in the red, declining by 22% since mid-June. If it stays at this level for long enough, investors would call this a bear market. \n\nOver in Germany, the benchmark Dax index has fallen by nearly 16% from a peak in late June. \n\nThe CAC 40 in Paris has dropped by about 17.5% over roughly the same period. Investors have been pulling their money out of global markets as worries have come to the fore about slow economic growth, spreading Ebola and continued uncertainty about the Federal Reserve. \n\nThis week, CNN"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/investing/stocks-markets-wild-wall-street/index.html?section=money_news_international",
			   "Wild ride: U.S. stocks head south again",
			   "NEW YORK (CNNMoney) How low will the stock market go? That's what everyone wants to know. \n\nStocks suffered another drop Thursday morning as concerns about the global economy continue to cause investors to dump risky assets. The Dow plummeted about 200 points and briefly tumbled below the 16,000 level before rebounding a bit. \n\nIt's another \"yo-yo\" day. In a mere hour of trading, there have already been wild swings, but the momentum right now is clearly downward. \n\nThe wave of selling over the past month has nearly wiped out the stock market's gains for the year and left all three major indexes flirting with their first \"correction\" in years. \n\nIf the Nasdaq closes below 4,138.37, it would officially be in correction mode, signaling a 10% decline from a previous closing high. It's currently trading around 4,180. \n\nExtreme turbulence has hit the markets in recent days as fears about Europe's economy, the Ebola outbreak and plunging oil prices continue to dent investor confidence. Just l"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/investing/stocks-markets-wild-wall-street/index.html?iid=TL_Popular",
			   "Wild markets: Dow briefly tumbles below 16,000",
			   "NEW YORK (CNNMoney) How low will the stock market go? That's what everyone wants to know. \n\nStocks suffered another drop Thursday morning as concerns about the global economy continue to cause investors to dump risky assets. The Dow plummeted about 200 points and briefly tumbled below the 16,000 level before rebounding a bit. \n\nIt's another \"yo-yo\" day. In a mere hour of trading, there have already been wild swings, but the momentum right now is clearly downward. \n\nThe wave of selling over the past month has nearly wiped out the stock market's gains for the year and left all three major indexes flirting with their first \"correction\" in years. \n\nIf the Nasdaq closes below 4,138.37, it would officially be in correction mode, signaling a 10% decline from a previous closing high. It's currently trading around 4,180. \n\nExtreme turbulence has hit the markets in recent days as fears about Europe's economy, the Ebola outbreak and plunging oil prices continue to dent investor confidence. Just l"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/investing/stocks-markets-wild-wall-street/index.html",
			   "Wild markets: Stocks heading south again",
			   "NEW YORK (CNNMoney) How low will the stock market go? That's what everyone wants to know. \n\nStocks suffered another drop Thursday morning as concerns about the global economy continue to cause investors to dump risky assets. The Dow plummeted about 200 points and briefly tumbled below the 16,000 level before rebounding a bit. \n\nIt's another \"yo-yo\" day. In a mere hour of trading, there have already been wild swings, but the momentum right now is clearly downward. \n\nThe wave of selling over the past month has nearly wiped out the stock market's gains for the year and left all three major indexes flirting with their first \"correction\" in years. \n\nIf the Nasdaq closes below 4,138.37, it would officially be in correction mode, signaling a 10% decline from a previous closing high. It's currently trading around 4,180. \n\nExtreme turbulence has hit the markets in recent days as fears about Europe's economy, the Ebola outbreak and plunging oil prices continue to dent investor confidence. Just l"
			  ],
			  [
			   "http://money.cnn.com/2014/10/15/investing/stocks-plunge-not-like-2008/index.html",
			   "Don't panic! This is not another 2008 crisis",
			   "Markets go for a wild ride NEW YORK (CNNMoney) I'm going to come right out and say it. This market sell-off is ugly. It's not fun. It's scary. \n\nBut now it's time to take a deep breath and relax. (And not look at your 401(k) balance.) \n\nWe've been through this before. It's not the end of the world. It may not even be the end of the bull market that's been going on for more than five-and-a-half years. \n\n2008 was ten times scarier than this. A lot of people are going to be quick to say that the market turmoil of this September and October is similar to what happened in those two months of 2008. \n\nThat's BS. Really. What's going on now is not even close! It's really funny how short people's memories are. I'm not talking about ancient history. In the fall of 2008, stocks were already well below their all-time highs. The financial market was collapsing. That's not hyperbole. Lehman Brothers went under. Washington Mutual failed. AIG A has you running for the hills? Please. \n\nIn the autumn of"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/investing/stocks-markets-wild-wall-street/index.html",
			   "Wild markets: Stocks head south again",
			   "NEW YORK (CNNMoney) How low will the stock market go? That's what everyone wants to know. \n\nStocks suffered another drop Thursday morning as concerns about the global economy continue to cause investors to dump risky assets. The Dow plummeted about 200 points and briefly tumbled below the 16,000 level before rebounding a bit. \n\nIt's another \"yo-yo\" day. In a mere hour of trading, there have already been wild swings, but the momentum right now is clearly downward. \n\nThe wave of selling over the past month has nearly wiped out the stock market's gains for the year and left all three major indexes flirting with their first \"correction\" in years. \n\nIf the Nasdaq closes below 4,138.37, it would officially be in correction mode, signaling a 10% decline from a previous closing high. It's currently trading around 4,180. \n\nExtreme turbulence has hit the markets in recent days as fears about Europe's economy, the Ebola outbreak and plunging oil prices continue to dent investor confidence. Just l"
			  ],
			  [
			   "http://money.cnn.com/2014/10/15/investing/stock-market-winners-during-selloff/index.html",
			   "These stocks actually went UP Wednesday",
			   "Natural gas driller Cabot Oil and Gas was a bright spot in any otherwise gloomy market Wednesday. NEW YORK (CNNMoney) In the stock market's implosion Wednesday, there were a few survivors amidst the rubble. \n\nA handful of energy companies perked up, the winner among them Southwestern Energy Company \n\nWhat these companies have in common is a lot of U.S. natural gas exposure. \n\nThe major energy giants like Exxon Mobil \n\nPlus, natural gas stocks have taken their own beating this year, so its possible that energy investors are flocking to them in the hopes of snapping up a bargain. Another bright spot was the \"traditional\" retail sector, even though a report Wednesday from the Commerce Department said retail sales declined in September. Speaking of video games, Electronic Arts \n\nAnd investors seemed to like what they heard from Time Warner \n\nThe media conglomerate, which owns CNNMoney parent Turner Broadcasting as well as Warner Bros. and HBO, is in the midst of a reorganization after it r"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/investing/europe-stocks-investing?hpt=hp_t3",
			   "Markets take beating",
			   "The Parisian index has fallen by 17.5% since its latest peak in June.  LONDON (CNNMoney)  It's correction time!  \n European stocks have fallen hard and fast as markets around the world experience a swift bout of selling . \n \nEvery major market in Europe has now entered correction territory, which occurs when an index drops by at least 10% from a recent peak. \n \nThe FTSE 100 in London has been faring the best so far, dropping by \"only\" 12% since early September. \n \nBut Italy's FTSE MIB index has been swimming in the red, declining by 22% since mid-June. If it stays at this level for long enough, investors would call this a bear market. \n \nOver in Germany, the benchmark Dax index has fallen by nearly 16% from a peak in late June. \n \nThe CAC 40 in Paris has dropped by about 17.5% over roughly the same period. \n \n Related: This is not another financial crisis  \n \nInvestors have been pulling their money out of global markets as worries have come to the fore about slow economic growth, sprea"
			  ],
			  [
			   "http://money.cnn.com/2014/10/15/investing/stocks-plunge-not-like-2008/index.html",
			   "Don't panic! This is not another 2008",
			   "Markets go for a wild ride NEW YORK (CNNMoney) I'm going to come right out and say it. This market sell-off is ugly. It's not fun. It's scary. \n\nBut now it's time to take a deep breath and relax. (And not look at your 401(k) balance.) \n\nWe've been through this before. It's not the end of the world. It may not even be the end of the bull market that's been going on for more than five-and-a-half years. \n\n2008 was ten times scarier than this. A lot of people are going to be quick to say that the market turmoil of this September and October is similar to what happened in those two months of 2008. \n\nThat's BS. Really. What's going on now is not even close! It's really funny how short people's memories are. I'm not talking about ancient history. In the fall of 2008, stocks were already well below their all-time highs. The financial market was collapsing. That's not hyperbole. Lehman Brothers went under. Washington Mutual failed. AIG A has you running for the hills? Please. \n\nIn the autumn of"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/investing/premarkets/index.html?section=money_news_international",
			   "U.S. futures point to a rough open",
			   "Don't sweat the market's dip LONDON (CNNMoney) Keep calm and carry on? Or is it time to freak out? \n\nHere are the five things you need to know before the opening bell rings in New York: 1. Market moves: are making a definite move lower and selling has resumed in . Some major indexes in Europe are declining by more than 3%. \n\nFutures indicate the S&P 500 could drop by about 1.5% at the open, after on Wednesday. Over the course of the previous trading session, the plummeted by 460 points before staging a late rally to end with a loss of \"only\" 173 points. The Nasdaq briefly fell into correction territory, indicating a 10% drop from a prior high, but rebounded sharply to finish the day barely in the red. The S&P 500 closed with a 0.8% decline. \n\nStocks have been very volatile over the past week and CNNMoney's shows investors are feeling extremely fearful. 3. Keep a watch on Apple: Investors will be monitoring Apple \n\n4. Pharma deal dies: U.S. drugmaker AbbVie 5. Earnings and economics: De"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/investing/europe-stocks-investing/index.html?section=money_news_international",
			   "All European markets in correction territory",
			   "The Parisian index has fallen by 17.5% since its latest peak in June. LONDON (CNNMoney) It's correction time! \n\nEuropean stocks have fallen hard and fast as markets around the world experience a swift . Every major market in Europe has now entered correction territory, which occurs when an index drops by at least 10% from a recent peak. \n\nThe FTSE 100 in London has been faring the best so far, dropping by \"only\" 12% since early September. \n\nBut Italy's FTSE MIB index has been swimming in the red, declining by 22% since mid-June. If it stays at this level for long enough, investors would call this a bear market. \n\nOver in Germany, the benchmark Dax index has fallen by nearly 16% from a peak in late June. \n\nThe CAC 40 in Paris has dropped by about 17.5% over roughly the same period. Investors have been pulling their money out of global markets as worries have come to the fore about slow economic growth, spreading Ebola and continued uncertainty about the Federal Reserve. \n\nThis week, CNN"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/investing/goldman-sachs-earnings-soar/index.html",
			   "Goldman Sachs is hiring as profit soars",
			   "Goldman Sachs Chief Lloyd Blankfein is probably pretty happy with his firm's earnings. NEW YORK (CNNMoney) If Goldman Sachs (GS) is any guide, the luster of Wall Street may be returning. \n\nThe investment banking powerhouse trounced earnings expectations Thursday when it reported a 25% jump in third quarter profit compared to same period last year. \n\nIn a sign that the post-crisis cost cutting mentality on Wall Street may be ending, Goldman said it's total headcount increased 3% last quarter. And employees can expect big paychecks this year. The company's compensation and benefits for the quarter (which includes money set aside for bonuses) were $2.80 billion, 18% higher than the same three months in 2013. Goldman capitalized on the wave of mergers and acquisitions activity over the summer, bringing in almost $600 million alone from fees earned by advising companies on such transactions. \n\nManaging money for wealthy individuals and institutions also pays well, evidenced by the firm's 20"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/investing/premarkets/index.html?iid=Lead&hpt=hp_t3",
			   "Rough morning for markets",
			   "      Don't sweat the market's dip       LONDON (CNNMoney)  Keep calm and carry on? Or is it time to freak out?  \nHere are the five things you need to know before the opening bell rings in New York: \n \n 1. Market moves:  U.S. stock futures are making a definite move lower and selling has resumed in European stock markets . Some major indexes in Europe are declining by more than 3%. \n \nFutures indicate the S&P 500 could drop by about 1.5% at the open, after Wall Street had a wild day on Wednesday. \n \nOver the course of the previous trading session, the Dow Jones industrial average plummeted by 460 points before staging a late rally to end with a loss of \"only\" 173 points. The Nasdaq briefly fell into correction territory, indicating a 10% drop from a prior high, but rebounded sharply to finish the day barely in the red. The S&P 500 closed with a 0.8% decline. \n \nStocks have been very volatile over the past week and CNNMoney's Fear & Greed index shows investors are feeling extremely fear"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/investing/tesla-shares/index.html",
			   "Tesla shares take a couple of hits",
			   "Click on chart for more data on Tesla shares. NEW YORK (CNNMoney) Tesla Motors shares were lower Thursday amid a new legislative setback in its efforts to sell cars directly to consumers and a note from a leading analyst suggesting the debut of its Model X could be delayed. Tesla does not currently have a store or showroom in Michigan, making the home turf of rivals General Motors \n\nTesla has repeatedly argued it needs to be able to sell cars directly to consumers in order to explain the advantages of electric cars. But the and various state dealer groups have fought those company-owned stores, arguing that independently owned dealerships provide a level of protection for car buyers. \n\nThe Michigan state legislature overwhelmingly passed the change in the law with little debate or public comment on Oct. 2. But language prohibiting automakers from owning a dealership was quietly inserted as it moved though the process. The news of that provision broke Monday as the bill sat on Gov. Rick"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/investing/europe-stocks-investing/index.html",
			   "European markets take a beating",
			   "Forget about Venice! European markets are all sinking. LONDON (CNNMoney) It's correction time! \n\nEuropean stocks have fallen hard and fast as markets around the world experience a swift . Every major market in Europe has now entered correction territory, which occurs when an index drops by at least 10% from a recent peak. \n\nThe FTSE 100 in London has been faring the best so far, dropping by \"only\" 12% since early September. \n\nBut Italy's FTSE MIB index has been swimming in the red, declining by 22% since mid-June. If it stays at this level for long enough, investors would call this a bear market. \n\nOver in Germany, the benchmark Dax index has fallen by nearly 16% from a peak in late June. \n\nThe CAC 40 in Paris has dropped by about 17.5% over roughly the same period. Investors have been pulling their money out of global markets as worries have come to the fore about slow economic growth, spreading Ebola and continued uncertainty about the Federal Reserve. \n\nThis week, CNNMoney's tumbled"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/investing/abbvie-shire-merger/index.html",
			   "$55 billion pharma merger falls apart",
			   "$55 billion deal halted by tax dodge crackdown HONG KONG (CNNMoney) The board of American drug company AbbVie is walking away from its merger with U.K. rival Shire, making the $55 billion deal the first casualty of the Obama Administration's crackdown on companies seeking to lower their tax bills. \n\nAbbVie's board is recommending shareholders reject the merger because of changes in tax regulations, the company said in a statement. \n\n\"The agreed upon valuation is no longer supported as a result of the changes to the tax rules,\" AbbVie said. \"We did not believe it was in the best interests of our stockholders to proceed.\" \n\nThe announcement comes after AbbVie said it planned to reconsider its recommendation that shareholders adopt the merger with Shire. AbbVie stands to pay a $1.6 billion break-up free if the deal with Shire falls apart -- now a near certainty. \n\nShire shares plunged as much as 14% in early London trading Thursday. \n\nThe merger, announced in July, would have seen AbbVie "
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/investing/premarkets/index.html",
			   "Buckle up! It's going to be a rough morning",
			   "Don't sweat the market's dip LONDON (CNNMoney) Keep calm and carry on? Or is it time to freak out? \n\nHere are the five things you need to know before the opening bell rings in New York: 1. Market moves: are making a definite move lower and selling has resumed in . Some major indexes in Europe are declining by more than 3%. \n\nFutures indicate the S&P 500 could drop by about 1.5% at the open, after on Wednesday. Over the course of the previous trading session, the plummeted by 460 points before staging a late rally to end with a loss of \"only\" 173 points. The Nasdaq briefly fell into correction territory, indicating a 10% drop from a prior high, but rebounded sharply to finish the day barely in the red. The S&P 500 closed with a 0.8% decline. \n\nStocks have been very volatile over the past week and CNNMoney's shows investors are feeling extremely fearful. 3. Keep a watch on Apple: Investors will be monitoring Apple \n\n4. Pharma deal dies: U.S. drugmaker AbbVie 5. Earnings and economics: De"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/investing/premarkets/index.html?section=money_news_international",
			   "5 things to know before U.S. markets open",
			   "Click chart for in-depth premarket data. LONDON (CNNMoney) Keep calm and carry on? Or is it time to freak out? \n\nHere are the five things you need to know before the opening bell rings in New York: 1. Market moves: are making a definite move lower and selling has resumed in . Some major indexes in Europe are declining by more than 3%. \n\nFutures indicate the S&P 500 could drop by about 1.5% at the open, after on Wednesday. Over the course of the previous trading session, the plummeted by 460 points before staging a late rally to end with a loss of \"only\" 173 points. The Nasdaq briefly fell into correction territory, indicating a 10% drop from a prior high, but rebounded sharply to finish the day barely in the red. The S&P 500 closed with a 0.8% decline. \n\nStocks have been very volatile over the past week and CNNMoney's shows investors are feeling extremely fearful. 3. Keep a watch on Apple: Investors will be monitoring Apple \n\n4. Pharma deal dies: U.S. drugmaker AbbVie 5. Earnings and e"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/investing/premarkets/index.html",
			   "Hold on! Futures point to a rough open",
			   "Click chart for in-depth premarket data. LONDON (CNNMoney) Keep calm and carry on? Or is it time to freak out? \n\nHere are the five things you need to know before the opening bell rings in New York: 1. Market moves: are making a definite move lower and selling has resumed in . Some major indexes in Europe are declining by more than 3%. \n\nFutures indicate the S&P 500 could drop by about 1.5% at the open, after on Wednesday. Over the course of the previous trading session, the plummeted by 460 points before staging a late rally to end with a loss of \"only\" 173 points. The Nasdaq briefly fell into correction territory, indicating a 10% drop from a prior high, but rebounded sharply to finish the day barely in the red. The S&P 500 closed with a 0.8% decline. \n\nStocks have been very volatile over the past week and CNNMoney's shows investors are feeling extremely fearful. 3. Keep a watch on Apple: Investors will be monitoring Apple \n\n4. Pharma deal dies: U.S. drugmaker AbbVie 5. Earnings and e"
			  ],
			  [
			   "http://money.cnn.com/2014/10/14/investing/stocks-market-3-key-numbers-to-watch/index.html?hpt=hp_t4",
			   "Dow endures brutal slide",
			   "      Markets go for a wild ride       NEW YORK (CNNMoney)  It's another \"look out below\" day in the stock market.  \nThe Dow plunged as much as 460 points Wednesday afternoon before pulling back a bit, although a 173 point loss isn't anything to cheer. There wasn't an obvious trigger. Ebola and Europe's sour economy are clearly worrying. Earnings have been so-so, and retail sales data out this morning was disappointing. \n \nOctober has been a brutal month, erasing most of the 2014 stock market gains. The  Dow is negative for the year, and CNNMoney's Fear & Greed Index is showing extreme fear. \n \nMost investors are better off not obsessing about the day to day market moves. \n \nBut if you're keeping an eye on the numbers, here are three critical stats to watch. There is no \"magic number\" that triggers a sell-off, but these indicators would be big red flags. \n \n 1. We're near a correction, but not there yet  \n \nOnly a month ago, the S&P 500 index closed at an all-time high of 2,011. At its"
			  ],
			  [
			   "http://money.cnn.com/2014/10/15/investing/stock-market-winners-during-selloff/index.html",
			   "These stocks actually went up yesterday",
			   "Natural gas driller Cabot Oil and Gas was a bright spot in any otherwise gloomy market Wednesday. NEW YORK (CNNMoney) In the stock market's implosion Wednesday, there were a few survivors amidst the rubble. \n\nA handful of energy companies perked up, the winner among them Southwestern Energy Company \n\nWhat these companies have in common is a lot of U.S. natural gas exposure. \n\nThe major energy giants like Exxon Mobil \n\nPlus, natural gas stocks have taken their own beating this year, so its possible that energy investors are flocking to them in the hopes of snapping up a bargain. Another bright spot was the \"traditional\" retail sector, even though a report Wednesday from the Commerce Department said retail sales declined in September. Speaking of video games, Electronic Arts \n\nAnd investors seemed to like what they heard from Time Warner \n\nThe media conglomerate, which owns CNNMoney parent Turner Broadcasting as well as Warner Bros. and HBO, is in the midst of a reorganization after it r"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/investing/abbvie-shire-merger/index.html?section=money_news_international",
			   "AbbVie abandons $55 billion merger",
			   "$55 billion deal halted by tax dodge crackdown HONG KONG (CNNMoney) The board of American drug company AbbVie is walking away from its merger with U.K. rival Shire, making the $55 billion deal the first casualty of the Obama Administration's crackdown on companies seeking to lower their tax bills. \n\nAbbVie's board is recommending shareholders reject the merger because of changes in tax regulations, the company said in a statement. \n\n\"The agreed upon valuation is no longer supported as a result of the changes to the tax rules,\" AbbVie said. \"We did not believe it was in the best interests of our stockholders to proceed.\" \n\nThe announcement comes after AbbVie said it planned to reconsider its recommendation that shareholders adopt the merger with Shire. AbbVie stands to pay a $1.6 billion break-up free if the deal falls apart -- now a near certainty. \n\nThe merger, announced in July, would have seen AbbVie move its headquarters outside the U.S. in order to secure lower tax rates. Once the"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/investing/abbvie-shire-merger/index.html",
			   "AbbVie abandons $55 billion Shire merger",
			   "$55 billion deal halted by tax dodge crackdown HONG KONG (CNNMoney) The board of American drug company AbbVie is walking away from its merger with U.K. rival Shire, making the $55 billion deal the first casualty of the Obama Administration's crackdown on companies seeking to lower their tax bills. \n\nAbbVie's board is recommending shareholders reject the merger because of changes in tax regulations, the company said in a statement. \n\n\"The agreed upon valuation is no longer supported as a result of the changes to the tax rules,\" AbbVie said. \"We did not believe it was in the best interests of our stockholders to proceed.\" \n\nThe announcement comes after AbbVie said it planned to reconsider its recommendation that shareholders adopt the merger with Shire. AbbVie stands to pay a $1.6 billion break-up free if the deal falls apart -- now a near certainty. \n\nThe merger, announced in July, would have seen AbbVie move its headquarters outside the U.S. in order to secure lower tax rates. Once the"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/investing/abbvie-shire-merger/index.html",
			   "AbbVie board abandons $55 billion Shire merger",
			   "$55 billion deal halted by tax dodge crackdown HONG KONG (CNNMoney) The board of American drug company AbbVie is walking away from its merger with U.K. rival Shire, making the $55 billion deal the first casualty of the Obama Administration's crackdown on companies seeking to lower their tax bills. \n\nAbbVie's board is recommending shareholders reject the merger because of changes in tax regulations, the company said in a statement. \n\n\"The agreed upon valuation is no longer supported as a result of the changes to the tax rules,\" AbbVie said. \"We did not believe it was in the best interests of our stockholders to proceed.\" \n\nThe announcement comes after AbbVie said it planned to reconsider its recommendation that shareholders adopt the merger with Shire. AbbVie stands to pay a $1.6 billion break-up free if the deal falls apart -- now a near certainty. \n\nThe merger, announced in July, would have seen AbbVie move its headquarters outside the U.S. in order to secure lower tax rates. Once the"
			  ],
			  [
			   "http://money.cnn.com/2014/10/15/investing/stock-market-winners-during-selloff/index.html",
			   "These stocks actually went up",
			   "Natural gas driller Cabot Oil and Gas was a bright spot in any otherwise gloomy market Wednesday. NEW YORK (CNNMoney) In the stock market's implosion Wednesday, there were a few survivors amidst the rubble. \n\nA handful of energy companies perked up, the winner among them Southwestern Energy Company \n\nWhat these companies have in common is a lot of U.S. natural gas exposure. \n\nThe major energy giants like Exxon Mobil \n\nPlus, natural gas stocks have taken their own beating this year, so its possible that energy investors are flocking to them in the hopes of snapping up a bargain. Another bright spot was the \"traditional\" retail sector, even though a report Wednesday from the Commerce Department said retail sales declined in September. Speaking of video games, Electronic Arts \n\nAnd investors seemed to like what they heard from Time Warner \n\nThe media conglomerate, which owns CNNMoney parent Turner Broadcasting as well as Warner Bros. and HBO, is in the midst of a reorganization after it r"
			  ],
			  [
			   "http://money.cnn.com/2014/10/15/investing/stocks-markets-wall-street-correction/index.html?section=money_news_international",
			   "U.S. stocks rebound from scary plunge",
			   "NEW YORK (CNNMoney) Don't blink. Otherwise you're bound to miss a wild swing in this increasingly-violent stock market. \n\nIt was a memorable day on Wall Street as the Dow plummeted 460 points before staging a late rally to end down \"only\" 173 points. The Nasdaq briefly fell into correction territory, indicating a 10% drop from a prior high, but rebounded sharply to finish the day barely in the red. \n\n\"It was an emotion and panic-filled day both in and out of assets. You flushed out a lot of panicked longs and you're getting a knee-jerk bounce. What this means going forward, I don't know,\" said Peter Boockvar, chief market analyst at The Lindsey Group. \n\nLate-day heroics: The factors behind the early losses were obvious and plentiful: slow economic growth, and continued uncertainty about the Federal Reserve. The reasons for the rebound were less clear, though beaten-down stock prices appeared to entice buyers to step off the sidelines. \n\nJust look at the Nasdaq, which closed a whopping "
			  ],
			  [
			   "http://money.cnn.com/2014/10/15/investing/stock-market-winners-during-selloff/index.html",
			   "These stocks actually went up today",
			   "Natural gas driller Cabot Oil and Gas was a bright spot in any otherwise gloomy market Wednesday. NEW YORK (CNNMoney) In the stock market's implosion Wednesday, there were a few survivors amidst the rubble. \n\nA handful of energy companies perked up, the winner among them Southwestern Energy Company \n\nWhat these companies have in common is a lot of U.S. natural gas exposure. \n\nThe major energy giants like Exxon Mobil \n\nPlus, natural gas stocks have taken their own beating this year, so its possible that energy investors are flocking to them in the hopes of snapping up a bargain. Another bright spot was the \"traditional\" retail sector, even though a report Wednesday from the Commerce Department said retail sales declined in September. Speaking of video games, Electronic Arts \n\nAnd investors seemed to like what they heard from Time Warner \n\nThe media conglomerate, which owns CNNMoney parent Turner Broadcasting as well as Warner Bros. and HBO, is in the midst of a reorganization after it r"
			  ],
			  [
			   "http://money.cnn.com/2014/10/15/investing/stocks-plunge-not-like-2008/index.html",
			   "Stocks are plunging. But please don't panic",
			   "Markets go for a wild ride NEW YORK (CNNMoney) I'm going to come right out and say it. This market sell-off is ugly. It's not fun. It's scary. \n\nBut now it's time to take a deep breath and relax. (And not look at your 401(k) balance.) \n\nWe've been through this before. It's not the end of the world. It may not even be the end of the bull market that's been going on for more than five-and-a-half years. \n\n2008 was ten times scarier than this. A lot of people are going to be quick to say that the market turmoil of this September and October is similar to what happened in those two months of 2008. \n\nThat's BS. Really. What's going on now is not even close! It's really funny how short people's memories are. I'm not talking about ancient history. In the fall of 2008, stocks were already well below their all-time highs. The financial market was collapsing. That's not hyperbole. Lehman Brothers went under. Washington Mutual failed. AIG A has you running for the hills? Please. \n\nIn the autumn of"
			  ],
			  [
			   "http://money.cnn.com/2014/10/15/investing/stocks-markets-wall-street-correction/index.html",
			   "Market 'freak out': Bad, but not gruesome",
			   "NEW YORK (CNNMoney) Don't blink. Otherwise you're bound to miss a wild swing in this increasingly-violent stock market. \n\nIt was a memorable day on Wall Street as the Dow plummeted 460 points before staging a late rally to end down \"only\" 173 points. The Nasdaq briefly fell into correction territory, indicating a 10% drop from a prior high, but rebounded sharply to finish the day barely in the red. \n\n\"It was an emotion and panic-filled day both in and out of assets. You flushed out a lot of panicked longs and you're getting a knee-jerk bounce. What this means going forward, I don't know,\" said Peter Boockvar, chief market analyst at The Lindsey Group. \n\nLate-day heroics: The factors behind the early losses were obvious and plentiful: slow economic growth, and continued uncertainty about the Federal Reserve. The reasons for the rebound were less clear, though beaten-down stock prices appeared to entice buyers to step off the sidelines. \n\nJust look at the Nasdaq, which closed a whopping "
			  ],
			  [
			   "http://money.cnn.com/2014/10/15/investing/stocks-markets-wall-street-correction/index.html?iid=TL_Popular",
			   "Market 'freak out': Dow plunges 460 before rebounding",
			   "NEW YORK (CNNMoney) Don't blink. Otherwise you're bound to miss a wild swing in this increasingly-violent stock market. \n\nIt was a memorable day on Wall Street as the Dow plummeted 460 points before staging a late rally to end down \"only\" 173 points. The Nasdaq briefly fell into correction territory, indicating a 10% drop from a prior high, but rebounded sharply to finish the day barely in the red. \n\n\"It was an emotion and panic-filled day both in and out of assets. You flushed out a lot of panicked longs and you're getting a knee-jerk bounce. What this means going forward, I don't know,\" said Peter Boockvar, chief market analyst at The Lindsey Group. \n\nLate-day heroics: The factors behind the early losses were obvious and plentiful: slow economic growth, and continued uncertainty about the Federal Reserve. The reasons for the rebound were less clear, though beaten-down stock prices appeared to entice buyers to step off the sidelines. \n\nJust look at the Nasdaq, which closed a whopping "
			  ],
			  [
			   "http://money.cnn.com/2014/10/15/investing/stocks-markets-wall-street-correction/index.html",
			   "Market 'freak out': Stocks rebound from scary plunge",
			   "NEW YORK (CNNMoney) Don't blink. Otherwise you're bound to miss a wild swing in this increasingly-violent stock market. \n\nIt was a memorable day on Wall Street as the Dow plummeted 460 points before staging a late rally to end down \"only\" 173 points. The Nasdaq briefly fell into correction territory, indicating a 10% drop from a prior high, but rebounded sharply to finish the day barely in the red. \n\n\"It was an emotion and panic-filled day both in and out of assets. You flushed out a lot of panicked longs and you're getting a knee-jerk bounce. What this means going forward, I don't know,\" said Peter Boockvar, chief market analyst at The Lindsey Group. \n\nLate-day heroics: The factors behind the early losses were obvious and plentiful: slow economic growth, and continued uncertainty about the Federal Reserve. The reasons for the rebound were less clear, though beaten-down stock prices appeared to entice buyers to step off the sidelines. \n\nJust look at the Nasdaq, which closed a whopping "
			  ],
			  [
			   "http://money.cnn.com/2014/10/15/investing/stocks-plunge-not-like-2008/index.html",
			   "This is not another financial crisis",
			   "Markets go for a wild ride NEW YORK (CNNMoney) I'm going to come right out and say it. This market sell-off is ugly. It's not fun. It's scary. \n\nBut now it's time to take a deep breath and relax. (And not look at your 401(k) balance.) \n\nWe've been through this before. It's not the end of the world. It may not even be the end of the bull market that's been going on for more than five-and-a-half years. \n\n2008 was ten times scarier than this. A lot of people are going to be quick to say that the market turmoil of this September and October is similar to what happened in those two months of 2008. \n\nThat's BS. Really. What's going on now is not even close! It's really funny how short people's memories are. I'm not talking about ancient history. In the fall of 2008, stocks were already well below their all-time highs. The financial market was collapsing. That's not hyperbole. Lehman Brothers went under. Washington Mutual failed. AIG A has you running for the hills? Please. \n\nIn the autumn of"
			  ],
			  [
			   "http://money.cnn.com/2014/10/15/investing/stocks-markets-wall-street-correction/index.html?section=money_news_international",
			   "Fear grips the stock market",
			   "NEW YORK (CNNMoney) It's been a scary month on Wall Street, but Wednesday is the most hair-raising day yet. \n\nThe Dow plummeted as much as 460 points -- its deepest tumble in more than three years. The Nasdaq fell so far that it actually dipped into \"correction\" territory at one point. That's Wall Street jargon for a 10% drop from a previous high. \n\nStocks have bounced off their worst levels but remain deeply in the red. It got so ugly Wednesday that all of the stock market gains for 2014 have now been erased. Even the S&P 500 and the Nasdaq are close to zero or negative now. \n\nWhat's driving this freak out? Investors have been spooked by gloomy economic numbers, , plummeting energy prices and continuing concerns about Federal Reserve policies. \n\n\"We have a really toxic cocktail of negatives\" that are \"conspiring to put pressure on the markets,\" said Art Hogan, chief market strategist at Wunderlich Securities. \n\nFear continues to grip the stock market. This week has tumbled to zero, in"
			  ]
			 ]
			}
			,justice: {
			 "name": "justice",
			 "expectedCat": "law",
			 "visits": [
			  [
			   "http://www.cnn.com/2014/10/22/justice/indiana-possible-serial-killer-victims/index.html",
			   "The victims: A mother, daughter, sister",
			   "(CNN) -- Who are the seven women who police say one Indiana man has confessed to killing?\n\n\"They're not forgotten, because they're not nobodies. They're somebody,\" said Lori Townsend, whose 19-year-old daughter Afrikka Hardy was found strangled at a Motel 6 in Hammond, Indiana, over the weekend.\n\n\"They're somebody's daughter,\" she told CNN affiliate WLS, \"somebody's mother, somebody's sister.\"\n\nHere's what we know so far about the suspected serial killer's victims:\n\nAfrikka Hardy\n\n\"She could walk into a room and just light it up with her smile and her laugh and just her presence,\" Townsend told CNN's Don Lemon.\n\n\"Afrikka never met a stranger. She loved everybody. And that was kind of part of her problem. She was a little naive on trusting people.\"\n\nHardy, 19, had recently moved back to Chicago after graduating from high school and living for five years with her mother in Aurora, Colorado.\n\nAuthorities say suspect Darren Deon Vann hired a prostitute through the backpage.com site serving"
			  ],
			  [
			   "http://us.cnn.com/2014/10/22/justice/indiana-possible-serial-killer-victims/index.html?hpt=hp_c3",
			   "The victims: Mother, daughter, sister",
			   "(CNN) -- Who are the seven women who police say one Indiana man has confessed to killing?\n\n\"They're not forgotten, because they're not nobodies. They're somebody,\" said Lori Townsend, whose 19-year-old daughter Afrikka Hardy was found strangled at a Motel 6 in Hammond, Indiana, over the weekend.\n\n\"They're somebody's daughter,\" she told CNN affiliate WLS, \"somebody's mother, somebody's sister.\"\n\nHere's what we know so far about the suspected serial killer's victims:\n\nAfrikka Hardy\n\n\"She could walk into a room and just light it up with her smile and her laugh and just her presence,\" Townsend told CNN's Don Lemon.\n\n\"Afrikka never met a stranger. She loved everybody. And that was kind of part of her problem. She was a little naive on trusting people.\"\n\nHardy, 19, had recently moved back to Chicago after graduating from high school and living for five years with her mother in Aurora, Colorado.\n\nAuthorities say suspect Darren Deon Vann hired a prostitute through the backpage.com site serving"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/justice/indiana-possible-serial-killer-victims/index.html",
			   "7 women are victims of possible Indiana serial killer",
			   "(CNN) -- Who are the seven women who police say one Indiana man has confessed to killing?\n\n\"They're not forgotten, because they're not nobodies. They're somebody,\" said Lori Townsend, whose 19-year-old daughter Afrikka Hardy was found strangled at a Motel 6 in Hammond, Indiana, over the weekend.\n\n\"They're somebody's daughter,\" she told CNN affiliate WLS, \"somebody's mother, somebody's sister.\"\n\nHere's what we know so far about the suspected serial killer's victims:\n\nAfrikka Hardy\n\n\"She could walk into a room and just light it up with her smile and her laugh and just her presence,\" Townsend told CNN's Don Lemon.\n\n\"Afrikka never met a stranger. She loved everybody. And that was kind of part of her problem. She was a little naive on trusting people.\"\n\nHardy, 19, had recently moved back to Chicago after graduating from high school and living for five years with her mother in Aurora, Colorado.\n\nAuthorities say suspect Darren Deon Vann hired a prostitute through the backpage.com site serving"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/justice/blackwater-iraq-guilty-verdicts/index.html",
			   "Guards found guilty in Iraq killings",
			   "(CNN) -- After marathon deliberations, a federal jury found four ex-Blackwater Worldwide contractors guilty Wednesday in a deadly 2007 mass shooting in Baghdad's Nusoor Square.\n\nNicholas Slatten, 30, of Sparta, Tennessee, the team's sniper, was found guilty of first-degree murder while armed in the slaying of the driver of a white Kia sedan in the Baghdad traffic circle. Prosecutors said Slatten kicked off the incident when he opened fire.\n\nThe other verdicts:\n\n-- Paul Slough, 35, of Keller, Texas, was found guilty of 13 counts of voluntary manslaughter, 17 counts of attempted manslaughter and one firearms offense;\n\n-- Evan Liberty, 32, of Rochester, New Hampshire, was found guilty of eight counts of voluntary manslaughter, 12 counts of attempted manslaughter and one firearms offense;\n\n-- Dustin Heard, 33, of Maryville, Tennessee, was found guilty of six counts of voluntary manslaughter, 11 counts of attempted manslaughter and one firearms offense.\n\n\"This verdict is a resounding affirm"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/22/justice/blackwater-iraq-guilty-verdicts/index.html?eref=edition",
			   "Verdicts in Blackwater massacre",
			   "(CNN) -- After marathon deliberations, a federal jury found four ex-Blackwater Worldwide contractors guilty Wednesday in a deadly 2007 mass shooting in Baghdad's Nusoor Square.\n\nNicholas Slatten, 30, of Sparta, Tennessee, the team's sniper, was found guilty of first-degree murder while armed in the slaying of the driver of a white Kia sedan in the Baghdad traffic circle. Prosecutors said Slatten kicked off the incident when he opened fire.\n\nThe other verdicts:\n\n-- Paul Slough, 35, of Keller, Texas, was found guilty of 13 counts of voluntary manslaughter, 17 counts of attempted manslaughter and one firearms offense;\n\n-- Evan Liberty, 32, of Rochester, New Hampshire, was found guilty of eight counts of voluntary manslaughter, 12 counts of attempted manslaughter and one firearms offense;\n\n-- Dustin Heard, 33, of Maryville, Tennessee, was found guilty of six counts of voluntary manslaughter, 11 counts of attempted manslaughter and one firearms offense.\n\n\"This verdict is a resounding affirm"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/justice/blackwater-iraq-guilty-verdicts/index.html",
			   "4 ex-Blackwater guards guilty in Nusoor Square shooting",
			   "(CNN) -- After marathon deliberations, a federal jury found four ex-Blackwater Worldwide contractors guilty Wednesday in a deadly 2007 mass shooting in Baghdad's Nusoor Square.\n\nNicholas Slatten, 30, of Sparta, Tennessee, the team's sniper, was found guilty of first-degree murder while armed in the slaying of the driver of a white Kia sedan in the Baghdad traffic circle. Prosecutors said Slatten kicked off the incident when he opened fire.\n\nThe other verdicts:\n\n-- Paul Slough, 35, of Keller, Texas, was found guilty of 13 counts of voluntary manslaughter, 17 counts of attempted manslaughter and one firearms offense;\n\n-- Evan Liberty, 32, of Rochester, New Hampshire, was found guilty of eight counts of voluntary manslaughter, 12 counts of attempted manslaughter and one firearms offense;\n\n-- Dustin Heard, 33, of Maryville, Tennessee, was found guilty of six counts of voluntary manslaughter, 11 counts of attempted manslaughter and one firearms offense.\n\n\"This verdict is a resounding affirm"
			  ],
			  [
			   "http://us.cnn.com/2014/10/22/justice/indiana-possible-serial-killer-victims/index.html?hpt=hp_c2",
			   "Somebody's mother, daughter, sister",
			   "(CNN) -- Who are the seven women who police say one Indiana man has confessed to killing?\n\n\"They're not forgotten, because they're not nobodies. They're somebody,\" said Lori Townsend, whose 19-year-old daughter Afrikka Hardy was found strangled to death at a Motel 6 in Hammond, Indiana, over the weekend.\n\n\"They're somebody's daughter,\" she told CNN affiliate WLS, \"somebody's mother, somebody's sister.\"\n\nHere's what we know so far about the suspected serial killer's victims:\n\nAfrikka Hardy\n\n\"She could walk into a room and just light it up with her smile and her laugh and just her presence,\" Townsend told CNN's Don Lemon.\n\n\"Afrikka never met a stranger. She loved everybody. And that was kind of part of her problem. She was a little naive on trusting people.\"\n\nHardy, 19, had recently moved back to Chicago after graduating from high school and living for five years with her mother in Aurora, Colorado.\n\nAuthorities say suspect Darren Deon Vann hired a prostitute through the backpage.com sit"
			  ],
			  [
			   "http://us.cnn.com/2014/10/22/justice/indiana-possible-serial-killer-victims/index.html?hpt=hp_inthenews",
			   "Indiana victims",
			   "(CNN) -- Who are the seven women who police say one Indiana man has confessed to killing?\n\n\"They're not forgotten, because they're not nobodies. They're somebody,\" said Lori Townsend, whose 19-year-old daughter Afrikka Hardy was found strangled to death at a Motel 6 in Hammond, Indiana, over the weekend.\n\n\"They're somebody's daughter,\" she told CNN affiliate WLS, \"somebody's mother, somebody's sister.\"\n\nHere's what we know so far about the suspected serial killer's victims:\n\nAfrikka Hardy\n\n\"She could walk into a room and just light it up with her smile and her laugh and just her presence,\" Townsend told CNN's Don Lemon.\n\n\"Afrikka never met a stranger. She loved everybody. And that was kind of part of her problem. She was a little naive on trusting people.\"\n\nHardy, 19, had recently moved back to Chicago after graduating from high school and living for five years with her mother in Aurora, Colorado.\n\nAuthorities say suspect Darren Deon Vann hired a prostitute through the backpage.com sit"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/justice/indiana-possible-serial-killer-victims/index.html",
			   "Possible serial killer's victims: 'Somebody's daughter'",
			   "(CNN) -- Who are the seven women who police say one Indiana man has confessed to killing?\n\n\"They're not forgotten, because they're not nobodies. They're somebody,\" said Lori Townsend, whose 19-year-old daughter Afrikka Hardy was found strangled to death at a Motel 6 in Hammond, Indiana, over the weekend.\n\n\"They're somebody's daughter,\" she told CNN affiliate WLS, \"somebody's mother, somebody's sister.\"\n\nHere's what we know so far about the suspected serial killer's victims:\n\nAfrikka Hardy\n\n\"She could walk into a room and just light it up with her smile and her laugh and just her presence,\" Townsend told CNN's Don Lemon.\n\n\"Afrikka never met a stranger. She loved everybody. And that was kind of part of her problem. She was a little naive on trusting people.\"\n\nHardy, 19, had recently moved back to Chicago after graduating from high school and living for five years with her mother in Aurora, Colorado.\n\nAuthorities say suspect Darren Deon Vann hired a prostitute through the backpage.com sit"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/justice/indiana-possible-serial-killer-victims/index.html",
			   "Killer's victims: 'Somebody's daughter'",
			   "(CNN) -- Who are the seven women who police say one Indiana man has confessed to killing?\n\n\"They're not forgotten, because they're not nobodies. They're somebody,\" said Lori Townsend, whose 19-year-old daughter Afrikka Hardy was found strangled to death at a Motel 6 in Hammond, Indiana, over the weekend.\n\n\"They're somebody's daughter,\" she told CNN affiliate WLS, \"somebody's mother, somebody's sister.\"\n\nHere's what we know so far about the suspected serial killer's victims:\n\nAfrikka Hardy\n\n\"She could walk into a room and just light it up with her smile and her laugh and just her presence,\" Townsend told CNN's Don Lemon.\n\n\"Afrikka never met a stranger. She loved everybody. And that was kind of part of her problem. She was a little naive on trusting people.\"\n\nHardy, 19, had recently moved back to Chicago after graduating from high school and living for five years with her mother in Aurora, Colorado.\n\nAuthorities say suspect Darren Deon Vann hired a prostitute through the backpage.com sit"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/justice/ferguson-michael-brown-autopsy/index.html",
			   "Report: Autopsy shows Michael Brown was shot at close range",
			   "(CNN) -- Michael Brown's gunshot wounds included a shot in the hand at close range, his official autopsy shows, according to an analysis reported by the St. Louis Post-Dispatch.\n\nThe detail could lend credence to Ferguson police officer Darren Wilson's account that he and the unarmed black teenager scuffled at his patrol car before Brown was shot and killed.\n\nWilson told investigators that in a struggle for his pistol inside a police SUV, Brown pressed the barrel of Wilson's gun against the officer's hip, the Post-Dispatch reported, citing a source with knowledge of his statements.\n\nThe officer tried to prevent Brown from reaching the trigger, the source told the newspaper, and when he thought he had control he fired. But Brown's hand was blocking the mechanism, the Post-Dispatch reported.\n\nWilson said he fired two shots, and Brown was hit in the hand and ran. He told investigators that he fired again when Brown turned back and charged at him, according to the paper.\n\nEarlier, a privat"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/justice/white-house-trespass-case/index.html",
			   "Accused White House fence jumper to get mental health screening",
			   "Washington (CNN) -- A federal judge on Tuesday ordered a full mental competency screening for Omar Gonzalez, who is accused of jumping the White House fence, after a disputed initial examination found him not competent for trial.\n\nU.S. District Court Judge Rosemary Collyer expressed concern that the initial mental exam, ordered by a magistrate judge, was done before she had a chance to hear a legal motion by the defense disputing whether the magistrate had the authority to order it. David Bos, the federal public defender representing Gonzalez, objected to any examination in the first place because he says Gonzalez is fit for trial.\n\nThe 60-minute initial mental examination of Gonzalez at the District of Columbia jail came as a surprise to the judge and to both the government and defense. But the result, finding Gonzalez not competent, can't be ignored, Collyer said in court Tuesday.\n\nBos told the judge: \"There is no doubt in my mind that Mr. Gonzalez is competent to stand trial.\" Nonet"
			  ],
			  [
			   "http://us.cnn.com/2014/10/22/justice/ferguson-michael-brown-autopsy/index.html?hpt=hp_t2",
			   "Report: Brown shot at close range",
			   "(CNN) -- Michael Brown's gunshot wounds included a shot in the hand at close range, his official autopsy shows, according to an analysis reported by the St. Louis Post-Dispatch.\n\nThe detail could lend credence to Ferguson police officer Darren Wilson's account that he and the unarmed black teenager scuffled at his patrol car before Brown was shot and killed.\n\nWilson told investigators that in a struggle for his pistol inside a police SUV, Brown pressed the barrel of Wilson's gun against the officer's hip, the Post-Dispatch reported, citing a source with knowledge of his statements.\n\nThe officer tried to prevent Brown from reaching the trigger, the source told the newspaper, and when he thought he had control he fired. But Brown's hand was blocking the mechanism, the Post-Dispatch reported.\n\nWilson said he fired two shots, and Brown was hit in the hand and ran. He told investigators that he fired again when Brown turned back and charged at him, according to the paper.\n\nEarlier, a privat"
			  ],
			  [
			   "http://us.cnn.com/2014/10/22/justice/ferguson-michael-brown-autopsy/index.html?hpt=hp_t2",
			   "Report: Michael Brown shot in hand",
			   "(CNN) -- Michael Brown's gunshot wounds included a shot in the hand at close range, his official autopsy shows, according to an analysis reported by the St. Louis Post-Dispatch.\n\nThe detail could lend credence to Ferguson police officer Darren Wilson's account that he and the unarmed black teenager scuffled at his patrol car before Brown was shot and killed.\n\nWilson told investigators that in a struggle for his pistol inside a police SUV, Brown pressed the barrel of Wilson's gun against the officer's hip, the Post-Dispatch reported, citing a source with knowledge of his statements.\n\nThe officer tried to prevent Brown from reaching the trigger, the source told the newspaper, and when he thought he had control he fired. But Brown's hand was blocking the mechanism, the Post-Dispatch reported.\n\nWilson said he fired two shots, and Brown was hit in the hand and ran. He told investigators that he fired again when Brown turned back and charged at him, according to the paper.\n\nEarlier, a privat"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/justice/ferguson-michael-brown-autopsy/index.html",
			   "Report: Autopsy shows Brown in hand",
			   "(CNN) -- Michael Brown's gunshot wounds included a shot in the hand at close range, his official autopsy shows, according to an analysis reported by the St. Louis Post-Dispatch.\n\nThe detail could lend credence to Ferguson police officer Darren Wilson's account that he and the unarmed black teenager scuffled at his patrol car before Brown was shot and killed.\n\nWilson told investigators that in a struggle for his pistol inside a police SUV, Brown pressed the barrel of Wilson's gun against the officer's hip, the Post-Dispatch reported, citing a source with knowledge of his statements.\n\nThe officer tried to prevent Brown from reaching the trigger, the source told the newspaper, and when he thought he had control he fired. But Brown's hand was blocking the mechanism, the Post-Dispatch reported.\n\nWilson said he fired two shots, and Brown was hit in the hand and ran. He told investigators that he fired again when Brown turned back and charged at him, according to the paper.\n\nEarlier, a privat"
			  ],
			  [
			   "http://us.cnn.com/2014/10/22/justice/ferguson-michael-brown-autopsy/index.html?hpt=hp_t2",
			   "Report: Autopsy shows Michael Brown was shot in hand at close range",
			   "(CNN) -- Michael Brown's gunshot wounds included a shot in the hand at close range, his official autopsy shows, according to an analysis reported by the St. Louis Post-Dispatch.\n\nThe detail could lend credence to Ferguson police officer Darren Wilson's account that he and the unarmed black teenager scuffled at his patrol car before Brown was shot and killed.\n\nWilson told investigators that in a struggle for his pistol inside a police SUV, Brown pressed the barrel of Wilson's gun against the officer's hip, the Post-Dispatch reported, citing a source with knowledge of his statements.\n\nThe officer tried to prevent Brown from reaching the trigger, the source told the newspaper, and when he thought he had control he fired. But Brown's hand was blocking the mechanism, the Post-Dispatch reported.\n\nWilson said he fired two shots, and Brown was hit in the hand and ran. He told investigators that he fired again when Brown turned back and charged at him, according to the paper.\n\nEarlier, a privat"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/22/justice/ferguson-michael-brown-autopsy/index.html?eref=edition",
			   "Details of Ferguson autopsy reported",
			   "(CNN) -- Michael Brown's gunshot wounds included a shot in the hand at close range, his official autopsy shows, according to an analysis reported by the St. Louis Post-Dispatch.\n\nThe detail could lend credence to Ferguson police officer Darren Wilson's account that he and the unarmed black teenager scuffled at his patrol car before Brown was shot and killed.\n\nWilson told investigators that in a struggle for his pistol inside a police SUV, Brown pressed the barrel of Wilson's gun against the officer's hip, the Post-Dispatch reported, citing a source with knowledge of his statements.\n\nThe officer tried to prevent Brown from reaching the trigger, the source told the newspaper, and when he thought he had control he fired. But Brown's hand was blocking the mechanism, the Post-Dispatch reported.\n\nWilson said he fired two shots, and Brown was hit in the hand and ran. He told investigators that he fired again when Brown turned back and charged at him, according to the paper.\n\nEarlier, a privat"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/justice/ferguson-michael-brown-autopsy/index.html",
			   "Report: Autopsy shows Michael Brown shot at close range",
			   "(CNN) -- Michael Brown's gunshot wounds included a shot in the hand at close range, his official autopsy shows, according to an analysis reported by the St. Louis Post-Dispatch.\n\nThe detail could lend credence to Ferguson police officer Darren Wilson's account that he and the unarmed black teenager scuffled at his patrol car before Brown was shot and killed.\n\nWilson told investigators that in a struggle for his pistol inside a police SUV, Brown pressed the barrel of Wilson's gun against the officer's hip, the Post-Dispatch reported, citing a source with knowledge of his statements.\n\nThe officer tried to prevent Brown from reaching the trigger, the source told the newspaper, and when he thought he had control he fired. But Brown's hand was blocking the mechanism, the Post-Dispatch reported.\n\nWilson said he fired two shots, and Brown was hit in the hand and ran. He told investigators that he fired again when Brown turned back and charged at him, according to the paper.\n\nEarlier, a privat"
			  ],
			  [
			   "http://us.cnn.com/2014/10/22/justice/indiana-possible-serial-killer-victims/index.html?hpt=hp_t1",
			   "Mom: Victims of suspected serial killer not forgotten",
			   "(CNN) -- Who are the seven women who police say one Indiana man has confessed to killing?\n\n\"They're not forgotten, because they're not nobodies. They're somebody,\" said Lori Townsend, whose 19-year-old daughter Afrikka Hardy was found strangled to death at a Motel 6 in Hammond, Indiana, over the weekend.\n\n\"They're somebody's daughter,\" she told CNN affiliate WLS, \"somebody's mother, somebody's sister.\"\n\nHere's what we know so far about the suspected serial killer's victims:\n\nAfrikka Hardy\n\nIn Facebook posts, Townsend described her daughter as a princess and posted a YouTube video of her belting out a ballad.\n\n\"I love my baby,\" she wrote, \"and I miss her like crazy.\"\n\nThe 19-year-old had recently moved back to Indiana after graduating from high school and living for five years with her mother in Aurora, Colorado.\n\n\"She was my rock. She was my best friend. She was my everything,\" Townsend told CNN affiliate KDVR. \"When I didn't have anything, she was all I had.\"\n\nAuthorities say suspect "
			  ],
			  [
			   "http://us.cnn.com/2014/10/22/justice/indiana-possible-serial-killer-victims/index.html?hpt=hp_t1",
			   "'She was my everything'",
			   "(CNN) -- Who are the seven women who police say one Indiana man has confessed to killing?\n\n\"They're not forgotten, because they're not nobodies. They're somebody,\" said Lori Townsend, whose 19-year-old daughter Afrikka Hardy was found strangled to death at a Motel 6 in Hammond, Indiana, over the weekend.\n\n\"They're somebody's daughter,\" she told CNN affiliate WLS, \"somebody's mother, somebody's sister.\"\n\nHere's what we know so far about the suspected serial killer's victims:\n\nAfrikka Hardy\n\nIn Facebook posts, Townsend described her daughter as a princess and posted a YouTube video of her belting out a ballad.\n\n\"I love my baby,\" she wrote, \"and I miss her like crazy.\"\n\nThe 19-year-old had recently moved back to Indiana after graduating from high school and living for five years with her mother in Aurora, Colorado.\n\n\"She was my rock. She was my best friend. She was my everything,\" Townsend told CNN affiliate KDVR. \"When I didn't have anything, she was all I had.\"\n\nAuthorities say suspect "
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/justice/indiana-possible-serial-killer-victims/index.html",
			   "Police: Indiana man confessed to killing 7 women",
			   "(CNN) -- Who are the seven women who police say one Indiana man has confessed to killing?\n\n\"They're not forgotten, because they're not nobodies. They're somebody,\" said Lori Townsend, whose 19-year-old daughter Afrikka Hardy was found strangled to death at a Motel 6 in Hammond, Indiana, over the weekend.\n\n\"They're somebody's daughter,\" she told CNN affiliate WLS, \"somebody's mother, somebody's sister.\"\n\nHere's what we know so far about the suspected serial killer's victims:\n\nAfrikka Hardy\n\nIn Facebook posts, Townsend described her daughter as a princess and posted a YouTube video of her belting out a ballad.\n\n\"I love my baby,\" she wrote, \"and I miss her like crazy.\"\n\nThe 19-year-old had recently moved back to Indiana after graduating from high school and living for five years with her mother in Aurora, Colorado.\n\n\"She was my rock. She was my best friend. She was my everything,\" Townsend told CNN affiliate KDVR. \"When I didn't have anything, she was all I had.\"\n\nAuthorities say suspect "
			  ],
			  [
			   "http://us.cnn.com/2014/10/22/justice/indiana-possible-serial-killer-victims/index.html?hpt=hp_t1",
			   "'They're somebody's daughter'",
			   "(CNN) -- Who are the seven women who police say one Indiana man has confessed to killing?\n\n\"They're not forgotten, because they're not nobodies. They're somebody,\" said Lori Townsend, whose 19-year-old daughter Afrikka Hardy was found strangled to death at a Motel 6 in Hammond, Indiana, over the weekend.\n\n\"They're somebody's daughter,\" she told CNN affiliate WLS, \"somebody's mother, somebody's sister.\"\n\nHere's what we know so far about the suspected serial killer's victims:\n\nAfrikka Hardy\n\nIn Facebook posts, Townsend described her daughter as a princess and posted a YouTube video of her belting out a ballad.\n\n\"I love my baby,\" she wrote, \"and I miss her like crazy.\"\n\nThe 19-year-old had recently moved back to Indiana after graduating from high school and living for five years with her mother in Aurora, Colorado.\n\n\"She was my rock. She was my best friend. She was my everything,\" Townsend told CNN affiliate KDVR. \"When I didn't have anything, she was all I had.\"\n\nAuthorities say suspect "
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/justice/indiana-possible-serial-killer-victims/index.html",
			   "7 women victims of possible serial killer in Indiana",
			   "(CNN) -- Who are the seven women who police say one Indiana man has confessed to killing?\n\n\"They're not forgotten, because they're not nobodies. They're somebody,\" said Lori Townsend, whose 19-year-old daughter Afrikka Hardy was found strangled to death at a Motel 6 in Hammond, Indiana, over the weekend.\n\n\"They're somebody's daughter,\" she told CNN affiliate WLS, \"somebody's mother, somebody's sister.\"\n\nHere's what we know so far about the suspected serial killer's victims:\n\nAfrikka Hardy\n\nIn Facebook posts, Townsend described her daughter as a princess and posted a YouTube video of her belting out a ballad.\n\n\"I love my baby,\" she wrote, \"and I miss her like crazy.\"\n\nThe 19-year-old had recently moved back to Indiana after graduating from high school and living for five years with her mother in Aurora, Colorado.\n\n\"She was my rock. She was my best friend. She was my everything,\" Townsend told CNN affiliate KDVR. \"When I didn't have anything, she was all I had.\"\n\nAuthorities say suspect "
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/justice/jodi-arias-retrial/index.html",
			   "Retrial begins on life or death sentence for Arias",
			   "(CNN) -- Jodi Arias and her legal team began fighting for her life Tuesday when a new jury heard opening arguments on whether she should receive a life or death sentence for her murder conviction.\n\nIt's been a long legal journey for Arias, 34, whom a jury found guilty last year of first-degree murder in the gruesome killing of ex-boyfriend Travis Alexander, 30.\n\nThis week's court proceeding in Arizona is a retrial of the penalty phase. In 2013, the same jury that convicted her became deadlocked later on whether she should be executed for the 2008 murder of Alexander, who was stabbed 29 times, shot in the face and had his neck slit from ear to ear.\n\nThe impasse came when the jury voted 8-4 in favor of the death penalty for Arias, a source with knowledge of the jury's vote said at the time.\n\n\"The tale of this relationship is one of infinite sadness,\" Arias's lawyer, Kirk Nurmi, told the jury onTuesday. \"The story of this relationship is one of tragedy, friendship, spirituality, lust, pas"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/justice/white-house-trespass-case/index.html",
			   "Accused White House intruder's mental health questioned",
			   "Washington (CNN) -- A federal judge on Tuesday ordered a full mental competency screening for Omar Gonzalez, who is accused of jumping the White House fence, after a disputed initial examination found him not competent for trial.\n\nU.S. District Court Judge Rosemary Collyer expressed concern that the initial mental exam, ordered by a magistrate judge, was done before she had a chance to hear a legal motion by the defense disputing whether the magistrate had the authority to order it. David Bos, the federal public defender representing Gonzalez, objected to any examination in the first place because he says Gonzalez is fit for trial.\n\nThe 60-minute initial mental examination of Gonzalez at the District of Columbia jail came as a surprise to the judge and to both the government and defense. But the result, finding Gonzalez not competent, can't be ignored, Collyer said in court Tuesday.\n\nBos told the judge: \"There is no doubt in my mind that Mr. Gonzalez is competent to stand trial.\" Nonet"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/politics/2014/10/21/lead-justice-florida-debate-preview.cnn",
			   "CNN Florida governor debate: What to watch",
			   "__"
			  ],
			  [
			   "http://us.cnn.com/2014/10/21/justice/ferguson-protests/index.html?hpt=hp_t1",
			   "70 days of protests",
			   "Ferguson, Missouri (CNN) -- This is the new normal in Ferguson: Protests, day and night, for more than 70 days now.\n\nSometimes it's hundreds of demonstrators, sometimes just a handful. But they're always outside the Ferguson Police Department, clamoring for the indictment of Officer Darren Wilson in the shooting death of unarmed teenager Michael Brown.\n\nAnd with new details about the investigation leaked, tensions are escalating.\n\nOn Monday night, St. Louis County police detained two protesters, including Missouri State Sen. Jamilah Nasheed. She was detained as she blocked traffic in the middle of the street while protesting outside the Police Department.\n\nNow, there are fears about what could happen next. One protester put it succinctly:\n\n\"If there is not an indictment, excuse my French, all hell is going to break loose.\"\n\nComplete coverage of what's happening in Ferguson\n\nGovernor launches initiative\n\nSaying that \"our streets cannot be battlefields,\" Missouri Gov. Jay Nixon launched "
			  ],
			  [
			   "http://us.cnn.com/2014/10/21/justice/ferguson-protests/index.html?hpt=hp_t1",
			   "Protests are new normal in Ferguson",
			   "Michael Brown Sr. yells out as the casket holding the body of his son, Michael Brown, is lowered into the ground during the funeral service in St. Louis on Monday, August 25. Brown, 18, was shot and killed by police officer Darren Wilson on August 9. His death sparked protests in Ferguson, Missouri, and a national debate about race and police actions."
			  ],
			  [
			   "http://us.cnn.com/2014/10/21/justice/ferguson-protests/index.html?hpt=hp_t2",
			   "70 days of protests in Ferguson",
			   "Ferguson, Missouri (CNN) -- This is the new normal in Ferguson: Protests, day and night, for more than 70 days now.\n\nSometimes it's hundreds of demonstrators, sometimes just a handful. But they're always outside the Ferguson Police Department, clamoring for the indictment of Officer Darren Wilson in the shooting death of unarmed teenager Michael Brown.\n\nAnd with new details about the investigation leaked, tensions are escalating.\n\nOn Monday night, St. Louis County police detained two protesters, including Missouri State Sen. Jamilah Nasheed. She was detained as she blocked traffic in the middle of the street while protesting outside the Police Department.\n\nNow, there are fears about what could happen next. One protester put it succinctly:\n\n\"If there is not an indictment, excuse my French, all hell is going to break loose.\"\n\nComplete coverage of what's happening in Ferguson\n\nGovernor launches initiative\n\nSaying that \"our streets cannot be battlefields,\" Missouri Gov. Jay Nixon launched "
			  ],
			  [
			   "http://amanpour.blogs.cnn.com/2014/10/21/identity-politics-drive-criminal-justice-systems-from-south-africa-to-america/?hpt=hp_bn9",
			   "Identity politics drive criminal justice systems, from South Africa to America",
			   "By Mick Krever, CNN\n\nThe trial of Oscar Pistorius highlights the power of identity politics, an American civil rights lawyer who defends the disenfranchised told CNN’s Christiane Amanpour on Tuesday, as Pistorius was sentenced to five years in prison.\n\n“It's a dynamic that we see frequently,” Bryan Stevenson said. “When people come into the criminal courts with another identity, with another status, they tend to fare much better.”\n\n“This young man was a respected Olympian, an athlete who was well respected and adored and that meant that he was going to get the presumption of innocence that we offer, that we say we give to everybody but that not everybody gets.”\n\nThat is particularly true of the many disenfranchised and often innocent people Stevenson represents in the U.S., a country with its own very troubled relationship to race and justice.\n\nThe organization he founded, the Equal Justice Initiative, is headquartered in the heart of the American South – Montgomery, Alabama. His new b"
			  ],
			  [
			   "http://us.cnn.com/2014/10/21/justice/ferguson-protests/index.html?hpt=hp_t2",
			   "70 days of protests for Ferguson",
			   "Ferguson, Missouri (CNN) -- This is the new normal in Ferguson: Protests, day and night, for more than 70 days now.\n\nSometimes it's hundreds of demonstrators, sometimes just a handful. But they're always outside the Ferguson Police Department, clamoring for the indictment of Officer Darren Wilson in the shooting death of unarmed teenager Michael Brown.\n\nAnd with new details about the investigation leaked, tensions are escalating.\n\nOn Monday night, St. Louis County police detained two protesters, including Missouri State Sen. Jamilah Nasheed. She was detained as she blocked traffic in the middle of the street while protesting outside the Police Department.\n\nNow, there are fears about what could happen next. One protester put it succinctly:\n\n\"If there is not an indictment, excuse my French, all hell is going to break loose.\"\n\nComplete coverage of what's happening in Ferguson\n\nGovernor launches initiative\n\nSaying that \"our streets cannot be battlefields,\" Missouri Gov. Jay Nixon launched "
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/justice/ferguson-protests/index.html",
			   "More than 70 days of protests in Ferguson",
			   "Ferguson, Missouri (CNN) -- This is the new normal in Ferguson: Protests, day and night, for more than 70 days now.\n\nSometimes it's hundreds of demonstrators, sometimes just a handful. But they're always outside the Ferguson Police Department, clamoring for the indictment of Officer Darren Wilson in the shooting death of unarmed teenager Michael Brown.\n\nAnd with new details about the investigation leaked, tensions are escalating.\n\nOn Monday night, St. Louis County police detained two protesters, including Missouri State Sen. Jamilah Nasheed. She was detained as she blocked traffic in the middle of the street while protesting outside the Police Department.\n\nNow, there are fears about what could happen next. One protester put it succinctly:\n\n\"If there is not an indictment, excuse my French, all hell is going to break loose.\"\n\nComplete coverage of what's happening in Ferguson\n\nNew details revealed\n\nBrown's blood was found on the officer's uniform and inside his police car, law enforcement"
			  ],
			  [
			   "http://us.cnn.com/2014/10/21/justice/ferguson-protests/index.html?hpt=hp_t1",
			   "Protests, day and night, for more than 70 days",
			   "Ferguson, Missouri (CNN) -- This is the new normal in Ferguson: now.\n\nSometimes it's hundreds of demonstrators, sometimes just a handful. But they're always outside the Ferguson Police Department, clamoring for the indictment of Officer Darren Wilson in the shooting death of unarmed teenager Michael Brown.\n\nAnd with new details about the investigation leaked, tensions are escalating.\n\nOn Monday night, two protestors were detained by St. Louis County police -- including Missouri State Sen. Jamilah Nasheed. She was detained as she blocked traffic in the middle of the street while protesting outside the Ferguson police department.\n\nNow, there are fears about what could happen next.\n\n\"Everybody is planning for whatever the grand jury decides,\" said Amy Hunter, racial justice director at the YWCA. \"Certainly there are lots of us that planning peaceful protests for should it not be indicted. Certainly there are other people that have other ideas at hand.\"\n\nOne protester put it succinctly:\n\n\""
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/justice/ferguson-protests/index.html",
			   "The new normal for Ferguson",
			   "Ferguson, Missouri (CNN) -- This is the new normal in Ferguson: Protests, day and night, for more than 70 days now.\n\nSometimes it's hundreds of demonstrators, sometimes just a handful. But they're always outside the Ferguson Police Department, clamoring for the indictment of Officer Darren Wilson in the shooting death of unarmed teenager Michael Brown.\n\nAnd with new details about the investigation leaked, tensions are escalating.\n\nOn Monday night, two protestors were detained by St. Louis County police -- including Missouri State Sen. Jamilah Nasheed. She was detained as she blocked traffic in the middle of the street while protesting outside the Ferguson police department.\n\nNow, there are fears about what could happen next.\n\n\"Everybody is planning for whatever the grand jury decides,\" said Amy Hunter, racial justice director at the YWCA. \"Certainly there are lots of us that planning peaceful protests for should it not be indicted. Certainly there are other people that have other ideas"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/justice/pennsylvania-trooper-shooting/index.html",
			   "Trooper shooting suspect not found after possible sighting",
			   "(CNN) -- Area schools were closed Tuesday as the search for Pennsylvania trooper shooting suspect Eric Matthew Frein intensified overnight, Pennsylvania State Police said.\n\nDespite a possible sighting by law enforcement Monday afternoon, Frein still has not been found.\n\n\"A local police officer from Pocono Mountain Regional Police Department observed a man dressed in green in the woods. He lost visual contact with the man through the woods. A search of the area was conducted but no one was located,\" state police said.\n\nIt has been nearly six weeks since Frein disappeared after allegedly shooting two state troopers, leaving one officer dead and another wounded.\n\nPolice read excerpts of notes they say suspect left\n\nOn Friday, state police discovered blood droplets on the steps of a covered porch near the town of Cresco, Pennsylvania. But DNA testing showed the blood wasn't Frein's, police said Monday.\n\nMaterial found on the inside of a screen porch door at a nearby home wasn't blood at al"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/justice/ferguson-protests/index.html",
			   "Welcome to the new normal in Ferguson",
			   "Ferguson, Missouri (CNN) -- This is the new normal in Ferguson: Protests, day and night, for more than 70 days now.\n\nSometimes it's hundreds of demonstrators, sometimes just a handful. But they're always outside the Ferguson Police Department, clamoring for the indictment of Officer Darren Wilson in the shooting death of unarmed teenager Michael Brown.\n\nAnd with new details about the investigation leaked, tensions are escalating.\n\nOn Monday night, two protestors were detained by St. Louis County police -- including Missouri State Sen. Jamilah Nasheed. She was detained as she blocked traffic in the middle of the street while protesting outside the Ferguson police department.\n\nNow, there are fears about what could happen next.\n\n\"Everybody is planning for whatever the grand jury decides,\" said Amy Hunter, racial justice director at the YWCA. \"Certainly there are lots of us that planning peaceful protests for should it not be indicted. Certainly there are other people that have other ideas"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/justice/pennsylvania-trooper-shooting/index.html",
			   "Schools close after possible Eric Frein sighting",
			   "(CNN) -- Area schools were closed Tuesday as the search for Pennsylvania trooper shooting suspect Eric Matthew Frein intensified overnight, Pennsylvania State Police said.\n\nDespite a possible sighting by law enforcement Monday afternoon, Frein still has not been found.\n\n\"A local police officer from Pocono Mountain Regional Police Department observed a man dressed in green in the woods. He lost visual contact with the man through the woods. A search of the area was conducted but no one was located,\" state police said.\n\nIt has been nearly six weeks since Frein disappeared after allegedly shooting two state troopers, leaving one officer dead and another wounded.\n\nPolice read excerpts of notes they say suspect left\n\nOn Monday, state police discovered droplets of what appeared to be blood on the steps of a covered porch near the town of Cresco, Pennsylvania, but DNA testing showed the blood wasn't Frein's, police said.\n\nMaterial found on the inside of a screen porch door at a nearby home wa"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/justice/jodi-arias-retrial/index.html",
			   "Jury retrial to begin on Arias' fate",
			   "(CNN) -- Jodi Arias and her legal team will begin fighting for her life this week when a new jury hears opening arguments on whether she should receive a life or death sentence for her murder conviction.\n\nIt's been a long legal journey for Arias, 34, whom a jury found guilty last year of first-degree murder in the gruesome killing of ex-boyfriend Travis Alexander, 30.\n\nThis week's court proceeding in Arizona is a retrial of the penalty phase. In 2013, the same jury that convicted her became deadlocked later on whether she should be executed for the 2008 murder of Alexander, who was stabbed 29 times, shot in the face and had his neck slit from ear to ear.\n\nThe impasse came when the jury voted 8-4 in favor of the death penalty for Arias, a source with knowledge of the jury's vote said at the time.\n\nA death penalty requires a unanimous vote by the 12 jurors, and during the penalty retrial, a similar 12-0 vote will be required if Arias is to die by lethal injection, said Jerry Cobb, spokes"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/justice/ferguson-protests/index.html?hpt=ju_c2",
			   "Ferguson turns into tinderbox once again after new details leaked",
			   "Ferguson, Missouri (CNN) -- This is the new normal in Ferguson: Protests, day and night, for more than 70 days now.\n\nSometimes it's hundreds of demonstrators, sometimes just a handful. But they're always outside the Ferguson Police Department, clamoring for the indictment of Officer Darren Wilson in the shooting death of unarmed teenager Michael Brown.\n\nAnd with new details about the investigation leaked, tensions are escalating.\n\nOn Monday night, two protestors were detained by St. Louis County police -- including Missouri State Sen. Jamilah Nasheed. She was detained as she blocked traffic in the middle of the street while protesting outside the Ferguson police department.\n\nNow, there are fears about what could happen next.\n\n\"Everybody is planning for whatever the grand jury decides,\" said Amy Hunter, racial justice director at the YWCA. \"Certainly there are lots of us that planning peaceful protests for should it not be indicted. Certainly there are other people that have other ideas"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/justice/jodi-arias-retrial/index.html?hpt=hp_t2",
			   "Retrial to begin in Jodi Arias case",
			   "Retrial to begin in Jodi Arias caseAPArias and her legal team will begin fighting for her life this week when a new jury hears opening arguments on whether she should receive a life or death sentence.What would spare Arias from executionIn other news\nNew plans for future Ebola patients\nWave of attacks kill 43 in Iraq"
			  ],
			  [
			   "http://us.cnn.com/2014/10/21/justice/ferguson-protests/index.html?hpt=hp_t2",
			   "Tensions escalate in Ferguson",
			   "Ferguson, Missouri (CNN) -- This is the new normal in Ferguson: Protests, day and night, for more than 70 days now.\n\nSometimes it's hundreds of demonstrators, sometimes just a handful. But they're always outside the Ferguson Police Department, clamoring for the indictment of Officer Darren Wilson in the shooting death of unarmed teenager Michael Brown.\n\nAnd with new details about the investigation leaked, tensions are escalating.\n\nOn Monday night, two protestors were detained by St. Louis County police -- including Missouri State Sen. Jamilah Nasheed. She was detained as she blocked traffic in the middle of the street while protesting outside the Ferguson police department.\n\nNow, there are fears about what could happen next.\n\n\"Everybody is planning for whatever the grand jury decides,\" said Amy Hunter, racial justice director at the YWCA. \"Certainly there are lots of us that planning peaceful protests for should it not be indicted. Certainly there are other people that have other ideas"
			  ],
			  [
			   "http://us.cnn.com/2014/10/21/justice/ferguson-protests/index.html?hpt=hp_t2",
			   "Protests erupt in Ferguson",
			   "Ferguson, Missouri (CNN) -- This is the new normal in Ferguson: Protests, day and night, for more than 70 days now.\n\nSometimes it's hundreds of demonstrators, sometimes just a handful. But they're always outside the Ferguson Police Department, clamoring for the indictment of Officer Darren Wilson in the shooting death of unarmed teenager Michael Brown.\n\nAnd with new details about the investigation leaked, tensions are escalating.\n\nOn Monday night, two protestors were detained by St. Louis County police -- including Missouri State Sen. Jamilah Nasheed. She was detained as she blocked traffic in the middle of the street while protesting outside the Ferguson police department.\n\nNow, there are fears about what could happen next.\n\n\"Everybody is planning for whatever the grand jury decides,\" said Amy Hunter, racial justice director at the YWCA. \"Certainly there are lots of us that planning peaceful protests for should it not be indicted. Certainly there are other people that have other ideas"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/justice/ferguson-protests/index.html?eref=edition",
			   "Ferguson becomes tinderbox again",
			   "Ferguson, Missouri (CNN) -- This is the new normal in Ferguson: Protests, day and night, for more than 70 days now.\n\nSometimes it's hundreds of demonstrators, sometimes just a handful. But they're always outside the Ferguson Police Department, clamoring for the indictment of Officer Darren Wilson in the shooting death of unarmed teenager Michael Brown.\n\nAnd with new details about the investigation leaked, tensions are escalating.\n\nOn Monday night, two protestors were detained by St. Louis County police -- including Missouri State Sen. Jamilah Nasheed. She was detained as she blocked traffic in the middle of the street while protesting outside the Ferguson police department.\n\nNow, there are fears about what could happen next.\n\n\"Everybody is planning for whatever the grand jury decides,\" said Amy Hunter, racial justice director at the YWCA. \"Certainly there are lots of us that planning peaceful protests for should it not be indicted. Certainly there are other people that have other ideas"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/justice/ferguson-protests/index.html",
			   "Michael Brown case: Ferguson braces for more protests",
			   "_"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/justice/jodi-arias-retrial/index.html",
			   "Jodi Arias jury retrial to begin",
			   "(CNN) -- Jodi Arias and her legal team will begin fighting for her life this week when a new jury hears opening arguments on whether she should receive a life or death sentence for her murder conviction.\n\nIt's been a long legal journey for Arias, 34, whom a jury found guilty last year of first-degree murder in the gruesome killing of ex-boyfriend Travis Alexander, 30.\n\nThis week's court proceeding in Arizona is a retrial of the penalty phase. In 2013, the same jury that convicted her became deadlocked later on whether she should be executed for the 2008 murder of Alexander, who was stabbed 29 times, shot in the face and had his neck slit from ear to ear.\n\nThe impasse came when the jury voted 8-4 in favor of the death penalty for Arias, a source with knowledge of the jury's vote said at the time.\n\nA death penalty requires a unanimous vote by the 12 jurors, and during the penalty retrial, a similar 12-0 vote will be required if Arias is to die by lethal injection, said Jerry Cobb, spokes"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/justice/jodi-arias-retrial/index.html?eref=edition",
			   "Jury retrial to begin on Arias sentence",
			   "(CNN) -- Jodi Arias and her legal team will begin fighting for her life this week when a new jury hears opening arguments on whether she should receive a life or death sentence for her murder conviction.\n\nIt's been a long legal journey for Arias, 34, whom a jury found guilty last year of first-degree murder in the gruesome killing of ex-boyfriend Travis Alexander, 30.\n\nThis week's court proceeding in Arizona is a retrial of the penalty phase. In 2013, the same jury that convicted her became deadlocked later on whether she should be executed for the 2008 murder of Alexander, who was stabbed 29 times, shot in the face and had his neck slit from ear to ear.\n\nThe impasse came when the jury voted 8-4 in favor of the death penalty for Arias, a source with knowledge of the jury's vote said at the time.\n\nA death penalty requires a unanimous vote by the 12 jurors, and during the penalty retrial, a similar 12-0 vote will be required if Arias is to die by lethal injection, said Jerry Cobb, spokes"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/justice/jodi-arias-retrial/index.html",
			   "Retrial to begin on life or death sentence for Arias",
			   "(CNN) -- Jodi Arias and her legal team will begin fighting for her life this week when a new jury hears opening arguments on whether she should receive a life or death sentence for her murder conviction.\n\nIt's been a long legal journey for Arias, 34, whom a jury found guilty last year of first-degree murder in the gruesome killing of ex-boyfriend Travis Alexander, 30.\n\nThis week's court proceeding in Arizona is a retrial of the penalty phase. In 2013, the same jury that convicted her became deadlocked later on whether she should be executed for the 2008 murder of Alexander, who was stabbed 29 times, shot in the face and had his neck slit from ear to ear.\n\nThe impasse came when the jury voted 8-4 in favor of the death penalty for Arias, a source with knowledge of the jury's vote said at the time.\n\nA death penalty requires a unanimous vote by the 12 jurors, and during the penalty retrial, a similar 12-0 vote will be required if Arias is to die by lethal injection, said Jerry Cobb, spokes"
			  ],
			  [
			   "http://www.cnn.com/2014/10/20/justice/michael-brown-darren-wilson-account/index.html",
			   "New Michael Brown details confirmed",
			   "(CNN) -- Blood from Michael Brown that was found on the uniform and in the police car of Officer Darren Wilson appears to back the officer's version of events, but still leaves questions unanswered, law enforcement sources told CNN.\n\nThose sources corroborated to CNN details first reported by The New York Times about the officer's version of events in Wilson's shooting of the unarmed teen on August 9 in Ferguson, Missouri.\n\nBrown's blood was found on Wilson's gun, on the squad car's interior and on the officer's uniform, according to a U.S. law enforcement official and a second source with knowledge of the forensics presented to the grand jury.\n\nThe source corroborated what the Times reported.\n\nAt least one of the wounds Brown suffered is consistent with a struggle and appeared to be fired at close range, according to a different source with first-hand knowledge of the investigation.\n\nThis finding could lend credibility to Wilson's account that he was fearful for his life after a strug"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/20/justice/pennsylvania-trooper-shooting/index.html?hpt=ju_c2",
			   "Bloody stains not connected to trooper shooting suspect search",
			   "(CNN) -- Blood discovered during the search for Pennsylvania trooper shooting suspect Eric Matthew Frein is not his, state police said Monday.\n\nDroplets of what appeared to be blood on the steps of a covered porch near the town of Cresco, Pennsylvania, turned out to be human, the Pennsylvania State Police said.\n\nBut DNA testing showed the blood wasn't Frein's, police said.\n\nMaterial found on the inside of a screen porch door at a nearby home wasn't blood at all, police said.\n\nNeither has any link to the search for Frein, according to police.\n\nPolice read excerpts of notes they say suspect left\n\nOn Friday, a law enforcement source speaking on condition of anonymity told CNN that there was no reason to believe that Frein was injured or that the blood was Frein's.\n\nFrein, 31, is suspected in the September 12 ambush shooting that left Cpl. Bryon Dickson dead and Trooper Alex T. Douglass wounded outside the Pennsylvania State Police barracks in Blooming Grove in northeast Pennsylvania.\n\nPol"
			  ],
			  [
			   "http://www.cnn.com/2014/10/20/justice/pennsylvania-trooper-shooting/index.html",
			   "Police: Bloody stains not connected to trooper shooting suspect",
			   "(CNN) -- Blood discovered during the search for Pennsylvania trooper shooting suspect Eric Matthew Frein is not his, state police said Monday.\n\nDroplets of what appeared to be blood on the steps of a covered porch near the town of Cresco, Pennsylvania, turned out to be human, the Pennsylvania State Police said.\n\nBut DNA testing showed the blood wasn't Frein's, police said.\n\nMaterial found on the inside of a screen porch door at a nearby home wasn't blood at all, police said.\n\nNeither has any link to the search for Frein, according to police.\n\nPolice read excerpts of notes they say suspect left\n\nOn Friday, a law enforcement source speaking on condition of anonymity told CNN that there was no reason to believe that Frein was injured or that the blood was Frein's.\n\nFrein, 31, is suspected in the September 12 ambush shooting that left Cpl. Bryon Dickson dead and Trooper Alex T. Douglass wounded outside the Pennsylvania State Police barracks in Blooming Grove in northeast Pennsylvania.\n\nPol"
			  ],
			  [
			   "http://www.cnn.com/2014/10/20/justice/pennsylvania-trooper-shooting/index.html",
			   "Bloody stains not connected to Frein search, police say",
			   "(CNN) -- Blood discovered during the search for Pennsylvania trooper shooting suspect Eric Matthew Frein is not his, state police said Monday.\n\nDroplets of what appeared to be blood on the steps of a covered porch near the town of Cresco, Pennsylvania, turned out to be human, the Pennsylvania State Police said.\n\nBut DNA testing showed the blood wasn't Frein's, police said.\n\nMaterial found on the inside of a screen porch door at a nearby home wasn't blood at all, police said.\n\nNeither has any link to the search for Frein, according to police.\n\nPolice read excerpts of notes they say suspect left\n\nOn Friday, a law enforcement source speaking on condition of anonymity told CNN that there was no reason to believe that Frein was injured or that the blood was Frein's.\n\nFrein, 31, is suspected in the September 12 ambush shooting that left Cpl. Bryon Dickson dead and Trooper Alex T. Douglass wounded outside the Pennsylvania State Police barracks in Blooming Grove in northeast Pennsylvania.\n\nPol"
			  ],
			  [
			   "http://www.cnn.com/2014/10/20/justice/michael-brown-darren-wilson-account/index.html",
			   "Bring charges against officer in Michael Brown killing, attorney urges",
			   "(CNN) -- The attorney for the family of slain Ferguson, Missouri, teenager Michael Brown called again Monday for an indictment of the police officer who fired the fatal shots.\n\nAttorney Daryl Parks said information in a Friday New York Times story that related what's said to be Darren Wilson's version of what happened shouldn't preclude Wilson's prosecution for the unarmed teen's August 9 death.\n\n\"If nothing else, you have two competing stories here,\" he said in an appearance on CNN's \"New Day.\"\n\nHe said that leaks about the case are making people \"weary about the process\" and that only an open trial where all the facts are presented will help resolve lingering tensions over the shooting.\n\nBrown's death is the subject of two inquires: one by a St. Louis County grand jury considering whether the 28-year-old officer should be charged, and the other by federal investigators looking into whether any civil rights violations occurred.\n\nThe government officials cited by The Times said the evi"
			  ],
			  [
			   "http://www.cnn.com/2014/10/20/justice/michael-brown-darren-wilson-account/index.html",
			   "Attorney: Charge officer in Michael Brown killing",
			   "(CNN) -- The attorney for the family of slain Ferguson, Missouri, teenager Michael Brown called again Monday for an indictment of the police officer who fired the fatal shots.\n\nAttorney Daryl Parks said information in a Friday New York Times story that related what's said to be Darren Wilson's version of what happened shouldn't preclude Wilson's prosecution for the unarmed teen's August 9 death.\n\n\"If nothing else, you have two competing stories here,\" he said in an appearance on CNN's \"New Day.\"\n\nHe said that leaks about the case are making people \"weary about the process\" and that only an open trial where all the facts are presented will help resolve lingering tensions over the shooting.\n\nBrown's death is the subject of two inquires: one by a St. Louis County grand jury considering whether the 28-year-old officer should be charged, and the other by federal investigators looking into whether any civil rights violations occurred.\n\nThe government officials cited by The Times said the evi"
			  ],
			  [
			   "http://us.cnn.com/2014/10/18/justice/michael-brown-darren-wilson-account/index.html?hpt=hp_t4",
			   "Report: Brown's blood was in cop's car",
			   "(CNN) -- Forensic tests have found the blood of Michael Brown on the gun, uniform and police cruiser belonging to Officer Darren Wilson, who fatally shot the unarmed teen two months ago in Ferguson, Missouri, The New York Times reported.\n\nThe revelation, provided by unnamed government officials familiar with a federal civil rights investigation, marked the first public account of Wilson's testimony to investigators.\n\nThat it could potentially serve as exculpatory evidence -- or at the very least, used by Wilson's supporters to back the officer's account of what transpired on Canfield Drive on August 9 -- immediately drew suspicion and anger from leading activists who portended an ominous reaction from Brown supporters.\n\n\"This is clearly constructed and contrived to justify the killing of Mike Brown,\" Ferguson resident Pam Peters told CNN affiliate KTVI.\n\nAngela Whitman, a Ferguson resident who was among activists meeting with U.S. Attorney General Eric Holder there in August, found the"
			  ],
			  [
			   "http://us.cnn.com/2014/10/18/justice/michael-brown-darren-wilson-account/index.html?hpt=hp_bn1",
			   "Report: Michael Brown's blood found on officer's gun",
			   "(CNN) -- Forensic tests have found the blood of Michael Brown on the gun, uniform and police cruiser belonging to Officer Darren Wilson, who fatally shot the unarmed teen two months ago in Ferguson, Missouri, The New York Times reported.\n\nThe revelation, provided by unnamed government officials familiar with a federal civil rights investigation, marked the first public account of Wilson's testimony to investigators.\n\nThat it could potentially serve as exculpatory evidence -- or at the very least, used by Wilson's supporters to back the officer's account of what transpired on Canfield Drive on August 9 -- immediately drew suspicion and anger from leading activists who portended an ominous reaction from Brown supporters.\n\n\"This is clearly constructed and contrived to justify the killing of Mike Brown,\" Ferguson resident Pam Peters told CNN affiliate KTVI.\n\nAngela Whitman, a Ferguson resident who was among activists meeting with U.S. Attorney General Eric Holder there in August, found the"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/18/justice/pennsylvania-trooper-shooting/index.html?hpt=ju_c2",
			   "Alleged trooper killer may have been spotted in Pennsylvania",
			   "(CNN) -- A man suspected of killing a Pennsylvania state trooper might have been spotted near his former high school, police said Saturday -- a potential boost for authorities' weekslong and multimillion-dollar quest to find him in the woods.\n\nInvestigators believe a woman saw Eric Matthew Frein in a wooded area near the eastern Pennsylvania town of Swiftwater on Friday night, State Police Lt. Col. George Bivens told reporters.\n\nThe woman was taking a walk when she saw a man with a rifle, his face obscured by mud, just off a road near Pocono Mountain East High School just after 9 p.m., Bivens said.\n\nShe couldn't identify him because of the mud, but investigators' minds went to Frein, who police say is a survivalist who has been hiding in the sylvan Pocono Mountains in the weeks since the slaying.\n\nFrein is familiar with the Swiftwater area, having attended the high school and having worked summers at a camp just to the west, Bivens said.\n\n\"Our investigators believe this was likely Frei"
			  ],
			  [
			   "http://www.cnn.com/2014/10/18/justice/pennsylvania-trooper-shooting/index.html",
			   "Trooper slaying",
			   "(CNN) -- A man suspected of killing a Pennsylvania state trooper might have been spotted near his former high school, police said Saturday -- a potential boost for authorities' weekslong and multimillion-dollar quest to find him in the woods.\n\nInvestigators believe a woman saw Eric Matthew Frein in a wooded area near the eastern Pennsylvania town of Swiftwater on Friday night, State Police Lt. Col. George Bivens told reporters.\n\nThe woman was taking a walk when she saw a man with a rifle, his face obscured by mud, just off a road near Pocono Mountain East High School just after 9 p.m., Bivens said.\n\nShe couldn't identify him because of the mud, but investigators' minds went to Frein, who police say is a survivalist who has been hiding in the sylvan Pocono Mountains in the weeks since the slaying.\n\nFrein is familiar with the Swiftwater area, having attended the high school and having worked summers at a camp just to the west, Bivens said.\n\n\"Our investigators believe this was likely Frei"
			  ],
			  [
			   "http://us.cnn.com/2014/10/17/justice/michael-dunn-sentencing/index.html?hpt=hp_t4",
			   "Man gets life for killing over loud music",
			   "Michael Dunn is sentenced to life in prison without parole \n\nHe was convicted for the 2012 shooting death of 17-year-old Jordan Davis \n\nDeath happened during an argument over loud music \n\nJudge Russell Healey: \"Mr. Dunn, your life is effectively over\" \n\n(CNN) -- A Florida judge Friday sentenced Michael Dunn to life in prison without parole for the 2012 shooting death of 17-year-old Jordan Davis. \n\nThe sentence, imposed nearly two years after Dunn shot and killed Davis during an argument over loud music, also carries an additional 90 years for three convictions of attempted murder and firing a weapon into a vehicle. \n\n\"This case demonstrates that our justice system does work,\" Duval County Judge Russell Healey said moments before sentencing Dunn. \n\nDunn, 47, who is white, was convicted of first-degree murder this month for shooting into an SUV full of African-American teenagers at a Jacksonville, Florida, gas station after an argument over loud music from the teens' vehicle. \n\nProsecuto"
			  ],
			  [
			   "http://www.cnn.com/2014/10/18/justice/pennsylvania-trooper-shooting/index.html",
			   "Eric Frein believed seen hiding near school, police say",
			   "(CNN) -- [Breaking news update, published at 1:29 p.m. ET]\n\nInvestigators believe a woman saw Eric Frein -- sought by authorities on suspicion of killing a Pennsylvania state trooper and wounding another in a September ambush -- near woods not far from Pocono Mountain East High School in eastern Pennsylvania on Friday night, State Police Lt. Col. George Bivens told reporters Saturday.\n\nFrein used to attend the high school, which is in Swiftwater, and also used to work at a camp just west of the area, Bivens said.\n\n[Original story, published at 1:03 p.m. ET]\n\nInvestigators believe there's been another public sighting of Eric Matthew Frein, subject of a massive manhunt on suspicion of killing a Pennsylvania state trooper in a September ambush, police said Saturday.\n\nA woman in eastern Pennsylvania told police she saw a man dressed in all black on Friday night, with his face covered in mud, armed with a long rifle with a scope, the official said on condition of anonymity.\n\nAuthorities bel"
			  ],
			  [
			   "http://www.cnn.com/2014/10/18/justice/pennsylvania-trooper-shooting/index.html",
			   "Suspect in PA trooper slaying believed sighted",
			   "(CNN) -- [Breaking news update, published at 1:29 p.m. ET]\n\nInvestigators believe a woman saw Eric Frein -- sought by authorities on suspicion of killing a Pennsylvania state trooper and wounding another in a September ambush -- near woods not far from Pocono Mountain East High School in eastern Pennsylvania on Friday night, State Police Lt. Col. George Bivens told reporters Saturday.\n\nFrein used to attend the high school, which is in Swiftwater, and also used to work at a camp just west of the area, Bivens said.\n\n[Original story, published at 1:03 p.m. ET]\n\nInvestigators believe there's been another public sighting of Eric Matthew Frein, subject of a massive manhunt on suspicion of killing a Pennsylvania state trooper in a September ambush, police said Saturday.\n\nA woman in eastern Pennsylvania told police she saw a man dressed in all black on Friday night, with his face covered in mud, armed with a long rifle with a scope, the official said on condition of anonymity.\n\nAuthorities bel"
			  ],
			  [
			   "http://www.cnn.com/2014/10/18/justice/pennsylvania-trooper-shooting/index.html",
			   "Source: Suspect in PA trooper slaying believed sighted",
			   "(CNN) -- Investigators believe there's been another public sighting of Eric Matthew Frein, subject of a massive manhunt on suspicion of killing a Pennsylvania state trooper in a September ambush, a law enforcement official said Saturday.\n\nA woman in eastern Pennsylvania told police she saw a man dressed in all black on Friday night, with his face covered in mud, armed with a long rifle with a scope, the official said on condition of anonymity.\n\nAuthorities believe the man was Frein, and are now searching the area of the sighting in Paradise Township, the official said.\n\nFrein, 31, is suspected in the September 12 ambush shooting that left Cpl. Bryon Dickson dead and Trooper Alex T. Douglass wounded outside the Pennsylvania State Police barracks in Blooming Grove.\n\nA massive search for Frein has been carried out since, at times involving as many as 1,000 officers. Despite recent sightings and other leads, he has eluded authorities. The manhunt has cost several million dollars, State Pol"
			  ],
			  [
			   "http://www.cnn.com/2014/10/18/justice/pennsylvania-trooper-shooting/index.html",
			   "Pa. killing suspect believed seen",
			   "(CNN) -- Investigators believe there's been another public sighting of Eric Matthew Frein, subject of a massive manhunt on suspicion of killing a Pennsylvania state trooper in a September ambush, a law enforcement official said Saturday.\n\nA woman in eastern Pennsylvania told police she saw a man dressed in all black on Friday night, with his face covered in mud, armed with a long rifle with a scope, the official said on condition of anonymity.\n\nAuthorities believe the man was Frein, and are now searching the area of the sighting in Paradise Township, the official said.\n\nFrein, 31, is suspected in the September 12 ambush shooting that left Cpl. Bryon Dickson dead and Trooper Alex T. Douglass wounded outside the Pennsylvania State Police barracks in Blooming Grove.\n\nA massive search for Frein has been carried out since, at times involving as many as 1,000 officers. Despite recent sightings and other leads, he has eluded authorities. The manhunt has cost several million dollars, State Pol"
			  ],
			  [
			   "http://www.cnn.com/2014/10/18/justice/pennsylvania-trooper-shooting/index.html",
			   "Source: Trooper's killer believed spotted in Penn.",
			   "(CNN) -- Investigators believe there's been another public sighting of Eric Matthew Frein, subject of a massive manhunt on suspicion of killing a Pennsylvania state trooper in a September ambush, a law enforcement official said Saturday.\n\nA woman in Paradise, Pennsylvania, told police she saw a man dressed in all black on Friday night, with his face covered in mud, armed with a long rifle with a scope, the official said on condition of anonymity.\n\nAuthorities believe the man was Frein, and are now searching the area, the official said.\n\nFrein, 31, is suspected in the September 12 ambush shooting that left Cpl. Bryon Dickson dead and Trooper Alex T. Douglass wounded outside the Pennsylvania State Police barracks in Blooming Grove.\n\nA massive search for Frein has been carried out since, at times involving as many as 1,000 officers. Despite recent sightings and other leads, he has eluded authorities. The manhunt has cost several million dollars, State Police Lt. Col. George Bivens said ea"
			  ],
			  [
			   "http://us.cnn.com/2014/10/18/justice/michael-brown-darren-wilson-account/index.html?hpt=hp_bn1",
			   "Report: Michael Brown's blood found on officer's gun, car",
			   "(CNN) -- Forensic tests have found the blood of Michael Brown on the gun, uniform and police cruiser belonging to Officer Darren Wilson, who fatally shot the unarmed teen two months ago, The New York Times reported.\n\nThe teen's death on August 9 in Ferguson, Missouri, prompted weeks of racially charged protests, which were at times marred by violence in the St. Louis suburb. Wilson is white; Brown was black.\n\nWilson has stayed out of the spotlight since the incident, and until now, few details have been known publicly about his side of the story.\n\nWilson told investigators he was trying to leave his car when Brown shoved him back in, The Times reported Friday night.\n\nOnce in, Brown pinned him in his car and tried to get his gun, he said, which made him fear for his safety, the newspaper reported, citing unnamed government officials familiar with the federal civil rights case.\n\nThe officer told authorities that Brown hit him and scratched him repeatedly, leaving bruises on his face and "
			  ],
			  [
			   "http://edition.cnn.com/2014/10/18/justice/michael-brown-darren-wilson-account/index.html?eref=edition",
			   "Brown's blood on officer's gun, car",
			   "(CNN) -- Forensic tests have found the blood of Michael Brown on the gun, uniform and police cruiser belonging to Officer Darren Wilson, who fatally shot the unarmed teen two months ago, The New York Times reported.\n\nThe teen's death on August 9 in Ferguson, Missouri, prompted weeks of racially charged protests, which were at times marred by violence in the St. Louis suburb. Wilson is white; Brown was black.\n\nWilson has stayed out of the spotlight since the incident, and until now, few details have been known publicly about his side of the story.\n\nWilson told investigators he was trying to leave his car when Brown shoved him back in, according to The Times.\n\nOnce in, Brown pinned him in his car and tried to get his gun, he said, which made him fear for his safety, the newspaper reported, citing unnamed government officials familiar with the federal civil rights case.\n\nThe officer told authorities that Brown hit him and scratched him repeatedly, leaving bruises on his face and neck, acc"
			  ],
			  [
			   "http://www.cnn.com/2014/10/18/justice/michael-brown-darren-wilson-account/index.html",
			   "Report: Brown's blood in Mo. cop's car",
			   "(CNN) -- Forensic tests have found the blood of Michael Brown on the gun, uniform and police cruiser belonging to Officer Darren Wilson, who fatally shot the unarmed teen two months ago, The New York Times reported.\n\nThe teen's death on August 9 in Ferguson, Missouri, prompted weeks of racially charged protests, which were at times marred by violence in the St. Louis suburb. Wilson is white; Brown was black.\n\nWilson has stayed out of the spotlight since the incident, and until now, few details have been known publicly about his side of the story.\n\nWilson told investigators he was trying to leave his car when Brown shoved him back in, according to The Times.\n\nOnce in, Brown pinned him in his car and tried to get his gun, he said, which made him fear for his safety, the newspaper reported, citing unnamed government officials familiar with the federal civil rights case.\n\nThe officer told authorities that Brown hit him and scratched him repeatedly, leaving bruises on his face and neck, acc"
			  ],
			  [
			   "http://www.cnn.com/2014/10/18/justice/michael-brown-darren-wilson-account/index.html",
			   "Michael Brown's blood found in officer's car, on gun",
			   "(CNN) -- Forensic tests have found the blood of Michael Brown on the gun, uniform and police cruiser belonging to Officer Darren Wilson, who fatally shot the unarmed teen two months ago, The New York Times reported.\n\nThe teen's death on August 9 in Ferguson, Missouri, prompted weeks of racially charged protests, which were at times marred by violence in the St. Louis suburb. Wilson is white; Brown was black.\n\nWilson has stayed out of the spotlight since the incident, and until now, few details have been known publicly about his side of the story.\n\nWilson told investigators he was trying to leave his car when Brown shoved him back in, according to The Times.\n\nOnce in, Brown pinned him in his car and tried to get his gun, he said, which made him fear for his safety, the newspaper reported, citing unnamed government officials familiar with the federal civil rights case.\n\nThe officer told authorities that Brown hit him and scratched him repeatedly, leaving bruises on his face and neck, acc"
			  ],
			  [
			   "http://us.cnn.com/2014/10/17/justice/michael-dunn-sentencing/index.html?hpt=hp_t2",
			   "Man gets life for killing unarmed teen",
			   "(CNN) -- A Florida judge Friday sentenced Michael Dunn to life in prison without parole for the 2012 shooting death of 17-year-old Jordan Davis.\n\nThe sentence, imposed nearly two years after Dunn shot and killed Davis during an argument over loud music, also carries an additional 90 years for three convictions of attempted murder and firing a weapon into a vehicle.\n\n\"This case demonstrates that our justice system does work,\" Duval County Judge Russell Healey said moments before sentencing Dunn.\n\nDunn, 47, who is white, was convicted of first-degree murder this month for shooting into an SUV full of African-American teenagers at a Jacksonville, Florida, gas station after an argument over loud music from the teens' vehicle.\n\nProsecutors did not seek the death penalty in the racially-charged case, which drew comparisons to the shooting death of unarmed 17-year-old Trayvon Martin by neighborhood watchman George Zimmerman.\n\nZimmerman, who maintained that he acted in self-defense, was acquit"
			  ],
			  [
			   "http://www.cnn.com/2014/10/15/justice/five-things-grand-jury-michael-brown-ferguson/index.html",
			   "Ferguson grand jury: 5 things",
			   "Ferguson, Missouri (CNN) -- The \"Weekend of Resistance\" protests have ended, the prosecutor didn't step aside and the world awaits word from a grand jury determining whether charges should be brought against a white police officer who fatally shot unarmed African-American teenager Michael Brown in Ferguson, Missouri.\n\nProtesters demanded criminal charges against Officer Darren Wilson, who some witnesses said shot and killed Brown while he was surrendering with his hands up. But police said Wilson shot Brown after the 18-year-old attacked him and tried to take his service gun in August.\n\nDemonstrators also sought for St. Louis County Prosecuting Attorney Robert McCulloch to recuse himself from overseeing the case because, they allege, he can't be impartial after his police officer father was killed on the job by a black man in 1964.\n\nMcCulloch rejected those demands. But he said he will not try the case if there is an indictment. Meanwhile, two assistant prosecuting attorneys have been "
			  ],
			  [
			   "http://www.cnn.com/2014/10/17/justice/mma-fighter-suicide-attempt/index.html",
			   "MMA fighter attempts suicide at detention center, report says",
			   "(CNN) -- Mixed martial arts fighter Jonathan Koppenhaver, who is accused of beating up his ex-girlfriend, tried to kill himself in a Las Vegas jail, authorities said.\n\nKoppenhaver, 32, is known as War Machine on the MMA circuit. He allegedly beat adult film actress Christy Mack and a male friend on August 8 -- then went on the run.\n\nPolice captured him a week later in his hometown of Simi Valley, California. He's been held at the Clark County Detention Center since then.\n\nA corrections officer conducting checks at the detention center found him unresponsive in his cell on Tuesday, according to CNN affiliate KSNV.\n\nSuicide note\n\nHe was found seated on the floor with a torn piece of linen around his neck, which was attached to his bunk, Officer Jose Hernandez told the affiliate. Koppenhaver, who was unresponsive and struggling to breathe, had left behind a suicide note.\n\nHernandez cut the linen and called medical personnel, who later cleared the fighter and put him on suicide watch at a "
			  ],
			  [
			   "http://us.cnn.com/2014/10/17/justice/alaska-same-sex-marriage/index.html?hpt=hp_t2",
			   "Gay marriages can go ahead in 2 states",
			   "(CNN) -- Same-sex marriage in Alaska can move forward after the U.S. Supreme Court on Friday rejected the state's request to delay enforcement. The one-sentence order from the justices denying a stay means gays and lesbians could soon legally wed.\n\nLess than an hour later, a federal judge in Wyoming did the same in that Western state.\n\nBarring any continued legal intervention, that would make Alaska and Wyoming the 30th and 31st states to allow same-sex marriage, up from 19 states at the beginning of the month.\n\nIn Alaska, a federal judge in the state in recent days had ordered gays and lesbians be allowed to apply for marriage licenses and to wed after a normal three-day waiting period. But everything was on hold pending emergency action from the justices.\n\nSome couples had begun applying for marriage licenses as early as Monday and in at least some cases, couples were married when they were granted expedited waivers.\n\nAlaska had requested a stay, saying it needed more time to file mo"
			  ],
			  [
			   "http://www.cnn.com/2014/10/17/justice/alaska-same-sex-marriage/index.html",
			   "Same-sex marriage in Alaska, Wyoming can proceed",
			   "(CNN) -- Same-sex marriage in Alaska can move forward after the U.S. Supreme Court on Friday rejected the state's request to delay enforcement. The one-sentence order from the justices denying a stay means gays and lesbians could soon legally wed.\n\nLess than an hour later, a federal judge in Wyoming did the same in that Western state.\n\nBarring any continued legal intervention, that would make Alaska and Wyoming the 30th and 31st states to allow same-sex marriage, up from 19 states at the beginning of the month.\n\nIn Alaska, a federal judge in the state in recent days had ordered gays and lesbians be allowed to apply for marriage licenses and to wed after a normal three-day waiting period. But everything was on hold pending emergency action from the justices.\n\nSome couples had begun applying for marriage licenses as early as Monday and in at least some cases, couples were married when they were granted expedited waivers.\n\nAlaska had requested a stay, saying it needed more time to file mo"
			  ],
			  [
			   "http://www.cnn.com/2014/10/17/justice/alaska-same-sex-marriage/index.html",
			   "Same-sex marriage in Alaska can proceed",
			   "(CNN) -- Same-sex marriage in Alaska can move forward after the U.S. Supreme Court on Friday rejected the state's request to delay enforcement.\n\nThe one-sentence order from the justices denying a stay means gays and lesbians could soon legally wed.\n\nIt would make Alaska the 30th state to allow same-sex marriage, up from 19 states at the beginning of the month.\n\nA federal judge in the state in recent days had ordered gays and lesbians be allowed to apply for marriage licenses and to wed after a normal three-day waiting period. But everything was on hold pending emergency action from the justices.\n\nSome couples had begun applying for marriage licenses as early as Monday and in at least some cases, couples were married when they were granted an expedited consideration.\n\nThe state had requested a stay, saying it needed more time to file more detailed appeals to show its sovereign power to define marriage was being usurped by the courts. Officials, including the governor, had said waiting u"
			  ],
			  [
			   "http://www.cnn.com/2014/10/17/justice/arizona-same-sex-marriage-ban/index.html",
			   "Arizona's same-sex marriage ban ruled unconstitutional",
			   "(CNN) -- A federal judge has ruled that Arizona's ban on same-sex marriage is unconstitutional and has refused to stay his ruling. Unless the state appeals the decision, gay and lesbian couples soon will be able obtain marriage licenses.\n\nJudge John Sedwick concluded that provisions of the voter-approved measure were \"unconstitutional because they deny same-sex couples the equal protection of the law.\""
			  ],
			  [
			   "http://www.cnn.com/2014/10/17/justice/michael-dunn-sentencing/index.html",
			   "Life without parole for loud-music murderer in Florida",
			   "(CNN) -- A Florida judge Friday sentenced Michael Dunn to life in prison without parole for the 2012 shooting death of 17-year-old Jordan Davis.\n\nThe sentence, imposed nearly two years after Dunn shot and killed Davis during an argument over loud music, also carries an additional 90 years for three convictions of attempted murder and firing a weapon into a vehicle.\n\n\"This case demonstrates that our justice system does work,\" Duval County Judge Russell Healey said moments before sentencing Dunn.\n\nDunn, 47, was convicted of first-degree murder this month for shooting into an SUV full of teenagers at a Jacksonville, Florida, gas station after an argument over loud music from the teens' vehicle.\n\nProsecutors did not seek the death penalty in the death. Dunn claimed he acted in self-defense because he believed Davis was reaching for a gun. No weapon was found.\n\n\"Mr. Dunn, your life is effectively over,\" Healey said Friday. \"What is sad... is that this case exemplifies that our society seems"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/17/justice/michael-dunn-sentencing/index.html?eref=edition",
			   "Man gets life for loud music killing",
			   "(CNN) -- A Florida judge Friday sentenced Michael Dunn to life in prison without parole for the 2012 shooting death of 17-year-old Jordan Davis.\n\nBefore sentencing Dunn, Duval County Judge Russell Healey said, \"This case demonstrates that our justice system does work.\"\n\nDunn, 47, was convicted of first-degree murder this month for shooting into an SUV full of teenagers at a Jacksonville, Florida, gas station after an argument over loud music from the teens' vehicle.\n\nDunn for the first time apologized to Davis' family before he was sentenced.\n\n\"I want the Davis family to know I truly regret what happened. I'm sorry for their loss,\" he said. \"If I could roll back time and do things differently, I would.\"\n\nDavis' parents, Ron Davis and Lucia MacBath, were in court for the sentencing.\n\nDunn had said he shot at the vehicle because he thought Davis had a weapon and feared for his life, but the prosecution said Dunn was the aggressor and pointed out that he kept firing even after the teens f"
			  ],
			  [
			   "http://www.cnn.com/2014/10/17/justice/arizona-same-sex-marriage-ban/index.html",
			   "AZ same-sex marriage ban voided",
			   "(CNN) -- A federal judge has ruled that Arizona's ban on same-sex marriage is unconstitutional and has refused to stay his ruling. Unless the state appeals the decision, gay and lesbian couples soon will be able obtain marriage licenses.\n\nJudge John Sedwick concluded that provisions of the voter-approved measure were \"unconstitutional because they deny same-sex couples the equal protection of the law.\""
			  ],
			  [
			   "http://www.cnn.com/2014/10/17/justice/arizona-same-sex-marriage-ban/index.html",
			   "Judge: Arizona's same-sex marriage ban unconstitutional",
			   "(CNN) -- A federal judge has ruled that Arizona's ban on same-sex marriage is unconstitutional and has refused to stay his ruling. Unless the state appeals the decision, gay and lesbian couples soon will be able obtain marriage licenses.\n\nJudge John Sedwick concluded that provisions of the voter-approved measure were \"unconstitutional because they deny same-sex couples the equal protection of the law.\""
			  ],
			  [
			   "http://www.cnn.com/2014/10/17/justice/michael-dunn-sentencing/index.html",
			   "Michael Dunn sentenced to life without parole",
			   "(CNN) -- A Florida judge Friday sentenced Michael Dunn to life in prison without parole for the 2012 shooting death of 17-year-old Jordan Davis.\n\nBefore sentencing Dunn, Duval County Judge Russell Healey said, \"This case demonstrates that our justice system does work.\"\n\nDunn, 47, was convicted of first-degree murder this month for shooting into an SUV full of teenagers at a Jacksonville, Florida, gas station after an argument over loud music from the teens' vehicle.\n\nDunn for the first time apologized to Davis' family before he was sentenced.\n\n\"I want the Davis family to know I truly regret what happened. I'm sorry for their loss,\" he said. \"If I could roll back time and do things differently, I would.\"\n\nDavis' parents, Ron Davis and Lucia MacBath, were in court for the sentencing.\n\nDunn had said he shot at the vehicle because he thought Davis had a weapon and feared for his life, but the prosecution said Dunn was the aggressor and pointed out that he kept firing even after the teens f"
			  ],
			  [
			   "http://www.cnn.com/2014/10/17/justice/michael-dunn-sentencing/index.html",
			   "Man gets life for loud-music killing",
			   "(CNN) -- A Florida judge Friday sentenced Michael Dunn to life in prison without parole for the 2012 shooting death of 17-year-old Jordan Davis.\n\nBefore sentencing Dunn, Duval County Judge Russell Healey said, \"This case demonstrates that our justice system does work.\"\n\nDunn, 47, was convicted of first-degree murder this month for shooting into an SUV full of teenagers at a Jacksonville, Florida, gas station after an argument over loud music from the teens' vehicle.\n\nDunn for the first time apologized to Davis' family before he was sentenced.\n\n\"I want the Davis family to know I truly regret what happened. I'm sorry for their loss,\" he said. \"If I could roll back time and do things differently, I would.\"\n\nDavis' parents, Ron Davis and Lucia MacBath, were in court for the sentencing.\n\nDunn had said he shot at the vehicle because he thought Davis had a weapon and feared for his life, but the prosecution said Dunn was the aggressor and pointed out that he kept firing even after the teens f"
			  ],
			  [
			   "http://www.cnn.com/2014/10/17/justice/mma-fighter-suicide-attempt/index.html",
			   "MMA fighter War Machine attempts suicide in Las Vegas",
			   "(CNN) -- Mixed martial arts fighter Jonathan Koppenhaver, who is accused of brutally attacking his ex-girlfriend, tried to kill himself in a Las Vegas jail, authorities said.\n\nKoppenhaver, 32, is known as War Machine on the MMA circuit. He allegedly beat adult film actress Christy Mack and a male friend on August 8 -- then went on the run.\n\nPolice captured him a week later in his hometown of Simi Valley, California. He's been held at the Clark County Detention Center since then.\n\nA corrections officer conducting checks at the detention center found him unresponsive in his cell on Tuesday, according to CNN affiliate KSNV.\n\nSuicide note\n\nHe was found seated on the floor with a torn piece of linen around his neck, which was attached to his bunk, Officer Jose Hernandez told the affiliate. Koppenhaver, who was unresponsive and struggling to breathe, had left behind a suicide note.\n\nHernandez cut the linen and called medical personnel, who later cleared the fighter and put him on suicide wat"
			  ],
			  [
			   "http://us.cnn.com/2014/10/17/justice/mma-fighter-suicide-attempt/index.html?hpt=hp_t2",
			   "Jailed MMA fighter tries to kill self",
			   "(CNN) -- Mixed martial arts fighter Jonathan Koppenhaver, who is accused of brutally attacking his ex-girlfriend, tried to kill himself in a Las Vegas jail, authorities said.\n\nKoppenhaver, 32, is known as War Machine on the MMA circuit. He allegedly beat adult film actress Christy Mack and a male friend on August 8 -- then went on the run.\n\nPolice captured him a week later in his hometown of Simi Valley, California. He's been held at the Clark County Detention Center since then.\n\nA corrections officer conducting checks at the detention center found him unresponsive in his cell on Tuesday, according to CNN affiliate KSNV.\n\nSuicide note\n\nHe was found seated on the floor with a torn piece of linen around his neck, which was attached to his bunk, Officer Jose Hernandez told the affiliate. Koppenhaver, who was unresponsive and struggling to breathe, had left behind a suicide note.\n\nHernandez cut the linen and called medical personnel, who later cleared the fighter and put him on suicide wat"
			  ],
			  [
			   "http://www.cnn.com/2014/10/15/justice/five-things-grand-jury-michael-brown-ferguson/index.html",
			   "Ferguson grand jury -- 5 things to know",
			   "Ferguson, Missouri (CNN) -- The \"Weekend of Resistance\" protests have ended, the prosecutor didn't step aside and the world awaits word from a grand jury determining whether charges should be brought against a white police officer who fatally shot unarmed African-American teenager Michael Brown in Ferguson, Missouri.\n\nProtesters demanded criminal charges against Officer Darren Wilson, who some witnesses said shot and killed Brown while he was surrendering with his hands up. But police said Wilson shot Brown after the 18-year-old attacked him and tried to take his service gun in August.\n\nDemonstrators also sought for St. Louis County Prosecuting Attorney Robert McCulloch to recuse himself from overseeing the case because, they allege, he can't be impartial after his police officer father was killed on the job by a black man in 1964.\n\nMcCulloch rejected those demands. But he said he will not try the case if there is an indictment. Meanwhile, two assistant prosecuting attorneys have been "
			  ],
			  [
			   "http://www.cnn.com/2014/10/15/justice/five-things-grand-jury-michael-brown-ferguson/index.html",
			   "Ferguson grand jury: What to know",
			   "Ferguson, Missouri (CNN) -- The \"Weekend of Resistance\" protests have ended, the prosecutor didn't step aside and the world awaits word from a grand jury determining whether charges should be brought against a white police officer who fatally shot unarmed African-American teenager Michael Brown in Ferguson, Missouri.\n\nProtesters demanded criminal charges against Officer Darren Wilson, who some witnesses said shot and killed Brown while he was surrendering with his hands up. But police said Wilson shot Brown after the 18-year-old attacked him and tried to take his service gun in August.\n\nDemonstrators also sought for St. Louis County Prosecuting Attorney Robert McCulloch to recuse himself from overseeing the case because, they allege, he can't be impartial after his police officer father was killed on the job by a black man in 1964.\n\nMcCulloch rejected those demands. But he said he will not try the case if there is an indictment. But he will not try the case if there is an indictment. M"
			  ],
			  [
			   "http://www.cnn.com/2014/10/15/justice/five-things-grand-jury-michael-brown-ferguson/index.html",
			   "5 crucial things about the Michael Brown grand jury",
			   "Ferguson, Missouri (CNN) -- The \"Weekend of Resistance\" protests have ended, the prosecutor didn't step aside and the world awaits word from a grand jury determining whether charges should be brought against a white police officer who fatally shot unarmed African-American teenager Michael Brown in Ferguson, Missouri.\n\nProtesters demanded criminal charges against Officer Darren Wilson, who some witnesses said shot and killed Brown while he was surrendering with his hands up. But police said Wilson shot Brown after the 18-year-old attacked him and tried to take his service gun in August.\n\nDemonstrators also sought for St. Louis County Prosecuting Attorney Robert McCulloch to recuse himself from overseeing the case because, they allege, he can't be impartial after his police officer father was killed on the job by a black man in 1964.\n\nMcCulloch rejected those demands. But he said he will not try the case if there is an indictment. But he will not try the case if there is an indictment. M"
			  ],
			  [
			   "http://us.cnn.com/2014/10/14/justice/pennsylvania-juvenile-homicide/index.html?hpt=hp_inthenews",
			   "Child murders woman",
			   "(CNN) -- \"I killed that lady,\" the 10-year-old boy told a Pennsylvania state trooper, after a 90-year-old woman was found dead in the home of the boy's grandfather.\n\nTristen Kurilla, a fifth grader, made the chilling confession Saturday, police said, after his mother brought him to the Pennsylvania State Police Barracks in Honesdale, about 140 miles north of Philadelphia.\n\nNow, Kurilla is being held at the Wayne County Correctional Facility and charged as an adult with criminal homicide, the Wayne County district attorney's office said. The boy is separated from adult offenders and is being constantly supervised, CNN affiliate WBRE reported.\n\nThe boy admitted to grabbing a wooden cane, holding it against 90-year-old Helen Novak's throat for several seconds and punching her in the throat and stomach, according to the police affidavit.\n\nKurilla told police he was angry at Novak because she had yelled at him when he entered her room. He said he wanted to ask her a question.\n\nWere you tryi"
			  ],
			  [
			   "http://www.cnn.com/2014/10/15/justice/connecticut-bus-knife-shooting/index.html",
			   "Man pulls knife on bus, gets shot and killed by Connecticut police",
			   "(CNN) -- A man pulled out a knife on a bus, leading to a melee that ended with a trooper shooting him dead.\n\nThe incident took place Tuesday night on Interstate 95 in Norwalk, Connecticut. For reasons still unknown, a man brandished a knife on a tour bus, Connecticut State Police Lt. Paul Vance said.\n\nAnother passenger tried to take the knife away from the man, and the two got into an altercation. The bus driver spotted a state trooper along the highway and flagged the trooper down.\n\nAs the driver stopped the bus, the suspect and the passenger involved in the altercation tumbled off the bus and onto the roadway, Vance said.\n\nAs the trooper approached the bus, the suspect lunged toward the trooper with the knife, Vance said. The trooper then opened fire on the suspect, who later died at a hospital.\n\nThe tour bus was headed from New York to a casino in Connecticut.\n\nThree passengers, including the one involved in the altercation, suffered injuries that were not life-threatening, Vance sa"
			  ],
			  [
			   "http://www.cnn.com/2014/10/14/justice/pennsylvania-juvenile-homicide/index.html",
			   "Boy kills 90-year-old woman for yelling",
			   "(CNN) -- \"I killed that lady,\" the 10-year-old boy told a Pennsylvania state trooper, after a 90-year-old woman was found dead in the home of the boy's grandfather.\n\nTristen Kurilla, a fifth grader, made the chilling confession Saturday, police said, after his mother brought him to the Pennsylvania State Police Barracks in Honesdale, about 140 miles north of Philadelphia.\n\nNow, Kurilla is being held at the Wayne County Correctional Facility and charged as an adult with criminal homicide, the Wayne County district attorney's office said. The boy is separated from adult offenders and is being constantly supervised, CNN affiliate WBRE reported.\n\nThe boy admitted to grabbing a wooden cane, holding it against 90-year-old Helen Novak's throat for several seconds and punching her in the throat and stomach, according to the police affidavit.\n\nKurilla told police he was angry at Novak because she had yelled at him when he entered her room. He said he wanted to ask her a question.\n\nWere you tryi"
			  ],
			  [
			   "http://us.cnn.com/2014/10/14/justice/pennsylvania-juvenile-homicide/index.html?hpt=hp_bn1",
			   "Boy kills woman, 90, for yelling",
			   "(CNN) -- \"I killed that lady,\" the 10-year-old boy told a Pennsylvania state trooper, after a 90-year-old woman was found dead in the home of the boy's grandfather.\n\nTristen Kurilla, a fifth grader, made the chilling confession Saturday, police said, after his mother brought him to the Pennsylvania State Police Barracks in Honesdale, about 140 miles north of Philadelphia.\n\nNow, Kurilla is being held at the Wayne County Correctional Facility and charged as an adult with criminal homicide, the Wayne County district attorney's office said. The boy is separated from adult offenders and is being constantly supervised, CNN affiliate WBRE reported.\n\nThe boy admitted to grabbing a wooden cane, holding it against 90-year-old Helen Novak's throat for several seconds and punching her in the throat and stomach, according to the police affidavit.\n\nKurilla told police he was angry at Novak because she had yelled at him when he entered her room. He said he wanted to ask her a question.\n\nWere you tryi"
			  ],
			  [
			   "http://www.cnn.com/2014/10/15/justice/connecticut-bus-knife-shooting/index.html",
			   "Connecticut: Man pulls knife on bus, gets shot by cop",
			   "(CNN) -- A man pulled out a knife on a bus, leading to a melee that ended with a trooper shooting him dead.\n\nThe incident took place Tuesday night on Interstate 95 in Norwalk, Connecticut. For reasons still unknown, a man brandished a knife on a tour bus, Connecticut State Police Lt. Paul Vance said.\n\nAnother passenger tried to take the knife away from the man, and the two got into an altercation. The bus driver spotted a state trooper along the highway and flagged the trooper down.\n\nAs the driver stopped the bus, the suspect and the passenger involved in the altercation tumbled off the bus and onto the roadway, Vance said.\n\nAs the trooper approached the bus, the suspect lunged toward the trooper with the knife, Vance said. The trooper then opened fire on the suspect, who later died at a hospital.\n\nThe tour bus was headed from New York to a casino in Connecticut.\n\nThree passengers, including the one involved in the altercation, suffered injuries that were not life-threatening, Vance sa"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/14/justice/new-benghazi-charges-khatallah/index.html",
			   "17 new charges filed in Benghazi attacks",
			   "Washington (CNN) -- Federal authorities filed 17 new charges against Ahmed Abu Khatallah, alleging that he was the ringleader of twin 2012 attacks on U.S. diplomatic and CIA compounds in Benghazi that killed four Americans.\n\nA new indictment against Khatallah, 43, provides new details of the attack and what federal prosecutors say was his role in leading 20 armed men in the attacks carried out over more than seven hours. Previously, prosecutors charged him with a single count of providing material support to terrorists.\n\nAccording to the indictment, Khatallah conspired with others \"on or before Sept. 11, 2012\" to attack the U.S. diplomatic post. \"He believed the facility was being used to collect intelligence, that he viewed the U.S. intelligence actions in Benghazi as illegal,\" the document said.\n\n\"These additional charges reflect Ahmed Abu Khattalah's integral role in the attack on U.S. facilities in Benghazi, which led to the deaths of four brave Americans,\" said Attorney General Er"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/14/justice/new-benghazi-charges-khatallah/index.html?eref=edition",
			   "17 charges filed in Benghazi attacks",
			   "Washington (CNN) -- Federal authorities filed 17 new charges against Ahmed Abu Khatallah, alleging that he was the ringleader of twin 2012 attacks on U.S. diplomatic and CIA compounds in Benghazi that killed four Americans.\n\nA new indictment against Ahmed Abu Khatallah, 43, provides new details of the attack and what federal prosecutors say was his role in leading 20 armed men in the attacks carried out over more than seven hours. Previously, prosecutors charged him with a single count of providing material support to terrorists.\n\nAccording to the indictment, Khatallah conspired with others \"on or before Sept. 11, 2012\" to attack the U.S. diplomatic post. \"He believed the facility was being used to collect intelligence, that he viewed the U.S. intelligence actions in Benghazi as illegal,\" the document said.\n\n\"These additional charges reflect Ahmed Abu Khattalah's integral role in the attack on U.S. facilities in Benghazi, which led to the deaths of four brave Americans,\" said Attorney "
			  ],
			  [
			   "http://www.cnn.com/2014/10/14/justice/new-benghazi-charges-khatallah/index.html",
			   "17 new charges against suspected Benghazi ringleader",
			   "Washington (CNN) -- Federal authorities filed 17 new charges against Ahmed Abu Khatallah, alleging that he was the ringleader of twin 2012 attacks on U.S. diplomatic and CIA compounds in Benghazi that killed four Americans.\n\nA new indictment against Ahmed Abu Khatallah, 43, provides new details of the attack and what federal prosecutors say was his role in leading 20 armed men in the attacks carried out over more than seven hours. Previously, prosecutors charged him with a single count of providing material support to terrorists.\n\nAccording to the indictment, Khatallah conspired with others \"on or before Sept. 11, 2012\" to attack the U.S. diplomatic post. \"He believed the facility was being used to collect intelligence, that he viewed the U.S. intelligence actions in Benghazi as illegal,\" the document said.\n\n\"These additional charges reflect Ahmed Abu Khattalah's integral role in the attack on U.S. facilities in Benghazi, which led to the deaths of four brave Americans,\" said Attorney "
			  ],
			  [
			   "http://us.cnn.com/2014/10/14/justice/pennsylvania-juvenile-homicide/index.html?hpt=hp_t2",
			   "Boy, 10: 'I killed that lady'",
			   "(CNN) -- \"I killed that lady,\" the 10-year-old boy told a Pennsylvania state trooper, after a 90-year-old woman was found dead in the home of the boy's grandfather.\n\nTristen Kurilla, a fifth grader, made the chilling confession Saturday, police said, after his mother brought him to the Pennsylvania State Police Barracks in Honesdale, about 140 miles north of Philadelphia.\n\nNow, Kurilla is being held at the Wayne County Correctional Facility and charged as an adult with criminal homicide, the Wayne County district attorney's office said. The boy is separated from adult offenders and is being constantly supervised, CNN affiliate WBRE reported.\n\nThe boy admitted to grabbing a wooden cane, holding it against 90-year-old Helen Novak's throat for several seconds and punching her in the throat and stomach, according to the police affidavit.\n\nKurilla told police he was angry at Novak because she had yelled at him when he entered her room. He said he wanted to ask her a question.\n\nWere you tryi"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/14/justice/pennsylvania-juvenile-homicide/index.html?eref=edition",
			   "Boy, 10, 'admits killing woman'",
			   "(CNN) -- \"I killed that lady,\" the 10-year-old boy told a Pennsylvania state trooper, after a 90-year-old woman was found dead in the home of the boy's grandfather.\n\nTristen Kurilla made the chilling confession Saturday, police said, after his mother brought him to the Pennsylvania State Police Barracks in Honesdale, about 140 miles north of Philadelphia.\n\nNow, Kurilla is being held at the Wayne County Correctional Facility and is being charged as an adult with criminal homicide, the Wayne County district attorney's office said.\n\nThe boy admitted to grabbing a wooden cane, holding it against 90-year-old Helen Novak's throat for several seconds and punching her in the throat and stomach, according to the police affidavit.\n\nKurilla told police he was angry at Novak because she had yelled at him when he entered her room.\n\nWere you trying to kill her? the trooper asked the boy.\n\n\"No, I was only trying to hurt her,\" Kurilla replied, according to the affidavit.\n\nThe boy was ordered to be hel"
			  ],
			  [
			   "http://www.cnn.com/2014/10/14/justice/pennsylvania-juvenile-homicide/index.html",
			   "Cops: Boy, 10, kills woman, 90, for yelling at him",
			   "(CNN) -- \"I killed that lady,\" the 10-year-old boy told a Pennsylvania state trooper, after a 90-year-old woman was found dead in the home of the boy's grandfather.\n\nTristen Kurilla made the chilling confession Saturday, police said, after his mother brought him to the Pennsylvania State Police Barracks in Honesdale, about 140 miles north of Philadelphia.\n\nNow, Kurilla is being held at the Wayne County Correctional Facility and is being charged as an adult with criminal homicide, the Wayne County district attorney's office said.\n\nThe boy admitted to grabbing a wooden cane, holding it against 90-year-old Helen Novak's throat for several seconds and punching her in the throat and stomach, according to the police affidavit.\n\nKurilla told police he was angry at Novak because she had yelled at him when he entered her room.\n\nWere you trying to kill her? the trooper asked the boy.\n\n\"No, I was only trying to hurt her,\" Kurilla replied, according to the affidavit.\n\nThe boy was ordered to be hel"
			  ],
			  [
			   "http://www.cnn.com/2014/10/14/justice/pennsylvania-juvenile-homicide/index.html",
			   "Cops: Pennsylvania boy kills 90-year-old woman",
			   "(CNN) -- \"I killed that lady,\" the 10-year-old boy told a Pennsylvania state trooper, after a 90-year-old woman was found dead in the home of the boy's grandfather.\n\nTristen Kurilla made the chilling confession Saturday, police said, after his mother brought him to the Pennsylvania State Police Barracks in Honesdale, about 140 miles north of Philadelphia.\n\nNow, Kurilla is being held at the Wayne County Correctional Facility and is being charged as an adult with criminal homicide, the Wayne County district attorney's office said.\n\nThe boy admitted to grabbing a wooden cane, holding it against 90-year-old Helen Novak's throat for several seconds and punching her in the throat and stomach, according to the police affidavit.\n\nKurilla told police he was angry at Novak because she had yelled at him when he entered her room.\n\nWere you trying to kill her? the trooper asked the boy.\n\n\"No, I was only trying to hurt her,\" Kurilla replied, according to the affidavit.\n\nThe boy was ordered to be hel"
			  ],
			  [
			   "http://www.cnn.com/2014/10/14/us/justice-department-legal-advice/index.html",
			   "Justice Department stops waivers preventing appeal",
			   "(CNN) -- The Justice Department says it will no longer ask defendants who plead guilty to waive their right to appeal convictions because of bad legal advice.\n\nThe department issued a memo Tuesday to ban the practice in 35 U.S. attorney offices that still used the waivers, which already had been discontinued in the majority of the department's 94 jurisdictions around the nation. The new policy was announced by Attorney General Eric Holder and Deputy Attorney General James Cole in a conference call with federal prosecutors.\n\nLegal advocates have criticized the practice as unethical and as further stacking the deck in favor of the government by putting defendants at a disadvantage. Many lower-income defendants rely on strained legal resources for their defense -- the waivers effectively insulate defense attorneys from review of the courts. Plea agreements settle the vast majority of U.S. federal court charges.\n\nFederal prosecutors have long defended the waivers by saying they discourage "
			  ],
			  [
			   "http://us.cnn.com/2014/10/04/justice/virginia-hannah-graham-case/index.html?hpt=hp_c2",
			   "Hannah Graham's mother: Tell us where she is",
			   "(CNN) -- The parents of missing University of Virginia student Hannah Graham issued a new appeal for the whereabouts of their daughter on Saturday, saying despite an arrest in the case, thousands of tips and hours of searches, someone must have critical information yet to be revealed.\n\n\"Somebody listening to me today either knows where Hannah is, or knows someone who has that information,\" the mother, Sue Graham, says in a video released by the city of Charlottesville, home to the university. \"We appeal to you to come forward and tell us where Hannah can be found.\"\n\n\"Please, please, please help end this nightmare for all of us,\" she continues. \"Please help us to bring Hannah home.\"\n\nHannah Graham, an 18-year-old in her second year at the university, was last seen September 13 in area of Charlottesville known as the Downtown Mall.\n\nHannah Graham's disappearance: What we know\n\nEleven days later, police in Texas arrested a suspect in the case, Jesse Matthew, 32. Matthew, who investigators"
			  ],
			  [
			   "http://us.cnn.com/2014/10/09/justice/virginia-missing-women/index.html?hpt=hp_c2",
			   "Source: Police seize cab of suspect",
			   "(CNN) -- Police recently seized a cab owned by Jesse Matthew, the last person seen with missing University of Virginia student Hannah Graham and who also has been linked to another college student's death in 2009, a source with knowledge of the investigation told CNN.\n\nAccording to the source, Matthew was driving the cab in 2009, when 20-year-old Virginia Tech student Morgan Harrington went missing after attending a Metallica concert in Charlottesville. She was last seen hitchhiking along U.S. 29 outside of Charlottesville, and her remains were found on a farm months later.\n\nNo arrests have been made in her case, and the cause of her death still is under investigation. Yet, late last month, DNA evidence linked Matthew to Harrington's death, a law enforcement source told CNN.\n\nAround that time, Matthew was a private contractor for the owner of a local, now-defunct cab company called Access.\n\nPolice have spoken to several cab drivers who worked with Matthew then, the source with knowledg"
			  ]
			 ]
			}
			,politics: {
			 "name": "politics",
			 "expectedCat": "politics",
			 "visits": [
			  [
			   "http://us.cnn.com/2014/10/22/politics/hillary-clinton-iowa-october-29/index.html?hpt=hp_t2",
			   "Hillary Clinton returning to Iowa",
			   "Washington (CNN) -- Hillary Clinton is headed back to Iowa on October 29, according to a Democratic source with knowledge of the trip.\n\nThe former first lady's visit comes just a little more than a month since she returned to Iowa after a six year hiatus. Clinton stumped for Bruce Braley, Iowa's Democratic Senate nominee, and other Iowa Democrats at the 37th annual - and final - Harkin Steak Fry in September. She had last visited the state in 2008.\n\nBraley is currently locked in a tight race to succeed Harkin in the Senate with Republican Joni Ernst.\n\nA number of big name Democrats have come to Iowa to help Braley. Vice President Joe Biden will stump for the Senate hopeful at an event in Davenport on Monday and first lady Michelle Obama stumped for him earlier this week.\n\nAny visit Clinton makes to Iowa - the crucially important first-in-the-nation caucus state - is immediately seen through the lens of 2016 politics given that the former first lady is widely seen as the Democratic fron"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/politics/hillary-clinton-iowa-october-29/index.html",
			   "Hillary Clinton is returning to Iowa",
			   "Washington (CNN) -- Hillary Clinton is headed back to Iowa on October 29, according to a Democratic source with knowledge of the trip.\n\nThe former first lady's visit comes just a little more than a month since she returned to Iowa after a six year hiatus. Clinton stumped for Bruce Braley, Iowa's Democratic Senate nominee, and other Iowa Democrats at the 37th annual - and final - Harkin Steak Fry in September. She had last visited the state in 2008.\n\nBraley is currently locked in a tight race to succeed Harkin in the Senate with Republican Joni Ernst.\n\nA number of big name Democrats have come to Iowa to help Braley. Vice President Joe Biden will stump for the Senate hopeful at an event in Davenport on Monday and first lady Michelle Obama stumped for him earlier this week.\n\nAny visit Clinton makes to Iowa - the crucially important first-in-the-nation caucus state - is immediately seen through the lens of 2016 politics given that the former first lady is widely seen as the Democratic fron"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/politics/obama-dallas-ebola/index.html",
			   "Obama calls, thanks Ebola hospital workers in Dallas",
			   "Washington (CNN) -- President Barack Obama on Wednesday thanked health care workers at the hospital in Dallas where a patient died of Ebola and two nurses became infected with the virus earlier this month.\n\nIn a telephone call, Obama \"offered his personal thanks...on behalf of a grateful nation\" to workers at Texas Health Presbyterian Hospital, the facility where Thomas Eric Duncan was treated and later died from Ebola. After two nurses who treated him fell ill, officials began to question the hospital's safety practices.\n\nTexas Presbyterian's chief clinical officer told CNN that his hospital \"fell short\" in its care of Duncan. He said the hospital didn't conduct sufficient training in handling Ebola patients.\n\nThe 900-bed facility has seen its patient count dwindle to 300, CDC officials told CNN. The two nurses who were infected were transferred to other hospitals.\n\nOn Wednesday Obama praised the Dallas workers' \"unflagging dedication\" and their \" tireless efforts to treat these patie"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/politics/dscc-back-in-kentucky/index.html",
			   "DSCC back on the air in Kentucky",
			   "(CNN) -- Democrats will soon return to the airwaves in Kentucky to back Alison Lundergan Grimes, according to a source at the Democratic Senatorial Congressional Committee.\n\nThe decision comes as Democrats insist polls show their candidate, Lundergan Grimes, can still win in her race against Senate Republican Leader Mitch McConnell.\n\nAs of last week, the DSCC had not purchased airtime for Lundergan Grimes at all through the end of the campaign. That news got out the morning after she was roundly criticized for awkwardly refusing to answer questions about whether she voted for President Barack Obama.\n\nBut polling suggests Lundergan Grimes is still competitive. A Courier-Journal/Survey USA poll of voters from Oct. 15-19 found McConnell up by just one point. The DSCC source said their polling suggests undecided voters are moving toward Grimes, though there's little public data to back that up.\n\nEven last week when they conceded they had no plans to air TV ads for Grimes, national Democrat"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/22/politics/washington-security/index.html?eref=edition",
			   "Obama offers help",
			   "(CNN) -- Washington -- one of the world's most secure cities -- is reacting cautiously following the attacks at Canada's Parliament Hill.\n\nOne soldier who was shot at Canada's National War memorial, located across from the Parliament building, has died. The gunman was shot and killed on the scene inside Parliament Hill's Center Block.\n\nPresident Barack Obama was briefed on the situation in Ottawa and spoke to Canada's Prime Minister Stephen Harper on the phone Tuesday afternoon.\n\n\"The President offered any assistance Canada needed in responding to these attacks. Prime Minister Harper thanked the President and the two leaders discussed the assault and agreed to continue coordination between our governments moving forward,\" the White House said in a statement.\n\nSecretary of State John Kerry has also been briefed on the shootings, Mary Harf, the State Department's spokeswoman confirmed.\n\nAt the U.S. Capitol, which was the site of a deadly shooting in 1998, police are \"monitoring and track"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/politics/obama-dallas-ebola/index.html",
			   "Obama calls, thanks Dallas Ebola hospital workers",
			   "Washington (CNN) -- President Barack Obama on Wednesday thanked health care workers at the hospital in Dallas where a patient died of Ebola and two nurses became infected with the virus earlier this month.\n\nIn a telephone call, Obama \"offered his personal thanks...on behalf of a grateful nation\" to workers at Texas Health Presbyterian Hospital, the facility where Thomas Eric Duncan was treated and later died from Ebola. After two nurses who treated him fell ill, officials began to question the hospital's safety practices.\n\nTexas Presbyterian's chief clinical officer told CNN that his hospital \"fell short\" in its care of Duncan. He said the hospital didn't conduct sufficient training in handling Ebola patients.\n\nThe 900-bed facility has seen its patient count dwindle to 300, CDC officials told CNN. The two nurses who were infected were transferred to other hospitals.\n\nOn Wednesday Obama praised the Dallas workers' \"unflagging dedication\" and their \" tireless efforts to treat these patie"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/politics/florida-governors-debate/index.html",
			   "Bitter exchange over executions",
			   "Jacksonville, Florida (CNN) -- The third and final debate between Florida Republican Gov. Rick Scott and Democratic challenger Charlie Crist was dominated by personal attacks in one of the closest governors races in the country.\n\nIn the debate, hosted by CNN and affiliate WJXT in Jacksonville, the two candidates took aim at each other in a showdown that covered a wide range of topics, including economic policies, the death penalty, and voting rights for felons.\n\nDeath penalty\n\nA heated moment came when Crist accused Scott of delaying an execution so that his attorney general could attend a political fundraiser.\n\n\"She asked me to delay it because it didn't work on the dates that she thought it was going to be on,\" Scott said in response. \"She apologized.\"\n\nIn September 2013, Pam Bondi apologized for delaying the planned execution of Marshall Lee Gore, a notorious rapist and murderer, because it conflicted with a fundraiser.\n\nScott denied at the time that he knew the reason for the delay"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/politics/clinton-female-voters-colorado/index.html",
			   "Is this Hillary Clinton's new stump speech?",
			   "Washington (CNN) -- Hillary Clinton used her Tuesday appearance in Colorado, where experts see the female vote deciding a number of statewide races, to court women with a personal message about her life and her hopes for the future.\n\nClinton usually targets women voters in her appearances. But in Colorado, the former secretary of state and likely presidential candidate in 2016, spoke about how fortunate she felt to be born in America and the message she hopes to be able to leave with children.\n\nThe personal remarks, while focused on turning out voters for Democrats Mark Udall, John Hickenlooper and Andrew Romanoff, sounds a great deal like a presidential candidate and resembled a message Clinton could use should she run for president.\n\n\"I have had a great set of experiences. I have been very fortunate in my life, but the most fortunate thing besides the parents to whom I was born, is that I was born in America,\" Clinton said. \"I, from the moment of my birth, was blessed because of that"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/politics/washington-security/index.html",
			   "Norad raises alert posture after Canada attacks",
			   "(CNN) -- Washington -- one of the world's most secure cities -- is reacting cautiously following the attacks at Canada's Parliament Hill.\n\nOne soldier who was shot at Canada's National War memorial, located across from the Parliament building, has died. The gunman was shot and killed on the scene inside Parliament Hill's Center Block.\n\nPresident Barack Obama was briefed on the situation in Ottawa and spoke to Canada's Prime Minister Stephen Harper on the phone Tuesday afternoon.\n\nSecretary of State John Kerry has also been briefed on the shootings, Mary Harf, the State Department's spokeswoman confirmed.\n\nAt the U.S. Capitol, which was the site of a deadly shooting in 1998, police are \"monitoring and tracking\" developments in Canada. But as of now, they haven't modified their regular \"post 9-11 heightened state of alertness,\" according to U.S. Capitol Police spokeswoman Kim Schneider.\n\nCongress is on recess until next month's elections, though the Capitol remains busy with tourists, st"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/politics/washington-security/index.html",
			   "Norad raises alert posture for U.S. after Canada attacks",
			   "(CNN) -- Following the attacks at Canada's Parliament Hill, Washington -- one of the world's most secure cities -- is reacting cautiously.\n\nOne soldier who was shot at Canada's National War memorial, located across from the Parliament building, has died. The gunman was shot and killed on the scene inside Parliament Hill's Center Block.\n\nPresident Barack Obama was briefed on the situation in Ottawa and has spoken to Canada's Prime Minister Stephen Harper on the phone Tuesday afternoon.\n\nSecretary of State John Kerry has also been briefed on the shootings, Mary Harf, the State Department's spokeswoman confirmed.\n\nAt the U.S. Capitol, which was the site of a deadly shooting in 1998, police are \"monitoring and tracking\" developments in Canada. But as of now, they haven't modified their regular \"post 9-11 heightened state of alertness,\" according to U.S. Capitol Police spokeswoman Kim Schneider.\n\nCongress is on recess until next month's elections, though the Capitol remains busy with touris"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/politics/gop-ties-dems-to-obama-and-pelosi/index.html",
			   "Obama, Pelosi star in GOP ads",
			   "Washington (CNN) -- President Barack Obama and Nancy Pelosi are steering clear of competitive House districts but Republicans are still making sure their presence is felt.\n\nThe president and House Democratic leader are star players in television commercials the GOP is pumping into these districts in the final stretch before the midterm elections.\n\nIt's not surprising that the GOP is tying the president, whose approval ratings are at records lows, to vulnerable House and Senate Democrats.\n\nBut Pelosi's image pops up even more than the president's in the latest round of Republican campaign ads targeting Democratic incumbents and challengers. One senior House GOP strategist tells CNN that while Obama is unpopular, their internal polls show that Pelosi remains even more \"toxic.\"\n\nObama on the airwaves\n\nOn Tuesday, the National Republican Congressional Committee unveiled a new television commercial attacking West Virginia Democratic Rep. Nick Rahall that includes a video clip of Obama decla"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/politics/gop-ties-dems-to-obama-and-pelosi/index.html",
			   "Obama, Pelsoi star in GOP ads",
			   "Washington (CNN) -- President Barack Obama and Nancy Pelosi are steering clear of competitive House districts but Republicans are still making sure their presence is felt.\n\nThe president and House Democratic leader are star players in television commercials the GOP is pumping into these districts in the final stretch before the midterm elections.\n\nIt's not surprising that the GOP is tying the president, whose approval ratings are at records lows, to vulnerable House and Senate Democrats.\n\nBut Pelosi's image pops up even more than the president's in the latest round of Republican campaign ads targeting Democratic incumbents and challengers. One senior House GOP strategist tells CNN that while Obama is unpopular, their internal polls show that Pelosi remains even more \"toxic.\"\n\nObama on the airwaves\n\nOn Tuesday, the National Republican Congressional Committee unveiled a new television commercial attacking West Virginia Democratic Rep. Nick Rahall that includes a video clip of Obama decla"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/politics/ebola-czar/index.html",
			   "Day one for Ebola czar Ron Klain",
			   "Washington (CNN) -- The seasoned Democratic operative President Barack Obama tapped last week to head his administration's Ebola fight got to work on Wednesday, though Ron Klain's new job is expected to unfold out of public sight.\n\nThe so-called \"Ebola czar\" -- termed an \"Ebola Response Coordinator\" by the White House -- will meet with Obama and other top advisers Wednesday afternoon in the Oval Office to discuss the global crisis, which has Americans worried about their own safety and skeptical of the government's ability to respond.\n\nKlain's appointment last week was meant partly to quell public anxiety about the virus. The announcement came after calls from lawmakers to name a central organizing \"czar\" that could ensure the various health arms of the administration were working in concert.\n\nObama initially resisted, saying his top homeland security aide Lisa Monaco was doing a sufficient job in managing the response alongside her other tasks, which include a major role advising the "
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/politics/washington-security/index.html",
			   "Washington monitoring Canada shootings",
			   "(CNN) -- Washington -- one of the world's most secure cities -- is reacting cautiously to the shootings inside Canada's Parliament building.\n\nPresident Barack Obama was briefed on the situation in Ottawa but the White House has said nothing publicly about the shootings.\n\nAt the U.S. Capitol, which was the site of a deadly shooting in 1998, police are \"monitoring and tracking\" developments in Canada. But as of now, they haven't modified their regular \"post 9-11 heightened state of alertness,\" according to U.S. Capitol Police spokeswoman Kim Schneider.\n\nCongress is on recess until next month's elections, though the Capitol remains busy with tourists, staff and other workers.\n\nThe Canadian embassy in Washington, located a few blocks from the Capitol along Pennsylvania Avenue, is on lockdown, according to a message posted on Twitter.\n\nThe FBI is asking all field offices to raise their alert posture and reminding them of a recent bulletin urging vigilance in the wake of ISIS chatter calling"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/politics/ebola-czar/index.html",
			   "Day one for Ebola czar",
			   "Washington (CNN) -- The seasoned Democratic operative President Barack Obama tapped last week to head his administration's Ebola fight got to work on Wednesday, though Ron Klain's new job is expected to unfold out of public sight.\n\nThe so-called \"Ebola czar\" -- termed an \"Ebola Response Coordinator\" by the White House -- will meet with Obama and other top advisers Wednesday afternoon in the Oval Office to discuss the global crisis, which has Americans worried about their own safety and skeptical of the government's ability to respond.\n\nKlain's appointment last week was meant partly to quell public anxiety about the virus. The announcement came after calls from lawmakers to name a central organizing \"czar\" that could ensure the various health arms of the administration were working in concert.\n\nObama initially resisted, saying his top homeland security aide Lisa Monaco was doing a sufficient job in managing the response alongside her other tasks, which include a major role advising the "
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/politics/koch-brothers-final-ad-buy-competitive-senate-races/index.html",
			   "Koch PAC ads 'close out' with $6.5 million for 6 races",
			   "Washington (CNN) -- A super PAC backed by the billionaire brothers Charles and David Koch is dropping $6.5 million into six competitive Senate races in a final ad push to send Republican candidates to the upper chamber.\n\nThe television ads, which will air in Alaska, Arkansas, North Carolina, Colorado, Iowa and New Hampshire, link Democratic candidates in each race to President Barack Obama, reinforcing Republican messaging throughout the 2014 midterm season that has pushed the Democratic candidates in each of those states to keep their distance from the President.\n\nLocal residents are the face of ads in the six states, saying either \"there are lots of reasons\" or \"there are many reasons\" why the Democrat doesn't deserve their vote. And the voters go on to say in similar form that, \"A vote for [insert Democratic candidate here] is a vote for President Obama.\"\n\nThe ads also close by directly endorsing the Republican candidate for Senate in each race, a push not seen from groups in the Ko"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/politics/koch-brothers-final-ad-buy-competitive-senate-races/index.html",
			   "Koch brothers make final push in tight Senate races",
			   "Washington (CNN) -- A super PAC backed by the billionaire brothers Charles and David Koch is dropping $6.5 million into six competitive Senate races in a final ad push to send Republican candidates to the upper chamber.\n\nThe television ads, which will air in Alaska, Arkansas, North Carolina, Colorado, Iowa and New Hampshire, link Democratic candidates in each race to President Barack Obama, reinforcing Republican messaging throughout the 2014 midterm season that has pushed the Democratic candidates in each of those states to keep their distance from the President.\n\nLocal residents are the face of ads in the six states, saying either \"there are lots of reasons\" or \"there are many reasons\" why the Democrat doesn't deserve their vote. And the voters go on to say in similar form that, \"A vote for [insert Democratic candidate here] is a vote for President Obama.\"\n\nThe ads also close by directly endorsing the Republican candidate for Senate in each race, a push not seen from groups in the Ko"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/politics/thom-tillis-empty-chair-debate/index.html",
			   "Hagan absent, Tillis faces off against empty chair",
			   "Washington (CNN) -- This is not your Clint Eastwood empty chair moment from the 2012 Republican National Convention -- but it's close.\n\nRepublican candidate Thom Tillis decided he would still show up Tuesday to a fourth North Carolina Senate debate -- despite being opponent-less. And the state's Time Warner Cable News gave Tillis an hour of statewide TV time, and left an empty chair next to Tillis.\n\nDemocratic Sen. Kay Hagan, who faced off against Tillis in three debates, had already declined this summer the invitation for a fourth debate.\n\nBut that didn't stop Republicans in the state from pouncing on Hagan's decision not to appear, saying in statements that she \"skipped\" the debate.\n\n\"With her campaign in full-panic mode, it's telling that Sen. Kay Hagan skipped tonight's debate,\" Tillis' campaign manager Jordan Shaw said in a statement. \"\"The empty chair in Kay Hagan's place tonight is symbolic of her record of failing the people of North Carolina in the U.S. Senate.\"\n\nThe state GOP"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/politics/joni-ernst-new-ad/index.html",
			   "Ernst's new hog ad: 'Too many politicians full of...'",
			   "(CNN) -- Republican U.S. Senate candidate Joni Ernst is making the internet squeal, again, with a new ad that features her dozens of hogs.\n\nWhile Ernst doesn't resurrect her experience castrating hogs as she did in her previous ad \"Squeal,\" she does get a little sassy by nearing an expletive, leaving you to fill in the blank, \"Too many typical politicians, hogging, wasting and full of ... Well, let's just say, bad ideas.\"\n\nThere's also a wisely timed stink eye from a pig himself as she recounts Washington's dysfunction.\n\nThe new ad titled \"Lot\" was filmed in southwest Iowa with the same pigs she used in 'Squeal' and will begin airing in key markets across Iowa.\n\nCheck out the original \"Squeal\" below.\n\n.\n\n. ."
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/politics/joni-ernst-new-ad/index.html",
			   "Ernst's new hog ad:' too many politicians full of...'",
			   "(CNN) -- Republican U.S. Senate candidate Joni Ernst is making the internet squeal, again, with a new ad that features her dozens of hogs.\n\nWhile Ernst doesn't resurrect her experience castrating hogs as she did in her previous ad \"Squeal,\" she does get a little sassy by nearing an expletive, leaving you to fill in the blank, \"Too many typical politicians, hogging, wasting and full of ... Well, let's just say, bad ideas.\"\n\nThere's also a wisely timed stink eye from a pig himself as she recounts Washington's dysfunction.\n\nThe new ad titled \"Lot\" was filmed in southwest Iowa with the same pigs she used in 'Squeal' and will begin airing in key markets across Iowa.\n\nCheck out the original \"Squeal\" below.\n\n.\n\n. ."
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/politics/thom-tillis-empty-chair-debate/index.html",
			   "Tillis faces off against empty chair in NC debate",
			   "Washington (CNN) -- This is not your Clint Eastwood empty chair moment from the 2012 Republican National Convention -- but it's close.\n\nRepublican candidate Thom Tillis decided he would still show up Tuesday to a fourth North Carolina Senate debate -- despite being opponent-less. And the state's Time Warner Cable News gave Tillis an hour of statewide TV time, and left an empty chair next to Tillis.\n\nDemocratic Sen. Kay Hagan, who faced off against Tillis in three debates, had already declined this summer the invitation for a fourth debate.\n\nBut that didn't stop Republicans in the state from pouncing on Hagan's decision not to appear, saying in statements that she \"skipped\" the debate.\n\n\"With her campaign in full-panic mode, it's telling that Sen. Kay Hagan skipped tonight's debate,\" Tillis' campaign manager Jordan Shaw said in a statement. \"\"The empty chair in Kay Hagan's place tonight is symbolic of her record of failing the people of North Carolina in the U.S. Senate.\"\n\nThe state GOP"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/politics/florida-governors-debate/index.html",
			   "Florida debate turns bitter over executions",
			   "Jacksonville, Florida (CNN) -- The third and final debate between Florida Republican Gov. Rick Scott and Democratic challenger Charlie Crist was dominated by personal attacks in one of the closest governors races in the country.\n\nIn the debate, hosted by CNN and affiliate WJXT in Jacksonville, the two candidates took aim at each other in a showdown that covered a wide range of topics, including economic policies, the death penalty, and voting rights for felons.\n\nDeath penalty\n\nA heated moment came when Crist accused Scott of delaying an execution so that his attorney general could attend a political fundraiser.\n\n\"She asked me to delay it because it didn't work on the dates that she thought it was going to be on,\" Scott said in response. \"She apologized.\"\n\nIn September 2013, Pam Bondi apologized for delaying the planned execution of Marshall Lee Gore, a notorious rapist and murderer, because it conflicted with a fundraiser.\n\nScott denied at the time that he knew the reason for the delay"
			  ],
			  [
			   "http://us.cnn.com/2014/10/22/politics/warren-treated-differently/index.html?hpt=hp_t2",
			   "Warren: I've been treated differently",
			   "Denver (CNN) -- Sen. Elizabeth Warren told CNN she has been treated differently as a woman in the clubby upper chamber — echoing the general sentiments of her colleague Sen. Kirsten Gillibrand, who wrote about sexism in the Senate in a recent book.\n\nDuring a wide-ranging interview on the Colorado campaign trail—where she was stumping for endangered incumbent Sen. Mark Udall—CNN asked Warren whether she had experienced any different treatment as a woman. \"Yes,\" she said. Would she elaborate? \"Nope.\" But was it surprising? \"Not really, I wish it were,\" she told CNN. \"But it's hard to change these big, male dominated institutions. What I am very happy about is that there are now enough women in the United States Senate to bring change to that place and I think that's just powerfully important.\" There are now 20 women in the senate.\n\nWarren added: \"You know, others have said it before me. If you don't have a seat at the table, you're probably on the menu.\" Warren's comments did make one cl"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/bestoftv/2014/10/22/newday-inside-politics-fire-erupts-on-debate-night.cnn",
			   "Fire erupts on debate night",
			   "__"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/politics/maine-eliot-cutler-independent/index.html",
			   "Independent candidate: No 'bromance' with GOP opponent",
			   "Washington (CNN) -- Don't expect a chest bump on election night this year in Maine.\n\nIndependent governor candidate Eliot Cutler denied a close relationship between himself and the Republican incumbent, Paul LePage, during their final debate Tuesday night.\n\n\"I would not suggest -- and I think he would agree, that we don't have a bromance,\" Cutler told CNN's Dana Bash while distancing himself from the man he high-fived and hugged during their first debate earlier this month. \"Four years ago ... we ended up with Paul LePage as governor. We shouldn't make that mistake again.\"\n\nLePage agreed there's a lack of brotherly love between the two in a humorous moment during an hour-long debate, sponsored by WMTV, CNN, and WABI, along with Democratic candidate Rep. Mike Michaud.\n\nIt's a tight race between LePage and Michaud. Cutler -- who hasn't registered above 20 percent in most recent polls -- has caused ire among Pine Tree state Democrats, who think he's splitting the anti-LePage vote that wou"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/politics/obama-mission-creep/index.html",
			   "'Mission creep' on Ebola, ISIS",
			   "Washington (CNN) -- President Barack Obama is loading new missions on the U.S. military with fast-expanding mandates and no certain end dates as he grapples with the threats posed by ISIS and Ebola.\n\nEvolving operations in the Middle East and west Africa are causing some supporters to ask whether the president, a notoriously reluctant warrior dedicated to ending foreign entanglements and getting troops home, has changed his mind.\n\nBy committing the U.S. military to two new crises, with no clear exit strategy, Obama risks the same perilous slide into \"mission creep\" that hounded some predecessors, who got sucked ever deeper into wars in Vietnam, Somalia and Iraq.\n\nAlready, there are mounting questions about whether the strategy is working. A former top U.S. counterterror official told CNN Tuesday that the \"imminent threat\" from one of the groups targeted in an initial wave of airstrikes in Syria hasn't abated.\n\nWhen Obama announced America's new war in August, he said U.S. air strikes w"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/politics/nunn-perdue-georgia-senate-race-poll-dead-heat/index.html",
			   "Poll: Georgia Senate race statistically tied",
			   "Washington (CNN) -- Neither candidate in the crucial Georgia Senate race appears poised to cruise to victory in less than two weeks, a new poll released Wednesday shows.\n\nDemocratic candidate Michelle Nunn and Republican foe David Perdue are locked in a statistical tie as Nunn snags a slim two-point lead in the SurveyUSA poll conducted for CNN affiliate in Atlanta WXIA. That lead is within the poll's 4.1 percentage point margin of error.\n\nAnd if the Nov. 4 ballot count stays in line with the poll numbers, Nunn and Perdue are headed for a runoff -- in January.\n\nOne of the candidates must crack the 50 percent threshold in the vote count on Election Day to avoid a runoff on Jan. 6 -- or three days after the next Congress meets for the first time.\n\nNunn leads Perdue by two points with 46 percent of the vote, and the Libertarian candidate Amanda Swafford appears to be keeping either candidate from reaching the crucial 50 percent number.\n\nSwafford is pulling in four percent of support in the"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/politics/north-korea-american-release/index.html",
			   "Emotional reunion for American freed from N. Korea",
			   "(CNN) -- After five months of detention in North Korea, Jeffrey Fowle arrived home in Ohio early Wednesday for an emotional reunion with his family.\n\nStepping off the plane at Wright-Patterson Air Force Base and onto the tarmac, he was embraced by family members, including his children.\n\n\"We're thrilled; we're overjoyed,\" said Jim Shihady, assistant pastor of Bethel Baptist Church, which the Fowle family attends in Miamisburg, speaking Tuesday to CNN affiliate WHIO.\n\n\"My phone's been ringing. The texts have been coming in, and people wanting to make sure we've heard the good news.\"\n\nNorth Korea accused Fowle of leaving a Bible at a club for foreign sailors and interpreted the act as a violation of law.\n\nAlthough the hermetic state contains some state-controlled churches, the totalitarian regime forbids independent religious activities, viewing them as potential threats to its authority.\n\nSo Fowle, 56, languished in detention, one of three Americans imprisoned in the country.\n\nChange of"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/politics/north-korea-american-release/index.html",
			   "Jeffrey Fowle, American held by North Korea, returns home",
			   "(CNN) -- After five months of detention in North Korea, Jeffrey Fowle arrived home in Ohio early Wednesday for an emotional reunion with his family.\n\nStepping off the plane at Wright-Patterson Air Force Base and onto the tarmac, he was embraced by family members, including his children.\n\n\"We're thrilled; we're overjoyed,\" said Jim Shihady, assistant pastor of Bethel Baptist Church, which the Fowle family attends in Miamisburg, speaking Tuesday to CNN affiliate WHIO.\n\n\"My phone's been ringing. The texts have been coming in, and people wanting to make sure we've heard the good news.\"\n\nNorth Korea accused Fowle of leaving a Bible at a club for foreign sailors and interpreted the act as a violation of law.\n\nAlthough the hermetic state contains some state-controlled churches, the totalitarian regime forbids independent religious activities, viewing them as potential threats to its authority.\n\nSo Fowle, 56, languished in detention, one of three Americans imprisoned in the country.\n\nChange of"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/politics/maine-eliot-cutler-independent/index.html",
			   "Independent candidate denies 'bromance' with GOP foe",
			   "Washington (CNN) -- Don't expect a chest bump on election night this year in Maine.\n\nIndependent governor candidate Eliot Cutler denied a close relationship between himself and the Republican incumbent, Paul LePage, during their final debate Tuesday night.\n\n\"I would not suggest -- and I think he would agree, that we don't have a bromance,\" Cutler told CNN's Dana Bash while distancing himself from the man he high-fived and hugged during their first debate earlier this month. \"Four years ago ... we ended up with Paul LePage as governor. We shouldn't make that mistake again.\"\n\nLePage agreed there's a lack of brotherly love between the two in a humorous moment during an hour-long debate, sponsored by WMTV, CNN, and WABI, along with Democratic candidate Rep. Mike Michaud.\n\nIt's a tight race between LePage and Michaud. Cutler -- who hasn't registered above 20 percent in most recent polls -- has caused ire among Pine Tree state Democrats, who think he's splitting the anti-LePage vote that wou"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/bestoftv/2014/10/22/lead-politics-panel-tanden-kristol.cnn",
			   "Obama's 'classic Washington gaffe'",
			   "__"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/politics/north-korea-american-release/index.html",
			   "Jeffrey Fowle, American held by North Korea, back home",
			   "(CNN) -- [Breaking news update posted at 6:46 a.m. ET]\n\nA plane carrying Jeffrey Fowle, released by North Korea after five months in detention, has landed at Ohio's Wright-Patterson Air Force Base.\n\n[Previous story posted at 6:03 a.m. ET]\n\nIn Jeffrey Fowle's hometown of Miamisburg, Ohio, north of Cincinnati, the sense of excitement and relief is palpable.\n\n\"We're thrilled; we're overjoyed,\" said Jim Shihady, assistant pastor of Bethel Baptist Church, which the Fowle family attends.\n\n\"My phone's been ringing. The texts have been coming in and people wanting to make sure we've heard the good news,\" Shihady told CNN affiliate WHIO.\n\nThe good news is that Fowle is coming home from North Korea, where he spent five months in detention, accused of leaving a Bible at a club for foreign sailors.\n\nNorth Korea interpreted the act as a violation of law. Because even though the hermetic state contains a number of state-controlled churches, the totalitarian regime forbids independent religious activ"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/22/politics/north-korea-american-release/index.html?eref=edition",
			   "Freed N. Korea detainee lands in U.S.",
			   "(CNN) -- [Breaking news update posted at 6:46 a.m. ET]\n\nA plane carrying Jeffrey Fowle, released by North Korea after five months in detention, has landed at Ohio's Wright-Patterson Air Force Base.\n\n[Previous story posted at 6:03 a.m. ET]\n\nIn Jeffrey Fowle's hometown of Miamisburg, Ohio, north of Cincinnati, the sense of excitement and relief is palpable.\n\n\"We're thrilled; we're overjoyed,\" said Jim Shihady, assistant pastor of Bethel Baptist Church, which the Fowle family attends.\n\n\"My phone's been ringing. The texts have been coming in and people wanting to make sure we've heard the good news,\" Shihady told CNN affiliate WHIO.\n\nThe good news is that Fowle is coming home from North Korea, where he spent five months in detention, accused of leaving a Bible at a club for foreign sailors.\n\nNorth Korea interpreted the act as a violation of law. Because even though the hermetic state contains a number of state-controlled churches, the totalitarian regime forbids independent religious activ"
			  ],
			  [
			   "http://us.cnn.com/2014/10/22/politics/north-korea-american-release/index.html?hpt=hp_t2",
			   "American held by N. Korea is home",
			   "(CNN) -- [Breaking news update posted at 6:46 a.m. ET]\n\nA plane carrying Jeffrey Fowle, released by North Korea after five months in detention, has landed at Ohio's Wright-Patterson Air Force Base.\n\n[Previous story posted at 6:03 a.m. ET]\n\nIn Jeffrey Fowle's hometown of Miamisburg, Ohio, north of Cincinnati, the sense of excitement and relief is palpable.\n\n\"We're thrilled; we're overjoyed,\" said Jim Shihady, assistant pastor of Bethel Baptist Church, which the Fowle family attends.\n\n\"My phone's been ringing. The texts have been coming in and people wanting to make sure we've heard the good news,\" Shihady told CNN affiliate WHIO.\n\nThe good news is that Fowle is coming home from North Korea, where he spent five months in detention, accused of leaving a Bible at a club for foreign sailors.\n\nNorth Korea interpreted the act as a violation of law. Because even though the hermetic state contains a number of state-controlled churches, the totalitarian regime forbids independent religious activ"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/politics/clinton-female-voters-colorado/index.html",
			   "Hillary Clinton finds campaign message in personal speech",
			   "Washington (CNN) -- Hillary Clinton used her Tuesday appearance in Colorado, where experts see the female vote deciding a number of statewide races, to court women with a personal message about her life and her hopes for the future.\n\nClinton usually targets women voters in her appearances. But in Colorado, the former secretary of state and likely presidential candidate in 2016, spoke about how fortunate she felt to be born in America and the message she hopes to be able to leave with children.\n\nThe personal remarks, while focused on turning out voters for Democrats Mark Udall, John Hickenlooper and Andrew Romanoff, sounds a great deal like a presidential candidate and resembled a message Clinton could use should she run for president.\n\n\"I have had a great set of experiences. I have been very fortunate in my life, but the most fortunate thing besides the parents to whom I was born, is that I was born in America,\" Clinton said. \"I, from the moment of my birth, was blessed because of that"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/politics/north-korea-american-release/index.html",
			   "Jeffrey Fowle, American held by North Korea, to return home today",
			   "(CNN) -- In Jeffrey Fowle's hometown of Miamisburg, Ohio, north of Cincinnati, the sense of excitement and relief is palpable.\n\n\"We're thrilled; we're overjoyed,\" said Jim Shihady, assistant pastor of Bethel Baptist Church, which the Fowle family attends.\n\n\"My phone's been ringing. The texts have been coming in and people wanting to make sure we've heard the good news,\" Shihady told CNN affiliate WHIO.\n\nThe good news is that Fowle is coming home from North Korea, where he spent five months in detention, accused of leaving a Bible at a club for foreign sailors.\n\nNorth Korea interpreted the act as a violation of law. Because even though the hermetic state contains a number of state-controlled churches, the totalitarian regime forbids independent religious activities, viewing them as potential threats to its authority.\n\nSo, the 56-year-old Fowle languished in detention, one of three Americans imprisoned in the country.\n\nChange of heart\n\nBut Pyongyang seemed to have a change of heart and a"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/politics/tom-coburn-wastebook/index.html",
			   "Senator's \"Wastebook\" 2014 could fill a pork barrel",
			   "(CNN) -- Monkeys taught how to gamble and play video games.\n\nPeople paid to watch grass grow.\n\nSwedish massages given to rabbits.\n\nHalf of $1 million spent on a video game that is now helping terrorists train for missions.\n\nAnd $1 billion spent to destroy $16 billion worth of ammunition.\n\nThese are just a few examples from the 100 entry-long list in a book detailing government waste, compiled by retiring GOP Sen. Tom Coburn of Oklahoma.\n\nIn the 2014 edition of the \"Wastebook,\" Coburn notes that getting rid of the practice of pork barrel spending is next to impossible.\n\n\"What I have learned from these experiences is Washington will never change itself,\" he said.\n\nMassages for rabbits\n\nSome of the worst offenses listed in the book:\n\n-- The National Institutes of Health spent $387,000 to give Swedish massages to rabbits with a mechanical machine. Coburn notes that the NIH has a $30 billion annual budget and that the director of the NIH claims an Ebola vaccine would \"probably\" be ready now"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/politics/bradlee-death-reaction-tweets/index.html",
			   "Journalists react to 'icon' death",
			   "Washington (CNN) -- The death of Ben Bradlee, the iconic editor of The Washington Post who oversaw the paper's coverage of the Watergate scandal and the Pentagon Papers, saddened the industry he influenced Tuesday night.\n\n\"Ben was a true friend and genius leader in journalism. He forever altered our business,\" the two reporters who broke the newspaper's Watergate stories, Bob Woodward and Carl Bernstein, said in a statement.\n\n\"His one unbending principle was the quest for the truth and the necessity of that pursuit. He had the courage of an army,\" the two said. \"Ben had an intuitive understanding of the history of our profession, its formative impact on him and all of us. But he was utterly liberated from that. He was an original who charted his own course. We loved him deeply, and he will never be forgotten or replaced in our lives.\"\n\nDonald Graham, the newspaper's former publisher, called Bradlee \"the best,\" and said \"his drive to make the paper better still breathes in every corner "
			  ],
			  [
			   "http://edition.cnn.com/2014/10/22/politics/north-korea-american-release/index.html?eref=edition",
			   "Freed U.S. detainee due home",
			   "(CNN) -- In Jeffrey Fowle's hometown of Miamisburg, Ohio, north of Cincinnati, the sense of excitement and relief is palpable.\n\n\"We're thrilled; we're overjoyed,\" said Jim Shihady, assistant pastor of Bethel Baptist Church, which the Fowle family attends.\n\n\"My phone's been ringing. The texts have been coming in and people wanting to make sure we've heard the good news,\" Shihady told CNN affiliate WHIO.\n\nThe good news is that Fowle is coming home from North Korea, where he spent five months in detention, accused of leaving a Bible at a club for foreign sailors.\n\nNorth Korea interpreted the act as a violation of law. Because even though the hermetic state contains a number of state-controlled churches, the totalitarian regime forbids independent religious activities, viewing them as potential threats to its authority.\n\nSo, the 56-year-old Fowle languished in detention, one of three Americans imprisoned in the country.\n\nChange of heart\n\nBut Pyongyang seemed to have a change of heart and a"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/politics/warren-treated-differently/index.html",
			   "Elizabeth Warren: I've been treated differently",
			   "Denver (CNN) -- Sen. Elizabeth Warren told CNN she has been treated differently as a woman in the clubby upper chamber — echoing the general sentiments of her colleague Sen. Kirsten Gillibrand, who wrote about sexism in the Senate in a recent book.\n\nDuring a wide-ranging interview on the Colorado campaign trail—where she was stumping for endangered incumbent Sen. Mark Udall—CNN asked Warren whether she had experienced any different treatment as a woman. \"Yes,\" she said. Would she elaborate? \"Nope.\" But was it surprising? \"Not really, I wish it were,\" she told CNN. \"But it's hard to change these big, male dominated institutions. What I am very happy about is that there are now enough women in the United States Senate to bring change to that place and I think that's just powerfully important.\" There are now 20 women in the senate.\n\nWarren added: \"You know, others have said it before me. If you don't have a seat at the table, you're probably on the menu.\" Warren's comments did make one cl"
			  ],
			  [
			   "http://us.cnn.com/2014/10/22/politics/tom-coburn-wastebook/index.html?hpt=hp_t2",
			   "What's inside senator's 'Wastebook'?",
			   "(CNN) -- Monkeys taught how to gamble and play video games.\n\nPeople paid to watch grass grow.\n\nSwedish massages given to rabbits.\n\nHalf of $1 million spent on a video game that is now helping terrorists train for missions.\n\nAnd $1 billion spent to destroy $16 billion worth of ammunition.\n\nThese are just a few examples from the 100 entry-long list in a book detailing government waste, compiled by retiring GOP Sen. Tom Coburn of Oklahoma.\n\nIn the 2014 edition of the \"Wastebook,\" Coburn notes that getting rid of the practice of pork barrel spending is next to impossible.\n\n\"What I have learned from these experiences is Washington will never change itself,\" he said.\n\nMassages for rabbits\n\nSome of the worst offenses listed in the book:\n\n-- The National Institutes of Health spent $387,000 to give Swedish massages to rabbits with a mechanical machine. Coburn notes that the NIH has a $30 billion annual budget and that the director of the NIH claims an Ebola vaccine would \"probably\" be ready now"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/politics/obama-mission-creep/index.html",
			   "Obama's ISIS, Ebola \"mission creep\"",
			   "Washington (CNN) -- President Barack Obama is loading new missions on the U.S. military with fast-expanding mandates and no certain end dates as he grapples with the threats posed by ISIS and Ebola.\n\nEvolving operations in the Middle East and west Africa are causing some supporters to ask whether the president, a notoriously reluctant warrior dedicated to ending foreign entanglements and getting troops home, has changed his mind.\n\nBy committing the U.S. military to two new crises, with no clear exit strategy, Obama risks the same perilous slide into \"mission creep\" that hounded some predecessors, who got sucked ever deeper into wars in Vietnam, Somalia and Iraq.\n\nAlready, there are mounting questions about whether the strategy is working. A former top U.S. counterterror official told CNN Tuesday that the \"imminent threat\" from one of the groups targeted in an initial wave of airstrikes in Syria hasn't abated.\n\nWhen Obama announced America's new war in August, he said U.S. air strikes w"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/22/politics/north-korea-american-release/index.html",
			   "U.S. captive to return from North Korea",
			   "(CNN) -- In Jeffrey Fowle's hometown of Miamisburg, Ohio, north of Cincinnati, the sense of excitement and relief is palpable.\n\n\"We're thrilled; we're overjoyed,\" said Jim Shihady, assistant pastor of Bethel Baptist Church, which the Fowle family attends.\n\n\"My phone's been ringing. The texts have been coming in and people wanting to make sure we've heard the good news,\" Shihady told CNN affiliate WHIO.\n\nThe good news is that Fowle is coming home from North Korea, where he spent five months in detention, accused of leaving a Bible at a club for foreign sailors.\n\nNorth Korea interpreted the act as a violation of law. Because even though the hermetic state contains a number of state-controlled churches, the totalitarian regime forbids independent religious activities, viewing them as potential threats to its authority.\n\nSo, the 56-year-old Fowle languished in detention, one of three Americans imprisoned in the country.\n\nChange of heart\n\nBut Pyongyang seemed to have a change of heart and a"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/politics/travel-restrictions-west-africa/index.html",
			   "W. African flyers face new restrictions",
			   "Washington (CNN) -- All travelers flying into the United States from the West African countries most impacted by the Ebola virus can only enter the U.S. through five airports, Homeland Security Secretary Jeh Johnson announced Tuesday.\n\nStarting Wednesday, passengers traveling from Liberia, Sierra Leone or Guinea can only gain entry through the international airports in New York, Washington, D.C., Atlanta, Chicago and Newark, New Jersey -- which account for 94% of all incoming travelers from those countries, according to the Centers for Disease Control and Prevention.\n\nWhile all U.S. entry points currently screen passengers for potential exposure to the Ebola virus, these five airports have taken additional steps to screen for the disease, such as taking passengers' temperature and other additional protocols, Johnson said.\n\nThe announcement comes amid increasingly vocal calls for President Barack Obama to ban all travel from those three countries into the United States despite top healt"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/politics/tom-coburn-wastebook/index.html",
			   "\"Wastebook\" 2014: All that fits in pork barrel",
			   "(CNN) -- Monkeys taught how to gamble and play video games.\n\nPeople paid to watch grass grow.\n\nSwedish massages given to rabbits.\n\nHalf of $1 million spent on a video game that is now helping terrorists train for missions.\n\nAnd $1 billion spent to destroy $16 billion worth of ammunition.\n\nThese are just a few examples from the 100 entry-long list in a book detailing government waste, compiled by retiring GOP Sen. Tom Coburn of Oklahoma.\n\nIn the 2014 edition of the \"Wastebook,\" Coburn notes that getting rid of the practice of pork barrel spending is next to impossible.\n\n\"What I have learned from these experiences is Washington will never change itself,\" he said.\n\nMassages for rabbits\n\nSome of the worst offenses listed in the book:\n\n-- The National Institutes of Health spent $387,000 to give Swedish massages to rabbits with a mechanical machine. Coburn notes that the NIH has a $30 billion annual budget and that the director of the NIH claims an Ebola vaccine would \"probably\" be ready now"
			  ],
			  [
			   "http://us.cnn.com/2014/10/22/politics/tom-coburn-wastebook/index.html?hpt=hp_t2",
			   "What's inside senator's 'Wastebook?'",
			   "(CNN) -- Monkeys taught how to gamble and play video games.\n\nPeople paid to watch grass grow.\n\nSwedish massages given to rabbits.\n\nHalf of $1 million spent on a video game that is now helping terrorists train for missions.\n\nAnd $1 billion spent to destroy $16 billion worth of ammunition.\n\nThese are just a few examples from the 100 entry-long list in a book detailing government waste, compiled by retiring GOP Sen. Tom Coburn of Oklahoma.\n\nIn the 2014 edition of the \"Wastebook,\" Coburn notes that getting rid of the practice of pork barrel spending is next to impossible.\n\n\"What I have learned from these experiences is Washington will never change itself,\" he said.\n\nMassages for rabbits\n\nSome of the worst offenses listed in the book:\n\n-- The National Institutes of Health spent $387,000 to give Swedish massages to rabbits with a mechanical machine. Coburn notes that the NIH has a $30 billion annual budget and that the director of the NIH claims an Ebola vaccine would \"probably\" be ready now"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/politics/american-couple-qatar/index.html?eref=edition",
			   "'You lie,' American yells in Qatari court",
			   "Washington (CNN) -- An American held in Qatar in the death of his adopted daughter stood up and yelled, \"You lie! You lie!\" after a Qatari prosecutor told a court that Matthew Huang and his wife, Grace, had let their daughter starve to death.\n\n\"This court is a sham,\" Matthew Huang said after the rare dramatic outburst, evidence of his frustration at being convicted of killing his own daughter on what he and his wife say are trumped-up charges.\n\nTheir best hope now may be that the U.S. government applies diplomatic pressure to free them. The couple pleaded with the U.S. government to end their two-year legal nightmare, warning that without direct American intervention, they will be falsely imprisoned once again.\n\n\"We feel kidnapped and trapped. It feels like there is no end to this,\" Matthew Huang said Monday, after the appeals court hearing ended without his release.\n\nThe Huangs are appealing their conviction, which has garnered international attention and raised questions in the media"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/22/politics/north-korea-american-release/index.html?eref=edition",
			   "Town 'thrilled' about detainee return",
			   "(CNN) -- In Jeffrey Fowle's hometown of Miamisburg, Ohio, north of Cincinnati, the sense of excitement and relief is palpable.\n\n\"We're thrilled; we're overjoyed,\" said Jim Shihady, assistant pastor of Bethel Baptist Church, which the Fowle family attends.\n\n\"My phone's been ringing. The texts have been coming in and people wanting to make sure we've heard the good news,\" Shihady told CNN affiliate WHIO.\n\nThe good news is that Fowle is coming home from North Korea, where he spent five months in detention, accused of leaving a Bible at a club for foreign sailors.\n\nNorth Korea interpreted the act as a violation of law. Because even though the hermetic state contains a number of state-controlled churches, the totalitarian regime forbids independent religious activities, viewing them as potential threats to its authority.\n\nSo, the 56-year-old Fowle languished in detention, one of three Americans imprisoned in the country.\n\nChange of heart\n\nBut Pyongyang seemed to have a change of heart and a"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/politics/north-korea-american-release/index.html",
			   "American held by N. Korea comes home",
			   "(CNN) -- In Jeffrey Fowle's hometown of Miamisburg, Ohio, north of Cincinnati, the sense of excitement and relief is palpable.\n\n\"We're thrilled; we're overjoyed,\" said Jim Shihady, assistant pastor of Bethel Baptist Church, which the Fowle family attends.\n\n\"My phone's been ringing. The texts have been coming in and people wanting to make sure we've heard the good news,\" Shihady told CNN affiliate WHIO.\n\nThe good news is that Fowle is coming home from North Korea, where he spent five months in detention, accused of leaving a Bible at a club for foreign sailors.\n\nNorth Korea interpreted the act as a violation of law. Because even though the hermetic state contains a number of state-controlled churches, the totalitarian regime forbids independent religious activities, viewing them as potential threats to its authority.\n\nSo, the 56-year-old Fowle languished in detention, one of three Americans imprisoned in the country.\n\nChange of heart\n\nBut Pyongyang seemed to have a change of heart and a"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/22/politics/north-korea-american-release/index.html?eref=edition",
			   "American held by North Korea to return home today",
			   "(CNN) -- In Jeffrey Fowle's hometown of Miamisburg, Ohio, north of Cincinnati, the sense of excitement and relief is palpable.\n\n\"We're thrilled; we're overjoyed,\" said Jim Shihady, assistant pastor of Bethel Baptist Church, which the Fowle family attends.\n\n\"My phone's been ringing. The texts have been coming in and people wanting to make sure we've heard the good news,\" Shihady told CNN affiliate WHIO.\n\nThe good news is that Fowle is coming home from North Korea, where he spent five months in detention, accused of leaving a Bible at a club for foreign sailors.\n\nNorth Korea interpreted the act as a violation of law. Because even though the hermetic state contains a number of state-controlled churches, the totalitarian regime forbids independent religious activities, viewing them as potential threats to its authority.\n\nSo, the 56-year-old Fowle languished in detention, one of three Americans imprisoned in the country.\n\nChange of heart\n\nBut Pyongyang seemed to have a change of heart and a"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/politics/north-korea-american-release/index.html",
			   "Jeffrey Fowle, American held by North Korea, heads home",
			   "(CNN) -- In Jeffrey Fowle's hometown of Miamisburg, Ohio, north of Cincinnati, the sense of excitement and relief is palpable.\n\n\"We're thrilled; we're overjoyed,\" said Jim Shihady, assistant pastor of Bethel Baptist Church, which the Fowle family attends.\n\n\"My phone's been ringing. The texts have been coming in and people wanting to make sure we've heard the good news,\" Shihady told CNN affiliate WHIO.\n\nThe good news is that Fowle is coming home from North Korea, where he spent five months in detention, accused of leaving a Bible at a club for foreign sailors.\n\nNorth Korea interpreted the act as a violation of law. Because even though the hermetic state contains a number of state-controlled churches, the totalitarian regime forbids independent religious activities, viewing them as potential threats to its authority.\n\nSo, the 56-year-old Fowle languished in detention, one of three Americans imprisoned in the country.\n\nChange of heart\n\nBut Pyongyang seemed to have a change of heart and a"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/politics/american-released-north-korea/index.html",
			   "North Korea releases U.S. captive",
			   "(CNN) -- Jeffrey Fowle, an American arrested in North Korea in May for leaving a bible at a club for foreign sailors, has been released and is on his way home, a senior State Department official told CNN on Tuesday.\n\nAn American government plane picked up Fowle on Tuesday before flying to Guam, the official said.\n\nNorth Korea announced Fowle's detention in June, saying he had violated the law by acting \"contrary to the purpose of tourism.\"\n\nAlthough North Korea contains a number of state-controlled churches, the totalitarian regime forbids independent religious activities, viewing them as potential threats to its authority.\n\nCNN learned of Fowle's release earlier Tuesday but agreed not to report the news until he landed in Guam.\n\nWhite House Press Secretary Josh Earnest confirmed Fowle's release on Tuesday, saying the Defense Department had arranged his transportation out of the country at the North Korean government's request.\n\n\"We certainly welcome the decision,\" Earnest said, adding"
			  ],
			  [
			   "http://us.cnn.com/2014/10/21/politics/american-released-north-korea/index.html?hpt=hp_t2",
			   "North Korea frees arrested American",
			   "(CNN) -- Jeffrey Fowle, an American arrested in North Korea in May for leaving a bible at a club for foreign sailors, has been released and is on his way home, a senior State Department official told CNN on Tuesday.\n\nAn American government plane picked up Fowle on Tuesday before flying to Guam, the official said.\n\nFowle was arrested at the airport earlier this year while trying to leave North Korea.\n\nCNN learned of Fowle's release earlier Tuesday but agreed not to report the news until he landed in Guam.\n\nWhite House Press Secretary Josh Earnest confirmed Fowle's release on Tuesday, saying the Defense Department had arranged his transportation out of the country at the North Korean government's request.\n\n\"We certainly welcome the decision,\" Earnest said, adding that the United States has no updates on the status of two other Americans imprisoned in North Korea -- Matthew Miller and Kenneth Bae -- and calling on North Korea to \"immediately release them.\"\n\nState Department spokeswoman Ma"
			  ],
			  [
			   "http://us.cnn.com/2014/10/21/politics/florida-governors-debate/index.html?hpt=hp_t2",
			   "Charlie Crist, Rick Scott battle it out",
			   "Jacksonville, Florida (CNN) -- The third and final debate between Florida Republican Gov. Rick Scott and Democratic challenger Charlie Crist was dominated by personal attacks in one of the closest governors races in the country.\n\nIn the debate, hosted by CNN and affiliate WJXT in Jacksonville, the two candidates took aim at each other in a showdown that covered a wide range of topics, including economic policies, the death penalty, and voting rights for felons.\n\nNo fangate repeat\n\nThe night got off to a breezy start, this time with no fan on stage for Crist and no protest from Scott.\n\n\"Everybody's comfortable here?\" asked CNN's Jake Tapper, who's co-moderating the debate with WJXT's Kent Justice. His question was a subtle reference to last week's seven minute standoff.\n\nThe debate quickly transitioned into a testy exchange with personal attacks over wealth.\n\nScott blamed Crist for the loss of more than 800,000 jobs while he was governor from 2007-2011, saying Crist is out of touch with"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/politics/florida-debate-bing-pulse/index.html",
			   "How did Florida's candidates for governor rate?",
			   "Washington (CNN) -- While Florida Gov. Rick Scott and former Florida Gov. Charlie Crist took aim at each other during a bitter debate on Thursday night, viewers participated alongside the candidates, reacting in real-time using Microsoft Bing Pulse technology.\n\nThe pattern was clear from the beginning. Democrats and independents tended to stick relatively close together in their sentiment, strongly agreeing when Crist spoke and strongly disagreeing when Scott spoke. Overall, Republicans participants tended to stay more toward the middle, voting more neutrally.\n\nNot surprisingly, Democrats and Republicans voted in extreme opposite directions throughout the debate. When Crist attacked Scott's personal fortune, Democrats and independents strongly agreed with him.\n\n\"If you're somebody like Rick Scott, and you have a private jet, and you fly 30,000 feet above people all the time, or you live in an oceanfront mansion, you're out of touch, and you're not feeling what people that are watching "
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/politics/bradlee-death-reaction-tweets/index.html?eref=edition",
			   "Tributes pour in for 'iconic' editor",
			   "Washington (CNN) -- The death of Ben Bradlee, the iconic editor of The Washington Post who oversaw the paper's coverage of the Watergate scandal and the Pentagon Papers, saddened the industry he influenced Tuesday night.\n\n\"Ben was a true friend and genius leader in journalism. He forever altered our business,\" the two reporters who broke the newspaper's Watergate stories, Bob Woodward and Carl Bernstein, said in a statement.\n\n\"His one unbending principle was the quest for the truth and the necessity of that pursuit. He had the courage of an army,\" the two said. \"Ben had an intuitive understanding of the history of our profession, its formative impact on him and all of us. But he was utterly liberated from that. He was an original who charted his own course. We loved him deeply, and he will never be forgotten or replaced in our lives.\"\n\nDonald Graham, the newspaper's former publisher, called Bradlee \"the best,\" and said \"his drive to make the paper better still breathes in every corner "
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/politics/bradlee-death-reaction-tweets/index.html",
			   "Journalists react to death to 'icon'",
			   "Washington (CNN) -- The death of Ben Bradlee, the iconic editor of The Washington Post who oversaw the paper's coverage of the Watergate scandal and the Pentagon Papers, saddened the industry he influenced Tuesday night.\n\n\"Ben was a true friend and genius leader in journalism. He forever altered our business,\" the two reporters who broke the newspaper's Watergate stories, Bob Woodward and Carl Bernstein, said in a statement.\n\n\"His one unbending principle was the quest for the truth and the necessity of that pursuit. He had the courage of an army,\" the two said. \"Ben had an intuitive understanding of the history of our profession, its formative impact on him and all of us. But he was utterly liberated from that. He was an original who charted his own course. We loved him deeply, and he will never be forgotten or replaced in our lives.\"\n\nDonald Graham, the newspaper's former publisher, called Bradlee \"the best,\" and said \"his drive to make the paper better still breathes in every corner "
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/politics/florida-governors-debate/index.html",
			   "Florida debate turns bitter",
			   "Jacksonville, Florida (CNN) -- The third and final debate between Florida Republican Gov. Rick Scott and Democratic challenger Charlie Crist was dominated by personal attacks in one of the closest governors races in the country.\n\nIn the debate, hosted by CNN and affiliate WJXT in Jacksonville, the two candidates took aim at each other in a showdown that covered a wide range of topics, including economic policies, the death penalty, and voting rights for felons.\n\nNo fangate repeat\n\nThe night got off to a breezy start, this time with no fan on stage for Crist and no protest from Scott.\n\n\"Everybody's comfortable here?\" asked CNN's Jake Tapper, who's co-moderating the debate with WJXT's Kent Justice. His question was a subtle reference to last week's seven minute standoff.\n\nThe debate quickly transitioned into a testy exchange with personal attacks over wealth.\n\nScott blamed Crist for the loss of more than 800,000 jobs while he was governor from 2007-2011, saying Crist is out of touch with"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/politics/bradlee-death-reaction-tweets/index.html",
			   "Ben Bradlee an icon, journalists say",
			   "Washington (CNN) -- The death of Ben Bradlee, the iconic editor of The Washington Post who oversaw the paper's coverage of the Watergate scandal and the Pentagon Papers, saddened the industry he influenced Tuesday night.\n\n\"Ben was a true friend and genius leader in journalism. He forever altered our business,\" the two reporters who broke the newspaper's Watergate stories, Bob Woodward and Carl Bernstein, said in a statement.\n\n\"His one unbending principle was the quest for the truth and the necessity of that pursuit. He had the courage of an army,\" the two said. \"Ben had an intuitive understanding of the history of our profession, its formative impact on him and all of us. But he was utterly liberated from that. He was an original who charted his own course. We loved him deeply, and he will never be forgotten or replaced in our lives.\"\n\nDonald Graham, the newspaper's former publisher, called Bradlee \"the best,\" and said \"his drive to make the paper better still breathes in every corner "
			  ],
			  [
			   "http://us.cnn.com/video/data/2.0/video/politics/2014/10/21/florida-governor-debate-minimum-wage.cnn.html?hpt=hp_t2",
			   "Gov. blasts opponent over wealth",
			   "During the Florida Governor's debate, a discussion on minimum wage and increasing jobs led to a few testy exchanges. \n  \nIf your browser has Adobe Flash Player installed, click above to play.  Otherwise, click below."
			  ],
			  [
			   "http://www.cnn.com/video/#/video/politics/2014/10/21/tapper-florida-debate-crist-scott-marijuana-fsu-executions-lead.cnn",
			   "Florida debate: Marijuana, FSU, executions",
			   "__"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/politics/2014/10/21/florida-governor-debate-minimum-wage.cnn",
			   "Scott: Charlie grew up with money",
			   "__"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/politics/american-released-north-korea/index.html?eref=edition",
			   "'Horrific ordeal' over as North Korea releases captive",
			   "(CNN) -- Jeffrey Fowle, an American arrested in North Korea in May for leaving a bible at a club for foreign sailors, has been released and is on his way home, a senior State Department official told CNN on Tuesday.\n\nAn American government plane picked up Fowle on Tuesday before flying to Guam, the official said.\n\nFowle was arrested at the airport earlier this year while trying to leave North Korea.\n\nCNN learned of Fowle's release earlier Tuesday but agreed not to report the news until he landed in Guam.\n\nWhite House Press Secretary Josh Earnest confirmed Fowle's release on Tuesday, saying the Defense Department had arranged his transportation out of the country at the North Korean government's request.\n\n\"We certainly welcome the decision,\" Earnest said, adding that the United States has no updates on the status of two other Americans imprisoned in North Korea -- Matthew Miller and Kenneth Bae -- and calling on North Korea to \"immediately release them.\"\n\nState Department spokeswoman Ma"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/politics/2014/10/21/tapper-florida-debate-crist-scott-immigration-lead.cnn",
			   "Florida debate: Immigration, climate change",
			   "__"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/politics/2014/10/21/tapper-florida-debate-crist-scott-ebola-swtiched-parties-lead.cnn",
			   "Florida debate: Ebola, jobs, wages",
			   "__"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/politics/2014/10/22/florida-debate-crist-scott-do-over.cnn",
			   "Florida debate: The 'do-over'",
			   "__"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/politics/florida-governors-debate/index.html",
			   "Fight over wealth in Florida debate",
			   "Jacksonville, Florida (CNN) -- The third and final debate between Florida Republican Gov. Rick Scott and Democratic challenger Charlie Crist got off to a breezy start--this time with no fan on stage for Crist and no protest from Scott.\n\n\"Everybody's comfortable here?\" asked CNN's Jake Tapper, who's co-moderating the debate. His question was a subtle reference to last week's seven minute standoff.\n\nThe debate, hosted by CNN and affiliate WJXT in Jacksonville, quickly transitioned into a testy exchange with personal attacks over wealth.\n\nScott blamed Crist for the loss of more than 800,000 jobs while he was governor from 2007-2011, saying Crist is out of touch with average Florida voters because he grew up with wealth.\n\n\"I grew up with families that struggled. I don't know my natural father. I lived in public housing. I have an adopted dad,\" Scott said. \"I didn't grow up with money. You did. You grew up with plenty of money. Charlie, you lost more jobs than any state but one.\"\n\nHammering"
			  ],
			  [
			   "http://us.cnn.com/2014/10/21/politics/florida-governors-debate/index.html?hpt=hp_t2",
			   "Florida debate opens without fan fight",
			   "Jacksonville, Florida (CNN) -- The third and final debate between Florida Republican Gov. Rick Scott and Democratic challenger Charlie Crist got off to a breezy start--this time with no fan on stage for Crist and no protest from Scott.\n\n\"Everybody's comfortable here?\" asked CNN's Jake Tapper, who's co-moderating the debate. His question was a subtle reference to last week's seven minute standoff.\n\nThe debate, hosted by CNN and affiliate WJXT in Jacksonville, quickly transitioned into a testy exchange with personal attacks over wealth.\n\nScott blamed Crist for the loss of more than 800,000 jobs while he was governor from 2007-2011, saying Crist is out of touch with average Florida voters because he grew up with wealth.\n\n\"I grew up with families that struggled. I don't know my natural father. I lived in public housing. I have an adopted dad,\" Scott said. \"I didn't grow up with money. You did. You grew up with plenty of money. Charlie, you lost more jobs than any state but one.\"\n\nHammering"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/politics/obama-early-voting-jokes/index.html",
			   "Man to Obama: 'Don't touch my' girl",
			   "Washington (CNN) -- The woman who voted next to President Barack Obama on Monday says she was \"embarrassed and just shocked,\" after her fiancé jokingly told him \"Mr. President, don't touch my girlfriend.\"\n\nCasting his ballot in Chicago on Monday, Obama stood at a voting booth next to Aia Cooper, whose fiancé, Mike Jones, decided to crack wise with the president, which prompted Obama to reply with \"I really wasn't planning on it,\" before adding that Jones was \"an example of a brother just embarrassing you for no reason.\"\n\nIn an interview with CNN's Brooke Baldwin Tuesday afternoon, Cooper said she was \"embarrassed and just shocked\" after hearing her fiancé comments. \"I was just shaking,\" she said.\n\nCooper was nervous to cast her ballot next to the president even before Jones made his remark.\n\n\"I was like, 'do I have to stand there? I don't really want to stand there,'\" she said.\n\nWhen asked by Baldwin, the couple said they'd even be open to inviting the Obamas to their future wedding.\n\n"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/politics/florida-governors-debate/index.html",
			   "Debate opens without fan fight",
			   "Jacksonville, Florida (CNN) -- The third and final debate between Florida Republican Gov. Rick Scott and Democratic challenger Charlie Crist got off to a breezy start--this time with no fan on stage for Crist and no protest from Scott.\n\n\"Everybody's comfortable here?\" asked CNN's Jake Tapper, who's co-moderating the debate. His question was a subtle reference to last week's seven minute standoff.\n\nThe debate, hosted by CNN and affiliate WJXT in Jacksonville, quickly transitioned to a question about Ebola. Tapper asked Crist how he would rate, on a scale of 1-10, President Obama's handling of the Ebola virus in the United States.\n\n\"I'd probably give him an 8. I think we had a little bit of a slow start, and I think everybody kinda recognizes that. But I think they've really caught their stride,\" said Crist.\n\nAsked if Scott, the Republican governor, feels confident that an Ebola patient could be treated in Florida, Scott said, \"absolutely.\"\n\nOne of the nurses who contracted Ebola flew on"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/politics/2014/10/21/sot-florida-governor-debate-tea-party-democrats.cnn",
			   "Crist: Tea party forced me toward Dems",
			   "__"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/politics/florida-debate-walkup/index.html",
			   "7 things to watch",
			   "Watch: CNN's Jake Tapper and WJXT's Kent Justice will moderate the Florida gubernatorial debate \n\nJacksonville, Florida (CNN) -- Florida Gov. Rick Scott and former Gov. Charlie Crist face off for the third and final time Tuesday night in a debate hosted by CNN and Jacksonville affiliate WJXT.\n\nThe showdown comes just two weeks before Election Day and marks a final point in what's become the most expensive 2014 midterm race in the country, more than any House or Senate campaign.\n\nScott, an unpopular Republican governor, is trying to fend off a challenge from his predecessor, a Republican-turned-independent-turned-Democrat whose likability numbers are also underwater.\n\nWhile Crist entered the race last November with a sizable polling advantage over Scott, the race has tightened up and the two men now find themselves neck-and-neck toward the finish line. A CNN/ORC International poll last week indicated the race was tied at 44%.\n\nThe contest also takes place in the largest presidential swi"
			  ],
			  [
			   "http://us.cnn.com/2014/10/21/politics/palin-brawl-audio/index.html?hpt=hp_t2",
			   "Palins describe brawl in recordings",
			   "Editor's note: The audio mentioned below, obtained by CNN from police records, contains strong language.\n\nWashington (CNN) -- Bristol Palin describes being dragged through the grass and called a series of obscenities during a massive brawl last month in recordings of Anchorage police interviews that CNN obtained through a public records request.\n\nShe said she jumped into a fight after \"some old lady\" pushed her sister, Willow Palin, because \"oh f***in' hell no, no one's gonna touch my sister.\"\n\nWhen she tried to find the woman, though, she said a man who others identified as Korey Klingenmeyer, the owner of the house where the party took place, knocked her down.\n\n\"A guy comes out of nowhere and pushes me on the ground, takes me by my feet in my dress -- in my thong dress in front of everybody -- [and says] 'Come on you c***, get the f*** out of here. Come on you s***, get the f*** out of here,\" she said.\n\nNo charges were filed as a result of the September brawl.\n\nOther people interview"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/politics/2014/10/21/palin-family-brawl-audio.cnn",
			   "Bristol Palin Audio Released",
			   "__"
			  ],
			  [
			   "http://us.cnn.com/2014/10/21/politics/why-bother-voting/index.html?hpt=hp_t1",
			   "Is lack of interest in election the price of gridlock?",
			   "(CNN) -- Of course it matters.\n\nBut many if not most Americans see the midterm election two weeks from Tuesday as likely to change little or nothing of consequence. Their lack of interest is part of the price of Washington gridlock and dysfunction.\n\nIt is nearly impossible to see a path for action of major, controversial issues like immigration reform, a new tax system, or long overdue fixes to the big-money entitlement programs Medicare and Social Security.\n\nNational Journal's veteran political reporter Ron Fournier sums it up this way:\n\n\"No matter how this goes, we're going to have more gridlock and more politics above policy,\" said Fournier. \"As we turn to 2016, it will be angrier, more frustrated and voters will be angrier, more frustrated and looking for alternatives outside these two parties.\"\n\nRemember that last part -- especially if independent Greg Orman wins the tight Senate race in traditionally ruby red Kansas. That could send both parties a signal about the public's disgus"
			  ],
			  [
			   "http://us.cnn.com/2014/10/21/politics/olsen-nsa/index.html?hpt=hp_t2",
			   "Ex-official: We lost track of terrorists",
			   "Watch CNN's full interview with Matt Olsen during \"The Situation Room,\" airing from 5-7 p.m. ET. \n\nWashington (CNN) -- Ripping the cover off top-secret U.S. surveillance programs pushed foreign terrorists underground and out of intelligence services' reach, a former top intelligence official said Tuesday.\n\n\"We've lost collection against some individuals, people that we were concerned about we are no longer collecting their communications,\" Matt Olsen, who until September led the National Counterterrorism Center, told CNN's Jim Sciutto. \"We lost insight into what they were doing.\"\n\nOlsen said the revelations made public by former NSA contractor Edward Snowden had changed the way terrorists communicate, causing them to fall out of the U.S. government's sight.\n\n\"They've changed how they encrypt their communications and adopted more stringent encryption techniques,\" he said. \"They've changed service providers and email addresses and they've, in some cases, just dropped off all together.\"\n\n"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/politics/palin-brawl-audio/index.html",
			   "Palins describe brawl in police recordings",
			   "Editor's note: The audio mentioned below, obtained by CNN from police records, contains strong language.\n\nWashington (CNN) -- Bristol Palin describes being dragged through the grass and called a series of obscenities during a massive brawl last month in recordings of Anchorage police interviews that CNN obtained through a public records request.\n\nShe said she jumped into a fight after \"some old lady\" pushed her sister, Willow Palin, because \"oh f***in' hell no, no one's gonna touch my sister.\"\n\nWhen she tried to find the woman, though, she said a man who others identified as Korey Klingenmeyer, the owner of the house where the party took place, knocked her down.\n\n\"A guy comes out of nowhere and pushes me on the ground, takes me by my feet in my dress -- in my thong dress in front of everybody -- [and says] 'Come on you c***, get the f*** out of here. Come on you s***, get the f*** out of here,\" she said.\n\nNo charges were filed as a result of the September brawl.\n\nOther people interview"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/politics/obama-ads-against-me-should-make-you-want-to-vote/index.html",
			   "Obama makes push for Nunn on Atlanta radio",
			   "(CNN) -- President Barack Obama said political candidates who are running ads against him personally should motivate voters to get out to the polls even more.\n\n\"Those ads shouldn't matter,\" Obama told the \"The Ryan Cameron Morning Show with Wanda Smith\" in an interview that aired Tuesday on V-103 in Atlanta, Georgia. \"That should be one more reason to go out and vote.\"\n\nObama urged voters in states with early voting to go cast their vote as soon as they can.\n\n\"It is critically important to make sure that folks vote,\" Obama said, in the interview, which was taped Monday. \"And you've got early vote in Georgia. I voted today in Illinois. We've got early voting there. There weren't any lines. I walked in and get it done in 10 minutes.\"\n\nIn the radio interview supporting Michelle Nunn in her Senate race, he repeated his plea from campaign rallies Sunday to get out the vote and to bring family, friends and neighbors.\n\n\"If you don't know how to vote early or don't know where the polling place"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/politics/clinton-female-voters-colorado/index.html",
			   "Hillary Clinton gets personal in push for female voters",
			   "Washington (CNN) -- Hillary Clinton used her Tuesday appearance in Colorado, where experts see the female vote deciding a number of statewide races, to court women with a personal message about her life and her hopes for the future.\n\nClinton usually targets women voters in her appearances. But in Colorado, the former secretary of state and likely presidential candidate in 2016, spoke about how fortunate she felt to be born in America and the message she hopes to be able to leave with children.\n\nThe personal remarks, while focused on turning out voters for Democrats Mark Udall, John Hickenlooper and Andrew Romanoff, sounds a great deal like a presidential candidate and resembled a message Clinton could use should she run for president.\n\n\"I have had a great set of experiences. I have been very fortunate in my life, but the most fortunate thing besides the parents to whom I was born, is that I was born in America,\" Clinton said. \"I, from the moment of my birth, was blessed because of that"
			  ],
			  [
			   "http://thelead.blogs.cnn.com/2014/10/21/florida-politics-in-the-spotlight",
			   "Florida politics in the spotlight",
			   "Watch: CNN's Jake Tapper and WJXT's Kent Justice will moderate the Florida gubernatorial debate Tuesday night in Jacksonville starting at 7 p.m. ET.\n\n(CNN) - Republican Rick Scott is the 45th occupant of the governor's mansion in tallahassee…and he's trying to keep his keys to the front door...\n\nHis opponent - the guy who had the house before him, the 44th governor, then-Republican Charlie Crist, is now running as a Democrat.\n\nLets just say the respect each man has for his opponent knows bounds. The two men often drop the title \"governor\" when talking about each other.\n\nCNN's Jake Tapper reports."
			  ],
			  [
			   "http://www.cnn.com/video/#/video/politics/2014/10/21/lead-justice-florida-debate-preview.cnn",
			   "CNN Florida governor debate: What to watch",
			   "__"
			  ],
			  [
			   "http://us.cnn.com/2014/10/21/politics/olsen-nsa/index.html?hpt=hp_t1",
			   "Terrorists adapted after Edward Snowden leaks",
			   "Watch CNN's full interview with Matt Olsen during \"The Situation Room,\" airing from 5-7 p.m. ET. \n\nWashington (CNN) -- Ripping the cover off top-secret U.S. surveillance programs pushed foreign terrorists underground and out of intelligence services' reach, a former top intelligence official said Tuesday.\n\n\"We've lost collection against some individuals, people that we were concerned about we are no longer collecting their communications,\" Matt Olsen, who until July led the National Counterterrorism Center, told CNN's Jim Sciutto. \"We lost insight into what they were doing.\"\n\nOlsen said the revelations made public by former NSA contractor Edward Snowden had changed the way terrorists communicate, causing them to fall out of the U.S. government's sight.\n\n\"They've changed how they encrypt their communications and adopted more stringent encryption techniques,\" he said. \"They've changed service providers and email addresses and they've, in some cases, just dropped off all together.\"\n\nSnowd"
			  ],
			  [
			   "http://us.cnn.com/2014/10/21/politics/olsen-nsa/index.html?hpt=hp_t1",
			   "Terrorists adapted after Snowden revelations",
			   "Watch CNN's full interview with Matt Olsen during \"The Situation Room,\" airing from 5-7 p.m. ET. \n\nWashington (CNN) -- Ripping the cover off top-secret U.S. surveillance programs pushed foreign terrorists underground and out of intelligence services' reach, a former top intelligence official said Tuesday.\n\n\"We've lost collection against some individuals, people that we were concerned about we are no longer collecting their communications,\" Matt Olsen, who until July led the National Counterterrorism Center, told CNN's Jim Sciutto. \"We lost insight into what they were doing.\"\n\nOlsen said the revelations made public by former NSA contractor Edward Snowden had changed the way terrorists communicate, causing them to fall out of the U.S. government's sight.\n\n\"They've changed how they encrypt their communications and adopted more stringent encryption techniques,\" he said. \"They've changed service providers and email addresses and they've, in some cases, just dropped off all together.\"\n\nSnowd"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/politics/olsen-nsa/index.html",
			   "Ex-counterterror chief: U.S. lost track of terrorists after Snowden",
			   "Watch CNN's full interview with Matt Olsen during \"The Situation Room,\" airing from 5-7 p.m. ET. \n\nWashington (CNN) -- Ripping the cover off top-secret U.S. surveillance programs pushed foreign terrorists underground and out of intelligence services' reach, a former top intelligence official said Tuesday.\n\n\"We've lost collection against some individuals, people that we were concerned about we are no longer collecting their communications,\" Matt Olsen, who until July led the National Counterterrorism Center, told CNN's Jim Sciutto. \"We lost insight into what they were doing.\"\n\nOlsen said the revelations made public by former NSA contractor Edward Snowden had changed the way terrorists communicate, causing them to fall out of the U.S. government's sight.\n\n\"They've changed how they encrypt their communications and adopted more stringent encryption techniques,\" he said. \"They've changed service providers and email addresses and they've, in some cases, just dropped off all together.\"\n\nSnowd"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/politics/jindal-signs-executive-order-amid-ebola-fears/index.html",
			   "Gov. Jindal orders restrictions for West Africa travelers",
			   "Washington (CNN) -- After weeks of urging the Obama administration to implement a travel ban to and from Ebola stricken countries, Louisiana Gov. Bobby Jindal has taken matters into his own hands.\n\nOn Monday, Jindal signed an executive order calling for all state departments, agencies, and offices to \"develop a plan and reporting mechanism\" for employees to disclose whether they had recently traveled to Guinea, Sierra Leone and Liberia.\n\nThe order was made in an effort to monitor travelers from potentially exposing other Louisiana residents to the disease. If an employee recently visited one of these countries, they will be immediately restricted from using commercial transportation and visiting public spaces for 21 days, the incubation period set by the Centers for Disease Control and Prevention and World Health Organization. The order does not clarify how individuals will be advised to cooperate.\n\nAn Ebola travel ban would be completely unprecedented\n\n\"The federal government, to date"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/politics/travel-restrictions-west-africa/index.html?eref=edition",
			   "U.S. limits Ebola nations arrivals",
			   "Washington (CNN) -- All travelers flying into the United States from the West African countries most impacted by the Ebola virus can only enter the U.S. through five airports, Homeland Security Secretary Jeh Johnson announced Tuesday.\n\nStarting Wednesday, passengers traveling from Liberia, Sierra Leone or Guinea can only gain entry through the international airports in New York, Washington, D.C., Atlanta, Chicago and Newark, New Jersey -- which account for 94% of all incoming travelers from those countries, according to the Centers for Disease Control and Prevention.\n\nWhile all U.S. entry points currently screen passengers for potential exposure to the Ebola virus, these five airports have taken additional steps to screen for the disease, such as taking passengers' temperature and other additional protocols, Johnson said.\n\nThe announcement comes amid increasingly vocal calls for President Barack Obama to ban all travel from those three countries into the United States despite top healt"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/politics/michelle-obama-braley/index.html",
			   "Michelle Obama rights Braley-Bailey slip",
			   "(CNN) -- Democrat Bruce Braley is running a tough campaign against Republican Joni Ernst in Iowa for an open U.S. Senate seat.\n\nThings got even worse when first lady Michelle Obama mispronounced his name during a rally earlier this month, repeatedly calling him Bruce \"Bailey.\"\n\nLuckily for Braley, the first lady came prepared Tuesday and corrected herself during a rally for Braley in Iowa City. Just after Braley's name was announced, Obama addressed the issue immediately, \"Bruce Braley. Some of you may remember the last time I was here, I got it wrong, a couple of times.\"\n\nWhile the audience continued to laugh, she insisted that Sasha and Malia are proof that she often jumbles names, \"I never call them the right names,\" adding \"I call Barack Bo... it never works out.\"\n\nDespite having mispronounced his name in the past, she assures the crowd, \"what I know I got right was Bruce's values.\""
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/politics/olsen-nsa/index.html",
			   "Ex-counterterror chief: U.S. lost track of terrorists",
			   "Watch CNN's full interview with Matt Olsen during \"The Situation Room,\" airing from 5-7 p.m. ET. \n\nWashington (CNN) -- Ripping the cover off top-secret U.S. surveillance programs pushed foreign terrorists underground and out of intelligence services' reach, a former top intelligence official said Tuesday.\n\n\"We've lost collection against some individuals, people that we were concerned about we are no longer collecting their communications,\" Matt Olsen, who until July led the National Counterterrorism Center, told CNN's Jim Sciutto. \"We lost insight into what they were doing.\"\n\nOlsen said the revelations made public by former NSA contractor Edward Snowden had changed the way terrorists communicate, causing them to fall out of the U.S. government's sight.\n\n\"They've changed how they encrypt their communications and adopted more stringent encryption techniques,\" he said. \"They've changed service providers and email addresses and they've, in some cases, just dropped off all together.\"\n\nSnowd"
			  ],
			  [
			   "http://us.cnn.com/2014/10/21/politics/american-released-north-korea/index.html?hpt=hp_inthenews",
			   "American released",
			   "(CNN) -- Jeffrey Fowle, an American arrested in North Korea in May for leaving a bible at his hotel, has been released and is on his way home, a senior State Department official told CNN on Tuesday.\n\nAn American government plane picked up Fowle on Tuesday before flying to Guam, the official said.\n\nFowle was arrested at the airport earlier this year while trying to leave North Korea.\n\nCNN learned of Fowle's release earlier Tuesday but agreed not to report the news until he landed in Guam.\n\nWhite House Press Secretary Josh Earnest confirmed Fowle's release on Tuesday, saying the Defense Department had arranged his transportation out of the country at the North Korean government's request.\n\n\"We certainly welcome the decision,\" Earnest said, adding that the United States has no updates on the status of two other Americans imprisoned in North Korea -- Matthew Miller and Kenneth Bae -- and calling on North Korea to \"immediately release them.\"\n\nState Department spokeswoman Marie Harf echoed E"
			  ],
			  [
			   "http://us.cnn.com/2014/10/21/politics/american-released-north-korea/index.html?hpt=hp_t1",
			   "Jeffrey Fowle on his way home, official tells CNN",
			   "(CNN) -- Jeffrey Fowle, an American arrested in North Korea in May for leaving a bible at his hotel, has been released and is on his way home, a senior State Department official told CNN on Tuesday.\n\nAn American government plane picked up Fowle on Tuesday before flying to Guam, the official said.\n\nFowle was arrested at the airport earlier this year while trying to leave North Korea.\n\nCNN learned of Fowle's release earlier Tuesday but agreed not to report the news until he landed in Guam.\n\nWhite House Press Secretary Josh Earnest confirmed Fowle's release on Tuesday, saying the Defense Department had arranged his transportation out of the country at the North Korean government's request.\n\n\"We certainly welcome the decision,\" Earnest said, adding that the United States has no updates on the status of two other Americans imprisoned in North Korea -- Matthew Miller and Kenneth Bae -- and calling on North Korea to \"immediately release them.\"\n\nState Department spokeswoman Marie Harf echoed E"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/politics/michelle-obama-braley/index.html",
			   "Michelle Obama addresses Braley-Bailey incident",
			   "(CNN) -- Democrat Bruce Braley is running a tough campaign against Republican Joni Ernst in Iowa for an open U.S. Senate seat.\n\nThings got even worse when first lady Michelle Obama mispronounced his name during a rally earlier this month, repeatedly calling him Bruce \"Bailey.\"\n\nLuckily for Braley, the first lady came prepared Tuesday and corrected herself during a rally for Braley in Iowa City. Just after Braley's name was announced, Obama addressed the issue immediately, \"Bruce Braley. Some of you may remember the last time I was here, I got it wrong, a couple of times.\"\n\nWhile the audience continued to laugh, she insisted that Sasha and Malia are proof that she often jumbles names, \"I never call them the right names,\" adding \"I call Barack Bo... it never works out.\"\n\nDespite having mispronounced his name in the past, she assures the crowd, \"what I know I got right was Bruce's values.\""
			  ],
			  [
			   "http://www.cnn.com/video/#/video/politics/2014/10/21/flotus-braley.cnn",
			   "FLOTUS corrects her Bruce Braley  fumble",
			   "__"
			  ],
			  [
			   "http://us.cnn.com/2014/10/21/politics/olsen-counterterror-threat-interview-story/index.html?hpt=hp_t1",
			   "Ex-official: Strikes didn't reduce 'imminent threat'",
			   "Washington (CNN) -- The former head of U.S. counterterror operations said Tuesday the \"imminent threat\" posed by an al Qaeda offshoot in Syria hasn't lessened after a U.S. air campaign there.\n\nSpeaking to CNN's Jim Sciutto, Matt Olsen said by his analysis the threat from the Khorasan group \"is still in the same place as it was before\" President Barack Obama ordered airstrikes against the terror operation last month.\n\n\"This group was in a position to train without any sort of interference, they were able to recruit operatives,\" said Olsen, who stepped down as director of the National Counterterrorism Center in July. \"We saw that they were looking to test explosives. So they were in the advanced stages of plotting. They had both intent and that capability that put them nearing an execution phase of an attack.\"\n\nPresident Obama announced strikes against Khorasan in September at the same time he began the mission to \"degrade and destroy\" the Islamic State terror group in Syria and Iraq. At"
			  ],
			  [
			   "http://us.cnn.com/2014/10/21/politics/olsen-counterterror-threat-interview-story/index.html?hpt=hp_t1",
			   "U.S. began anti-Khorasan strikes last month",
			   "Washington (CNN) -- The former head of U.S. counterterror operations said Tuesday the \"imminent threat\" posed by an al Qaeda offshoot in Syria hasn't lessened after a U.S. air campaign there.\n\nSpeaking to CNN's Jim Sciutto, Matt Olsen said by his analysis the threat from the Khorasan group \"is still in the same place as it was before\" President Barack Obama ordered airstrikes against the terror operation last month.\n\n\"This group was in a position to train without any sort of interference, they were able to recruit operatives,\" said Olsen, who stepped down as director of the National Counterterrorism Center in July. \"We saw that they were looking to test explosives. So they were in the advanced stages of plotting. They had both intent and that capability that put them nearing an execution phase of an attack.\"\n\nPresident Obama announced strikes against Khorasan in September at the same time he began the mission to \"degrade and destroy\" the Islamic State terror group in Syria and Iraq. At"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/politics/american-released-north-korea/index.html?eref=edition",
			   "N. Korea releases U.S. man",
			   "(CNN) -- Jeffrey Fowle, an American arrested in North Korea in May for leaving a bible at his hotel, has been released and is on his way home, a senior State Department official told CNN on Tuesday.\n\nAn American government plane picked up Fowle on Tuesday before flying to Guam, the official said.\n\nFowle was arrested at the airport earlier this year while trying to leave North Korea.\n\nCNN learned of Fowle's release earlier Tuesday but agreed not to report the news until he landed in Guam.\n\nWhite House Press Secretary Josh Earnest confirmed Fowle's release on Tuesday, saying the Defense Department had arranged his transportation out of the country at the North Korean government's request.\n\n\"We certainly welcome the decision,\" Earnest said, adding that the United States has no updates on the status of two other Americans imprisoned in North Korea -- Matthew Miller and Kenneth Bae -- and calling on North Korea to \"immediately release them.\"\n\nState Department spokeswoman Marie Harf echoed E"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/politics/olsen-counterterror-threat-interview-story/index.html",
			   "Former U.S. counterterror chief: 'Imminent threat' remains",
			   "Washington (CNN) -- The former head of U.S. counterterror operations said Tuesday the \"imminent threat\" posed by an al Qaeda offshoot in Syria hasn't lessened after a U.S. air campaign there.\n\nSpeaking to CNN's Jim Sciutto, Matt Olsen said by his analysis the threat from the Khorasan group \"is still in the same place as it was before\" President Barack Obama ordered airstrikes against the terror operation last month.\n\n\"This group was in a position to train without any sort of interference, they were able to recruit operatives,\" said Olsen, who stepped down as director of the National Counterterrorism Center in July. \"We saw that they were looking to test explosives. So they were in the advanced stages of plotting. They had both intent and that capability that put them nearing an execution phase of an attack.\"\n\nPresident Obama announced strikes against Khorasan in September at the same time he began the mission to \"degrade and destroy\" the Islamic State terror group in Syria and Iraq. At"
			  ],
			  [
			   "http://amanpour.blogs.cnn.com/2014/10/21/identity-politics-drive-criminal-justice-systems-from-south-africa-to-america/?hpt=hp_bn9",
			   "Identity politics drive criminal justice systems, from South Africa to America",
			   "By Mick Krever, CNN\n\nThe trial of Oscar Pistorius highlights the power of identity politics, an American civil rights lawyer who defends the disenfranchised told CNN’s Christiane Amanpour on Tuesday, as Pistorius was sentenced to five years in prison.\n\n“It's a dynamic that we see frequently,” Bryan Stevenson said. “When people come into the criminal courts with another identity, with another status, they tend to fare much better.”\n\n“This young man was a respected Olympian, an athlete who was well respected and adored and that meant that he was going to get the presumption of innocence that we offer, that we say we give to everybody but that not everybody gets.”\n\nThat is particularly true of the many disenfranchised and often innocent people Stevenson represents in the U.S., a country with its own very troubled relationship to race and justice.\n\nThe organization he founded, the Equal Justice Initiative, is headquartered in the heart of the American South – Montgomery, Alabama. His new b"
			  ],
			  [
			   "http://us.cnn.com/2014/10/21/politics/olsen-counterterror-threat-interview-story/index.html?hpt=hp_t2",
			   "Ex-official: 'Imminent threat' remains",
			   "Washington (CNN) -- The former head of U.S. counterterror operations said Tuesday the \"imminent threat\" posed by an al Qaeda offshoot in Syria hasn't lessened after a U.S. air campaign there.\n\nSpeaking to CNN's Jim Sciutto, Matt Olsen said by his analysis the threat from the Khorasan group \"is still in the same place as it was before\" President Barack Obama ordered airstrikes against the terror operation last month.\n\n\"This group was in a position to train without any sort of interference, they were able to recruit operatives,\" said Olsen, who stepped down as director of the National Counterterrorism Center in July. \"We saw that they were looking to test explosives. So they were in the advanced stages of plotting. They had both intent and that capability that put them nearing an execution phase of an attack.\"\n\nPresident Obama announced strikes against Khorasan in September at the same time he began the mission to \"degrade and destroy\" the Islamic State terror group in Syria and Iraq. At"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/politics/american-released-north-korea/index.html?eref=edition",
			   "American released from N. Korea jail",
			   "(CNN) -- Jeffrey Fowle, an American arrested in North Korea in May for leaving a bible at his hotel, has been released and is on his way home, a senior State Department official told CNN on Tuesday.\n\nAn American government plane picked up Fowle on Tuesday before flying to Guam, the official said.\n\nFowle was arrested at the airport earlier this year while trying to leave North Korea.\n\nCNN learned of Fowle's release earlier Tuesday but agreed not to report the news until he landed in Guam.\n\nWhite House Press Secretary Josh Earnest confirmed Fowle's release on Tuesday, saying the Defense Department had arranged his transportation out of the country at the North Korean government's request.\n\n\"We certainly welcome the decision,\" Earnest said, adding that the United States has no updates on the status of two other Americans imprisoned in North Korea -- Matthew Miller and Kenneth Bae -- and calling on North Korea to \"immediately release them.\"\n\nState Department spokeswoman Marie Harf echoed E"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/politics/obama-fundraiser-unpaid-bills-chicago/index.html",
			   "White House corrects record on 'unpaid bills'",
			   "(CNN) -- The White House has issued on Tuesday a corrected official transcript of a speech President Barack Obama gave Monday at a Democratic fundraiser in Chicago to include a joke he made about having unpaid parking tickets.\n\nReporters attending the event heard the president joke about his move from his Chicago home, once he was elected president: \"One of the nice things about being home is actually that it's a little bit like a time capsule. Because Michelle and I and the kids, we left so quickly that there's still junk on my desk, including some unpaid bills (laughter) -- I think eventually they got paid -- but they're sort of stacked up. And messages, newspapers and all kinds of stuff.\"\n\nBut when the official transcript was released later by the White House, the bit about the unpaid bills was missing, and without explanation: \"there's still junk on my desk, including some -- newspapers and all kinds of stuff. \"\n\nNow, a day later, the White House says that part was inaudible in the"
			  ]
			 ]
			}
			,sports: {
			 "name": "sport",
			 "expectedCat": "sports",
			 "visits": [
			  [
			   "http://edition.cnn.com/2014/10/22/sport/football/liverpool-real-madrid-champions-league/index.html",
			   "Football: Real Madrid crushes Liverpool",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- Cristiano Ronaldo took a step closer to becoming the all-time leading scorer in Champions League history after inspiring Real Madrid to a 3-0 win at Liverpool.\n\nRonaldo, who now has 70 goals to his name, is now just one behind Raul, the former Real legend.\n\nKarim Benzema scored twice for the visitors which claimed its first ever victory over the English Premier League club.\n\nReal, the defending champion, has taken nine points from nine and sits top of Group B.\n\nMore to follow..."
			  ],
			  [
			   "http://edition.cnn.com/2014/10/22/sport/football/liverpool-real-madrid-champions-league/index.html?eref=edition",
			   "Real Madrid crushes Liverpool",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- Cristiano Ronaldo took a step closer to becoming the all-time leading scorer in Champions League history after inspiring Real Madrid to a 3-0 win at Liverpool.\n\nRonaldo, who now has 70 goals to his name, is now just one behind Raul, the former Real legend.\n\nKarim Benzema scored twice for the visitors which claimed its first ever victory over the English Premier League club.\n\nReal, the defending champion, has taken nine points from nine and sits top of Group B.\n\nMore to follow..."
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/sport/football/liverpool-real-madrid-champions-league/index.html",
			   "Champions League: Real Madrid crushes Liverpool",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- Cristiano Ronaldo took a step closer to becoming the all-time leading scorer in Champions League history after inspiring Real Madrid to a 3-0 win at Liverpool.\n\nRonaldo, who now has 70 goals to his name, is now just one behind Raul, the former Real legend.\n\nKarim Benzema scored twice for the visitors which claimed its first ever victory over the English Premier League club.\n\nReal, the defending champion, has taken nine points from nine and sits top of Group B.\n\nMore to follow..."
			  ],
			  [
			   "http://edition.cnn.com/2014/10/22/sport/kosuke-kitajima-olympics-breaststroke-swimming/index.html",
			   "Golden legacy of Japan's 'Frog King'",
			   "CNN's Human to Hero series celebrates inspiration and achievement in sport. Click here for times, videos and features \n\n(CNN) -- Ask anyone from the U.S. to name a famous swimmer and they will probably say Michael Phelps. But put the same question to someone in Japan and the name that trips off the tongue is Kosuke Kitajima.\n\nThe 32-year-old has propelled not only himself but Japanese swimming into the spotlight in the 21st century thanks to a series of remarkable performances on the global stage, smashing records and scooping multiple world and Olympic titles.\n\nHis best days in the pool may be behind him but Kitajima's focus remains forward-looking as he builds on his legacy as arguably the greatest breaststroke exponent of all time.\n\nHis goal is to inspire the next generation of champions from the Far East ahead of Tokyo's 2020 hosting of the world's biggest sporting showpiece by getting them started in the pool.\n\n\"I want children to start swimming and have lots of dreams in swimming"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/22/sport/kosuke-kitajima-olympics-breaststroke-swimming/index.html?eref=edition",
			   "'Frog King': How I became a legend",
			   "CNN's Human to Hero series celebrates inspiration and achievement in sport. Click here for times, videos and features \n\n(CNN) -- Ask anyone from the U.S. to name a famous swimmer and they will probably say Michael Phelps. But put the same question to someone in Japan and the name that trips off the tongue is Kosuke Kitajima.\n\nThe 32-year-old has propelled not only himself but Japanese swimming into the spotlight in the 21st century thanks to a series of remarkable performances on the global stage, smashing records and scooping multiple world and Olympic titles.\n\nHis best days in the pool may be behind him but Kitajima's focus remains forward-looking as he builds on his legacy as arguably the greatest breaststroke exponent of all time.\n\nHis goal is to inspire the next generation of champions from the Far East ahead of Tokyo's 2020 hosting of the world's biggest sporting showpiece by getting them started in the pool.\n\n\"I want children to start swimming and have lots of dreams in swimming"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/18/sport/tennis/tennis-williams-brothers-tarpischev/index.html",
			   "Russian apologizes for Williams slur",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- Russian tennis chief Shamil Tarpischev apologized Saturday for referring to Serena and Venus Williams as the \"Williams brothers\" during a TV chat show.\n\nTarpischev, who is also a member of the International Olympic Committee (IOC), has already been carpeted by the WTA for \"insulting and demeaning\" remarks about the American siblings, being hit with a $25,000 fine and a one-year ban from tennis activities.\n\nTarpischev is the chairman of the Kremlin Cup tournament in Moscow which is finishing this weekend and has held a string of leading positions in sports administration.\n\nHe made the faux pas on a light night talk show in Russia -- Evening Urgant -- sitting next to former WTA star Elena Dementieva.\n\nWhen the subject of how difficult it was to beat the Williams sisters -- Serena has 18 grand slam titles and Venus seven -- Tarpischev made his controversial comments.\n\nAfter a translation of his remarks became public, the WTA r"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/19/sport/tennis/tennis-serena-sharapova-tarpischev/index.html",
			   "Serena angry over Russian chief's remarks",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- Serena Williams slammed Russian tennis chief Shamil Tarpischev for his \"insensitive, sexist and racist\" remarks in describing her and sister Venus as the \"Williams brothers\" on a late night TV chat show.\n\nThe world number one gave her first public reaction Sunday to Tarpischev's comments as she spoke to reporters on the eve of the WTA Tour Finals in Singapore.\n\nTarpischev, who has been banned by the WTA for a year and fined $25,000, has also made a public apology, but that has clearly not satisfied 18-time grand slam champion Williams.\n\n\"I think the WTA did a great job of taking initiative and taking immediate action to his comments. I thought they were very insensitive and extremely sexist as well as racist at the same time,\" she said.\n\nRead: Tarpischev carpeted for Williams sisters remarks\n\nWilliams, who won the U.S. Open title last month, added: \"I thought they were in a way bullying.\n\n\"But the WTA and the USTA (U.S. Ten"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/22/sport/tennis/serena-williams-halep-tennis-wta/index.html",
			   "Bad day at the office for Serena",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- It's been that type of year for Serena Williams.\n\nWilliams collected her 18th grand slam singles title at the U.S. Open in September to match retired legends Martina Navratilova and Chris Evert but prior to that didn't get past the fourth round at the three other majors in 2014.\n\nThe world No. 1 recently retired due to illness in Wuhan, China and then was a walkover in Beijing with a knee injury -- and on Wednesday at the WTA Finals in Singapore she suffered the joint worst loss of her career.\n\nSimona Halep battered Williams 6-0 6-2 to leave the two-time defending champion in danger of being eliminated in the group stage.\n\nIt matched the number of games won by Williams in 1998 -- when she was just 16 -- against South Africa's Joannette Kruger in Oklahoma.\n\nWilliams, two days after looking sharp in defeating Ana Ivanovic, made 36 unforced errors in the 14 games and the encounter lasted a mere one hour and five minutes.\n\nWhil"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/22/sport/motorsport/formula-one-gene-haas-wants-to-race-to-billions-with-formula-one-team/index.html",
			   "U.S. tycoon's $1B racing plan",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- American entrepreneur Gene Haas is a great believer in the adage \"you've got to speculate to accumulate.\"\n\nWhich goes some way to explaining why he's prepared to enter the dollar-draining world of Formula One -- and expects to make money.\n\nTthe 61-year-old NASCAR team owner has been motoring on with his plans to build his brand new Haas F1 Team from scratch to join the grid in 2016.\n\nAs the founder of Haas Automation, he sees F1's global world championship as the perfect shop window for his billion dollar machine tool manufacturing business.\n\n\"If I can achieve an extra billion in sales, we will pay for whatever F1 costs,\" the Californian told CNN's The Circuit.\n\n\"Some teams spend half a billion, some spend 50 million dollars a year,\" as Haas did the maths. \"We should be somewhere in the middle of that.\"\n\nHaas has taken note of Red Bull Racing's success in F1, a team that has won four straight world titles in the 10 years si"
			  ],
			  [
			   "http://edition.cnn.com/video/data/2.0/video/sports/2014/10/22/intv-sorokin-racism-in-world-cup.cnn.html",
			   "Racism and World Cup",
			   "CNN's Amanda Davis interviews Alexey Sorokin about how racism in Russia might play a role in the 2018 World Cup. \n  \nIf your browser has Adobe Flash Player installed, click above to play.  Otherwise, click below."
			  ],
			  [
			   "http://edition.cnn.com/2014/10/22/sport/football/sunderland-fans-ticket-refund/index.html",
			   "Refund for fans after 8-0 loss",
			   "(CNN) -- Have English Premier League club Sunderland's players set a dangerous precedent for under-performing sports teams?\n\nAfter losing 8-0 at Southampton on Saturday, Sunderland's squad has offered to refund the cost of match tickets to their 2,500 traveling supporters who made the 1,026 kilometer round trip from the north east of England to the south coast.\n\n\"We win and lose as a team, players, staff and fans,\" Sunderland captain John O'Shea told the club's website..\n\n\"However we wanted to acknowledge and thank the supporters who traveled such a long way to give us their backing and despite everything, stayed with us until the final whistle,\"\n\nIt's a gesture that could cost the Sunderland squad as much as $100,000, with any unclaimed money to be donated to Sunderland-based charity Grace House, which provides care to children who have life-shortening conditions for which there is no known cure.\n\nSaturday ignominious defeat was Sunderland's biggest in 32 years and left the club one s"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/sport/motorsport/formula-one-gene-haas-wants-to-race-to-billions-with-formula-one-team/index.html",
			   "U.S. tycoon Gene Haas wants to race to billions with Formula One team",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- American entrepreneur Gene Haas is a great believer in the adage \"you've got to speculate to accumulate.\"\n\nWhich goes some way to explaining why he's prepared to enter the dollar-draining world of Formula One -- and expects to make money.\n\nTthe 61-year-old NASCAR team owner has been motoring on with his plans to build his brand new Haas F1 Team from scratch to join the grid in 2016.\n\nAs the founder of Haas Automation, he sees F1's global world championship as the perfect shop window for his billion dollar machine tool manufacturing business.\n\n\"If I can achieve an extra billion in sales, we will pay for whatever F1 costs,\" the Californian told CNN's The Circuit.\n\n\"Some teams spend half a billion, some spend 50 million dollars a year,\" as Haas did the maths. \"We should be somewhere in the middle of that.\"\n\nHaas has taken note of Red Bull Racing's success in F1, a team that has won four straight world titles in the 10 years si"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/sports/2014/10/22/intv-scholes-baseball-royals-superfan.cnn",
			   "Meet Royals' superfan Lee SungWoo",
			   "__"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/22/sport/kosuke-kitajima-olympics-breaststroke-swimming/index.html",
			   "Golden legacy of the 'Frog King'",
			   "CNN's Human to Hero series celebrates inspiration and achievement in sport. Click here for times, videos and features \n\n(CNN) -- Ask anyone from the U.S. to name a famous swimmer and they will probably say Michael Phelps. But put the same question to someone in Japan and the name that trips off the tongue is Kosuke Kitajima.\n\nThe 32-year-old has propelled not only himself but Japanese swimming into the spotlight in the 21st century thanks to a series of remarkable performances on the global stage, smashing records and scooping multiple world and Olympic titles.\n\nHis best days in the pool may be behind him but Kitajima's focus remains forward-looking as he builds on his legacy as arguably the greatest breaststroke exponent of all time.\n\nHis goal is to inspire the next generation of champions from the Far East ahead of Tokyo's 2020 hosting of the world's biggest sporting showpiece by getting them started in the pool.\n\n\"I want children to start swimming and have lots of dreams in swimming"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/22/sport/tennis/serena-williams-halep-tennis-wta/index.html",
			   "Tennis: Serena 'embarrassed' by loss",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- It's been that type of year for Serena Williams.\n\nWilliams collected her 18th grand slam singles title at the U.S. Open in September to match retired legends Martina Navratilova and Chris Evert but prior to that didn't get past the fourth round at the three other majors in 2014.\n\nThe world No. 1 recently retired due to illness in Wuhan, China and then was a walkover in Beijing with a knee injury -- and on Wednesday at the WTA Finals in Singapore she suffered the joint worst loss of her career.\n\nSimona Halep battered Williams 6-0 6-2 to leave the two-time defending champion in danger of being eliminated in the group stage.\n\nIt matched the number of games won by Williams in 1998 -- when she was just 16 -- against South Africa's Joannette Kruger in Oklahoma.\n\nWilliams, two days after looking sharp in defeating Ana Ivanovic, made 36 unforced errors in the 14 games and the encounter lasted a mere one hour and five minutes.\n\nWhil"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/sport/football/football-champions-league-manchester-city-roma-bayern/index.html?hpt=isp_c2",
			   "Football: Rampant Bayern hits 7",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- The message will have been heard loud and clear across Europe.\n\nBayern Munich, themselves on the end of a thrashing in the European Champions League semifinals last year, dished out one of its own on Tuesday.\n\nThe German champions, led by former Barcelona coach Pep Guardiola, raced into a five-goal lead over Italian side AS Roma in their group stages clash, with just 36 minutes on the clock.\n\nIt was a devastating display of attacking football that left the thousands of fervent fans gathered in Rome's Olympic Stadium shell shocked.\n\nRead: Roma marries past and present\n\nExcept, of course, for those 5,000 supporters who had made the trip from Germany.\n\nGuardiola is aiming for a hat-trick of Champions League triumphs after securing two during his four-year spell at the Spanish giants.\n\nAnd if it carries on like this, Bayern will prove a tough nut to crack in the competition's latter stages.\n\nThe rout began on eight minutes, Dut"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/sports/2014/10/22/spc-circuit-f1-gene-haas-intv.cnn",
			   "Haas on Ferrari and doubling profits",
			   "__"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/sport/football/kreshnik-berisha-isis-jewish-football/",
			   "From Jewish football to jihad: German ISIS suspect faces jail - CNN",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- At first Alon Meyer thought it was a bad joke.\n\nWhen Kreshnik Berisha, the first suspected member of ISIS to stand trial in Germany, was arrested upon his arrival back in Frankfurt in December after spending six months in Syria, youth team football coach Meyer was left shell-shocked.\n\nThe coach thought for a while and then it slowly sank in -- this was the same boy who had once stood by his side and taken the field in the shirt of Makkabi Frankfurt, Germany's largest Jewish sports club.\n\nMeyer's phone began to buzz with journalists trying to ask him whether he remembered Berisha, a 20-year-old born in Frankfurt to Kosovan parents.\n\n\"I didn't think it was serious -- I remember when the journalist told me, I didn't believe it,\" said Meyer, who is also the president of the 40 different Makkabi clubs in Germany, which he says has some 4,500 members.\n\n\"This was a guy who used to play with Jewish players every week, he was comfor"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/22/sport/tennis/serena-williams-halep-tennis-wta/index.html?hpt=hp_bn2",
			   "Tennis: Serena's joint worst defeat",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- It's been that type of year for Serena Williams.\n\nWilliams collected her 18th grand slam singles title at the U.S. Open in September to match retired legends Martina Navratilova and Chris Evert but prior to that didn't get past the fourth round at the three other majors in 2014.\n\nThe world No. 1 recently retired due to illness in Wuhan, China and then was a walkover in Beijing with a knee injury -- and on Wednesday at the year-end championships in Singapore she suffered the joint worst loss of her career.\n\nSimona Halep battered Williams 6-0 6-2 to leave the two-time defending champion in danger of being eliminated in the group stage.\n\nIt matched the number of games won by Williams in 1998 -- when she was just 16 -- against South Africa's Joannette Kruger in Oklahoma.\n\nWilliams, two days after looking sharp in defeating Ana Ivanovic, made 36 unforced errors in the 14 games and the encounter lasted a mere one hour and five mi"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/sport/kosuke-kitajima-olympics-breaststroke-swimming/index.html",
			   "Kosuke Kitajima: The 'Frog King' who spawned a golden legacy",
			   "CNN's Human to Hero series celebrates inspiration and achievement in sport. Click here for videos and features \n\n(CNN) -- Ask anyone from the U.S. to name a famous swimmer and they will probably say Michael Phelps. But put the same question to someone in Japan and the name that trips off the tongue is Kosuke Kitajima.\n\nThe 32-year-old has propelled not only himself but Japanese swimming into the spotlight in the 21st century thanks to a series of remarkable performances on the global stage, smashing records and scooping multiple world and Olympic titles.\n\nHis best days in the pool may be behind him but Kitajima's focus remains forward-looking as he builds on his legacy as arguably the greatest breaststroke exponent of all time.\n\nHis goal is to inspire the next generation of champions from the Far East ahead of Tokyo's 2020 hosting of the world's biggest sporting showpiece by getting them started in the pool.\n\n\"I want children to start swimming and have lots of dreams in swimming,\" Kita"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/sport/tennis/serena-williams-halep-tennis-wta/index.html",
			   "Serena Williams suffers worst loss in 16 years",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- It's been that type of year for Serena Williams.\n\nWilliams collected her 18th grand slam singles title at the U.S. Open in September to match retired legends Martina Navratilova and Chris Evert but prior to that didn't get past the fourth round at the three other majors in 2014.\n\nThe world No. 1 recently retired due to illness in Wuhan, China and then was a walkover in Beijing with a knee injury -- and on Wednesday at the year-end championships in Singapore she suffered the joint worst loss of her career.\n\nSimona Halep battered Williams 6-0 6-2 to leave the two-time defending champion in danger of being eliminated in the group stage.\n\nIt matched the number of games won by Williams in 1998 -- when she was just 16 -- against South Africa's Joannette Kruger in Oklahoma.\n\nWilliams, two days after looking sharp in defeating Ana Ivanovic, made 36 unforced errors in the 14 games and the encounter lasted a mere one hour and five mi"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/sports/2014/10/22/spc-human-to-hero-kosuke-kitajima.cnn",
			   "Japan's record-breaking swimmer",
			   "__"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/22/sport/tennis/serena-williams-halep-tennis-wta/index.html?eref=edition",
			   "Serena suffers worst loss in 16 years",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- It's been that type of year for Serena Williams.\n\nWilliams collected her 18th grand slam singles title at the U.S. Open in September to match retired legends Martina Navratilova and Chris Evert but prior to that didn't get past the fourth round at the three other majors in 2014.\n\nThe world No. 1 recently retired due to illness in Wuhan, China and then was a walkover in Beijing with a knee injury -- and on Wednesday at the year-end championships in Singapore she suffered the joint worst loss of her career.\n\nSimona Halep battered Williams 6-0 6-2 to leave the two-time defending champion in danger of being eliminated in the group stage.\n\nIt matched the number of games won by Williams in 1998 -- when she was just 16 -- against South Africa's Joannette Kruger in Oklahoma.\n\nWilliams, two days after looking sharp in defeating Ana Ivanovic, made 36 unforced errors in the 14 games and the encounter lasted a mere one hour and five mi"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/22/sport/football/sunderland-fans-ticket-refund/index.html?hpt=hp_bn2",
			   "Football: Fans' refund for 8-0 loss",
			   "(CNN) -- Have English Premier League club Sunderland's players set a dangerous precedent for under-performing sports teams?\n\nAfter losing 8-0 at Southampton on Saturday, Sunderland's squad has offered to refund the cost of match tickets to their 2,500 traveling supporters who made the 1,026 kilometer round trip from the north east of England to the south coast.\n\n\"We win and lose as a team, players, staff and fans,\" Sunderland captain John O'Shea told the club's website..\n\n\"However we wanted to acknowledge and thank the supporters who traveled such a long way to give us their backing and despite everything, stayed with us until the final whistle,\"\n\nIt's a gesture that could cost the Sunderland squad as much as $100,000, with any unclaimed money to be donated to Sunderland-based charity Grace House, which provides care to children who have life-shortening conditions for which there is no known cure.\n\nSaturday ignominious defeat was Sunderland's biggest in 32 years and left the club one s"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/22/sport/football/sunderland-fans-ticket-refund/index.html?eref=edition",
			   "Players refund fans after 8-0 loss",
			   "(CNN) -- Have English Premier League club Sunderland's players set a dangerous precedent for under-performing sports teams?\n\nAfter losing 8-0 at Southampton on Saturday, Sunderland's squad has offered to refund the cost of match tickets to their 2,500 traveling supporters who made the 1,026 kilometer round trip from the north east of England to the south coast.\n\n\"We win and lose as a team, players, staff and fans,\" Sunderland captain John O'Shea told the club's website..\n\n\"However we wanted to acknowledge and thank the supporters who traveled such a long way to give us their backing and despite everything, stayed with us until the final whistle,\"\n\nIt's a gesture that could cost the Sunderland squad as much as $100,000, with any unclaimed money to be donated to Sunderland-based charity Grace House, which provides care to children who have life-shortening conditions for which there is no known cure.\n\nSaturday ignominious defeat was Sunderland's biggest in 32 years and left the club one s"
			  ],
			  [
			   "http://www.cnn.com/2014/10/22/sport/football/sunderland-fans-ticket-refund/index.html",
			   "Is this the future of football? Players refund fans after 8-0 defeat",
			   "(CNN) -- Have English Premier League club Sunderland's players set a dangerous precedent for under-performing sports teams?\n\nAfter losing 8-0 at Southampton on Saturday, Sunderland's squad has offered to refund the cost of match tickets to their 2,500 traveling supporters who made the 1,026 kilometer round trip from the north east of England to the south coast.\n\n\"We win and lose as a team, players, staff and fans,\" Sunderland captain John O'Shea told the club's website..\n\n\"However we wanted to acknowledge and thank the supporters who traveled such a long way to give us their backing and despite everything, stayed with us until the final whistle,\"\n\nIt's a gesture that could cost the Sunderland squad as much as $100,000, with any unclaimed money to be donated to Sunderland-based charity Grace House, which provides care to children who have life-shortening conditions for which there is no known cure.\n\nSaturday ignominious defeat was Sunderland's biggest in 32 years and left the club one s"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/sport/pistorious-sentence-brand-comeback/index.html",
			   "Is 'Blade Runner' finished?",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- He was the \"Blade Runner,\" the miracle man and the Paralympic athlete that could take on the very best able-bodied competitors.\n\nIt was a high-profile career that inspired millions, earned lucrative sponsorship deals and bridged the gap between Olympic and Paralympic competition.\n\nYet those remarkable sporting triumphs and the fame and fortune it brought Oscar Pistorius receded into the distance as the South African stood motionless in the dock in Pretoria as on Valentine's Day 2013.\n\nIn the most favorable scenario for Pistorius, he could be released from prison in 10 months under house arrest.\n\nBut even then, former athletes, officials and marketing experts believe a full comeback will be extremely difficult.\n\nThe competition ban\n\nA dramatic return in time for the 2016 Paralympics is out of the question after the International Paralympic Committee (IPC) stated that Pistorius would be banned from competing for five years.\n\n"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/22/sport/football/sunderland-fans-ticket-refund/index.html",
			   "Football: Refund for fans after 8-0 loss",
			   "(CNN) -- Have English Premier League club Sunderland's players set a dangerous precedent for under-performing sports teams?\n\nAfter losing 8-0 at Southampton on Saturday, Sunderland's squad has offered to refund the cost of match tickets to their 2,500 traveling supporters who made the 1,026 kilometer round trip from the north east of England to the south coast.\n\n\"We win and lose as a team, players, staff and fans,\" Sunderland captain John O'Shea told the club's website..\n\n\"However we wanted to acknowledge and thank the supporters who traveled such a long way to give us their backing and despite everything, stayed with us until the final whistle,\"\n\nIt's a gesture that could cost the Sunderland squad as much as $100,000, with any unclaimed money to be donated to Sunderland-based charity Grace House, which provides care to children who have life-shortening conditions for which there is no known cure.\n\nSaturday ignominious defeat was Sunderland's biggest in 32 years and left the club one s"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/12/sport/motorsport/formula-one-russian-grand-prix/index.html",
			   "Title for Mercedes",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- The seesawing emotional highs and lows that infuse motor racing were perfectly illustrated at the inaugural Russian Grand Prix.\n\nLewis Hamilton raced to an easy victory at the Sochi circuit on Sunday to secure a first-ever team title for Mercedes.\n\nThe champagne bubbled in plastic cups and there were raucous renditions of \"We Are The Champions\" from the team garage.\n\nBut Mercedes motorsport director Toto Wolff brought the revelers back to earth with a dose of reality.\n\n\"We don't forget about Jules,\" he told Sky television after the race. \"This is still overshadowing everything we do. The sport is a side story.\"\n\nThe Formula One community had a clear message in Russia -- it was racing for stricken Marussia driver Jules Bianchi, who is seriously ill after an accident seven days ago at the Japanese round of the world championship.\n\nHis family revealed in a statement Thursday, the 25-year-old Frenchman had suffered a \"diffuse a"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/sport/pistorious-sentence-brand-comeback/index.html?eref=edition",
			   "Is 'Blade Runner's' career over?",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- He was the \"Blade Runner,\" the miracle man and the Paralympic athlete that could take on the very best able-bodied competitors.\n\nIt was a high-profile career that inspired millions, earned lucrative sponsorship deals and bridged the gap between Olympic and Paralympic competition.\n\nYet those remarkable sporting triumphs and the fame and fortune it brought Oscar Pistorius receded into the distance as the South African stood motionless in the dock in Pretoria as on Valentine's Day 2013.\n\nIn the most favorable scenario for Pistorius, he could be released from prison in 10 months under house arrest.\n\nBut even then, former athletes, officials and marketing experts believe a full comeback will be extremely difficult.\n\nThe competition ban\n\nA dramatic return in time for the 2016 Paralympics is out of the question after the International Paralympic Committee (IPC) stated that Pistorius would be banned from competing for five years.\n\n"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/19/world/sporting-event-host-countries-trends/index.html?eref=edition",
			   "Which states want to host sporting events?",
			   "(CNN) -- The procedure, now, is commonplace. A glitzy stage, manned by executives in suits, an envelope dramatically opened. Then, cheers from representatives of the successful bid.\n\nDespite these regular, euphoric scenes not every country seems to have aspirations to host a major sporting event. Earlier this month, Norway withdrew its bid for Oslo to host the 2022 edition of the Winter Olympics, following Stockholm, Krakow and Lviv in Ukraine in dropping out of the process to host the tournament.\n\nMunich, which was also considering a bid, decided not to pursue it, following a referendum.\n\n\"The vote is not a signal against the sport, but against the non-transparency and the greed for profit of the IOC (International Olympic Committee),\" said Ludwig Hartmann, an anti-Olympic bid campaigner and Green Party lawmaker in the Bavarian state legislature.\n\nDespite several attempts, the IOC did not respond to requests for comments from CNN.\n\nThe Polish bid and a joint Davos/St. Moritz attempt a"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/sport/football/football-champions-league-manchester-city-roma-bayern/index.html?eref=edition",
			   "Soccer: Bayern humiliates Roma",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- The message will have been heard loud and clear across Europe.\n\nBayern Munich, themselves on the end of a thrashing in the European Champions League semifinals last year, dished out one of its own on Tuesday.\n\nThe German champions, led by former Barcelona coach Pep Guardiola, raced into a five-goal lead over Italian side AS Roma in their group stages clash, with just 36 minutes on the clock.\n\nIt was a devastating display of attacking football that left the thousands of fervent fans gathered in Rome's Olympic Stadium shell shocked.\n\nRead: Roma marries past and present\n\nExcept, of course, for those 5,000 supporters who had made the trip from Germany.\n\nGuardiola is aiming for a hat-trick of Champions League triumphs after securing two during his four-year spell at the Spanish giants.\n\nAnd if it carries on like this, Bayern will prove a tough nut to crack in the competition's latter stages.\n\nThe rout began on eight minutes, Dut"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/19/world/sporting-event-host-countries-trends/index.html?eref=edition",
			   "Which countries are still in the running?",
			   "(CNN) -- The procedure, now, is commonplace. A glitzy stage, manned by executives in suits, an envelope dramatically opened. Then, cheers from representatives of the successful bid.\n\nDespite these regular, euphoric scenes not every country seems to have aspirations to host a major sporting event. Earlier this month, Norway withdrew its bid for Oslo to host the 2022 edition of the Winter Olympics, following Stockholm, Krakow and Lviv in Ukraine in dropping out of the process to host the tournament.\n\nMunich, which was also considering a bid, decided not to pursue it, following a referendum.\n\n\"The vote is not a signal against the sport, but against the non-transparency and the greed for profit of the IOC (International Olympic Committee),\" said Ludwig Hartmann, an anti-Olympic bid campaigner and Green Party lawmaker in the Bavarian state legislature.\n\nDespite several attempts, the IOC did not respond to requests for comments from CNN.\n\nThe Polish bid and a joint Davos/St. Moritz attempt a"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/sports/2014/10/22/intv-sorokin-racism-in-world-cup.cnn",
			   "Racism and the World Cup",
			   "__"
			  ],
			  [
			   "http://us.cnn.com/2014/10/20/sport/world-series-lorde-royals/index.html?hpt=hp_c2",
			   "Stations ban Lorde's 'Royals'",
			   "(CNN) -- With the World Series on the line, radio stations in San Francisco aren't taking any chances.\n\nStarting Tuesday the San Francisco Giants will face off against the Kansas City Royals in baseball's championship series, and two local radio stations decided they'd send a message.\n\n\"No offense, Lorde, but for the duration of the World Series, KFOG Radio will be a \"Royals\"-free zone,\" the radio station posted on it's Facebook page. \"We're sure you understand.\"\n\n7 reasons why Kansas City's a winner\n\nLorde, the 17-year-old pop star from New Zealand, won a song of the year Grammy earlier this year for her No. 1 hit, \"Royals.\"\n\nKOIT said its ban was prompted by listener complaints.\n\n\"So @965KOIT banned the Lorde song Royals? That's awesome!\" tweeted someone known as The Sassy PETIT.\n\nBut not everyone thinks the ban rules. Louis Vargas opined on KFOG's Facebook page that the ban will make no difference in the series outcome, calling the move absurd. Tony Last complained that the song doe"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/sport/football/football-champions-league-manchester-city-roma-bayern/index.html",
			   "Football: Rampant Bayern hits seven",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- The message will have been heard loud and clear across Europe.\n\nBayern Munich, themselves on the end of a thrashing in the European Champions League semifinals last year, dished out one of its own on Tuesday.\n\nThe German champions, led by former Barcelona coach Pep Guardiola, raced into a five-goal lead over Italian side AS Roma in their group stages clash, with just 36 minutes on the clock.\n\nIt was a devastating display of attacking football that left the thousands of fervent fans gathered in Rome's Olympic Stadium shell shocked.\n\nRead: Roma marries past and present\n\nExcept, of course, for those 5,000 supporters who had made the trip from Germany.\n\nGuardiola is aiming for a hat-trick of Champions League triumphs after securing two during his four-year spell at the Spanish giants.\n\nAnd if it carries on like this, Bayern will prove a tough nut to crack in the competition's latter stages.\n\nThe rout began on eight minutes, Dut"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/sport/football/football-champions-league-manchester-city-roma-bayern/index.html?eref=edition",
			   "Bayern humiliates Roma",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- The message will have been heard loud and clear across Europe.\n\nBayern Munich, themselves on the end of a thrashing in the European Champions League semifinals last year, dished out one of its own on Tuesday.\n\nThe German champions, led by former Barcelona coach Pep Guardiola, raced into a five-goal lead over Italian side Roma in their group stages clash, with just 36 minutes on the clock.\n\nIt was a devastating display of attacking football that left the thousands of fervent fans gathered in Rome's Olympic Stadium shell shocked.\n\nRead: From Jewish soccer to jihad\n\nExcept, of course, for those 5,000 supporters who had made the trip from Germany.\n\nGuardiola is aiming for a hat-trick of Champions League triumphs after securing two during his four-year spell at the Spanish giants.\n\nAnd if it carries on like this, Bayern will prove a tough nut to crack in the competition's latter stages.\n\nThe rout began on eight minutes, Dutch in"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/sport/football/football-champions-league-manchester-city-roma-bayern/index.html",
			   "Bayern smashes seven past Roma",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- The message will have been heard loud and clear across Europe.\n\nBayern Munich, themselves on the end of a thrashing in the European Champions League semifinals last year, dished out one of its own on Tuesday.\n\nThe German champions, led by former Barcelona coach Pep Guardiola, raced into a five-goal lead over Italian side Roma in their group stages clash, with just 36 minutes on the clock.\n\nIt was a devastating display of attacking football that left the thousands of fervent fans gathered in Rome's Olympic Stadium shell shocked.\n\nRead: From Jewish soccer to jihad\n\nExcept, of course, for those 5,000 supporters who had made the trip from Germany.\n\nGuardiola is aiming for a hat-trick of Champions League triumphs after securing two during his four-year spell at the Spanish giants.\n\nAnd if it carries on like this, Bayern will prove a tough nut to crack in the competition's latter stages.\n\nThe rout began on eight minutes, Dutch in"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/sport/football/football-champions-league-manchester-city-roma-bayern/index.html",
			   "Bayern Munich thumps Roma; Man City held in Moscow",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- The message will have been heard loud and clear across Europe.\n\nBayern Munich, themselves on the end of a thrashing in the European Champions League semifinals last year, dished out one of its own on Tuesday.\n\nThe German champions, led by former Barcelona coach Pep Guardiola, raced into a five-goal lead over Italian side Roma in their group stages clash, with just 36 minutes on the clock.\n\nIt was a devastating display of attacking football that left the thousands of fervent fans gathered in Rome's Olympic Stadium shellshocked.\n\nRead: From Jewish soccer to jihad\n\nExcept, of course, for those 5,000 supporters who had made the trip from Germany.\n\nGuardiola is aiming for a hat-trick of Champions League triumphs after securing two during his four-year spell at the Spanish giants.\n\nAnd if it carries on like this, Bayern will prove a tough nut to crack in the competition's latter stages.\n\nThe rout began on eight minutes, Dutch int"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/sport/football/football-champions-league-manchester-city-roma-bayern/index.html?eref=edition",
			   "3 thrashings in European ties",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- The message will have been heard loud and clear across Europe.\n\nBayern Munich, themselves on the end of a thrashing in the European Champions League semifinals last year, dished out one of its own on Tuesday.\n\nThe German champions, led by former Barcelona coach Pep Guardiola, raced into a five-goal lead over Italian side Roma in their group stages clash, with just 36 minutes on the clock.\n\nIt was a devastating display of attacking football that left the thousands of fervent fans gathered in Rome's Olympic Stadium shellshocked.\n\nRead: From Jewish soccer to jihad\n\nExcept, of course, for those 5,000 supporters who had made the trip from Germany.\n\nGuardiola is aiming for a hat-trick of Champions League triumphs after securing two during his four-year spell at the Spanish giants.\n\nAnd if it carries on like this, Bayern will prove a tough nut to crack in the competition's latter stages.\n\nThe rout began on eight minutes, Dutch int"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/sport/pistorious-sentence-brand-comeback/index.html?eref=edition",
			   "Can 'Blade Runner' revive career?",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- He was the \"Blade Runner,\" the miracle man and the Paralympic athlete that could take on the very best able-bodied competitors.\n\nIt was a high-profile career that inspired millions, earned lucrative sponsorship deals and bridged the gap between Olympic and Paralympic competition.\n\nYet those remarkable sporting triumphs and the fame and fortune it brought Oscar Pistorius receded into the distance as the South African stood motionless in the dock in Pretoria as on Valentine's Day 2013.\n\nIn the most favorable scenario for Pistorius, he could be released from prison in 10 months under house arrest.\n\nBut even then, former athletes, officials and marketing experts believe a full comeback will be extremely difficult.\n\nThe competition ban\n\nA dramatic return in time for the 2016 Paralympics is out of the question after the International Paralympic Committee (IPC) stated that Pistorius would be banned from competing for five years.\n\n"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/sport/football/football-champions-league-manchester-city-roma-bayern/index.html?hpt=hp_bn2",
			   "Football: Man City held in Moscow",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- The sound of silence is one Russian club CSKA Moscow is getting used to.\n\nFor the second time in a month its 18,600 capacity Arena Khimki was closed to fans after sanctions from European soccer's governing body relating to incidents of racism.\n\nBut it didn't seem to affect the Russian champions, as they carved out an unlikely 2-2 draw against English counterparts Manchester City.\n\nA controversial late penalty from Bebars Natcho canceled out goals from Sergio Aguero and James Milner meaning the star-studded Premier League holders now face an uphill task to qualify from its group.\n\nRead: From Jewish soccer to jihad\n\nThe match was played out in sub zero temperatures and in front of just a handful of spectators after UEFA decreed CSKA's stadium must be closed to fans for its next three European games.\n\nUEFA charged the club with racism for the third time in a year after troubled flared during CSKA's defeat to AS Roma in Septemb"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/sport/football/roma-james-pallotta-colosseum/index.html?eref=edition",
			   "American gladiator who conquered Roma",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n\"Brothers, what we do in life echoes in eternity\" (line from the film Gladiator)\n\nGladiators, ready?\n\nFrom the ancient ruins of Rome, a new empire rises.\n\nBut with a nod to the past, the city's newest gladiator James Pallotta's eyes light up when his thoughts turn to historic sites like the Colosseum.\n\nFor if all roads lead to Rome, the AS Roma president is leaving no stone unturned in his intention to marry the Eternal City's historic past with Italian football's new emerging force.\n\n\"I have one big goal,\" Pallotta tells CNN, with an infectious smile. \"I want to get the city to let us play somebody like Barcelona or Bayern Munich or someone like that at the Colosseum.\"\n\nWhile the idea might have the marketing department rubbing their hands with glee, Pallotta could have his work cut out, persuading those maintaining these sites to allow Francesco Totti and Daniel de Rossi to put on an altogether different kind of gladiatorial show."
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/sport/football/football-champions-league-manchester-city-roma-bayern/index.html?eref=edition",
			   "Man City stunned in Moscow",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- The sound of silence is one Russian club CSKA Moscow is getting used to.\n\nFor the second time in a month its 18,600 capacity Arena Khimki was closed to fans after sanctions from European soccer's governing body relating to incidents of racism.\n\nBut it didn't seem to affect the Russian champions, as they carved out an unlikely 2-2 draw against English counterparts Manchester City.\n\nA controversial late penalty from Bebars Natcho canceled out goals from Sergio Aguero and James Milner meaning the star-studded Premier League holders now face an uphill task to qualify from its group.\n\nRead: From Jewish soccer to jihad\n\nThe match was played out in sub zero temperatures and in front of just a handful of spectators after UEFA decreed CSKA's stadium must be closed to fans for its next three European games.\n\nUEFA charged the club with racism for the third time in a year after troubled flared during CSKA's defeat to AS Roma in Septemb"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/sport/football/football-champions-league-manchester-city-roma-bayern/index.html",
			   "Manchester City stunned behind closed doors in Moscow",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- The sound of silence is one Russian club CSKA Moscow is getting used to.\n\nFor the second time in a month its 18,600 capacity Arena Khimki was closed to fans after sanctions from European soccer's governing body relating to incidents of racism.\n\nBut it didn't seem to affect the Russian champions, as they carved out an unlikely 2-2 draw against English counterparts Manchester City.\n\nA controversial late penalty from Bebars Natcho canceled out goals from Sergio Aguero and James Milner meaning the star-studded Premier League holders now face an uphill task to qualify from its group.\n\nRead: From Jewish soccer to jihad\n\nThe match was played out in sub zero temperatures and in front of just a handful of spectators after UEFA decreed CSKA's stadium must be closed to fans for its next three European games.\n\nUEFA charged the club with racism for the third time in a year after troubled flared during CSKA's defeat to AS Roma in Septemb"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/sport/pistorious-sentence-brand-comeback/index.html?eref=edition",
			   "Is the 'Blade Runner' finished?",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- He was the \"Blade Runner,\" the miracle man and the Paralympic athlete that could take on the very best able-bodied competitors.\n\nIt was a high-profile career that inspired millions, earned lucrative sponsorship deals and bridged the gap between Olympic and Paralympic competition.\n\nYet those remarkable sporting triumphs and the fame and fortune it brought Oscar Pistorius receded into the distance as the South African stood motionless in the dock in Pretoria as on Valentine's Day 2013.\n\nIn the most favorable scenario for Pistorius, he could be released from prison in 10 months under house arrest.\n\nBut even then, former athletes, officials and marketing experts believe a full comeback will be extremely difficult.\n\nThe competition ban\n\nA dramatic return in time for the 2016 Paralympics is out of the question after the International Paralympic Committee (IPC) stated that Pistorius would be banned from competing for five years.\n\n"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/sport/football/kreshnik-berisha-isis-jewish-football/index.html?eref=edition",
			   "'Jihadi' trial",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- At first Alon Meyer thought it was a bad joke.\n\nWhen Kreshnik Berisha, the first suspected member of ISIS to stand trial in Germany, was arrested upon his arrival back in Frankfurt in December after spending six months in Syria, youth team football coach Meyer was left shell-shocked.\n\nThe coach thought for a while and then it slowly sank in -- this was the same boy who had once stood by his side and taken the field in the shirt of Makkabi Frankfurt, Germany's largest Jewish sports club.\n\nMeyer's phone began to buzz with journalists trying to ask him whether he remembered Berisha, a 20-year-old born in Frankfurt to Kosovan parents.\n\n\"I didn't think it was serious -- I remember when the journalist told me, I didn't believe it,\" said Meyer, who is also the president of the 40 different Makkabi clubs in Germany, which he says has some 4,500 members.\n\n\"This was a guy who used to play with Jewish players every week, he was comfor"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/sport/football/kreshnik-berisha-isis-jewish-football/index.html?eref=edition",
			   "From Jewish football to jihad?",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- At first Alon Meyer thought it was a bad joke.\n\nWhen Kreshnik Berisha, the first suspected member of ISIS to stand trial in Germany, was arrested upon his arrival back in Frankfurt in December after spending six months in Syria, youth team football coach Meyer was left shell-shocked.\n\nThe coach thought for a while and then it slowly sank in -- this was the same boy who had once stood by his side and taken the field in the shirt of Makkabi Frankfurt, Germany's largest Jewish sports club.\n\nMeyer's phone began to buzz with journalists trying to ask him whether he remembered Berisha, a 20-year-old born in Frankfurt to Kosovan parents.\n\n\"I didn't think it was serious -- I remember when the journalist told me, I didn't believe it,\" said Meyer, who is also the president of the 40 different Makkabi clubs in Germany, which he says has some 4,500 members.\n\n\"This was a guy who used to play with Jewish players every week, he was comfor"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/sport/football/kreshnik-berisha-isis-jewish-football/index.html?eref=edition",
			   "From Jewish football to jihad",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- At first Alon Meyer thought it was a bad joke.\n\nWhen Kreshnik Berisha, the first suspected member of ISIS to stand trial in Germany, was arrested upon his arrival back in Frankfurt in December after spending six months in Syria, youth team football coach Meyer was left shell-shocked.\n\nThe coach thought for a while and then it slowly sank in -- this was the same boy who had once stood by his side and taken the field in the shirt of Makkabi Frankfurt, Germany's largest Jewish sports club.\n\nMeyer's phone began to buzz with journalists trying to ask him whether he remembered Berisha, a 20-year-old born in Frankfurt to Kosovan parents.\n\n\"I didn't think it was serious -- I remember when the journalist told me, I didn't believe it,\" said Meyer, who is also the president of the 40 different Makkabi clubs in Germany, which he says has some 4,500 members.\n\n\"This was a guy who used to play with Jewish players every week, he was comfor"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/sport/football/roma-james-pallotta-colosseum/index.html?eref=edition",
			   "How American conquered Rome",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n\"Brothers, what we do in life echoes in eternity\" (line from the film Gladiator)\n\nGladiators, ready?\n\nFrom the ancient ruins of Rome, a new empire rises.\n\nBut with a nod to the past, the city's newest gladiator James Pallotta's eyes light up when his thoughts turn to historic sites like the Colosseum.\n\nFor if all roads lead to Rome, the AS Roma president is leaving no stone unturned in his intention to marry the Eternal City's historic past with Italian football's new emerging force.\n\n\"I have one big goal,\" Pallotta tells CNN, with an infectious smile. \"I want to get the city to let us play somebody like Barcelona or Bayern Munich or someone like that at the Colosseum.\"\n\nWhile the idea might have the marketing department rubbing their hands with glee, Pallotta could have his work cut out, persuading those maintaining these sites to allow Francesco Totti and Daniel de Rossi to put on an altogether different kind of gladiatorial show."
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/sport/pistorious-sentence-brand-comeback/index.html",
			   "Pistorius: Is the 'Blade Runner' finished?",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- He was the \"Blade Runner,\" the miracle man and the Paralympic athlete that could take on the very best able-bodied competitors.\n\nIt was a high-profile career that inspired millions, earned lucrative sponsorship deals and bridged the gap between Olympic and Paralympic competition.\n\nYet those remarkable sporting triumphs and the fame and fortune it brought Oscar Pistorius receded into the distance as the South African stood motionless in the dock in Pretoria as on Valentine's Day 2013.\n\nIn the most favorable scenario for Pistorius, he could be released from prison in 10 months under house arrest.\n\nBut even then, former athletes, officials and marketing experts believe a full comeback will be extremely difficult.\n\nThe competition ban\n\nA dramatic return in time for the 2016 Paralympics is out of the question after the International Paralympic Committee (IPC) stated that Pistorius would be banned from competing for five years.\n\n"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/sport/pistorious-sentence-brand-comeback/index.html?eref=edition",
			   "Pistorius: Is 'Blade Runner' finished?",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- He was the \"Blade Runner,\" the miracle man and the Paralympic athlete that could take on the very best able-bodied competitors.\n\nIt was a high-profile career that inspired millions, earned lucrative sponsorship deals and bridged the gap between Olympic and Paralympic competition.\n\nYet those remarkable sporting triumphs and the fame and fortune it brought Oscar Pistorius receded into the distance as the South African stood motionless in the dock in Pretoria as on Valentine's Day 2013.\n\nIn the most favorable scenario for Pistorius, he could be released from prison in 10 months under house arrest.\n\nBut even then, former athletes, officials and marketing experts believe a full comeback will be extremely difficult.\n\nThe competition ban\n\nA dramatic return in time for the 2016 Paralympics is out of the question after the International Paralympic Committee (IPC) stated that Pistorius would be banned from competing for five years.\n\n"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/sport/pistorious-sentence-brand-comeback/index.html",
			   "Oscar Pistorius: Is the 'Blade Runner's' career finished?",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- He was the \"Blade Runner,\" the miracle man and the Paralympic athlete that could take on the very best able-bodied competitors.\n\nIt was a high-profile career that inspired millions, earned lucrative sponsorship deals and bridged the gap between Olympic and Paralympic competition.\n\nYet those remarkable sporting triumphs and the fame and fortune it brought Oscar Pistorius receded into the distance as the South African stood motionless in the dock in Pretoria as on Valentine's Day 2013.\n\nIn the most favorable scenario for Pistorius, he could be released from prison in 10 months under house arrest.\n\nBut even then, former athletes, officials and marketing experts believe a full comeback will be extremely difficult.\n\nThe competition ban\n\nA dramatic return in time for the 2016 Paralympics is out of the question after the International Paralympic Committee (IPC) stated that Pistorius would be banned from competing for five years.\n\n"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/sport/football/roma-james-pallotta-colosseum/index.html",
			   "James Pallotta: Rome's newest gladiator?",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n\"Brothers, what we do in life echoes in eternity\" (line from the film Gladiator)\n\nGladiators, ready?\n\nFrom the ancient ruins of Rome, a new empire rises.\n\nBut with a nod to the past, the city's newest gladiator James Pallotta's eyes light up when his thoughts turn to historic sites like the Colosseum.\n\nFor if all roads lead to Rome, the AS Roma president is leaving no stone unturned in his intention to marry the Eternal City's historic past with Italian football's new emerging force.\n\n\"I have one big goal,\" Pallotta tells CNN, with an infectious smile. \"I want to get the city to let us play somebody like Barcelona or Bayern Munich or someone like that at the Colosseum.\"\n\nWhile the idea might have the marketing department rubbing their hands with glee, Pallotta could have his work cut out, persuading those maintaining these sites to allow Francesco Totti and Daniel de Rossi to put on an altogether different kind of gladiatorial show."
			  ],
			  [
			   "http://edition.cnn.com/2014/10/15/sport/football/albania-prime-minister-brother/index.html",
			   "Albania hits back over allegations",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- It's a plot twist that even a thriller writer might have struggled to come up with during Serbia's European qualifying clash with Albania in Belgrade.\n\nA drone flying a flag depicting the \"Greater Albania\" over a major international soccer game Tuesday was the subject of a 'whodunnit' mystery after the brother of the Albanian prime minister hit back at allegations by a Serbian government official that he had been piloting the quadcopter.\n\n\"I am very disgusted by the allegation of my having any involvement in the piloting of the drone,\" Olsi Rama told CNN Wednesday, who said he had been taking pictures of the game from a VIP suite at the stadium.\n\nAs a football match mushroomed into a diplomatic incident amid claim and counter-claim in a region of a world that is still riven by ethnic divisions, his version of events conflicted with Serbia's version of events.\n\n\"According to the information from the police he (Olsi Rama) was"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/13/sport/football/football-euro-2016-netherlands-iceland-italy-odegaard/index.html",
			   "Teen, 15, makes Euro history",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- Few 15-year-olds can claim to make history, but Martin Odegaard is fast accumulating a clutch of firsts in football.\n\nBy coming on as a second half substitute in Norway's clash with Bulgaria on Monday, he became the youngest player ever to appear in European Championships qualifying at just 15 years and 300 days.\n\nHe is already the youngest player to represent his country -- featuring in a friendly with United Arab Emirates in August -- as well as the youngest player, and scorer, in the country's top league.\n\nAnd Odegaard didn't look out of place during his 27-minute cameo, as Norway beat Bulgaria 2-1 in its Euro 2016 Group H clash.\n\nRead: European soccer's most coveted 15-year-old\n\nNo wonder then, that scouts from clubs all over Europe -- including English Premier League pair Manchester United and Liverpool -- are on the tail of one of the continent's hottest prospects.\n\n\"In the beginning it was unreal and a little bit sur"
			  ],
			  [
			   "http://edition.cnn.com/video/data/2.0/video/sports/2014/10/21/bpr-pistorius-craig-spence-paralympic-committee.cnn.html?eref=edition",
			   "Will Pistorius compete again?",
			   "Craig Spence from the IPC tells Alex Thomas that Pistorius will be banned from competing for the 5 years of his sentence. \n  \nIf your browser has Adobe Flash Player installed, click above to play.  Otherwise, click below."
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/sport/football/roma-james-pallotta-colosseum/index.html?eref=edition",
			   "Soccer gladiators in the Colosseum?",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n\"Brothers, what we do in life echoes in eternity\" (line from the film Gladiator)\n\nGladiators, ready?\n\nFrom the ancient ruins of Rome, a new empire rises.\n\nBut with a nod to the past, the city's newest gladiator James Pallotta's eyes light up when his thoughts turn to historic sites like the Colosseum.\n\nFor if all roads lead to Rome, the AS Roma president is leaving no stone unturned in his intention to marry the Eternal City's historic past with Italian football's new emerging force.\n\n\"I have one big goal,\" Pallotta tells CNN, with an infectious smile. \"I want to get the city to let us play somebody like Barcelona or Bayern Munich or someone like that at the Colosseum.\"\n\nWhile the idea might have the marketing department rubbing their hands with glee, Pallotta could have his work cut out, persuading those maintaining these sites to allow Francesco Totti and Daniel de Rossi to put on an altogether different kind of gladiatorial show."
			  ],
			  [
			   "http://www.cnn.com/video/#/video/sports/2014/10/21/bpr-pistorius-craig-spence-paralympic-committee.cnn",
			   "Will Pistorius be able to compete again?",
			   "__"
			  ],
			  [
			   "http://us.cnn.com/2014/10/21/sport/football/kreshnik-berisha-isis-jewish-football/index.html?hpt=hp_t2",
			   "From Jewish soccer to ISIS suspect",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- At first Alon Meyer thought it was a bad joke.\n\nWhen Kreshnik Berisha, the first suspected member of ISIS to stand trial in Germany, was arrested upon his arrival back in Frankfurt in December after spending six months in Syria, youth team football coach Meyer was left shell-shocked.\n\nThe coach thought for a while and then it slowly sank in -- this was the same boy who had once stood by his side and taken the field in the shirt of Makkabi Frankfurt, Germany's largest Jewish sports club.\n\nMeyer's phone began to buzz with journalists trying to ask him whether he remembered Berisha, a 20-year-old born in Frankfurt to Kosovan parents.\n\n\"I didn't think it was serious -- I remember when the journalist told me, I didn't believe it,\" said Meyer, who is also the president of the 40 different Makkabi clubs in Germany, which he says has some 4,500 members.\n\n\"This was a guy who used to play with Jewish players every week, he was comfor"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/20/sport/golf/golf-presidents-white-house/index.html",
			   "How golf took over White House",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- American Presidents have come and gone -- but one club tends to unite them all.\n\nSo often a meeting point for the captains of politics and industry, the golf course has been one of the most popular friends of U.S. leaders since the early part of the 20th century.\n\nFrom William Taft, the 27th President, who introduced the game to the White House, through to Barack Obama, the game has remained a constant in American political life.\n\nIf Obama has been criticized in recent weeks for spending too much time on the course, there are other presidents who have been equally ardent golfers.\n\n\"Golf has inspired Presidents throughout history,\" Mike Troestl, historian at the United States Golf Association, told CNN.\n\n\"It's good exercise but there's also the chance for dialogue with people in politics.\n\n\"It's a game of integrity and Presidents have seen golf as the sport of leaders.\"\n\nAll but three of the 18 presidents since the start of "
			  ],
			  [
			   "http://www.cnn.com/2014/10/20/sport/world-series-lorde-royals/index.html",
			   "San Fran stations ban Lorde's 'Royals'",
			   "(CNN) -- With the World Series on the line, radio stations in San Francisco aren't taking any chances.\n\nStarting Tuesday the San Francisco Giants will face off against the Kansas City Royals in baseball's championship series, and two local radio stations decided they'd send a message.\n\n\"No offense, Lorde, but for the duration of the World Series, KFOG Radio will be a \"Royals\"-free zone,\" the radio station posted on it's Facebook page. \"We're sure you understand.\"\n\n7 reasons why Kansas City's a winner\n\nLorde, the 17-year-old pop star from New Zealand, won a song of the year Grammy earlier this year for her No. 1 hit, \"Royals.\"\n\nKOIT said its ban was prompted by listener complaints.\n\n\"So @965KOIT banned the Lorde song Royals? That's awesome!\" tweeted someone known as The Sassy PETIT.\n\nBut not everyone thinks the ban rules. Louis Vargas opined on KFOG's Facebook page that the ban will make no difference in the series outcome, calling the move absurd. Tony Last complained that the song doe"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/sport/football/roma-james-pallotta-colosseum/index.html?eref=edition",
			   "The first American gladiator?",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n\"Brothers, what we do in life echoes in eternity\" (line from the film Gladiator)\n\nGladiators, ready?\n\nFrom the ancient ruins of Rome, a new empire rises.\n\nBut with a nod to the past, the city's newest gladiator James Pallotta's eyes light up when his thoughts turn to historic sites like the Colosseum.\n\nFor if all roads lead to Rome, the AS Roma president is leaving no stone unturned in his intention to marry the Eternal City's historic past with Italian football's new emerging force.\n\n\"I have one big goal,\" Pallotta tells CNN, with an infectious smile. \"I want to get the city to let us play somebody like Barcelona or Bayern Munich or someone like that at the Colosseum.\"\n\nWhile the idea might have the marketing department rubbing their hands with glee, Pallotta could have his work cut out, persuading those maintaining these sites to allow Francesco Totti and Daniel de Rossi to put on an altogether different kind of gladiatorial show."
			  ],
			  [
			   "http://us.cnn.com/2014/10/21/sport/football/kreshnik-berisha-isis-jewish-football/index.html?hpt=hp_t2",
			   "From Jewish football to ISIS suspect",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- At first Alon Meyer thought it was a bad joke.\n\nWhen Kreshnik Berisha, the first suspected member of ISIS to stand trial in Germany, was arrested upon his arrival back in Frankfurt in December after spending six months in Syria, youth team football coach Meyer was left shell-shocked.\n\nThe coach thought for a while and then it slowly sank in -- this was the same boy who had once stood by his side and taken the field in the shirt of Makkabi Frankfurt, Germany's largest Jewish sports club.\n\nMeyer's phone began to buzz with journalists trying to ask him whether he remembered Berisha, a 20-year-old born in Frankfurt to Kosovan parents.\n\n\"I didn't think it was serious -- I remember when the journalist told me, I didn't believe it,\" said Meyer, who is also the president of the 40 different Makkabi clubs in Germany, which he says has some 4,500 members.\n\n\"This was a guy who used to play with Jewish players every week, he was comfor"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/sport/football/kreshnik-berisha-isis-jewish-football/index.html",
			   "Jewish football to ISIS suspect",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- At first Alon Meyer thought it was a bad joke.\n\nWhen Kreshnik Berisha, the first suspected member of ISIS to stand trial in Germany, was arrested upon his arrival back in Frankfurt in December after spending six months in Syria, youth team football coach Meyer was left shell-shocked.\n\nThe coach thought for a while and then it slowly sank in -- this was the same boy who had once stood by his side and taken the field in the shirt of Makkabi Frankfurt, Germany's largest Jewish sports club.\n\nMeyer's phone began to buzz with journalists trying to ask him whether he remembered Berisha, a 20-year-old born in Frankfurt to Kosovan parents.\n\n\"I didn't think it was serious -- I remember when the journalist told me, I didn't believe it,\" said Meyer, who is also the president of the 40 different Makkabi clubs in Germany, which he says has some 4,500 members.\n\n\"This was a guy who used to play with Jewish players every week, he was comfor"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/sport/football/roma-james-pallotta-colosseum/index.html",
			   "Roma marry past and present",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n\"Brothers, what we do in life echoes in eternity\" (line from the film Gladiator)\n\nGladiators, ready?\n\nFrom the ancient ruins of Rome, a new empire rises.\n\nBut with a nod to the past, the city's newest gladiator James Pallotta's eyes light up when his thoughts turn to historic sites like the Colosseum.\n\nFor if all roads lead to Rome, the AS Roma president is leaving no stone unturned in his intention to marry the Eternal City's historic past with Italian football's new emerging force.\n\n\"I have one big goal,\" Pallotta tells CNN, with an infectious smile. \"I want to get the city to let us play somebody like Barcelona or Bayern Munich or someone like that at the Colosseum.\"\n\nWhile the idea might have the marketing department rubbing their hands with glee, Pallotta could have his work cut out, persuading those maintaining these sites to allow Francesco Totti and Daniel de Rossi to put on an altogether different kind of gladiatorial show."
			  ],
			  [
			   "http://edition.cnn.com/2014/10/12/sport/tennis/roger-federer-shanghai-win/index.html",
			   "Title boosts Fed's No. 1 bid",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- The Fed Express rolls out of Shanghai with no signs of slowing down yet.\n\nRoger Federer beat Frenchman Gilles Simon to win his first Shanghai Masters crown Sunday and his fourth title of the season.\n\nThe victory will move him above Rafael Nadal, who has been laid low with appendicitis, and up to second in the world rankings.\n\n\"Usually everything slows down at the end of the season,\" Federer told reporters in China. \"Not for me this time.\n\n\"This year everything is going really well. I have so many highlights to look forward to for the end of the season, which is nice.\"\n\nWith just a handful of events to go until next month's season finale in London, Federer could still mathematically challenge Novak Djokovic to end the year as the world No.1.\n\nThe 33-year-old Swiss ace beat Djokovic - who arguably inflicted more pain by defeating Federer in the summer's Wimbledon final -- in the semifinals in Shanghai.\n\n\"I'm not even going to"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/19/sport/tennis/tennis-serena-sharapova-tarpischev/index.html?hpt=hp_bn2",
			   "Tennis: Serena - 'Sexist, racist'",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- Serena Williams slammed Russian tennis chief Shamil Tarpischev for his \"insensitive, sexist and racist\" remarks in describing her and sister Venus as the \"Williams brothers\" on a late night TV chat show.\n\nThe world number one gave her first public reaction Sunday to Tarpischev's comments as she spoke to reporters on the eve of the WTA Tour Finals in Singapore.\n\nTarpischev, who has been banned by the WTA for a year and fined $25,000, has also made a public apology, but that has clearly not satisfied 18-time grand slam champion Williams.\n\n\"I think the WTA did a great job of taking initiative and taking immediate action to his comments. I thought they were very insensitive and extremely sexist as well as racist at the same time,\" she said.\n\nRead: Tarpischev carpeted for Williams sisters remarks\n\nWilliams, who won the U.S. Open title last month, added: \"I thought they were in a way bullying.\n\n\"But the WTA and the USTA (U.S. Ten"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/sport/football/roma-james-pallotta-colosseum/index.html",
			   "AS Roma's president James Pallotta: Rome's newest gladiator?",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n\"Brothers, what we do in life echoes in eternity\" (line from the film Gladiator)\n\nGladiators, ready?\n\nFrom the ancient ruins of Rome, a new empire rises.\n\nBut with a nod to the past, the city's newest gladiator James Pallotta's eyes light up when his thoughts turn to historic sites like the Colosseum.\n\nFor if all roads lead to Rome, the AS Roma president is leaving no stone unturned in his intention to marry the Eternal City's historic past with Italian football's new emerging force.\n\n\"I have one big goal,\" Pallotta tells CNN, with an infectious smile. \"I want to get the city to let us play somebody like Barcelona or Bayern Munich or someone like that at the Colosseum.\"\n\nWhile the idea might have the marketing department rubbing their hands with glee, Pallotta could have his work cut out, persuading those maintaining these sites to allow Francesco Totti and Daniel de Rossi to put on an altogether different kind of gladiatorial show."
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/sport/football/kreshnik-berisha-isis-jewish-football/index.html",
			   "From Jewish football to jihad: German ISIS suspect faces jail",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- At first Alon Meyer thought it was a bad joke.\n\nWhen Kreshnik Berisha, the first suspected member of ISIS to stand trial in Germany, was arrested upon his arrival back in Frankfurt in December after spending six months in Syria, youth team football coach Meyer was left shell-shocked.\n\nThe coach thought for a while and then it slowly sank in -- this was the same boy who had once stood by his side and taken the field in the shirt of Makkabi Frankfurt, Germany's largest Jewish sports club.\n\nMeyer's phone began to buzz with journalists trying to ask him whether he remembered Berisha, a 20-year-old born in Frankfurt to Kosovan parents.\n\n\"I didn't think it was serious -- I remember when the journalist told me, I didn't believe it,\" said Meyer, who is also the president of the 40 different Makkabi clubs in Germany, which he says has some 4,500 members.\n\n\"This was a guy who used to play with Jewish players every week, he was comfor"
			  ],
			  [
			   "http://us.cnn.com/2014/10/21/sport/who-is-oscar-pistorius/index.html?hpt=hp_t1",
			   "Who is Pistorius?",
			   "(CNN) -- He was the so-called \"Fastest Man on No Legs,\" and his inspiring story captured the imagination of the world at the London Olympics. Now, Pistorius is playing the lead role in a more tragic tale that began in the early hours of Valentine's Day 2013.\n\nThe Olympic and Paralympic sprinter is facing a maximum five-year prison sentence after he was found guilty of the negligent killing of his girlfriend Reeva Steenkamp on February 14, 2013. He claimed he mistook Steenkamp for an intruder and was cleared of murder.\n\nDespite a seven-month trial, much remains in question about what happened at his upmarket home in Pretoria, South Africa around 4 a.m. that Thursday morning, leaving stunned fans at a loss to explain how their hero could have fallen so far and so fast.\n\nSpeaking to CNN's Robyn Curnow in the last few weeks before his sentencing, Pistorius told her that he was \"not scared to go to jail.\"\n\nBut it may prove to be the greatest challenge yet for a man who's already overcome ma"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/sport/south-korean-royals-fan/index.html",
			   "Baseball: Can Korean super fan bring luck for the Royals?",
			   "(CNN) -- He's a bespectacled, middle-aged South Korean guy with a corporate job. But he has already swept Twitter and the international media, which swarmed him at the airport as he departed.\n\nThe uber fan who captured the heart of Kansas City is to arrive at Kauffman Stadium on Tuesday for Game 1 of the World Series.\n\nLee SungWoo has become the unlikely talisman for the surprise contenders, the Kansas City Royals. His nearly 20 year-long obsession with the baseball team from afar has become the feel-good story.\n\nAfter becoming a fan in the 1990s, Lee followed the Royals, barely missing a game, despite the 14-hour difference between Kansas City and Seoul. He paid little heed that the Royals hadn't made the playoffs in the last 29 years. In a 2012 interview, he tried to explain to a local website about his love for the Royals.\n\nWriting in English, which isn't his native language, he wrote: \"What made me of being a Royals fan? Now I can't tell why... just like many of you, Royals fans, I"
			  ],
			  [
			   "http://us.cnn.com/2014/10/21/sport/south-korean-royals-fan/index.html?hpt=hp_t2",
			   "Can this super fan bring Royals luck?",
			   "(CNN) -- He's a bespectacled, middle-aged South Korean guy with a corporate job. But he has already swept Twitter and the international media, which swarmed him at the airport as he departed.\n\nThe uber fan who captured the heart of Kansas City is to arrive at Kauffman Stadium on Tuesday for Game 1 of the World Series.\n\nLee SungWoo has become the unlikely talisman for the surprise contenders, the Kansas City Royals. His nearly 20 year-long obsession with the baseball team from afar has become the feel-good story.\n\nAfter becoming a fan in the 1990s, Lee followed the Royals, barely missing a game, despite the 14-hour difference between Kansas City and Seoul. He paid little heed that the Royals hadn't made the playoffs in the last 29 years. In a 2012 interview, he tried to explain to a local website about his love for the Royals.\n\nWriting in English, which isn't his native language, he wrote: \"What made me of being a Royals fan? Now I can't tell why... just like many of you, Royals fans, I"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/sport/south-korean-royals-fan/index.html",
			   "Can super fan bring Royals luck?",
			   "(CNN) -- He's a bespectacled, middle-aged South Korean guy with a corporate job. But he has already swept Twitter and the international media, which swarmed him at the airport as he departed.\n\nThe uber fan who captured the heart of Kansas City is to arrive at Kauffman Stadium on Tuesday for Game 1 of the World Series.\n\nLee SungWoo has become the unlikely talisman for the surprise contenders, the Kansas City Royals. His nearly 20 year-long obsession with the baseball team from afar has become the feel-good story.\n\nAfter becoming a fan in the 1990s, Lee followed the Royals, barely missing a game, despite the 14-hour difference between Kansas City and Seoul. He paid little heed that the Royals hadn't made the playoffs in the last 29 years. In a 2012 interview, he tried to explain to a local website about his love for the Royals.\n\nWriting in English, which isn't his native language, he wrote: \"What made me of being a Royals fan? Now I can't tell why... just like many of you, Royals fans, I"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/21/sport/south-korean-royals-fan/index.html?eref=edition",
			   "Can Korean super fan help Royals?",
			   "(CNN) -- He's a bespectacled, middle-aged South Korean guy with a corporate job. But he has already swept Twitter and the international media, which swarmed him at the airport as he departed.\n\nThe uber fan who captured the heart of Kansas City is to arrive at Kauffman Stadium on Tuesday for Game 1 of the World Series.\n\nLee SungWoo has become the unlikely talisman for the surprise contenders, the Kansas City Royals. His nearly 20 year-long obsession with the baseball team from afar has become the feel-good story.\n\nAfter becoming a fan in the 1990s, Lee followed the Royals, barely missing a game, despite the 14-hour difference between Kansas City and Seoul. He paid little heed that the Royals hadn't made the playoffs in the last 29 years. In a 2012 interview, he tried to explain to a local website about his love for the Royals.\n\nWriting in English, which isn't his native language, he wrote: \"What made me of being a Royals fan? Now I can't tell why... just like many of you, Royals fans, I"
			  ],
			  [
			   "http://www.cnn.com/2014/10/21/sport/south-korean-royals-fan/index.html",
			   "Can this Korean super fan bring luck for the Royals?",
			   "(CNN) -- He's a bespectacled, middle-aged South Korean guy with a corporate job. But he has already swept Twitter and the international media, which swarmed him at the airport as he departed.\n\nThe uber fan who captured the heart of Kansas City is to arrive at Kauffman Stadium on Tuesday for Game 1 of the World Series.\n\nLee SungWoo has become the unlikely talisman for the surprise contenders, the Kansas City Royals. His nearly 20 year-long obsession with the baseball team from afar has become the feel-good story.\n\nAfter becoming a fan in the 1990s, Lee followed the Royals, barely missing a game, despite the 14-hour difference between Kansas City and Seoul. He paid little heed that the Royals hadn't made the playoffs in the last 29 years. In a 2012 interview, he tried to explain to a local website about his love for the Royals.\n\nWriting in English, which isn't his native language, he wrote: \"What made me of being a Royals fan? Now I can't tell why... just like many of you, Royals fans, I"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/19/sport/skiing-svindal-achilles-football/index.html",
			   "Freak injury threatens Aksel Lund Svindal's World Cup hopes",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- A freak injury while playing an impromptu game of football with his teammates could sideline Norwegian skiing great Aksel Lund Svindal for the entire World Cup season.\n\nThe five-time world champion was training in Soelden in Austria ahead of the opening races at that ski resort next week when he tore his Achilles tendon.\n\nSvindal described on his official Facebook page what had happened.\n\n\"I was out for a little run with the rest of the team... We ended the session playing around with a ball. Just holding it up in the air between us.\n\n\"Suddenly I felt something snap in my leg and I knew right away that something was wrong. Achilles.\"\n\nSvindal, a two-time overall World Cup champion, was rushed to hospital in Innsbruck, 100km away, and underwent surgery straight away.\n\n\"Extremely bad timing just as the season is about to start. But now that it's happened there's not much I can do,\" he wrote.\n\n\"Nobody can say 100% sure how lon"
			  ],
			  [
			   "http://us.cnn.com/2014/10/20/sport/world-series-lorde-royals/index.html?hpt=hp_t2",
			   "SF stations ban song for World Series",
			   "(CNN) -- With the World Series on the line, radio stations in San Francisco aren't taking any chances.\n\nStarting Tuesday the San Francisco Giants will face off against the Kansas City Royals in baseball's championship series, and two local radio stations decided they'd send a message.\n\n\"No offense, Lorde, but for the duration of the World Series, KFOG Radio will be a \"Royals\"-free zone,\" the radio station posted on it's Facebook page. \"We're sure you understand.\"\n\n7 reasons why Kansas City's a winner\n\nLorde, the 17-year-old pop star from New Zealand, won a song of the year Grammy earlier this year for her No. 1 hit, \"Royals.\"\n\nKOIT said its ban was prompted by listener complaints.\n\n\"So @965KOIT banned the Lorde song Royals? That's awesome!\" tweeted someone known as The Sassy PETIT.\n\nBut not everyone thinks the ban rules. Louis Vargas opined on KFOG's Facebook page that the ban will make no difference in the series outcome, calling the move absurd. Tony Last complained that the song doe"
			  ],
			  [
			   "http://www.cnn.com/2014/10/20/sport/world-series-lorde-royals/index.html",
			   "San Francisco stations ban Lorde's 'Royals' ahead of World Series",
			   "(CNN) -- With the World Series on the line, radio stations in San Francisco aren't taking any chances.\n\nStarting Tuesday the San Francisco Giants will face off against the Kansas City Royals in baseball's championship series, and two local radio stations decided they'd send a message.\n\n\"No offense, Lorde, but for the duration of the World Series, KFOG Radio will be a \"Royals\"-free zone,\" the radio station posted on it's Facebook page. \"We're sure you understand.\"\n\n7 reasons why Kansas City's a winner\n\nLorde, the 17-year-old pop star from New Zealand, won a song of the year Grammy earlier this year for her No. 1 hit, \"Royals.\"\n\nKOIT said its ban was prompted by listener complaints.\n\n\"So @965KOIT banned the Lorde song Royals? That's awesome!\" tweeted someone known as The Sassy PETIT.\n\nBut not everyone thinks the ban rules. Louis Vargas opined on KFOG's Facebook page that the ban will make no difference in the series outcome, calling the move absurd. Tony Last complained that the song doe"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/19/world/sporting-event-host-countries-trends/index.html?eref=edition",
			   "Big sports events? No thanks",
			   "(CNN) -- The procedure, now, is commonplace. A glitzy stage, manned by executives in suits, an envelope dramatically opened. Then, cheers from representatives of the successful bid.\n\nDespite these regular, euphoric scenes not every country seems to have aspirations to host a major sporting event. Earlier this month, Norway withdrew its bid for Oslo to host the 2022 edition of the Winter Olympics, following Stockholm, Krakow and Lviv in Ukraine in dropping out of the process to host the tournament.\n\nMunich, which was also considering a bid, decided not to pursue it, following a referendum.\n\n\"The vote is not a signal against the sport, but against the non-transparency and the greed for profit of the IOC (International Olympic Committee),\" said Ludwig Hartmann, an anti-Olympic bid campaigner and Green Party lawmaker in the Bavarian state legislature.\n\nDespite several attempts, the IOC did not respond to requests for comments from CNN.\n\nThe Polish bid and a joint Davos/St. Moritz attempt a"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/18/sport/tennis/tennis-williams-brothers-tarpischev/index.html",
			   "Russian chief apologizes for Williams slur",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- Russian tennis chief Shamil Tarpischev apologized Saturday for referring to Serena and Venus Williams as the \"Williams brothers\" during a TV chat show.\n\nTarpischev, who is also a member of the International Olympic Committee (IOC), has already been carpeted by the WTA for \"insulting and demeaning\" remarks about the American siblings, being hit with a $25,000 fine and a one-year ban from tennis activities.\n\nTarpischev is the chairman of the Kremlin Cup tournament in Moscow which is finishing this weekend and has held a string of leading positions in sports administration.\n\nHe made the faux pas on a light night talk show in Russia -- Evening Urgant -- sitting next to former WTA star Elena Dementieva.\n\nWhen the subject of how difficult it was to beat the Williams sisters -- Serena has 18 grand slam titles and Venus seven -- Tarpischev made his controversial comments.\n\nAfter a translation of his remarks became public, the WTA r"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/19/sport/motorsport/motorsport-rossi-australia-marquez/index.html",
			   "Rossi marks 250th race with victory",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- Valentino Rossi celebrated his 250th MotoGP with a memorable victory at the Australian Grand Prix Sunday -- taking full advantage after 2014 champion Marc Marquez crashed out.\n\nYamaha's Rossi took control at Phillip Island when Marquez went off on his Honda at the Lukey Heights turn at Phillip Island with 10 laps remaining.\n\nSpain's Marquez, who wrapped up a second straight title in Japan last weekend, was looking set for his 12th win of the season.\n\nBut after his error and with a substantial four second lead, he still needs one more to equal Australian Mick Doohan's all-time record from the 1997 season.\n\nRead: Whizz kid Marquez wraps up second title\n\n\"As I had no pressure on me I tried a different approach, pushing hard from the start to try to open the largest gap possible,\" Marquez later admitted.\n\n\"We were having a good race, right up until the crash. It was a pity that I went down at a time that I was not riding on the"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/10/sport/football/india-soccer-league/index.html",
			   "Will India's new pro league succeed?",
			   "Delhi (CNN) -- On Sunday, about 100,000 Indian spectators -- including a bevy of India's top celebrities and corporate bigwigs -- will pack into a stadium to watch two teams go at each other with everything they've got.\n\nNo, it's not cricket. It's not even hockey.\n\nIt's football and the all-new, swish, Indian Super League.\n\nThe 10-week tournament features mostly Indian players, but also a number of \"marquee\" European soccer stars, admittedly out of their prime but still huge draws: former Juventus strikers Alessandro Del Piero and David Trezeguet, and former Arsenal attackers Robert Pires and Freddie Ljungberg.\n\nThe stated aim of the league is to promote the beautiful game in India, a country of 1.2 billion people that has long languished in football's global rankings --158th in the world on FIFA's latest list.\n\nSimilar to Major League Soccer (MLS) in the U.S., eight franchise teams from across India will face off against each other twice each before heading to a set of play-offs in De"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/13/sport/football/football-euro-2016-netherlands-iceland-italy-odegaard/index.html",
			   "Teen makes Euro history",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- Few 15-year-olds can claim to make history, but Martin Odegaard is fast accumulating a clutch of firsts in football.\n\nBy coming on as a second half substitute in Norway's clash with Bulgaria on Monday, he became the youngest player ever to appear in European Championships qualifying at just 15 years and 300 days.\n\nHe is already the youngest player to represent his country -- featuring in a friendly with United Arab Emirates in August -- as well as the youngest player, and scorer, in the country's top league.\n\nAnd Odegaard didn't look out of place during his 27-minute cameo, as Norway beat Bulgaria 2-1 in its Euro 2016 Group H clash.\n\nRead: European soccer's most coveted 15-year-old\n\nNo wonder then, that scouts from clubs all over Europe -- including English Premier League pair Manchester United and Liverpool -- are on the tail of one of the continent's hottest prospects.\n\n\"In the beginning it was unreal and a little bit sur"
			  ],
			  [
			   "http://edition.cnn.com/2014/09/17/sport/football/champions-league-bayern-munich-manchester-city/index.html",
			   "Bayern snatches late win",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- Better late than never.\n\nJerome Boateng, the man who once wore the blue of Manchester City, struck an 89th minute winner as Bayern Munich claimed a dramatic 1-0 victory in its opening game of the European Champions League.\n\nIt was a goal which had seldom looked like coming given Bayern's profligacy in front of goal and the inspired performance of Joe Hart, the Manchester City goalkeeper.\n\nFor 88 minutes, Bayern, champion in 2013, laid siege to the City goal with Hart producing save after save to thwart the German side.\n\nAnd then, with 89 minutes on the clock, Bayern finally made the breakthrough courtesy of Boateng.\n\nCity, so disciplined in defense and having worked tirelessly throughout, failed to clear its lines and when the ball dropped to Boateng, the defender unleashed an unstoppable effort which brushed off the back of Mario Gotze and flew into the top corner.\n\nIt was harsh on a City side, which although rarely looked"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/01/sport/football/football-champions-league-real-madrid-arsenal-juventus/index.html",
			   "Real Madrid survives scare",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- Ludogorets Razgrad may only have been founded 13 years ago but on Wednesday it stood on the brink of the biggest result in its brief history.\n\nThe Bulgarian club, transformed by multi-millionaire businessman Kiril Domuschiev, stood a mere 13 minutes away from a draw with European champions Real Madrid.\n\nIn front of a packed National Stadium in the Bulgarian capital of Sofia, the Spanish side's superstars -- including Cristiano Ronaldo, James Rodriguez, Gareth Bale -- were on the verge of a major embarrassment.\n\nBut Carlo Ancelotti's side aren't Champions League holders for nothing and France striker Karim Benzema got them out of jail in the nick of time with a goal that sealed a 2-1 win.\n\nFootball: Beyonce crazy for PSG?\n\nThe minnows had gone ahead, Marcelinho converting from a corner after just 6 minutes to send an already excited crowd into raptures.\n\nJust four minutes later Javier Hernandez -- on loan from English club M"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/15/sport/football/albania-prime-minister-brother/index.html",
			   "Football: Albania's drone 'disgust'",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- It's a plot twist that even a thriller writer might have struggled to come up with during Serbia's European qualifying clash with Albania in Belgrade.\n\nA drone flying a flag depicting the \"Greater Albania\" over a major international soccer game Tuesday was the subject of a 'whodunnit' mystery after the brother of the Albanian prime minister hit back at allegations by a Serbian government official that he had been piloting the quadcopter.\n\n\"I am very disgusted by the allegation of my having any involvement in the piloting of the drone,\" Olsi Rama told CNN Wednesday, who said he had been taking pictures of the game from a VIP suite at the stadium.\n\nAs a football match mushroomed into a diplomatic incident amid claim and counter-claim in a region of a world that is still riven by ethnic divisions, his version of events conflicted with Serbia's version of events.\n\n\"According to the information from the police he (Olsi Rama) was"
			  ],
			  [
			   "http://edition.cnn.com/video/data/2.0/video/sports/2014/10/20/intv-davies-sorokin-sochi-preps-part-two.cnn.html",
			   "'Racism in Russia is not a trend'",
			   "The CEO of Russia 2018 says that racist incidents in Russian football are 'undesired tendencies,' but not a trend.' \n  \nIf your browser has Adobe Flash Player installed, click above to play.  Otherwise, click below."
			  ],
			  [
			   "http://edition.cnn.com/2014/10/19/world/sporting-event-host-countries-trends/index.html?eref=edition",
			   "Olympic Games? No thanks",
			   "(CNN) -- The procedure, now, is commonplace. A glitzy stage, manned by executives in suits, an envelope dramatically opened. Then, cheers from representatives of the successful bid.\n\nDespite these regular, euphoric scenes not every country seems to have aspirations to host a major sporting event. Earlier this month, Norway withdrew its bid for Oslo to host the 2022 edition of the Winter Olympics, following Stockholm, Krakow and Lviv in Ukraine in dropping out of the process to host the tournament.\n\nMunich, which was also considering a bid, decided not to pursue it, following a referendum.\n\n\"The vote is not a signal against the sport, but against the non-transparency and the greed for profit of the IOC (International Olympic Committee),\" said Ludwig Hartmann, an anti-Olympic bid campaigner and Green Party lawmaker in the Bavarian state legislature.\n\nDespite several attempts, the IOC did not respond to requests for comments from CNN.\n\nThe Polish bid and a joint Davos/St. Moritz attempt a"
			  ],
			  [
			   "http://www.cnn.com/video/#/video/sports/2014/10/20/intv-davies-sorokin-sochi-preps-part-two.cnn",
			   "Sorokin: Racism in Russia not 'a trend'",
			   "__"
			  ],
			  [
			   "http://us.cnn.com/video/data/2.0/video/sports/2014/10/17/scholes-rogers-doppleganger.cnn.html?hpt=hp_t4",
			   "Aaron Rodgers meets his twin",
			   "Green Bay Packers quarterback Aaron Rodgers met a man who looks exactly like him -- British comedian Tom Wrigglesworth. \n  \nIf your browser has Adobe Flash Player installed, click above to play.  Otherwise, click below."
			  ],
			  [
			   "http://www.cnn.com/video/#/video/sports/2014/10/17/spc-circuit-japan-f1-fans-b.cnn",
			   "Japan's love for F1",
			   "__"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/12/sport/motorsport/motogp-2014-title-marquez/index.html",
			   "Marquez retains MotoGP title",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- It took a little longer than most people expected but MotoGP whiz kid Marc Marquez wrapped up a second world title in Japan.\n\nThe 21-year-old finished runner-up behind compatriot Jorge Lorenzo -- and crucially ahead of the legendary Italian Valentino Rossi and Dani Pedrosa -- to take an unassailable 82-point lead in the championship with three rounds to go.\n\nThe landmark means Marquez beat Mike Hailwood's record, set in 1963, to become the youngest ever rider to win consecutive titles.\n\nBut perhaps more importantly for his Repsol Honda team, he did it at Motegi.\n\nThis track is sacred ground for Honda. The Japanese giants designed and built the track; it is where they test their cars as well as their bikes, and it also houses Honda's museum.\n\nAs such, the pressure to perform here is intense. Perhaps because of this, no Honda rider had ever managed to clinch the championship here -- until now.\n\nIn the end it was an efficient "
			  ],
			  [
			   "http://edition.cnn.com/2014/10/14/sport/legendary-zebra-whisperer/index.html",
			   "Horse whisperer tames zebras",
			   "Editor's note: Winning Post is CNN's monthly horse racing show. Click here for times, videos and features. \n\n(CNN) -- What started as a night drinking in the pub, turned into a morning riding a wild zebra.\n\nIf it sounds like the kind of story generated by one-too-many beers and a vivid imagination, then there's no doubting legendary horse trainer Gary Witheford's photos.\n\nYep, that's a girl riding a zebra, all right.\n\nWhile other trainers usually take six to eight weeks to break in a horse, British equine expert Witheford says he can do the job in just 20 minutes, as revealed in his new book \"If Horses Could Talk.\"\n\nNot just horses -- but donkeys, llamas, and a black-and-white striped animal better associated with the African savannah than the English countryside.\n\n\"I've done four zebras,\" says the 54-year-old, who has also broken race horses belonging to Britain's Queen Elizabeth II, Dubai ruler Sheik Mohammed, and England's national football team captain Wayne Rooney.\n\n\"They said zeb"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/18/sport/tennis/tennis-williams-brothers-tarpischev/index.html",
			   "Tennis: Apology for Williams slur",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- Russian tennis chief Shamil Tarpischev apologized Saturday for referring to Serena and Venus Williams as the \"Williams brothers\" during a TV chat show.\n\nTarpischev, who is also a member of the International Olympic Committee (IOC), has already been carpeted by the WTA for \"insulting and demeaning\" remarks about the American siblings, being hit with a $25,000 fine and a one-year ban from tennis activities.\n\nTarpischev is the chairman of the Kremlin Cup tournament in Moscow which is finishing this weekend and has held a string of leading positions in sports administration.\n\nHe made the faux pas on a light night talk show in Russia -- Evening Urgant -- sitting next to former WTA star Elena Dementieva.\n\nWhen the subject of how difficult it was to beat the Williams sisters -- Serena has 18 grand slam titles and Venus seven -- Tarpischev made his controversial comments.\n\nAfter a translation of his remarks became public, the WTA r"
			  ],
			  [
			   "http://edition.cnn.com/2014/10/20/sport/golf/golf-presidents-white-house/index.html",
			   "How golf took over the White House",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- American Presidents have come and gone -- but one club tends to unite them all.\n\nSo often a meeting point for the captains of politics and industry, the golf course has been one of the most popular friends of U.S. leaders since the early part of the 20th century.\n\nFrom William Taft, the 27th President, who introduced the game to the White House, through to Barack Obama, the game has remained a constant in American political life.\n\nIf Obama has been criticized in recent weeks for spending too much time on the course, there are other presidents who have been equally ardent golfers.\n\n\"Golf has inspired Presidents throughout history,\" Mike Troestl, historian at the United States Golf Association, told CNN.\n\n\"It's good exercise but there's also the chance for dialogue with people in politics.\n\n\"It's a game of integrity and Presidents have seen golf as the sport of leaders.\"\n\nAll but three of the 18 presidents since the start of "
			  ],
			  [
			   "http://edition.cnn.com/video/data/2.0/video/sports/2014/10/18/unguarded-serena-williams.cnn.html",
			   "Serena: Standing with giants",
			   "Serena Williams opens up about her crazy year, her future plans and officially becoming one of tennis' best-ever \n  \nIf your browser has Adobe Flash Player installed, click above to play.  Otherwise, click below."
			  ],
			  [
			   "http://edition.cnn.com/video/data/2.0/video/sports/2014/10/16/lebron-james-survivors-remorse.cnn.html",
			   "LeBron: Survivor's remorse",
			   "In this excerpt of LeBron's Unguarded conversation, he discusses those who are less than happy for his success \n  \nIf your browser has Adobe Flash Player installed, click above to play.  Otherwise, click below."
			  ],
			  [
			   "http://edition.cnn.com/video/data/2.0/video/sports/2014/10/17/spc-circuit-japan-f1-fans-b.cnn.html",
			   "Japan's love for Formula One",
			   "Meet Japan's passionate F1 fans ahead of the Japanese GP."
			  ],
			  [
			   "http://edition.cnn.com/2014/10/14/sport/football/serbia-albania-game-abandoned/index.html",
			   "Drone invasion halts qualifier",
			   "Follow us at @WorldSportCNN and like us on Facebook \n\n(CNN) -- Ethnic tensions in the Balkans and an incident involving a drone led to the abandonment of a major European international football game Tuesday.\n\nSerbia's European Championship qualifying match with Albania was abandoned after 41 minutes following ugly clashes between both sets of players.\n\nThe brawl followed the arrival of a mini-drone, which flew over the stadium while carrying a flag depicting the \"Greater Albania.\"\n\nWhen Serbian player Stefan Mitrovic ripped the flag down, it provided the catalyst for an already combustible tie to fully ignite.\n\nMartin Atkinson, the English referee, took the players off the field with the game goalless following clashes between rival players.\n\nSee images of the incident\n\nThere were no signs of the tie being restarted with UEFA, the game's European governing body, confirming the game had been abandoned.\n\nAlbanian players ran from the field, while a number of missiles and flares were thro"
			  ]
			 ]
			}
			,technology: {
			 "name": "technology",
			 "expectedCat": "technology & computing",
			 "visits": [
			  [
			   "http://money.cnn.com/2014/10/22/technology/mobile/apple-pay-double-charge/index.html",
			   "Apple Pay Is Double Charging Some Customers",
			   " comments Apple Pay is double charging some customers By Samuel Burke  @CNNTech October 22, 2014: 4:49 PM ET   Apple Pay's double trouble NEW YORK (CNNMoney) I was among the first people to try out Apple Pay the moment it came available on Monday. It was convenient, fast, and it seemingly worked without incident ... until I logged in and checked my debit card bill. As it turns out, I've been charged twice for every single purchase I've made with Apple Pay at various stores. A quick search of Twitter found many other people experiencing this same exact problem. \"Problems with #ApplePay - it looks like my @bankofamerica account was double charged by @Walgreens,\" tweeted fellow Apple Pay user Rohan Thompson. Many of the other people on Twitter experiencing this same exact problem also mentioned they were using Apple Pay via their Bank of America (BAC) debit card. Related: Apple Pay is now live So I called up Bank of America and they assured me it was a problem on Apple Pay's end. That see"
			  ],
			  [
			   "http://money.cnn.com/2014/10/22/technology/mobile/apple-pay-double-charge/index.html",
			   "Apple Pay is double charging some users",
			   "NEW YORK (CNNMoney) I was among the first people to try out Apple Pay the moment it came available on Monday. It was convenient, fast, and it seemingly worked without incident ... until I logged in and checked my debit card bill. \n\nAs it turns out, I've been charged twice for every single purchase I've made with Apple Pay at various stores. \n\nA quick search of Twitter found many other people experiencing this same exact problem. \n\n\"Problems with #ApplePay - it looks like my @bankofamerica account was double charged by @Walgreens,\" tweeted fellow Apple Pay user Rohan Thompson. \n\nMany of the other people on Twitter experiencing this same exact problem also mentioned they were using Apple Pay via their Bank of America So I called up Bank of America and they assured me it was a problem on Apple Pay's end. That seemed feasible, because all of the purchases I made without Apple Pay were only charged one time. \n\nBank of America transferred me to Apple Pay customer support. The only problem: A"
			  ],
			  [
			   "http://money.cnn.com/2014/10/22/technology/innovationnation/uber-hot-chick-ride/index.html",
			   "Uber sorry for 'hot chick' 20-minute ride promo",
			   "5 stunning stats about Uber NEW YORK (CNNMoney) If riding in cars with beautiful models as drivers sounds like a dream, it's time to wake up. \n\nUber has. The ridesharing service canceled its \"\" promotion (a slang term for \"incredibly hot chick\") before any men could take advantage of a free (twenty-minutes only) fantasy ride. \n\nThe promotion -- headed up by the Uber Lyon, Fra. office -- was a joint effort with a French website by the same name, . on the sexist deal on Tuesday (by that time, Uber had already taken down the page for the offer). \n\nNow, Uber wants everyone to forget the idea ever happened. \n\n\"It was a clear misjudgment by the local team,\" wrote an Uber spokesperson in an email statement. \n\nA tweet from the local French office @UberLyon expressed a similar sentiment: \"We have canceled the partnership as on this occasion we clearly misjudged the situation. We apologise to anyone that has been offended.\" \n\nPierre Garonnaire, co-founder of the year-old website , said the progr"
			  ],
			  [
			   "http://money.cnn.com/video/technology/2014/10/22/intel-renee-j-james-connected-home.cnnmoney",
			   "Intel's plan to invade your home",
			   "Market indexes are shown in real time, except for the DJIA, which is delayed by two minutes. All times are ET. Disclaimer Morningstar: © 2014  Morningstar, Inc.  All Rights Reserved. Disclaimer The Dow Jones Indexes SM are proprietary to and distributed by Dow Jones & Company, Inc. and have been licensed for use.  All content of the Dow Jones Indexes SM © 2014 is proprietary to Dow Jones & Company, Inc. \r\nChicago Mercantile Association. The market data is the property of Chicago Mercantile Exchange Inc. and its licensors. All rights reserved. \r\nFactSet Research Systems Inc. 2014. All rights reserved. Most stock quote data provided by BATS."
			  ],
			  [
			   "http://money.cnn.com/2014/10/22/technology/mobile/apple-pay-double-charge/index.html",
			   "Apple Pay is double charging some customers",
			   "      Apple Pay's double trouble       NEW YORK (CNNMoney)  I was among the first people to try out Apple Pay the moment it came available on Monday. It was convenient, fast, and it seemingly worked without incident ... until I logged in and checked my debit card bill.  \nAs it turns out, I've been charged twice for every single purchase I've made with Apple Pay at various stores. \n \nA quick search of Twitter found many other people experiencing this same exact problem. \n \n\"Problems with #ApplePay - it looks like my @bankofamerica account was double charged by @Walgreens,\" tweeted fellow Apple Pay user Rohan Thompson. \n \nMany of the other people on Twitter experiencing this same exact problem also mentioned they were using Apple Pay via their Bank of America  ( BAC ) debit card. \n \n Related: Apple Pay is now live  \n \nSo I called up Bank of America and they assured me it was a problem on Apple Pay's end. That seemed feasible, because all of the purchases I made without Apple Pay were onl"
			  ],
			  [
			   "http://money.cnn.com/2014/10/22/technology/mobile/apple-pay-double-charge/index.html?section=money_news_international",
			   "Apple Pay is double charging customers",
			   "NEW YORK (CNNMoney) I was among the first people to try out Apple Pay the moment it came available on Monday. It was convenient, fast, and it seemingly worked without incident ... until I logged in and checked my debit card bill. \n\nAs it turns out, I've been charged twice for every single purchase I've made with Apple Pay at various stores. \n\nA quick search of Twitter found many other people experiencing this same exact problem. \n\n\"Problems with #ApplePay - it looks like my @bankofamerica account was double charged by @Walgreens,\" tweeted fellow Apple Pay user Rohan Thompson. \n\nMany of the other people on Twitter experiencing this same exact problem also mentioned they were using Apple Pay via their Bank of America So I called up Bank of America and they assured me it was a problem on Apple Pay's end. That seemed feasible, because all of the purchases I made without Apple Pay were only charged one time. \n\nBank of America transferred me to Apple Pay customer support. The only problem: A"
			  ],
			  [
			   "http://money.cnn.com/video/technology/2014/10/21/apple-pay-charges.cnnmoney/index.html",
			   "Apple Pay's double headache",
			   "Market indexes are shown in real time, except for the DJIA, which is delayed by two minutes. All times are ET. Disclaimer Morningstar: © 2014  Morningstar, Inc.  All Rights Reserved. Disclaimer The Dow Jones Indexes SM are proprietary to and distributed by Dow Jones & Company, Inc. and have been licensed for use.  All content of the Dow Jones Indexes SM © 2014 is proprietary to Dow Jones & Company, Inc. \r\nChicago Mercantile Association. The market data is the property of Chicago Mercantile Exchange Inc. and its licensors. All rights reserved. \r\nFactSet Research Systems Inc. 2014. All rights reserved. Most stock quote data provided by BATS."
			  ],
			  [
			   "http://money.cnn.com/2014/10/22/technology/mobile/apple-pay-double-charge/index.html",
			   "Some customers getting charged twice",
			   "NEW YORK (CNNMoney) I was among the first people to try out Apple Pay the moment it came available on Monday. It was convenient, fast, and it seemingly worked without incident ... until I logged in and checked my debit card bill. \n\nAs it turns out, I've been charged twice for every single purchase I've made with Apple Pay at various stores. \n\nA quick search of Twitter found many other people experiencing this same exact problem. \n\n\"Problems with #ApplePay - it looks like my @bankofamerica account was double charged by @Walgreens,\" tweeted fellow Apple Pay user Rohan Thompson. \n\nMany of the other people on Twitter experiencing this same exact problem also mentioned they were using Apple Pay via their Bank of America So I called up Bank of America and they assured me it was a problem on Apple Pay's end. That seemed feasible, because all of the purchases I made without Apple Pay were only charged one time. \n\nBank of America transferred me to Apple Pay customer support. The only problem: A"
			  ],
			  [
			   "http://money.cnn.com/video/technology/2014/10/21/apple-pay-charges.cnnmoney/index.html",
			   "Some say they're charged twice",
			   "Market indexes are shown in real time, except for the DJIA, which is delayed by two minutes. All times are ET. Disclaimer Morningstar: © 2014  Morningstar, Inc.  All Rights Reserved. Disclaimer The Dow Jones Indexes SM are proprietary to and distributed by Dow Jones & Company, Inc. and have been licensed for use.  All content of the Dow Jones Indexes SM © 2014 is proprietary to Dow Jones & Company, Inc. \r\nChicago Mercantile Association. The market data is the property of Chicago Mercantile Exchange Inc. and its licensors. All rights reserved. \r\nFactSet Research Systems Inc. 2014. All rights reserved. Most stock quote data provided by BATS."
			  ],
			  [
			   "http://money.cnn.com/2014/10/21/technology/security/china-icloud/index.html",
			   "Is China hacking iCloud accounts?",
			   "IPhones are advertised at a China Mobile store in Shanghai. NEW YORK (CNNMoney) Chinese Apple users are facing a wave of cyberattacks -- not from cybercriminals, but from their own government. That's , a non-profit that tracks Beijing's online censorship efforts. The site says Chinese authorities are staging a so-called \"man-in-the-middle\" attack in iCloud, intercepting the log-in credentials of Chinese Internet users when they attempt to access the site through certain browsers. \n\n\"This is clearly a malicious attack on Apple in an effort to gain access to usernames and passwords and consequently all data stored on iCloud such as iMessages, photos, contacts, etc,\" GreatFire said. \n\nThe alleged attack coincides with of the new iPhone 6 and 6 Plus. \n\nThe Chinese government has previously staged similar attacks on Google Chinese Internet users can counteract the problem by using secure Web browsers like Chrome and Firefox, and by enabling two-factor authentication on their iCloud accounts"
			  ],
			  [
			   "http://money.cnn.com/2014/10/20/technology/apple-earnings/index.html",
			   "Apple profit soars on iPhone sales",
			   "How much does your iPhone really cost? NEW YORK (CNNMoney) Even as Apple seeks out growth by delving into payments and watches, Apple's core business continues to boom on the back of its revving iPhone engine. IPhone sales beat most Wall Street analysts' expectations and were up 16% from a year ago. \n\nThough Apple always posts some big numbers in the quarter in which it releases its new products -- particularly new iPhones -- Apple CEO Tim Cook said that he thinks the iPhone can continue to grow in future quarters. \n\n\"There's a fairly large opportunity in people buying their first iPhone ever,\" Cook said on a conference call with investors. \"I've never felt so great after a launch before.\" \n\nMac: Most surprisingly, Apple sold a record 5.5 million Macintosh computers, up a remarkable 21% from the same quarter in 2013. As overall personal computer sales continue to shrink, Apple now has its largest share of the PC market since 1995. \n\n\"The back to school season voted and the Mac won,\" Co"
			  ],
			  [
			   "http://money.cnn.com/2014/10/21/technology/enterprise/yahoo-alibaba/index.html?section=money_news_international",
			   "Yahoo profit soars after Alibaba IPO",
			   "NEW YORK (CNNMoney) Yahoo can't hide behind Alibaba anymore. \n\nThe Web giant's profit soared in the third quarter, after earning $6.3 billion from selling part of its stake in Alibaba \n\nYahoo, whose stock had been buoyed by the pre-IPO hype, has already committed to returning at least half of that money to shareholders. \n\nYet the company's core advertising business has been unimpressive in recent years, putting pressure on CEO Marissa Mayer to prove that Yahoo can be more than just an Alibaba proxy for investors. A manager of the recently called for the company to merge with AOL \n\nOn Tuesday, Yahoo might have shown just enough to keep investors at bay -- at least for three more months. Yahoo's third-quarter earnings -- excluding the benefits of the Alibaba sale -- came in well ahead of expectations, and shares rose 3.5% in after-hours trading. \n\nYahoo's remaining Alibaba stake is worth approximately $34 billion. The company will pay $3.3 billion in taxes on its recent sale of shares, a"
			  ],
			  [
			   "http://money.cnn.com/2014/10/21/technology/enterprise/yahoo-alibaba/index.html",
			   "Yahoo profit soars following the Alibaba IPO",
			   "NEW YORK (CNNMoney)  Yahoo can't hide behind Alibaba anymore.  \nThe Web giant's profit soared in the third quarter, after earning $6.3 billion from selling part of its stake in Alibaba  ( BABA , Tech30 ) , the Chinese e-commerce giant. Alibaba debuted last month on the New York Stock Exchange in the largest IPO in Wall Street history. \n \nYahoo, whose stock had been buoyed by the pre-IPO hype, has already committed to returning at least half of that money to shareholders. \n \nYet the company's core advertising business has been unimpressive in recent years, putting pressure on CEO Marissa Mayer to prove that Yahoo can be more than just an Alibaba proxy for investors. A manager of the activist hedge fund Starboard Value recently called for the company to merge with AOL  ( AOL , Tech30 ) . \n \nOn Tuesday, Yahoo might have shown just enough to keep investors at bay -- at least for three more months. Yahoo's third-quarter earnings -- excluding the benefits of the Alibaba sale -- came in well "
			  ],
			  [
			   "http://money.cnn.com/video/technology/2014/10/21/apple-pay-charges.cnnmoney",
			   "Apple Pay's double trouble",
			   "Market indexes are shown in real time, except for the DJIA, which is delayed by two minutes. All times are ET. Disclaimer Morningstar: © 2014  Morningstar, Inc.  All Rights Reserved. Disclaimer The Dow Jones Indexes SM are proprietary to and distributed by Dow Jones & Company, Inc. and have been licensed for use.  All content of the Dow Jones Indexes SM © 2014 is proprietary to Dow Jones & Company, Inc. \r\nChicago Mercantile Association. The market data is the property of Chicago Mercantile Exchange Inc. and its licensors. All rights reserved. \r\nFactSet Research Systems Inc. 2014. All rights reserved. Most stock quote data provided by BATS."
			  ],
			  [
			   "http://money.cnn.com/2014/10/21/technology/enterprise/yahoo-alibaba/index.html",
			   "Yahoo profit soars following Alibaba IPO",
			   "Marissa Mayer and Yahoo have more work to do in their turnaround effort. NEW YORK (CNNMoney) Yahoo can't hide behind Alibaba anymore. \n\nThe Web giant's profit soared in the third quarter, after earning $6.3 billion from selling part of its stake in Alibaba \n\nYahoo, whose stock had been buoyed by the pre-IPO hype, has already committed to returning at least half of that money to shareholders. \n\nYet the company's core advertising business has been unimpressive in recent years, putting pressure on CEO Marissa Mayer to prove that Yahoo can be more than just an Alibaba proxy for investors. A manager of the recently called for the company to merge with AOL \n\nOn Tuesday, Yahoo might have shown just enough to keep investors at bay -- at least for three more months. Yahoo's third-quarter earnings -- excluding the benefits of the Alibaba sale -- came in well ahead of expectations, and shares rose 3.5% in after-hours trading. Excluding Alibaba and other one-time items, Yahoo said it earned 52 cen"
			  ],
			  [
			   "http://money.cnn.com/2014/10/20/technology/apple-earnings/index.html",
			   "Apple profit soars on huge iPhone and Mac sales",
			   "      How much does your iPhone really cost?       NEW YORK (CNNMoney)  Even as Apple seeks out growth by delving into payments and watches, Apple's core business continues to boom on the back of its revving iPhone engine.  \n iPhone: Apple  ( AAPL , Tech30 ) sold 39.3 million iPhones in the past quarter, which included nearly two weeks of sales for the new iPhone 6 and iPhone 6 Plus. The new iPhones went on sale in the United States and a handful of other countries on Sept. 19. \n \nIPhone sales beat most Wall Street analysts' expectations and were up 16% from a year ago. \n \nThough Apple always posts some big numbers in the quarter in which it releases its new products -- particularly new iPhones -- Apple CEO Tim Cook said that he thinks the iPhone can continue to grow in future quarters. \n \n\"There's a fairly large opportunity in people buying their first iPhone ever,\" Cook said on a conference call with investors. \"I've never felt so great after a launch before.\" \n \n Mac: Most surprisin"
			  ],
			  [
			   "http://money.cnn.com/2014/10/21/technology/security/china-icloud/index.html",
			   "China is hacking its own citizens' iCloud accounts - report",
			   "IPhones are advertised at a China Mobile store in Shanghai.  NEW YORK (CNNMoney)  Chinese Apple users are facing a wave of cyberattacks -- not from cybercriminals, but from their own government.  \nThat's according to GreatFire.org , a non-profit that tracks Beijing's online censorship efforts. The site says Chinese authorities are staging a so-called \"man-in-the-middle\" attack in iCloud, intercepting the log-in credentials of Chinese Internet users when they attempt to access the site through certain browsers. \n \n\"This is clearly a malicious attack on Apple in an effort to gain access to usernames and passwords and consequently all data stored on iCloud such as iMessages, photos, contacts, etc,\" GreatFire said. \n \nThe alleged attack coincides with the launch in China of the new iPhone 6 and 6 Plus. \n          How China's iPhone 6 black market works     \nThe Chinese government has previously staged similar attacks on Google  ( GOOGL , Tech30 ) and Yahoo  ( YHOO , Tech30 ) users, GreatFi"
			  ],
			  [
			   "http://money.cnn.com/2014/10/20/technology/chicago-coding-education/index.html",
			   "Why Chicago is mandating coding education",
			   "Mayor Rahm Emanuel has made K-12 computer science education a priority.  NEW YORK (CNNMoney)  Parlez-vous \"code\"?  \nChicago Mayor Rahm Emanuel believes the language of the future is code writing -- and he wants every kid in Chicago to be prepared. \n \nIn a room full of techies at the Internet of Things World Forum last week, he didn't talk about Chicago's chief data officer or the city's smart parking and LED street lights. Instead, he emphasized the Windy City's commitment to computer science and coding education. \n \n\"In three years time, you can't graduate from high school in the city of Chicago if you didn't take code writing and computer science,\" said Mayor Emanuel in conversation with Cisco CEO John Chambers. \"We're making it mandatory.\" \n \nEmanuel first announced the city's five-year plan for computer science education last December . In three years, Chicago public high schools will require a foundational computer science course in order to graduate. In five years, at least 50% o"
			  ],
			  [
			   "http://money.cnn.com/2014/10/21/technology/enterprise/microsoft-ceo-nadella-women-pay/index.html",
			   "$84 million Microsoft CEO: We pay women equally",
			   "      Microsoft CEO's gender gap gaffe       NEW YORK (CNNMoney)  Microsoft CEO Satya Nadella has some really bad timing.  \nThe very day that Nadella said women at Microsoft  ( MSFT , Tech30 ) are paid equally for performing the same work as men, the CEO made headlines for his mammoth $84 million pay package. \n \nIn an interview with USA Today on Monday, Nadella said that Microsoft pays women within a \"tight band of 0.5%\" variation for roles that are similarly performed by men. \n \n\"I just asked our HR department to just go look at pay equity, right, just per similar, same level and same title, what is the compensation? And it turns out we don't have disparity,\" he said. \n \nThough Nadella says he feels \"good about that,\" he acknowledged that Microsoft still has a long way to go before it can say it treats women and men equally. Women at Microsoft -- and at most other companies across many industries -- are not promoted as quickly as men, nor do they occupy as many senior leadership roles"
			  ],
			  [
			   "http://money.cnn.com/2014/10/21/technology/security/china-icloud/index.html",
			   "China is hacking its citizens' iCloud accounts",
			   "IPhones are advertised at a China Mobile store in Shanghai. NEW YORK (CNNMoney) Chinese Apple users are facing a wave of cyberattacks -- not from cybercriminals, but from their own government. That's , a non-profit that tracks Beijing's online censorship efforts. The site says Chinese authorities are staging a so-called \"man-in-the-middle\" attack in iCloud, intercepting the log-in credentials of Chinese Internet users when they attempt to access the site through certain browsers. \n\n\"This is clearly a malicious attack on Apple in an effort to gain access to usernames and passwords and consequently all data stored on iCloud such as iMessages, photos, contacts, etc,\" GreatFire said. \n\nThe alleged attack coincides with of the new iPhone 6 and 6 Plus. \n\nThe Chinese government has previously staged similar attacks on Google Chinese Internet users can counteract the problem by using secure Web browsers like Chrome and Firefox, and by enabling two-factor authentication on their iCloud accounts"
			  ],
			  [
			   "http://money.cnn.com/2014/10/21/technology/enterprise/microsoft-ceo-nadella-women-pay/index.html",
			   "Microsoft CEO: Women paid equally here",
			   "Microsoft CEO's gender gap gaffe NEW YORK (CNNMoney) Microsoft CEO Satya Nadella has some really bad timing. \n\nThe very day that Nadella said women at Microsoft In an on Monday, Nadella said that Microsoft pays women within a \"tight band of 0.5%\" variation for roles that are similarly performed by men. \n\n\"I just asked our HR department to just go look at pay equity, right, just per similar, same level and same title, what is the compensation? And it turns out we don't have disparity,\" he said. \n\nThough Nadella says he feels \"good about that,\" he acknowledged that Microsoft still has a long way to go before it can say it treats women and men equally. Women at Microsoft -- and at most other companies across many industries -- are not promoted as quickly as men, nor do they occupy as many senior leadership roles. \n\nWomen make up just 29% of Microsoft's workforce but only 17% of the higher-paid tech positions. Just three of Microsoft's 15 senior leaders are women. Microsoft is the most mal"
			  ],
			  [
			   "http://money.cnn.com/2014/10/21/technology/enterprise/microsoft-ceo-nadella-women-pay/index.html",
			   "$84 million Microsoft CEO: Women paid equally here",
			   "Microsoft CEO's gender gap gaffe NEW YORK (CNNMoney) Microsoft CEO Satya Nadella has some really bad timing. \n\nThe very day that Nadella said women at Microsoft In an on Monday, Nadella said that Microsoft pays women within a \"tight band of 0.5%\" variation for roles that are similarly performed by men. \n\n\"I just asked our HR department to just go look at pay equity, right, just per similar, same level and same title, what is the compensation? And it turns out we don't have disparity,\" he said. \n\nThough Nadella says he feels \"good about that,\" he acknowledged that Microsoft still has a long way to go before it can say it treats women and men equally. Women at Microsoft -- and at most other companies across many industries -- are not promoted as quickly as men, nor do they occupy as many senior leadership roles. \n\nWomen make up just 29% of Microsoft's workforce but only 17% of the higher-paid tech positions. Just three of Microsoft's 15 senior leaders are women. Microsoft is the most mal"
			  ],
			  [
			   "http://money.cnn.com/2014/10/20/technology/mobile/apple-pay/index.html",
			   "Ditch the wallet: Apple Pay launches and could render credit cards obsolete",
			   "'Apple Pay' may be safer than plastic NEW YORK (CNNMoney) Apple Pay is finally here. \n\nThe new mobile payments system for the iPhone 6 and 6 Plus will be up and running this afternoon following the release of for Apple's iOS mobile operating system. Here's a quick primer on the technology that could one day (but not today) render physical credit cards obsolete. \n\nHow does it work? There are two ways to use Apple Pay. \n\nApple Pay will let iPhone 6 and iPhone 6 Plus owners spend money at participating brick and mortar stores simply by using their phones' fingerprint scanner and holding the device up to the register. \n\nApple Pay works by sending payment information via short-range radio waves. The message goes from a special chip inside the iPhone 6 to the register. It's called NFC, short for Near Field Communication. But NFC is only available in the newest iPhones. Have an older iPhone? Are you using a Mac, iPad or PC? You can still use Apple Pay to buy stuff online. \n\nAnyone with an iPh"
			  ],
			  [
			   "http://money.cnn.com/interactive/technology/minneapolis-light-rail/index.html?section=money_news_economy",
			   "How the Twin Cities got transit right",
			   "East African Bakery received a $20,000 loan from a community fund set up to help businesses affected by the construction. The bakery itself, a wholesale operation which makes two types of East African bread, didn't see much disruption, said owner Francesco O'Ryan. But many of the bakery's buyers (both restaurants and stores) are located along the rail line and saw a big drop in foot traffic, resulting in smaller orders for O'Ryan. He said the $20,000 covered about half of the bakery's losses. \n \n\"There's this whole history on infrastructure doing bad things to neighborhoods, this wasn't going to be just rammed through.\" - Mary Kay Baily, director of the Central Corridor Funders Collaborative \n \nThe loans, which don't need to be repaid if the business stays open for five years, provided up to $20,000 for over 210 small businesses along the construction route. Around $3.5 million was ultimately distributed, and only 10 of the businesses closed during the two-year construction period. \n \n"
			  ],
			  [
			   "http://money.cnn.com/2014/10/20/technology/chicago-coding-education/index.html",
			   "Why Chicago mandates coding education",
			   "Mayor Rahm Emanuel has made K-12 computer science education a priority. NEW YORK (CNNMoney) Parlez-vous \"code\"? \n\nChicago Mayor Rahm Emanuel believes the language of the future is code writing -- and he wants every kid in Chicago to be prepared. \n\nIn a room full of techies at the Internet of Things World Forum last week, he didn't talk about Chicago's or the city's smart parking and LED street lights. Instead, he emphasized the Windy City's commitment to computer science and coding education. \n\n\"In three years time, you can't graduate from high school in the city of Chicago if you didn't take code writing and computer science,\" said Mayor Emanuel in conversation with Cisco CEO John Chambers. \"We're making it mandatory.\" \n\nEmanuel first announced the city's five-year plan for . In three years, Chicago public high schools will require a foundational computer science course in order to graduate. In five years, at least 50% of its high schools will offer AP computer science courses. Comput"
			  ],
			  [
			   "http://money.cnn.com/2014/10/20/technology/mobile/snapchat-ads/index.html",
			   "Snapchat, valued at $10 billion, has started showing ads",
			   "      Snapchat scares up its first ad       NEW YORK (CNNMoney)  Ads have finally come to Snapchat.  \nThe disappearing-message service began inserting ads into users' \"Recent Updates\" feeds for the first time this past weekend. \n \nThe ads will only play if you click on them from your feed -- they won't be inserted into your personal communications, a move Snapchat said would be \"totally rude.\" They disappear after being viewed or after 24 hours. \n \n\"We want to see if we can deliver an experience that's fun and informative, the way ads used to be, before they got creepy and targeted,\" the Los Angeles-based company said in a blog post . \n \n Related: Snapchat isn't private. Period.  \n \nSnapchat doesn't provide figures for its total user base, but the service is wildly popular. As of May, users were viewing over 1 billion stories and sharing more than 700 million snaps per day, the company says, up from just 350 million in October. \n \nSnapchat recently engaged in funding talks valuing it a"
			  ],
			  [
			   "http://money.cnn.com/2014/10/20/technology/apple-earnings/index.html",
			   "Apple profit soars on huge iPhone, Mac sales",
			   "See Apple's new iPads in :60 NEW YORK (CNNMoney) Apple reported a quarterly profit and sales on Tuesday that rose from year-ago results, soundly beating Wall Street's forecasts. \n\nApple sold 39.3 million iPhones in the past quarter, which included nearly two weeks of sales for the new iPhone 6 and iPhone 6 Plus. IPhone sales beat most analysts' expectations and were up 16% from a year ago. The new iPhones went on sale in the United States and a handful of other countries on Sept. 19. \n\nApple also sold 12.3 million iPads, a record 5.5 million Macintosh computers and 2.6 million iPods. , including a thinner iPad Air 2 and an iMac with an ultra-high definition screen. \n\nThe Cupertino, Calif., based company said its net income rose to $8.5 million, or $1.42 per share in Apple's fiscal fourth quarter, up 12.7% from a year earlier. \n\nAnalysts polled by Thomson Reuters forecast earnings of $1.31 per share. \n\nApple's sales rose 12.4% to $42.1 billion, topping analysts' forecasts of $39.9 billi"
			  ],
			  [
			   "http://money.cnn.com/2014/10/20/technology/mobile/snapchat-ads/index.html",
			   "Snapchat starts showing ads",
			   "Snapchat scares up its first ad NEW YORK (CNNMoney) Ads have finally come to Snapchat. \n\nThe disappearing-message service began inserting ads into users' \"Recent Updates\" feeds for the first time this past weekend. \n\nThe ads will only play if you click on them from your feed -- they won't be inserted into your personal communications, a move Snapchat said would be \"totally rude.\" They disappear after being viewed or after 24 hours. \n\n\"We want to see if we can deliver an experience that's fun and informative, the way ads used to be, before they got creepy and targeted,\" the Los Angeles-based company said . Snapchat doesn't provide figures for its total user base, but the service is wildly popular. As of May, users were viewing over 1 billion stories and sharing more than 700 million snaps per day, the company says, up from just 350 million in October. \n\nSnapchat recently engaged in funding talks valuing it , and with that sky-high valuation comes the pressure to generate revenue. \n\n\"Und"
			  ],
			  [
			   "http://money.cnn.com/video/technology/2014/10/20/how-apple-pay-works.cnnmoney",
			   "How Apple Pay works",
			   "Market indexes are shown in real time, except for the DJIA, which is delayed by two minutes. All times are ET. Disclaimer Morningstar: © 2014  Morningstar, Inc.  All Rights Reserved. Disclaimer The Dow Jones Indexes SM are proprietary to and distributed by Dow Jones & Company, Inc. and have been licensed for use.  All content of the Dow Jones Indexes SM © 2014 is proprietary to Dow Jones & Company, Inc. \r\nChicago Mercantile Association. The market data is the property of Chicago Mercantile Exchange Inc. and its licensors. All rights reserved. \r\nFactSet Research Systems Inc. 2014. All rights reserved. Most stock quote data provided by BATS."
			  ],
			  [
			   "http://money.cnn.com/2014/10/20/technology/mobile/apple-pay/index.html",
			   "Ditch the wallet: Apple Pay launches today",
			   "'Apple Pay' may be safer than plastic NEW YORK (CNNMoney) Apple Pay is finally here. \n\nThe new mobile payments system for the iPhone 6 and 6 Plus will be up and running this afternoon following the release of for Apple's iOS mobile operating system. Here's a quick primer on the technology that could one day (but not today) render physical credit cards obsolete. \n\nHow does it work? There are two ways to use Apple Pay. \n\nApple Pay will let iPhone 6 and iPhone 6 Plus owners spend money at participating brick and mortar stores simply by using their phones' fingerprint scanner and holding the device up to the register. \n\nApple Pay works by sending payment information via short-range radio waves. The message goes from a special chip inside the iPhone 6 to the register. It's called NFC, short for Near Field Communication. But NFC is only available in the newest iPhones. Have an older iPhone? Are you using a Mac, iPad or PC? You can still use Apple Pay to buy stuff online. \n\nAnyone with an iPh"
			  ],
			  [
			   "http://money.cnn.com/video/technology/2014/10/20/how-apple-pay-works.cnnmoney/index.html",
			   "How Apple Pay works: No signature, no pin",
			   "Market indexes are shown in real time, except for the DJIA, which is delayed by two minutes. All times are ET. Disclaimer Morningstar: © 2014  Morningstar, Inc.  All Rights Reserved. Disclaimer The Dow Jones Indexes SM are proprietary to and distributed by Dow Jones & Company, Inc. and have been licensed for use.  All content of the Dow Jones Indexes SM © 2014 is proprietary to Dow Jones & Company, Inc. \r\nChicago Mercantile Association. The market data is the property of Chicago Mercantile Exchange Inc. and its licensors. All rights reserved. \r\nFactSet Research Systems Inc. 2014. All rights reserved. Most stock quote data provided by BATS."
			  ],
			  [
			   "http://money.cnn.com/2014/10/20/technology/security/facebook-dea/index.html",
			   "Facebook tells DEA: Stop impersonating users",
			   "NEW YORK (CNNMoney)  Facebook has sent a letter to the U.S. Drug Enforcement Administration demanding that agents stop impersonating users on the social network.  \nThe letter follows a BuzzFeed report that revealed how the DEA seized a woman's phone and later created a Facebook account in her name . \n \nSondra Arquiett was unaware as the DEA masqueraded as her while speaking to her friends. The DEA even posted photos of her with her son and another photo of her alone in panties and a bra. \n \nShe has sued the DEA agent who set up the account. The Justice Department is backing him up, claiming federal agents have the right to do such things. \n \nNow Arquiett has Facebook  ( FB , Tech30 ) on her side. \n \n\"The DEA's deceptive actions... threaten the integrity of our community,\" Facebook chief security officer Joe Sullivan wrote to DEA head Michele Leonhart. \"Using Facebook to impersonate others abuses that trust and makes people feel less safe and secure when using our service.\" \n \n The lett"
			  ],
			  [
			   "http://money.cnn.com/2014/10/20/technology/mobile/apple-pay/index.html",
			   "Apple Pay launches today",
			   "      'Apple Pay' may be safer than plastic       NEW YORK (CNNMoney)  Apple Pay is finally here.  \nThe new mobile payments system for the iPhone 6 and 6 Plus will be up and running this afternoon following the release of a software update for Apple's iOS mobile operating system. Here's a quick primer on the technology that could one day (but not today) render physical credit cards obsolete. \n \n How does it work? There are two ways to use Apple Pay. \n \nApple Pay will let iPhone 6 and iPhone 6 Plus owners spend money at participating brick and mortar stores simply by using their phones' fingerprint scanner and holding the device up to the register. \n \nApple Pay works by sending payment information via short-range radio waves. The message goes from a special chip inside the iPhone 6 to the register. It's called NFC, short for Near Field Communication. But NFC is only available in the newest iPhones. \n \n Related: Inside the head of Apple's top designer  \n \nHave an older iPhone? Are you us"
			  ],
			  [
			   "http://money.cnn.com/2014/10/20/technology/security/facebook-dea/index.html",
			   "Facebook to DEA: Stop impersonating users",
			   "NEW YORK (CNNMoney) Facebook has sent a letter to the U.S. Drug Enforcement Administration demanding that agents stop impersonating users on the social network. \n\nThe letter follows that revealed how the DEA . Sondra Arquiett was unaware as the DEA masqueraded as her while speaking to her friends. The DEA even posted photos of her with her son and another photo of her alone in panties and a bra. \n\nShe has sued the DEA agent who set up the account. The Justice Department is backing him up, claiming federal agents have the right to do such things. \"The DEA's deceptive actions... threaten the integrity of our community,\" Facebook chief security officer Joe Sullivan wrote to DEA head Michele Leonhart. \"Using Facebook to impersonate others abuses that trust and makes people feel less safe and secure when using our service.\" \n\nThe letter goes on to say that Facebook shut down the DEA's fake Arquiett account. It also demands that the DEA confirm it stopped all other cases of impersonation. \n\n"
			  ],
			  [
			   "http://money.cnn.com/video/technology/2014/10/20/snapchat-debuts-its-first-ad.cnnmoney",
			   "Snapchat scares up its first ad",
			   "Market indexes are shown in real time, except for the DJIA, which is delayed by two minutes. All times are ET. Disclaimer Morningstar: © 2014  Morningstar, Inc.  All Rights Reserved. Disclaimer The Dow Jones Indexes SM are proprietary to and distributed by Dow Jones & Company, Inc. and have been licensed for use.  All content of the Dow Jones Indexes SM © 2014 is proprietary to Dow Jones & Company, Inc. \r\nChicago Mercantile Association. The market data is the property of Chicago Mercantile Exchange Inc. and its licensors. All rights reserved. \r\nFactSet Research Systems Inc. 2014. All rights reserved. Most stock quote data provided by BATS."
			  ],
			  [
			   "http://money.cnn.com/video/technology/2014/10/20/smartphone-technology-banking-citi-jane-fraser.cnnmoney/index.html",
			   "Citi exec: Smartphones will transform banking",
			   "If you haven't been using your smartphone to bank already, Citi's Jane Fraser points out how the new technology will change consumer banking: by making it 'less boring.'  \n  \r\n\r \r             \nThis video series features interviews with big thinkers—including economists, strategists, financial advisors and portfolio managers—on the economy, markets and investor-related topics."
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/technology/theranos-elizabeth-holmes/index.html",
			   "Youngest female billionaire is a dropout",
			   "This billionaire is making bank on blood NEW YORK (CNNMoney) America's youngest self-made female billionaire is 30 years old and a college dropout. The company she founded has the potential to change health care for millions of Americans. \n\nElizabeth Holmes left Stanford University at 19 with a plan to start her own company. For money, she cashed out the funds her parents had saved for tuition. Now, she counts billionaire Larry Ellison as an investor and has former secretaries of state on her board. \n\n\"I think a lot of young people have incredible ideas and incredible insights, but sometimes they wait before they go give their life to something,\" she said. \"What I did was just to start a little earlier.\" \n\nHolmes, through her company Theranos, has taken on the $76 billion laboratory-diagnostic industry as her target. It's an industry that was just waiting to be disrupted, since blood testing has not changed since the modern clinical lab emerged in the 1960s. \n\nHer idea: No more vials. "
			  ],
			  [
			   "http://money.cnn.com/video/technology/innovationnation/2014/10/15/blood-billionaire.cnnmoney/index.html",
			   "This billionaire is banking on blood",
			   "Elizabeth Holmes is the youngest self-made female billionaire and she is making her fortune by revolutionizing how we draw blood.  \n  \r\n\r \r             \nThis video series blends small business and tech to highlight dramatic stories of entrepreneurs and the innovative new practices they are implementing to drive the American economy forward."
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/technology/apple-ipad/index.html?hpt=hp_bn2",
			   "Apple unveils new iPads, releases OS X Yosemite",
			   "      See Apple's new iPads in :60       NEW YORK (CNNMoney)  The iPad is getting a facelift.  \n Apple  ( AAPL , Tech30 ) unveiled new editions of the iPad and iPad Mini at an event in California on Thursday, where it also announced that its new Apple Pay system will launch on Monday, Oct. 20. \n \nThe new tablets -- the iPad Air 2 and iPad Mini -- both come with TouchID fingerprint sensors, which previously were only available on the iPhone. You can use the TouchID to make purchases online with Apple Pay, though it won't work at cash registers in stores the way the new iPhones do. \n \n Related: Apple Pay is launching Monday  \n \nThe Air 2 is just 6.1 millimeters thick, 18% smaller than the previous iPad Air. It's also got a souped-up processor, improved Retina display and a camera that takes panoramic photos up to 43 megapixels. \n \nBoth of the new iPads will be available for preorder on Friday and will ship by the end of next week. They're available in gold in addition to the traditional "
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/technology/theranos-elizabeth-holmes/index.html?iid=HP_Highlight&hpt=hp_bn1",
			   "Meet America's youngest female billionaire",
			   "      This billionaire is making bank on blood       NEW YORK (CNNMoney)  America's youngest self-made female billionaire is 30 years old and a college dropout. The company she founded has the potential to change health care for millions of Americans.  \nElizabeth Holmes left Stanford University at 19 with a plan to start her own company. For money, she cashed out the funds her parents had saved for tuition. Now, she counts billionaire Larry Ellison as an investor and has former secretaries of state on her board. \n \n\"I think a lot of young people have incredible ideas and incredible insights, but sometimes they wait before they go give their life to something,\" she said. \"What I did was just to start a little earlier.\" \n \nHolmes, through her company Theranos, has taken on the $76 billion laboratory-diagnostic industry as her target. It's an industry that was just waiting to be disrupted, since blood testing has not changed since the modern clinical lab emerged in the 1960s. \n \nHer idea:"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/technology/apple-ipad/index.html?hpt=hp_t2&hpt=te_t1",
			   "Apple unveils new, skinnier iPad Air",
			   "      See Apple's new iPads in :60       NEW YORK (CNNMoney)  The iPad is getting a facelift.  \n Apple  ( AAPL , Tech30 ) unveiled new editions of the iPad and iPad Mini at an event in California on Thursday, where it also announced that its new Apple Pay system will launch on Monday, Oct. 20. \n \nThe new tablets -- the iPad Air 2 and iPad Mini -- both come with TouchID fingerprint sensors, which previously were only available on the iPhone. You can use the TouchID to make purchases online with Apple Pay, though it won't work at cash registers in stores the way the new iPhones do. \n \n Related: Apple Pay is launching Monday  \n \nThe Air 2 is just 6.1 millimeters thick, 18% smaller than the previous iPad Air. It's also got a souped-up processor, improved Retina display and a camera that takes panoramic photos up to 43 megapixels. \n \nBoth of the new iPads will be available for preorder on Friday and will ship by the end of next week. They're available in gold in addition to the traditional "
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/technology/innovationnation/google-data/index.html?hpt=te_r1",
			   "Google: We'll make you smarter if you share data",
			   "      Eric Schmidt's artificial intelligence prediction       NEW YORK (CNNMoney)  Google's chairman says the search giant can create your ideal artificial personal assistant. The catch? You need to give up more and more of your personal information.  \nIn the next twenty years, Google  ( GOOGL , Tech30 ) Chairman Eric Schmidt envisions a connected world with driverless cars and medical diagnostics on your cell phone. \n \nHe says technology like Google will guide people to better, smarter decisions. \n \n\"The evolution of Google is to go from you asking Google what to search for, to Google helping you anticipate, to make you smarter,\" Schmidt told CNNMoney. \"You let Google know things, Google will help you. Will you use it? Absolutely, because it will be cheap or free.\" \n \nFree, of course, with just a little information. \n \n Related: Google rejects 58% of 'right to be forgotten' requests  \n \nLike any good personal assistant, Google needs to know everything about you. The search giant keeps"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/technology/apple-pay/index.html",
			   "Apple Pay is launching on Monday",
			   "      'Apple Pay' may be safer than plastic       NEW YORK (CNNMoney)  Starting Monday, you can pay for stuff with your iPhone 6.  \n Apple  ( AAPL , Tech30 ) CEO Tim Cook announced Thursday that the company's highly anticipated smartphone-based payment system will debut Oct. 20. \n \n\"We believe Apple Pay is going to be huge,\" Cook said. \"It's going to change the way we pay for things.\" \n \nRoughly 500 banks will support Apple Pay, Cook said. Apple has also signed on retailers including Bloomingdale's, Macy's  ( M ) , McDonald's  ( MCD ) , Staples  ( SPLS ) and Whole Foods  ( WFM ) . \n \n Related: Apple's plan to change how you pay for everything  \n \n Apple Pay will let iPhone 6 and iPhone 6 Plus owners spend money at participating stores simply by using their phones' fingerprint scanner and holding the device up to the register. \n \nWant to pay for something in an app? Just tap \"Pay with Apple Pay,\" put your finger on the fingerprint reader, and you're done. The charge goes straight to you"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/technology/mobile/google-mobile/index.html",
			   "Google mobile ads get more clicks, less money",
			   "      Eric Schmidt's artificial intelligence prediction       NEW YORK (CNNMoney)  Google still hasn't quite figured out the mobile ad business.  \nShares slipped 2% in after-hours trading Thursday after the search giant reported third-quarter sales that came up short of expectations, as well as another decline in the average amount paid by advertisers when a user clicks on an ad. \n \nThe figure, known as \"cost per click,\" dropped 2% versus a year ago. \n \n Related: Google unveils Android Lollipop and latest Nexus devices  \n \nThe challenge for Google  ( GOOGL , Tech30 ) in the past few quarters has been convincing marketers to pay as much for mobile ads as they do for desktop ads, a task that's become increasingly pressing as web usage shifts to smartphones. \n \nMobile ads command lower prices than desktop ads, so Google's average cost-per-click has fallen even as the number of clicks increases. \n \nGoogle still reported $16.5 billion in sales for the third quarter, a 20% increase from a ye"
			  ],
			  [
			   "http://money.cnn.com/video/technology/2014/10/16/apple-new-imac-in-60-seconds.cnnmoney",
			   "See Apple's new iMac in :60",
			   "Apple unveiled a 27-inch iMac desktop computer today with 14.7 million pixel retina display.  \n  \r\n\r \r             \nThis video series blends small business and tech to highlight dramatic stories of entrepreneurs and the innovative new practices they are implementing to drive the American economy forward."
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/technology/mobile/google-mobile/index.html",
			   "Google mobile ads: more clicks, less money",
			   "Eric Schmidt's artificial intelligence prediction NEW YORK (CNNMoney) Google still hasn't quite figured out the mobile ad business. \n\nShares slipped 2% in after-hours trading Thursday after the search giant reported third-quarter sales that came up short of expectations, as well as another decline in the average amount paid by advertisers when a user clicks on an ad. \n\nThe figure, known as \"cost per click,\" dropped 2% versus a year ago. Mobile ads command lower prices than desktop ads, so Google's average cost-per-click has fallen even as the number of clicks increases. \n\nGoogle still reported $16.5 billion in sales for the third quarter, a 20% increase from a year ago, as web users clicked on 17% more ads than they did a year ago. \n\nGoogle has a commanding position when it comes to mobile search, holding an 83% market share in the U.S. as of August, according to StatCounter. Shares slipped 2% in after-hours trading Thursday after the search giant reported third-quarter sales that came"
			  ],
			  [
			   "http://money.cnn.com/video/technology/2014/10/16/apple-new-ipads-in-60-seconds.cnnmoney",
			   "See Apple's new iPads in :60",
			   "Apple is releasing two new iPads: the iPad Air 2 and the iPad Mini 3.  \n  \r\n\r \r             \nThis video series blends small business and tech to highlight dramatic stories of entrepreneurs and the innovative new practices they are implementing to drive the American economy forward."
			  ],
			  [
			   "http://money.cnn.com/video/technology/2014/10/16/apple-colbert-secrecy.cnnmoney",
			   "Apple calls Colbert, pokes fun at secrecy",
			   "After details of Apple's new iPads surfaced a day early in the iTunes store, the famously private company mocked itself.  \n  \r\n\r \r             \nThis video series blends small business and tech to highlight dramatic stories of entrepreneurs and the innovative new practices they are implementing to drive the American economy forward."
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/technology/apple-ipad/index.html",
			   "Apple unveils new iPads, OS X Yosemite",
			   "5 weird ways to use your iPad NEW YORK (CNNMoney) The iPad is getting a facelift. The new tablets -- the iPad Air 2 and iPad Mini -- both come with TouchID fingerprint sensors, which previously were only available on the iPhone. You can use the TouchID to make purchases online with Apple Pay, though it won't work at cash registers in stores the way the new iPhones do. \n\nThe Air 2 is just 6.1 millimeters thick, 18% smaller than the previous iPad Air. It's also got a souped-up processor, improved Retina display and a camera that takes panoramic photos up to 43 megapixels. Both of the new iPads will be available for preorder on Friday and will ship by the end of next week. The Air 2 starts at $499 for the 16-gigabyte, WiFi-only version, while the same version of the Mini 3 goes for $399. \n\nThe 64-gig Air 2 is $599, while the 128-gig version is $699; for an additional $130, you can get a version in each of those sizes equipped with cellular data connectivity. \n\nApple also unveiled a new 27"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/technology/apple-ipad/index.html",
			   "Apple unveils new iPads",
			   "5 weird ways to use your iPad NEW YORK (CNNMoney) The iPad is due for a facelift. The company accidentally leaked photos and details on key features of the new iPads -- the iPad Air 2 and the iPad Mini 3 -- in iTunes on Wednesday. \n\nDiscovered by 9to5Mac, the photos show that the new tablets will both gain TouchID fingerprint sensors, which are currently only available on the iPhone, and that the Air 2 will gain a burst photography mode. They also seem to verify that the latest update to the company's mobile operating system, iOS 8.1, is coming Thursday. \n\nOverall, the physical designs of the new tablets appear to be largely unchanged from existing iPad models. Beyond the iPads, there may be more details about , a system that will let iPhone 6 and iPhone 6 Plus owners spend money at participating stores simply by using their phones' fingerprint scanner and holding the device up to the register. \n\nApple has already announced that a number of major retailers will support the system from "
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/technology/apple-ipad/index.html",
			   "Apple set to unveil new iPads",
			   "5 weird ways to use your iPad NEW YORK (CNNMoney) The iPad is due for a facelift. The company accidentally leaked photos and details on key features of the new iPads -- the iPad Air 2 and the iPad Mini 3 -- in iTunes on Wednesday. \n\nDiscovered by 9to5Mac, the photos show that the new tablets will both gain TouchID fingerprint sensors, which are currently only available on the iPhone, and that the Air 2 will gain a burst photography mode. They also seem to verify that the latest update to the company's mobile operating system, iOS 8.1, is coming Thursday. \n\nOverall, the physical designs of the new tablets appear to be largely unchanged from existing iPad models. Beyond the iPads, there may be more details about , a system that will let iPhone 6 and iPhone 6 Plus owners spend money at participating stores simply by using their phones' fingerprint scanner and holding the device up to the register. \n\nApple has already announced that a number of major retailers will support the system from "
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/technology/apple-ipad/index.html",
			   "Apple set to release new iPads",
			   "      5 weird ways to use your iPad       NEW YORK (CNNMoney)  The iPad is due for a facelift.  \n Apple  ( AAPL , Tech30 ) is set to unveil new editions of the iPad and iPad Mini at an event in California on Thursday, and could also provide details on the launch of its new Apple Pay system. \n \nThe company accidentally leaked photos and details on key features of the new iPads -- the iPad Air 2 and the iPad Mini 3 -- in iTunes on Wednesday. \n \nDiscovered by 9to5Mac , the photos show that the new tablets will both gain TouchID fingerprint sensors, which are currently only available on the iPhone, and that the Air 2 will gain a burst photography mode. They also seem to verify that the latest update to the company's mobile operating system, iOS 8.1, is coming Thursday. \n \nOverall, the physical designs of the new tablets appear to be largely unchanged from existing iPad models. \n \n Related: Apple's plan to change how you pay for everything  \n \nBeyond the iPads, there may be more details abo"
			  ],
			  [
			   "http://money.cnn.com/2014/10/15/technology/netflix-price/index.html",
			   "Netflix shares tank 20% on weak results",
			   "      The Golden Age of binge TV watching?       NEW YORK (CNNMoney)  Netflix may be paying the price for raising the price of its subscriptions.  \nShares plunged more than 25% in premarket trading, a day after the streaming video service reported subscriber growth that came up short of its forecasts. Netflix  ( NFLX , Tech30 ) attributed the weak growth to the $1 increase in price for new subscriptions it announced in May. \n \n\"This quarter we over-forecasted membership growth,\" Netflix said in a letter to shareholders. \"As best we can tell, the primary cause is the slightly higher prices we now have compared to a year ago.\" \n \nThe company added that it has no plans to roll back the price hike, saying it \"remain[s] happy with the price changes and growth in revenue.\" \n \n Related: Netflix's strategy: Shows for every age  \n \nNetflix also said its costs will increase in the months to come as it expands in Europe . \n \nOverall, Netflix earned $59 million in the third quarter and added just "
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/technology/theranos-elizabeth-holmes/index.html",
			   "She's America's youngest female billionaire - and a dropout",
			   "      This billionaire is making bank on blood       NEW YORK (CNNMoney)  America's youngest self-made female billionaire is 30 years old and a college dropout. The company she founded has the potential to change health care for millions of Americans.  \nElizabeth Holmes left Stanford University at 19 with a plan to start her own company. For money, she cashed out the funds her parents had saved for tuition. Now, she counts billionaire Larry Ellison as an investor and has former secretaries of state on her board. \n \n\"I think a lot of young people have incredible ideas and incredible insights, but sometimes they wait before they go give their life to something,\" she said. \"What I did was just to start a little earlier.\" \n \nHolmes, through her company Theranos, has taken on the $76 billion laboratory-diagnostic industry as her target. It's an industry that was just waiting to be disrupted, since blood testing has not changed since the modern clinical lab emerged in the 1960s. \n \nHer idea:"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/technology/innovationnation/google-data/index.html?section=money_news_international",
			   "Google: Share data, get smarter",
			   "Eric Schmidt's artificial intelligence prediction NEW YORK (CNNMoney) Google's chairman says the search giant can create your ideal artificial personal assistant. The catch? You need to give up more and more of your personal information. \n\nIn the next twenty years, Google \n\nHe says technology like Google will guide people to better, smarter decisions. \n\n\"The evolution of Google is to go from you asking Google what to search for, to Google helping you anticipate, to make you smarter,\" Schmidt told CNNMoney. \"You let Google know things, Google will help you. Will you use it? Absolutely, because it will be cheap or free.\" \n\nFree, of course, with just a little information. Like any good personal assistant, Google needs to know everything about you. The search giant keeps track of what sites you visit, what you search, and who you email. \n\nSchmidt points out that you can change your Google privacy settings to share less information, and anything you do share remains between you and Google. "
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/technology/theranos-elizabeth-holmes/index.html",
			   "America's youngest female billionaire",
			   "This billionaire is making bank on blood NEW YORK (CNNMoney) America's youngest self-made female billionaire is 30 years old and a college dropout. The company she founded has the potential to change health care for millions of Americans. \n\nElizabeth Holmes left Stanford University at 19 with a plan to start her own company. For money, she cashed out the funds her parents had saved for tuition. Now, she counts billionaire Larry Ellison as an investor and has former secretaries of state on her board. \n\n\"I think a lot of young people have incredible ideas and incredible insights, but sometimes they wait before they go give their life to something,\" she said. \"What I did was just to start a little earlier.\" \n\nHolmes, through her company Theranos, has taken on the $76 billion laboratory-diagnostic industry as her target. It's an industry that was just waiting to be disrupted, since blood testing has not changed since the modern clinical lab emerged in the 1960s. \n\nHer idea: No more vials. "
			  ],
			  [
			   "http://money.cnn.com/2014/10/15/technology/netflix-price/index.html",
			   "Higher prices taking a toll on Netflix",
			   "The Golden Age of binge TV watching? NEW YORK (CNNMoney) Netflix may be paying the price for raising the price of its subscriptions. \n\nShares plunged more than 25% in premarket trading, a day after the streaming video service reported subscriber growth that came up short of its forecasts. Netflix \n\n\"This quarter we over-forecasted membership growth,\" Netflix said in a letter to shareholders. \"As best we can tell, the primary cause is the slightly higher prices we now have compared to a year ago.\" \n\nThe company added that it has no plans to roll back the price hike, saying it \"remain[s] happy with the price changes and growth in revenue.\" Netflix also said its costs will increase in the months to come as it . Overall, Netflix earned $59 million in the third quarter and added just over three million members. It now boasts a total of 53 million subscribers worldwide, and estimates that it will add four million more in the fourth quarter. \n\nThe news comes on the same day CNN parent Time Wa"
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/technology/innovationnation/google-data/index.html",
			   "Google: We'll make you smarter",
			   "Eric Schmidt's artificial intelligence prediction NEW YORK (CNNMoney) Google's chairman says the search giant can create your ideal artificial personal assistant. The catch? You need to give up more and more of your personal information. \n\nIn the next twenty years, Google \n\nHe says technology like Google will guide people to better, smarter decisions. \n\n\"The evolution of Google is to go from you asking Google what to search for, to Google helping you anticipate, to make you smarter,\" Schmidt told CNNMoney. \"You let Google know things, Google will help you. Will you use it? Absolutely, because it will be cheap or free.\" \n\nFree, of course, with just a little information. Like any good personal assistant, Google needs to know everything about you. The search giant keeps track of what sites you visit, what you search, and who you email. \n\nSchmidt points out that you can change your Google privacy settings to share less information, and anything you do share remains between you and Google. "
			  ],
			  [
			   "http://money.cnn.com/2014/10/16/technology/innovationnation/google-data/index.html",
			   "Google: We'll make you smarter ... if you share your data",
			   "Eric Schmidt's artificial intelligence prediction NEW YORK (CNNMoney) Google's chairman says the search giant can create your ideal artificial personal assistant. The catch? You need to give up more and more of your personal information. \n\nIn the next twenty years, Google \n\nHe says technology like Google will guide people to better, smarter decisions. \n\n\"The evolution of Google is to go from you asking Google what to search for, to Google helping you anticipate, to make you smarter,\" Schmidt told CNNMoney. \"You let Google know things, Google will help you. Will you use it? Absolutely, because it will be cheap or free.\" \n\nFree, of course, with just a little information. Like any good personal assistant, Google needs to know everything about you. The search giant keeps track of what sites you visit, what you search, and who you email. \n\nSchmidt points out that you can change your Google privacy settings to share less information, and anything you do share remains between you and Google. "
			  ],
			  [
			   "http://money.cnn.com/video/technology/2014/10/16/eric-schmidts-artificial-intelligence-prediction.cnnmoney/index.html",
			   "Eric Schmidt's artificial intelligence prediction",
			   "Executive Chairman Eric Schmidt says Google can be the perfect personal assistant that makes you smarter. The cost? Just a little bit of privacy.  \n  \r\n\r \r  \nHot List \n                        \nThis video series features interviews with big thinkers—including economists, strategists, financial advisors and portfolio managers—on the economy, markets and investor-related topics."
			  ],
			  [
			   "http://money.cnn.com/2014/10/15/technology/netflix-price/index.html?section=money_news_international",
			   "Netflix shares are tanking",
			   "The Golden Age of binge TV watching? NEW YORK (CNNMoney) Netflix may be paying the price for raising the price of its subscriptions. \n\nShares plunged more than 20% in after-hours trading Wednesday after the streaming video service reported subscriber growth that came up short of its forecasts. Netflix \n\n\"This quarter we over-forecasted membership growth,\" Netflix said in a letter to shareholders. \"As best we can tell, the primary cause is the slightly higher prices we now have compared to a year ago.\" \n\nThe company added that it has no plans to roll back the price hike, saying it \"remain[s] happy with the price changes and growth in revenue.\" Netflix also said its costs will increase in the months to come as it . Overall, Netflix earned $59 million in the third quarter and added just over three million members. It now boasts a total of 53 million subscribers worldwide, and estimates that it will add four million more in the fourth quarter. \n\nThe news comes on the same day CNN parent Ti"
			  ],
			  [
			   "http://money.cnn.com/video/technology/2014/10/16/five-ways-to-use-your-ipad.cnnmoney",
			   "5 weird ways to use your iPad",
			   "Market indexes are shown in real time, except for the DJIA, which is delayed by two minutes. All times are ET. Disclaimer Morningstar: © 2014  Morningstar, Inc.  All Rights Reserved. Disclaimer The Dow Jones Indexes SM are proprietary to and distributed by Dow Jones & Company, Inc. and have been licensed for use.  All content of the Dow Jones Indexes SM © 2014 is proprietary to Dow Jones & Company, Inc. \r\nChicago Mercantile Association. The market data is the property of Chicago Mercantile Exchange Inc. and its licensors. All rights reserved. \r\nFactSet Research Systems Inc. 2014. All rights reserved. Most stock quote data provided by BATS."
			  ],
			  [
			   "http://money.cnn.com/2014/10/15/technology/netflix-price/index.html?section=money_news_international",
			   "Netflix shares tank 20%",
			   "The Golden Age of binge TV watching? NEW YORK (CNNMoney) Netflix may be paying the price for raising the price of its subscriptions. \n\nShares plunged more than 20% in after-hours trading Wednesday after the streaming video service reported subscriber growth that came up short of its forecasts. Netflix \n\n\"This quarter we over-forecasted membership growth,\" Netflix said in a letter to shareholders. \"As best we can tell, the primary cause is the slightly higher prices we now have compared to a year ago.\" \n\nThe company added that it has no plans to roll back the price hike, saying it \"remain[s] happy with the price changes and growth in revenue.\" Netflix also said its costs will increase in the months to come as it . Overall, Netflix earned $59 million in the third quarter and added just over three million members. It now boasts a total of 53 million subscribers worldwide, and estimates that it will add four million more in the fourth quarter. \n\nThe news comes on the same day CNN parent Ti"
			  ],
			  [
			   "http://money.cnn.com/2014/10/15/technology/netflix-price/index.html",
			   "Netflix shares tank 20% on weaker subscriber growth",
			   "      The Golden Age of binge TV watching?       NEW YORK (CNNMoney)  Netflix may be paying the price for raising the price of its subscriptions.  \nShares plunged more than 20% in after-hours trading Wednesday after the streaming video service reported subscriber growth that came up short of its forecasts. Netflix  ( NFLX , Tech30 ) attributed the weak growth to the $1 increase in price for new subscriptions it announced in May. \n \n\"This quarter we over-forecasted membership growth,\" Netflix said in a letter to shareholders. \"As best we can tell, the primary cause is the slightly higher prices we now have compared to a year ago.\" \n \nThe company added that it has no plans to roll back the price hike, saying it \"remain[s] happy with the price changes and growth in revenue.\" \n \n Related: Netflix's strategy: Shows for every age  \n \nNetflix also said its costs will increase in the months to come as it expands in Europe . \n \nOverall, Netflix earned $59 million in the third quarter and added "
			  ],
			  [
			   "http://money.cnn.com/video/technology/innovationnation/2014/10/15/blood-billionaire.cnnmoney",
			   "This billionaire is making bank on blood",
			   "Elizabeth Holmes is the youngest self-made female billionaire and she is making her fortune by revolutionizing how we draw blood.  \n  \r\n\r \r  \nHot List \n                        \nThis video series blends small business and tech to highlight dramatic stories of entrepreneurs and the innovative new practices they are implementing to drive the American economy forward."
			  ],
			  [
			   "http://money.cnn.com/2014/10/15/technology/mobile/nexus-lollipop-google/index.html",
			   "Google unveils Android Lollipop and latest Nexus devices",
			   "      Check out Google's new Android L       NEW YORK (CNNMoney)  The latest version of Android is almost here.  \n Google  ( GOOGL , Tech30 ) announced Wednesday that the new version of its Android mobile operating system, nicknamed \"Lollipop,\" will be available on select mobile devices within the next few weeks. \n \nLollipop will first be available on the Nexus 6, a new phone developed with Motorola that hits stores in November. It will also be available on the new Nexus 9 tablet from HTC and the Nexus Player, a gaming and streaming media device from Asus. \n \nThe software will follow shortly on other Nexus-branded devices, as well as a handful of \"Google Play edition\" phones. Those phones, from companies like Samsung and HTC, run Google's pure version of Android without any of the typical bells and whistles that phone makers add to make their phones stand out against their rivals. \n \n Related: Google takes on Amazon Prime  \n \nGoogle previewed Lollipop at its software developer conferen"
			  ],
			  [
			   "http://money.cnn.com/2014/10/07/technology/chicago-library/index.html",
			   "Get a robot with your library card",
			   "The Harold Washington Library Center in Chicago, which is the central library for the Chicago Public Library System. NEW YORK (CNNMoney) Want your own robot? All you need is a library card. \n\nAt least if you're in Chicago. The Windy City is leading the way when it comes to innovating libraries, making a trip to the local branch a multimedia experience, especially for those who might not have access to the technology otherwise. \n\nThe libraries offer patrons the chance to use cutting-edge technology in one of the \"maker labs,\" which are stocked with 3D printers and laser cutters. There's a permanent maker lab at the main library, and rotating labs that tour the smaller branches. \n\n\"The city has had a longstanding, roll-up-your-sleeves, problem-solving mentality,\" said Erika Poethig of the Urban Institute, which specializes in social and economic policy research. \"The maker labs are a concept of what libraries are in the 21st century.\" \n\nIn addition to the maker labs, which offer demonstr"
			  ],
			  [
			   "http://money.cnn.com/2014/10/15/technology/mobile/nexus-lollipop-google/index.html",
			   "Google unveils Android Lollipop",
			   "NEW YORK (CNNMoney) The latest version of Android is almost here. Lollipop will first be available on the Nexus 6, a new phone developed with Motorola that hits stores in November. It will also be available on the new Nexus 9 tablet from HTC and the Nexus Player, a gaming and streaming media device from Asus. The software will follow shortly on other Nexus-branded devices, as well as a handful of \"Google Play edition\" phones. Those phones, from companies like Samsung and HTC, run Google's pure version of Android without any of the typical bells and whistles that phone makers add to make their phones stand out against their rivals. \n\nGoogle previewed Lollipop at earlier this year. \n\nThe software is designed to work across all your devices, from smartphones to tablets to TVs, storing your information and allowing you to pick up wherever you left off on a previous screen -- even if it was on a different gadget. It allows for multiple user accounts on a single device, as well as custom not"
			  ],
			  [
			   "http://money.cnn.com/2014/10/15/technology/mobile/galaxy-note-4-review/",
			   "Galaxy Note 4 is not the iPhone 6 Plus – CNNMoney",
			   " comments Galaxy Note 4 is not the iPhone 6 Plus By David Goldman  @DavidGoldmanCNN October 15, 2014: 11:36 AM ET   See Samsung's new phones in 60 seconds NEW YORK (CNNMoney) Samsung's Galaxy Note is like the hipster of smartphones -- it was doing the giant phone thing before giant phones were a thing. Now that seriously enormous phones are \"in,\" Samsung has given the Note a spit polish and some funky new bells and whistles in an attempt to keep it one step ahead of the competition -- namely, the iPhone 6 Plus. At first glance, Samsung's (SSNLF) new Galaxy Note 4 and Apple's iPhone 6 Plus look pretty much the same. They're both extremely large phones -- they are almost identical in size, though the Note 4's 5.7-inch screen is 0.2 inch bigger than Apple's. They both have fingerprint sensors, fantastic cameras, better-than-average battery life and new health apps. They even both come with features that make the phone usable for people with small hands. But the Galaxy Note 4 and the iPhon"
			  ],
			  [
			   "http://money.cnn.com/2014/10/15/technology/mobile/galaxy-note-4-review/index.html",
			   "Galaxy Note 4 is not the iPhone 6 Plus",
			   "      See Samsung's new phones in 60 seconds       NEW YORK (CNNMoney)  Samsung's Galaxy Note is like the hipster of smartphones -- it was doing the giant phone thing before giant phones were a thing.  \nNow that seriously enormous phones are \"in,\" Samsung has given the Note a spit polish and some funky new bells and whistles in an attempt to keep it one step ahead of the competition -- namely, the iPhone 6 Plus. \n \nAt first glance, Samsung's  ( SSNLF ) new Galaxy Note 4 and Apple's iPhone 6 Plus look pretty much the same. They're both extremely large phones -- they are almost identical in size, though the Note 4's 5.7-inch screen is 0.2 inch bigger than Apple's. They both have fingerprint sensors, fantastic cameras, better-than-average battery life and new health apps. They even both come with features that make the phone usable for people with small hands. \n \nBut the Galaxy Note 4 and the iPhone 6 Plus claim to be very different things. One calls itself a true \"phablet\" and the other "
			  ],
			  [
			   "http://money.cnn.com/2014/10/15/technology/security/poodle-bug/index.html",
			   "Poodles are attacking the Internet",
			   "NEW YORK (CNNMoney)  There's yet another Internet bug that threatens to make your private conversations public. The new enemy: \"Poodle\" attacks.  \n Google  ( GOOG ) security researchers have discovered a weakness in a method for securing Internet communication. As it turns out, our Web browsers are susceptible to a cyberattack dubbed \"Poodle\" (Padding Oracle On Downgraded Legacy Encryption). \n \nWoof. \n \nNormally, your Web browser uses software to encrypt your conversations. New versions of that software make encryption more robust over time. But with the Poodle attack, a hacker can force your browser to downgrade to an old version (SSL 3.0), which is far less secure than today's SSL standard. \n \nA browser using the 15-year old SSL 3.0 is vulnerable enough to let hackers spy on the data traveling to and from your computer. That means they could spy on your emails, banking or anything else. \n \nFortunately, this dog's bark is louder than its bite. \n \nA hacker must control your computer ne"
			  ],
			  [
			   "http://money.cnn.com/video/technology/2014/10/15/august-smart-lock.cnnmoney",
			   "The door that unlocks when you're near",
			   "The August Smart Lock will unlock your door when you approach it, and allow you to send anyone a virtual key to your home. Laurie Segall reports.  \n  \r\n\r \r  \nHot List \n                        \nThis video series blends small business and tech to highlight dramatic stories of entrepreneurs and the innovative new practices they are implementing to drive the American economy forward."
			  ],
			  [
			   "http://money.cnn.com/2014/10/15/technology/security/poodle-bug/index.html",
			   "\"Poodle\" attack - yet another Internet bug",
			   "NEW YORK (CNNMoney) There's yet another Internet bug that threatens to make your private conversations public. The new enemy: \"Poodle\" attacks. Normally, your Web browser uses software to encrypt your conversations. New versions of that software make encryption more robust over time. But with the Poodle attack, a hacker can force your browser to downgrade to an old version (SSL 3.0), which is far less secure than today's SSL standard. A browser using the 15-year old SSL 3.0 is vulnerable enough to let hackers spy on the data traveling to and from your computer. That means they could spy on your emails, banking or anything else. Fortunately, this dog's bark is louder than its bite. A hacker must control your computer network to attack with Poodle (unlikely). And Web browser patches are expected to disable this downshift to older security methods. That means this Internet bug isn't as bad as others discovered this year. The Heartbleed bug affected computers everywhere and was the reason "
			  ],
			  [
			   "http://money.cnn.com/2014/10/07/technology/chicago-library/index.html",
			   "Future of tech: Your local library",
			   "The Harold Washington Library Center in Chicago, which is the central library for the Chicago Public Library System. NEW YORK (CNNMoney) Want your own robot? All you need is a library card. \n\nAt least if you're in Chicago. The Windy City is leading the way when it comes to innovating libraries, making a trip to the local branch a multimedia experience, especially for those who might not have access to the technology otherwise. \n\nThe libraries offer patrons the chance to use cutting-edge technology in one of the \"maker labs,\" which are stocked with 3D printers and laser cutters. There's a permanent maker lab at the main library, and rotating labs that tour the smaller branches. \n\n\"The city has had a longstanding, roll-up-your-sleeves, problem-solving mentality,\" said Erika Poethig of the Urban Institute, which specializes in social and economic policy research. \"The maker labs are a concept of what libraries are in the 21st century.\" \n\nIn addition to the maker labs, which offer demonstr"
			  ],
			  [
			   "http://us.cnn.com/2014/10/15/technology/security/malvertising/index.html?hpt=hp_t4",
			   "Online ads are attacking you",
			   "_"
			  ],
			  [
			   "http://money.cnn.com/2014/10/15/technology/tinder-india/index.html?section=money_news_international",
			   "Young India looks for love on Tinder",
			   "NEW DELHI (CNNMoney) A popular dating app is attracting legions of young, urban Indians who are happy to use their smartphones in a search for love, even if it means casting aside traditional values. \n\nThe app is Tinder, which despite having arrived only one year ago, is now growing its user base in India by 1% per day. The app matches users by location and then allows them to connect if both parties are interested -- and it's a huge hit in cities like New Delhi and Mumbai. \n\n\"At first I thought it was a superficial, creepy kind of concept, but what it does is broaden your options,\" said Shilpi Roy, a young Delhi resident who has added Tinder to her dating routine. \n\nBut is this app -- which has a reputation for facilitating more hookups than relationships -- compatible with Indian culture? \n\nIn India, 90% of marriages are arranged, and dating around or having multiple partners is frowned upon. Newspaper advertisements and matrimonial websites here still promise a \"homely, God-fearing "
			  ],
			  [
			   "http://money.cnn.com/2014/10/15/technology/tinder-india/index.html",
			   "India looks for love on Tinder",
			   "NEW DELHI (CNNMoney)  A popular dating app is attracting legions of young, urban Indians who are happy to use their smartphones in a search for love, even if it means casting aside traditional values.  \nThe app is Tinder, which despite having arrived only one year ago, is now growing its user base in India by 1% per day. The app matches users by location and then allows them to connect if both parties are interested -- and it's a huge hit in cities like New Delhi and Mumbai. \n \n\"At first I thought it was a superficial, creepy kind of concept, but what it does is broaden your options,\" said Shilpi Roy, a young Delhi resident who has added Tinder to her dating routine. \n \nBut is this app -- which has a reputation for facilitating more hookups than relationships -- compatible with Indian culture? \n \nIn India, 90% of marriages are arranged, and dating around or having multiple partners is frowned upon. Newspaper advertisements and matrimonial websites here still promise a \"homely, God-fear"
			  ],
			  [
			   "http://money.cnn.com/2014/10/14/technology/innovationnation/google-express-amazon/index.html",
			   "Google takes on Amazon Prime",
			   ", in Los Angeles, California. NEW YORK (CNNMoney) Google is opening up a new front in its battle against Amazon. \n\nThe search giant announced this week that it's offering a new subscription shopping service featuring free same-day or overnight delivery on orders over $15. \n\nThe move steps up Google's battle in retail with Amazon \n\nGoogle's shopping business launched a year ago under the name \"Google Shopping Express.\" Google The company delivers products from several dozen retailers including Barnes & Noble \n\nAmazon, for its part, has rolled out a same-day grocery delivery service in a handful of cities known as Amazon Prime Fresh that costs $299 annually. The company said last year that it hoped to offer same-day delivery within the next few years using drones, provided federal restrictions on the unmanned vehicles are lifted. The search giant announced this week that it's offering a new subscription shopping service featuring free same-day or overnight delivery on orders over $15. Th"
			  ],
			  [
			   "http://money.cnn.com/2014/10/14/technology/security/russia-hackers/index.html",
			   "Russian hackers exploit Windows to spy on West",
			   "      28 years of Windows in :75       NEW YORK (CNNMoney)  Russian hackers have taken advantage of a bug in Microsoft Windows to spy on the Ukrainian government and a scholar living in the United States.  \nThat's according to iSight Partners , a cybersecurity intelligence firm that contracts with governments. In a report Tuesday, the firm said it discovered the never-before-seen attack, which has been used by hackers in recent months. \n \nThe bug the hackers used exists in all modern versions of the Windows operating system: Vista, 7, 8 and 8.1. It's also present in 2008 and 2012 versions of Windows used by company servers. That means the vast majority of the world's computers -- nearly 68%, according to NetMarketShare -- are vulnerable to this unique type of attack. \n \n Microsoft  ( MSFT , Tech30 ) , which first learned of the bug from iSight Partners, released a patch at 1 p.m. EST. \n \n Related: Dropbox says it wasn't hacked!  \n          Meet Microsoft Cortana, Siri for Windows     \n"
			  ],
			  [
			   "http://money.cnn.com/2014/10/14/technology/security/russia-hackers/index.html",
			   "Russian hackers' new spying tool: Windows",
			   "28 years of Windows in :75 NEW YORK (CNNMoney) Russian hackers have taken advantage of a bug in Microsoft Windows to spy on the Ukrainian government and a scholar living in the United States. \n\nThat's according to iSight Partners, a cybersecurity intelligence firm that contracts with governments. In a report Tuesday, the firm said it discovered the never-before-seen attack, which has been used by hackers in recent months. \n\nThe bug the hackers used exists in all modern versions of the Windows operating system: Vista, 7, 8 and 8.1. It's also present in 2008 and 2012 versions of Windows used by company servers. That means the vast majority of the world's computers -- nearly 68%, according to NetMarketShare -- are vulnerable to this unique type of attack. The Russian government did not respond to requests for comment. The Ukrainian government said it could not provide an immediate statement. \n\nISight, a Dallas-based intelligence firm, first spotted hackers using this attack in mid-August,"
			  ],
			  [
			   "http://money.cnn.com/2014/10/14/technology/nakamoto-newsweek-bitcoin/index.html?section=money_news_international",
			   "Bitcoin 'inventor' plans to sue",
			   "A screenshot of Dorian Nakamoto's website, which is soliciting donations for a lawsuit against Newsweek. NEW YORK (CNNMoney) The man Newsweek called the \"inventor\" of Bitcoin wants the magazine to pay up. \n\nDorian Nakamoto, the subject of entitled \"The Face Behind Bitcoin,\" is soliciting donations online to fund a lawsuit against the publication. He claims he had nothing to do with the creation of the digital currency, and says Newsweek \"must be held accountable for its reckless reporting.\" \n\nNakamoto is accepting donations via credit card, check, money order or -- of course -- bitcoins. \n\nBitcoin was created in 2009, but its founder has always been shrouded in secrecy. While its creator was identified as \"Satoshi Nakamoto,\" the popular assumption was that the name was only a pseudonym. That changed following the publication of Newsweek's article, the result of a lengthy investigation and interviews with Nakamoto's family members. But Nakamoto's website says he and his family members w"
			  ],
			  [
			   "http://money.cnn.com/2014/10/14/technology/security/russia-hackers/index.html",
			   "Russian hackers use Windows for spying",
			   "28 years of Windows in :75 NEW YORK (CNNMoney) Russian hackers have taken advantage of a bug in Microsoft Windows to spy on the Ukrainian government and a scholar living in the United States. \n\nThat's according to iSight Partners, a cybersecurity intelligence firm that contracts with governments. In a report Tuesday, the firm said it discovered the never-before-seen attack, which has been used by hackers in recent months. \n\nThe bug the hackers used exists in all modern versions of the Windows operating system: Vista, 7, 8 and 8.1. It's also present in 2008 and 2012 versions of Windows used by company servers. That means the vast majority of the world's computers -- nearly 68%, according to NetMarketShare -- are vulnerable to this unique type of attack. The Russian government did not respond to requests for comment. The Ukrainian government said it could not provide an immediate statement. \n\nISight, a Dallas-based intelligence firm, first spotted hackers using this attack in mid-August,"
			  ],
			  [
			   "http://money.cnn.com/2014/10/14/technology/nakamoto-newsweek-bitcoin/index.html",
			   "Bitcoin 'inventor' plans to sue Newsweek",
			   "A screenshot of Dorian Nakamoto's website, which is soliciting donations for a lawsuit against Newsweek. NEW YORK (CNNMoney) The man Newsweek called the \"inventor\" of Bitcoin wants the magazine to pay up. \n\nDorian Nakamoto, the subject of entitled \"The Face Behind Bitcoin,\" is soliciting donations online to fund a lawsuit against the publication. He claims he had nothing to do with the creation of the digital currency, and says Newsweek \"must be held accountable for its reckless reporting.\" \n\nNakamoto is accepting donations via credit card, check, money order or -- of course -- bitcoins. \n\nBitcoin was created in 2009, but its founder has always been shrouded in secrecy. While its creator was identified as \"Satoshi Nakamoto,\" the popular assumption was that the name was only a pseudonym. That changed following the publication of Newsweek's article, the result of a lengthy investigation and interviews with Nakamoto's family members. But Nakamoto's website says he and his family members w"
			  ],
			  [
			   "http://money.cnn.com/2014/10/14/technology/nakamoto-newsweek-bitcoin/index.html",
			   "The guy Newsweek called the 'inventor' of Bitcoin plans to sue",
			   "A screenshot of Dorian Nakamoto's website, which is soliciting donations for a lawsuit against Newsweek.  NEW YORK (CNNMoney)  The man Newsweek called the \"inventor\" of Bitcoin wants the magazine to pay up.  \nDorian Nakamoto, the subject of a March Newsweek cover story entitled \"The Face Behind Bitcoin,\" is soliciting donations online to fund a lawsuit against the publication. He claims he had nothing to do with the creation of the digital currency, and says Newsweek \"must be held accountable for its reckless reporting.\" \n \nNakamoto is accepting donations via credit card, check, money order or -- of course -- bitcoins. \n \nBitcoin was created in 2009, but its founder has always been shrouded in secrecy. While its creator was identified as \"Satoshi Nakamoto,\" the popular assumption was that the name was only a pseudonym. \n \n Related: What is Bitcoin?  \n \nThat changed following the publication of Newsweek's article, the result of a lengthy investigation and interviews with Nakamoto's fami"
			  ],
			  [
			   "http://money.cnn.com/2014/10/14/technology/zuckerberg-ebola/index.html",
			   "Zuckerberg donates $25 million to fight Ebola",
			   "Mark and Priscilla Zuckerberg were the most generous donors in 2013, according to The Chronicle of Philanthropy.  NEW YORK (CNNMoney)  Facebook founder Mark Zuckerberg will donate $25 million to combat the outbreak of the deadly Ebola virus.  \nThe money will go to the CDC Foundation, the charitable organization that raises and distributes funds on behalf the Centers for Disease Control and Prevention to public health organizations. \n \n\"We need to get Ebola under control in the near term so that it doesn't spread further and become a long term global health crisis that we end up fighting for decades at large scale, like HIV or polio,\" he said on a posting on Facebook . \"We believe our grant is the quickest way to empower the CDC and the experts in this field to prevent this outcome.\" \n \n Related: Chocolate companies join Ebola fight  \n \nThe United States had its first fatality from the current Ebola outbreak last week when Thomas Eric Duncan died in a Dallas hospital last week. One of t"
			  ],
			  [
			   "http://money.cnn.com/2014/10/14/technology/security/dropbox-hack/index.html",
			   "Dropbox: We weren't hacked!",
			   "      So you've been hacked... Now what?       NEW YORK (CNNMoney)  A group of anonymous hackers claims to have stolen nearly 7 million Dropbox username and password combinations. But Dropbox denied that it was hacked.  \nThe hackers have posted several hundred email addresses and passwords so far on Pastebin.com, releasing more logins as they receive more bitcoin donations. \n \n\"Your stuff is safe,\" Dropbox said in a blog post . \"The usernames and passwords ... were stolen from unrelated services, not Dropbox.\" \n \nIt's not clear which service or services the passwords were stolen from. A Dropbox spokeswoman wouldn't name any potential culprit. \n \nIt's possible that some people used the same login information for Dropbox that they used for the third-party app. \n \n Related: Snapchat isn't private. Period.  \n \nDropbox says it constantly monitors its accounts for suspicious activity, and it will reset customers' passwords when necessary. It also advised customers to take steps to further pr"
			  ],
			  [
			   "http://money.cnn.com/2014/10/14/technology/zuckerberg-ebola/index.html?section=money_news_international",
			   "Zuckerberg gives $25 million to fight Ebola",
			   "Mark and Priscilla Zuckerberg were the most generous donors in 2013, according to The Chronicle of Philanthropy.  NEW YORK (CNNMoney)  Facebook founder Mark Zuckerberg will donate $25 million to combat the outbreak of the deadly Ebola virus.  \nThe money will go to the CDC Foundation, the charitable organization that raises and distributes funds on behalf the Centers for Disease Control and Prevention to public health organizations. \n \n\"We need to get Ebola under control in the near term so that it doesn't spread further and become a long term global health crisis that we end up fighting for decades at large scale, like HIV or polio,\" he said on a posting on Facebook. \"We believe our grant is the quickest way to empower the CDC and the experts in this field to prevent this outcome.\" \n \nSoon after his posting Tuesday the CDC Foundation's website was offline, and phone calls to the organization's main switchboard went to straight to voicemail. \n \n Related: Chocolate companies join Ebola f"
			  ],
			  [
			   "http://money.cnn.com/2014/10/13/technology/mobile/apple-pay/",
			   "Apple Pay is making its way to stores this week",
			   "CNNMoney \nApple Pay is making its way to stores this week \nCNNMoney \nGet ready to start paying for things with your phone -- at least, if you've got one of Apple's latest devices. The tech giant's new Apple Pay system is set to launch for retailers on Saturday, according to a leaked memo from Walgreen's posted by MacRumors. \nApple Pay details leaked in alleged training documents CNET \nApple and retail partners prepare for launch of Apple Pay The Verge \nApple Pay will work with banks to update expired credit cards, source says Ars Technica \nBusiness Insider  - Gotta Be Mobile  - TIME \nall 185 news articles »"
			  ],
			  [
			   "http://money.cnn.com/2014/10/14/technology/zuckerberg-ebola/index.html",
			   "Zuckerberg donates $25M to fight Ebola",
			   "Mark and Priscilla Zuckerberg were the most generous donors in 2013, according to The Chronicle of Philanthropy.  NEW YORK (CNNMoney)  Facebook founder Mark Zuckerberg will donate $25 million to combat the outbreak of the deadly Ebola virus.  \nThe money will go to the CDC Foundation, the charitable organization that raises and distributes funds on behalf the Centers for Disease Control and Prevention to public health organizations. \n \n\"We need to get Ebola under control in the near term so that it doesn't spread further and become a long term global health crisis that we end up fighting for decades at large scale, like HIV or polio,\" he said on a posting on Facebook. \"We believe our grant is the quickest way to empower the CDC and the experts in this field to prevent this outcome.\" \n \nSoon after his posting Tuesday the CDC Foundation's website was offline, and phone calls to the organization's main switchboard went to straight to voicemail. \n \n Related: Chocolate companies join Ebola f"
			  ],
			  [
			   "http://money.cnn.com/2014/10/14/news/economy/bill-gates-criticizes-thomas-piketty/index.html?section=money_technology",
			   "Bill Gates: Piketty's book has \"flaws\"",
			   "NEW YORK (CNNMoney) Bill Gates sees flaws in Thomas Piketty's best-selling economic doctrine \"Capital in the Twenty-First Century.\" \n\nGates published a critical blog post on Piketty's work Monday night, arguing that the French economist's didn't get his equations right on income inequality. \n\n\"He does not give a full picture of how wealth is created and how it decays,\" Gates, the world's richest man, wrote on his blog. Piketty's 700-page book has made him a celebrity and authority on income inequality and tax policy. Gates agrees with Piketty that income inequality is a big problem and that government can play a constructive role to fix it. \n\nBut Gates says Piketty's idea that old money accumulated over centuries is causing inequality is false. He points towards the Fortune 400 list, which has many entrepreneurs who garnered billions in their own lifetimes. Gates adds that Piketty's research is missing important data too. \n\n\"I am also disappointed that Piketty focused heavily on data o"
			  ],
			  [
			   "http://www.cnn.com/2014/10/10/tech/innovation/space-elevator-nanotechnology/index.html",
			   "Cosmic elevator could reach space on a diamond cable",
			   "Editor's note: Tomorrow Transformed explores innovative approaches and opportunities available in business and society through technology. \n\n(CNN) -- Want to ride an elevator into space? While the idea has been around for more than 100 years, a breakthrough in nanotechnology could mean we will be riding into space on a cable made of diamonds.\n\nScientists at Penn State University in the US released a research paper last month that showed the way forward to producing ultra-thin \"diamond nanothreads\" that have a strength and stiffness greater than that of today's strongest nanotubes and polymers.\n\nJohn Badding, professor of chemistry at Penn State University, told CNN his team had made the breakthrough while examining the properties of benzene molecules and that it took 18 months of study to make sense of what the team had been seeing.\n\n\"It is as if an incredible jeweler has strung together the smallest possible diamonds into a long miniature necklace,\" Badding said. \"Because this thread "
			  ],
			  [
			   "http://money.cnn.com/2014/10/13/technology/mobile/apple-pay/index.html",
			   "Ditch the cash: Apple Pay coming this week",
			   "Apple Pay turns iPhone into credit card NEW YORK (CNNMoney) Get ready to start paying for things with your phone -- at least, if you've got one of Apple's latest devices. \n\nThe tech giant's new Apple Pay system is set to launch for retailers on Saturday, according to a leaked memo from Walgreen's . Apple declined a request for comment; Walgreen's did not immediately respond. \n\nApple Pay will let iPhone 6 and iPhone 6 Plus owners spend money at participating stores simply by using their phones' fingerprint scanner then holding the device up to the register. \n\nWant to pay for something in an app? Just tap \"Pay with Apple Pay,\" put your finger on the fingerprint reader, and you're done. The charge goes straight to your credit or debit card -- whatever you've set up with Apple. Apple Pay works by sending payment information via short-range radio waves. The message goes from a special chip inside the iPhone 6 to the register. It's called NFC, short for Near Field Communication. \n\nThat neat "
			  ],
			  [
			   "http://money.cnn.com/2014/10/13/technology/security/fbi-apple/index.html",
			   "FBI director: iPhones shields pedophiles from cops",
			   "      See Apple's new iPhone 6 in :60       NEW YORK (CNNMoney)  Apple's new privacy features protect kidnappers, pedophiles and terrorists, according to FBI director James Comey.  \nIn an interview on CBS' \"60 Minutes\" on Sunday , Comey said Apple's encryption standards for iPhones and iPads \"put people beyond the law.\" \n \n Apple  ( AAPL , Tech30 ) recently took measures to enhance user privacy. Now, only users have the key to unlock text messages, photos and emails on their device. As such, iOS 8 will shield your data from anyone -- including police . \n \nHere's how it works: You send a text message that's encrypted on your device. It passes through Apple servers as jumbled code nobody can crack. And it can only get decrypted by your friend's iPhone passcode. \n \n Google  ( GOOG ) has announced it's doing the same for its Android devices. \n \nThe FBI director isn't pleased. \n \n\"The notion that people have devices... that with court orders, based on a showing of probable cause in a case i"
			  ],
			  [
			   "http://money.cnn.com/2014/10/13/technology/security/fbi-apple/index.html",
			   "FBI director: iPhones protect pedophiles",
			   "FBI director James Comey discusses Apple's privacy features on 60 Minutes. NEW YORK (CNNMoney) Apple's new privacy features protect kidnappers, pedophiles and terrorists, according to FBI director James Comey. In , Comey said Apple's encryption standards for iPhones and iPads \"put people beyond the law.\" Here's how it works: You send a text message that's encrypted on your device. It passes through Apple servers as jumbled code nobody can crack. And it can only get decrypted by your friend's iPhone passcode. \"The notion that people have devices... that with court orders, based on a showing of probable cause in a case involving kidnapping or child exploitation or terrorism, we could never open that phone? My sense is that we've gone too far when we've gone there,\" Comey told CBS. \n\nComey compared selling iPhones to selling \"cars with trunks that couldn't ever be opened by law enforcement with a court order.\" \n\nBut there are two things that are wrong with that statement: \n\n1) The FBI can"
			  ],
			  [
			   "http://money.cnn.com/2014/10/13/technology/net-neutrality-compromise/index.html",
			   "AT&T wants you to design your own Internet fast lane",
			   "AT&T says its plan is \"entirely in keeping with the Internet's history and structure.\"  NEW YORK (CNNMoney)  Activists and big Internet providers have spent this year in a war of words over Internet \"fast lanes\" and net neutrality. AT&T has what it thinks may be a compromise.  \nWith regulators still working to craft rules on net neutrality, the telecom giant has sent a proposal to the Federal Communications Commission for so-called \"Internet fast lanes\" created at the discretion of users, not Internet providers. \n \nThat means you could direct your Internet provider to prioritize Skype calls over online gaming, or Netflix over email. \n \nThe FCC has already received hundreds of thousands of comment letters on the subject, and will likely finalize its rules within the next few months. \n \nActivists and Web companies like Reddit and Netflix  ( NFLX , Tech30 ) have been up in arms over a draft of the pending FCC rules circulated earlier this year. The draft rules would allow Internet service"
			  ],
			  [
			   "http://money.cnn.com/video/technology/2014/10/13/steve-lamar-beats-roam.cnnmoney/index.html",
			   "Early Beats employee to take on former company with new product",
			   "Steven Lamar, one of the minds behind Beats by Dr. Dre, has announced a new headphone brand: ROAM. Laurie Segall reports.  \n  \r\n\r \r  \nHot List \n                        \nThis video series blends small business and tech to highlight dramatic stories of entrepreneurs and the innovative new practices they are implementing to drive the American economy forward."
			  ],
			  [
			   "http://money.cnn.com/2014/10/13/technology/net-neutrality-compromise/index.html?section=money_technology",
			   "AT&T: Make your own Internet fast lane",
			   "AT&T says its plan is \"entirely in keeping with the Internet's history and structure.\" NEW YORK (CNNMoney) Activists and big Internet providers have spent this year in a war of words over Internet \"fast lanes\" and net neutrality. AT&T has what it thinks may be a compromise. \n\nWith regulators still working to craft rules on net neutrality, the telecom giant has sent a proposal to the Federal Communications Commission for so-called \"Internet fast lanes\" created at the discretion of users, not Internet providers. \n\nThat means you could direct your Internet provider to prioritize Skype calls over online gaming, or Netflix over email. \n\nThe FCC has already received hundreds of thousands of comment letters on the subject, and will likely finalize its rules within the next few months. \n\nActivists and Web companies like Reddit and Netflix \n\nThe worry is that a system like this would stifle innovation by entrenching the advantages of established, deep-pocketed websites over upstart competitors."
			  ],
			  [
			   "http://money.cnn.com/video/technology/2014/10/13/stem-math-dance-shine.cnnmoney",
			   "Dance program helps girls boost math scores",
			   "Market indexes are shown in real time, except for the DJIA, which is delayed by two minutes. All times are ET. Disclaimer Morningstar: © 2014  Morningstar, Inc.  All Rights Reserved. Disclaimer The Dow Jones Indexes SM are proprietary to and distributed by Dow Jones & Company, Inc. and have been licensed for use.  All content of the Dow Jones Indexes SM © 2014 is proprietary to Dow Jones & Company, Inc. \r\nChicago Mercantile Association. The market data is the property of Chicago Mercantile Exchange Inc. and its licensors. All rights reserved. \r\nFactSet Research Systems Inc. 2014. All rights reserved. Most stock quote data provided by BATS."
			  ],
			  [
			   "http://money.cnn.com/video/technology/2014/10/13/steve-lamar-beats-roam.cnnmoney/index.html",
			   "New earbuds take aim at Apple's Beats",
			   "Steven Lamar, an early staffer of Beats Electronics, has announced a new headphone brand to compete with his former employer.  \n  \r\n\r \r  \nHot List \n                        \nThis video series blends small business and tech to highlight dramatic stories of entrepreneurs and the innovative new practices they are implementing to drive the American economy forward."
			  ],
			  [
			   "http://money.cnn.com/2014/10/12/technology/apple-designer-jony-ive/index.html",
			   "Meet the man behind Apple's products",
			   "See the new Apple Watch in :60 NEW YORK (CNNMoney) Jony Ive has been shaping Apple products for years and is an icon in the design world. But he keeps a pretty low profile, typically staying behind the scenes at Apple's massive Silicon Valley headquarters. \n\nApple's design chief talked about how he works in a recent , offering his thoughts about the late Steve Jobs, the creative process and the planned 2015 release of the company's first wearable device, . His partnership with Jobs: Ive, who became Apple's top designer in 1996, was thinking of quitting in the late 1990s. But Jobs convinced him to stay. The pair \"just clicked,\" Ive told Vogue, and created a new generation of Apple products. \n\n\"When you feel that the way you interpret the world is fairly idiosyncratic, you can feel somewhat ostracized and lonely, and I think that we both perceived the world in the same way.\" \n\nHis design philosophy: Both Jobs and Ive agreed that technology should be approachable -- a philosophy that was "
			  ]
			 ]
			}
		}
		
		//process CNN Test data
		console.log("Cat			Corr	Incorr	Uncat	Others") //this is the header for the ascii table
		
		for (let category in cnnTest) { //iterate through each cnn category (business, health etc)
			
			expectedCat = cnnTest[category]['expectedCat'] //stats containers
			//console.log('processing cat: ' + expectedCat)
			
			//stats only using url+title
			correct_title = 0
			incorrect_title = 0
			uncategorized_title = 0
			incorrect_counts_title = {}
			
			//stats using url+title+text
			correct_both = 0
			incorrect_both = 0
			uncategorized_both = 0
			incorrect_counts_both = {}
			
			for (let visitGroup of cnnTest[category]['visits']) { //iterate through each visit in the category
				url = visitGroup[0]
				title = visitGroup[1]
				text = visitGroup[2]
				
				//process url+title matches
				title_decision = c.classify(url, title)
				top_level = title_decision[0]
				//console.log('url+title got: ' + top_level)
				
				if (top_level == expectedCat) { //if correct
					correct_title += 1
				}else{
					if (top_level == 'uncategorized') { // if uncategorized
						uncategorized_title += 1
					}else{
						incorrect_title += 1 //if incorrect
						if (incorrect_counts_title.hasOwnProperty(top_level) == false) { //need stats about incorrect items
							incorrect_counts_title[top_level] = 1
						}else{
							incorrect_counts_title[top_level] += 1
						}
					}
				}
				
				//now process url+title+text
				both_decision = c.classify(url, title+" "+text)
				top_level = both_decision[0]
				//console.log('url+title+text got: ' + top_level)
				
				if (top_level == expectedCat) { //if correct
					correct_both += 1
				}else{
					if (top_level == 'uncategorized') { // if uncategorized
						uncategorized_both += 1
					}else{
						incorrect_both += 1 //if incorrect
						if (incorrect_counts_both.hasOwnProperty(top_level) == false) { //need stats about incorrect items
							incorrect_counts_both[top_level] = 1
						}else{
							incorrect_counts_both[top_level] += 1
						}
					}
				}
				
			}
			
			//now convert both incorrect counters to a list sorted descending
			incorrect_list_title = []; for (let k of Object.keys(incorrect_counts_title)) {incorrect_list_title.push([k, incorrect_counts_title[k]])}
			incorrect_list_title = incorrect_list_title.sort(sortDescBy2ndElem) //sort
			
			incorrect_list_both = []; for (let k of Object.keys(incorrect_counts_both)) {incorrect_list_both.push([k, incorrect_counts_both[k]])}
			incorrect_list_both = incorrect_list_both.sort(sortDescBy2ndElem) //sort
			
			//now output some stats
			console.log('(title+url)')
			console.log(expectedCat+(Array(25-expectedCat.length).join(" "))+ correct_title +"\t"+ incorrect_title +"\t"+ uncategorized_title +"\t"+ incorrect_list_title)
			console.log('(title+url+text)')
			console.log(expectedCat+(Array(25-expectedCat.length).join(" "))+ correct_both +"\t"+ incorrect_both +"\t"+ uncategorized_both +"\t"+ incorrect_list_both)
		}	
		
	};
	Task.spawn(function*() {
		console.log("Debugging LWCA...")
		c = new LWCAClassifier(worker, callback);
		yield c.init();
	});
}
