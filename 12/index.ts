type DirInfo<T = string> = {
  N: T;
  E: T;
  S: T;
  W: T;
};

type Actions = keyof DirInfo;

type Angles = 90 | 180 | 270;

type Entry = string;

export default function _12() {
  const R: DirInfo<Record<Angles, Actions>> = {
    N: { 90: "E", 180: "S", 270: "W" },
    E: { 90: "S", 180: "W", 270: "N" },
    S: { 90: "W", 180: "N", 270: "E" },
    W: { 90: "N", 180: "E", 270: "S" },
  };

  const L: DirInfo<Record<Angles, Actions>> = {
    E: { 90: "N", 180: "W", 270: "S" },
    N: { 90: "W", 180: "S", 270: "E" },
    S: { 90: "E", 180: "N", 270: "W" },
    W: { 90: "S", 180: "E", 270: "N" },
  };

  const turn = { L, R };

  function prep(data: string) {
    const entries: Entry[] = [];

    for (const line of data.split(/\n/)) {
      if (line) {
        entries.push(line);
      }
    }

    return entries;
  }

  function run(entries: ReturnType<typeof prep>) {
    const total: DirInfo<number> = {
      N: 0,
      E: 0,
      W: 0,
      S: 0,
    };

    let direction: Actions = "E"; // start with east

    for (let [action, ...count] of entries) {
      const value = Number(count.join(""));

      if (action === "F") action = direction;

      switch (action) {
        case "N":
        case "E":
          total[action] += value;
          break;
        case "W":
        case "S":
          total[R[action][180]] -= value;
          break;
        case "R":
        case "L":
          direction = turn[action][direction][value];
          break;
      }
    }

    const totalNorth = total.N - total.S;
    const totalEast = total.E - total.W;
    const totalManhattan = Math.abs(totalNorth) + Math.abs(totalEast);

    return [
      "N",
      totalNorth,
      "E",
      totalEast,
      ". So the manhattan distance is",
      totalManhattan,
    ];
  }

  return [prep, run] as const;
}
