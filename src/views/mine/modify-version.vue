<template>
    <div class="modify-version-container">
        <van-nav-bar title="版本信息" left-arrow @click-left="goBack" />
        <div class="version">
            <img src="../../assets/image/mine/logo.png" class="logo" />
            <div>当前版本1.0.0</div>
        </div>
        <div class="context">
            <div class="size-16 wt-bold">版本介绍</div>
            <div class="size-14 mt-10" v-html="detail">新增优质活动,优质账号可获得更多鲸币</div>
        </div>
    </div>
</template>

<script>
import * as api from '@/api/api'
export default {
    name: 'modify-version',
    data() {
        return {
            detail: '',
        }
    },
    mounted() {
        this.getProtocol()
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        getProtocol() {
            api.getProtocol({ type: 2 }).then((res) => {
                if (res.success) {
                    this.detail = res.data
                }
            })
        },
    },
}
</script>

<style lang="less" scoped>
.version {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .logo {
        width: 63px;
        height: 63px;
    }
    font-size: 14px;
    div {
        margin-top: 10px;
    }
}
.context {
    padding: 10px;
    background: #fff;
    margin-top: 20px;
}
</style>
