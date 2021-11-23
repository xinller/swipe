<template>
    <!-- 买号认证信息 -->
    <div class="verify-num-container">
        <van-nav-bar title="买号认证信息" right-text="联系客服" left-arrow @click-left="goBack" @click-right="toNext('server')" />
        <div class="card-box">
            <div class="card-title">
                <div class="left">
                    <img src="../../assets/image/task/taobao.png" class="icon" />
                    <span>{{ detail.taobao_username }}</span>
                </div>
                <div class="c-primary">
                    {{ detail.receive_status == 0 ? '审核中' : detail.receive_status == 1 ? '已认证' : '审核拒绝' }}
                </div>
            </div>
        </div>
        <div class="card-box">
            <div class="card-title">
                <div class="left">
                    <img src="../../assets/image/task/setnum1.png" class="icon" />
                    <span>认证状态</span>
                    <span class="c-red">{{ detail.is_goods == 1 ? (isPass ? '已过期' : '优质') : '普通' }}</span>
                </div>
            </div>
            <div class="card-text">
                <p>1、优质买号有效期为15天,15天后需要重新认证.</p>
                <p>2、已认证为危险买号的可以联系客服修改买号重新认证..</p>
            </div>
            <div class="card-bot" @click="visible = true">优质和普通的区别?</div>
            <div v-if="isPass">
                <van-button class="btn-app mt-10" @click="applyEvent">申请认证</van-button>
            </div>
        </div>
        <div class="card-box">
            <div class="card-title">
                <div class="left">
                    <img src="../../assets/image/task/setnum2.png" class="icon" />
                    <span>花呗认证:</span>
                    <span class="c-red">{{ detail.is_huabei == 1 ? '已开通' : '未开通' }}</span>
                </div>
            </div>
            <div class="card-text">
                <p>1、如果您的淘宝买号已经开通花呗,请联系客服认证.</p>
                <p>2、请确保花呗认证的真实性,否则会引起商家投诉.</p>
            </div>
        </div>

        <div class="card-box">
            <div class="card-title">
                <div class="left">
                    <img src="../../assets/image/task/setnum3.png" class="icon" />
                    <span>超级会员:</span>
                    <span class="c-red">{{ detail.is_supers == 1 ? '已开通' : '未开通' }}</span>
                </div>
            </div>
            <div class="card-text">
                <p>
                    淘宝淘气值超过1000分,就可以成为淘宝的超级会员,用户在手机淘宝“我的淘宝”中的“会员中心”即可查看自己的淘气值,超级会员可享受更多权益.
                </p>
            </div>
        </div>

        <!-- 优质和普通区别 -->
        <v-dialog :visible="visible" title="优质和普通区别" :closeBtn="false">
            <div slot="content" class="pl-20 pr-10">
                <p class="dg-subtitle">1、优质认证规则?</p>

                <p class="mt-10">
                    优质买号，要求最近做单频次（包含所有渠道做单和真实购物）周不超过10，月不超过30。接单权重（优质号更容易接单）优质＞普通＞危险。
                </p>

                <p class="dg-subtitle">2.为什么我的买号被认证为普通？</p>

                <p class="mt-10">
                    普通等级一般是近期做单日点数超过2，可联系客服驳回换号，或者近期不要做单，过10天再重新申请认证。
                </p>

                <p class="dg-subtitle">3.为什么我的买号被认证为危险？</p>

                <p class="mt-10">
                    危险等级一般是近期做单较多或者有违规。点击鲸鱼APP-我的-买号管理-点击认证失败，进行换号后重新提交。
                </p>
            </div>
            <div slot="footer" class="dialog-btn" @click="visible = false">我知道了</div>
        </v-dialog>
    </div>
</template>

<script>
import VDialog from '../../components/VDialog'
import * as api from '@/api/api'
export default {
    name: 'verify-num',
    components: {
        VDialog,
    },
    data() {
        return {
            visible: false,
            detail: '',
            isPass: false,
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        getData() {
            // this.detail = this.$route.query
            api.taobaoDetail({ id: this.$route.query.id }).then((res) => {
                if (res.success) {
                    this.detail = res.data
                    this.isPass = this.getPass()
                }
            })
        },
        getPass() {
            if (this.detail.is_goods == 1) {
                var etime = this.detail.pass_time
                var now = new Date().getTime() / 1000
                var et = new Date(etime.replace(/-/g, '/')).getTime() / 1000
                if (now > et) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        },
        applyEvent() {
            api.applyExamine().then((res) => {
                if (res.success) {
                    this.$toast('提交成功')
                    this.goBack()
                }
            })
        },
        goBack() {
            this.$router.go(-1)
        },
        toNext(key) {
            this.$router.push({ name: key })
        },
    },
}
</script>

<style lang="less" scoped></style>
