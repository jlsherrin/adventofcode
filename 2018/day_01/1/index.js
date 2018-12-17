const fs = require('fs')
const readline = require('readline')

const rl = readline.createInterface({
    input: fs.createReadStream('../input.txt')
})
let freq = 0
rl.on('line', (line) => {
    const change = parseInt(line)
    const old = freq
    freq += change
    console.log(`freq:${old}, change:${change}, new:${freq}`)
})