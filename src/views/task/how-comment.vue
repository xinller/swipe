<template>
    <div class='how-comment-container'>
         <van-nav-bar
            title="如何评价"
            left-arrow
            @click-left="goBack"
            />
        <div class="p-15">
            <div class="title">确认收货说明:</div>
            <p class="desc">1、物流真实签收后才能确认收货,否则会受到处罚。</p>
            <p class="desc">2、注意收货时间，如果商家要求是物流签收五天后确认收货，您需要在物流签收的五天后才能确认收货。</p>
            <div class="title">评价说明：</div>
            <p class="desc">1.不评价(只确认收货)：只需要确认收货，不需要任何评价，五星也不需要评价。</p>
            <p class="desc">2.五星好评(无文字):只需要打五星好评，不需要任何评价内容。</p>
            <p class="desc">3.五星好评(好评):五星好评加评价内容写"好评"两字。</p>
            <p class="desc">4.优质好评：五星好评加商家指定的文字评价内容。</p>
            <p class="desc">5.图文好评：五星好评加商家指定的图文评价内容</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'how-comment',
    data() {
        return {};
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