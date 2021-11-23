<template>
    <!-- 商家审号 订单详情 -->
    <div class="list-detail-container">
        <van-nav-bar title="活动订单详情" left-arrow @click-left="goBack" />
        <div class="desc-top">
            <div class="status">已关闭</div>
            <div class="reason">
                关闭原因:
                <span v-if="orderDetail.close_type == '6'">支付/预售加购超时,重新发布</span>
                <span v-if="orderDetail.close_type == '1'">找不到宝贝</span>
                <span v-if="orderDetail.close_type == '2'">没时间做</span>
                <span v-if="orderDetail.close_type == '3'">实际价格高于货款</span>
                <span v-if="orderDetail.close_type == '4'">达不到商家备注要求</span>
                <span v-if="orderDetail.close_type == '5'">其他原因</span>
            </div>
        </div>
        <van-cell title="活动订单编号:">
            <template #default>
                <span>{{ orderDetail.order_sn }}</span>
                <span
                    class="btn-copy"
                    v-clipboard:copy="orderDetail.order_sn"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                    >复制</span
                >
            </template>
        </van-cell>
        <van-cell title="活动金额:" :value="orderDetail.buy_price + '元'"></van-cell>
        <van-cell title="活动赏金:" :value="orderDetail.bounty_amount + '元'"></van-cell>
        <van-cell v-if="orderDetail.eve_amount > 0" title="评价赏金:" :value="orderDetail.eve_amount + '元'"></van-cell>
        <van-cell v-if="orderDetail.adaeve_amount > 0" title="追评赏金:" :value="orderDetail.adaeve_amount + '元'"></van-cell>
        <van-cell title="开始时间:" :value="orderDetail.receive_time"></van-cell>
        <van-cell title="结束时间:" :value="orderDetail.end_time"></van-cell>
    </div>
</template>

<script>
import * as api from '@/api/api'
export default {
    name: 'list-detail',
    data() {
        return {
            orderDetail: '',
        }
    },
    mounted() {
        this.getOrderDetail()
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },

        onCopy() {
            this.$toast('复制成功')
        },
        onError() {
            this.$toast('复制失败')
        },
        // 详情
        getOrderDetail() {
            this.$toast.loading({ message: '加载中', forbidClick: true })
            api.orderDetail({ order_id: this.$route.query.id }).then((res) => {
                if (res.success) {
                    this.$toast.clear()
                    this.orderDetail = res.data
                } else {
                    this.$toast.clear()
                }
            })
        },
    },
}
</script>

<style lang="less" scoped>
.desc-top {
    padding: 16px;
    color: #fff;
    background-color: #00a8fc;
    .status {
        font-size: 20px;
    }
    .reason {
        font-size: 14px;
        margin-top: 15px;
    }
}
.btn-copy {
    font-size: 12px;
    padding: 1px 10px;
    border-radius: 10px;
    color: #fff;
    background-color: #00a8fc;
    margin-right: 10px;
}
</style>
