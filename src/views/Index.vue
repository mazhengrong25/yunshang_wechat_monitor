<!--
 * @Description: 主页
 * @Author: wish.WuJunLong
 * @Date: 2021-04-15 14:40:24
 * @LastEditTime: 2021-05-20 11:26:39
 * @LastEditors: mzr
-->

<template>
    <div class="index">
        <!-- 搜索筛选 -->
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
                <!-- 列表类型 -->
                <div class="action_radio">
                    <el-radio-group 
                        v-model="checkList">
                        <el-radio 
                            v-for="(item,index) in radioList" 
                            :key="index" 
                            :label="item.name">{{item.name}}</el-radio>
                    </el-radio-group>
                </div>
                <!-- 搜索条件 -->
                <div class="action_item">
                    <el-select 
                        style="width:200px" 
                        v-model="searchData.departList" 
                        placeholder="部门"
                        clearable 
                        v-if="checkList === '员工'">
                        <el-option 
                            v-for="item in optionList" 
                            :key="item" 
                            :label="item" 
                            :value="item"></el-option>
                    </el-select>

                    <el-input 
                        style="width:200px"
                        v-model="searchData.jobNumber" 
                        placeholder="工号"
                        clearable
                        v-if="checkList === '员工'"></el-input>

                    <el-select 
                        style="width:200px"
                        v-model="groupList" 
                        placeholder="分组"
                        clearable
                        v-if="checkList === '客户' || checkList === '群聊'">
                        <el-option v-for="item in options_group" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>

                    <el-select
                        style="width:200px" 
                        v-model="tagList" 
                        placeholder="标签"
                        clearable
                        v-if="checkList === '客户'">
                        <el-option v-for="item in options_tag" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>

                    <el-input
                        style="width:200px" 
                        v-model="clientMess" 
                        placeholder="客户信息"
                        clearable  
                        v-if="checkList === '客户'"></el-input>

                    <el-input
                        style="width:200px" 
                        v-model="clientMess" 
                        placeholder="群信息"
                        clearable  
                        v-if="checkList === '群聊'"></el-input>

                    <el-button 
                        style="width:120px"
                        type="primary" 
                        @click="searchBtn">搜索</el-button>
                    
                </div>
            </div>
            <!-- 列表 -->
            <div class="item_table">
                <el-table
                    v-loading="tableLoading" 
                    :data="tableData"
                >
                    <el-table-column 
                        show-overflow-tooltip
                        :label="checkList === '员工'?'员工微信':
                            checkList === '客户'? '客户微信':
                                checkList === '群聊'?'群名称':''"
                    >
                        <template slot-scope="scope">
                            <div class="table_wechat">
                                <div class="table_img">
                                    <img v-if="scope.row.avatar" :src="scope.row.avatar" />
                                    <div v-else class="not_img"><i class="element-icons el-icontupian1"></i></div>
                                </div>
                                <div class="table_item">
                                    <div class="person_name">{{scope.row.name}}</div>
                                    <div class="wechat_no">{{byteLength(scope.row.key)}}</div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        show-overflow-tooltip 
                        :label="checkList === '员工'?'工号/姓名':
                            checkList === '客户'? '所属客服':
                                checkList === '群聊'?'管理员':''"
                    >
                        <template slot-scope="scope">
                            <div class="table_staff">
                                <div class="staff_no">{{byteLength(scope.row.userid)}}</div>
                                <div class="staff_name">{{scope.row.name}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column 
                        prop="departmentName" 
                        :label="checkList === '员工'?'部门':'分组'"
                    ></el-table-column>
                    <el-table-column 
                        v-if="checkList === '员工' || checkList === '群聊'" 
                        prop="numberclient" 
                        label="客户数"
                    ></el-table-column>
                    <el-table-column 
                        v-if="checkList === '客户'" 
                        label="聊天数"
                    ></el-table-column>
                    <el-table-column 
                        v-if="checkList === '员工' || checkList === '客户'" 
                        prop="groupchat" 
                        label="群聊数"
                    ></el-table-column>
                    <el-table-column 
                        v-if="checkList === '员工' || checkList === '客户'" 
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
                        v-if="checkList === '客户'" 
                        prop="label" 
                        label="标签"
                    ></el-table-column>
                    <el-table-column 
                        v-if="checkList === '群聊'" 
                        prop="interiorUser" 
                        label="员工数"
                    ></el-table-column>
                    <el-table-column 
                        v-if="checkList === '群聊'" 
                        label="备注"
                    ></el-table-column>
                    <el-table-column 
                        label="聊天记录"
                        min-width="40%"
                    >
                        <template slot-scope="scope">
                            <el-button 
                                type="primary" 
                                round  
                                @click="openDetail(scope.row)"
                            >查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!-- 分页 -->
                <el-pagination 
                    background 
                    layout="prev, pager, next" 
                    :total="tablePage.pageTotal" 
                    :page-size.sync="tablePage.pageSize" 
                    :current-page.sync="tablePage.pageCurrent"
                    @current-change="changePageIndex"
                >
                </el-pagination>
            </div>
        </div>
        <!-- 查询聊天记录 -->
        <div v-else>
            <ChatRecord
                :inputSearch="inputSearch"
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
            
            inputSearch: "", // 搜索值

            // 搜索筛选条件
            searchData: {
                jobNumber: "", // 工号
                departList:"", // 部门
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

            optionList:[], // 部门
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
        },

        // 输入框搜索
        handleInputSearch(e) {
            this.inputSearch = e.target.value
        },

        // 搜索筛选
        searchBtn(){
            this.tablePage.pageCurrent = 1
            this.getDataList()
        },

        // 获取部门  
        getDepartList() {
            this.$axios.post('/WxChat/GetDepartment').then((res) => {
                this.optionList = res.data.body;
            })
        },

        // 获取列表
        getDataList() {
            let data = {
                pageSize: this.tablePage.pageSize,
                pageIndex: this.tablePage.pageCurrent,
                departmentName:this.searchData.departList,
                search: this.searchData.jobNumber,
                // personneltype: this.checkList
            }
            this.$axios.post('/WxChat/GetUserList', data).then((res) => {
                if (res.data.status === 0 && res.data.body.result.length > 0) {
                    this.tableLoading = false;
                    this.tableData = res.data.body.result
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

        // 表格翻页
        changePageIndex(){
            this.getDataList()
        },

        // 字符串长度判断
        byteLength(val) {
            if(val.length < 10) {
                return val
            }else {
                return ''
            }
        }

      

    },

    created() {
        this.getDepartList()
        this.getDataList()
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
                    background-color: lightgray;
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
        }
    }
}
</style>
