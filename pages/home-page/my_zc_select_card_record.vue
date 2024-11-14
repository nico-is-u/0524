<template>
    <view class="page page3">

		<!-- 顶栏 -->
		<view class="page-navbar">
			<nNavbar title="订单记录" :showBackBtn="true" :back="true"></nNavbar>
		</view>
		
        <view class="padding-box-3" style="padding-top: 0;">

            <!-- tab菜单 -->
            <u-tabs :list="tabList" @click="changeTab" 
            lineWidth="50" 
            lineColor="#f56c6c"
            :itemStyle="{
                width:'50%',
                height:'100rpx',
            }"
            :inactiveStyle="{
                fontSize:'40rpx'
            }"
            :activeStyle="{
                fontSize:'40rpx'
            }"
            style="padding: 0 0 8rpx"></u-tabs>

            <view class="card" style="padding: 32rpx">
                <view class="card-content">
                    <z-paging class="card-list-type-2" ref="paging" :fixed="false" style="height: 100%" v-model="dataList" @query="getDataList" system-loading-text="数据请求中" :auto-show-system-loading="true">
						<view class="item" v-for="(item,index) in dataList" :key="index">
                            <view class="row flex flex-between">
                                <view class="left-side">订单编号</view>
                                <view class="right-side">{{item.order_sn}}</view>
                            </view>

                            <view class="row flex flex-between">
                                <view class="left-side">卡片</view>
                                <view class="right-side">{{item.name}}</view>
                            </view>

                            <view class="row flex flex-between">
                                <view class="left-side">卡费</view>
                                <view class="right-side">{{item.single_amount}}</view>
                            </view>
							
                            <!-- <view class="row flex flex-between">
                                <view class="left-side">状态</view>
                                <view class="right-side">{{getStatusStr(item.status)}}</view>
                            </view> -->

							<view class="row flex flex-between">
							    <view class="left-side">下单时间</view>
							    <view class="right-side">{{item.created_at}}</view>
							</view>

                            <view class="row flex flex-between">
							    <view class="left-side">卡号</view>
							    <view class="right-side">{{item.wsd_card || ''}}</view>
							</view>

                            <view class="row flex flex-between">
                                <view class="left-side">状态</view>
                                <view class="right-side">
                                </view>
                            </view>

                            <u-steps
                                style="padding-bottom: 50rpx"
                                activeColor="#f56c6c"
                                :current="getStatus(item.status)" activeIcon="checkmark" inactiveIcon="arrow-right">
                                <u-steps-item title="提交申请"></u-steps-item>
                                <u-steps-item title="审核中"></u-steps-item>
                                <u-steps-item title="发卡中"></u-steps-item>
                            </u-steps>

                        </view>
					</z-paging>
                </view>
            </view>
            
        </view>
    </view>
</template>

<script>
export default {
    data(){
        return {
            listType:1,                         // 1 储蓄卡  2 信用卡

            /* 申请列表 */
            dataList:[],

            tabList:[
                {name: '借记卡',},
                {name: '信用卡'}
            ],

        }
    },
    methods:{
        getDataList(pageNo, pageSize){
            this.to.www(this.api.masterOrderList,{page:pageNo,type:this.listType})
            .then(res => {
                const {code = 0} = res
                if(code == 200){
					const datas = res.data.data || []

					this.$refs.paging.complete(datas)
                }else{
					this.$refs.paging.complete(false)
				}
            }).catch(e => {
				this.$refs.paging.complete(false)
			})
        },

        /* tab菜单点击 */
        changeTab({index}){
            if(index == 0)  this.listType = 1
            else if(index == 1) this.listType = 2

            this.dataList = []
            this.$refs.paging.reload().catch(() => {})

        },

        /* 获得状态数字 */
        getStatus(status){
            switch(status){
                case 5:
                    return 1
                case 6:
                    return 2
                default:
                    return 0
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.btn{
	background: #1292FF;
	color: #fff;
	border-radius: 8px;
}
.row {
	margin-bottom: 5px!important;
	padding: 7px 0;
}
page{
    background-color: #F9F9F9;
	height: 100%;
}
.page{
	height: 100%;
	.padding-box-3{
		height: 100%;
		.card{
			height: calc(100% - 100rpx);
			padding: 0;
		}
		.card-content{
			height: 100%;
		}
	}
}

</style>