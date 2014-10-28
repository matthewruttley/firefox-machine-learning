const {Cc, Ci, Cu, ChromeWorker} = require("chrome");
Cu.import("resource://gre/modules/Task.jsm");

const {data} = require("sdk/self");
const test = require("sdk/test");
const {ComponentDatabase, LWCAClassifier} = require("lwca_refined");

exports["test timestamps"] =
function test_timestamps(assert, done) {
  let worker = new ChromeWorker(data.url("lwcaWorker.js"));
  let callback = function() {
    Task.spawn(function*() {
      let cdb = new ComponentDatabase(worker, callback);
      let ts = yield cdb.find_start_and_end();
      dump("Start and end timestamps: " + JSON.stringify(ts) + "\n");
      assert.ok(ts.start <= ts.end, "test that the start time is before the end time");
      done();
    });
  };

  Task.spawn(function*() {
    let classifier = new LWCAClassifier(worker, callback);
    classifier.init();
  });
}

test.run(exports);