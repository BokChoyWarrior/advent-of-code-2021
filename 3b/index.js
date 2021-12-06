const fs = require("fs");

const getInputData = () => {
  const data = fs.readFileSync("./input.txt", "utf8");
  return data;
};

const parseLine = (line) => {
  const parsedLine = line.split("");
  return parsedLine;
};

const data = getInputData().trim().split("\n").map(parseLine);


const mostCommonBitAtIndex = (array, index) => {
  let num1s = 0;
  let num0s = 0;
  for (let n = 0; n < array.length; n += 1) {
    if (array[n][index] === "0") {
      num0s += 1;
    } else {
      num1s += 1;
    }
  }
  
  if (num1s >= num0s) {
    return "1";
  }
  return "0";
};

const keepNumbersWithBitAtIndex = (array, index, bitTokeep) => {
  const newArray = [];
  for (let i = 0; i < array.length; i += 1) {
    const item = array[i];
    if (item[index] === bitTokeep) {
      newArray.push(item);
    }
  }
  return newArray;
};

const solve = (data) => {
  const numBits = data[0].length;

  let oxygenArray = [...data]
  // eslint-disable-next-line consistent-return
  let oxygenResult = (() => {
    for (let i = 0; i < numBits; i += 1) {
      if (oxygenArray.length === 1) { return oxygenArray[0] }
      const mostCommonBit = mostCommonBitAtIndex(oxygenArray, i)
      oxygenArray = keepNumbersWithBitAtIndex(oxygenArray, i, mostCommonBit)
    }
  })();

  let scrubberArray = [...data]
  // eslint-disable-next-line consistent-return
  let scrubberResult = (() => {
    for (let i = 0; i < numBits; i += 1) {
      if (scrubberArray.length === 1) { return scrubberArray[0] }
      const mostCommonBit = mostCommonBitAtIndex(scrubberArray, i)
      let leastCommonBit = "1"
      if (mostCommonBit === "1") {
        leastCommonBit = "0"
      }
      scrubberArray = keepNumbersWithBitAtIndex(scrubberArray, i, leastCommonBit)
    }
  })();

  oxygenResult = parseInt(oxygenResult.join(""), 2)
  scrubberResult = parseInt(scrubberResult.join(""), 2)


  return oxygenResult * scrubberResult
};

const out = solve(data).toString()

fs.writeFileSync("./output.txt", out);
