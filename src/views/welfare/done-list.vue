<template>
    <div class="check-list-container">
        <van-nav-bar title="已完成" left-arrow @click-left="goBack" />
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="v-page">
            <van-list
                v-model="loading"
                :finished="finished"
                :finished-text="noData ? '' : '没有更多'"
                @load="onLoad"
                :offset="130"
            >
                <van-empty description="暂无数据" v-if="noData" />
                <!-- 部分完成 -->
                <!-- <div class="com-shop-box">
                    <div class="com-shop-top">
                        <span>10-27 10:33</span>
                        <span>部分完成</span>
                    </div>
                    <div class="com-shop-card">
                        <img src="../../assets/image/task/you.png" class="tag">
                        <img src="../../assets/image/task/thumb.png" class="thumb">
                        <div class="content">
                            <div class="middle">
                                <div class="top-img">
                                    <img src="../../assets/image/task/taobao.png" class="tb-icon">
                                    <span class="username">小宝</span>
                                </div>
                                <p class="san">返款金额:445</p>
                                <p class="pre-pay">处理时间:2020-08-19 12:33:22</p>
                            </div>
                            <div class="right">
                                <p class="status">商家返款</p>
                            </div>
                        </div>
                    </div>
                </div> -->

                <div class="com-shop-box" v-for="item in dataList" :key="item.id" @click="toDetail(item)">
                    <div class="com-shop-top">
                        <span>任务编号:{{ item.order_code }}</span>
                        <span>已完成</span>
                    </div>
                    <div class="com-shop-card">
                        <img src="../../assets/image/task/you.png" class="tag" v-if="item.activity_type == 1" />
                        <img :src="item.goods_image" class="thumb" />
                        <div class="content">
                            <div class="middle">
                                <div class="top-img">
                                    <img src="../../assets/image/task/taobao.png" class="tb-icon" />
                                    <span class="username">{{ item.taobao_nickname }}</span>
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
                                <p class="san">
                                    返款金额: <span class="san_num">{{ item.pay_amount }}</span>
                                </p>
                                <p class="pre-pay">处理时间:{{ item.end_time }}</p>
                            </div>
                            <div class="right">
                                <p class="status">{{ item.back_type == 0 ? '平台返款' : '商家返款' }}</p>
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
    data() {
        return {
            dataList: [],
            loading: false, // true 转圈圈
            finished: false, //是否请求结束 结束显示 没有更多
            noData: false, //如果没有数据 显示暂无
            refreshing: false, //是否下拉刷新
            page: 1,
            rows: 10,
            interval: null,
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        toDetail(item) {
            this.$router.push({ name: 'step-detail', query: { id: item.id } })
        },
        getData() {
            // 请求
            api.orderList({
                page: this.page,
                rows: this.rows,
                status: 6,
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
                    // this.timeCount()
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
                obj.end_t_show = this.util.format_down_time(this.dataList[i]['end_time'])
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
    },
}
</script>

<style lang="less" scoped></style>
