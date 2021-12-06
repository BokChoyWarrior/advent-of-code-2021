const fs = require("fs");

const getInputData = () => {
  const data = fs.readFileSync("./input.txt", "utf8");
  return data;
};

// const parseLine = (line) => {
//   const parsedLine = line.split("");
//   return parsedLine;
// };

const data = getInputData().trim().split("\n\n");

const pulledNumbers = data.slice(0, 1)[0].split(",")
console.log(pulledNumbers)

const boards = data.slice(1).map((board) => board.split("\n").map((line) => line.trim().split(" ").filter((item) => item !== "")))
console.log(boards)

const checkForWinner = () => {
  const boardContainsBingo = (board) => {
    const winningString = "xxxxx"

    // check rows
    for (const row of board) {
      if (row.join("") === winningString) {
        return true
      }
    }
    // check cols
    for (let column = 0; column < board.length; column += 1) {
      let columnScore = ""
      for (let row = 0; row < board.length; row += 1) {
        if (board[row][column] === "x") {
          columnScore += "x"
        }
        if (columnScore === winningString) {
          return true
        }
      }
    }
    return false
  }

  for (const boardIndex in boards) {
    if (boardContainsBingo(boards[boardIndex])) {
      console.log("Theres a winnah!")
      return boardIndex
    }

  }
  return false
}

const callNumber = (number) => {
  for (const board of boards) {
    for (const row of board) {
      for (const colIndex in row) {
        if (row[colIndex] === number) {
          row[colIndex] = "x"
        }
      }
    }
  }
}

const sumLeftOver = (board) => {
  let sum = 0
  for (const row of board) {
    for (const item of row) {
      if (item !== "x") {
        sum += parseInt(item, 10)
      }
    }
  }
  return sum
}

console.log(boards)

const solve = () => {
  let currentNumber
  for (const num of pulledNumbers) {
    currentNumber = num
    callNumber(num)

    let isWinner = checkForWinner()
    while (isWinner !== false) {
      if (boards.length === 1) {
        console.log("Winner!", isWinner)
        return parseInt(currentNumber, 10) * sumLeftOver(boards[isWinner])
      }
      boards.splice(isWinner, 1)
      isWinner = checkForWinner()
    }
  }
};

const out = solve()
console.log(out)

fs.writeFileSync("./output.txt", out);
