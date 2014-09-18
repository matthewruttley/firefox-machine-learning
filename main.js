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

const {LWCAClassifier} = require("lwca_refined");

console.log("Running")

exports.main = function(options, callbacks){
  console.log("Debugging LWCA...")
  c = new LWCAClassifier()
  visits = [
			  ["http://www.ma-shops.com/", "MA Coin stores with 500.000 Coins - Medals - German Coins - Ancient Coins, World Coins Coins Mall"],
			  ["http://www.trulia.com/", "Real Estate, Homes for Sale, Apartments for Rent, Local data - Trulia"],
			  ["http://www.reddit.com/r/conspiracy/comments/2fpq0y/israeli_snipers_shoot_children_playing_on_rooftop/", "Israeli snipers shoot children playing on rooftop in Gaza : conspiracy"],
			  ["http://charlitoscocina.com/", "Charlito's Cocina | Scratch Cooking & Charcuterie"],
			  ["http://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords=latent%20dirichlet%20allocation&sprefix=latent+dirich%2Caps&rh=i%3Aaps%2Ck%3Alatent%20dirichlet%20allocation", "Amazon.com: latent dirichlet allocation"],
			  
			  //some NYT articles from Kevin
			  ['http://www.nytimes.com/2014/09/17/technology/personaltech/review-and-video-with-new-iphone-6-and-6-plus-its-whats-inside-that-counts.html', 'Review and Video: iOS 8 Software Stands Out in New, Bigger iPhones - NYTimes.com'],
			  ['http://www.nytimes.com/interactive/2014/09/16/world/middleeast/how-isis-works.html', 'How ISIS Works - NYTimes.com'],
			  ['http://www.nytimes.com/2014/09/16/arts/television/after-17-years-the-view-isnt-so-clear-anymore.html', 'After 17 Years, \u2018The View\u2019 Isn\u2019t So Clear Anymore - NYTimes.com'],
			  ['http://www.nytimes.com/2014/09/21/magazine/will-portland-always-be-a-retirement-community-for-the-young.html', 'Will Portland Always Be a Retirement Community for the Young? - NYTimes.com'],
			  ['http://www.nytimes.com/2014/09/17/arts/macarthur-awards-go-to-21-diverse-fellows.html', 'Alison Bechdel, Terrance Hayes Among \u2018Genius Grant\u2019 Winners - NYTimes.com'],
			  ['http://www.nytimes.com/2014/09/17/opinion/thomas-friedman-isis-and-the-arab-world.html', 'ISIS and the Arab World - NYTimes.com'],
			  ['http://www.nytimes.com/2014/09/17/world/middleeast/isis-airstrikes-united-states-coalition.html', 'U.S. General Open to Ground Forces in Fight Against ISIS in Iraq - NYTimes.com'],
			  ['http://www.nytimes.com/interactive/2014/09/16/us/politics/gop-gains-strength-and-obama-gets-low-marks-poll-finds.html', 'G.O.P. Gains Strength and Obama Gets Low Marks, Poll Finds - NYTimes.com'],
			  ['http://well.blogs.nytimes.com/2014/09/17/sit-less-live-longer/', 'Sit Less, Live Longer? - NYTimes.com'],
			  ['http://www.nytimes.com/2014/09/17/world/europe/buckingham-palace-dancing-guard-throws-decorum-to-the-wind.html', 'At Buckingham Palace, a Dancing Guard Throws Decorum to the Wind - NYTimes.com'],
			  ['http://well.blogs.nytimes.com/2014/09/15/heel-pain-treatment/', 'Ask Well: Plantar Fasciitis Relief - NYTimes.com'],
			  ['http://www.nytimes.com/2014/09/17/opinion/frank-bruni-obama-beyond-bush.html', 'Obama Beyond Bush - NYTimes.com'],
			  ['http://www.nytimes.com/2014/09/17/opinion/israels-nsa-scandal.html', 'Israel&#8217;s N.S.A. Scandal - NYTimes.com'],
			  ['http://www.nytimes.com/2014/09/17/us/politics/kentucky-elections-obama-health-care-act.html', 'In Kentucky, Health Law Helps Voters but Saps Votes - NYTimes.com'],
			  ['http://www.nytimes.com/2014/09/17/sports/football/minnesota-governor-says-adrian-peterson-should-be-suspended.html', 'Governor and Sponsors Voice Concerns With N.F.L. - NYTimes.com'],
			  ['http://www.nytimes.com/2014/09/17/opinion/is-us-policy-on-fighting-isis-already-changing.html', 'Is U.S. Policy on Fighting ISIS Already Changing? - NYTimes.com'],
			  ['http://www.nytimes.com/2014/09/17/world/europe/scotland-referendum.html', 'London Repeats Offer of New Powers if Scotland Votes No - NYTimes.com'],
			  ['http://www.nytimes.com/2014/09/17/world/middleeast/isis-issues-video-riposte-to-obama.html', 'Islamic State Issues Video Challenge to Obama - NYTimes.com'],
			  ['http://www.nytimes.com/2014/09/17/books/martin-amiss-zone-of-interest-makes-european-publishers-squirm.html', 'Martin Amis\u2019s \u2018Zone of Interest\u2019 Makes European Publishers Squirm - NYTimes.com']
			
			]
  for (let visit of visits) {
	console.log("\n\nthe title: " + visit[1])
	console.log("is classified as: " + c.classify(visit[0], visit[1]))
  }
}