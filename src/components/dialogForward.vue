<!--
 * @Description: ；聊天对话框记录 --- 转发 含图片、视频
 * @Author: mzr
 * @Date: 2021-05-10 14:39:33
 * @LastEditTime: 2021-05-25 18:27:05
 * @LastEditors: mzr
-->
<template>
    <div class="dialog_forward"
      
    >
        <div class="forward_box" @click="openforward">
            
            <p>{{dialogList.receiver['0']}}和{{dialogList.name}}的聊天记录</p>

            <div v-for="item in 3" :key="item">
                <p v-if="forwardList[item] && forwardList[item].type === 'emotion'">AAA:[自定义表情]</p>
                <p v-if="forwardList[item] && forwardList[item].type === 'image'">AAA:[图片]</p>
                <p v-if="forwardList[item] && forwardList[item].type === 'text'">AAA:{{item.content}}</p>
            </div>
           
        </div> 
        

        <!-- 转发消息对话框 -->
        <el-dialog
            custom-class="forwardDialog"
            :visible.sync="showDialog"
            width="520px"
            append-to-body
            center
        >
            
            <div slot="title" class="forward_title">{{dialogList.receiver['0']}}和{{dialogList.name}}的聊天记录</div>
            <!-- 消息列表 -->
            <div class="forward_content">
                <div class="content_list"
                    v-for="(oitem,oindex) in forwardList" :key="oindex"
                >
                    <div class="list_title">{{dialogList.name}} {{dialogList.contentTime}}</div>
                    <div class="list_input">

                        <el-image
                            v-if="oitem.type === 'image'"
                            fit="contain" 
                            :src="$imgUrl + JSON.parse(oitem.content).resourcePath" 
                        ></el-image>
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
    props:{
        dialogList: {
            type: Object,
            default: () => {},
        }
    },
    data() {
        return {
            showDialog:false, // 转发对话框
            forwardList:[], // 转发列表
        }
    },
    methods:{
        // 打开转发对话框
        openforward() {
            this.showDialog = true; 
        }
    },

    mounted(){
        this.forwardList = JSON.parse(this.dialogList.content).item
        console.log('this.forwardList',this.forwardList)
    }
  
    
}
</script>

<style lang="less" scoped>
.dialog_forward {
    .forward_box {
        cursor: pointer;
        overflow: hidden;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 3;
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
}
</style>