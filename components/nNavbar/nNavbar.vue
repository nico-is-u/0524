<template>
    
    <view class="app-nav-bar flex flex-between" :class="padding ? 'app-padding-nav-bar' : ''">
        <!-- 左侧 -->
        <view class="left-side flex" @click="clickLeft">
            <!-- 显示返回箭头 -->
            <uni-icons v-if="showBackBtn" @click="goBack" type="left" size="24"></uni-icons>
        </view>
        <view class="center-block flex flex-y-center">{{ title }}</view>
        <view class="right-side flex"></view>
    </view>
    
</template>

<script>
export default {
    props:{
        /* 组件背景色 默认透明 */
        backgroundColor:{
            type:String,
            default:'transparent'
        },
        color:{
            type:String,
            default:'#fff'
        },
        title:{
            type:String,
            default:''
        },
        padding:{
            type:Boolean,
            default:false,
        },

        /* 是否返回上一页 */
        back:Boolean,
        showBackBtn:{
            type:Boolean,
            default:true,
        },
        /* 点击左侧箭头的回调方法 */
        backFunc:Function,
    },
    methods:{
        /* 点击左侧按钮 */
        clickLeft(){
            if(this.back){

                let pages = getCurrentPages()
                if(pages.length == 1){
                    this.$helper.goTab('/pages/index/index')
                }else{
                    this.$helper.goBack()
                }

            }else{
                if(typeof this.backFunc == 'function')  this.backFunc()
            }
        },
        /* 点击返回上一页 */
        goBack(){
            uni.navigateBack({delta: 1})
        }
    }
}
</script>

<style lang="scss">
.app-nav-bar{
    height: 88rpx;
    padding: var(--status-bar-height) 11rpx 0;

    position: relative;
    z-index: 99;

    .left-side,.right-side{
        width: 100rpx;
        height: 100%;

        align-items: center;
        padding: 0 11rpx;

        .uni-icons{
            color: white !important;
            transform: translateY(2rpx);
        }

    }
    
    .center-block{
        color: white;
        font-size: 36rpx;
    }

    &.app-padding-nav-bar{
        height: 110rpx;
    }
}
</style>