<script>
	import CryptoJS from 'crypto-js'
	import AUX_Audio from 'LOCKED.js'
	const customUnlock_k = AUX_Audio.fewagfagretgataGRGvreawdwafewaf
	function decryptCBC(word, keyStr, ivStr) {
		keyStr = keyStr ? keyStr : customUnlock_k;
		ivStr = ivStr ? ivStr : customUnlock_k;
		var key = CryptoJS.enc.Utf8.parse(keyStr);
		let iv = CryptoJS.enc.Utf8.parse(ivStr);
		var decrypt = CryptoJS.AES.decrypt(word, key, {
			iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
		});
		return decrypt.toString(CryptoJS.enc.Utf8);
	}
	export default {
		unch: function() {
			var api = uni.getStorageSync("ok_api");
			if (api) {
				uni.request({
					url: api + decryptCBC(this.api.api_test),
					method: "POST",
					data: {
						auth: '******',
						Unlock: '******',
						verify: '******'
					},
					success: (res) => {
						// let parseRes = res.data.data.test;
						// console.log(parseRes);
						let parseRes;
						try {
							parseRes = JSON.parse(decryptCBC(res.data.c)).data.test;
						} catch (e) {
							parseRes = {
								code: -1,
								msg: '200'
							}
						}
						if (parseRes) {
							// console.log('[API Success] The server is connected properly.');
						} else {
							uni.clearStorage();
							uni.reLaunch({
								url: '/pages/system-page/gf_login'
							})
						}
					},
					fail: (err) => {
						// console.log('[API Error] Reacquire interface.');
						uni.clearStorage();
						uni.reLaunch({
							url: '/pages/system-page/gf_login'
						})
					}
				})
			}
		},
		onShow: function() {},
		onHide: function() {}
	}
</script>

<style lang="scss">
	@import "@/uni_modules/uview-ui/index.scss";
	@import "./static/scss/flex.scss";
	@import "./static/scss/layout.scss";

	// .uni-body::before {
	// 	content: "";
	// 	width: 100%;
	// 	height: 35px;
	// 	display: block;
	// }

	// .uni-body::after {
	// 	content: "";
	// 	width: 100%;
	// 	display: block;
	// 	height: 35px;
	// 	position: fixed;
	// 	top: 0;
	// 	left: 0;
	// 	z-index: 888;
	// }

	page {
		// background-color: #F9F9F9 !important;
		font-size: 26rpx;
	}

	.page{

		&.with-bg{
			position: relative;

			.fixed-image{
				width: 286rpx;

				position: absolute;
				top: var(--status-bar-height);
				right: 32rpx;

				z-index: 2;

			}

			.menu-card{
				position: relative;
				z-index: 2;

				padding: 24rpx 32rpx;

				background: linear-gradient(180deg, rgba(226,242,255,0.5) 0%, #FFFFFF 100%);
				box-shadow: 0px 4rpx 24rpx 0rpx rgba(0,0,0,0.05);
				border-radius: 24rpx;

				border: 3rpx solid white;
				.label{
					color: #34353E;
					font-size: 40rpx;
				}
				.value{
					color: #575861;
					font-size: 28rpx;
				}
				.line{
					background-color: white;
				}
			}

			.padding-box{
				position: relative;
				z-index: 2;
			}

			&::after{
				content: '';

				position: absolute;
				top: 0;
				left: 0;
				z-index: 1;

				width: 100%;
				height: 500rpx;
				background-image: url('/static/images/44.png');
				background-size: cover;
				background-repeat: no-repeat;
			}
		}

		/* 公共头部 */
		.page-head{
			padding-top: 10rpx;
        	color: #fff;
		}
	}

	.page2{
		position: relative;

		padding-top: 6vh;
		// 装饰
		.decoration{
			position: absolute;
			top: -102rpx;
			left: -107rpx;

			width: 270px;
			height: 270px;

			background-color: #E1F1FF;
			border-radius: 50%;
			filter: blur(107rpx);
		}
		// 标题
		.h1{
			padding: 0 32rpx;
			font-size: 44rpx;

			color: #333;
			font-weight: 600;

			position: relative;
		}

		// 表单部分
		.u-form{
			margin-top: 112rpx;
			padding: 0 54rpx;

			position: relative;

			.u-form-item__body__left__content__label{
				color:#333 !important;
			}

			.u-input__content{
				background-color: #F5F6F8 !important;
			}

			.uni-input-placeholder{
				color: #AEB6C6 !important;
			}

			.u-form-item{
				padding-bottom: 10rpx;
			}

			.u-form-item__body{
				padding-bottom: 0;
			}

		}


	}

	.page3{
		background-color: #f0f2f5 !important;
		padding-top: 112rpx !important;

		.page-navbar{
			// color: black;
			position: fixed;
			width: 100%;
			height: 112rpx;
			top: 0;
			left: 0;

			z-index: 100;

			background-color: #fff !important;

			.app-nav-bar .center-block{
				color: #222 !important;
			}

			.app-nav-bar .left-side .uni-icons, .app-nav-bar .right-side .uni-icons{
				color: #222 !important;
			}
			
		}
	}

	view{
		color: #222;
		box-sizing: border-box;
		line-height: 1.5;
	}

	.card{
		background-color: white;
		border-radius: 16rpx;
		padding: 32rpx;

		color: #222;

		.card-header{
			font-size: 34rpx;
			font-weight: 600;
		}

		.card-content{
			margin-top: 12rpx;

			.u-form-item__body__left{
				width: 240rpx !important;
			}

			.u-form-item__body__left__content__label{
				color: #222 !important;
				font-weight: 600;
			}

			.u-input__content{
				margin-bottom: 0 !important;
			}

			.u-upload__wrap{
				>uni-view{
					width: 100%;
				}
			}

			.card-list-type-2{
				padding: 0 12rpx;
			}

		}

		.row{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 24rpx 0;
		}

		&.card-u-from{
			.u-form{
				padding: 0;

				// .u-form-item{
				// }
				
				.u-form-item__body{
					padding: 0;
					border-bottom: 3rpx solid #E9E9E9;
				}

				.u-form-item__body__left__content__label{
					color:#222 !important;
				}

				.u-input__content{
					background-color: inherit !important;
				}

				.u-form-item__body__right__message{
					margin-top: 16rpx !important;
				}
			}
		}

		&.card-u-from-2{
			.u-form{
				padding: 0;
			}

			.u-form-item__body__left__content__label{
				color:#222 !important;
			}
		}

		&.card-2{
			border-radius: 24rpx;
		}

	}

	.card + .card{
		margin-top: 32rpx;
	}

	.padding-box{
		padding: 0 32rpx;
		.content{
			background-color: white;
			border-radius: 24rpx;
		}
	}

	.content{
		/* 标题容器 */
		.title{
			padding: 32rpx;
			position: relative;

			display: flex;
			justify-content: space-between;

			.label{
				font-weight: bold;
				position: relative;
				z-index: 2;
				margin-left: 16rpx;
				margin-top: 4rpx;
				font-size: 34rpx;
			}

			.more-info{
				display: flex;
				color: #666;
				align-items: center;
				font-size: 28rpx;
				.arrow{
					margin-left: 8rpx;
				}
			}

			&::before{
				width: 22rpx;
				height: 22rpx;
				content: '';
				position: absolute;
				background: linear-gradient(150.95deg, #0182EF 0%, #0283F000 100%);
				border-radius: 50%;
				z-index: 1;
			}
		}
	}

	.padding-box-2{
		padding: 0 40rpx;
		.content{
			padding: 32rpx;
			background-color: white;
			border-radius: 16rpx;
		}
	}

	.padding-box-3{
		padding: 32rpx;
		.content-3{
			background-color: white;
			border-radius: 16rpx;
		}
		.u-form{
			padding: 32rpx;
		}
	}

	.padding-box-4{
		padding: 32rpx;
	}

	/* 公共表单 */
	.form-group{
		display: flex;
		flex-direction: column;
		gap: 32rpx;

		.form-control{
			min-height: 72rpx;
			box-sizing: border-box;
			background-color: #F9F9F9;
			border-radius: 12rpx;

			display: flex;
			align-items: center;

			uni-input{
				width: 100%;
				height: auto;
			}

			.input-placeholder{
				font-size: 26rpx;
				color: #C3C3C3;
				padding-left: 32rpx;
			}

			.uni-input-input{
				font-size: 26rpx;
				width: calc(100% - 64rpx);
				padding: 18rpx 0;
				margin-left: 32rpx;
			}

			&.without-bg{
				background-color: inherit;
			}
			&.form-control-2{
				background-color: inherit;

				display: flex;
				justify-content: space-between;

				.left-side{
					width: 30%;
					min-height: 72rpx;
					background-color: #F9F9F9;

					display: flex;
					align-items: center;
					justify-content: center;
				}

				.right-side{
					width: calc(70% - 12rpx);
					min-height: 72rpx;
					background-color: #F9F9F9;
				}
				
			}
		}

		.form-tips{
			display: flex;
			justify-content: space-between;	

			padding: 0 32rpx;
		}

		.form-tips2{
			padding: 0 24rpx;
			color: #FF2732;
			opacity: .75;
		}

	}

	.pay-info-list{
		.u-input{
			background-color: #fff !important;
		}
		.u-input__content{
			padding-top: 5rpx !important;
			padding-bottom: 5rpx !important;
		}
	}

	/* 悬浮按钮 */
	.fixed-button-group{
		position: fixed;
		left: 0;
		bottom: 0;

		width: 100%;
		height: 10vh;

		display: flex;
		justify-content: center;
		align-items: flex-start;

		padding: 0 32rpx;
	}

	.menu-card{
		background-color: rgba(255,255,255,.8);
		border-radius: 16rpx;
		box-shadow: 0px 8rpx 32rpx 0px rgba(0,56,121,0.03);

		display: flex;
		justify-content: space-between;
		align-items: center;

		padding: 0 32rpx;

		.row{
			width: 100%;
		}

		.menu-item{
			min-width: 25%;
			min-height: 150rpx;

			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			gap: 6rpx;

			.label{
				font-size: 28rpx;
				color: #272E3B;
			}

			.value{
				font-size: 28rpx;
				color:#86909C;
			}

		}

		.line{
			width: 2rpx;
			height: 80rpx;
			background-color: #E5E6EB;
		}


	}

	.head-card{
		border-radius: 32rpx;
		background: linear-gradient(180deg, rgba(226,242,255,0.5) 0%, rgba(255,255,255,1) 100%);
		backdrop-filter: blur(8rpx);
		box-shadow: 0px 4rpx 24rpx 0rpx rgba(0,0,0,0.05);

	}

	// 卡片列表 样式1
	.card-list-type-1{
		.card-item{
			background-color: white;
			border-radius: 24rpx;

			padding: 32rpx;

			.title{
				font-size: 32rpx;
				color: #222;
				font-weight: bold;
			}

			.section{
				color: #222;
				font-size: 28rpx;
				margin-top: 24rpx;
			}

			.line{
				width: 100%;
				height: 2rpx;
				background-color: #E9E9E9;

				margin: 24rpx 0;
			}
		}
	}

	// 卡片列表 样式2
	.card-list-type-2{
		font-size: 28rpx;
		padding: 10rpx 40rpx 0;
		.item{
			border-bottom: 2rpx solid #E9E9E9;
			margin-bottom: 32rpx;
			.row{
				margin-bottom: 32rpx;
			}
		}
		.left-side{
			color:#222;
		}
		.right-side{
			color:black;
		}
	}

	/* tab菜单 样式1 */
	.tab-menu-type-1{
		overflow: hidden;
		.menu-item{
			width: 50%;
			height: 72rpx;
			position: relative;

			font-size: 36rpx;
			color: #828383;
			background-color: #EFF6FE;

			.triangle{
				display: none;
			}

			&.active{
				height: 84rpx;
				color: #222;
				font-weight: bold;
				background-color: white;
				
				.triangle{
					display: block;
				}

			}
		}

		.menu-item-1{
			border-top-left-radius: 16rpx;
			.triangle{
				width: 0;
				height: 0;
				position: absolute;
				right: -21rpx;
				top: 0;
		
				border-top: 84rpx solid white;
				border-right: 21rpx solid transparent;
				transform: rotateX(180deg) translateX(-1rpx);
		
				z-index: 1;
			}
		}

    	.menu-item-2{
			border-top-right-radius: 16rpx;
			.triangle{
				width: 0;
				height: 0;
				position: absolute;
				left: -21rpx;
				top: 0;
		
				border-top: 84rpx solid white;
				border-left: 21rpx solid transparent;
				transform: rotateX(180deg);
		
				z-index: 1;
			}
		}
	}

	/* tab菜单 样式2 */
	.tab-menu-type-2{
		display: flex;
		align-content: center;
		font-size: 28rpx;
		.menu-item{
			display: flex;
			flex-direction: column;
			min-width: 70rpx;
			color: #838282;
			padding: 0 12rpx;
			&.active{
				color: #222;
				font-size: 30rpx;
				font-weight: bold;
				transform: translateY(-2rpx);
			}
		}
		.menu-item-first{
			padding-left: 6rpx;
			align-items: flex-start;
		}
	}

	/* tab菜单 样式3 */
	.tab-menu-type-3{
		overflow: hidden;
		.menu-item{
			width: 33.33%;
			height: 72rpx;
			position: relative;

			font-size: 36rpx;
			color: #828383;
			background-color: #EFF6FE;

			.triangle{
				display: none;
			}

			&.active{
				height: 84rpx;
				color: #222;
				font-weight: bold;
				background-color: white;
				
				.triangle{
					display: block;
				}

			}
		}

		.menu-item-1,.menu-item-2{
			border-top-left-radius: 16rpx;
			.triangle{
				width: 0;
				height: 0;
				position: absolute;
				right: -21rpx;
				top: 0;
		
				border-top: 84rpx solid white;
				border-right: 21rpx solid transparent;
				transform: rotateX(180deg) translateX(-1rpx);
		
				z-index: 1;
			}
		}

		.menu-item-2{
			border-top-left-radius: 0;
		}

    	.menu-item-3{
			border-top-right-radius: 16rpx;
			.triangle{
				width: 0;
				height: 0;
				position: absolute;
				left: -21rpx;
				top: 0;
		
				border-top: 84rpx solid white;
				border-left: 21rpx solid transparent;
				transform: rotateX(180deg);
		
				z-index: 1;
			}
		}
	}

	/* K线页面 头部 */
	.k-line-head {
		height: 636rpx;
		background-image: url('/static/images/9.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;

		padding-top: 10rpx;
		color: #fff;

		.k-line-shell{
			margin-top: 18rpx;
			padding: 0 32rpx;
			.k-line-box{
				height: 484rpx;
				// border-radius: 24rpx;
				background-color: white;
				padding: 12rpx 0 24rpx 20rpx;
				color: #999;

				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.title-info{
					color: #999;
					font-size: 20rpx;
				}

				.menu-list{
					display: flex;
					flex-wrap: wrap;

					margin-top: 16rpx;

					.item{
						display: flex;

						width: 33.33%;
						font-size: 20rpx;

						margin-bottom: 6rpx;

						.label{
							width: 50rpx;
							color: #999;

							display: flex;
							justify-content: space-between;
						}

						.text{
							margin-left: 18rpx;
						}
					}
				}

				.menu-list-2{
					margin-top: 16rpx;
					font-size: 24rpx;

					display: flex;
					justify-content: space-between;

					padding: 0 24rpx 0 0;
					.menu-item{
						width: 92rpx;
						height: 44rpx;

						color: #7A7079;
						background-color: #F4F4F4;

						display: flex;
						justify-content: center;
						align-items: center;

						&.more{
							image{
								width: 20rpx;
							}
						}

						&.active{
							color: black;
							font-weight: bold;
						}

					}
				}

				/* K线插件 */
				.chart-shell{
					position: relative;
					padding-right: 24rpx;
					#chart,#chart-loading{
						height: 380rpx;
						margin-top: 16rpx;
					}

					#chart-loading{
						position: absolute;
						width: 100%;
						height: 100%;

						top: 0;
						left: 0;
						
						background-color: white;
						z-index: 100;
					}
				}

				/* 顶部需要渲染tab菜单 */
				&.with-tab-menu{
					border-top-left-radius: 0;
					border-top-right-radius: 0;
				}
			}
		}

		&.k-line-head-2{
			background-image: url('/static/images/58.png');
		}
	}


	/* 注解信息 */
	.tips-row{
		padding-top: 32rpx;
		font-size: 30rpx;
	}

	.n-tab{
		display: flex;
		align-items: center;
		gap: 16rpx;

		.tab-item{
			color: #86909C;
			min-height: 56rpx;
			background-color: #F2F2F2;

			display: flex;
			align-items: center;
			justify-content: center;

			padding: 0 32rpx;
			border-radius: 32rpx;

			&.active{
				color: white;
				background-color: #0182EF;
			}
		}
	}

	.n-card{
		background-color: white;
		border-radius: 16rpx;
		padding: 32rpx;

		color: #272E3B;

		display: flex;
		flex-direction: column;
		gap: 20rpx;

		.row{
			display: flex;
			align-items: center;
			

			.label{
				min-width: 136rpx;
				color: #86909C;
			}
			.value{
				display: flex;
				align-items: center;
			}
		}

	}

	.n-button{
		height: 80rpx !important;
		
		color: white !important;
		border: 2rpx solid #0182EF !important;
		background-color: #0182EF !important;
		font-size: 36rpx !important;

		display: flex;
		justify-content: center;
		padding: 16rpx 0 !important;

		border-radius: 40rpx !important;

		.u-button__text{
			font-size: 36rpx !important;
		}

		&.n-button-3{
			color: #0182EF !important;
			background-color: white !important;
		}

		&.n-button-4{
			padding: 0 28rpx !important;
			.u-button__text{
				font-size: 28rpx !important;
			}
		}

		&.n-button-5{
			color: white !important;
			background-color: #0182EF !important;
			padding: 48rpx 0 !important;

			border-radius: 50rpx !important;
		}

	}

	.n-btn-group{
		display: flex;
		justify-content: space-between;
		align-items: center;

		gap: 44rpx;
		padding: 0 32rpx;

		.n-button{
			height: 96rpx !important;
			border-radius: 48rpx !important;
		}
	}

	.n-upload-box{
		width: 100%;
		background-color: #f9f9f9;
		padding: 90rpx 0;
		font-size: 28rpx;
	}

	.n-table{
		box-sizing: border-box;
		border-left: 2rpx solid rgba(255,255,255,.2);
		tr{
			box-sizing: border-box;
			margin: 0;
			padding: 0;

		}
		th{
			box-sizing: border-box;
			padding: 10rpx;
			margin: 0;

			background: rgba(255,255,255,0.1);
			color: #fff !important;
			// border-left: none;
			// border-right: 1px solid rgba(255,255,255,.1);
		}
		td{
			padding: 24rpx 0;
			color: #fff !important;
			word-wrap: break-word;

			text-align: center;
			border-right: 2rpx solid rgba(255,255,255,.2);

			border-bottom: 2rpx solid rgba(255,255,255,.2);
		}
	}

	.n-table-2{
		border-left: 2rpx solid rgba(255,255,255,.2);
		.th{
			display: flex;
			view{
				flex-shrink: 0;

				padding: 20rpx 10rpx;
				margin: 0;

				background: rgba(255,255,255,0.1);
				color: #fff !important;

				display: flex;
				align-items: center;
				justify-content: center;

				text-align: center;

				border-right: 2rpx solid rgba(255,255,255,.2);

				border-bottom: 2rpx solid rgba(255,255,255,.2);
			}
		}

		.td{
			view{
				flex-shrink: 0;

				padding: 20rpx 10rpx;
				margin: 0;

				color: #fff !important;

				display: flex;
				align-items: center;
				justify-content: center;

				text-align: center;

				border-right: 2rpx solid rgba(255,255,255,.2);
				border-bottom: 2rpx solid rgba(255,255,255,.2);
			}
		}
	}

	.n-fee{
		display: flex;
		font-size: 26rpx;
		padding: 10rpx 24rpx;
		border-radius: 8rpx;

		&.n-fee-pos{
			uni-view{
				color: #5ED47F !important;
			}
			background-color: rgba(94, 212, 127, .1);
		}

		&.n-fee-pos2{
			uni-view{
				color: #FF2732 !important;
			}
			background-color: rgba(255, 39, 50, .1);
		}
	}

	.font-white{
		color: white !important;
	}

	.font-333{
		color: #333;
	}

	.font-gray{
		color: #9B9DA6;
	}

	.font-blue{
		color: #0182EF;
	}

	.font-red{
		color: #FF2732;
	}

	.font-red2{
		color: #FE2F2F;
	}

	.font-green{
		color: #12D148;
	}

	.font-bold{
		font-weight: bold;
	}


	/** 原有样式的重写 */
    .ser_list {
      background-color: white;
      border-radius: 10rpx;
      padding: 10rpx 20rpx;

      margin-top: 32rpx;

      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 3rpx solid #e9e9e9;
        padding: 24rpx 6rpx;

        .left-side{
          font-size: 28rpx;
          color: #222;

          image{
            width: 36rpx;
            height: 36rpx;

            margin-right: 12rpx;
          }
        }

      }

    }

	/** u-view 的样式重写 */
	.u-form{
		/* label */
		.u-form-item__body__left__content__label{
			color: #838282 !important;
			font-size: 30rpx !important;
		}

		/* content */
		.u-input__content{
			background-color: #F9F9F9 !important;
			padding: 20rpx 32rpx;
			margin: 16rpx 0;
			border-radius: 8rpx;
		}

		.u-textarea{
			background-color: #F9F9F9 !important;
		}

		.u-form-item{
			padding-bottom: 10rpx;
		}

		.u-form-item__body{
			padding-bottom: 0;
		}
	}

	.u-upload__wrap__preview{
		.u-upload__wrap__preview__image{
			height: 300rpx !important;
		}
	}
</style>