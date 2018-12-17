const fs = require('fs')


var sum = []
fs.readFile('./input.txt','utf8', (err, input) => {
  input = input.split('')
  input.forEach((v,i,a)=>{
    let next = (i+1 === a.length) ? a[0] : a[i+1]
    v === next && sum.push(v)
    console.log('v', v)
    console.log('next', next)
  })

  sum = sum.map(x => ~~x).reduce((a,b) => a+b, 0)
  // console.log('input',input)
  console.log('sum', sum)
  // console.log('sum2',sum2)
})
