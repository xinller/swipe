<template>
    <!-- 商家活动审核概况 -->
    <div class="shop-mark-container">
        <van-nav-bar title="商家活动概况" right-text="联系客服" left-arrow @click-left="goBack" @click-right="toPage('server')" />
        <div class="mark-box">
            <div class="title">店铺名:{{ orderDetail.store_name | format_storename }}</div>
            <div class="card-prod">
                <img :src="orderDetail.goods_image" class="thumb" />
                <div class="prod-desc">
                    <div class="item">
                        <span>活动编号: {{ orderDetail.order_sn }}</span>
                        <span
                            class="btn-copy"
                            v-clipboard:copy="orderDetail.order_sn"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError"
                            >复制</span
                        >
                    </div>
                    <div class="item">
                        <span>活动金额: {{ orderDetail.buy_price }}</span>
                    </div>
                    <div class="item">
                        <span>赏金: {{ orderDetail.bounty_amount }}元</span>
                    </div>
                    <div class="item" v-if="orderDetail.eve_amount > 0">
                        <span>评价赏金: {{ orderDetail.eve_amount }}元</span>
                    </div>
                    <div class="item" v-if="orderDetail.adaeve_amount > 0">
                        <span>追评赏金: {{ orderDetail.adaeve_amount }}元</span>
                    </div>
                </div>
            </div>
            <div class="subtitle" v-if="orderDetail.attention_remark">商家要求</div>
            <div class="spec-title mt-10">
                <div>{{ orderDetail.attention_remark }}</div>
                <div v-if="orderDetail.remark_img" class="flexrow">
                    <img :src="img" v-for="(img, i) in orderDetail.remark_img" :key="i" class="mr-5" />
                </div>
            </div>
        </div>
        <div class="mark-box">
            <div class="title">付款和返款说明</div>
            <div class="size-13 mt-5">
                下单买号: <span class="c-primary">{{ orderDetail.taobao_nickname }}</span>
            </div>
            <div class="size-13 mt-5">
                拍下数量: <span class="c-primary">{{ orderDetail.buy_num }}</span>
            </div>
            <div class="size-13 mt-5">
                应付总金额: <span class="c-primary">{{ orderDetail.buy_price * orderDetail.buy_num }} 元</span>
            </div>
            <div class="size-13 mt-5">
                付款方式:
                <span class="c-primary">{{
                    orderDetail.pay_type == 0
                        ? '无所谓'
                        : orderDetail.pay_type == 1
                        ? '禁止使用花呗、信用卡付款'
                        : '必须使用花呗付款'
                }}</span>
            </div>
            <div class="flex size-13 mt-5">
                <span>货款返还时间: <span class="c-primary">买家收货24小时后自动返</span></span>
                <van-icon @click="dialogPay" class="size-20 ml-10" name="question-o" />
            </div>
        </div>
        <div class="mark-box">
            <div class="btn-line wt-bold" @click="toPage('check-screen-teach')">商家审号-买号截图 图文教程</div>
            <div class="title mt-15">买号审核</div>
            <div class="size-13 mt-5">商家需要买手接单号提交[手机淘宝]资料截图,审核通过后方可开始做任务</div>
            <div class=" flexrow subtitle">
                我的淘宝首屏 <van-icon @click="toPage('check-screen-teach')" class="size-16 ml-10" name="question-o" />
            </div>

            <div class="title mt-20">活动申请概况</div>
            <div class="size-14 mt-5">
                本次活动申请余{{ orderDetail.order_num }}名额,申请{{ orderDetail.examine_doing }}人,已通过{{
                    orderDetail.examine_pass
                }}人
            </div>
            <div class="btn-app mt-15" @click="toCheckApply('commit-check-apply')">下一步 查看申请资格</div>
        </div>

        <!-- 提示 -->
        <v-dialog :visible="isDialog" :closeBtn="false" :title="dialog_title">
            <div slot="content">
                <div v-html="dialog_content"></div>
            </div>
            <div slot="footer" class="dialog-btn" @click="isDialog = false">我知道了</div>
        </v-dialog>
    </div>
</template>

<script>
import VDialog from '../../components/VDialog'
import * as api from '@/api/api'
export default {
    name: 'hall-check-detail',
    components: {
        VDialog,
    },
    data() {
        return {
            isDialog: false, //弹提示框
            dialog_title: '提示',
            dialog_content: '',
            // 0-开始购物 1-货比三家 2-找到宝贝  3-设置浏览 4-下单付款  5-商家发货 6-买家收货 7-商家返款 8-交易完成
            order_id: this.$route.query.id,
            orderDetail: '',
        }
    },
    mounted() {
        this.getExamineDetail()
    },
    filters: {
        format_storename(val) {
            if (!val) return ''
            return val.substring(0, 1) + '**' + val.substring(val.length - 1)
        },
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        toPage(key) {
            this.$router.push({ name: key })
        },
        toCheckApply(key) {
            this.$router.push({ name: key, query: this.$route.query })
        },
        onCopy() {
            this.$toast('复制成功')
        },
        onError() {
            this.$toast('复制失败')
        },
        // 返款提示
        dialogPay() {
            this.isDialog = true
            this.dialog_title = '返款规则'
            this.dialog_content = `<p>一、货返和立返的返款时间?</p>
            <p class="mt-10">"货返"是指确认收货后24小时返还本金,"立返"是指买家付款后24小时内返还本金.</p>
            <p class="mt-10">二、任务满足以下条件的任务,享受“立返”</p>
            <p class="mt-10">1、买家实付金额小于等于商家应付金额.</p>
            <p class="mt-10">2、买家实付金额小于等于当前用户等级的立返上限金额.</p>
            <p class="mt-10">三、具体返款规则在“APP-我的-返款规则”查看.</p>`
        },
        // 详情
        getExamineDetail() {
            this.$toast.loading({ message: '加载中', forbidClick: true })
            api.getExamineDetail({ order_id: this.order_id }).then((res) => {
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

<style lang="less" scoped></style>
