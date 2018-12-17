const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().split('\n')

let map = {}
input.forEach( instruction => {
    instruction = instruction.split(' ')
    const stepA = instruction[1]
    const stepB = instruction[7]
    map[stepA] = map[stepA] || {name: stepA, requires:{}}
    map[stepB] = map[stepB] || {name: stepB, requires:{}}
    map[stepB].requires[stepA] = true
})

// console.log(map)

let steps = ''
while(true){
    const sorted = Object.values(map)
        .filter(instruction => !Object.keys(instruction.requires).length)
        .sort((a,b) => a.name < b.name ? -1 : 1)
    // console.log(sorted)
    if(!sorted[0]) break
    const name = sorted[0].name
    steps += name
    delete map[name]
    Object.values(map).forEach(instruction =>{
        delete instruction.requires[name]
    })
}
console.log(steps)

//part 2
map = {}
input.forEach(instruction => {
    instruction = instruction.split(' ')
    const stepA = instruction[1]
    const stepB = instruction[7]
    map[stepA] = map[stepA] || {name: stepA, requires:{}, time: 60 + stepA.charCodeAt(0) - 64}
    map[stepB] = map[stepB] || {name: stepB, requires:{}, time: 60 + stepB.charCodeAt(0) - 64}
    map[stepB].requires[stepA] = true
})
let totalTime = 0
let workstreams = Array(5).fill('')
let done = ''
while(true){
    let sorted = Object.values(map)
        .filter(instruction => !Object.keys(instruction.requires).length)
        .sort((a,b)=> a.n < b.n ? -1 : 1)
    if(!sorted[0]) break
    sorted = sorted.filter(o=> !workstreams.includes(o.name))
    let i = -1
    workstreams = workstreams.map(stream => stream || (sorted[++i]||{}).name || '')
    workstreams.forEach((stream, i) => {
        if(!map[stream]) return
        map[stream].time -= 1
        if(!map[stream].time){
            delete map[stream]
            done += stream
            workstreams[i] = ''
            Object.values(map).forEach(instruction => {
                delete instruction.requires[stream]
            })
        }
    })
    totalTime += 1
    }
console.log(totalTime)