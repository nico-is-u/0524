<template>
    <view class="page page3">

		<!-- 顶栏 -->
		<view class="page-navbar">
			<nNavbar title="订单记录" :showBackBtn="true" :back="true"></nNavbar>
		</view>

        <view class="padding-box-3">
            <view class="card" v-if="dataList.length">
                <view class="card-content">
                    <view class="card-list-type-2">
                        <view class="item" v-for="(item,index) in dataList" :key="index">
                            <view class="row flex flex-between">
                                <view class="left-side">订单编号</view>
                                <view class="right-side">{{item.order_sn}}</view>
                            </view>
                            <view class="row flex flex-between">
                                <view class="left-side">质押数量</view>
                                <view class="right-side">{{item.pledge_number}}</view>
                            </view>
							
							<view class="row flex flex-between">
							    <view class="left-side">收益率</view>
							    <view class="right-side">{{item.pledge_income}}%</view>
							</view>
							<view class="row flex flex-between">
							    <view class="left-side">今日收益</view>
							    <view class="right-side">{{item.daily_bonus}}</view>
							</view>
							<view class="row flex flex-between">
							    <view class="left-side">总收益</view>
							    <view class="right-side">{{item.gain_bonus}}</view>
							</view>
							<view class="row flex flex-between">
							    <view class="left-side">质押周期</view>
							    <view class="right-side">{{item.pledge_period}}</view>
							</view>
                            <view class="row flex flex-between">
                                <view class="left-side">状态</view>
                                <view class="right-side">{{getStatusStr(item.status)}}</view>
                            </view>
							<view class="row flex flex-between">
							    <view class="left-side">下单时间</view>
							    <view class="right-side">{{item.created_at}}</view>
							</view>
                            <view class="row flex flex-between" v-if="item.status == 2">
							    <view class="left-side">操作</view>
							    <view class="right-side">
									<u-button class="btn" text="赎回" @click="shuhui(item.id)"></u-button>
								</view>
							</view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="flex flex-x-center" style="padding-top: 10vh" v-else>暂无数据</view>
        </view>
    </view>
</template>

<script>
export default {
    data(){
        return {
            /* 申请列表 */
            dataList:[],
        }
    },
    onLoad(){
        this.getDataList()
    },
	computed: {
		getStatusStr(status) {
			return (status) => {
				switch (status){
					case 2:
						return '收益中';
					case 4:
						return '已结束';
                    case 5:
                        return '赎回审核';
					case 6:
						return '已赎回'
					case 7:
						return '赎回审核拒绝'
					default:
                        return ''
				}
			}
		}
	},
    methods:{
        shuhui(id){
			let _ = this;
			uni.showModal({
				title: '提示',
				content: '确定要赎回吗',
				success: function (res) {
					if (res.confirm) {
						_.to.www(_.api.licaiRedemption2, {id: id}, 'p').then(res => {
							_.toa('操作成功')
							setTimeout(() => {
								_.getDataList();
							}, 1500)
						}).catch(err => {
							
						})
					} else if (res.cancel) {
					}
				}
			});
		},
        getDataList(){
            this.to.www(this.api.pledgeOrderList)
            .then(res => {
                const {code = 0} = res
                if(code == 200){
                    this.dataList = res.data.data || []
                }
            })
        }
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
}
</style>