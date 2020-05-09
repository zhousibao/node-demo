var http = require('http')

var server = http.createServer((request,response) =>{
  // 获得HTTP请求的method和url:
  console.log(request.method + ': ' + request.url);

  // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
  response.writeHead(200, {'Content-Type': 'text/html'});

  // 将HTTP响应的HTML内容写入response:
  // 多次使用write
  response.write('<p>hello1</p>')
  response.write('<p>hello2</p>')

  setTimeout(() => {
    response.end('<h1>Hello Node!</h1>')
  },1000)
})
server.listen(8088)
// console.log('http://localhost:8088')
