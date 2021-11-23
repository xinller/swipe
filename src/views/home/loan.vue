<template>
    <div class="loan-index">
        <van-nav-bar title="货款余额" right-text="提现" left-arrow @click-left="goBack" @click-right="toWithdrow" />
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="v-page">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多" @load="onLoad" :offset="130">
                <div class="loan-top">
                    <div class="left">
                        <p class="title">货款余额</p>
                        <div class="num">{{ dataInfo }}</div>
                    </div>
                    <div class="right">
                        <p class="title">不可用余额</p>
                        <div class="num">0</div>
                    </div>
                </div>
                <van-empty description="暂无记录" v-if="noData" />
                <div class="record-cell-list" v-for="item in dataList" :key="item.id" @click="toDetail">
                    <div class="cell-label">{{ item.update_time }}</div>
                    <div class="cell-title">
                        <div class="title">{{ item.remark }}</div>
                        <div class="right">{{ item.change_type == 0 ? '-' : '+' }}{{ Number(item.amount).toFixed(2) }}</div>
                    </div>
                </div>
            </van-list>
        </van-pull-refresh>
        <!-- 提示modal -->
        <v-dialog :visible="visible" @toggle="toggleDialog" title="温馨提醒">
            <div slot="content">
                商家返款的任务的货款是由商家直接打款到买家银行账号，不会在货款余额里显示，商家返款的任务查账在APP首页-待商家返款余额里查询，如不清楚如何对账请联系平台客服。点击下方详情查看详细返款说明。
            </div>
            <router-link slot="footer" class="dialog-btn" to="/novice-teach">查看详情</router-link>
        </v-dialog>
    </div>
</template>

<script>
import VDialog from '../../components/VDialog'
import * as api from '@/api/api'
import { concat } from 'lodash'
export default {
    name: 'loan',
    components: {
        VDialog,
    },
    data() {
        return {
            visible: false,
            dataInfo: 0,
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
        this.visible = true
        this.getUserBalance()
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        toWithdrow() {
            this.$router.push({ name: 'asset-withdrow' })
        },
        toggleDialog() {
            this.visible = false
        },
        getUserBalance() {
            api.getUserBalance({ asset_type: 2 }).then((res) => {
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
                asset_type: 2,
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
                // this.getData()
            }, 500)
        },
        toDetail() {},
    },
}
</script>

<style></style>
