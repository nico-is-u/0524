<template>
  <view class="page">
    <view class="head">
        <!-- 顶栏 -->
				<nNavbar title="我的" :showBackBtn="false"></nNavbar>
        <!-- 用户信息 -->
        <view class="userinfo flex flex-between flex-y-center">
          <view class="left-side flex flex-y-center">
            <!-- 用户头像 -->
           <!-- <avatar 
              selWidth="400upx" 
              selHeight="400upx"
              :avatarSrc="avatarurl"
              avatarStyle="width: 120upx; height: 120upx; transform:translateY(4px); border-radius: 100%;"
              noTab>
            </avatar> -->
			      <image :src="avatarurl" style="width: 120upx; height: 120upx; transform:translateY(4px); border-radius: 100%;"></image>
            
            <!-- 文字讯息 -->
            <view class="text-info flex flex-column">
              <view class="username">{{ user_info.realname || '' }}</view>
              <view class="account">{{ user_info.phone ? '('+ user_info.phone +')' : ''}}</view>
              <view class="desc flex">

                <!-- 用户等级 -->
                <image src="/static/images/65.png" v-if="user_info.level == 0" mode="widthFix" class="level-2"></image>
                <image src="/static/images/66.png" v-if="user_info.level == 1" mode="widthFix" class="level-2"></image>
                <image src="/static/images/67.png" v-if="user_info.level == 2" mode="widthFix" class="level-2"></image>
                <image src="/static/images/68.png" v-if="user_info.level == 3" mode="widthFix" class="level-2"></image>
                <image src="/static/images/69.png" v-if="user_info.level == 4" mode="widthFix" class="level-2"></image>
                <image src="/static/images/70.png" v-if="user_info.level == 5" mode="widthFix" class="level-2"></image>

                <view class="text-part" style="padding-top: 2rpx;">
                  <text v-if="user_info.level == 1">(随员)</text>
                  <text v-if="user_info.level == 2">(秘书)</text>
                  <text v-if="user_info.level == 3">(参赞)</text>
                  <text v-if="user_info.level == 4">(公使)</text>
                  <text v-if="user_info.level == 5">(大使)</text>
                </view>
                
              </view>
              <view class="desc flex" v-if="user_info.level">
        
                <view class="text-part" @click="too('/pages/home-page/gf_level2')">
                  <text>我的等级特权</text>
                  <text>></text>
                </view>

              </view>
            </view>      
          </view>

          <view class="right-side" @click="too('/pages/home-page/gf_level2')">

            <!-- 用户等级 -->
            <image src="/static/images/71.png" v-if="user_info.level == 0" mode="widthFix"></image>
            <image src="/static/images/72.png" v-if="user_info.level == 1" mode="widthFix"></image>
            <image src="/static/images/73.png" v-if="user_info.level == 2" mode="widthFix"></image>
            <image src="/static/images/74.png" v-if="user_info.level == 3" mode="widthFix"></image>
            <image src="/static/images/75.png" v-if="user_info.level == 4" mode="widthFix"></image>
            <image src="/static/images/76.png" v-if="user_info.level == 5" mode="widthFix"></image>

          </view>

        </view>
        <!-- 底栏 -->
        <view class="bottom-bar"></view>
    </view>

    <!-- 内容正文 -->
    <view class="section">
      <!-- 菜单1 -->
      <view class="menu-list">
        <view class="menu-item" @click="too('/pages/home-page/gf_sign')" style="background-image: url(/static/images/31.png);">
          <view class="text-info">
            <view class="title">签到送积分</view>
            <view class="label">累计积分换豪礼</view>
          </view>
        </view>
        <view class="menu-item" @click="too('/pages/home-page/gf_score')" style="background-image: url(/static/images/32.png);">
          <view class="text-info">
            <view class="title">积分兑换</view>
            <view class="label">多重好礼等你兑换</view>
          </view>
        </view>
        <view class="menu-item" @click="too('/pages/home-page/gf_gift')" style="background-image: url(/static/images/33.png);">
          <view class="text-info">
            <view class="title">福利工资</view>
            <view class="label">衔级待遇月月领</view>
          </view>
        </view>
        <view class="menu-item" @click="too('/pages/home-page/gf_level2')" style="background-image: url(/static/images/34.png);">
          <view class="text-info">
            <view class="title">等级特权</view>
            <view class="label">升级会员专属福利</view>
          </view>
        </view>
      </view>

      <!-- 菜单2 -->
      <view class="ser_list">
        <view class="item" @click="too('/pages/home-page/my_list')">
          <view class="left-side flex flex-y-center">
            <image src="/static/images/35.png"></image>
            <text>我的资料</text>
          </view>
          <u--text suffixIcon="arrow-right" align="right" iconStyle="font-size: 12px;color:#79818A" text=""></u--text>
        </view>

        <view class="item" @click="too('/pages/home-page/my_zc')">
          <view class="left-side flex flex-y-center">
            <image src="/static/images/36.png"></image>
            <text>我的资产</text>
          </view>
          <u--text suffixIcon="arrow-right" align="right" iconStyle="font-size: 12px;color:#79818A" text=""></u--text>
        </view>

        <view class="item" @click="too('/pages/home-page/gf_cz')">
          <view class="left-side flex flex-y-center">
            <image src="/static/images/37.png"></image>
            <text>账户充值</text>
          </view>
          <u--text suffixIcon="arrow-right" align="right" iconStyle="font-size: 12px;color:#79818A" text=""></u--text>
        </view>

        <view class="item" @click="too('/pages/home-page/team')">
          <view class="left-side flex flex-y-center">
            <image src="/static/images/38.png"></image>
            <text>我的团队</text>
          </view>
          <u--text suffixIcon="arrow-right" align="right" iconStyle="font-size: 12px;color:#79818A" text=""></u--text>
        </view>

        <view class="item" @click="openKefu">
          <view class="left-side flex flex-y-center">
            <image src="/static/images/39.png"></image>
            <text>在线客服</text>
          </view>
          <u--text suffixIcon="arrow-right" align="right" iconStyle="font-size: 12px;color:#79818A" text=""></u--text>
        </view>

        <view class="item" @click="too('/pages/home-page/withdraw')">
          <view class="left-side flex flex-y-center">
            <image src="/static/images/40.png"></image>
            <text>提现通道</text>
          </view>
          <u--text suffixIcon="arrow-right" align="right" iconStyle="font-size: 12px;color:#79818A" text=""></u--text>
        </view>

        <view class="item">
          <u-button class="n-button n-button-3" text="退出登录" @click="userLogout" ></u-button>
        </view>

      </view>

    </view>

  </view>
</template>

<script>
import avatar from '../../components/yq-avatar/yq-avatar.vue'
export default {
  data() {
    return {
      // 默认头像
      avatarurl: '/static/images/79.png',
      user_info: {},
      kefu_url:'',
    }
  },
  methods:{
    getUserInfo() {
      this.to.www(this.api.user_info).then(res => {

        this.user_info = res.data
        this.avatarurl = res.data.avatar

        if (res.data.avatar == '' || res.data.avatar == 'undefined') {
          this.avatarurl = '/static/images/79.png'
        }
        
        uni.setStorage({
          data: this.user_info,
          key: 'user_info'
        })
        
        // 作用？
        uni.setStorage({
          data: 'first-launch',
          key: 'use-page-type'
        })

      })
    },
    userLogout(){
      const _this = this
      uni.showModal({
        title: '提示',
        content: '是否要退出登录',
        success(res) {
          if (res.confirm) {
            uni.removeStorageSync('TK')
            _this.too('/pages/system-page/login')
          }
        }
      })

    },
    openKefu(){
      //#ifdef WEB
      window.open(this.kefu_url)
      //#endif

      //#ifdef APP-PLUS
      plus.runtime.openURL(this.kefu_url)
      //#endif
    }
  },
  onShow() {
    this.getUserInfo()

    const kefu_url = uni.getStorageSync('kefu_url')
    if(kefu_url)  this.kefu_url = kefu_url
  },
  components: {
    avatar
  },
}
</script>

<style lang="scss" scoped>
page{
  height: 100%;
  background-color: #F9F9F9;
}
.page{
  height: 100%;

  .head{
    height: 500rpx;
    
    /* #ifdef WEB */
    height: 350rpx;
    /* #endif */
    
    background-image: url('/static/images/29.png');
    background-size: cover;
    background-repeat: no-repeat;

    position: relative;

    /* 用户信息 */
    .userinfo{
      height: 175rpx;
      padding: 0 48rpx;
      margin-top: 20rpx;
      
      .left-side{

        .text-info{

          width: 280rpx;
          overflow: hidden;

          font-size: 32rpx;
          margin-left: 18rpx;

          .username{
            color: white;
            white-space: nowrap;
          }

          .account{
            font-size: 28rpx;
            color: white;
            white-space: nowrap;
          }

          .desc{
            font-size: 22rpx;
            margin-top: 12rpx;
            
            .text-part{
              color: white;
              opacity: .8;
              margin-left: 6rpx;
            }

          }

          .level-2{
            width: 130rpx;
          }


        }
      }

      /* 用户等级 */
      .right-side{
        image{
          width: 160rpx;
        }
      }

    }

    /* 底栏 */
    .bottom-bar{
      width: 100%;
      height: 48rpx;
      background-color: #F9F9F9;

      position: absolute;
      left: 0;
      bottom: 0;

      border-top-left-radius: 36rpx;
      border-top-right-radius: 36rpx;

    }


  }

  .section{
    padding: 0 48rpx;
    /* 小菜单1 */
    .menu-list{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 30rpx;

      .menu-item{
        width: calc(50% - 16rpx);
        height: 144rpx;
        background-repeat: no-repeat;
        background-size: cover;

        border-radius: 18rpx;

        padding: 34rpx 34rpx;
        .title{
          font-size: 28rpx;
          font-weight: 600;
          color: white;
        }
        .label{
          opacity: .8;
          color: white;
          margin-top: 4rpx;
        }

      }

    }

  }

}
</style>