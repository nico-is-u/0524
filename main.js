import App from './App'
import AUX_Audio from 'LOCKED.js'
import domain from 'domain.js'
 
// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
Vue.config.productionTip = false
Vue.prototype.to = domain;
Vue.prototype.api = AUX_Audio;
Vue.prototype.too = function(url, type = 'sub') {
	// 跳转
	"sub" == type && uni.navigateTo({
			url: url
		}),
		// 替换
		'reb' == type && uni.redirectTo({
			url: url
		}),
		// 返回
		'bac' == type && uni.navigateBack({
			delta: 1
		}),
		'lau' == type && uni.reLaunch({
			url: url
		}),
		// 跳转Tab
		"tab" == type && uni.switchTab({
			url: url
		})
};
Vue.prototype.loa = function(str) {
	uni.showLoading({
		title: str
	})
}
Vue.prototype.toa = function(str, i) {
	uni.showToast({
		title: str,
		icon: i == 's' ? 'success' : i == 'e' ? 'error' : 'none'
	})
}
Vue.prototype.lookImg = function(img,t='仅查看一张') {
		let imgArr = []
		if(t=='仅查看一张')
			imgArr.push(img);
		else
			imgArr.push(...img);
		uni.previewImage({
			urls: imgArr,
			current: imgArr[0]
		})
	},


	App.mpType = 'app'
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
	return {
		app
	}
}
// #endif