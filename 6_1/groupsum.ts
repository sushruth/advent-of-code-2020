export function _6_1() {
  function prep(data: string) {
    return data;
  }

  function run(entries: string) {
    let record: Record<string, number> = {};
    let skip = false;
    let groupSize = 0;
    let count = 0;
    let newlines = 0;

    for (let alphabet of `${entries}\n\n`) {
      if (alphabet === "\n") {
        if (++newlines === 2) {
          const values = Object.values(record);
          for (const value of values) {
						if (value === groupSize) {
							count++;
            }
          }
					newlines = 0;
					groupSize = 0;
          record = {};
        } else {
          groupSize++;
        }
      } else {
        newlines = 0;
        if (!skip) {
          record[alphabet] = (record[alphabet] ?? 0) + 1;
        }
      }
    }

    return ["Counts should be", count];
  }

  return [prep, run] as const;
}
