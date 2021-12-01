const fs = require('fs')

const getInputData = () => {
    const data = fs.readFileSync('./input.txt', 'utf8')
    return data
}

const data = getInputData().split("\n").map(Number)
console.log(data)

let prevNum = data[0]
console.log(data[0])

let nLargerThanPrevious = 0
for (let item of data) {
    if (item > prevNum) {
        nLargerThanPrevious += 1
    } else {
        console.log(`${item} <= ${prevNum}`)
    }
    prevNum = item;
}

console.log(nLargerThanPrevious)
fs.writeFileSync("./output.txt", nLargerThanPrevious.toString())