<!--
 * @Description: 主页
 * @Author: wish.WuJunLong
 * @Date: 2021-04-15 14:40:24
 * @LastEditTime: 2021-05-06 09:43:10
 * @LastEditors: mzr
-->

<template>
    <div class="index">
        <div class="content_top">
            <div class="top_title">聊天存档</div>
            <div class="top_action">
                <el-input 
                    placeholder="聊天信息搜索" 
                    v-model="inputSearch"
                    clearable 
                    @keyup.enter.native="handleInputSearch">
                    <i slot="suffix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </div>
        </div>

        <div class="content_item" v-if="inputSearch === ''">
            <div class="item_action">
                <!-- 员工  客户  群 -->
                <div class="action_radio">
                    <el-radio-group 
                        v-model="checkList">
                        <el-radio 
                            v-for="(item,index) in radioList" 
                            :key="index" 
                            :label="item.sign">{{item.label}}</el-radio>
                    </el-radio-group>
                </div>
                <!-- 筛选组 -->
                <div class="action_item">
                    <el-select 
                        style="width:200px" 
                        v-model="searchData.departList" 
                        placeholder="部门"
                        clearable 
                        v-if="checkList === '1'">
                        <el-option 
                            v-for="item in options_depart" 
                            :key="item" 
                            :label="item" 
                            :value="item"></el-option>
                    </el-select>

                    <el-input 
                        style="width:200px"
                        v-model="searchData.jobNumber" 
                        placeholder="工号"
                        clearable
                        v-if="checkList === '1'"></el-input>

                    <el-select 
                        style="width:200px"
                        v-model="groupList" 
                        placeholder="分组"
                        clearable
                        v-if="checkList === '2' || checkList === '3'">
                        <el-option v-for="item in options_group" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>

                    <el-select
                        style="width:200px" 
                        v-model="tagList" 
                        placeholder="标签"
                        clearable
                        v-if="checkList === '2'">
                        <el-option v-for="item in options_tag" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>

                    <el-input
                        style="width:200px" 
                        v-model="clientMess" 
                        placeholder="客户信息"
                        clearable  
                        v-if="checkList === '2'"></el-input>

                    <el-input
                        style="width:200px" 
                        v-model="clientMess" 
                        placeholder="群信息"
                        clearable  
                        v-if="checkList === '3'"></el-input>

                    <el-button 
                        style="width:120px"
                        type="primary" 
                        @click="getDataList()">搜索</el-button>
                    
                </div>
            </div>

            <div class="item_table">
                <el-table 
                    :data="tableData"
                >
                    <el-table-column 
                         
                        :label="checkList === '1'?'员工微信':
                            checkList === '2'? '客户微信':
                                checkList === '3'?'群名称':''"
                    >
                        <template slot-scope="scope">
                            <div class="table_wechat">
                                <div class="table_img">
                                    <img v-if="scope.row.avatar" :src="scope.row.avatar" />
                                    <div v-else class="not_img"><i class="element-icons el-icontupian1"></i></div>
                                </div>
                                <!-- <img class="table_img" :src="scope.row.avatar" /> -->
                                <div class="table_item">
                                    <div class="person_name">{{scope.row.name}}</div>
                                    <div class="wechat_no">{{scope.row.key}}</div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column 
                        :label="checkList === '1'?'工号/姓名':
                            checkList === '2'? '所属客服':
                                checkList === '3'?'管理员':''"
                    >
                        <template slot-scope="scope">
                            <div class="table_staff">
                                <div class="staff_no">{{scope.row.userid}}</div>
                                <div class="staff_name">{{scope.row.name}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column 
                        prop="departmentName" 
                        :label="checkList === '1'?'部门':'分组'"
                    ></el-table-column>
                    <el-table-column 
                        v-if="checkList === '1' || checkList === '3'" 
                        prop="numberclient" 
                        label="客户数"
                    ></el-table-column>
                    <el-table-column 
                        v-if="checkList === '2'" 
                        prop="groupchat" 
                        label="聊天数"
                    ></el-table-column>
                    <el-table-column 
                        v-if="checkList === '1' || checkList === '2'" 
                        prop="groupchat" 
                        label="群聊数"
                    ></el-table-column>
                    <el-table-column 
                        v-if="checkList === '1' || checkList === '2'" 
                        prop="gender" 
                        label="性别"
                    >
                        <template slot-scope="scope">
                            {{scope.row.gender === '1' ?'男':
                                scope.row.gender === '2'?'女':''
                            }}
                        </template>
                    </el-table-column>
                    <el-table-column 
                        v-if="checkList === '2'" 
                        prop="label" 
                        label="标签"
                    ></el-table-column>
                    <el-table-column 
                        v-if="checkList === '3'" 
                        prop="sex" 
                        label="员工数"
                    ></el-table-column>
                    <el-table-column 
                        v-if="checkList === '3'" 
                        prop="mark" 
                        label="备注"
                    ></el-table-column>
                    <el-table-column 
                        label="聊天记录"
                    >
                        <template slot-scope="scope">
                            <el-button 
                                type="primary" 
                                round  
                                @click="openDetail(scope.row)"
                                v-loading.fullscreen.lock="fullscreenLoading"
                            >查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!-- 分页 -->
                <el-pagination 
                    background 
                    layout="prev, pager, next" 
                    :total="this.tablePage.pageTotal" 
                    :page-size="this.tablePage.pageSize" 
                    :current-page="this.tablePage.pageCurrent">
                </el-pagination>
            </div>
        </div>
        <!-- 查询聊天记录 -->
        <div v-else>
            <ChatRecord
                searchInput="inputSearch"
            ></ChatRecord>
        </div>
    </div>
</template>

<script>
export default {
    name: 'index',
    components: {
        ChatRecord: () => import("../components/chatRecord")  //查询聊天记录页面
    },
    data() {
        return {
            inputSearch: "", // 聊天信息

            checkList: '1', // 单选框
            radioList: [     // 单选框组
                {
                    label: "员工",
                    sign: "1"
                },
                {
                    label: "客户",
                    sign: "2"
                },
                {
                    label: "群",
                    sign: "3"
                }
            ],

            options_depart: [], // 部门


            groupList: "", // 分组列表
            options_group: [{
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
            options_tag: [{
                value: '1',
                label: '标签1'
            }, {
                value: '2',
                label: '标签2'
            }],

            clientMess: "", // 客户信息

            // 表格
            tableData: [
                {

                    key: '', // 微信号
                    departmentName: '', // 部门
                    numberclient: '', // 客户数
                    groupchat: "", // 群聊数
                    gender: "", // 性别
                    userid: "",  // 工号
                    name: "",  // 姓名
                    label: "", // 标签
                    mark: "备注",
                    staffno: '7'
                },
            ],

            // 表格页数
            tablePage: {
                pageTotal: 0,  // 表格总数
                pageSize: 10, // 每页大小
                pageCurrent: 1 // 当前页数
            },

            // 搜索筛选条件
            searchData: {
                jobNumber: "", // 工号
                departList:"", // 部门
            },

            fullscreenLoading: false, // 页面加载

        }
    },
    methods: {

        // 跳转到对应详情
        openDetail(val) {
            this.$router.push({
                name: 'Detail',
                path: "/detail",
                query: { 
                    userid: val.userid, 
                    name: val.name,
                    departName: val.departmentName,
                    type: this.checkList 
                }
            });
            // 页面加载
            this.fullscreenLoading = true;
            setTimeout(() => {
                this.fullscreenLoading = false;
            },2000);
        },

        // 聊天记录搜索
        handleInputSearch(e) {
            this.inputSearch = e.target.value
        },

        // 获取部门  
        getDepartList() {
            // this.$axios.post('/WxChat/GetDepartment').then((res) => {
            //     this.options_depart = res.data.body;
            // })
        },

        // 获取列表
        getDataList() {
            // let data = {
            //     pageSize: 10,
            //     pageIndex: 1,
            //     departmentName:this.searchData.departList,
            //     userid: this.searchData.jobNumber,
            // }
            // this.$axios.post('/WxChat/GetUserChatList', data).then((res) => {
            //     if (res.data.status === 0 && res.data.body.result.length > 0) {
            //         this.tableData = res.data.body.result
            //         this.tablePage = res.data.body

            //         // 表格页数
            //         this.tablePage.pageTotal = res.data.body.total
            //         this.tablePage.pageSize = res.data.body.pageSize
            //         this.tablePage.pageCurrent = res.data.body.pageIndex
            //     } else {
            //         this.$message.error(res.data.message)
            //     }
            // })
        }

    },

    created() {
        // this.getDepartList()
        // this.getDataList()
    }
}
</script>

<style lang="less" scoped>
.index {
    .content_top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #d0d0d0;
        padding: 10px 30px;
        .top_title {
            font-size: 16px;
            font-weight: bold;
            color: #101010;
        }
        .top_action {
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
            .action_item {
                .el-select {
                    margin:0px 20px;
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
            }
            .table_staff {
                .staff_no {
                }
                .staff_name {
                }
            }
            .el-pagination {
                text-align: right;
                margin: 20px 15px;
            }
        }
    }
}
</style>
