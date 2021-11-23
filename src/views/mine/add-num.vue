<template>
    <div class="add-num">
        <!-- 添加淘宝号 -->
        <van-nav-bar
            title="添加淘宝"
            right-text="验号规则"
            left-arrow
            @click-left="goBack"
            @click-right="toggleScreen('', '验号规则')"
        />
        <van-form @submit="onSubmit">
            <div class="title c-primary">账号信息</div>
            <!-- 淘宝会员名 -->
            <van-field v-model="form.taobao_username" name="淘宝会员名" label="淘宝会员名" placeholder="请输入" />
            <!-- 姓名 -->
            <van-field v-model="form.receive_name" type="text" name="收货人姓名" label="收货人姓名" placeholder="请输入" />
            <!-- 手机 -->
            <van-field v-model="form.receive_phone" type="number" name="收货人手机" label="收货人手机" placeholder="请输入" />
            <!-- 省市区 -->
            <van-field
                readonly
                clickable
                name="area"
                :value="area"
                label="选择城市"
                placeholder="选择省市区"
                @click="showArea = true"
            />
            <van-popup v-model="showArea" round position="bottom" :style="{ height: '40%' }">
                <van-area :area-list="areaList" @confirm="onConfirm" @cancel="showArea = false" />
            </van-popup>
            <!-- 地址 -->
            <van-field v-model="form.receive_address" type="text" name="详细地址" label="详细地址" placeholder="请输入" />
            <div class="title c-primary">账号属性(与实名认证的身份证信息一致)</div>
            <!-- 性别 -->
            <van-field
                v-model="form.receive_sex_name"
                type="text"
                readonly
                clickable
                name="receive_sex"
                label="性别"
                placeholder="请选择性别"
                @click="togglePop(true, '请选择性别', 'receive_sex')"
            />
            <!-- 年龄 -->
            <van-field v-model="form.receive_age" type="number" name="年龄" label="年龄" placeholder="请输入" />
            <!-- 等级 -->
            <van-field
                v-model="form.receive_level_name"
                type="text"
                readonly
                clickable
                name="receive_level"
                label="等级"
                placeholder="请选择等级"
                @click="togglePop(true, '请选择等级', 'receive_level')"
            />
            <!-- 购物类目 -->
            <van-field
                v-model="form.receive_cate_name"
                type="text"
                readonly
                clickable
                name="receive_cate"
                label="购物类目"
                placeholder="请选择三到五个类目"
                @click="togglePop(true, '请选择购物类目', 'receive_cate')"
            />
            <!-- 选择职业 -->
            <van-field
                v-model="form.receive_job_name"
                type="text"
                readonly
                clickable
                name="receive_job"
                label="本人职业"
                placeholder="请选择职业"
                @click="togglePop(true, '请选择职业', 'receive_job')"
            />
            <!-- 淘气值 -->
            <van-field
                v-model="form.receive_taobao_value_name"
                type="text"
                readonly
                clickable
                name="receive_taobao_value"
                label="淘气值"
                placeholder="请选择淘气值"
                @click="togglePop(true, '请选择淘气值', 'receive_taobao_value')"
            />
            <div class="title">上传截图认证</div>
            <!-- <div class="upload-box">
                <div class="upload">
                    <van-uploader></van-uploader>
                    <p class="title">评价管理</p>
                    <p class="step">截图步骤></p>
                </div>
            </div> -->
            <van-row gutter="20" class="upload-box">
                <van-col span="8" class="mt-10">
                    <van-uploader :after-read="afterRead_evaluate" accept="image/*">
                        <img
                            :src="
                                form.receive_evaluate_manage
                                    ? BASE_URL + form.receive_evaluate_manage
                                    : require('../../assets/image/mine/upload.png')
                            "
                            class="upload-img"
                        />
                    </van-uploader>
                    <p class="size-13">评价管理</p>
                    <p class="step" @click="toggleScreen('coment', '评价管理')">截图步骤></p>
                </van-col>
                <van-col span="8" class="mt-10">
                    <van-uploader :after-read="afterRead_auth" accept="image/*">
                        <img
                            :src="
                                form.receive_auth ? BASE_URL + form.receive_auth : require('../../assets/image/mine/upload.png')
                            "
                            class="upload-img"
                        />
                    </van-uploader>
                    <p class="size-13">实名认证</p>
                    <p class="step" @click="toggleScreen('auth', '实名认证')">截图步骤></p>
                </van-col>
                <van-col span="8" class="mt-10">
                    <van-uploader :after-read="afterRead_mytaobao" accept="image/*">
                        <img
                            :src="
                                form.receive_mytaobao
                                    ? BASE_URL + form.receive_mytaobao
                                    : require('../../assets/image/mine/upload.png')
                            "
                            class="upload-img"
                        />
                    </van-uploader>
                    <p class="size-13">我的淘宝</p>
                    <p class="step" @click="toggleScreen('mytb', '我的淘宝')">截图步骤></p>
                </van-col>
                <van-col span="8" class="mt-10">
                    <van-uploader :after-read="afterRead_account" accept="image/*">
                        <img
                            :src="
                                form.receive_account
                                    ? BASE_URL + form.receive_account
                                    : require('../../assets/image/mine/upload.png')
                            "
                            class="upload-img"
                        />
                    </van-uploader>
                    <p class="size-13">账号体验</p>
                    <p class="step" @click="toggleScreen('account', '账号体验')">截图步骤></p>
                </van-col>
                <van-col span="8" class="mt-10">
                    <van-uploader :after-read="afterRead_huabei" accept="image/*">
                        <img
                            :src="
                                form.receive_huabei
                                    ? BASE_URL + form.receive_huabei
                                    : require('../../assets/image/mine/upload.png')
                            "
                            class="upload-img"
                        />
                    </van-uploader>
                    <p class="size-13">花呗</p>
                    <p class="step" @click="toggleScreen('hb', '花呗')">截图步骤></p>
                </van-col>
            </van-row>
            <div class="form-tip bgc-white">
                <p>1、花呗截图选填,尽量使用开通花呗的账号,可提高接单率.</p>
                <p class="c-red">2、所有图片需提供实时截图,不要上传老图.</p>
                <p class="c-red">3、禁止P图,模糊图片信息,一经发现全网拉黑.</p>
                <p>4、页面右上角查看验号规则.</p>
            </div>

            <div class="p-15 mt-5 pb-5">
                <van-button :disabled="isLoading" round block type="info" native-type="submit" class="bgc-primary">
                    {{ this.receive_status == 0 ? '待审核' : this.receive_status == 1 ? '已认证' : '提交' }}
                </van-button>
            </div>
            <div class="form-tip">
                账号审核时间周一至周五9:00 - 18:00，账号提交后1个工作日内完成审核，
                如遇周末或节假日顺延，审核工作人工进行，用户请耐心等待，请确保提交信 息真实性，新手务必查看示例图进行截图上传。
            </div>
        </van-form>

        <!-- 下拉弹出窗 -->
        <van-popup v-model="showPop" closeable round position="bottom" :style="{ height: '40%' }">
            <div class="pop-title">{{ popTitle }}</div>
            <!-- 购物 -->
            <van-checkbox-group
                @change="changeCate"
                v-model="receive_cate"
                class="checkbox-group overflow-page"
                v-show="popType == 'receive_cate'"
            >
                <van-cell-group>
                    <van-cell
                        v-for="(item, index) in list_cate"
                        clickable
                        close-on-popstate
                        :key="item.id"
                        :title="item.name"
                        @click="toggleBoxCate(index, 'receive_cate')"
                    >
                        <template #right-icon>
                            <van-checkbox :name="item.id" ref="checkboxes_receive_cate" />
                        </template>
                    </van-cell>
                </van-cell-group>
            </van-checkbox-group>
            <!-- 性别 -->
            <van-radio-group v-model="form.receive_sex" v-show="popType == 'receive_sex'">
                <van-cell-group>
                    <van-cell
                        :title="item.name"
                        clickable
                        @click="radioBox(item, 'receive_sex')"
                        v-for="(item, index) in list_sex"
                        :key="index"
                    >
                        <template #right-icon>
                            <van-radio :name="item.id" />
                        </template>
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
            <!-- 等级 -->
            <van-radio-group class="overflow-page" v-model="form.receive_level" v-show="popType == 'receive_level'">
                <van-cell-group>
                    <van-cell
                        :title="item.level_name"
                        clickable
                        @click="radioBox(item, 'receive_level')"
                        v-for="item in list_level"
                        :key="item.id"
                    >
                        <template #right-icon>
                            <van-radio :name="String(item.level)" />
                        </template>
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
            <!-- 职业 -->
            <van-radio-group class="overflow-page" v-model="form.receive_job" v-show="popType == 'receive_job'">
                <van-cell-group>
                    <van-cell
                        :title="item.name"
                        clickable
                        @click="radioBox(item, 'receive_job')"
                        v-for="(item, index) in list_job"
                        :key="index"
                    >
                        <template #right-icon>
                            <van-radio :name="item.id" />
                        </template>
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
            <!-- 淘气值 -->
            <van-radio-group class="overflow-page" v-model="form.receive_taobao_value" v-show="popType == 'receive_taobao_value'">
                <van-cell-group>
                    <van-cell
                        :title="item.name"
                        clickable
                        @click="radioBox(item, 'receive_taobao_value')"
                        v-for="(item, index) in list_taobao_value"
                        :key="index"
                    >
                        <template #right-icon>
                            <van-radio :name="item.id" />
                        </template>
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </van-popup>

        <!-- 截图弹窗 -->
        <v-popup :visible="showScreen" :title="screenTitle" @toggle="showScreen = false">
            <template slot="content" v-show="screenTitle != '验号规则'">
                <img :src="require('../../assets/image/mine/' + item)" v-for="(item, index) in screen_list" :key="index" />
            </template>
            <template slot="content" v-show="screenTitle == '验号规则'">
                <p class="ptitle">一.图片上传要求：</p>
                <p>1.必需按照截图步骤要求上传实时截图，不要上传老图。</p>
                <p>2.禁止P图，故意遮挡模糊图片信息（一经发现，全网拉黑）。</p>
                <p class="ptitle">二。账号基本要求：</p>
                <p>账号注册满半年，淘气值400以上，两心以上，无降权违规拉黑历史。</p>
                <p class="ptitle">三.优质认证规则：</p>
                <p>1.账号等级分优质，普通，危险。接单权重（优质号更容易接单）优质＞普通＞危险。</p>
                <p>2.优质账号，要求最近购物频次（包含所有渠道做单和真实购物）周不超过10，月不超过30。</p>
                <p class="ptitle">四.认证失败怎么办？</p>
                <p>点击APP-我的-买号管理-点击认证失败，看原因进行修改或者换号。</p>
                <p class="c-red mt-10">提示：为了不影响您的接单权重，请使用优质账号申请。</p>
            </template>
        </v-popup>
    </div>
</template>

<script>
import areaList from '@/utils/area.js'
import VPopup from '../../components/VPopup'
import * as api from '@/api/api'
import _ from 'lodash'
export default {
    name: 'add-num',
    components: {
        VPopup,
    },
    data() {
        return {
            isLoading: false,
            form: {
                taobao_username: '',
                receive_name: '',
                receive_phone: '',
                receive_address: '',
                receive_province: '',
                receive_city: '',
                receive_area: '',
                receive_sex: '', //1-男 2-女
                receive_sex_name: '', //1-男 2-女
                receive_age: '',
                receive_level: '',
                receive_level_name: '',
                receive_cate: '',
                receive_cate_name: '',
                receive_job: '',
                receive_job_name: '',
                receive_taobao_value: '',
                receive_taobao_value_name: '',
                receive_evaluate_manage: '', //评价管理
                receive_auth: '',
                receive_mytaobao: '',
                receive_account: '',
                receive_huabei: '',
            },
            receive_status: '-1', //账号状态  0-审核中  1-通过  2-审核拒绝
            showArea: false,
            area: '', //省市区
            areaList: areaList, // 数据格式见 Area 组件文档

            // ----common----
            showPop: false, //显示弹出窗
            popTitle: '请选择',
            popType: '', //显示类别

            // 性别
            list_sex: [
                { id: '0', name: '未知' },
                { id: '1', name: '男' },
                { id: '2', name: '女' },
            ],
            receive_sex: '',
            // 等级
            list_level: [],
            // 职业类目
            list_job: [
                { id: '1', name: '学校学生' },
                { id: '2', name: '专职宝妈' },
                { id: '3', name: '公司职员' },
                { id: '4', name: '个体经营/服务人员' },
                { id: '5', name: '教职工' },
                { id: '6', name: '医务人员' },
                { id: '7', name: '公务员' },
                { id: '8', name: '工人' },
            ],
            // 淘气值
            list_taobao_value: [
                { id: '1', name: '401-500' },
                { id: '2', name: '501-600' },
                { id: '3', name: '601-800' },
                { id: '4', name: '801-1000' },
                { id: '5', name: '1000以上' },
            ],

            // 购物类目
            list_cate: [
                { id: '1', name: '服装鞋包' },
                { id: '2', name: '手机数码' },
                { id: '3', name: '家用电器' },
                { id: '4', name: '美妆饰品' },
                { id: '5', name: '母婴用品' },
                { id: '6', name: '家居建材' },
                { id: '7', name: '百货食品' },
                { id: '8', name: '运动户外' },
                { id: '9', name: '文化娱乐' },
                { id: '10', name: '生活服务' },
                { id: '11', name: '汽摩配件' },
                { id: '12', name: '游戏花费' },
                { id: '13', name: '其他' },
            ],
            receive_cate: [],

            // 截图步骤
            showScreen: false,
            screenTitle: '',
            screen_list: [],
            screen_coment: ['coment1.jpg', 'coment2.jpg', 'coment3.jpg', 'coment4.jpg'],
            screen_auth: ['auth-step1.jpg', 'auth-step2.jpg'],
            screen_mytb: ['mytb1.jpg'],
            screen_account: ['account1.jpg', 'account2.jpg', 'account3.jpg', 'account4.jpg'],
            screen_hb: ['hb1.jpg', 'hb2.jpg'],
        }
    },
    mounted() {
        this.initPage()
        this.getLevel()
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        initPage() {
            if (this.$route.query && this.$route.query.taobao_username) {
                this.form = this.$route.query
                if (this.form.receive_province && this.form.receive_city && this.form.receive_area) {
                    this.area = this.form.receive_province + ' ' + this.form.receive_city + ' ' + this.form.receive_area
                }
                this.receive_status = this.form.receive_status
                this.receive_cate = this.form.receive_cate ? this.form.receive_cate.split(',') : ''
                this.isLoading = this.form.receive_status == 0 || this.form.receive_status == 1 ? true : false
            }
        },
        // 淘宝吧等级
        getLevel() {
            this.$toast.loading({ title: '加载中..' })
            api.taobaoLevel().then((res) => {
                this.$toast.clear()
                if (res.success) {
                    this.list_level = res.data
                }
            })
        },
        // 选择省市
        onConfirm(values) {
            this.area = values
                .filter((item) => !!item)
                .map((item) => item.name)
                .join(' ')
            this.form.receive_province = this.area.split(' ')[0]
            this.form.receive_city = this.area.split(' ')[1]
            this.form.receive_area = this.area.split(' ')[2]
            this.showArea = false
        },
        onSubmit() {
            console.log(this.form)
            if (this.isLoading) return
            if (!this.form.taobao_username) return this.$toast('请输入淘宝会员名')
            if (!this.form.receive_name) return this.$toast('请输入收货人姓名')
            if (!this.form.receive_phone) return this.$toast('请输入收货人手机号')
            if (!this.form.receive_province) return this.$toast('请选择地址')
            if (!this.form.receive_city) return this.$toast('请选择地址')
            if (!this.form.receive_area) return this.$toast('请选择地址')
            if (!this.form.receive_address) return this.$toast('请输入详细地址')
            if (!this.form.receive_sex) {
                this.form.receive_sex = 0
                this.form.receive_sex_name = '未知'
            }

            if (!this.form.receive_age) return this.$toast('请输入年龄')
            if (!this.form.receive_level) return this.$toast('请选择等级')
            if (!this.form.receive_cate || this.receive_cate.length < 3) return this.$toast('请输入三到五个类目')
            if (!this.form.receive_job) return this.$toast('请选择职业')
            if (!this.form.receive_taobao_value) return this.$toast('请选择淘气值')
            if (!this.form.receive_evaluate_manage) return this.$toast('请上传评价管理图')
            if (!this.form.receive_auth) return this.$toast('请上传实名认证图')
            if (!this.form.receive_mytaobao) return this.$toast('请上传我的淘宝图')
            if (!this.form.receive_account) return this.$toast('请上传账号体验图')
            if (!this.form.receive_huabei) return this.$toast('请上传花呗图')

            if (!this.form.id) {
                this.addEvent()
            } else {
                this.editEvent()
            }
        },
        editEvent() {
            this.$toast.loading({ message: '正在提交,请勿重复点击', forbidClick: true })
            this.isLoading = true
            api.editBindTaobao(this.form).then((res) => {
                this.$toast.clear()
                this.isLoading = false
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
        addEvent() {
            this.$toast.loading({ message: '正在提交,请勿重复点击', forbidClick: true })
            this.isLoading = true
            api.bindTaobao(this.form).then((res) => {
                this.$toast.clear()
                this.isLoading = false
                if (res.success) {
                    this.$toast('提交成功')
                    setTimeout(() => {
                        this.goBack()
                    }, 1000)
                }
            })
        },
        // 弹出显示
        togglePop(visible, title, type) {
            this.showPop = visible
            this.popTitle = title
            this.popType = type
        },
        // 复选框点击
        toggleBoxCate(index, refName) {
            this.$refs['checkboxes_' + refName][index].toggle()
        },
        changeCate() {
            let cate_names = []
            _.each(this.receive_cate, (v) => {
                cate_names.push(this.list_cate[v - 1]['name'])
            })
            this.form.receive_cate = this.receive_cate.join(',')
            this.form.receive_cate_name = cate_names.join(',')
        },
        // 单选点击
        radioBox(item, refName) {
            if (refName == 'receive_level') {
                this.form[refName] = item.level
                this.form[refName + '_name'] = item.level_name
            } else {
                this.form[refName] = item.id
                this.form[refName + '_name'] = item.name
            }
            this.showPop = false
        },
        // 截图步骤展示
        toggleScreen(refName, title) {
            this.showScreen = true
            this.screenTitle = title
            this.screen_list = refName ? this['screen_' + refName] : []
        },
        // 传图片
        afterRead_evaluate(file) {
            this.upload('receive_evaluate_manage', file.content)
        },
        afterRead_auth(file) {
            this.upload('receive_auth', file.content)
        },
        afterRead_mytaobao(file) {
            this.upload('receive_mytaobao', file.content)
        },
        afterRead_account(file) {
            this.upload('receive_account', file.content)
        },
        afterRead_huabei(file) {
            this.upload('receive_huabei', file.content)
        },
        upload(type, fileBase64) {
            this.$toast.loading({ message: '提交中请勿重复点击', forbidClick: true })
            api.image_upload({ base_str: fileBase64, type: 5 }).then((res) => {
                this.$toast.clear()
                if (res.success) {
                    this.form[type] = res.data
                }
            })
        },
    },
}
</script>

<style lang="less" scoped></style>
