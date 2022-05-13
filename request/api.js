import { request } from "./reuqest.js"
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

const config = () => {
	return request({
		url: '/config'
	});
}

const stockList = (data) => {
	return request({
		url: '/favor/list',
		method: 'GET',
		data
	})
};


const historyList = (data) => {
	return request({
		url: '/favor/history/detail/list',
		method: 'GET',
		data
	})
};

const guessHandle = (data) => {
	return request({
		url: '/guess/handle',
		data
	})
};

const homeData = (data) => {
	return request({
		url: '/home',
		data
	})
};

const guessNewPool = (data) => {
	return request({
		url: '/guess/new/pool',
		data
	})
};

const weekGuessList = (data) => {
	return request({
		url: '/favor/new/list',
		method: 'GET',
		data
	})
}

const weekGuessCurren = () => {
	return request({
		url: '/week/guess/current/record',
		method: 'GET'
	})
};


const weekGuessHandle = (data) => {
	return request({
		url: '/week/guess/handle',
		data
	})
}

const equityMarket = () => {
	return request({
		url: '/equity/market',
		method: 'GET'
	})
}

const articlesList = (data) => {
	return request({
		url: '/articles/list',
		data,
		encryption: true
	})
}

const cluesList = (data) => {
	return request({
		url: '/clues/list',
		data,
		encryption: true
	})
}

const openRedEven = () => {
	return request({
		url: '/user/open/guess/red/package'
	})
}

const redDebrisClose = () => {
	return request({
		url: '/red/debris/close'
	})
}

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
	openRedEven,
	redDebrisClose,
	equitySecurityInfo,
	equityFiveKlineSix,
	equityTickerKline,
	equityBigInfo,
	equityBriefInfo,
	equityNewsList,
	companyBulletinList
}

export{
	api
}