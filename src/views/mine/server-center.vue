<template>
    <div class="server-center-container">
        <van-nav-bar title="客服中心" left-arrow @click-left="goBack" />
        <div class="box">
            <div class="card">
                <img src="../../assets/image/mine/wechat.png" class="img-icon" />
                <div>{{ detail.customer_service_wechat }}</div>
                <div>微信客服</div>
                <div class="mt-10">周一至周六9:00-18:00</div>
            </div>
            <div class="card pb-30 mt-30">
                <img src="../../assets/image/mine/qq.png" class="img-icon" />
                <div>{{ detail.customer_service_qq }}</div>
                <div>QQ客服</div>
                <div class="mt-10">周一至周六9:00-18:00</div>
            </div>
        </div>
    </div>
</template>

<script>
import * as api from '@/api/api'
export default {
    name: 'server-center',
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
            api.customerService().then((res) => {
                if (res.success) {
                    this.detail = res.data
                }
            })
        },
    },
}
</script>

<style lang="less" scoped>
.box {
    background: #fff;
    width: 355px;
    margin: 0 auto;
    margin-top: 10px;
    padding: 20px;
    .card {
        text-align: center;
        font-size: 14px;
        padding-top: 20px;
        .img-icon {
            width: 81px;
            height: 81px;
        }
    }
}
</style>
