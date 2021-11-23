<template>
    <div class="exam-result">
        <van-nav-bar title="考试成功" left-arrow @click-left="goBack" />
        <div class="exam-success">
            <img src="../../assets/image/home/yes.png" alt="" />
            <div class="c-primary size-18">恭喜哦,你已经通过考试拉~</div>
            <div class="c-gray size-12">点击返回首页,开始接单吧!</div>
            <router-link class="back" to="/">返回首页</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'exam-result',
    data() {
        return {
            radio: '1',
            yesIcon: require('../../assets/image/home/yes.png'),
            noIcon: require('../../assets/image/home/no.png'),
        }
    },
    methods: {
        goBack() {
            this.$router.replace({ name: 'home' })
        },
    },
}
</script>

<style></style>
