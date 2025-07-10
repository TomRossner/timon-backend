export const arrayToObject = <T>(arr: T[], keyFn: (item: T) => string | number) => {
  return Object.fromEntries(arr.map(item => [keyFn(item), item]));
}