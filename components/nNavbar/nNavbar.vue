<template>
    
    <view class="app-nav-bar flex flex-between" :class="{
        'app-padding-nav-bar':padding,
        'app-nav-bar-fixed':isFixed
    }">
        <!-- 左侧 -->
        <view class="left-side flex" @click="clickLeft">
            <!-- 显示返回箭头 -->
            <uni-icons v-if="showBackBtn" type="left" size="24"></uni-icons>
        </view>
        <view class="center-block flex flex-y-center">{{ title }}</view>
        <view class="right-side flex flex-x-end">
            <slot/>
        </view>
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
        isFixed:{
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
                    this.too('/pages/index/index','tab')
                }else{
                    this.goBack()
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
    height: 112rpx;
    padding: 24rpx 11rpx 0;

    position: relative;
    z-index: 99;

    .left-side,.right-side{
        width: 200rpx;
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

    &.app-nav-bar-fixed{
        position: fixed;
        width: 100%;
        background: #1292FF;
    }

}
</style>