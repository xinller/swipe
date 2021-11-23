<template>
    <!-- 首页主页 -->
    <div class="home-index">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="v-page hasft">
            <div class="home-top" ref="hd_dom">
                <van-nav-bar title="首页" @click-right="togglePop">
                    <template #right>
                        <img src="../../assets/image/home/more.png" class="nav-more" />
                    </template>
                </van-nav-bar>
                <pop-confim v-show="isShowPop">
                    <ul slot="list">
                        <li @click="onRefresh">刷新</li>
                        <li>一键修复</li>
                        <li @click="toServer">联系客服</li>
                    </ul>
                </pop-confim>
                <div class="card-wrap">
                    <div class="card">
                        <div class="subtitle">累计鲸币收益</div>
                        <div class="assets">{{ dataInfo.total }}</div>
                        <van-row gutter="20" class="asset-wrap">
                            <van-col span="8">
                                <router-link to="/asset">
                                    <p class="size-12">鲸币余额</p>
                                    <div class="size-16">{{ dataInfo.amount ? Number(dataInfo.amount).toFixed(2) : 0 }}</div>
                                </router-link>
                            </van-col>
                            <van-col span="8">
                                <router-link to="/back-record">
                                    <p class="size-12">待商家返款金额</p>
                                    <div class="size-16">
                                        {{ dataInfo.store_return ? Number(dataInfo.store_return).toFixed(2) : 0 }}
                                    </div>
                                </router-link>
                            </van-col>
                            <van-col span="8">
                                <router-link to="/loan">
                                    <p class="size-12">货款余额</p>
                                    <div class="size-16">{{ dataInfo.loan ? Number(dataInfo.loan).toFixed(2) : 0 }}</div>
                                </router-link>
                            </van-col>
                        </van-row>
                    </div>
                    <van-row class="card-ft" type="flex" justify="space-between" align="center">
                        <van-col span="12" class="text-left">
                            <router-link to="/asset">
                                今日鲸币收入 {{ dataInfo.today_income ? Number(dataInfo.today_income).toFixed(2) : 0 }}
                            </router-link>
                        </van-col>
                        <van-col span="12" class="text-right">
                            <router-link to="/invite-reward">
                                今日推广奖励 {{ dataInfo.today_extension ? Number(dataInfo.today_extension).toFixed(2) : 0 }}
                            </router-link>
                        </van-col>
                    </van-row>
                </div>
            </div>

            <van-notice-bar
                @click="toNotice"
                class="notice-bar"
                :left-icon="require('../../assets/image/home/notice.png')"
                :scrollable="false"
                background="#fff"
                color="#666"
            >
                <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
                    <van-swipe-item v-for="item in noticeData" :key="item.id">{{ item.title }}</van-swipe-item>
                </van-swipe>
            </van-notice-bar>
            <div class="serve-banner">
                <img src="../../assets/image/home/banner.png" class="banner" @click="toServer" />
                <span class="qq_group">请您加入QQ群:{{ buyer_qq_group }}</span>
            </div>
            <div class="com-list">
                <!-- 完成实名认证后不显示新手任务 -->
                <router-link class="com-list-item" to="/novice-task" v-if="!hasComplate">
                    <img src="../../assets/image/home/work.png" class="icon" />
                    <span class="title">新手任务</span>
                    <span class="text">完成新手任务,领取新手奖励</span>
                </router-link>
                <router-link class="com-list-item" to="/novice-teach">
                    <img src="../../assets/image/home/teach.png" class="icon" />
                    <span class="title">新手教学</span>
                    <span class="text">新手一定要先学习后再抢福利喔</span>
                </router-link>
            </div>
            <div class="btn-go" @click="goWelfare">抢福利</div>

            <!-- 温馨提示 -->
            <v-dialog :visible="visible" @toggle="toggleDialog" title="温馨提醒">
                <div slot="content">
                    <div>已上线商家自行返款功能,买家付款后,商家在次日自行转本金给买家,请务必在新手教学了解具体返款规则.</div>
                    <div class="mt-10">网页内点不动,没反应的请在右上角刷新重进</div>
                    <div class="mt-10">白屏的新刷新浏览器重新进入</div>
                </div>
                <router-link slot="footer" class="dialog-btn" to="/notice">查看详情</router-link>
            </v-dialog>
        </van-pull-refresh>
    </div>
</template>

<script>
import VDialog from '../../components/VDialog'
import PopConfim from '@/components/Popconfim.vue'
import * as api from '@/api/api'
import { mapGetters } from 'vuex'
export default {
    name: 'home',
    components: {
        PopConfim,
        VDialog,
    },
    data() {
        return {
            isLoading: false,
            isShowPop: false,
            visible: false,
            dataInfo: '', //用户信息
            noticeData: [],
            buyer_qq_group: '',
        }
    },
    created() {},
    computed: {
        ...mapGetters(['noviceInfo', 'hasComplate', 'onLogin']),
    },
    mounted() {
        this.getData()
    },
    methods: {
        getCookie(Name) {
            var search = Name + '='
            var returnValue = ''
            if (document.cookie.length > 0) {
                var offset = document.cookie.indexOf(search)
                if (offset !== -1) {
                    offset += search.length
                    console.log('offset', offset)
                    var end = document.cookie.indexOf(';', offset)
                    if (end == -1) {
                        end = document.cookie.length
                        console.log('end', end)
                    }
                    returnValue = decodeURIComponent(document.cookie.substring(offset, end))
                }
            }
            console.log('returnValue', returnValue)
            return returnValue
        },
        // 刷新
        onRefresh() {
            this.getData()
            this.isShowPop = false
        },
        getData() {
            this.getHome()
            this.getUserNoviceInfo()
            this.getNoticeList()
            this.customerService()
            this.initLogin()
        },
        initLogin() {
            if (this.onLogin) {
                this.visible = true
                this.$store.commit('setOnLogin', false)
            } else {
                this.visible = false
            }
        },
        // 获取首页数据
        getHome() {
            api.getHome().then((res) => {
                if (res.success) {
                    this.dataInfo = res.data
                }
            })
        },
        getUserNoviceInfo() {
            api.getUserNoviceInfo().then((res) => {
                this.$toast.clear()
                if (res.success) {
                    let data = res.data
                    this.$store.commit('setNoviceInfo', data)
                }
            })
        },
        getNoticeList() {
            this.$toast.loading({ message: '加载中', forbidClick: true })
            api.noticeList({ page: 1, rows: 10 }).then((res) => {
                this.isLoading = false
                if (res.success) {
                    this.noticeData = res.data
                }
            })
        },
        toServer() {
            this.$router.push({ name: 'server' })
        },
        toNotice() {
            this.$router.push({ name: 'notice' })
        },
        togglePop() {
            this.isShowPop = !this.isShowPop
        },
        toggleDialog(value) {
            this.visible = value
        },
        // 抢福利
        goWelfare() {
            //  is_examination == 0 ,is_account == 0 ,is_setbank == 0 ,is_auth == 0

            // 判断是否实名  是否买号 完成新手任务

            // if (!this.hasComplate) {
            //     this.$toast('请先完成新手任务')
            //     setTimeout(() => {
            //         this.$router.push({ name: 'novice-task' })
            //     }, 800)
            // } else {
            // 已认证实名 进入任务大厅
            this.$router.push({ name: 'task-hall' })
            // }
        },
        customerService() {
            api.customerService().then((res) => {
                if (res.success) {
                    this.buyer_qq_group = res.data.buyer_qq_group
                }
            })
        },
    },
}
</script>
