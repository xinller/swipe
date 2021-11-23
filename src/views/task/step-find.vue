<template>
    <!-- 第二步 : 找到宝贝 -->
    <div class="shop-mark-container">
        <van-nav-bar title="找到宝贝" left-arrow @click-left="goBack" />
        <!-- 店铺情况 -->
        <div class="mark-box">
            <div class="title mt-5">店铺名 : {{ orderDetail.store_name | format_storename }}</div>
            <div class="card-prod">
                <img :src="orderDetail.goods_image" class="thumb" />
                <div class="prod-desc">
                    <div class="item">
                        <span>搜索展示价格:</span>
                        <span>{{ orderDetail.goods_search_price }}元</span>
                    </div>
                    <div class="item">
                        <span>主宝贝单价:</span>
                        <span>{{ orderDetail.buy_price }}元</span>
                    </div>
                    <div class="item">
                        <span>购买数量:</span>
                        <span>{{ orderDetail.buy_num }}件</span>
                    </div>
                </div>
            </div>
            <!-- 商家要求也是动态获取 -->
            <div class="title mt-20" v-if="orderDetail.attention_remark">商家要求</div>
            <div class="spec-title mt-10">
                <div>{{ orderDetail.attention_remark }}</div>
                <div v-if="orderDetail.remark_img" class="flexrow">
                    <img :src="img" v-for="(img, i) in orderDetail.remark_img" :key="i" class="mr-5" />
                </div>
            </div>
            <div class="title mt-20">主关键词搜索条件</div>
            <div class="keywords" v-if="orderDetail && orderDetail.search_type == 0">搜索关键词:{{ orderDetail.keywords }}</div>
            <div
                class="keywords"
                v-if="orderDetail && orderDetail.search_type == 1"
                v-clipboard:copy="orderDetail.keywords"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
            >
                复制淘口令(点击这行):{{ orderDetail.keywords }}
            </div>
            <div class="keywords" v-if="orderDetail && orderDetail.search_type == 2">
                淘宝打开扫一扫:
                <img :src="orderDetail.keywords" style="width:200px" />
            </div>

            <div class="size-13 mt-5">排序方式：{{ orderDetail.sort_type == 0 ? '综合排序' : '销量排序' }}</div>
            <div class="size-13 mt-5">其他：无</div>
            <div class="size-13 mt-5">备用关键词: {{ orderDetail.backup_remark }}</div>
        </div>
        <!-- 付款说明 -->
        <div class="mark-box">
            <div class="title mt-5">付款和反款说明</div>
            <div class="size-13 mt-10">
                下单买号: <span class="c-primary">{{ orderDetail.taobao_nickname }}</span>
            </div>
            <div class="size-13 mt-5">
                应付总金额: <span class="c-primary">{{ orderDetail.pay_amount }}元</span>
            </div>
            <div class="size-13 mt-5 flex" v-if="orderDetail.is_pre == 1">
                <span
                    >预售要求: <span class="c-primary">宝贝加入购物车{{ orderDetail.presale_require_long }}小时后付款</span></span
                >
                <van-icon @click="dialogAppoint" class="size-20 ml-10" name="question-o" />
            </div>
            <div class="size-13 mt-5">
                付款方式:
                <span class="c-primary">{{
                    orderDetail.pay_type == 0
                        ? '无所谓'
                        : orderDetail.pay_type == 1
                        ? '禁止使用花呗、信用卡付款'
                        : '必须使用花呗付款'
                }}</span>
            </div>
            <div class="size-13 mt-5 flex">
                <span>货款返还时间: <span class="c-primary">买家收货24小时后自动返</span></span>
                <van-icon @click="dialogPay" class="size-20 ml-10" name="question-o" />
            </div>
        </div>
        <!-- 截图方式 -->
        <div class="mark-box">
            <div class="title">截图方式</div>
            <div class="size-13 c-primary mt-10" v-if="orderDetail.screen_mode == 0">
                只需要一张找到宝贝截图，其他步骤无需截图，如未按要求操作会扣除赏金所得。
            </div>
            <div class="size-13 c-primary mt-10" v-if="orderDetail.screen_mode == 1">无需截图</div>
            <div class="size-13 c-primary mt-10" v-if="orderDetail.screen_mode == 2">全程截图</div>
        </div>
        <!-- 活动步骤 -->
        <div class="mark-box">
            <div class="flex">
                <div class="title">活动步骤</div>
                <div class="size-12">找不到宝贝? 可以<span class="c-primary" @click="isCloseTask = true">关闭活动</span></div>
            </div>
            <div class="upload">
                <van-uploader :after-read="afterReadFind" accept="image/*">
                    <img
                        :src="find_goods_img ? find_goods_img : require('../../assets/image/mine/upload.png')"
                        class="upload-img"
                    />
                </van-uploader>
                <p class="size-13 txt-ct">宝贝位置</p>
                <p class="size-15 txt-ct c-primary" @click="visible = true">截图步骤></p>
            </div>
            <div class="flex mt-20">
                <div class="subtitle">验证是否找对店铺</div>
                <router-link class="c-primary size-13" to="/step-check">验证不通过?</router-link>
            </div>
            <div class="input-box">
                <input type="text" placeholder="请输入店铺名或旺旺名称" v-model="store_name" />
                <van-button :disabled="is_store == 1" class="btn-sm red" @click="checkStoreName">验证</van-button>
            </div>
            <template v-if="orderDetail.detail_check == 1">
                <div class="subtitle pt-10">核对详情页关键词</div>
                <div class="card-prod">
                    <img :src="orderDetail.detail_check_image" class="thumb" />
                    <div class="prod-desc">
                        <div class="item">关键词说明:</div>
                        <div class="item">在商品详情页找到对应的区域，并找到图片上隐藏的关键词，在下面输入核对。</div>
                    </div>
                </div>
                <div class="input-box pt-10">
                    <input type="text" placeholder="请输入详情页中的关键词" v-model="keywords" />
                    <van-button :disabled="is_keyword == 1" class="btn-sm primary" @click="checkKeywords">核对</van-button>
                </div>
                <div class="size-12 mt-10">
                    提示:{{
                        orderDetail.detail_check_keyword ? orderDetail.detail_check_keyword.substring(0, 1) + '***' : ''
                    }}共{{ orderDetail.detail_check_keyword.length }}个字符
                </div>
                <div class="subtitle pt-10">
                    请根据以下操作完后打钩（如不会操作请点击问号），浏览货比请真实操作，商家可以明确查看到用户操作，防止审核不通过。
                </div>
            </template>
            <!-- 动态数据 -->
            <van-checkbox-group class="checkbox-list" v-model="checkbox_res">
                <van-checkbox :name="item.id" v-for="(item, index) in step_arr" :key="index"
                    >{{ item.title }} <van-icon @click.stop="dialog_step(index)" class="size-20 ml-10" name="question-o"
                /></van-checkbox>
            </van-checkbox-group>
        </div>
        <div class="p-15">
            <div class="btn-app" @click="toNextStep">下一步</div>
        </div>
        <div class="tip-wrap">
            <div class="title">总要提示</div>
            <div class="size-13 mt-5">1、不按照商家要求关键词进店的，一经发现扣除赏金</div>
            <div class="size-13 mt-5 c-primary">
                2、禁止使用淘宝客，返利，淘金币，第一次扣除奖励所得和返利佣金所得，第二次将做封号处理。
            </div>
        </div>

        <!-- 弹窗提示都在这里 -->

        <!-- 提示 -->
        <v-dialog :visible="isDialog" :closeBtn="false" :title="dialog_title">
            <div slot="content">
                <div v-html="dialog_content"></div>
            </div>
            <div slot="footer" class="dialog-btn" @click="isDialog = false">我知道了</div>
        </v-dialog>
        <!-- 宝贝位置 -->
        <v-popup :visible="visible" title="宝贝位置" @toggle="visible = false">
            <template slot="content">
                <img :src="require('../../assets/image/task/' + item)" v-for="(item, index) in where_list" :key="index" />
            </template>
        </v-popup>
        <!-- 关闭活动 -->

        <CloseTaskDialog
            title="确定关闭活动?"
            :visible="isCloseTask"
            @toggle="isCloseTask = false"
            @confirm="closeHanlder"
        ></CloseTaskDialog>
    </div>
</template>

<script>
import VPopup from '../../components/VPopup'
import VDialog from '../../components/VDialog'
import * as api from '@/api/api'
import CloseTaskDialog from '../../components/CloseTaskDialog'
import { findIndex } from 'lodash'
export default {
    name: 'shop-find-shop',
    components: {
        VPopup,
        VDialog,
        CloseTaskDialog,
    },
    data() {
        return {
            visible: false, // 宝贝位置框
            isDialog: false, //弹提示框
            isCloseTask: false, //关闭任务
            dialog_title: '提示',
            dialog_content: '',
            where_list: ['where1.png'], //宝贝位置图片
            step_list: [
                {
                    id: 0,
                    title: '主宝贝浏览',
                    content: '<p>目标宝贝至少浏览5分钟以上,商家后台可监控数据,请不要秒拍,否则会被商家投诉.</p>',
                },
                {
                    id: 1,
                    title: '货比三家',
                    content: '<p>搜索关键词找到类似商品,多家比对浏览</p>',
                },
                { id: 2, title: '浏览评价', content: '<p>点开宝贝评价,进去浏览10秒</p>' },
                {
                    id: 3,
                    title: '旺旺聊天',
                    content: `<p>1、如商家有指定聊天内容,请按照商家的要求进行聊天.</p>
                            <p>2、如无特殊需求,已买家身份正常聊天,比如询问尺码,快递,质量等.</p>
                            <p>3、若买家提问后,卖家超过10分钟未回复,算完成此步骤.</p>
                            <p>4、旺旺聊天过程中,不要提及“shua单“”任务“”鲸鱼“等敏感词汇.</p>`,
                },
                { id: 4, title: '收藏宝贝', content: '<p>收藏宝贝后,在选项前打勾</p>' },
                { id: 5, title: '收藏电铺', content: '<p>收藏店铺后,在选项前打勾</p>' },
                { id: 6, title: '已加入购物车', content: '<p>将宝贝加入购物车后,在选项前打勾</p>' },
                { id: 7, title: '主视频浏览', content: '<p>主页商品视频,进去浏览10秒</p>' },
                { id: 8, title: '五张橱窗图浏览', content: '<p>商品橱窗浏览5张图片</p>' },
                { id: 9, title: '浏览店铺其他宝贝', content: '<p>点击进入店铺,随意浏览几个其他宝贝</p>' },
            ],
            step_arr: [],
            order_id: this.$route.query.id,
            find_goods_img: '', //宝贝位置图片
            is_find: 0, //是否找到图片
            store_name: '', //验证店铺名称
            is_store: 0, //验证店铺名称是否通过
            keywords: '', //详情页关键词名称
            is_keyword: false, //详情页关键词是否通过
            checkbox_res: [], //选择操作结果 得全选才行通过

            orderDetail: {},
        }
    },
    mounted() {
        this.getOrderDetail()
    },
    filters: {
        format_storename(val) {
            if (!val) return ''
            return val.substring(0, 1) + '**' + val.substring(val.length - 1)
        },
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        goPage(key) {
            this.$router.replace({ name: key })
        },
        onCopy() {
            this.$toast('复制成功')
        },
        onError() {
            this.$toast('复制失败')
        },
        getOrderDetail() {
            this.$toast.loading({ message: '加载中', forbidClick: true })
            api.orderDetail({ order_id: this.order_id }).then((res) => {
                if (res.success) {
                    this.$toast.clear()
                    this.orderDetail = res.data
                    let list = res.data.browse_require_list
                    let arr = []
                    for (var i in list) {
                        let index = findIndex(this.step_list, (v) => v.id == list[i])
                        if (index >= 0) {
                            arr.push(this.step_list[index])
                        }
                    }
                    this.step_arr = arr
                    this.is_find = this.orderDetail.is_find
                    this.is_keyword = this.orderDetail.is_keyword
                    this.is_store = this.orderDetail.is_store
                    if (this.is_keyword) {
                        this.keywords = this.orderDetail.detail_check_keyword
                    }
                    if (this.is_store) {
                        this.store_name = this.orderDetail.store_name
                    }
                    this.find_goods_img = this.orderDetail.find_goods_img
                    // 一进来就提示账号是否一致
                    this.initDialog()
                } else {
                    this.$toast.clear()
                }
            })
        },
        // 初始化提示是否账号一致
        initDialog() {
            this.isDialog = true
            this.dialog_title = '提示'
            // 普通单提示
            if (this.orderDetail.status != 8) {
                this.dialog_content = `<p>请确定你在淘宝上的下单账号是 <span class="c-primary">${this.orderDetail.taobao_nickname}</span>,需和平台接单账号保持一致.</p>`
            } else {
                // 预售单的提示
                this.dialog_content = `<p>请确定你在淘宝上的下单账号是 <span class="c-primary">${this.orderDetail.taobao_nickname}</span>,需和平台接单账号保持一致.</p>
            <p>此订单是预售单,请先加入购物车,点击下一步, <span class="c-primary">${this.orderDetail.presale_end_hours}</span> 小时后再从购物车进入付款.</p>`
            }
        },
        // 显示预售提示
        dialogAppoint() {
            this.isDialog = true
            this.dialog_title = '预售说明'
            this.dialog_content = `<p>淘宝上操作: 需要先把宝贝加入购物车,在商家要求的指定时间后在从购物车进行付款.</p>
            <p class="mt-10">平台上操作: 宝贝加入购物车后,在平台上点击下一步,预售时间到后再付款.</p>
            <p class="mt-10">付款有效期说明: 预售订单的付款有效期为${this.orderDetail.presale_require_long}小时,超时未付款的任务会被关闭.</p>`
        },
        // 返款提示
        dialogPay() {
            this.isDialog = true
            this.dialog_title = '返款规则'
            this.dialog_content = `<p>一、货返和立返的返款时间?</p>
            <p class="mt-10">"货返"是指确认收货后24小时返还本金,"立返"是指买家付款后24小时内返还本金.</p>
            <p class="mt-10">二、任务满足以下条件的任务,享受“立返”</p>
            <p class="mt-10">1、买家实付金额小于等于商家应付金额.</p>
            <p class="mt-10">2、买家实付金额小于等于当前用户等级的立返上限金额.</p>
            <p class="mt-10">三、具体返款规则在“APP-我的-返款规则”查看.</p>`
        },
        // 操作步骤提示 数据应该动态获取
        dialog_step(index) {
            this.isDialog = true
            this.dialog_title = this.step_list[index]['title']
            this.dialog_content = this.step_list[index]['content']
        },
        // 1- 传宝贝位置图
        afterReadFind(file) {
            // if (this.is_find) return
            this.upload('find_goods_img', file.content)
        },
        upload(type, fileBase64) {
            this.$toast.loading({ message: '提交中请勿重复点击', forbidClick: true })
            api.image_upload({ base_str: fileBase64, type: 7 }).then((res) => {
                this.$toast.clear()
                if (res.success) {
                    this[type] = this.BASE_URL + res.data
                }
            })
        },
        // 2-验证店铺
        checkStoreName() {
            if (!this.store_name) return this.$toast('请输入要验证的店铺名称')
            api.checkStoreName({ order_id: this.order_id, store_name: this.store_name }).then((res) => {
                if (res.success) {
                    this.$toast('验证通过')
                    this.is_store = 1
                } else {
                    this.is_store = 0
                }
            })
        },
        // 3 - 验证关键词
        checkKeywords() {
            if (this.orderDetail.detail_check == 1) {
                if (!this.keywords) return this.$toast('请输入详情验证关键词')
                api.checkKeywords({ order_id: this.order_id, keywords: this.keywords }).then((res) => {
                    if (res.success) {
                        this.$toast('验证通过')
                        this.is_keyword = 1
                    } else {
                        this.is_keyword = 0
                    }
                })
            }
        },
        // 关闭活动
        closeHanlder(param) {
            api.closeMission({ order_id: this.order_id, type: param.type }).then((res) => {
                if (res.success) {
                    this.$toast('关闭成功')
                    this.$router.replace({ name: 'welfare' })
                    this.isCloseTask = false
                }
            })
        },
        // 下一步
        toNextStep() {
            if (!this.find_goods_img) return this.$toast('请上传宝贝位置图片')
            if (!this.store_name) return this.$toast('请验证店铺名称')
            if (!this.is_store) return this.$toast('店铺名称验证未通过')
            if (this.orderDetail.detail_check == 1) {
                if (!this.keywords) return this.$toast('请核对详情页关键词')
                if (!this.is_keyword) return this.$toast('关键词验证未通过')
            }
            if (this.checkbox_res.length < this.step_arr.length) return this.$toast('请勾选操作完的步骤')

            let content = `<p>请确定你在淘宝上的下单账号是 <span class="c-primary">${this.orderDetail.taobao_nickname}</span>,需和平台接单账号保持一致.</p>`
            if (this.orderDetail.is_pre == 1) {
                content += `<p >此订单是预售单,请先加入购物车,点击下一步, <span class="c-primary">${
                    this.orderDetail.is_pre == 1 ? this.orderDetail.pre_end_hours + '小时后' : ''
                }</span>再从购物车进入付款.</p>`
            }
            this.$dialog
                .confirm({
                    title: '提示',
                    message: content,
                    messageAlign: 'left',
                })
                .then(() => {
                    // on confirm
                    // 找到宝贝
                    api.findGoods({ order_id: this.order_id, find_goods_img: this.find_goods_img }).then((res) => {
                        if (res.success) {
                            this.setBrowse().then((ret) => {
                                console.log('ret', ret)
                                if (ret.success) {
                                    this.$toast('提交成功')
                                    this.$router.replace({ name: 'step-detail', query: { id: this.order_id } })
                                } else {
                                    this.$toast(ret.data)
                                }
                            })
                        }
                    })
                })
                .catch(() => {
                    // on cancel
                })
        },
        async setBrowse() {
            console.log(this.checkbox_res)
            let param = {
                user_is_browse: this.checkbox_res.indexOf(0) >= 0 ? 1 : 0,
                user_is_compare: this.checkbox_res.indexOf(1) >= 0 ? 1 : 0,
                user_is_browse_evaluation: this.checkbox_res.indexOf(2) >= 0 ? 1 : 0,
                user_is_talk: this.checkbox_res.indexOf(3) >= 0 ? 1 : 0,
                user_is_favorites: this.checkbox_res.indexOf(4) >= 0 || this.checkbox_res.indexOf(5) >= 0 ? 1 : 0,
                user_is_add_card: this.checkbox_res.indexOf(6) >= 0 ? 1 : 0,
                user_is_video: this.checkbox_res.indexOf(7) >= 0 ? 1 : 0,
                user_is_other: this.checkbox_res.indexOf(8) >= 0 ? 1 : 0,
                user_is_five: this.checkbox_res.indexOf(9) >= 0 ? 1 : 0,
                user_is_ask: this.checkbox_res.indexOf(10) >= 0 ? 1 : 0,
                order_id: this.order_id,
            }
            console.log('param', param)
            return await api.setBrowse(param)
        },
    },
}
</script>

<style lang="less" scoped></style>
