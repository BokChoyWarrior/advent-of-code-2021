const fs = require('fs')

const getInputData = () => {
    const data = fs.readFileSync('./input.txt', 'utf8')
    return data
}

const processLine = (line) => {
    let parsedLine = line.split(" ")
    
    parsedLine[1] = Number(parsedLine[1])
    
    return parsedLine
}

const data = getInputData().trim().split("\n").map(processLine)

const commandFunctions = {
    "forward": (pos, amount) => {pos.x += amount; pos.depth += pos.aim*amount},
    "down": (pos, amount) => {pos.aim += amount},
    "up": (pos, amount) => {pos.aim -= amount},
}

const pos = {x: 0, depth: 0, aim: 0}

for (let n=0; n < data.length; n++) {
    let command = data[n]
    console.log(command)

    commandFunctions[command[0]](pos, command[1])
}

console.log(pos)

fs.writeFileSync("./output.txt", pos.x * pos.depth)