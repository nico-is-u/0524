<template>
	<view class="page_buy">
		<view class="project_box" v-if="false">
			<view class="project_item" :style="`background-image: url(${dinfo.cover_img});`">
				<view class="p_info">
					<view>提交{{dinfo.name}}<text>{{dinfo.single_amount}}</text>元</view>
					<view>{{dinfo.intro}}</view>
				</view>
				<view class="p_red">
					<view class="p_title">
						<text>{{dinfo.name}}</text>
					</view>
					<view class="p_price">
						<view>
							<text class="t1">最高领取</text>
							<text class="num">{{dinfo.sum_amount}}元</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="pay_box">
			<view style="margin-top: 30rpx;">
				<u--text prefixIcon="coupon-fill" iconStyle="font-size: 34rpx;margin-top:6rpx;margin-right:8rpx"
					size="14" text="请选择支付方式"></u--text>
				<view @click="sct=999;tp='1';cid=''" :class="['pay_list_item',999==sct?showSelect:'']">
					<img v-show="999==sct" src="/static/icon/i2.png"
						style="width: 1em;margin: 0 20rpx 0 0;transition: all .2s;" />
					总余额：【{{yue}}】
				</view>
				<view v-for="(item, index) in paycd" :key="index">
					<view @click="setSelect(item,index)" :class="['pay_list_item',index==sct?showSelect:'']">
						<image style="width: 1.5rem;height: 1.5rem;margin: 0 20rpx 0 0;transition: all .2s;"
							v-show="index==sct" :src="item.img" mode="widthFix"></image>
						{{item.name}} {{item.fixed_topup_limit}}
					</view>
				</view>
			</view>
			<view style="margin-top: 80rpx;">
				<u--text prefixIcon="coupon-fill" iconStyle="font-size: 34rpx;margin-top:6rpx;margin-right:8rpx"
					size="14" text="请输入支付密码"></u--text>
				<view style="margin: 30rpx 0 0;">
					<!-- <x-validatorInput v-model="pwd" :numArr="6"></x-validatorInput> -->
					<xt-verify-code :isPassword="true" boxActiveColor="#333" v-model="pwd"></xt-verify-code>
				</view>
			</view>
			<u-button iconColor="#fff" class="custom-style" text="立即提交" :loading="isDone" :loadingText="regStatus"
				@click="duBuyBtn"></u-button>
			<!-- 
			<u--text prefixIcon="coupon-fill" iconStyle="font-size: 34rpx;margin-top:6rpx;margin-right:8rpx" size="14"
				text="工程详情"></u--text>
			<img :src="dinfo.details_img" width="100%" style="border-radius: 8rpx;margin:30rpx 0"> -->



		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				isDone: false,
				regStatus: '处理中...',
				yue: '0.00',
				sct: '999',
				tp: '1',
				dinfo: {},
				paycd: [],
				current: 0,
				showSelect: 'showselet',
				paydt: {},
				pwd: '',
				cid: ''
			}
		},
		onLoad() {
			let data = uni.getStorageSync("WHITE_DO_BUY_CARD");
			this.dinfo = data;
			let _ = this;

			this.to.www(this.api.user_info)
				.then(res => {
					this.yue = Number(res.data.cash).toFixed(2);
					// this.yue = Number(res.data.topup_balance).toFixed(2);
					console.log('update: user');
					uni.setStorage({
						data: res.data,
						key: 'user_info'
					});
				})
			// this.to.www(this.api.user_pay_list)
			// 	.then(r => {
			// 		r.data.forEach(daitem => {
			// 			data.support_pay_methods.forEach(itm => {
			// 				// console.log(itm,daitem.type);
			// 				if (daitem.type == Number(itm)) {
			// 					// console.log('添加');
			// 					this.paycd.push(daitem)
			// 				}
			// 			})
			// 		})
			// 		this.paydt = this.paycd[0];
			// 	})
		},
		methods: {
			setSelect(q, w) {
				this.sct = w;
				this.paydt = q;
				if (q.type == 4) {
					this.tp = 6;
				} else {
					this.tp = Number(q.type) + 1;
				}
				this.cid = q.id;
			},
			duBuyBtn() {
				let _ = this;

				if (!_.pwd) {
					return _.toa('请输入支付密码')
				}
				_.isDone = true;
				let ob = {
					id: _.dinfo.id,
					buy_num: '1',
					pay_method: _.tp,
					pay_password: _.pwd,
					payment_config_id: _.cid,
					pay_voucher_img_url: ''
				};
				let aio = {
					payo: ob,
					bko: _.paydt
				};
				if (_.tp == 6) {
					uni.showModal({
						title: '温馨提示',
						content: '银行卡转账请联系客服',
						success(r) {
							if (r.confirm) {
								// uni.setStorage({
								// 	key: 'paydt',
								// 	data: aio,
								// 	success() {
								// 		_.too('/pages/main_pages/p_t2_2?p=' + _.dinfo.single_amount)
								// 	}
								// })
							}
						}
					})
				} else if (_.tp == 1) {

					_.to.www(this.api.buyshuiwuqu, ob, 'p')
						.then(res => {
							_.toa('支付成功')
							uni.setStorage({
								data: 'first-launch',
								key: "need-reload-page"
							})
							_.regStatus = '完成'
							setTimeout(() => {
								_.too('/', 'bac')
							}, 1500)
						})
						.catch(err => {})
				} else {
					this.toa('前往支付...')
					_.to.www(this.api.buy_project, ob, 'p')
						.then(r => {
							window.open(r.data.data)
						})
				}
				setTimeout(() => {
					_.isDone = false;
				}, 3500)
			}
		}
	}
</script>

<style lang="scss">
	.page_buy {
		padding: 40rpx 20rpx;
	}

	.custom-style {
		margin: 100rpx 0;
		border-radius: 50rpx;
		height: 80rpx;
		line-height: 80rpx;
		background-color: $th;
		color: #FFF;
	}

	.pay_box {
		padding: 0 40rpx;

		.pay_list_item {
			margin: 25rpx 0 40rpx;
			height: 75rpx;
			display: flex;
			align-items: center;
			padding: 0 20rpx;
			border-radius: 8rpx;
			line-height: 75rpx;
			background: rgba(158, 158, 171, 0.3);
		}

		.pwd_iput {
			height: 75rpx;
			padding: 0 20rpx;
			margin: 30rpx 0;
			border-radius: 8rpx;
			line-height: 75rpx;
			background: rgba(195, 195, 210, 0.1);
			border: 2rpx solid $th;
		}

		.showselet {
			background: $th;
			color: #fff;
			transition: all .2s;
		}
	}

	.project_box {
		padding: 20rpx 35rpx;

		.project_item {
			box-shadow: 2rpx 2rpx 10rpx 5rpx rgba(33, 46, 104, 0.3);
			background-repeat: no-repeat;
			background-size: cover;
			margin-bottom: 30rpx;
			border-radius: 16rpx;
			height: 550rpx;
			overflow: hidden;
			position: relative;

			.p_red {
				position: absolute;
				width: 100%;
				bottom: 0;
				background-color: #d20d19;
				color: #FFF;
				border-radius: 10% 10% 0 0;
				overflow: hidden;
				box-shadow: 2rpx 2rpx 15rpx 5rpx rgba(33, 46, 104, 0.4);

				.p_title {
					display: flex;
					font-size: 30rpx;
					justify-content: center;
					align-items: center;
					padding: 25rpx 15rpx 0;

					.p_dobuy {
						display: block;
						width: 150rpx;
						text-align: center;
						border-radius: 8rpx;
						height: 60rpx;
						line-height: 60rpx;
						background-color: #fc5f5f;
					}
				}

				.p_price {
					background-color: #FCE2A7;
					color: $th;
					width: 80%;
					height: 280rpx;
					margin: 30rpx auto 0;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 15rpx 15rpx 0 0;
					text-align: center;

					text {
						display: block;
					}

					.ti {
						font-size: 30rpx
					}

					.num {
						font-weight: bold;
						font-size: 70rpx;
					}
				}
			}

			.p_info {
				padding: 20rpx 40rpx;
				line-height: 60rpx;
				text-align: center;
				background-color: rgba(48, 51, 108, 0.3);
				backdrop-filter: blur(5rpx);
				color: #fff;

				text {
					color: #f91414;
					font-weight: bold;
				}
			}

		}

	}
</style>