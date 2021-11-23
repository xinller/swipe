<template>
    <!-- 我的主页 -->
    <div class="mine-index">
        <van-nav-bar title="收款方式" left-arrow @click-left="goBack" />
        <div class="com-cell-list">
            <van-cell class="com-cell" is-link @click="toNext('add-wechat-code')">
                <template #title>
                    <img src="../../assets/image/mine/wechat-code.png" class="cell-icon" />
                    <span class="custom-title">微信收款码</span>
                </template>
            </van-cell>
            <van-cell class="com-cell" is-link @click="toNext('add-bank')">
                <template #title>
                    <img src="../../assets/image/mine/card.png" class="cell-icon" />
                    <span class="custom-title">添加银行卡</span>
                </template>
            </van-cell>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Mine',
    data() {
        return {}
    },

    mounted() {},
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        toNext(key) {
            this.$router.push({ name: key })
        },
    },
}
</script>
<style lang="less">
.com-cell-list {
    width: 375px;
    .com-cell:nth-of-type(1),
    .com-cell:nth-last-of-type(1) {
        border-radius: 0;
    }
}
</style>
