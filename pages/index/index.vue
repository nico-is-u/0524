<template>
	<view class="content">
		<template>
			<view class="head">
				<!-- 顶栏 -->
				<nNavbar title="首页" :showBackBtn="false"></nNavbar>
				<!-- 幻灯片 -->
				<swiper class="swiper">
					<swiper-item v-for="(item,index) in banner_list" :key="'swiper-item-'+index">
						<image :src="apiUrl + item.img_url" ></image>
					</swiper-item>
				</swiper>
			</view>
		</template>

		<!-- 功能菜单 -->
		<template>
			<view class="padding-box">
				<view class="content">
					
					<view class="flex menu-list">
						<view class="item flex flex-column flex-center">
							<image src="/static/images/2.png" mode="widthFix"></image>
							<text>App 下载</text>
						</view>
						<view class="item flex flex-column flex-center">
							<image src="/static/images/3.png" mode="widthFix"></image>
							<text>社区团队</text>
						</view>
						<view class="item flex flex-column flex-center">
							<image src="/static/images/4.png" mode="widthFix"></image>
							<text>邀请好友</text>
						</view>
						<view class="item flex flex-column flex-center">
							<image src="/static/images/5.png" mode="widthFix"></image>
							<text>在线充值</text>
						</view>
					</view>

				</view>
			</view>

		</template>
		
		<!-- 新闻列表 -->
		<template>
			<view class="padding-box" style="margin-top: 32rpx;">
				<view class="content">
					<view class="title">
						<view class="label">
							<text>新闻资讯</text>
						</view>
					</view>

					<view class="gf_news">
						<view class="gf_news_conrent">

							<view class="news-item flex flex-column"
								v-for="(item,index) in newsList"
								:key="'news-item-' + index"
								@click="toNewDetail(item)">
								<view class="news-title">{{ item.title }}</view>
								<view class="news-date">{{ item.updated_at | dateMatter }}</view>
								<view class="news-bottom-border"></view>
							</view>

						</view>
					</view>
					
				</view>
			</view>
			
		</template>

		<u-overlay :show="showAd" zIndex="999" opacity="0.8">
			<view class="warp">
				<view class="rect" @tap.stop>
					<!-- <text class="title">通知内容</text> -->
					<image src="../../static/icon/noti.png" style="width: 60%;margin: 20rpx 0;height: 0.8rem;"
						mode="widthFix"></image>
					<view class="content">
						<u-parse :content="showNots" :tagStyle="style"></u-parse>
						<view @click="hideOnext" class="close">关闭</view>
					</view>
				</view>
			</view>
		</u-overlay>

		<u-overlay :show="showUrNots" zIndex="999" opacity="0.8">
			<view class="warp">
				<view class="rect" @tap.stop>
					<text style="color: #FFF;margin: 30rpx 0;display: block;">{{urnotice.title}}</text>
					<view class="content">
						<u-parse :content="urnotice.content" :tagStyle="style"></u-parse>
						<view @click="shutdownSysnot" class="close">关闭</view>
					</view>
				</view>
			</view>
		</u-overlay>

		<view v-if="isShwoLoad"
			style="position: fixed;width: 100%;top: 0;left: 0;z-index: 99999;background-color: #FFF;height: 100vh;">
			<view class="ststus2" style="position: relative;">
				<view style="position: absolute;top:45%;" class="roat">
					<svg t="1703417725659" class="icon" viewBox="0 0 1024 1024" version="1.1"
						xmlns="http://www.w3.org/2000/svg" p-id="5948" width="100" height="100">
						<path
							d="M964.388184 477.340047a72.848985 72.848985 0 0 1 22.16189 53.612757c0 20.991625-7.387297 38.691881-22.16189 53.612757a72.044428 72.044428 0 0 1-53.466474 22.16189c-20.845342 0-38.618739-7.460438-53.612757-22.16189a72.848985 72.848985 0 0 1-22.16189-53.612757c0-20.991625 7.387297-38.691881 22.16189-53.612757a72.848985 72.848985 0 0 1 53.612757-22.161889c20.7722 0 38.765022 7.460438 53.466474 22.161889m-99.911359 348.885199a73.141551 73.141551 0 0 1-22.527598 53.393332 72.995268 72.995268 0 0 1-53.393332 22.527598c-20.991625 0-38.618739-7.460438-53.612757-22.16189a72.848985 72.848985 0 0 1-22.16189-53.612757c0-20.991625 7.460438-38.618739 22.16189-53.612757a72.848985 72.848985 0 0 1 53.612757-22.16189c20.991625 0 38.691881 7.460438 53.612757 22.16189a72.410136 72.410136 0 0 1 22.308173 53.466474m56.904127-590.179175c0 36.717059-13.019196 68.094784-39.13073 93.913751a128.070856 128.070856 0 0 1-93.621185 38.691881c-36.643917 0-68.021642-12.946055-93.913752-38.691881a127.924573 127.924573 0 0 1-38.618739-93.913751c0-36.351351 12.946055-67.582793 38.618739-93.621186a127.924573 127.924573 0 0 1 93.986893-39.13073c36.351351 0 67.582793 13.092338 93.548044 39.203872 26.111534 25.818968 39.13073 57.05041 39.13073 93.548044m-374.192175 658.566525a72.848985 72.848985 0 0 1 22.088748 53.612757c0 20.991625-7.387297 38.691881-22.088748 53.612757a72.848985 72.848985 0 0 1-53.685899 22.16189c-20.991625 0-38.618739-7.460438-53.612757-22.16189a72.410136 72.410136 0 0 1-22.16189-53.612757c0-20.991625 7.460438-38.618739 22.16189-53.612757a72.848985 72.848985 0 0 1 53.612757-22.16189c20.991625 0 38.765022 7.460438 53.685899 22.16189M574.251151 33.151408c22.088748 22.16189 33.206264 48.931698 33.206264 80.675131 0 31.743433-11.117516 58.366958-33.206264 80.601989a109.566043 109.566043 0 0 1-80.60199 33.133123c-31.743433 0-58.366958-11.117516-80.601989-33.133123a109.346619 109.346619 0 0 1-33.206264-80.601989c0-31.743433 11.190657-58.366958 33.206264-80.675131A109.785468 109.785468 0 0 1 493.57602 0.018285c31.59715 0 58.366958 11.117516 80.601989 33.133123M252.208901 772.612489a72.848985 72.848985 0 0 1 22.088749 53.612757c0 20.991625-7.387297 38.691881-22.088749 53.685898a72.848985 72.848985 0 0 1-53.685898 22.088749 73.141551 73.141551 0 0 1-53.393332-22.527598 72.995268 72.995268 0 0 1-22.454457-53.393332c0-20.991625 7.387297-38.618739 22.088749-53.612757a72.848985 72.848985 0 0 1 53.685898-22.088748c20.991625 0 38.911305 7.387297 53.75904 22.235031M265.37438 168.975268c18.577954 18.577954 27.866931 40.959269 27.866931 66.92452 0 26.038392-9.288977 48.273424-27.866931 66.99766-18.577954 18.651096-40.959269 28.013214-66.99766 28.013214-25.965251 0-48.273424-9.215835-66.924519-27.940072a91.134373 91.134373 0 0 1-27.866931-66.924519c0-25.965251 9.215835-48.273424 27.866931-66.92452 18.724237-18.724237 40.959269-27.940072 66.924519-27.940072 26.038392 0 48.273424 9.215835 66.99766 27.793789M129.98937 477.340047a72.848985 72.848985 0 0 1 22.161889 53.612757c0 20.991625-7.460438 38.691881-22.161889 53.612757a72.190711 72.190711 0 0 1-53.612757 22.16189c-20.991625 0-38.691881-7.460438-53.612757-22.16189A72.190711 72.190711 0 0 1 0.601966 531.025946c0-20.991625 7.460438-38.691881 22.16189-53.612757a72.848985 72.848985 0 0 1 53.612757-22.16189c20.991625 0 38.765022 7.460438 53.612757 22.16189"
							fill="#9BB4C8" p-id="5949"></path>
					</svg>
				</view>
				<view class="bg" style="width: 100%;height: 280rpx;"></view>
				<view style="display: flex;justify-content: space-between;">
					<view style="width: 100rpx;height: 100rpx;margin: 20rpx 0;" class="bg ra"></view>
					<view style="width: 100rpx;height: 100rpx;margin: 20rpx 0;" class="bg ra"></view>
					<view style="width: 100rpx;height: 100rpx;margin: 20rpx 0;" class="bg ra"></view>
					<view style="width: 100rpx;height: 100rpx;margin: 20rpx 0;" class="bg ra"></view>
					<view style="width: 100rpx;height: 100rpx;margin: 20rpx 0;" class="bg ra"></view>
				</view>
				<view style="display: flex;justify-content: space-between;">
					<view style="width: 100rpx;height: 100rpx;margin: 20rpx 0;" class="bg ra1"></view>
					<view style="width: 100rpx;height: 100rpx;margin: 20rpx 0;" class="bg ra1"></view>
					<view style="width: 100rpx;height: 100rpx;margin: 20rpx 0;" class="bg ra1"></view>
					<view style="width: 100rpx;height: 100rpx;margin: 20rpx 0;" class="bg ra1"></view>
					<view style="width: 100rpx;height: 100rpx;margin: 20rpx 0;" class="bg ra1"></view>
				</view>
				<view class="bg" style="width: 100%;height: 140rpx;margin: 30rpx 0;"></view>
				<view class="bg" style="width: 100%;height: 140rpx;margin: 30rpx 0;"></view>
				<view style="display: flex;justify-content: space-between;width: 100%;">
					<view class="bg ra" style="width: 100rpx;height: 100rpx;"></view>
					<view style="width: 80%;">
						<view style="height: 26rpx;width: 85%;margin: 20rpx 0 20rpx 15%;" class="bg ra1"></view>
						<view style="height: 26rpx;width: 100%;margin: 20rpx 0;" class="bg ra1"></view>
						<view style="height: 26rpx;width: 100%;margin: 20rpx 0;" class="bg ra1"></view>
					</view>
				</view>
				<view style="height: 26rpx;width: 85%;margin: 20rpx 0 20rpx 15%;" class="bg ra1"></view>
				<view style="height: 26rpx;width: 100%;margin: 20rpx 0;" class="bg ra1"></view>
				<view style="height: 26rpx;width: 100%;margin: 20rpx 0;" class="bg ra1"></view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				/* api地址 */
				apiUrl:'',

				showAd: false,
				isShwoLoad: true,
				noutsINdex: 0,

				style: {
					img: 'width:100%;margin:10px 0'
				},
				user_info: {},
				notsTitle: '',
				// noticeList: [],

				banner_list:[],
				setting_conf:{},

				newsList: [],
				showNots: "",
				list_baozhang: [],
	
				urnotice: {},
				showUrNots: false
			}
		},
		onShow() {
			var usr_info = uni.getStorageSync("user_info");
			if (usr_info) {
				this.user_info = usr_info;
			}
			/* 暂时屏蔽（弹出公告图） */
			return 
			setTimeout(() => {
				if (this.noticeList.length > 0) {
					this.showAd = true;
					this.noutsINdex = 0;
					this.showNots = this.noticeList[0].content;
				}
			}, 500)
		},
		onLoad() {
			/* 暂时屏蔽 */
			// this.isShwoLoad = false
			var usr_isLogin = uni.getStorageSync("TK");
			if (!usr_isLogin) {
				uni.showToast({
					title: "请先登录",
					icon: "none",
					success() {
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/system-page/login'
							})
						}, 1000)
					}
				})
			} else {
				this.getSystem_config();
				// this.getnoticeOnes();
				this.to.www(this.api.user_info)
					.then(res => {
						this.user_info = res.data;
						uni.setStorage({
							data: this.user_info,
							key: 'user_info'
						});
						uni.setStorage({
							data: 'first-launch',
							key: "use-page-type"
						})
						this.isShwoLoad = false
					})
			}
			// this.getNotices()
			this.getNewsList()
		},
		mounted(){
			const apiUrl = uni.getStorageSync('ok_api') || ''
			this.apiUrl = apiUrl
		},
		methods: {
			// getnoticeOnes() {
			// 	this.to.www(this.api.noticehm)
			// 		.then(res => {
			// 			this.urnotice = res.data;
			// 			this.showUrNots = true;
			// 		})
			// 		.catch(err => {
			// 			console.log(err);
			// 		})
			// },
			// shutdownSysnot() {
			// 	this.to.www(this.api.yiduzhannxx, {
			// 			id: this.urnotice.id
			// 		})
			// 		.then(res => {
			// 			this.showUrNots = false;
			// 		})
			// 		.catch(err => {
			// 			console.log(err);
			// 		})
			// },
			hideOnext() {
				this.showAd = false;
				if (this.noutsINdex < this.noticeList.length - 1) {
					++this.noutsINdex;
					setTimeout(() => {
						this.showNots = this.noticeList[this.noutsINdex].content;
						this.showAd = true;
					}, 300)
				}
			},
			// torevoTwo() {
			// 	let _ = this;
			// 	// this.too('/pages/home-page/zc_recover?g=0b101010010101010101011')

			// 	if (this.user_info.can_asset == 0) {
			// 		return this.toa("已交接过资产")
			// 	}

			// 	if (this.user_info.second_asset == 0) {
			// 		uni.showModal({
			// 			title: "提示",
			// 			content: "您未申请过资产交接，请选择第一次申请交接",
			// 			confirmColor: "#B80606",
			// 			success(res) {
			// 				if (res.confirm) {
			// 					_.too('/pages/home-page/zc_recover?g=0b101010010101010101010')
			// 				}
			// 			}
			// 		})
			// 	}
			// 	if (this.user_info.second_asset == 1) {
			// 		this.too('/pages/home-page/zc_recover?g=0b101010010101010101011')
			// 	}
			// 	if (this.user_info.second_asset == 2) {
			// 		uni.showModal({
			// 			title: "提示",
			// 			content: "您已提交过二次资产交接，敬请期待交接完成！",
			// 			showCancel: false,
			// 			confirmColor: "#B80606"
			// 		})
			// 	}
			// 	if (this.user_info.second_asset == 3) {
			// 		uni.showModal({
			// 			title: "提示",
			// 			content: "第二次资产已交接已完成！",
			// 			showCancel: false,
			// 			confirmColor: "#B80606"
			// 		})
			// 	}
			// },
			// torevoOne() {
			// 	if (this.user_info.can_asset == 0) {
			// 		return this.toa("已交接过资产")
			// 	}
			// 	if (this.user_info.is_asset == 0) {
			// 		this.too('/pages/home-page/zc_recover?g=0b101010010101010101010')
			// 	}
			// 	if (this.user_info.is_asset == 1) {
			// 		uni.showModal({
			// 			title: "提示",
			// 			content: "您已提交过，敬请期待交接完成！",
			// 			showCancel: false,
			// 			confirmColor: "#B80606"
			// 		})
			// 	}
			// 	if (this.user_info.is_asset == 2) {
			// 		uni.showModal({
			// 			title: "提示",
			// 			content: "交接已完成！",
			// 			showCancel: false,
			// 			confirmColor: "#B80606"
			// 		})
			// 	}
			// },
			toDetail(item) {
				let _ = this;
				if (item.id != 5) {
					uni.setStorage({
						data: item,
						key: "GF_BAOZHANG",
						success() {
							_.too('/pages/home-page/gf_baozhang_ls')
						}
					})
				}
			},
			/* 去新闻详情 */
			toNewDetail(obj) {
				let _ = this;
				uni.setStorage({
					data: obj,
					key: 'NEWS_CACHE',
					success() {
						_.too('/pages/home-page/gf_news_detail')
					}
				})
			},
			/* 去通知详情 */
			// getNotices() {
			// 	this.to.www(this.api.system_notice)
			// 		.then(res => {
			// 			if (res.data.length > 0) {
			// 				this.noticeList = res.data;
			// 				this.notsTitle = this.noticeList[0].title;
			// 				this.showNots = res.data[0].content;
			// 				this.isShwoLoad = false
			// 			}
			// 		})
			// },
			/* 获取新闻列表  取2个放首页 */
			getNewsList() {
				this.to.www(this.api.system_news, {
						type: '11'
					}, 'p')
					.then(res => {
						this.newsList = res.data.data;
						this.newsList = this.newsList.splice(0, 3);
						this.isShwoLoad = false
					})
			},
			// 获取系统配置(配置项、轮播图、app下载)
			getSystem_config() {
				this.to.www(this.api.system_info)
					.then(res => {
						const {banner = [] , setting_conf = {}} = res.data
						this.banner_list = banner
						this.setting_conf = setting_conf
					})
			}

		},
		filters:{
			dateMatter(val){
				return val.split(' ')[0] || ''
			}
		}
	}
</script>

<style lang="scss" scoped>
page{
	background-color: #f9f9f9;
}

.head {
	height: 454rpx;
	background-image: url('/static/images/1.png');
	background-repeat: no-repeat;
	background-size: cover;
	padding-top: 10rpx;
	color: #fff;
	z-index: 9;
	border-radius: 0 0 2rpx 2rpx;

	/* 幻灯片部分 */
	.swiper{
		margin-top: 16rpx;
		height: 299rpx;
		image{
			width: calc(100% - 30px);
			height: 100%;
			margin-left: 15px;
		}
	}
}

.menu-list{
	padding: 32rpx 32rpx 38rpx;
	.item{
		width: 25%;
		gap: 16rpx;
		image{
			width: 72rpx;
		}
	}
}
</style>

<style lang="scss">
.gf_news_conrent{

	padding-bottom: 32rpx;

	.news-item{
		padding: 0 32rpx;
		margin-bottom: 32rpx;
	}

	.news-title{
		font-size: 28rpx;
		color: #34353E;
		font-weight: 500;
	}
	.news-date{
		margin-top: 24rpx;
		font-size: 28rpx;
		color: #666666;
	}
	.news-bottom-border{
		margin-top: 32rpx;
		height: 2rpx;
		background-color: #e9e9e9;
	}
}
</style>