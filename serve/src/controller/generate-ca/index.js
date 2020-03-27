const uniqueString = require('../../utils/uniqueString.js')
const { exec, spawn } = require('child-process-promise')
const path = require('path')

async function runShell (name, options, params = []) {
  console.log(`${name} start`)

  const shell = spawn(path.join(__dirname, `../../shell/${name}`), params, options)

  shell.childProcess.stdout.on('data', function(data){
    process.stdout.write('stdout: ' + data.toString())
  })

  shell.childProcess.stderr.on('data', function(data){
    const str = data.toString()
    
    if (['.', '+', ''].indexOf(str.trim()) !== -1 ){
      return 
    }
    process.stdout.write('stderr: ' + str)
  })
  shell.childProcess.on('exit', function(code){
    process.stdout.write(`exit ${name} code: ${code}`)
  })
  await shell
}
module.exports = async function (ctx, next) {
  
  const name = uniqueString()
  console.log(`md5 name ${name}`)
  await runShell('before.sh', {}, ['-t', name])
  await runShell('generate-ca-root.sh', {
    cwd: `/data/ca/${name}/root`,
  }, [])

  await runShell('generate-ca-intermediate1.sh', {
    cwd: `/data/ca/${name}/intermediate1`,
    env: {
      DNS0: ctx.request.query.dns0 || '*.xxxxxxa.com',
      DNS1: ctx.request.query.dns1 || '*.xxxxxx.com'
    }
  })

  await runShell('generate-ca-enduser-certs.sh', {
    cwd: `/data/ca/${name}/enduser-certs`
  })

  ctx.body = { 
    code: 0,
    msg: '',
    data: { name }
  }
}