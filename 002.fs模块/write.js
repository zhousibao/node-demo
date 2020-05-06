var fs = require('fs')


let data = {
  name:'zhousibao',
  age:'18',
  like:[1,2,3]
}
let str = JSON.stringify(data)
let text = 'hello node.js'

// 异步写
fs.writeFile('./data/data1.json', str ,(err,data) => {
  if(err){
    console.log('异步err',err)
  }else{
    console.log('异步data',data)
  }
})

// 异步写
try{
  let data = fs.writeFileSync('./data/data1.txt', text)
  console.log('同步data', data)
} catch(err){
    console.log('同步err',err)
}