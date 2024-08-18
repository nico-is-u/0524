<template>
    <view class="page page3" id="my_shdz">

        <!-- 顶栏 -->
		<view class="page-navbar">
			<nNavbar title="收货地址" :showBackBtn="true" :back="true"></nNavbar>
		</view>

        <view class="padding-box-3" style="padding-bottom: 10vh" v-if="dataList !== false">
            <view class="card-list-type-1 flex flex-column" v-if="dataList.length">
                <view class="card-item" v-for="(item,index) in dataList" :key="index">
                    <view class="title flex">
                        <view>{{item.name || ''}}</view>
                        <view class="phone-number">{{item.phone || ''}}</view>
                    </view>
                    <view class="section flex flex-between">
                        <view class="left-side" style="width: 80%;">{{ item.address || '' }}</view>
                        <view class="right-side" @click="editInfo(index)">
                            <image src="/static/images/52.png" style="width: 38rpx;" mode="widthFix"></image>
                        </view>
                    </view>
                    <view class="line"></view>
                    <view class="flex flex-between">
                        <view class="left-side">
                            <u-radio-group v-model="checked">
                                <u-radio
                                    label="默认地址"
                                    name="0"
                                    @change="changeAddress">
                                </u-radio>
                            </u-radio-group>
                        </view>
                        <view class="right-side"></view>
                    </view>
                </view>
            </view>

            <!-- 暂无数据 -->
            <view style="padding: 2.5vh 0" class="flex flex-column flex-center" v-else>
                <image src="/static/images/54.png" style="width: 400rpx" mode="widthFix"></image>
                <view class="flex flex-x-center margin-t-80 font-333">暂无数据</view>
            </view>
        </view>

        <!-- 加载动画 -->
        <u-loading-page :loading="dataList === false"></u-loading-page>

        <!-- 新增地址 -->
        <view class="fixed-button-group" v-if="dataList !== false && dataList.length == 0">
            <u-button class="n-button n-button-2" text="+ 添加收货地址" @click="too('/pages/home-page/my_shdz_edit')"></u-button>
        </view>

    </view>
</template>

<script>
export default {
    data(){
        return {
            /* 收货地址列表 */
            dataList:false,
            /* 选中项索引 */
            checked:'0',
        }
    },
    methods:{
        /* 请求数据列表 */
        async getDataList(){
            try {
                const response = await this.to.www(this.api.shdz_list)
                const {code,data={}} = response
                if(code == 200){
                    this.dataList = data.data || []
                }
            }catch(e){
                this.dataList = []
            }
        },
        /* 更换选中地址 */
        changeAddress(){

        },
        /* 编辑数据 */
        editInfo(index){
            const formInfo = this.dataList[index]
            uni.setStorageSync('shdz_info', formInfo)
            this.too('/pages/home-page/my_shdz_edit')
        },
    },
    onShow(){
        /* 请求列表 */
        this.getDataList()
    },
}
</script>

<style lang="scss" scoped>
page{
    height: 100%;
    background-color: #f0f2f5;
}

#my_shdz{
    .phone-number{
        margin-left: 18rpx;
    }
}
</style>