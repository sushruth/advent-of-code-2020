import { DiagnosticCategory, findAncestor } from "typescript";

export function _11_1() {
  function prep(data: string) {
    return data.split(/\n/);
  }
  function run(entries: string[]) {
    let stateChanged = true;
    let count = 0;
    const maxSquareSize = Math.max(entries[0].length, entries.length);

    while (stateChanged) {
      count++;
      stateChanged = false;
      const resultEntries = entries.slice();

      for (let row = 0; row < entries.length; row++) {
        if (!entries[row]) continue; // handle empty line

        for (let col = 0; col < entries[0].length; col++) {
          const seat = entries[row][col];
          if (seat === ".") continue; // handle ground

          let occupiedCount = 0;
          let squareSize = 0;
          let foundNeighbors = ["", "", "", "", "", "", "", ""];
          let neighborsFoundCount = 0;

          neighborLoop: while (squareSize < maxSquareSize) {
            squareSize++;

            const rowDiff = row - squareSize;
            const colDiff = col - squareSize;
            const rowAdd = row + squareSize;
            const colAdd = col + squareSize;

            const neighbors = [
              !foundNeighbors[0] ? entries[rowDiff]?.[colDiff] : "-",
              !foundNeighbors[1] ? entries[rowDiff]?.[col] : "-",
              !foundNeighbors[2] ? entries[rowDiff]?.[colAdd] : "-",
              !foundNeighbors[3] ? entries[row]?.[colDiff] : "-",
              !foundNeighbors[4] ? entries[row]?.[colAdd] : "-",
              !foundNeighbors[5] ? entries[rowAdd]?.[colDiff] : "-",
              !foundNeighbors[6] ? entries[rowAdd]?.[col] : "-",
              !foundNeighbors[7] ? entries[rowAdd]?.[colAdd] : "-",
            ];

            for (let n = 0; n < neighbors.length; n++) {
              if (!neighbors[n]) {
								// Out of bounds
                foundNeighbors[n] = "-";
                neighborsFoundCount++;
              }

              if (!foundNeighbors[n] && neighbors[n] !== ".") {
                foundNeighbors[n] = neighbors[n];
                neighborsFoundCount++;
              }

              if (neighborsFoundCount === 8) {
                break neighborLoop;
              }
            }
          }

          for (const neighbor of foundNeighbors) {
            if (neighbor === "#") {
							occupiedCount++;
							
							if (seat === "#" && occupiedCount >= 5) {
								resultEntries[row] = setCharAt(resultEntries[row], col, "L"); // empty the seat
								stateChanged = true;
								break;
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
