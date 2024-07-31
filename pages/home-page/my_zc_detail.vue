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

                <view class="title">
					<view class="label">
						<text>资金明细</text>
					</view>
				</view>

                <!-- 列表 -->
                <z-paging ref="paging" :fixed="false" style="height: calc(100% - 200rpx)" v-model="dataList2" @query="getDataList2">
                    <view class="card-list-type-2">
                        <view class="item" v-for="(item,index) in dataList2" :key="index">
                            <!-- 外汇订单 -->
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
                </z-paging>

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
            /* 云数币明细 */
            dataList2:[],
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
        /* 请求页面数据 */
        async getDataList2(pageNo, pageSize){
            try {
                const response = await this.to.www(this.api.balanceLog,{log_type:7,page:pageNo})
                const {code,data={}} = response
                if(code == 200){
                    const resData = data.data || []

                    this.loading = false

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

                    this.$refs.paging.complete(resData)
                }else{
                    this.$refs.paging.complete(false)
                }
            }catch(e){
                this.$refs.paging.complete(false)
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
    height: 100%;

    display: flex;
    flex-direction: column;

    >.padding-box{
        flex-grow: 1;

        display: flex;
        flex-direction: column;

        >.content{
            height: 100%;

            display: flex;
            flex-direction: column;

        }
    }

    .right-side{
        color: #666;
    }
}
</style>