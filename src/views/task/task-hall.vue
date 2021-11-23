<template>
    <div class="task-hall">
        <van-nav-bar title="任务大厅" left-arrow @click-left="goBack" />
        <div class="com-cell-list">
            <van-cell class="com-cell mt-15" is-link @click="toNext('hall-manual-grab')">
                <template #title>
                    <img src="../../assets/image/task/task1.png" class="cell-icon-bg" />
                    <div>
                        <p class="custom-title">人工抢单任务</p>
                        <p class="custom-label">自己按需完成任务--灵活高效</p>
                    </div>
                </template>
            </van-cell>
            <van-cell class="com-cell mt-15" is-link @click="toNext('hall-check')">
                <template #title>
                    <img src="../../assets/image/task/task2.png" class="cell-icon-bg" />
                    <div>
                        <span class="custom-title">商家审号任务</span>
                        <p class="custom-label">商家审核买号质量--更高佣金</p>
                    </div>
                </template>
            </van-cell>
            <van-cell class="com-cell  mt-15" is-link @click="toNext('hall-zero')">
                <template #title>
                    <img src="../../assets/image/task/task3.png" class="cell-icon-bg" />
                    <div>
                        <p class="custom-title">零元购任务</p>
                        <p class="custom-label">零元购任务--灵活高效</p>
                    </div>
                </template>
            </van-cell>
        </div>
    </div>
</template>

<script>
export default {
    name: 'task-hall',
    methods: {
        goBack() {
            this.$router.replace({ name: 'home' })
        },
        toNext(key) {
            this.$router.push({ name: key })
        },
    },
}
</script>

<style></style>
