<template>
    <div class="asset-index">
        <van-nav-bar title="鲸币余额" right-text="鲸币转货款" left-arrow @click-left="goBack" @click-right="toChange" />

        <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="v-page">
            <div class="card">
                <div class="title">鲸币余额</div>
                <div class="num">{{ dataInfo }}</div>
            </div>
            <van-empty description="暂无记录" v-if="noData" />
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <div class="record-cell-list" v-for="(item, index) in dataList" :key="index" @click="toDetail(item)">
                    <div class="cell-label">{{ item.update_time }}</div>
                    <div class="cell-title">
                        <div class="title">{{ item.remark }}</div>
                        <div class="right">{{ item.change_type == 0 ? '-' : '+' }}{{ Number(item.amount).toFixed(2) }}</div>
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
    name: 'asset',
    data() {
        return {
            dataInfo: 0,
            visible: false,
            dataList: [],
            loading: false, // true 转圈圈
            finished: false, //是否请求结束 结束显示 没有更多
            noData: false, //如果没有数据 显示暂无
            refreshing: false, //是否下拉刷新
            page: 1,
            rows: 10,
        }
    },
    mounted() {
        this.getUserBalance()
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        // 获取首页数据
        getUserBalance() {
            api.getUserBalance({ asset_type: 1 }).then((res) => {
                if (res.success) {
                    this.dataInfo = Number(res.data).toFixed(2)
                }
            })
        },

        getData() {
            // 请求
            api.tradingRecord({
                page: this.page,
                rows: this.rows,
                asset_type: 1,
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
                }
            })
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
        toDetail(item) {
            item.total = this.dataInfo
            this.$router.push({ name: 'asset-detail', query: item })
        },
        toChange() {
            this.$router.push({ name: 'asset-change' })
        },
    },
}
</script>

<style></style>
