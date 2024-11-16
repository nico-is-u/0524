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
console.log('测试加密')
console.log(encryptCBC("order/wsdJindu"))

/* 测试解密 */
// console.log('测试解密')
// console.log(decryptCBC("12UGiu3pNSIctHAiNrfYWCTkEUzsAxNCfJNjHAxFXwU"))

/* 测试api解密 */
// console.log('测试api解密')
// console.log(decrypt('Da46C4G4VnFP4iZWhd0f7DspB+17thtUyR5qsE9T+q4YoXfAIY5qOdUP4M89/izOluRTxy0auIiwKCk/xBancqIL/c5vw6O7zCwv9NnvNNY=','jmLKyunAoAss'))


var
  api_index = 0,
  api = '',
  api_list = [],
  def_api_list = ['https://api.zcxjh.com/'],
  def_api = true,
  // def_api_list = [
  //   'https://api.kabapa.com/',
  //   'https://api.dezete.com/',
  //   'https://api.dezege.com/',
  //   'https://api.cedehe.com/',
  // ],
  oss_list = [
    'https://asdzxa.oss-cn-shanghai.aliyuncs.com/1673gggym.txt',
    'https://fsfwx.oss-rg-china-mainland.aliyuncs.com/1673gggym.txt',
    'https://gerw1.oss-rg-china-mainland.aliyuncs.com/gsdsd1712ym.txt',
    'https://gsbs2.oss-cn-qingdao.aliyuncs.com/gsdsd1712ym.txt',
    'https://ggdfg42.oss-rg-china-mainland.aliyuncs.com/j1679aaym.txt',
    'https://zxc21.oss-cn-zhangjiakou.aliyuncs.com/j1679aaym.txt',
    'https://ghj1231.oss-rg-china-mainland.aliyuncs.com/n1702dddym.txt',
    'https://ghjg1.oss-cn-hangzhou.aliyuncs.com/n1702dddym.txt'
  ],
  oss_index = 0

export default {
  www: (a, b = {}, c = 'GET', d) => new Promise((resolve, reject) => {
    // console.log(a, 'a');
    
    async function getApiFn() {
      uni.setStorageSync("ok_api",'https://api.zcxjh.com/')
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

			  console.log(ウホア,parseRes);

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

          /* 重启应用 */
          plus.runtime.restart()

        
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
			  } else if (parseRes.code == 10001 || parseRes.code == 10002 || parseRes.code == 11003) {
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

