<!--
 * @Description: 侧边栏
 * @Author: wish.WuJunLong
 * @Date: 2021-04-15 16:44:46
 * @LastEditTime: 2021-05-04 15:01:21
 * @LastEditors: mzr
-->
<template>
  <div class="global_aside">
    <div class="aside_list">
      <div class="list_title">企业风控</div>
      <div class="list_item">
         <div class="item_name">聊天存档</div>
         <div class="item_name">违规操作</div>
         <div class="item_name">流失提醒</div>
      </div>


    </div>


  </div>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {};

  },
  methods: {

    // 跳转到聊天存档
    // openChat() {
    //     this.$router.push({
    //       name: 'Index',
    //       path: "/index",
    //     });
    // }
  }
   
};
</script>

<style lang="less" scoped>
.global_aside {
  background: #393c3e;
  width: 100%;
  height: 100%;
  padding: 24px;
  .aside_list{
    &:not(:last-child){
      margin-bottom: 20px;
    }
    .list_title{
      color: #fff;
      font-size: 16px;
      margin-bottom: 20px;
    }
    .list_item{
      .item_name{
        color: #999;
        display: inline-block;
        margin-bottom: 20px;
        cursor: pointer;
        &:not(&:nth-child(even)){
          margin-right: 20px;
        }
        &:active{
          color: #fff;
        }
      }
    }
  }
}
</style>
