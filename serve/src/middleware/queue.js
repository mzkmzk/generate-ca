const queue = require('queue')

const queueObj = {}

module.exports = async function(ctx, next, options){
  console.log('queue start')
  const { key, max, msg } = options
  if (!queueObj[key]) {
    queueObj[key] = queue({
      autostart: true,
      concurrency: max
    })
  }

  console.log('queueObj[key].length ', queueObj[key].length )
  if (queueObj[key].length >= max ){
    throw new Error(msg)
  } else {
    console.log('queue end')
    const promise = next()
    queueObj[key].push(async function(cb){
      await promise
      cb()
    })
  }

  
}