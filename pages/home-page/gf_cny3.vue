<template>
    <view class="container page3">

        <!-- 顶栏 -->
		<view class="page-navbar">
			<nNavbar title="USDT兑汇人民币" :showBackBtn="true" :back="true"></nNavbar>
		</view>


        <!-- 文字部分 -->
        <view class="grid-list" v-if="usdtPrice !== false">
            <view class="item">
                <view class="label">可用余额（USDT）</view>
                <view class="desc">{{usdtPrice}}</view>
            </view>
            <view class="item" style="align-items: flex-end">
                <view class="label">汇率</view>
                <view class="desc">{{cnyRate}}</view>
            </view>
        </view>

		<view class="form">
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
                    label="USDT"
                    prop="amount"
                    :borderBottom="false"
                >
                    <u--input
                    type="number"
                    v-model="formData.amount"
                    placeholder="请输入要汇兑的数额"
                    border="none">
                    <!-- 后插槽 币种 -->
                    <u--text
                        text="最大"
                        @click="enterMaximum"
                        slot="suffix"
                    ></u--text>
                    </u--input>
                </u-form-item>

                <!-- 汇兑金额（CNY） -->
                <u-form-item 
                label="CNY"
                :borderBottom="false">
                    <view style="padding: 20px 0 0 20px; font-size: 32rpx;">{{ cnyPrice }}</view>
                </u-form-item>

            </u--form>

		</view>
		
		<u-button iconColor="#fff" class="btn" :loading="isDone" loadingText="请稍等" text="充值" @click="buy" ></u-button>
	</view>
</template>

<script>
export default {
    data(){
        return {
            isDone:false,
            usdtPrice:false,                     // USDT余额
            cnyRate:false,                      // CNY汇率（兑USDT）
            formData:{
                amount:'',                  // 交易金额
            },
            formRules:{
                amount:[{
                    required:true,
                    message:'请输入交易金额'
                }]
            }
        }
    },
    computed:{
        cnyPrice:{
            get(){
                let result = '0.00'
                if(this.formData.amount && this.cnyRate){
                    const amount = parseFloat(this.formData.amount)
                    if(amount){
                        result = parseFloat(amount * this.cnyRate).toFixed(2)
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
        buy(){
            if(!this.formData.amount) return this.toa('请输入金额');

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
        /* 输入最大金额 */
        enterMaximum(){
            this.formData.amount = this.usdtPrice
        },
        /* 用户信息 */
		getUserInfo() {
			this.to.www(this.api.user_info).then(res => {

				this.userInfo = res.data
				this.usdtPrice = parseFloat(res.data.usdt).toFixed(2)
                this.cnyRate = parseFloat(res.data.cnyRate).toFixed(2)

				uni.setStorage({
					data: this.userInfo,
					key: 'user_info'
				})

			})
		},
    },
    onShow(){
        this.getUserInfo()
    }
}
</script>

<style lang="scss">
/* 菜单列表 */
.grid-list{
    display: flex;
    flex-wrap: wrap;

    padding: 32rpx 32rpx 0;

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

.btn{
    margin-top: 20px;
    background: #0182EF;
    border-radius: 6px 6px 6px 6px;
    padding: 15px 0;
    text-align: center;
    font-size: 15px;
    color: #fff;
}
.pay-content{
    background: #fff;
    padding: 20px;
    position: relative;
    padding-bottom: 40px;
    border-radius: 20px;
    margin-top: 20px;
    .pay-title{
        font-size: 16px;
    }
}
.select-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px;
    border: 1px solid #FFFFFF;
    padding: 15px 0;
    .tb-header{
        display: flex;
        font-size: 13px;
        flex: 6;
        >view{
            &:nth-child(1){
                width: 120px;
                text-align: left;
            }
            &:nth-child(2){
                width: 60px;
            }
        }
    }
}
.select-item + .select-item{
    border-top: 1px solid #d9d9d9;
}
.form{
    background: #fff;
    padding: 10px 20px;
    border-radius: 20px;
    >view{
        &:nth-child(1){
            color: #ABABAB;
            padding-bottom: 10px;
        }
        &:nth-child(2){
            border-bottom: 1px solid #d9d9d9;
            display: flex;
            padding-bottom: 5px;
        }
        &:nth-child(3){
            color: #FD2842;
            padding-top: 10px;
            font-size: 14px;
        }
    }
}
.container{
    padding: 20px;
    background: #F9F9F9;
    min-height: calc(100vh - 44px);
}
</style>