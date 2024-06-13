<template>
    <view class="page">
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
                    <!-- 原密码 -->
                    <u-form-item
                        label="原密码"
                        labelWidth="100rpx"
                        prop="old_password"
                        :borderBottom="false">
                        <u--input
                            type="password"
                            v-model="formData.old_password"
                            placeholder="请输入您的原密码"
                            border="none">
                        </u--input>
                    </u-form-item>

                    <!-- 新密码 -->
                    <u-form-item
                        label="新密码"
                        labelWidth="100rpx"
                        prop="new_password"
                        :borderBottom="false">
                        <u--input
                            type="password"
                            v-model="formData.new_password"
                            placeholder="请输入您的新密码"
                            border="none">
                        </u--input>
                    </u-form-item>

                    <!-- 提交按钮 -->
                    <u-button class="n-button" style="margin-top: 36rpx"  iconColor="#fff" text="提交" :loading="isLoading" @click="checkForm" :loadingText="regStatus"></u-button>

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
    
            formData:{
                old_password:'',
                new_password:'',
            },
            formRules:{
                old_password:[{
                    required: true,
                    message: '请输入旧登录密码',
                }],
                new_password:[{
                    required: true,
                    message: '请输入新登录密码',
                }]
            },
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
                const response = await this.to.www(this.api.user_paypwd, {
                    ...this.formData,
                    type:2
                }
                ,'p')
            
                /* 注册成功 */
                const {code = 0} = response
                if(code == 200){
                    const _this = this
                    this.toa('已设置新的支付密码')
                    uni.setStorage({
                        data: 'need-reload-page',
                        key: "use-page-type",
                        success() {
                            setTimeout(() => {
                                _this.too('/pages/index/my_list')
                            }, 1500)
                        }
                    })
                }else{
                    this.isLoading = false
                }

            }catch(e){
                this.isLoading = false
            }
            
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