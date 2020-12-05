import { Jack } from "../lib/lumber";

const neededFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

export function _4() {
  function prep(data: string) {
    return data.split(/\n\n/);
  }

  function run(passports: string[]) {
    let invalidPassportCount = 0;
    for (const passport of passports) {
      if (!neededFields.every((field) => passport.includes(field + ":"))) {
        invalidPassportCount++;
			}
    }

    return [passports.length - invalidPassportCount, "passport(s) are valid"];
  }

  return [prep, run] as const;
}
