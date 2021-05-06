<!--
 * @Description: 聊天存档列表 ---- 聊天记录
 * @Author: mzr
 * @Date: 2021-04-28 14:27:48
 * @LastEditTime: 2021-05-04 21:01:22
 * @LastEditors: mzr
-->
<template>
  <div class="chat_record">
      <div class="record_top">
          <div class="top_action"><el-checkbox v-model="checkAction">只看员工发送</el-checkbox></div>
          <div class="top_total">共有36条"{{inputSearch}}"相关记录</div>
      </div>
      <div class="record_list">
           <el-table
                :data="recordList"
            >
                <el-table-column
                    prop="sender"
                    label="发送人">
                    <template slot-scope="scope">
                        <div class="table_wechat">
                            <div class="table_img">
                                <img v-if="scope.row.photoUrl" :src="scope.row.photoUrl" />
                                <div v-else class="not_img"><i class="element-icons el-icontupian1"></i></div>
                            </div>
                            <div class="table_item">
                                <div class="person_name">{{scope.row.senderName}}</div>
                                <div class="wechat_no">{{scope.row.senderWechat}}</div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="senderType"
                    label="发送人类型"
                >
                </el-table-column>
                <el-table-column
                    prop="chatType"
                    label="聊天类型">
                </el-table-column>
                <el-table-column
                    prop="chatContent"
                    label="消息内容"
                    >
                </el-table-column>
                <el-table-column
                    label="操作"    
                >
                    <template>
                        <el-button 
                            type="primary" 
                            round 
                            width="120"
                            @click="showDetail = true"
                            >详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
                background
                layout="prev, pager, next" 
                :total="50">
            </el-pagination>
      </div>

      <!-- 对话框 -->
      <el-dialog
        custom-class="chatDialog" 
        :visible.sync="showDetail"
        width="50%"
        height="75%"
        >
            <div slot="title" class="chat_dialog">
                <div class="title_img">
                    <img v-if="recordList.photoUrl" :src="recordList.photoUrl" />
                    <div v-else class="not_img"><i class="element-icons el-icontupian1"></i></div>
                </div>
                <span>{{recordList.senderName}}</span>
            </div>
            <!-- 内容 -->
            <div class="dialog_content">
                <div class="content_date">2021-3-29 16:20</div>
                <div v-for="(item, index) in detailData" :key="index" :class="item.type === 1?'left_message':'right_message'">
                    <!-- 发送方 -->
                    <div v-if="item.type === 2" class="sender_dialog_item">
                        <div class="sender_item_right">
                            <p>{{item.name}} {{item.contentTime}}</p>
                            <div class="sender_right_bubble">{{item.content}}</div>
                        </div>
                        <div class="sender_item_pic">
                            <img v-if="item.photoUrl" :src="item.photoUrl" />
                            <div v-else class="not_img"><i class="element-icons el-icontupian1"></i></div>
                        </div>
                    </div>
                    <!-- 接收方 -->
                    <div v-else class="dialog_item">
                        <div class="item_pic">
                            <img v-if="item.photoUrl" :src="item.photoUrl" />
                            <div v-else class="not_img"><i class="element-icons el-icontupian1"></i></div>
                        </div>
                        <div class="item_right">
                            <p>{{item.contentTime}} {{item.name}}</p>
                            <div class="right_bubble">{{item.content}}</div>
                        </div>
                    </div>
                </div>
            </div>
      </el-dialog>
  </div>
</template>

<script>
export default {
    props: {
        inputSearch: {
            type: String,
            default: () => "",
        }

    },
    data() {
        return {
            checkAction: false, // 多选框状态

            showDetail: false, // 聊天记录对话框

            // 聊天记录列表
            recordList: [
                {
                    senderName:"美少女战士",
                    senderWechat:"54564511YYY",
                    senderType:"客户",
                    chatType:"私聊",
                    chatContent:"要不要一起出去旅游，哈哈哈哈",
                    photoUrl:""
                },
                 {
                    senderName:"美少女战士",
                    senderWechat:"54564511YYY",
                    senderType:"客户",
                    chatType:"私聊",
                    chatContent:"要不要一起出去旅游，哈哈哈哈",
                    photoUrl:""
                },
                 {
                    senderName:"美少女战士",
                    senderWechat:"54564511YYY",
                    senderType:"客户",
                    chatType:"私聊",
                    chatContent:"要不要一起出去旅游，哈哈哈哈",
                    photoUrl:""
                }

            ],

            // 聊天记录详情
            detailData:[
                {
                    name:"多啦爱梦",
                    type:1,
                    contentTime:"16.20",
                    content:"嗨，你好！",

                },
                {
                    name:"美少女战士",
                    type:2,
                    contentTime:"16.21",
                    content:"你好！",

                },
                {
                    name:"多啦爱梦",
                    type:1,
                    contentTime:"16.21",
                    content:"美少女战士，认识你很高兴！",

                },
                {
                    name:"美少女战士",
                    type:2,
                    contentTime:"16.21",
                    content:"有多高兴？",

                },
                {
                    name:"美少女战士",
                    type:2,
                    contentTime:"16.22",
                    content:"哈哈，我也很高兴认识你",

                },
                {
                    name:"美少女战士",
                    type:2,
                    contentTime:"16.23",
                    content:"我想预定4月28号。重庆飞往西双版纳的机票",

                },
                {
                    name:"美少女战士",
                    type:2,
                    contentTime:"16.23",
                    content:"有儿童",

                },
                {
                    name:"多啦爱梦",
                    type:1,
                    contentTime:"16.24",
                    content:"好的",

                },

            ]
        }
    },
    methods:{
        
    },
    created() {

    }
}
</script>

<style lang="less" scoped>
.chat_record {
    .record_top {
        display: flex;
        align-items: center;
        padding:25px 38px;
        .top_total {
            font-size: 10px;
            color: lightgray;
            margin-left: 35%;
        }
    }
    .record_list {
        padding: 0px 30px;
        .table_wechat {
            display: flex;
            .table_item {
                .person_name {
                    font-size: 14px;
                }
                .wechat_no {
                    font-size: 12px;
                    color: #bfbfbf;
                }
            }
            .table_img {
                width: 45px;
                height: 45px;
                background-color: lightgray;
                margin-right: 10px;
                img {
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                }
                .not_img {
                    width: 100%;
                    height: 100%;
                    line-height: 45px;
                    text-align: center;
                }
        }
        // 分页
        .el-pagination {
            text-align: right;
            margin: 20px 15px;
        }
        }

        // 页数
        .el-pagination {
            text-align: right;
            margin: 20px 15px;
        }
        // 对话框
        .chatDialog {
            // 标题调整
            .chat_dialog {
                display: flex;
                align-items: center;
                .title_img {
                    width: 50px;
                    height: 50px;
                    margin-right: 10px;
                }
                span {

                }
            }
            .el-dialog__header {
                border-bottom: 1px solid lightgray;
                .el-dialog__headerbtn {
                    top:28px;
                    right:28px;
                    font-size: 23px;
                    font-weight: bold;
                }
            }
            // 内容
            .dialog_content {
                width:auto;
                overflow-y: auto;
                height: calc(100vh - 81px);
                .content_date {
                    color: lightgrey;
                    font-size: 10px;
                    display: flex;
                    justify-content: center;
                    padding-top:15px;
                }
                .left_message {
                    .dialog_item {
                        display: flex;
                        padding: 15px;
                        .item_pic {
                            width: 45px;
                            height: 45px;
                            background-color: lightgray;
                            margin-right: 10px;
                            margin-top: 20px;
                            img {
                                    width: 100%;
                                    height: 100%;
                                    object-fit: contain;
                            }
                            .not_img {
                                width: 100%;
                                height: 100%;
                                line-height: 45px;
                                text-align: center;
                            }
                        }
                        .item_right {
                            p {
                                color: lightgrey;
                                font-size: 10px;
                                margin-bottom: 5px;
                            }
                            .right_bubble {
                                border-radius: 0px 20px 20px 20px;
                                background-color: lightgray;
                                padding: 10px;
                                font-size: 14px;
                                min-width:100px;
                                max-width: 40%;
                                word-wrap: break-word;
                                word-break: break-all;
                            }
                        }
                        .withdraw {
                            color:red;
                            font-size:12px;
                            background-color: papayawhip;
                            padding: 5px;
                            margin: 6px 15px;
                        }
                    }
                }
                .right_message {
                    text-align: right;
                    .sender_dialog_item {
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                        padding: 15px;
                        .sender_item_pic {
                            width: 45px;
                            height: 45px;
                            background-color: lightgray;
                            margin-left: 10px;
                            img {
                                width: 100%;
                                height: 100%;
                                object-fit: contain;
                            }
                            .not_img {
                                width: 100%;
                                height: 100%;
                                text-align: center;
                                line-height: 45px;
                            }
                        }
                        .sender_item_right {
                            p {
                                color: lightgrey;
                                font-size: 10px;
                                // margin-bottom: 5px;
                            }
                            .sender_right_bubble {
                                border-radius: 20px 0px 20px 20px;
                                background-color: #409eff;
                                color:#fff;
                                font-size: 14px;
                                padding: 10px;
                                // min-width:100px;
                                // max-width: 40%;
                                // word-wrap: break-word;
                                // word-break: break-all;
                            }
                        }
                    }
                }
            }
        }

    }
}
</style>