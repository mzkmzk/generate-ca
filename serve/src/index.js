const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()

router.get('generate-ca', function(ctx, next) {
  ctx.body = 'this is get reponse!'
}
// response
app.use(ctx => {
  ctx.body = 'Hello Koa'
})
 
app.listen(3000)