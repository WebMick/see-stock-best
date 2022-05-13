import store from "../store/store.js";
import { objIsNull } from '../utils/utils.js'
// 数据缓存
const storage = () => {
	const set = (key, value) => {
		try{
			uni.setStorageSync(key, value);
		}catch(err){
			uni.showToast({
				title: `设置缓存 ${key} 失败，请重试！`
			})
		}
	};
	const get = (key) => {
		try{
			let value = uni.getStorageSync(key);
			return value;
		}catch(err){
			uni.showToast({
				title: `获取缓存 ${key} 失败，请重试！`
			})
		}
	};
	const remove = (key) => {
		try{
			 uni.removeStorageSync(key);
		}catch(err){
			uni.showToast({
				title: `删除缓存 ${key} 失败，请重试！`
			})
		}
	};
	const clear = () => {
		try{
			 uni.clearStorageSync();
		}catch(err){
			uni.showToast({
				title: `清空缓存失败，请重试！`
			})
		}
	};
	return {
		set,
		get,
		remove,
		clear
	}
};


// 系统信息、胶囊信息
const getSystemInfo = () => {
	return new Promise((resolve, reject) => {
		uni.getSystemInfo({
			success: (systemInfo) => {
				let menuBtnInfo = uni.getMenuButtonBoundingClientRect();
				let { statusBarHeight, platform } = systemInfo;
				let { top, bottom} = menuBtnInfo;
				let navBarHeight = top + bottom - statusBarHeight;
				console.log({store})
				store.commit('setStoreData', {
					key: ['v_systemInfo', 'v_menuBtnInfo', 'v_navBarHeight', 'v_platform', 'v_statusBarHeight'],
					data: [systemInfo, menuBtnInfo, navBarHeight, platform, statusBarHeight],
					setStorage: true
				});
				resolve(systemInfo);
			},
			fail: (err) => {
				uni.showToast({
					title: `获取设备信息失败，请重试！`
				})
				reject(err);
			}
		});
	})
}

// 获取网络状态
const getNetworkType = () =>{
	return new Promise((resolve, reject) => {
		uni.getNetworkType({
			success: (res) => {
				let { networkType } = res;
				store.commit('setStoreData', {
					key: 'v_networkType',
					data: networkType
				});
				resolve(res);
			},
			fail: (err) => {
				reject(err);
			}
		})
	});
};

/**
 * 页面路由跳转
 * url: 页面路径
 * params: 页面跳转携带参数
 * type: 跳转类型
 */
const navTo = ({that, url, params = {}, type = 'navigateTo'}) => {
	let lastRoute = that ? (that.__route__ ? that.__route__ : that.$parent.__route__) : ''; // 跳转前的路径
	// 参数处理
	let query = '';
	// tab页面不能携带参数
	if(type != 'switchTab' && !objIsNull(params)){
		for(let k in params){
			let val = params[k] ? params[k] : '';
			query += '&' + k + '=' + encodeURIComponent(val);
		}
		query = query ? query.substring(1) : '';
		// 地址拼接
		url += (url.indexOf('?') < 0 ? '?' : '&') + query;
	};
	const nav = () => {
		uni[type]({
			url,
			success: (res)=>{
				console.log(`成功离开：${lastRoute}, 进入：${url}`)
				console.log({res})
			},
			fail: (err)=>{
				console.log({err})
			},
			complete: (com)=>{
				console.log({com})
			}
		});
	};
	nav();
	// 防抖处理
	// uni.$u.debounce(nav, 500);
};

const uniApi = {
	storage,
	getSystemInfo,
	getNetworkType,
	navTo
}

export{
	uniApi
}