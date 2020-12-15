import { waypoint } from "./waypoint";

type Entry = string;

export function _12_1() {
  const opposite = {
    N: "S",
    E: "W",
    S: "N",
    W: "E",
  };

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
    const total = {
      N: 0,
      E: 0,
    };

    for (let [action, ...count] of entries) {
      const value = Number(count.join(""));

      if (action === "F") {
        total.E += value * waypoint.E;
        total.N += value * waypoint.N;
        continue;
      }

      switch (action) {
        case "N":
        case "E":
          waypoint[action] += value;
          break;
        case "W":
        case "S":
          waypoint[opposite[action]] -= value;
          break;
        case "R":
        case "L":
          waypoint.rotate[action][value]();
          break;
      }
    }

    const totalManhattan = Math.abs(total.N) + Math.abs(total.E);

    return [
      "N",
      total.N,
      "E",
      total.E,
      "So the manhattan distance is",
      totalManhattan,
    ];
  }

  return [prep, run] as const;
}
