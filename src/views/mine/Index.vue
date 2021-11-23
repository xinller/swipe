<template>
    <!-- 我的主页 -->
    <div class="mine-index">
        <van-nav-bar title="我的" right-text="联系客服" @click-right="toServer"> </van-nav-bar>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="v-page hasft">
            <div class="mine-top">
                <div class="card">
                    <div class="id-num">ID:{{ detail.id }}</div>
                    <div class="user">
                        <img src="../../assets/image/mine/head.png" alt="" class="head" />
                        <div class="info">
                            <div class="phone">{{ detail.phone | formatPhone }}</div>
                            <div class="level-info">
                                <span class="level">Lv{{ detail.level }}</span
                                ><router-link to="/back-rule" class="rule">返款规则></router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <img src="../../assets/image/mine/shadow.png" class="shadow" />
            </div>
            <div class="com-cell-list">
                <van-cell class="com-cell" is-link @click="toNext('buy-manage')">
                    <template #title>
                        <img src="../../assets/image/mine/buy.png" class="cell-icon" />
                        <span class="custom-title">买号管理</span>
                    </template>
                </van-cell>
                <van-cell class="com-cell" is-link @click="toNext('auth')">
                    <template #title>
                        <img src="../../assets/image/mine/auth.png" class="cell-icon" />
                        <span class="custom-title">实名认证</span>
                    </template>
                </van-cell>
                <van-cell class="com-cell" is-link @click="toNext('receive-index')">
                    <template #title>
                        <img src="../../assets/image/mine/card.png" class="cell-icon" />
                        <span class="custom-title">收款方式</span>
                    </template>
                </van-cell>
                <van-cell class="com-cell" is-link @click="toNext('invite')">
                    <template #title>
                        <img src="../../assets/image/mine/face.png" class="cell-icon" />
                        <span class="custom-title">推广赚米</span>
                    </template>
                </van-cell>
                <van-cell class="com-cell" is-link @click="toNext('server-center')">
                    <template #title>
                        <img src="../../assets/image/mine/server.png" class="cell-icon" />
                        <span class="custom-title">客服中心</span>
                    </template>
                </van-cell>
                <van-cell class="com-cell" is-link @click="toNext('set')">
                    <template #title>
                        <img src="../../assets/image/mine/set.png" class="cell-icon" />
                        <span class="custom-title">设置</span>
                    </template>
                </van-cell>
            </div>
        </van-pull-refresh>
    </div>
</template>

<script>
import * as api from '@/api/api'
export default {
    name: 'Mine',
    data() {
        return {
            isLoading: false,
            detail: {
                username: '',
                level: '',
                phone: '',
            },
        }
    },
    filters: {
        formatPhone(val) {
            if (!val) return
            return val.substring(0, 3) + '****' + val.substring(val.length - 4)
        },
    },
    mounted() {
        this.onRefresh()
    },
    methods: {
        toServer() {
            this.$router.push({ name: 'server' })
        },
        toNext(key) {
            this.$router.push({ name: key })
        },
        onRefresh() {
            api.getUserDetail().then((res) => {
                this.isLoading = false
                if (res.success) {
                    this.detail = res.data
                }
            })
        },
    },
}
</script>
<style lang="less">
.com-cell-list {
    width: 375px;
    .com-cell:nth-of-type(1),
    .com-cell:nth-last-of-type(1) {
        border-radius: 0;
    }
}
</style>
