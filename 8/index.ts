export default function _8() {
  function prep(data: string) {
    return data.split(/\n/);
  }

  function run(entries: string[]) {
    function boot(morphLineNumber?: number) {
      let acc = 0;
      let lineNumber = 1;
      let infiniteLoopExists = false;
      let track: boolean[] = Array(0);
      let jumpsAndNops: number[] = [];

      while (lineNumber !== entries.length) {
        if (track[lineNumber]) {
          infiniteLoopExists = true;
          break;
        } else {
          track[lineNumber] = true;
          const entry = entries[lineNumber - 1];
          const match = entry.match(/^(acc|nop|jmp)\s+([+-]\d+)$/);
          if (match) {
            if (match[1] === "jmp") {
              if (!morphLineNumber) {
                jumpsAndNops.push(lineNumber);
              }
              if (morphLineNumber !== lineNumber) {
                // Not the line to be morphed. do JMP operation
                lineNumber += Number(match[2]) - 1; // extra -1 because there is ++ later
              }
            } else if (match[1] === "acc") {
              acc += Number(match[2]);
            } else if (match[1] === "nop") {
              if (!morphLineNumber) {
                jumpsAndNops.push(lineNumber);
              }
              if (morphLineNumber === lineNumber) {
								// This is the line to be morphed. do JMP operation instead of NOP
                lineNumber += Number(match[2]) - 1; // Do the jump operation instead
              }
            }
          }
          lineNumber++;
        }
      }
      return {
        infiniteLoopExists,
        lineNumber,
        acc,
        track,
        jumpsAndNops,
      };
    }

    const { infiniteLoopExists, lineNumber, acc, jumpsAndNops } = boot();

    if (infiniteLoopExists) {
      let solution = -1;
      let solutionSwitchLineNumber = -1;

      for (const lineNumber of jumpsAndNops) {
        const {
          infiniteLoopExists: infiniteLoopExistsForSolution,
          acc: accSolution,
        } = boot(lineNumber);

        if (!infiniteLoopExistsForSolution) {
          solutionSwitchLineNumber = lineNumber;
          solution = accSolution;
          break;
        }
      }

      return [
        "Possible repeating line at",
        lineNumber,
        ". Accumulator value before that is",
        acc,
        ...(solution === -1
          ? []
          : [
              ". If we switch JMP to NOP in line",
              solutionSwitchLineNumber,
              ", infinite loop goes awaya nd the accumulator will be",
              solution,
            ]),
      ];
    }

    return ["No infinite loops. Accumulator is at", acc];
  }

  return [prep, run] as const;
}
