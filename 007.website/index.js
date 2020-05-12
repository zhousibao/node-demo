// 小的网站练习
const http = require('http')
const fs = require('fs')

const server = http.createServer((req,res) => {
  const { method, url } = req
  if(method === 'GET' && url.substr(-4) === '.jpg'){
    fs.stat(__dirname + url, (err,stat) => {
      if(err || !stat.isFile()){
        res.writeHead(404)
        res.end('Not found')
        return
      }

      render(__dirname + url, 'application/jpg')
    })
  } 
  else if(method === 'GET' && url === '/'){
    render(__dirname + '/static/index.html')
  }
  else{
    res.writeHead(404)
    res.end('Not found')
  }


  function render(path,type){
    res.writeHead(200,{
      'Content-type':type || 'text/html'
    })
    fs.createReadStream(path).pipe(res)
  }
  

})
server.listen(3000)

