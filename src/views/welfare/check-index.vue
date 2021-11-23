<template>
    <div class="check-index-container">
        <van-nav-bar title="商家审号" right-text="联系客服" left-arrow @click-left="goBack" @click-right="toNext('server')" />
        <van-tabs v-model="status" animated>
            <van-tab title="全部">
                <check-list status=""></check-list>
            </van-tab>
            <van-tab title="待审核">
                <check-list status="0"></check-list>
            </van-tab>
            <van-tab title="已通过">
                <check-list status="1"></check-list>
            </van-tab>
            <van-tab title="已拒绝">
                <check-list status="2"></check-list>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import checkList from './check-list'
export default {
    name: 'check-index',
    components: {
        checkList,
    },
    data() {
        return {
            status: 0,
        }
    },
    methods: {
        toNext(key) {
            this.$router.push({ name: key })
        },
        goBack() {
            this.$router.go(-1)
        },
    },
}
</script>

<style lang="less" scoped></style>
