<template>
    <view class="page">
        <view class="padding-box-4">
            <u--form
                ref="uForm"
                :model="formData"
                :rules="formRules"
                labelPosition="top"
                :borderBottom="false"
                >
                <view class="card">
                    <view class="card-header">会员信息</view>
                    <view class="card-content">
                        <!-- 姓名 -->
                        <u-form-item
                            label="姓名"
                            prop="name"
                            :borderBottom="false">
                            <u--input
                                v-model="formData.name"
                                placeholder="请输入您的姓名"
                                border="none">
                            </u--input>
                        </u-form-item>


                        <!-- 账号 -->
                        <u-form-item
                            label="账号"
                            prop="account"
                            :borderBottom="false">
                            <u--input
                                v-model="formData.account"
                                placeholder="请输入您的账号"
                                border="none">
                            </u--input>
                        </u-form-item>

                        <!-- 身份证号码 -->
                        <u-form-item
                            label="身份证号码"
                            prop="id_card"
                            :borderBottom="false">
                            <u--input
                                v-model="formData.id_card"
                                placeholder="请输入您的身份证号码"
                                border="none">
                            </u--input>
                        </u-form-item>


                    </view>

                </view>

                <view class="card">
                    <view class="card-header">受损金额</view>
                    <view class="card-content">
                        <!-- 受损金额 -->
                        <u-form-item
                            :label="''"
                            prop="apply_amount"
                            :borderBottom="false">
                            <u--input
                                v-model="formData.apply_amount"
                                placeholder="请输入您的受损金额"
                                border="none">
                            </u--input>
                        </u-form-item>
                    </view>
                </view>

                <view class="card">
                    <view class="card-header">凭证上传</view>
                    <view class="card-content" @click="upload">
                       <view class="n-upload-box flex flex-column flex-y-center">
						   <template v-if="formData.tokenUrl == ''">
							   <u-icon size="24px" color="#ababab" name="plus"></u-icon>
							   <view class="flex flex-x-center margin-t-25">
							       <u--text text="请上传您的凭证" color="#ababab"></u--text>
							   </view>
						   </template>
                          <image v-else :src="apiUrl + formData.tokenUrl" style="width: 100%;" mode="widthFix"></image>
                       </view>
                    </view>
                </view>

                <u-button class="n-button" style="margin-top: 64rpx" iconColor="#fff" text="提现" :loading="isLoading" @click="checkForm" :loadingText="regStatus"></u-button>

            </u--form>
        </view>
    </view>
</template>

<script>
/**
 * 资产申请页
 */
export default {
    data(){
        return {
            apiUrl:'',
            regStatus: '正在提交...',		 // loading text
            isLoading:false,				// 请求等待
            formData:{
                name:'',
                account:'',
                id_card:'',
                apply_amount:'',
                tokenUrl:'',
            },
            formRules:{
                name:[{
                    required:true,
                    message: '请输入您的姓名',
                }],
                account:[{
                    required:true,
                    message: '请输入您的账号',
                }],
                id_card:[{
                    required:true,
                    message:'请输入您的身份证号码'
                }],
                apply_amount:[{
                    required:true,
                    message:'请输入您的受损金额'
                }],
                tokenUrl:[{
                    required:true,
                    message:'请上传您的凭证'
                }]
            },
            fileList:[],
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
		upload(){
			let that = this;
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album'],
				success: function (res) {
					uni.showLoading();
					that.to.www(that.api.nyfz_upload, res.tempFilePaths[0], "p", "file")
						.then(res => {
							that.toa('上传成功')
							that.formData.tokenUrl = res[0];
							console.log(that.formData);
							uni.hideLoading();
						})
						.catch((err) => {
							console.log(err)
							// uni.hideLoading();
						})
				}
			});
		},
		/* 发送请求 */
		async goRequest(){
            this.isLoading = true
            try{
				const response = await this.to.www(this.api.nyfz_request, this.formData,'p')
			
				/* 注册成功 */
				const {code = 0} = response
				if(code == 200){
					this.toa('提交成功')
                    // this.too('/pages/index/nyfz')
					uni.navigateBack()
				}else{
					this.isLoading = false
				}

			}catch(e){
				this.isLoading = false
			}
        }
    },
    mounted(){
		const apiUrl = uni.getStorageSync('ok_api') || ''
		this.apiUrl = apiUrl
	}
}
</script>

<style lang="scss" scoped>
page{
    background-color: #F9F9F9;
}
</style>