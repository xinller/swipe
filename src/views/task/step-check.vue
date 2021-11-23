<template>
<!-- 第二步 : 找到宝贝 (验证店铺) -->
    <div class='step-check-container'>
        <van-nav-bar
            title="验证店铺"
            left-arrow
            @click-left="goBack"
        />
        <div class="p-15">
            <div class="desc">1、如何验证店铺?</div>
            <div class="desc">在验证框输入不正确的店铺名或者旺旺名再点击确认.</div>
            <div class="desc">2、店铺验证不通过怎么办?</div>
            <div class="desc">确认找对了宝贝,并输入正确的店铺名或旺旺名.如找不到宝贝可以先关闭订单,异常情况可以联系客服.</div>
            <div class="desc">3、店铺名称如何查询?</div>
            <img src="../../assets/image/task/check1.png" class="thumb">
            <div class="desc">4、卖家旺旺名称如何查询?</div>
            <img src="../../assets/image/task/check2.png" class="thumb">
            <img src="../../assets/image/task/check3.png" class="thumb">
        </div>
    </div>
</template>

<script>

export default {
    name: 'shop-check',
    components:{
    },
    data() {
        return {
            
        };
    },
    mounted(){
        
    },
    methods:{
        
        goBack(){
            this.$router.go(-1)
        },
    }
};
</script>

<style lang='less' scoped>
</style>