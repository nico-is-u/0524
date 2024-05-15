<script>
	import CryptoJS from 'crypto-js'
	import AUX_Audio from 'LOCKED.js'
	const customUnlock_k = AUX_Audio.fewagfagretgataGRGvreawdwafewaf
	function decryptCBC(word, keyStr, ivStr) {
		keyStr = keyStr ? keyStr : customUnlock_k;
		ivStr = ivStr ? ivStr : customUnlock_k;
		var key = CryptoJS.enc.Utf8.parse(keyStr);
		let iv = CryptoJS.enc.Utf8.parse(ivStr);
		var decrypt = CryptoJS.AES.decrypt(word, key, {
			iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
		});
		return decrypt.toString(CryptoJS.enc.Utf8);
	}
	export default {
		unch: function() {
			var api = uni.getStorageSync("ok_api");
			if (api) {
				uni.request({
					url: api + decryptCBC(this.api.api_test),
					method: "POST",
					data: {
						auth: '******',
						Unlock: '******',
						verify: '******'
					},
					success: (res) => {
						// let parseRes = res.data.data.test;
						// console.log(parseRes);
						let parseRes;
						try {
							parseRes = JSON.parse(decryptCBC(res.data.c)).data.test;
						} catch (e) {
							parseRes = {
								code: -1,
								msg: '200'
							}
						}
						if (parseRes) {
							// console.log('[API Success] The server is connected properly.');
						} else {
							uni.clearStorage();
							uni.reLaunch({
								url: '/pages/system-page/gf_login'
							})
						}
					},
					fail: (err) => {
						// console.log('[API Error] Reacquire interface.');
						uni.clearStorage();
						uni.reLaunch({
							url: '/pages/system-page/gf_login'
						})
					}
				})
			}
		},
		onShow: function() {},
		onHide: function() {}
	}
</script>

<style lang="scss">
	@import "@/uni_modules/uview-ui/index.scss";

	.uni-body::before {
		content: "";
		width: 100%;
		height: 35px;
		display: block;
		background-color: #B80606;
	}

	.uni-body::after {
		content: "";
		width: 100%;
		display: block;
		height: 35px;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 888;
		background-color: #B80606;
	}

	page {
		background-color: #FFFFFF !important;
	}
</style>