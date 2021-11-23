<template>
    <div class="asset-change">
        <van-nav-bar title="鲸币转货款" right-text="转换记录" left-arrow @click-left="goBack" @click-right="toRecord" />
        <div class="asset-form">
            <div class="input">
                <input type="password" placeholder="请输入6-12位登录密码" v-model="password" />
            </div>
            <div class="asset-info">
                <div class="title">鲸币转货款金额</div>
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
                <span>鲸币余额:{{ dataInfo }}元</span>
                <span>手续费:{{ rate_amount }}元</span>
            </div>
            <van-button :disabled="isLoading" @click="onSubmit" class="btn active">立即转换</van-button>
            <div class="tip">鲸币转换货款后,可以在货款余额中提现</div>
        </div>
        <div class="sm">
            <div>鲸币转换说明:</div>
            <div>1、鲸币每次最少转换10</div>
            <div>2、鲸币转换收取0手续费</div>
            <div>3、单次转换最高收取10手续费</div>
        </div>
    </div>
</template>

<script>
import * as api from '@/api/api'
export default {
    name: 'asset-change',
    data() {
        return {
            rate: 0, //百分比
            dataInfo: 0,
            rate_amount: 0,
            amount: 0,
            isLoading: false,
            password: '',
        }
    },
    mounted() {
        this.getRate()
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        toRecord() {
            this.$router.push({ name: 'asset-change-record' })
        },
        changeAmount() {
            this.rate_amount = Number((this.amount * this.rate) / 100).toFixed(2)
        },
        getRate() {
            api.exchangeConfig().then((res) => {
                if (res.success) {
                    this.rate = res.data.exchange_rate
                }
            })
            api.getUserBalance({ asset_type: 1 }).then((res) => {
                if (res.success) {
                    this.dataInfo = Number(res.data).toFixed(2)
                    this.amount = this.dataInfo
                    this.changeAmount()
                }
            })
        },
        onSubmit() {
            if (this.isLoading) return
            if (!this.password) return this.$toast('请输入登录密码')
            if (!this.amount || this.amount <= 0) return this.$toast('请输入转换数量')
            this.isLoading = true
            this.$toast.loading({ message: '提交中,请勿重复操作', forbidClick: true })
            api.exchange({ amount: this.amount, password: this.password }).then((res) => {
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
