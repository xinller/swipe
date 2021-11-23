<template>
    <div>
        <van-nav-bar title="未完成" left-arrow @click-left="goBack" />
        <van-tabs v-model="status" animated @click="onClick">
            <van-tab title="全部">
                <undone-list status=""></undone-list>
            </van-tab>
            <van-tab title="已接手">
                <undone-list status="1"></undone-list>
            </van-tab>
            <van-tab title="待发货">
                <undone-list status="2"></undone-list>
            </van-tab>
            <van-tab title="待评价">
                <undone-list status="3"></undone-list>
            </van-tab>
            <van-tab title="待返款">
                <undone-list status="4"></undone-list>
            </van-tab>
            <van-tab title="预售">
                <undone-list status="8"></undone-list>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import UndoneList from './undone-list'
export default {
    name: 'check-undone',
    components: {
        UndoneList,
    },
    data() {
        return {
            status: '', // 0-待接手 1-待接手付款 2-待发货 3-待收货评价 4-待返款      5-待追评 6-已完成 7-已关闭
            // 注意 为了tab 5-预售 记得改成8
            order_status: '',
        }
    },
    mounted() {
        this.status = this.$route.params.status ? this.$route.params.status : ''
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        onClick(name) {
            this.status = name
        },
    },
}
</script>

<style lang="less" scoped></style>
