<template>
	<view class="container">
		<image src="/static/images/my/level1.png" style="width: 100%;" mode="widthFix"></image>
		<view class="list">
			<view class="list-item">
				<image src="/static/images/my/score.png" style="width: 100%;" mode="widthFix"></image>
				<view>
					<view>100元加油卡</view>
					<view>
						<view class="btn">领取</view>
					</view>
				</view>
			</view>
			<view class="list-item">
				<image src="/static/images/my/score.png" style="width: 100%;" mode="widthFix"></image>
				<view>
					<view>100元加油卡</view>
					<view>
						<view class="btn">领取</view>
					</view>
				</view>
			</view>
			<view class="list-item">
				<image src="/static/images/my/score.png" style="width: 100%;" mode="widthFix"></image>
				<view>
					<view>100元加油卡</view>
					<view>
						<view class="btn">领取</view>
					</view>
				</view>
			</view>
			<view class="list-item">
				<image src="/static/images/my/score.png" style="width: 100%;" mode="widthFix"></image>
				<view>
					<view>100元加油卡</view>
					<view>
						<view class="btn">领取</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			
		}
	}
</script>

<style lang="scss">
	.list{
		margin-top: 10px;
		display: grid;
		grid-template-columns: repeat(2,1fr);
		grid-gap: 20px;
		.list-item{
			background: #fff;
			border-radius: 8px;
			padding-bottom: 5px;
			>view{
				padding: 5px 10px;
				>view{
					&:nth-of-type(1){
						font-size: 14px;
						color: #222222;
						margin-bottom: 10px;
						text-align: center;
					}
				}
			}
		}
		.ad{
			display: flex;
			align-items: center;
		}
		.btn{
			background: linear-gradient( 90deg, #2E9FFF 0%, #0182EF 100%);
			border-radius: 36px 36px 36px 36px;
			color: #fff;
			width: 50%;
			padding: 5px 20px;
			text-align: center;
			margin: 0 auto;
		}
	}
	.container{
		padding: 10px 20px;
		background: #f7f7f7;
		min-height: calc(100vh - 44px);
	}
</style>
