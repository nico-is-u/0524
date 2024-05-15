<template>
	<view class="the_page_rank">
		<view class="title_tab bg">
			<view class="item itemph">
				<u--text prefixIcon="integral-fill" align="center" size="30rpx"
					iconStyle="font-size: 32rpx;color:#B80606" text="名称"></u--text>
			</view>
			<view class="item">
				<u--text align="center" size="30rpx" iconStyle="font-size: 32rpx;color:#EE2B2A" text="会员名次"></u--text>
			</view>
			<view class="item">
				<u--text prefixIcon="" align="center" size="30rpx"
					iconStyle="font-size: 32rpx;color:#EE2B2A" text="公证人数"></u--text>
			</view>
			<view class="item">
				<u--text prefixIcon="" align="center" size="30rpx"
					iconStyle="font-size: 32rpx;color:#EE2B2A" text="奖励"></u--text>
			</view>
		</view>

		<template>
			<view style="margin: 60rpx auto;" v-if="!list.length">
				<u-empty mode="search" icon-size="50" ></u-empty>
			</view>
			<view class="title_tab list" v-for="(item,index) in list" :key="index">
				<view class="item itemph">
					<u--text mode="name" align="center" :text="item.realname" format="encrypt"></u--text>
					<u--text :text="item.phone" align="center"></u--text>
				</view>
				<view class="item">
					<view class="paiming">第{{item.sort}}名</view>
				</view>
				<view class="item" style="color: black;">
					<text>{{item.team_num}}</text>
				</view>
				<view class="item">
					<u--text mode="price" align="center" :text="item.reward"></u--text>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			};
		},
		onLoad() {
				this.getdata()
		},
		methods: {
			getdata() {
				this.to.www(this.api.sys_rank_list)
					.then(res => {
						this.list = res.data
					})
			}
		}
	}
</script>

<style lang="scss">
	.title_tab {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 60rpx;
		padding: 10rpx;

		.item {
			text-align: center;
			width: calc(70%/3);
		}

		.item.itemph {
			width: 30%;
		}
	}

	.title_tab.bg {
		background-image: linear-gradient(to bottom, #eef1ff, #f2fcff);
	}

	.title_tab.list {
		padding: 20rpx 10rpx;
		border-bottom: 2rpx solid #e4f0f8;

		.paiming {
			width: 55%;
			margin: 0 auto;
			background-color:$th;
			color: #fff;
			line-height: 50rpx;
			border-radius: 6rpx;
			font-size: 26rpx;
		}
	}


	.the_page_rank {}
</style>