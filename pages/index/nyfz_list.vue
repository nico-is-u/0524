<template>
    <view class="page page3">

        <!-- 顶栏 -->
		<view class="page-navbar">
			<nNavbar title="申请记录" :showBackBtn="true" :back="true"></nNavbar>
		</view>

        <view class="padding-box-3">
            <view class="card" v-if="dataList.length">
                <view class="card-content">
                    <view class="card-list-type-2">
                        <view class="item" v-for="(item,index) in dataList" :key="index">
                            <view class="row flex flex-between">
                                <view class="left-side">申请的释放金额</view>
                                <view class="right-side">{{item.apply_amount || '0.00'}}元</view>
                            </view>
                            <view class="row flex flex-between">
                                <view class="left-side">实际释放金额</view>
                                <view class="right-side">{{item.real_amount || '0.00'}}元</view>
                            </view>
                            <view class="row flex flex-between">
                                <view class="left-side">释放时间</view>
                                <view class="right-side">{{item.time || '--'}}</view>
                            </view>
                            <view class="row flex flex-between">
                                <view class="left-side">状态</view>
                                <view class="right-side">{{getStatusTxt(item.status)}}</view>
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
    methods:{
        getDataList(){
            this.to.www(this.api.nyfz_list,{type:0})
            .then(res => {
                const {code = 0} = res
                if(code == 200){
                    this.dataList = res.data.data.data || []
                }
            })
        },
        getStatusTxt(status){
            switch(status){
                case 0:
                    return '待审核'
                case 1:
                    return '考核中'
                case 2:
                    return '审核驳回'
                case 3:
                    return '已领取'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
page{
    background-color: #F9F9F9;
}
</style>