<template>
	<view class="t3_page">
		<view class="box" v-for="(item,index) in 1" :key="index">
			<view class="item mmm">
				<text class="lll">提现金额</text>
				<text class="rrr">+32432.00元</text>
			</view>
			<view class="item">
				<text class="lll">个人信息认证</text>
				<text class="rrr">已完成</text>
			</view>
			<view class="item">
				<text class="lll">商城收益结算</text>
				<text class="rrr">已完成</text>
			</view>
			<view class="item">
				<text class="lll">数字货币转换</text>
				<text class="rrr">已完成</text>
			</view>
			<view class="item">
				<text class="lll">人民银行审核</text>
				<text class="rrr">已完成</text>
			</view>
			<view class="item">
				<text class="lll">财务部门打款</text>
				<text class="rrr">已完成</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.t3_page {
		padding: 35rpx;

		.box {
			border-bottom: 2rpx solid #d5d5d5;
			padding: 50rpx 30rpx;
			.item {
				line-height: 2.2rem;
				border-bottom: 2rpx solid #d5d5d5;
				display: flex;
				justify-content: space-between;
				&.mmm .lll{
					font-size: 34rpx !important;
				}
				.lll{font-size: 30rpx;font-weight: 550;}
				.rrr{
					color: #14929d;
				}
				
			}
		}
	}
</style>