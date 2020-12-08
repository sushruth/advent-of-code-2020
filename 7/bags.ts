export function _7() {
  function prep(data: string) {
    let parentToChildren = new Map<string, Map<string, string>>();
    let childToParent = new Map<string, Set<string>>();

    for (const [, parentBagType, contains] of data.matchAll(
      /([\w ]+) bags contain (.*?)\./g
    )) {
      let parentContains = [];
      for (const [, count, childBagType] of contains.matchAll(
        /(\d+) ([\w ]+) bags*/g
      )) {
        childToParent.set(
          childBagType,
          (childToParent.get(childBagType) ?? new Set()).add(parentBagType)
        );
        parentContains.push([childBagType, count]);
      }
      parentToChildren.set(parentBagType, new Map(parentContains));
    }

    return { parentToChildren, childToParent };
  }

  function run({ parentToChildren, childToParent }: ReturnType<typeof prep>) {
    const toFind = "shiny gold";

    const tree = new Set();

    function walk(bagType: string) {
      const parents = childToParent.get(bagType) ?? new Set();
      if (parents.size) {
        const children = parents.values();
        for (const child of children) {
          tree.add(child);
          walk(child);
        }
      }
    }

    let count = 0;

    function moonWalk(bagType: string, factor: number) {
      const children =
        parentToChildren.get(bagType) ?? new Map<string, string>();
      if (children.size) {
        const childrenNames = children.keys();
        for (const name of childrenNames) {
          const childCount = Number(children.get(name));
          count += factor * childCount;
          moonWalk(name, childCount * factor);
        }
      }
    }

    walk(toFind);
    moonWalk(toFind, 1);

    return [
      tree.size,
      "bag colors can eventually contain",
      toFind,
      "and it can contain",
      count,
      "bags in it",
    ];
  }

  return [prep, run] as const;
}
