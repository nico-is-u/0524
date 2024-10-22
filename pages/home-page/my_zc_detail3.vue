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
                            <view class="label">{{userInfo && userInfo.total_foreign ? (parseFloat(userInfo.total_foreign).toFixed(2)) : '0.00'}}</view>
                            <view class="value">外汇储备</view>
                        </view>
                        <view class="line"></view>
                        <view class="menu-item" @click="too('/pages/index/szml-3-order-list')">
                            <view class="label">{{userInfo && userInfo.licai_short ? (parseFloat(userInfo.licai_short).toFixed(2)) : '0.00'}}</view>
                            <view class="value">短期理财</view>
                        </view>
                        <view class="line"></view>
                        
                        <view class="menu-item" @click="too('/pages/home-page/my_zc_detail2?type=5')">
                            <view class="label">{{userInfo && userInfo.topup_balance ? (parseFloat(userInfo.topup_balance).toFixed(2)) : '0.00'}}</view>
                            <view class="value">可用余额</view>
                        </view>
                    </view>

                    <view class="row flex flex-between flex-y-center">
                        <view class="menu-item" @click="too('/pages/home-page/my_zc_detail2?type=4')">
                            <view class="label">{{myBalance}}</view>
                            <view class="value">可提余额</view>
                        </view>
                        <view class="line"></view>
                        <view class="menu-item" @click="too('/pages/index/nyfz_list')">
                            <view class="label">{{nyfzInfo.totalAmount || '0.00'}}</view>
                            <view class="value">诺亚方舟</view>
                        </view>
                        <view class="line"></view>
                        <view class="menu-item" @click="too('/pages/home-page/my_zc_detail2?type=10')">
                            <view class="label">{{userInfo && userInfo.usdt ? (parseFloat(userInfo.usdt).toFixed(2)) : '0.00'}}</view>
                            <view class="value">USDT</view>
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
            /* 诺亚方舟 */
			nyfzInfo:false,
        }
    },
    computed:{
        myBalance(){
            let result = '0.00'
            if(this.userInfo){
                result = 0

                const result1 = parseFloat(this.userInfo.balance).toFixed(2) || 0
                const result2 = parseFloat(this.userInfo.income_balance).toFixed(2) || 0

                result = (parseFloat(result1) + parseFloat(result2)).toFixed(2) || '0.00'
            }
            return result
        }
    },
    methods:{
        /* 返回上一页 */
        backPrev(){
            this.too('/pages/home-page/my_zc')
        },
        getData() {
            this.to.www(this.api.nyfz_info)
            .then(res => {
                const {code = 0} = res
                if(code == 200){
                    this.nyfzInfo = res.data
                }
            })
        },
    },
    onLoad(){
        const userInfo = uni.getStorageSync('user_info')
        if(userInfo)    this.userInfo = userInfo
        
    },
    onShow(){
        this.getData()
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