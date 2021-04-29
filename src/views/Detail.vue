<!--
 * @Description: 聊天记录详情
 * @Author: mzr
 * @Date: 2021-04-25 11:05:51
 * @LastEditTime: 2021-04-29 11:52:13
 * @LastEditors: mzr
-->
<template>
    <div class="detail">
        <div class="detail_top">
            <div class="top_title">聊天存档</div>
        </div>
        <div class="detail_content">
            <div class="content_left">
                <div class="left_back" @click="goList()">
                    <div class="left_back_item">
                        <div class="back_image"></div>
                        <div class="back_explain">
                            <div class="explain_name">{{userMessage.name}}</div>
                            <div class="explain_dep">信息中心</div>
                        </div>
                    </div>
                    <div class="right_icon">
                        <i class="el-icon-arrow-right"></i>
                    </div>
                </div>
                <div v-if="status === '3'">
                    <div class="group_pane">
                        <el-tabs v-model="activeGroupName">
                            <el-tab-pane label="员工" name="staff">
                                <div class="staff_content_list">
                                    <span>群内共有12个客户</span>
                                    <div class="staff_list_item"
                                        v-for="(item,index) in groupList"
                                        :key="index"
                                    >
                                        <div class="item_top">
                                            <img class="top_image" />
                                            <div class="top_name">
                                                <div class="first_name">{{item.firstName}}</div>
                                                <div class="nick_name">{{item.staffNo}}</div>
                                            </div>
                                           
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="客户" name="client">
                                <div class="client_content_list">

                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
                <!-- 员工 客户列表 -->
                <div v-else>
                    <div class="left_query">
                        <el-input style="width:200px" placeholder="搜索" clearable v-model="inputSearch">
                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                        <span>搜索</span>
                    </div>
                    <div class="left_tabs">
                        <el-tabs v-model="activeName">
                            <el-tab-pane label="全部" name="all">
                                <div class="pane_all_list">
                                    <span>共有{{this.chatList.length}}条会议</span>
                                    <div class="left_conver_list" 
                                        v-for="(item,index) in chatList" :key="index"
                                        @click="chatDetal()">
                                        <div class="list_item">
                                            <img class="item_img" :src="item.photoUrl" />
                                            <div class="item_right">
                                                <div class="item_top">
                                                    <div class="top_name">{{item.name}}</div>
                                                    <div class="top_time">{{item.endTime}}</div>
                                                </div>
                                                <div class="item_bottom">{{item.endChatContent}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="私聊" name="private">私聊</el-tab-pane>
                            <el-tab-pane label="群聊" name="group">群聊</el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </div>
            <div class="content_right">
                <div class="right_action">
                    <div class="right_action_item">
                        <div class="action_icon"></div>
                        <div class="action_title">联系人已同意聊天记录存档</div>
                        <div class="action_message"
                            v-if="status === '1'" 
                            @click="showTag = true"
                        ><i class="el-icon-share"></i></div>
                    </div>
                    <div class="right_action_item">
                        <div class="action_load" @click="showLoad = true"><i class="el-icon-download"></i>下载</div>
                        <div class="action_search">
                            <el-button slot="reference" type="primary" @click="showRecord = true">搜索记录</el-button>
                        </div >
                        <div class="action_client" 
                            v-if="status === '2'"
                            @click="showGroup = true"
                        ><i class="el-icon-user"></i></div>
                    </div>
                </div>

                <div class="right_content">
                    <div class="content_date">2021-3-29 16:20</div>
                    <div v-for="(item, index) in recordList" :key="index" :class="item.type === 1?'left_message':'right_message'">
                        <!-- 发送方 -->
                        <div v-if="item.type === 2" class="sender_dialog_item">
                            <div class="sender_item_right">
                                <p>{{item.name}} {{item.contentTime}}</p>
                                <div class="sender_right_bubble">{{item.content}}</div>
                            </div>
                            <img class="sender_item_pic" :src="item.photoUrl" />
                        </div>
                        <!-- 接收方 -->
                        <div v-else class="dialog_item">
                            <img class="item_pic" :src="item.photoUrl" />
                            <div class="item_right">
                                <p>{{item.contentTime}} {{item.name}}</p>
                                <div class="right_bubble">{{item.content}}</div>
                            </div>
                            <!-- <div 
                                class="withdraw"
                                v-if="!item.status">此消息已撤回</div> -->
                        </div>
                    
                    </div>
                </div>

            </div>
        </div>

        <!--
            ------------员工------------ 
            标记内容对话框-->  
        <el-dialog custom-class="tagDialog" title="添加标记内容" :visible.sync="showTag" width="30%">
            <div class="tag_dialog">
                <el-input placeholder="多行输入" v-model="tagContent" clearable></el-input>
            </div>
            <span slot="footer" class="dialog-footer" center>
                <el-button @click="showTag = false">取 消</el-button>
                <el-button type="primary" @click="showTag = false">保 存</el-button>
            </span>
        </el-dialog>

        <!-- 
            ------------员工------------
            下载聊天记录对话框 -->
        <el-dialog custom-class="loadDialog" title="下载聊天记录" :visible.sync="showLoad" width="30%">
            <div class="load_dialog">
                <el-date-picker v-model="starTime" type="date" placeholder="开始日期"></el-date-picker> -

                <el-date-picker v-model="endTime" type="date" placeholder="结束日期"></el-date-picker>
            </div>
            <span slot="footer" class="dialog-footer" center>
                <el-button @click="showLoad = false">取 消</el-button>
                <el-button type="primary" @click="showLoad = false">下 载</el-button>
            </span>
        </el-dialog>

        <!--
            ------------员工------------ 
            搜索记录对话框 -->
        <el-dialog 
            custom-class="recordDialog" 
            title="搜索聊天记录" 
            :visible.sync="showRecord" 
            width="30%" 
            height="80%"
            :modal='false'
            >
            <div class="record_dialog">

                <div class="record_search">
                    <el-input style="width:400px" placeholder="搜索" clearable v-model="recordSearch">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                    <span>搜索</span>
                </div>

                <div class="record_tags">
                    <el-tabs v-model="activeRecordName">
                        <el-tab-pane label="日历" name="calendar">
                            <el-calendar v-model="calendarValue"></el-calendar>
                        </el-tab-pane>
                        <el-tab-pane label="图片/视频" name="picture">
                            <div class="record_tags_image">
                                <div class="image_date">2021-3-26</div>
                                <div class="image_list" v-for="(item,index) in picList" :key="index">
                                    <div class="image_item">
                                        <div class="image_self"></div>
                                        <div class="image_source">{{item.person}}</div>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="文件" name="file">
                            <div class="record_tags_file">
                                <div class="file_date">2021-3-26</div>
                                <div class="file_list" v-for="(item,index) in fileList" :key="index">
                                    <div class="list_item">
                                        <div class="item_img"></div>
                                        <div class="item_right">
                                            <div class="item_top">
                                                <div class="top_name">{{item.name}}{{item.format}}</div>
                                                <div class="top_time">{{item.size}}</div>
                                            </div>
                                            <div class="item_bottom">{{item.source}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="链接" name="link">
                            <div class="record_tags_link">
                                <div class="link_date">2021-3-26</div>
                                <div class="link_list" v-for="(item,index) in linkList" :key="index">
                                    <div class="link_add">{{item.address}}</div>
                                    <div class="link_source">{{item.source}}</div>
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>

            </div>
        </el-dialog>
    
        <!-- 
            ------------客户------------
            查看群成员对话框 -->
        <el-dialog 
            custom-class="groupDialog" 
            title="查看群成员" 
            :visible.sync="showGroup" 
            width="30%" 
            height="80%"
            :modal='false'
            >
            <div class="group_dialog">
                <div class="group_radio">
                    <el-radio-group v-model="radioGroup">
                        <el-radio-button :label="1">员工(23)</el-radio-button>
                        <el-radio-button :label="2">客户(6)</el-radio-button>
                    </el-radio-group>
                </div>
                <div class="group_list">
                    <div class="list_item">
                        
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userMessage: {}, // 用户信息
            
            status:"", // 列表状态

            inputSearch: "", // 搜索值
            tagContent: "", // 标记内容
            recordSearch: "", // 搜索记录对话框搜索值

            activeName: "all", // 标签页
            activeGroupName: "staff", // 群  标签页
            activeRecordName: "calendar", // 搜索记录 标签页


            showTag: false, // 标记内容对话框
            showRecord: false, // 搜索记录对话框
            showLoad: false, // 下载对话框
            showGroup:  false, // 群成员对话框

            calendarValue: new Date(), // 日历

            starTime: "", // 下载聊天记录  开始时间
            endTime: "", // 下载聊天记录 结束时间 

            radioGroup:"1", // 查看群成员 

            // 聊天记录 （员工 客户）
            chatList: [
                {
                    name: "",  // 名字
                    endTime: "", // 时间
                    endChatContent: "" // 聊天内容
                }
            ],

            // 聊天记录  （群）
            groupList:[
                {   
                    firstName:"岚", // 姓名
                    staffNo:"7915", // 工号
                    label:"重要客户", // 客户 标签
                    depart:"信息中心",
                }
            ],

            // 文件列表
            fileList: [
                {
                    name: "秘密花园",
                    format: "word",
                    source: "美少女战士",
                    size: "2.6M"
                },
                {
                    name: "秘密花园",
                    format: "word",
                    source: "美少女战士",
                    size: "2.6M"
                },
                {
                    name: "秘密花园",
                    format: "word",
                    source: "美少女战士",
                    size: "2.6M"
                }
            ],

            // 聊天记录界面
            recordList: [
                {
                    name:"", // 姓名
                    type:"", // 发送方 1  接收方 2
                    contentTime:"", // 时间
                    content:"", // 内容
                    photoUrl:"", // 头像图片
                }
            ],

            // 链接列表
            linkList: [
                {
                    address: "地址地址",
                    source: "美少女战士"

                },
                {
                    address: "地址地址",
                    source: "美少女战士"

                },
                {
                    address: "地址地址",
                    source: "美少女战士"

                }
            ],

            // 图片视频
            picList: [
                {
                    person: "美少女战士"
                },
                {
                    person: "美少女战士"
                }
            ]
        }
    },
    methods: {
        // 返回上一个页面
        goList() {
            this.$router.go(-1);
        },

        // 获取聊天记录
        chatDetal() {
            // let data = {
            //     sessionid: this.chatList.group,
            //     pageSiz:20,
            //     pageIndex:1
            // }
            // this.$axios.post('/WxChat/GetUserChat',data).then((res) => {
            //     if(res.data.status === 0 && res.data.body.result.length > 0) {
            //         res.data.body.result.forEach(item => {
                        
            //             item['type'] = item.name === this.userMessage.name && item.userid  === this.userMessage.userid? 2: 1
                        
            //         })
            //         this.recordList = res.data.body.result
            //     }
            // })
        }
    },
    created() {

        this.status = this.$route.query.type // 聊天记录类型
        this.userMessage = this.$route.query // 用户信息
   
        // let data = {
        //     from: this.userMessage.userid
        // }
        // this.$axios.post('/WxChat/GetUserList',data).then((res) => {
        //     if(res.data.status === 0 && res.data.body.length > 0) {
        //         this.chatList = res.data.body
        //     }else {
        //         this.$message.error(res.data.message)
        //     }
        // })
    }
}
</script>

<style lang="less" scoped>
.detail {
    height: calc(100vh - 60px);
    .detail_top {
        padding: 17px;
        border-bottom: 1px solid #d0d0d0;
        .top_title {
            font-size: 16px;
            font-weight: bold;
            color: #101010;
        }
    }
    .detail_content {
        display: flex;
        width: 100%;
        .content_left {
            width: 20%;
            border-right: 1px solid #d0d0d0;
            .left_back {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 17px;
                border-bottom: 1px solid #d0d0d0;
                cursor: pointer;
                .left_back_item {
                    display: inline-flex;
                    .back_image {
                        width: 45px;
                        height: 45px;
                        background-color: lightgray;
                        text-align: center;
                    }
                    .back_explain {
                        margin-left: 10px;
                        .explain_name {
                            font-weight: bold;
                            padding-bottom: 6px;
                        }
                        .explain_dep {
                            font-size: 10px;
                            color: slategray;
                        }
                    }
                }
            }
            .left_query {
                height: 45px;
                display: flex;
                justify-content: space-around;
                align-items: center;
                background-color: lightgray;
                span {
                    font-size: 14px;
                }
            }
            .left_tabs {
                .pane_all_list {
                    padding: 10px 0px 0px 9px;
                    span {
                        color: lightgrey;
                        font-size: 10px;
                    }
                    .left_conver_list {
                        // height: calc(100vh - 95px);
                        overflow-y: auto;
                        &:not(:last-child) {
                            margin: 15px 10px;
                        }
                        &:hover {
                            cursor: pointer;
                            background-color: #fff;
                        }
                        .list_item {
                            display: flex;
                            width: 100%;
                            padding: 5px;
                            .item_img {
                                width: 60px;
                                height: 60px;
                                background-color: lightgray;
                            }
                            .item_right {
                                width: 80%;
                                padding: 0px 15px;
                                .item_top {
                                    &:not(:last-child) {
                                        margin-bottom: 23px;
                                    }
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    .top_name {
                                        font-weight: bold;
                                    }
                                    .top_time {
                                        font-size: 12px;
                                        color: lightgrey;
                                    }
                                }
                                .item_bottom {
                                    font-size: 10px;
                                    color: slategray;
                                }
                            }
                        }
                    }
                }
                /deep/ .el-tabs__item {
                    padding: 0 33px;
                }
                /deep/ .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2),
                .el-tabs--bottom .el-tabs__item.is-top:nth-child(2),
                .el-tabs--top .el-tabs__item.is-bottom:nth-child(2),
                .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
                    padding-left: none;
                }
            }
            // 群
            .group_pane {

                /deep/ .el-tabs__item {
                    padding: 0 33px;
                }
                /deep/ .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2),
                .el-tabs--bottom .el-tabs__item.is-top:nth-child(2),
                .el-tabs--top .el-tabs__item.is-bottom:nth-child(2),
                .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
                    padding-left: none;
                }
                .staff_content_list {
                    .staff_list_item {

                    }
                }  
            }
        }
        .content_right {
            width: 80%;
            .right_action {
                display: flex;
                justify-content: space-between;
                padding: 5px 19px;
                border-bottom: 1px solid #d0d0d0;
                .right_action_item {
                    display: flex;
                    align-items: center;
                    .action_icon {
                        width: 8px;
                        height: 16px;
                        border-style: solid;
                        border-width: 0 3px 3px 0;
                        transform: rotate(45deg);
                        border-color: #2ac845;
                    }
                    .action_title {
                        font-size: 10px;
                        margin: 0 13px;
                    }
                    .action_message {
                        cursor: pointer;
                    }
                    .action_load {
                        cursor: pointer;
                        margin-right: 20px;
                    }
                    .action_client {
                        cursor: pointer;
                        margin-left: 20px;
                    }
                }
            }
            .right_content {
                width:auto;
                overflow-y: auto;
                height: calc(100vh - 167px);
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
                        // align-items: flex-end;
                        padding: 15px;
                        .item_pic {
                            width: 45px;
                            height: 45px;
                            background-color: lightgray;
                            margin-right: 10px;
                            margin-bottom: 20px;
                        }
                        .item_right {
                            p {
                                color: lightgrey;
                                font-size: 10px;
                                margin-bottom: 5px;
                            }
                            .right_bubble {
                                // display: flex;
                                // justify-content: center;
                                // align-items: center;
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
                        // align-items: flex-end;
                        // justify-content: flex-end;
                        padding: 15px;
                        .sender_item_pic {
                            width: 45px;
                            height: 45px;
                            background-color: lightgray;
                            margin-left: 10px;
                        }
                        .sender_item_right {
                            p {
                                color: lightgrey;
                                font-size: 10px;
                            }
                            .sender_right_bubble {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                border-radius: 20px 0px 20px 20px;
                                background-color: #409eff;
                                color:#fff;
                                font-size: 14px;
                                padding: 10px;
                                animation: bubble 3s infinite;
                                animation-delay: 2s;
                            @keyframes bubble
                            {
                                from {left:0px;}
                                to {left:200px;}
                            }
                            }
                        }
                    }
                }
            }
        }
    }

    /deep/.el-dialog__footer {
        text-align: center;
    }
    // 标记内容对话框
    .tagDialog {
    }
    // 下载记录对话框
    .loadDialog {
    }
    // 聊天记录对话框
    .recordDialog {
        
        .el-dialog__body {
            padding: 0;
            .record_dialog {
                height: 60vh;
                overflow: auto;
                .record_search {
                    height: 45px;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    background-color: lightgray;
                    span {
                        font-size: 14px;
                    }
                }
                .record_tags {
                    .record_tags_file {
                        padding: 14px 33px;
                        .file_date {
                        }
                        .file_list {
                            .list_item {
                                display: flex;
                                width: 100%;
                                padding: 10px 0px;
                                .item_img {
                                    width: 60px;
                                    height: 60px;
                                    background-color: lightgray;
                                }
                                .item_right {
                                    width: 80%;
                                    padding: 0px 15px;
                                    .item_top {
                                        &:not(:last-child) {
                                            margin-bottom: 23px;
                                        }
                                        display: flex;
                                        justify-content: space-between;
                                        align-items: center;
                                        .top_name {
                                            font-weight: bold;
                                        }
                                        .top_time {
                                            font-size: 12px;
                                            color: lightgrey;
                                        }
                                    }
                                    .item_bottom {
                                        font-size: 10px;
                                        color: slategray;
                                    }
                                }
                            }
                        }
                    }
                    .record_tags_link {
                        padding: 14px 33px;
                        .link_date {
                        }
                        .link_list {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            height: 40px;
                            .link_add {
                                font-weight: bold;
                            }
                            .link_source {
                                font-size: 10px;
                                color: slategray;
                            }
                        }
                    }
                    .record_tags_image {
                        padding: 14px 33px;
                        .image_date {
                        }
                        .image_list {
                            display: flex;
                            width: 100%;
                            .image_item {
                                .image_self {
                                    width: 180px;
                                    height: 100px;
                                    background-color: lightgray;
                                }
                                .image_source {
                                    font-size: 10px;
                                    color: slategray;
                                }
                            }
                        }
                    }

                   
                    /deep/
                        .el-tabs--bottom
                        .el-tabs__item.is-bottom:nth-child(2),
                    .el-tabs--bottom .el-tabs__item.is-top:nth-child(2),
                    .el-tabs--top .el-tabs__item.is-bottom:nth-child(2),
                    .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
                        padding-left: none;
                    }
                    /deep/ .el-tabs__item {
                        padding: 0 42px;
                    }

                    /deep/ .el-dialog {
                        margin-top:36vh;
                        margin-right: 5vh;
                    }
                   
                }
            }
        }
    }
    // 群成员对话框
    .groupDialog {
        .group_dialog {
            .group_radio {
                display: flex;
                justify-content: center;
                .el-radio-button__inner {
                        padding: 12px 58px;
                }
            }
            .group_list {

            }
        }
    }
}
</style>