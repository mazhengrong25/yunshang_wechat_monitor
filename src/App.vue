<!--
 * @Description: 
 * @Author: mzr
 * @Date: 2021-04-16 10:22:50
 * @LastEditTime: 2022-04-13 13:53:39
 * @LastEditors: mzr
-->
<template>
    <div id="weChatMonitor">
        <el-container>
            <el-header v-if="this.$router.history.current.name !== 'Login'">
                <HeaderTemplate></HeaderTemplate>
            </el-header>
            <el-container>
                <el-aside width="200px" v-if="this.$router.history.current.name !== 'Login'">
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
        AsideTemplate: () => import("./components/Aside.vue"), // 侧边栏
    },

    mounted() {
        console.log(this.$router.history.current.name)
    }
};
</script>

<style lang="less" scoped>
// html5 新属性 限制样式只在当前组件生效
.el-container {
    .el-main {
        overflow: hidden;
    }
}
</style>
