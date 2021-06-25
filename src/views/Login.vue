<!--
 * @Description: 登录页
 * @Author: mzr
 * @Date: 2021-06-25 09:42:43
 * @LastEditTime: 2021-06-25 16:17:22
 * @LastEditors: mzr
-->
<template>
  <div class="login">
    <div class="login_header">
      <div class="login_icon"><img :src="require('@/static/login_icon.png')" alt="图标" /></div>
    </div>
    <div class="login_content">
      <div class="content_left"><img :src="require('@/static/login_img.png')" alt="背景"/></div>
      <div class="content_right">
        <div class="right_item">
          <div class="right_title">云上企微监控</div>
          <div class="right_mark">请使用OA账号登陆</div>
        </div>
        <div class="right_input">
          <el-input v-model="accountNumber" placeholder="账号"></el-input>
          <el-input v-model="passWord" placeholder="密码"></el-input>
        </div>
        <div class="right_check">
          <el-checkbox v-model="checked">记住我</el-checkbox>
        </div>  
        <div class="right_button">
          <el-button type="primary" round style="width:320px">登录</el-button>  
        </div>
      </div>
    </div>
    <p>重庆云上航空企业微信监控平台</p>
  </div>
  
</template>

<script>
export default {
  name:"load",
  components:{

  },
  data() {
    return {
        
        checked: true, // 单选框
        accountNumber: "", // 账号
        passWord: "", // 密码
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: #E7ECF9;
  .login_header {
    width: 158px;
    margin: 0 auto;
    padding: 62px 36px;
    .login_icon {
      width: 158px;
      height: 62px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .login_content {
    width: 1000px;
    margin: 0 auto;
    display: flex;
    .content_left {
      width: 500px;
      height: 580px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .content_right {
      width: 500px;
      background-color:#FFF;
      .right_item {
        width: 196px;
        margin: 105px auto 0px;
        .right_title {
          font-size: 28px;
          font-weight: 400;
          line-height: 37px;
          color: #0070E2;
          text-align: center;
        }
        .right_mark {
          font-size: 14px;
          font-weight: 400;
          line-height: 19px;
          color: #AFB9C4;
          text-align: center;
          margin: 17px 0px 35px;
        }
      }
      .right_input {
        width: 380px;
        margin: 0 auto;
        /deep/ .el-input {
           margin-bottom: 26px;
          .el-input__inner {
            height: 38px;
            background-color: #F7F7F7;
            border: 1px solid #F7F7F7;
          }
        }
        
      }
      .right_check {
        width: 50px;
        margin: 0 auto;
      }
      .right_button {
        width: 320px;
        margin: 0 auto;
      }
    }
  }
  p {
    margin: 93px auto 41px;
    width: 241px;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    color: #A5ABBB;
    text-align: center;
  }
}
</style>