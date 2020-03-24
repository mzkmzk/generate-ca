const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()
const generateCa = require('./controller/generate-ca/index')
router.get('/generate-ca', function(ctx, next) {
  generateCa(ctx, next)
})
// response
app.use(router.routes(), router.allowedMethods())
app.listen(3000)