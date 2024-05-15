<template>
	<view class="t3_page">
		<view class="box">
			<view class="item mmm">
				<text class="lll">提现金额</text>
				<text class="rrr">{{mm}}元</text>
			</view>
			<view class="item" v-for="(item,index) in listy" :key="index">
				<text class="lll">{{item.name}}</text>
				<text class="rrr">{{item.status}}</text>
			</view>
		</view>
		<view class="bbb" @click="tooBack">确认</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mm:"",
				listy: []
			};
		},
		onLoad(opt) {
			if (opt.id) {
				this.mm = Math.abs(opt.m);
				this.to.www(this.api.encylistsi, {
						id: opt.id
					})
					.then(res => {
						this.listy = res.data;
					})
			}
		},
		methods:{
			tooBack(){
				uni.navigateBack({
					delta:2
				})
			}
		}
	}
</script>

<style lang="scss">
	.t3_page {
		padding: 35rpx;
		.bbb{
			background-color: $th;
			color: #fff;
			border-radius: 15rpx;
			text-align: center;
			margin: 30rpx auto;
			width: 220rpx;
			line-height: 65rpx;
		}
		.box {
			padding: 50rpx 30rpx;

			.item {
				line-height: 2.5rem;
				border-bottom: 2rpx solid #d5d5d5;
				display: flex;
				justify-content: space-between;

				&.mmm .lll {
					font-size: 34rpx !important;
				}

				.lll {
					font-size: 28rpx;
					font-weight: 550;
				}

				.rrr {
					color: #14929d;
				}

			}
		}
	}
</style>