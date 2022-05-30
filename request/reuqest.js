import { APIROOT, setHeader, randomString, RSAEncrypt, AesEncrypt, Decrypt } from './config'
import store from '../store/store';

const request = ({url, data, method = 'POST', type = 'api', requestType = 'request', encryption = false}) => {
	// 路径处理
	url = APIROOT[type] + url;
	let filePath;
	// 上传的文件 不算入加密中
	if(data && JSON.stringify(data) != '{}'){
		filePath = data.filePath;
		if(filePath){
			delete data.filePath;
		}
	}
	
	// 请求头信息，加密、token、签名等内容处理
	let header = setHeader(data);
	let key;
	if(encryption){
		if(data && JSON.stringify(data) != '{}'){
			key = randomString(32);
			data = {
				param: JSON.stringify(data)
			}
			data = AesEncrypt(JSON.stringify(data), key);
			header.swkey =  RSAEncrypt( key );
			data = {
				param: data
			}
		}
	}else{
		if(data && JSON.stringify(data) != '{}'){
			data = {
				param: JSON.stringify(data)
			};
		}
	}
	// requestType 请求类型不同时，参数有所不同，先处理公共参数，再设置各自参数
	let cParams = {
		url,
		method,
		dataType: "json",
		header,
		enableHttp2: true
	};
	let params = {
		// 网络数据请求
		request: {
			...cParams,
			data
		},
		// 上传文件
		uploadFile: {
			...cParams,
			filePath,
			formData: data,
			name: 'img_file',
		}
	};
	return new Promise((resolve, reject)=>{
		uni[requestType]({
			...params[requestType],
			success: (res) => {
				let { statusCode, data } = res;
				if(statusCode == 200){
					if(encryption){
						data = JSON.parse(Decrypt(data, key ));
						console.log({data});
					}
					let { code } = data;
					if(code != 0){
						let { msg } = data;
						uni.showToast({
							title: msg,
							icon: 'none'
						});
					}
					resolve(data);
				}
				else if(statusCode == 401){
					
				}
				else{
					
				};
			},
			fail: (err) => {
				reject(err);
			}
		})
	});
};

export{
    request
}