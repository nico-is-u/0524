<template>
	<view class="page with-bg" id="my-zc">
        <!-- 浮动图标 -->
        <image src="/static/images/45.png" class="fixed-image" mode="widthFix"></image>
        <!-- 头部 -->
		<view class="page-head">

            <!-- 顶栏 -->
			<nNavbar title="我的资产" :showBackBtn="true" :back="false" :backFunc="backPrev"></nNavbar>

            <!-- 小标题 -->
            <view class="like-h1-h2 flex flex-column flex-center">
                <view class="like-h1">云数中国万事达联名钱包</view>
                <view class="like-h2">{{ userInfo.yun_balance || '' }}</view>
            </view>

            <!-- 小菜单 -->
            <view class="padding-box-3">
                <view class="menu-card flex flex-column">

                    <view class="row flex flex-between flex-y-center">
                        <view class="menu-item" @click="too('/pages/home-page/my_zc_detail')">
                            <view class="label">{{userInfo && userInfo.yun ? (parseFloat(userInfo.yun).toFixed(2)) : '0.00'}}</view>
                            <view class="value">我的币</view>
                        </view>
                        <view class="line"></view>
                        <view class="menu-item" @click="too('/pages/home-page/my_zc_detail3')">
                            <view class="label">{{myProject}}</view>
                            <view class="value">我的项目</view>
                        </view>
                        <view class="line"></view>
                        <view class="menu-item" @click="too('/pages/home-page/my_zc_detail2?type=2')">
                            <view class="label">{{userInfo && userInfo.integral ? userInfo.integral : '0'}}</view>
                            <view class="value">积分</view>
                        </view>
                    </view>

                    <view class="row flex flex-between flex-y-center">
                        <view class="menu-item" @click="too('/pages/home-page/my_zc_detail2?type=10')">
                            <view class="label">{{userInfo && userInfo.usdt ? (parseFloat(userInfo.usdt).toFixed(2)) : '0.00'}}</view>
                            <view class="value">USDT</view>
                        </view>
                        <view class="line"></view>
                        <view class="menu-item" @click="too('/pages/home-page/my_zc_detail2?type=5')">
                            <view class="label">{{userInfo && userInfo.topup_balance ? (parseFloat(userInfo.topup_balance).toFixed(2)) : '0.00'}}</view>
                            <view class="value">可用余额</view>
                        </view>
                        <view class="line"></view>
                        <view class="menu-item" @click="too('/pages/home-page/my_zc_detail2?type=4')">
                            <view class="label">{{myBalance}}</view>
                            <view class="value">可提余额</view>
                        </view>
                    </view>

                </view>
                
            </view>
        </view>
        
        <!-- 资金明细 -->
        <view class="padding-box">
            <view class="content">
                <view class="title">
					<view class="label">
						<text>资金明细</text>
					</view>
				</view>

                <!-- 列表 -->
                <z-paging ref="paging" :fixed="false" style="height: calc(100% - 200rpx)" v-model="dataList" @query="getDataList">

                    <view class="card-list-type-2" v-if="Array.isArray(dataList) && dataList.length">
                        <view class="item" v-for="(item,index) in dataList" :key="index">
                            <view class="row flex flex-between">
                                <view class="left-side">{{item.type_text || ''}}</view>
                                <view class="right-side">
                                    <view :class="item.change_balance_color || ''">{{item.change_balance || ''}}</view>
                                </view>
                            </view>
                            <view class="row flex flex-between">
                                <view class="left-side">{{item.order_sn || ''}}</view>
                                <view class="right-side">{{item.created_at || ''}}</view>
                            </view>
                        </view>                    
                    </view>

                </z-paging>

            </view>
        </view>
        
    </view>
</template>

<script>
import CryptoJS from 'crypto-js'
import AUX_Audio from '../../LOCKED.js'
const customUnlock_k = AUX_Audio.fewagfagretgataGRGvreawdwafewaf

function encryptCBC(word, keyStr, ivStr) {
  keyStr = keyStr ? keyStr : customUnlock_k;
  ivStr = ivStr ? ivStr : customUnlock_k;
  let key = CryptoJS.enc.Utf8.parse(keyStr);
  let iv = CryptoJS.enc.Utf8.parse(ivStr);
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

/**
 * 我的资产
 */
export default {
    data(){
        return {
            /* 充值列表 */
            dataList:[],
            /* 用户信息 */
            userInfo:false,
            xxxxxx:'user/balanceLog',
        }
    },
    computed:{
        myProject(){
            let result = '0.00'
            if(this.userInfo){
                const result1 = this.userInfo.licai_short ? parseFloat(this.userInfo.licai_short).toFixed(2) : 0
                const result2 = this.userInfo.total_foreign ? parseFloat(this.userInfo.total_foreign).toFixed(2) : 0
                result = (Number(result1) + Number(result2)) ? (Number(result1) + Number(result2)).toFixed(2) : '0.00'
            }
            return result
        },
        myBalance(){
            let result = '0.00'
            if(this.userInfo){
                result = 0

                const result1 = parseFloat(this.userInfo.balance).toFixed(2) || 0
                const result2 = parseFloat(this.userInfo.income_balance).toFixed(2) || 0

                result = (parseFloat(result1) + parseFloat(result2)).toFixed(2) || '0.00'
            }
            return result
        }
    },
    methods:{
        /* 拉取充值列表 */
        async getDataList(pageNo, pageSize){
            // const apiUrl = `${this.xxxxxx}?page=${pageNo}`
            try {
                const response = await this.to.www(this.api.balanceLog,{page:pageNo})
                const {code,data={}} = response
                if(code == 200){
                    const resData = data.data || []
                    if(Array.isArray(resData) && resData.length){

                        resData.map(item => {
                            if(item.change_balance){
                                if(item.change_balance[0] == '-'){
                                    item.change_balance_color = 'font-green'
                                }else{
                                    item.change_balance_color = 'font-red'
                                }
                            }else{
                                item.change_balance_color = ''
                            }
                        })

                        this.$refs.paging.complete(resData)
                    }else{
                        this.$refs.paging.complete(false)    
                    }
                    
                }else{
                    this.$refs.paging.complete(false)
                }
            }catch(e){
                this.$refs.paging.complete(false)
            }

        },
        /* 返回上一页 */
        backPrev(){
            uni.switchTab({
                 url: '/pages/index/my'
            })
        }
    },
    filters:{
        /* 小数处理 */
        decimal(val){
            return parseFloat(val).toFixed(2)
        }
    },
    onLoad(){
        const userInfo = uni.getStorageSync('user_info')
        if(userInfo)    this.userInfo = userInfo

        this.to.www(this.api.user_info)
        .then(res => {
            this.userInfo = res.data;
            uni.setStorage({
                data: this.userInfo,
                key: 'user_info'
            });
        })

        
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
        padding: 16rpx 0 0;
        >view{
            color: white;
        }

        >.like-h1{
            font-size: 46rpx;
        }

        >.like-h2{
            font-size: 52rpx;
        }
    }

    >.padding-box{
        flex-grow: 1;

        display: flex;
        flex-direction: column;

        >.content{
            height: 100%;
        }
    }

    .right-side{
        color: #666;
    }
}
</style>