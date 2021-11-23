<template>
    <van-tabbar route>
        <van-tabbar-item replace to="/">
            <span>首页</span>
            <template #icon="props">
                <img :src="props.active ? home.active : home.inactive" />
            </template>
        </van-tabbar-item>
        <van-tabbar-item replace to="/welfare">
            <span>已抢福利</span>
            <template #icon="props">
                <img :src="props.active ? welfare.active : welfare.inactive" />
            </template>
        </van-tabbar-item>
        <van-tabbar-item replace to="/invite">
            <span>邀请赚钱</span>
            <template #icon="props">
                <img :src="props.active ? invite.active : invite.inactive" />
            </template>
        </van-tabbar-item>
        <van-tabbar-item replace to="/mine">
            <span>我的</span>
            <template #icon="props">
                <img :src="props.active ? mine.active : mine.inactive" />
            </template>
        </van-tabbar-item>
    </van-tabbar>
</template>

<script>

export default {
    name: 'TabBar',
    data () {
        return {
            home: {
                active: require('../assets/image/footer/home.png'),
                inactive: require('../assets/image/footer/home-inactive.png'),
            },
            welfare: {
                active: require('../assets/image/footer/welfare.png'),
                inactive: require('../assets/image/footer/welfare-inactive.png'),
            },
            invite: {
                active: require('../assets/image/footer/invite.png'),
                inactive: require('../assets/image/footer/invite-inactive.png'),
            },
            mine: {
                active: require('../assets/image/footer/mine.png'),
                inactive: require('../assets/image/footer/mine-inactive.png'),
            },
        }
    }
}
</script>

<style>

</style>