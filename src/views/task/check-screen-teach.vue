<template>
<!-- 商家活动审核概况 -->
    <div class='shop-mark-container'>
         <van-nav-bar
            title="审核买号截图说明"
            left-arrow
            @click-left="goBack"
        />
        <div class="tip_jg">
            所有截图不要作任何修改或模糊处理，否则将无法上传，每次申请任务都必须重新截图，以下只是图例，仅供参考。
        </div>
        <div class="screen-card">
            <div class="screen-title">我的淘宝</div>
            <div class="screen-desc">上传一张我的淘宝主页截图与一张会员名截图（共两张）打开手机淘宝APP，再点击右下角【我的淘宝】主页截图：</div>
            <img src="../../assets/image/task/sc1.png" class="img">
            <div class="screen-desc">然后点【左上角头像】，最后点【编辑资料】，上传会员名截图</div>
            <img src="../../assets/image/task/sc2.png" class="img">
        </div>
        <div class="screen-card">
            <div class="screen-title">账号体验中心</div>
            <div class="screen-desc">账号体验中心截图步骤：打开手机淘宝APP-我的淘宝-客服小蜜，在对话框输入“体验中心”发送，在淘小蜜的自动回复中点击“淘宝体验中心”。</div>
            <img src="../../assets/image/task/sc3.png" class="img">
        </div>
        <div class="screen-card">
            <div class="screen-title">给他人评价</div>
            <div class="screen-desc">打开手机淘宝APP-我的淘宝-客服小蜜，在对话框输入“评价管理”发送，在淘小蜜的自动回复中点击“评价管理电脑版”，然后点击“给他人评价”</div>
            <img src="../../assets/image/task/sc4.png" class="img">
        </div>
        <div class="screen-card">
            <div class="screen-title">收藏夹</div>
            <div class="screen-desc">打开手机淘宝APP，再点击右下角【我的淘宝】，再点击【收藏夹】截图如下</div>
            <img src="../../assets/image/task/sc5.png" class="img">
        </div>
        <div class="screen-card">
            <div class="screen-title">关注店铺</div>
            <div class="screen-desc">打开手机淘宝APP，再点击右下角【我的淘宝】，再点击【关注店铺】截图如下：</div>
            <img src="../../assets/image/task/sc6.png" class="img">
        </div>
        <div class="screen-card">
            <div class="screen-title">足迹</div>
            <div class="screen-desc">打开手机淘宝APP，再点击右下角【我的淘宝】，再点击【足迹】截图如下：</div>
            <img src="../../assets/image/task/sc7.png" class="img">
        </div>
        <div class="screen-card">
            <div class="screen-title">我的订单列表</div>
            <div class="screen-desc">打开手机淘宝APP，再点击右下角【我的淘宝】，再点击【查看更多订单】截图如下：</div>
            <img src="../../assets/image/task/sc8.png" class="img">
        </div>
        <div class="screen-card">
            <div class="screen-title">淘气值</div>
            <div class="screen-desc">打开手机淘宝APP，再点击右下角【我的淘宝】，再点击【淘气值或会员中心】找到如下截图：</div>
            <img src="../../assets/image/task/sc9.png" class="img">
        </div>
        
        
        
    </div>
</template>

<script>

export default {
    name: 'check-screen-teach',
    components:{
    },
    data() {
        return {
            
        };
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