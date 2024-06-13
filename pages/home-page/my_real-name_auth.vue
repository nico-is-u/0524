<template>
    <view class="page">
        <!-- 内容正文 -->
        <view class="padding-box-3">
            <!-- 表单 -->
            <view class="card card-u-from-2">
                <view class="card-header">身份信息</view>
                <u--form
                    class="margin-t-15"
                    ref="uForm"
                    :model="formData"
                    :rules="formRules"
                    labelPosition="top"
                    :borderBottom="false"
                >
                    <!-- 姓名 -->
                    <u-form-item
                        label="姓名"
                        labelWidth="100rpx"
                        prop="realname"
                        :borderBottom="false">
                        <u--input
                            v-model="formData.realname"
                            placeholder="请输入您的真实姓名"
                            border="none">
                        </u--input>
                    </u-form-item>

                    <!-- 身份证号码 -->
                    <u-form-item
                        label="身份证号码"
                        labelWidth="150px"
                        prop="ic_number"
                        :borderBottom="false">
                        <u--input
                            v-model="formData.ic_number"
                            placeholder="请输入您的身份证号码"
                            border="none">
                        </u--input>
                    </u-form-item>

                </u--form>
            </view>
        </view>

        <!-- 加载动画 -->
        <u-loading-page :loading="isLoading" :loading-text="regStatus"></u-loading-page>

        <!-- 提交按钮 -->
        <view class="fixed-button-group">
            <u-button class="n-button n-button-2" text="保存" :loading="isLoading" :loadingText="regStatus" iconColor="#fff" @click="checkForm"></u-button>
        </view>

    </view>
</template>

<script>
export default {
    data(){
        return {
            isLoading:false,                    // 请求中
            regStatus: '正在提交...',		     // loading text

            formData:{
                realname:'',                    // 真实姓名
                ic_number:'',                   // 身份证号码
            },
            formRules:{
                realname:[{
                    required:true,
                    message:'请输入您的真实姓名'
                }],
                ic_number:[{
                    required:true,
                    message:'请输入您的身份证号码'
                }]
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
        /* 提交请求 */
        async goRequest(){
            this.isLoading = true
            try {
                const response = await this.to.www(this.api.user_real,this.formData,'p')
                const {code = 0} = response
                if(code == 200){
                    
                    // 更新个人信息
                    this.regStatus = '操作成功'
                    const response2 = await this.to.www(this.api.user_info)
                    const {code:code2 = 0,data:resData = {}} = response2
                    if(code2 == 200){
                        uni.setStorage({
                            data: resData,
                            key: 'user_info'
                        })
                        this.isLoading = false
                        this.too('/pages/home-page/my_list')
                    }

                }else{
                    this.isLoading = false
                }
            }catch(e){
                this.isLoading = false
            }

        }
    },
    mounted(){
        const userInfo = uni.getStorageSync('user_info')
        if(userInfo){
            console.log(userInfo)
            const {realname = '' , ic_number = ''} = userInfo
            this.formData.realname = realname
            this.formData.ic_number = ic_number
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