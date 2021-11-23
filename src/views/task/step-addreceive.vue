<template>
    <!-- 第三步 : 确认追加评价 -->
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
            <!-- <div><span class="size-14 ft-bd">收货时间</span>: 物流签收 {{ orderDetail.confirm_day_long }} 天后确认收货</div> -->

            <div class="size-12 mt-15">
                <!-- <span class="size-14 ft-bd">评价类型:</span>
                <span v-if="orderDetail.buyer_evaluate == 0">5星好评</span>
                <span v-if="orderDetail.buyer_evaluate == 1">5星好评(好评)</span>
                <span v-if="orderDetail.buyer_evaluate == 2">不评价(只确认收货)</span>
                <span v-if="orderDetail.buyer_evaluate == 3 || orderDetail.buyer_evaluate == 4">
                    优质评价
                    <template v-if="orderDetail.buyer_evaluate_words">
                        <div v-for="(item, index) in orderDetail.buyer_evaluate_words" :key="index">
                            <div class="txt-lf mt-10">文字内容:{{ item.comment }}</div>
                            <div class="flexct mt-10" v-if="item.images">
                                <span class="mr-10">评价图片:</span>
                                <template>
                                    <img v-for="(img, i) in item.images.split(',')" :key="i" :src="img" class="thumb mr-10" />
                                </template>
                            </div>
                        </div>
                    </template>
                </span> -->
                <div class="mt-10" v-if="orderDetail.add_evaluate == 1">
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
                                        type="download"
                                        :href="img"
                                        class="thumb_a"
                                        target="_blank"
                                    >
                                        <img :src="img" class="thumb mr-10" />
                                    </a>
                                </template>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
            <van-divider />
            <div>请按商家要求操作完成后打勾,不懂请点击下方如何收货评价</div>
        </div>
        <div class="mark-box size-13">
            <div class="flex">
                <van-checkbox v-model="checked">已按商家要求在淘宝收货评价</van-checkbox>
                <router-link class="c-primary size-12" to="/how-comment">如何收货评价?</router-link>
            </div>
            <div class="upload">
                <van-uploader :after-read="afterRead" accept="image/*">
                    <img
                        :src="evaluation_screenshot ? evaluation_screenshot : require('../../assets/image/mine/upload.png')"
                        class="upload-img"
                    />
                </van-uploader>
                <p class="size-13 txt-ct">追加评价截图</p>
                <p class="size-13  txt-ct c-primary" @click="visible = true">截图步骤></p>
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
        // 1- 追平
        afterRead(file) {
            this.upload('evaluation_screenshot', file.content)
        },
        upload(type, fileBase64) {
            this.$toast.loading({ message: '提交中请勿重复点击', forbidClick: true })
            api.image_upload({ base_str: fileBase64, type: 2 }).then((res) => {
                this.$toast.clear()
                if (res.success) {
                    this[type] = this.BASE_URL + res.data
                }
            })
        },
        // 提交
        commit() {
            if (!this.checked) return this.$toast('是否已按商家要求评价')
            if (!this.evaluation_screenshot) return this.$toast('请上传追评截图')
            api.toAddEvaluation({ order_id: this.order_id, evaluation_screenshot: this.evaluation_screenshot }).then((res) => {
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
