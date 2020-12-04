const slopes = [
  {
    x: 1,
    y: 1,
  },
  {
    x: 3,
    y: 1,
  },
  {
    x: 5,
    y: 1,
  },
  {
    x: 7,
    y: 1,
  },
  {
    x: 1,
    y: 2,
  },
];

export function _3_1() {
  function prep(data: string) {
    return data.split(/\n|\r/g);
  }

  function run(entries: string[]) {
    const counts: number[] = [];
    const width = entries[0].length;

    for (let i = 0; i < slopes.length; i++) {
      const slope = slopes[i];

      let count = 0;

      let x_index = 0;
      let y_index = 0;

      while (y_index < entries.length) {
        if (entries[y_index][x_index] === "#") {
          count++;
        }

        x_index += slope.x;
        y_index += slope.y;

        if (x_index >= width) {
          x_index -= width;
        }
      }

      counts.push(count);
    }

    return [
      "Found",
      ...counts,
      "trees for the (x:y) slopes",
      ...slopes.map(({ x, y }) => x + ":" + y),
      "respectively. So, the product is",
      counts.reduce((a, v) => v * a, 1),
    ];
  }

  return [prep, run] as const;
}
