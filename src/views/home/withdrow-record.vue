<template>
    <div class="change-record">
        <van-nav-bar title="提现记录" left-arrow @click-left="goBack" />
        <div class="record-list">
            <van-row class="list-title">
                <van-col span="5">类型</van-col>
                <van-col span="5">金额</van-col>
                <van-col span="5">状态</van-col>
                <van-col span="9">提现时间</van-col>
            </van-row>

            <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="v-page">
                <van-empty description="暂无记录" v-if="noData" />
                <van-list v-model="loading" :finished="finished" :finished-text="noData ? '' : '没有更多了'" @load="onLoad">
                    <van-row class="list-body" v-for="item in dataList" :key="item.id">
                        <van-col span="5">{{ item.coin_type == 1 ? '鲸币' : '货款' }}</van-col>
                        <van-col span="5">{{ Number(item.amount).toFixed(2) }}元</van-col>
                        <van-col span="5">{{ item.status == 0 ? '待审核' : item.status == 1 ? '成功' : '审核拒绝' }}</van-col>
                        <van-col span="9">{{ item.update_time }}</van-col>
                    </van-row>
                </van-list>
            </van-pull-refresh>
        </div>
    </div>
</template>

<script>
import * as api from '@/api/api'
import { concat } from 'lodash'
export default {
    name: 'withdrow-record',
    data() {
        return {
            dataList: [],
            loading: false, // true 转圈圈
            finished: false, //是否请求结束 结束显示 没有更多
            noData: false, //如果没有数据 显示暂无
            refreshing: false, //是否下拉刷新
            page: 1,
            rows: 10,
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        toDetail(item) {
            this.$router.push({
                name: 'notice-detail',
                query: {
                    id: item.id,
                },
            })
        },

        getData() {
            // 请求
            api.withdrawalList({
                page: this.page,
                rows: this.rows,
            }).then((res) => {
                if (res.success) {
                    // 结束加载
                    this.loading = false
                    if (res.data.list.length > 0) {
                        this.dataList = concat(this.dataList, res.data.list)
                    }
                    // 没有数据显示暂无
                    if (this.dataList.length === 0 && this.page === 1) {
                        this.noData = true
                    }
                    // 数据全部加载完成 显示没有更多
                    if (res.data.list.length === 0) {
                        this.finished = true
                    }
                    this.page++
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
                this.getData()
            }, 500)
        },
    },
}
</script>

<style scoped lang="less"></style>
