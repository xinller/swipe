<template>
    <div class="login-container">
        <van-nav-bar title="忘记密码" left-arrow @click-left="goBack"></van-nav-bar>
        <van-form @submit="onSubmit">
            <van-field
                v-model="form.phone"
                type="tel"
                :error="false"
                placeholder="请输入注册手机号"
                :rules="[{ required: true, message: '请输入注册手机号' }]"
            />

            <van-field
                v-model="form.verify_code"
                center
                clearable
                :error="false"
                placeholder="请输入手机验证码"
                :rules="[{ required: true, message: '请输入手机验证码' }]"
            >
                <template #button>
                    <span class="c-primary" @click="getCode">{{ code_text }}</span>
                </template>
            </van-field>
            <van-field
                v-model="form.captcha"
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
                v-model="form.password"
                type="password"
                :error="false"
                placeholder="请输入密码(6-20位字母、数字组合)"
                :rules="[
                    { required: true, message: '请输入密码(6-20位字母、数字组合)' },
                    { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: '请输入密码(6-20位字母、数字组合)' },
                ]"
            />
            <van-field
                v-model="form.repassword"
                type="password"
                :error="false"
                placeholder="请确认密码"
                :rules="[{ required: true, message: '请确认密码' }]"
            />
            <van-button class="btn-app" round block type="info" native-type="submit">完成</van-button>
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
                repassword: '',
                verify_code: '',
                captcha: '',
            },
            captcha_url: '',
            captcha_key: '',
            code_text: '发送验证码',
        }
    },
    mounted() {
        this.getCaptcha()
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },

        async getCaptcha() {
            this.spinning = true
            let res = await api.getCaptcha({})
            this.spinning = false
            if (res.success) {
                this.captcha_url = res.data.content
                this.captcha_key = res.data.code
            }
        },
        onSubmit(values) {
            console.log('values', values)
            this.form.captcha_key = this.captcha_key
            api.forgetLoginPass(this.form).then((res) => {
                if (res.success) {
                    this.$toast('修改成功')
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
                type: 2,
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
