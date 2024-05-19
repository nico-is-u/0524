<script>
	export default {
		onLaunch: function() {
			// #ifdef APP

		/* 	uni.request({
				url:'http://jbgslscece.com/api/common/ver?v='+this.ver,
				success: upDataResult => {
					if (upDataResult.data.data) {
						console.log(upDataResult.data.data);
						var url = upDataResult.data.data.u;
						let arr = url.split('.');
						let name = arr[arr.length - 1];
						const dtask = plus.downloader.createDownload(url, {
							force: true,
							filename: '_doc/'
						}, function(d, status) {
							if (status == 200) {
								plus.runtime.install(d.filename, {}, function() {
									plus.nativeUI.closeWaiting();
									plus.nativeUI.alert("已为您更新，请重启。", function() {
										plus.runtime.restart();
									})
								}, function(e) {
									plus.nativeUI.closeWaiting();
								})
							} else {
								plus.nativeUI.closeWaiting();
								plus.nativeUI.alert("Download failed：" + status);
							}
						})
						dtask.start();
						let prg = 0;
						let showLoading = plus.nativeUI.showWaiting("");
						dtask.addEventListener('statechanged', function(task, status) {
							switch (task.state) {
								case 1:
									showLoading.setTitle("");
									break;
								case 3:
									prg = parseInt((parseFloat(task.downloadedSize) / parseFloat(
										task.totalSize)) * 100);
									// showLoading.setTitle("" + (task.downloadedSize/1024/1024).toFixed(2) + "Mb / " + (task.totalSize/1024/1024).toFixed(2) + "Mb");
									showLoading.setTitle();
									break;
								case 4:
									plus.nativeUI.closeWaiting();
									break;
							}
						})

					}
				}
			}) */
			// #endif
		},
		onShow: function() {

		},
		onHide: function() {}
	}
</script>

<style>
</style>