/*
 * @Description: 
 * @Author: wish.WuJunLong
 * @Date: 2021-04-15 14:46:15
 * @LastEditTime: 2021-07-07 16:37:01
 * @LastEditors: mzr
 */
// 反向代理配置 解决跨域
module.exports = {
  pluginOptions: {
    moment: {
      locales: ["zh-cn"],
    },
  },
  devServer: {
    proxy: 'http://192.168.0.89:8666',
  }
};
