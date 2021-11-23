<template>
    <!-- 切换买号 -->
    <div class="grab-setnum-container">
        <van-nav-bar title="切换买号" left-arrow @click-left="goBack" />
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="v-page">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多" @load="onLoad" :offset="130">
                <div class="no-num" v-if="noData">
                    <img src="../../assets/image/mine/sorry.png" style="width:100%" />
                    <div>暂时还没有买号~</div>
                    <van-button class="btn-app mt-10" @click="toManage">去添加买号</van-button>
                </div>
                <div class="card-box" v-for="item in dataList" :key="item.id">
                    <van-cell center>
                        <img slot="icon" src="../../assets/image/task/taobao.png" class="icon" />
                        <template #title>
                            <span>淘宝账号选择(必选)</span>
                        </template>
                        <template #right-icon>
                            <van-switch v-model="item.is_use" size="24" @change="changeUse(item.id)" />
                        </template>
                    </van-cell>
                    <van-cell :value="`今日已接${item.days_number}/2`">
                        <template #title>
                            <div class="flexrow">
                                <span class="mr-5">{{ item.taobao_username }}</span>
                                <img src="../../assets/image/task/setnum1.png" class="icon-s" v-if="item.is_goods == 1" />
                                <img src="../../assets/image/task/setnum2.png" class="icon-s" v-if="item.is_huabei == 1" />
                                <img src="../../assets/image/task/setnum3.png" class="icon-s" v-if="item.is_super == 1" />
                            </div>
                        </template>
                    </van-cell>
                    <div class="btn-manage" @click="toManage">买号管理</div>
                    <div class="tips">
                        我的-买号管理-认证信息 进行验号申请 .
                        <router-link :to="{ name: 'verify-num', query: item }">去申请验号</router-link>
                    </div>
                </div>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import * as api from '@/api/api'
import { concat, each } from 'lodash'
export default {
    name: 'grab-setnum',
    data() {
        return {
            checked: true,
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
        // 去买号管理 带当前账号
        toManage() {
            // hasNum 有账号
            this.$router.push({ name: 'buy-manage' })
        },
        changeUse(id) {
            api.switchAccount({ id: id }).then((res) => {
                if (res.success) {
                    this.onRefresh()
                }
            })
        },
        getData() {
            // 请求
            api.taobaoExamineList({
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
                    each(this.dataList, (v) => {
                        v.is_use = v.is_use == 1 ? true : false
                    })
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

<style lang="less" scoped></style>
