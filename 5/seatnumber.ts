export function _5() {
  function prep(data: string) {
    const splitData = data.split(/\n/);
    let mapInput: boolean[] = Array(splitData.length);

    for (const value of data.split(/\n/)) {
      if (value.trim()) {
        const semiParsed = value.replace(/b|r/gi, "1").replace(/f|l/gi, "0");
        mapInput[parseInt(semiParsed, 2)] = true;
      }
    }

    return mapInput;
  }

  function run(entries: boolean[]) {
    let highestSeatId = entries.length - 1;
    let mySeat = -1;
    let begin = false;

    for (let i = 0; i < entries.length; i++) {
      if (!begin) {
        if (entries[i]) {
          begin = true;
        }
      } else {
        if (!entries[i]) {
          mySeat = i;
        }
      }
    }

    return [
      "Highest seat ID is",
      highestSeatId,
      "and my seat could be",
      mySeat,
    ];
  }

  return [prep, run] as const;
}
