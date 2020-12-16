export default function _11() {
  function prep(data: string) {
    return data.split(/\n/);
  }
  function run(entries: string[]) {
    let stateChanged = true;
    let count = 0;
    while (stateChanged) {
      count++;
      stateChanged = false;
      const resultEntries = entries.slice();

      for (let row = 0; row < entries.length; row++) {
        if (!entries[row]) continue;

        for (let col = 0; col < entries[0].length; col++) {
          const seat = entries[row][col];
          if (seat === ".") continue;

          let occupiedCount = 0;
          const rightLimit = col + 1;
          const bottomLimit = row + 1;

          occupancyLoop: for (let i = row - 1; i <= bottomLimit; i++) {
            for (let j = col - 1; j <= rightLimit; j++) {
              if (!entries[i]?.[j]) continue; // check for non-existent places
              if (i === row && j === col) continue; // skip current seat

              if (entries[i][j] === "#") {
                occupiedCount++;

                // Occupancy check
                if (seat === "#" && occupiedCount >= 4) {
                  resultEntries[row] = setCharAt(resultEntries[row], col, "L"); // empty the seat
                  stateChanged = true;
                  break occupancyLoop;
                }
              }
            }
          }

          if (occupiedCount === 0 && seat === "L") {
            stateChanged = true;
            resultEntries[row] = setCharAt(resultEntries[row], col, "#");
          }
        }
      }
      entries = resultEntries;
    }

    return [
      [...entries.join("").matchAll(/#/g)].length,
      "Occupied seats after",
      count,
      "runs",
    ];
  }
  return [prep, run] as const;
}

function setCharAt(str: string, index: number, chr: string) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}
