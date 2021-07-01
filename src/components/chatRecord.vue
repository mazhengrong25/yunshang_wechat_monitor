<!--
 * @Description: 聊天存档列表 ---- 聊天记录
 * @Author: mzr
 * @Date: 2021-04-28 14:27:48
 * @LastEditTime: 2021-06-18 10:33:29
 * @LastEditors: mzr
-->
<template>
    <div class="chat_record">
        <div class="record_top">
            <div class="top_action">
                <el-checkbox v-model="checkAction" @change="checkChange">只看员工发送</el-checkbox>
            </div>
            <div class="top_total">共有{{tablePage.pageTotal}}条"{{inputSearch}}"相关记录</div>
        </div>
        <!-- 列表 -->
        <div class="record_list">
            <el-table :data="recordList">
                <el-table-column min-width="50%" label="发送人">
                    <template slot-scope="scope">
                        <div class="table_wechat">
                            <div class="table_img">
                                <img v-if="scope.row.photoUrl" :src="scope.row.photoUrl" />
                                <div v-else class="not_img"><i class="element-icons el-icontupian1"></i></div>
                            </div>
                            <div class="table_item">
                                <div class="person_name">{{scope.row.name}}</div>
                                <div class="wechat_no">{{scope.row.userid}}</div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="sendType" label="发送人类型" min-width="40%">
                </el-table-column>
                <el-table-column prop="chatType" label="聊天类型" min-width="40%">
                </el-table-column>
                <el-table-column label="消息内容">
                    <template slot-scope="scope">
                        <div class="table_message">
                            <span v-for="(item, index) in scope.row.chatContent.split(inputSearch)" :key="index">{{item}}<span style="color: #409eff" v-if="index < scope.row.chatContent.split(inputSearch).length - 1">{{inputSearch}}</span></span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="30%">
                    <template slot-scope="scope">
                        <el-button type="primary" round @click="openDetail(scope.row)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination background layout="prev, pager, next" :total="tablePage.pageTotal" :page-size.sync="tablePage.pageSize" :current-page.sync="tablePage.pageCurrent" @current-change="changePageIndex">
            </el-pagination>
        </div>

        <!-- 对话框 -->
        <el-dialog custom-class="chatDialog" :visible.sync="showDetail" width="800px">
            <div slot="title" class="chat_dialog">
                <div class="title_img">
                    <img v-if="detailMessage.photoUrl" :src="detailMessage.photoUrl" />
                    <div v-else class="not_img"><i class="element-icons el-icontupian1"></i></div>
                </div>
                <div class="title_content">{{detailMessage.name}}</div>
            </div>
            <!-- 内容 -->
            <div class="dialog_content">
                <SituationChat v-bind:recordList="chatList"></SituationChat>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        // 搜索值
        inputSearch: {
            type: String,
            default: () => "",
        },
        department: {
            type: String,
            default: () => "",
        }

    },
    components: {

        SituationChat: () => import("./situationChat"), // 聊天对话
    },
    data() {
        return {
            checkAction: false, // 多选框状态

            showDetail: false, // 聊天记录对话框


            recordList: [], // 聊天记录列表

            tablePage: {
                pageTotal: 0,  // 表格总数
                pageSize: 8, // 每页大小
                pageCurrent: 1 // 当前页数
            },

            detailMessage: {}, // 表格每一条数据

            chatList: [], // 聊天记录数据

            thisPassnegerList: [], // userid集合

        }
    },
    methods: {

        // 只查看员工发送
        checkChange(e) {

            this.checkAction = e
            this.getChatList();

        },

        // 表格翻页
        changePageIndex() {
            this.getChatList()
        },

        // 获取列表
        getChatList() {
            let data = {
                pageIndex: this.tablePage.pageCurrent,
                pageSize: this.tablePage.pageSize,
                isStaff: this.checkAction ? '员工' : '',
                search: this.inputSearch,
                departmentId: this.department,
            }
            this.$axios.post('/GetChatSearchList', data).then((res) => {

                if (res.data.status === 0 && res.data.body.result.length > 0) {

                    this.recordList = res.data.body.result
                    this.tablePage = res.data.body
                    // 表格页数
                    this.tablePage.pageTotal = res.data.body.total
                    this.tablePage.pageSize = res.data.body.pageSize
                    this.tablePage.pageCurrent = res.data.body.pageIndex
                } else {
                    this.$message.error(res.data.message)
                }
            })
        },

        // 获取详细聊天   val 表格一条数据
        openDetail(val) {
            console.log('详情', val)
            // 对话框弹起 
            this.showDetail = true;
            this.detailMessage = val

            let data = {
                sessionid: val.sessionid,
                pageSize: 50,
                pageIndex: 1,
            }

            let passengerList = []

            this.$axios.post('/GetUserParticularChat', data).then((res) => {
                if (res.data.status === 0 && res.data.body.result.length > 0) {

                    let newRecordList = []
                    newRecordList = res.data.body.result

                    newRecordList.forEach(item => {

                        passengerList.push(item.from || item.to)
                        item['name'] = item.from                                         // 聊天对话组件 名字
                        item['type'] = item.from === this.detailMessage.userid ? 2 : 1   // 聊天对话组件 接收方还是发送方

                        // 转发对话框组件  群聊
                        if (item.contentType === 'mixed' && item.receiver.length > 1) {
                            item['groupMessageForward'] = true
                        }
                        // 转发对话框组件  单个
                        if (item.contentType === 'mixed' && item.receiver[0] !== this.detailMessage.userid) {
                            item['singleForward'] = true
                        }
                    })

                    // 去重
                    this.thisPassnegerList = [...new Set(passengerList)]
                    // 处理聊天对话组件
                    this.getUserMessageData('', newRecordList, 'from')
                        .then(text => {
                            this.chatList = text
                        })

                } else {

                    this.$message.error(res.data.message)
                }
            })
        },

        // 获取用户信息   e 群聊个人信息  
        getUserMessageData(e, val, type) {
            console.log(val, '传参')
            let data = {
                userid: e ? e.userid : String(this.thisPassnegerList)
            }
            return this.$axios.post('/GetAllUserList', data).then((res) => {

                if (res.data.status === 0 && res.data.body.length > 0) {

                    for (let i = 0; i < val.length; i++) {
                        for (let o = 0; o < res.data.body.length; o++) {
                            // 聊天对话组件 名字 头像
                            if (val[i][type] === res.data.body[o].userid) {
                                val[i]['name'] = res.data.body[o].name
                                val[i]['photoUrl'] = res.data.body[o].avatar
                            }
                            // 转发对话框组件 两个人
                            if (val[i].receiver && val[i].receiver.length > 0 && val[i].receiver[0] === res.data.body[o].userid) {
                                val[i]['masterName'] = res.data.body[o].name
                            }
                        }
                    }

                    return val

                } else {
                    this.$message.error(res.data.message)
                }
            })
        },


    },
    created() {
        this.getChatList()
    }
}
</script>

<style lang="less" scoped>
.chat_record {
    .record_top {
        display: flex;
        align-items: center;
        padding: 25px 38px;
        .top_total {
            font-size: 10px;
            color: #999;
            margin-left: 35%;
        }
        .top_action {
            /deep/ .el-checkbox__input.is-checked .el-checkbox__inner,
            .el-checkbox__input.is-indeterminate .el-checkbox__inner {
                background-color: #0070e2;
                border-color: #0070e2;
            }

            /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
                color: #0070e2;
            }
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
        .table_message {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        // 页数
        .el-pagination {
            text-align: right;
            margin: 20px 15px;
        }
        // 详情按钮样式
        /deep/ .el-button {
            width: 96px;
            height: 38px;
        }
    }
    // 对话框
    .chatDialog {
        // 标题调整
        .chat_dialog {
            display: flex;
            align-items: center;
            .title_img {
                width: 45px;
                height: 45px;
                margin-right: 10px;
                background-color: lightgray;
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
            .title_content {
                font-size: 16px;
            }
        }
        .el-dialog__header {
            border-bottom: 1px solid lightgray;
            .el-dialog__headerbtn {
                top: 28px;
                right: 28px;
                font-size: 23px;
                font-weight: bold;
            }
        }
        // 内容
        .dialog_content {
            width: auto;
            overflow-y: auto;
            height: 60vh;
        }
    }
}
</style>