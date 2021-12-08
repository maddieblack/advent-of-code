const { inputParser, part1, part2, checkForBingo } = require("./index.js");
const { example, data } = require("./input.js");

test("part 1 example", () => {
  expect(part1(inputParser(example))).toBe(4512);
});

test("check for bingo", () => {
  expect(checkForBingo({ row: ["1", "2", "3"], column: ["1", "2", "3"] })).toBe(
    false
  );
  expect(
    checkForBingo({ row: ["*1", "*2", "*3"], column: ["1", "2", "3"] })
  ).toBe(true);
  expect(
    checkForBingo({ row: ["1", "2", "3"], column: ["*1", "*2", "*3"] })
  ).toBe(true);
});

test("part 1 data", () => {
  expect(part1(inputParser(data))).toBe(11774);
});

test("part 2 example", () => {
  expect(part2(inputParser(example))).toBe(1924);
});

// test('part 2 data', () => {
//   expect(part2(inputParser(data))).toBe(0)
// })
