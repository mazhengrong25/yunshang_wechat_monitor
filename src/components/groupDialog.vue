<!--
 * @Description: 群聊列表 个人信息展示
 * @Author: mzr
 * @Date: 2021-05-27 10:23:29
 * @LastEditTime: 2021-05-28 11:36:13
 * @LastEditors: mzr
-->
<template>

  <!-- <el-dialog
        custom-class="groupDialog" 
        width="800px"
        :visible.sync="showDialog"
        :before-close="closeDialog"
    >
        <div slot="title" class="group_dialog">
            <div class="title_img">
                <img v-if="titleMessage.avatar" :src="titleMessage.avatar" />
                <div v-else class="not_img"><i class="element-icons el-icontupian1"></i></div>
            </div>
            <div class="title_content">{{titleMessage.name}}</div>
        </div>
        <div class="group_content">
            
        </div>
    </el-dialog> -->
    
    <el-popover  popper-class="group_dialog_popper" placement="right-start" trigger="click"  :v-model="showDialog">
        <!-- <div>123</div> -->
        <div slot="title"  class="group_title"></div>
    </el-popover>
    
    
</template>

<script>
export default {
    props: {
        // 显示
        showDialog: {
            type: Boolean,
            default: () => false
        },
        // 表头个人信息
        titleMessage: {
            type: Object,
            default: () => {}
        }
       
    },
    data() {
        return {
            
        }
    },
    methods: {
        // 子组件关闭   关闭前的回调
        closeDialog(){
            this.$emit('closeModal')
        }
    },

    // mounted(){
    //     console.log(this.showDialog)
    // }
}
</script>

<style lang="less" scoped>
.group_dialog_popper {

}
// .groupDialog {
//     .group_dialog {
//         display: flex;
//         align-items: center;
//         .title_img {
//             width: 45px;
//             height: 45px;
//             margin-right: 10px;
//             background-color: lightgray;
//             img {
//                 width: 100%;
//                 height: 100%;
//                 object-fit: cover;
//             }
//             .not_img {
//                 width: 100%;
//                 height: 100%;
//                 line-height: 45px;
//                 text-align: center;
//             }
//         }
//         .title_content {
//             font-size: 16px;
//         }
//     }
//     .group_content {
        
//     }
// }

</style>