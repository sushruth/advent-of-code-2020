export function _9() {
  const preambleLength = 25;

  function prep(data: string) {
    return data.split(/\n/);
  }

  function run(entries: string[]) {
    for (let i = preambleLength; i < entries.length; i++) {
      const testNumber = Number(entries[i]);
			let isNumberPreamble = true;
			
      firstNumberLoop: for (let j = i - preambleLength; j < i; j++) {
				const firstNumber = Number(entries[j]);
				
        for (let k = i - preambleLength; k < i; k++) {
					const secondNumber = Number(entries[k]);
					
          if (j !== k) {
            if (testNumber === firstNumber + secondNumber) {
              isNumberPreamble = false;
              break firstNumberLoop;
            }
          }
        }
      }

      if (isNumberPreamble) {
        const partTwo = [];

        weaknessLoop: for (let l = 0; l < i; l++) {
          let acc = 0;
          let smallest = Infinity;
          let largest = 0;

          subLoop: for (let m = l; m < i; m++) {
            const currentNumber = Number(entries[m]);
            acc += currentNumber;

            if (smallest > currentNumber) smallest = currentNumber;
            if (largest < currentNumber) largest = currentNumber;

            if (acc === testNumber) {
              partTwo.push("The encryption weakness is", smallest + largest);
              break weaknessLoop;
            } else if (acc > testNumber) {
              // No use carrying forward
              break subLoop;
            }
          }
        }

        return [
          "The sequence starting from line",
          i,
          "with",
          testNumber,
          "might be the preamble.",
          ...partTwo,
        ];
      }
    }
  }

  return [prep, run] as const;
}
