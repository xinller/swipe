<template>
    <div class="modify-qq-container">
        <van-nav-bar title="修改微信" left-arrow @click-left="goBack" />
        <van-form @submit="onSubmit">
            <div class="tip">
                <p>为了方便与您联系,请填写真实的微信</p>
            </div>
            <van-field
                v-model="wechat"
                name="wechat"
                label="微信"
                placeholder="请输入微信"
                :rules="[{ required: true, message: '请输入微信' }]"
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
    name: 'modify-wechat',
    data() {
        return {
            wechat: '',
            isLoading: false,
        }
    },
    mounted() {
        this.getUserDetail()
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },

        getUserDetail() {
            api.getUserDetail().then((res) => {
                if (res.success) {
                    this.wechat = res.data.wechat_account
                }
            })
        },
        onSubmit() {
            if (this.isLoading) return
            this.isLoading = true
            api.editUserInfo({ type: 'wechat_account', val: this.wechat }).then((res) => {
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

<style lang="less" scoped>
.tip {
    font-size: 12px;
    color: #666;
    background: #fef5e1;
    padding: 15px 20px;
    text-align: center;
}
</style>
