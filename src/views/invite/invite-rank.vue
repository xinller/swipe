<template>
    <!-- 邀请奖励排行榜 -->
    <div class="invite-rank-container">
        <van-nav-bar title="邀请排行榜" left-arrow @click-left="goBack" />
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="v-page">
            <div class="rank-list">
                <van-row class="rank-title">
                    <van-col span="4">排名</van-col>
                    <van-col span="8">名称</van-col>
                    <van-col span="4">邀请人数</van-col>
                    <van-col span="8">奖励</van-col>
                </van-row>
                <van-row class="rank-body" v-for="(item, index) in dataList" :key="index">
                    <van-col span="4">{{ index + 1 }}</van-col>
                    <van-col span="8">{{ item.phone | formatPhone }}</van-col>
                    <van-col span="4">{{ item.push_total }}</van-col>
                    <van-col span="8">{{ item.push_profit }}</van-col>
                </van-row>
            </div>
        </van-pull-refresh>
    </div>
</template>

<script>
import * as api from '@/api/api'
export default {
    name: 'invite-rank',
    data() {
        return {
            dataList: [],
            isLoading: false,
        }
    },
    filters: {
        formatPhone(val) {
            if (!val) return
            return val.substring(0, 3) + '****' + val.substring(val.length - 4)
        },
    },
    mounted() {
        this.onRefresh()
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        onRefresh() {
            api.inviteRank().then((res) => {
                this.isLoading = false
                if (res.success) {
                    this.dataList = res.data
                }
            })
        },
    },
}
</script>

<style lang="less" scoped></style>
