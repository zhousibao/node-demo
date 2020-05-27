const express = require('./express')

// 生成实例
const app = express()

app.use((req,res,next) => {
  console.log('请求开始 ', req.method, req.url)
  next()
  console.log('请求开始 end')
})

app.use((req,res,next) => {
  console.log('处理cookie')
  req.cookie = {
    username: 'abc'
  }
  next()
  console.log('处理cookie end')
})


app.use('/api',(req,res,next) => {
  console.log('处理 /api 路由')
  next()
  console.log('处理 /api 路由 end')
})


app.get('/api',(req,res,next) => {
  console.log('处理 get /api 路由')
  next()
  console.log('处理 get /api 路由 end')
})

app.get('/api/login', loginCheck, (req,res,next) => {
  console.log('处理 get /api/login 路由')
  res.json({
    code:0,
    data:req.cookie
  })
  
})

app.listen(3000, () => {
  console.log('server running on port 3000')
})

// 模拟登陆中间件
function loginCheck(req, res, next){
  setTimeout(() => {
    console.log('模拟登陆')
    next()
    console.log('模拟登陆 end')
  })
}