<template>
<van-dialog v-model="visible" class="dialog-box" :show-confirm-button="false">
    <template #default>
        <img src="../assets/image/home/close.png" class="dialog-close" v-if="closeBtn" @click="toggleHandler">
        <div class="dialog-title" v-if="title">{{title}}</div>
        <div class="dialog-content" :style="{marginTop:closeBtn?'20px':'10px'}">
            <slot name="content"></slot>
        </div>
        <slot name="footer"></slot>
    </template>
</van-dialog>
</template>

<script>
export default {
    name :'v-dialog',
    props:{
        visible:{
            type : Boolean,
            default : false
        },
        title:{
            type :String,
            default: ""
        },
        closeBtn:{
            type:Boolean,
            default:true
        }
    },
    methods:{
        toggleHandler(){
            this.$emit('toggle' , false)
        }
    }
}
</script>

<style>

</style>