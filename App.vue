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

			.u-upload__wrap{
				>uni-view{
					width: 100%;
				}
			}

			.card-list-type-2{
				padding: 0 12rpx;
			}

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

	.menu-card{
		background-color: rgba(255,255,255,.8);
		border-radius: 16rpx;
		box-shadow: 0px 8rpx 32rpx 0px rgba(0,56,121,0.03);

		display: flex;
		justify-content: space-between;
		align-items: center;

		padding: 0 32rpx;

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
		color: white;
		background-color: #0182EF;
		font-size: 36rpx;

		display: flex;
		justify-content: center;
		padding: 16rpx 0;

		border-radius: 40rpx;
	}

	.n-upload-box{
		width: 100%;
		background-color: #f9f9f9;
		padding: 90rpx 0;
		font-size: 28rpx;
	}

	.font-blue{
		color: #0182EF;
	}

	.font-red{
		color: #FF2732;
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
	}

</style>