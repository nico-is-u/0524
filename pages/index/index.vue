<template>
	<view class="content">
		<template>
			<view class="head">
				<view class="title">
					<u-row justify="space-between" customStyle="margin-bottom: 10px">
						<u-col span="6">
							<view class="cy">
								<image class="logo" src="/static/icon/nlog3.png" mode="widthFix"></image>
							</view>
						</u-col>
						<u-col vertical="center" span="3" offset="3">
							<view @click="too('/pages/home-page/gf_notices')"
								style="background-color: rgba(246, 95, 98,.7);padding: 8rpx 0;border-radius: 8rpx;width: 80%;margin-left: 20%;">
								<u--text align="center" prefixIcon="chat" color="#FFF" iconStyle="font-size: 38rpx;color:#fff;margin-top:
								6rpx" size="14" text="消息"></u--text>
							</view>
						</u-col>
					</u-row>
				</view>
				<view class="notice">
					<u-notice-bar style="border-radius: 6rpx;padding: 10rpx 30rpx;" bgColor="#f65f62" color="#fff"
						:text="notsTitle"></u-notice-bar>
				</view>
				<view style="height: 340rpx;border-radius: 10rpx;overflow: hidden;">
					<video loop :enable-progress-gesture="false" autoplay class="banner" style="height: 100%;"
						object-fit="fill" :src="setting_config.video_url"></video>
				</view>
			</view>
			<view class="radius-bottom"></view>
		</template>

		<template>
			<view style="padding: 10rpx 80rpx;">
				<u-row justify="space-between" customStyle="margin-bottom: 20px">
					<u-col span="4" align="flex-start" @click="too('/pages/home-page/gf_share')">
						<u-icon name="/static/icon/i1.png" size="42"></u-icon>
						<u--text color="#333" align="left" customStyle="margin:5rpx 0 0 12rpx" size="14"
							text="分享"></u--text>
					</u-col>
					<u-col span="4" align="center" @click="too('/pages/home-page/gf_top-up')">
						<u-icon name="/static/icon/i2.png" size="42"></u-icon>
						<u--text color="#333" align="center" customStyle="margin:5rpx 0 0 0" size="14"
							text="充值"></u--text>
					</u-col>
					<u-col span="4" align="flex-end" @click="too('/pages/home-page/gf_Chat')">
						<u-icon name="/static/icon/i3.png" size="42"></u-icon>
						<u--text color="#333" align="right" customStyle="margin:5rpx 12rpx 0 0" size="14"
							text="群聊"></u--text>
					</u-col>
				</u-row>
				<u-row justify="space-between" customStyle="margin-bottom: 10px">
					<u-col span="4" align="flex-start" @click="too('/pages/home-page/gf_customer')">
						<u-icon name="/static/icon/i4.png" size="42"></u-icon>
						<u--text color="#333" align="left" customStyle="margin:5rpx 0 0 12rpx" size="14"
							text="客服"></u--text>
					</u-col>
					<u-col span="4" align="center" @click="too('/pages/home-page/gf_file')">
						<u-icon name="/static/icon/i5.png" size="42"></u-icon>
						<u--text color="#333" align="center" customStyle="margin:5rpx 0 0 0" size="14"
							text="政策"></u--text>
					</u-col>
					<u-col span="4" align="flex-end" @click="too('/pages/home-page/gf_sign')">
						<u-icon name="/static/icon/i6.png" size="42"></u-icon>
						<u--text color="#333" align="right" customStyle="margin:5rpx 12rpx 0 0" size="14"
							text="签到"></u--text>
					</u-col>
				</u-row>
			</view>
		<!-- 	<view class="zc_rec_btn">
				<u-button :customStyle="jcustomStyle" @click="torevoOne" text="资产交接"></u-button>
			</view> -->
			<!-- 	<view class="zc_rec_btn">
				<u-button :customStyle="jcustomStyle" @click="torevoTwo" text="二次资产交接"></u-button>
			</view> -->
		</template>

		<template>
			<view class="gf_bz">
				<!-- <image class="hm_imgs" @click="toa('1月28日开放')" -->
				<!-- <image class="hm_imgs" @click="too('/pages/home-page/gf_zcgz')" -->
				<image class="hm_imgs" @click="toa('暂未开放')"
					style="box-shadow: 0 4rpx 1rpx 3rpx #df966b;border: 3rpx solid #B80606;"
					src="../../static/images/home/czbg.png" mode="widthFix"></image>
				<image class="hm_imgs" @click="too('/pages/shop-page/gf_goods_home')"
					style="box-shadow: 0 4rpx 1rpx 3rpx #df966b;border: 3rpx solid #B80606;"
					src="../../static/images/home/shop.png" mode="widthFix"></image>
				<!-- <image class="hm_imgs" @click="toa('1月28日开放')" -->
				<!-- 		<image class="hm_imgs" @click="too('/pages/home-page/gf_get_baozhang')"
					style="box-shadow: 0 4rpx 1rpx 3rpx #df966b;border: 3rpx solid #B80606;"
					src="../../static/images/home/baozhang.png" mode="widthFix"></image> -->
				<!-- <image class="hm_imgs" @click="too('/pages/home-page/gf_get_baozhang')"
					style="box-shadow: 0 4rpx 1rpx 3rpx #df966b;border: 3rpx solid #B80606;"
					src="../../static/images/home/nbz.jpg" mode="widthFix"></image> -->
			</view>
		</template>

		<template>
			<view class="gf_xh">
				<u-row justify="space-between" gutter="10">
					<u-col span="6" @click="too('/pages/home-page/gf_baozhang?type=xian')">
						<view class="left">
							<view class="title">先富</view>
							<view class="content-bg">
								<view class="content">
									<text class="t1">提交申请满1500元以上</text>
									<text class="t2">每日可领取红包</text>
									<view>
										<text class="t3"><i>14</i></text>
										<text class="t4"><i>元</i></text>
									</view>
								</view>
							</view>
						</view>
					</u-col>
					<u-col span="6" @click="too('/pages/home-page/gf_baozhang?type=hou')">
						<view class="right">
							<view class="title">后富</view>
							<view class="content-bg">
								<view class="content">
									<text class="t1">提交申请1500元以内</text>
									<text class="t2">每日可领取红包</text>
									<view>
										<text class="t3"><i>1</i></text>
										<text class="t4"><i>元</i></text>
									</view>
								</view>
							</view>
						</view>
					</u-col>
				</u-row>
			</view>
		</template>

		<template>
			<view class="gf_news">
				<u-row justify="space-between" customStyle="margin-bottom: 15px">
					<u-col span="6">
						<u--text prefixIcon="bookmark-fill" size="32rpx" iconStyle="font-size: 42rpx;color:#EE2B2A"
							text="共富时要"></u--text>
					</u-col>
					<u-col span="6" @click="too('/pages/home-page/gf_news')">
						<u--text suffixIcon="arrow-right" align="right" text="查看更多"></u--text>
					</u-col>
				</u-row>
				<view class="gf_news_conrent">
					<u-row justify="space-between" v-for="(item,index) in newsList" :key="index"
						customStyle="margin-bottom: 15px;box-shadow: 4rpx 4rpx 10rpx 2rpx rgba(33, 46, 104, 0.2);padding:30rpx 25rpx;border-radius:8rpx"
						@click="toNewDetail(item)" align="start">
						<u-col span="6">
							<u--text :lines="3" :text="item.title"></u--text>
						</u-col>
						<u-col span="6">
							<u--text suffixIcon="arrow-right" align="right" :text="item.created_at"></u--text>
						</u-col>
					</u-row>
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
				showAd: true,
				isShwoLoad: true,
				noutsINdex: 0,
				jcustomStyle: {
					backgroundColor: '#B80606',
					borderRadius: '20rpx',
					color: '#fff'
				},
				style: {
					img: 'width:100%;margin:10px 0'
				},
				user_info: {},
				notsTitle: '',
				noticeList: [],
				newsList: [],
				showNots: "",
				list_baozhang: [],
				setting_config: {
					video_url: ''
				},
				urnotice: {},
				showUrNots: false
			}
		},
		onShow() {
			var usr_info = uni.getStorageSync("user_info");
			if (usr_info) {
				this.user_info = usr_info;
			}
			setTimeout(() => {
				if (this.noticeList.length > 0) {
					this.showAd = true;
					this.noutsINdex = 0;
					this.showNots = this.noticeList[0].content;
				}
			}, 500)
		},
		onLoad() {
			var usr_isLogin = uni.getStorageSync("TK");
			if (!usr_isLogin) {
				uni.showToast({
					title: "请先登录",
					icon: "none",
					success() {
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/system-page/gf_login'
							})
						}, 2500)
					}
				})
			} else {
				this.getSystem_config();
				this.getnoticeOnes();
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
			this.getNotices()
			this.getNewsList()
		},
		methods: {
			getnoticeOnes() {
				this.to.www(this.api.noticehm)
					.then(res => {
						this.urnotice = res.data;
						this.showUrNots = true;
					})
					.catch(err => {
						console.log(err);
					})
			},
			shutdownSysnot() {
				this.to.www(this.api.yiduzhannxx, {
						id: this.urnotice.id
					})
					.then(res => {
						this.showUrNots = false;
					})
					.catch(err => {
						console.log(err);
					})
			},
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
			torevoTwo() {
				let _ = this;
				// this.too('/pages/home-page/zc_recover?g=0b101010010101010101011')

				if (this.user_info.can_asset == 0) {
					return this.toa("已交接过资产")
				}

				if (this.user_info.second_asset == 0) {
					uni.showModal({
						title: "提示",
						content: "您未申请过资产交接，请选择第一次申请交接",
						confirmColor: "#B80606",
						success(res) {
							if (res.confirm) {
								_.too('/pages/home-page/zc_recover?g=0b101010010101010101010')
							}
						}
					})
				}
				if (this.user_info.second_asset == 1) {
					this.too('/pages/home-page/zc_recover?g=0b101010010101010101011')
				}
				if (this.user_info.second_asset == 2) {
					uni.showModal({
						title: "提示",
						content: "您已提交过二次资产交接，敬请期待交接完成！",
						showCancel: false,
						confirmColor: "#B80606"
					})
				}
				if (this.user_info.second_asset == 3) {
					uni.showModal({
						title: "提示",
						content: "第二次资产已交接已完成！",
						showCancel: false,
						confirmColor: "#B80606"
					})
				}
			},
			torevoOne() {
				if (this.user_info.can_asset == 0) {
					return this.toa("已交接过资产")
				}
				if (this.user_info.is_asset == 0) {
					this.too('/pages/home-page/zc_recover?g=0b101010010101010101010')
				}
				if (this.user_info.is_asset == 1) {
					uni.showModal({
						title: "提示",
						content: "您已提交过，敬请期待交接完成！",
						showCancel: false,
						confirmColor: "#B80606"
					})
				}
				if (this.user_info.is_asset == 2) {
					uni.showModal({
						title: "提示",
						content: "交接已完成！",
						showCancel: false,
						confirmColor: "#B80606"
					})
				}
			},
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
			getNotices() {
				this.to.www(this.api.system_notice)
					.then(res => {
						if (res.data.length > 0) {
							this.noticeList = res.data;
							this.notsTitle = this.noticeList[0].title;
							this.showNots = res.data[0].content;
							this.isShwoLoad = false
						}
					})
			},
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
			// 获取系统配置
			getSystem_config() {
				// this.to.www(this.api.gf_bz_list)
				// 	.then(res => {
				// 		this.list_baozhang = res.data;
				// 	})
				this.to.www(this.api.system_info)
					.then(res => {
						this.setting_config = res.data.setting_conf;
					})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.zichangz {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 180rpx;
		background-color: #C51924;
		color: #fff;
		letter-spacing: 10rpx;
		font-size: 60rpx;
		font-family: 'Courier New', Courier, monospace;
	}

	.ststus2 {
		padding: 30rpx;
		animation: 2s opacitys ease-in-out infinite;

		.bg {
			background-color: #f0f0f1;
		}

		.ra {
			border-radius: 50%;
		}

		.ra1 {
			border-radius: 8rpx;
		}

		.roat {
			left: calc(50% - 100rpx);
			animation: 2s roat ease-in-out infinite;
		}
	}

	@keyframes roat {
		0% {
			transform: rotate(0)
		}

		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes opacitys {
		0% {
			opacity: 1;
		}

		50% {
			opacity: .3;
		}

		100% {
			opacity: 1;
		}
	}

	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.rect {
		width: 76%;
		border-radius: 10rpx;
		background-color: #d90d06;
		padding: 20rpx 15rpx 30rpx;
		text-align: center;
		height: 70%;

		// overflow-y: scroll;

		.content {
			background-color: #FFF;
			padding: 20rpx;
			border-radius: 10rpx;
			height: calc(100% - 105rpx);
			border: 4rpx solid #bdbdbd;
			box-sizing: border-box;
			min-height: 50%;
			overflow-y: scroll;
		}

		.title {
			display: block;
			width: 60%;
			height: 60rpx;
			line-height: 50rpx;
			text-align: center;
			color: $th;
			font-weight: bold;
			margin: 20rpx auto 30rpx;
			background: url("../../static/icon/text_bg.png") no-repeat;
			background-size: 100% 100%;
		}

		.close {
			width: 200rpx;
			background-color: $th;
			color: #fff;
			margin: 30rpx auto 20rpx;
			height: 60rpx;
			line-height: 60rpx;
			border-radius: 50rpx;
			position: fixed;
			bottom: 250rpx;
			left: 50%;
			transform: translateX(-50%);
		}

	}

	.gf_news {
		padding: 20rpx;
		margin: 20rpx auto 30rpx;
	}

	.gf_xh {
		padding: 10rpx 20rpx;

		.left {
			border-radius: 6rpx;
			padding-bottom: 10rpx;
			background-image: linear-gradient(to right, #e4382b, #f43c2f, #f05044);
		}

		.right {
			border-radius: 6rpx;
			padding-bottom: 10rpx;
			background-image: linear-gradient(to right, #d34d4d, #d94040, #ef5044);
		}

		.title {
			width: 60%;
			height: 50rpx;
			text-align: center;
			color: $th;
			font-weight: bold;
			margin: 20rpx auto;
			background: url("../../static/icon/text_bg.png") no-repeat;
			background-size: 100%;
		}

		.content-bg {
			width: 95%;
			padding: 10rpx;
			margin: 0 auto;
			border-radius: 6rpx;
			background-color: #fff;
			box-sizing: border-box;

			.content {
				padding: 10rpx;
				border-radius: 6rpx;
				box-sizing: border-box;
				border: 4rpx dashed $th;
				text-align: center;

				.t1 {
					color: #903126;
					font-size: 26rpx;
				}

				.t2 {
					color: $th;
					font-weight: bold;
					display: block;
					font-size: 30rpx;
				}

				.t3 {
					font-size: 70rpx;
					font-family: fantasy;
					font-weight: bold;
					color: #E21317;
					margin-right: 8rpx;
				}

				.t4 {
					font-size: 50rpx;
					font-family: fantasy;
					font-weight: bold;
					color: #E21317;
				}
			}
		}
	}

	.gf_bz {
		margin: 10rpx auto;
		padding: 10rpx 20rpx;
		box-sizing: border-box;

		.hm_imgs {
			width: 100%;
			box-sizing: border-box;
			border: 6rpx solid #c98c86;
			border-radius: 25rpx;
			margin-bottom: 20rpx;

		}
	}

	.zc_rec_btn {
		padding: 10rpx 20rpx;
		margin: 10rpx auto;
	}

	.head {
		background-color: $th;
		padding: 0 20rpx 0;
		color: #fff;
		z-index: 9;
		border-radius: 0 0 2rpx 2rpx;

		.banner {
			border-radius: 10rpx;
			width: 100%;
		}

		.title {
			.logo {
				width: 90%;
				height: 1rem;
			}

			.ti {
				margin-left: 20rpx;
				font-weight: bold;
				font-size: 36rpx;
				display: inline-block;
			}
		}

		.notice {
			opacity: .7;
			margin-bottom: 20rpx;
		}
	}

	.radius-bottom {
		background-color: $th;
		background: url('../../static/icon/bicon.png') no-repeat;
		background-size: 100%;
		height: 60rpx;
		margin-top: -4rpx;
		margin-bottom: 20rpx;
		width: 100%;
	}
</style>