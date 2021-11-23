import request from './request';

/**公共 - 获取图形验证码 */
export async function getCaptcha(data) {
    try {
        const res = await request({
            url: "login/captcha",
            method: "POST",
            data: data
        });
        return res;
    } catch (err) {
        return false;
    }
}

/** 登录 */
export const login = (data) => {
    return request({
        url: "/login/index",
        method: "POST",
        data: data
    });
}

/** 注册 */
export const register = (data) => {
    return request({
        url: "/login/register",
        method: "POST",
        data: data
    });
}

/**
 * 获取验证码
 * @param {} data 
 * 1-注册 2-修改(找回)登录密码 3-修改支付密码
 * 
 */
export const getVerify = (data) => {
    return request({
        url: '/login/getVerify',
        method: 'POST',
        data: data
    })
}

/**忘记密码 type=2*/
export const forgetLoginPass = (data) => {
    return request({
        url: '/login/forgetLoginPass',
        method: 'POST',
        data: data
    })
}

/**忘记支付密码 type=3*/
export const forgetPayPass = (data) => {
    return request({
        url: '/member/forgetPayPass',
        method: 'POST',
        data: data
    })
}

/**修改密码 
 * type 2-登录密码 3-支付密码	
 */
export const changePass = (data) => {
    return request({
        url: '/member/changePass',
        method: 'POST',
        data: data
    })
}

/**修改用户信息
 */
export const editUserInfo = (data) => {
    return request({
        url: '/member/editUserInfo',
        method: 'POST',
        data: data
    })
}

/** 用户协议 */
export const getProtocol = (data) => {
    return request({
        url: "/System/getProtocol",
        method: "POST",
        data: data
    });
}

/** 首页*/
export const getHome = (data) => {
    return request({
        url: '/Buyer/getHome',
        method: 'POST',
        data: data
    })
}

/** 新手是否完成任务信息*/
export const getUserNoviceInfo = (data) => {
    return request({
        url: '/member/getUserNoviceInfo',
        method: 'POST',
        data: data
    })
}


/** 公告
 */
export const noticeList = (data) => {
    return request({
        url: '/notice/noticeList',
        method: 'POST',
        data: data
    })
}

/** 公告详情
 */
export const noticeDetail = (data) => {
    return request({
        url: '/notice/noticeDetail',
        method: 'POST',
        data: data
    })
}

// 发布任务 - 传图片
export const image_upload = (data) => {
    return request({
        url: '/Syspara/image_upload',
        method: 'POST',
        data: data
    })
}

/** 新手考试题目
 */
export const questionList = (data) => {
    return request({
        url: '/Question_answer/questionList',
        method: 'POST',
        data: data
    })
}

/** 新手考试提交答案
 */
export const toAnswer = (data) => {
    return request({
        url: '/Question_answer/toAnswer',
        method: 'POST',
        data: data
    })
}

/** 实名认证
 */
export const auth = (data) => {
    return request({
        url: '/member/auth',
        method: 'POST',
        data: data
    })
}

/** 获取用户详情
 */
export const getUserDetail = (data) => {
    return request({
        url: '/member/getUserDetail',
        method: 'POST',
        data: data
    })
}

/** 我的淘宝列表
 */
export const taobaoList = (data) => {
    return request({
        url: '/Buyer/taobaoList',
        method: 'POST',
        data: data
    })
}

/** 审核过列表
 */
export const taobaoExamineList = (data) => {
    return request({
        url: '/Buyer/taobaoExamineList',
        method: 'POST',
        data: data
    })
}


/** 切换买号
 */
export const switchAccount = (data) => {
    return request({
        url: '/Buyer/switchAccount',
        method: 'POST',
        data: data
    })
}

/** 添加淘宝号
 */
export const bindTaobao = (data) => {
    return request({
        url: '/Buyer/bindTaobao',
        method: 'POST',
        data: data
    })
}

/** 添加淘宝号
 */
export const editBindTaobao = (data) => {
    return request({
        url: '/Buyer/editBindTaobao',
        method: 'POST',
        data: data
    })
}

/** 淘宝号等级
 */
export const taobaoLevel = (data) => {
    return request({
        url: '/Buyer/taobaoLevel',
        method: 'POST',
        data: data
    })
}

/** 淘宝号详情
 */
export const taobaoDetail = (data) => {
    return request({
        url: '/buyer/taobaoDetail',
        method: 'POST',
        data: data
    })
}

/** 淘宝号优质申请
 */
export const applyExamine = (data) => {
    return request({
        url: '/buyer/applyExamine',
        method: 'POST',
        data: data
    })
}

/** 卡号
 */
export const addBank = (data) => {
    return request({
        url: '/member/addBank',
        method: 'POST',
        data: data
    })
}

/** 卡号
 */
export const getBank = (data) => {
    return request({
        url: '/member/getBank',
        method: 'POST',
        data: data
    })
}


/** 卡号
 */
export const getBankInfo = (data) => {
    return request({
        url: '/member/getBankInfo',
        method: 'POST',
        data: data
    })
}

/** 邀请赚钱
 */
export const inviteInfo = (data) => {
    return request({
        url: '/member/inviteInfo',
        method: 'POST',
        data: data
    })
}

/** 邀请排行
 */
export const inviteRank = (data) => {
    return request({
        url: '/member/inviteRank',
        method: 'POST',
        data: data
    })
}

// 邀请奖励明细
export const rewardList = (data) => {
    return request({
        url: '/member/rewardList',
        method: 'POST',
        data: data
    })
}

/** 邀请规则
 */
export const rewardRule = (data) => {
    return request({
        url: '/member/rewardRule',
        method: 'POST',
        data: data
    })
}

/** 邀请规则
 */
export const shareQrcode = (data) => {
    return request({
        url: '/member/shareQrcode',
        method: 'POST',
        data: data
    })
}

/** 等级规则
 */
export const levelRule = (data) => {
    return request({
        url: '/Syspara/levelRule',
        method: 'POST',
        data: data
    })
}

/** 客服
 */
export const customerService = (data) => {
    return request({
        url: '/Syspara/customerService',
        method: 'POST',
        data: data
    })
}

/** 新手教学列表
 */
export const novice = (data) => {
    return request({
        url: '/Syspara/novice',
        method: 'POST',
        data: data
    })
}

/** 新手教学详情
 */
export const noviceDetail = (data) => {
    return request({
        url: '/Syspara/noviceDetail',
        method: 'POST',
        data: data
    })
}

/** 鲸币货款余额
 */
export const getUserBalance = (data) => {
    return request({
        url: '/member/getUserBalance',
        method: 'POST',
        data: data
    })
}

/** 交易记录
 */
export const tradingRecord = (data) => {
    return request({
        url: '/member/tradingRecord',
        method: 'POST',
        data: data
    })
}


/** 鲸币转货款手续费
 */
export const exchangeConfig = (data) => {
    return request({
        url: '/finance/exchangeConfig',
        method: 'POST',
        data: data
    })
}

/** 鲸币转货款
 */
export const exchange = (data) => {
    return request({
        url: '/finance/exchange',
        method: 'POST',
        data: data
    })
}

/** 鲸币转货款记录
 */
export const exchangeList = (data) => {
    return request({
        url: '/finance/exchangeList',
        method: 'POST',
        data: data
    })
}


/** 提现手续费
 */
export const withdraRate = (data) => {
    return request({
        url: '/Withdrawal/getWithRate',
        method: 'POST',
        data: data
    })
}

/** 提现
 */
export const doWithout = (data) => {
    return request({
        url: '/Withdrawal/doWithout',
        method: 'POST',
        data: data
    })
}

/** 提现记录
 */
export const withdrawalList = (data) => {
    return request({
        url: '/Withdrawal/withdrawalList',
        method: 'POST',
        data: data
    })
}

// ---------------------task-----------------------------------///
/** 抢单列表
 */
export const getList = (data) => {
    return request({
        url: '/grab/getList',
        method: 'POST',
        data: data
    })
}

/** 零元购列表
 */
export const getZeroList = (data) => {
    return request({
        url: '/grab/getZeroList',
        method: 'POST',
        data: data
    })
}

/** 抢单
 */
export const userGrab = (data) => {
    return request({
        url: '/grab/userGrab',
        method: 'POST',
        data: data
    })
}

/** 抢单详情
 */
export const orderDetail = (data) => {
    return request({
        url: '/grab/orderDetail',
        method: 'POST',
        data: data
    })
}

/** 抢单-货币打标
 */
export const shopAround = (data) => {
    return request({
        url: '/grab/shopAround',
        method: 'POST',
        data: data
    })
}


/** 抢单-验证店铺
 */
export const checkStoreName = (data) => {
    return request({
        url: '/grab/checkStoreName',
        method: 'POST',
        data: data
    })
}

/** 抢单-验证关键词
 */
export const checkKeywords = (data) => {
    return request({
        url: '/grab/checkKeywords',
        method: 'POST',
        data: data
    })
}


/** 抢单-验证图片 找到宝贝
 */
export const findGoods = (data) => {
    return request({
        url: '/grab/findGoods',
        method: 'POST',
        data: data
    })
}


/** 抢单-设置浏览
 */
export const setBrowse = (data) => {
    return request({
        url: '/grab/setBrowse',
        method: 'POST',
        data: data
    })
}


/** 抢单-验证图片 付款
 */
export const confirmPay = (data) => {
    return request({
        url: '/grab/confirmPay',
        method: 'POST',
        data: data
    })
}

/** 抢单-收货评价
 */
export const toEvaluation = (data) => {
    return request({
        url: '/grab/toEvaluation',
        method: 'POST',
        data: data
    })
}

/** 抢单-收货追加评价
 */
export const toAddEvaluation = (data) => {
    return request({
        url: '/grab/toAddEvaluation',
        method: 'POST',
        data: data
    })
}

/** 抢单-收款
 */
export const confirmReceive = (data) => {
    return request({
        url: '/grab/confirmReceive',
        method: 'POST',
        data: data
    })
}


/** 抢单-关闭任务
 */
export const closeMission = (data) => {
    return request({
        url: '/grab/closeMission',
        method: 'POST',
        data: data
    })
}

/** 审号列表
 */
export const getExamineList = (data) => {
    return request({
        url: '/grab/getExamineList',
        method: 'POST',
        data: data
    })
}


/** 我的抢单列表
 */
export const orderList = (data) => {
    return request({
        url: '/grab/orderList',
        method: 'POST',
        data: data
    })
}

/** 我的审号列表
 */
export const examineOrderList = (data) => {
    return request({
        url: '/grab/examineOrderList',
        method: 'POST',
        data: data
    })
}

/** 我的审号列表 提交审核
 */
export const applicationReview = (data) => {
    return request({
        url: '/grab/applicationReview',
        method: 'POST',
        data: data
    })
}

/** 我的审号列表 审核详情
 */
export const getExamineDetail = (data) => {
    return request({
        url: '/grab/getExamineDetail',
        method: 'POST',
        data: data
    })
}

/** 商家反馈记录
 */
export const transferList = (data) => {
    return request({
        url: '/grab/transferList',
        method: 'POST',
        data: data
    })
}

/** 买家设置未反馈

 */
export const notReceive = (data) => {
    return request({
        url: '/grab/notReceive',
        method: 'POST',
        data: data
    })
}

/** 买家设置收款

 */
export const setReceive = (data) => {
    return request({
        url: '/grab/setReceive',
        method: 'POST',
        data: data
    })
}