<template>
    <view class="page page3">

        <!-- 顶栏 -->
		<view class="page-navbar">
			<nNavbar title="新增" :showBackBtn="true" :back="true"></nNavbar>
		</view>

        <!-- 内容正文 -->
        <view class="padding-box-3" style="padding-top: 2vh">
            <!-- 表单 -->
            <view class="card card-u-from-2">
                <u--form
                    ref="uForm"
                    :model="formData"
                    :rules="formRules"
                    labelPosition="top"
                    :borderBottom="false"
                >
                    <!-- 银行名称 -->
                    <u-form-item
                        label="银行名称"
                        labelWidth="150rpx"
                        prop="bank_name"
                        :borderBottom="false">
                        <u--input
                            v-model="formData.bank_name"
                            placeholder="请输入银行名称"
                            border="none">
                        </u--input>
                    </u-form-item>

                    <!-- 银行卡号 -->
                    <u-form-item
                        label="银行卡号"
                        labelWidth="150rpx"
                        prop="account"
                        :borderBottom="false">
                        <u--input
                            v-model="formData.account"
                            placeholder="请输入您的银行卡号"
                            border="none">
                        </u--input>
                    </u-form-item>

                    <!-- 持卡人姓名 -->
                    <!-- <u-form-item
                        label="持卡人姓名"
                        labelWidth="200rpx"
                        prop="name"
                        :borderBottom="false">
                        <u--input
                            v-model="formData.name"
                            placeholder="请输入您的姓名"
                            border="none">
                        </u--input>
                    </u-form-item> -->

                    <!-- 收款地址 -->
                    <!-- <u-form-item
                        label="收款地址"
                        labelWidth="200rpx"
                        prop="address"
                        :borderBottom="false">
                        <u--input
                            v-model="formData.address"
                            placeholder="请输入您的收款地址"
                            border="none">
                        </u--input>
                    </u-form-item> -->

                    <!-- 加载动画 -->
                    <u-loading-page :loading="isLoading"></u-loading-page>

                    <view class="n-btn-group" style="margin-top: 36rpx">
                        <u-button class="n-button n-button-3" iconColor="#fff" text="取消" :loading="isLoading" @click="()=>$refs['uForm'].resetFields()" :loadingText="regStatus"></u-button>
                        <u-button class="n-button" iconColor="#fff" text="提交" :loading="isLoading" @click="checkForm" :loadingText="regStatus"></u-button>
                    </view>

                </u--form>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data(){
        return {
            isLoading:false,				// 请求等待
            regStatus: '正在请求...',		 // loading text

            /* 用户个人信息 */
            userInfo:false,

            formData:{
                pay_type:3,
                name:'',                            // 持卡人姓名
                account:'',                         // 银行卡号
                bank_name:'',                       // 银行名称
                address:'',                         // 收款地址
            },
            formRules:{
                // name:[{
                //     required:true,
                //     message:'请输入您的姓名'
                // }],
                account:[{
                    required:true,
                    message:'请输入您的银行卡号'
                }],
                bank_name:[{
                    required:true,
                    message:'请输入银行名称'
                }],
                // address:[{
                //     required:true,
                //     message:'请输入您的收款地址'
                // }]
            }
        }
    },
    methods:{
        /* 表单验证 */
        async checkForm(){
            this.$refs.uForm.validate().then(res => {
                /* 发送请求 */
                this.goRequest()
            }).catch(()=>null)
        },
        /* 发送请求 */
        async goRequest(){
            this.isLoading = true
            try{
                const response = await this.to.www(this.api.bank_account, this.formData,'p')
            
                /* 注册成功 */
                const {code = 0} = response
                if(code == 200){
                    const _this = this
                    uni.setStorage({
                        data: 'need-reload-page',
                        key: "use-page-type",
                        success() {
                            _this.isLoading = false
							uni.navigateBack()
                        }
                    })
                }else{
                    const {msg = ''} = response
                    this.toa(msg)
                    this.isLoading = false
                }

            }catch(e){
                this.isLoading = false
            }
            
        },

        /* 用户信息 */
		getUserInfo() {
			this.to.www(this.api.user_info).then(res => {

                this.userInfo = res.data

				const {realname = ''} = this.userInfo
                this.formData.name = realname

				uni.setStorage({
					data: this.userInfo,
					key: 'user_info'
				})
                

			})
		},

        onLoad(){
            const userInfo = uni.getStorageSync('user_info')
            const {realname = ''} = userInfo
            this.formData.name = realname

            this.getUserInfo()
        }
    }
}
</script>

<style lang="scss" scoped>
page{
    height: 100%;
    background-color: #f0f2f5;
}
</style>