import { readFileSync } from "fs";
import { resolve } from "path";

const total = 2020;
const expenses = readFileSync(resolve(__dirname + "/input.txt"), "utf8")
  .split("\n")
  .map((v) => Number(v));

export function _1_1() {
  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i];
    const initialBalance = Math.abs(total - expense);
    for (let j = i + 1; j < expenses.length; j++) {
      const anotherExpense = expenses[j];
      if (anotherExpense < initialBalance) {
        const finalBalance = Math.abs(initialBalance - anotherExpense);
        if (expenses.includes(finalBalance, j)) {
          return `${expense} + ${anotherExpense} + ${finalBalance} = ${total}, so ${expense} ✖ ${anotherExpense} ✖ ${finalBalance} = ${
            expense * anotherExpense * finalBalance
          } is one answer\n`;
        }
      }
    }
  }
}
