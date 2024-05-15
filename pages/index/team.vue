<template>
	<view class="the_page_team">
		<view class="tip_box" @click="too('/pages/home-page/gf_share')">
			<view class="content">
				<view>
					<text class="t2">共同富裕等不来，也喊不出来，必须自己拼出来，干出来的...</text>
					<text class="t3">———— 国家发改委</text>
				</view>
			</view>
			<view class="share">
				<u--text prefixIcon="share-fill" size="50rpx" align="center" color="#EE2B2A" bold
					iconStyle="font-size: 68rpx;color:#EE2B2A" text="去推广"></u--text>
			</view>
		</view>

				<view class="share_data">
			<u--text prefixIcon="bookmark-fill" size="30rpx" iconStyle="font-size: 32rpx;color:#EE2B2A"
				text="总数据"></u--text>
			<u-row gutter="1" justify="space-between" customStyle="margin:30rpx 0;">
				<u-col span="6" align="center" customStyle="padding:0">
					<view class="model">
						<text class="t1">{{All_data.total_num}}人</text>
						<text class="t2">总人数</text>
					</view>
				</u-col>
				<u-col span="6" align="center" customStyle="padding:0">
					<view class="model">
						<text class="t1">{{All_data.total_receive_num}}人</text>
						<text class="t2">总申请</text>
					</view>
				</u-col>
			</u-row>
		</view>

		<view class="share_detail">
			<u--text prefixIcon="bookmark-fill" size="30rpx" iconStyle="font-size: 32rpx;color:#EE2B2A"
				text="数据详情"></u--text>
			<view class="data_box">
				<u-subsection :list="['一级','二级','三级']" :current="levelTabIndex" @change="changeLeveTab"
					activeColor="#B80606"></u-subsection>
				<view class="data_title">
					<view class="titem">
						<view>总人数</view>
						<view>{{invite_info.total_num}}人</view>
					</view>
					<view class="titem">
						<view>申请人数</view>
						<view>{{invite_info.receive_num}}人</view>
					</view>
					<view class="titem">
						<view>实名人数</view>
						<view>{{invite_info.realname_num}}人</view>
					</view>
				</view>

				<view class="data_team_list">
					<u-row justify="space-between" customStyle="padding:15rpx 0;border-bottom:2rpx solid #ebebeb" gutter="1"
						v-for="(item,index) in dataList" :key="index">
						<u-col align="center" text-align="center" span="4">
							<text style="color: #858585;font-size: 20rpx;">{{item.created_at}}</text>
						</u-col>
						<u-col align="center" span="4">{{item.realname?item.realname:'未实名'}}</u-col>
						<u-col align="center" span="4">{{item.phone}}</u-col>
					</u-row>
					<view style="margin: 60rpx auto;" v-if="!dataList.length">
						<u-empty mode="search" icon-size="50" ></u-empty>
					</view>
					<view class="btns" v-if="last_page>1">
						<u-row justify="space-between" customStyle="margin:20rpx 0;" gutter="1">
							<u-col align="center" span="4"><u-button type="error" size="small"
									text="上一页" @click="perPage"></u-button></u-col>
							<u-col align="center" span="4">{{page}}/{{last_page}}</u-col>
							<u-col align="center" span="4"><u-button type="error" size="small"
									text="下一页" @click="nexPage"></u-button></u-col>
						</u-row>
					</view>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				levelTabIndex: 0,
				invite_info: {
					total_num: '',
					receive_num: '',
					realname_num: ''
				},
				All_data:{},
				page: 1, //页码
				last_page: '',
				dataList: []
			};
		},
		onLoad() {
			this.to.www(this.api.user_team)
				.then(res => {
					this.All_data = res.data;
				})
			this.getTeamList()
		},
		methods: {
			getTeamList() {
				this.to.www(this.api.user_team_list, {
						level: this.levelTabIndex + 1,
						page:this.page,
					}, 'p')
					.then(res => {
						this.invite_info.total_num = res.data.total_num;
						this.invite_info.receive_num = res.data.receive_num;
						this.invite_info.realname_num = res.data.realname_num;
						this.dataList = res.data.list.data;
						this.last_page = res.data.list.last_page;
					})
			},
			perPage(){
				if(this.page>1){
					this.page--;
					this.getTeamList();
				}else{
					this.toa('已经是第一页了')
				}
			},
			nexPage(){
				if(this.page<this.last_page){
					this.page++;
					this.getTeamList();
				}else{
					this.toa('已经是最后一页了')
				}
			},
			changeLeveTab(index) {
				this.levelTabIndex = index;
				this.getTeamList();
			},
		}
	}
</script>

<style lang="scss" scoped>
	.share_detail {
		margin: 30rpx 0;

		.data_box {
			background-color: #fff;
			border-radius: 20rpx;
			padding: 20rpx;
			margin: 30rpx 0;
		}

		.data_title {
			display: flex;
			justify-content: space-around;
			text-align: center;
			font-size: 30rpx;
			margin: 20rpx 0 0;
			border-bottom: 2rpx solid rgba(155, 155, 155, .3);
			padding-bottom: 10rpx;
			opacity: .7;

			.titem {
				width: calc(100%/3);
			}
		}

		.data_team_list {
			color: #374360;
		}
	}

	.share_data {
		.model {
			width: 90%;
			height: 160rpx;
			background-color: #fff;
			text-align: center;
			border-radius: 20rpx;

			.t1 {
				margin-top: 30rpx;
				margin-bottom: 10rpx;
				font-weight: bold;
				display: block;
				color: $th;
			}

			.t2 {
				font-weight: bold;
				display: block;
			}
		}
	}

	.the_page_team {
		padding: 30rpx;
		background-color: #FFDED9;
		min-height: 100vh;

		.share {
			margin: 30rpx auto;
			padding-bottom: 30rpx;
		}

		.tip_box {
			border-radius: 25rpx;
			background-color: #FFD5CE;
			box-shadow: 2rpx 2rpx 10rpx 2rpx rgba(255, 0, 0, 0.3);

			.content {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 300rpx;
				color: #fff;
				padding: 0 40rpx 20rpx;
				box-shadow: 2rpx 2rpx 10rpx 2rpx rgba(255, 0, 0, 0.3);
				border-radius: 25rpx;
				background-color: #B80606;

				.t1 {
					font-size: 80rpx
				}

				.t2,
				.t3 {
					display: block;
				}

				.t2 {
					letter-spacing: 6rpx;
					margin-bottom: 20rpx;
				}

				.t3 {
					text-align: right;
				}

				.t2::before {
					content: '“';
					font-size: 60rpx
				}

				.t3::after {
					content: '”';
					font-size: 60rpx
				}
			}
		}
	}
</style>