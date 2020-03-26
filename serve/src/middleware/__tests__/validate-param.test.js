const validateParam = require('../validate-param')

it('测试参数校验', async function(){
  try {
    await validateParam({ query: { dns0: '' } }, null,  {
      rules: [ { key: 'dns0', descriptor: [ 'empty', 'dns'] } ]
    })
  } catch(e) {
    expect(e).toMatchSnapshot()
  }
})