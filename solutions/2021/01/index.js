import { example, data } from "./input";

export const inputParser = (input) => input.split("\n");

const parsedData = inputParser(data);

export const part1 = (input = parsedData) => {
  return parsedData.filter((d, i) => (i === 0 ? false : d > parsedData[i - 1]))
    .length;
};

export const part2 = (input = parsedData) => {
  const windowIndexes = [0, 1, 2];

  const windowSums = parsedData.reduce((acc, meas, i) => {
    const window = windowIndexes.map((w) => parsedData[w + i]);

    if (window.includes(undefined)) return acc;

    return [...acc, window.reduce((acc, p) => acc + p, 0)];
  }, []);

  return part1(windowSums);
};

export default {
  part1,
  part2,
};
