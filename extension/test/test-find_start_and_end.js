const {Cc, Ci, Cu, ChromeWorker} = require("chrome");
Cu.import("resource://gre/modules/Task.jsm");

const test = require("sdk/test");
const {ComponentDatabase, LWCAClassifier} = require("lwca_refined");

exports["test timestamps"] =
function test_timestamps(assert, done) {
  let cdb = new ComponentDatabase();
  Task.spawn(function*() {
    let classifier = new LWCAClassifier();
    classifier.init().then(() => {
      Task.spawn(function*() {
        let ts = yield cdb.find_start_and_end();
        dump("Start and end timestamps: " + JSON.stringify(ts));
        assert.ok(ts.start <= ts.end, "test that the start time is before the end time");
        done();
      });
    });
  });
}

test.run(exports);