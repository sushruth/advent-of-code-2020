import { green, red } from "colorette";

type Entry = {
  alphabet: string;
  min: number;
  max: number;
  password: string;
};

export function _2_1() {
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
      condition: "low" | "high";
    }[] = [];

    for (const entry of entries) {
      const { min, max, alphabet, password } = entry;
      const matches = `${password[min - 1]}${password[max - 1]}`.match(
        new RegExp(alphabet, "g")
      );

      if (matches) {
        if (matches.length > 1) {
          badPasswords.push({
            entry,
            condition: "high",
          });
        }
      } else {
        badPasswords.push({ entry, condition: "low" });
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
