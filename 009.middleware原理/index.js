// 实现一个类似express的node框架
const http = require('http')
const slice = Array.prototype.slice

class Express{
  constructor(){
    this.routes = {
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
    } else{
      info.path = '/' // 没有path则默认为根目录
      info.stack = slice.call(arguments,1)
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

  listen(...args){
    
  }
}