const http = require('http')
const fs = require('fs')

http.createServer((req,res) => {
  res.writeHead(200,{
    'Content-Type':'image/png'
  })

  var stream =fs.createReadStream('./static/image.png')
  // stream.on('data',(data) => {
  //   res.write(data)
  // })
  // stream.on('end', () => {
  //   res.end()
  // })
  stream.pipe(res)
}).listen(8089)