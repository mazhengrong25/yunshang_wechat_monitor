<!--
 * @Description: 导航栏
 * @Author: wish.WuJunLong
 * @Date: 2021-04-15 15:12:11
 * @LastEditTime: 2021-04-15 16:00:29
 * @LastEditors: wish.WuJunLong
-->
<template>
  <div class="global_header">
    <div class="header_title">云上企微监控</div>

    <div class="account_option">
      <el-dropdown trigger="click" placement="bottom-end">
        <div class="account_message">
          用户名称<i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-close">退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "global_header",
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.global_header {
  height: 100%;
  background: #545c64;
  display: flex;
  align-items: center;
  padding: 0 24px;
  color: #fff;
  .header_title {
    font-size: 20px;
    letter-spacing: 2px;
  }
  .account_option {
    margin-left: auto;
    height: 100%;
    /deep/.el-dropdown{
      height: 100%;
    }
    .account_message{
      color: #fff;
      height: 100%;
      line-height: 60px;
      cursor: pointer;
      padding: 0 20px;
    }
  }
}
</style>
