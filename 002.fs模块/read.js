var fs = require('fs')

// 异步读
fs.readFile('./data/data.json','utf-8', (err,data) => {
  if(err){
    console.log('异步err2',err)
  } else{
    console.log('异步data2',data)
  }
})


// 同步读
try {
  var data = fs.readFileSync('./data/data.json', 'utf-8');
  console.log('同步data',data);
} catch (err) {
  console.log('同步err',err)
}
