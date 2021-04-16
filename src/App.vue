<template>
  <div id="weChatMonitor">
    <el-container>
      <el-header>
        <HeaderTemplate></HeaderTemplate>
      </el-header>
      <el-container>
        <el-aside width="250px">
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

<style lang="less" scoped></style>
