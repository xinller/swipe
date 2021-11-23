<template>
    <div class="set-container">
        <van-nav-bar title="设置" left-arrow @click-left="goBack" />
        <van-cell title="修改密码" is-link clickable @click="toNext('modify-pass')">
            <template #icon>
                <img src="../../assets/image/mine/set1.png" class="icon" />
            </template>
        </van-cell>
        <van-cell title="修改QQ" is-link clickable @click="toNext('modify-qq')">
            <template #icon>
                <img src="../../assets/image/mine/set2.png" class="icon" />
            </template>
        </van-cell>
        <van-cell title="修改微信" is-link clickable @click="toNext('modify-wechat')">
            <template #icon>
                <img src="../../assets/image/mine/set3.png" class="icon" />
            </template>
        </van-cell>
        <van-cell title="紧急联系人" is-link clickable @click="toNext('modify-link')">
            <template #icon>
                <img src="../../assets/image/mine/set4.png" class="icon" />
            </template>
        </van-cell>
        <van-cell title="版本信息" is-link clickable @click="toNext('modify-version')">
            <template #icon>
                <img src="../../assets/image/mine/set5.png" class="icon" />
            </template>
        </van-cell>
        <!-- <van-cell title="新任务提示音" is-link clickable @click="toNext('modify-voice')">
            <template #icon>
                <img src="../../assets/image/mine/set6.png" class="icon">
            </template>
        </van-cell> -->
        <div class="btn-app" @click="onLogout">退出</div>
    </div>
</template>

<script>
export default {
    name: 'set',
    data() {
        return {}
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        toNext(key) {
            this.$router.push({ name: key })
        },
        onLogout() {
            this.$store.commit('setToken', '')
            this.$router.replace({ name: 'login' })
        },
    },
}
</script>

<style lang="less" scoped>
.icon {
    width: 23px;
    height: 23px;
    margin-right: 10px;
}
.btn-app {
    margin-top: 30px;
    width: 340px;
}
</style>
