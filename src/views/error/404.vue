<template>
    <div class="error404">
        <div class="error404-body-con">
            <div class="error-card">
                <div class="error404-body-con-title">
                    4
                    <span>
                        0
                        <!-- <Icon type="frown"></Icon> -->
                    </span>
                    4
                </div>
                <p class="error404-body-con-message">YOU&nbsp;&nbsp;LOOK&nbsp;&nbsp;LOST</p>
                <div class="error404-btn-con">
                    <van-button @click="goHome" type="default" class="mr-10">返回首页</van-button>
                    <van-button @click="backPage" type="info">返回上一页</van-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Error404',
    methods: {
        backPage() {
            this.$router.go(-1)
        },
        goHome() {
            this.$router.push({
                name: 'home',
            })
        },
    },
}
</script>
<style lang="less" scoped>
@import './404.less';
</style>
