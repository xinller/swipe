<template>
    <div class="modify-pass-container">
        <van-nav-bar title="修改密码" left-arrow @click-left="goBack" />
        <van-form @submit="onSubmit">
            <van-field
                v-model="form.old_password"
                type="password"
                name="原密码"
                label="原密码"
                placeholder="请输入原密码"
                :rules="[{ required: true, message: '请输入原密码' }]"
            />
            <van-field
                v-model="form.password"
                type="password"
                name="新密码"
                label="新密码"
                placeholder="请输入新密码"
                :rules="[{ required: true, message: '请输入新密码' }]"
            />
            <van-field
                v-model="form.password1"
                type="password"
                name="确认密码"
                label="确认密码"
                placeholder="请确认密码"
                :rules="[{ required: true, message: '请确认密码' }]"
            />
            <div style="margin: 16px;">
                <van-button :disabled="isLoading" class="btn-app" round block type="info" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import * as api from '@/api/api'
export default {
    name: 'modify-pass',
    data() {
        return {
            form: {
                old_password: '',
                password: '',
                password1: '',
                type: 2,
            },
            isLoading: false,
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        onSubmit(values) {
            console.log('submit', values)
            if (this.form.password !== this.form.password1) return this.$toast('请保持密码一致')
            this.isLoading = true
            api.changePass(this.form).then((res) => {
                this.isLoading = false
                if (res.success) {
                    this.$toast('修改成功')
                    setTimeout(() => {
                        this.goBack()
                    }, 1000)
                }
            })
        },
    },
}
</script>

<style lang="less" scoped></style>
