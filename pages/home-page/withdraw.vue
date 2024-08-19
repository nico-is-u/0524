<template>
  <view class="page page3" id="gf_draw">

    <!-- 顶栏 -->
    <view class="page-navbar">
      <nNavbar title="提现" :showBackBtn="true" :back="true"></nNavbar>
    </view>

    <!-- 余额信息 -->
    <view style="padding: 16rpx 12rpx 0">
      <view class="balance-info flex flex-y-center flex-x-center">
        <view class="text-block flex flex-column">
          <view class="label">USDT余额</view>
          <view class="title">{{ Number(userInfo.usdt).toFixed(2) || '0' }}</view>
        </view>
        <view class="line"></view>
        <view class="text-block flex flex-column">
          <view class="label">CNY可用余额</view>
          <view class="title">{{ userInfo.topup_balance || '0.00' }}</view>
        </view>
        <view class="line"></view>
        <view class="text-block flex flex-column">
          <view class="label">CNY可提余额</view>
          <view class="title">{{ userInfo.balance || '0.00' }}</view>
        </view>
      </view>
    </view>

    <!-- 提现表单 -->
    <view class="padding-box-3">
      <view class="content-3" style="margin-top: 32rpx;">
        <!-- tab 菜单 -->
        <view class="tab-menu-type-1 flex flex-between flex-y-end" v-show="true">
          <view :class="formData.pay_channel == 0 ? 'active' : ''" @click="formData.pay_channel = 0"
            class="menu-item menu-item-1 flex flex-center">
            <view class="triangle"></view>
            <text>USDT</text>
          </view>
          <view :class="formData.pay_channel == 1 ? 'active' : ''" @click="formData.pay_channel = 1"
            class="menu-item menu-item-2 flex flex-center">
            <view class="triangle"></view>
            <text>CNY</text>
          </view>
        </view>

        <!-- 表单部分 -->
        <u--form ref="uForm" :model="formData" :rules="formRules" labelPosition="top" :borderBottom="false"
          labelWidth="auto">
          <!-- 提现金额 -->
          <u-form-item label="提现" prop="amount" :borderBottom="false">
            <u--input type="number" v-model="formData.amount" placeholder="请输入要提现的数额" border="none">
              <!-- 后插槽 币种 -->
              <u--text :text="pay_channel_txt" :bold="true" slot="suffix"></u--text>
            </u--input>
          </u-form-item>

          <!-- <u-form-item v-if="formData.pay_channel == 0"
            label="钱包地址"
            prop="usdt_address"
            :borderBottom="false"
        >
          <u--input
            v-model="formData.usdt_address"
            placeholder="请输入钱包地址"
            border="none">
          </u--input>
        </u-form-item> -->

          <!-- 收款地址（trc） -->
          <template v-if="formData.pay_channel == 0">

            <u-form-item label="钱包地址" prop="usdt_address" :borderBottom="false">
              <view style="padding: 30rpx 0 0 20rpx;">{{ trcAddress || '暂无钱包地址' }}</view>

            </u-form-item>

            <!-- <u-picker :show="trcSelect" @close="trcSelect=false" @cancel="trcSelect=false"
						@confirm="trcDoSelect" :closeOnClickOverlay="true" :columns=""></u-picker> -->

          </template>


          <u-form-item v-if="formData.pay_channel == 1" label="收款账号" :borderBottom="false">
            <u--input @focus="too('/pages/home-page/pay-account?select=1')" v-model="bankInfo.bank_name"
              placeholder="请选择银行" border="none">
            </u--input>
          </u-form-item>
          <!-- 支付密码 -->
          <u-form-item label="密码" prop="pay_password" :borderBottom="false">
            <u--input type="password" border="none" placeholder="请输入支付密码" v-model="formData.pay_password">
            </u--input>

          </u-form-item>
        </u--form>

      </view>

      <!-- 加载动画 -->
      <u-loading-page :loading="isLoading" :loading-text="regStatus" style="z-index: 3"></u-loading-page>

      <!-- 提交按钮 -->
      <u-button class="n-button" text="提现" :loading="isLoading" loadingText="请稍等" @click="checkForm" style="margin-top: 64rpx;"></u-button>

    </view>

    <!-- 提现记录 -->
    <view class="padding-box">
      <view class="content">
        <view class="title">
          <view class="label">
            <text>提现记录</text>
          </view>
        </view>

        <view class="card-list-type-2" v-if="Array.isArray(dataList2) && dataList2.length">
          <view class="item" v-for="(item, index) in dataList2" :key="index">
            <view class="row flex flex-between">
              <view class="left-side">状态</view>
              <view class="right-side">
                <view>{{ item.stext || '' }}</view>
              </view>
            </view>

            <view class="row flex flex-between">
              <view class="left-side">提现金额</view>
              <view class="right-side">{{ item.withdraw_amount || '' }}</view>
            </view>

            <view class="row flex flex-between">
              <view class="left-side">提现手续费</view>
              <view class="right-side">{{ item.withdraw_fee || '' }}</view>
            </view>

            <view class="row flex flex-between">
              <view class="left-side">{{ item.capital_sn || '' }}</view>
              <view class="right-side">{{ item.updated_at || '' }}</view>
            </view>
          </view>
        </view>

      </view>
    </view>

  </view>

</template>

<script>
/**
 * 发起提现
 */
export default {
  data() {
    return {
      userInfo: {},          // 用户信息

      isLoading: false,                // 请求中
      regStatus: '正在提交...',		     // loading text

      dataList: false,                 // 收款账号
      dataList2: [],                   // 提现记录

      trcList: [],                     // 收款账号列表（trc）
      trcIndex: 0,                     // 当前收款账号（trc)
      trcSelect: false,

      bankInfo: {},
      formData: {
        pay_channel: 0,
        amount: '',                // 收款金额
        pay_password: '',          // 支付密码
        usdt_address: '',
        bank_id: 0,
      },
      formRules: {
        amount: [
          {
            required: true,
            message: '请输入提现数额',
          }
        ],
        pay_password: [
          {
            required: true,
            message: '请输入支付密码'
          }
        ]
      }
    }
  },
  computed: {
    pay_channel_txt() {
      return this.formData.pay_channel == 0 ? 'USDT' : 'CNY'
    },
    trcList2() {
      let result = []
      if (Array.isArray(this.trcList) && this.trcList.length) {
        this.trcList.map(item => {
          if (item.pay_type == 7) result.push(item)
        })
      }
      return result
    },
    trcAddress(){
      let result = ''
      if (Array.isArray(this.trcList2) && this.trcList2.length) {
        result = this.trcList2[this.trcIndex].address || ''
      }
      return result
    },

    trcId(){
      let result = ''
      if (Array.isArray(this.trcList2) && this.trcList2.length) {
        result = this.trcList2[this.trcIndex].id || ''
      }
      return result
    },

  },
  onShow() {
    let bank_info = uni.getStorageSync("BANK_DRAW");
    if (bank_info) {
      this.bankInfo = bank_info;
      console.log(this.bankInfo);
      uni.removeStorage({
        key: "BANK_DRAW"
      })
    }
  },
  methods: {
    /* 检查表单 */
    checkForm() {
      
      this.$refs.uForm.validate().then(res => {

        if (this.formData.pay_channel == 0) {
          this.formData.usdt_address = this.trcAddress
          this.formData.bank_id = this.trcId
          // return this.toa('请输入钱包地址')
        }

        if (this.formData.pay_channel == 1) {
          this.formData.bank_id = this.bankInfo.id;
          console.log(this.formData);
          if (this.formData.bank_id == 0) {
            return this.toa('请选择收款账户')
          }
        }

        this.isLoading = true
        
        this.to.www(this.api.applyWithdraw, {
          ...this.formData, is_usdt: !this.formData.pay_channel
        }, 'p')
          .then(res => {
            this.isLoading = false
            
            this.toa('申请成功')
            setTimeout(() => {
              uni.navigateBack()
            }, 2000)
          })
          .catch(e => {
            this.isLoading = false

            const {msg = ''} = e
            if(msg) this.toa(msg)
          })

      }).catch((e)=>{
        console.log(e)
      })
    },
    /* 拉取收款账号列表（trc) */
    async getTrcList() {
      try {
        const response = await this.to.www(this.api.bank_list)
        const { code = 0, data = [] } = response
        if (code == 200) {
          this.trcList = data
        }
      } catch (e) {
      }
    }
  },
  onLoad() {
    this.to.www(this.api.user_info).then(res => {
      this.userInfo = res.data
    })

    /* 拉取收款账号 */
    this.getTrcList()

    /* 拉取提现记录 */
    this.to.www(this.api.withdrawList).then(res => {
      this.dataList2 = res.data.data || []
    })

  }
}
</script>

<style lang="scss">
page {
  background-color: #f9f9f9;
}

#gf_draw {

  /* 余额信息 */
  .balance-info {
    height: 264rpx;
    background-image: url(/static/images/41.png);
    background-size: 100% 100%;

    padding: 0;

    .line {
      width: 2rpx;
      height: 120rpx;
      background-color: rgba(255, 255, 255, .2);
    }

    .text-block {
      width: 32%;
      padding-left: 24rpx;
    }

    .label {
      color: rgba(255, 255, 255, .8);
      font-size: 28rpx;
    }

    .title {
      color: white;
      font-size: 40rpx;

      margin-top: 8rpx;
    }

  }

  .content-3 {
    overflow: hidden;
  }


}
</style>