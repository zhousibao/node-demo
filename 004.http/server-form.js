var http = require('http')
var qs = require('querystring')


http.createServer(function(req,res){
  if(req.url === '/'){
    res.writeHead(200,{
      'Content-Type':'text/html'
    })
    res.end(`
      <form method="POST" action="/url">
        <h1>My form</h1>
        <fieldset>
        <label>Personal information</label>
        <p>What is your name?</p>
        <input type="text" name="name">
        <p>
          <button>Submit</button>
        </p>
      </form>
    `)
  } else if(req.url === '/url' && req.method === 'POST'){
    var body = ''
    req.on('data',function(chunk){
      body += chunk
    })
    
    req.on('end',function(){
      res.writeHead(200,{
        'Content-Type':'text/html'
      })
      res.end(`
        <p>you send a <em>${req.method}</em> request</p>
        <p>Content-Type: ${req.headers['content-type']}</p>
        <p>Data:</p>
        <pre>you name is : ${qs.parse(body).name}</pre>
      `)
    })
    
  } else {
    res.writeHead(404)
    res.end('Not Found')
  }
}).listen(8090)