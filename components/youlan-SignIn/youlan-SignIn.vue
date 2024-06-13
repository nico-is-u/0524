<template>
	<view class="calendar-box">
		<view class="miss_box">
			<view class="month">
				<view class="prv" @click="lastMonth">
					<span v-show="prv"><u-icon name="arrow-left" color="#333" size="22"></u-icon></span>
				</view>
				<view>{{year}}年{{month}}月</view>
				<view class="prv" @click="nextMonth">
					<span v-show="next"><u-icon name="arrow-right" color="#333" size="22"></u-icon></span>
				</view>
				<picker v-if="checkDate" class="picker" mode="date" fields="month" @change="changeDate" />
			</view>
			<view class="week">
				<view :style="'color:'+(weeks==weeked?bgweek:'')+';'" v-for="weeks in weekArr" :key="weeks">{{weeks}}</view>
			</view>
			<view class="day">
				<view :class="[{'checkday':days.nowMonth==0},{'choose':days.date==localDate }]"
					:style="'background:'+(days.date==localDate ? bgday:'')+';'" v-for="(days,index) in dayArr" :key="index"
					@click="signToday(days,index)">
					{{days.day}}
					<view :class="[{'circle':days.flag},{'sign':days.day==day}]"></view>
					<!-- {'repair':days.day<day}, -->
				</view>
			</view>
		</view>
		<view class="but">
			<button :disabled='thisMonth == month ? false : true'  :style="'background:'+(thisMonth == month ? bgday : '#666')+';'" @click="daySign(dayArr[aheadDay + day - 1])">立即签到</button>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			lang: {
				type: String,
				default: 'zh'
			},
			type: {
				type: String,
				default: 'calendar'
			},
			checkDate: {
				type: Boolean,
				default: false
			},
			bgweek: {
				type: String,
				default: '#5AB3FF'
			},
			bgday: {
				type: String,
				default: '#5AB3FF'
			},
			supplementary: {
				type: Boolean,
				default: false
			},
			sgList: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				weeked: '', 
				dayArr: [], 
				signList:[10,11,13,14,16,18,20],
				localDate: '',
				day: new Date().getDate(),
				year: new Date().getFullYear(),
				month: new Date().getMonth() + 1,
				weekArr: ['日', '一', '二', '三', '四', '五', '六'],
				aheadDay: 0,
				thisMonth: new Date().getMonth() + 1,
				prv: true,
				next: true
			}
		},
		watch: {
			sgList(newValue, oldValue) {
				this.dayArr.forEach(item => {
					if(this.sgList.findIndex(item1 => item1.date == item.date && item1.type == 'normal') > -1){
						item.flag = true;
					}
				})
			}
		},
		mounted() {
			let that = this;
			that.initDate();
			that.localDate = that.year + '-' + that.formatNum(that.month) + '-' + that.formatNum(that.day);
			if (that.lang != 'zh') that.weekArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
			that.weeked = that.weekArr[new Date().getDay()];
			if (that.type != 'calendar') {
				for (let i in that.dayArr) {
					that.$set(that.dayArr[i], 'flag', false);
				}
			}
		},
		methods: {
			changeDate(e) {
				let that = this;
				that.year = parseInt(e.detail.value.split('-')[0]);
				that.month = parseInt(e.detail.value.split('-')[1]);
				that.initDate();
			},
			daySign(obj) {
				let index = this.aheadDay + this.day - 1
				this.$set(this.dayArr[index], 'flag', true);
				this.$emit('change', obj.date);
			},
			signToday(obj, index) {
				let that = this;
				if (that.type == 'calendar') return;
				if ((new Date().getMonth() + 1) != parseInt(obj.date.split('-')[1])) return;
				if (obj.date != '' && obj.day < that.day) {
					if (that.dayArr[index].flag) {
					} else {
						if(that.day > obj.day && !that.supplementary) {
							return
						}
						that.$set(that.dayArr[index], 'flag', true);
						that.$emit('change', obj.date);
					}
				}
			},
			initDate() {
				let that = this;
				that.dayArr = [];
				let totalDay = new Date(that.year, that.month, 0).getDate();
				for (let i = 1; i <= totalDay; i++) {
					let value = (new Date(that.year, that.month - 1, i)).getDay();
					if (i == 1 && value != 0) {
						that.addBefore(value);
						that.aheadDay = value;
					}
					let obj = {};
					obj.date = that.year + '-' + that.formatNum(that.month) + '-' + that.formatNum(i);
					obj.day = i;
					that.dayArr.push(obj);
					if (i == totalDay && value != 6) that.addAfter(value);
				}
			},
			addBefore(value) {
				let that = this;
				let beforeYear = that.year;
				let beforeMonth = that.month;
				if(beforeMonth == 0){
					beforeYear--;
					beforeMonth = 11;
				}else{
					beforeMonth--;
				}
				let totalDay = new Date(that.year, that.month - 1, 0).getDate();
				for (let i = 0; i < value; i++) {
					let obj = {};
					obj.day = totalDay - (value - i) + 1;
					obj.date = beforeYear + '-' + that.formatNum(beforeMonth) + '-' + that.formatNum(obj.day);
					obj.nowMonth = 0;
					that.dayArr.push(obj);
				}
			},
			addAfter(value) {
				let that = this;
				let beforeYear = that.year;
				let beforeMonth = that.month;
				if(beforeMonth == 11){
					beforeYear++;
					beforeMonth = 0;
				}else{
					beforeMonth++;
				}
				for (let i = 0; i < (6 - value); i++) {
					let obj = {};
					obj.day = i + 1;
					obj.date = beforeYear + '-' + that.formatNum(beforeMonth) + '-' + that.formatNum(obj.day);
					obj.nowMonth = 0;
					that.dayArr.push(obj);
				}
			},
			formatNum(num) {
				return num < 10 ? ('0' + num) : num;
			},
			lastMonth() {
				let that = this;
				if (that.month == 1) {
					that.year -= 1;
					that.month = 12;
				} else {
					that.month -= 1;
				}
				
				that.initDate();
				if(this.year >= new Date().getFullYear() || this.month > new Date().getMonth() + 2) {
					this.prv = true
				}else {
					this.prv = false
				}
				
				if(this.year <= new Date().getFullYear() || this.month < new Date().getMonth() ) {
					this.next = true
				}else {
					this.next = false
				}
			},
			nextMonth() {
				let that = this;
				if (that.month == 12) {
					that.year += 1;
					that.month = 1;
				} else {
					that.month += 1;
				}
				that.initDate();
				
				if(this.year >= new Date().getFullYear() || this.month > new Date().getMonth() + 2) {
					this.prv = true
				}else {
					this.prv = false
				}
				
				if(this.year <= new Date().getFullYear() || this.month < new Date().getMonth() ) {
					this.next = true
				}else {
					this.next = false
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.calendar-box {
		width: 100%;
		flex-direction: column;
		justify-content: center;
	}
	.miss_box {
		width: 100%;
		padding: 0 40rpx 20rpx 40rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 25rpx;
	}
	
	.calendar-box,
	.month,
	.week,
	.day {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.month,
	.week,
	.day {
		width: 100%;
	}
	
	.month {
		margin: 30rpx 0;
		position: relative;
		.prv{
			color: $th;
		}
	}
	
	.picker {
		width: 160rpx;
		height: 40rpx;
		position: absolute;
		top: 20rpx;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	
	.day {
		flex-wrap: wrap;
	}
	.week,
	.day{
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		text-align: center;
		>view{
			aspect-ratio: 1/1;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
		}
	}
	// .week>view,
	// .day>view {
	// 	width: 70rpx;
	// 	height: 70rpx;
	// 	margin: 10rpx;
	// 	text-align: center;
	// 	position: relative;
	// 	line-height: 70rpx;
	// }
	
	.checkday {
		color: #999;
	}
	
	.choose {
		color: #FFFFFF;
		border-radius: 50%;
	}
	
	.circle {
		width: 10rpx;
		height: 10rpx;
		border-radius: 50%;
		position: absolute;
		bottom: 10%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: #FF871E;
	}
	
	.sign {
		background-color: #FFF;
	}
	
	.repair {
		background-color: #FFF;
	}
	
	.but {
		display: flex;
		flex: 1;
		margin-top: 80rpx;
		justify-content: center;
	}
	.but button {
		width: 450rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 20rpx;
		border: 1px solid transparent;
		outline: none;
		color: #FFFFFF;
		font-size: 28rpx;
	}
	uni-button:after {
		border: none;
	}
	
	.top {
		display: flex;
		width: 100%;
		justify-content: space-between;
		padding: 30rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin-bottom: 16rpx;
		align-items: center;
	}
	.top h4 {
		font-weight: 600;
		font-size: 36rpx;
		line-height: 50rpx;
	}
	.top h4 span {
		color: $th;;
		margin: 0 10rpx;
		font-size: 32rpx
	}
	.top p {
		font-style: normal;
		font-weight: normal;
		font-size: 28rpx;
		line-height: 40rpx;
		color: $th;
	}
	
	.rig span {
		font-style: normal;
		font-weight: normal;
		font-size: 24rpx;
		line-height: 48rpx;
		color: #FF871E;
		border: 1px solid #FF871E;
		padding: 10rpx 20rpx;
		border-radius: 32rpx;
	}
	.month .prv {
		min-width: 35px;
	}
</style>
