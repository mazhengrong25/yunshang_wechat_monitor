<!--
 * @Description: 搜索聊天记录 --- 搜索内容
 * @Author: mzr
 * @Date: 2021-05-20 15:59:08
 * @LastEditTime: 2022-04-25 16:09:03
 * @LastEditors: mzr
-->
<template>
    <div class="search_content">
        <div class="search_top">共查询到{{recordList.length}}条结果</div>
        <div class="search_list">
            <div class="list_item" v-for="(item,index) in recordList" :key="index" @click="jumpContent(item)">
                <div class="item_left">
                    <div class="left_name">{{item.sendChatName}} {{$moment(Number(item.sendDate)).format('YYYY-MM-DD')}}</div>

                    <div class="left_content">
                        <span v-for="(oitem, oindex) in item.chatContent.split(recordSearch)" :key="oindex">{{oitem}}<span style="color: #409eff" v-if="oindex < item.chatContent.split(recordSearch).length - 1">{{recordSearch}}</span></span>
                    </div>
                </div>
                <i class="element-icons el-icondayuhao"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {

        // 列表数据
        recordList: {
            // 记录：
            // type 数据类型
            // required 必须传递的值  required: true
            // default 默认值

            // vue 组件之间传值 $emit 子传父  $refs 父传子  $on 相互传递
            type: Array,
            default: () => []
        },
        // 搜索值
        recordSearch: {
            type: String,
            default: () => ''
        }

    },
    data() {
        return {

        }
    },
    methods: {
        // 搜索到聊天记录位置
        jumpContent(e) {
            this.$emit('jumpContent', e);
        }
    }
}
</script>

<style lang="less" scoped>
.search_content {
    .search_top {
        display: flex;
        justify-content: center;
        font-size: 10px;
        color: #999;
        padding: 20px;
    }
    .search_list {
        height: 45vh;
        overflow: auto;

        .list_item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #e4e7ed;
            padding: 0px 10px;
            cursor: pointer;
            .item_left {
                .left_name {
                }
                .left_content {
                    margin: 15px 0px 10px;
                    // max-width: 80%;
                }
            }
        }
    }
}
</style>