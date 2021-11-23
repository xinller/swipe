<template>
    <div class="change-record">
        <van-nav-bar title="商家返款记录" left-arrow @click-left="goBack" />
        <van-tabs v-model="status" animated>
            <van-tab title="全部">
                <!-- <backRecordList status=""></backRecordList> -->
            </van-tab>
            <van-tab title="等待转账">
                <!-- <backRecordList status="1"></backRecordList> -->
            </van-tab>
            <van-tab title="已转账">
                <!-- <backRecordList status="2"></backRecordList> -->
            </van-tab>
            <van-tab title="转账失败">
                <!-- <backRecordList status="3"></backRecordList> -->
            </van-tab>
            <van-tab title="未到账">
                <!-- <backRecordList status="4"></backRecordList> -->
            </van-tab>
            <van-tab title="已完成">
                <!-- <backRecordList status="5"></backRecordList> -->
            </van-tab>
            <van-tab title="已退款">
                <!-- <backRecordList status="6"></backRecordList> -->
            </van-tab>
        </van-tabs>
        <backRecordList :status="status"></backRecordList>
    </div>
</template>

<script>
import backRecordList from './back-record-list'
export default {
    name: 'back-record',
    components: {
        backRecordList,
    },
    data() {
        return {
            status: 0,
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
    },
}
</script>

<style scoped lang="less">
body {
    background: #fff;
}
</style>
