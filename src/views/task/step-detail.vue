<template>
    <div class="step-detail">
        <van-nav-bar title="活动详情" right-text="联系客服" left-arrow @click-left="goBack" @click-right="goPage('server')" />
        <div class="shop-card">
            <div class="card-list">
                <span>
                    活动摘要:
                    <span class="pre-sale mr-5" v-if="orderDetail.is_pre == 1">预售</span>
                    <span class="pre-zp" v-if="orderDetail.add_evaluate == 1">追评</span>
                    <span class="round" v-for="(item, i) in browse_arr" :key="i">{{ util.formatBrowse(item) }}</span>
                </span>
            </div>
            <div class="card-list">
                <span>活动订单编号:{{ orderDetail.order_sn }}</span>
                <span
                    class="btn-copy"
                    v-clipboard:copy="orderDetail.order_sn"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                    >复制</span
                >
            </div>
            <!-- 倒计时效果 -->
            <div class="card-list">剩余时间:{{ orderDetail.end_t_show }}</div>
            <div class="card-list" style="margin-top:20px">
                <div class="card-left">
                    <img :src="orderDetail.goods_image" class="thumb" />
                    <div class="desc">
                        <p>
                            活动金额: <span class="c-red">{{ orderDetail.buy_price }}</span
                            >元
                        </p>
                        <p>买手号: {{ orderDetail.taobao_nickname }}</p>
                    </div>
                </div>
                <span class="btn-close" v-if="orderDetail.step < 4" @click="isCloseTask = true">关闭</span>
            </div>
        </div>
        <van-cell
            title="活动流程"
            :value="'订单详情: ' + format_status(orderDetail.status)"
            style="background:transparent"
        ></van-cell>
        <van-collapse v-model="activeName" accordion class="novice-teach">
            <van-collapse-item name="2">
                <template #title>
                    <span class="step_tag">1</span>
                    <span class="pl-10">找到宝贝</span>
                </template>
                <template #default>
                    <div class="accord_find_baby">
                        <div class="site">
                            <span class="text">宝贝位置</span>
                            <img v-if="orderDetail.find_goods_img" :src="orderDetail.find_goods_img" class="thumb" />
                        </div>
                        <div class="find_key" v-if="orderDetail.competitive_product_1">
                            淘口令竞品1:{{ orderDetail.competitive_product_1 }}
                        </div>
                        <div class="find_key" v-if="orderDetail.competitive_product_2">
                            淘口令竞品2:{{ orderDetail.competitive_product_2 }}
                        </div>
                        <!-- 步骤完成的按钮隐藏 , 未做完 显示继续 回到当前步骤(货比三家?找宝贝位置?) -->
                        <div class="txt-rt">
                            <van-button
                                :disabled="orderDetail.step >= 4"
                                class="step_btn"
                                color="#00a8fc"
                                size="mini"
                                round
                                @click="toEdit"
                                >修改活动</van-button
                            >
                        </div>
                    </div>
                </template>
            </van-collapse-item>
            <van-collapse-item name="3">
                <template #title>
                    <span :class="['step_tag', { gray: orderDetail.step < 2 }]">2</span>
                    <span class="pl-10">下单付款</span>
                </template>
                <template #default>
                    <div class="accord_pay">
                        <div class="pay_item">
                            <span>付款方式</span>
                            <span class="c-primary">
                                {{
                                    orderDetail.pay_type == 0
                                        ? '无所谓'
                                        : orderDetail.pay_type == 1
                                        ? '禁止使用花呗、信用卡付款'
                                        : '必须使用花呗付款'
                                }}
                            </span>
                        </div>
                        <div class="pay_item line_b">
                            <span>付款截图</span>
                            <img v-if="orderDetail.pay_img" src="../../assets/image/task/thumb.png" class="thumb" />
                        </div>
                        <div class="pay_item">
                            <span>淘宝订单编号</span>
                            <span>{{ orderDetail.taobao_ordersn }}</span>
                        </div>
                        <div class="pay_item line_b">
                            <span>实付金额</span>
                            <span>
                                <span class="c-red">{{ orderDetail.actually_paid }}</span
                                >元</span
                            >
                        </div>
                        <!-- 步骤完成的按钮隐藏 -->
                        <div class="pay_item">
                            <span>{{ orderDetail.end_t_show }}</span>
                            <van-button
                                :disabled="orderDetail.step != 3"
                                class="step_btn"
                                color="#00a8fc"
                                size="mini"
                                round
                                @click="toPay"
                                >付款</van-button
                            >
                        </div>
                    </div>
                </template>
            </van-collapse-item>
            <van-collapse-item name="5">
                <template #title>
                    <span :class="['step_tag', { gray: orderDetail.step < 6 }]">3</span>
                    <span class="pl-10">收货评价</span>
                </template>
                <template #default>
                    <div class="accord_comment">
                        <div class="size-12 mt-15">
                            物流签收 {{ orderDetail.confirm_day_long }} 天后确认收货 ,
                            <span v-if="orderDetail.buyer_evaluate == 0">5星好评</span>
                            <span v-if="orderDetail.buyer_evaluate == 1">5星好评,评价内容:好评</span>
                            <span v-if="orderDetail.buyer_evaluate == 2">不评价(只确认收货)</span>
                            <span
                                v-if="
                                    orderDetail.buyer_evaluate == 3 ||
                                        (orderDetail.buyer_evaluate == 4 && orderDetail.eve_amount > 0)
                                "
                            >
                                <br />收货评价:
                                <template v-if="orderDetail.buyer_evaluate_words">
                                    <div v-for="(item, index) in orderDetail.buyer_evaluate_words" :key="index">
                                        <div class="txt-lf mt-10">文字内容:{{ item.comment }}</div>
                                        <div class="flexct mt-10" v-if="item.images">
                                            <span class="mr-10">评价图片:</span>
                                            <template>
                                                <img
                                                    v-for="(img, i) in item.images.split(',')"
                                                    :key="i"
                                                    :src="img"
                                                    class="thumb mr-10"
                                                />
                                            </template>
                                        </div>
                                    </div>
                                </template>
                            </span>
                            <div class="mt-10" v-if="orderDetail.add_evaluate == 1 && orderDetail.adaeve_amount > 0">
                                追加评价:
                                <template v-if="orderDetail.add_evaluate_words">
                                    <div v-for="(item, index) in orderDetail.add_evaluate_words" :key="index">
                                        <div class="txt-lf mt-10">文字内容:{{ item.comment }}</div>
                                        <div class="flexct mt-10" v-if="item.images">
                                            <span class="mr-10">评价图片:</span>
                                            <template>
                                                <img
                                                    v-for="(img, i) in item.images.split(',')"
                                                    :key="i"
                                                    :src="img"
                                                    class="thumb mr-10"
                                                />
                                            </template>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                        <div class="flex mt-15">
                            <router-link class="c-primary size-12" to="/how-comment">如何收货评价?</router-link>
                            <span>
                                <van-button
                                    :disabled="orderDetail.step != 5"
                                    class="step_btn"
                                    color="#00a8fc"
                                    size="mini"
                                    round
                                    @click="toReceive"
                                    >去收货</van-button
                                >
                                <van-button
                                    v-if="orderDetail.add_evaluate == 1 && orderDetail.adaeve_amount > 0"
                                    :disabled="orderDetail.status != 5"
                                    class="step_btn"
                                    color="#00a8fc"
                                    size="mini"
                                    round
                                    @click="toAddReceive"
                                    >追加评价</van-button
                                >
                            </span>
                        </div>
                    </div>
                </template>
            </van-collapse-item>
            <van-collapse-item name="7">
                <template #title>
                    <span :class="['step_tag', { gray: orderDetail.step < 7 }]">4</span>
                    <span class="pl-10">确认收款</span>
                </template>
                <template #default>
                    <div class="size-12 mt-10">
                        <van-button
                            :disabled="orderDetail.step != 7"
                            class="step_btn"
                            color="#00a8fc"
                            size="mini"
                            round
                            @click="toGetMoneny"
                            >确认收款</van-button
                        >
                    </div>
                </template>
            </van-collapse-item>
            <van-collapse-item name="8">
                <template #title>
                    <span :class="['step_tag', { gray: orderDetail.step < 8 }]">5</span>
                    <span class="pl-10">活动完成</span>
                </template>
                <template #default>
                    <div class="size-12 mt-10">获得赏金</div>
                </template>
            </van-collapse-item>
        </van-collapse>
        <!-- 弹窗 -->
        <CloseTaskDialog
            title="确定关闭活动?"
            :visible="isCloseTask"
            @toggle="isCloseTask = false"
            @confirm="closeHanlder"
        ></CloseTaskDialog>
    </div>
</template>

<script>
import * as api from '@/api/api'
import CloseTaskDialog from '../../components/CloseTaskDialog'
export default {
    name: 'list-detail',
    components: {
        CloseTaskDialog,
    },
    data() {
        return {
            activeName: '1',
            // 0-开始购物 1-货比三家 2-找到宝贝  3-设置浏览 4-下单付款  5-商家发货 6-买家收货 7-商家返款 8-交易完成
            order_id: this.$route.query.id,
            orderDetail: '',
            browse_arr: [], //浏览要求
            isCloseTask: false,
        }
    },
    mounted() {
        this.getOrderDetail()
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        goPage(key) {
            this.$router.push({ name: key })
        },

        onCopy() {
            this.$toast('复制成功')
        },
        onError() {
            this.$toast('复制失败')
        },
        // 找到宝贝修改活动
        toEdit() {
            // 货比打标
            this.$router.push({ name: 'step-compare', query: { id: this.order_id } })
        },
        // 状态
        format_status(val) {
            if (!val) return ''
            switch (Number(val)) {
                case 0:
                    return '待接手'
                case 1:
                    return '已接手'
                case 2:
                    return '待发货'
                case 3:
                    return '待评价'
                case 4:
                    return '待返款'
                case 5:
                    return '待追评'
                case 6:
                    return '已完成'
                case 7:
                    return '已关闭'
                case 8:
                    return '预售'
            }
        },
        // 详情
        getOrderDetail() {
            this.$toast.loading({ message: '加载中', forbidClick: true })
            api.orderDetail({ order_id: this.order_id }).then((res) => {
                if (res.success) {
                    this.$toast.clear()
                    this.orderDetail = res.data
                    this.browse_arr = res.data.browse_require_list
                    this.activeName = String(res.data.step)
                    this.timeCount()
                } else {
                    this.$toast.clear()
                }
            })
        },
        timeCount() {
            var token = this.$store.state.user.token
            if (token) {
                this.interval = setInterval(() => {
                    this.change_time()
                }, 1000)
            }
        },
        change_time() {
            let end_t_show = this.util.format_down_time(this.orderDetail['end_time'])
            this.$set(this.orderDetail, 'end_t_show', end_t_show)
        },
        closeHanlder(param) {
            api.closeMission({ order_id: this.order_id, type: param.type }).then((res) => {
                if (res.success) {
                    this.$toast('关闭成功')
                    this.$router.replace({ name: 'welfare' })
                    this.isCloseTask = false
                }
            })
        },
        // 去付款
        toPay() {
            this.$router.push({ name: 'step-pay', query: { id: this.order_id } })
        },
        // 去收货
        toReceive() {
            this.$dialog
                .confirm({
                    title: '该订单的快递已签收吗?',
                    message: '务必确认物流信息已显示签收',
                    confirmButtonText: '已签收',
                    cancelButtonText: '未签收',
                })
                .then(() => {
                    // on confirm
                    this.$router.push({ name: 'step-receive', query: { id: this.order_id } })
                })
                .catch(() => {
                    // on cancel
                })
        },
        // 追评
        toAddReceive() {
            this.$dialog
                .confirm({
                    title: '该订单的快递已签收吗?',
                    message: '务必确认物流信息已显示签收',
                    confirmButtonText: '已签收',
                    cancelButtonText: '未签收',
                })
                .then(() => {
                    // on confirm
                    this.$router.push({ name: 'step-addreceive', query: { id: this.order_id } })
                })
                .catch(() => {
                    // on cancel
                })
        },
        // 确认收款
        toGetMoneny() {
            this.$dialog
                .confirm({
                    title: '确认货款赏金已到账?',
                })
                .then(() => {
                    api.confirmReceive({ order_id: this.order_id }).then((res) => {
                        if (res.success) {
                            this.$toast('交易完成')
                            this.getOrderDetail()
                        }
                    })
                })
                .catch(() => {
                    // on cancel
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
