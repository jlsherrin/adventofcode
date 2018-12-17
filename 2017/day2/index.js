const fs = require('fs')


var sum = []
fs.readFile('./input.txt', 'utf8', (err, input) => {
    input = input.split('')
    input.forEach((v, i, a) => {
        const size = a.length
        const half = a.length / 2
        let next

        // console.log('v', v)

        if (i + half >= size) {
            const diff = size - i
            // console.log(`diff ${diff}`)
            const go = half - diff
            next = a[go]
        } else {
            next = a[i + half]
        }
        v === next && sum.push(v)
        // console.log('next', next)
    })

    sum = sum.map(x => ~~x).reduce((a, b) => a + b, 0)
    // console.log('input',input)
    console.log('sum', sum)
    // console.log('sum2',sum2)
})