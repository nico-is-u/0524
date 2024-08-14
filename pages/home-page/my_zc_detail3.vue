<template>
	<view class="page with-bg" id="my-zc">
        <!-- 浮动图标 -->
        <image src="/static/images/45.png" class="fixed-image" mode="widthFix"></image>
        <!-- 头部 -->
		<view class="page-head">
            <!-- 顶栏 -->
			<nNavbar title="我的项目" :showBackBtn="true" :back="false" :backFunc="backPrev"></nNavbar>
            <!-- 小菜单 -->
            <view class="padding-box-3">
                <view class="menu-card flex flex-column">

                    <view class="row flex flex-between flex-y-center">
                        <view class="menu-item" @click="too('/pages/index/szml-2-order-list')">
                            <view class="label">{{userInfo && userInfo.licai_short ? (parseFloat(userInfo.licai_short).toFixed(2)) : '0.00'}}</view>
                            <view class="value">外汇储备</view>
                        </view>
                        <view class="line"></view>
                        <view class="menu-item" @click="too('/pages/index/szml-3-order-list')">
                            <view class="label">{{userInfo && userInfo.total_foreign ? (parseFloat(userInfo.total_foreign).toFixed(2)) : '0.00'}}</view>
                            <view class="value">短期理财</view>
                        </view>
                        <view class="line"></view>
                        <view class="menu-item">
                            <view class="label"></view>
                            <view class="value"></view>
                        </view>
                    </view>
                    
                </view>
                
            </view>
        </view>
    </view>
</template>

<script>
/**
 * 外汇储备
 */
export default {
    data(){
        return {
            /* 用户信息 */
            userInfo:false,
        }
    },
    methods:{
        /* 返回上一页 */
        backPrev(){
            this.too('/pages/home-page/my_zc')
        }
    },
    onLoad(){
        const userInfo = uni.getStorageSync('user_info')
        if(userInfo)    this.userInfo = userInfo
    }
}
</script>

<style lang="scss">
page{
    height: 100%;
    background-color: #F9F9F9;
}
#my-zc{
    height: 100%;

    display: flex;
    flex-direction: column;
}
</style>