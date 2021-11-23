<template>
    <!-- 获取更高推广奖励 -->
    <div class="promote-reward-container">
        <van-nav-bar title="奖励规则" left-arrow @click-left="goBack" />
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="v-page">
            <div class="card-top">
                <div class="user">
                    <img src="../../assets/image/mine/head.png" alt="" class="head" />
                    <span class="level">邀请等级:{{ myData.level_name }}</span>
                </div>
                <van-row class="desc-box">
                    <van-col span="8">
                        <div class="desc" @click="showDialog('徒弟完成首单,您可获得的奖励')">
                            激活徒弟奖励<van-icon name="question-o" />
                        </div>
                        <div class="num">{{ myData.return_amount }}鲸币</div>
                    </van-col>
                    <van-col span="8">
                        <div class="desc" @click="showDialog('徒弟每完成一单任务,您可获得的奖励')">
                            邀请徒弟提成<van-icon name="question-o" />
                        </div>
                        <div class="num">{{ myData.bind_account }}%</div>
                    </van-col>
                    <van-col span="8">
                        <div class="desc" @click="showDialog('徒孙每完成一单任务,您可获得的奖励')">
                            激活徒孙提成<van-icon name="question-o" />
                        </div>
                        <div class="num">{{ myData.active_amount }}%</div>
                    </van-col>
                </van-row>
            </div>
            <div class="rule-box">
                <div class="title"><span class="size-12">◆</span>邀请等级规则</div>
                <div class="table">
                    <div class="thead">
                        <div class="td">邀请等级</div>
                        <div class="td">徒弟<br />激活数</div>
                        <div class="td">激活<br />徒弟奖励</div>
                        <div class="td">邀请<br />徒弟提成</div>
                        <div class="td">邀请<br />徒孙提成</div>
                    </div>
                    <div class="tbody" v-for="item in dataList" :key="item.id">
                        <div class="td">{{ item.level_name }}</div>
                        <div class="td">{{ item.order_num }}</div>
                        <div class="td">{{ item.return_amount }}鲸币</div>
                        <div class="td">{{ item.bind_account }}%</div>
                        <div class="td">{{ item.active_amount }}%</div>
                    </div>
                </div>
            </div>

            <!-- 奖励 -->
            <v-dialog :visible="visible" title="" :closeBtn="false">
                <div slot="content" class="size-15 text-center">
                    {{ dialogMsg }}
                </div>
                <div slot="footer" class="dialog-btn" @click="visible = false">我知道了</div>
            </v-dialog>
        </van-pull-refresh>
    </div>
</template>

<script>
import VDialog from '../../components/VDialog'
import * as api from '@/api/api'
export default {
    name: 'promote-reward',
    components: {
        VDialog,
    },
    data() {
        return {
            visible: false,
            dialogMsg: '',
            dataList: [],
            myData: '',
            isLoading: false,
        }
    },
    mounted() {
        this.onRefresh()
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        showDialog(dialogMsg) {
            this.dialogMsg = dialogMsg
            this.visible = true
        },
        onRefresh() {
            api.rewardRule().then((res) => {
                this.isLoading = false
                if (res.success) {
                    this.dataList = res.data.list
                    this.myData = res.data.data
                }
            })
        },
    },
}
</script>

<style lang="less" scoped></style>
