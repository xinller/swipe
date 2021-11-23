<template>
    <div class="exam-result">
        <van-nav-bar title="考试失败" left-arrow @click-left="goBack" />
        <div class="result-msg">很抱歉,你没有通过考试哦~</div>
        <van-cell-group class="result-list" v-if="answerRes">
            <van-cell :title="item.title" v-for="(item, index) in answerRes.answer" :key="index">
                <template #icon>
                    <img class="img-icon" :src="item.right ? yesIcon : noIcon" />
                </template>
            </van-cell>
        </van-cell-group>
        <router-link class="btn-back" to="/novice-exam">重新开始</router-link>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'exam-result',
    data() {
        return {
            radio: '1',
            yesIcon: require('../../assets/image/home/yes.png'),
            noIcon: require('../../assets/image/home/no.png'),
        }
    },
    computed: {
        ...mapGetters(['answerRes']),
    },
    mounted() {
        console.log(this.answerRes)
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
    },
}
</script>

<style></style>
