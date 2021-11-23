<template>
    <div>
        <van-nav-bar
            title="已完成"
            left-arrow
            @click-left="goBack"
            />
            <van-tabs v-model="status" animated>
                <van-tab title="全部">
                    <done-list></done-list>
                </van-tab>
                <van-tab title="已完成">
                    
                </van-tab>
                <van-tab title="部分完成">
                    
                </van-tab>
            </van-tabs>
    </div>
</template>

<script>
import DoneList from './done-list'
export default {
    name: 'check-done',
    components:{
        DoneList
    },
    data() {
        return {
            status:0
        };
    },
    mounted(){
        this.status = this.$route.params.status
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        }
    }
};
</script>

<style lang='less' scoped>
</style>