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
                    <u-cell-group style="width: 100%;">
                        <u-cell
                            v-for="(item,index) in bzList"
                            :key="'item-' + index"
                            size="large"
                            :title="item.names[0]"
                            :label="item.names[1]"
                            :value="item.names[1]"
                            isLink
                            @click="enterPayPassword(item.id)"
                        ></u-cell>
                    </u-cell-group>
                    
                    
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

        splitString(input) {
            const regex = /（\S+）/
            const match = input.search(regex)
            if (match != -1) {
                return [
                    input.slice(0,match),
                    input.slice(match)
                ]
            }
            return [input,null]
        },

        /* 获取资产申请列表 */
        getDataList(){
            this.to.www(this.api.bzList)
            .then(response => {
                const {data} = response
                const result = data.data || []
                if(result.length){
                    result.map((item,index,arr) =>{
                        if(item.name){
                            arr[index]['names'] = this.splitString(item.name)
                        }
                    })
                }
                console.log(result)
                this.bzList = result
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
                this.showPay = false
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