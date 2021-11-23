<template>
    <van-dialog v-model="isShow" class="close-task-dialog dialog-box" :show-confirm-button="false">
        <template #default>
            <img src="../assets/image/home/close.png" class="dialog-close" v-if="closeBtn" @click="toggleHandler" />
            <div class="dialog-title" v-if="title">{{ title }}</div>
            <div class="dialog-content" :style="{ marginTop: closeBtn ? '20px' : '10px' }">
                <div>
                    <div :class="['btn-yy', { active: type == 1 }]" @click="type = 1">找不到宝贝</div>
                    <div :class="['btn-yy', { active: type == 2 }]" @click="type = 2">没时间做,做不了了</div>
                    <div :class="['btn-yy', { active: type == 3 }]" @click="type = 3">实际价格高于货款</div>
                    <div :class="['btn-yy', { active: type == 4 }]" @click="type = 4">达不到商家备注要求</div>
                    <div :class="['btn-yy', { active: type == 5 }]" @click="type = 5">其他原因</div>
                    <div class="tip">注:关闭活动不减今日接单次数</div>
                </div>
            </div>
            <div class="dialog-footer">
                <van-button class="cancel" @click="toggleHandler">取消</van-button>
                <van-button class="sure" @click="confirmHandler">确定</van-button>
            </div>
        </template>
    </van-dialog>
</template>

<script>
// 1-找不到宝贝 2-没时间做 3-实际价格高于货款 4-达不到商家备注要求 5-其他原因
export default {
    name: 'v-dialog',
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '',
        },
        closeBtn: {
            type: Boolean,
            default: true,
        },
    },
    watch: {
        visible(val) {
            this.isShow = val
        },
    },
    data() {
        return {
            type: '',
            isShow: this.visible,
        }
    },
    methods: {
        toggleHandler() {
            this.$emit('toggle', false)
        },
        confirmHandler() {
            if (!this.type) return this.$toast('请选择关闭原因')
            this.$emit('confirm', { type: this.type })
        },
    },
}
</script>

<style></style>
