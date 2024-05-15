<template>
	<view class="calendar-box">
		<view class="box">
			<view class="item">
				<view class="ll'">
					<text class="tt">可提余额：</text>
					<text class="mm">{{user_info.team_bonus_balance}}￥</text>
				</view>
				<text class="btn" @click="too('/pages/home-page/gf_draw')">提现</text>
			</view>
			<view class="item">
				<view class="ll'">
					<text class="tt">可用余额：</text>
					<text class="mm">{{user_info.topup_balance}}￥</text>
				</view>
				<text class="btn" @click="too('/pages/home-page/gf_tr-money')">转账</text>
			</view>
			<view class="item">
				<view class="ll'">
					<text class="tt">签到余额：</text>
					<text class="mm">{{user_info.signin_balance}}￥</text>
				</view>
				<!-- <text class="btn" @click="too('/pages/home-page/gf_tr-money')">转账</text> -->
			</view>
			<!-- <view class="item">
				<view class="ll'">
					<text class="tt">账户余额：</text>
					<text class="mm">0.00￥</text>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_info: {}
			};
		},
		onLoad() {
			let user_info = uni.getStorageSync("user_info");
			this.user_info = user_info;
		}
	}
</script>

<style lang="scss">
	.calendar-box {
		padding: 30rpx 40rpx;
		height: 100vh;
		background-color: #f6f9ff;

		.box {
			border: 2rpx solid #d8dbe0;
			border-radius: 20rpx;
			padding: 10rpx 20rpx;

			.item {
				margin: 15rpx 0;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.tt {
					display: block;
				}

				.mm {
					display: block;
					font-weight: bold;
					color: #f15222;
				}

				.btn {
					background-color: $th;
					color: #FFF;
					padding: 5rpx 30rpx;
					border-radius: 10rpx;
				}

			}
		}
	}
</style>