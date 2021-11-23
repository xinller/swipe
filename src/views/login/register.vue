<template>
    <div class="login-container">
        <van-nav-bar title="注册" left-arrow @click-left="goBack"></van-nav-bar>
        <div class="reg-title">鲸鱼注册</div>
        <van-form @submit="onSubmit">
            <van-field
                v-model="form.phone"
                type="tel"
                placeholder="请输入11位中国大陆手机号"
                :error="false"
                :rules="[{ required: true, message: '请输入11位中国大陆手机号' }]"
            />
            <van-field
                v-model="form.password"
                type="password"
                :error="false"
                placeholder="请输入密码(6-20位字母、数字组合)"
                :rules="[
                    { required: true, message: '密码不能为空' },
                    { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: '请输入密码(6-20位字母、数字组合)' },
                ]"
            />
            <van-field
                v-model="form.password1"
                type="password"
                placeholder="请再次输入密码"
                :error="false"
                :rules="[{ required: true, message: '请再次输入密码' }]"
            />
            <van-field
                v-model="form.qq_number"
                placeholder="请输入QQ号"
                :error="false"
                :rules="[{ required: true, message: '请输入QQ号' }]"
            />
            <van-field
                v-model="form.wechat_number"
                placeholder="请输入微信号"
                :error="false"
                :rules="[{ required: true, message: '请输入微信号' }]"
            />
            <van-field
                v-model="form.invite_code"
                placeholder="请输入邀请码"
                :error="false"
                :rules="[{ required: true, message: '请输入邀请码' }]"
            />
            <van-field
                v-model="form.captcha_src"
                center
                clearable
                :error="false"
                placeholder="请输入图形验证码"
                :rules="[{ required: true, message: '请输入图形验证码' }]"
            >
                <template #button>
                    <div class="captcha-box" @click="getCaptcha">
                        <img :src="captcha_url" alt="" />
                    </div>
                </template>
            </van-field>
            <van-field
                v-model="form.verify_code"
                center
                clearable
                placeholder="请输入手机验证码"
                :error="false"
                :rules="[{ required: true, message: '请输入手机验证码' }]"
            >
                <template #button>
                    <span class="c-primary" @click="getCode">{{ code_text }}</span>
                </template>
            </van-field>
            <div class="link-box-reg">
                <van-checkbox icon-size="16px" v-model="checked">点击立即注册表示同意</van-checkbox>
                <router-link class="c-primary" to="/agreement">《用户协议》</router-link>
            </div>
            <van-button class="btn-app" round block type="info" native-type="submit">
                提交
            </van-button>
            <div class="bottom-reg">已有账户 <router-link to="/login">立即登录</router-link></div>
        </van-form>
    </div>
</template>

<script>
import * as api from '@/api/api'
export default {
    name: 'register',
    data() {
        return {
            form: {
                phone: '',
                password: '',
                password1: '',
                qq_number: '',
                wechat_number: '',
                verify_code: '',
                captcha_src: '', //图形验证码
                invite_code: '', //邀请
            },
            checked: false,
            captcha_url: '',
            captcha_key: '',
            code_text: '发送验证码',
        }
    },
    mounted() {
        if (this.$route.query.invite_code) {
            this.form.invite_code = this.$route.query.invite_code
        }
        this.getCaptcha()
    },
    methods: {
        async getCaptcha() {
            this.spinning = true
            let res = await api.getCaptcha({})
            this.spinning = false
            if (res.success) {
                this.captcha_url = res.data.content
                this.captcha_key = res.data.code
            }
        },
        goBack() {
            this.$router.go(-1)
        },
        onSubmit(values) {
            console.log('values', values)
            if (!this.checked) return this.$toast('请勾选用户协议')
            this.form.captcha_key = this.captcha_key
            api.register(this.form).then((res) => {
                if (res.success) {
                    this.$toast('注册成功')
                    this.goBack()
                } else {
                    this.getCaptcha()
                }
            })
        },
        getCode() {
            let phone = this.form.phone
            if (!phone) return this.$toast('请输入手机号')
            if (this.isWaiting) return
            var params = {
                country_code: '86',
                phone: phone,
                time: 60,
                type: 1,
            }
            this.isWaiting = true
            this.remainTime()
            api.getVerify(params).then((res) => {
                if (res.success) {
                    this.$toast(res.data)
                } else {
                    clearInterval(this.interval)
                    this.code_text = '发送验证码'
                    this.isWaiting = false
                }
            })
        },
        remainTime() {
            var time = 60
            this.interval = setInterval(() => {
                this.code_text = time-- + 's'
                if (time < 0) {
                    clearInterval(this.interval)
                    this.code_text = '发送验证码'
                    this.isWaiting = false
                }
            }, 1000)
        },
    },
}
</script>

<style lang="less" scoped></style>
