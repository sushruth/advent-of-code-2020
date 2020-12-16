export default function _10() {
  function prep(data: string) {
    let entries: boolean[] = [];
    for (const line of data.split(/\n/)) {
      if (line) {
        entries[Number(line)] = true;
      }
    }
    return entries;
  }

  function run(entries: boolean[]) {
    let countThree = 1; // always last count is 3
    let countOne = 0;
    const waysToGetHere = [];
    let prevRatings: number[] = [0].concat(Array(3).fill(-Infinity));

    for (const [rating, entry] of entries.entries()) {
      if (entry) {
        const diff = rating - prevRatings[0];
        if (diff === 1) {
          countOne++;
        } else if (diff === 3) {
          countThree++;
        }

        for (const prevRating of prevRatings) {
          if (rating - prevRating <= 3) {
            waysToGetHere[rating] =
              (waysToGetHere[rating] || 0) + (waysToGetHere[prevRating] || 1);
          }
        }

        let ratingCount = prevRatings.length - 1;
        while (ratingCount) {
          prevRatings[ratingCount] = prevRatings[ratingCount - 1];
          ratingCount--;
        }

        prevRatings[0] = rating;
      }
    }

    return [
      "The result is",
      countThree * countOne,
      "with",
      waysToGetHere[waysToGetHere.length - 1],
      "ways",
    ];
  }

  return [prep, run] as const;
}
