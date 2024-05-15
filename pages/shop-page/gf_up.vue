<template>
	<view>
		<view class="top_tab_nav">
			<view class="page_title_tab">
				<text :class="['title',type?'cur':'']" @click="type=true">提高额度</text>
				<text :class="['title',type?'':'cur']" @click="type=false">提高记录</text>
			</view>
		</view>
		<!-- 激活钱包的页面 包含激活钱包和激活记录 -->
		<template v-if="type">
			<view class="project_box">
				<view class="project_item" v-for="(item,index) in 10" :key="index">
					<view class="p_title">
						<text>提高银行卡当日累计交易金额额度</text>
						<u-button class="bybtn" type="error" size="small" text="立即提高"></u-button>
					</view>
					<view class="p_box">
						<view class="bg_box">
							<view class="p_p">
								<text>500元</text>
							</view>
							<view class="t1">提交<text>500</text>元激活金</view>
							<view class="t1">获得终身免费使用数字人民币钱包资格，马上可以使用数字人民币钱包提现功能，激活后<text>500</text>元自动退回数字人民币钱包</view>
							<view class="t1">总名额<text>200000</text>名</view>
							<view class="t1">剩余名额<text>34688</text>名</view>
						</view>
						<u--text text="当前申请进度" customStyle="margin:10px 0"></u--text>
						<u-line-progress :percentage="30" height="18" activeColor="#B80606"></u-line-progress>
					</view>
				</view>
			</view>
		</template>

		<template v-else>
			<view class="project_box">

			</view>
		</template>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: true,
			};
		},
		methods: {

		}

	}
</script>

<style lang="scss">
	.top_tab_nav {
		position: sticky;
		top: 0;
		z-index: 1000;
	}

	.project_box {
		padding: 20rpx 30rpx;

		.project_item {
			margin-bottom: 40rpx;
			border-radius: 8rpx;
			padding: 20rpx;
			box-shadow: 4rpx 4rpx 10rpx 2rpx rgba(33, 46, 104, 0.2);

			.p_title {
				display: flex;
				justify-content: space-between;
				align-items: center;

				text {
					width: 40%;
					font-size: 28rpx
				}

				.bybtn {
					width: 6rem;
					margin: 0;
				}
			}

			.p_box {
				padding: 15rpx;
				border-radius: 6rpx;
				box-sizing: border-box;

				.bg_box {
					padding-bottom: 30rpx;
					background-color: #F1EDEC;
					.p_p {
						display: flex;
						justify-content: center;
						border-radius: 10rpx 10rpx 0 0;
						height: 85rpx;
						align-items: center;
						background-color: $th;
						color: #fff;
						text-align: center;
					}

					.t1 {
						padding:10rpx 20rpx;
						box-sizing: border-box;
						line-height: 42rpx;
						letter-spacing: 3rpx;
						text{
							font-weight: bold;
							color: $th;
							font-size: 30rpx;
						}
					}
				}

			}
		}

	}

	.page_title_tab {
		background-color: $th;
		height: 120rpx;
		color: #fff;
		display: flex;
		justify-content: space-around;
		align-items: center;

		.title {
			opacity: .7;
			font-size: 30rpx;
			transition: all .3s;
			position: relative;
			display: block;
			width: 50%;
			text-align: center;
		}

		.title::before {
			content: '';
			position: absolute;
			left: 25%;
			bottom: -15rpx;
			width: 0;
			transition: all .3s;
			height: 4rpx;
			background-color: #fff;
		}

		.cur {
			opacity: 1;
			font-size: 40rpx;
		}

		.title.cur::before {
			width: 50%;
		}
	}
</style>