<template>
    <!-- 返款规则 -->
    <div class="promote-reward-container">
        <van-nav-bar title="用户等级" left-arrow @click-left="goBack" />
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="v-page hasft">
            <div class="card-top">
                <div class="user">
                    <img src="../../assets/image/mine/head.png" alt="" class="head" />
                    <span class="level">用户等级:{{ myData.level_name }}</span>
                </div>
                <van-row class="desc-box">
                    <van-col span="8">
                        <div class="desc" @click="showDialog(1)">立返上限金额<van-icon name="question-o" /></div>
                        <div class="num">{{ myData.return_amount }}</div>
                    </van-col>
                    <van-col span="8">
                        <div class="desc" @click="showDialog(2)">活动上限金额<van-icon name="question-o" /></div>
                        <div class="num">{{ myData.active_amount }}</div>
                    </van-col>
                    <van-col span="8">
                        <div class="desc">可绑定买号数</div>
                        <div class="num">{{ myData.bind_account }}</div>
                    </van-col>
                </van-row>
            </div>
            <div class="rule-box ">
                <div class="title"><span class="size-12">◆</span> 用户等级规则</div>
                <div class="table rule">
                    <div class="thead">
                        <div class="td">用户<br />等级</div>
                        <div class="td">接单完<br />成数量</div>
                        <div class="td">立返<br />金额上限</div>
                        <div class="td">活动<br />金额上限</div>
                        <div class="td">可绑定<br />买号数</div>
                    </div>
                    <div :class="['tbody', { active: myData.level == item.level }]" v-for="item in dataList" :key="item.id">
                        <div class="td">{{ item.level_name }}</div>
                        <div class="td">{{ item.order_num }}</div>
                        <div class="td">≦ {{ item.return_amount }}</div>
                        <div class="td">≦ {{ item.active_amount }}</div>
                        <div class="td">{{ item.bind_account }}</div>
                    </div>
                </div>
                <div class="title mt-25"><span class="size-12">◆</span> 本金返还规则</div>
                <div class="size-13">
                    <p>一 、货返和立返的返款时间？</p>
                    <p class="ml-10">“货返”是指确认收货后24小时返还本金，立返是指买家付款后24 小时内返还本金。</p>

                    <p class="mt-10">二、任务满足以下条件的任务，享受“立返”。</p>
                    <p class="ml-10">1、买家实付金额小于等于商家应付金额。</p>
                    <p class="ml-10">2、买家实付金额小于等于当前用户等级的立返上限金额。</p>

                    <p class="mt-10">三、 其他返款说明</p>
                    <p class="ml-10 c-primary">1、不符合立返条件的，都是货返。</p>
                    <p class="ml-10">2、用户等级升级前接的任务，仍按之前的返款规则进行。</p>
                </div>
                <div class="text-center mt-10">
                    <router-link class="c-primary size-14" to="/novice-teach">了解更多返款规则</router-link>
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
    name: 'back-rule',
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
        showDialog(dialogMsg) {
            this.dialogMsg =
                dialogMsg == 1
                    ? '立返上限金额：是指能够立返本金的最大任务金额，比如立返金额上限为300元，那么接取垫付货款在300以内的任务时可立返本金，接取超过300的任务就是货返，用户等级越高，立返上限金额越高。'
                    : '活动上限金额：是指用户能接任务的最大金额，比如活动金额上限为300元，那么该用户只能接取垫付货款在300以内的任务，超过该金额的任务无法接取，用户等级越高，活动上限金额越高。'
            this.visible = true
        },
        goBack() {
            this.$router.go(-1)
        },
        onRefresh() {
            api.levelRule().then((res) => {
                this.isLoading = false
                if (res.success) {
                    this.myData = res.data.data
                    this.dataList = res.data.list
                }
            })
        },
    },
}
</script>

<style lang="less" scoped></style>
