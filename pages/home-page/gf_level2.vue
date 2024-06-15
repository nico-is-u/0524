<template>
	<view class="container">
		<view class="back_head" @click="too('/','bac')">
			<u--text prefixIcon="arrow-left" iconStyle="font-size: 38rpx;color:#ebebeb" color="#ebebeb" align="left"
				text=""></u--text>
			<u--text color="#fff" bold align="center" text="我的等级特权"></u--text>
			<u--text color="#d7d7d7" align="right" text=""></u--text>
		</view>

        <view class="content">
            <!-- 轮播图 -->
            <!-- <u-swiper height="140" :current="current" :autoplay="false" previousMargin="30" bgColor="#40496F"
                    nextMargin="30"
                    circular :list="list1" @change="change" @click="click"></u-swiper> -->
            <swiper class="swiper" previous-margin="30rpx" next-margin="30rpx" >
                <swiper-item v-for="(item,index) in list1" :key="'swiper-item-'+index">
                    <image :src="item"></image>
                    <!-- 去升级按钮 -->
                    <view v-if="(index + 1) > (userInfo.level + 1)" class="level-up" @click="levelUp">去升级 ></view>
                </swiper-item>
            </swiper>

            <view style="padding: 48rpx">
                <view class="tab-list flex">
                    <view class="item" :class="current2 == 1 ? 'active' : ''" @click="current2 = 1">
                        <view class="dot"></view>
                        <view class="text">会员首页</view>
                    </view>
                    <view class="item" :class="current2 == 2 ? 'active' : ''" @click="current2 = 2">
                        <view class="dot"></view>
                        <view class="text">会员权益介绍</view>
                    </view>
                    <view class="item" :class="current2 == 3 ? 'active' : ''" @click="current2 = 3">
                        <view class="dot"></view>
                        <view class="text">会员晋级方式</view>
                    </view>
                </view>

                <view class="margin-t-40" v-if="current2 == 1">
                    <view class="title1">人人皆可成为VIP</view>
                    <view class="grid-list">
                        <view class="item">
                            <image src="/static/images/59.png"></image>
                            <view class="label">超快晋级</view>
                            <view class="desc">持仓2000U即可当级，可选现货、合约交易、持有资产任一式提升等级</view>
                        </view>
                        <view class="item">
                            <image src="/static/images/60.png"></image>
                            <view class="label">最优费率</view>
                            <view class="desc">通享平台费率优惠折扣，HIX抵扣折上折</view>
                        </view>
                        <view class="item">
                            <image src="/static/images/61.png"></image>
                            <view class="label">HTX特权</view>
                            <view class="desc">持有HTX可享受1.5倍极速提升等级，抵扣交易手续费再享折扣</view>
                        </view>
                        <view class="item">
                            <image src="/static/images/62.png"></image>
                            <view class="label">专属权益</view>
                            <view class="desc">超过15项专厘权益，共享全站Prime造富机会</view>
                        </view>

                    </view>
                </view>

                <scroll-view :scroll-x="true" style="height: 50%;" class="margin-t-30" v-if="current2 == 2">
                    <view class="title1">等级权益对比</view>

                    <view class="n-table-2">
                        <view class="th flex">
                            <view style="width:200rpx">等级权益</view>
                            <view style="width:140rpx">购买会员等级</view>
                            <view style="width:140rpx">月度列表（话费）</view>
                            <view style="width:140rpx">理财加速收益</view>
                            <view style="width:250rpx">周期资产解冻最高等级</view>
                            <view style="width:250rpx">推荐会员奖励</view>
                        </view>
                        
                        <view class="td flex" v-for="(item,index) in levelList" :key="'level-row-' + index">
                            <view style="width:200rpx">{{ item.name || '' }}V{{ item.level + 1 || '' }}</view>
                            <view style="width:140rpx">{{ item.single_amount  ? item.single_amount + 'U' : '-' }}</view>
                            <view style="width:140rpx">{{ item.month_gift == 0 ? '-' : '￥' + item.month_gift }}</view>
                            <view style="width:140rpx">{{ item.speed_income == 0 ? '-' : item.speed_income}}</view>
                            <view style="width:250rpx">{{ item.thawing_level == 0 ? '-' : '￥' + item.thawing_level}}</view>
                            <view style="width:250rpx">{{ item.recommend_reward == 0 ? '-' : item.recommend_reward +  '%'}}</view>
                        </view>
                    </view>
                    
                </scroll-view>

                <view class="margin-t-30" v-if="current2 == 3">
                    <view class="title1">晋级方式</view>
                    <table class="n-table">
                        <tr>
                            <th style="width: 86px">等级权益</th>
                            <th>资产要求(总资产自动升级，日均资产按月考核，次月按日均资产匹配</th>
                        </tr>
                        <tr>
                            <td>大众会员V1</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>黄金会员V2</td>
                            <td>总资产8000U/日均5000U</td>
                        </tr>
                        <tr>
                            <td>白金会员V3</td>
                            <td>总资产18000U/日均10000U</td>
                        </tr>
                        <tr>
                            <td>铂金会员V4</td>
                            <td>总资产38000U/日均25000U</td>
                        </tr>
                        <tr>
                            <td>钻石会员V5</td>
                            <td>总资产88000U/日均6000U</td>
                        </tr>
                    </table>
                    
                </view>

            </view>
        </view>
    </view>
</template>

<script>
	export default {
		data() {
            return {
                /* 轮播图图组 */
                list1: [],
				list: [],
                /* 用户信息 */
                userInfo:false,
                /* 等级列表 */
                levelList:[],
                /* 选中项 */
                current: 0,
                current2: 1,
            }
        },
        methods:{
            /* 轮播图图组 */
            setList(){
                const result = []
                for(let i = 1; i <= 5; i++){
                    if((this.userInfo.level + 1) == i){
                        result.push('/static/images/my/level2-' + i + '.png')
                    }else{
                        result.push('/static/images/my/level3-' + i + '.png')
                    }
                }
                this.list1 = result
            },
            /* 升级权益 */
            levelUp(){
                this.too('/pages/home-page/gf_level')
            },
            getLevelList(){
                this.to.www(this.api.levelList)
				.then(res => {
                    console.log(res.data.data)
                    this.levelList = res.data.data || [] 
				})
            },
            change(){

            },
            click(){

            }
        },
        onLoad(){
            const userInfo = uni.getStorageSync('user_info')
            this.userInfo = userInfo

            /* 设置轮播图 */
            this.setList()
            this.getLevelList()
        }
    }
</script>

<style lang="scss" scoped>
.title1{
    margin-bottom: 10px;
    color: rgba(255,255,255,.7);
    font-size: 33rpx;
    font-weight: 500;
}

/* 菜单列表 */
.grid-list{
    display: flex;
    flex-wrap: wrap;

    .item{
        width: 50%;
        gap: 20rpx;

        padding: 10rpx;
        margin-bottom: 25rpx;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        image{
            width: 104rpx;
            height: 104rpx;
        }

        .label,.desc{
            color: white !important;
        }
        .label{
            font-size: 32rpx;
            font-weight: bold;
        }
        .desc{
            font-size: 20rpx;
        }
    }
}

/* 轮播图 */
.swiper{
    height: 280rpx;
    image{
        width: calc(100% - 30rpx);
        height: 100%;
        margin-left: 15rpx;
    }
    .level-up{
        position: absolute;

        background-color: white;
        color: #3D435E;
        font-weight: 600;

        left: 44rpx;
        bottom: 44rpx;

        height: 52rpx;
        padding: 8rpx 28rpx;
        border-radius: 34rpx;

        box-shadow: 0px 4px 4px 0px rgba(26,41,78,0.1);

    }
}

.content{
    padding-top: 64px;

    .tab-list{
        margin-top: 24rpx;
        font-size: 28rpx;
        gap: 32rpx;
        .item{
            position: relative;
            .dot{
                visibility: hidden;
            }
            .text{
                color: rgba(255,255,255,.5) !important;
            }
            &.active{
                .text{
                    color: white !important;
                    font-weight: bold;

                    position: relative;
                    z-index: 1;
                }
                .dot{
                    visibility: visible;

                    width: 24rpx;
                    height: 24rpx;
                    border-radius: 50%;

                    background: linear-gradient(162deg, #3485FA 0%, rgba(43,125,244,0) 100%);

                    position: absolute;
                    left: -10rpx;
                    top: -4rpx;

                    z-index: 0;

                }
            }
        }
    }
}
.back_head {
    position: fixed;
    // top: 40px;
    left: 0;
    width: 100%;
    height: 80rpx;
    box-sizing: border-box;
    padding: 50rpx 30rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #ffffff;
    z-index: 999;
}
.container{
    padding-bottom: 20px;
    background: #40496F;
    min-height: 100vh;
}
</style>