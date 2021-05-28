<!--
 * @Description: ；聊天对话框记录 --- 转发 含图片、文字
 * @Author: mzr
 * @Date: 2021-05-10 14:39:33
 * @LastEditTime: 2021-05-26 16:17:59
 * @LastEditors: mzr
-->
<template>
    <div class="dialog_forward">
        <div class="forward_box" @click="openforward">

            <p>{{dialogList.receiver['0']}}和{{dialogList.name}}的聊天记录</p>

            <div class="box_item" v-for="item in numberList" :key="item">
                <p v-if="forwardList[item] && forwardList[item].type === 'emotion'">{{dialogList.name}}:[自定义表情]</p>
                <p v-if="forwardList[item] && forwardList[item].type === 'image'">{{dialogList.name}}:[图片]</p>
                <p class="item_text" v-if="forwardList[item] && forwardList[item].type === 'text'">{{dialogList.name}}:{{JSON.parse(forwardList[item].content).content}}</p>

            </div>

        </div>

        <!-- 转发消息对话框 -->
        <el-dialog custom-class="forwardDialog" :visible.sync="showDialog" width="520px" append-to-body center>

            <div slot="title" class="forward_title">{{dialogList.receiver['0']}}和{{dialogList.name}}的聊天记录</div>
            <!-- 消息列表 -->
            <div class="forward_content">
                <div class="content_list" v-for="(oitem,oindex) in forwardList" :key="oindex">
                    <div class="list_title">{{dialogList.name}} {{dialogList.contentTime}}</div>
                    <div class="list_input">

                        <el-image v-if="oitem.type === 'image'" fit="contain" :src="$imgUrl + JSON.parse(oitem.content).resourcePath"></el-image>
                        <div v-else-if="oitem.type === 'emotion'">[自定义表情]</div>
                        <div v-else class="input_customize">{{JSON.parse(oitem.content).content}}</div>
                    </div>
                </div>
            </div>

        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        // 返回聊天对话
        dialogList: {
            type: Object,
            default: () => {},
        }
    },
    data() {
        return {
            showDialog: false, // 转发对话框
            forwardList: [], // 转发列表
            numberList: [0,1,2], // 展示三条数据  从0开始
        }
    },
    methods: {
        // 打开转发对话框
        openforward() {
            this.showDialog = true;
        }
    },

    mounted() {
        this.forwardList = JSON.parse(this.dialogList.content).item
        console.log(this.dialogList, this.forwardList)
    }


}
</script>

<style lang="less" scoped>
.dialog_forward {
    .forward_box {
        cursor: pointer;
        .box_item {
            .item_text {
                max-width: 150px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
    }
}
// 对话框
.forwardDialog {
    .forward_title {
    }
    .forward_content {
        .content_list {
            // padding-bottom: 20px;
            border-bottom: 2px solid #e4e7ed;
            .list_title {
            }
            .list_input {
                margin: 10px auto;
                .input_customize {
                    font-weight: bold;
                }
            }
        }
    }
}
</style>