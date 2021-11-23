import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible';
import './plugins/vant.js'
import util from './utils'
import appConfig from '@/config'
import VueClipboard from 'vue-clipboard2'


Vue.use(VueClipboard)

import 'core-js/stable'
import 'regenerator-runtime/runtime'

Vue.config.productionTip = false

/* 全局配置参数 */
Vue.prototype.appConfig = appConfig
Vue.prototype.BASE_URL = appConfig.BASE_URL[process.env.VUE_APP_ENV]
    /* 工具 */
Vue.prototype.util = util

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')