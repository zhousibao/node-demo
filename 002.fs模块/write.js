var fs = require('fs')

// writeFile、writeFileSync 会覆盖写入文件中原有的内容

let data = {
  name:'zhousibao',
  age:'18',
  like:[1,2,3]
}
let str = JSON.stringify(data)
let text = 'hello node'

// 异步写
fs.writeFile('./data/data1.json', str ,err => {
  if(err){
    console.log('异步err',err)
  }
  console.log('异步写成功')
})

// 异步写
try{
  let data = fs.writeFileSync('./data/data1.txt', text)
  console.log('同步写成功')
} catch(err){
    console.log('同步err',err)
}