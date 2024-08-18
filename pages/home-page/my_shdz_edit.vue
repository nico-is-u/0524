<template>
    <view class="page page3" id="my_shdz_edit">

        <!-- 顶栏 -->
		<view class="page-navbar">
			<nNavbar title="新增收货地址" :showBackBtn="true" :back="true"></nNavbar>
		</view>

        <!-- 内容正文 -->
        <view class="padding-box-3" style="padding-top: 0">
            <!-- 表单 -->
            <view class="card card-u-from margin-t-35">
                <u--form
                    ref="uForm"
                    :model="formData"
                    :rules="formRules"
                    labelPosition="left"
                    :borderBottom="false"
                >
                    <!-- 收货人姓名 -->
                    <!-- <u-form-item
                        label="收货人"
                        labelWidth="100rpx"
                        prop="name"
                        :borderBottom="false">
                        <u--input
                            v-model="formData.name"
                            placeholder="请输入收货人姓名"
                            border="none">
                        </u--input>
                    </u-form-item> -->

                    <!-- 手机号 -->
                    <!-- <u-form-item
                        label="手机号"
                        labelWidth="100rpx"
                        prop="name"
                        :borderBottom="false">
                        <u--input
                            v-model="formData.name"
                            placeholder="请输入手机号码"
                            border="none">
                        </u--input>
                    </u-form-item> -->

                    <!-- 详细地址 -->
                    <u-form-item
                        label="详细地址"
                        labelWidth="140rpx"
                        prop="address"
                        :borderBottom="false">
                        <u--textarea v-model="formData.address" placeholder="请输入详细地址" :height="20" autoHeight border="none"></u--textarea>
                    </u-form-item>

                </u--form>
            </view>
        </view>

        <!-- 加载动画 -->
        <u-loading-page :loading="isLoading"></u-loading-page>

        <view class="fixed-button-group">
            <u-button class="n-button n-button-2" text="保存" :loading="isLoading" :loadingText="regStatus" iconColor="#fff" @click="checkForm"></u-button>
        </view>

    </view>
</template>

<script>
export default {
    data(){
        return {
            todo:1,                             // 1 新增  2 编辑
            isLoading:false,                    // 请求中
            regStatus: '正在提交...',		     // loading text

            formData:{
                address:'',                     // 详细地址
            },
            formRules:{
                address:[{
                    required:true,
                    message:'请输入详细地址'
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
        /* 请求数据 */
        async goRequest(){
            this.isLoading = true
            try {
                const response = await this.to.www(this.api.shdz_info,this.formData,'p')
                const {code = 0} = response
                if(code == 200){
                    uni.showToast({
                        title: '操作成功',
                        duration: 2000
                    })
                    this.isLoading = false
                    this.too('/pages/home-page/my_shdz')
                }else{
                    this.isLoading = false
                }
            }catch(e){
                this.isLoading = false
            }
        },
    },
    onLoad(){
        const formInfo = uni.getStorageSync('shdz_info')
        if(formInfo){
            this.todo = 2
            this.formData = formInfo
            uni.setNavigationBarTitle({
                title: '编辑收货地址'
            })
        }
    },
    beforeUnmount(){
        uni.removeStorageSync('shdz_info');
    },
}
</script>

<style lang="scss" scoped>
page{
    height: 100%;
    background-color: #f0f2f5;
}

</style>