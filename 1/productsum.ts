import { readFileSync } from "fs";
import { resolve } from "path";

const total = 2020;
const expenses = readFileSync(resolve(__dirname, "./input.txt"), "utf8")
  .split("\n")
  .map((v) => Number(v));

export function _1() {
  function prep(data: string) {
    return data
      .split(/\n|\r/g)
      .map((v) => v && Number(v))
      .filter(Boolean);
  }

  function run(expenses: number[]) {
    for (let i = 0; i < expenses.length; i++) {
      const expense = expenses[i];
      const balance = Math.abs(total - expense);
      if (expenses.includes(balance, i)) {
        return [
          `${expense} + ${balance} = ${total}, so ${expense} ✖ ${balance} = `,
          expense * balance,
          `is one answer`,
        ];
      }
    }
  }

  return [prep, run] as const;
}
