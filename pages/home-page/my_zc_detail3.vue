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
                
                <!-- 小标题 -->
                <view class="like-h1-h2 flex flex-column " @click="too('/pages/home-page/my_zc_detail5')">
                    <view class="like-h1">万事达联名钱包资产确权认定 ></view>
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
        },
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

        /* 用户信息 */
		getUserInfo() {
			this.to.www(this.api.user_info).then(res => {
				this.userInfo = res.data
				uni.setStorage({
					data: this.userInfo,
					key: 'user_info'
				})

			})
		},

    },
    onLoad(){
        const userInfo = uni.getStorageSync('user_info')
        if(userInfo)    this.userInfo = userInfo

        this.getUserInfo()

        uni.showLoading()
        this.to.www(this.api.wsdJindu)
        .then(res => {
            uni.hideLoading()
            const {type} = res.data
            switch(type){
                /* 万事达卡申请 */
                case 1:
                    this.too('/pages/home-page/my_zc_select_card')
                    break
                /* 跳确权 */
                case 2:
                    this.too('/pages/home-page/my_zc_detail5')
                /* 跳保证金 */
                    break
                case 3:
                    this.too('/pages/home-page/my_zc_detail6')
                    break

            }
        })
        .catch(e => {
            uni.hideLoading()
        })
        

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

    .like-h1-h2{
        position: relative;
        z-index: 3;
        padding: 32rpx 48rpx 0;

        >view{
            color: black;
        }

        >.like-h1{
            text-align: center;
            font-size: 36rpx;
            font-weight: bold;
            color: #427bef;
        }

        // >.like-h2{
        //     text-align: center;
        //     font-size: 64rpx;
        //     color: #427bef;
        //     font-weight: bold;
        // }
    }
}

.warp {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    z-index: 3;
}

.rect1 {
    border-radius: 10px;
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
    background: #fff;

    .price-info{
        font-size: 28rpx;
        margin-top: 40rpx;
        padding:6rpx 0 0 0rpx;
    }

    .custom-style {
        width: 30vw;
        border-radius: 8px;
        margin-top: 30px;
        background: #1292FF;
        color: #fff;
    }
}

.user-zc-qq{
    width: 100%;

    position: relative;
    margin-top: 24rpx;

    image{
        width: 100%;
    }

    .text-scene{
        view{
            position: absolute;
            font-size: 30rpx;
            line-height: 1;

            &.username{
                width: 50%;
                top: 32%;
                left: 39%;
                height: 30rpx;
            }

            &.idnum{
                width: 50%;
                top: 36.5%;
                left: 39%;
                height: 30rpx;
            }

            &.account{
                font-size: 38rpx;
                height: 38rpx;

                width: 50%;
                top: 51.5%;
                left: 35%;
            }

            &.account2{
                font-size: 24rpx;
                height: 24rpx;
                color: #333;

                width: 50%;
                top: 56.5%;
                left: 35%;
            }

            &.datetime{
                width: 50%;
                height: 24rpx;
                top: 81.5%;
                left: 48%;
                font-size: 24rpx;
            }
        }
    }
}

</style>