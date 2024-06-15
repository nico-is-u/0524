<template>
	<view class="page2">
		<!-- 装饰 -->
		<view class="decoration"></view>
		<!-- 标题 -->
		<view class="h1">用户注册</view>
		<!-- 表单部分 -->
		<u--form
          ref="uForm"
          :model="formData"
          :rules="formRules"
          labelPosition="top"
          :borderBottom="false"
        >
			<!-- 手机号 -->
			<u-form-item
				label="手机号"
				labelWidth="200rpx"
				prop="phone"
				:borderBottom="false"
			>
				<u--input type="number"
					v-model="formData.phone"
					placeholder="请输入手机号"
					border="none"></u--input>
			</u-form-item>

			<!-- 登录密码 -->
			<u-form-item
				label="登录密码"
				labelWidth="200rpx"
				prop="password"
				:borderBottom="false"
			>
				<u--input
					type="password"
					v-model="formData.password"
					placeholder="请输入登录密码"
					border="none"></u--input>
			</u-form-item>

			<!-- 重复登录密码 -->
			<u-form-item
				label="重复登录密码"
				labelWidth="200rpx"
				prop="re_password"
				:borderBottom="false"
			>
				<u--input
					type="password"
					v-model="formData.re_password"
					placeholder="请输入登录密码"
					border="none"></u--input>
			</u-form-item>

			<!-- 图形验证码 -->
			<u-form-item
				label="验证码"
				labelWidth="200rpx"
				prop="captcha"
				:borderBottom="false"
			>
				<u--input
					v-model="formData.captcha"
					placeholder="请输入验证码"
					border="none">
					<!-- 验证码插件 -->
					<image v-if="captchaImage" @click="getCaptchaImg" :src="captchaImage" style="width: 200rpx;" mode="widthFix" slot="suffix"></image>
				</u--input>

			</u-form-item>

			<!-- 邀请码 -->
			<u-form-item
				label="邀请码"
				labelWidth="200rpx"
				prop="invite_code"
				:borderBottom="false"
			>
				<u--input
					v-model="formData.invite_code"
					placeholder="请输入邀请码"
					border="none"></u--input>
			</u-form-item>

			<!-- 提交按钮 -->
			<u-button class="n-button" style="margin-top: 64rpx"  iconColor="#fff" text="注册" :loading="isLoading" @click="checkForm" :loadingText="regStatus"></u-button>

			<view class="tips-row flex flex-x-center">
				<view class="font-gray">已经有账号？</view>
				<view class="font-blue" @click="too('/pages/system-page/login')">去登录</view>
			</view>
			
		</u--form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				apiUrl:'',
				captchaImage:'',				// 图形验证码 图片
				isLoading:false,				// 请求等待
				regStatus: '正在注册...',		 // loading text
				formData:{
					phone:'',
					password:'',
					re_password:'',
					invite_code:'',
					captcha:'',				// 图形验证码 键值
					uniqid:''
				},
				formRules:{
					phone:[{
						required: true,
           			 	message: '请输入手机号',
					}],
					password:[{
						required: true,
           			 	message: '请输入登录密码',
					}],
					re_password:[{
						required: true,
						message: '请重复输入登录密码'
					}],
					captcha:[{
						required: true,
						message: '请输入验证码'
					}]
				}
			}
		},
		onLoad(option) {
			// 填入邀请码
		},
		methods: {
			// 拉取图形验证码
			async getCaptchaImg(){
				this.captchaImage = ''
				try{
					const response = await this.to.www(this.api.system_captcha)
					const {image,uniqid} = response.data
					if(image && uniqid)	{
						this.captchaImage = image
						this.formData.uniqid = uniqid
					}
				}catch(e){}
			},
			/* 表单验证 */
			async checkForm(){
				this.$refs.uForm.validate().then(res => {
					/* 发送请求 */
					this.goRequest()
				}).catch(()=>null)
			},
			/* 发送请求 */
			async goRequest(){
				this.isLoading = true
				try{
					const response = await this.to.www(this.api.user_register, this.formData,'p')
				
					/* 注册成功 */
					const {code = 0,data:resData = {}} = response
					if(code == 200){
						const _this = this
						this.regStatus = '正在登录...'
						uni.setStorage({
							data: resData.token,
							key: "TK",
							success() {
								setTimeout(() => {
									_this.regStatus = '登录成功'
									setTimeout(() => {
										_this.isLoading = false
										uni.removeStorageSync('user_info')
										_this.too('/', 'lau')
									}, 300)
								}, 1000)
							}
						})

					}else{
						/* 重新拉取验证码 */
						this.getCaptchaImg()
						this.isLoading = false
					}

				}catch(e){
					this.getCaptchaImg()
					this.isLoading = false
				}
				
			}
		},
		mounted(){
			const apiUrl = uni.getStorageSync('ok_api') || ''
			this.apiUrl = apiUrl
			this.getCaptchaImg()
		}
	}
</script>

<style lang="scss" scoped>
page{
	height: 100%;
}
</style>