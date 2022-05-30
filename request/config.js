import Md5 from "js-md5";
import store from "../store/store";
import aes from './cotAes';
import WxmpRsa from 'wxmp-rsa'

// 测试
const TEST = {
	api: 'http://testequities.sunwaystech.com',
	dot: 'http://testdot.sunwaystech.com',
	wss: 'ws://testews.sunwaystech.com',
	appVersion: '1.3.1'
};
// 预发布
const RELEASE = {
	api: 'http://equities200.sunwaystech.com',
	dot: 'http://dot.sunwaystech.com',
	wss: 'wss://ews.sunwaystech.com',
	appVersion: '1.3.1'
};
// 正式
const PRODUCTION  = {
	api: 'https://equities.sunwaystech.com',
	dot: 'https://dot.sunwaystech.com',
	wss: 'wss://ews.sunwaystech.com',
	appVersion: '1.3.1'
};
let APIROOT = TEST;
if(process.env.NODE_ENV == 'production') APIROOT = PRODUCTION;

const nonceStr  = '5K8264ILTKCH16CQ2502SI8ZNMTM67VS';

/**
 * 设置请求签名
 * param：请求参数
 * timestamp： 时间戳(等于请求头时间戳)
 * key： 秘钥
 * 备注：signObj属性按照字典升序排列
 */
const setSign = (data, timestamp) => {
	let obj = {
		AppVersion: APIROOT.appVersion,
		timestamp
	};
	// 是否有参数
	if(data && JSON.stringify(data) != '{}' ){
		obj.param = JSON.stringify(data);
	}
	// token 加密
	let { v_userInfo }  = store.getters,
		token;
	(JSON.stringify(v_userInfo) != '{}') && (token = v_userInfo.token);
	if(token){
		obj.token = token;
	}
	console.log({obj})
	obj = sortAscii(obj);
	console.log({obj})
	// 生成加密字符串
	let arr = [];
	for(const key in obj){
		arr.push(`${key}=${obj[key]}`);
	};
	arr.push(`key=${nonceStr}`)
	let str = Md5(arr.join('&'));
	return str;
}

// 按照字典升序排列
const sortAscii = (obj) => {
	let arr = new Array();
    let num = 0;
    for (let i in obj) {
      arr[num] = i;
      num++;
    }
    let sortArr = arr.sort();
    let sortObj = {};
    for (let i in sortArr) {
      sortObj[sortArr[i]] = obj[sortArr[i]];
    }
    return sortObj;
}

/**
 * 设置请求头
 * appVersion: 版本号
 * timestamp： 时间戳
 * signature： 签名
 */
const setHeader = (data = {}) => {
	let { appVersion } = APIROOT,
	    timestamp      = new Date().getTime(),
		signature      = setSign(data, timestamp);
	let header = {
		appVersion,
		timestamp,
		signature,
		
	};
	let { v_userInfo }  = store.getters,
		token;
	(JSON.stringify(v_userInfo) != '{}') && (token = v_userInfo.token);
	(token) && (header = { ...header, token });
	return header;
};

/** 随便机生成 n 位的字符串 */
const randomString = (n) =>  {  
    let str = 'abcdefghijklmnopqrstuvwxyz9876543210';
    let tmp = '',
        i = 0,
        l = str.length;
    for (i = 0; i < n; i++) {
        tmp += str.charAt(Math.floor(Math.random() * l));
    }
    return tmp;
}

/**
 * 设置加密的key
 */
const environment = () => {
	let key = '-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq6iqY3QR+DedPkgBot6Z88XhWZ+EGf+659YjnXLJ5Jwar+NHk88qg3aFTd9k3M1ZDWYNuDxOisoKvASXUx6QORwmeHuuYrP49hx2Cq0vGD2/kXSXdoZPM4JpeSd2HzmgnjTQXoc9VY057iio9OqsLMd3RpqzfMTZk/RMrzMqWi5UIvqXrBwaPEScBMSCyemOYQMVwGPKH+HpYTQzPlfh2OvfKcnZ4IyNrmNZ1PkNQY8WDGCR61GFzxY/cUXBp11Gg93Z1yqd3q37Gk19e0PEMYhxBWwLmZMxNZSY5paR/hB5p0tFFfJRs1LqZ5vpLxQpAa6SZcVbQ4+KuONnrvmoLQIDAQAB-----END PUBLIC KEY-----';
	return key;
};

/**
 * 数据加密 -- RSA
 */
const RSAEncrypt = (key) => {
	const rsa = new WxmpRsa()
	rsa.setPublicKey( environment() )
	const cryptStr = rsa.encryptLong( JSON.stringify(key) )
	return cryptStr;
}

/**
 * 数据加密 -- aes
 */
const AesEncrypt = (params, oKey) => {
	const key = aes.enc.Utf8.parse(oKey);
	const iv = aes.enc.Utf8.parse( oKey.slice(0,16) );
	let srcs = aes.enc.Utf8.parse( params );
	let encrypted = aes.AES.encrypt(srcs, key, { iv: iv, mode: aes.mode.CBC, padding: aes.pad.Pkcs7 });
	return encrypted.toString();
}

/**
 * 数据解密 - aes
 */
const Decrypt = (SECRET, oKey) => {
	const key = aes.enc.Utf8.parse(oKey);
	const iv = aes.enc.Utf8.parse( oKey.slice(0,16) );
	let decrypt = aes.AES.decrypt(SECRET, key, { iv: iv, mode: aes.mode.CBC, padding: aes.pad.Pkcs7 });
	let decryptedStr = decrypt.toString(aes.enc.Utf8);
	return decryptedStr.toString();
}



export {
	APIROOT,
	setHeader,
	randomString,
	environment,
	RSAEncrypt,
	AesEncrypt,
	Decrypt
}