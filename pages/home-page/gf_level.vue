<template>
	<view class="container">
		<view class="back_head" @click="too('/','bac')">
			<u--text prefixIcon="arrow-left" iconStyle="font-size: 38rpx;color:#ebebeb" color="#ebebeb" align="left"
				text=""></u--text>
			<u--text color="#fff" bold align="center" text="等级提升"></u--text>
			<u--text color="#d7d7d7" align="right" text=""></u--text>
		</view>
		<view class="content">
			<u-swiper :current="current" :autoplay="false" previousMargin="30" bgColor="#40496F"
			        nextMargin="30"
			        circular :list="levelImgList" @change="change" @click="click"></u-swiper>

			<view class="form" v-if="currentLevelItem">
				<view class="title1">当前等级权益</view>
				<view>{{currentLevelItem.name}}V{{currentLevelItem.level}}权益</view>
				<view>
					<view>资产要求</view>
					<view>{{currentLevelItem.total_assets == 0 ? '-' : (currentLevelItem.total_assets + ' U')}}</view>
				</view>
				<view>
					<view>购买会员等级</view>
					<view>{{currentLevelItem.single_amount == 0 ? '-' : currentLevelItem.single_amount  + ' U'}}</view>
				</view>
				<view>
					<view>月度礼包（话费）</view>
					<view>{{currentLevelItem.month_gift == 0 ? '-' : '￥' + currentLevelItem.month_gift}}</view>
				</view>
				<view>
					<view>理财加速收益</view>
					<view>{{currentLevelItem.speed_income == 0 ? '-' : currentLevelItem.speed_income}}</view>
				</view>
				<!-- <view>
					<view>周期资产解冻最高等级</view>
					<view>{{list[current].thawing_level + (list[current].thawing_level ? ' U' : '-')}}</view>
				</view> -->
				<view>
					<view>推荐会员奖励</view>
					<view>{{currentLevelItem.recommend_reward == 0 ? '-' : currentLevelItem.recommend_reward +  '%'}}</view>
				</view>

				<view>
					<view>积分折扣</view>
					<view>{{currentLevelItem.integral_off_name}}</view>
				</view>
				<view>
					<view>直属下级收益提成</view>
					<view>{{currentLevelItem.child_commission}}%</view>
				</view>
			</view>
			<view class="btn active" v-if="(user_info.level - 1) >= current">
				您已购买当前等级
			</view>
			<view v-else class="btn" @click="buy">购买</view>
		</view>

		<u-overlay :show="showPay" @click="showPay = false">
			<view class="warp" style="padding: 0 20px;">
				<view class="rect1">
					<view style="margin-top: 40rpx;">
						<u--text prefixIcon="coupon-fill" iconStyle="font-size: 34rpx;margin-top:6rpx;margin-right:8rpx"
							size="14" text="请输入支付密码"></u--text>
						<view style="margin: 30rpx 0 0;">
							<xt-verify-code :isPassword="true" boxActiveColor="#333" v-model="pay_password"></xt-verify-code>
						</view>
					</view>
					<u-button iconColor="#fff" class="custom-style" text="立即支付" :loading="isDone"
						:loadingText="regStatus" @click="pay()"></u-button>
				</view>
			</view>
		</u-overlay>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				levelImgList: [
					'/static/images/my/level1.png',
					'/static/images/my/level2.png',
					'/static/images/my/level3.png',
					'/static/images/my/level4.png',
					'/static/images/my/level5.png',
				],
				user_info: {
					level: 1
				},
				current: 1,
				showPay: false,
				isDone: false,
				regStatus: '处理中...',
				pay_password: ''
			};
		},
		computed:{
			currentLevelItem(){
				let result = false
				if(this.$store.getters['levelList'].length){
					return this.$store.getters['levelList'][this.current] || false
				}
				return result
			}
		},
		methods: {
			change(index) {
				this.current = index.current;
			},
			buy(){
				this.showPay = true;
			},
			pay(){
				if (uni.$u.test.isEmpty(this.pay_password)) return this.toa('请输入支付密码');
				this.to.www(this.api.levelPlaceOrder, {id: this.currentLevelItem.id, pay_password: this.pay_password}, 'p').then(res => {
					this.toa('支付成功')
					setTimeout(() => {
						uni.navigateBack()
					}, 1500)
				}).catch(err => {
					this.isDone = false
				})
			}
		},
		onLoad() {
			this.to.www(this.api.user_info).then(res => {
				this.user_info = res.data;
				this.current = (this.user_info.level - 1)
			})
			this.$store.dispatch('getLevelList')
		}
	}
</script>

<style lang="scss">
	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		height: 100%;
		z-index: 3;
	}
	
	.rect1 {
		border-radius: 10px;
		padding: 20px;
		width: 100%;
		box-sizing: border-box;
		background: #fff;
	
		.custom-style {
			width: 30vw;
			border-radius: 8px;
			margin-top: 30px;
			background: #1292FF;
			color: #fff;
		}
	}
	.btn{
		width: 70%;
		text-align: center;
		background: #1292FF;
		color: #fff;
		margin: 0 auto;
		margin-top: 30px;
		padding: 10px;
		font-size: 16px;
		font-weight: bold;
		border-radius: 23px;
	}
	.active{
		opacity: 0.5;
	}
	.form{
		margin: 20px;
		
		.title1{
			margin-bottom: 10px;
			color: #fff;
			font-size: 16px;
		}
		>view{
			&:nth-of-type(2){
				padding: 8px 0;
				text-align: center;
				background: rgba(255,255,255,0.1);
				color: #fff;
				border: 1px solid rgba(255,255,255,0.1);
			}
			&:nth-of-type(n + 3){
				display: flex;
				>view{
					padding: 8px 0;
					border: 1px solid rgba(255,255,255,0.1);
					color: #fff;
					text-align: center;
					&:nth-of-type(1){
						flex: 7;
					}
					&:nth-of-type(2){
						flex: 8;
					}
				}
			}
		}
	}
	.content{
		padding-top: 64px;
	}
	.back_head {
		position: fixed;
		// top: 40px;
		left: 0;
		width: 100%;
		height: 80rpx;
		box-sizing: border-box;
		padding: 50rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #ffffff;
		z-index: 999;
	}
.container{
		padding-bottom: 20px;
		background: #40496F;
		min-height: 100vh;
	}
</style>
