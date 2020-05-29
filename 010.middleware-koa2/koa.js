const http = require('http')

// 组合中间件
function compose(middlewareList) {
  return (ctx) => {
    const dispatch = (i) => {
      const fn = middlewareList[i]
      try {
        // 使用Promise包装
        return Promise.resolve(
          // dispatch.bind(null, i + 1) 实现next机制
          fn(ctx, dispatch.bind(null, i + 1))
        )
      } catch (err) {
        return Promise.reject(err)
      }
    }
    return dispatch(0)
  }
}

class Koa{
  constructor(){
    this.middlewareList = []
  }

  use(fn){
    if(!Object.prototype.toString.call(fn) === "[object Function]"){
      console.error('middleware must be a function')
      return
    }

    this.middlewareList.push(fn)
    return this
  }

  // 封装ctx
  createContext(req,res){
    const ctx = {req,res}
    ctx.method = req.method
    ctx.url = req.url
    return ctx
  }

  handleRequest(ctx, fn) {
    return fn(ctx)
  }

  callback() {
    const fn = compose(this.middlewareList)

    return (req, res) => {
      const ctx = this.createContext(req, res)
      return this.handleRequest(ctx, fn)
    }
  }

  listen(...args) {
    const server = http.createServer(this.callback())
    server.listen(...args)
  }

}
module.exports = Koa