<template>
    <div class="asset-detail">
        <van-nav-bar title="鲸币交易详情" left-arrow @click-left="goBack" />
        <van-cell-group>
            <van-cell title="交易流水号:">
                <template #default>
                    <span class="cell-right">{{ detail.id }}</span>
                    <span class="btn-copy" v-clipboard:copy="detail.id" v-clipboard:success="onCopy" v-clipboard:error="onError"
                        >复制</span
                    >
                </template>
            </van-cell>
            <!-- <van-cell title="订单号:">
                <template #default>
                    <span class="btn-copy">复制</span>
                    <span class="cell-right">325325123</span>
                </template>
            </van-cell> -->
            <van-cell title="时间:">
                <template #default>
                    <span class="cell-right">{{ detail.update_time }}</span>
                </template>
            </van-cell>
            <van-cell title="业务类型:">
                <template #default>
                    <span class="cell-right">{{ detail.remark }}</span>
                </template>
            </van-cell>
            <van-cell title="账户变动金额:">
                <template #default>
                    <span class="cell-right"
                        >{{ detail.change_type == 0 ? '-' : '+' }}{{ Number(detail.amount).toFixed(2) }}</span
                    >
                </template>
            </van-cell>
            <van-cell title="鲸币余额:">
                <template #default>
                    <span class="cell-right">{{ total }}</span>
                </template>
            </van-cell>
            <van-cell title="备注:">
                <template #default>
                    <span class="cell-right">无</span>
                </template>
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
export default {
    name: 'asset-detail',
    data() {
        return {
            detail: this.$route.query,
            total: this.$route.query.total,
        }
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
    },
}
</script>

<style></style>
