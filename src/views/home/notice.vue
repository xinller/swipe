<template>
    <div class="notice-index">
        <van-nav-bar title="公告" left-arrow @click-left="goBack" />
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="v-page">
            <van-empty description="暂无记录" v-if="noData" />
            <van-list
                v-model="loading"
                :finished="finished"
                :finished-text="noData ? '' : '没有更多了'"
                @load="onLoad"
                :offset="130"
            >
                <div class="notice-cell-list" v-for="item in dataList" :key="item.id" @click="toDetail(item)">
                    <div class="cell-title">{{ item.title }}</div>
                    <div class="cell-info">{{ item.update_time }}</div>
                </div>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import * as api from '@/api/api'
import { concat } from 'lodash'
export default {
    name: 'notice',
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
    mounted() {},
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
            api.noticeList({
                page: this.page,
                rows: this.rows,
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
    },
}
</script>

<style></style>
