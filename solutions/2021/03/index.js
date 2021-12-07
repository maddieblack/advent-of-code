import { example, data } from "./input";

export const inputParser = (input) => input.split("\n");

const parsedData = inputParser(data);

export const part1 = (input = parsedData) => {
  const gammaRate = [];
  const epsilonRate = [];

  for (let i = 0; i < input[0].length; i++) {
    let zeros = 0;
    let ones = 0;
    input.forEach((d) => {
      if (d[i] == 1) ones += 1;
      if (d[i] == 0) zeros += 1;
    });

    if (zeros > ones) {
      gammaRate.push("0");
      epsilonRate.push("1");
    } else {
      gammaRate.push("1");
      epsilonRate.push("0");
    }
  }

  return parseInt(gammaRate.join(""), 2) * parseInt(epsilonRate.join(""), 2);
};

export const part2 = (input = parsedData) => {
  const narrowSearch = (binaries, bitIndex, type) => {
    if (binaries.length <= 1) return binaries;

    let [ones, zeroes] = [[], []];

    for (let i = 0; i < binaries.length; i++) {
      const binary = binaries[i];
      const bit = binary[bitIndex];

      if (bit == 1) ones.push(binary);
      if (bit == 0) zeroes.push(binary);
    }

    if (type === "o") {
      if (ones.length >= zeroes.length) {
        return narrowSearch(ones, bitIndex + 1, type);
      } else {
        return narrowSearch(zeroes, bitIndex + 1, type);
      }
    } else if (type === "co2") {
      if (ones.length >= zeroes.length) {
        return narrowSearch(zeroes, bitIndex + 1, type);
      } else {
        return narrowSearch(ones, bitIndex + 1, type);
      }
    }
  };

  const o = parseInt(narrowSearch(input, 0, "o"), 2);
  const co2 = parseInt(narrowSearch(input, 0, "co2"), 2);

  return o * co2;
};

export default {
  part1,
  part2,
};
