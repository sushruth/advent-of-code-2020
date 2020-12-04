import { readFileSync } from "fs";
import { resolve } from "path";
import { performance, PerformanceObserver } from "perf_hooks";
import { _1 } from "./1/productsum";
import { _1_1 } from "./1_1/productsum";
import { _2 } from "./2/failedpasswords";
import { _2_1 } from "./2_1/failedpasswords";
import { _3 } from "./3/treecount";
import { Jack } from "./lib/lumber";
import { Runner } from "./lib/types";

const dayAndPart = process.argv.find((v) => v.match(/^[\d.]+$/));
const dayDirName = dayAndPart.replace(".", "_");

const perfObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(entry.name, entry.duration, "ms"); // fake call to our custom logging solution
  });
});

perfObserver.observe({ entryTypes: ["measure"] });

function runWithTimer<T>(fn: () => Runner<T>) {
  const [prep, run] = fn();

  performance.mark("fileread");
  const data = readFileSync(
    resolve(__dirname, dayDirName, "./input.txt"),
    "utf8"
  );

  performance.mark("prep");
  const preparedData = prep(data);

  performance.mark("start");
  const result = run(preparedData);

  performance.mark("end");
  Jack.log(...result.concat("\n"));

  performance.measure("Data read in", "fileread", "prep");
  performance.measure("Data prepared in", "prep", "start");
  performance.measure("Run in", "start", "end");
  performance.measure("Completed in", "fileread", "end");
}

void (function () {
  switch (dayDirName) {
    case "1":
      return runWithTimer(_1);
    case "1_1":
      return runWithTimer(_1_1);
    case "2":
      return runWithTimer(_2);
    case "2_1":
			return runWithTimer(_2_1);
		case "3":
			return runWithTimer(_3);
    default:
      return console.log(`No cases for ${dayAndPart}`);
  }
})();
