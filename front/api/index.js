import axios from 'axios'

const generaCa = async function (dns0) {
  return axios.get('https://generate-ca-serve.404mzk.com/generate-ca', {
    params: {
      dns0
    }
  }).then(function( {data} ){
    return data
  }).catch(function(error){
    return { code: -1, msg: error.message || '服务器响应异常, 请稍后重试'}
  })

}

export {
  generaCa
}
