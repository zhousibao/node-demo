const Koa = require('./koa')
const app = new Koa()

app.use(async (ctx,next) => {
  console.log('第一层 1')
  await next()
  console.log('第一层 2')
})

app.use(async (ctx, next) => {
  console.log('第二层 1')
  await next()
  console.log('第二层 2')
})


app.use(async (ctx, next) => {
  console.log('第三层')
  ctx.res.end('Hello World')
})


app.listen(3000, () => {
  console.log('server running at port 3000')
});