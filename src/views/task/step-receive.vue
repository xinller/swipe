<template>
    <!-- 第四步 : 确认收货 -->
    <div class="shop-mark-container">
        <van-nav-bar
            title="确认收货/评价"
            right-text="联系客服"
            left-arrow
            @click-left="goBack"
            @click-right="goPage('server')"
        />

        <!-- 店铺情况 -->
        <div class="mark-box size-13" v-if="orderDetail">
            <div><span class="size-14 ft-bd">收货时间</span>: 物流签收 {{ orderDetail.confirm_day_long }} 天后确认收货</div>

            <div class="size-12 mt-15">
                <span class="size-14 ft-bd">评价类型:</span>
                <span v-if="orderDetail.buyer_evaluate == 0">5星好评</span>
                <span v-if="orderDetail.buyer_evaluate == 1">5星好评(好评)</span>
                <span v-if="orderDetail.buyer_evaluate == 2">不评价(只确认收货)</span>
                <span v-if="orderDetail.buyer_evaluate == 3 || (orderDetail.buyer_evaluate == 4 && orderDetail.eve_amount > 0)">
                    优质评价
                    <template v-if="orderDetail.buyer_evaluate_words">
                        <div v-for="(item, index) in orderDetail.buyer_evaluate_words" :key="index">
                            <div class="txt-lf mt-10">文字内容:{{ item.comment }}</div>
                            <div class="flexct mt-10" v-if="item.images">
                                <span class="mr-10">评价图片:</span>
                                <template>
                                    <a
                                        v-for="(img, i) in item.images.split(',')"
                                        :key="i"
                                        type="download"
                                        :href="img"
                                        target="_blank"
                                        class="thumb_a"
                                    >
                                        <img :src="img" class="thumb mr-10" />
                                    </a>
                                </template>
                            </div>
                        </div>
                    </template>
                </span>
                <!-- <div class="mt-10" v-if="orderDetail.add_evaluate == 1">
                    <span class="size-14 ft-bd">追加评价:</span>
                    <template v-if="orderDetail.add_evaluate_words">
                        <div v-for="(item, index) in orderDetail.add_evaluate_words" :key="index">
                            <div class="txt-lf mt-10">文字内容:{{ item.comment }}</div>
                            <div class="flexct mt-10" v-if="item.images">
                                <span class="mr-10">评价图片:</span>
                                <template>
                                    <a
                                        v-for="(img, i) in item.images.split(',')"
                                        :key="i"
                                        :download="'comment' + i + '.png'"
                                        :href="img"
                                        ><img :src="img" class="thumb mr-10"
                                    /></a>
                                </template>
                            </div>
                        </div>
                    </template>
                </div> -->
            </div>
            <van-divider />
            <div>请按商家要求操作完成后打勾,不懂请点击下方如何收货评价</div>
        </div>
        <div class="mark-box size-13">
            <div class="flex">
                <van-checkbox v-model="checked">已按商家要求在淘宝收货评价</van-checkbox>
                <router-link class="c-primary size-12" to="/how-comment">如何收货评价?</router-link>
            </div>
            <div class="flexrow">
                <div class="upload mr-10">
                    <van-uploader :after-read="afterReadConfirm" accept="image/*">
                        <img
                            :src="confirm_img ? confirm_img : require('../../assets/image/mine/upload.png')"
                            class="upload-img"
                        />
                    </van-uploader>
                    <p class="size-13 txt-ct">交易成功截图</p>
                    <p class="size-13 txt-ct c-primary" @click="visible = true">截图步骤></p>
                </div>
                <div
                    class="upload"
                    v-if="orderDetail.buyer_evaluate == 3 || (orderDetail.buyer_evaluate == 4 && orderDetail.eve_amount > 0)"
                >
                    <van-uploader :after-read="afterRead" accept="image/*">
                        <img
                            :src="evaluation_screenshot ? evaluation_screenshot : require('../../assets/image/mine/upload.png')"
                            class="upload-img"
                        />
                    </van-uploader>
                    <p class="size-13 txt-ct">评价截图</p>
                    <p class="size-13 txt-ct c-primary" @click="visible = true">截图步骤></p>
                </div>
            </div>
            <van-button :disabled="isLoading" class="btn-commit" block @click="commit">确认提交</van-button>
            <div class="size-12 mt-25">
                <div class="subtitle">重要提醒</div>
                <div class="mt-15">务必确认物流信息已显示签收,如发现未真实签收或提前收货已经发现做封号处理.</div>
            </div>
        </div>

        <!-- 弹窗提示都在这里 -->

        <!-- 提示 -->
        <v-popup :visible="visible" title="交易成功" @toggle="visible = false">
            <template slot="content">
                <div class="c-red size-14">请上传交易成功截图,并且按照商家要求进行评价,不按要求传图片和评价会导致审核不通过</div>
                <img src="../../assets/image/task/receive1.png" />
            </template>
        </v-popup>
    </div>
</template>

<script>
import * as api from '@/api/api'
import VPopup from '../../components/VPopup'
export default {
    name: 'shop-find-shop',
    components: {
        VPopup,
    },
    data() {
        return {
            visible: false, //弹提示框
            orderDetail: '',
            order_id: this.$route.query.id,
            isLoading: false,
            checked: false,
            evaluation_screenshot: '',
            confirm_img: '',
        }
    },
    mounted() {
        this.getOrderDetail()
    },
    methods: {
        goBack() {
            this.$router.go(-1)
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
        //1- 交易图
        afterReadConfirm(file) {
            this.upload('confirm_img', file.content, 3)
        },
        // 1- 评价
        afterRead(file) {
            this.upload('evaluation_screenshot', file.content, 2)
        },
        upload(name, fileBase64, type) {
            this.$toast.loading({ message: '提交中请勿重复点击', forbidClick: true })
            api.image_upload({ base_str: fileBase64, type: type }).then((res) => {
                this.$toast.clear()
                if (res.success) {
                    this[name] = this.BASE_URL + res.data
                }
            })
        },
        // 付款
        commit() {
            if (!this.checked) return this.$toast('是否已按商家要求评价')
            if (!this.confirm_img) return this.$toast('请上传交易成功截图')
            if (
                this.orderDetail.buyer_evaluate == 3 ||
                (this.orderDetail.buyer_evaluate == 4 && this.orderDetail.eve_amount > 0)
            ) {
                if (!this.evaluation_screenshot) return this.$$toast('请上传评价截图')
            }
            api.toEvaluation({
                order_id: this.order_id,
                evaluation_screenshot: this.evaluation_screenshot,
                confirm_img: this.confirm_img,
            }).then((res) => {
                if (res.success) {
                    this.$toast('提交成功')
                    this.$router.go(-1)
                }
            })
        },
    },
}
</script>

<style lang="less" scoped>
.thumb_a {
    display: inline-block;
    width: 100px;
    height: 100px;
    margin-right: 10px;
}
.thumb {
    width: 100%;
}
.ft-bd {
    font-weight: bold;
    color: #333;
}
</style>
