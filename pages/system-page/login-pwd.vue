<template>
	<view class="page2">
		<!-- 装饰 -->
		<view class="decoration"></view>
		<!-- 标题 -->
		<view class="h1">忘记密码</view>

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

			<!-- 旧登录密码 -->
			<u-form-item
				label="旧登录密码"
				labelWidth="200rpx"
				prop="old_password"
				:borderBottom="false"
			>
				<u--input
					type="password"
					v-model="formData.old_password"
					placeholder="请输入旧登录密码"
					border="none"></u--input>
			</u-form-item>

			<!-- 新登录密码 -->
			<u-form-item
				label="新登录密码"
				labelWidth="200rpx"
				prop="new_password"
				:borderBottom="false"
			>
				<u--input
					type="password"
					v-model="formData.old_password"
					placeholder="请输入新登录密码"
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

			<!-- 提交按钮 -->
			<u-button class="n-button" style="margin-top: 64rpx"  iconColor="#fff" text="提交" :loading="isLoading" @click="checkForm" :loadingText="regStatus"></u-button>

			<view class="tips-row flex flex-x-center">
				<view class="font-blue" @click="too('/pages/system-page/login')">返回登录</view>
			</view>

		</u--form>

	</view>
</template>

<script>
	export default {
		data(){
			return {
				apiUrl:'',
				captchaImage:'',				// 图形验证码 图片
				isLoading:false,				// 请求等待
				regStatus: '正在请求...',		 // loading text
		
				formData:{
					phone:'',
					old_password:'',
					new_password:'',
					captcha:'',				// 图形验证码 键值
					uniqid:''
				},
				formRules:{
					phone:[{
						required: true,
						message: '请输入手机号',
					}],
					old_password:[{
						required: true,
						message: '请输入旧登录密码',
					}],
					new_password:[{
						required: true,
						message: '请输入新登录密码',
					}],
					captcha:[{
						required: true,
						message: '请输入验证码'
					}]
				},
			}
		},
		methods:{
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
					const response = await this.to.www(this.api.user_paypwd, {
						...this.formData,
						type:1
					}
					,'p')
				
					/* 注册成功 */
					const {code = 0,data:resData = {}} = response
					if(code == 200){
						const _this = this
						this.toa('已设置新的支付密码')
						uni.setStorage({
							data: 'need-reload-page',
							key: "use-page-type",
							success() {
								setTimeout(() => {
									_this.too('/pages/index/my', 'tab')
								}, 1500)
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