<template>
	<view>
		<view class="form_data">
			<form>
				<view class="item">
					<u--text color="#333" margin=" 0 0 15rpx 0" text="姓名"></u--text>
					<input class="input" style="color: #8c8c8c;" type="text" disabled v-model="parmData.name"
						placeholder="请输入您的姓名" maxlength="16" />
				</view>
				<view class="item">
					<u--text color="#333" margin=" 0 0 15rpx 0" text="手机号"></u--text>
					<input class="input" style="color: #8c8c8c;" type="number" disabled v-model="parmData.phone"
						placeholder="请输入您的手机号码" maxlength="11" />
				</view>
				<view class="item">
					<u--text color="#333" margin=" 0 0 15rpx 0" text="身份证号码"></u--text>
					<input class="input" style="color: #8c8c8c;" type="text" disabled v-model="parmData.id_card"
						placeholder="请输入身份证号码" maxlength="18" />
				</view>
				<!-- 		<view class="item">
					<u--text color="#333" margin=" 0 0 15rpx 0" text="账户余额"></u--text>
					<input class="input" type="number" v-model="parmData.balance" placeholder="请输入账户余额"
						maxlength="9" />
				</view> -->
				<view class="item">
					<u--text color="#333" margin=" 0 0 15rpx 0" text="请输入金额数字，如: 123456"></u--text>
					<view style="display: flex;justify-content: space-between;align-items: center;">
						<input class="input" type="number" style="width: 60%;font-size: 30rpx;" v-model="parmData.digital_yuan_amount"
							:placeholder="all_zc" @input="checked=false" maxlength="9" />
						<view style="display: flex;align-items: center;transform: scale(0.8);"
							@click="parmData.digital_yuan_amount=''">
							<u-switch active-color="#B80606" v-model="checked"></u-switch>
							<text>忘记资产</text>
						</view>
					</view>
				</view>
				<!-- 	<view class="item">
					<u--text color="#333" margin=" 0 0 15rpx 0" text="生活补助"></u--text>
					<input class="input" type="number" v-model="parmData.poverty_subsidy_amount" placeholder="生活补助"
						maxlength="9" />
				</view> -->
				<view class="item">
					<u--text color="#333" margin=" 0 0 15rpx 0" text="共富等级"></u--text>
					<view class="input" @click="showSelectLevel=true">{{parmData.levelx
							?parmData.levelx
							:'请选择您的共富等级'}}
					</view>
					<u-picker :show="showSelectLevel" @close="showSelectLevel=false" @cancel="showSelectLevel=false"
						@confirm="doSelect" :closeOnClickOverlay="true" :columns="levelColumns"></u-picker>
				</view>
				<view class="item">
					<u--text color="#333" margin=" 0 0 15rpx 0" text="共富保障"></u--text>
					<u-checkbox-group v-model="parmData.ensure" placement="row" style="flex-wrap: wrap">
						<u-checkbox activeColor="#B80606" :customStyle="{margin: ' 10px 28px 20px 0'}"
							v-for="(item, index) in checkboxList1" :key="index" :label="item.name" :name="index+1">
						</u-checkbox>
					</u-checkbox-group>
				</view>
				<view class="item">
					<u-radio-group v-model="parmData.rich" placement="row">
						<u-radio :customStyle="{marginRight: '28px'}" disabled activeColor="#B80606"
							v-for="(item, index) in radiolist1" :key="index" :label="item.text" :name="item.name">
						</u-radio>
					</u-radio-group>
				</view>
				<view class="item">
					<u--text color="#333" margin=" 0 0 15rpx 0" text="联系QQ"></u--text>
					<input class="input" type="number" v-model="parmData.qq" placeholder="输入你的QQ号码" maxlength="15" />
				</view>
			</form>
			<view class="subject_btn">
				<u-button class="custom-style" size="error" text="提交" @click="subject"></u-button>
			</view>
			<view class="u-content-color">
				注明：提交缴纳<text style="font-weight: bold;color: #B80606;">{{obj.amount}}</text>
				元资产交接验证金，24小时后即可交接完成，验证金25天后返回数字人民币钱包。
			</view>
			<template>
				<u-notify ref="uNotify" message=""></u-notify>
			</template>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				radiolist1: [{
					name: 1,
					text: '先富'
				}, {
					name: 2,
					text: '后富'
				}],
				parmData: {
					type: '',
					name: '',
					phone: '',
					id_card: '',
					balance: '',
					digital_yuan_amount: '',
					poverty_subsidy_amount: '',
					level: '1',
					levelx: '共富一级',
					ensure: [],
					rich: 1,
					qq: '',
					times: '',
					payment_money: ''
				},
				checked: false,
				all_zc: '总资产',
				showSelectLevel: false,
				levelColumns: [
					['共富一级', '共富二级', '共富三级', '共富四级', '共富五级']
				],
				checkboxList1: [{
						name: '购房津贴',
						disabled: false
					}, {
						name: '出行保障',
						disabled: false
					},
					{
						name: '养老保障',
						disabled: false
					}, {
						name: '通讯保障',
						disabled: false
					}
				],


				obj: {}
			};
		},
		onLoad(option) {
			this.obj = JSON.parse(option.item);
			if (option.g == Number(1387179)) {
				this.parmData.times = 2;
			} else if (option.g == Number(1387178)) {
				this.parmData.times = 1;
			} else {
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
			var min_ = this.obj.min_asset + '万-';
			var max_ = this.obj.max_asset == 'max' ? '5000万区间金额' : this.obj.max_asset + '万区间金额'
			this.all_zc = '请输入' + min_ + max_;
			const SUBJECT_DATA = uni.getStorageSync("DOBUYZCYZ");
			this.parmData.rich = this.obj.rich;
			this.levelColumns[0] = this.levelColumns[0].filter((item, i) => i <= this.obj.max_level - 1)
			this.parmData.type = this.obj.type;
			if (uni.getStorageSync("user_info")) {
				let data = uni.getStorageSync("user_info");
				this.parmData.name = data.realname;
				this.parmData.phone = data.phone;
				this.parmData.id_card = data.ic_number;
				this.parmData.name = data.realname;
				this.parmData.payment_money = this.obj.amount;
			} else {
				this.to.www(this.api.user_info)
					.then(res => {
						this.user_info = res.data;
						this.parmData.name = res.data.realname;
						this.parmData.phone = res.data.phone;
						this.parmData.id_card = res.data.ic_number;
						this.parmData.name = res.data.realname;
						uni.setStorage({
							data: this.user_info,
							key: 'user_info'
						});
						uni.setStorage({
							data: 'first-launch',
							key: "use-page-type"
						})
					})
			}

		},
		methods: {
			subject() {
				let _ = this;
				if (this.parmData.digital_yuan_amount) {
					if (this.obj.max_asset == 'max') {
						if (Number(this.parmData.digital_yuan_amount) < Number(this.obj.min_asset + '0000')) {
							return this.toa('总资产在' + this.all_zc)
						}
						if (Number(this.parmData.digital_yuan_amount) > 50000000) {
							return this.toa('总资产在' + this.all_zc)
						}
					} else {
						if (Number(this.parmData.digital_yuan_amount) > Number(this.obj.max_asset + '0000')) {
							return this.toa('总资产在' + this.all_zc)
						}
						if (Number(this.parmData.digital_yuan_amount) < Number(this.obj.min_asset + '0000')) {
							return this.toa('总资产在' + this.all_zc)
						}
					}
					if (Number(this.parmData.digital_yuan_amount) > 200000000) {
						return this.toa('最高2亿元')
					}
				}
				// if (uni.$u.test.isEmpty(_.parmData.name)) return _.toa('请输入姓名');
				// if (uni.$u.test.isEmpty(_.parmData.rich)) return _.toa('请选择先富还是后富');
				if (!_.parmData.digital_yuan_amount && _.checked == false) {
					return _.toa("请输入总资产，如忘记请点击忘记资产")
				}
				uni.setStorage({
					data: _.parmData,
					key: "DOBUYZCYZ",
					success() {
						_.too('/pages/home-page/zc_payment')
					}
				})
			},
			doSelect(e) {
				this.parmData.level = e.indexs[0] + 1;
				this.parmData.levelx = e.value[0];
				this.showSelectLevel = false;
			}
		}
	}
</script>

<style lang="scss">
	.form_data {
		padding: 30rpx;

		.subject_btn {
			margin: 30rpx 0;
		}

		.item {
			margin-bottom: 25rpx;
		}

		.u-content-color {
			line-height: 1.6rem;
			height: 200rpx;
		}

		.input {
			border: 2rpx solid $th;
			border-radius: 10rpx;
			padding: 0 15rpx;
			height: 70rpx;
			line-height: 70rpx;
		}
	}

	.custom-style {
		background-color: $th;
	}
</style>