<template>
     <view class="page page3" id="gf_draw">

        <!-- 顶栏 -->
        <view class="page-navbar">
            <nNavbar title="云数钱包资产提现" :showBackBtn="true" :back="true"></nNavbar>
        </view>

        <view class="padding-box-3 flex flex-column flex-center">
            <u-icon name="checkmark-circle-fill" size="140" color="#12D148"></u-icon>
            <u--text text="提现成功" align="center" size="20" :style="{marginTop: '2.5vh'}" color="#696969"></u--text>
        </view>

    </view>

</template>


<style lang="scss">
page {
    height: 100%;
    background-color: #f9f9f9;
}

#gf_draw {
    height: 100%;

    .padding-box-3{
        margin-top: 15vh;
        padding: 5vh;
    }
}

</style>