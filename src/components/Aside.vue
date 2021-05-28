<!--
 * @Description: 侧边栏
 * @Author: wish.WuJunLong
 * @Date: 2021-04-15 16:44:46
 * @LastEditTime: 2021-05-27 11:17:46
 * @LastEditors: mzr
-->
<template>
  <div class="global_aside">
     <el-menu 
        default-active="/index"
        background-color="#545c64"
        text-color="#999"
        active-text-color="#fff"
        router
      >
        <el-menu-item index="/index">
          <template slot="title">
            <div class="title_item">
              <div class="archive_img" />
              <span>聊天存档</span>
            </div>
          </template>
        </el-menu-item>
        <el-menu-item 
          @click="open"
          index="1"
        >
          <template slot="title">
            <div class="title_item">
              <div class="violation_img"></div>
              <span>违规操作</span>
            </div>
          </template>
        </el-menu-item>
        <el-menu-item 
          @click="open"
          index="2"
        >
          <template slot="title">
            <div class="title_item">
              <div class="remind_img"></div>
              <span>流失提醒</span>
            </div>
          </template>
        </el-menu-item>
      </el-menu>

  </div>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {};

  },
  methods: {
    open() {
       this.$message('功能待开发，请敬请期待');
    }
  }
   
};
</script>

<style lang="less" scoped>
.global_aside {
  width: 100%;
  height: 100%;
  /deep/ .el-menu {
    width: 100% !important;
    height: 100% !important; 
    background-color: #2E323E !important;
    .el-menu-item {
      display: flex;
      justify-content: center;
      font-size: 16px;
      background-color: #2E323E !important;
      .el-submenu__title {
        margin: 17px;
      }
      .title_item {
        display: flex;
        align-items: center;
        .archive_img {
          width: 16px;
          height: 16px;
          background: url("../static/archive.png") no-repeat center center;
          background-size: contain;
        }
        .violation_img {
          width: 16px;
          height: 16px;
          background: url("../static/violation.png") no-repeat center center;
          background-size: contain;
        }
        .remind_img {
          width: 16px;
          height: 16px;
          background: url("../static/remind.png") no-repeat center center;
          background-size: contain;
        }
        span {
          padding-left: 10px;
        }
      }
    }
    .is-active {
      .title_item {

        .archive_img {
          width: 16px;
          height: 16px;
          background: url("../static/archive_active.png") no-repeat center center;
          background-size: contain;
        }
        .violation_img {
          width: 16px;
          height: 16px;
          background: url("../static/violation_active.png") no-repeat center center;
          background-size: contain;
        }
        .remind_img {
          width: 16px;
          height: 16px;
          background: url("../static/remind_active.png") no-repeat center center;
          background-size: contain;
        }
      }
    }
  }
}
</style>
