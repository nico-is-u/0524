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

        }
    },
    computed:{
        /* nav标题 */
        navTitle(){
            switch(this.type){
                case '1':
                    return '外汇储备'
                case '2':
                    return '短期理财'
            }
        },
        /* 请求url地址 */
        // apiUrl(){
        // },
    },
    methods:{
        /* 返回上一页 */
        backPrev(){
            this.too('/pages/home-page/my_zc_detail3')
        }
    },
    onLoad(options){
        /* 得到页面场景 */
        const {type} = options
        this.type = type
    }
}
</script>