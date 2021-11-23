<template>
    <!-- 商家审号 -->
    <div class="hall-manual-grab">
        <van-nav-bar
            title="商家审号"
            right-text="我的申请"
            left-arrow
            @click-left="goBack"
            @click-right="toNext('check-index')"
        />
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="v-page">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多" @load="onLoad" :offset="130">
                <div class="hall-top">
                    <div class="left" @click="visible = true">审号规则</div>
                    <router-link to="/grab-setnum" class="right">设置买号</router-link>
                </div>
                <div class="com-shop-card" v-for="(item, index) in dataList" :key="index">
                    <img src="../../assets/image/task/shen.png" class="tag" />
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
                            <div class="bot-tag">
                                <span class="add-btn">附加</span>
                                <span class="round" v-for="i in item.browse_require_list" :key="i">{{
                                    util.formatBrowse(i)
                                }}</span>
                            </div>
                        </div>
                        <div class="right">
                            <p class="status">{{ item.back_type == 0 ? '平台返款' : '商家返款' }}</p>
                            <button @click="grabEvent(item)">马上抢</button>
                        </div>
                    </div>
                </div>
            </van-list>
        </van-pull-refresh>
        <!-- 提示modal -->
        <v-dialog :visible="visible" @toggle="visible = false" title="审号规则">
            <div slot="content">
                商家审号活动是指买手先申请活动，根据商家的要求提供相关资料截图，商家审核通过后方可开始做任务，此功能属测试阶段，请大家以人工抢单为主。
            </div>
            <div slot="footer" class="dialog-btn" @click="visible = false">我知道了</div>
        </v-dialog>
        <!-- 抢单弹窗 -->
        <v-dialog :visible="visible_grab" :closeBtn="false" style="padding:0">
            <div slot="content" class="grab-timeout-page">
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
import VDialog from '@/components/VDialog'
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
            visible_grab: false,
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
        goBack() {
            this.$router.replace({ name: 'task-hall' })
        },
        toNext(key) {
            this.$router.push({ name: key })
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
        grabEvent(item) {
            if (!this.hasComplate) {
                this.$toast('请先完成新手任务')
                this.$router.push({ name: 'novice-task' })
                return
            }
            this.visible_grab = true
            this.isGrabed = false
            this.isGrabfail = false
            this.timeout()
            api.userGrab({ order_id: item.id }).then((res) => {
                if (res.success) {
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

            this.$router.push({ name: 'hall-check-detail', query: { id: this.grabInfo.order_id } })
        },
        // 等下做- 已抢福利
        doNext() {
            this.visible = false
            this.isGrabed = false
            this.$router.replace({ name: 'welfare' })
        },
        getData() {
            // 请求
            api.getExamineList({
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

<style lang="less" scoped></style>
