export function jack(...args: unknown[]) {
  return console.log("\n\t∘", ...args);
}

jack.prototype.info = function info(...args: unknown[]) {
  return console.info("\n\t∘", ...args);
};
