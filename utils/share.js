export default {
    onShareAppMessage(e) {
		
		// 获取当前路由信息
		let currentPage = getCurrentPages();
		let { length } = currentPage;
		let { fullPath } = currentPage[length - 1].$page;
		
		// 获取按钮信息
		let { from, target = { } } = e;
		let { dataset = {}, id } = target;
		let { params = {} } = dataset; // button data-params 参数
		// 是否设置了分享地址，没设置选取当前页面地址
		let { 
			title = '微信看股神器, 独家量化大数据' ,
			path = fullPath, 
			imageUrl = 'https://cos765.sunwaystech.com/images/equities/product/202201111110136799.png',
		} = params;
		
		// 条件处理，第一步按 触发场景分类： 顶部菜单、button按钮
		// 顶部菜单：按当前页面路由处理
		// button按钮： 按按钮id处理
		if(from == 'menu'){
			if(fullPath == ''){
				
			}
		}else{
			if(id == 'fabShare'){
				let { name, minuteNewPrice, path } = params;
				let { length } = minuteNewPrice;
				let ratio = minuteNewPrice[length - 1];
				let price = minuteNewPrice[1];
				title = `我正在看[${name}](${price}  ${ratio}%)`
			}
		}
		return {
			title,
			path,
			imageUrl
		};
    },
    onShareTimeline(e) {
		let share = {
			title: '微信看股神器, 独家量化大数据',
			path: '/pages/stock/stock', 
			imageUrl: 'https://cos765.sunwaystech.com/images/equities/product/202201111110136799.png'
		};
        return share;
    }
}