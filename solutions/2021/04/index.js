import { example, data } from "./input";

export const inputParser = (input) => {
  const inputRows = input.split("\n");
  const numbers = inputRows[0].split(",");

  const boards = [];
  let board = [];

  for (let i = 2; i < inputRows.length + 1; i++) {
    if (inputRows[i] === "" || i === inputRows.length) {
      boards.push(board);
      board = [];
      continue;
    }

    board.push(inputRows[i].split(" ").filter((space) => !!space));
  }

  return { numbers, boards };
};

const parsedData = inputParser(data);

export const checkForBingo = ({ row, column }) => {
  return (
    row.filter((item) => item.includes("*")).length === row.length ||
    column.filter((item) => item.includes("*")).length === column.length
  );
};

export const getWinningBoard = (brds, numbers) => {
  let boards = [...brds];

  const markBoard = (board, number, boardIndex) => {
    let winningBoard = false;
    const newBoard = board.map((row, rowIndex) =>
      row.map((cardNum, colIndex) => {
        if (cardNum === number) {
          const newRow = [...row];
          const newCol = board.map((r) => r[colIndex]);
          const marked = `*${cardNum}`;

          newRow[colIndex] = marked;
          newCol[rowIndex] = marked;

          if (checkForBingo({ row: newRow, column: newCol }) === true) {
            winningBoard = true;
          }

          return marked;
        }

        return cardNum;
      })
    );

    return { board: newBoard, winningBoard, boardIndex };
  };

  const findWinningBoard = (numberIndex) => {
    const num = numbers[numberIndex];
    const newBoards = boards.map((board, i) => markBoard(board, num, i));
    boards = newBoards.map((b) => b.board);

    const winner = newBoards.filter((board) => board.winningBoard);

    if (winner.length > 0)
      return {
        board: winner[0].board,
        number: num,
        boardIndex: winner[0].boardIndex,
      };

    if (numberIndex >= numbers.length - 1) return;

    return findWinningBoard(numberIndex + 1);
  };

  return findWinningBoard(0);
};

export const part1 = (input = parsedData) => {
  let { numbers, boards } = input;

  const winningBoard = getWinningBoard(boards, numbers);

  const winningBoardSum = winningBoard.board.reduce((acc, row) => {
    const rowTotal = row.reduce((acc, num) => {
      if (num.includes("*")) return acc;
      return parseInt(num) + acc;
    }, 0);
    return acc + rowTotal;
  }, 0);

  return winningBoardSum * parseInt(winningBoard.number);
};

export const part2 = (input = parsedData) => {
  let { numbers, boards: brds } = input;

  let boards = [...brds].map((brd, i) => ({
    board: brd,
    id: i,
    hasBingo: false,
  }));

  const bingos = [];

  const markBoard = (board, number) => {
    let hasBingo = false;

    if (board.hasBingo === true)
      return {
        ...board,
      };
    const newBoard = board.board.map((row, rowIndex) =>
      row.map((cardNum, colIndex) => {
        if (cardNum === number) {
          const newRow = [...row];
          const newCol = board.board.map((r) => r[colIndex]);
          const marked = `*${cardNum}`;

          newRow[colIndex] = marked;
          newCol[rowIndex] = marked;

          if (checkForBingo({ row: newRow, column: newCol }) === true) {
            hasBingo = true;
          }

          return marked;
        }

        return cardNum;
      })
    );

    if (hasBingo === true) bingos.push(board.id);

    return {
      board: newBoard,
      hasBingo: board.hasBingo || hasBingo,
      id: board.id,
    };
  };

  const findLosingBoard = (numberIndex) => {
    const num = numbers[numberIndex];
    const newBoards = boards.map((board) => markBoard(board, num));
    boards = [...newBoards];

    const winner = newBoards.filter((board) => board.hasBingo);

    if (winner.length === boards.length)
      return {
        ...boards[bingos[bingos.length - 1]],
        number: num,
      };

    if (numberIndex >= numbers.length - 1) return;

    return findLosingBoard(numberIndex + 1);
  };

  const losingBoard = findLosingBoard(0);

  const losingBoardSum = losingBoard.board.reduce((acc, row) => {
    const rowTotal = row.reduce((acc, num) => {
      if (num.includes("*")) return acc;
      return parseInt(num) + acc;
    }, 0);
    return acc + rowTotal;
  }, 0);

  return losingBoardSum * parseInt(losingBoard.number);
};

export default {
  part1,
  part2,
};
