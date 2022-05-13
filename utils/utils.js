import store from '../store/store.js';

const objIsNull = (obj) => {
	let bol = !obj || JSON.stringify(obj) == "{}";
	return bol;
};

/**
 * 设置字体颜色class
 * */
const setClass = (val, min = 0) => {
	val = Number(val);
	min = Number(min);
	let className = val > min ? 'textUp' : (val == min ? 'textFlat' : 'textDown');
	return className;
}

/**
 * cdn 图片地址拼接
 */
const imgUrl = (path) => {
	let { v_config: { icon_cdn } } = store.getters;
	return icon_cdn && path ? `${icon_cdn}/${path}` : '';
}

/**
 * 数字设置+号
 **/
const setAddSymbol = (num = 0) => {
	num = num > 0 ? `+${num}` : `${num}`;
	return num || '--';
}

const toPlusFixed = (val, len) => {
	let tempNum = 0, 
		s, 
		temp,
		str = val + '';
	let start = str.indexOf('.');
	if(str.substr(start + len + 1, 1) >= 5){
		tempNum = 1;
	}
	temp = Math.pow(10, len);
	s = Math.floor(val * temp) + tempNum;
	return s / temp;
}

export{
	objIsNull,
	setClass,
	imgUrl,
	setAddSymbol,
	toPlusFixed
}