/*
 * @Description: 
 * @Author: wish.WuJunLong
 * @Date: 2021-04-15 14:46:15
 * @LastEditTime: 2021-04-27 19:08:46
 * @LastEditors: mzr
 */
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
