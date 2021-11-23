<template>
    <!-- 第一步 : 货比打标 -->
    <div class="shop-mark-container">
        <van-nav-bar title="货比打标" right-text="联系客服" left-arrow @click-left="goBack" @click-right="goPage('server')" />
        <div class="mark-box">
            <div class="title">货比三家</div>
            <div class="desc">在搜索列表选择两个同行的商品浏览,至少浏览呢2分钟.然后复制竞品的淘宝口令填入下面的输入框.</div>
            <div class="keywords">搜索关键词:{{ orderDetail.keywords }}</div>
            <div class="keywords mt-10" v-if="orderDetail && orderDetail.backup_remark">
                备用关键词:{{ orderDetail.backup_remark }}
            </div>
            <div class="subtitle">竞品1链接</div>
            <div class="input-box">
                <input type="text" placeholder="请输入竞品淘口令1" v-model="link1" />
                <span class="action" @click="visible = true">竞品链接说明</span>
            </div>
            <div class="subtitle">竞品2链接</div>
            <div class="input-box">
                <input type="text" placeholder="请输入竞品淘口令2" v-model="link2" />
            </div>
            <div class="tip">确认淘宝登录的账号和平台接单买号一致,避免串号受到处罚.</div>
            <div class="btn-app" @click="toNextStep">确定使用买号 {{ orderDetail.taobao_nickname }} 操作</div>
        </div>

        <!-- 竞品说明 -->
        <v-popup :visible="visible" title="竟品说明" @toggle="visible = false">
            <template slot="content">
                <img :src="require('../../assets/image/task/' + item)" v-for="(item, index) in screen_list" :key="index" />
            </template>
        </v-popup>
    </div>
</template>

<script>
import VPopup from '../../components/VPopup'
import * as api from '@/api/api'
export default {
    name: 'shop-mark',
    components: {
        VPopup,
    },
    data() {
        return {
            visible: false,
            screen_list: ['mark1.png', 'mark2.png', 'mark3.png'],
            link1: '', //淘宝口令1
            link2: '', //淘宝口令2
            orderDetail: '', //订单详情
            order_id: this.$route.query.id,
            // search_type 0-关键词  1-淘口令 2-二维码
        }
    },
    mounted() {
        this.getOrderDetail()
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
            api.orderDetail({ order_id: this.$route.query.id }).then((res) => {
                this.$toast.clear()
                if (res.success) {
                    this.orderDetail = res.data
                    if (res.data.competitive_product_1) this.link1 = res.data.competitive_product_1
                    if (res.data.competitive_product_2) this.link2 = res.data.competitive_product_2
                }
            })
        },
        // 下一步
        toNextStep() {
            if (!this.link1) return this.$toast('请输入淘口令1')
            if (!this.link2) return this.$toast('请输入淘口令2')
            api.shopAround({ order_id: this.order_id, link1: this.link1, link2: this.link2 }).then((res) => {
                if (res.success) {
                    this.$toast('操作成功')
                    this.$router.replace({ name: 'step-find', query: { id: this.order_id } })
                }
            })
        },
    },
}
</script>

<style lang="less" scoped></style>
