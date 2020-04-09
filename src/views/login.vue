<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">土地经营管理系统</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                            type="password"
                            placeholder="password"
                            v-model="ruleForm.password"
                            @keyup.enter.native="login"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p class="login-tips">Tips : 用户名和密码随便填。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {setCookie,getCookie} from '../../assets/js/cookie';
    export default {
        data: function() {
            return {
                ruleForm: {
                    username: "",
                    password: ""
                },
                rules: {
                    username: [
                        { required: true, message: "请输入用户名", trigger: "blur" }
                    ],
                    password: [{ required: true, message: "请输入密码", trigger: "blur" }]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.$axios
                            .post("/api/ajaxLogin", {// 请求后台登陆接口
                                username: this.ruleForm.username,
                                password: this.ruleForm.password
                            })
                            .then(successResponse => {
                                this.responseResult = JSON.stringify(successResponse.data);
                                if (successResponse.data.code === 200) {
                                    console.log("登陆信息" + successResponse.data.loginInfo.roleList);
                                    setCookie('roles',successResponse.data.loginInfo.roleList);// 使用cookie来记录是否登陆，这边跨域
                                    let roles = getCookie('roles');
                                    console.log('cookie' + roles);
                                    localStorage.setItem("ms_username", this.ruleForm.username);// 使用localstoage来记录登陆信息
                                    localStorage.setItem("roles", successResponse.data.loginInfo.roleList);
                                    localStorage.setItem("permissions", successResponse.data.loginInfo.permissionList);
                                    this.$router.push("/");// 跳转路由
                                }
                                if (successResponse.data.code === 400) {
                                    let warnMessage = successResponse.data.message;
                                    this.$message({
                                        message: warnMessage,
                                        type: 'warning'
                                    })
                                }
                            });

                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            }
        }
    };
</script>