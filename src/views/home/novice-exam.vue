<template>
    <div class="novice-exam">
        <van-nav-bar title="新手考试" left-arrow @click-left="toNext('novice-task')" />
        <div class="card">
            <img src="../../assets/image/home/novice-bg.png" class="banner" />
            <p class="size-20 wt-bold mb-10">鲸鱼新手任务考试</p>
            <p class="size-13">
                您好，为了您的财产安全以及避免新手用户在试用过程中出现操作问题
                带来不必要的麻烦，平台规定在使用此应用前需要完成新手考试后才能开始接手任务，
                请您认真完成以下选择题（如果在具体的操作中遇到其他问题建议您到客服中心联系在线客服）。
            </p>
        </div>
        <div class="btn-app" @click="toNext('novice-exam-list')">开始考试</div>
    </div>
</template>

<script>
export default {
    name: 'novice-exam',
    methods: {
        toNext(key) {
            this.$router.push({ name: key })
        },
    },
}
</script>

<style></style>
