<!--
 * @Description: 侧边栏
 * @Author: wish.WuJunLong
 * @Date: 2021-04-15 16:44:46
 * @LastEditTime: 2021-05-19 16:02:55
 * @LastEditors: mzr
-->
<template>
  <div class="global_aside">
    <!-- <div class="aside_list">
      <div class="list_title">企业风控</div>
      <div class="list_item">
         <div class="item_name" style="color:#fff">聊天存档</div>
         <div class="item_name" @click="open">违规操作</div>
         <div class="item_name" @click="open">流失提醒</div>
      </div>

    </div> -->

     <el-menu 
        default-active="1"
        background-color="#545c64"
        text-color="#999"
        active-text-color="#fff"
        router
      >
        <el-menu-item index="/">
          <template slot="title">
            <div class="title_item">
              <div class="archive_img"></div>
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
  // background: #393c3e;
  width: 100%;
  height: 100%;
  // .aside_list{
  //   &:not(:last-child){
  //     margin-bottom: 20px;
  //   }
  //   .list_title{
  //     color: #fff;
  //     font-size: 16px;
  //     margin-bottom: 20px;
  //   }
  //   .list_item{
  //     .item_name{
  //       color: #999;
  //       display: inline-block;
  //       margin-bottom: 20px;
  //       cursor: pointer;
  //       &:not(&:nth-child(even)){
  //         margin-right: 20px;
  //       }
  //       &:hover{
  //         color: #fff;
  //       }
  //     }
  //   }
  // }
  /deep/ .el-menu {
    width: 100% !important;
    height: 100% !important; 
    .el-menu-item is-active {
      .archive_img {
        background: url("../static/archive.png")
        no-repeat center center !important;
        background-size: contain !important;
      }
    }
    .el-menu-item {
      display: flex;
      justify-content: center;
      font-size: 16px;
      .el-submenu__title {
        margin: 17px;
      }
      .title_item {
        display: flex;
        .archive_img {
          width: 16px;
          background: url("../static/archive.png")
          no-repeat center center !important;
          background-size: contain !important;
        }
        .violation_img {
          width: 16px;
          background: url("../static/violation.png")
          no-repeat center center !important;
          background-size: contain !important;
        }
        .remind_img {
          width: 16px;
          background: url("../static/remind.png")
          no-repeat center center !important;
          background-size: contain !important;
        }
        span {
          padding-left: 10px;
        }
      }
    }
  }
}
</style>
