import { request } from "./reuqest.js";
// 登录
const login = async (data) => {
	let result = await uni.login();
	if(result && result.length){
		let { code } = result[1];
		data = {
			wxcode: code,
			...data
		};
		return request({
			url: '/login',
			data
		});
	}
	return false;
}

// 配置
const config = () => {
	return request({
		url: '/config'
	});
}

// 自选列表
const stockList = (data) => {
	return request({
		url: '/favor/list',
		method: 'GET',
		data
	})
};

// 浏览记录
const historyList = (data) => {
	return request({
		url: '/favor/history/detail/list',
		method: 'GET',
		data
	})
};

// 竞猜
const guessHandle = (data) => {
	return request({
		url: '/guess/handle',
		data
	})
};

// 首页数据
const homeData = (data) => {
	return request({
		url: '/home',
		data
	})
};

// 竞猜池
const guessNewPool = (data) => {
	return request({
		url: '/guess/new/pool',
		data
	})
};

// 周竞猜列表
const weekGuessList = (data) => {
	return request({
		url: '/favor/new/list',
		method: 'GET',
		data
	})
}

// 周竞猜记录
const weekGuessCurren = () => {
	return request({
		url: '/week/guess/current/record',
		method: 'GET'
	})
};

// 周竞猜
const weekGuessHandle = (data) => {
	return request({
		url: '/week/guess/handle',
		data
	})
}

// 市场
const equityMarket = () => {
	return request({
		url: '/equity/market',
		method: 'GET'
	})
}

// 文章列表
const articlesList = (data) => {
	return request({
		url: '/articles/list',
		data,
		encryption: true
	})
}

// 线索列表
const cluesList = (data) => {
	return request({
		url: '/clues/list',
		data,
		encryption: true
	})
}
// 详情
const equitySecurityInfo = (data) => {
	return request({
		url: '/equity/security/info',
		data
	})
}

// 五日走势 数据/

const equityFiveKlineSix = (data) => {
	return request({
		url: '/equity/five/kline/six', 
		data
	})
}


// 日K 周K 月K 数据
const equityTickerKline = (data) => {
	return request({
		url: '/equity/ticker/kline', 
		data
	})
}

// 
const equityBigInfo = (data) => {
	return request({
		url: '/equity/big/info', 
		data
	})
}

const equityBriefInfo = (data) => {
	return request({
		url: '/equity/brief/info', 
		data
	})
}

const equityNewsList = (data) => {
	return request({
		url: '/equity/news/list', 
		data,
		method: 'GET'
	})
}

const companyBulletinList = (data) => {
	return request({
		url: '/company/bulletin/list', 
		data,
		method: 'GET'
	})
}

const favorHistoryDetailDel = (data) => {
	return request({
		url: '/favor/history/detailDel', 
		data
	})
}

const cluesAction = (data) => {
	return request({
		url: '/clues/action', 
		data,
		encryption: true
	})
}

// 成分股
const equityConstituentStockList = (data) => {
	return request({
		url: '/equity/constituent/stock/list', 
		data,
		method: 'GET'
	})
}

// 笔记 
const equityNoteList = (data) => {
	return request({
		url: '/equity/note/list', 
		data
	})
}



const api = {
	login,
	config,
	stockList,
	historyList,
	guessHandle,
	homeData,
	guessNewPool,
	weekGuessCurren,
	weekGuessList,
	weekGuessHandle,
	equityMarket,
	articlesList,
	cluesList,
	equitySecurityInfo,
	equityFiveKlineSix,
	equityTickerKline,
	equityBigInfo,
	equityBriefInfo,
	equityNewsList,
	companyBulletinList,
	favorHistoryDetailDel,
	cluesAction,
	equityConstituentStockList,
	equityNoteList
}

export{
	api
}