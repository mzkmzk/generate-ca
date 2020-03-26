const { spawn, exec } = require('child_process')

module.exports = async function (ctx, next) {
   /*const result = spawn(
    'envsubst', 
    ['<', '/code/src/template/intermediate-ca.conf'], 
    //['<', '/code/src/template/intermediate-ca.conf', '>', 'intermediate-ca.conf'], 
    {
      cwd: __dirname,
      env: {
        DNS0: 'DNS0-XXX',
        DNS1: 'DNS1-XXX'
      }
    }
  )*/
  const result = exec('envsubst < /code/src/template/intermediate-ca.conf > aaa-ca.conf', {
    cwd: __dirname,
      env: {
        DNS0: 'DNS0-XXX',
        DNS1: 'DNS1-XXX'
      }
  })
  result.stdout.on('data', function(data){console.log(data.toString())})
  result.stderr.on('data', function(data){console.log(data.toString())})
  result.on('error', function(e){console.log('error', e)})
  
  result.on('close', function(code){console.log('close, code: ', code)})
  result.on('exit', function(code){console.log('exit code: ', code)})
}