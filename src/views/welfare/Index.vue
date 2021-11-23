<template>
    <div class="welfare-index">
        <van-nav-bar title="已抢福利" right-text="联系客服" @click-right="toPage('server')"> </van-nav-bar>
        <div class="com-cell-list">
            <van-cell class="com-cell  mt-15" is-link @click="toPage('check-index')">
                <template #title>
                    <img src="../../assets/image/welfare/check-num.png" class="cell-icon" />
                    <span class="custom-title">商家审号</span>
                </template>
            </van-cell>
        </div>
        <div class="nav-wrap">
            <van-cell title="未完成" clickable is-link value="全部" @click="toUndonePage('')" />
            <van-grid :icon-size="25" column-num="5" :border="false" clickable>
                <van-grid-item @click="toUndonePage(1)">
                    <img src="../../assets/image/welfare/icon-1.png" class="icon" />
                    <div class="size-12">已接手</div>
                </van-grid-item>
                <van-grid-item @click="toUndonePage(2)">
                    <img src="../../assets/image/welfare/icon-2.png" class="icon" />
                    <div class="size-12">待发货</div>
                </van-grid-item>
                <van-grid-item @click="toUndonePage(3)">
                    <img src="../../assets/image/welfare/icon-3.png" class="icon" />
                    <div class="size-12">待评价</div>
                </van-grid-item>
                <van-grid-item @click="toUndonePage(4)">
                    <img src="../../assets/image/welfare/icon-4.png" class="icon" />
                    <div class="size-12">待返款</div>
                </van-grid-item>
                <van-grid-item @click="toUndonePage(5)">
                    <img src="../../assets/image/welfare/icon-5.png" class="icon" />
                    <div class="size-12">预售</div>
                </van-grid-item>
            </van-grid>
        </div>
        <div class="com-cell-list group">
            <van-cell class="com-cell mt-15" is-link clickable @click="toPage('done-list')">
                <template #title>
                    <img src="../../assets/image/welfare/done.png" class="cell-icon" />
                    <span class="custom-title">已完成</span>
                </template>
            </van-cell>
            <van-cell class="com-cell" is-link clickable @click="toPage('check-close')">
                <template #title>
                    <img src="../../assets/image/welfare/close.png" class="cell-icon" />
                    <span class="custom-title">已关闭</span>
                </template>
            </van-cell>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Welfare',
    methods: {
        // 未完成
        toUndonePage(status) {
            this.$router.push({ name: 'check-undone', params: { status } })
        },
        // 跳转路由
        toPage(key) {
            this.$router.push({ name: key })
        },
    },
}
</script>
