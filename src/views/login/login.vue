<template>
    <div class="login-container">
        <van-nav-bar title="登录"></van-nav-bar>
        <img src="../../assets/image/login/login-bg.png" class="login-bg" />
        <div class="title">鲸鱼</div>
        <van-form @submit="onSubmit">
            <van-field
                v-model="phone"
                name="手机号"
                placeholder="请输入手机号"
                :rules="[{ required: true, message: '请输入手机号' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="密码"
                placeholder="请输入密码"
                :rules="[{ required: true, message: '请输入密码' }]"
            />
            <div class="link-box">
                <van-checkbox icon-size="16px" v-model="checked">记住密码</van-checkbox>
                <router-link to="/forget">忘记密码?</router-link>
            </div>

            <van-button class="btn-app" round block type="info" native-type="submit">登录</van-button>
            <div class="bottom-reg">没有账户 <router-link to="/register">立即注册</router-link></div>
        </van-form>
    </div>
</template>

<script>
import * as api from '@/api/api'
export default {
    name: 'login',
    data() {
        return {
            phone: '',
            password: '',
            checked: false,
        }
    },
    mounted() {
        this.initData()
    },
    methods: {
        initData() {
            this.phone = localStorage.getItem('USER_PHONE') ? localStorage.getItem('USER_PHONE') : ''
            this.password = localStorage.getItem('USER_PASS') ? localStorage.getItem('USER_PASS') : ''
        },
        onSubmit(values) {
            console.log('submit', values)
            if (this.checked) {
                localStorage.setItem('USER_PHONE', this.phone)
                localStorage.setItem('USER_PASS', this.password)
            }
            this.$toast.loading({ message: '正在登录,请稍后', forbidClick: true })
            api.login({ phone: this.phone, password: this.password }).then((res) => {
                this.$toast.clear()
                if (res.success) {
                    this.$store.commit('setToken', res.data.token)
                    this.$store.commit('setOnLogin', true)
                    this.$store.commit('setUserInfo', res.data)
                    this.$router.replace({ name: 'home' })
                }
            })
        },
    },
}
</script>

<style lang="less" scoped></style>
