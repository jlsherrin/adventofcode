const fs = require('fs')
const input = fs.readFileSync('./input.txt').toString().split("\n")

function numbers(str) {
    return (str.match(/-?[0-9]+/g) || []).map(Number);
}

function maxBy(array, criterion) {
    return array.reduce((a, b) => (criterion(a) > criterion(b) ? a : b));
}

function maxEntry(obj) {
    return maxBy(Object.entries(obj), entry => entry[1]);
}

// most minutes asleep

let guardTimes = {};

let sleepStart = 0;
let curGuard = 0;

for (const line of input) {
    const [a, b] = line.slice(1).split('] ');
    let time = new Date(a).getTime();
    if (b.startsWith('Guard')) {
        [curGuard] = numbers(b);
    } else if (b === 'wakes up') {
        guardTimes[curGuard] = (guardTimes[curGuard] || 0) + (time - sleepStart);
    } else if (b === 'falls asleep') {
        sleepStart = time;
    } else {
        throw new Error("bug");
    }
}

console.log(maxEntry(guardTimes));
const GUARD_FROM_PREVIOUS_RESULT = parseInt(maxEntry(guardTimes)[0])

// most-asleep minute

let minutes = {};
let startMin = 0;

for (const line of input) {
    const [a, b] = line.slice(1).split('] ');
    // console.log(b)
    let min = numbers(a)[4];
    if (b.startsWith('Guard')) {
        [curGuard] = numbers(b);
    } else if (b === 'wakes up') {
        if (curGuard !== GUARD_FROM_PREVIOUS_RESULT) continue;
        for (i = startMin; i !== min; i = (i + 1) % 60) {
            minutes[i] = (minutes[i] || 0) + 1;
        }
    } else if (b === 'falls asleep') {
        startMin = min;
    } else {
        throw new Error("bug");
    }
}

console.log(maxEntry(minutes));
console.log(GUARD_FROM_PREVIOUS_RESULT * maxEntry(minutes)[0])

// most popular minute

let guardMinutes = {};
let curTable = {};
startMin = 0;

for (const line of input) {
    const [a, b] = line.slice(1).split('] ');
    let min = numbers(a)[4];
    if (b.startsWith('Guard')) {
        [curGuard] = numbers(b);
        curTable = (guardMinutes[curGuard] || {});
        guardMinutes[curGuard] = curTable;
    } else if (b === 'wakes up') {
        for (i = startMin; i !== min; i = (i + 1) % 60) {
            curTable[i] = (curTable[i] || 0) + 1;
        }
    } else if (b === 'falls asleep') {
        startMin = min;
    } else {
        throw new Error("bug");
    }
}

let table2 = Object.entries(guardMinutes).map(([k, v]) => {
    if (!Object.entries(v).length) return [k, 0, 0];
    return [k].concat(maxEntry(v));
});
const mostPopularMinute = maxBy(table2, a => a[2])
console.log(mostPopularMinute);
console.log(mostPopularMinute[0]*mostPopularMinute[1])