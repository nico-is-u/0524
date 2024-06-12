const apis = {
	// 测试接口
	api_test:'common/test',
	// 拉取验证码
	system_captcha:'common/captchaImg',
	// 用户登录，注册，修改登录密码
	user_login:'common/login',
	user_register:'common/register',
	user_paypwd:'user/changePassword',
	// 诺亚方舟首页
	nyfz_info:'noahOrder/index',
	/* 诺亚方舟 - 释放列表 / 申请记录 */
	nyfz_list:'noahOrder/applyOrderList',
	// 诺亚方舟 提交申请
	nyfz_request:'noahOrder/apply',
	// 诺亚方舟 申请凭证上传
	nyfz_upload:'noahOrder/tokenUpload',

	

	/* 已废弃 */
	user_info:'user/userInfo',
	user_real:'user/submitProfile',
	user_pay_list:'user/payChannelList',
	user_top_up:'capital/topup',
	user_sign:'signin/userSignin',
	user_team:'user/team',
	user_team_list:'user/teamRankList',
	system_notice:'common/bulletin',
	zc_recover_list:'order/assetOrderConfig',
	zc_recover_subject:'order/assetPlaceOrder',
	gf_baozhang:'order/assetOrderList',
	gf_band_card:'capital/savePayAccount',
	project_list:'project/projectList',
	system_news:'common/systemInfoList',
	reg_check_code:'common/captchaImg',
	sys_share:'user/invite',
	sys_rank_list:'rank/rankList',
	bank_list:'capital/payAccountList',
	del_bank:'capital/payAccountDel',
	balance_log:'user/balanceLog',
	order_log:'order/orderList',
	buy_project:'order/placeOrder',
	user_draw:'capital/applyWithdraw',
  	user_draw_purse:'capital/applyWithdrawPurse',
  	user_balancelog_purse:'user/balanceLogPurse',
	system_info:'common/systemInfo',
	get_xinafu_houfu:'signin/dayReceive',
	sys_transAccount:'user/transferAccounts',
	gf_bz_list:'order/assetOrderList',
	buy_gf_det:'order/receivePlaceOrder',
	qq_address:'user/saveUserInfo',
	up_load_file:'common/uploadFile',
	usr_avatar:"user/avatar",
	usr_sg_log:'signin/signinRecord'
}
export default apis
/* i9hys6gdb5stfzge */