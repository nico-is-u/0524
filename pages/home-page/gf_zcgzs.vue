<template>
	<view>
		<view class="content-czgz" v-for="(item,index) in datas" :key="index">
			<image src="../../static/images/home/gz2.jpg" style="width: 100%;position: relative;" mode="widthFix">
				<view class="time">
					<text class="line">2024</text> <text>年</text>
					<text class="line">{{item.created_at.slice(5,7)}}</text> <text>月</text>
					<text class="line">{{item.created_at.slice(8,10)}}</text> <text>日</text>
				</view>
			</image>
			<view class="contents">
				<view style="display: block;text-align: right;font-size: 12px;margin-bottom: 10rpx;">【2024】富证字第 <text
						class="line">{{item.number}}</text> 号 </view>
				<view class="item">
					<text>申请人姓名：</text>
					<text class="line">{{uri.realname}}</text>
				</view>
				<view class="item">
					<text>公民身份证号码：</text>
					<text class="line">{{uri.ic_number}}</text>
				</view>
				<view class="item">
					<text>公证事项：</text>
					<text class="line">财产证明</text>
				</view>
				<view class="item" style="font-size: 10px;">
					<text>为让共富工程用户更好的使用资产和继承，根据《中华人民共和国公证法》及《公证程序规则》，申请人</text>
					<text class="line">{{uri.realname}}</text> <text>于</text>
					<text class="line">2024</text> <text>年</text>
					<text class="line">{{item.created_at.slice(5,7)}}</text> <text>月</text>
					<text class="line">{{item.created_at.slice(8,10)}}</text>
					<text>日由中国梦共富工程民族振兴局公证员李富君对申请人的以下财产进行公证：</text>
				</view>
				<view class="list">
					<view class="item">
						<text>1、共富工程专属卡：</text>
						<text class="line">{{uri.wallet_id}}</text>
					</view>
					<view class="item">
						<text>2、E-CNY资产：</text>
						<text class="line">{{item.assessment_amount}}</text>
						<text style="margin-left: 10rpx;font-weight: normal;">(税费已缴纳)</text>
					</view>
					<view class="item">
						<text>3、华为手机：</text>
						<text class="">{{item.tongxun_text}}</text>
					</view>
					<view class="item">
						<text>4、养老保障金：</text>
						<text class="">{{item.yanglao_text}}</text>
					</view>
					<view class="item">
						<text>5、出行保障车：</text>
						<text class="">{{item.chuxing_text}}</text>
					</view>
					<view class="item">
						<text>6、住房津贴：</text>
						<text class="">{{item.jintie_text}}</text>
					</view>
					<view class="item">
						<text>7、保障性住房：</text>
						<text class="">{{item.zhufang_text}}</text>
					</view>
				</view>
				<view class="list" style="font-size: 8px;">
					经查申请人资产均真实、有效，并可流通，申请人可以合法对资产进行处置。
				</view>

			</view>
		</view>
		<view style="margin: 60rpx auto;" v-if="!datas.length">
			<u-empty mode="list" icon-size="50"></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// datas: {
				// 	tongxun_text: "0部", //华为手机
				// 	yanglao_text: "0万", //养老保障金
				// 	chuxing_text: "2台", //出行保障车
				// 	zhufang_text: "无", //保障性住房
				// 	notarization_amount: "0.00" ,//公证费
				// 	created_at: "2024-03-17 01:28:09",
				// },
				datas: [],
				uri: {}
			};
		},
		onLoad() {

			this.uri = uni.getStorageSync("user_info")

			this.to.www(this.api.lilislsfhkasddsadd)
				.then(res => {
					this.datas = res.data.data
				})
				.catch(err => {
					console.log(err);
				})
		}
	}
</script>

<style lang="scss">
	.content-czgz {
		width: 96%;
		margin: 30rpx auto;
		position: relative;

		.time {
			text-align: right;
			font-size: 12px;
			margin-top: 10rpx;
			position: absolute;
			bottom: 100rpx;
			right: 60rpx;
		}

		.contents {
			position: absolute;
			top: 35%;
			padding: 0 80rpx;

			.item {
				font-size: 12px;
				margin-bottom: 2rpx;
				color: #000000;
			}



			.list {
				margin-top: 15rpx;
			}
		}
	}

	.line {
		border-bottom: 2rpx solid #333;
		padding: 0 10rpx;
		font-weight: normal;
	}
</style>