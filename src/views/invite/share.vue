<template>
    <!-- 获取更高推广奖励 -->
    <div class="promote-reward-container">
        <van-nav-bar title="邀请好友" left-arrow @click-left="goBack" />
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="v-page">
            <div v-if="myData" class="share-page">
                <div class="invite-share">
                    <div class="size-16 c-primary">邀请方法</div>
                    <div class="qrcode">
                        <img :src="BASE_URL + myData.src" alt="" />
                    </div>
                    <div class="size-14 txt-ct">方法一:保存二维码到手机,并发给好友</div>
                </div>
                <van-divider />
                <div class="code">
                    <van-field class="input" v-model="myData.invite_code" readonly />
                    <van-button
                        type="info"
                        class="btn"
                        v-clipboard:copy="this.getInviteUrl() + myData.invite_code"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError"
                        >复制</van-button
                    >
                </div>
                <div class="size-14 txt-ct p-10">方法二:复制上方的推荐链接,并发送给好友</div>
                <div class="size-14 c-gray p-10">
                    注意:请不要在微信聊天中直接打开链接,需要复制链接到浏览器中打开,推荐谷歌浏览器
                </div>
                <!-- <div class="size-16 c-primary txt-ct mt-20">邀请商家</div>
                <div class="card-bus">
                    <div>您邀请商家入驻,商家没发布一个活动,您都可以获得提成,轻松月入千元,联系彭经理开通商家推广资格.</div>
                    <div>邀请商家联系人:彭经理</div>
                    <div>QQ:235235</div>
                </div> -->
            </div>
        </van-pull-refresh>
    </div>
</template>

<script>
import * as api from '@/api/api'
export default {
    name: 'promote-reward',
    components: {},
    data() {
        return {
            myData: '',
            isLoading: false,
        }
    },
    mounted() {
        this.onRefresh()
    },
    methods: {
        getInviteUrl() {
            let env = ''
            switch (process.env.VUE_APP_ENV) {
                case 'build':
                    env = 'invite'
                    break
                case 'dev':
                    env = 'inviteTest'
                    break
                case 'buildTest':
                    env = 'inviteTest'
                    break
            }
            return this.appConfig.BASE_URL[env] + '#/register?invite_code='
        },
        goBack() {
            this.$router.go(-1)
        },

        onCopy() {
            this.$toast('复制成功')
        },
        onError() {
            this.$toast('复制失败')
        },
        onRefresh() {
            api.shareQrcode().then((res) => {
                this.isLoading = false
                if (res.success) {
                    this.myData = res.data
                }
            })
        },
    },
}
</script>

<style lang="less" scoped>
.share-page {
    background: #fff;
    height: 100%;
    padding: 20px 0;
    .invite-share {
        width: 100%;
        text-align: center;
        .qrcode {
            img {
                width: 240px;
                height: 240px;
                display: inline-block;
                margin: 10px auto;
            }
        }
    }
    .code {
        width: 100%;
        padding: 10px;
        display: flex;
        align-items: center;
        .input {
            width: 320px;
            border: 6px;
            background: #efefef;
            margin-right: 10px;
            text-align: center;
        }
        .btn {
            border-radius: 6px;
            width: 80px;
        }
    }
    .card-bus {
        width: 350px;
        box-shadow: 0 4px 9px rgba(225, 225, 225, 0.5);
        padding: 20px;
        border-radius: 6px;
        margin: 10px auto;
        font-size: 14px;
    }
}
</style>
