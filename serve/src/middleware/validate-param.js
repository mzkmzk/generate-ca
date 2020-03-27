const ruleCheckMap = {
  empty: function(key, value){
    if (!value){
      throw new Error(`${key} 不能为空`)
    }
  },
  dns: function(key, value){
    // 只保证无特殊字符
    if (!value){

    } else if (!(/^[a-zA-Z0-9\.\-\*]{5,50}$/.test(value))){
      throw new Error(`${key} 不合法, 只允许字母数字以及-_.等字符`)
    }
  }
}

module.exports = async function (ctx, next, param){
  console.log('validate-param middleware start')
  const { rules } = param
  for (let index = 0; index < rules.length; index++) {
    const { descriptor, key } = rules[index]
    const value = ctx.query[key]
    console.log('descriptor', descriptor)
    for (let descriptorIndex = 0; descriptorIndex < descriptor.length; descriptorIndex++) {
      const type = descriptor[descriptorIndex];
      console.log('type', type)
      ruleCheckMap[type](key, value)
    }
  }
  console.log('validate-param middleware end')
  
}