<template>
  <view>
    <template>
      <view class="head">
        <view class="title">
          <view style="display: flex; justify-content: space-between">
            <text>{{ type == 'gfgc' ? '共富工程钱包余额' : '可提现总金额' }}</text>
            <text v-if="!type" @click="too('/pages/system-page/gf_amount_draw?type=2')">提现明细</text>
            <text v-if="type == 'gfgc'" @click="too('/pages/system-page/gf_amount_draw?type=3')">收益明细</text>
          </view>
          <u--text mode="price" align="left" size="28px" color="#fff" :text="type == 'gfgc' ? user_info.gf_purse : user_info.team_bonus_balance"></u--text>
        </view>
      </view>
    </template>

    <view class="content">
      <u--text size="30rpx" text="提现金额"></u--text>
      <view class="out">
        <text class="fh">¥</text>
        <input class="inpu" type="number" v-model="out_money" maxlength="9" placeholder-style="color:#d43229" placeholder="请输入提现金额" />
        <!-- <text class="all" @click="out_money = user_info.team_bonus_balance*0.3">30%</text> -->
        <!-- <text class="all" @click="out_money = user_info.team_bonus_balance*0.5">50%</text> -->
        <text class="all" v-if="type=='gfgc'" @click="out_money = user_info.gf_purse">全部</text>
        <text class="all" v-else @click="out_money = user_info.team_bonus_balance">全部</text>
      </view>

      <template>
        <view style="display: flex; justify-content: space-between; align-items: center; margin: 40rpx 0">
          <u--text size="30rpx" text="请选择收款账号"></u--text>
          <u--text suffixIcon="arrow-right" @click="too('/pages/system-page/gf_bank_list?select=1')" align="right" :text="bankInfo.id ? bankInfo.bank_name : '去选择'"></u--text>
        </view>
      </template>
      <template>
        <view style="margin: 35rpx 0">
          <u--text size="30rpx" text="到账金额"></u--text>
          <text style="float: right; margin-top: -1.2rem">{{ Number(out_money * 0.9).toFixed(2) }}</text>
        </view>
      </template>

      <template>
        <u--text size="30rpx" text="支付密码" customStyle="margin-top:20rpx"></u--text>
        <view style="margin: 30rpx 0 90rpx; opacity: 0.6">
          <xt-verify-code :isPassword="true" boxActiveColor="#333" v-model="pay_password"></xt-verify-code>
        </view>
      </template>

      <u-button
        color="linear-gradient(to right, #B80606, rgb(216, 68, 68))"
        iconColor="#fff"
        class="custom-style"
        text="提现"
        :loading="isDone"
        @click="doOut"
        loadingText="请稍等"
      ></u-button>
      <view class="sign_info">
        <text class="title">注意事项：</text>
        <text class="t1">{{ type == 'gfgc' ? '1、满100.00元可以提现' : '1、满50.00元可以提现' }}</text>
        <text class="t2">2、每笔提现手续费10%；</text>
        <text class="t2">3、提现时间每天10:00~17:00；</text>
        <text class="t2" v-if="type != 'gfgc'">4、提现金额100以下提现到支付宝，以上提现到银行卡；</text>
      </view>
    </view>
    <u-overlay :show="showAd" zIndex="999" opacity="0.3	">
      <view class="warp" @click="closePage">
        <view class="rect">
          <view style="margin-top: 30rpx; text-align: center; padding: 0 30rpx">
            <svg t="1703902068653" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="23931" width="120" height="120">
              <path
                d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z"
                fill="#d23732"
                p-id="23932"
                data-spm-anchor-id="a313x.search_index.0.i1.58d83a81KN3dRt"
                class="selected"
              ></path>
              <path
                d="M411.0464 704.2176a38.4 38.4 0 0 0 54.0288 2.7904l1.7664-1.664 264.5248-268.8a38.4 38.4 0 0 0-52.9024-55.616l-1.8304 1.7408L440.576 622.528l-104.96-115.5456a38.4 38.4 0 0 0-52.3904-4.1856l-1.8432 1.5744a38.4 38.4 0 0 0-4.1856 52.4032l1.5744 1.8432 132.2752 145.6z"
                fill="#FFFFFF"
                p-id="23933"
              ></path>
            </svg>
            <view style="margin: 50rpx auto 0; width: 80%">提现成功！</view>
          </view>
        </view>
      </view>
    </u-overlay>
  </view>
</template>

<script>
export default {
  data() {
    return {
      showAd: false,
      pay_password: '',
      isDone: false,
      out_money: '',
      user_info: {},
      list: [],
      bankInfo: {},
      type: null
    };
  },
  onShow() {
    let bank_info = uni.getStorageSync('BANK_DRAW');
    if (bank_info) {
      this.bankInfo = bank_info;
    }
  },
  onLoad(options) {
    this.type = options.type || null;
    let data = uni.getStorageSync('user_info');
    this.user_info = data;
    this.to.www(this.api.bank_list).then((res) => {
      this.list = res.data;
    });
  },
  methods: {
    closePage() {
      this.showAd = false;
      setTimeout(() => {
        uni.navigateBack();
      }, 600);
    },
    doOut() {
      let _ = this;
      if (!this.type) {
        if (Number(this.out_money) > Number(this.user_info.team_bonus_balance)) {
          this.out_money = '';
          this.toa('余额不足');
          return void 0;
        }
      }
      if (this.type === 'gfgc') {
        if (Number(this.out_money) > Number(this.user_info.gf_purse)) {
          this.out_money = '';
          this.toa('余额不足');
          return void 0;
        }
      }
      if (!this.out_money) {
        return _.toa('请输入提现金额');
      }
      if (!this.bankInfo.id) {
        return _.toa('请选择收款账号');
      }
      this.to
        .www(this.type === 'gfgc' ? this.api.user_draw_purse : this.api.user_draw, {
          amount: this.out_money,
          pay_channel: 4,
          bank_id: this.bankInfo.id,
          pay_password: this.pay_password
        })
        .then((res) => {
          this.showAd = true;
          // console.log(res);
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
  width: 450rpx;
  height: 450rpx;
  border-radius: 10rpx;
  background-color: #fff;
  padding: 20rpx;
  box-shadow: 4rpx 4rpx 30rpx 15rpx rgba(73, 72, 113, 0.3);
  text-align: center;
}

.sign_info {
  padding: 30rpx;

  .title {
    font-weight: bold;
    display: block;
    margin-bottom: 20rpx;
  }

  .t1,
  .t2 {
    display: block;
    margin-bottom: 20rpx;
  }
}

.content {
  padding: 20rpx 40rpx;
  margin-top: 20rpx;

  .out {
    display: flex;
    align-items: center;
    margin: 30rpx 0;

    .fh {
      font-size: 40rpx;
      color: #999;
    }

    .inpu {
      border: 2rpx solid #e0e0e0;
      padding: 10rpx;
      font-size: 30rpx;
      margin: 0 20rpx;
      width: 70%;
      border-radius: 8rpx;
    }

    .all {
      width: 20%;
      text-align: center;
      // background-color: $th;
      color: #4e4e4e;
      font-size: 32rpx;
      border-radius: 8rpx;
    }
  }
}

.head {
  background-image: linear-gradient(to bottom, #b80606, #cd5e5e);
  padding: 20rpx 40rpx;
  box-shadow: 0 0 20rpx 5rpx rgba(218, 0, 0, 0.5);
  color: #fff;
  z-index: 9;
  height: 180rpx;
  border-radius: 0 0 40% 40%;

  .title {
    height: 160rpx;
  }
}
</style>
