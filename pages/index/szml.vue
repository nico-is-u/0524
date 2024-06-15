<template>
	<view class="page">
		<view class="k-line-head k-line-head-2">
             <!-- 顶栏 -->
			<nNavbar title="数字魅力" :showBackBtn="false" >
				<u--text color="white" align="right" text="订单列表" style="padding-right: 10rpx; padding-top: 10rpx"></u--text>
			</nNavbar>

			<!-- K线图 -->
			<view class="k-line-shell">

				<!-- tab 菜单 -->
				<view class="tab-menu-type-1 flex flex-between flex-y-end">
					<view class="menu-item active menu-item-1 flex flex-center">
						<view class="triangle"></view>
						<text>存币生息</text>
					</view>
					<view class="menu-item menu-item-2 flex flex-center" @click="too('/pages/index/szml-2')">
						<view class="triangle"></view>
						<text>理财产品</text>
					</view>
				</view>

				<!-- 折线图 -->
				<view class="flex" style="height: 300rpx; background-color: white"></view>

				<!-- 操作区域 -->
				<view class="mr-section padding-box-3" style="background-color: white">
					<view class="form-group margin-t-40">
						<!-- 交易密码 -->
						<view class="label">质押云数币</view>
						<view class="form-control">
							<u--input border="none" type="password" placeholder="请输入质押的云数币数量"></u--input>
						</view>
						<view class="form-tips">
							<view class="left-side">可用</view>
							<view class="right-side">483Y</view>
						</view>

					</view>
				</view>
				
			</view>

			<!-- 提交按钮 -->
            <view class="margin-t-20" style="padding: 32rpx">
                <u-button class="n-button n-button-2" text="质押" ></u-button>
            </view>


        </view>
    </view>
</template>

<script>
export default {
	methods:{

	}
}
</script>

<style lang="scss">
page{
	height: 100%;
	background-color: #f9f9f9;
}

</style>