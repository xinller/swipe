<template>
    <div class="notice-detail">
        <van-nav-bar title="公告详情" left-arrow @click-left="goBack" />
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="v-page">
            <div class="notice-content">
                <div class="notice-title">{{ detail.title }}</div>
                <div class="notice-time">{{ detail.update_time }}</div>
                <div class="notice-desc" v-html="detail.content"></div>
            </div>
        </van-pull-refresh>
    </div>
</template>

<script>
import * as api from '@/api/api'
export default {
    name: 'noticeDetail',
    data() {
        return {
            detail: '',
            isLoading: false,
        }
    },
    mounted() {
        this.getDetail()
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        // 刷新
        onRefresh() {
            this.getDetail()
        },
        getDetail() {
            this.$toast.loading({ message: '加载中', forbidClick: true })
            api.noticeDetail({ id: this.$route.query.id }).then((res) => {
                this.isLoading = false
                this.$toast.clear()
                if (res.success) {
                    this.detail = res.data
                }
            })
        },
    },
}
</script>

<style></style>
