<template>
    <div class="notice-detail">
        <van-nav-bar title="用户协议" left-arrow @click-left="goBack" />
        <div class="notice-content">
            <!-- <div class="notice-title">{{ detail.title }}</div>
            <div class="notice-time">2020-10-12 22:33:22</div> -->
            <div class="notice-desc" v-html="detail"></div>
        </div>
    </div>
</template>

<script>
import * as api from '@/api/api'
export default {
    name: 'agreement',
    data() {
        return {
            detail: '',
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        getData() {
            api.getProtocol({ type: 1 }).then((res) => {
                if (res.success) {
                    this.detail = res.data
                }
            })
        },
    },
}
</script>

<style></style>
