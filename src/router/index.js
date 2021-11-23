import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store';

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: () =>
            import ('../views/home/Index.vue')
    },
    {
        path: '/welfare',
        name: 'welfare',
        component: () =>
            import ('../views/welfare/Index.vue')
    },
    {
        path: '/invite',
        name: 'invite',
        component: () =>
            import ('../views/invite/Index.vue')
    },
    {
        path: '/mine',
        name: 'mine',
        component: () =>
            import ('../views/mine/Index.vue')
    },

    // 登录
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/login/login.vue')
    },
    // 注册
    {
        path: '/register',
        name: 'register',
        component: () =>
            import ('../views/login/register.vue')
    },
    {
        path: '/agreement',
        name: 'agreement',
        component: () =>
            import ('../views/login/agreement.vue')
    },
    // 忘记密码
    {
        path: '/forget',
        name: 'forget',
        component: () =>
            import ('../views/login/forget.vue')
    },
    // 客服
    {
        path: '/server',
        name: 'server',
        component: () =>
            import ('../views/home/server.vue')
    },
    // 余额
    {
        path: '/asset',
        name: 'asset',
        component: () =>
            import ('../views/home/asset.vue')
    },
    // 余额详情
    {
        path: '/asset-detail',
        name: 'asset-detail',
        component: () =>
            import ('../views/home/asset-detail.vue')
    },
    // 余额转换
    {
        path: '/asset-change',
        name: 'asset-change',
        component: () =>
            import ('../views/home/asset-change.vue')
    },
    // 转换记录
    {
        path: '/asset-change-record',
        name: 'asset-change-record',
        component: () =>
            import ('../views/home/asset-change-record.vue')
    },
    // 提现
    {
        path: '/asset-withdrow',
        name: 'asset-withdrow',
        component: () =>
            import ('../views/home/asset-withdrow.vue')
    },
    // 提现记录
    {
        path: '/withdrow-record',
        name: 'withdrow-record',
        component: () =>
            import ('../views/home/withdrow-record.vue')
    },
    // 返款记录
    {
        path: '/back-record',
        name: 'back-record',
        component: () =>
            import ('../views/home/back-record.vue')
    },
    // 货款余额
    {
        path: '/loan',
        name: 'loan',
        component: () =>
            import ('../views/home/loan.vue')
    },
    // 新手教程详情
    {
        path: '/teach-detail',
        name: 'teach-detail',
        component: () =>
            import ('../views/home/teach-detail.vue')
    },
    // 公告
    {
        path: '/notice',
        name: 'notice',
        component: () =>
            import ('../views/home/notice.vue')
    },
    // 公告详情
    {
        path: '/notice-detail',
        name: 'notice-detail',
        component: () =>
            import ('../views/home/notice-detail.vue')
    },
    // 新手任务
    {
        path: '/novice-task',
        name: 'novice-task',
        component: () =>
            import ('../views/home/novice-task.vue')
    },
    // 新手考试
    {
        path: '/novice-exam',
        name: 'novice-exam',
        component: () =>
            import ('../views/home/novice-exam.vue')
    },
    // 考试列表
    {
        path: '/novice-exam-list',
        name: 'novice-exam-list',
        component: () =>
            import ('../views/home/novice-exam-list.vue')
    },
    // 考试失败
    {
        path: '/exam-fail',
        name: 'exam-fail',
        component: () =>
            import ('../views/home/exam-fail.vue')
    },
    // 考试成功
    {
        path: '/exam-success',
        name: 'exam-success',
        component: () =>
            import ('../views/home/exam-success.vue')
    },
    // 新手教学
    {
        path: '/novice-teach',
        name: 'novice-teach',
        component: () =>
            import ('../views/home/novice-teach.vue')
    },

    // 返款规则
    {
        path: '/back-rule',
        name: 'back-rule',
        component: () =>
            import ('../views/mine/back-rule.vue')
    },
    // 买号/实名认证
    {
        path: '/buy-auth',
        name: 'buy-auth',
        component: () =>
            import ('../views/mine/buy-auth.vue')
    },
    // 实名认证
    {
        path: '/auth',
        name: 'auth',
        component: () =>
            import ('../views/mine/auth.vue')
    },
    // 拍摄要求
    {
        path: '/camera-require',
        name: 'camera-require',
        component: () =>
            import ('../views/mine/camera-require.vue')
    },
    // 买号管理
    {
        path: '/buy-manage',
        name: 'buy-manage',
        component: () =>
            import ('../views/mine/buy-manage.vue')
    },
    // 添加淘宝
    {
        path: '/add-num',
        name: 'add-num',
        component: () =>
            import ('../views/mine/add-num.vue')
    },
    // 添加收款方式
    {
        path: '/receive-index',
        name: 'receive-index',
        component: () =>
            import ('../views/mine/receive-index.vue')
    },
    // 添加银行卡
    {
        path: '/add-bank',
        name: 'add-bank',
        component: () =>
            import ('../views/mine/add-bank.vue')
    },
    // 微信收款方式
    {
        path: '/add-wechat-code',
        name: 'add-wechat-code',
        component: () =>
            import ('../views/mine/add-wechat-code.vue')
    },
    // 买号认证信息
    {
        path: '/verify-num',
        name: 'verify-num',
        component: () =>
            import ('../views/mine/verify-num.vue')
    },
    // 客服中心
    {
        path: '/server-center',
        name: 'server-center',
        component: () =>
            import ('../views/mine/server-center.vue')
    },
    // 设置
    {
        path: '/set',
        name: 'set',
        component: () =>
            import ('../views/mine/set.vue')
    },
    // 修改密码
    {
        path: '/modify-pass',
        name: 'modify-pass',
        component: () =>
            import ('../views/mine/modify-pass.vue')
    },
    // 修改qq
    {
        path: '/modify-qq',
        name: 'modify-qq',
        component: () =>
            import ('../views/mine/modify-qq.vue')
    },
    // 修改微信
    {
        path: '/modify-wechat',
        name: 'modify-wechat',
        component: () =>
            import ('../views/mine/modify-wechat.vue')
    },
    // 修改紧急联系人
    {
        path: '/modify-link',
        name: 'modify-link',
        component: () =>
            import ('../views/mine/modify-link.vue')
    },
    // 修改版本
    {
        path: '/modify-version',
        name: 'modify-version',
        component: () =>
            import ('../views/mine/modify-version.vue')
    },
    // 修改提示音
    {
        path: '/modify-voice',
        name: 'modify-voice',
        component: () =>
            import ('../views/mine/modify-voice.vue')
    },

    // 任务大厅
    {
        path: '/task-hall',
        name: 'task-hall',
        component: () =>
            import ('../views/task/task-hall.vue')
    },
    // 人工抢单
    {
        path: '/hall-manual-grab',
        name: 'hall-manual-grab',
        component: () =>
            import ('../views/task/hall-manual-grab.vue')
    },
    // 接单规则
    {
        path: '/grab-rule',
        name: 'grab-rule',
        component: () =>
            import ('../views/task/grab-rule.vue')
    },
    // 切换淘宝号
    {
        path: '/grab-setnum',
        name: 'grab-setnum',
        component: () =>
            import ('../views/task/grab-setnum.vue')
    },
    // 商家审号
    {
        path: '/hall-check',
        name: 'hall-check',
        component: () =>
            import ('../views/task/hall-check.vue')
    },
    // 零元购
    {
        path: '/hall-zero',
        name: 'hall-zero',
        component: () =>
            import ('../views/task/hall-zero.vue')
    },


    // 邀请奖励
    {
        path: '/invite-reward',
        name: 'invite-reward',
        component: () =>
            import ('../views/invite/invite-reward.vue')
    },
    // 邀请排行榜
    {
        path: '/invite-rank',
        name: 'invite-rank',
        component: () =>
            import ('../views/invite/invite-rank.vue')
    },
    // 更高推广奖励
    {
        path: '/promote-reward',
        name: 'promote-reward',
        component: () =>
            import ('../views/invite/promote-reward.vue')
    },
    // 推广
    {
        path: '/share',
        name: 'share',
        component: () =>
            import ('../views/invite/share.vue')
    },
    // 商家审号
    {
        path: '/check-index',
        name: 'check-index',
        component: () =>
            import ('../views/welfare/check-index.vue')
    },
    // 商家审号 未完成
    {
        path: '/check-undone',
        name: 'check-undone',
        component: () =>
            import ('../views/welfare/check-undone.vue')
    },
    // 商家审号 已完成
    {
        path: '/check-done',
        name: 'check-done',
        component: () =>
            import ('../views/welfare/check-done.vue')
    },
    // 任务列表 已完成
    {
        path: '/done-list',
        name: 'done-list',
        component: () =>
            import ('../views/welfare/done-list.vue')
    },
    // 商家审号 已关闭
    {
        path: '/check-close',
        name: 'check-close',
        component: () =>
            import ('../views/welfare/check-close.vue')
    },
    // 商家审号 已关闭订单详情
    {
        path: '/check-detail',
        name: 'check-detail',
        component: () =>
            import ('../views/welfare/check-detail.vue')
    },

    // 抢单步骤1: 货币打标
    {
        path: '/step-compare',
        name: 'step-compare',
        component: () =>
            import ('../views/task/step-compare.vue')
    },
    // 抢单步骤2: 找到宝贝
    {
        path: '/step-find',
        name: 'step-find',
        component: () =>
            import ('../views/task/step-find.vue')
    },
    // 抢单步骤2: 找到宝贝
    {
        path: '/step-find-zero',
        name: 'step-find-zero',
        component: () =>
            import ('../views/task/step-find-zero.vue')
    },
    // 抢单步骤2: 找到宝贝 - 验证店铺
    {
        path: '/step-check',
        name: 'step-check',
        component: () =>
            import ('../views/task/step-check.vue')
    },
    // 抢单步骤3: 下单付款
    {
        path: '/step-pay',
        name: 'step-pay',
        component: () =>
            import ('../views/task/step-pay.vue')
    },
    // 抢单步骤4: 如何收货评价
    {
        path: '/how-comment',
        name: 'how-comment',
        component: () =>
            import ('../views/task/how-comment.vue')
    },
    // 抢单步骤4: 收货评价
    {
        path: '/step-receive',
        name: 'step-receive',
        component: () =>
            import ('../views/task/step-receive.vue')
    },
    // 抢单步骤4: 收货评价
    {
        path: '/step-addreceive',
        name: 'step-addreceive',
        component: () =>
            import ('../views/task/step-addreceive.vue')
    },
    // 抢单: 订单详情
    {
        path: '/step-detail',
        name: 'step-detail',
        component: () =>
            import ('../views/task/step-detail.vue')
    },
    // 抢单: 0元购订单详情
    {
        path: '/step-detail-zero',
        name: 'step-detail-zero',
        component: () =>
            import ('../views/task/step-detail-zero.vue')
    },
    // 商家审号: 商家活动概况
    {
        path: '/hall-check-detail',
        name: 'hall-check-detail',
        component: () =>
            import ('../views/task/hall-check-detail.vue')
    },
    // 商家审号: 审核买号截图说明
    {
        path: '/check-screen-teach',
        name: 'check-screen-teach',
        component: () =>
            import ('../views/task/check-screen-teach.vue')
    },
    // 商家审号: 审核买号截图说明
    {
        path: '/commit-check-apply',
        name: 'commit-check-apply',
        component: () =>
            import ('../views/task/commit-check-apply.vue')
    },
    {
        path: '/*',
        name: '404',
        component: () =>
            import ('../views/error/404.vue')
    }
]

const router = new VueRouter({
    routes
})


//NavigationDuplicated的可能解决方案
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

router.beforeEach(async(to, from, next) => {
    //允许打开多少标签页

    if (to.name === 'register' || to.name === 'forget' || to.name === 'agreement') {
        next()
    } else if (store.state.user.token == "" && to.name !== 'login') {
        next({ name: "login" });
    } else {
        next();
    }
});

export default router