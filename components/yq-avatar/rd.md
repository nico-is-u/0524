|属性	|必须	|类型	|说明								|
|:-:|:-:|:-:|:-:								|
|selWidth	|是	|string	|裁剪区域的宽，单位px或upx			|
|selHeight	|是	|string	|裁剪区域的高，单位px或upx			|
|noTab	|否	|bool	|是否存在tabBar，默认false，即有tabBar。支付宝小程序必须填写，不然无法运行|
|avatarSrc	|否	|string	|头像地址							|
|avatarStyle	|否	|object	|头像样式，默认{width: 150upx; height: 150upx; border-radius: 100%;}|
|bgImg	|否	|string	|剪切背景图片，默认黑色背景			|
|expWidth	|否	|string	|设置导出图片宽度。默认值selWidth*屏幕像素密度，单位px或upx|
|expHeight	|否	|string	|设置导出图片高度。默认值selHeight*屏幕像素密度，单位px或upx|
|inner	|否	|bool	|只允许在图片范围内移动，并禁用一切旋转，默认false|
|quality	|否	|number	|生成图片质量，取值范围0~1，默认1	|
|index	|否	|any	|索引，回调upload方法，返回该index值，默认undefined|
|fileType	|否	|string	|报错图片格式，jpg或png，默认png。	|
|minScale	|否	|number	|缩放允许的最小比例，默认0.3		|
|maxScale	|否	|number	|缩放允许的最大比例，默认4			|
|canRotate	|否	|bool	|是否允许旋转，默认true				|
|canScale	|否	|bool	|是否允许缩放，默认true				|
|stretch	|否	|string	|图片一边自动铺满裁剪框				|
|x: x轴方向，图片自动铺满			|
|y: y轴方向，图片自动铺满			|
|long: 根据图片长边自动铺满			|
|short: 根据图片短边自动铺满		|
|longSel: 根据裁剪框长边自动铺满	|
|shortSel: 根据裁剪框短边自动铺满	|
|lock	|否	|string	|锁定图片移动方向					|
|x: 锁定x轴方向						|
|y: 锁定y轴方向						|
|long: 锁定图片长边方向				|
|short: 锁定图片短边方向			|
|longSel: 锁定裁剪框长边方向		|
|shortSel: 锁定裁剪框短边方向		|