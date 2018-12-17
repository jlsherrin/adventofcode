var fs = require('fs');
var input = fs.readFileSync('./input.txt').toString().split("\n");

let dubs = 0
let trips = 0

const charCount = (char, string) => {
    return string.split(new RegExp(char)).length - 1
}

const distinct = (value, index, self) => {
    return self.indexOf(value) === index
}

input.forEach((id) =>{
    let dubbed = false
    let tripped = false
    id.split('').filter(distinct).forEach(char => {
        if (!dubbed && charCount(char, id) === 2) {
            dubs++
            dubbed = true
        }
        if (!tripped && charCount(char, id) === 3) {
            trips++
            tripped = true
        }
    })
})

console.log(`dubs:${dubs}, trips:${trips}, checksum:${dubs*trips}`)
