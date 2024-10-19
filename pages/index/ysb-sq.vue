<template>
	<view class="container">
        <view class="back_head" @click="too('/','bac')">
			<u--text prefixIcon="arrow-left" iconStyle="font-size: 38rpx;color:#000" color="#ebebeb" align="left"
				text=""></u--text>
			<u--text color="#000" bold align="center" text="云数币私募申请"></u--text>
			<u--text color="#d7d7d7" align="right" text=""></u--text>
		</view>

        
        <view class="content">

            <view style="text-align: center;font-size: 16px;background: #FDF4EC;border-radius: 8px;padding: 8px 4rpx;color: #CD854B;">
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

                <u-button iconColor="#fff" class="btn" :loading="isDone" loadingText="请稍等" text="私募申请款提交" @click="submit" ></u-button>

            </view>
        </view>

    </view>
</template>

<script>
export default {
    data(){
        return {
            userInfo:false,                     // 用户个人信息
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
        
        /* 提交申请 */
        submit(){
            if(!this.formData.amount) return this.toa('请输入申请数量')
            
            this.isDone = true;

            this.to.www(this.api.topup3, {
                amount:this.formData.amount
            }, 'p')
            .then(() => {
                this.isDone = false;
                uni.navigateBack({
                     delta: 1
                })
                setTimeout(() => {
                    this.toa('提交成功')
                },100)
            })

        },
    },

    onShow(){
        this.getUserInfo()
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

</style>
