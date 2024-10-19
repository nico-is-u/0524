<template>
	<view class="page">
		<!-- 头部 -->
		<view class="head">
			<!-- 顶栏 -->
			<nNavbar title="诺亚方舟" :showBackBtn="false"></nNavbar>
			<!-- 总资产 -->
			<view class="padding-box" style="padding: 0 40rpx">
				<view class="zichan-info head-card" style="border: 3rpx solid white">
					<view class="info-1 flex flex-y-center">
						<image src="/static/images/7.png"></image>
						<text>总资产</text>
					</view>

					<view class="info-2">
						<text>￥</text>
						<text>{{indexInfo.totalAmount || '0.00'}}</text>
					</view>

					<view class="info-3" v-if="pageShow">
						<view class="line"></view>
					</view>

					<view class="info-4" v-if="pageShow">
						<text>按会员等级释放比例，每</text>
						<text class="font-blue">45</text>
						<text>天为一个周期考核，满足</text>
						<text class="font-blue">3</text>
						<text>个条件以上即可领取</text>
					</view>

					<u-button class="n-button fixed-button" @click="too('/pages/index/nyfz_detail')">申请</u-button>

				</view>
			</view>

			<!-- 申请按钮 -->
			<view class="padding-box" style="margin-top: 32rpx; padding: 0 48rpx">
				<u-button class="n-button" @click="shenqing">申请兑换至万事达联名钱包</u-button>
			</view>

		</view>

		<!-- 小菜单 -->
		<view class="padding-box-2 menu" v-if="pageShow">
			<view class="content" style="padding-bottom: 0">

				<view class="flex flex-column">
					<view class="menu-item flex flex-between" style="margin-bottom: 32rpx; background-image: url('/static/images/26.png')">
						<view class="left-side">当前等级</view>
						<view class="right-side font-blue">{{indexInfo.currentLevel || 0}}</view>
					</view>
		
					<view class="menu-item flex flex-between" style="margin-bottom: 32rpx; background-image: url('/static/images/27.png')">
						<view class="left-side">考核周期</view>
						<view class="right-side font-blue">{{indexInfo.noahDays ? indexInfo.noahDays + '天' : ''}}</view>
					</view>
		
					<view class="menu-item flex flex-between" style="background-image: url('/static/images/28.png')">
						<view class="left-side">节点额度</view>
						<view class="right-side font-blue">{{indexInfo.nodeRate || 0}}%</view>
					</view>
				</view>

			</view>
		</view>

		<!-- 领取 -->
		<view class="info-5" v-if="pageShow">
			<view class="content">
				<view class="content-2">
					<view class="list flex flex-between">
						<view class="item flex flex-column flex-y-center">
							<text class="label">{{indexInfo.totalAmountType0 || '0.00'}}</text>
							<text class="desc">待释放额度</text>
						</view>
						<view class="item flex flex-column flex-y-center">
							<text class="label">{{indexInfo.totalAmountType1 || '0.00'}}</text>
							<text class="desc">已释放额度</text>
						</view>
					</view>
					<view class="n-button" @click="goRequest()">领取</view>
					<image src="/static/images/8.png" mode="widthFix"></image>
				</view>
			</view>
		</view>

		<!-- 释放条件 -->
		<view class="padding-box shifang-tiaojian" v-if="pageShow" style="margin: 32rpx 0;">
			<view class="content">
				<view class="title">
					<view class="label">释放条件</view>
				</view>

				<!-- 列表 -->
				<view class="card-list-type-2">
					<view class="item">
						<view class="row flex flex-between">
							<view class="left-side">直推人数</view>
							<view class="right-side">{{ indexInfo.noah_layer1_count || '--' }}</view>
						</view>
						<view class="row flex flex-between">
							<view class="left-side">团队人数</view>
							<view class="right-side">{{ indexInfo.noah_team_count || '--' }}</view>
						</view>
					</view>

					<view class="item">
						<view class="row flex flex-between">
							<view class="left-side font-bold">个人业绩</view>
							<view class="right-side">{{ indexInfo.noah_achievements || '--' }}</view>
						</view>
						<view class="row flex flex-between">
							<view class="left-side font-bold">团队业绩</view>
							<view class="right-side">{{ indexInfo.noah_team_achievements || '--' }}</view>
						</view>
						<view class="row flex flex-between">
							<view class="left-side font-bold">云币持仓</view>
							<view class="right-side">{{ indexInfo.coin_hold || '--' }}</view>
						</view>
					</view>

				</view>
			</view>
		</view>

		<!-- 释放列表 -->
		<view class="padding-box shifang-list" v-if="pageShow">
			<view class="content">
				<view class="title">
					<view class="label">
						<text>释放列表</text>
					</view>
					<view class="more-info" @click="too('/pages/index/nyfz_list')">
						<text>申请记录</text>
						<view class="arrow">></view>
					</view>
				</view>

				<!-- 列表 -->
				<view class="card-list-type-2" v-if="indexList.length">

					<view class="item" v-for="(item,index) in indexList" :key="'sf-item-' + index">
						<view class="row flex flex-between">
							<view class="left-side">申请的释放金额</view>
							<view class="right-side">{{item.apply_amount || '0.00'}}元</view>
						</view>
						<view class="row flex flex-between">
							<view class="left-side">实际释放金额</view>
							<view class="right-side">{{item.real_amount || '0.00'}}元</view>
						</view>
						<view class="row flex flex-between">
							<view class="left-side">释放时间</view>
							<view class="right-side">{{item.time || '--'}}</view>
						</view>
					</view>

					

				</view>
				
				<!-- 暂无数据 -->
				<view class="card-list-type-2 margin-b-30" v-else>
					<view class="flex flex-x-center" style="padding: 2.5vh 0">暂无数据</view>
				</view>

				<!-- 加载动画 -->
				<u-loading-page :loading="isLoading" :loading-text="regStatus"></u-loading-page>

			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data(){
			return {
				isLoading:false,                    // 请求中
            	regStatus: '正在提交...',		     // loading text

				/* 首页信息 */
				indexInfo:false,
				/* 释放列表 */
				indexList:[],

				/* 暂时隐藏 */
				pageShow:false,
			}
		},
		onShow() {
			this.getData()
			this.getDataList()
		},
		methods: {
			getData() {
				this.to.www(this.api.nyfz_info)
				.then(res => {
					const {code = 0} = res
					if(code == 200){
						this.indexInfo = res.data
					}
				})
			},
			getDataList(){
				this.to.www(this.api.nyfz_list,{type:3})
				.then(res => {
					const {code = 0} = res
					if(code == 200){
						this.indexList = res.data.data.data || []
					}
				})
			},
			/* 请求领取 */
			async goRequest(){
				this.isLoading = true
				try{
					const response = await this.to.www(this.api.nyfz_lq,{},'p')
					const {code} = response
					if(code == 200){
						this.toa('领取成功')
						this.too('/pages/index/nyfz_list')

						this.isLoading = false
					}else{
						this.isLoading = false
					}
				}catch(e){
					this.isLoading = false
				}
			},
			/* 申请兑换至万事达联名钱包 */
			async shenqing(){
				this.isLoading = true
				try{
					const response = await this.to.www(this.api.shenqingMaster)
					const {code} = response
					if(code == 200){

						this.toa('操作成功')
						this.too('/pages/home-page/my_zc')

						this.isLoading = false
					}else{
						const {msg} = response
						this.toa(msg)

						this.isLoading = false
					}
				}catch(e){
					this.isLoading = false
				}

			},
		}
	}
</script>

<style lang="scss" scoped>

page{
	background-color: #f9f9f9;
}

.head {
	height: 512rpx;
	background-image: url('/static/images/6.png');
	background-repeat: no-repeat;
	background-size: cover;

	padding-top: 10rpx;
	color: #fff;
	
	/* 总资产 */
	.zichan-info{
		height: 224rpx;
		margin-top: 32rpx;

		padding: 38rpx 20rpx;

		position: relative;
		

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

		.fixed-button{
			position: absolute;
			width: 150rpx;
			height: 60rpx !important;
			padding: 6rpx 0 !important;
			font-size: 34rpx !important;

			right: 50rpx;
			top: 20%;
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
		background-repeat: no-repeat;
		background-size: cover;

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


</style>