import { readFileSync } from "fs";
import { resolve } from "path";

const total = 2020;
const numbers = readFileSync(resolve(__dirname + "/input.txt"), "utf8")
  .split("\n")
  .map((v) => Number(v));

export function _1_1() {
  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];
    const diff = Math.abs(total - num);
    for (let j = i + 1; j < numbers.length; j++) {
      const num_1 = numbers[j];
      if (num_1 < diff) {
        const diff_1 = Math.abs(diff - num_1);
        if (numbers.includes(diff_1, j)) {
          return `${num} + ${num_1} + ${diff_1} = ${total}, so ${num} ✖ ${num_1} ✖ ${diff_1} = ${
            num * num_1 * diff_1
          } is one answer\n`;
        }
      }
    }
  }
}
