const uniqueString = require('../../utils/uniqueString.js')
const { exec } = require('child-process-promise')
const path = require('path')

async function runShell (name, options, shellStr) {
  console.log(`${name} start`)
  const result = await exec(`${path.join(__dirname, `../../shell/${name}`)} ${shellStr}`, options)
  console.log(`${name} end, result: `)
  console.log(`${name} stdout`, result.stdout)
  console.log(`${name} stderr`, result.stderr)
}
module.exports = async function (ctx, next) {
  const name = uniqueString()
  await('before.sh', {}`-t ${name}`)
  await('generate-ca-root.sh', {
    cwd: `/data/ca/${name}/root`
  })
  await('generate-ca-intermediate1.sh', {
    cwd: `/data/ca/${name}/intermediate1`
  })
  await('generate-ca-enduser-certs.sh', {
    cwd: `/data/ca/${name}/enduser-certs`
  })


  ctx.body = name
  next()
}