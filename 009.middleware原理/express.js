// 实现一个类似express的node框架
const http = require('http')
const slice = Array.prototype.slice

class Express{
  constructor(){
    this.routes = {
      // 存放中间件
      all:[],
      get:[],
      post:[]
    }
  }

  register(path){
    const info = {}
    if(typeof path === 'string'){
      info.path = path
      // 从第二个参数开始，转换成数组，存入stack
      info.stack = slice.call(arguments,1)
    } else {
      info.path = '/' // 没有path则默认为根目录
      info.stack = slice.call(arguments,0)
    }
    return info
  }

  use(){
    const info = this.register.apply(this,arguments)
    this.routes.all.push(info)
  }

  get(){
    const info = this.register.apply(this,arguments)
    this.routes.get.push(info)
  }

  post(){
    const info = this.register.apply(this,arguments)
    this.routes.post.push(info)
  }

  match(method, url){
    let stack = []
    // favicon直接返回
    if(url === '/favicon.ico'){
      return stack
    }
    const curRoutes = [...this.routes.all,...this.routes[method]] // 当前匹配的所有路由
    for(const i of curRoutes){
      if(url.indexOf(i.path) === 0){ // 符合中间件路由匹配
          stack = stack.concat(i.stack)
      }
    }
    return stack
  }

  // 核心的next机制
  handle(req, res, stack){
    const next = () => {
      // 拿到第一个匹配的中间件
      const middleware = stack.shift()
      if(middleware){
        // 执行中间件函数
        middleware(req, res, next)
      }
    }
    next()
  }

  callback(){
    return (req,res) => {
      // res中封装json方法
      res.json = data => {
        res.setHeader('Content-type', 'application/json')
        res.end(JSON.stringify(data))
      }

      const url = req.url
      const method = req.method.toLowerCase()
      const list = this.match(method, url) // 获取可以执行的所有中间件
      this.handle(req, res, list)
    }
  }

  listen(...args){
    const server = http.createServer(this.callback())
    server.listen(...args)
  }
}

module.exports = () => {
  return new Express()
}