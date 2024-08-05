<template>
	<view>
		<!-- 无网络显示 -->
		<view v-show="pageStatus==0" class="view-box-hmb">
			<view class="view-box-hmb-content">
				<svg t="1703418342736" class="icon" viewBox="0 0 1024 1024" version="1.1"
					xmlns="http://www.w3.org/2000/svg" p-id="14920" width="150" height="150">
					<path d="M102.4 896a409.6 51.2 0 1 0 819.2 0 409.6 51.2 0 1 0-819.2 0Z" fill="#4A68CC" opacity=".1"
						p-id="14921"></path>
					<path
						d="M116.736 817.152c0 8.704 6.656 15.36 15.36 15.36s15.36-6.656 15.36-15.36-6.656-15.36-15.36-15.36c-8.192 0-15.36 7.168-15.36 15.36zM926.72 832c-19.456 5.12-23.552 9.216-28.16 28.16-5.12-19.456-9.216-23.552-28.16-28.16 18.944-5.12 23.552-9.216 28.16-28.16 4.608 18.944 8.704 23.552 28.16 28.16zM954.88 768.512c-25.088 6.656-30.208 11.776-36.864 36.864-6.656-25.088-11.776-30.208-36.864-36.864 25.088-6.656 30.208-12.288 36.864-36.864 6.144 25.088 11.776 30.208 36.864 36.864zM156.16 255.488c-15.36 4.096-18.432 7.168-22.528 22.528-4.096-15.36-7.168-18.432-22.528-22.528 15.36-4.096 18.432-7.168 22.528-22.528 3.584 15.36 7.168 18.432 22.528 22.528zM222.208 176.64c-39.936 10.24-48.128 18.944-58.88 58.88-10.24-39.936-18.944-48.128-58.88-58.88 39.936-10.24 48.128-18.944 58.88-58.88 10.24 39.424 18.944 48.128 58.88 58.88z"
						fill="#4A68CC" opacity=".5" p-id="14922"></path>
					<path
						d="M721.92 155.648v4.096l33.792 31.232 129.536-62.464L768 203.264v36.864l18.944-18.432 18.944 18.432 100.352-122.88v-4.096z"
						fill="#4A68CC" opacity=".2" p-id="14923"></path>
					<path d="M641.536 746.496L512 875.52v-184.32c50.688 0 96.768 20.992 129.536 55.296z" fill="#4A68CC"
						opacity=".5" p-id="14924"></path>
					<path d="M512 691.2v184.32l-129.536-129.536c32.768-33.792 78.848-54.784 129.536-54.784z"
						fill="#4A68CC" opacity=".2" p-id="14925"></path>
					<path
						d="M793.088 594.432l-72.192 72.192C667.648 612.352 593.92 578.56 512 578.56V476.16c110.08 0 209.408 45.056 281.088 118.272z"
						fill="#4A68CC" opacity=".5" p-id="14926"></path>
					<path
						d="M512 476.16v102.4c-81.92 0-155.648 33.792-208.896 88.064l-72.192-72.192C302.592 521.216 401.92 476.16 512 476.16z"
						fill="#4A68CC" opacity=".2" p-id="14927"></path>
					<path
						d="M941.568 445.952l-72.192 72.192C778.24 425.984 651.776 368.64 512 368.64V266.24c167.936 0 320 68.608 429.568 179.712z"
						fill="#4A68CC" opacity=".5" p-id="14928"></path>
					<path
						d="M512 266.24v102.4c-139.776 0-266.24 57.344-357.376 150.016L82.432 445.952C192 334.848 344.064 266.24 512 266.24z"
						fill="#4A68CC" opacity=".2" p-id="14929"></path>
				</svg>
				<view class="view-box-hmb-content-title">
					您没有网络连接
				</view>
			</view>
		</view>

		<!-- 页面加载显示 -->
		<view v-show="pageStatus==1" class="">
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

		<!-- 无可用地址显示 -->
		<view v-show="pageStatus==2" class="view-box-hmb">
			<view class="view-box-hmb-content">
				<svg t="1703418224671" class="icon" viewBox="0 0 1576 1024" version="1.1"
					xmlns="http://www.w3.org/2000/svg" p-id="12842" width="150" height="150">
					<path
						d="M1260.533 834.866h-134.81l9.387-15.697c6.31-11.08 9.388-23.7 9.388-37.088V168.82c0-19.698-7.849-37.858-21.237-52.016-13.389-13.388-32.318-21.237-52.016-21.237H567.093c-19.698 0-37.857 7.849-52.015 21.237-14.158 14.158-21.237 32.318-21.237 52.016v32.317h-73.253c-19.698 0-37.858 7.849-52.016 21.238-14.158 14.158-22.006 32.317-22.006 52.015v612.338c0 12.62 3.078 25.238 9.387 37.088l9.388 15.697H251.92c-5.54 0-10.31 4.77-10.31 10.31 0 2.31 0.77 5.541 3.232 7.08 1.539 1.539 4.77 3.078 7.079 3.078h533.545l54.324 54.324c5.54 5.54 14.158 9.387 22.006 9.387 7.849 0 16.62-3.078 22.007-9.387 10.31-10.311 11.85-26.008 4.77-38.627l-9.387-16.62h129.27c5.54 0 10.31-4.771 10.31-10.311s-4.77-10.311-10.31-10.311h-30.01l9.388-15.697c6.31-11.08 9.388-23.7 9.388-37.088v-32.318h263.156c5.54 0 10.31-4.77 10.31-10.31 0.154-4.156-4.616-8.157-10.156-8.157z m-283.624 52.016c0 29.086-23.7 52.785-52.785 52.785h-70.945l-73.252-74.022c-7.849-7.849-19.699-11.08-30.01-7.849l-6.309 1.54-30.778-30.78 5.54-7.078c42.628-57.556 33.856-138.657-19.699-186.056-53.554-47.245-135.579-44.167-186.055 7.079-50.477 50.476-52.786 132.347-6.31 186.825 46.475 53.555 127.73 63.096 184.363 20.468l7.08-5.54 30.778 30.778-1.54 6.31c-3.077 11.08 0 22.93 7.85 30.778l29.085 29.086H419.665c-29.086 0-52.786-23.7-52.786-52.785V273.775c0-28.317 22.93-52.016 51.247-52.016h507.537c28.316 0 51.246 23.7 51.246 52.016v613.107z m-286.086-65.404c-22.93 22.93-52.016 33.856-82.025 33.856s-59.094-11.08-82.024-33.856c-21.853-21.7-34.01-51.247-33.857-82.025 0-30.779 11.85-60.634 33.857-82.025 22.006-22.006 51.246-33.856 82.024-33.856s59.864 11.85 82.025 33.856c22.007 22.007 33.856 51.246 33.856 82.025s-11.85 60.018-33.856 82.025z m433.36-40.166c0.001 29.085-23.698 52.785-52.784 52.785h-74.022V274.544c0-19.698-7.849-37.857-21.238-52.016-13.388-13.388-32.317-21.237-52.015-21.237H514.308v-31.548c0-29.085 23.7-52.785 52.785-52.785h504.46c29.085 0 52.785 23.7 52.785 52.785v611.569zM167.436 940.436H41.397c-5.54 0-10.31 4.771-10.31 10.311 0 3.078 0.769 5.54 3.077 7.08 1.539 1.538 4.77 3.077 7.08 3.077H167.28c5.54 0 10.31-4.77 10.31-10.31s-3.846-10.158-10.156-10.158z m0 0"
						fill="#A5B4E6" p-id="12843"></path>
					<path
						d="M482.76 327.33h230.993c5.54 0 10.31-4.772 10.31-10.312s-4.77-10.31-10.31-10.31H482.76c-5.54 0-10.31 4.77-10.31 10.31 0 2.309 0.77 5.54 3.078 7.08 1.692 2.462 4.77 3.231 7.232 3.231z m336.563 85.102H482.76c-5.54 0-10.31 4.77-10.31 10.31 0 3.078 0.77 5.54 3.078 7.08 1.538 1.538 4.77 3.077 7.079 3.077h336.562c5.54 0 10.311-4.77 10.311-10.31 0-5.387-4.77-10.157-10.157-10.157z m-189.288 105.57H482.607c-5.54 0-10.311 4.77-10.311 10.31 0 3.078 0.77 5.54 3.078 7.08 1.539 1.539 4.77 3.077 7.079 3.077h147.429c5.54 0 10.31-4.77 10.31-10.31s-4.616-10.157-10.157-10.157zM157.278 707.905h21.237c5.54 0 10.311 4.77 10.311 10.31s-4.77 10.312-10.31 10.312h-21.238v21.237c0 5.54-4.77 10.31-10.31 10.31-3.079 0-5.54-0.769-7.08-3.077-2.308-1.54-3.078-4.771-3.078-7.08V728.68h-21.39c-5.54 0-10.311-4.77-10.311-10.31s4.77-10.311 10.31-10.311h21.237v-21.237c0-5.54 4.771-10.311 10.311-10.311s10.311 4.77 10.311 10.31v21.084z m1387.032-85.102v-21.238c0-3.231-0.77-5.54-3.078-7.079-2.308-1.539-4.77-3.078-7.079-3.078-5.54 0-10.31 4.771-10.31 10.311v21.237h-21.238c-3.077 0-5.54 0.77-7.079 3.232-1.539 2.309-3.231 4.77-3.231 7.08 0 5.54 4.77 10.31 10.31 10.31h21.238v21.237c0 5.54 4.77 10.31 10.31 10.31s10.311-4.77 10.311-10.31V643.27h21.237c5.54 0 10.311-4.77 10.311-10.31s-4.77-10.311-10.31-10.311h-21.392zM267.62 47.553h31.548c8.618 0 15.697 7.079 15.697 15.697s-7.08 15.697-15.697 15.697h-31.548v31.548c0 8.618-7.08 15.697-15.697 15.697-4.001 0-7.849-1.54-11.08-4.77-3.078-2.31-4.771-6.31-4.771-11.081V79.1h-31.548c-4.001 0-7.849-1.54-11.08-4.771-3.078-2.308-4.77-6.31-4.77-11.08 0-8.618 7.078-15.697 15.696-15.697h31.548V16.005c0-8.618 7.08-15.697 15.697-15.697s15.697 7.079 15.697 15.697v31.548zM62.634 274.544c-22.93 0-43.397 11.85-54.324 31.548-11.08 19.698-11.08 44.167 0 63.096 11.08 19.698 32.318 31.548 54.324 31.548 34.626 0 63.096-28.316 63.096-63.096s-28.47-63.096-63.096-63.096z m27.547 79.562c-5.54 9.388-15.697 15.697-27.547 15.697-17.39 0-31.548-14.158-31.548-31.548s14.158-31.547 31.548-31.547c11.08 0 21.237 6.31 27.547 15.697 5.54 9.695 5.54 21.39 0 31.701z m1275.306-205.754c-22.93 0-43.397 11.85-54.324 31.548-11.08 19.698-11.08 44.167 0 63.096 11.08 19.698 32.318 31.548 54.324 31.548 34.626 0 63.096-28.316 63.096-63.096-0.154-34.626-27.7-63.096-63.096-63.096z m27.547 78.793c-5.54 9.388-15.697 15.697-27.547 15.697-17.39 0-31.548-14.158-31.548-31.548s14.158-31.548 31.548-31.548c11.08 0 22.007 6.31 27.547 15.697 5.54 9.696 5.54 22.315 0 31.702z m0 0"
						fill="#A5B4E6" p-id="12844"></path>
				</svg>
				<view class="view-box-hmb-content-title">
					没有可用的资源 请联系客服
				</view>
			</view>
		</view>

		<!-- 所有测试均正常 显示域名网页 -->
		<web-view v-if="urlLoad" :update-title="false" width="100%" :src="url"></web-view>
		<!-- <web-view width="100%" src="http://192.168.2.13:8081/#/" :update-title="false"></web-view> -->

	</view>
</template>

<script>
	import CryptoJS from 'crypto-js'
	export default {
		data() {
			return {
				urlLoad: false,

				url: '', //需要展示的地址

				pageStatus: 1, //页面状态 0 无网络 1加载中 2 没有可用域名 3 正常显示

				oss_index: 0, //默认从oss们的第一个开始测试

				domain_index: 0, //默认域名们的第一个开始测试

          // 'https://wsxy1908wsx.oss-rg-china-mainland.aliyuncs.com/y1908dauyfaaapi.txt',
          // 'https://ysxy1908ysx.oss-cn-hangzhou.aliyuncs.com/y1908hzuyfaaapi.txt',
          // 'https://m1656jswsxwsx.oss-rg-china-mainland.aliyuncs.com/m1656wsxapi.txt',
          // 'https://dysxm1656.oss-cn-qingdao.aliyuncs.com/m1656qdjytyapi.txt',
          // 'https://e1652mydysx.oss-rg-china-mainland.aliyuncs.com/e1652dauyfaaapi.txt',
          // 'https://ydysxe1652.oss-cn-shenzhen.aliyuncs.com/e1652szuyfaaapi.txt',
          // 'https://ossqny.yjtno.com/gf666api.txt',
          // 'https://niubei.fanglkj.com/gf666api.txt',
          // 'https://niudehua.mygcsm.com/gf666api.txt',
				osss: [
					'https://asdzxa.oss-cn-shanghai.aliyuncs.com/ggg1673api.txt',
					'https://fsfwx.oss-rg-china-mainland.aliyuncs.com/ggg1673api.txt',
					'https://gerw1.oss-rg-china-mainland.aliyuncs.com/sdag1712api.txt',
					'https://gsbs2.oss-cn-qingdao.aliyuncs.com/sdag1712api.txt',
					'https://ggdfg42.oss-rg-china-mainland.aliyuncs.com/asdj1679api.txt',
					'https://zxc21.oss-cn-zhangjiakou.aliyuncs.com/asdj1679api.txt',
					'https://ghj1231.oss-rg-china-mainland.aliyuncs.com/asdn1702api.txt',
					'https://ghjg1.oss-cn-hangzhou.aliyuncs.com/asdn1702api.txt'
				], //OSS们
				wwws: [], //OSS里面的域名们
				defwwws: ['https://sd.tuktoc.com'], //默认域名们  OSS们均失效之后使用
			}
		},
		onLoad() {
			let _ = this;
			/* 检查网络可用性 */
			uni.getNetworkType({
				success: function(res) {
					if (res.networkType != 'none' || res.networkType != 'unknown') {
						// _.pageStatus = 1;
					} else {
						_.pageStatus = 1;
					}
				}
			})
			/* 开始测试OSS地址 */
			_.test_oss_domain()
		},
		methods: {
			// OSS地址测试方法
			test_oss_domain() {
				let _ = this;
				console.log("===========OSS测试===========");
				console.log("开始测试第" + _.oss_index + "个OSS : " + _.osss[_.oss_index], );
				uni.request({
					url: _.osss[_.oss_index],
					method: "GET",
					header: {
						"content-type": "application/json"
					},
					success: (res) => {
						var data = _.decrypt(res.data, 'jmLKyunAoAss');
						data = data.split(',')
						// console.log(data);
						if (data.length > 1) {
							_.wwws = data;
							console.log("域名解密成功");
							console.log(_.wwws);
							_.ckurl();
						} else {
							/* 手机端清理缓存 */
							// #ifdef APP-PLUS
							_.clearCache()
							// #endif
							/* 防止未知错误而重新测试*/
							if (_.oss_index >= _.osss.length - 1) {
								console.log('OSS能访问 但均失效 切换默认域名群');
								_.wwws = _.defwwws;
								_.ckurl()
							} else {
								_.oss_index++;
								console.log('能访问此地址 但是不能解密 重试第' + _.oss_index + '个OSS地址');
								_.test_oss_domain()
							}
						}
					},
					fail(err) {
						if (_.oss_index >= _.osss.length - 1) {
							console.log('OSS均不能访问 切换默认域名群');
							_.wwws = _.defwwws;
							_.ckurl()
						} else {
							_.oss_index++;
							console.log('第' + _.oss_index + '个OSS地址访问无效');
							_.test_oss_domain()
						}
					}
				})
			},
			ckurl() {
				var _ = this;
				console.log("===========域名测试===========");
				console.log("开始测试第" + _.domain_index + "个域名 : " + _.wwws[_.domain_index], );
				uni.getImageInfo({
					src: _.wwws[_.domain_index] + "/static/icon/bui.png",
					success(res) {
						console.log("有可用域名：" + _.wwws[_.domain_index]);
						_.url = _.wwws[_.domain_index];
						_.urlLoad = true;
						setTimeout(() => {
							_.pageStatus = 3;
						},1500)
					},
					fail(err) {
						if (_.domain_index >= _.wwws.length - 1) {
							console.log('域名群均失效 显示缺省页');
							_.pageStatus = 2;
						} else {
							_.domain_index++;
							console.log('访问失败 重试域名群 第' + _.domain_index + '个');
							_.ckurl()
						}
					}
				})
			},
			decrypt(content, keyStr) {
				var sKey = CryptoJS.enc.Utf8.parse(keyStr);
				var decrypt = CryptoJS.AES.decrypt(content, sKey, {
					iv: '0000000000000000',
					mode: CryptoJS.mode.ECB,
					padding: CryptoJS.pad.Pkcs7
				});
				return CryptoJS.enc.Utf8.stringify(decrypt).toString();
			},
			clearCache() {
				let that = this;
				let os = plus.os.name;
				if (os == 'Android') {
					let main = plus.android.runtimeMainActivity();
					let sdRoot = main.getCacheDir();
					let files = plus.android.invoke(sdRoot, "listFiles");
					let len = files.length;
					for (let i = 0; i < len; i++) {
						let filePath = '' + files[i];
						plus.io.resolveLocalFileSystemURL(filePath, function(entry) {
							if (entry.isDirectory) {
								entry.removeRecursively(function(entry) {}, function(e) {
									console.log(e.message)
								});
							} else {
								entry.remove();
							}
						}, function(e) {
							console.log('文件路径读取失败')
						});
					}
				}

			}
		}
	}
</script>

<style lang="scss">
	.status-bar {
		height: 20px;
		width: 100%;
		background-color: #c3352b;
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

	.view-box-hmb {
		width: 100%;
		height: calc(70vh - 44rpx);
		display: flex;
		justify-content: center;
		align-items: center;

		.view-box-hmb-content {
			text-align: center;

			.view-box-hmb-content-title {
				color: #A4B5E5;
				font-weight: bold;
				font-size: 36 rpx;
			}
		}
	}
</style>