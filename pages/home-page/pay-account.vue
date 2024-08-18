<template>
    <view class="page page3" id="pay-account" style="padding-bottom: 20vh">
        
        <!-- 顶栏 -->
		<view class="page-navbar">
			<nNavbar title="收款账号" :showBackBtn="true" :back="true"></nNavbar>
		</view>

        <!-- 添加银行卡 -->
        <view class="fixed-button-group flex flex-column" style="gap: 40rpx" v-if="!isLoading && !type">
            <u-button class="n-button n-button-3" text="添加Trc收款地址" @click="too('/pages/home-page/pay-account2-edit')"></u-button>
            <u-button class="n-button" text="添加银行卡" @click="too('/pages/home-page/pay-account-edit')"></u-button>
        </view>

        <!-- 收款账号 -->
        <view class="padding-box-2 flex flex-column" style="padding-top:32rpx; gap:32rpx" v-if="Array.isArray(dataList) && dataList.length">
            <view class="account-item" v-for="(item,index) in dataList" :key="'item' + index" @click="doselect(item)">
                <view class="row flex flex-between">
                    <view class="left-side">
                        <view class="flex flex-column text-group">
                            <view class="label">{{item.bank_name || ''}}</view>
                            <!-- {{ item.address ? ' ('+item.address+')' : '' }} -->
                            <view class="text">{{item.name || ''}}</view>
                        </view>
                    </view>
                    <view class="right-side">
                        <!-- <view class="btn flex flex-center">
                            <image src="/static/images/56.png" mode="widthFix"></image>
                            <text>编辑</text>
                        </view> -->

                        <view class="btn flex flex-center" v-if="!type" @click="delItem(index)">
                            <image src="/static/images/57.png" mode="widthFix"></image>
                            <text>删除</text>
                        </view>
						<view v-else class="btn flex flex-center">
                            <u-icon name="checkbox-mark" color="#2979ff" size="28"></u-icon>
                            <text>选择</text>
                        </view>
                    </view>
                </view>

                <view class="row" style="margin-top: 60rpx">
                    <view class="left-side">
                        <view class="flex flex-column text-group">
                            <view class="label">账户号码</view>
                            <view class="text">{{item.account || ''}}</view>
                        </view>
                    </view>
                    <view class="right-side"></view>
                </view>

            </view>

        </view>
        
        <!-- 没有数据 -->
        <view style="padding: 20vh 0" class="flex flex-column flex-center" v-else>
            <image src="/static/images/54.png" style="width: 400rpx" mode="widthFix"></image>
            <view class="flex flex-x-center margin-t-80 font-333">暂无数据</view>
        </view>

        <!-- 加载动画 -->
        <u-loading-page :loading="isLoading"></u-loading-page>
    </view>
</template>

<script>
export default {
    data(){
        return {
            isLoading:false,				// 请求等待
            regStatus: '正在请求...',		 // loading text
			type: false, // 是否选择银行卡
            dataList:false,                    // 数据列表
        }
    },
    methods:{
        async getDataList(){
            this.isLoading = true
            try{
                const response = await this.to.www(this.api.bank_list)
                const {code = 0,data = []} = response
                if(code == 200){
                    this.dataList = data
                    this.isLoading = false
                }else{
                    this.isLoading = false
                }
            }catch(e){
                this.isLoading = false
            }
        },
		/* 选择银行卡 */
		doselect(obj){
			if(this.type){
				uni.setStorage({
					data:obj,
					key:"BANK_DRAW",
					success() {
						uni.navigateBack()
					}
				})
			}
		},
        /* 删除询问 */
        async delItem(index){
            const target = this.dataList[index]
            const _this = this
            uni.showModal({
                title: '提示',
                content: '是否删除：' + target.bank_name,
                success(res) {
                    if (res.confirm) {
                        _this.to.www(_this.api.bank_del, {
                            id: target.id
                        })
                        .then(res => {
                            _this.getDataList()
                        })
                    }
                }
            })
        }
    },
	onShow() {
		this.getDataList()
	},
	onLoad(option) {
		if(option.select){
            uni.setNavigationBarTitle({
                title: '请选择收款账号'
            })
			this.type = true;
		}

	}
}
</script>

<style lang="scss" scoped>
page{
    height: 100%;
    background-color: #f0f2f5;
}

#pay-account{
    .account-item{
        width: 100%;
        height: 368rpx;
        background-image: url('/static/images/55.png');
        background-size: 100% 100%;

        padding-top: 48rpx;
        padding-left: 40rpx;

        .text-group{
            .label{
                color: rgba(255,255,255,.8);
                font-size: 28rpx;
            }
            .text{
                color: white;
                font-size: 40rpx;
            }
            .label + .text{
                margin-top: 12rpx;
            }
        }

        .row{
            padding-right: 48rpx;
            .right-side{
                display: flex;
                gap: 22rpx;
            }
        }

        .btn{
            font-size: 32rpx;
            color: white;

            display: flex;
            align-items: center;

            image{
                width: 32rpx;
                margin-right: 6rpx;
            }
        }

    }
    .fixed-button-group{
        height: 20vh;
    }
}
</style>