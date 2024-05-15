<template>
	<view>
		<view class="ser_list">
			<view style="margin: 60rpx auto;" v-if="!list.length">
				<u-empty mode="list" icon-size="50" ></u-empty>
			</view>
			<view class="box" v-for="(item,index) in list" :key="index" @click="doselect(item)" >
				<view class="item">
					<view>{{item.bank_name}}</view>
					<view>{{item.account}}</view>
				</view>
				<!-- <view class="item">
					<u--text :text="item.account" size="12px"></u--text>
					<u--text align="right" size="12px" :text="item.created_at"></u--text>
				</view> -->
				<u--text align="right" v-if="type" size="14px" color="#00cd63" text="选择"></u--text>
				<u--text align="right" v-else size="14px" color="#e6e6e6" @click="delbank(item)" text="删除"></u--text>
			</view>

<!-- 			<u-button color="linear-gradient(to right, #B80606, rgb(216, 68, 68))" iconColor="#fff" class="custom-style"
				text="添加银行卡" @click="too('/pages/system-page/gf_band-card','reb')"></u-button> -->
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				type:false
			};
		},
		onLoad(option) {
			this.getBankList()
			if(option.select){
				this.type = true;
			}
		},
		methods: {
			getBankList() {
				this.to.www(this.api.bank_list)
					.then(res => {
						this.list = res.data;
					})
			},
			delbank(o) {
				let _ = this;
				uni.showModal({
					title: '提示',
					content: '是否删除：' + o.bank_name,
					success(res) {
						if (res.confirm) {
							_.to.www(_.api.del_bank, {
									id: o.id
								})
								.then(res => {
									_.getBankList()
								})
						}
					}
				})
			},
			/* 选择银行卡 */
			doselect(obj){
				if(this.type){
					uni.setStorage({
						data:obj,
						key:"BANK_DRAW",
						success() {
							uni.navigateBack()
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.custom-style {
		position: fixed;
		bottom: 160rpx;
		width: 80%;
		left: 0;
		right: 0;

	}

	.ser_list {
		border-radius: 10rpx;
		padding: 20rpx 40rpx;

		.box {
			box-shadow: 2rpx 2rpx 5rpx 2rpx rgba(33, 46, 104, 0.15);
			margin-bottom: 20rpx;
			padding: 20rpx;
			border-radius: 30rpx;
			overflow: hidden;
			box-sizing: border-box;
			color: #FFF;
			font-weight: bold;
			background-image: url('../../static/icon/bkbg.png');
			background-repeat: no-repeat;
			background-size: 100%;
			text-align: center;
			line-height: 50rpx;
			.item{
				margin-top: 40rpx;
				margin-left: 20%;
				text-align: left;
			}
		}
	}
</style>