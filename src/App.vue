<template>
    <div id="app">
        <div class="layout-container">
            <!-- <keep-alive :include="navtags"> -->
            <router-view />
            <!-- </keep-alive> -->
        </div>

        <TabBar v-if="showTabBar"></TabBar>
    </div>
</template>

<script>
import TabBar from './components/TabBar'
export default {
    components: {
        TabBar,
    },
    watch: {
        $route(to) {
            if (this.navtags.indexOf(to.name) > -1) {
                this.showTabBar = true
            } else {
                this.showTabBar = false
            }
        },
    },
    data() {
        return {
            navtags: ['home', 'welfare', 'invite', 'mine'],
            showTabBar: true,
        }
    },

    mounted() {
        this.browserRedirect()
    },
    methods: {
        browserRedirect() {
            let sUserAgent = navigator.userAgent.toLowerCase()
            //输出：sUserAgent mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko) version/9.0 mobile/13b143 safari/601.1
            let bIsIpad = sUserAgent.match(/ipad/i) || false
            let bIsIphoneOs = sUserAgent.match(/iphone/i) || false
            let bIsMidp = sUserAgent.match(/midp/i) || false
            let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) || false
            let bIsUc = sUserAgent.match(/ucweb/i) || false
            let bIsAndroid = sUserAgent.match(/android/i) || false
            let bIsCE = sUserAgent.match(/windows ce/i) || false
            let bIsWM = sUserAgent.match(/windows mobile/i) || false
            if (bIsIpad[0] || bIsIphoneOs[0] || bIsMidp[0] || bIsUc7[0] || bIsUc[0] || bIsAndroid[0] || bIsCE[0] || bIsWM[0]) {
                /* 当前是手机端*/
            } else {
                /* 当前是PC端*/
                this.$toast('请用手机打开')
                this.onLogout()
            }
        },
        onLogout() {
            this.$store.commit('setToken', '')
            this.$router.replace({ name: 'login' })
        },
    },
}
</script>
<style lang="less">
@import './assets/css/index.less';
</style>
