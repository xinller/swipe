<template>
    <!-- 添加银行卡 -->
    <div class="bank-index">
        <van-nav-bar title="添加银行卡" left-arrow @click-left="goBack" />
        <div class="tip">
            <p>1、姓名必须和身份证中的一样,务必保证银行卡信息准确,否则无法返款.</p>
            <p>2、建议使用建设银行,到账速度更快.</p>
        </div>
        <div class="com-form-wrap">
            <div class="form-list">
                <div class="form-label">持卡人:</div>
                <div class="form-input">
                    <input type="text" placeholder="请输入你的真实姓名" v-model="form.bank_hold" />
                </div>
            </div>
            <div class="form-list">
                <div class="form-label">卡号:</div>
                <div class="form-input">
                    <input type="number" placeholder="请输入卡号" v-model="form.bank_number" />
                </div>
            </div>
            <div class="form-list">
                <div class="form-label">开户银行:</div>
                <div class="form-input">
                    <input type="text" v-model="form.bank_name" placeholder="请选择银行" readonly @click="togglePop('bank')" />
                </div>
            </div>
            <div class="form-list">
                <div class="form-label">所在城市:</div>
                <div class="form-input">
                    <input type="text" v-model="area" placeholder="请选择城市" readonly @click="togglePop('area')" />
                </div>
            </div>
            <div class="form-list">
                <div class="form-label">支行名称:</div>
                <div class="form-input">
                    <input type="text" placeholder="请填写支行名称" v-model="form.bank_open" />
                </div>
                <div class="form-label size-12 c-primary" @click="visible = true">支行说明?</div>
            </div>
            <van-popup v-model="showArea" round position="bottom" :style="{ height: '40%', overflow: 'hidden' }">
                <van-area v-if="showType == 'area'" :area-list="areaList" @confirm="onConfirm" @cancel="showArea = false" />
                <van-radio-group v-model="form.bank_name" v-show="showType == 'bank'">
                    <div class="overflow-page" style="height:230px">
                        <van-cell-group>
                            <van-cell
                                :title="item.bank_name"
                                clickable
                                @click="radioBox(item)"
                                v-for="(item, index) in list_bank"
                                :key="index"
                            >
                                <template #right-icon>
                                    <van-radio :name="item.bank_name" />
                                </template>
                            </van-cell>
                        </van-cell-group>
                    </div>
                </van-radio-group>
            </van-popup>
        </div>
        <van-button :disabled="isLoading" class="btn-app" @click="onSubmit">{{
            form.status === 0
                ? '待审核'
                : form.status == 2
                ? '审核拒绝'
                : form.status == 1
                ? '已认证如需修改请联系客服'
                : '立即提交'
        }}</van-button>
        <!-- 提示modal -->
        <v-dialog :visible="visible" :closeBtn="false">
            <div slot="content">
                <p>这里只需要填写开户行名称,不需要填写具体省市.</p>
                <p>1、正确案例参考:淘金路支行,神花露水支行,西城支行.</p>
                <p>2、如果您忘了自己的开户行名称,可以通过拨打银行客服电话或者上网查询.</p>
            </div>
            <div slot="footer" class="dialog-btn" @click="visible = false">我知道了</div>
        </v-dialog>
    </div>
</template>

<script>
import areaList from '@/utils/area.js'
import VDialog from '../../components/VDialog'
import { mapGetters } from 'vuex'
import * as api from '@/api/api'
export default {
    name: 'add-bank',
    components: {
        VDialog,
    },
    computed: {
        ...mapGetters(['noviceInfo']),
    },
    data() {
        return {
            areaList,
            isLoading: false,
            showType: '',
            showArea: false, //底部弹窗
            visible: false, //弹窗
            form: {
                bank_name: '',
                bank_open: '',
                bank_hold: '',
                bank_number: '',
                province: '',
                city: '',
                area: '',
            },
            status: '-1',
            list_bank: [],
            area: '',
        }
    },
    mounted() {
        this.getBank()
        this.getBankInfo()
        this.getUserNoviceInfo()
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        toNext(key) {
            this.$router.push({ name: key })
        },
        getUserNoviceInfo() {
            api.getUserNoviceInfo().then((res) => {
                this.$toast.clear()
                if (res.success) {
                    let data = res.data
                    this.$store.commit('setNoviceInfo', data)
                }
            })
        },
        getBank() {
            api.getBank().then((res) => {
                if (res.success) {
                    this.list_bank = res.data
                    console.log('this.list_bank', this.list_bank)
                }
            })
        },
        getBankInfo() {
            api.getBankInfo().then((res) => {
                if (res.success && res.data) {
                    this.form = res.data
                    this.area = this.form.province + ' ' + this.form.city + ' ' + this.form.area
                    this.status = res.data.status
                    if (this.status == 1 || this.status == 0) {
                        this.isLoading = true
                    } else {
                        this.isLoading = false
                    }
                }
            })
        },
        onSubmit() {
            // console.log(this.noviceInfo.is_auth)
            // if (this.noviceInfo.is_auth == 0 || this.noviceInfo.is_auth == -1) {
            //     this.$toast('请先实名认证')
            //     this.$router.push({ name: 'buy-auth' })
            //     return
            // } else if (this.noviceInfo.is_auth == 2) {
            //     return this.$toast('实名认证待审核')
            // } else if (this.noviceInfo.is_auth == 1) {
            if (this.form.status === 0 || this.form.status === 1) return
            if (this.isLoading) return
            if (!this.form.bank_hold) return this.$toast('请输入持卡人真实姓名,必须和身份证中一样')
            if (!this.form.bank_number) return this.$toast('请输入卡号')
            if (!this.form.bank_name) return this.$toast('请选择银行名称')
            if (!this.area) return this.$toast('请选择城市')
            if (!this.form.bank_open) return this.$toast('请输入开户行')
            this.isLoading = true
            api.addBank(this.form).then((res) => {
                this.isLoading = false
                if (res.success) {
                    this.$toast('提交成功')
                    setTimeout(() => {
                        this.goBack()
                    }, 1000)
                }
            })
            // }
        },
        // 显示弹窗
        togglePop(type) {
            this.showArea = true
            this.showType = type
        },
        // 选择银行
        radioBox(item) {
            this.form.bank_name = item.bank_name
            this.showArea = false
        },
        // 选择省市
        onConfirm(values) {
            console.log('values', values)
            this.area = values
                .filter((item) => !!item)
                .map((item) => item.name)
                .join(' ')
            this.form.province = this.area.split(' ')[0]
            this.form.city = this.area.split(' ')[1]
            this.form.area = this.area.split(' ')[2]
            this.showArea = false
        },
    },
}
</script>

<style></style>
