var undefined;

import CryptoJS from 'crypto-js'
import AUX_Audio from 'LOCKED.js'
const DevelopmenType = undefined,
  customUnlock_k = AUX_Audio.fewagfagretgataGRGvreawdwafewaf;

if (DevelopmenType in window && DevelopmenType == "undefined")
  var x = require('aem.js'),
    y,
    x, x, x, x, x, x, y = x + !x;
else
  y = x + !x, void(0);

function encryptCBC(word, keyStr, ivStr) {
  keyStr = keyStr ? keyStr : customUnlock_k;
  ivStr = ivStr ? ivStr : customUnlock_k;
  let key = CryptoJS.enc.Utf8.parse(keyStr);
  let iv = CryptoJS.enc.Utf8.parse(ivStr);
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

function decryptCBC(word, keyStr, ivStr) {
  keyStr = keyStr ? keyStr : customUnlock_k;
  ivStr = ivStr ? ivStr : customUnlock_k;
  var key = CryptoJS.enc.Utf8.parse(keyStr);
  let iv = CryptoJS.enc.Utf8.parse(ivStr);
  let decrypt = CryptoJS.AES.decrypt(word, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypt.toString(CryptoJS.enc.Utf8);
}

function encrypt(content, keyStr) {
  var sKey = CryptoJS.enc.Utf8.parse(keyStr);
  var sContent = CryptoJS.enc.Utf8.parse(content);
  var encrypted = CryptoJS.AES.encrypt(sContent, sKey, {
    iv: '0000000000000000',
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

function decrypt(content, keyStr) {
  var sKey = CryptoJS.enc.Utf8.parse(keyStr);
  var decrypt = CryptoJS.AES.decrypt(content, sKey, {
    iv: '0000000000000000',
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

/* 测试加密 */
console.log(encryptCBC("yun/hold"))

var
  api_index = 0,
  api = '',
  api_list = [],
  def_api_list = ['https://api.zcxjh.com/'],
  def_api = false,
  // def_api_list = [
  //   'https://api.kabapa.com/',
  //   'https://api.dezete.com/',
  //   'https://api.dezege.com/',
  //   'https://api.cedehe.com/',
  // ],
  oss_list = [
    // 'https://sadasdax.oss-cn-beijing.aliyuncs.com/1675bjxjckfym.txt',
    // 'https://cvcvzwdw.oss-rg-china-mainland.aliyuncs.com/fshufh1675ym.txt',
    // 'https://cbcbcbcb.oss-rg-china-mainland.aliyuncs.com/wu1654zzzym.txt',
    // 'https://sfsfsf.oss-cn-zhangjiakou.aliyuncs.com/zjkyouyou1654ym.txt',
    // 'https://jkjkjklllll.oss-cn-qingdao.aliyuncs.com/qdqdyou1656ym.txt',
    // 'https://dasdaddsfs.oss-rg-china-mainland.aliyuncs.com/d1656dfbwuym.txt',

    // 'https://niubei.fanglkj.com/gf888ym.txt',
    // 'https://ossqny.yjtno.com/gf888ym.txt',
  ],
  oss_index = 0

export default {
  www: (a, b = {}, c = 'GET', d) => new Promise((resolve, reject) => {
    // console.log(a, 'a');
    async function getApiFn() {
      // console.log('step1：[Request]. Get ciphertext.');
      console.log(oss_index, oss_list[oss_index]);
      uni.request({
        /* 按顺序使用 */
        url: oss_list[oss_index],
        /* 阿里云OSS
        // https://e1652mydysx.oss-rg-china-mainland.aliyuncs.com/e1652dauyfaaapi.txt
        // https://e1652mydysx.oss-rg-china-mainland.aliyuncs.com/e1652ymyrrym.txt
        // https://ydysxe1652.oss-cn-shenzhen.aliyuncs.com/e1652szuyfaaapi.txt
        // https://ydysxe1652.oss-cn-shenzhen.aliyuncs.com/e1652szmymyrrym.txt
        https://wsxy1908wsx.oss-rg-china-mainland.aliyuncs.com/y1908dauyfaaapi.txt
        https://wsxy1908wsx.oss-rg-china-mainland.aliyuncs.com/y1908mymyrrym.txt
        https://ysxy1908ysx.oss-cn-hangzhou.aliyuncs.com/y1908hzuyfaaapi.txt
        https://ysxy1908ysx.oss-cn-hangzhou.aliyuncs.com/y1908hzmymyrrym.txt
        https://m1656jswsxwsx.oss-rg-china-mainland.aliyuncs.com/m1656wsxapi.txt
        https://m1656jswsxwsx.oss-rg-china-mainland.aliyuncs.com/m1656wsxym.txt
        https://dysxm1656.oss-cn-qingdao.aliyuncs.com/m1656qdjytyapi.txt
        https://dysxm1656.oss-cn-qingdao.aliyuncs.com/m1656qdopgym.txt
        https://e1652mydysx.oss-rg-china-mainland.aliyuncs.com/e1652dauyfaaapi.txt
        https://e1652mydysx.oss-rg-china-mainland.aliyuncs.com/e1652ymyrrym.txt
        https://ydysxe1652.oss-cn-shenzhen.aliyuncs.com/e1652szuyfaaapi.txt
        https://ydysxe1652.oss-cn-shenzhen.aliyuncs.com/e1652szmymyrrym.txt
        七牛云OSS
        https://ossqny.yjtno.com/gf888ym.txt
        https://ossqny.yjtno.com/gf666api.txt
        https://niubei.fanglkj.com/gf666api.txt
        https://niubei.fanglkj.com/gf888ym.txt
        https://niudehua.mygcsm.com/gf666api.txt
        https://niudehua.mygcsm.com/gf888ym.txt */
        /* 
         https://ossqny.yjtno.com/gf888ym.txt
         https://niubei.fanglkj.com/gf888ym.txt
         https://niudehua.mygcsm.com/sadasdsym.txt
         https://fhdsaiah.zabeiz.com/sadasdsym.txt
         https://fvijvidvi.oss-rg-china-mainland.aliyuncs.com/ewrwym68.txt
         https://980fdasas.oss-rg-china-mainland.aliyuncs.com/rfgd98ym.txt
         https://666dsadxx.oss-rg-china-mainland.aliyuncs.com/dym66ym.txt
         
         */
        method: "GET",
        header: {
          "content-type": "multipart/form-data"
        },
        success(www) {
          var data;
          try {
            data = decrypt(www.data, 'zOEnsWQi')
            console.log(data);
            data = data.split(',')
            // console.log("首次启动，检测可用接口");
            // console.log('调用OSS成功');
            // console.log("密文：",www.data);
            // console.log(data);
          } catch (e) {
            data = []
          }
          if (data.length > 1) {
            console.log('设置加密接口成功');
            // console.log(data,data.length);
            api_list = data;
            netTest()
            // api_list = def_api_list;
          } else {
            if (oss_index >= oss_list.length - 1) {
              // consol.log('解密失败设置，已设置默认接口');
              api_list = def_api_list;
              netTest()
            } else {
              oss_index = oss_index + 1
              api_index = 0
              getApiFn()
            }
          }
        },
        fail() {
          console.log('访问失败设置默认');
          if (oss_index >= oss_list.length - 1) {
            // consol.log('解密失败设置，已设置默认接口');
            api_list = def_api_list;
            netTest()
          } else {
            oss_index = oss_index + 1
            api_index = 0
            getApiFn()
          }
        }
      })

      function netTest() {
        let _ = this;
        console.log('step2：[Await]. Testing connectivity.');
        uni.request({
          url: api_list[api_index] + 'common/test',
          method: "POST",
          success: (res) => {
            // console.log("返回的密文",res.data.c);
            // console.log("解密密文",decryptCBC(res.data.c));
            try {
              if (JSON.parse(decryptCBC(res.data.c)).data.test) {
                // if (res.data.data.test) {
                /* 缓存能用的接口 */
                uni.setStorage({
                  data: api_list[api_index],
                  key: "ok_api"
                })
                /* 设置能用的接口 */
                api = api_list[api_index];
                console.log('step3：[Success]. Server connected.');
                NetTo()
              }
            } catch (e) {
              console.log("重试接口，第" + api_index + ' / 共' + (api_list.length - 1) +
                '个接口');
              if (!def_api) {
                if (api_index >= api_list.length - 1) {
                  if (oss_index >= oss_list.length - 1) {
                    // oss都不可用时走兜底域名
                    def_api = true
                    api_list = def_api_list
                    api_index = 0
                    netTest()
                  } else {
                    oss_index = oss_index + 1
                    api_index = 0
                    getApiFn()
                  }
                } else {
                  api_index++;
                  // console.log('[Try again]' + api_list[api_index]);
                  netTest()
                }
              } else {
                if (api_index >= api_list.length - 1) {
                  uni.showModal({
                    title: '系统提示',
                    content: '系统繁忙，请稍后再试',
                    showCancel: false,
                    confirmColor: '#c03328',
                    success(res) {
                      if (res.confirm) {
                        api_index = 0
                        uni.clearStorage();
                        uni.reLaunch({
                          url: '/pages/system-page/login'
                        })
                      }
                    }
                  })
                } else {
                  api_index++
                  netTest()
                }
              }
            }

          },
          fail: (err) => {
            console.log('apiindex,ossindex', def_api, api_index, oss_index, api_list.length);
            if (!def_api) {
              if (api_index >= api_list.length - 1) {
                // 所有oss和兜底域名都不可用时
                if (oss_index >= oss_list.length - 1) {
                  // oss都不可用时走兜底域名
                  def_api = true
                  api_list = def_api_list
                  api_index = 0
                  netTest()
                } else {
                  oss_index = oss_index + 1
                  api_index = 0
                  getApiFn()
                }
              } else {
                api_index++;
                // console.log('[Try again]' + api_index);
                netTest()
              }
            } else {
              if (api_index >= api_list.length - 1) {
                uni.showModal({
                  title: '系统提示',
                  content: '系统繁忙，请稍后再试',
                  showCancel: false,
                  confirmColor: '#c03328',
                  success(res) {
                    if (res.confirm) {
                      api_index = 0
                      uni.clearStorage();
                      uni.reLaunch({
                        url: '/pages/system-page/login'
                      })
                    }
                  }
                })
              } else {
                api_index++
                netTest()
              }
            }
          }
        });
      }
    }

    function NetTo() {
      // console.log('step3：request');
      var UT;
      try {
        UT = uni.getStorageSync("TK")
      } catch (e) {
        UT = ''
      };
      let ME = c == 'p' ? 'POST' : 'GET'
      let header = {
        "content-type": d == 'p' ? "application/json" : d == 'file' ? 'multipart/form-data' : d ==
          'text' ? "text/html" : "application/x-www-form-urlencoded",
        token: UT
      };
      if (
        typeof y ===
        'undefined'
      )
        return void(0);
      var ウホア = decryptCBC(a);
	  if(d == 'file'){
		  
	  	uni.uploadFile({
	  		url: `${api}` +ウホア,
	  		filePath: b,
	  		header: {token: UT},
	  		name: 'file',
	  		success: (res) => {
	  			let parseRes = JSON.parse(decryptCBC(JSON.parse(res.data).c));
				if (api.indexOf('api.zcxjh.com') > -1) {
					console.log(parseRes);
					console.log(ウホア)
				}
	  			if (parseRes.code == 200) {
	  				resolve(parseRes.data);
	  			} else{
	  				uni.showToast({
	  					title: parseRes.msg,
	  					icon: 'none'
	  				});
	  				reject(parseRes.code);
	  			}
	  		}
	  	});
	  }else{
		  uni.request({
			url: `${api}` +
			  ウホア,
			data: {
			  d: b == {} || b == '' ? '' : encryptCBC(JSON.stringify(b))
			},
			// data: b,
			method: ME,
			header: header,
			success: res => {
			  let parseRes = res.data;
			  try {
				parseRes = JSON.parse(decryptCBC(res.data.c));
			  } catch (e) {
				parseRes = {
				  code: -1,
				  msg: 'decrypt err'
				}
				parseRes = decryptCBC(res.data.c)
			  }
			  if (api.indexOf('api.zcxjh.com') > -1) {
				console.log(ウホア,parseRes);
			  }

			  // console.log(parseRes);

			  if (parseRes.code == 200) {
				  resolve(parseRes);
        }else if(parseRes.code == 401){
          uni.showToast({
            title: parseRes.msg,
            icon: 'none'
          });

          uni.removeStorageSync('TK')
          uni.removeStorageSync('user_info')
          uni.redirectTo({
            url: '/pages/system-page/login'
          })

        
			  } else if (parseRes.code == 403) {
				uni.clearStorage();
				uni.reLaunch({
				  url: '/pages/system-page/login'
				})
			  } else if (parseRes.code == 10090) {
          uni.showToast({
            title: parseRes.msg,
            icon: 'none'
          });
          reject(parseRes)
			  } else if (parseRes.code == 10000) {
				uni.showToast({
				  title: parseRes.msg,
				  icon: 'none'
				});
				reject(parseRes)
			  } else if (parseRes.code == 10001 || parseRes.code == 10002) {
				// console.log(encryptCBC(JSON.stringify(b)));
				// console.log(decryptCBC(encryptCBC(JSON.stringify(b))));
				// console.log(b);
				reject(parseRes)
				uni.showToast({
				  title: parseRes.msg,
				  icon: 'none'
				});
			  } else if (parseRes.code === -1) {
				// 解密失败
				api_index = 0
				getApiFn()
			  } else {
				reject(parseRes)
			  }
			},
			fail: err => {
			  if (err.errMsg === "request:fail") {
				api_index = 0
				getApiFn()
				return
			  }
			  uni.showToast({
				title: err,
				icon: 'none'
			  })
			  reject(err);
			},
			complete: (comp) => {}
		  })
		}
    }
    if (uni.getStorageSync("ok_api")) {
      api = uni.getStorageSync("ok_api");
      NetTo()
    } else {
      getApiFn()
    }
  })
}


// 测试解密
const c = 'FzwyuDMFeLUpYACr0EzRDhnlbmdPUqSbrtw1QX0wHhze830l6VVjECSPBVVVbdy3OWqGRIb4CxQpHomv9W0s8g=='
console.log('c',JSON.parse(decryptCBC(c)))