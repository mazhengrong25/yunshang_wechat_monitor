<!--
 * @Description: 登录页
 * @Author: mzr
 * @Date: 2021-06-25 09:42:43
 * @LastEditTime: 2021-07-09 17:32:53
 * @LastEditors: mzr
-->
<template>
    <div class="login">
        <div class="login_header">
            <div class="login_icon"><img :src="require('@/static/login_icon.png')" alt="图标" /></div>
        </div>
        <div class="login_content">
            <div class="content_left"><img :src="require('@/static/login_img.png')" alt="背景" /></div>
            <div class="content_right">
                <div class="right_item">
                    <div class="right_title">云上企微监控</div>
                    <div class="right_mark">请使用OA账号登陆</div>
                </div>
                <div class="right_input">
                    <div class="input_item">
                        <div class="input_bar"></div>
                        <el-input v-model="accountNumber" placeholder="账号" clearable></el-input>
                    </div>
                    <div class="input_item">
                        <div class="input_bar"></div>
                        <el-input v-model="passWord" placeholder="密码" show-password></el-input>
                    </div>
                </div>
                <div class="right_check">
                    <el-checkbox v-model="checked">记住我</el-checkbox>
                </div>
                <div class="right_button">
                    <el-button type="primary" round style="width:320px" @click="jumpIndex">登录</el-button>
                </div>
            </div>
        </div>
        <p>重庆云上航空企业微信监控平台</p>
    </div>

</template>

<script>
export default {
    name: "login",
    components: {

    },
    data() {
        return {

            checked: true, // 单选框
            accountNumber: "7928", // 账号
            passWord: "MSQ19970.0", // 密码

            data: {}, // 数据
        }
    },
    methods: {

        // 跳转到聊天存档
        jumpIndex() {

            let data = {
                accountNumber: this.accountNumber, // 账号
                passWord: this.passWord, // 密码
            }
            this.$axios.post("/Login", data).then((res) => {
                if (res.data.status === 0) {
                    this.data = res.data.body
                    localStorage.setItem('UserId', this.accountNumber);
                    this.$router.push({
                        name: 'Index', 
                        path: "/index",
                    });
                } else {
                    this.$message(res.message)
                }
            }
            )
        }
    },
    created() {

    }
}
</script>

<style lang="less" scoped>
.login {
    width: 100%;
    height: 100%;
    background-color: #e7ecf9;
    .login_header {
        width: 158px;
        margin: 0 auto;
        padding: 62px 0px 36px;
        .login_icon {
            width: 158px;
            height: 62px;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
    .login_content {
        width: 1000px;
        margin: 0 auto;
        display: flex;
        box-shadow: 0px 0px 50px #ced5e9;
        .content_left {
            width: 500px;
            height: 580px;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .content_right {
            width: 500px;
            background-color: #fff;
            .right_item {
                width: 196px;
                margin: 105px auto 0px;
                .right_title {
                    font-size: 28px;
                    font-weight: 400;
                    line-height: 37px;
                    color: #0070e2;
                    text-align: center;
                    letter-spacing: 4px;
                }
                .right_mark {
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 19px;
                    color: #afb9c4;
                    text-align: center;
                    margin: 17px 0px 35px;
                    letter-spacing: 2px;
                }
            }
            .right_input {
                width: 320px;
                margin: 0 auto;
                .input_item {
                    display: inline-flex;
                    .input_bar {
                        width: 6px;
                        height: 38px;
                        background: #0070e2;
                    }
                    /deep/ .el-input {
                        width: 314px;
                        margin-bottom: 26px;
                        .el-input__inner {
                            height: 38px;
                            background-color: #f7f7f7;
                            border: 1px solid #f7f7f7;
                        }
                    }
                }
            }
            .right_check {
                width: 50px;
                margin: 0 92px auto;
                margin-bottom: 40px;
                /deep/ .el-checkbox__inner {
                    width: 18px;
                    height: 18px;
                    border: 1px solid #d9e1ea;
                    border-radius: 2px;
                    &::after {
                        border: 2px solid #0070e2;
                        height: 9px;
                        left: 6px;
                        border-left: 0;
                        border-top: 0;
                    }
                }

                /deep/ .el-checkbox__input.is-checked .el-checkbox__inner,
                .el-checkbox__input.is-indeterminate .el-checkbox__inner {
                    background-color: unset;
                    border-color: #d9e1ea;
                }

                /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
                    color: #d9e1ea;
                }
                /deep/ .el-checkbox {
                    color: #d9e1ea;
                }
            }
            .right_button {
                width: 320px;
                margin: 0 auto;
            }
        }
    }
    p {
        margin: 93px auto 41px;
        width: 241px;
        font-size: 12px;
        font-weight: 400;
        line-height: 16px;
        color: #a5abbb;
        text-align: center;
    }
}
</style>