<!--
 * @Description: 对话框  ---  标记 下载聊天对话
 * @Author: mzr
 * @Date: 2021-06-02 16:47:40
 * @LastEditTime: 2021-07-05 15:47:55
 * @LastEditors: mzr
-->
<template>
  <div>
    <el-dialog 
      custom-class="dialogDemo"
      top="30vh" 
      width="400px"
      :title= dialogTitle
      :visible="showDialog"
      :before-close="closeDialog"
    >
          <div v-if="dialogType">

            <div class="tag_dialog">
                <el-input type="textarea" :rows="6" placeholder="多行输入" v-model="tagContent" clearable></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="closeDialog">保 存</el-button>
            </span>
          </div>
          <div v-else>
            <div class="load_dialog">
              <el-date-picker v-model="starTime" type="date" placeholder="开始日期"></el-date-picker> - <el-date-picker v-model="endTime" type="date" placeholder="结束日期"></el-date-picker>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="closeDialog">取 消</el-button>
              <el-button type="primary" @click="closeDialog">下 载</el-button>
            </span>
          </div>
        
    </el-dialog>

    
  </div>

</template>

<script>
export default {
  props: {
    // 标题
    dialogTitle : {
      type:String,
      default: () => ""
    },
    // 打开对话框
    showDialog : {
      type:Boolean,
      default: () => false
    },
    // 区分标记和下载   true 标记
    dialogType : {
      type:Boolean,
      default: () => false
    },

  },
  data() {
    return {
      
        starTime: "", //  开始时间
        endTime: "", // 结束时间 

        tagContent:"", // 标记内容
    }
  },
  methods: {
      // 子组件关闭   关闭前的回调
      closeDialog(){
          this.$emit('closeModal')
      },

  }
}
</script>

<style lang="less" scoped>
.dialogDemo {
  .load_dialog {
    display: flex;
    justify-content: center;
    align-items: center;
    .el-date-editor.el-input,
        .el-date-editor.el-input__inner {
            width: 160px;
        }
  }

  .dialog-footer {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    .el-button {
      border-radius: 20px;
      padding: 12px 60px;
    }
    .el-button--default {
      background-color: lightgray;
    }
  }
  
  .el-dialog__body {
    text-align: center;
  }


}
</style>