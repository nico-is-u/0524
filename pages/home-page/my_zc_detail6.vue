<template>
	<view class="page with-bg" id="my-bz">

        <!-- 浮动图标 -->
        <!-- <image src="/static/images/45.png" class="fixed-image" mode="widthFix"></image> -->

        <!-- 头部 -->
		<view class="page-head">
            <!-- 顶栏 -->
			<nNavbar title="保证金缴纳通道" :showBackBtn="true" :back="true" >
                <u--text @click="too('my_zc_detail6_record')" align="right" text="订单列表" style="padding-right: 10rpx; padding-top: 10rpx;" color="white"></u--text>
            </nNavbar>
            <!-- 小菜单 -->
            <view class="padding-box-3" v-if="bzList.length">
                <view class="menu-card flex flex-column" style="padding: 0;">
                    
                    <!-- 产品列表 -->
                    <view class="mr-section padding-box-3 product-list" >
                        <view class="item flex flex-column" v-for="(item,index) in bzList" :key="'item-' + index">
                            <view class="img-box">
                                <image :src="item.cover_img" mode="widthFix"></image>
                            </view>
                            <view class="title flex flex-y-center">
                                <view>{{item.name}}</view>
                            </view>

                            <view class="section flex flex-between">
                                <view class="left-side flex flex-column">
                                    <view class="font-red2">￥{{item.single_amount}}</view>
                                    <!-- <view class="font-gray">233</view> -->
                                </view>

                                <view class="right-side flex flex-y-center" v-if="item.status == 1">
                                    <u-button class="n-button n-button-4" text="立即购买" @click="enterPayPassword(item.id)"></u-button>
                                </view>

                            </view>
                        </view>
                    </view>
                    
                </view>
            </view>
        </view>

        <!-- 输入支付密码 -->
        <u-overlay :show="showPay" @click="showPay = false">
            <view class="warp" style="padding: 0 20px;">
                <view class="rect1" @tap.stop>

                    <!-- <view class="flex">
                        <text style="font-size:30rpx" class="font-red">请注意，每名用户只能认定一次</text>
                    </view> -->

                    <view class="flex margin-t-20">
                        <text style="font-size:40rpx">
                        </text>
                    </view>

                    <view style="margin-top: 40rpx;">
                        <u--text iconStyle="font-size: 34rpx;margin-top:6rpx;margin-right:8rpx"
                            size="14" text="请输入支付密码"></u--text>
                        <view style="margin: 30rpx 0 0;">
                            <xt-verify-code :isPassword="true" :isFocus="true" boxActiveColor="#333" v-model="pay_password"></xt-verify-code>
                        </view>
                    </view>
                    <u-button iconColor="#fff" class="custom-style" text="提交" :loading="isDone"
                        :loadingText="regStatus" @click="requestBz"></u-button>
                </view>
            </view>
        </u-overlay>

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

            /* 数据列表 */
            bzList:[],

            targetId:1,

            showPay:false,
            pay_password:'',                    // 支付密码
            regStatus: '处理中...',
            
            isDone:false,
        }
    },
    computed:{
    },
    methods:{


        /* 获取资产申请列表 */
        getDataList(){
            this.to.www(this.api.bzList)
            .then(response => {
                const {data} = response
                this.bzList = data.data || []
            })
        },

        /* 输入支付密码 */
        enterPayPassword(id){
            this.targetId = id
            this.showPay = true
        },

        /* 申请资产 */
        requestBz(){
            this.isDone = true

            this.to.www(this.api.bzRequest,{
                id:this.targetId,
                pay_password:this.pay_password,
            })
            .then(response => {

                this.isDone = false
                this.showPay = false
                this.toa('操作成功')

                /* 重新请求列表 */
                this.too('/pages/home-page/my_zc_detail6_record')

            })
            .catch(e => {
                this.isDone = false
            })

        },


    },

    onLoad(){
        const userInfo = uni.getStorageSync('user_info')
        if(userInfo)    this.userInfo = userInfo
    },

    onShow(){
        /* 请求数据列表 */
        this.getDataList()
    }
}
</script>

<style lang="scss">
page{
    height: 100%;
    background-color: #F9F9F9;
}
#my-bz{
    height: 100%;

    display: flex;
    flex-direction: column;

    .product-list{
        display: flex;
        flex-direction: column;

        width: 100%;
        gap: 32rpx;

        padding: 40rpx 32rpx 10vh;
        .item{
            border-bottom: 3rpx solid #E9E9E9;
            padding-bottom: 32rpx;

            .img-box{
                padding-bottom: 20rpx;
                image{
                    width: 100%;
                    height: 260rpx;
                }
            }

            .title{
                font-size: 29rpx;
                color: #222;
                gap: 20rpx;
                .label{
                    font-weight: bold;
                }
            }

            .section{
                margin-top: 24rpx;

                .font-red2{
                    font-size: 34rpx;
                }
                
                .font-red3{
                    color: #FE2F2F;
                    font-size: 28rpx;
                }

            }
        }

        .tips1{
            font-size: 26rpx;
            padding: 12rpx 10rpx;
            color: #0182EF;
            background: rgba(1, 130, 239, .075);
            border-radius: 4rpx;
        }

        .tips2{
            font-size: 26rpx;
            padding: 12rpx 10rpx;
            color: #FF8420;
            background-color: rgba(255, 132, 32, .075);
            border-radius: 4rpx;
        }
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

</style>