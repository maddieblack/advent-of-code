import { example, data } from "./input";

export const inputParser = (input) => input.split("\n");

const parsedData = inputParser(data);

export const part1 = (input = parsedData) => {
  const positions = input.reduce(
    (acc, ctrl, i) => {
      let [direction, amount] = ctrl.split(" ");
      amount = parseInt(amount);
      if (direction === "up") {
        return { ...acc, depth: acc.depth - amount };
      }
      if (direction === "down") {
        return { ...acc, depth: acc.depth + amount };
      }
      if (direction === "forward") {
        return { ...acc, horizontalPosition: acc.horizontalPosition + amount };
      }
    },
    { horizontalPosition: 0, depth: 0 }
  );

  return positions.horizontalPosition * positions.depth;
};

export const part2 = (input = parsedData) => {
  const positions = input.reduce(
    (acc, ctrl, i) => {
      let [direction, amount] = ctrl.split(" ");
      amount = parseInt(amount);
      if (direction === "up") {
        return { ...acc, aim: acc.aim - amount };
      }
      if (direction === "down") {
        return { ...acc, aim: acc.aim + amount };
      }
      if (direction === "forward") {
        return {
          ...acc,
          horizontalPosition: acc.horizontalPosition + amount,
          depth: acc.depth + acc.aim * amount,
        };
      }
    },
    { horizontalPosition: 0, depth: 0, aim: 0 }
  );

  return positions.horizontalPosition * positions.depth;
};

export default {
  part1,
  part2,
};
