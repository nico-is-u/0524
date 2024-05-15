<template>
	<view>
		<view class="list_box">
			<view class="item" v-for="(item,index) in zc_recover_list" :key="index">
				<u-row justify="space-between"
					@click="tocover(item)">
					<u-col span="3">
						<image class="icon" src="../../static/images/home/zc_re.jpg" mode="widthFix"></image>
					</u-col>
					<u-col span="9" align="center">
						<text class="ti">总资产</text>
						<text class="des">{{item.min_asset}}万 {{item.max_asset=='max'?'以上': ' ~ '+item.max_asset+'万'}}入口</text>
					</u-col>
				</u-row>
				<image class="icon2" src="../../static/images/background.png" mode="widthFix"></image>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				zc_recover_list:[],
				x:''
			};
		},
		onLoad(e) {
			this.getList()
			this.x = e.g
		},
		methods:{
			getList(w) {
				this.to.www(this.api.zc_recover_list)
					.then(res => {
						this.zc_recover_list = res.data;
					})
			},
			tocover(obj){
				this.too('/pages/home-page/zc_recover_reg?item='+JSON.stringify(obj)+'&g='+this.x)
			}
		}
	}
</script>

<style lang="scss">
	.list_box {
		padding: 20rpx;

		.icon {
			width: 100%;
			height: 80rpx;
		}

		.item {
			padding: 15rpx;
			border-radius: 8rpx;
			margin-bottom: 20rpx;
			position: relative;
			box-shadow: 4rpx 4rpx 10rpx 2rpx rgba(33, 46, 104, 0.3);
			background-color: #FFDBC2;

			.icon2 {
				position: absolute;
				bottom: 0%;
				right: 0;
				width: 120rpx;
			}

			.ti {
				font-weight: bold;
				font-size: 40rpx;
				margin-bottom: 15rpx;
			}

			.des {
				font-size: 28rpx;
			}
		}
	}
</style>