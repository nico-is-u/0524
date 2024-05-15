<template>
	<view>
		<view class="gf_bz">
			<image class="hm_imgs" v-for="(item,index) in list_baozhang" :key="index" @click="toDetail(item)"
				:style="index==2?'box-shadow: 0 4rpx 1rpx 3rpx #c36658;':index==3?'box-shadow: 0 4rpx 1rpx 3rpx #f5b263;':''"
				:src="item.img" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list_baozhang: []
			};
		},
		onLoad() {
			// this.to.www(this.api.hmasetls)
			this.to.www(this.api.dsiafdgkjsas)
				.then(res => {
					let data = Object.values(res.data);
					for (var i = 0; i < data.length; i++) {
						this.list_baozhang.push(data[i])
					}
					// this.list_baozhang.reverse();
				
				})
		},
		methods: {
			toDetail(item) {
				let _ = this;
				// if (item.id != 5) {
				uni.setStorage({
					data: item,
					key: "GF_BAOZHANG",
					success() {
						_.too('/pages/home-page/gf_baozhang_ls')
					}
				})
				// }
			}
		}
	}
</script>

<style lang="scss">
	.gf_bz {
		margin: 10rpx auto;
		padding: 10rpx 20rpx;
		box-sizing: border-box;

		.hm_imgs {
			width: 100%;
			height: 1rem;
			box-sizing: border-box;
			border: 6rpx solid #c98c86;
			border-radius: 25rpx;
			margin-bottom: 20rpx;

		}
	}
</style>