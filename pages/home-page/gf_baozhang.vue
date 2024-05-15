<template>
	<view class="page">
		<view class="back_head" @click="too('/','bac')">
			<u--text prefixIcon="arrow-left" iconStyle="font-size: 38rpx;color:#000" color="#333" align="left"
				text="返回"></u--text>
		</view>
		<image @click="click_all" :src="'../../static/images/home/gf_'+showType+'.jpg'" mode="widthFix"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showType: ''
			};
		},
		onLoad(option) {
			if (option.type) {
				this.showType = option.type;
			} else
				this.too('/', 'lau');

		},
		methods: {
			click_all() {
				switch (this.showType) {
					case 'yl':
						console.log('养老');
						break;
					case 'cx':
						console.log('出行');
						break;
					case 'tx':
						console.log('通讯');
						break;
					case 'xian':
						// console.log('先富');
						this.get_xioanfu_houfu();
						break;
					case 'hou':
						// console.log('后富');
						this.get_xioanfu_houfu();
						break;
					case 'live':
						// console.log('生活补助');
						this.getLive();
						break;
				}
			},
			// live_my
			getLive(){
				this.to.www(this.api.live_my)
					.then(res => {
						this.toa("生活补助已领取")
					})
			},
			get_xioanfu_houfu() {
				let val = this.showType=='xian'?1:this.showType=='hou'?0:''
				this.to.www(this.api.get_xinafu_houfu,{rich:val})
					.then(res => {
						this.toa("已领取")
					})
			}
		}

	}
</script>

<style lang="scss" scoped>
	// page {
	// 	font-size: 0;
	// 	height: 100vh;
	// 	background-color: #DA0C13;
	// }

	.back_head {
		position: fixed;
		top: 35px;
		left: 0;
		width: 100%;
		height: 80rpx;
		box-sizing: border-box;
		padding: 50rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #000;
		z-index: 999;
	}

	image {
		width: 100%;
	}
</style>