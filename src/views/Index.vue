<!--
 * @Description: 主页
 * @Author: wish.WuJunLong
 * @Date: 2021-04-15 14:40:24
 * @LastEditTime: 2021-06-25 17:16:08
 * @LastEditors: mzr
-->

<template>
    <div class="index">
        <!-- 聊天存档 聊天记录 切换-->
        <div class="content_top">
            <div class="back_icon" v-if="inputSearch" @click="closeSearch">
                <i class="element-icons el-iconfanhui"></i>
            </div>
            <div class="top_title">{{inputSearch?'聊天记录':'聊天存档'}}</div>
            <div class="top_action">
                <el-input placeholder="聊天信息搜索" v-model="inputSearch" clearable @keyup.enter.native="handleInputSearch">
                    <i slot="suffix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </div>
        </div>
        <!-- 聊天存档 -->
        <div class="content_item" v-if="inputSearch === ''">
            <div class="item_action">
                <!-- 列表类型 -->
                <div class="action_radio">
                    <el-radio-group v-model="checkList" @change="changeCheck">
                        <el-radio v-for="(item,index) in radioList" :key="index" :label="item.name">{{item.name}}</el-radio>
                    </el-radio-group>
                </div>
                <!-- 搜索条件 -->
                <div class="action_item">
                    <el-select style="width:200px" v-model="searchData.departList" placeholder="部门" clearable v-if="checkList === '员工'">
                        <el-option v-for="item in optionList" :key="item" :label="item" :value="item"></el-option>
                    </el-select>

                    <el-input style="width:200px" v-model="searchData.jobNumber" placeholder="工号" clearable v-if="checkList === '员工'"></el-input>

                    <el-select style="width:200px" v-model="groupList" placeholder="分组" clearable v-if="checkList === '客户' || checkList === '群聊'">
                        <el-option v-for="item in options_group" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>

                    <el-select style="width:200px" v-model="tagList" placeholder="标签" clearable v-if="checkList === '客户'">
                        <el-option v-for="item in options_tag" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>

                    <el-input style="width:200px" v-model="clientMess" placeholder="客户信息" clearable v-if="checkList === '客户'"></el-input>

                    <el-input style="width:200px" v-model="clientMess" placeholder="群信息" clearable v-if="checkList === '群聊'"></el-input>

                    <el-button style="width:120px" type="primary" @click="searchBtn">搜索</el-button>

                </div>
            </div>
            <!-- 列表 -->
            <div class="item_table">
                <!-- 员工 -->
                <el-table v-loading="tableLoading" :data="tableData" v-if="checkList === '员工'">
                    <el-table-column label="员工微信">
                        <template slot-scope="scope">
                            <div class="table_wechat">
                                <div class="table_img">
                                    <img v-if="scope.row.avatar" :src="scope.row.avatar" />
                                    <div v-else class="not_img"><i class="element-icons el-icontupian1"></i></div>
                                </div>
                                <div class="table_item">
                                    <div class="person_name">{{scope.row.name}}</div>
                                    <div class="wechat_no">{{byteLength(scope.row.userid)}}</div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="工号/姓名">
                        <template slot-scope="scope">
                            <div class="table_staff">
                                <div class="staff_no">{{byteLength(scope.row.userid)}}</div>
                                <div class="staff_name">{{scope.row.name}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="departmentName" label="部门">
                        <template slot-scope="scope">
                            {{scope.row.departmentName}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="numberclient" label="客户数">
                        <template slot-scope="scope">
                            {{scope.row.numberclient}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="groupchat" label="群聊数">
                        <template slot-scope="scope">
                            {{scope.row.groupchat}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="gender" label="性别">
                        <template slot-scope="scope">
                            {{scope.row.gender === '1' ?'男':
                                scope.row.gender === '2'?'女':'未定义'
                            }}
                        </template>
                    </el-table-column>
                    <el-table-column label="聊天记录" min-width="40%">
                        <template slot-scope="scope">
                            <el-button type="primary" round @click="openDetail(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 客户 -->
                <el-table v-loading="tableLoading" :data="tableData" v-if="checkList === '客户'">
                    <el-table-column label="客户微信" min-width="90%">
                        <template slot-scope="scope">
                            <div class="table_wechat">
                                <div class="table_img">
                                    <img v-if="scope.row.avatar" :src="scope.row.avatar" />
                                    <div v-else class="not_img"><i class="element-icons el-icontupian1"></i></div>
                                </div>
                                <!-- style="text-align : center" -->
                                <div class="table_item" style="display:flex; align-items:center;">
                                    <div class="person_name">{{scope.row.name}}</div>
                                    <!-- <div class="wechat_no">{{byteLength(scope.row.userid)}}</div> -->
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="所属客服">
                        <template slot-scope="scope">
                            <div class="table_staff">
                                <!-- <div class="staff_no">{{byteLength(scope.row.userid)}}</div> -->
                                <div class="staff_name">{{scope.row.name}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column  label="分组"></el-table-column> -->
                    <!-- <el-table-column  label="聊天数"></el-table-column> -->
                    <el-table-column prop="groupchat" label="群聊数">
                        <template slot-scope="scope">
                            {{scope.row.groupchat}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="gender" label="性别">
                        <template slot-scope="scope">
                            {{scope.row.gender === '1' ?'男':
                                scope.row.gender === '2'?'女':'未定义'
                            }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" label="标签">
                        <template slot-scope="scope">
                            {{scope.row.label ? scope.row.label:"--"}}
                        </template>
                    </el-table-column>
                    <el-table-column label="聊天记录" min-width="40%">
                        <template slot-scope="scope">
                            <el-button type="primary" round @click="openDetail(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 群聊 -->
                <el-table v-loading="tableLoading" :data="tableData" v-if="checkList === '群聊'">
                    <el-table-column show-overflow-tooltip label="群名称" min-width="35%">
                        <template slot-scope="scope">
                            <div class="table_wechat">
                                <div class="table_img not_background">
                                    <img v-if="scope.row.avatar" :src="scope.row.avatar" />
                                    <img v-else :src="require('@/static/group_avatar.png')" alt="本地图片" />
                                </div>
                                <div class="table_item">
                                    <el-tooltip class="item" effect="dark" :content="scope.row.name" placement="bottom-start">
                                        <div class="person_name">{{scope.row.name}}</div>
                                    </el-tooltip>
                                    <!-- <div class="wechat_no">{{byteLength(scope.row.userid)}}</div> -->
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="管理员" min-width="30%">
                        <template slot-scope="scope">
                            <div class="table_staff">
                                <!-- <div class="staff_no">{{byteLength(scope.row.userid)}}</div> -->
                                <div class="staff_name">{{scope.row.gruopOwner}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column  label="分组" /> -->
                    <el-table-column prop="externalUser" label="客户数" min-width="30%">
                        <template slot-scope="scope">
                            {{scope.row.externalUser}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="interiorUser" label="员工数" min-width="30%">
                        <template slot-scope="scope">
                            {{scope.row.interiorUser ? scope.row.interiorUser:""}}
                        </template>
                    </el-table-column>
                    <!-- <el-table-column label="备注"></el-table-column> -->
                    <el-table-column label="聊天记录" min-width="15%">
                        <template slot-scope="scope">
                            <el-button type="primary" round @click="openDetail(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <el-pagination background layout="prev, pager, next" :total="tablePage.pageTotal" :page-size.sync="tablePage.pageSize" :current-page.sync="tablePage.pageCurrent" @current-change="changePageIndex"></el-pagination>
            </div>
        </div>
        <!-- 聊天记录 -->
        <div v-else>
            <ChatRecord :inputSearch="inputSearch"></ChatRecord>
        </div>
    </div>
</template>

<script>
export default {
    name: 'index',
    components: {
        ChatRecord: () => import("../components/chatRecord")  // 聊天记录
    },
    data() {
        return {

            inputSearch: "", // 搜索值

            // 搜索筛选条件
            searchData: {
                jobNumber: "", // 工号
                departList: "", // 部门
            },

            checkList: '员工', // 列表类别默认值  

            // 列表类别
            radioList: [
                {
                    name: "员工",
                    sign: "1"
                },
                {
                    name: "客户",
                    sign: "2"
                },
                {
                    name: "群聊",
                    sign: "3"
                }
            ],

            optionList: [], // 部门
            tableData: [], // 表格列表

            // 页数
            tablePage: {
                pageTotal: 0,  // 表格总数
                pageSize: 8, // 每页大小
                pageCurrent: 1 // 当前页数
            },

            tableLoading: true, // 表格加载


            // //////////////////////////////////////
            groupList: "", // 分组列表
            options_group: [
                {
                    value: '0',
                    label: '默认'
                },
                {
                    value: '1',
                    label: '分组1'
                }, {
                    value: '2',
                    label: '分组2'
                }, {
                    value: '3',
                    label: '分组3'
                }, {
                    value: '4',
                    label: '分组4'
                }],

            tagList: "", // 标签列表  
            options_tag: [
                {
                    value: '0',
                    label: '默认'
                },
                {
                    value: '1',
                    label: '分组1'
                }, {
                    value: '2',
                    label: '标签2'
                }],

            clientMess: "", // 客户信息

            message: {}

        }
    },
    methods: {

        // 相关列表返回列表页
        closeSearch() {
            this.inputSearch = ""
        },

        // 跳转到对应详情
        openDetail(val) {
            console.log('表格对应详情', val)
            this.$router.push({
                name: 'Detail',
                path: "/detail",
                query: {
                    userid: val.userid,
                    name: val.name,
                    departName: val.departmentName,
                    type: this.checkList,
                    avatar: val.avatar
                }
            });
        },

        // 输入框搜索
        handleInputSearch(e) {
            this.inputSearch = e.target.value
        },

        // 单选框绑定值变化
        changeCheck(e) {
            this.checkList = e
            this.$forceUpdate()
            this.getDataList()
        },

        // 搜索筛选
        searchBtn() {
            this.tablePage.pageCurrent = 1
            this.getDataList()
        },

        // 获取部门  
        getDepartList() {
            this.$axios.post('/GetDepartment').then((res) => {
                this.optionList = res.data.body;
            })
        },

        // 获取列表
        getDataList() {
            this.tableData = []
            let data = {
                pageSize: this.tablePage.pageSize,
                pageIndex: this.tablePage.pageCurrent,
                departmentName: this.searchData.departList,
                search: this.searchData.jobNumber,
                personneltype: this.checkList
            }
            this.$axios.post('/GetAllUserChatList', data).then((res) => {
                if (res.data.status === 0 && res.data.body.result.length > 0) {
                    this.tableLoading = false;
                    this.tableData = res.data.body.result
                    console.log('表格', this.tableData)
                    this.tablePage = res.data.body
                    // 表格页数
                    this.tablePage.pageTotal = res.data.body.total
                    this.tablePage.pageSize = res.data.body.pageSize
                    this.tablePage.pageCurrent = res.data.body.pageIndex
                    this.$forceUpdate()
                } else {
                    this.$message.error(res.data.message)
                }
            })
        },

        // 表格翻页
        changePageIndex() {
            this.getDataList()
        },

        // 字符串长度判断
        byteLength(val) {
            if (val.length < 10) {
                return val
            } else {
                return ''
            }
        }



    },

    created() {
        if (!localStorage.getItem('Id') && !localStorage.getItem('departmentList')) {
            return this.$router.push('/login');
        }
        this.getDepartList() // 获取部门列表
        this.getDataList() // 获取表格列表

        this.message = this.$route.query
        // console.log('传',this.message)
       
        
        console.log(localStorage.getItem('Id'), localStorage.getItem('departmentList'))
    }
}
</script>

<style lang="less" scoped>
.index {
    .content_top {
        display: flex;
        // justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #d0d0d0;
        padding: 10px 30px;
        .back_icon {
            cursor: pointer;
            margin-right: 15px;
        }
        .top_title {
            font-size: 16px;
            font-weight: bold;
            color: #101010;
        }
        .top_action {
            margin-left: auto;
            /deep/.el-input__inner {
                padding: 0 10px;
                border: 1px solid #bfbfbf;
                border-radius: 10px;
                .el-input__suffix {
                    color: #101010;
                }
            }
        }
    }
    .content_item {
        padding: 30px;
        .item_action {
            display: flex;
            align-items: center;
            .action_radio {
                /deep/ .el-radio__input.is-checked .el-radio__inner {
                    border-color: #0070e2;
                    background: #0070e2;
                }
                /deep/ .el-radio__input.is-checked + .el-radio__label {
                    color: #0070e2;
                }
                /deep/ .el-radio__input.is-checked .el-radio__inner :hover {
                    border-color: #0070e2 !important;
                }
            }
            .action_item {
                .el-select {
                    margin: 0px 20px;
                }
                .el-input {
                    margin: 0px 20px;
                }
            }
        }
        .item_table {
            margin-top: 30px;
            .table_wechat {
                display: flex;
                .table_item {
                    flex: 1;
                    .person_name {
                        font-size: 14px;
                        max-width: 155px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .wechat_no {
                        font-size: 12px;
                        color: #bfbfbf;
                    }
                }
                .table_img {
                    flex-shrink: 0;
                    width: 45px;
                    height: 45px;
                    margin-right: 10px;
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
            }
            .table_staff {
                .staff_no {
                }
                .staff_name {
                    max-width: 155px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
            .el-pagination {
                text-align: right;
                margin: 20px 15px;
            }
            .el-button {
                width: 96px;
                height: 38px;
            }
        }
    }
}
</style>
