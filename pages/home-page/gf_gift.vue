<template>
	<view class="container">
		<image :src="'/static/images/my/level'+(user_info.level) +'.png'" style="width: 100%;" mode="widthFix"></image>
		<view class="list">
			<view class="list-item" v-for="(item,index) in list" :key="index">
				<image :src="item.cover_img" style="width: 100%;" mode="widthFix"></image>
				<view>
					<view>{{item.name}}</view>
					<view>
						<view class="btn" @click="buy(item.id)">领取</view>
					</view>
				</view>
			</view>
		</view>
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
			};
		},
		methods: {
			buy(id) {
				this.to.www(this.api.vipPlaceOrder, {id: id}, 'p').then(res => {
					this.toa('领取成功')
				}).catch(err => {
					// this.isDone = false
				})
			}
		},
		onLoad() {
			this.to.www(this.api.user_info).then(res => {
				this.user_info = res.data;
			})
			this.to.www(this.api.vipGiftList)
				.then(res => {
					this.list = res.data.data;
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
	.container{
		padding: 10px 20px;
		background: #f7f7f7;
		min-height: calc(100vh - 44px);
	}
</style>
