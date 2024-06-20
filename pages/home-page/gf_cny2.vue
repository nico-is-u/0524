<template>
    <view class="container">

		<view class="form">
			<view>请输入金额</view>
			<view>
				<text style="font-weight: bold;font-size: 26px;margin-right: 10px;">¥</text>
				<u--input type="number" v-model="amount" border="none"></u--input>
			</view>
			<view>线上充值使用网页版关闭WIFI进行充值</view>
		</view>
		
		<u-button iconColor="#fff" class="btn" :loading="isDone" loadingText="请稍等" text="充值" @click="buy" ></u-button>
	</view>
</template>

<script>
export default {
    data(){
        return {
            isDone:false,
            amount:'',
        }
    },
    methods:{
        buy(){
            if(!this.amount) return this.toa('请输入金额');

            this.isDone = true;

            this.to.www(this.api.topup2, {
                amount:this.amount
            }, 'p')
            .then(() => {
                this.isDone = false;
                this.too('','bac');
                setTimeout(() => {
                    this.toa('提交成功')
                },100)
            })

        }
    }
}
</script>

<style lang="scss">
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