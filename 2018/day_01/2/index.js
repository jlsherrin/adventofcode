var fs = require('fs');
var input = fs.readFileSync('../input.txt').toString().split("\n");

let found = false
let freq = 0
const freqs = []

while (!found) {
    for (i = 0; i< input.length; i++){
        const change = input[i]
        const old = freq
        freq += parseInt(change)
        if (freqs.includes(freq)) {
            found = freq; 
            // console.log(`old:${old}, change:${change}, new:${freq}`)
            break; 
        } else {
            freqs.push(freq)
        }
        console.log(`old:${old}, change:${change}, new:${freq}`)
    }
}

console.log(found)