<template>
    <!-- 第三步 : 下单付款 -->
    <div class="shop-mark-container">
        <van-nav-bar title="下单付款" left-arrow @click-left="goBack" />
        <!-- 店铺情况 -->
        <div class="mark-box size-13" v-if="orderDetail">
            <div class="title">请核对以下信息,确认无误后付款</div>
            <div class="c-primary mt-10">下单账号:{{ orderDetail.taobao_nickname }}</div>
            <div class="flex mt-10">
                <div>宝贝价格:{{ orderDetail.buy_pirce }}元</div>
                <div>实付价格高了? <span class="c-primary" @click="isCloseTask = true">关闭任务</span></div>
            </div>
            <div class="mt-10">拍下数量: {{ orderDetail.buy_num }}件</div>
            <div class="mt-10">应付总金额:{{ orderDetail.pay_amount }}元</div>
            <div class="mt-10 c-primary">
                付款方式:
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
            <div class="mt-10 c-primary">货款返还时间: 买家收货24小时后自动返</div>
            <van-divider />
            <div>商家要求</div>
            <div class="mt-10 c-primary">
                <div>{{ orderDetail.attention_remark }}</div>
                <div v-if="orderDetail.remark_img" class="flexrow">
                    <img :src="img" v-for="(img, i) in orderDetail.remark_img" :key="i" class="mr-5" />
                </div>
            </div>
        </div>
        <div class="mark-box size-13">
            <div class="title">下单付款完成后,填入以下信息</div>
            <div class="subtitle">完整的订单编号</div>
            <div class="input-box">
                <input type="text" placeholder="请输入完整的订单编号" v-model="taobao_ordersn" />
            </div>
            <div class="subtitle">实付金额</div>
            <div class="input-box">
                <input class="mini" type="text" placeholder="请输入" v-model="actually_paid" /><span
                    >元 <span class="ml-15" @click="amountDisDialog">金额不一致?</span></span
                >
            </div>
            <van-button :disabled="isLoading" class="btn-commit" block @click="commit">提交审核</van-button>
            <div class="size-12 mt-25">
                <div class="subtitle">重要提醒</div>
                <div class="mt-15">1、不按照商家要求关键词进店的,一经发现扣除赏金</div>
                <div class="c-red">2、禁止使用淘宝客,返利,淘金币,第一次扣除奖励所得和返利佣金所得,第二次将做封号处理.</div>
            </div>
        </div>

        <!-- 弹窗提示都在这里 -->

        <!-- 提示 -->
        <v-dialog :visible="isDialog" :closeBtn="false" :title="dialog_title">
            <div slot="content">
                <p>核实是否找对了宝贝看下商家的备注要求,花色尺码和数量是否拍对.商家是否要求领优惠券,或者店内包含满减套餐.</p>
                <p class="mt-15 wt-bold">运费问题</p>
                <p>1、商品包含运费,但实付金额小于应付金额的直接提交.</p>
                <p>
                    2、商品包含运费,但实付金额大于应付金额的,以正常买家的身份联系旺旺卖家咨询协商修改运费,切记不要设计补单和鲸鱼的相关字眼.
                </p>
                <p class="mt-15 wt-bold">返款问题</p>
                <p>1、实付金额小于应付金额时是正常返款.</p>
                <p>2、实付金额大于应付金额时是货返(即使有立返资格).</p>
                <p>3、实付金额大于应付金额40元时,不能提交.</p>
                <p class="c-red mt-15">禁止付款后随意退款,属严重违规行为,以上都不能解决您的问题,可联系鲸鱼客服.</p>
                <!-- <div v-html="dialog_content"></div> -->
            </div>
            <div slot="footer" class="dialog-btn" @click="isDialog = false">我知道了</div>
        </v-dialog>

        <CloseTaskDialog
            title="确定关闭活动?"
            :visible="isCloseTask"
            @toggle="isCloseTask = false"
            @confirm="closeHanlder"
        ></CloseTaskDialog>
    </div>
</template>

<script>
import VDialog from '../../components/VDialog'
import * as api from '@/api/api'
import CloseTaskDialog from '../../components/CloseTaskDialog'
export default {
    name: 'shop-find-shop',
    components: {
        VDialog,
        CloseTaskDialog,
    },
    data() {
        return {
            isDialog: false, //弹提示框
            dialog_title: '提示',
            dialog_content: '',
            isCloseTask: false,
            orderDetail: '',
            taobao_ordersn: '',
            actually_paid: '',
            order_id: this.$route.query.id,
            isLoading: false,
        }
    },
    mounted() {
        this.getOrderDetail()
    },
    methods: {
        goBack() {
            this.$router.replace({ name: 'welfare' })
        },
        // 详情
        getOrderDetail() {
            this.$toast.loading({ message: '加载中', forbidClick: true })
            api.orderDetail({ order_id: this.order_id }).then((res) => {
                if (res.success) {
                    this.$toast.clear()
                    this.orderDetail = res.data
                } else {
                    this.$toast.clear()
                }
            })
        },
        // 付款
        commit() {
            if (!this.taobao_ordersn) return this.$toast('请输入完整的订单编号')
            if (!this.actually_paid) return this.$toast('请输入实付金额')
            this.isLoading = true
            this.$toast.loading({ message: '正在提交,请勿重复操作', forbidClick: true })
            api.confirmPay({
                order_id: this.order_id,
                taobao_ordersn: this.taobao_ordersn,
                actually_paid: this.actually_paid,
            }).then((res) => {
                this.$toast.clear()
                if (res.success) {
                    this.$toast('付款成功')
                    this.goBack()
                }
            })
        },
        // 关闭任务
        closeHanlder(param) {
            api.closeMission({ order_id: this.order_id, type: param.type }).then((res) => {
                if (res.success) {
                    this.$toast('关闭成功')
                    this.$router.go(-1)
                    this.isCloseTask = false
                }
            })
        },
        // 初始化提示是否账号一致
        amountDisDialog() {
            this.isDialog = true
            this.dialog_title = '实付金额不一致?'
            // 普通单提示
            this.dialog_content = `<p>核实是否找对了宝贝看下商家的备注要求,花色尺码和数量是否拍对.商家是否要求领优惠券,或者店内包含满减套餐.</p>
            <p class="mt-15"></p>`
        },
    },
}
</script>

<style lang="less" scoped></style>
