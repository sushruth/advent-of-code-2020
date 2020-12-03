import { readFileSync } from "fs";
import { resolve } from "path";

const total = 2020;
const numbers = readFileSync(resolve(__dirname + "/input.txt"), "utf8")
  .split("\n")
  .map((v) => Number(v));

export function _1() {
  for (let i = 0; i < numbers.length; i++) {
		const num = numbers[i]
    const diff = Math.abs(total - num);
    if (numbers.includes(diff, i)) {
      return console.log(
        `\n\t- ${num} + ${diff} = ${total}, so ${num} ✖ ${diff} = ${
          num * diff
        } is one answer\n`
      );
    }
  }
}
