<template>
	<view class="container page3">

		<!-- 顶栏 -->
		<view class="page-navbar">
			<nNavbar title="人民币充值" :showBackBtn="true" :back="true"></nNavbar>
		</view>

		<view class="form">
			<view>请输入金额</view>
			<view>
				<text style="font-weight: bold;font-size: 26px;margin-right: 10px;">¥</text>
				<u--input type="number" v-model="money" border="none"></u--input>
			</view>
			<view>线上充值使用网页版关闭WIFI进行充值</view>
		</view>
		<view class="pay-content">
			<view class="pay-title">请选择充值方式</view>
			<u-radio-group v-model="currentpay" placement="column" @change="groupChange">
				<view class="select-item" v-for="(item,index) in channelList" :class="{active: currentpay == index}" @click="groupChange(index)">
					<view class="tb-header">
						<view style="display: flex;align-items: center;width: 50vw;">
							<image :src="domain+item.img" style="width: 20px;margin-right: 8px;" mode="widthFix"></image>
							{{item.name + "（" + item.single_topup_min_amount + "-" + item.single_topup_max_amount + "）"}}
						</view>
						</view>
					<u-radio :name="index"></u-radio>
				</view>
			</u-radio-group>
		</view>

		<view class="pay-content" v-if="payItemObj.channel == 0">
			<view class="pay-title">请确认充值信息</view>
			<view class="pay-info-list" style="margin-top: 30rpx;">
				<u--form labelPosition="top" v-if="payItemObj.card_info">
					<u-form-item
						label="收款卡号"
						labelWidth="220rpx">
						<u--input
							disabled
							v-model="payItemObj.card_info.card_number"
							border="none">

							<!-- 点击复制 -->
							<u--text
								color="#838282"
								text="复制"
								@click="toCopy(payItemObj.card_info.card_number)"
								slot="suffix"
							></u--text>
							
						</u--input>
					</u-form-item>

					<u-form-item
						label="收款银行"
						labelWidth="220rpx">
						<u--input
							disabled
							v-model="payItemObj.card_info.bank_name"
							border="none">

							<!-- 点击复制 -->
							<u--text
								color="#838282"
								text="复制"
								@click="toCopy(payItemObj.card_info.bank_name)"
								slot="suffix"
							></u--text>

						</u--input>
					</u-form-item>

					<u-form-item
						label="收款姓名"
						labelWidth="220rpx">
						<u--input
							disabled
							v-model="payItemObj.card_info.realname"
							border="none">

							<!-- 点击复制 -->
							<u--text
								color="#838282"
								text="复制"
								@click="toCopy(payItemObj.card_info.realname)"
								slot="suffix"
							></u--text>

						</u--input>
					</u-form-item>

				</u--form>
			</view>
		</view>

		<view class="pay-content" v-if="payItemObj.channel == 0">

			<u--form labelPosition="top">
				<u-form-item
					label="付款人姓名"
					labelWidth="220rpx">
					<u--input
						v-model="formData.uname"
						placeholder="请输入付款人姓名"
						border="none">
					</u--input>
				</u-form-item>

				<u-form-item
					label="请选择上传凭证"
					labelWidth="300rpx"
				>
					<view class="n-upload-box flex flex-column flex-y-center" style="margin-top: 40rpx" @click="upload">
						<template v-if="formData.pay_voucher_img_url == ''">
							<u-icon size="24px" color="#ababab" name="plus"></u-icon>
							<view class="flex flex-x-center margin-t-25">
								<u--text text="请上传您的凭证" color="#ababab"></u--text>
							</view>
						</template>
						<image v-else :src="formData.pay_voucher_img_url" style="width: 100%;" mode="widthFix"></image>
					</view>
				</u-form-item>
			</u--form>

		</view>


		<view class="btn" @click="buy">充值</view>

		<!-- 加载动画 -->
		<u-loading-page :loading="isLoading" :loading-text="regStatus"></u-loading-page>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				domain: "",
				TK:"",

				money: '',
				channelList: [],
				currentpay: 0,

				formData:{
					uname:'',
					pay_voucher_img_url:'',
				},

				isLoading:false,
				regStatus:'处理中',
				
			};
		},
		computed:{
			/* 当前选中项 */
			payItemObj(){

				let result = {
					channel:-1
				}

				if(Array.isArray(this.channelList) && this.channelList.length){
					return this.channelList[this.currentpay]
				}
				return result
			}
		},
		methods: {
			groupChange(e){
				this.currentpay = e;
				console.log(this.payItemObj)
			},

			upload(){
				let that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
					success: function (res) {
						uni.showLoading();

						uni.uploadFile({
							url: `${that.domain}` + `/common/uploadFile`,
							filePath:res.tempFilePaths[0],
							header: {token: that.TK},
							name: 'file',
							success: (res) => {
								let {data:resData} = res
								if(resData){
									resData = JSON.parse(resData)

									that.toa('上传成功')

									that.formData.pay_voucher_img_url = resData.data.url || ''
									uni.hideLoading()

								}


							},
							fail:(err) => {
								console.log(err)
								uni.hideLoading()
							}
						})

					}
				});
			},

			toCopy(val){
				uni.setClipboardData({
					data: val
				})
			},

			buy(){
				let parms = {
					amount: this.money,
					pay_channel: this.payItemObj.channel,
					payment_config_id: this.payItemObj.id,
					is_usdt: 0
				}

				/* 表单判断 */
				if(this.money>Number(this.payItemObj.single_topup_max_amount)) return this.toa('最高限额'+this.payItemObj.single_topup_max_amount);
				if(this.money<Number(this.payItemObj.single_topup_min_amount)) return this.toa('最低限额'+this.payItemObj.single_topup_min_amount);


				/* 如果是银行卡 */
				if(this.payItemObj.channel == 0){
					if(!this.formData.uname){
						this.toa('请输入付款人姓名')
						return
					}
					else if(!this.formData.pay_voucher_img_url){
						this.toa('请上传您的凭证')
						return
					}else{
						parms = {
							...parms,
							...this.formData
						}
					}
				}

				console.log(parms)

				/* 打开等待 */
				this.isLoading = true
				this.to.www(this.api.topup, parms, 'p')
					.then(res => {
						this.isLoading = false
						const result = res.data.data || ''

						if(result){
							this.webOpen(result)
						}else{
							/* 如果是银行卡通道 */
							if(this.payItemObj.channel == 0){

								setTimeout(() => {
									this.toa('提交成功')
								},250)
								this.too('/','bac')
								
							}else{
								this.toa('网络错误,请稍后重试')
							}
						}

					})
					.catch(e => {
						this.isLoading = false
					})


				// setTimeout(() => {
				// 	this.isDone = false;
				// }, 3000)
			}
		},
		onLoad() {
			this.domain = uni.getStorageSync("ok_api")
			this.TK = uni.getStorageSync("TK")

			this.to.www(this.api.payChannelList).then(res => {
				this.channelList = res.data;
			})
		}
	}
</script>

<style lang="scss">
	.btn{
		margin-top: 20px;
		background: #0182EF;
		border-radius: 6px 6px 6px 6px;
		padding: 15px 0;
		text-align: center;
		font-size: 15px;
		color: #fff;
	}
	.pay-content{
		background: #fff;
		padding: 20px;
		position: relative;
		padding-bottom: 40px;
		border-radius: 20px;
		margin-top: 20px;
		.pay-title{
			font-size: 16px;
		}
	}
	.select-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 4px;
		border: 1px solid #FFFFFF;
		padding: 15px 0;
		.tb-header{
			display: flex;
			font-size: 13px;
			flex: 6;
			>view{
				&:nth-child(1){
					width: 120px;
					text-align: left;
				}
				&:nth-child(2){
					width: 60px;
				}
			}
		}
	}
	.select-item + .select-item{
		border-top: 1px solid #d9d9d9;
	}
	.form{
		background: #fff;
		padding: 10px 20px;
		border-radius: 20px;
		>view{
			&:nth-child(1){
				color: #ABABAB;
				padding-bottom: 10px;
			}
			&:nth-child(2){
				border-bottom: 1px solid #d9d9d9;
				display: flex;
				padding-bottom: 5px;
			}
			&:nth-child(3){
				color: #FD2842;
				padding-top: 10px;
				font-size: 14px;
			}
		}
	}
	.container{
		padding: 20px;
		background: #F9F9F9;
		min-height: calc(100vh - 44px);
	}
</style>
