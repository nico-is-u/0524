<template>
	<view class="page with-bg" id="my-zc">
        <!-- 浮动图标 -->
        <image src="/static/images/45.png" class="fixed-image" mode="widthFix"></image>
        <!-- 头部 -->
		<view class="page-head">
            <!-- 顶栏 -->
			<nNavbar :title="navTitle" :showBackBtn="true" :back="false" :backFunc="backPrev"></nNavbar>
            <!-- 小菜单 -->
        </view>
        <!-- 加载动画 -->
        <u-loading-page :loading="loading" style="z-index: 3"></u-loading-page>
    </view>
</template>

<script>
/**
 * 外汇储备
 */

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