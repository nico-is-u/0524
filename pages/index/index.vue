<template>
	<view class="content">
		<template>
			<view class="head">
				<!-- 顶栏 -->
				<nNavbar title="首页" :showBackBtn="false"></nNavbar>
				<!-- 轮播图 -->
				<swiper class="swiper" :autoplay="true">
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
						<view class="item flex flex-column flex-center" @click="too('/pages/home-page/gf_appdown')">
							<image src="/static/images/2.png" mode="widthFix"></image>
							<text>App 下载</text>
						</view>
						<view class="item flex flex-column flex-center" @click="too('/pages/home-page/gf_shequn')">
							<image src="/static/images/3.png" mode="widthFix"></image>
							<text>社区资讯</text>
						</view>
						<view class="item flex flex-column flex-center" @click="too('/pages/home-page/gf_share')">
							<image src="/static/images/4.png" mode="widthFix"></image>
							<text>邀请好友</text>
						</view>
						<view class="item flex flex-column flex-center" @click="too('/pages/home-page/gf_cz')">
							<image src="/static/images/5.png" mode="widthFix"></image>
							<text>在线充值</text>
						</view>
					</view>

				</view>
			</view>

		</template>

		<!-- 视频播放 -->
		<!-- <view style="border-radius: 10rpx;overflow: hidden;">
			<video class="bannervid" ref="vdi" :muted="isMuted" :autoplay="true" loop  objectFit="cover" :src="setting_conf.video_url" @click="isMuted = false"></video>
		</view> -->

		<!-- 汇率列表 -->
		<view class="padding-box" style="margin-top: 32rpx;">
			<view class="content">
				<view class="title">
					<view class="label">
						<text>人民币汇率中间价</text>
					</view>
				</view>

				<!-- <scroll-view :scroll-y="true" class="flex flex-column cny-rate-list">
					<view class="cny-rate-row flex" v-for="(item,index) in rmb_rate_list" :key="'cny-rate-item-' + index">
						<view class="cny-rate-item">100</view>
						<view class="cny-rate-item">{{ item.from || '' }}</view>
						<view class="cny-rate-item">{{ item.p || "" }}</view>
						<view class="cny-rate-item">{{ item.to || "" }}</view>
					</view>
				</scroll-view> -->

				<!-- <animateList :List="rmb_rate_list"></animateList> -->

			</view>
		</view>

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
						<view class="gf_news_conrent" v-if="Array.isArray(newsList) && newsList.length">

							<view class="news-item flex"
								v-for="(item,index) in newsList"
								:key="'news-item-' + index"
								@click="toNewDetail(item)">

								<view class="left-side">
									<image :src="item.cover_img" mode="aspectFill"></image>
								</view>

								<view class="right-side flex flex-column">
									<view class="news-title">{{ item.title }}</view>
									<view class="news-date">{{ item.updated_at | dateMatter }}</view>
									<view class="news-bottom-border"></view>
								</view>
							</view>

						</view>
						<!-- 没有数据 -->
						<view class="flex flex-column flex-center" v-else>
							<view class="flex flex-x-center margin-t-80 font-333">暂无资讯</view>
						</view>
					</view>

					
				</view>
			</view>
			
		</template>

		<u-overlay :show="showAd" zIndex="999" opacity="0.4">
			<view class="warp2">
				<view class="rect2" @tap.stop>
					
					<!-- 关闭按钮 -->
					<view class="close" @click="hideOnext">
						<u-icon name="close-circle" size="28" color="white"></u-icon>
					</view>


					<!-- 广告内容 -->
					<view class="notice-content">
						<scroll-view :scroll-y="true" style="height: 100%">
							<u-parse :content="showNots" :tagStyle="style"></u-parse>
						</scroll-view>
					</view>
				</view>
			</view>
		</u-overlay>

		<!-- <u-overlay :show="showUrNots" zIndex="999" opacity="0.8">
			<view class="warp">
				<view class="rect" @tap.stop>
					<text style="color: #FFF;margin: 30rpx 0;display: block;">{{urnotice.title}}</text>
					<view class="content">
						<u-parse :content="urnotice.content" :tagStyle="style"></u-parse>
						<view @click="shutdownSysnot" class="close">关闭</view>
					</view>
				</view>
			</view>
		</u-overlay> -->

		<view v-if="isShwoLoad"
			style="position: fixed;width: 100%;top: 0;left: 0;z-index: 99999;background-color: #FFF;height: 100vh;">
			<view class="ststus2" style="position: relative;">
				<view style="position: absolute;top:calc(50vh - 50px);left: calc(50vw - 50px);" class="roat">
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
	import animateList from '../../components/animateList/animateList.vue'
	export default {
		data() {
			return {
				/* api地址 */
				apiUrl:'',
				isMuted: true,
				showAd: false,
				isShwoLoad: true,
				noutsINdex: 0,

				style: {
					img: 'width:100%;margin:10px 0'
				},
				user_info: {},
				notsTitle: '',
				noticeList: [],

				banner_list:[],

				rmb_rate_list:[],

				setting_conf:{},

				newsList: false,
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
			setTimeout(() => {
				if (this.noticeList.length > 0) {
					this.showAd = true;
					this.noutsINdex = 0;
					this.showNots = this.noticeList[0].content;
				}
			}, 500)
		},
		onLoad() {
			this.isShwoLoad = false
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
				/* 获取轮播图 */
				this.getBannerList()
				/* 获取新闻资讯 */
				this.getNewsList()

				/* 获取币种列表 */
				this.$store.dispatch('getCList').then(() => {
					/* 默认币设为YSB */
					if(Array.isArray(this.$store.state.cList) && this.$store.state.cList.length){
						const arrIndex = this.$store.state.cList.findIndex(item => item.name == 'YSC')
						if(arrIndex != -1)	this.$store.commit('changeCListIndex',arrIndex)
					}
				})

				/* 获取人民币汇率中间列表  */
				this.getRmbRateList()

				/* 个人信息 */
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
				.catch(e => {
					this.too('/pages/system-page/login')
				})
			}
			this.getNotices()
			// this.getNewsList()
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
						_.too('/pages/index/news_detail')
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
				this.to.www(this.api.systemInfoList,{type:'2'},'p')
				.then(res => {
					const {code,data} = res
					console.log(res)
					if(code == 200){
						console.log(data.data)
						this.newsList = data.data || []
					}
				})
			},
			
			/* 获取轮播图列表 */
			getBannerList() {
				this.to.www(this.api.systemInfo,{type:'1'},'p')
					.then(res => {
						const {banner = [] , setting_conf = {}} = res.data
						this.banner_list = banner
						this.setting_conf = setting_conf
						const {kefu_url = ''} = setting_conf
						if(kefu_url)	uni.setStorageSync('kefu_url', kefu_url)
					})
			},

			/* 人民币汇率列表 */
			getRmbRateList(){
				this.to.www(this.api.rmb_rate)
					.then(res => {
						const {dtList=[]} = res.data
						this.rmb_rate_list = dtList
					})
			}

		},
		filters:{
			dateMatter(val){
				return val.split(' ')[0] || ''
			}
		},
		components:{
			animateList
		}
	}
</script>

<style lang="scss" scoped>
.bannervid {
	width: calc(100% - 40px);
	border-radius: 10rpx;
	// height: 380rpx;
	z-index: 55;
	margin: 20px 20px 0 20px;
}

page{
	background-color: #f9f9f9;
}

.head {
	height: 494rpx;
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
		height: 370rpx;
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

.cny-rate-list{
	padding: 0 25rpx 25rpx;
	height: 400rpx;
	box-sizing: border-box;
	.cny-rate-row{
		.cny-rate-item{
			width: 25%;
			padding: 15rpx 0;
			text-align: center;
			color: rgba(0,0,0,.8);
		}
	}
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

.warp {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
}

.rect {

	width: 325px;
	height: 504px;

    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

	background: linear-gradient(#e3f5ff,#eefcfd);
	border-radius: 10px;

	// overflow-y: scroll;

	.notice-content{
		position: absolute;
		top: 30px;
		left: 0;
		width: 100%;
		height: calc(100% - 30px);
		box-sizing: border-box;
		padding: 10px 15px 15px;
		font-size: 15px;

		.scroll-view-box{
			width: 100%;
			height: 100%;
			background-color: white;
			border-radius: 10px;
			box-sizing: border-box;
			padding: 10rpx;
			scroll-view{
				width: 100%;
				height: 100%;
				// border: #d2d2d2 1.5px solid;
				padding: 5px;
				border-radius: 12px;

				box-sizing: border-box;

			}
		}
	}

	.close {
		position: absolute;
		width: 25px;
		height: 25px;
		right: 22rpx;
		top: 15rpx;
		z-index: 9999;
	}

}

.warp2 {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
}

.rect2 {

	width: 325px;
	height: 1200rpx;

    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

	background-image: url('../../static/images/notice2.jpg');
	background-size: 100% 100%;
	border-radius: 10px;

	// overflow-y: scroll;

	.notice-content{
		position: absolute;
		top: 240rpx;
		left: 0;
		width: 100%;
		height: calc(100% - 240rpx);
		box-sizing: border-box;
		padding: 25px;
		font-size: 15px;

		.scroll-view-box{
			width: 100%;
			height: 100%;
			background-color: white;
			border-radius: 10px;
			box-sizing: border-box;
			padding: 10rpx;
			scroll-view{
				width: 100%;
				height: 100%;
				// border: #d2d2d2 1.5px solid;
				padding: 5px;
				border-radius: 12px;

				box-sizing: border-box;

			}
		}
	}

	.close {
		position: absolute;
		width: 25px;
		height: 25px;
		right: 22rpx;
		top: 15rpx;
		z-index: 9999;
	}

}
</style>

<style lang="scss">
.gf_news_conrent{

	padding-bottom: 32rpx;

	.news-item{
		padding: 0 32rpx;
		margin-bottom: 32rpx;

		height: 200rpx;

		>.left-side{
			width: 40%;
			height: 100%;
			
			flex-shrink: 0;

			box-sizing: border-box;
			padding-right: 30rpx;
			padding-bottom: 40rpx;
		}

		>.right-side{
			flex-grow: 1;
		}
	}

	image{
		width: 100%;
		height: 100%;
	}

	.news-title{
		font-size: 28rpx;
		color: #34353E;
		font-weight: 500;

		height: 152rpx;
		overflow: hidden;
		text-overflow: ellipsis;

		padding-bottom: 24rpx;
		box-sizing: border-box;
	}
	.news-date{
		// margin-top: 24rpx;
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