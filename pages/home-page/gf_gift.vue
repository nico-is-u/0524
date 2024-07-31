<template>
	<view class="container">
		<image :src="'/static/images/my/level'+(user_info.level) +'-2.png'" style="width: 100%;" mode="widthFix"></image>
		<!-- 老的礼物列表  暂时屏蔽 -->
		<!-- <view class="list">
			<view class="list-item" v-for="(item,index) in list" :key="index">
				<image :src="item.cover_img" style="width: 100%;" mode="widthFix"></image>
				<view>
					<view>{{item.name}}</view>
					<view>
						<view class="btn" >领取</view>
					</view>
				</view>
			</view>
		</view> -->

		<view class="list2 flex flex-column">
			<view class="list-item" v-for="(item,index) in list" :key="index" v-if="item.level">
				<image :src="'/static/images/my/gz-level' + item.level + '.jpg'" style="width: 100%;" mode="widthFix"></image>
				<view class="btn" :class="{
					'btn-2':item.can_receive != 1,
					'btn-3':item.can_receive == 1 && item.is_receive == 1
				}" @click="buy(item)">
					
					<template v-if="item.can_receive == 1">
						<text v-if="item.is_receive == 0">可领取</text>
						<text v-if="item.is_receive == 1">已领取</text>
					</template>

					<template v-else>
						<text v-if="item.is_receive == 0">未领取</text>
						<text v-if="item.is_receive == 1">已领取</text>
					</template>
				</view>
			</view>
		</view>

		<!-- 加载动画 -->
		<u-loading-page :loading="isLoading1" :loading-text="regStatus"></u-loading-page>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_info: {
					level: 1
				},
				list: [],

				/* 等待请求 */
				isLoading1:true,
				isLoading2:false,
				regStatus:'请求中',

			};
		},
		methods: {
			/* 领取工资 */
			buy(item) {
				/* 判断是否可领取 */
				if(item.can_receive != 1)	return
				
				this.isLoading1 = true
				this.to.www(this.api.vipPlaceOrder2, {id: item.id}, 'p').then(res => {

					this.toa('领取成功')

					/* 重新请求个人信息 */
					this.to.www(this.api.user_info).then(res => {
						this.user_info = res.data;
					})
					
					/* 重新请求列表 */
					this.to.www(this.api.vipGiftList2)
					.then(res => {
						this.list = res.data
						this.isLoading1 = false
					})

				}).catch(err => {
					this.isLoading1 = false
				})
			}
		},
		onLoad() {
			/* 请求个人信息 */
			this.user_info = uni.getStorageSync("user_info")
			this.to.www(this.api.user_info).then(res => {
				this.user_info = res.data;
			})

			/* 请求会员等级 礼物列表 */
			this.to.www(this.api.vipGiftList2)
			.then(res => {
				this.list = res.data
				this.isLoading1 = false
			})

		}
	}
</script>

<style lang="scss">
	.list{
		margin-top: 10px;
		display: grid;
		grid-template-columns: repeat(2,1fr);
		grid-gap: 20px;
		.list-item{
			background: #fff;
			border-radius: 8px;
			padding-bottom: 5px;
			>view{
				padding: 5px 10px;
				>view{
					&:nth-of-type(1){
						font-size: 14px;
						color: #222222;
						margin-bottom: 10px;
						text-align: center;
					}
				}
			}
		}
		.ad{
			display: flex;
			align-items: center;
		}

		.btn{
			background: linear-gradient( 90deg, #2E9FFF 0%, #0182EF 100%);
			border-radius: 36px 36px 36px 36px;
			color: #fff;
			width: 50%;
			padding: 5px 20px;
			text-align: center;
			margin: 0 auto;
		}
	}

	.list2{
		gap: 64rpx;
		margin-top: 48rpx;
		.list-item{
			position: relative;
			.btn{
				position: absolute;
				right: 32rpx;
				bottom: 48rpx;

				font-size: 32rpx;

				background: linear-gradient( 90deg, #2E9FFF 0%, #0182EF 100%);
				border-radius: 36px 36px 36px 36px;
				color: #fff;
				width: 30%;
				padding: 5px 20px;
				text-align: center;
				margin: 0 auto;
			}

			.btn-2{
				background: #9e9e9e !important;
			}

			.btn-3{
				background: rgb(89, 146, 152) !important;
			}

		}
	}


	.container{
		padding: 10px 20px;
		background: #f7f7f7;
		min-height: calc(100vh - 44px);
	}
</style>
