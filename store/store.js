import Vue from 'vue';
import Vuex from 'vuex';
import { objIsNull } from '@/utils/utils.js';
import { uniApi } from '@/uniApi/uniApi.js';


// state字段统一 v_ 开头
const state = {
	v_userInfo: {}, // 用户信息
	v_config: {}, // 配置信息
	v_systemInfo: {}, // 设备信息
	v_menuBtnInfo: {}, // 胶囊信息
	v_navBarHeight: '',  // 自定义头部高度
	v_statusBarHeight: '', // 状态栏高度
	v_platform: '', // 客户端平台类型 ios、android、mac（3.1.10+）、windows（3.1.10+）、linux（3.1.10+）
	v_networkType: '', // 网络状态
	v_wsStatus: {},  // ws 数据推送状态
};

const getters = {
	v_userInfo: state => {
		let userInfo = uniApi.storage().get('v_userInfo');
		let { v_userInfo } = state;
		return objIsNull(v_userInfo) ? userInfo : v_userInfo;
	},
	v_config: state => {
		let config = uniApi.storage().get('v_config');
		let { v_config } = state;
		return objIsNull(v_config) ? config : v_config;
	},
	v_systemInfo: state => {
		let systemInfo = uniApi.storage().get('v_systemInfo');
		let { v_systemInfo } = state;
		return objIsNull(v_systemInfo) ? systemInfo : v_systemInfo;
	},
	v_menuBtnInfo: state => {
		let menuBtnInfo = uniApi.storage().get('v_menuBtnInfo');
		let { v_menuBtnInfo } = state;
		return objIsNull(v_menuBtnInfo) ? menuBtnInfo : v_menuBtnInfo;
	},
	v_navBarHeight: state => {
		let navBarHeight = uniApi.storage().get('v_navBarHeight');
		let { v_navBarHeight } = state;
		return v_navBarHeight || navBarHeight;
	},
	v_statusBarHeight: state => {
		let statusBarHeight = uniApi.storage().get('v_statusBarHeight');
		let { v_statusBarHeight } = state;
		return v_statusBarHeight || statusBarHeight;
	},
	v_platform: state => {
		let platform = uniApi.storage().get('v_platform');
		let { v_platform } = state;
		return v_platform || platform;
	},
	v_networkType: state => state.v_networkType,
	v_wsStatus: state => state.v_wsStatus,
	
};

const mutations = {
	/**
	 * params:       Object
	 * params.key:   String | Array 
	 * params.data:  String | Array 
	 * params.setStorage: Boolean 是否设置到缓存
	 * */
	setStoreData (state, params) {
		let {key, data, setStorage = false} = params;
		if(Array.isArray(key) && Array.isArray(data)){
			key.map((item, index) => {
				let storeData = typeof data[index] == Object ? JSON.stringify(data[index]) : data[index];
				setStorage && uniApi.storage().set(item, storeData)
				state[item] = data[index];
			});
			return;
		}
		let storeData = typeof data == Object ? JSON.stringify(data) : data;
		setStorage && uniApi.storage().set(key, storeData);
		state[key] = data;
	}
};

Vue.use(Vuex);

export default new Vuex.Store({
	state,
	mutations,
	getters
});