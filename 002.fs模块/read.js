var fs = require('fs')

// 异步读
fs.readFile('./data/data.json','utf-8', function(err,data){
  if(err){
    console.log('异步err',err)
  } else{
    console.log('异步data',data)
  }
})

fs.readFile('./data/data.json','utf-8', (err,data) => {
  if(err){
    console.log('异步err',err)
  } else{
    console.log('异步data',data)
  }
})


// 同步读
try {
  var data = fs.readFileSync('./data/data.json', 'utf-8');
  console.log('同步data',data);
} catch (err) {
  console.log('同步err',err)
}