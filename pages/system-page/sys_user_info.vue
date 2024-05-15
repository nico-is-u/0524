<template>
	<view>
		<view class="ser_list">
			<view class="item">
				<u--text text="姓名"></u--text>
				<u--text align="right" size="14px" color="#999" :text="userInfo.realname"></u--text>
			</view>
			<view class="item">
				<u--text text="手机号"></u--text>
				<u--text align="right" size="14px" color="#999" :text="userInfo.phone"></u--text>
			</view>
			<view class="item">
				<u--text text="身份证号码"></u--text>
				<u--text align="right" size="14px" color="#999" :text="userInfo.ic_number"></u--text>
			</view>
			<!-- 	<view class="item">
				<u--text text="注册日期"></u--text>
				<u--text align="right" size="14px" color="#999" :text="userInfo.created_at"></u--text>
			</view>
			<view class="item">
				<u--text text="邀请码"></u--text>
				<u--text align="right" size="14px" color="#999" :text="userInfo.invite_code"></u--text>
			</view>
			<view class="item">
				<u--text text="登记等级"></u--text>
				<u--text align="right" size="14px" color="#999" :text="userInfo.level_text"></u--text>
			</view>
			<view class="item">
				<u--text text="登记总资产"></u--text>
				<u--text mode="price" align="right" size="14px" :text="userInfo.balance" color="#999" ></u--text>
			</view> -->
			<view class="item">
				<u--text text="联系QQ"></u--text>
				<input type="number" maxlength="15" class="sgazyhjud" placeholder="修改QQ号码" v-model="userInfo.qq" />
			</view>

			<view class="item">
				<u--text text="收货地址"></u--text>
				<input type="text" class="sgazyhjud" placeholder="修改收货地址" v-model="userInfo.address" />
			</view>
			
			<view class="item">
				<u--text text="户籍地址"></u--text>
				<!-- <u--text align="right" size="14px" color="#999" :text="userInfo.now_address"></u--text> -->
				<input type="text" class="sgazyhjud" placeholder="修改户籍地址" v-model="userInfo.now_address" />
			</view>

			<u-button color="linear-gradient(to right, #B80606, rgb(216, 68, 68))" iconColor="#fff" class="custom-style"
				v-if="userInfo.ic_number==''" text="请先完成实名认证"
				@click="too('/pages/system-page/gf_real-name_auth?v='+userInfo.is_set_pay_password)"></u-button>

			<u-button color="linear-gradient(to right, #B80606, rgb(216, 68, 68))" iconColor="#fff" class="custom-style"
				text="保存" @click="saveAddress"></u-button>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					address:'',
					qq:'',
					now_address:'-'
				}
			};
		},
		onLoad() {
			let user_info = uni.getStorageSync("user_info");
			this.userInfo = user_info;
		},
		methods: {
			saveAddress() {
				this.to.www(this.api.qq_address, this.userInfo, 'p')
					.then(res => {
						this.toa('已更新')
						this.to.www(this.api.user_info)
							.then(res => {
								this.userInfo = res.data;
								uni.setStorage({
									data: res.data,
									key: 'user_info'
								});
								uni.setStorage({
									data: 'first-launch',
									key: "use-page-type"
								})
							})
					})
			}
		}
	}
</script>

<style lang="scss">
	.custom-style {
		margin: 40rpx auto;
	}

	.ser_list {
		background-color: #fff;
		border-radius: 10rpx;
		padding: 20rpx 40rpx;

		.sgazyhjud {
			text-align: right;
		}

		.item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 3rpx solid #f9f9f9;
			padding: 35rpx 0;
		}
	}
</style>