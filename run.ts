import { performance, PerformanceObserver } from "perf_hooks";
import { _1 } from "./1/productsum";
import { _1_1 } from "./1_1/productsum";

const dayAndPart = process.argv.find((v) => v.match(/^[\d.]+$/));

const perfObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(entry.name, entry.duration, "ms"); // fake call to our custom logging solution
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
  switch (dayAndPart.replace(".", "_")) {
    case "1":
      return runWithTimer(_1);
    case "1_1":
      return runWithTimer(_1_1);
    default:
      return console.log(`No cases for ${dayAndPart}`);
  }
})();
