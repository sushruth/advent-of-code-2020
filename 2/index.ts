import { green, red } from "colorette";

type Entry = {
  alphabet: string;
  min: number;
  max: number;
  password: string;
};

export default function _2() {
  function prep(data: string) {
    const result: Entry[] = [];

    for (const line of data.matchAll(/(\d+)-(\d+) ([a-z]): ([a-z]*?)\n/g)) {
      result.push({
        min: Number(line[1]),
        max: Number(line[2]),
        alphabet: line[3],
        password: line[4],
      });
    }

    return result;
  }

  function run(entries: Entry[]) {
    const badPasswords: {
      entry: Entry;
      condition: "low" | "high" | "none";
      count: number;
    }[] = [];

    for (const entry of entries) {
      const { min, max, alphabet, password } = entry;
      const matches = password.match(new RegExp(alphabet, "g"));
      if (matches) {
        if (matches.length < min) {
          badPasswords.push({
            entry,
            condition: "low",
            count: Math.abs(matches.length - min),
          });
        } else if (matches.length > max) {
          badPasswords.push({
            entry,
            condition: "high",
            count: Math.abs(matches.length - max),
          });
        }
      } else {
        badPasswords.push({ entry, condition: "none", count: 0 });
      }
    }

    return [
      green(`${entries.length - badPasswords.length} good passwords`),
      "and",
      red(`${badPasswords.length} bad passwords`),
    ];
  }

  return [prep, run] as const;
}
