<template>
    <van-popup v-model="visible" class="com-pop-screen">
        <div class="pop-title" v-if="title">{{title}}</div>
        <div class="pop-content">
            <slot name="content"></slot>
        </div>
        <div class="pop-footer" @click="togglePopup">我知道了</div>
    </van-popup>
</template>

<script>
export default {
    name: 'VPopup',
    props:{
        visible:{
            type:Boolean,
            default:false
        },
        title:{
            type:String,
            default:''
        }
    },
    data() {
        return {};
    },
    methods:{
        togglePopup(){
            this.$emit('toggle',false)
        }
    }
};
</script>

<style lang='less' scoped>
</style>