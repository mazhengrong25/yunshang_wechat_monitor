<!--
 * @Description: 后台配置项
 * @Author: 7928
 * @Date: 2021年6月24日11:38:32
 * @LastEditTime: 2021年6月24日11:38:32
 * @LastEditors: 7928
-->
<template>
    <el-card class="box-card" shadow="never" style="height:100%;">
        <el-tabs type="border-card" stretch>
            <el-tab-pane label="用户配置">
                <el-row>
                    <el-col :span="24">
                        <el-button type="primary" @click="formPage()">用户添加</el-button>
                    </el-col>
                </el-row>
                <el-dialog title="添加用户信息" :visible.sync="formvisible" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
                    <el-form ref="form" :model="form" label-width="120px" :rules="rules">
                        <el-form-item label="工号:" prop="configNumber">
                            <el-input v-model="form.configNumber" placeholder="请输入工号"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名:" prop="configName">
                            <el-input v-model="form.configName" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="查看的部门:" prop="departmentId">
                            <el-cascader ref="cascader" v-model="form.departmentId" :props="props" :options="cascaderTable" placeholder="请选择查看部门" collapse-tags :show-all-levels="false" @change="change"></el-cascader>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="AddUser('form')">{{button}}</el-button>
                            <el-button @click="closePage('form')">取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>

            </el-tab-pane>

            <el-main>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="工号" prop="ConfigNumber" width="180">
                    </el-table-column>
                    <el-table-column label="姓名" prop="ConfigName" width="180">
                    </el-table-column>
                    <el-table-column label="查看部门" prop="DepartmentNameList" width="300">
                    </el-table-column>
                    <el-table-column label="查看部门人员" prop="StaffidNameList" width="300">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-tabs>
    </el-card>

</template>

<script>
export default {
    name: "config",
    data() {
        return {
            form: {
                configName: "",
                configNumber: "",
                departmentId: "",
                departmentIds:"",
                departmentName: "",
                staffidList: "",
                staffidNameList: ""
            },
            formvisible: false,
            props: {
                multiple: true,
                value: "id",
                label: "name"
            },
            tableData: [],
            rules: {
                configName: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                configNumber: [
                    { required: true, message: '请输入工号', trigger: 'blur' },
                ],
                pwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                departmentId: [
                    { required: true, message: '请选择查看部门', trigger: 'change' }
                ]
            },
            button: "立即创建",
            cascaderTable: [],
            cascader: [],
        };
    },
    mounted() {
        this.QueryData();
        this.getProvence();
    },
    methods: {
        formPage() {
            this.formvisible = true;
        },
        closePage(formName) {
            this.formvisible = false;
            this.$refs[formName].resetFields();
        },
        getProvence() {
            this.$axios.post('/DepartmentLevel').then((res) => {
                if (res.data.status != 0) return;
                this.cascader = res.data.body;
                this.cascaderTable = this.createTree(res.data.body).children;
            })
        },

        createTree(arr, current) {
            if (!current) {
                current = arr.find(x => x.id == 1)
            }
            var filter = arr.filter(x => x.parentid == current.id);
            if (filter.length > 0) {
                current.children = filter
                current.children?.forEach(item => {
                    item = this.createTree(arr, item, item.id)
                })
            }
            return current;
        },



        AddUser(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.form.departmentId = this.form.departmentId.toString();
                    this.form.departmentIds = this.form.departmentIds.toString();
                    this.form.departmentName = this.form.departmentName.toString();
                    this.$axios.post('/AddUser', this.form).then((res) => {
                        if (res.data.status == 0) {
                            this.form = {};
                            this.$message({ message: "添加成功", type: 'success', duration: 1000 });
                            this.formvisible = false;
                        }
                       this.QueryData();
                    })
                } else {
                    this.$message({ message: "添加失败", type: 'error', duration: 1000 });
                    return false;
                }
            });
        },
        handleDelete(index, row) {
            var data = {
                id: row.Id
            }
            this.$axios.post('/DeleteUserRole', data).then((res) => {
                this.$message({ message: "删除成功", type: 'success', duration: 1000 });
                this.QueryData();
            })

        },
        QueryData() {
            this.$axios.post('/QueryUserRole').then((res) => {
                if (res.data.status == 0) {
                    this.tableData = res.data.body;
                }
            })
        },
        change(obj) {
            var checked = this.$refs["cascader"].getCheckedNodes();
            var result = new Array();
            var resultId = new Array();
            checked.forEach(item => {
                if (item.children.length == 0) {
                    result.push(item.label);
                    resultId.push(item.value);
                }
            })
            this.form.departmentName = result;
            this.form.departmentIds = resultId;
        }


    }
};
</script>


<style>
.el-input {
    max-width: 300px;
    width: 250px;
}

input {
    max-width: 250px;
}
</style>