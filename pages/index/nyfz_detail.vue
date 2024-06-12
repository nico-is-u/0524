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
                    <view class="card-content">
                        <u-form-item
                            :label="''"
                            prop="tokenUrl"
                            :borderBottom="false">
                            
                            <u-upload
                                @afterRead="afterRead"
                                :fileList="fileList"
                                multiple
                                width="100%"
                                :previewFullImage="true"
                                :maxCount="1">
                                <view class="n-upload-box flex flex-column flex-y-center">
                                    <u-icon size="24px" color="#ababab" name="plus"></u-icon>
                                    <view class="flex flex-x-center margin-t-25">
                                        <u--text text="请上传您的凭证" color="#ababab"></u--text>
                                    </view>
                                </view>
                            </u-upload>

                        </u-form-item>

                    </view>
                </view>

                <u-button class="n-button" style="margin-top: 64rpx" iconColor="#fff" text="提现" :loading="isLoading" @click="checkForm" :loadingText="regStatus"></u-button>

            </u--form>
        </view>
    </view>
</template>

<script>
import CryptoJS from 'crypto-js'
import AUX_Audio from 'LOCKED.js'
const customUnlock_k = AUX_Audio.fewagfagretgataGRGvreawdwafewaf
function decryptCBC(word, keyStr, ivStr) {
    keyStr = keyStr ? keyStr : customUnlock_k;
    ivStr = ivStr ? ivStr : customUnlock_k;
    var key = CryptoJS.enc.Utf8.parse(keyStr);
    let iv = CryptoJS.enc.Utf8.parse(ivStr);
    var decrypt = CryptoJS.AES.decrypt(word, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypt.toString(CryptoJS.enc.Utf8);
}

/**
 * 资产申请页
 */
export default {
    data(){
        return {
            apiUrl:'',
            regStatus: '正在提交...',		 // loading text
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
        /* 上传凭证 */
        async afterRead(event){
            if(event.file){
                this.fileList.push({
                    ...event.file[0],
                    status: 'uploading',
					message: '上传中'
                })

                uni.uploadFile({
                    url:this.apiUrl + this.api.nyfz_upload,
                    filePath:event.file.url,
                    name: 'file',
                    header:{
                        token:uni.getStorageSync('TK')
                    },
                    success: (uploadFileRes) => {
                        const res0 = JSON.parse(uploadFileRes.data)
                        const res1 = decryptCBC(res0.c) || {}
                        const {code = 0,data:res2 = {}} = res1
                        /* 上传成功 */
                        if(code == 200){
                            console.log('上传成功', res2)
                        /* 上传失败 */
                        }else{
                            console.log('上传失败')
                            this.fileList = []
                        }
                        
                    },
                    fail: (err) => {
                        console.log('上传失败', err)
                        this.fileList = []
                    }
                })

            }
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
                    this.too('/pages/index/nyfz')
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