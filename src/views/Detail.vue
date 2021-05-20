<!--
 * @Description: 聊天记录详情
 * @Author: mzr
 * @Date: 2021-04-25 11:05:51
 * @LastEditTime: 2021-05-19 17:00:15
 * @LastEditors: mzr
-->
<template>
    <div class="detail">
        <div class="detail_top">
            <div class="top_title">聊天存档</div>
        </div>
        <div class="detail_content">
            <div class="content_left">
                <div class="left_back" @click="goList">
                    <div class="left_back_item">
                        <div class="back_image"><i class="element-icons el-icontupian1"></i></div>
                        <div class="back_explain">
                            <div class="explain_name">{{userMessage.name}}</div>
                            <div class="explain_dep">{{userMessage.departName}}</div>
                        </div>
                    </div>
                    <div class="right_icon">
                        <i class="element-icons el-icondayuhao"></i>
                    </div>
                </div>
                <!-- 群列表 -->
                <div v-if="listType === '群聊'">
                    <div class="group_pane">
                        <el-tabs v-model="activeGroupName">
                            <el-tab-pane v-for="(oitem, oindex) in groupTypeArr" :key="oindex" :label="oitem.name" :name="oitem.value">
                                <div class="staff_content_list">
                                    <!-- <div class="staff_title">群内共有{{groupList.length}}个客户</div> -->
                                    <div class="staff_list_item" v-for="(item,index) in getGroupData()" :key="index">
                                        <div class="item_top">
                                            <div class="top_div">
                                                <div class="item_img">
                                                    <img v-if="item.avatar" :src="item.avatar" />
                                                    <div v-else class="not_img"><i class="element-icons el-icontupian1"></i></div>
                                                </div>
                                                <div class="top_name">
                                                    <div class="first_name">{{item.name}}</div>
                                                    <div class="nick_name">{{item.userid}}</div>
                                                </div>
                                            </div>
                                            <i :style="item.gender === '1'?'color: #1296db':'color:#d4237a'" class="element-icons el-iconcao-flat-sex"></i>
                                        </div>
                                        <div class="item_bottom">
                                            <div class="bottom_mark">{{item.label ? item.label:'员工'}}</div>
                                            <div class="bottom_whether" v-if="item.memberType === '群主'">群主</div>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
                <!-- 员工 客户列表 -->
                <div v-else>
                    <div class="left_query">
                        <el-input 
                            style="width:200px" 
                            placeholder="搜索" 
                            clearable
                            @keyup.enter.native="listSearch" 
                            v-model="inputSearch">
                                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                        <el-button type="primary" @click="getChatList">搜索</el-button>
                    </div>
                    <div class="left_tabs">
                        <el-tabs v-model="activeName">
                            <el-tab-pane v-for="(oitem, oindex) in chatTypeArr" :key="oindex" :label="oitem.name" :name="oitem.value">
                                <div class="pane_all_list">
                                    <div class="pane_title">共有{{chatList.length}}条会议</div>
                                     <div class="left_conver_list" v-for="(item,index) in chatList" :key="index" @click="chatDetail(item)">
                                        <div class="list_item">
                                            <div class="item_img">
                                                <img v-if="item.photoUrl" :src="item.photoUrl" />
                                                <div v-else class="not_img"><i class="element-icons el-icontupian1"></i></div>
                                            </div>

                                            <div class="item_right">
                                                <div class="item_top">
                                                    <div class="top_name">{{item.name}}</div>
                                                    <div class="top_time">{{$moment(item.endTime).format('YYYY-MM-DD')}}</div>
                                                </div>
                                                <div class="item_bottom">{{item.endChatContent}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </div>
            <!--聊天对话框 -->
            <div class="content_right">
                <!-- 聊天对话框操作组 -->
                <div class="right_action">
                    <div class="right_action_item">
                        <div class="action_icon"></div>
                        <div class="action_title">联系人已同意聊天记录存档</div>
                        <div class="action_message" v-if="listType === '员工'" @click="openTagDialog"><i class="element-icons el-iconbiaoji"></i></div>
                    </div>
                    <div class="right_action_item">
                        <div class="action_load" @click="openLoadDialog">
                            <i class="el-icon-download"></i>
                            <span>下载</span>
                        </div>
                        <div class="action_search">
                            <el-button slot="reference" type="primary" @click="openMessageDialog">搜索记录</el-button>

                            <el-dialog custom-class="recordDialog" top="0" title="搜索聊天记录" :visible.sync="showRecord" width="100%" :modal='false'>
                                <div class="record_dialog">

                                    <div class="record_search">
                                        <el-input style="width:400px" placeholder="搜索" clearable v-model="recordSearch">
                                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                        </el-input>
                                        <el-button type="primary" @click="getRecordSearch">搜索</el-button>
                                    </div>

                                    <div class="record_tags">
                                        <el-tabs v-model="activeRecordName" @tab-click="handleClick">
                                            <el-tab-pane label="日历" name="calendar">
                                                <el-calendar class="record_calendar" v-model="calendarValue">
                                                    <template slot="dateCell" slot-scope="{data}">
                                                        <div class="ys_calendar_day" @click="jumpDate(data)">
                                                            {{$moment(data.day).format('D')}}
                                                            <div 
                                                                class="item_dotted" 
                                                                v-for="(item,index) in dayTime" :key="index"
                                                                v-if="$moment(data.day).format('YYYY-MM-DD') === $moment(item.value).format('YYYY-MM-DD')"></div>
                                                           
                                                        </div>
                                                    </template>
                                                </el-calendar>
                                            </el-tab-pane>
                                            <el-tab-pane label="图片/视频" name="image">
                                                <div class="record_tags_image" v-for="(item,index) in sumList" :key="index">
                                                    <div class="image_date">{{$moment(Number(item.sendDate)).format('YYYY-MM-DD')}}</div>
                                                    <div class="image_list">
                                                        <div class="image_item">
                                                            <!-- :style="item.msgtype === 'emotion' ?`width:${item.width}px;height: ${item.height}px`:''" -->
                                                            <div class="image_self">
                                                                <el-image 
                                                                    fit="contain" 
                                                                    style="width: 100%; height: 100%" 
                                                                    :preview-src-list="[$imgUrl + item.resourcePath]" 
                                                                    :src="$imgUrl + item.resourcePath">
                                                                </el-image>
                                                            </div>
                                                            <div class="image_source">{{item.sendChatName}}</div>
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
                                                <div class="record_tags_link" v-for="(item,index) in sumList" :key="index">
                                                    <div class="link_date">{{$moment(Number(item.sendDate)).format('YYYY-MM-DD')}}</div>
                                                    <div class="link_list">
                                                        <div class="link_add"><a href="target">{{item.chatContent}}</a></div>
                                                        <div class="link_source">{{item.sendChatName}}</div>
                                                    </div>
                                                </div>
                                            </el-tab-pane>
                                        </el-tabs>
                                    </div>

                                </div>
                            </el-dialog>

                        </div>

                        <div class="action_client" v-if="listType === '客户'">
                            <div class="client_icon" @click="openGroupDialog">
                                <i class="element-icons el-iconqiweiqunchengyuan"></i>
                            </div>

                            <el-dialog custom-class="groupDialog" title="查看群成员" :visible.sync="showGroup" width="100%" top="0" :modal='false'>
                                <div class="group_dialog">
                                    <div class="group_radio">
                                        <div class="group_btn">
                                            <div 
                                                :class="groupTypeBtn ===item.name?'label_item label_active':'label_item'" 
                                                v-for="(item,index) in groupTypeArr" :key="index" 
                                                @click="changeGroupType(item.name)">
                                                {{item.name}}({{groupTypeBtn ===item.name?getGroupData().length:(groupList.length - getGroupData().length)}})</div>
                                        </div>
                                    </div>
                                    <div class="group_list">
                                        <div class="staff_list_item" v-for="(item,index) in getGroupData()" :key="index">
                                            <div class="item_top">
                                                <div class="top_div">
                                                    <div class="item_img">
                                                        <img v-if="item.avatar" :src="item.avatar" />
                                                        <div v-else class="not_img"><i class="element-icons el-icontupian1"></i></div>
                                                    </div>
                                                    <div class="top_name">
                                                        <div class="first_name">{{item.name}}</div>
                                                        <div class="nick_name">{{item.userid}}</div>
                                                    </div>
                                                </div>
                                                <i :style="item.gender === '1'?'color: #1296db':'color:#d4237a'" class="element-icons el-iconcao-flat-sex"></i>
                                            </div>
                                            <div class="item_bottom">
                                                <div class="bottom_mark">{{item.label ? item.label:'员工'}}</div>
                                                <div class="bottom_whether" v-if="item.memberType === '群主'">群主</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-dialog>

                        </div>
                    </div>
                </div>
                <div class="right_content">
                    <!-- <div class="content_date">
                        <div class="date_item">2021-3-29 16:20</div>
                    </div> -->
                    <div 
                        v-for="(item, index) in recordList" :key="index" 
                        :class="item.type === 1?'left_message':'right_message'">
                        <!-- 发送方 蓝色-->
                        <div v-if="item.type === 2" class="sender_dialog_item">
                            <div class="sender_item_right">
                                <p>{{item.name}} {{item.contentTime}}</p>
                                <div :class="item.contentType === 'emotion' || item.contentType === 'image' ?'sender_right_bubble not_background':'sender_right_bubble'">
                                   
                                    <DialogForward
                                        v-if="item.contentType === 'mixed'"
                                        :dialogList="item"
                                    ></DialogForward>
                                    
                                    <el-image 
                                        v-else-if="item.contentType === 'image' || item.contentType === 'emotion'"
                                        fit="contain" 
                                        :src="$imgUrl + JSON.parse(item.content).resourcePath"
                                        :style="item.contentType === 'emotion' ? `max-width:${JSON.parse(item.content).width}px;max-height:${JSON.parse(item.content).height}px`:''"
                                        :preview-src-list="[$imgUrl + JSON.parse(item.content).resourcePath]" 
                                    ></el-image>
                                    
                                    <div v-else>{{item.content}}</div>

                                </div> 
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

                                <div :class="item.contentType === 'emotion' || item.contentType === 'image' ?'right_bubble not_background':'right_bubble'">

                                    <DialogForward
                                        v-if="item.contentType === 'mixed'"
                                        :dialogList="item"
                                    ></DialogForward>

                                    <el-image 
                                        v-else-if="item.contentType === 'image' || item.contentType === 'emotion'"
                                        fit="contain"
                                        :src="$imgUrl + JSON.parse(item.content).resourcePath"
                                        :style="item.contentType === 'emotion' ? `max-width:${JSON.parse(item.content).width}px;max-height:${JSON.parse(item.content).height}px`:''"
                                        :preview-src-list="[$imgUrl + JSON.parse(item.content).resourcePath]" 
                                    ></el-image>
                                    
                                    <div v-else>{{item.content}}</div>
                                </div>
                            </div>
                            <!-- <div 
                                class="withdraw"
                                v-if="item.contentType === 'mixed'">此消息已撤回</div> -->
                        </div>

                    </div>
                </div>

            </div>
        </div>


        <!--
            ------------员工------------ 
            标记内容对话框-->
        <el-dialog custom-class="tagDialog" top="30vh" title="添加标记内容" :visible.sync="showTag" width="400px">
            <div class="tag_dialog">
                <el-input type="textarea" :rows="6" placeholder="多行输入" v-model="tagContent" clearable></el-input>
            </div>
            <span slot="footer" class="dialog-footer" center>
                <el-button @click="closeTagDialog">取 消</el-button>
                <el-button type="primary" @click="closeTagDialog">保 存</el-button>
            </span>
        </el-dialog>

        <!-- 
            ------------员工------------
            下载聊天记录对话框 -->
        <el-dialog custom-class="loadDialog" top="35vh" title="下载聊天记录" :visible.sync="showLoad" width="400px">
            <div class="load_dialog">
                <el-date-picker v-model="starTime" type="date" placeholder="开始日期"></el-date-picker> -

                <el-date-picker v-model="endTime" type="date" placeholder="结束日期"></el-date-picker>
            </div>
            <span slot="footer" class="dialog-footer" center>
                <el-button @click="closeLoadDialog">取 消</el-button>
                <el-button type="primary" @click="closeLoadDialog">下 载</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
export default {
    components: {
        DialogForward: () => import("../components/dialogForward")  // 转发对话框
    },
    data() {
        return {

            listType: "", // 列表类型  员工 客户 群聊
            userMessage: {}, // 用户信息 
            dialogItem:{}, // 列表当前选中人员信息


            inputSearch: "", // 搜索值
            tagContent: "", // 标记内容
            recordSearch: "", // 搜索记录对话框搜索值

            // 默认值
            activeName: "ONEBYONE", // 员工客户 标签页
            activeGroupName: "1", // 群成员  标签页  
            activeRecordName: "calendar", // 搜索记录 标签页

            // 对话框
            showTag: false, // 标记内容
            showRecord: false, // 搜索记录
            showLoad: false, // 下载
            showGroup: false, // 群成员

            

            // 员工客户列表标签
            chatTypeArr: [{
                name: '全部',
                value: ''
            },{
                name: '私聊',
                value: 'ONEBYONE'
            },{
                name: '群聊',
                value: 'GROUP'
            }],

            chatList: [], // 存放员工客户

            // 群聊标签
            groupTypeArr:[{
                name:"员工",
                value:"1"
            },{
                name:"客户",
                value:"2"
            }],

            groupList: [], // 存放群聊


            // 聊天记录对话
            recordList: [],

            // 搜索记录 弹窗
            sumList: [], // 图片视频链接
            dayTime: [], // 日期列表
            calendarValue: new Date(), // 日历
            fileList: [
                {
                    name: "秘密花园",
                    format: "word",
                    source: "美少女战士",
                    size: "2.6M"
                },
            ],  // 文件列表

            // 下载 弹窗
            starTime: "", //  开始时间
            endTime: "", // 结束时间 

            // 群成员 弹窗
            groupTypeBtn: "员工", // 默认值 员工

        }
    },
    methods: {

        // 返回上一个页面
        goList() {
            this.$router.go(-1);
        },

        // 列表搜索
        listSearch(e) {
            this.inputSearch = e.target.value
            console.log(this.inputSearch)
        },
        // 获取对应聊天列表
        getChatList() {

            this.userMessage = this.$route.query // 用户信息
            let data = {
                userid: this.userMessage.userid,
                chatType: this.activeName  
            }
            this.$axios.post('/WxChat/GetUserChatList', data).then((res) => {
                if (res.data.status === 0 && res.data.body.length > 0) {
                    this.chatList = res.data.body
                    console.log('chatList',this.chatList)
                    this.chatDetail()
                } else {
                    this.$message.error(res.data.message)
                }
            })
        },

        // 获取聊天对话
        chatDetail(val,type) {
            // 存用户对应详细内容
            if(val){
                 this.dialogItem = val
            }else if(!type){
                this.dialogItem = this.chatList[0]
            }
            
            console.log('dialogItem',val)
            let data = {
                sessionid: val?val.group: this.chatList[0].group,  
                pageSize: 15,
                pageIndex: 1,
                startdate:val?val.endTime: this.chatList[0].endTime
            }
            this.$axios.post('/WxChat/GetUserChat', data).then((res) => {
                if (res.data.status === 0 && res.data.body.result.length > 0) {
                    this.recordList = res.data.body.result
                    // 判断是发送方还是接收方
                    res.data.body.result.forEach(item => {

                        item['type'] = item.name === this.userMessage.name && item.userid === this.userMessage.userid ? 2 : 1

                    })
                } else {
                    this.$message.error(res.data.message)
                }
            })
        },

        // 打开搜索记录弹窗
        openMessageDialog() {
            this.showRecord = true
            this.getDateList();
        },

        // 搜索聊天记录 标签页 
        handleClick(tab, event) {
            if (tab.name === 'calendar') {
                this.getDateList();
            } else {
                this.getRecordSearch();
            }
        },

        // 搜索聊天记录  获取聊天日期
        getDateList() {
            let data = {
                sessionid: this.dialogItem.group,
                datetime: this.dialogItem.endTime
            }
            this.$axios.post('/WxChat/GetDateChatList', data).then((res) => {
                if (res.data.status === 0 && res.data.body.length > 0) {
                    this.dayTime = res.data.body
                } else (
                    this.$message.error(res.data.message)
                )
            })
        },

        // 搜索聊天记录  对应时间点位置
        async jumpDate(e) {
            console.log('日期',e)
            if(!e.day){
                return $message.error('时间错误')
            }
            let data = JSON.parse(JSON.stringify(this.dialogItem))
            data.endTime = e.day + ' 00:00:00'
            console.log(this.dialogItem)
            await this.chatDetail(data,true)
            this.showRecord = false
        },


        // 搜索聊天记录   图片/视频/链接
        getRecordSearch() {
            let data = {
                sessionid: this.dialogItem.group,
                pageSize: 15,
                pageIndex: 1,
                searchType: this.activeRecordName
            }
            this.$axios.post('/WxChat/GetUserSearchChatList', data).then((res) => {
                if (res.data.status === 0 && res.data.body.result.length > 0) {

                    this.sumList = res.data.body.result
                } else {
                    this.$message.error(res.data.message)
                }
            })
        },
        

        // 打开标记内容
        openTagDialog() {
            this.showTag = true
        },

        closeTagDialog() {
            this.showTag = false
        },

        // 打开下载内容
        openLoadDialog() {
            this.showLoad = true
        },

        closeLoadDialog() {
            this.showLoad = false
        },

        // 打开群成员内容
        openGroupDialog() {
            this.showGroup = true
            this.getGroupList();
        },

        // 组装群成员信息
        getGroupData(){
            let data = []
            // this.groupList
            this.groupList.forEach(item => {
                if(item.personnelType.indexOf(this.groupTypeBtn) !== -1){
                    data.push(item)
                }
            })

            return data
        },

        // 切换群成员按钮
        changeGroupType(val){
            this.groupTypeBtn = val
        },


        // 获取群成员信息
        getGroupList() {
            let data = {
                userid:"wrN1hGBwAASqgipvQCFcTTVRiRFjtTCw"
            }
            this.$axios.post('/WxChat/GetGroupChatUser',data).then((res) => {
                if(res.data.status === 0 && res.data.body.length > 0) {
                    let groupMaster = {}
                    this.groupList = res.data.body
                    
                    // 判断群主
                    for(let i = 0; i < this.groupList.length; i++){
                        if(this.groupList[i].memberType === '群主'){
                            groupMaster = this.groupList[i];
                            this.groupList.splice(i,1)
                            break;
                        }
                    }
                    this.groupList.unshift(groupMaster)
                    console.log(groupMaster)
                    
                }else {
                    this.$message.error(res.data.message)
                }
                
            })
        }
    },
    created() {

        this.listType = this.$route.query.type // 列表类型
        this.getChatList() // 员工 客户列表
        this.getGroupList() // 群聊列表
    }
}
</script>

<style lang="less" scoped>
.detail {
    height: calc(100vh - 60px);
    .detail_top {
        padding: 10px 30px;
        border-bottom: 1px solid #d0d0d0;
        .top_title {
            font-size: 16px;
            line-height: 40px;
            font-weight: bold;
            color: #101010;
        }
    }
    .detail_content {
        display: flex;
        width: 100%;
        .content_left {
            width: auto;
            border-right: 1px solid #d0d0d0;
            .left_back {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 17px;
                cursor: pointer;
                .left_back_item {
                    display: inline-flex;
                    .back_image {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 45px;
                        height: 45px;
                        background-color: lightgray;
                        flex-shrink: 0;
                    }
                    .back_explain {
                        margin-left: 10px;
                        .explain_name {
                            font-size: 15px;
                            font-weight: bold;
                            margin-bottom: 10px;
                        }
                        .explain_dep {
                            font-size: 10px;
                            color: slategray;
                        }
                    }
                }
            }
            .left_query {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding:15px;
                /deep/.el-input__inner {
                    border: 1px solid #bfbfbf;
                    border-radius: 10px;
                    .el-input__suffix {
                        color: #101010;
                    }
                }
            }
            .left_tabs {
                /deep/ .el-tabs__header {
                    margin: auto;
                }
                /deep/ .el-tabs__nav {
                    display: flex;
                    justify-content: space-around;
                    width: 100%;
                }
                .pane_all_list {
                    overflow-y: auto;
                    height: 80vh;
                    .pane_title {
                        color: lightgrey;
                        font-size: 10px;
                        padding: 24px 0px 0px 10px;
                    }
                    .left_conver_list {
                        overflow-y: auto;
                        &:hover {
                            cursor: pointer;
                            background-color: #EBEEF5;
                        }
                        .list_item {
                            display: flex;
                            width: 100%;
                            padding: 10px;
                            .item_img {
                                width: 60px;
                                height: 60px;
                                background-color: lightgray;
                                flex-shrink: 0;
                                img {
                                    width: 100%;
                                    height: 100%;
                                    object-fit: contain;
                                }
                                .not_img {
                                    width: 100%;
                                    height: 100%;
                                    text-align: center;
                                    line-height: 60px;
                                }
                            }
                            .item_right {
                                width: 80%;
                                padding-left: 10px;
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
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                    overflow: hidden;
                                }
                            }
                        }
                    }
                }
                /deep/ .el-tabs__item {
                    padding: 0 41px;
                    color: #999;
                }
                /deep/.el-tabs__active-bar {
                    height: 4px;
                    border-radius: 5px;
                    background-color: #407bff;
                }
                /deep/ .el-tabs__item.is-active {
                    color: #333;
                    font-weight: bold;
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
                    padding: 15px 69px;
                    height: 55px;
                    color: #999;
                }
                /deep/ .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2),
                .el-tabs--bottom .el-tabs__item.is-top:nth-child(2),
                .el-tabs--top .el-tabs__item.is-bottom:nth-child(2),
                .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
                    padding-left: none;
                }
                /deep/ .el-tabs__nav-wrap.is-scrollable {
                    padding: 0;
                    .el-tabs__nav-prev {
                        display: none;
                    }
                    .el-tabs__nav-next {
                        display: none;
                    }
                }
                /deep/ .el-tabs__item.is-active {
                    color: #333;
                    font-weight: bold;
                }
                /deep/ .el-tabs__active-bar {
                    width: 48px;
                    height: 4px;
                    border-radius: 5px;
                    background-color: #407bff;
                }

                .staff_content_list {
                    .staff_title {
                        font-size: 10px;
                        color: lightgray;
                        margin: 24px 15px 0px;
                    }
                    .staff_list_item {
                        padding: 15px 15px 0px;
                        border-bottom: 2px solid #e4e7ed;
                        .item_top {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            .top_div {
                                display: flex;
                                .item_img {
                                    width: 45px;
                                    height: 45px;
                                    background-color: lightgray;
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
                                .top_name {
                                    margin-left: 10px;
                                    .first_name {
                                        font-size: 17px;
                                        font-weight: bold;
                                    }
                                    .nick_name {
                                        font-size: 16px;
                                        color: #bfbfbf;
                                        
                                    }
                                }
                            }
                        }
                        .item_bottom {
                            display: flex;
                            justify-content: space-between;
                            align-items: flex-end;
                            margin: 10px 0px 10px;
                            .bottom_mark {
                                font-size: 12px;
                                font-weight: bold;
                            }
                            .bottom_whether {
                                color: #557b08;
                                background-color: #c4e2c9;
                                border-radius: 5px;
                                font-size: 12px;
                                line-height: 12px;
                                padding: 5px;
                            }
                        }
                    }
                }
            }
        }
        .content_right {
            width: 80%;
            .right_action {
                display: flex;
                justify-content: space-between;
                padding: 13px 18px;
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
                        span {
                            font-size: 15px;
                        }
                    }
                    .action_search {
                        position: relative;
                        // .el-button {
                        //     padding: 5px 10px;
                        // }
                        .el-dialog__wrapper {
                            position: absolute;
                            top: 57px;
                            right: 0;
                            bottom: unset;
                            left: unset;
                            overflow: unset;
                            margin: 0;
                            z-index: 1999 !important;
                        }
                    }
                    .action_client {
                        cursor: pointer;
                        margin-left: 20px;
                        color: #1296db;
                        // position: relative;
                        .el-dialog__wrapper {
                            position: absolute;
                            top: 197px;
                            right: 8px;
                            bottom: unset;
                            left: unset;
                            overflow: unset;
                            margin: 0;
                        }
                    }
                }
            }
            .right_content {
                width: auto;
                overflow-y: auto;
                height: calc(100vh - 167px);
                .content_date {
                    display: flex;
                    justify-content: center;
                    margin-top: 15px;
                    .date_item {
                        color: darkgray;
                        font-size: 10px;
                        background-color: lightgray;
                        padding: 2px 5px;
                    }
                }
                .left_message { 
                    .dialog_item {
                        padding: 15px;
                        .item_pic {
                            vertical-align: top;
                            display: inline-block;
                            width: 45px;
                            height: 45px;
                            background-color: lightgray;
                            margin: 21px 10px 0px 0px;
                            img {
                                // width: 100%;
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
                            display: inline-block;
                             width: calc(100% - 55px);
                            p {
                                color: lightgrey;
                                font-size: 10px;
                                margin-bottom: 5px;
                            }
                            .right_bubble {
                                border-radius: 0px 20px 20px 20px;
                                background-color: lightgray;
                                padding: 13px 25px;
                                font-size: 14px;
                                min-width: 60px;
                                max-width: 40%;
                                word-wrap: break-word;
                                word-break: break-all;
                                display: inline-block;
                                min-height: 39px;
                                &.not_background{
                                    background-color: transparent;
                                }
                            }
                        }
                        .withdraw {
                            color: red;
                            font-size: 12px;
                            background-color: papayawhip;
                            padding: 5px;
                            margin: 6px 15px;
                        }
                    }
                }
                .right_message {
                    text-align: right;
                    .sender_dialog_item {
                    
                        padding: 15px;
                        .sender_item_pic {
                            vertical-align: top;
                            display: inline-block;
                            width: 45px;
                            height: 45px;
                            background-color: lightgray;
                            margin: 21px 0px 0px 10px;
                            img {
                                // width: 100%;
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
                            display: inline-block;
                            width: calc(100% - 55px);
                             
                            p {
                                color: lightgrey;
                                font-size: 10px;
                                margin-bottom: 5px;
                            }
                            .sender_right_bubble {
                                display: inline-block;
                                // display: flex;
                                // justify-content: center;
                                // align-items: center;
                                border-radius: 20px 0px 20px 20px;
                                background-color: #407bff;
                                color: #fff;
                                font-size: 14px;
                                padding: 13px 25px;
                                min-width: 60px;
                                max-width: 40%;
                                min-height: 39px;
                                word-wrap: break-word;
                                word-break: break-all;
                                margin-left: auto;
                                text-align: left;
                                &.not_background{
                                    background-color: transparent;
                                }
                            }

                        }
                    }
                }
            }
        }
    }

    // 标记内容对话框
    .tagDialog {
    }
    // 下载记录对话框
    .loadDialog {
        .el-date-editor.el-input,
        .el-date-editor.el-input__inner {
            width: 160px;
        }
    }
    // 聊天记录对话框
    .recordDialog {
        .el-dialog__body {
            padding: 0;
            .record_dialog {
                height: 60vh;
                // overflow: auto;
                .record_search {
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                     /deep/.el-input__inner {
                        border: 1px solid #bfbfbf;
                        border-radius: 10px;
                        .el-input__suffix {
                            color: #101010;
                        }
                    }
                }
                .record_tags {
                    /deep/ .el-tabs__content {
                        height: 45vh;
                        overflow: auto;
                    }
                    padding: 15px;
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
                            margin-bottom:5px;
                        }
                        .link_list {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            .link_add {
                                max-width: 60%;
                                // white-space: nowrap;
                                // text-overflow: ellipsis;
                                // overflow: hidden;
                            }
                            .link_source {
                                font-size: 10px;
                                color: slategray;
                                min-width: 10%;
                            }
                        }
                    }
                    .record_tags_image {
                        padding: 14px 33px;
                        .image_date {
                            margin-bottom: 10px;
                        }
                        .image_list {
                            display: flex;
                            flex-wrap: wrap;
                            width: 100%;
                            :not(:last-child) {
                                margin-right: 26px;
                            }
                            .image_item {
                                .image_self {
                                    width: 156px;
                                    height: 100px;
                                }
                                .image_source {
                                    font-size: 10px;
                                    color: slategray;
                                }
                            }
                        }
                    }
                    // 标签栏
                    /deep/ .el-tabs {
                        .el-tabs__nav-wrap {
                            &::after {
                                display: none;
                            }
                        }
                    }
                    /deep/ .el-tabs__active-bar {
                        height: 4px;
                        border-radius: 5px;
                        background-color: #407bff;
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
                        color: #999;
                    }
                    /deep/ .el-tabs__item.is-active {
                        color: #333;
                        font-weight: bold;
                    }
                    /deep/ .el-dialog {
                        margin-top: 36vh;
                        margin-right: 5vh;
                    }
                    // 日历表
                    /deep/ .el-calendar {
                        .el-calendar__body {
                            .el-calendar-day {
                                height: 50px;
                                padding: 0;
                                
                               
                            }
                        }
                    }
                    
                    .record_calendar {
                        .ys_calendar_day{
                            position: relative;
                                    height: 50px;
                                    text-align: center;
                                    line-height: 50px;
                                    .item_dotted {
                                        position: absolute;
                                        right: 7px;
                                        top: 7px;
                            width: 8px;
                            height: 8px;
                            border-radius: 50%;
                            background-color: #1296db;
                        }
                                }
                        
                    }
                }
            }
        }
    }
    // 群成员对话框
    .groupDialog {
        .group_dialog {
            .group_btn {
                display:flex;
                justify-content: center;
                .label_item {

                    color: #409eff;
                    border: 1px solid #409eff;
                    padding: 8px 51px;
                    &.label_active {
                        color: #fff;
                        background-color: #409eff;
                        transition: .3s;
                    }
                   
                }
            }
            .group_list {
                margin-top: 20px;
                overflow-y: auto;
                height: calc(60vh - 50px);
                .staff_list_item {
                    padding: 15px 15px 0px;
                    border-top: 2px solid #e4e7ed;
                    .item_top {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        .top_div {
                            display: flex;

                            .item_img {
                                width: 45px;
                                height: 45px;
                                background-color: lightgray;
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
                            .top_name {
                                margin-left: 10px;
                                .first_name {
                                    font-size: 17px;
                                    font-weight: bold;
                                }
                                .nick_name {
                                    font-size: 16px;
                                    color: lightgray;
                                    min-width: 300px;
                                }
                            }
                        }
                    }
                    .item_bottom {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-end;
                        margin: 10px 0px 10px;
                        .bottom_mark {
                            font-size: 12px;
                            font-weight: bold;
                        }
                        .bottom_whether {
                            color: #557b08;
                            background-color: #c4e2c9;
                            border-radius: 5px;
                            font-size: 12px;
                            line-height: 12px;
                            padding: 5px;
                        }
                    }
                }
            }
        }
    }
}
</style>