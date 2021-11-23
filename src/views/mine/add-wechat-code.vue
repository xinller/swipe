<template>
    <div class="wechat-code-container">
        <van-nav-bar title="上传微信收款码" left-arrow @click-left="goBack" />
        <div class="v-page">
            <div class="wechat-box">
                <van-uploader :after-read="afterRead" accept="image/*">
                    <img src="../../assets/image/mine/upload.png" class="wechat-code" v-if="!wx_address" />
                    <img :src="BASE_URL + wx_address" v-if="wx_address" class="wechat-code" />
                </van-uploader>
            </div>
            <div class="size-13 mt-20 plr-15 txt-ct">
                <span
                    >微信收款码状态: <span class="c-primary">{{ noviceInfo.wx_auth | formatType }}</span></span
                >
            </div>
            <van-button class="btn-app mt-20" :disabled="noviceInfo.wx_auth == 1 || noviceInfo.wx_auth == 2" @click="commit"
                >立即提交</van-button
            >
            <div class="size-12 c-red mt-30 plr-15">
                注意:务必保证收款码信息准确,否则无法返款,如需修改请联系客服
                <!-- 说明:微信收款码请根据自己个人需求决定是否上传,可接受微信返款方式的可以上传,不接受微信返款方式的可以不传,不影响正常的银行卡返款 -->
            </div>
        </div>
    </div>
</template>

<script>
import * as api from '@/api/api'
import { mapGetters } from 'vuex'
export default {
    name: 'add-wechat-code',
    data() {
        return {
            wx_address: '',
        }
    },
    computed: {
        // 0-未认证 1-已认证 2-待认证 3-认证失败
        ...mapGetters(['noviceInfo']),
    },
    mounted() {
        this.getUserDetail()
        this.getUserNoviceInfo()
    },
    filters: {
        formatType(val) {
            switch (Number(val)) {
                case 0:
                    return '未认证'
                case 1:
                    return '已认证'
                case 2:
                    return '待认证'
                case 3:
                    return '认证失败'
            }
        },
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        afterRead(file) {
            this.upload('wx_address', file.content)
        },
        upload(type, fileBase64) {
            this.$toast.loading({ message: '提交中请勿重复点击', forbidClick: true })
            api.image_upload({ base_str: fileBase64, type: 4 }).then((res) => {
                this.$toast.clear()
                if (res.success) {
                    this[type] = res.data
                }
            })
        },
        getUserDetail() {
            api.getUserDetail().then((res) => {
                if (res.success) {
                    this.wx_address = res.data.wx_address
                }
            })
        },
        commit() {
            if (!this.wx_address) return this.$toast('请上传微信收款码图片')
            api.editUserInfo({ type: 'wx_address', val: this.wx_address }).then((res) => {
                if (res.success) {
                    this.$toast('提交成功')
                    this.getUserNoviceInfo()
                    this.goBack()
                }
            })
        },
        getUserNoviceInfo() {
            api.getUserNoviceInfo().then((res) => {
                if (res.success) {
                    let data = res.data
                    this.$store.commit('setNoviceInfo', data)
                }
            })
        },
    },
}
</script>

<style lang="less" scoped>
.wechat-code-container {
    background: #fff;
    .btn-app {
        width: 200px;
    }
    .wechat-box {
        text-align: center;
        width: 200px;
        height: 300px;
        background-color: #f0f0f0;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-top: 20px;
        .wechat-code {
            width: 150px;
            max-height: 150px;
            // height: 100px;
        }
    }
}
</style>
