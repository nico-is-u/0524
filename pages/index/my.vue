<template>
  <view class="the_page_mine">
    <view class="page_head">
      <u-row justify="space-between" customStyle="margin:20rpx 0;" gutter="1">
        <u-col align="center" span="2">
          <view class="logo">
            <avatar selWidth="400upx" noTab selHeight="400upx" @upload="myUpload" :avatarSrc="avatarurl" avatarStyle="width: 100upx; height: 100upx; border-radius: 100%;"></avatar>
          </view>
        </u-col>
        <u-col align="center" span="6">
          <u--text color="#fff" :text="user_info.phone.slice(0, 3) + '****' + user_info.phone.slice(7, 11)"></u--text>
          <u--text
            color="#fff"
            :text="user_info.level_text"
            customStyle="margin:8rpx 0"
            prefixIcon="integral-fill"
            @click="too('/pages/home-page/gf_baozhang?type=zce')"
            iconStyle="color:#fff;font-size:34rpx;margin:5rpx 6rpx 0 0"
          ></u--text>
          <u--text
            v-if="user_info.ic_number"
            :mode="showName"
            :text="user_info.realname"
            format="encrypt"
            :suffixIcon="showNameIcon"
            iconStyle="color:#fff;margin-left:25rpx"
            color="#fff"
            @click="showNameBtn"
          ></u--text>
          <u--text v-else text="未实名认证" color="#fff" @click="too('/pages/system-page/gf_real-name_auth?v=' + user_info.is_set_pay_password)"></u--text>
        </u-col>
        <u-col align="center" span="4" @click="too('/pages/shop-page/gf_baozhang')">
          <u-icon name="gift" color="#fff" size="35"></u-icon>
          <u--text color="#fff" text="共富保障" align="center"></u--text>
        </u-col>
      </u-row>
      <view class="ur_acc">
        <view>总资产</view>
        <view>
          <u--text :text="'￥' + Number(user_info.total_balance).toFixed(2)" color="#fff" align="right"></u--text>
        </view>
      </view>
    </view>

    <view class="content-box">
      <u--text prefixIcon="bookmark-fill" size="30rpx" iconStyle="font-size: 32rpx;color:#EE2B2A" text="其他资金"></u--text>
      <u-row justify="space-between" gutter="8">
        <u-col align="center" span="6">
          <view class="n-ecny" @click="toecny">
            <!-- <view class="n-ecny" @click="toa('1月28日开放')"> -->
            <view style="display: flex">
              <image src="/static/icon/wecny.png" mode="widthFix" style="width: 80rpx; margin-right: 10rpx; height: 1rpx"></image>
              <view class="">
                <view>数字钱包</view>
                <view style="font-size: 28rpx; margin-top: 5rpx">E-CNY</view>
              </view>
            </view>
            <!-- <text>{{user_info.digit_balance}}元</text> -->
          </view>
        </u-col>
        <u-col align="center" span="6">
          <view class="n-ecny" style="background-color: #e7847e" @click="too('/pages/home-page/gf_draw?type=gfgc')">
            <!-- <view class="n-ecny" @click="toa('1月28日开放')"> -->
            <view style="display: flex">
              <image src="/static/icon/logo-r.png" mode="widthFix" style="width: 80rpx; margin-right: 10rpx; height: 1rpx"></image>
              <view class="">
                <view>共富工程钱包</view>
                <u--text mode="price" align="left" size="28rpx" margin="5rpx 0 0" color="#fff" :text="user_info.gf_purse"></u--text>
              </view>
            </view>
            <!-- <text>{{user_info.digit_balance}}元</text> -->
          </view>
        </u-col>
      </u-row>
      <u-row justify="space-between" customStyle="margin:20rpx 0;" gutter="1">
        <u-col align="center" span="4">
          <view class="zj_item it1" @click="too('/pages/system-page/gf_amount-detail')">
            <u--text :text="'￥' + Number(user_info.cash).toFixed(2)" color="#fff" align="center"></u--text>
            <u--text color="#fff" text="现金" align="center"></u--text>
          </view>
        </u-col>
        <u-col align="center" span="4" @click="toyuanCny">
          <view class="zj_item it2">
            <u--text :text="'￥' + Number(user_info.digital_yuan_amount).toFixed(1)" color="#fff" align="center"></u--text>
            <u--text color="#fff" text="数字人民币" align="center"></u--text>
          </view>
        </u-col>
        <u-col align="center" span="4" @click="too('/pages/home-page/gf_baozhang?type=live')">
          <view class="zj_item it3">
            <u--text :text="'￥' + Number(user_info.poverty_subsidy_amount).toFixed(2)" color="#fff" align="center"></u--text>
            <u--text color="#fff" text="生活补助" align="center"></u--text>
          </view>
        </u-col>
      </u-row>

      <!-- 	<image class="banner_img" @click="too('/pages/shop-page/gf_active')" src="../../static/images/mine/b1.jpg"
				mode="widthFix">
			</image> -->
      <!-- <image class="banner_img" @click="too('/pages/shop-page/gf_up')" src="../../static/images/mine/b2.jpg"
				mode="widthFix">
			</image> -->

      <view class="ser_list">
        <view class="item" @click="too('/pages/home-page/gf_zcgzs')">
          <u--text prefixIcon="fingerprint" size="20" iconStyle="font-size: 18px;margin-right:8rpx" text="资产公证书"></u--text>
          <u--text suffixIcon="arrow-right" align="right" iconStyle="font-size: 16px;color:#999" text=""></u--text>
        </view>
        <view class="item" @click="too('/pages/system-page/gf_zc_detail')">
          <u--text prefixIcon="attach" size="20" iconStyle="font-size: 18px;margin-right:8rpx" text="交接资产详情"></u--text>
          <u--text suffixIcon="arrow-right" align="right" iconStyle="font-size: 16px;color:#999" text=""></u--text>
        </view>
        <view class="item" @click="too('/pages/system-page/sys_user_info')">
          <u--text prefixIcon="account" size="20" iconStyle="font-size: 18px;margin-right:8rpx" text="个人信息"></u--text>
          <u--text suffixIcon="arrow-right" align="right" color="#999" iconStyle="font-size: 16px;color:#999" text="内容"></u--text>
        </view>
        <view class="item" @click="too('/pages/home-page/gf_top-up')">
          <u--text prefixIcon="coupon" size="20" iconStyle="font-size: 18px;margin-right:8rpx" text="账户充值"></u--text>
          <u--text suffixIcon="arrow-right" align="right" color="#999" iconStyle="font-size: 16px;color:#999" text="点击即可充值"></u--text>
        </view>
        <view class="item" @click="too('/pages/home-page/gf_draw')">
          <u--text prefixIcon="order" size="20" iconStyle="font-size: 18px;margin-right:8rpx" text="账户提现"></u--text>
          <u--text suffixIcon="arrow-right" align="right" iconStyle="font-size: 16px;color:#999" text=""></u--text>
        </view>
        <view class="item" @click="too('/pages/home-page/gf_tr-money')">
          <u--text prefixIcon="scan" size="20" iconStyle="font-size: 18px;margin-right:8rpx" text="账户转账"></u--text>
          <u--text suffixIcon="arrow-right" align="right" iconStyle="font-size: 16px;color:#999" text=""></u--text>
        </view>
        <view class="item" @click="too('/pages/system-page/gf_amount_fund')">
          <u--text prefixIcon="file-text" size="20" iconStyle="font-size: 18px;margin-right:8rpx" text="资金明细"></u--text>
          <u--text suffixIcon="arrow-right" align="right" iconStyle="font-size: 16px;color:#999" text=""></u--text>
        </view>
        <view class="item" @click="too('/pages/system-page/gf_band-card')">
          <u--text prefixIcon="rmb-circle" size="20" iconStyle="font-size: 18px;margin-right:8rpx" text="收款方式"></u--text>
          <u--text suffixIcon="arrow-right" align="right" color="#999" iconStyle="font-size: 16px;color:#999" text="银行卡"></u--text>
        </view>
        <view class="item" @click="too('/pages/home-page/gf_customer')">
          <u--text prefixIcon="kefu-ermai" size="20" iconStyle="font-size: 18px;margin-right:8rpx" text="我的客服"></u--text>
          <u--text suffixIcon="arrow-right" align="right" color="#999" iconStyle="font-size: 16px;color:#999" text="在线咨询"></u--text>
        </view>
        <view class="item" @click="too('/pages/system-page/gf_secure?v=' + user_info.is_set_pay_password)">
          <u--text prefixIcon="setting" size="20" iconStyle="font-size: 18px;margin-right:8rpx" text="账户安全"></u--text>
          <u--text suffixIcon="arrow-right" align="right" iconStyle="font-size: 16px;color:#999" text=""></u--text>
        </view>

        <view class="item" @click="too('/pages/system-page/gf_about')">
          <u--text prefixIcon="server-man" size="20" iconStyle="font-size: 18px;margin-right:8rpx" text="关于我们"></u--text>
          <u--text suffixIcon="arrow-right" align="right" iconStyle="font-size: 16px;color:#999" text=""></u--text>
        </view>
        <view class="item" @click="logOut">
          <u--text prefixIcon="reload" size="20" iconStyle="font-size: 18px;margin-right:8rpx" text="安全退出"></u--text>
          <u--text suffixIcon="arrow-right" align="right" iconStyle="font-size: 16px;color:#999" text=""></u--text>
        </view>
      </view>
      <view style="margin-top: 50rpx">
        <!-- <u--text align="center" color="#cacaca" text="TEST V.6.0.0"></u--text> -->
        <u--text align="center" color="#cacaca" text="V.3.5.6"></u--text>
      </view>
    </view>
    <u-overlay :show="ecnyts" zIndex="999" opacity="0.8">
      <view class="warp">
        <view class="rect" @tap.stop>
          <view>提示</view>
          <view style="color: #c03328; padding: 40rpx">您还未激活数字人民币钱包，是否去激活？</view>
          <view style="display: flex; justify-content: space-between; width: 70%; margin: 20rpx auto">
            <view @click="ecnyts = false">取消</view>
            <view @click="tourl" style="color: #c03328">确定</view>
          </view>
        </view>
      </view>
    </u-overlay>
  </view>
</template>

<script>
import avatar from '../../components/yq-avatar/yq-avatar.vue';
export default {
  components: {
    avatar
  },
  data() {
    return {
      ecnyts: false,
      avatarurl: '../../static/icon/logo.png',
      showName: 'name',
      showNameIcon: 'eye-off',
      user_info: {
        balance: '0.00', //账户余额
        digital_yuan_amount: 20000, //数字人民币
        ic_number: '', //身份证
        invite_code: '...',
        digit_balance: '',
        is_active: 0, //是否激活 0否
        is_set_pay_password: 0, //是否设置支付密码 0 否
        level: 0,
        phone: '...',
        poverty_subsidy_amount: 0, //生活补助
        realname: '', //实名
        topup_balance: '0.00', //现金,
        cash: '0',
        /* 修改值 */
        level_text: '...',
        gf_purse: 0 //共富工程钱包
      }
    };
  },
  onShow() {
    this.getUserInfo();
  },
  onLoad(option) {},
  methods: {
    toecny() {
      if (this.user_info.level < 1) {
        this.toa('未达成共富一级');
      } else {
        this.too('/pages/system-page/gf_ecny_money');
      }
    },
    myUpload(rsp) {
      const domain = uni.getStorageSync('ok_api');
      let _ = this;
      uni.uploadFile({
        url: domain + 'common/uploadFile',
        filePath: rsp.base64,
        name: 'file',
        success(res) {
          // console.log(res);
          let data = JSON.parse(res.data);
          _.to
            .www(
              _.api.usr_avatar,
              {
                avatar: data.data.url
              },
              'p'
            )
            .then((res) => {
              _.avatarurl = rsp.path;
              _.toa('已更新头像');
            });
        }
      });
    },
    tourl() {
      uni.navigateTo({
        url: '/pages/shop-page/gf_active'
      });
    },
    toyuanCny() {
      if (this.user_info.can_open_digital == 0) {
        this.ecnyts = true;
      } else {
        this.too('/pages/shop-page/gf_ecny?mon=' + this.user_info.digital_yuan_amount);
      }
    },
    showNameBtn() {
      if (this.showName == 'name') this.showName = '';
      else this.showName = 'name';
      if (this.showNameIcon == 'eye-off') this.showNameIcon = 'eye';
      else this.showNameIcon = 'eye-off';
    },
    getUserInfo() {
      this.to.www(this.api.user_info).then((res) => {
        this.user_info = res.data;
        this.avatarurl = res.data.avatar;
        if (res.data.avatar == '' || res.data.avatar == 'undefined') {
          this.avatarurl = '../../static/icon/logo.png';
        }

        let lvs = [, '共富一级', '共富二级', '共富三级', '共富四级', '共富五级'];
        if (res.data.level == 0) this.user_info.level_text = '未加入共富';
        else this.user_info.level_text = lvs[res.data.level];
        uni.setStorage({
          data: this.user_info,
          key: 'user_info'
        });
        uni.setStorage({
          data: 'first-launch',
          key: 'use-page-type'
        });
      });
    },
    logOut() {
      let _ = this;
      uni.showModal({
        title: '提示',
        content: '安全退出此账号 ? ',
        confirmColor: '#c03328',
        success: (res) => {
          if (res.confirm) {
            uni.clearStorage();
            _.too('/pages/system-page/gf_login', 'lau');
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.warp {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.rect {
  width: 76%;
  border-radius: 10rpx;
  background-color: #fff;
  padding: 20rpx 15rpx 30rpx;
  text-align: center;
  height: 320rpx;
  .close {
    width: 200rpx;
    background-color: #fff;
    color: #fff;
    margin: 30rpx auto 20rpx;
    height: 60rpx;
    line-height: 60rpx;
    border-radius: 50rpx;
    position: fixed;
    bottom: 250rpx;
    left: 50%;
    transform: translateX(-50%);
  }
}

.n-ecny {
  background-color: #df5d67;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15rpx 20rpx;
  border-radius: 15rpx;
  width: 100%;
  margin: 10rpx auto 0;
  box-sizing: border-box;
}

.content-box {
  padding: 30rpx;

  .ser_list {
    background-color: #fff;
    border-radius: 10rpx;
    padding: 20rpx;

    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 3rpx solid #f9f9f9;
      padding: 12rpx 0;
    }
  }

  .zj_item {
    width: 95%;
    padding: 40rpx 0;
    box-sizing: border-box;
    border-radius: 10rpx;
  }

  .zj_item.it1 {
    background-color: #df5d67;
  }

  .zj_item.it2 {
    background-color: #e2a76b;
  }

  .zj_item.it3 {
    background-color: #4fb315;
  }

  .banner_img {
    width: 100%;
    margin: 10rpx auto;
    border-radius: 6rpx;
    background-color: #fff;
    padding: 8rpx;
    border-radius: 6rpx;
    box-sizing: border-box;
  }
}

.page_head {
  background-color: #b80606;
  padding: 10rpx 30rpx;
  color: #fff;

  .logo {
    width: 100upx;
    height: 100upx;
  }

  .ur_acc {
    background-color: rgba(255, 255, 255, 0.25);
    width: 95%;
    height: 50rpx;
    line-height: 50rpx;
    border-radius: 10rpx;
    display: flex;
    padding: 10rpx 0;
    justify-content: space-around;
    margin: 50rpx auto 20rpx;

    text {
      font-weight: bold;
    }
  }
}

.the_page_mine {
  background-color: #f8f8f8;
}
</style>
