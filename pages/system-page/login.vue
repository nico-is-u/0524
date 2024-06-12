<template>
	<view class="page2">
		<!-- 装饰 -->
		<view class="decoration"></view>
		<!-- 标题 -->
		<view class="h1">用户登录</view>
		<!-- 表单部分 -->
		<u--form
			ref="uForm"
        	:model="formData"
        	:rules="formRules"
        	labelPosition="top"
        	:borderBottom="false"
        >

		</u--form>
	</view>
</template>

<script>
export default {
	data(){
		return {
			formData:{},
			formRules:{}
		}
	}
}
</script>