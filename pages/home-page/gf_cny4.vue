<template>
    <view class="container page3">

        <!-- 顶栏 -->
		<view class="page-navbar">
			<nNavbar title="人民币汇兑USDT" :showBackBtn="true" :back="true"></nNavbar>
		</view>

        <view style="text-indent: 28px; font-size: 16px;background: #FDF4EC;border-radius: 8px;padding: 16px;color: #CD854B;">为保证您收入的合法合规，响应税务部门要求，收益余额提现将扣除20%个人所得税，云数中国补贴10%，实际缴纳个税10%，已经提现部分由云数中国全额补贴，无需追缴！</view>

        <!-- 文字部分 -->
        <view class="grid-list" v-if="cnyPrice !== false">
            
            <view class="item">
                <view class="label">本金余额（CNY）</view>
                <view class="desc">{{cnyPrice}}</view>
            </view>
            <view class="item" style="align-items: flex-end">
                <view class="label">汇率</view>
                <view class="desc">{{cny2usdt_rate}}</view>
            </view>

            <view class="item">
                <view class="label">收益余额（CNY）</view>
                <view class="desc">{{cnyPrice2}}</view>
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
                
                <!-- 汇兑类型 -->
                <u-form-item label="汇兑类型" prop="type" :borderBottom="false" >
                    <u-radio-group v-model="formData.type" style="padding: 28rpx 0;">
                        <u-radio :customStyle="{marginRight: '28px'}" label="本金" :name="1"></u-radio>
                        <u-radio :customStyle="{marginRight: '28px'}" label="收益" :name="2"></u-radio>
                    </u-radio-group>
                </u-form-item>
            
                <!-- 汇兑金额 （CNY） -->
                <u-form-item
                    label="CNY"
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

                <!-- 汇兑金额（USDT） -->
                <u-form-item 
                label="USDT"
                :borderBottom="false">
                    
                    <view style="padding: 20px 0 0 20px; font-size: 32rpx;">{{ usdtPrice }}</view>
                    
                </u-form-item>

                <!-- 收款地址 -->
                <!-- <u-form-item
                    label="收款地址"
                    props="address"
                    :borderBottom="false"
                >
                    <u--textarea v-model="formData.address" placeholder="请输入收款地址" ></u--textarea>
                </u-form-item> -->

            </u--form>

		</view>
		
		<u-button iconColor="#fff" class="btn" :loading="isDone" loadingText="请稍等" text="兑换" @click="buy" ></u-button>

    </view>
</template>

<script>
export default {
    data(){
        return {
            isDone:false,

            cnyPrice:false,                     // 本金余额
            cnyPrice2:false,                    // 收益余额

            cny2usdt_rate:false,                // CNY汇率（兑USDT）
            formData:{
                amount:'',                  // 交易金额
                address:'',                 // 收款地址
                type:1,                     // 汇兑类型
            },
            formRules:{
                amount:[{
                    required:true,
                    message:'请输入交易金额'
                }],
                // address:[{
                //     required:true,
                //     message:"请输入收款地址"
                // }]
            }
        }
    },
    computed:{
        usdtPrice:{
            get(){
                let result = '0.00'
                if(this.formData.amount && this.cny2usdt_rate){
                    const amount = parseFloat(this.formData.amount)
                    if(amount){
                        result = parseFloat(amount / this.cny2usdt_rate).toFixed(2)
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

            this.to.www(this.api.topup2, {
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
            if(this.formData.type == 1){
                this.formData.amount = this.cnyPrice
            }
            else if(this.formData.type == 2){
                this.formData.amount = this.cnyPrice2
            }
        },
        /* 用户信息 */
		getUserInfo() {
			this.to.www(this.api.user_info).then(res => {

				this.userInfo = res.data

				this.cnyPrice = parseFloat(res.data.balance).toFixed(2)
				this.cnyPrice2 = parseFloat(res.data.income_balance).toFixed(2)

                this.cny2usdt_rate = parseFloat(res.data.cny2usdt_rate).toFixed(2)

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