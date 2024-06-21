<template>
	<view class="page with-bg" id="my-zc">
        <!-- 浮动图标 -->
        <image src="/static/images/45.png" class="fixed-image" mode="widthFix"></image>
        <!-- 头部 -->
		<view class="page-head">
            <!-- 顶栏 -->
			<nNavbar title="我的资产" :showBackBtn="true" :back="false" :backFunc="backPrev"></nNavbar>
            <!-- 小菜单 -->
            <view class="padding-box-3">
                <view class="menu-card">
                    <view class="menu-item" @click="too('/pages/home-page/my_zc_detail')">
                        <view class="label">{{userInfo && userInfo.yun ? (parseFloat(userInfo.yun).toFixed(2)) : ''}}</view>
                        <view class="value">我的币</view>
                    </view>
                    <view class="line"></view>
                    <view class="menu-item">
                        <view class="label">{{userInfo && userInfo.usdt ? (parseFloat(userInfo.usdt).toFixed(2)) : ''}}</view>
                        <view class="value">USDT</view>
                    </view>
                    <view class="line"></view>
                    <view class="menu-item">
                        <view class="label">{{userInfo && userInfo.topup_balance ? (parseFloat(userInfo.topup_balance).toFixed(2)) : ''}}</view>
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
                <scroll-view style="height: 60vh" :scroll-y="true">

                    <view class="card-list-type-2" v-if="Array.isArray(dataList) && dataList.length">
                        <view class="item" v-for="(item,index) in dataList" :key="index">
                            <view class="row flex flex-between">
                                <view class="left-side">{{item.type_text || ''}}</view>
                                <view class="right-side">
                                    <view :class="item.change_balance_color || ''">{{item.change_balance || ''}}</view>
                                </view>
                            </view>
                            <view class="row flex flex-between">
                                <view class="left-side">{{item.order_sn || ''}}</view>
                                <view class="right-side">{{item.created_at || ''}}</view>
                            </view>
                        </view>                    
                    </view>

                    <!-- 没有数据 -->
                    <view style="padding: 2.5vh 0" class="flex flex-column flex-center" v-else>
                        <image src="/static/images/54.png" style="width: 400rpx" mode="widthFix"></image>
                        <view class="flex flex-x-center margin-t-80 font-333">暂无数据</view>
                    </view>

                </scroll-view>

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
                const response = await this.to.www(this.api.balanceLog,{log_type:'0'})
                const {code,data={}} = response
                if(code == 200){
                    const resData = data.data || []
                    if(Array.isArray(resData) && resData.length){
                        resData.map(item => {
                            if(item.change_balance){
                                if(item.change_balance[0] == '-'){
                                    item.change_balance_color = 'font-green'
                                }else{
                                    item.change_balance_color = 'font-red'
                                }
                            }else{
                                item.change_balance_color = ''
                            }
                        })
                    }
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
            uni.switchTab({
                 url: '/pages/index/my'
            })
        }
    },
    filters:{
        /* 小数处理 */
        decimal(val){
            return parseFloat(val).toFixed(2)
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