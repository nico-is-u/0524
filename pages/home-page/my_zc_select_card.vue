<template>
    <view class="page page3">
        
        <!-- 顶栏 -->
		<view class="page-navbar">
			<nNavbar title="选卡" :showBackBtn="true" :back="true">
                <u--text @click="too('my_zc_select_card_record')" align="right" text="订单列表" style="padding-right: 10rpx; padding-top: 10rpx"></u--text>
            </nNavbar>
		</view>

        <!-- 内容正文 -->
        <view class="padding-box-3" style="padding-top: 0;">

            <!-- tab菜单 -->
            <u-tabs :list="tabList" @click="changeTab" 
            lineWidth="50" 
            lineColor="#f56c6c"
            :itemStyle="{
                width:'50%',
                height:'100rpx',
            }"
            :inactiveStyle="{
                fontSize:'40rpx'
            }"
            :activeStyle="{
                fontSize:'40rpx'
            }"
            style="padding: 16rpx 0 32rpx"></u-tabs>

            <!-- 选卡列表 -->
            <view class="ser_list">
                <view class="card-list-item" v-for="(item,index) in masterList" :key="'master-card-' + index">
                    
                    <view class="card-item-title flex flex-between">
                        <view class="left-side">
                            <text>{{ item.name ? item.name.replace('万事达卡','') : ''}}</text>
                            <text style="padding-left: 16rpx">卡费:{{ item.single_amount }}/张</text>
                        </view>
                        <view class="right-side" @click="enterPayPassword(index)">
                            <text>立即申请>></text>
                        </view>
                    </view>
    
                    <view class="card-item-cover">
                        <image :src="item.cover_img" mode="widthFix"></image>
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
						:loadingText="regStatus" @click="sendData"></u-button>
				</view>
			</view>
		</u-overlay>

    </view>
</template>

<script>
export default {
    data(){
        return {
            listType:1,                         // 1 储蓄卡  2 信用卡
            masterList:[],

            targetIndex:-1,

            tabList:[
                {name: '借记卡',},
                {name: '信用卡'}
            ],

            showPay:false,
            pay_password:'',                    // 支付密码
            regStatus: '处理中...',
            
            isDone:false,
        }
    },
    onShow(){
        this.getData()
    },
    methods:{
        /* 拉取卡片列表 */
        getData(){
            uni.showLoading()

            this.to.www(this.api.masterList,{type:this.listType})
            .then(res => {
                uni.hideLoading()
                this.masterList = res.data.data || []
            })
            .catch(e =>{
                uni.hideLoading()
            })
        },
        /* 输入支付密码 */
        enterPayPassword(index){
            this.targetIndex = index
            this.showPay = true
        },
        /* 申请卡片 */
        sendData(){ 

            if (uni.$u.test.isEmpty(this.pay_password)) return this.toa('请输入支付密码');

            const targetItem = this.masterList[this.targetIndex] || {}

            this.showPay = false
            uni.showLoading()

            this.to.www(this.api.masterCard,{
                id:targetItem.id,
                pay_password:this.pay_password
            },'p')
            .then(res => {
                uni.hideLoading()

                this.too('/pages/home-page/my_zc_select_card_record')
            })
            .catch(e => {
                uni.hideLoading()

            })

        },
        /* tab菜单点击 */
        changeTab({index}){
            if(index == 0)  this.listType = 1
            else if(index == 1) this.listType = 2

            this.memberList = []
            this.getData()

        },
    }
}
</script>

<style lang="scss" scoped>
page{
    height: 100%;
    background-color: #f0f2f5;
}
.card-list-item{

    padding-bottom: 32rpx;

    .card-item-title{
        font-size: 34rpx;
        .right-side{
            color: orange;
        }
    }
    .card-item-cover{
        margin-top: 32rpx;
        image{
            width: 100%;
            height: 360rpx;
            border-radius: 32rpx;
            overflow: hidden;
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

.ser_list{
    margin-top: 0;
    padding: 42rpx 24rpx;
}

</style>