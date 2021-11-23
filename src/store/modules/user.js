const user = {
    getters: {
        SWIPE_TOKEN(state) {
            return state.SWIPE_TOKEN
        },
        userInfo(state) {
            return state.userInfo
        },
        noviceInfo(state) {
            return state.noviceInfo
        },
        hasComplate(state) {
            return state.hasComplate
        },
        answerRes(state) {
            return state.answerRes
        },
        onLogin(state) {
            return state.onLogin
        }
    },
    state: {
        SWIPE_TOKEN: '',
        userInfo: {},
        noviceInfo: {
            // is_examination: '0', //新手考试 0-未完成 1-已通过
            //     is_account: '0', //新手认证 0-未完成 1-已完成
            //     is_setbank: '0', //提现银行卡 0-未完成 1-已完成
            //     is_auth: '0', //	实名认证 0-未完成 1-已完成
        },
        hasComplate: false,
        onLogin: false,
        answerRes: ''
    },
    mutations: {
        // 设置token
        setToken(state, token) {
            state.SWIPE_TOKEN = token
        },
        // 设置登录后返回数据
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
        },
        // 设置首次登录
        setOnLogin(state, data) {
            state.onLogin = data
        },
        // 设置用户认证状态
        setNoviceInfo(state, data) {
            state.noviceInfo = data
            if (data.is_examination != 1 || data.is_account != 1 || data.is_setbank != 1 || data.wx_auth != 1) {
                //  data.is_auth != 1 || 身份证的放到提现
                state.hasComplate = false
            } else {
                state.hasComplate = true
            }
            console.log(state.hasComplate);
        },
        // 设置我的答案结果
        setAnswerRes(state, data) {
            state.answerRes = data
        }


    },
}

export default user