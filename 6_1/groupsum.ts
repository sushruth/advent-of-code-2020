export function _6_1() {
  function prep(data: string) {
    return data;
  }

  function run(entries: string) {
    let record: Map<string, number> = new Map();
    let groupSize = 0;
    let count = 0;
    let newlines = 0;

    for (let alphabet of `${entries}\n\n`) {
      if (alphabet === "\n") {
        if (++newlines === 2) {
          for (const value of record.values()) {
            if (value === groupSize) {
              count++;
            }
          }
          newlines = 0;
          groupSize = 0;
          record = new Map();
        } else {
          groupSize++;
        }
      } else {
        newlines = 0;
        record.set(alphabet, (record.get(alphabet) ?? 0) + 1);
      }
    }

    return ["Counts should be", count];
  }

  return [prep, run] as const;
}
