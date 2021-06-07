<!--
 * @Description: 聊天记录详情
 * @Author: mzr
 * @Date: 2021-04-25 11:05:51
 * @LastEditTime: 2021-06-07 14:03:10
 * @LastEditors: mzr
-->
<template>
    <div class="detail">
        <div class="detail_top">
            <div class="top_title">聊天存档</div>
        </div>
        <div class="detail_content">
            <div class="content_left">
                <!-- 列表表头 -->
                <div class="left_back" @click="goList">
                    <div class="left_back_item">
                        <div class="back_image not_background">
                            <img v-if="userMessage.avatar" :src="userMessage.avatar" />
                            <img v-else :src="require('@/static/group_avatar.png')" alt="本地图片" />
                        </div>
                        <div class="back_explain">
                            <div class="explain_name">{{userMessage.name}}</div>
                            <div class="explain_dep">{{userMessage.departName}}</div>
                        </div>
                    </div>
                    <div class="right_icon">
                        <i class="element-icons el-icondayuhao"></i>
                    </div>
                </div>
                <!-- 群聊列表 -->
                <div v-if="listType === '群聊'">
                    <div class="group_pane">
                        <el-tabs v-model="activeGroupName" @tab-click="changeGroupTabs">
                            <el-tab-pane v-for="(oitem, oindex) in groupTypeArr" :key="oindex" :label="oitem.name" :name="oitem.value">

                                <div class="staff_content_list">
                                    <div class="staff_title">
                                        群内共有{{activeGroupName === oitem.name?getGroupData(true).length:(groupList.length - getGroupData(true).length)}}个{{oitem.name}}
                                    </div>
                                    <div class="staff_list_item_total">
                                        <div class="staff_list_item" v-for="(item,index) in getGroupData(true)" :key="index" @click="groupDetail(item)">
                                            <el-popover popper-class="person_dialog_popper" placement="right" trigger="click">
                                                <!-- 个人信息展示 这里的v-if是确保val.length > 0 -->
                                                <div class="person_dialog" v-if="personList[0]">

                                                    <div class="person_popover_title">
                                                        <div class="title_img">
                                                            <img v-if="personList[0].avatar" :src="personList[0].avatar" />
                                                            <div v-else class="not_img"><i class="element-icons el-icontupian1"></i></div>
                                                        </div>
                                                        <div class="title_content">
                                                            <p>{{personList[0].name}}

                                                                <i :style="item.gender === '1'?'color: #1296db':'color:#d4237a'" class="element-icons el-iconcao-flat-sex"></i>
                                                            </p>
                                                            <p>{{personList[0].userid}}</p>
                                                        </div>
                                                    </div>
                                                    <div class="person_popover_content" v-loading="dataLoading">
                                                        <div class="content_item">
                                                            <div class="item_title">手机：</div>
                                                            <div class="item_input">{{personList[0].mobile ? personList[0].mobile : '无'}}</div>
                                                        </div>
                                                        <div class="content_item">
                                                            <div class="item_title">邮箱：</div>
                                                            <div class="item_input">{{personList[0].email ? personList[0].email : '无'}}</div>
                                                        </div>
                                                        <div class="content_item">
                                                            <div class="item_title">部门：</div>
                                                            <div class="item_input">{{personList[0].main_department ? personList[0].main_department : '无'}}</div>
                                                        </div>
                                                        <div class="content_item">
                                                            <div class="item_title">职位：</div>
                                                            <div class="item_input">{{personList[0].position ? personList[0].position : '无'}}</div>
                                                        </div>

                                                    </div>
                                                </div>

                                                <!-- 群聊列表展示 -->
                                                <div slot="reference">
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
                                                        <div class="bottom_mark">{{item.personnelType ? item.personnelType:'员工'}}</div>
                                                        <div class="bottom_whether" v-if="item.memberType === '群主'">群主</div>
                                                    </div>
                                                </div>
                                            </el-popover>
                                        </div>

                                    </div>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
                <!-- 私聊 群聊列表 -->
                <div v-else>
                    <div class="left_query">
                        <el-input style="width:200px" placeholder="搜索" clearable @keyup.enter.native="listSearch" v-model="inputSearch">
                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                        <el-button type="primary" @click="listFilter">搜索</el-button>
                    </div>
                    <div class="left_tabs">
                        <el-tabs v-model="activeName" @tab-click="changeChatTabs">
                            <el-tab-pane v-for="(oitem, oindex) in chatTypeArr" :key="oindex" :label="oitem.name" :name="oitem.value">
                                <div class="pane_all_list">
                                    <div class="pane_title">共有{{chatList.length}}条会议</div>
                                    <div class="left_conver_list">
                                        <div class="list_item" v-for="(item,index) in chatList" :key="index" @click="chatDetail(item)">
                                            <div class="item_img not_background">
                                                <img v-if="item.photoUrl" :src="item.photoUrl" />
                                                <img v-if="item.cahtType === 'GROUP'" src="../static/group_avatar.png" />
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
                        <div class="action_message" v-if="listType === '员工'" @click="openPrompt">
                            <i class="element-icons el-iconbiaoji"></i>
                        </div>
                    </div>
                    <div class="right_action_item">
                        <div class="action_load" @click="openPrompt">
                            <i class="el-icon-download"></i>
                            <span>下载</span>
                        </div>
                        <!-- 搜索记录按钮 -->
                        <div class="action_search">
                            <el-button type="primary" @click="openMessageDialog">搜索记录</el-button>
                            <el-dialog 
                                custom-class="record_dialog_popper"
                                title="搜索聊天记录" 
                                :visible.sync="showSearch" 
                                :modal="false"
                                width="520px"
                            >

                                <div class="record_dialog">
                                    <div class="record_search">
                                        <el-input style="width:400px" placeholder="搜索" clearable v-model="recordSearch" @keyup.enter.native="contentSearch">
                                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                        </el-input>
                                        <el-button type="primary" @click="getRecordSearch(true)">搜索</el-button>
                                    </div>

                                    <div class="record_tags">

                                        <SearchContent v-if="recordSearch !== ''" :recordList="textSumList" :recordSearch="recordSearch" @jumpContent="jumpContent"></SearchContent>

                                        <el-tabs v-model="activeRecordName" @tab-click="handleClick" v-else>
                                            <el-tab-pane label="日历" name="calendar">
                                                <el-calendar class="record_calendar" v-model="calendarValue">
                                                    <template slot="dateCell" slot-scope="{data}">
                                                        <div :class="['ys_calendar_day',{'is_active': $moment(data.day).isBefore(new Date())}]" @click="jumpDate(data)">
                                                            {{$moment(data.day).format('D')}}
                                                            <div class="item_dotted" 
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
                                                            <div class="image_self">
                                                                <el-image 
                                                                    :z-index="3000" 
                                                                    fit="contain" 
                                                                    style="width: 100%; height: 100%" 
                                                                    :preview-src-list="[$imgUrl + item.resourcePath]" 
                                                                    :src="$imgUrl + item.resourcePath">
                                                                </el-image>
                                                            </div>
                                                            <div class="image_source">{{item.name}}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </el-tab-pane>
                                            <el-tab-pane label="文件" name="file">
                                                <!-- <div class="record_tags_file">
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
                                                </div> -->
                                            </el-tab-pane>
                                            <el-tab-pane label="链接" name="link">
                                                <div class="record_tags_link" v-for="(item,index) in sumList" :key="index">
                                                    <div class="link_date">{{$moment(Number(item.sendDate)).format('YYYY-MM-DD')}}</div>
                                                    <div class="link_list">
                                                        <!-- <div class="link_add"><a href="target">{{item.chatContent}}</a></div> -->
                                                        <div class="link_add"><a href="text.html" target="_blank">{{item.chatContent}}</a></div>
                                                        <div class="link_source">{{item.name}}</div>
                                                    </div>
                                                </div>
                                            </el-tab-pane>
                                        </el-tabs>

                                    </div>
                                </div>
                            </el-dialog>     
                        </div>

                        <!-- 查看群成员弹窗 -->
                        <div class="action_client">

                            <el-popover title="查看群成员" width="400" popper-class="group_dialog_popper" placement="bottom-end" trigger="click">

                                <div class="group_dialog">
                                    <div class="group_radio">
                                        <div class="group_btn">
                                            <div :class="groupTypeBtn ===item.name?'label_item label_active':'label_item'" v-for="(item,index) in groupTypeArr" :key="index" @click="changeGroupType(item.name)">
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
                                                <div class="bottom_mark">{{item.personnelType ? item.personnelType:'员工'}}</div>
                                                <div class="bottom_whether" v-if="item.memberType === '群主'">群主</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- v-if惰性加载 换为v-show -->
                                <div class="client_icon" slot="reference" @click="openGroupDialog" v-show="isGroup === 'GROUP'">
                                    <i class="element-icons el-iconqiweiqunchengyuan"></i>
                                </div>

                            </el-popover>

                        </div>
                    </div>
                </div>
                <!-- 聊天对话 -->
                <div class="right_content">
                    <SituationChat v-bind:recordList="recordList"></SituationChat>
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

        <!-- <DialogDemo 
            :dialogTitle="tagTitle"
            :showDialog="showTag"
            :dialogType="true"
            @closeModal="closeTagDialog"
        ></DialogDemo> -->
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

        <!-- <DialogDemo 
            :dialogTitle="loadTitle"
            :showDialog="showLoad"
            @closeModal="closeLoadDialog"
        >
        </DialogDemo> -->

    </div>
</template>

<script>
export default {
    components: {
        SearchContent: () => import("../components/searchContent"),   // 搜索聊天内容
        SituationChat: () => import("../components/situationChat"), // 聊天对话
        // DialogDemo: () => import("../components/dialogDemo"),  // 对话框
    },
    data() {
        return {

            isGroup: '', // 判断当前窗口类型    ONEBYONE私聊  GROUP群聊
            thatSessionid: '', // 当前打开搜索记录的聊天人ID
            groupId: '', // 群聊id

            listType: "", // 列表类型  员工 客户 群聊
            userMessage: {}, // 用户信息 
            dialogItem: {}, // 列表当前选中人员信息


            inputSearch: "", // 列表 搜索值
            tagContent: "", // 标记内容
            recordSearch: "", // 搜索记录聊天内容 搜索值

            // 默认值
            activeName: "ALL", // 员工客户 标签页  默认值是全部
            activeGroupName: "员工", // 群成员  标签页   默认值是员工
            activeRecordName: "calendar", // 搜索记录 标签页 默认值是日历

            // 对话框
            showTag: false, // 标记内容
            showLoad: false, // 下载
            showGroup: false, // 群聊列表 弹窗

            showSearch: false, // 搜索

            tagTitle: "添加标记内容",
            loadTitle: "下载聊天记录",
            dialogType:"tag",

            // 加载数据 群聊
            dataLoading: true,



            // 私聊群聊列表标签
            chatTypeArr: [{
                name: '全部',
                value: 'ALL'
            }, {
                name: '私聊',
                value: 'ONEBYONE'
            }, {
                name: '群聊',
                value: 'GROUP'
            }],

            // 群聊标签
            groupTypeArr: [{
                name: "员工",
                value: "员工"
            }, {
                name: "客户",
                value: "客户"
            }],


            textSumList: [],    // 搜索记录 搜索内容列表
            chatList: [],       // 存放私聊群聊
            recordList: [],     // 聊天记录对话
            groupList: [],      // 存放群聊
            personList: [],     // 存放群聊单个信息


            // 搜索记录 弹窗
            sumList: [],                // 图片视频链接
            dayTime: [],                // 日期列表
            calendarValue: new Date(),  // 日历
            // 文件列表
            // fileList: [
            //     {
            //         name: "秘密花园",
            //         format: "word",
            //         source: "美少女战士",
            //         size: "2.6M"
            //     },
            // ],

            // 下载 弹窗
            starTime: "", //  开始时间
            endTime: "", // 结束时间 

            // 群成员 弹窗
            groupTypeBtn: "员工", // 默认值 员工

            thisPassnegerList: [], // userid集合

        }
    },
    methods: {

        // 返回上一个页面
        goList() {
            this.$router.go(-1);
        },

        // 获取对应聊天列表 
        getChatList() {

            this.chatList = []

            let data = {
                userid: this.userMessage.userid,
                chatType: this.activeName === 'ALL' ? "" : this.activeName
            }
            this.$axios.post('/WxChat/GetUserChatList', data).then((res) => {
                if (res.data.status === 0 && res.data.body.length > 0) {
                    res.data.body.forEach(item => {
                        if (item) {
                            this.chatList.push(item)
                        }
                    })
                    this.chatDetail()
                } else {
                    this.$message.error(res.data.message)
                }
            })
        },

        // 私聊群聊标签页 选中
        changeChatTabs() {
            this.getChatList()
        },

        // 列表搜索  输入框取值
        listSearch(e) {
            this.inputSearch = e.target.value
        },

        // 列表筛选
        async listFilter() {
            if (this.inputSearch) {
                console.log('输入', this.inputSearch)
                let data = [];
                await this.chatList.forEach(item => {
                    if (item.name.indexOf(this.inputSearch) !== -1 ||
                        item.userid.indexOf(this.inputSearch) !== -1) {
                        data.push(item)
                    }
                })
                this.chatList = data
                this.chatDetail()
            } else {
                this.getChatList()
            }

        },

        // 获取聊天对话  val 每一条数据  type(true false) true表示从日历进入相关天数到对应界面位置
        chatDetail(val, type) {

            if (val) {

                this.dialogItem = val
                this.groupId = val.cahtType === "GROUP" ? val.userid : "";  // 群聊  查看群成员

            } else if (!type) {
                this.groupId = ''
                this.dialogItem = this.chatList[0]
            }

            console.log('dialogItem', val)

            let data = {
                pageSize: 50,
                pageIndex: 1,
            }

            // 区分群聊 私聊
            if (this.listType === '群聊') {
                data['sessionid'] = this.userMessage.userid
            } else {
                data['sessionid'] = val ? val.sessionid : this.chatList[0].sessionid
                data['startdate'] = val ? val.endTime : this.chatList[0].endTime
                // 聊天记录弹窗  聊天人id 
                this.thatSessionid = val ? val.sessionid : this.chatList[0].sessionid
                // 查看群成员弹窗
                this.isGroup = val ? val.cahtType : this.chatList[0].cahtType

            }


            let passengerList = []

            this.$axios.post('/WxChat/GetUserParticularChat', data).then((res) => {

                if (res.data.status === 0 && res.data.body.result.length > 0) {
                    let newRecordList
                    newRecordList = res.data.body.result
                    console.log('对话聊天', newRecordList)

                    newRecordList.forEach(item => {
                        passengerList.push(item.from || item.to)
                        item['name'] = item.from                                      // 聊天对话组件 名字
                        item['type'] = item.from === this.userMessage.userid ? 2 : 1  // 聊天对话组件 接收方还是发送方

                        // 转发对话框组件  群聊
                        if (item.contentType === 'mixed' && item.receiver.length > 1) {
                            item['groupMessageForward'] = true
                        }
                        // 转发对话框组件  单个
                        if(item.contentType === 'mixed' && item.receiver[0] === item.from) {
                            item['singleForward'] = true
                        }
                    })

                    // 去重
                    this.thisPassnegerList = [...new Set(passengerList)]

                    // 处理聊天对话组件 
                    this.getUserMessageData('', newRecordList, 'from')
                        .then(text => {
                            this.recordList = text
                        })

                } else {
                    this.$message.error(res.data.message)
                }
            })
        },


        // 打开群聊列表对应弹窗
        groupDetail(val) {

            let data = {
                userid: val.userid
            }
            this.getUserMessageData(data);
            // this.chatDetail(val)
        },

        // 获取用户信息   e 群聊个人信息  type 装userid 判断参数是否和userid相等  val 
        getUserMessageData(e, val, type) {

            let data = {
                userid: e ? e.userid : String(this.thisPassnegerList)
            }
            return this.$axios.post('/WxChat/GetAllUserList', data).then((res) => {

                if (res.data.status === 0 && res.data.body.length > 0) {

                    // 单个用户信息
                    this.personList = res.data.body;
                    this.dataLoading = false

                    if(val) {
                        
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
                    }
                    return val
                } else {
                    this.$message.error(res.data.message)
                }
            })
        },

        // 打开搜索记录对话框
        openMessageDialog() {
            this.showSearch = true
            this.getDateList();
        },

        // 搜索聊天记录对话框 标签页 
        handleClick(tab, event) {
            if (tab.name === 'calendar') {
                this.getDateList();
            } else if (tab.name === 'link' || tab.name === "image") {
                this.getRecordSearch();
            }
        },

        // 搜索聊天记录对话框  获取聊天日期
        getDateList() {
            let data = {
                sessionid: this.dialogItem.sessionid,
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

        // 搜索聊天记录对话框  对应时间点位置
        async jumpDate(e) {
            if(this.$moment(e.day).isAfter(new Date())){
                return false
            }
            console.log('日期', e)
            if (!e.day) {
                return $message.error('时间错误')
            }
            let data = JSON.parse(JSON.stringify(this.dialogItem))
            data.endTime = e.day + ' 00:00:00'
            await this.chatDetail(data, true)
        },

        // 搜索聊天记录对话框  对应内容位置
        async jumpContent(val) {
            console.log(val)
            let data = {
                sessionid: this.thatSessionid,
                endTime: JSON.parse(JSON.stringify(this.$moment(Number(val.sendDate)).format('YYYY-MM-DD')))
            }
            console.log('内容时间', data)
            await this.chatDetail(data, true)
        },

        // 搜索聊天记录   图片/链接  type(true false) true 搜索类型为文字
        getRecordSearch(type) {
            let data = {
                sessionid: this.dialogItem.sessionid,
                pageSize: 15,
                pageIndex: 1,
                searchType: type ? 'text' : this.activeRecordName,
                search: this.recordSearch
            }
            this.$axios.post('/WxChat/GetUserSearchChatList', data).then((res) => {
                if (res.data.status === 0 && res.data.body.result.length > 0) {
                    // 图片/链接  处理工号 姓名
                    this.getUserMessageData('', res.data.body.result, 'sendChatUserid').then(text => this.sumList = text)
                    console.log('图片/链接', this.sumList)

                    // 搜索内容
                    if (type) {
                        this.textSumList = res.data.body.result
                    }
                } else {
                    this.$message.error(res.data.message)
                }
            })
        },

        // 搜索内容  输入值取值
        contentSearch(e) {
            this.recordSearch = e.target.value
        },

        // 标记下载提示
        openPrompt() {
            this.$message('功能待开发，请敬请期待');         
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
            console.log('打开群聊')
            this.getGroupList();
        },

        // 组装群成员信息 
        getGroupData(type) {
            console.log('组装信息type', type, this.groupList)
            let data = []
            if (type) {
                // 群聊人员列表传值 type为true判断是否与tabs值相等，输出对应值
                this.groupList.forEach(item => {
                    if (item.personnelType.indexOf(this.activeGroupName) !== -1) {
                        data.push(item)
                    }
                })
            } else {
                // groupTypeBtn 群成员弹窗 筛选出员工 客户
                this.groupList.forEach(item => {
                    if (item.personnelType.indexOf(this.groupTypeBtn) !== -1) {
                        data.push(item)
                    }
                })
            }

            return data

        },

        // 切换群成员按钮 对话框
        changeGroupType(val) {
            this.groupTypeBtn = val
        },

        // 切换群成员列表
        changeGroupTabs(e) {
            this.personnelType = e.label
        },
        // 获取群成员信息
        getGroupList() {
            let data = {
                userid: this.groupId ? this.groupId : this.userMessage.userid
            }
            this.$axios.post('/WxChat/GetGroupChatUser', data).then((res) => {
                if (res.data.status === 0 && res.data.body.length > 0) {

                    // 群成员列表
                    this.groupList = res.data.body
                    // 判断群主
                    let groupMaster = {}
                    for (let i = 0; i < this.groupList.length; i++) {
                        if (this.groupList[i].memberType === '群主') {
                            groupMaster = this.groupList[i];
                            this.groupList.splice(i, 1)
                            break;
                        }
                    }
                    this.groupList.unshift(groupMaster)

                } else {
                    this.$message.error(res.data.message)
                }

            })
        },


    },
    async created() {

        this.listType = this.$route.query.type // 列表类型
        this.userMessage = this.$route.query // 用户信息 
        console.log(this.listType)
        if (this.listType === '群聊') {
            console.log('acion')
            await this.getGroupList() // 群聊列表
            // await this.chatDetail()  // 获取当前群聊 聊天记录
        } else {
            await this.getChatList() // 私聊 群聊列表

        }
    },
    mounted() {

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
        .content_left {
            width: 330px;
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
                        width: 45px;
                        height: 45px;
                        background-color: lightgray;
                        flex-shrink: 0;
                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                        .not_img {
                            width: 100%;
                            height: 100%;
                            line-height: 45px;
                            text-align: center;
                        }
                        &.not_background {
                            background-color: transparent;
                        }
                    }
                    .back_explain {
                        margin-left: 10px;
                        .explain_name {
                            font-size: 15px;
                            font-weight: bold;
                            margin-bottom: 10px;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            max-width: 200px;

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
                padding: 15px;
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
                    .pane_title {
                        color: lightgrey;
                        font-size: 10px;
                        padding: 24px 0px 0px 10px;
                    }
                    .left_conver_list {
                        overflow-y: auto;
                        height: 80vh;

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
                                &.not_background {
                                    background-color: transparent;
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
                                    max-width: 200px;
                                }
                            }
                            &:hover {
                                cursor: pointer;
                                background-color: #ebeef5;
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
                    background-color: #0070e2;
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
                    background-color: #0070e2;
                }

                .staff_content_list {
                    .staff_title {
                        font-size: 10px;
                        color: lightgray;
                        margin: 24px 15px 0px;
                    }
                    .staff_list_item_total {
                        height: 80vh;
                        overflow-y: auto;
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
                                            object-fit: cover;
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
                                            max-width: 100px;
                                            white-space: nowrap;
                                            text-overflow: ellipsis;
                                            overflow: hidden;
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
                            &:hover {
                                cursor: pointer;
                                background-color: #ebeef5;
                            }
                        }
                    }
                }
            }
        }
        .content_right {
            flex: 1;
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
                        .el-dialog__wrapper {
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
            }
        }
    }

    // 下载记录对话框
    .loadDialog {
        .el-date-editor.el-input,
        .el-date-editor.el-input__inner {
            width: 160px;
        }
    }
}

// 聊天记录弹窗
.record_dialog_popper {
    .record_dialog {
        height: 60vh;
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
            width: 512px;
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
                    margin-bottom: 5px;
                }
                .link_list {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .link_add {
                        max-width: 60%;
                    }
                    .link_source {
                        font-size: 10px;
                        color: slategray;
                        min-width: 10%;
                        text-align: end;
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
                background-color: #0070e2;
            }
            /deep/ .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2),
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
                .ys_calendar_day {
                    position: relative;
                    height: 50px;
                    text-align: center;
                    line-height: 50px;
                    &:not(.is_active){
                        color: rgb(192, 196, 204);
                        cursor: not-allowed;
                        background-image: none;
                        background-color: rgb(255, 255, 255);
                        border-color: rgb(235, 238, 245);
                    }
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

// 查看群成员弹窗
.group_dialog_popper {
    .group_dialog {
        .group_btn {
            display: flex;
            justify-content: center;
            .label_item {
                color: #409eff;
                border: 1px solid #409eff;
                padding: 8px 51px;
                cursor: pointer;
                &.label_active {
                    color: #fff;
                    background-color: #409eff;
                    transition: 0.3s;
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
                                object-fit: cover;
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
                                max-width: 100px;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                overflow: hidden;
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

// 群聊个人信息弹窗
.person_dialog_popper {
    
    .person_dialog {
        width: 300px;
        .person_popover_title {
            display: flex;
            align-items: center;
            margin-bottom:10px;
            .title_img {
                width: 45px;
                height: 45px;
                margin-right: 10px;
                background-color: lightgray;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .not_img {
                    width: 100%;
                    height: 100%;
                    line-height: 45px;
                    text-align: center;
                }
            }
            .title_content {
                p {
                    font-size: 16px;
                    max-width: 187px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }
        }
        .person_popover_content {
            padding-top: 10px;
            border-top: 1px solid #d0d0d0;
            .content_item {
                display: flex;
                align-items: flex-start;
                justify-content: flex-start;
                .item_title {
                    color: #bfbfbf;
                    font-size: 14px;
                }
                .item_input {
                    max-width: 200px;
                }
            }
        }
    }
}
</style>