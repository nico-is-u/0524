<template>
    <view class="page" id="my-team">
        <view class="padding-box-3">
            <view class="content-4">

                <!-- 信息总览 -->
                <view class="menu-card">
                    <view class="menu-item">
                        <view class="label">团队人数</view>
                        <view class="value">{{ teamInfo.total_num }}</view>
                    </view>
                    <view class="line"></view>
                    <view class="menu-item">
                        <view class="label">我的等级</view>
                        <view class="value">{{ userInfo.level || 1 }}</view>
                    </view>
                    <view class="line"></view>
                    <view class="menu-item">
                        <view class="label">我的奖励</view>
                        <view class="value">{{ teamInfo.invite_bonus_sum || '0' }}</view>
                    </view>
                </view>

                <!-- 切换级数 -->
                <view class="n-tab" style="margin-top: 42rpx;">
                    <view @click="changeLevel(1)" :class="level == 1 ? 'active' : ''" class="tab-item">一级</view>
                    <view @click="changeLevel(2)" :class="level == 2 ? 'active' : ''" class="tab-item">二级</view>
                    <view @click="changeLevel(3)" :class="level == 3 ? 'active' : ''" class="tab-item">三级</view>
                </view>

                <!-- 层级人员 -->
                <view class="level-member-info">
                    <view class="inner flex flex-y-center">
                        <image src="/static/images/42.png" mode="widthFix"></image>
                        <text>层级人员：{{ teamList.length || '' }}</text>
                    </view>
                </view>

                <!-- 人员列表 -->
                <view class="level-member-list">
                    <view class="n-card" v-for="(item,index) in teamList" :key="level + '-' +index">
                        <view class="row">
                            <view class="label">用户名:</view>
                            <view class="value">
                                <text>{{item.realname || ''}}</text>
                                
                                <image src="/static/images/65.png" v-if="item.level == 0" style="width:122rpx; margin-left: 12rpx;" mode="widthFix"></image>
                                <image src="/static/images/66.png" v-if="item.level == 1" style="width:122rpx; margin-left: 12rpx;" mode="widthFix"></image>
                                <image src="/static/images/67.png" v-if="item.level == 2" style="width:122rpx; margin-left: 12rpx;" mode="widthFix"></image>
                                <image src="/static/images/68.png" v-if="item.level == 3" style="width:122rpx; margin-left: 12rpx;" mode="widthFix"></image>
                                <image src="/static/images/69.png" v-if="item.level == 4" style="width:122rpx; margin-left: 12rpx;" mode="widthFix"></image>
                                <image src="/static/images/70.png" v-if="item.level == 5" style="width:122rpx; margin-left: 12rpx;" mode="widthFix"></image>
                            </view>
                        </view>

                        <view class="row">
                            <view class="label">联系方式:</view>
                            <view class="value">
                                <text>{{item.phone || ''}}</text>
                            </view>
                        </view>
                    </view>

                </view>

            </view>
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

            userInfo:false,                 // 用户信息
            teamInfo:false,                 // 团队信息
            teamList:false,                 // 团队列表
            level:1,
        }
    },
    methods:{
        async getDataInfo(){
            try{
                const response = await this.to.www(this.api.team_info)
                const {code,data={}} = response

                if(code == 200){
                    this.teamInfo = data
                }else{
                }

            }catch(e){
            }
        },

        async getDataList(){
            this.isLoading = true

            try{
                const response = await this.to.www(this.api.team_list,{level:this.level},'p')
                const {code,data={}} = response

                if(code == 200){
                    this.teamList = data.list.data || []
                    this.isLoading = false
                }else{
                    this.isLoading = false
                }

            }catch(e){
                this.isLoading = false
            }
        
        },
        changeLevel(level){
            this.level = level
            this.getDataList()
        }
    },
    onLoad(){
        this.getDataInfo()
        this.getDataList()
        this.userInfo = uni.getStorageSync("user_info") || {}
    }
}
</script>

<style lang="scss">
page{
    height: 100%;
    background-color: #f9f9f9;
}

#my-team{
    .level-member-info{
        height: 60rpx;
        margin-top: 28rpx;
        position: relative;

        .inner{
            color: #0182EF;
            height: 100%;
            padding: 0 32rpx;
        }

        image{
            width: 28rpx;
            margin-right: 12rpx;
        }

        &::after{
            content: '';

            position: absolute;
            top: 0;
            left: 0;

            width: 100%;
            height: 100%;

            background: linear-gradient( 90deg, #0182EF 0%, rgba(1,130,239,0) 100%);
            opacity: .1;
            border-radius: 44rpx;

        }
        
    }

    .level-member-list{
        margin-top: 36rpx;

        display: flex;
        flex-direction: column;
        gap: 28rpx;
    }
}
</style>