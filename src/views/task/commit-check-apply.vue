<template>
    <!-- 商家活动审核概况 -->
    <div class="shop-mark-container">
        <van-nav-bar title="提交截图申请" right-text="联系客服" left-arrow @click-left="goBack" @click-right="toPage('server')" />
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
                        <span>活动赏金: {{ orderDetail.bounty_amount }}元</span>
                    </div>
                    <div class="item" v-if="orderDetail.eve_amount > 0">
                        <span>评价赏金: {{ orderDetail.eve_amount }}元</span>
                    </div>
                    <div class="item" v-if="orderDetail.adaeve_amount > 0">
                        <span>追评赏金: {{ orderDetail.adaeve_amount }}元</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="mark-box">
            <div class="btn-line wt-bold" @click="toPage('check-screen-teach')">商家审号-买号截图 图文教程</div>
            <div class="flexrow title mt-25">
                买号审核 - 我的淘宝 <van-icon @click="toPage('check-screen-teach')" class="size-16 ml-10" name="question-o" />
            </div>

            <van-row gutter="20" class="upload-box">
                <van-col span="8" class="mt-10" v-if="isNeed('cut_home')">
                    <van-uploader :after-read="after_cut_home">
                        <img
                            :src="form.cut_home ? form.cut_home : require('../../assets/image/mine/upload.png')"
                            class="upload-img"
                        />
                    </van-uploader>
                    <p class="size-13">我的淘宝</p>
                </van-col>
                <van-col span="8" class="mt-10" v-if="isNeed('cut_account')">
                    <van-uploader :after-read="after_cut_account">
                        <img
                            :src="form.cut_account ? form.cut_account : require('../../assets/image/mine/upload.png')"
                            class="upload-img"
                        />
                    </van-uploader>
                    <p class="size-13">账户体验中心</p>
                </van-col>
                <van-col span="8" class="mt-10" v-if="isNeed('cut_evaluation')">
                    <van-uploader :after-read="after_cut_evaluation">
                        <img
                            :src="form.cut_evaluation ? form.cut_evaluation : require('../../assets/image/mine/upload.png')"
                            class="upload-img"
                        />
                    </van-uploader>
                    <p class="size-13">给他人评价</p>
                </van-col>
                <van-col span="8" class="mt-10" v-if="isNeed('cut_favorites')">
                    <van-uploader :after-read="after_cut_favorites">
                        <img
                            :src="form.cut_favorites ? form.cut_favorites : require('../../assets/image/mine/upload.png')"
                            class="upload-img"
                        />
                    </van-uploader>
                    <p class="size-13">收藏夹</p>
                </van-col>
                <van-col span="8" class="mt-10" v-if="isNeed('cut_attention')">
                    <van-uploader :after-read="after_cut_attention">
                        <img
                            :src="form.cut_attention ? form.cut_attention : require('../../assets/image/mine/upload.png')"
                            class="upload-img"
                        />
                    </van-uploader>
                    <p class="size-13">关注店铺</p>
                </van-col>
                <van-col span="8" class="mt-10" v-if="isNeed('cut_footprint')">
                    <van-uploader :after-read="after_cut_footprint">
                        <img
                            :src="form.cut_footprint ? form.cut_footprint : require('../../assets/image/mine/upload.png')"
                            class="upload-img"
                        />
                    </van-uploader>
                    <p class="size-13">足迹</p>
                </van-col>
                <van-col span="8" class="mt-10" v-if="isNeed('cut_order')">
                    <van-uploader :after-read="after_cut_order">
                        <img
                            :src="form.cut_order ? form.cut_order : require('../../assets/image/mine/upload.png')"
                            class="upload-img"
                        />
                    </van-uploader>
                    <p class="size-13">我的订单列表</p>
                </van-col>
            </van-row>

            <div class="flexrow title mt-40">
                买号审核 - 淘气值 <van-icon @click="toPage('check-screen-teach')" class="size-16 ml-10" name="question-o" />
            </div>
            <van-row gutter="20" class="upload-box">
                <van-col span="8" class="mt-10">
                    <van-uploader :after-read="after_taoqi_value">
                        <img
                            :src="form.taoqi_value ? form.taoqi_value : require('../../assets/image/mine/upload.png')"
                            class="upload-img"
                        />
                    </van-uploader>
                    <p class="size-13">
                        淘气值截图 <br />
                        {{ orderDetail.taoqi_value_name }}
                    </p>
                </van-col>
            </van-row>
            <div class="flexrow title mt-40">买号审核 - 淘龄</div>
            <div class="size-14">{{ orderDetail.tao_year_name }}</div>

            <div class="c-red mt-35 size-14">重要提醒</div>
            <div class="size-14 mt-5">
                商家发布买号审核任务，需要额外支付费用，请认真对待，上传符合要求的截图，如发现截图作弊行为或者乱传图，平台将会根据商家的举报进行处罚。
            </div>
        </div>
        <div class="p-20">
            <div class="btn-app" @click="commit">提交申请</div>
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
import * as api from '@/api/api'
import VDialog from '../../components/VDialog'
import { findIndex } from 'lodash'
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
            order_id: this.$route.query.id,
            orderDetail: '',
            form: {
                order_id: this.$route.query.id,
                cut_home: '', //我的淘宝首屏 根据要求传截图 非必填
                cut_account: '', //账户体验中心
                cut_evaluation: '', //给他人评价
                cut_favorites: '', //收藏夹
                cut_attention: '', //关注店铺
                cut_footprint: '', //足迹
                taoqi_value: '', //淘气值
                cut_order: '',
            },
            is_cut_home: false,
            is_cut_account: false,
            is_cut_evaluation: false,
            is_cut_favorites: false, //收藏夹
            is_cut_attention: false, //关注店铺
            is_cut_footprint: false, //足迹

            is_cut_order: false,
        }
    },
    mounted() {
        // this.getOrderDetail()
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
        isNeed(type) {
            let index = findIndex(this.orderDetail.screenshot_require_list, (v) => v.field_name == type)
            this['is_' + type] = index >= 0 ? true : false
            return index >= 0
        },
        getExamineDetail() {
            api.getExamineDetail({ order_id: this.order_id }).then((res) => {
                if (res.success) {
                    this.$toast.clear()
                    this.orderDetail = res.data
                } else {
                    this.$toast.clear()
                }
            })
        },
        after_cut_home(file) {
            this.upload('cut_home', file.content)
        },
        after_cut_account(file) {
            this.upload('cut_account', file.content)
        },
        after_cut_evaluation(file) {
            this.upload('cut_evaluation', file.content)
        },
        after_cut_favorites(file) {
            this.upload('cut_favorites', file.content)
        },
        after_cut_attention(file) {
            this.upload('cut_attention', file.content)
        },
        after_cut_footprint(file) {
            this.upload('cut_footprint', file.content)
        },
        after_cut_order(file) {
            this.upload('cut_order', file.content)
        },
        after_taoqi_value(file) {
            this.upload('taoqi_value', file.content)
        },
        upload(type, fileBase64) {
            this.$toast.loading({ message: '提交中请勿重复点击', forbidClick: true })
            api.image_upload({ base_str: fileBase64, type: 8 }).then((res) => {
                this.$toast.clear()
                if (res.success) {
                    this.form[type] = this.BASE_URL + res.data
                }
            })
        },
        // 提交
        commit() {
            if (!this.form.taoqi_value) return this.$toast('请上传淘气值截图')

            if (this.is_cut_home && !this.form.cut_home) return this.$toast('请上传我的淘宝截图')
            if (this.is_cut_account && !this.form.cut_account) return this.$toast('请上传账户体验中心截图')
            if (this.is_cut_evaluation && !this.form.cut_evaluation) return this.$toast('请上传给他人评价截图')
            if (this.is_cut_favorites && !this.form.cut_favorites) return this.$toast('请上传收藏夹截图')
            if (this.is_cut_attention && !this.form.cut_attention) return this.$toast('请上传关注店铺截图')
            if (this.is_cut_footprint && !this.form.cut_footprint) return this.$toast('请上传足迹截图')
            if (this.is_cut_order && !this.form.cut_order) return this.$toast('请上传我的订单列表截图')
            api.applicationReview(this.form).then((res) => {
                if (res.success) {
                    this.$toast('提交成功')
                    this.$router.go(-2)
                }
            })
        },
    },
}
</script>

<style lang="less" scoped></style>
