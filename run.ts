import { dim } from "colorette";
import { readFileSync } from "fs";
import { resolve } from "path";
import { performance, PerformanceObserver } from "perf_hooks";
import { _1 } from "./1/productsum";
import { _1_1 } from "./1_1/productsum";
import { _2 } from "./2/failedpasswords";
import { _2_1 } from "./2_1/failedpasswords";
import { _3 } from "./3/treecount";
import { _3_1 } from "./3_1/treecount";
import { _4 } from "./4/passportvalidator";
import { _4_1 } from "./4_1/passportvalidator";
import { _5 } from "./5/seatnumber";
import { _6 } from "./6/groupsum";
import { _6_1 } from "./6_1/groupsum";
import { _7 } from "./7/bags";
import { _8 } from "./8/loop";
import { _9 } from "./9/xmas";
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
  const beforeMemory = process.memoryUsage();
  const data = readFileSync(
    resolve(__dirname, dayDirName, "./input.txt"),
    "utf8"
  );

  performance.mark("prep");
  const preparedData = prep(data);

  performance.mark("start");
  const result = run(preparedData);
  const afterMemory = process.memoryUsage();

  performance.mark("end");
  Jack.log(...result.concat("\n"));

  performance.measure("Data read in", "fileread", "prep");
  performance.measure("Data prepared in", "prep", "start");
  performance.measure("Run in", "start", "end");
  performance.measure("Completed in", "fileread", "end");

  console.info(
    dim(
      `Possible memory usage: ${
        Math.round(
          ((afterMemory.heapUsed - beforeMemory.heapUsed) / 1024 / 1024) * 100
        ) / 100
      }MB`
    )
  );
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
    case "3_1":
      return runWithTimer(_3_1);
    case "4":
      return runWithTimer(_4);
    case "4_1":
      return runWithTimer(_4_1);
    case "5":
      return runWithTimer(_5);
    case "6":
      return runWithTimer(_6);
    case "6_1":
      return runWithTimer(_6_1);
    case "7":
      return runWithTimer(_7);
    case "8":
      return runWithTimer(_8);
    case "9":
      return runWithTimer(_9);
    default:
      return console.log(`No cases for ${dayAndPart}`);
  }
})();
