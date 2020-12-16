import { dim } from "colorette";
import { readFileSync } from "fs";
import { resolve } from "path";
import { performance, PerformanceObserver } from "perf_hooks";
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

void (async function () {
  switch (/[1-9_]*/.test(dayDirName)) {
    case true:
      return runWithTimer(
        (await import(resolve(__dirname, "./" + dayDirName))).default
      );
    default:
      return console.log(`No cases for ${dayAndPart}`);
  }
})();
