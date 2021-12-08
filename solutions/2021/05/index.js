import { example, data } from "./input";

export const inputParser = (input) =>
  input.split("\n").map((input, i) =>
    input.split(" -> ").map((coordinates) => {
      const [x, y] = coordinates.split(",").map((c) => parseInt(c));
      return { x, y };
    })
  );

const parsedData = inputParser(data);

export const part1 = (coordinates = parsedData) => {
  const largestCoordinates = coordinates.reduce(
    (acc, group) => {
      const newAcc = { ...acc };
      group.forEach((coordinate) => {
        if (coordinate.x >= acc.x) newAcc.x = coordinate.x;
        if (coordinate.y >= acc.y) newAcc.y = coordinate.y;
      });

      return newAcc;
    },
    { x: 0, y: 0 }
  );

  const grid = [];

  for (let index = 0; index < largestCoordinates.y + 1; index++) {
    grid.push(new Array(largestCoordinates.x + 1).fill(0));
  }

  const traverseGrid = (group) => {
    const [start, end] = group;

    const startingRow = grid[start.y];
    console.log({ start, end });

    const xPointsToTravel = end.x - start.x;
    const yPointsToTravel = end.y - start.y;

    console.log({ xPointsToTravel, yPointsToTravel });

    const generateLine = (counter) => {
      let yIndex = start.y;
      let xIndex = start.x;

      // console.log({ start });

      if (counter > xPointsToTravel && counter > yPointsToTravel) return;

      if (counter <= xPointsToTravel) {
        if (xPointsToTravel > 0) {
          xIndex += counter;
        } else if (xPointsToTravel < 0) {
          xIndex -= counter;
        }
      }

      if (counter <= yPointsToTravel) {
        if (yPointsToTravel > 0) {
          yIndex += counter;
        } else if (yPointsToTravel < 0) {
          yIndex -= counter;
        }
      }

      grid[yIndex][xIndex] = grid[yIndex][xIndex] + 1;

      // console.log({ grid });

      return generateLine(counter + 1);
    };

    return generateLine(0);
  };

  console.log(
    "COORDINATES",
    coordinates.filter(([start, end]) => start.x === end.x || start.y === end.y)
  );
  coordinates
    .filter(([start, end]) => start.x === end.x || start.y === end.y)
    .forEach((group) => traverseGrid(group));

  return;
};

export const part2 = (input = parsedData) => {
  return;
};

const test = [
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [2, 2, 2, 1, 1, 1, 0, 0, 0, 0],
];

export default {
  part1,
  part2,
};
