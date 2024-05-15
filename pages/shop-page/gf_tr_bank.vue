<template>
	<view class="content-class_tr">
		<view class="info">
			<view class="t1"> <text>￥</text> {{Number(parm.amount).toFixed(2)}}</view>
			<view class="t2">转账金额</view>
		</view>
		<u--text prefixIcon="coupon-fill" iconStyle="font-size: 34rpx;margin-top:6rpx;margin-right:8rpx" size="14"
			text="请确认转账信息"></u--text>
		<view class="leet" style="margin: 30rpx auto;">
			<view class="t1">收款人</view>
			<view class="t2">{{parm.realname}}</view>
			<view class="t3" @click="copys(parm.realname)">复制</view>
		</view>
		<view class="leet">
			<view class="t1">银行账号</view>
			<view class="t2">{{parm.card_number}}</view>
			<view class="t3" @click="copys(parm.card_number)">复制</view>
		</view>
		<view class="leet">
			<view class="t1">开户行</view>
			<view class="t2">{{parm.bank_name}}</view>
			<view class="t3" @click="copys(parm.bank_name)">复制</view>
		</view>
		<view class="leet">
			<view class="t1">开户支行</view>
			<view class="t2">{{parm.bank_branch}}</view>
			<view class="t3" @click="copys(parm.bank_branch)">复制</view>
		</view>
		<u--text prefixIcon="coupon-fill" iconStyle="font-size: 34rpx;margin-top:6rpx;margin-right:8rpx" size="14"
			text="请输入转账人姓名"></u--text>
		<input type="text" maxlength="8" class="t-unama" placeholder="转账人姓名" v-model="uname"/>
		<u--text prefixIcon="coupon-fill" iconStyle="font-size: 34rpx;margin-top:6rpx;margin-right:8rpx" size="14"
			text="请上传转账凭证截图"></u--text>
		<view style="margin-top: 30rpx;">
			<view class="img_url" @click="select_img">
				<image :src="pay_img" mode="widthFix" style="width: 100%;height: 1rem;"></image>
			</view>
		</view>
		<u-button color="linear-gradient(to right, #B80606, rgb(216, 68, 68))" iconColor="#fff" class="custom-style"
			text="确认提交" :loading="isDone" @click="doBuy" loadingText="请稍等"></u-button>
	</view>
</template>

<script>
	import * as qiniu from 'qiniu-js'
	import qiniuUploader from '@/util/qiniuUploader.js'
	export default {
		data() {
			return {
				parm: {},
				pay_img: "",
				isDone: false,
				uname:''
			};
		},
		onLoad() {
			const PARMDATA = uni.getStorageSync("TRBANK");
			if (PARMDATA)
				this.parm = PARMDATA;
			else
				this.too("/", "tab")
		},
		methods: {
			copys(wc){
				uni.setClipboardData({
					data:wc
				})
			},
			select_img() {
				let _ = this;
				let qiniutk = ""
				this.to.www(this.api.qiniutoken)
					.then(res => {
						qiniutk = res.data.upToken;
						uni.chooseImage({
							count: 1,
							sizeType: ['compressed'],
							success(chooseRes) {
								_.loa('正在上传中...')
								// _.pay_img = chooseRes.tempFilePaths[0]
								let file = chooseRes.tempFiles[0]
								let key = new Date().getTime() + Math.random(1000)
								console.log(key);
								qiniuUploader.upload(file.path, (res) => {
									_.pay_img = res.fileURL
									uni.showModal({
										title:'提示',
										content:'图片已上传完成，确认转账信息正确即可确认提交。',
										confirmColor:"#BD1010",
										showCancel:false
									})
									// console.log(res.fileURL);
									uni.hideLoading()
								}, (error) => {
									console.log('error: ' + error);
								}, {
									region: 'ASG', //服务器区域号
									domain: 'https://gf.yjtno.com', //七牛云域名
									key: key, // 上传到七牛云图片就是这路径
									uptoken: qiniutk, // 由其他程序生成七牛 uptoken 
								}, (res) => {
									// console.log('上传进度', res.progress)
									// console.log('已经上传的数据长度', res.totalBytesSent)
									// console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
								}, (res) => {
									// 取消上传
								}, (res) => {
									// `before` 上传前执行的操作
								}, (err) => {
									// `complete` 上传接受后执行的操作(无论成功还是失败都执行)
								});
								
								// uni.uploadFile({
								// 	url: domain + 'common/uploadFile',
								// 	filePath: chooseRes.tempFilePaths[0],
								// 	name: 'file',
								// 	success(res) {
								// 		let data;
								// 		try {
								// 			data = JSON.parse(res.data).data.url;
								// 			_.pay_img = data;
								// 			uni.hideLoading()
								// 			_.toa("上传成功")
								// 		} catch (e) {
								// 			_.toa("上传失败")
								// 		}
								// 		uni.hideLoading()
								// 	},
								// 	fail(err) {
								// 		_.toa("上传失败，网络错误")
								// 	}
								// })
							}
						})
					})
			},
			doBuy() {
				if (this.pay_img === '') return this.toa('请上传转账凭证截图')
				if (!this.uname) return this.toa('请输入转账人姓名')
				this.isDone = true;
				this.to.www(this.api.user_top_up, {
						...this.parm,
						uname:this.uname,
						pay_voucher_img_url: this.pay_img
					}, 'p')
					.then(res => {
						this.toa("提交成功，请等待审核");
						uni.removeStorageSync("TRBANK")
						setTimeout(() => {
							this.isDone = false;
							uni.reLaunch({
								url: "/pages/index/index"
							})
						}, 1500)
					})
				setTimeout(() => {
					this.isDone = false;
				}, 3000)
			}
		}
	}
</script>

<style lang="scss">
	.content-class_tr {
		padding: 40rpx 50rpx;

		.custom-style {

			margin: 60rpx auto 120rpx;
		}
		.t-unama{
			border: 2rpx solid #eee;
			border-radius: 8rpx;
			margin: 30rpx 0;
			height: 70rpx;
			list-style: 70rpx;
			padding: 0 20rpx;
		}
		.img_url {
			border: 4rpx dashed $th;
			border-radius: 10rpx;
			width: 100%;
			min-height: 300rpx;
			position: relative;
			box-sizing: border-box;
			background-size: 100%;
			background-repeat: no-repeat;

			&::before {
				content: "+";
				font-size: 150rpx;
				color: #c4c4c4;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}

		.info {
			text-align: center;
			margin: 20rpx auto 50rpx;

			.t1 {
				color: $th;
				font-size: 60rpx
			}

			.t2 {
				color: #324870;
				font-size: 40rpx;
			}
		}

		.leet {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 30rpx;
			border-bottom: 1rpx solid #eee;
			padding-bottom: 10rpx;

			.t1 {
				width: 5rem;
				text-align: justify;
				text-align-last: justify;
				color: #232432;
				font-weight: bold;
			}

			.t2 {
				color: #324870;
			}

			.t3 {
				width: 3rem;
				text-align: center;
				color: #fff;
				background-color: $th;
				border-radius: 8rpx;
				height: 60rpx;
				line-height: 60rpx;
			}
		}
	}
</style>