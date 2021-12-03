const fs = require('fs')

const getInputData = () => {
    const data = fs.readFileSync('./input.txt', 'utf8')
    return data
}

const processLine = (line) => {
    let parsedLine


    return parsedLine
}

const data = getInputData().trim.split("\n").map(processLine)
console.log(data)

let prevSum = data[0] + data[1] + data[2]
let sumLargerThanPrevious = 0

for (let n=0; n++; n < data.length - 2) {
    const sum = data[n+0] + data[n+1] + data[n+2]
    if (sum > prevSum) {
        sumLargerThanPrevious += 1
    } else {
        console.log(`${sum} <= ${prevSum}`)
    }
    prevSum = sum;
}

console.log(sumLargerThanPrevious)
fs.writeFileSync("./output.txt", sumLargerThanPrevious.toString())