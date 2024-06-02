<template>
  <view class="page" id="gf_draw">
    <view class="padding-box-3">
      <!-- 余额信息 -->
      <view class="balance-info flex flex-y-center flex-between">
        <view class="text-block flex flex-column">
          <view class="label">USDT余额</view>
          <view class="title">852458931</view>
        </view>
        <view class="line"></view>
        <view class="text-block flex flex-column">
          <view class="label">CNY余额</view>
          <view class="title">852458931</view>
        </view>
      </view>

      <!-- 提现表单 -->
      <view class="content-3" style="margin-top: 32rpx;">
        <!-- 菜单 -->
        <view class="menu flex flex-between">
          <view :class="type == 'USDT' ? 'active' : ''" @click="type = 'USDT'" class="menu-item menu-item-usdt flex flex-center">
            <view class="triangle"></view>
            <text>USDT</text>
          </view>
          <view :class="type == 'CNY' ? 'active' : ''" @click="type = 'CNY'" class="menu-item menu-item-cny flex flex-center">
            <view class="triangle"></view>
            <text>CNY</text>
          </view>
        </view>

        <!-- 表单部分 -->
        <u--form
          ref="uForm"
          :model="formData"
          :rules="formRules"
          labelPosition="top"
          :borderBottom="false"
        >
          <!-- 提现金额 -->
          <u-form-item
              label="提现"
              prop="balance"
              :borderBottom="false"
          >
            <u--input
              type="number"
              v-model="formData.balance"
              placeholder="请输入要提现的数额"
              border="none">
              <!-- 后插槽 币种 -->
              <u--text
                :text="type"
                :bold="true"
                slot="suffix"
              ></u--text>
            </u--input>
          </u-form-item>

          <!-- 支付密码 -->
          <u-form-item
              label="密码"
              prop="password"
              :borderBottom="false"
          >
            <u--input
              type="password"
              border="none"
              placeholder="请输入支付密码"
              v-model="formData.password">
            </u--input>

          </u-form-item>
        </u--form>

      </view>

      <!-- 提交按钮 -->
      <view class="n-button" style="margin-top: 64rpx" @click="checkForm">提现</view>

    </view>
  </view>
</template>

<script>
/**
 * 发起提现
 */
export default {
  data(){
    return {
      type:'USDT',          // 提现类型
      formData:{
        balance:'',
        password:'',
      },
      formRules:{
        balance:[
          {
            required: true,
            message: '请输入提现数额',
          }
        ],
        password:[
          {
            required: true,
            message: '请输入支付密码'
          }
        ]
      }
    }
  },
  methods:{
    /* 检查表单 */
    checkForm(){
      this.$refs.uForm.validate().then(res => {
        uni.$u.toast('校验通过')
      }).catch(()=>null)
    }
  }
}
</script>

<style lang="scss">
#gf_draw{
  /* 余额信息 */
  .balance-info{
    height: 264rpx;
    background-image: url(/static/images/41.png);
    background-size: 100% 100%;

    padding: 0 64rpx;

    .line{
      width: 2rpx;
      height: 120rpx;
      background-color: rgba(255,255,255,.2);
    }

    .text-block{
      width: 40%;
    }

    .label{
      color: rgba(255,255,255,.8);
      font-size: 28rpx;
    }

    .title{
      color: white;
      font-size: 40rpx;

      margin-top: 8rpx;
    }

  }

  .content-3{
    overflow: hidden;
  }

  /* 菜单 */
  .menu{
    .menu-item{
      width: 50%;
      height: 84rpx;
      position: relative;

      font-size: 36rpx;
      color: #828383;
      background-color: #EFF6FE;

      .triangle{
        display: none;
      }

      &.active{
        color: #222;
        font-weight: bold;
        background-color: white;
        
        .triangle{
          display: block;
        }

      }
    }

    .menu-item-usdt{
      .triangle{
        width: 0;
        height: 0;
        position: absolute;
        right: -21rpx;
        top: 0;
  
        border-top: 84rpx solid white;
        border-right: 21rpx solid transparent;
        transform: rotateX(180deg);
  
        z-index: 1;
      }
    }

    .menu-item-cny{
      .triangle{
        width: 0;
        height: 0;
        position: absolute;
        left: -21rpx;
        top: 0;
  
        border-top: 84rpx solid white;
        border-left: 21rpx solid transparent;
        transform: rotateX(180deg);
  
        z-index: 1;
      }
    }

  }


}
</style>