<template>
    <div>
        <van-nav-bar
            title="已关闭"
            right-text="联系客服"
            left-arrow
            @click-left="goBack"
            @click-right="toPage"
            />
            <close-list></close-list>
    </div>
</template>

<script>
import CloseList from './close-list'
export default {
    name: 'check-close',
    components:{
        CloseList
    },
    data() {
        return {};
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        },
        toPage(){
            this.$router.push({name:'server'})
        }
    }
};
</script>

<style lang='less' scoped>
</style>