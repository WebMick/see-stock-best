export default {
    onShareAppMessage(e) {
		let share = {
			title: '全局分享的标题',
			path: '/pages/stock/stock', 
			imageUrl: 'https://cos765.sunwaystech.com/images/equities/product/202112271520162586.png'
		};
		let { from } = e;
		let currentPage = getCurrentPages();
		let { length } = currentPage;
		let { fullPath } = currentPage[length - 1].$page;
		if(from == 'menu'){
			if(fullPath == ''){
				
			}else{
				share.path = fullPath;
			}
		}else{
			let { target: { id } } = e;
			if(id == ''){
				
			}else{
				share.path = fullPath;
			}
		}
		return share;
    },
    onShareTimeline(e) {
		let share = {
			title: '全局分享的标题',
			path: '/pages/stock/stock', 
			imageUrl: 'https://cos765.sunwaystech.com/images/equities/product/202112271520162586.png'
		};
        return share;
    }
}