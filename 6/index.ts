export default function _6() {
  function prep(data: string) {
    return data;
  }

  function run(entries: string) {
    const set = new Set();
    let count = 0;
    let newlines = 0;

    for (let alphabet of `${entries}\n\n`) {
      if (alphabet === "\n") {
        if (++newlines === 2) {
          newlines = 0;
          count += set.size;
          set.clear();
        }
      } else {
        newlines = 0;
        set.add(alphabet);
      }
    }

    return ["Counts should be", count];
  }

  return [prep, run] as const;
}
