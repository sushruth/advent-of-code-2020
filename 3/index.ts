const slope = {
  x: 3,
  y: 1,
};

export default function _3() {
  function prep(data: string) {
    return data.split(/\n|\r/g);
  }

  function run(entries: string[]) {
    let count = 0;

    let x_index = 0;
    let y_index = 0;

    while (y_index < entries.length) {
      if (entries[y_index][x_index] === "#") {
        count++;
      }

      x_index += slope.x; // right 3
      y_index += slope.y; // down 1

      if (x_index >= entries[0].length) {
        x_index -= entries[0].length;
      }
    }

    return ["Found", count, "trees on the way"];
  }

  return [prep, run] as const;
}
