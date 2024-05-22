<template>
  <view>
    <view v-if="!claimStatus">
      <u--text text="认领资产人信息" size="18px" bold margin="15px 20px 5px"></u--text>
      <view class="ser_list">
        <view class="item">
          <u--text text="姓名"></u--text>
          <u--text align="right" size="14px" color="#999" :text="userInfo.realname"></u--text>
        </view>
        <view class="item">
          <u--text text="证件号码"></u--text>
          <u--text align="right" size="14px" color="#999" :text="userInfo.maskedIcNumber"></u--text>
        </view>
        <view class="item">
          <u--text text="认领有效期至:"></u--text>
          <u--text align="right" size="14px" color="#999" text="2024年6月5日"></u--text>
        </view>
        <u--text text="重要提示" size="14px" color="#909da3" margin="10px 0"></u--text>
        <u--text
          text="1.本人参与共富工程领取所有共富工程项目收益，如果有不实或隐瞒冒用他人身份领取，愿承担因此引起的所有责任。\n2.认领资产为免费，为确保冒充他人领取需缴纳 2000 元保证金，缴纳完成后派发共富专属卡，卡片本人激活成功后， 2000 元自动返还至共富工程钱包可随时提现。"
          size="14px" lineHeight="24px" color="#909da3"></u--text>
        <u-button color="linear-gradient(to right, #B80606, rgb(216, 68, 68))" iconColor="#fff" class="custom-style"
          text="立即领取" @click="showPaypassword = true"></u-button>
      </view>
    </view>
    <view v-else style="padding: 40px 10px">
      <view class="main-title">
        <u-icon name="checkmark-circle" color="#42b983" size="32px"></u-icon>
        <text>认领成功</text>
      </view>
      <u--text text="您已成功认领，请耐心等待收卡！" align="center" size="14px" lineHeight="24px" color="#909da3"
        margin="20px 0"></u--text>
      <u-button color="linear-gradient(to right, #B80606, rgb(216, 68, 68))" iconColor="#fff" class="custom-style"
        text="认领查询" @click="showClaimProcess = true"></u-button>
    </view>
    <u-popup :show="showPaypassword" mode="center" closeOnClickOverlay closeable @close="showPaypassword = false">
      <view class="popup-warp">
        <view class="pay_box">
          <view style="margin-top: 30rpx">
            <u--text prefixIcon="coupon-fill" iconStyle="font-size: 34rpx;margin-top:6rpx;margin-right:8rpx" size="14"
              text="请选择支付方式"></u--text>
            <view @click="
      sct = 999;
    tp = '1';
    cid = '';
    " :class="['pay_list_item', 999 == sct ? showSelect : '']">
              <img v-show="999 == sct" src="/static/icon/i2.png"
                style="width: 1em; margin: 0 20rpx 0 0; transition: all 0.2s" />
              总余额：【{{ yue }}】
            </view>
            <view v-for="(item, index) in paycd" :key="index">
              <view @click="setSelect(item, index)" :class="['pay_list_item', index == sct ? showSelect : '']">
                <image style="width: 1.5rem; height: 1.5rem; margin: 0 20rpx 0 0; transition: all 0.2s"
                  v-show="index == sct" :src="item.img" mode="widthFix"></image>
                {{ item.name }} {{ item.fixed_topup_limit }}
              </view>
            </view>
          </view>
          <u--text prefixIcon="coupon-fill" iconStyle="font-size: 34rpx;margin-top:6rpx;margin-right:8rpx"
            margin="30rpx 0" size="14" text="请输入支付密码"></u--text>
          <view style="margin: 30rpx 0 90rpx; opacity: 0.6">
            <xt-verify-code :isPassword="true" boxActiveColor="#333" v-model="pay_password"></xt-verify-code>
          </view>
          <u-button color="linear-gradient(to right, #B80606, rgb(216, 68, 68))" class="custom-style" text="立即提交"
            :loading="isDone" :loadingText="regStatus" @click="submitOrder"></u-button>
        </view>
      </view>
    </u-popup>
    <u-popup :show="showClaimProcess" mode="center" closeOnClickOverlay closeable @close="showClaimProcess = false">
      <view class="popup-warp">
        <u-steps current="0" direction="column" dot>
          <u-steps-item title="认领通过进行中" desc="　"></u-steps-item>
          <u-steps-item title="邮寄中" desc="　"></u-steps-item>
          <u-steps-item title="卡片签收" desc="　"></u-steps-item>
          <u-steps-item title="激活卡片成功" desc="　"></u-steps-item>
          <u-steps-item title="2000 元保证金返还到账" desc="　"></u-steps-item>
        </u-steps>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        realname: '',
        maskedIcNumber: ''
      },
      yue: '0.0',
      sct: '999',
      tp: '1',
      dinfo: {},
      paycd: [],
      current: 0,
      showSelect: 'showselet',
      paydt: {},
      pwd: '',
      cid: '',
      pay_password: '',
      claimStatus: false,
      showPaypassword: false,
      showClaimProcess: false,
      isDone: false,
      regStatus: '处理中...'
    };
  },
  onLoad() {
    let _ = this;

    this.to.www(this.api.user_info).then((res) => {
      this.yue = Number(res.data.cash).toFixed(2);
      // this.yue = Number(res.data.topup_balance).toFixed(2);
      console.log('update: user');
      uni.setStorage({
        data: res.data,
        key: 'user_info'
      });
    });
    // let data = uni.getStorageSync("WHITE_DO_BUY_SHOP");
    // this.to.www(this.api.user_pay_list).then((r) => {
    //   r.data.forEach((daitem) => {
    //     data.support_pay_methods.forEach((itm) => {
    //       // console.log(itm,daitem.type);
    //       if (daitem.type == Number(itm)) {
    //         // console.log('添加');
    //         this.paycd.push(daitem);
    //       }
    //     });
    //   });
    //   this.paydt = this.paycd[0];
    // });
    let user_info = uni.getStorageSync('user_info');
    this.userInfo = user_info;

    let p1 = this.userInfo.ic_number.slice(0, 1);
    let p2 = this.userInfo.ic_number.slice(-1);
    // 脱敏处理
    let maskedIcNumber = p1 + '*'.repeat(this.userInfo.ic_number.length - 2) + p2;
    this.userInfo.maskedIcNumber = maskedIcNumber;
    this.getOrderList();
  },
  onShow() {
    this.isDone = false
  },
  methods: {
    submitOrder() {
      if (!this.pay_password) {
        return this.toa('请输入支付密码');
      }
      this.isDone = true
      this.to
        .www(
          this.api.auth_place_order,
          {
            pay_password: this.pay_password
          },
          'p'
        )
        .then((res) => {
          this.isDone = false;
          this.getOrderList();
        })
        .catch((err) => {
          this.isDone = false;
        });
    },
    setSelect(q, w) {
      this.sct = w;
      this.paydt = q;
      if (q.type == 4) {
        this.tp = 6;
      } else {
        this.tp = Number(q.type) + 1;
      }
      this.cid = q.id;
    },
    getOrderList() {
      this.showPaypassword = false;
      this.to
        .www(this.api.auth_order_list)
        .then((res) => {
          this.claimStatus = true;
        })
        .catch((err) => {
          if (err.code === 10001) {
            this.claimStatus = false;
          }
        });
    }
  }
};
</script>

<style lang="scss">
.custom-style {
  margin: 40rpx auto;
}

.ser_list {
  background-color: #fff;
  border-radius: 10rpx;
  padding: 20rpx 40rpx;

  .sgazyhjud {
    text-align: right;
  }

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 3rpx solid #f9f9f9;
    padding: 35rpx 0;
  }
}

.main-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  text {
    font-size: 24px;
    font-weight: bold;
  }
}

.popup-warp {
  width: 70vw;
  padding: 20px;
  border-radius: 10px;

  .pay_box {
    .pay_list_item {
      margin: 25rpx 0 40rpx;
      height: 75rpx;
      display: flex;
      align-items: center;
      padding: 0 20rpx;
      border-radius: 8rpx;
      line-height: 75rpx;
      background: rgba(158, 158, 171, 0.3);
    }

    .pwd_iput {
      height: 75rpx;
      padding: 0 20rpx;
      margin: 30rpx 0;
      border-radius: 8rpx;
      line-height: 75rpx;
      background: rgba(195, 195, 210, 0.1);
      border: 2rpx solid $th;
    }

    .showselet {
      background: $th;
      color: #fff;
      transition: all 0.2s;
    }
  }
}
</style>
