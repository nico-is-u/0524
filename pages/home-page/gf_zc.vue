<template>
	<view class="page with-bg" id="my-zc">
        <!-- 浮动图标 -->
        <image src="/static/images/45.png" class="fixed-image" mode="widthFix"></image>
        <!-- 头部 -->
		<view class="page-head">
            <!-- 顶栏 -->
			<nNavbar title="我的资产" :showBackBtn="true"></nNavbar>
            <!-- 小菜单 -->
            <view class="padding-box-3">
                <view class="menu-card">
                    <view class="menu-item">
                        <view class="label">88888</view>
                        <view class="value">云数币</view>
                    </view>
                    <view class="line"></view>
                    <view class="menu-item">
                        <view class="label">88888</view>
                        <view class="value">USDT</view>
                    </view>
                    <view class="line"></view>
                    <view class="menu-item">
                        <view class="label">88888</view>
                        <view class="value">CNY</view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 资金明细 -->
        <view class="padding-box">
            <view class="content">
                <view class="title">
					<view class="label">
						<text>资金明细</text>
					</view>
				</view>

                <!-- 列表 -->
				<view class="list">
                    <view class="item">
                        <view class="row flex flex-between">
							<view class="left-side">充值USDT</view>
							<view class="right-side">1000U</view>
						</view>
                        <view class="row flex flex-between">
							<view class="left-side">充值USDT</view>
							<view class="right-side">1000U</view>
						</view>
                    </view>

                    <view class="item">
                        <view class="row flex flex-between">
							<view class="left-side">充值USDT</view>
							<view class="right-side">1000U</view>
						</view>
                        <view class="row flex flex-between">
							<view class="left-side">充值USDT</view>
							<view class="right-side">1000U</view>
						</view>
                    </view>
                    
                </view>

            </view>
        </view>

    </view>
</template>

<script>
/**
 * 我的资产
 */
export default {
    
}
</script>

<style lang="scss">
#my-zc{
    .right-side{
        color: #666;
    }
}
</style>