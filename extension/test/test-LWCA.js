const {Cc, Ci, Cu, ChromeWorker} = require("chrome");
Cu.import("resource://gre/modules/Task.jsm");
const {data} = require("sdk/self");
const test = require("sdk/test");

const {LWCAClassifier} = require("lwca_refined");
let scriptLoader = Cc["@mozilla.org/moz/jssubscript-loader;1"].getService(Ci.mozIJSSubScriptLoader);
scriptLoader.loadSubScript(data.url("test/cnn_docs.js"));
scriptLoader.loadSubScript(data.url("test/edRules_docs.js"));

let useWhiteList = false;
let whiteList = {
  "sports": true,
};

let useUrlSplitting = false;
let urlSplitPattern = /[\/-]/;

function testVisit(visit, doFulleTest=false) {
  if (!visit || !visit[0] || !visit[1]) return null;
  //console.log("Categorizing: ", visit[0], visit[1]);
  let titleCat, fulltextCat;
  let urlParts = "";
  if (useUrlSplitting) {
    urlParts = visit[0].split(urlSplitPattern).join(" ");
  }
  titleCat = classifier.classify(visit[0], urlParts + visit[1]);
  if (doFulleTest) {
    fulltextCat = classifier.classify(visit[0], urlParts + visit[1] + " " + visit[2]);
  }
  return [titleCat, fulltextCat];
}

function testVisits(visits, ftLen=20) {
   let titleResults = {};
   let fullTextResults = {};
   let fullTextCount = 0;
   let len = visits.length;
   for (let visit of visits) {
    let results = testVisit(visit, fullTextCount < ftLen);
    if (results) {
      titleResults[results[0]] = (titleResults[results[0]] || 0) + 1;
      if (fullTextCount < ftLen) {
        fullTextResults[results[1]] = (fullTextResults[results[1]] || 0) + 1;
        fullTextCount++;
      }
    }
   }
   Object.keys(titleResults).forEach(cat => {
     titleResults[cat] = Math.round(titleResults[cat] * 100 / len);
   });
   Object.keys(fullTextResults).forEach(cat => {
     fullTextResults[cat] = Math.round(fullTextResults[cat] * 100 / ftLen);
   });
   return {title: titleResults, fullText: fullTextResults};
}

function outputCatResults(results, catName, expectedCat) {
  dump("  set category: " + catName);
  if (expectedCat) {
     dump(", mapped to: '" + expectedCat + "', title precision: " +
          (results.title[expectedCat] || 0) + "%" +
          ", fulltext precision: " +
          (results.fullText[expectedCat] || 0) + "%");
  }
  dump("\n");
  let titleOrdered = Object.keys(results.title).sort((a,b) => {return results.title[b] - results.title[a];});
  let fullTextOrdered = Object.keys(results.fullText).sort((a,b) => {return results.fullText[b] - results.fullText[a];});
  dump ("\t  Url+Title\t\t\t  Url+FullText\n");
  while (titleOrdered.length) {
    let tCat = titleOrdered.shift();
    let fCat = fullTextOrdered.shift();
    if (results.title[tCat] <= 0) {
      break;
    }
    dump("\t" + tCat + ":" + results.title[tCat] + "%");
    if (fCat) {
      dump("\t\t\t" + fCat + ":" + results.fullText[fCat] + "%");
    }
    dump("\n");
  }
  dump("\n");
}

function procTestSet(testSet, name, ftLen=20) {
  dump("TEST SET: " + name + "\n");
  Object.keys(testSet).forEach(cat => {
    let obj = testSet[cat];
    if (obj instanceof Array) {
    }
    else {
      if (useWhiteList) {
        if (whiteList[obj.expectedCat]) {
          let results = testVisits(obj.visits, ftLen);
          outputCatResults(results, obj.name, obj.expectedCat);
        }
      }
      else {
       let results = testVisits(obj.visits, ftLen);
       outputCatResults(results, obj.name, obj.expectedCat);
      }
    }
  });
}

let classifier = null;

function initClassifier(callback) {
  dump("Loading LWCA...\n");
  let worker = new ChromeWorker(data.url("lwcaWorker.js"));
  classifier = new LWCAClassifier(worker, callback);
  return classifier.init().then(() => {
    dump("Finished loading LWCA\n");
  });
  return Promise.resolve();
}

exports["test CNN"] =
function test_CNN(assert, done) {
  let callback = function() {
    Task.spawn(function*() {
      procTestSet(cnnTest, "CNN PATH SELECTED DOCS");
      assert.ok(true);
      done();
    });
  };

  Task.spawn(function() {
    try {
      initClassifier(callback);
    } catch (ex) {
      dump(ex + " ERROR");
      done();
    }
  });
}

exports["test EDRULES"] =
function test_EDRULES(assert, done) {
  let callback = function() {
    Task.spawn(function*() {
      procTestSet(edRules, "EDRULES DOCS");
      assert.ok(true);
      done();
    });
  };

  Task.spawn(function() {
    try {
      initClassifier(callback);
    } catch (ex) {
      dump(ex + " ERROR");
      done();
    }
  });
}

exports["test SingleDoc"] =
function test_SingleDoc(assert, done) {
 let testDoc =   [
  "http://edition.cnn.com/2014/10/22/sport/kosuke-kitajima-olympics-breaststroke-swimming/index.html?eref=edition",
  "'Frog King': How I became a legend",
  "CNN's Human to Hero series celebrates inspiration and achievement in sport. Click here for times, videos and features \n\n(CNN) -- Ask anyone from the U.S. to name a famous swimmer and they will probably say Michael Phelps. But put the same question to someone in Japan and the name that trips off the tongue is Kosuke Kitajima.\n\nThe 32-year-old has propelled not only himself but Japanese swimming into the spotlight in the 21st century thanks to a series of remarkable performances on the global stage, smashing records and scooping multiple world and Olympic titles.\n\nHis best days in the pool may be behind him but Kitajima's focus remains forward-looking as he builds on his legacy as arguably the greatest breaststroke exponent of all time.\n\nHis goal is to inspire the next generation of champions from the Far East ahead of Tokyo's 2020 hosting of the world's biggest sporting showpiece by getting them started in the pool.\n\n\"I want children to start swimming and have lots of dreams in swimming"
  ];

  let callback = function() {
    Task.spawn(function*() {
      let results = testVisit(testDoc, true);
      dump(testDoc[1] + " => " + "title: " + results[0] + ", fulltext: " + results[1]);
      assert.ok(true);
      done();
    });
  };

  Task.spawn(function() {
    initClassifier(callback);
  });
}

test.run(exports);
