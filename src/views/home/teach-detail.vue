<template>
    <div class="notice-detail">
        <van-nav-bar title="新手考试资料" left-arrow @click-left="goBack" />
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
    name: 'teach-detail',
    data() {
        return {
            isLoading: false,
            detail: '',
        }
    },
    mounted() {
        this.onRefresh()
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        onRefresh() {
            api.noviceDetail({ id: this.$route.query.id }).then((res) => {
                this.isLoading = false
                if (res.success) {
                    this.detail = res.data
                }
            })
        },
    },
}
</script>

<style></style>
