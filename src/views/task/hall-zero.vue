<template>
    <!-- 0元购 -->
    <div class="hall-manual-grab">
        <van-nav-bar title="零元购任务" left-arrow @click-left="goBack" />
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="v-page">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多" @load="onLoad" :offset="130">
                <div class="hall-top">
                    <router-link to="/grab-rule" class="left">接单规则</router-link>
                    <router-link to="/grab-setnum" class="right">设置买号</router-link>
                </div>
                <div class="com-shop-card" v-for="(item, index) in dataList" :key="index">
                    <img src="../../assets/image/task/you.png" class="tag" v-if="item.activity_type == 1" />
                    <img :src="item.goods_image" class="thumb" />
                    <div class="content">
                        <div class="middle">
                            <div class="top-img">
                                <img src="../../assets/image/task/taobao.png" class="tb-icon" v-if="item.platform_type == 0" />
                                <img src="../../assets/image/task/jd.png" class="tb-icon" v-if="item.platform_type == 1" />
                                <img src="../../assets/image/task/pdd.png" class="tb-icon" v-if="item.platform_type == 2" />
                                <span class="pre-sale" v-if="item.is_pre == 1">预售</span>
                            </div>

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
                        </div>
                        <div class="right">
                            <p class="status">{{ item.back_type == 0 ? '平台返款' : '商家返款' }}</p>
                            <button @click="grabEvent(item)">马上抢</button>
                        </div>
                    </div>
                </div>
            </van-list>
        </van-pull-refresh>
        <!-- 抢单弹窗 -->
        <v-dialog :visible="visible" :closeBtn="false">
            <div slot="content" class="grab-timeout-page">
                <div class="close_btn" @click="closeDialog">
                    <van-icon name="close" class="size-24" />
                </div>
                <!-- 抢取成功 正在抢... -->
                <div class="grabing">{{ !isGrabed ? '正在抢.....' : isGrabfail ? '抢取失败' : '抢取成功' }}</div>
                <div v-if="!isGrabed">
                    <div class="grab-time">耗时{{ show_t }}s</div>
                </div>

                <!-- 抢成功显示 -->
                <div class="cell-box" v-if="isGrabed && !isGrabfail">
                    <div class="cell-list">
                        <div class="title">活动类型:</div>
                        <div class="text">淘宝/天猫{{ grabInfo.activity_type == 1 ? '优质' : '普通' }}试用活动</div>
                    </div>
                    <div class="cell-list c-primary">
                        <div class="title">接手买号:{{ grabInfo.taobao_nickname }}</div>
                        <div class="text">{{ grabInfo.pay_amount }}元</div>
                    </div>
                    <div class="cell-list">
                        <div class="title">活动赏金:</div>
                        <div class="text">{{ grabInfo.bounty_amount }}</div>
                    </div>
                    <div class="cell-list" v-if="grabInfo.eve_amount > 0">
                        <div class="title">评价赏金:</div>
                        <div class="text">{{ grabInfo.eve_amount }}</div>
                    </div>
                    <div class="cell-list" v-if="grabInfo.adaeve_amount > 0">
                        <div class="title">追评赏金:</div>
                        <div class="text">{{ grabInfo.adaeve_amount }}</div>
                    </div>
                    <div class="cell-list">
                        <div class="title">完成时间:</div>
                        <div class="text">{{ grabInfo.complete_time }}分钟</div>
                    </div>
                    <div class="btn-footer">
                        <!-- 已抢福利 -->
                        <div class="left-btn" @click="doNext">等下做</div>
                        <!-- 跳 货比打标 -->
                        <div class="right-btn" @click="doNow">现在做</div>
                    </div>
                </div>
            </div>
        </v-dialog>
    </div>
</template>

<script>
import VDialog from '../../components/VDialog'
import * as api from '@/api/api'
import { concat } from 'lodash'
import { mapGetters } from 'vuex'
export default {
    name: 'hall-manual-grab',
    components: {
        VDialog,
    },
    data() {
        return {
            visible: false,
            isGrabed: false, //是否开始申请抢单
            isGrabfail: false, //抢单申请请求失败
            timeLength: 2000,
            show_t: 2,
            interval: null,
            grabInfo: '', //抢到的单子信息

            dataList: [],
            loading: false, // true 转圈圈
            finished: false, //是否请求结束 结束显示 没有更多
            noData: false, //如果没有数据 显示暂无
            refreshing: false, //是否下拉刷新
            page: 1,
            rows: 10,
        }
    },
    computed: {
        ...mapGetters(['hasComplate']),
    },
    created() {
        this.getUserNoviceInfo()
    },
    methods: {
        getUserNoviceInfo() {
            api.getUserNoviceInfo().then((res) => {
                this.$toast.clear()
                if (res.success) {
                    let data = res.data
                    this.$store.commit('setNoviceInfo', data)
                }
            })
        },
        timeout() {
            this.interval = setInterval(() => {
                if (this.timeLength > 200) {
                    this.timeLength -= 200
                    this.show_t = (this.timeLength / 1000).toFixed(2)
                } else {
                    this.show_t = 0
                    clearInterval(this.interval)
                }
            }, 100)
        },
        goBack() {
            this.$router.replace({ name: 'task-hall' })
        },
        closeDialog() {
            this.visible = false
            this.onRefresh()
        },
        grabEvent(item) {
            if (!this.hasComplate) {
                this.$toast('请先完成新手任务')
                this.$router.push({ name: 'novice-task' })
                return
            }
            this.visible = true
            this.isGrabed = false
            this.isGrabfail = false
            this.timeout()
            api.userGrab({ order_id: item.id }).then((res) => {
                if (res.success) {
                    // clearInterval(this.interval)
                    setTimeout(() => {
                        if (this.show_t == 0) {
                            this.isGrabed = true
                            this.isGrabfail = false
                        }
                    }, 2000)
                    this.grabInfo = res.data
                } else {
                    this.isGrabed = true
                    this.isGrabfail = true
                    setTimeout(() => {
                        this.visible = false
                    }, 2000)
                }
            })
        },
        // 现在做
        doNow() {
            this.visible = false
            this.isGrabed = false
            this.$router.push({ name: 'step-find-zero', query: { id: this.grabInfo.order_id } })
            // if (this.grabInfo.examine_type == 1) {
            //     // 商家审核
            //     this.$router.push({ name: 'hall-check-detail', query: { id: this.grabInfo.order_id } })
            // } else {
            //     // 平台审核
            //     // 步骤1:货比打标
            //     if (this.grabInfo.search_type == 0) {
            //         this.$router.push({ name: 'step-compare', query: { id: this.grabInfo.order_id } })
            //     } else {
            //         // 0元购 - 付款页面
            // this.$router.push({ name: 'step-pay', query: { id: this.grabInfo.order_id } })
            //     }
            // }
        },
        // 等下做- 已抢福利
        doNext() {
            this.visible = false
            this.isGrabed = false
            this.$router.replace({ name: 'welfare' })
        },
        getData() {
            // 请求
            api.getZeroList({
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

<style lang="less" scoped>
.dialog-box {
    padding: 0;
}
</style>
