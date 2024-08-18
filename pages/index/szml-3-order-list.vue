<template>
    <view class="page page3">

		<!-- 顶栏 -->
		<view class="page-navbar">
			<nNavbar title="订单记录" :showBackBtn="true" :back="true"></nNavbar>
		</view>

        <view class="padding-box-3">
            <view class="card">
                <view class="card-content">
                    <z-paging class="card-list-type-2" ref="paging" :fixed="false" style="height: 100%" v-model="dataList" @query="getDataList" system-loading-text="数据请求中" :auto-show-system-loading="true">
						<view class="item" v-for="(item,index) in dataList" :key="index">
                            <view class="row flex flex-between">
                                <view class="left-side">订单编号</view>
                                <view class="right-side">{{item.order_sn}}</view>
                            </view>

                            <view class="row flex flex-between">
                                <view class="left-side">理财投资金额</view>
                                <view class="right-side">{{item.licai_number}}</view>
                            </view>

							<view class="row flex flex-between">
                                <view class="left-side">投资数量</view>
                                <view class="right-side">{{item.buy_num}}</view>
                            </view>
							
							<view class="row flex flex-between">
							    <view class="left-side">总收益</view>
							    <view class="right-side">{{item.licai_income}}</view>
							</view>
							<view class="row flex flex-between">
							    <view class="left-side">本周收益</view>
							    <view class="right-side">{{item.daily_bonus}}</view>
							</view>
							<view class="row flex flex-between">
							    <view class="left-side">总收益</view>
							    <view class="right-side">{{item.gain_bonus}}</view>
							</view>
							<view class="row flex flex-between">
								<view class="left-side">周期</view>
								<view class="right-side">{{ item.licai_period }}天</view>
							</view>
                            <view class="row flex flex-between">
                                <view class="left-side">状态</view>
                                <view class="right-side">{{getStatusStr(item.status)}}</view>
                            </view>
							<view class="row flex flex-between">
							    <view class="left-side">下单时间</view>
							    <view class="right-side">{{item.created_at}}</view>
							</view>
							<!-- <view class="row flex flex-between" v-if="item.canShuhui">
							    <view class="left-side">操作</view>
							    <view class="right-side">
									<u-button class="btn" text="赎回" @click="shuhui(item.id)"></u-button>
								</view>
							</view> -->
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
            /* 申请列表 */
            dataList:[],
        }
    },
	computed: {
		getStatusStr(status) {
			return (status) => {
				switch (status){
					case 1:
						return '待支付';
					case 2:
						return '收益中';
					case 3:
						return '待出售';
					case 4:
						return '已赎回';
					case 5:
						return '提前赎回';
					default:
						break;
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
						_.to.www(_.api.licaiRedemption, {id: id}, 'p').then(res => {
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
        getDataList(pageNo, pageSize){
            this.to.www(this.api.licaiShortOrderList,{page:pageNo})
            .then(res => {
                const {code = 0} = res
                if(code == 200){
					const datas = res.data.data || []
					const timestamp = (new Date().getTime() / 1000)
					if(Array.isArray(datas) && datas.length){
						datas.map((item,index,list) => {
							item.canShuhui = false
							if(item.status == 2 && timestamp > item.end_time){
								item.canShuhui = true
							}
							
							list[index] = item
						})
					}
					this.$refs.paging.complete(datas)
                }else{
					this.$refs.paging.complete(false)
				}
            }).catch(e => {
				this.$refs.paging.complete(false)
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
	height: 100%;
}
.page{
	height: 100%;
	.padding-box-3{
		height: 100%;
		.card{
			height: 100%;
			padding: 0;
		}
		.card-content{
			height: 100%;
		}
	}
}
</style>