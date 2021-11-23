<template>
<!-- 身份证拍摄要求 -->
  <div class="camera-require">
       <van-nav-bar
        title="身份证拍摄要求"
        left-arrow
        @click-left="goBack"
        />
        <div class="content">
            <div class="title c-primary">正确案例</div>
            <div class="camera-box">
                <div class="subtitle">身份证拍摄要求横屏拍摄,并且保证身份男子信息完整清晰</div>
                <img src="../../assets/image/mine/auth1.png" class="img1">
            </div>
            <div class="title c-red">错误案例</div>
            <div class="camera-box">
                <div class="subtitle">不要竖着拍这样会导致审核不通过</div>
                <img src="../../assets/image/mine/auth2.png" class="img2">
            </div>
        </div>
  </div>
</template>

<script>
export default {
    name:'camera-require',
    methods:{
        goBack(){
            this.$router.go(-1)
        }
    }
}
</script>

<style>

</style>