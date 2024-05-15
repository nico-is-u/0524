<template>
	<view>
		<view class="gf_bz">
			<view class="xxxis" v-for="(item,index) in dataLit" :key="index">
				<image class="hm_imgs" v-if="item.receive" :src="item.img" mode="widthFix"></image>
				<image class="gz" v-if="item.notarization_status==1" src="../../static/images/home/ygz.png" mode="widthFix"></image>
			</view>
		</view>
		<view style="margin: 60rpx auto;" v-if="!dataLit.length">
			<u-empty mode="list" icon-size="50"></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataLit: []
			};
		},
		onLoad() {
			this.to.www(this.api.gf_baozhang, '', 'p')
				.then(res => {
					var resData = res.data;
					var tempdataList = [];
					for (let item in resData) {
						if (resData[item].receive) {
							tempdataList.push(resData[item])
						}
					}
					this.dataLit = tempdataList;
				})
		}
	}
</script>

<style lang="scss" scoped>
	.gf_bz {
		margin: 10rpx auto;
		padding: 10rpx 20rpx;

		.xxxis {
			position: relative;

		}

		.gz {
			width: 120rpx;
			position: absolute;
			top: -20rpx;
			right: -10rpx;
		}

		.hm_imgs {
			width: 100%;
			border-radius: 10rpx;
			margin-bottom: 20rpx;
			box-shadow: 4rpx 4rpx 10rpx 2rpx rgba(33, 46, 104, 0.3);
		}
	}
</style>