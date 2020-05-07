// stream 流是一种抽象的数据结构
// 在Node.js中，流也是一个对象，我们只需要响应流的事件就可以了：
// data事件表示流的数据已经可以读取了，end事件表示这个流已经到末尾了，没有数据可以读取了，error事件表示出错了。
// 所有可以读取数据的流都继承自stream.Readable，所有可以写入的流都继承自stream.Writable。

var fs = require('fs')
const data = []
// 读流
var rs = fs.createReadStream('./data/read.txt','utf-8');
rs.on('data',(chunk) => {
  console.log('data',chunk)
  data.push(chunk)
})
rs.on('end',() => {
  console.log('end')
  write()
})

// 写流
var ws = fs.createWriteStream('./data/wirte.txt','utf-8');
ws.write('nihao\n')
ws.write('end\n')
ws.end()


// 写流1
function write(){
  var ws1 = fs.createWriteStream('./data/wirte1.txt','utf-8');
  for(item of data){
    ws1.write(item)
  }
  ws1.end()
}




// pipe 管道 
// 在Node.js中，Readable流有一个pipe()方法
// 一个Readable流和一个Writable流串起来后，所有的数据自动从Readable流进入Writable流，这种操作叫pipe。
var rspipe = fs.createReadStream('./data/read.txt');
var wspipe = fs.createWriteStream('./data/wirte-pipe.txt');
rspipe.pipe(wspipe);

// 默认情况下Readable流的数据读取完毕，end事件触发后，将自动关闭Writable流。如果我们不希望自动关闭Writable流，需要传入参数：
var rspipe1 = fs.createReadStream('./data/read.txt');
var wspipe1 = fs.createWriteStream('./data/wirte-pipe1.txt');
rspipe1.pipe(wspipe1, { end:false });
rspipe1.on('end', () => {
  wspipe1.end('\n真的结束');
});