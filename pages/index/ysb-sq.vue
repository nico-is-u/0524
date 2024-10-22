<template>
	<view class="container">
        <view class="back_head" @click="too('/','bac')">
			<u--text prefixIcon="arrow-left" iconStyle="font-size: 38rpx;color:#000" color="#ebebeb" align="left"
				text=""></u--text>
			<u--text color="#000" bold align="center" text="云数币私募申请"></u--text>
			<u--text color="#d7d7d7" align="right" text=""></u--text>
		</view>

        
        <view class="content">

            <view style="text-align: left;font-size: 16px;background: #FDF4EC;border-radius: 8px;padding: 8px 16rpx; text-indent: 32rpx; color: #CD854B;">
                云数币开始筹备上市交易，现启动内部申请，申请价格为原始价人民币2元一枚，每人限申请一次。
            </view>

			<view class="card margin-t-15">

                <!-- 文字部分 -->
                <view class="grid-list" v-if="yunPrice !== false">
                    <view class="item">
                        <view class="label">可用数量</view>
                        <view class="desc">{{yunPrice}}</view>
                    </view>
                    <view class="item" style="align-items: flex-end">
                        <view class="label">汇率</view>
                        <view class="desc">{{yunRate.toFixed(2)}}</view>
                    </view>
                </view>

                <view class="form" id="ysb-sq-form">
                    <!-- 表单部分 -->
                    <u--form
                        ref="uForm"
                        :model="formData"
                        :rules="formRules"
                        labelPosition="top"
                        :borderBottom="false"
                        labelWidth="auto"
                    >
                        
                        <!-- 汇兑金额 （USDT） -->
                        <u-form-item
                            label="申请数量"
                            prop="amount"
                            :borderBottom="false"
                        >
                            <u--input
                                type="number"
                                v-model="formData.amount"
                                placeholder="请输入要申请的数量"
                            border="none">
                            <!-- 后插槽 币种 -->
                            <u--text
                                text="枚"
                                slot="suffix"
                                ></u--text>
                            <!-- @click="enterMaximum" -->
                            </u--input>
                        </u-form-item>

                        <!-- 汇兑金额（CNY） -->
                        <u-form-item 
                            label="申请金额"
                            :borderBottom="false"
                        >
                            <view class="flex flex-between" style="width:100%; padding: 20px 16px 0 20px; font-size: 32rpx;">
                                <text>{{ cnyPrice }}</text>
                                <text>元</text>
                            </view>
                        </u-form-item>

                    </u--form>

                </view>

                <u-button iconColor="#fff" class="btn" :loading="isDone" loadingText="请稍等" text="私募申请款提交" @click="enterPayPass" ></u-button>

            </view>

            <!-- 申请记录 -->
            <view class="order-list">

                <view style="text-align: left;font-size: 16px;background: #FDF4EC;border-radius: 8px;padding: 8px 16rpx; text-indent: 32rpx; color: #CD854B;">
                    申请记录
                </view>

                <view class="card margin-t-15" v-for="(item,index) in orderList" :key="'order-item-' + index">
                    <view class="order-item flex flex-column">
                        <view class="flex flex-between flex-y-center">
                            <view class="left-side">申请订单:</view>
                            <view class="right-side">{{ item.amount }} 枚</view>
                        </view>

                        <view class="flex flex-between flex-y-center">
                            <view class="left-side">状态:</view>
                            <view class="right-side">{{ getStatusTxt(item.status) }} </view>
                        </view>

                        <view class="flex flex-between flex-y-center">
                            <view class="left-side">申请时间:</view>
                            <view class="right-side">{{ item.created_at || '' }} </view>
                        </view>

                    </view>
                </view>
            </view>
            
        </view>
        
        <!-- 输入支付密码 -->
        <u-overlay :show="showPay" @click="showPay = false">
			<view class="warp" style="padding: 0 20px;">
				<view class="rect1" @tap.stop>

					<view style="margin-top: 40rpx;">
						<u--text iconStyle="font-size: 34rpx;margin-top:6rpx;margin-right:8rpx"
							size="14" text="请输入支付密码"></u--text>
						<view style="margin: 30rpx 0 0;">
							<xt-verify-code :isPassword="true" :isFocus="true" boxActiveColor="#333" v-model="pay_password"></xt-verify-code>
						</view>
					</view>
					<u-button iconColor="#fff" class="custom-style" text="提交" :loading="isDone"
						:loadingText="regStatus" @click="submit"></u-button>
				</view>
			</view>
		</u-overlay>

    </view>
</template>

<script>
export default {
    data(){
        return {
            userInfo:false,                     // 用户个人信息

            showPay: false,                     // 输入支付密码
            pay_password:'',                    // 支付密码
            regStatus: '处理中...',

            orderList:[],                       // 申请记录
            
            isDone:false,
            yunPrice:false,                     // yun币余额
            yunRate:2,                          // yun币汇率（兑CNY）
            formData:{
                amount:'',                      // 交易数量
            },
            formRules:{
                amount:[{
                    required:true,
                    message:'请输入交易数量'
                }]
            }
        }
    },

    computed:{
        cnyPrice:{
            get(){
                let result = '0.00'
                if(this.formData.amount && this.yunRate){
                    const amount = parseFloat(this.formData.amount)
                    if(amount){
                        result = parseFloat(amount * this.yunRate).toFixed(2)
                    }
                }
                return result
            },
            set(){
                return 
            }
        },
    },

    methods:{
        /* 用户信息 */
		getUserInfo() {
			this.to.www(this.api.user_info).then(res => {

				this.userInfo = res.data
				this.yunPrice = parseFloat(res.data.yun).toFixed(2)

				uni.setStorage({
					data: this.userInfo,
					key: 'user_info'
				})

			})
		},
        
        /* 输入支付密码 */
        enterPayPass(){
            if(!this.formData.amount) return this.toa('请输入申请数量')

            this.showPay = true
        },

        /* 提交申请 */
        submit(){
            
            if (uni.$u.test.isEmpty(this.pay_password)) return this.toa('请输入支付密码');

            this.isDone = true
            this.showPay = false

            this.to.www(this.api.shenqingSimu, {
                amount:this.formData.amount,
                pay_password:this.pay_password
            }, 'p')
            .then(response => {

                const {code} = response

                if(code == 200){
                    this.isDone = false
                    
                    this.too('/pages/index/ysb','tab')
                    this.toa('提交成功')

                    setTimeout(() => {
                        this.toa('提交成功')
                    },100)

                }else{
                    this.isDone = false
                }

            }).catch(e => {
                this.isDone = false
            })

        },

        /* 私募申请记录 */
        getDataList(){
            this.to.www(this.api.simuOrder)
            .then(response => {
                const {code} = response
                if(code == 200){
                    this.orderList = response.data.data || []
                }
            })
            .catch(e => {})
        },

        getStatusTxt(status){
            switch(status){
                case 0:
                    return '申请中'
                case 1:
                    return '成功'
                case 2:
                    return '失败'
                default:
                    return ''
            }
        }
    },

    onShow(){
        this.getUserInfo()
        this.getDataList()
    }
}
</script>

<style lang="scss" scoped>
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
    background: #EFF8FF;
}

.container{
    padding: 0 20px 20px 20px;
    background: #EFF8FF;
    min-height: 100vh;
}

.content{
    padding-top: 56px;
}

.card{
    background: linear-gradient( 180deg, rgba(255,255,255,0.5) 0%, #FFFFFF 100%);
    box-shadow: 0px 4px 12px 0px rgba(0,20,51,0.05);
    border-radius: 12px 12px 12px 12px;
    border: 1px solid #E6F4FF;
    position: relative;
}

.btn{
    background: linear-gradient( 90deg, #2E9FFF 0%, #0182EF 100%);
    margin-top: 20px;
    border-radius: 8px;
    color: #fff;
    width: 100%;
    text-align: center;
    padding: 10px 20px;
}


/* 菜单列表 */
.grid-list{
    display: flex;
    flex-wrap: wrap;

    padding: 0 32rpx 0;

    .item{
        width: 50%;
        gap: 20rpx;

        padding: 10rpx;
        margin-bottom: 25rpx;

        display: flex;
        flex-direction: column;
        justify-content: center;
    
        .label{
            color: #9B9DA6;
            font-weight: bold;
        }
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

.order-list{
    padding-top: 32rpx;
    .order-item{
        gap: 32rpx;
        .left-side{
            font-size: 28rpx;
            color: #9B9DA6;
            font-weight: bold;
        }
    }

}

</style>
