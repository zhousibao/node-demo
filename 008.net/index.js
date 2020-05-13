// net 模块用于创建基于流的 TCP 或 IPC 的服务器net.createServer与客户端net.createConnection

// Telnet是TCP协议上层的协议。

// 本例描述
// 1 全局安装telnet
// 2 启动服务
// 新建控制台窗口进入telnet，并连接服务
// $ telnet
// telnet> telnet 127.0.0.1 3000

const net = require('net')
var count = 0
var users = {}

const server = net.createServer(con => {
  con.setEncoding('utf8')

  var nickname
  console.log('new connection')
  con.write(`> welcome to tcp-chat\n${count}\n> please write your name and press enter:`)
  count++;

  // 监听数据
  con.on('data', data => {
    data = data.replace('\r\n','')

    if(!nickname){
      // 初次进入
      if(users[data]){
        con.write('nick already in users, try again:\n')
        return
      }else{
        nickname = data
        users[nickname] = con
        broadcast(nickname + ' > jion the room \n')
      }

    }else{
      // 聊天消息
      broadcast(nickname + ': ' + data + '\n', true)
    }

  })

  // 监听退出
  con.on('close',function(){
    count--
    delete users[nickname]

    broadcast(nickname + ' > left the room \n')
  })

  // 广播方法
  function broadcast(msg, exceptMyself){
    for(let i in users){
      if(!exceptMyself || i !== nickname){
        users[i].write(msg)
      }
    }
  }
})

server.listen(3000,() => {
  console.log(' server listening on : 3000 ')
})