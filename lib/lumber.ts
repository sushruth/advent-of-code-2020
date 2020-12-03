import * as colorette from "colorette";

type FunctionType = (...args: unknown[]) => unknown;

type FunctionKeys<T> = {
  [P in keyof T]: T[P] extends FunctionType ? P : never;
}[keyof T];

export class Jack {
  private static _prep(
    fn: FunctionKeys<typeof colorette> | "normal",
    prefix: string,
    ...args: unknown[]
  ) {
    if (fn === "normal") {
      return [prefix, ...args];
    }

    return [
      colorette[fn](prefix),
      ...args.map((arg) =>
        typeof arg === "string" ? colorette[fn](arg) : arg
      ),
    ];
  }

  public static log = (...args: unknown[]) => console.log("\n\t∘", ...args);
  public static info = (...args: unknown[]) =>
    console.info(...Jack._prep("dim", "\t∘", ...args));
}
