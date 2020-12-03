export type Runner<T> = readonly [(data: string) => T, (entries: T) => unknown[]];
