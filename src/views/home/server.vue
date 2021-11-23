<template>
    <div class="server-index">
        <van-nav-bar title="联系客服" left-arrow @click-left="goBack" />
        <div class="card-box">
            <div class="card-title">买手接待交流QQ群</div>
            <div class="card-text">
                欢迎广大买手加入平台官方QQ群:{{
                    detail.buyer_qq_group
                }}复制群号入群说明填写您的账号ID,入群后也将群名片修改成您的账号ID+昵称, 方便工作人员及时解决处理您的问题.
            </div>
            <div class="card-btn">一键加群</div>
            <div
                class="card-btn"
                v-clipboard:copy="detail.buyer_qq_group"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
            >
                复制群号
            </div>
            <div class="card-tip"><span class="c-red">提示:</span>如不能一键加群,可以手动复制群号加入</div>
        </div>
        <div class="card-box">
            <div class="card-title">工作时间</div>
            <div class="card-text">
                周一至周六早上:09:00-22:30,午休是:12:00-13:30,晚饭是:18:00-20:00,周日和国家法定节假日不定时上线
            </div>
        </div>
        <div class="card-box">
            <div class="card-title">值班客服</div>
            <div class="card-text">
                周一至周六晚上:22:30-02:00
            </div>
        </div>
    </div>
</template>

<script>
import * as api from '@/api/api'
export default {
    name: 'server',
    data() {
        return {
            detail: '',
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        getData() {
            api.customerService().then((res) => {
                if (res.success) {
                    this.detail = res.data
                }
            })
        },
        onCopy() {
            this.$toast('复制成功')
        },
        onError() {
            this.$toast('复制失败')
        },
    },
}
</script>

<style></style>
