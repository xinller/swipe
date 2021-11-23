<template>
    <!-- 买号管理 -->
    <div class="buy-manage">
        <van-nav-bar title="买号管理" right-text="联系客服" left-arrow @click-left="goBack" @click-right="toNext('server')" />
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="v-page">
            <!-- 有账号显示 -->
            <van-list v-model="loading" :finished="finished" finished-text="" @load="onLoad" :offset="130">
                <!-- 无账号显示 -->
                <div class="no-num" v-if="noData">
                    <img src="../../assets/image/mine/sorry.png" alt="" />
                    <div>暂时还没有买号~</div>
                </div>
                <router-link v-if="noData" class="btn-app" to="/add-num">添加一个淘宝买号</router-link>

                <div class="card-box" v-for="(item, index) in dataList" :key="index" @click.prevent="toDetail(item)">
                    <van-cell center :title="item.taobao_username">
                        <img slot="icon" src="../../assets/image/task/taobao.png" class="icon" />
                        <template #default>
                            <span class="c-primary">{{
                                item.receive_status == 0 ? '审核中' : item.receive_status == 1 ? '已认证' : '审核拒绝'
                            }}</span>
                        </template>
                    </van-cell>
                    <van-cell center title="收货地址:">
                        <span slot="default" class="default-text"
                            >{{ item.receive_province }}{{ item.receive_city }}{{ item.receive_area
                            }}{{ item.receive_address }}</span
                        >
                    </van-cell>
                    <van-cell center title="联系电话:">
                        <span slot="default" class="default-text">{{ item.receive_phone | formatPhone }}</span>
                    </van-cell>
                    <van-cell center title="联系人:">
                        <span slot="default" class="default-text">{{ item.receive_name }}</span>
                    </van-cell>
                    <van-cell center title="认证信息:" is-link clickable @click.stop="toVerify(item)">
                        <span slot="default" class="default-icon">
                            <img src="../../assets/image/task/setnum1.png" class="icon-s" v-if="item.is_goods == 1" />
                            <img src="../../assets/image/task/setnum2.png" class="icon-s" v-if="item.is_huabei == 1" />
                            <img src="../../assets/image/task/setnum3.png" class="icon-s" v-if="item.is_super == 1" />
                        </span>
                    </van-cell>
                    <div class="cell-btn">
                        可接次数:今日{{ item.days_number }}次/本周{{ item.week_number }}次/本月{{ item.month_number }}次
                    </div>
                </div>
                <div class="tip-list" v-if="dataList.length > 0">
                    <div class="tip">1、怎么修改添加的买号?</div>
                    <div class="tip-text">点击认证失败汲取修改买号信息或者换号,若无法修改可以联系客服.</div>
                    <div class="tip">2、认证失败会有什么影响?</div>
                    <div class="tip-text">认证失败只会影响任务的接取,在做或已经完成的任务不受影响.</div>
                </div>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import * as api from '@/api/api'
import { concat } from 'lodash'
export default {
    name: 'buy-manage',
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
    filters: {
        formatPhone(val) {
            console.log('val', typeof val)
            if (!val) return
            else {
                return val.substring(0, 3) + '****' + val.substring(val.length - 4)
            }
        },
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        toNext(key, item) {
            this.$router.push({ name: key, query: item })
        },
        toDetail(item) {
            this.$router.push({ name: 'add-num', query: item })
        },
        toVerify(item) {
            this.$router.push({ name: 'verify-num', query: { id: item.id } })
        },
        getData() {
            // 请求
            api.taobaoList({
                page: this.page,
                rows: this.rows,
            }).then((res) => {
                if (res.success) {
                    // 结束加载
                    this.loading = false
                    if (res.data && res.data.list) {
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
                // this.getData()
            }, 500)
        },
    },
}
</script>

<style></style>
