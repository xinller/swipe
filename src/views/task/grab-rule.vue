<template>
<!-- 接单规则 -->
    <div class='grab-rule-container'>
        <van-nav-bar
        title="接单规则"
        left-arrow
        @click-left="goBack"
        />
        <div class="rule-box">
            <div class="rule-title">接单规则</div>
            <div class="rule-sub">
                平台采用抢单机制，用户需开启接单模式，接单大厅下拉刷新获取最新订单，系统有单时，会根据以下几个规则优先派单
            </div>
            <div class="rule-content">
                1.无降权记录，无被删除评价记录，开通花呗，淘宝超级会员的优质号。<br>
                2.符合商家对账号的要求，能过验号系统。 <br>
                3.优先给被投诉率低，接单量少的用户。<br>
                4.遵从平台规则，服务分高的用户。
            </div>
        </div>
        <div class="rule-box">
            <div class="rule-title">活动分类</div>
            <div class="rule-sub">
                订单图标注释
            </div>
            <div class="rule-content">
                1. <span class="c-red">“优”</span>代表优质活动，只有通过平台优质验号后才可接单。<br>

                2. <span class="c-red">“预售”</span>代表先加入购物车，过一段时间，再去付款<br>

                3. <span class="c-red">“延收”</span>代表在物流签收后，等几天再确认收货。<br>

                4. <span class="c-red">“追评”</span>代表评价后需要追评。<br>

                5. “主”代表主宝贝浏览。<br>

                6. “比”代表需要货比两家。<br>

                7. “评”代表需要评价。<br>

                8. “聊”代表旺旺聊天。<br>

                9. “藏”代表收藏店铺或者收藏宝贝。<br>

                10. “购”代表加入购物车。<br>

                11. “问”代表浏览问大家。<br>

                12. “视”代表浏览宝贝主视频。<br>

                13. “次”代表浏览店铺其他宝贝。<br>

                14. “橱”代表浏览宝贝的五张橱窗图。<br>
            </div>
        </div>
        <div class="rule-box">
            <div class="rule-title">如何才能接到高赏金单？</div>
            <div class="rule-sub">
                通过优质验号验证，开通花呗，高淘气值，淘宝超级会员，待收发数量少，无降权和违规记录，正常购物的大号可接高赏金单，请注意保持你账号的优质度，合理做单。
            什么情况会被平台禁止接单？
            </div>
        </div>
        <div class="rule-box">
            <div class="rule-title">什么情况会被平台禁止接单？</div>
           
            <div class="rule-content">
            
            1.被商家多次投诉，使用用淘宝客或者不按照商家要求进行做单。<br>

            2.被淘宝删除评价，被查出虚假交易，频繁做单的小号。<br>

            3.骚扰商家，恶意退款等损害商家和平台利益的行为。<br>

            4.上传虚假资料，例如：账号未开通花呗却上传了花呗截图。<br>

            5.违反平台其他规则。
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'grab-rule',
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