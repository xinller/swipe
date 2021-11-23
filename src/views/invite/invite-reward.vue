<template>
    <!-- 推广奖励明细 -->
    <div class="invite-reward">
        <van-nav-bar title="推广奖励明细" left-arrow @click-left="goBack" />
        <img src="../../assets/image/invite/reward-bg.png" class="reward-bg" />
        <div class="record-list">
            <van-row class="list-title">
                <!-- <van-col span="5">试客账号</van-col> -->
                <van-col span="8">奖励类型</van-col>
                <van-col span="8">奖励金额</van-col>
                <!-- <van-col span="5">徒弟奖励</van-col> -->
                <!-- <van-col span="5">徒孙奖励</van-col> -->
                <van-col span="8">注册时间</van-col>
            </van-row>

            <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="v-page">
                <van-list v-model="loading" :finished="finished" finished-text="没有更多" @load="onLoad" :offset="130">
                    <van-row class="list-body" v-for="item in dataList" :key="item.id">
                        <van-col span="8">{{ item.remark }}</van-col>
                        <!-- <van-col span="5">8.00元</van-col> -->
                        <van-col span="8">{{ item.amount }}元</van-col>
                        <van-col span="8">{{ item.update_time }}</van-col>
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
    name: 'invite-reward',
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

        getData() {
            // 请求
            api.rewardList({
                page: this.page,
                rows: this.rows,
            }).then((res) => {
                if (res.success) {
                    // 结束加载
                    this.loading = false
                    if (res.data.list.length > 0) {
                        this.dataList = concat(this.dataList, res.data.list)
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
