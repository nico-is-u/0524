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
                            prop="idNum"
                            :borderBottom="false">
                            <u--input
                                v-model="formData.idNum"
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
                            prop="balance"
                            :borderBottom="false">
                            <u--input
                                v-model="formData.balance"
                                placeholder="请输入您的受损金额"
                                border="none">
                            </u--input>
                        </u-form-item>
                    </view>
                </view>

                <view class="card">
                    <view class="card-header">凭证上传</view>
                    <view class="card-content">
                        <u-upload
                            :fileList="fileList"
                            multiple
                            width="100%"
                            :maxCount="1">
                            <view class="n-upload-box flex flex-column flex-y-center">
                                <u-icon size="24px" color="#ababab" name="plus"></u-icon>
                                <view class="flex flex-x-center margin-t-25">
                                    <u--text text="请上传您的凭证" color="#ababab"></u--text>
                                </view>
                            </view>
                        </u-upload>
                    </view>
                </view>

                <view class="n-button" style="margin-top: 64rpx" @click="checkForm">提现</view>

            </u--form>
        </view>
    </view>
</template>

<script>
export default {
    data(){
        return {
            formData:{},
            formRules:{},
            fileList:[],
        }
    }
}
</script>

<style lang="scss" scoped>
page{
    background-color: #F9F9F9;
}
</style>