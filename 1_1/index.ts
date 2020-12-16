const total = 2020;

export default function _1_1() {
  function prep(data: string) {
    return data
      .split(/\n|\r/g)
      .map((v) => v && Number(v))
      .filter(Boolean);
  }

  function run(expenses: number[]) {
    for (let i = 0; i < expenses.length; i++) {
      const expense = expenses[i];
      const initialBalance = Math.abs(total - expense);
      for (let j = i + 1; j < expenses.length; j++) {
        const anotherExpense = expenses[j];
        if (anotherExpense < initialBalance) {
          const finalBalance = Math.abs(initialBalance - anotherExpense);
          if (expenses.includes(finalBalance, j)) {
            return [
              `${expense} + ${anotherExpense} + ${finalBalance} = ${total}, so ${expense} ✖ ${anotherExpense} ✖ ${finalBalance} =`,
              expense * anotherExpense * finalBalance,
              `is one answer`,
            ];
          }
        }
      }
    }
  }

  return [prep, run] as const;
}
