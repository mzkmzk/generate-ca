/**
 * 将一个支持callback的函数转换成支持promise的
 * @method promisefy
 * @param {Function} fn - 支持callback的函数
 * @param {Object} context - 执行环境
 * @returns {Function}
 */
module.exports = function (fn, context, options = defaultOptions) {
  return function (...args) {
    const { isCacheResolve } = options
    const getPromise = () => {
      return new Promise((resolve, reject) => {
        const cb = (err, payload) => {
          if (err) {
            reject(err)
          } else {
            resolve(payload)
          }
        }
        fn.apply(context, [...args, cb])
      })
    }
    return getPromise()
  }
}
