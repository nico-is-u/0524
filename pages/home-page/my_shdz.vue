<template>
    <view class="page" id="my_shdz">
        <view class="padding-box-3">
            <view class="card-list-type-1 flex flex-column">
                <view class="card-item">
                    <view class="title flex">
                        <view>李某</view>
                        <view class="phone-number">1581231466</view>
                    </view>
                    <view class="section flex flex-between">
                        <view class="left-side" style="width: 80%;">xx市 心之光大明广场广场龙东大道1288号信源张江广</view>
                        <view class="right-side">
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
        </view>
    </view>
</template>

<script>
export default {
    data(){
        return {
            /* 选中项索引 */
            checked:'0',
        }
    },
    methods:{
        /* 更换选中地址 */
        changeAddress(){

        }
    }
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