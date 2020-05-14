// net 模块用于创建基于流的 TCP 或 IPC 的服务器net.createServer与客户端net.createConnection
const net = require('net')

// net.Server类: //用于创建服务端
// 创建一个Server对象
const server = net.createServer()
// 监听已有的连接
server.listen('3000','127.0.0.1')

// listening事件:当服务绑定后触发
server.on('listening', () => {
  console.log('服务器已启动')
})

// connection事件:当一个新的connection(连接)建立的时候触发
server.on('connection', socket => {
  console.log('有新的连接')

  socket.on('data', data => {
    console.log(data.toString())
    socket.write('你好啊，客户端\n');
    socket.write('客户端,请关闭连接~');
  })
  server.close(); // 关闭方法
})

// 当server关闭的时候触发
server.on('close',() => {
  console.log('服务器关闭')
})

// 当错误出现的时候触发
server.on('error',() => {
  console.log('服务器error')
})