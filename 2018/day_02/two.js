const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().split("\n");

const leven = require('fast-levenshtein')

let strings = []

const lowestDistance = (string, array) => {
    let match
    let low = 2
    array.forEach(str => {
        if (str !== string){
            const dist = leven.get(str,string)
            if (dist < low) {
                low = dist
                match = str
            }
        }
    })
    return [string, match, low]
}

input.forEach((outerString, index, self) => {
    if (lowestDistance(outerString, self)[2] === 1) {
        strings.push(lowestDistance(outerString, self))
    }    
})

const string = strings[0][0]
const string2 = strings[0][1]
let trouble
string.split('').forEach((char, index) => {
    if (string2.charAt(index) !== char) {
        trouble = index
    }
})

console.log(string.replace(new RegExp(string.charAt(trouble)), ''))
