<template>
    <div class="check-list-container">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="v-page">
            <van-list
                v-model="loading"
                :finished="finished"
                :finished-text="noData ? '' : '没有更多'"
                @load="onLoad"
                :offset="130"
            >
                <van-empty description="暂无数据" v-if="noData" />
                <div class="com-shop-box" v-for="item in dataList" :key="item.id">
                    <div class="com-shop-top">
                        <span>{{ item.public_time }}</span>
                        <span v-if="item.end_t_show">剩余:{{ item.end_t_show }}</span>
                        <span>{{ item.status | format_status }}</span>
                    </div>
                    <div class="com-shop-card">
                        <img src="../../assets/image/task/shen.png" class="tag" />
                        <img :src="item.goods_image" class="thumb" />
                        <div class="content">
                            <div class="middle" @click="goDetail(item)">
                                <div class="top-img">
                                    <img src="../../assets/image/task/taobao.png" class="tb-icon" />
                                    <span class="pre-sale" v-if="item.is_pre == 1">预售</span>
                                </div>
                                <!-- <p class="san">赏金: {{ item.bounty_amount }}</p> -->
                                <p class="san">
                                    活动赏金: <span class="san_num">{{ item.bounty_amount }}</span>
                                </p>
                                <p class="san" v-if="item.eve_amount > 0">
                                    评价赏金: <span class="san_num">{{ item.eve_amount }}</span>
                                </p>
                                <p class="san" v-if="item.adaeve_amount > 0">
                                    追评赏金: <span class="san_num">{{ item.adaeve_amount }}</span>
                                </p>
                                <p class="pre-pay">垫付货款:{{ item.pay_amount }}</p>
                                <div class="bot-tag">
                                    <span class="add-btn">附加</span>
                                    <span class="round" v-for="i in item.browse_require_list" :key="i">{{
                                        util.formatBrowse(i)
                                    }}</span>
                                </div>
                            </div>
                            <div class="right">
                                <p class="status">{{ item.back_type == 0 ? '平台返款' : '商家返款' }}</p>
                                <!-- 已接手,预售(继续) 待发货,待返款不显示 待评价(去收货) -->
                                <!-- 继续按钮 跳 货比打标 -->
                                <!-- 拒绝不显示 ,待审核置灰 ,已通过蓝色 -->
                                <!-- <van-button
                                    :disabled="item.examine_status == 1"
                                    @click="toApply(item)"
                                    v-if="item.examine_status == 0"
                                >
                                    申请
                                </van-button> -->
                                <van-button :disabled="item.examine_status != 1" @click="goNext(item)" v-if="item.status == 1">
                                    继续
                                </van-button>
                                <van-button :disabled="item.examine_status != 1" @click="toReceive(item)" v-if="item.step == 5">
                                    去收货
                                </van-button>
                                <van-button :disabled="item.examine_status != 1" @click="toGetMoney(item)" v-if="item.step == 7">
                                    确认收款
                                </van-button>
                            </div>
                        </div>
                    </div>
                </div>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import * as api from '@/api/api'
import { concat } from 'lodash'
export default {
    name: 'check-list',
    props: {
        status: {
            type: String,
        },
    },
    data() {
        return {
            dataList: [],
            type: this.status,
            loading: false, // true 转圈圈
            finished: false, //是否请求结束 结束显示 没有更多
            noData: false, //如果没有数据 显示暂无
            refreshing: false, //是否下拉刷新
            page: 1,
            rows: 10,
            interval: null,
        }
    },
    filters: {
        format_status(val) {
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
    },
    methods: {
        getData() {
            // 请求
            api.examineOrderList({
                page: this.page,
                rows: this.rows,
                status: this.type,
            }).then((res) => {
                if (res.success) {
                    // 结束加载
                    this.loading = false
                    if (res.data.length > 0) {
                        this.dataList = concat(this.dataList, res.data)
                        this.page++
                    } else {
                        this.finished = true
                    }
                    // 没有数据显示暂无
                    if (this.dataList.length === 0 && this.page === 1) {
                        this.noData = true
                    }
                    this.timeCount()
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
            for (var i = 0; i < this.dataList.length; i++) {
                let obj = this.dataList[i]
                let end_time = this.dataList[i].is_pre == 1 ? this.dataList[i]['pre_end_time'] : this.dataList[i]['end_time']
                obj.end_t_show = this.util.format_down_time(end_time)
                this.$set(this.dataList, i, obj)
            }
        },
        // 列表加载
        onLoad() {
            setTimeout(() => {
                this.getData()
                this.loading = true
            }, 500)
        },
        onRefresh() {
            // 清空列表数据
            setTimeout(() => {
                this.refreshing = false
                this.dataList = []
                this.page = 1
                this.loading = false
                this.finished = false
                this.noData = false
            }, 500)
        },
        // 继续 根据做的步骤去不同的页面
        goNext(item) {
            // 0-开始购物 1-货比三家 2-找到宝贝  3-设置浏览 4-下单付款  5-商家发货 6-买家收货 7-商家返款 8-交易完成
            if (item.status == 1) {
                if (item.step == 0) {
                    // 货比打标
                    this.$router.push({ name: 'step-compare', query: { id: item.id } })
                } else if (item.step == 1 || item.step == 2) {
                    // 找宝贝
                    this.$router.push({ name: 'step-find', query: { id: item.id } })
                } else if (item.step == 3) {
                    // 去付款
                    this.$router.push({ name: 'step-pay', query: { id: item.id } })
                }
            }
        },
        // 跳详情
        goDetail(item) {
            if (item.examine_status == 1) {
                this.$router.push({ name: 'step-detail', query: { id: item.id } })
            } else if (item.examine_status == 0 || item.examine_status == 2) {
                this.$router.push({ name: 'hall-check-detail', query: { id: item.id } })
            }
        },
        // 申请
        toApply(item) {
            this.$router.push({ name: 'hall-check-detail', query: { id: item.id } })
        },
        // 去收货
        toReceive(item) {
            this.$dialog
                .confirm({
                    title: '该订单的快递已签收吗?',
                    message: '务必确认物流信息已显示签收',
                    confirmButtonText: '已签收',
                    cancelButtonText: '未签收',
                })
                .then(() => {
                    // on confirm
                    this.$router.push({ name: 'step-receive', query: { id: item.id } })
                })
                .catch(() => {
                    // on cancel
                })
        },
        toGetMoney(item) {
            this.$dialog
                .confirm({
                    title: '确认货款赏金已到账?',
                })
                .then(() => {
                    api.confirmReceive({ order_id: item.id }).then((res) => {
                        if (res.success) {
                            this.$toast('交易完成')
                            this.onRefresh()
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

<style lang="less" scoped></style>
