<template>
	<view class="page with-bg" id="my-zc">
        <!-- 浮动图标 -->
        <!-- <image src="/static/images/45.png" class="fixed-image" mode="widthFix"></image> -->

        <!-- 头部 -->
		<view class="page-head">
            <!-- 顶栏 -->
			<nNavbar title="资产确权认定" :showBackBtn="true" :back="true" ></nNavbar>
            <!-- 小菜单 -->
            <view class="padding-box-3" v-if="display == 2">
                <view class="menu-card flex flex-column">
                    <!-- 资产申请确权列表 -->
                    <view style="width: 100%">
                        <u-cell-group>
                            <u-cell
                                size="large"
                                title="A档认定"
                                label="(20万以内)"
                                value="4000元"
                                isLink
                                @click="enterPayPassword(1)"
                            ></u-cell>
    
                            <u-cell
                                size="large"
                                title="B档认定"
                                label="(20万至300万以内)"
                                value="10000元"
                                isLink
                                @click="enterPayPassword(2)"
                            ></u-cell>
    
                            <u-cell
                                size="large"
                                title="C档认定"
                                label="(300万以上)"
                                value="20000元"
                                isLink
                                @click="enterPayPassword(3)"
                            ></u-cell>
    
                        </u-cell-group>
                        
                    </view>
                </view>
            </view>
        </view>

        <!-- 资产已确权 -->
        <view class="user-zc-qq" v-if="display == 3">
            <image src="/static/images/81.jpg" mode="widthFix"></image>
            <view class="text-scene">
                <!-- 证书编号 -->
                <view class="zsbh">{{ userInfo.zsbh ? 'YS-WSD24D'+userInfo.zsbh : '' }}</view>

                <!-- 用户名 -->
                <view class="username">{{userInfo.realname || ''}}</view>

                <!-- 身份证号码 -->
                <view class="idnum">{{ userInfo.ic_number || '' }}</view>

                <!-- 金额 -->
                <view class="account">{{ zcInfo.amount || '' }}</view>
                <view class="account2">{{ zcInfo.amount_zw || '' }}</view>

                <!-- 日期 -->
                <view class="datetime font-red">{{ zcInfo.created_at ? FormatDate(zcInfo.created_at) : '' }}</view>
            </view>
    
        </view>
        
        <!-- 小标题 -->
        <view class="like-h1-h2 flex flex-column " @click="too('/pages/home-page/my_zc_detail6')">
            <view class="like-h1">保证金缴纳通道 ></view>
        </view>

        <!-- 输入支付密码 -->
        <u-overlay :show="showPay" @click="showPay = false">
            <view class="warp" style="padding: 0 20px;">
                <view class="rect1" @tap.stop>

                    <view class="flex">
                        <text style="font-size:30rpx" class="font-red">请注意，每名用户只能认定一次</text>
                    </view>

                    <view class="flex margin-t-20">
                        <text style="font-size:40rpx">
                            {{ zcComboName }}
                        </text>
                    </view>

                    <view style="margin-top: 40rpx;">
                        <u--text iconStyle="font-size: 34rpx;margin-top:6rpx;margin-right:8rpx"
                            size="14" text="请输入支付密码"></u--text>
                        <view style="margin: 30rpx 0 0;">
                            <xt-verify-code :isPassword="true" :isFocus="true" boxActiveColor="#333" v-model="pay_password"></xt-verify-code>
                        </view>
                    </view>
                    <u-button iconColor="#fff" class="custom-style" text="提交" :loading="isDone"
                        :loadingText="regStatus" @click="requestZc"></u-button>
                </view>
            </view>
        </u-overlay>

    </view>
</template>

<script>
/**
 * 外汇储备
 */
export default {
    data(){
        return {
            /* 用户信息 */
            userInfo:false,

            /* 资产确权 */
            zcInfo:false,

            /* 用于控制确权认定是否完成     1   什么都不展示    2   未确权     3   已确权  */
            display:3,

            targetId:1,

            showPay:false,
            pay_password:'',                    // 支付密码
            regStatus: '处理中...',
            
            isDone:false,
        }
    },
    computed:{

        zcComboName(){
            switch(this.targetId){
                case 1:
                    return 'A档认定(20万以内)'
                case 2:
                    return 'B档认定(20万至300万)'
                case 3:
                    return 'C档认定(300万以上)'
                default:
                    return ''
            }
        }
    },
    methods:{


        /* 获取资产申请列表 */
        getZcData(){
            this.to.www(this.api.zcList)
            .then(response => {
                const {data} = response
                if(data){
                    this.zcInfo = data
                    const {status = 0} = data

                    if(status && status == 1){
                        this.display = 3
                    }else{
                        this.display = 2
                    }

                }else{
                    this.display = 2
                }
            })
        },

        /* 过滤日期 */
        FormatDate(datetime){
            return datetime.split(' ')[0]
        },


        /* 输入支付密码 */
        enterPayPassword(id){
            this.targetId = id
            this.showPay = true
        },

        /* 申请资产 */
        requestZc(){
            this.isDone = true

            this.to.www(this.api.zcRequest,{
                id:this.targetId,
                pay_password:this.pay_password,
            })
            .then(response => {
                this.isDone = false
                this.showPay = false
                this.toa('操作成功')

                /* 重新请求列表 */
                this.getZcData()

            })
            .catch(e => {
                this.isDone = false
            })

        },

        /* 用户信息 */
		getUserInfo() {
			this.to.www(this.api.user_info).then(res => {

				this.userInfo = res.data

				uni.setStorage({
					data: this.userInfo,
					key: 'user_info'
				})

			})
		},

    },

    onLoad(){
        const userInfo = uni.getStorageSync('user_info')
        if(userInfo)    this.userInfo = userInfo

    },

    onShow(){
        // 获取资产信息
        // this.getZcData()
    }
}
</script>

<style lang="scss">
page{
    height: 100%;
    background-color: #F9F9F9;
}
#my-zc{
    height: 100%;

    display: flex;
    flex-direction: column;

    .like-h1-h2{
        position: relative;
        z-index: 3;
        padding: 32rpx 48rpx 0;

        >view{
            color: black;
        }

        >.like-h1{
            text-align: center;
            font-size: 36rpx;
            font-weight: bold;
            color: #427bef;
        }

        // >.like-h2{
        //     text-align: center;
        //     font-size: 64rpx;
        //     color: #427bef;
        //     font-weight: bold;
        // }
    }
}

.warp {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    z-index: 3;
}

.rect1 {
    border-radius: 10px;
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
    background: #fff;

    .price-info{
        font-size: 28rpx;
        margin-top: 40rpx;
        padding:6rpx 0 0 0rpx;
    }

    .custom-style {
        width: 30vw;
        border-radius: 8px;
        margin-top: 30px;
        background: #1292FF;
        color: #fff;
    }
}

.user-zc-qq{
    width: 95%;

    position: relative;
    margin-top: 20rpx;
    margin-left: 2.5%;
    z-index: 10;

    border-radius: 24rpx;
    overflow: hidden;

    image{
        width: 100%;
    }

    .text-scene{
        view{
            position: absolute;
            font-size: 30rpx;
            line-height: 1;

            &.username{
                width: 50%;
                top: 32%;
                left: 39%;
                height: 30rpx;
            }

            &.idnum{
                width: 50%;
                top: 36.5%;
                left: 39%;
                height: 30rpx;
            }

            &.account{
                font-size: 26rpx;
                height: 26rpx;

                width: 50%;
                top: 56.55%;
                left: 34.5%;
            }

            &.account2{
                font-size: 24rpx;
                height: 24rpx;
                color: #333;

                width: 65%;
                top: 52.05%;
                left: 35%;
            }

            &.zsbh{
                width: 50%;
                top: 26.9%;
                left: 62%;
                height: 20rpx;
                font-size: 20rpx;
            }

            &.datetime{
                width: 50%;
                height: 24rpx;
                top: 81.5%;
                left: 68%;
                font-size: 24rpx;
            }
        }
    }
}

</style>