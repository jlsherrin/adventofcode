const fs = require('fs')
let input = fs.readFileSync('./input.txt').toString()

function reaction (input) {
    for(let i = 0; i < input.length - 1; i++) {
        const diff = Math.abs(input.charCodeAt(i) - input.charCodeAt(i + 1))
        if (diff === 32) {
            input = `${input.slice(0,i)}${input.slice(i+2)}`
            i -= 2
        }
    }
    return input.length
}

console.log(reaction(input))

let regex

for (let i = 0; i < 26; i++) {
    let lower = String.fromCharCode(97 + i)
    let upper = String.fromCharCode(65 + i)
    regex = new RegExp(`[${upper}${lower}]`, 'g')
    let temp = input.replace(regex, '')
    console.log(upper, reaction(temp))
}