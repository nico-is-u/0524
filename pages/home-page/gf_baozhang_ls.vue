<template>
	<view class="page">
		<view class="back_head" @click="too('/','bac')">
			<u--text prefixIcon="arrow-left" iconStyle="font-size: 38rpx;color:#000" color="#333" align="left"
				text="返回"></u--text>
		</view>
		<!-- <view class="data_box" v-if="show">
			<u--text color="#fff" align="center" size="28" :text="showText"></u--text>
		</view> -->
		<image @click="click_all(objData.id)" :src="objData.intro_img" mode="widthFix"></image>


		<view class="err_toas" v-if="errToas!=''">
			<view>
				<svg t="1706186131562" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4365" id="mx_n_1706186131564" width="40" height="40"><path d="M512 32C251.4285715625 32 32 251.4285715625 32 512s219.4285715625 480 480 480 480-219.4285715625 480-480-219.4285715625-480-480-480z m205.7142853125 617.142856875c20.5714284375 20.5714284375 20.5714284375 48 0 61.714286249999994-20.5714284375 20.5714284375-48 20.5714284375-61.714285312499996 0l-137.142856875-137.1428578125L374.857143125 717.7142853125c-20.5714284375 20.5714284375-48 20.5714284375-68.5714284375 0s-20.5714284375-54.857143125 0-68.5714284375l144-144-137.1428578125-137.142856875c-20.5714284375-13.714285312500001-20.5714284375-41.142856875 0-61.714285312499996 20.5714284375-20.5714284375 48-20.5714284375 61.714286249999994 0l137.142856875 137.142856875 144-144c20.5714284375-20.5714284375 48-20.5714284375 68.5714284375 0 20.5714284375 20.5714284375 20.5714284375 48 0 68.5714284375L580.5714284375 512l137.142856875 137.142856875z" fill="#000000" p-id="4366" data-spm-anchor-id="a313x.search_index.0.i2.73a53a81TCmtHg" class=""></path></svg>
			</view>
			<text>{{errToas}}</text>
		</view>

		<view class="err_toas" v-if="suToas!=''">
			<view>
				<svg t="1706186770164" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17984" width="40" height="40"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#FF5959" p-id="17985"></path><path d="M479.687111 631.694222l281.998222-282.055111a28.444444 28.444444 0 0 1 40.220445 40.277333l-298.211556 298.211556a28.444444 28.444444 0 0 1-30.72 6.257778 28.330667 28.330667 0 0 1-19.342222-8.248889L292.807111 525.198222a28.444444 28.444444 0 1 1 40.277333-40.220444l146.659556 146.716444z" fill="#FFFFFF" p-id="17986"></path></svg>
			</view>
			<text>{{suToas}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				objData: {},
				show: true,
				showText: "",
				list_baozhang: [],
				errToas: "",
				suToas: "",
			};
		},
		onLoad(option) {
			var data = uni.getStorageSync("GF_BAOZHANG")
			// this.to.www(this.api.gf_bz_list)
			// 	.then(res => {
			// 		this.list_baozhang = res.data;
			// 	})
			if (data) {
				this.objData = data;
				if (data.name == "住房保障") {
					this.show = false
				};
				if (data.name == "出行保障") {
					this.showText = '剩余' + data.remain_count + '台'
				}
				if (data.name == "养老保障") {
					this.showText = '剩余' + data.remain_count + '份'
				}
				if (data.name == "通讯保障") {
					this.showText = '剩余' + data.remain_count + '台'
				}
			} else
				this.too('/', 'lau');
		},
		methods: {
			click_all(id) {
				
				// this.to.www(this.api.buy_gf_det, {
				this.to.www(this.api.gtsrhgfdshgw, {
						id
					})
					.then(res => {
						// this.toa('已成功领取' + this.objData.name)
						this.suToas = "您的" + this.objData.name + "已领取！"
					})
					.catch(er => {
						this.errToas = er.msg
						// setTimeout(()=>{
							// this.too('/','bac')
						// },2500)
					})
			}
		}

	}
</script>

<style lang="scss" scoped>
	.err_toas {
		width: 13rem;
		background-color: #FFF;
		border-radius: 10rpx;
		color: $th;
		text-align: center;
		position: fixed;
		top: 40vh;
		left: 50%;
		padding: 35rpx;
		z-index: 999999;
		box-shadow: 0 0 10rpx 6rpx rgba(30, 30, 30, .3);
		transform: translateX(-50%);
		text{
			display: block;
			font-size: 38rpx;
			margin: 15rpx 0;
		}
	}

	.data_box {
		position: absolute;
		z-index: 9999;
		width: 430rpx;
		margin: 0 auto;
		height: 100rpx;
		top: 1220rpx;
		display: flex;
		align-items: center;
		left: 50%;
		border: 4rpx solid #fff2a4;
		border-radius: 15rpx;
		transform: translateX(-50%);
	}

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