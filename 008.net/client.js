const net = require('net')

// net.socket类: // 可以由用户创建并直接与服务器交互
// 创建一个连接
const socket = net.connect('3000','127.0.0.1')


// 当一个socket连接成功建立的时候触发该事件
socket.on('connect', () => {
  console.log('连接服务器成功')
  // 在socket上发送数据
  socket.write('你好啊，服务器')

  // 当接收到数据的时候触发该事件
  socket.on('data', data => {
    console.log(data.toString())
    
    socket.end()
  })
})

// 关闭连接时触发
socket.on('end', () => {
  console.log('我已主动关闭连接成功')
})

// error时触发
socket.on('error', () => {
  console.log('连接失败')
})