const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()
const generateCa = require('./controller/generate-ca/index')
const envsubstTest = require('./controller/envsubst-test/index')
const Sentry = require('@sentry/node')
const validateParam = require('./middleware/validate-param')
const queue = require('./middleware/queue')
Sentry.init({ dsn: 'https://b5d2bff52b51452398dc7bfba2a6a301@sentry.404mzk.com/5' });

router.get(
  '/generate-ca',
  validateParam({
    rules: [ 
      { key: 'dns0', descriptor: ['notEmpty','dns'] }, 
      { key: 'dns1', descriptor: ['dns'] }
    ]
  }), 
  queue({
    key: 'generate-ca',
    max: 5,
    msg: '抱歉, 当前生成证书请求过多, 请稍候再试'
  }), async (ctx, next) =>  {
    await generateCa(ctx, next)
  }
)

router.get('/envsubst-test', async function(ctx, next) {
  await envsubstTest()
})

app.use(async function(ctx, next){
  
  try {
    await next()
  } catch(err) {
    console.log('next catch err: ', err)
    ctx.body = { code: -1, msg: err.message }
    Sentry.captureException(err)
  }
})

// response
app.use(router.routes(), router.allowedMethods())

app.on('error', function(err, ctx) {
  console.log('app error', err)
  Sentry.captureException(err)
})
app.listen(3000)