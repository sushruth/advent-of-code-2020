const neededFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"] as const;

function rangeMatcher(min: number, max: number) {
  return (value: string) => {
    if (/^\d\d\d\d$/.test(value)) {
      const year = Number(value);
      return year >= min && year <= max;
    }
    return false;
  };
}

const fieldDetectors: Record<typeof neededFields[number], RegExp> = {
  byr: /byr:(.*?)\s+/,
  eyr: /eyr:(.*?)\s+/,
  iyr: /iyr:(.*?)\s+/,
  ecl: /ecl:(.*?)\s+/,
  hcl: /hcl:(.*?)\s+/,
  pid: /pid:(.*?)\s+/,
  hgt: /hgt:(.*?)\s+/,
};

const fieldValidators: Record<
  typeof neededFields[number],
  (value: string) => boolean
> = {
  byr: rangeMatcher(1920, 2002), // age-ist birth year
  eyr: rangeMatcher(2020, 2030), // Expiration year
  iyr: rangeMatcher(2010, 2020), // Issue year
  ecl: (value) => /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(value), // eye color
  hcl: (value) => /^#[0-9a-f]{6}$/.test(value), // hair color
  pid: (value) => /^[\d]{9}$/.test(value), // passport ID
  hgt: (value) => {
    if (/^\d+(cm|in)$/.test(value)) {
      const height = Number(value.replace(/cm|in/, ""));
      if (value.endsWith("cm")) {
        return height >= 150 && height <= 193; // height-ist height in cm
      } else {
        return height >= 59 && height <= 76; // height-ist height in inches
      }
    }
    return false;
  },
};

export default function _4_1() {
  function prep(data: string) {
    return data.split(/\n\n/);
  }

  function run(passports: string[]) {
    let invalidPassportCount = 0;
    for (const passport of passports) {
      if (
        !neededFields.every((field) => {
          const match = ` ${passport} `.match(fieldDetectors[field]);
          if (!match || !match[1]) return false;
          return fieldValidators[field](match[1]);
        })
      ) {
        invalidPassportCount++;
      }
    }

    return [
      passports.length - invalidPassportCount,
      "passport(s) out of",
      passports.length,
      "are valid",
    ];
  }

  return [prep, run] as const;
}
