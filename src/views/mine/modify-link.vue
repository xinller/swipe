<template>
    <div class="modify-qq-container">
        <van-nav-bar title="修改紧急联系人" left-arrow @click-left="goBack" />
        <van-form @submit="onSubmit">
            <div class="tip">
                <p>为了方便与您联系,请务必填写真实的紧急联系人电话号码</p>
            </div>
            <van-field
                v-model="link"
                type="number"
                name="link"
                label="紧急联系人"
                placeholder="紧急联系人"
                :rules="[{ required: true, message: '请输入您的真实紧急联系人电话号码' }]"
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
    name: 'modify-link',
    data() {
        return {
            link: '',
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
                    this.link = res.data.emergency_contact
                }
            })
        },
        onSubmit() {
            if (this.isLoading) return
            this.isLoading = true
            api.editUserInfo({ type: 'emergency_contact', val: this.link }).then((res) => {
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
