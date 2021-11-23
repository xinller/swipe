<template>
    <div class="auth-index">
        <!-- 实名认证 -->
        <van-nav-bar title="实名认证信息" left-arrow @click-left="goBack" />
        <div class="tip">
            <p>1、姓名必须和银行卡中的一样,务必保证身份证信息准确,否则无法返款.</p>
        </div>
        <div class="com-form-wrap">
            <div class="form-list">
                <div class="form-label">姓名:</div>
                <div class="form-input">
                    <input type="text" placeholder="请输入你的真实姓名" v-model="form.real_name" />
                </div>
            </div>
            <div class="form-list">
                <div class="form-label">身份证号:</div>
                <div class="form-input">
                    <input type="text" placeholder="请输入你的身份证号" v-model="form.card_no" />
                </div>
            </div>
            <router-link to="/camera-require" class="btn-check">查看拍摄要求,快速通过审核</router-link>
            <div class="form-tip">点击拍照上传身份证照片</div>
            <div class="form-img">
                <van-uploader :after-read="afterRead_face" accept="image/*" capture="camera">
                    <img :src="form.id_face ? BASE_URL + form.id_face : require('../../assets/image/mine/id_face.png')" alt="" />
                </van-uploader>
                <img src="../../assets/image/mine/auth_img.png" class="exg" />
            </div>
            <!-- <div class="form-tip c-red">按照右图动作所示拍照 (注意不是手持身份证)</div>
            <div class="form-img">
                <van-uploader :after-read="afterRead_stand" accept="image/*" capture="camera">
                    <img
                        :src="form.id_stand ? BASE_URL + form.id_stand : require('../../assets/image/mine/id_stand.png')"
                        alt=""
                    />
                </van-uploader>
                <img src="../../assets/image/mine/stand.png" class="stand" />
            </div> -->
        </div>
        <div class="tip-list">
            <p>1、照片仅供平台认证使用</p>
            <p>2、年龄必须在20-40岁之间</p>
            <p>3、身份证信息必须实时拍照上传,发现截图或者修图的一律拉黑处理.</p>
        </div>
        <van-button
            type="info"
            :disabled="disabled"
            class="form-btn"
            @click="onSubmit"
            v-if="form.is_auth == 0 || form.is_auth == -1"
            >提交材料</van-button
        >
        <div class="form-btn" v-if="form.is_auth == 2">待审核</div>
        <div class="form-btn" v-if="form.is_auth == 1">已认证</div>
    </div>
</template>

<script>
import * as api from '@/api/api'
export default {
    name: 'auth',
    data() {
        return {
            form: {
                id_face: '',
                id_stand: '',
                card_no: '',
                real_name: '',
                is_auth: '0',
            },
            disabled: false,
            bank_status: '', //卡认证状态
        }
    },
    mounted() {
        this.getUserDetail()
        this.getBankInfo()
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        // 获取用户信息
        getUserDetail() {
            api.getUserDetail().then((res) => {
                console.log('res', res)
                if (res.success) {
                    this.form = res.data
                    console.log('this.form', this.form)
                }
            })
        },
        afterRead_face(file) {
            if (this.form.is_auth == 1 || this.form.is_auth == 2) return
            this.upload('id_face', file.content)
        },
        afterRead_stand(file) {
            if (this.form.is_auth == 1 || this.form.is_auth == 2) return
            this.upload('id_stand', file.content)
        },
        upload(type, fileBase64) {
            this.$toast.loading({ message: '提交中请勿重复点击', forbidClick: true })
            api.image_upload({ base_str: fileBase64, type: 1 }).then((res) => {
                this.$toast.clear()
                if (res.success) {
                    this.form[type] = res.data
                }
            })
        },
        getBankInfo() {
            api.getBankInfo().then((res) => {
                if (res.success && res.data) {
                    // 0 待审核 1-通过 2拒绝
                    this.bank_status = res.data.status
                }
            })
        },
        // 认证
        onSubmit() {
            if (this.bank_status == 1) {
                this.authEvent()
            } else if (this.bank_status == 0) {
                return this.$toast('银行卡绑定待审核')
            } else {
                this.$toast('请先绑定银行卡号')
                this.$router.push({ name: 'add-bank' })
                return
            }
        },
        authEvent() {
            if (!this.form.real_name) return this.$toast('请填写真实姓名')
            if (!this.form.card_no) return this.$toast('请填写身份证号码')
            if (!this.util.checkID(this.form.card_no)) return this.$toast('身份证不合法请检查')
            if (!this.form.id_face) return this.$toast('请上传身份证正面照片')
            // if (!this.form.id_stand) return this.$toast('请上传图示动作照片')
            this.disabled = true
            this.$toast.loading({ message: '提交中请勿重复点击', forbidClick: true })
            api.auth(this.form).then((res) => {
                this.disabled = false
                this.$toast.clear()
                if (res.success) {
                    this.$toast('提交成功')
                    this.getUserNoviceInfo()
                    setTimeout(() => {
                        this.goBack()
                    }, 1000)
                }
            })
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
    },
}
</script>

<style></style>
