<template>
    <view class="page page3">

        <!-- 顶栏 -->
		<view class="page-navbar">
			<nNavbar title="我的资料" :showBackBtn="true" :back="true"></nNavbar>
		</view>

        <!-- 内容正文 -->
        <view class="padding-box-3" style="padding-top: 0;">
            <!-- 菜单 -->
            <view class="ser_list">
                <view class="item" @click="too('/pages/home-page/my_shdz')">
                    <view class="left-side flex flex-y-center">
                        <image src="/static/images/46.png"></image>
                        <text>收货地址</text>
                    </view>
                    <u--text suffixIcon="arrow-right" align="right" iconStyle="font-size: 12px;color:#79818A" text=""></u--text>
                </view>

                <view class="item" @click="too('/pages/home-page/my_real-name_auth')">
                    <view class="left-side flex flex-y-center">
                        <image src="/static/images/47.png"></image>
                        <text>实名认证</text>
                    </view>
                    <u--text suffixIcon="arrow-right" align="right" iconStyle="font-size: 12px;color:#79818A" text=""></u--text>
                </view>

                <!-- <view class="item">
                    <view class="left-side flex flex-y-center">
                        <image src="/static/images/48.png"></image>
                        <text>修改头像</text>
                    </view>
                    <u--text suffixIcon="arrow-right" align="right" iconStyle="font-size: 12px;color:#79818A" text=""></u--text>
                </view> -->

                <view class="item" @click="too('/pages/home-page/pay-account')">
                    <view class="left-side flex flex-y-center">
                        <image src="/static/images/49.png"></image>
                        <text>收款账号</text>
                    </view>
                    <u--text suffixIcon="arrow-right" align="right" iconStyle="font-size: 12px;color:#79818A" text=""></u--text>
                </view>

                <view class="item" @click="too('/pages/home-page/pay-pwd')">
                    <view class="left-side flex flex-y-center">
                        <image src="/static/images/50.png"></image>
                        <text>支付密码</text>
                    </view>
                    <u--text suffixIcon="arrow-right" align="right" iconStyle="font-size: 12px;color:#79818A" text=""></u--text>
                </view>

                <view class="item" @click="too('/pages/system-page/login-pwd?type=2')">
                    <view class="left-side flex flex-y-center">
                        <image src="/static/images/51.png"></image>
                        <text>登录密码</text>
                    </view>
                    <u--text suffixIcon="arrow-right" align="right" iconStyle="font-size: 12px;color:#79818A" text=""></u--text>
                </view>

            </view>

        </view>
    </view>
</template>

<style scoped>
page{
    height: 100%;
    background-color: #f0f2f5;
}
</style>