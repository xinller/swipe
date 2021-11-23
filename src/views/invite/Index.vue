<template>
    <div class="invite-index">
        <van-nav-bar title="邀请赚钱" right-text="联系客服" @click-right="toServer"> </van-nav-bar>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="v-page hasfh">
            <div class="invite-top">
                <div class="asset">0</div>
                <div class="sub">累计邀请奖励</div>
                <div class="card">
                    <div class="item">
                        <div>
                            <div class="num">{{ dataInfo.push_count }} <span>人</span></div>
                            <div class="gray">已注册徒弟</div>
                        </div>
                        <div class="mt-10">
                            <div class="num">{{ dataInfo.grand_count }} <span>人</span></div>
                            <div class="gray">已注册徒孙</div>
                        </div>
                    </div>
                    <div class="item">
                        <div>
                            <div class="num">{{ dataInfo.push_active_count }} <span>人</span></div>
                            <div class="gray">已激活徒弟</div>
                        </div>
                        <div class="mt-10">
                            <div class="num">{{ dataInfo.grand_active_count }} <span>人</span></div>
                            <div class="gray">已激活徒孙</div>
                        </div>
                    </div>
                </div>
            </div>
            <h1 class="rule">奖励规则</h1>
            <div class="rule-list">
                <ul>
                    <li>
                        1、邀请好友成为您的徒弟并完成首单您可获得<span class="c-primary">{{ dataInfo.first_reward }}鲸币</span
                        >奖励
                    </li>
                    <li>
                        2、徒弟每完成一单任务您可以得到<span class="c-primary">{{ dataInfo.return_reward }}%鲸币</span>奖励
                    </li>
                    <li>
                        3、徒孙每完成一单任务您可以得到<span class="c-primary">{{ dataInfo.grand_reward }}%鲸币</span>奖励
                    </li>
                </ul>
                <div class="tag">
                    <router-link to="/invite-rank">邀请奖励排行榜></router-link>
                    <router-link to="/promote-reward">获取更高推广奖励></router-link>
                </div>
            </div>
            <div class="btn-invite" @click="toInvite">立即邀请好友</div>
        </van-pull-refresh>
    </div>
</template>

<script>
import * as api from '@/api/api'
import { mapGetters } from 'vuex'
export default {
    name: 'Invite',
    computed: {
        ...mapGetters(['noviceInfo']),
    },
    data() {
        return {
            isLoading: false,
            dataInfo: '',
        }
    },
    mounted() {
        this.onRefresh()
    },
    methods: {
        toServer() {
            this.$router.push({ name: 'server' })
        },
        toInvite() {
            if (this.noviceInfo.is_auth == 1) {
                this.$router.push({ name: 'share' })
            } else {
                this.$toast('必须完成实名认证才具有邀请资格')
            }
        },
        onRefresh() {
            this.inviteInfo()
            this.getUserNoviceInfo()
        },
        inviteInfo() {
            api.inviteInfo().then((res) => {
                this.isLoading = false
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
    },
}
</script>
