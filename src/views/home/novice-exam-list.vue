<template>
    <div class="novice-exam-list">
        <van-nav-bar title="新手考试" left-arrow @click-left="goBack" />
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="v-page">
            <div class="box" v-if="dataList.length > 0">
                <div class="title">第{{ page + 1 }}题, 共{{ total }}题</div>
                <p class="subtitle">{{ page + 1 }}、{{ curList ? curList.question_name : '' }}?</p>
                <van-radio-group v-model="curAnswer" class="radio-list">
                    <van-cell-group>
                        <van-cell
                            :title="item"
                            clickable
                            v-for="(item, index) in curList.more_answer"
                            :key="index"
                            @click="curAnswer = index"
                        >
                            <template #right-icon>
                                <van-radio :name="index" />
                            </template>
                        </van-cell>
                    </van-cell-group>
                </van-radio-group>
            </div>
            <div class="btn-next" v-if="dataList.length > 0" @click="toNext">下一题</div>
            <div class="btn-prev" v-if="page > 0" @click="prev">上一题</div>
        </van-pull-refresh>
    </div>
</template>

<script>
import * as api from '@/api/api'
import { mapGetters } from 'vuex'
export default {
    name: 'novice-exam-list',
    data() {
        return {
            isLoading: false,
            dataList: [],
            curList: {}, //当前题目
            page: 0,
            total: 1,
            curAnswer: '', //当前答案
            chose_json: [], //我的答案
        }
    },
    computed: {
        ...mapGetters(['noviceInfo']),
    },
    mounted() {
        if (this.noviceInfo.is_examination == 1) {
            this.$router.replace({ name: 'novice-task' })
        }
        this.getData()
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        // 下一题
        toNext() {
            console.log(this.curAnswer)
            if (this.page < this.total) {
                if (this.curAnswer === '') return this.$toast('请选择答案')
                this.chose_json[this.page] = { id: this.curList.id, answer: this.curAnswer }
                this.page++
                this.curList = this.dataList[this.page]
                this.curAnswer = ''
            } else {
                // 最后一题时跳结果页面
                // 提交答案
                let chose_json = JSON.stringify(this.chose_json)
                api.toAnswer({ model_id: 1, chose_json }).then((res) => {
                    if (res.success) {
                        if (res.data.is_pass == 1) {
                            // 进入考试成功页面
                            this.getUserNoviceInfo()
                            this.$router.replace({ name: 'exam-success' })
                        } else {
                            // 进入考试失败页面
                            this.$router.replace({ name: 'exam-fail' })
                            this.$store.commit('setAnswerRes', res.data)
                        }
                    }
                })
            }
        },
        // 刷新考试状态
        getUserNoviceInfo() {
            api.getUserNoviceInfo().then((res) => {
                if (res.success) {
                    this.$store.commit('setNoviceInfo', res.data)
                }
            })
        },
        // 上一题
        prev() {
            this.page--
            this.curList = this.dataList[this.page]
            this.curAnswer = ''
        },
        onRefresh() {
            this.getData()
        },
        getData() {
            api.questionList({ model_id: 1 }).then((res) => {
                this.isLoading = false
                if (res.success) {
                    this.dataList = res.data
                    this.curList = res.data[0]
                    this.page = 0
                    this.total = res.data.length
                }
            })
        },
    },
}
</script>

<style></style>
