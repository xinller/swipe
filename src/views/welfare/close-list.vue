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
                <div class="com-shop-box" v-for="item in dataList" :key="item.id" @click="toDetail(item)">
                    <div class="com-shop-top">
                        <span>{{ item.create_time }}</span>
                        <!-- <span>剩余时间:01时26分40秒</span> -->
                        <span>已关闭</span>
                    </div>
                    <div class="com-shop-card">
                        <img src="../../assets/image/task/you.png" class="tag" v-if="item.activity_type == 1" />
                        <!-- <img src="../../assets/image/task/shen.png" class="tag" /> -->
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
                                <p class="pre-pay">活动金额:{{ item.pay_amount }}</p>
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
    name: 'close-list',
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
        // 跳转路由
        toPage(key) {
            this.$router.push({ name: key })
        },
        toDetail(item) {
            this.$router.push({ name: 'check-detail', query: { id: item.id } })
        },
        getData() {
            // 请求
            api.orderList({
                page: this.page,
                rows: this.rows,
                status: 7,
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
