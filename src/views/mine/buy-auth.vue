<template>
    <!-- 新手认证/买号 -->
    <div class="buynum-index">
        <van-nav-bar title="新手认证/买号" left-arrow @click-left="goBack" />
        <div class="com-cell-list">
            <div class="tip">
                <span class="left">认证信息</span>
                <span class="right">银行卡信息必须与身份证一致</span>
            </div>
            <van-cell class="com-cell" is-link @click="toNext('auth')">
                <template #title>
                    <img src="../../assets/image/home/auth.png" class="cell-icon" />
                    <span class="custom-title">实名认证</span>
                </template>
                <template #default>
                    <span class="c-primary">{{
                        noviceInfo.is_auth == 0
                            ? '未认证'
                            : noviceInfo.is_auth == 2
                            ? '待认证'
                            : noviceInfo.is_auth == -1
                            ? '未通过'
                            : '已认证'
                    }}</span>
                </template>
            </van-cell>
        </div>

        <div class="com-cell-list">
            <div class="tip">
                <span class="left">买号信息</span>
                <span class="right">添加一个淘宝账号并且通过审核即可完成新手任务</span>
            </div>
            <van-cell class="com-cell" is-link @click="toNext('buy-manage')">
                <template #title>
                    <img src="../../assets/image/home/taobao.png" class="cell-icon" />
                    <span class="custom-title">淘宝</span>
                </template>
                <template #default>
                    <span class="c-primary">{{ noviceInfo.is_account == 0 ? '未认证' : '已认证' }}</span>
                </template>
            </van-cell>
        </div>
    </div>
</template>

<script>
import * as api from '@/api/api'
import { mapGetters } from 'vuex'

export default {
    name: 'buy-auth',
    computed: {
        ...mapGetters(['noviceInfo']),
    },
    mounted() {
        this.getUserNoviceInfo()
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        toNext(key) {
            if (key == 'auth') {
                if (this.noviceInfo.is_auth == 2) {
                    return this.$toast('您的身份待审核,请耐心等待')
                }
            }
            this.$router.push({ name: key })
        },

        getUserNoviceInfo() {
            api.getUserNoviceInfo().then((res) => {
                this.$toast.clear()
                if (res.success) {
                    let data = res.data
                    this.$store.commit('setNoviceInfo', data)
                }
            })
        },
    },
}
</script>

<style></style>
