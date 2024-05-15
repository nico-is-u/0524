<template>
	<view>
		<view class="the_page_cus">
			<image class="banner" src="../../static/images/home/customer.jpg" mode="widthFix"></image>
			<view class="tab">
				<view>
					<view class="t1">在线客服</view>
					<view class="t2">08:00~22:00</view>
				</view>
				<view>
					<view class="t1">常见问题</view>
					<view class="t2">更多常见问题参阅</view>
				</view>
			</view>
			<text class="page_title">常见问题</text>

			<template>
				<view class="q_list">
					<u-collapse :border="false" accordion>
						<u-collapse-item :title="item.title" v-for="(item,index) in eqList" :key="index">
							<u-parse :content="item.content" :tagStyle="style"></u-parse>
						</u-collapse-item>
					</u-collapse>
				</view>
				<u-button color="linear-gradient(to right, #B80606, rgb(216, 68, 68))" iconColor="#fff"
					class="custom-style" text="在线客服"></u-button>
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				eqList:[],
				style: {
					img:'width:100%;margin:10px 0'
				}
			};
		},
		onLoad() {
			this.to.www(this.api.system_news,{type:'12'},'p')
				.then(res => {
					this.eqList = res.data.data;
				})
		},
	}
</script>

<style lang="scss" scoped>
	.custom-style{
		width: 60%;
		margin: 40rpx auto;
	}
	.q_list {
		background-color: #F4F4F4;
		margin-top: 30rpx;
		height: 460rpx;
		overflow-y: scroll;
	}

	.page_title {
		color: $th;
		font-weight: bold;
		margin-bottom: 20rpx;
	}

	.the_page_cus {
		padding: 20rpx;

		.banner {
			width: 100%;
			border-radius: 8rpx;
		}

		.tab {
			background-color: #F4F4F4;
			margin: 25rpx auto;
			border-radius: 10rpx;
			display: flex;
			justify-content: space-between;
			padding: 20rpx 30rpx;
			box-sizing: border-box;
			font-size: 30rpx;
			text-align: center;

			.t1 {
				font-weight: bold;
				color: #333;
				margin-bottom: 10rpx;
			}

			.t2 {
				color: #666;
			}
		}
	}
</style>