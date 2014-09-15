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
			  ["http://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords=latent%20dirichlet%20allocation&sprefix=latent+dirich%2Caps&rh=i%3Aaps%2Ck%3Alatent%20dirichlet%20allocation", "Amazon.com: latent dirichlet allocation"]
			]
  for (let visit of visits) {
	console.log("\n\nthe title: " + visit[1])
	console.log("is classified as: " + c.classify(visit[0], visit[1]))
  }
}