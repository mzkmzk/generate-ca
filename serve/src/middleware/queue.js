const queue = require('queue')

const queueObj = {}

module.exports = function(options){
  return async function(ctx, next ){
    console.log('queue start')
    const { key, max, msg } = options
    if (!queueObj[key]) {
      queueObj[key] = queue({
        autostart: true,
        concurrency: max
      })
    }
    let promise
    console.log('queueObj[key].length ', queueObj[key].length )
    if (queueObj[key].length >= max ){
      throw new Error(msg)
    } else {
      console.log('queue end')
      promise = next()
      queueObj[key].push(async function(cb){
        await promise
        cb()
      })
    }
    return promise
  }  
}