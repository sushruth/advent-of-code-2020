export function _3() {
  function prep(data: string) {
    return data.split(/\n|\r/g);
  }

  function run(entries: string[]) {
    let count = 0;

		let x_index = 0;
		let y_index = 0;
		
		while(y_index < entries.length) {
			if(entries[y_index][x_index] === '#') {
				count++;
			}

			x_index += 3; // right 3
			y_index += 1; // down 1

			if(x_index >= entries[0].length) {
				x_index -= entries[0].length
			}
		}

    return ["Found", count, "trees on the way"];
  }

  return [prep, run] as const;
}
