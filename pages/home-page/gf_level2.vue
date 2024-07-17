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
                    <!-- <view v-if="(index + 1) > (userInfo.level)" class="level-up" @click="levelUp">去升级 ></view> -->
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
                            <view class="desc">持仓8000U即可升级，购买会员等级永久尊享身份</view>
                        </view>
                        <view class="item">
                            <image src="/static/images/60.png"></image>
                            <view class="label">收益叠加</view>
                            <view class="desc">独享加速收益叠加，更高比例下级收益奖励</view>
                        </view>
                        <view class="item">
                            <image src="/static/images/61.png"></image>
                            <view class="label">兑换折扣</view>
                            <view class="desc">尊享积分好礼兑换折扣</view>
                        </view>
                        <view class="item">
                            <image src="/static/images/62.png"></image>
                            <view class="label">专属权益</view>
                            <view class="desc">月度专属礼包等权益，畅享高品质财富机会</view>
                        </view>

                    </view>
                </view>

                <scroll-view :scroll-x="true" style="height: 50%;" class="margin-t-30" v-if="current2 == 2">
                    <view class="title1">等级权益对比</view>

                    <view class="n-table-2">
                        <view class="th flex">
                            <view style="width:180rpx">等级权益</view>
                            <!-- <view style="width:140rpx">购买会员等级</view> -->
                            <view class="flex flex-column" style="width:220rpx">
                                <text>会员晋升要求</text>
                                <text>(持有外汇储备)</text>
                            </view>

                            <view class="flex flex-column" style="width:220rpx">
                                <text>会员福利工资</text>
                                <text>(每月1日发放)</text>
                            </view>

                            <view class="flex" style="width:180rpx">
                                <text>加速收益叠加</text>
                            </view>

                            <view class="flex" style="width:180rpx">
                                <text>积分好礼兑换</text>
                            </view>

                            <view class="flex" style="width:200rpx">
                                <text>云数币兑换比例</text>
                            </view>
                            
                        </view>
                        
                        <view class="td flex" v-for="(item,index) in levelList" :key="'level-row-' + index">
                            <view style="width:180rpx">{{ item.name || '' }}V{{ item.level || '' }}</view>
                            <view style="width:220rpx"> {{ item.total_assets == 0 ? '-' : '￥'+ item.total_assets}}</view>
                            <view style="width:220rpx"> {{ item.month_wages == 0 ? '-' : '￥'+ item.month_wages }}</view>
                            <view style="width:180rpx"> {{ item.speed_income == 0 ? '-' : item.speed_income }}</view>
                            <view style="width:180rpx"> {{ item.integral_off_name }}</view>
                            <view style="width:200rpx"> {{ item.exchange_ysb ? item.exchange_ysb + '%' : '-' }}</view>
                        </view>
                        
                    </view>
                    
                </scroll-view>

                <view class="margin-t-30" v-if="current2 == 3">
                    <view class="title1">晋级方式</view>
                    <table class="n-table">
                        <tr>
                            <th style="width: 86px">等级权益</th>
                            <th>资产要求(总资产自动升级，日均资产按月考核，次月按日均资产匹配</th>
                            <th>购买方式</th>
                        </tr>
                        <tr>
                            <td>初级会员</td>
                            <td>-</td>
                            <td>{{ levelAmountList[0] || '-' }}</td>
                        </tr>
                        <tr>
                            <td>黄金会员V2</td>
                            <td>总资产8000U/日均5000U</td>
                            <td>{{ levelAmountList[1] || '-' }}</td>
                        </tr>
                        <tr>
                            <td>白金会员V3</td>
                            <td>总资产18000U/日均10000U</td>
                            <td>{{ levelAmountList[2] || '-' }}</td>
                        </tr>
                        <tr>
                            <td>铂金会员V4</td>
                            <td>总资产38000U/日均25000U</td>
                            <td>{{ levelAmountList[3] || '-' }}</td>
                        </tr>
                        <tr>
                            <td>钻石会员V5</td>
                            <td>总资产88000U/日均6000U</td>
                            <td>{{ levelAmountList[4] || '-' }}</td>
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
                
                /* 选中项 */
                current: 0,
                current2: 2,
            }
        },
        computed:{
            /* 等级价格列表 */
            levelAmountList(){
                let result = []
                if(Array.isArray(this.levelList) && this.levelList.length){
                    this.levelList.map((item,index) => {
                        result[index] = '-'
                        if(item.single_amount){
                            result[index] = item.single_amount + 'U'
                        }
                    })
                }
                return result
            },
            /* 会员权益列表 */
            levelList(){
                return this.$store.getters['levelList']
            }
        },
        methods:{
            /* 轮播图图组 */
            setList(){
                const result = []
                for(let i = 1; i <= 5; i++){
                    if((this.userInfo.level) == i){
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
            // 拉取用户等级列表
            getLevelList(){
                this.$store.dispatch('getLevelList')
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
            text-align: center;
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