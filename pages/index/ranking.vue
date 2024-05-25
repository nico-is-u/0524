<template>
	<view class="page">
		<!-- 头部 -->
		<view class="head">
			<!-- 顶栏 -->
			<nNavbar title="诺亚方舟" :showBackBtn="false"></nNavbar>
			<!-- 总资产 -->
			<view class="padding-box" style="padding: 0 40rpx">
				<view class="zichan-info">
					<view class="info-1 flex flex-y-center">
						<image src="/static/images/7.png"></image>
						<text>总资产</text>
					</view>

					<view class="info-2">
						<text>￥</text>
						<text>123123123.0000</text>
					</view>

					<view class="info-3">
						<view class="line"></view>
					</view>

					<view class="info-4">
						<text>按会员等级释放比例，每</text>
						<text class="font-blue">45</text>
						<text>天为一个周期考核，满足</text>
						<text class="font-blue">3</text>
						<text>个条件以上即可领取</text>
					</view>

				</view>
			</view>
		</view>

		<!-- 小菜单 -->
		<view class="padding-box-2 menu">
			<view class="content" style="padding-bottom: 0">

				<view class="flex flex-column">
					<view class="menu-item flex flex-between" style="margin-bottom: 32rpx">
						<view class="left-side">当前等级</view>
						<view class="right-side font-blue">大众会员</view>
					</view>
		
					<view class="menu-item flex flex-between" style="margin-bottom: 32rpx">
						<view class="left-side">考核周期</view>
						<view class="right-side font-blue">45天</view>
					</view>
		
					<view class="menu-item flex flex-between">
						<view class="left-side">节点额度</view>
						<view class="right-side font-blue">60%</view>
					</view>
				</view>

			</view>
		</view>

		<!-- 领取 -->
		<view class="info-5">
			<view class="content">
				<view class="content-2">
					<view class="list flex flex-between">
						<view class="item flex flex-column flex-y-center">
							<text class="label">999</text>
							<text class="desc">待释放额度</text>
						</view>
						<view class="item flex flex-column flex-y-center">
							<text class="label">999</text>
							<text class="desc">已释放额度</text>
						</view>
					</view>
					<view class="n-button">领取</view>
					<image src="/static/images/8.png" mode="widthFix"></image>
				</view>
			</view>
		</view>

		<!-- 释放列表 -->
		<view class="padding-box shifang-list">
			<view class="content">
				<view class="title">
					<view class="label">
						<text>释放列表</text>
					</view>
					<view class="more-info">
						<text>申请记录</text>
						<view class="arrow">></view>
					</view>
				</view>

				<!-- 列表 -->
				<view class="list">
					<view class="item">
						<view class="row flex flex-between">
							<view class="left-side">申请的释放金额</view>
							<view class="right-side">999元</view>
						</view>
						<view class="row flex flex-between">
							<view class="left-side">实际释放金额</view>
							<view class="right-side">999元</view>
						</view>
						<view class="row flex flex-between">
							<view class="left-side">释放时间</view>
							<view class="right-side">2024-05-20</view>
						</view>
					</view>

					<view class="item">
						<view class="row flex flex-between">
							<view class="left-side">申请的释放金额</view>
							<view class="right-side">999元</view>
						</view>
						<view class="row flex flex-between">
							<view class="left-side">实际释放金额</view>
							<view class="right-side">999元</view>
						</view>
						<view class="row flex flex-between">
							<view class="left-side">释放时间</view>
							<view class="right-side">2024-05-20</view>
						</view>
					</view>

				</view>

			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data(){
			return {

			}
		},
		onLoad() {
			// this.getdata()
		},
		methods: {
			// getdata() {
			// 	this.to.www(this.api.sys_rank_list)
			// 		.then(res => {
			// 			this.list = res.data
			// 		})
			// }
		}
	}
</script>

<style lang="scss" scoped>
.head {
	height: 512rpx;
	background-image: url('/static/images/6.png');
	background-repeat: no-repeat;
	background-size: cover;

	padding-top: 10rpx;
	color: #fff;
	
	/* 总资产 */
	.zichan-info{
		height: 334rpx;
		margin-top: 32rpx;

		padding: 38rpx 20rpx;

		border-radius: 32rpx;
		background: linear-gradient(180deg, rgba(226,242,255,0.5) 0%, rgba(255,255,255,1) 100%);
		backdrop-filter: blur(8rpx);
		box-shadow: 0px 4rpx 24rpx 0rpx rgba(0,0,0,0.05);

		.info-1{
			font-size: 32rpx;
			color: #575861;
			padding: 0 20rpx;
			image{
				width: 28rpx;
				height: 28rpx;
				margin-right: 10rpx;
			}
		}

		.info-2{
			color: #34353E;
			font-size: 48rpx;
			margin-top: 18rpx;
			padding: 0 14rpx;
		}

		.info-3{
			margin-top: 28rpx;
			padding: 0 30rpx;
			.line{
				background-color: #D2E4F4;
				height: 2rpx;
			}
		}

		.info-4{
			margin-top: 24rpx;
			font-size: 28rpx;
			color: #34353E;
			padding: 0 20rpx;
		}
	}
}

/* 小菜单 */
.menu{
	margin-top: 0rpx;
	.menu-item{
		height: 104rpx;
		background: #D7ECFF;
		border-radius: 8px;
		padding: 28rpx 28rpx 0;

		font-size: 32rpx;

		.left-side{
			color: #34353E;
		}
	}
}

.info-5{
	height: 328rpx;
	padding: 0 40rpx;

	.content{
		height: 100%;
		background-color: white;
		padding-top: 32rpx;

		.content-2{
			height: 100%;
			padding: 40rpx 32rpx 0;
			border-radius: 24rpx;
			background: linear-gradient(131.61deg, #F1F9FF 2%, #FFFFFF 100%);
			position: relative;

			image{
				position: absolute;
				width: 50%;
				top: 0;
				right: 0;

				z-index: 1;
			}

			.n-button{
				position: relative;
				
				z-index: 2;
				margin-top: 36rpx;
			}

		}

		.list{
			padding-top: 10rpx;
			.item{
				width: 50%;
				.label{
					color:black;
					font-size: 36rpx;
					font-weight: 600;
				}
				.desc{
					font-size: 28rpx;
					color: #666;
					margin-top: 10rpx;
				}
			}
		}
	}

}

/* 释放列表 */
.shifang-list{
	.list{
		font-size: 28rpx;
		padding: 10rpx 40rpx 0;
		.item{
			border-bottom: 2rpx solid #E9E9E9;
			margin-bottom: 32rpx;
			.row{
				margin-bottom: 32rpx;
			}
		}
		.left-side{
			color:#222;
		}
		.right-side{
			color:black;
		}
	}
}

</style>