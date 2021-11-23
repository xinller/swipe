<template>
    <div class='modify-voice-container'>
         <van-nav-bar
            title="提示语音选择"
            left-arrow
            @click-left="goBack"
            />
    </div>
</template>

<script>
export default {
    name: 'modify-voice',
    data() {
        return {};
    },
    methods:{
        goBack(){
            this.$router.go(-2)
        }
    }
};
</script>

<style lang='less' scoped>
</style>