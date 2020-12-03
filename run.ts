import { performance, PerformanceObserver } from "perf_hooks";
import { _1 } from "./1/productsum";

const what = process.argv.find((v) => v.match(/^\d+$/));

const perfObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(entry.name, entry.duration, 'ms'); // fake call to our custom logging solution
  });
});

perfObserver.observe({ entryTypes: ["measure"] });

function runWithTimer(fn: () => unknown) {
  performance.mark("start");
  fn();
  performance.mark("end");
  performance.measure("Finished in", "start", "end");
}

void (function () {
  switch (what) {
    case "1":
      return runWithTimer(_1);
  }
})();
