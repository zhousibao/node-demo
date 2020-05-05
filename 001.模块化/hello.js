'use strict'

var s = 'hello'

function hi(name){
  console.log(s + ',' + name + '!')
}

function bye(name){
  console.log('bye' + ',' + name + '!')
}

// 模块输出
// 默认情况下，Node准备的exports变量和module.exports变量实际上是同一个变量，并且初始化为空对象{}
// module.exports 可以替换初始化的空对象为其他对象、数组、函数
// exports只能对初始化的空对象添加属性

// 写法一 // 推荐统一使用module.exports
module.exports = {
  hi:hi,
  bye:bye
}

// 写法二
// exports.hi = hi
// exports.bye = bye