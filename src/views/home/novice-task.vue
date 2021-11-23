<template>
    <div class="">
        <van-nav-bar title="新手任务" left-arrow @click-left="toNext('home')" />
        <div class="com-cell-list">
            <van-cell class="com-cell mt-15" :is-link="noviceInfo.is_examination == 0" @click="toNoviceExam">
                <template #title>
                    <img src="../../assets/image/home/task1.png" class="cell-icon" />
                    <span class="custom-title">新手考试</span>
                </template>
                <template #default>
                    <span>{{ noviceInfo.is_examination != 1 ? '未通过' : '已通过' }}</span>
                </template>
            </van-cell>
            <van-cell class="com-cell mt-15" is-link @click="toNext('buy-auth')">
                <template #title>
                    <img src="../../assets/image/home/task2.png" class="cell-icon" />
                    <span class="custom-title">新手认证/买号</span>
                </template>
                <template #default>
                    <span>{{ noviceInfo.is_account != 1 || noviceInfo.is_auth != 1 ? '未完成' : '已完成' }}</span>
                </template>
            </van-cell>
            <van-cell class="com-cell  mt-15" is-link @click="toNext('add-bank')">
                <template #title>
                    <img src="../../assets/image/home/task3.png" class="cell-icon" />
                    <span class="custom-title">提现银行卡</span>
                </template>
                <template #default>
                    <span>{{ noviceInfo.is_setbank != 1 ? '未完成' : '已完成' }}</span>
                </template>
            </van-cell>
            <van-cell class="com-cell  mt-15" is-link @click="toNext('add-wechat-code')">
                <template #title>
                    <img src="../../assets/image/home/task4.png" class="cell-icon" />
                    <span class="custom-title">微信收款码</span>
                </template>
                <template #default>
                    <span>{{ noviceInfo.wx_auth == 1 ? '已完成' : '未完成' }}</span>
                </template>
            </van-cell>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as api from '@/api/api'
export default {
    name: 'novice-task',
    computed: {
        ...mapGetters(['noviceInfo']),
    },
    mounted() {
        this.getUserNoviceInfo()
    },
    methods: {
        toNext(key) {
            this.$router.push({ name: key })
        },
        toNoviceExam() {
            if (this.noviceInfo.is_examination == 1) return
            this.toNext('novice-exam')
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

<style lang="less" scoped>
.com-cell-list .com-cell {
    border-radius: 10px;
}
</style>
