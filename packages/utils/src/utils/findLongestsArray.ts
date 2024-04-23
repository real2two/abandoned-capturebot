export const findLongestArray = (arrays: any[]) =>
  arrays.reduce((longest, array) => (array.length > longest.length ? array : longest), []);
