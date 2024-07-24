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
        <!-- 资金明细 -->
        <view class="padding-box margin-t-30">
            <view class="content" v-if="type">
                
                <view class="title">
					<view class="label">
						<text>资金明细</text>
					</view>
				</view>

                <!-- 列表 -->
                <z-paging ref="paging" :fixed="false" style="height: calc(100% - 200rpx)" v-model="dataList" @query="getDataList">

                    <view class="card-list-type-2">
                        <view class="item" v-for="(item,index) in dataList" :key="index">
                            <!-- 外汇订单 -->
                            <template v-if="type == 3 || type == 2 || type == 10 || type == 5 || type == 4">
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
                            </template>
                        </view>
                    </view>

                </z-paging>

            </view>
        </view>
        <!-- 加载动画 -->
        <u-loading-page :loading="!dataList.length" style="z-index: 3"></u-loading-page>
    </view>
</template>

<script>
/**
 * 我的资产
 */
export default {
    data(){
        return {

            /* 页面场景 */
            type:0,

            /* 充值列表 */
            dataList:[],
            /* 用户信息 */
            userInfo:false,
        }
    },
    computed:{
        /* nav标题 */
        navTitle(){
            switch(this.type){
                case '3':
                    return '外汇储备'
                case '2':
                    return '积分'
                case '10':
                    return 'USDT'
                case '5':
                    return '可用余额'
                case '4':
                    return '可提余额'
                default:
                    return ''
            }
        },
    },
    methods:{
        /* 请求页面数据 */
        async getDataList(pageNo, pageSize){
            try {
                const response = await this.to.www(this.api.balanceLog,{log_type:this.type,page:pageNo})
                const {code,data={}} = response
                if(code == 200){
                    const resData = data.data || []

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
            this.too('/pages/home-page/my_zc')
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
    onLoad(options){

        /* 得到页面场景 */
        const {type} = options
        this.type = type

        /* 个人信息 */
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
        }
    }

    .right-side{
        color: #666;
    }
}
</style>