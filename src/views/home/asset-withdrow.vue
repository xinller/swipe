<template>
    <div class="asset-change">
        <van-nav-bar title="货款提现" right-text="提现记录" left-arrow @click-left="goBack" @click-right="toRecord" />
        <div class="asset-form">
            <div class="asset-bank">
                <div class="title">到账银行卡</div>
                <router-link to="/add-bank" v-if="!bankInfo">未添加,点击添加银行卡</router-link>
                <div class="size-14 c-gray mt-10" v-if="bankInfo">
                    {{ bankInfo.bank_hold }}{{ bankInfo.bank_number }}{{ bankInfo.bank_name }}{{ bankInfo.bank_open }}
                </div>
            </div>
            <div class="input">
                <input type="password" placeholder="请输入6-12位登录密码" v-model="password" />
            </div>
            <div class="asset-info">
                <div class="title">实际到账金额</div>
                <div class="num flexrow">
                    ¥
                    <van-field
                        class="size-28"
                        v-model="amount"
                        type="number"
                        placeholder="请输入转换金额"
                        @input="changeAmount"
                    />
                </div>
            </div>
            <div class="fee">
                <span>账户余额:{{ asset }}元</span>
                <span>手续费:{{ rate_amount }}元</span>
            </div>
            <van-button :disabled="isLoading" class="btn active" @click="onSubmit">立即提现</van-button>
            <div class="tip">提现受理时间:每日09:00-18:00</div>
            <div class="tip">建议使用建设银行,到账速度更快</div>
        </div>
        <div class="sm">
            <div>货款提现说明:</div>
            <div>1、可提现金额大于等于1免手续费</div>
            <div>2、货款提现金额低于1元每次收取1元手续费</div>
            <div>3、货款提现每次必须全部提出</div>
        </div>
    </div>
</template>

<script>
import * as api from '@/api/api'
export default {
    name: 'asset-withdrow',
    data() {
        return {
            rate: 0, //百分比
            asset: 0,
            rate_amount: 0,
            amount: 0,
            isLoading: false,
            password: '',
            bankInfo: '',
            is_auth: '', //
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        toRecord() {
            this.$router.push({ name: 'withdrow-record' })
        },
        changeAmount() {
            this.rate_amount = Number((this.amount * this.rate) / 100).toFixed(2)
        },
        getData() {
            api.withdraRate().then((res) => {
                if (res.success) {
                    this.rate = res.data.with_rate
                }
            })
            api.getUserBalance({ asset_type: 2 }).then((res) => {
                if (res.success) {
                    this.asset = Number(res.data).toFixed(2)
                    this.amount = this.asset
                    this.changeAmount()
                }
            })
            api.getBankInfo().then((res) => {
                if (res.success) {
                    this.bankInfo = res.data
                }
            })

            api.getUserNoviceInfo().then((res) => {
                this.$toast.clear()
                if (res.success) {
                    this.is_auth = res.data.is_auth
                }
            })
        },
        onSubmit() {
            if (this.is_auth != 1) return this.$toast('请先完成实名认证')
            if (this.isLoading) return
            if (!this.password) return this.$toast('请输入登录密码')
            if (!this.amount || this.amount <= 0) return this.$toast('请输入提现金额')
            if (!this.bankInfo.id) return this.$toast('您还未绑定银行卡')
            this.isLoading = true

            this.$toast.loading({ message: '提交中,请勿重复操作', forbidClick: true })
            api.doWithout({ amount: this.amount, password: this.password, bank_id: this.bankInfo.id }).then((res) => {
                this.isLoading = false
                this.$toast.clear()
                if (res.success) {
                    this.$toast('提交成功')
                    // setTimeout(() => {
                    this.goBack()
                    // }, 1000)
                }
            })
        },
    },
}
</script>

<style></style>
