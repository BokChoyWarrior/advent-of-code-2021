const fs = require('fs')

const getInputData = () => {
    const data = fs.readFileSync('./input.txt', 'utf8')
    return data
}

const parseLine = (line) => {
    let parsedLine = line.split("")
    return parsedLine
}

const data = getInputData().trim().split("\n").map(parseLine)

const bits = data[0].length

let gamma = ""
let epsilon = ""

for (i=0; i<bits; i++) {
    let num1s = 0
    let num0s = 0
    for (let n=0; n < data.length; n++) {
        data[n][i] === "0" ? num0s++ : num1s++
    }

    if (num1s > num0s) {
        gamma += "1"
        epsilon += "0"
    } else {
        gamma += "0"
        epsilon += "1"
    }

}

gamma = parseInt(gamma, 2)
epsilon = parseInt(epsilon, 2)

const powerConsumption = gamma*epsilon

fs.writeFileSync("./output.txt", powerConsumption)