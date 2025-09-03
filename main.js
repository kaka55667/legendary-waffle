import App from './App'
import { http } from './utils/http'
//import VConsole from 'vconsole' // 引入 vConsole 插件
//new VConsole(); // 初始化，启动 vConsole 插件，可在手机上调试 Vie


let ossUrl = "https://api.v1.nnkj77.com/static/images/wechat"


const GetUID = function (){
	
	//6e53e3232d876c4f9f95b3da54715ba7
	//return '[6e53e3232d876c4f9f95b3da54715ba7]';
	return uni.getStorageSync('MyLcsxUid') || '[6e53e3232d876c4f9f95b3da54715ba7]';
	
}

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.ossUrl = ossUrl
Vue.prototype.$MyLcsxUid = GetUID
Vue.prototype.$http = http
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	uni.ossUrl = ossUrl
	app.config.globalProperties.$MyLcsxUid = GetUID
	app.config.globalProperties.$http = http;
	return {
		app
	}
}
// #endif