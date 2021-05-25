<!--
 * @Description: 
 * @Author: mzr
 * @Date: 2021-04-16 10:22:50
 * @LastEditTime: 2021-05-24 14:45:27
 * @LastEditors: mzr
-->
<template>
  <div id="weChatMonitor">
    <el-container>
      <el-header>
        <HeaderTemplate></HeaderTemplate>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <AsideTemplate></AsideTemplate>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "weChatMonitor",
  components: {
    HeaderTemplate: () => import("./components/Header.vue"), // 导航栏
    AsideTemplate: () => import("./components/Aside.vue"),
  },
};
</script>

<style lang="less" scoped>
.el-container {
    .el-main {
      overflow: hidden;
    }
}
</style>
