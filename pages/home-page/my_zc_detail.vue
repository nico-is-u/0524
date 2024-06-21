<template>
	<view class="page with-bg" id="my-zc">
        <!-- 浮动图标 -->
        <image src="/static/images/45.png" class="fixed-image" mode="widthFix"></image>
        <!-- 头部 -->
		<view class="page-head">
            <!-- 顶栏 -->
			<nNavbar title="我的币" :showBackBtn="true" :back="false" :backFunc="backPrev"></nNavbar>
            <!-- 小菜单 -->
        </view>
        <!-- 资金明细 -->
        <view class="padding-box margin-t-30">
            <view class="content">
                
                <view class="title">
					<view class="label">
						<text>余额明细</text>
					</view>
				</view>

                <!-- 列表 -->
                <view class="padding-box-3">
                    <view class="card-list-type-2">
                        <view class="item" v-for="(item,index) in dataList" :key="index">
                            <view class="row flex flex-between">
                                <!-- 币种 -->
                                <view class="left-side">{{item.code}}</view>
                                <view class="right-side">{{item.balance | decimal}}</view>
                            </view>
                        </view>
                    </view>
                </view>

            </view>
        </view>
        <!-- 加载动画 -->
        <u-loading-page :loading="dataList === false" style="z-index: 3"></u-loading-page>
    </view>
</template>

<script>
/**
 * 我的资产
 */
export default {
    data(){
        return {
            /* 充值列表 */
            dataList:false,
            /* 用户信息 */
            userInfo:false,
        }
    },
    methods:{
        /* 拉取充值列表 */
        async getDataList(){
            try {
                const response = await this.to.www(this.api.yunLog2)
                const {code,data:resData=[]} = response
                if(code == 200){
                    console.log(resData)
                    this.dataList = resData
                }else{
                    this.dataList = []
                }
            }catch(e){
                this.dataList = []
            }
        },
        /* 返回上一页 */
        backPrev(){
            this.too('','bac')
        }
    },
    filters:{
        /* 小数处理 */
        decimal(val){
            const str1 = val.toString()
            if(str1 === '0'){
                return '0.00'
            }else{
                return str1
            }
        }
    },
    onLoad(){
        this.getDataList()
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
    .right-side{
        color: #666;
    }
}
</style>