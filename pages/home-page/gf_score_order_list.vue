<template>
    <view class="page page3">
        <!-- 顶栏 -->
		<view class="page-navbar">
			<nNavbar title="兑换订单" :showBackBtn="true" :back="true"></nNavbar>
		</view>

        <view class="padding-box-3">
            <view class="card">
                <view class="card-content">
                    <z-paging class="card-list-type-2" ref="paging" :fixed="false" style="height: 100%" v-model="dataList" @query="getDataList" system-loading-text="数据请求中" :auto-show-system-loading="true">
						<view class="item" v-for="(item,index) in dataList" :key="index">

                            <view class="row flex flex-between">
                                <view class="left-side">订单编号</view>
                                <view class="right-side">{{item.order_sn || ''}}</view>
                            </view>

                            <view class="row flex flex-between">
                                <view class="left-side">兑换产品</view>
                                <view class="right-side">{{item.name || ''}}</view>
                            </view>

							<view class="row flex flex-between">
                                <view class="left-side">兑换积分</view>
                                <view class="right-side">{{item.single_amount || ''}}</view>
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
    computed:{
        getStatusStr(status) {
			return (status) => {
				switch (status){
					case 1:
						return '待支付';
					case 2:
						return '支付完成';
					case 3:
						return '失败';
					case 4:
						return '待发货';
					case 5:
						return '已发货';
					default:
						break;
				}
			}
		}
    },
    methods:{
        getDataList(pageNo, pageSize){
            this.to.www(this.api.integralOrderList,{page:pageNo})
            .then(res => {
                const {code = 0} = res
                if(code == 200){
					const datas = res.data.data || []

					// const timestamp = (new Date().getTime() / 1000)
					// if(Array.isArray(datas) && datas.length){
					// 	datas.map((item,index,list) => {
					// 		item.canShuhui = false
					// 		if(item.status == 2 && timestamp > item.end_time){
					// 			item.canShuhui = true
					// 		}
							
					// 		list[index] = item
					// 	})
					// }

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