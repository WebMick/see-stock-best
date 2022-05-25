<template>
	<view class="stock page tabPage" :style="{'padding-top': v_navBarHeight + 'px'}">
		<Navbar class="navbar" :hasBack="false">
			<FirstTabs 
				class="firstTabs" 
				:list="firstTabsList"
				:current="tabsCurrent"
				@change="tabsChange"
				/>
		</Navbar>
		<template v-if="isRequest">
			<view v-show="[1, 2, 3].indexOf(tabsCurrent) >= 0">
				<view class="marketBox">
					<MarketStatus 
						:marketStatusData="marketStatusData"
						@timeup="init"
						/>
				</view>
				<view class="guessDataBox">
					<GuessList 
						:list="guessListData"
						:weekGuessCurrenData="weekGuessCurrenData"
						/>
				</view>
				<view class="secondTabs">
					<Tabs 
						:list="swiperTabsList" 
						:current="tabsCurrent"
						@change="tabsChange"
						/>
				</view>
			</view>
			<view class="main">
				<swiper class="swiper" :indicator-dots="false" :current="swiperCurrent" :autoplay="false"  @change="swiperChange">
					<swiper-item v-for="(item, index) in swiperTabsList" class="swiperItem" :class="'swiperItem' + index.id" :key="index">
						<template v-if="item.id == 1">
							<History 
								:list="historyListData"
								@clearHistory="init()"
								/>
						</template>
						<template v-if="item.id == 2">
							<Stock 
								:list="stockListData"
								@scrolltolower="stockListLoadmore"
								@action="stockListAction"
								/>
						</template>
						<template v-if="item.id == 3">
							<WeekGuess 
								:list="weekGuessListData"
								:showCheck="weekGuessShowCheck"
								@check="weekGuessCheck"
								@weekGuessHandler="weekGuessHandler"
								/>
						</template>
						<template v-if="item.id == 4">
							<Market 
								:marketData="marketData" 
								:articlesListData="articlesListData"
								/>
						</template>
						<template v-if="item.id == 5">
							<Clues 
								:cluesListData="cluesListData"
								@action="cluesList"
								/>
						</template>
					</swiper-item>
				</swiper>
			</view>
		</template>
		<!-- 底部tab -->
		<Tabbar 
			:selected="1"
			/>
		<!-- 红包 -->
		<u-popup 
			:show="isShowRedEven"
			overlayOpacity="0.8"
			bgColor="transparent"
			mode="center">
			<RedEven 
				@close="redEvenClose"
				/>
		</u-popup>
		<!-- 没领取的浮窗小红包 -->
		<view class="smallRedEven" 
			v-if="isShowSmallRedEven"
			@click="showRedEven"
			>
			<image class="icon" :src="$imgUrl('/images/equities/product/packet_121.png')" mode=""></image>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex';
	import FirstTabs from './components/FirstTabs.vue';
	import History from './components/History.vue';
	import Stock from './components/Stock.vue';
	import MarketStatus from './components/MarketStatus.vue';
	import Market from './components/Market/index.vue';
	import GuessList from './components/GuessList.vue';
	import WeekGuess from './components/WeekGuess.vue';
	import Clues from './components/Clues/index.vue';
	import webSocketMixins from '@/request/webSocketMixins.vue';
	export default {
		computed: {
			...mapGetters(['v_navBarHeight'])
		},
		mixins: [webSocketMixins],
		components: {
			FirstTabs,
			History,
			Stock,
			MarketStatus,
			Market,
			GuessList,
			WeekGuess,
			Clues
		},
		data() {
			return {
				isShowRedEven: false,
				isShowSmallRedEven: false,
				firstTabsList: [
					{ name: '自选股', id: [1, 2, 3]},
					{ name: '市场', id: 4},
					{ name: '线索', id: 5},
				],
				swiperTabsList: [
					{ name: '最近浏览', id: 1,},
					{ name: '自选', id: 2},
					{ name: '周竞猜', id: 3},
					{ name: '市场', id: 4, hide: true },
					{ name: '线索', id: 5, hide: true }
				],
				swiperCurrent: 4,
				tabsCurrent: 5,
				stockListParams: {
					page: 1,
					page_size: 15,
					new_price_sort: 0,
					range_ratio_sort: 2
				},
				stockListData: [],
				historyListParams: {
					new_price_sort: 0,
					range_ratio_sort: 0
				},
				historyListData: [],
				marketStatusData: {},
				guessListData: [],
				isRequest: false,
				weekGuessListParams: {
					page: 1,
					limt: 20,
					type: 2
				},
				weekGuessListData: [],
				weekGuessCodes: [],
				weekGuessCurrenData: {},
				weekGuessShowCheck: true,
				marketData: {},
				articlesListData: [],
				cluesListData: '', // 线索数据
			};
		},
		onShow() {
			this.init();
		},
		onPullDownRefresh(){
			this.init();
		},
		methods: {
			async init(){ 
				this.wsCodeList = [];// 需要监听的code列表
				await this.homeData();
				await this.guessNewPool();
				await this.getDataById();
				await this.weekGuessCurren();
			},
			// tabs切换时 获取对应的数据
			async getDataById(){
				this.wsSendCode(false);
				let { tabsCurrent } = this;
				if(tabsCurrent == 1){
					await this.historyList();
				}
				else if(tabsCurrent == 2){
					await this.stockList();
				}
				else if(tabsCurrent == 3){
					await this.weekGuessList();
				}
				else if(tabsCurrent == 4){
					await this.equityMarket();
				}
				else if(tabsCurrent == 5){
					await this.cluesList();
				}
				this.isRequest = true;
			},
			// 点击tabs切换
			tabsChange(item){
				let { id } = item;
				if(Array.isArray(id)){
					id = id[1]
				}
				this.tabsCurrent = id;
				// 根据 id 设置当前选中的swiper index
				let idByIndex = {
					1: 0,
					2: 1,
					3: 2,
					4: 3,
					5: 4
				}
				this.swiperCurrent = idByIndex[id];
				this.getDataById();
				
			},
			// 滑动左右切换
			swiperChange(e){
				let { detail: { current } } = e;
				this.swiperCurrent = current;
				// 根据 index 设置当前选中的tab id
				let indexById = {
					0: 1,
					1: 2,
					2: 3,
					3: 4,
					4: 5,
				}
				this.tabsCurrent = indexById[current];
				this.getDataById();
			},
			// 获取自选列表数据
			stockList(){
				let { stockListParams } = this;
				this.$api.stockList(stockListParams).then(res => {
					let { page } = stockListParams;
					let { data } = res;
					data.map(item => {
						let { equities_code } = item;
						this.guessListData.map(cItem => {
							let { code, user_guess } = cItem;
							if(equities_code == code){
								item.user_guess = user_guess;
							};
							return item;
						})
					})
					if(page == 1){
						this.stockListData = data;
					}else{
						this.stockListData = [...this.stockListData, ...data];
					};
					this.wsCodeList = this.stockListData;
					this.wsSendCode(true);
				});
			},
			// 上拉加载更多
			stockListLoadmore(){
				this.stockListParams.page += 1;
				this.stockList();
			},
			// 竞猜
			stockListAction({item, oItem}){
				let { marketStatusData: { last_guess_count } } = this;
				if(last_guess_count <= 0){
					uni.showToast({
						title: '没机会了，小子！',
						icon: 'none'
					});
					return;
				}
				let { equities_code } = item;
				let { rise } = oItem;
				let params = {
					code: equities_code,
					rise
				};
				uni.showModal({
					content: `想清楚没，居然猜${rise == 1 ? '涨' : '跌'}?`,
					success: (res) => {
						let { confirm, cancel } = res;
						if(confirm){
							this.$api.guessHandle(params).then(res => {
								let { code, data } = res;
								if(code == 0){
									uni.showToast({
										title: data.tip_message,
										icon: 'none'
									});
									this.init();
								}
							})
						}
					}
				})
			},
			// 获取历史记录
			historyList(){
				let { historyListParams } = this;
				this.$api.historyList(historyListParams).then(res => {
					let { data } = res;
					this.historyListData = data;
					this.wsCodeList = data;
					this.wsSendCode(true);
				});
			},
			// 获取其他信息
			homeData(){
				this.$api.homeData().then(res => {
					let { data } = res;
					this.marketStatusData = {
						...this.marketStatusData,
						...data
					};
					// 红包 每天提醒一次
					let hasShowRedEven = this.$uniApi.storage().get('hasShowRedEven');
					let { show_red_package } = data;
					if(!hasShowRedEven){
						let { guess_right_count, week_guess_right_count } = data;
						this.isShowRedEven = (guess_right_count >= 3 || week_guess_right_count > 0) && !show_red_package;
						this.$uniApi.storage().set('hasShowRedEven', true);
					};
					this.isShowSmallRedEven = show_red_package;
					this.$forceUpdate();
				})
			},
			// 根据竞猜池 获取 已 竞猜的数据 并 置顶
			guessNewPool(){
				this.$api.guessNewPool({reset: 0}).then(res => {
					let { data: { pool } } = res;
					if(pool && pool.length > 0){
						let list = [];
						pool.map(item => {
							let { user_guess, code } = item;
							if(user_guess && user_guess != 0){
								list.push(item);
							}
							if(code == 'sh000001'){
								this.marketStatusData.market = item;
								this.$forceUpdate()
							}
						});
						console.log({list})
						this.guessListData = list;
					}
				})
			},
			// 获取周竞猜列表数据
			weekGuessList(){
				let { weekGuessListParams, weekGuessCodes } = this;
				this.$api.weekGuessList(weekGuessListParams).then(res => {
					let { data: { canPinStocks } } = res;
					canPinStocks.map(item => {
						let { equities_code } = item;
						let isCheck = weekGuessCodes.indexOf(equities_code) >= 0;
						item.isCheck = isCheck;
						return item;
					});
					this.weekGuessListData = canPinStocks;
					this.wsCodeList = canPinStocks;
					this.wsSendCode(true);
				})
			},
			// 周竞猜选择
			weekGuessCheck({item, index}){
				let { isCheck = false } = this.weekGuessListData[index];
				let { equities_code } = item;
				if(!isCheck){
					let { weekGuessCodes: { length } } = this;
					if(length >= 3){
						uni.showToast({
							title: '最多3只',
							icon: 'none'
						});
						return;
					}
					this.weekGuessCodes.push(equities_code);
				}else{
					let _index = this.weekGuessCodes.indexOf(equities_code);
					this.weekGuessCodes.splice(_index, 1);
				}
				this.weekGuessListData[index].isCheck = !isCheck;
				this.$forceUpdate();
			},
			// 周竞猜 竞猜
			weekGuessHandler(rise){
				let { weekGuessCodes } = this;
				if(weekGuessCodes.length < 3){
					uni.showToast({
						title: '最少选择3只',
						icon: 'none'
					});
					return;
				}else{
					let riseToStr = {
						4: ' 0%~2% 的跌',
						6: ' 2.01%~5% 的跌',
						8: ' 5%以上 的跌',
						3: ' 0%~2% 的涨',
						5: ' 2.01%~5%% 的涨',
						7: ' 5%以上 的涨',
					};
					uni.showModal({
						content: `想清楚没，居然猜${riseToStr[rise]}?`,
						success: (res) => {
							let { confirm, cancel } = res;
							if(confirm){
								let params = {
									code_list: weekGuessCodes,
									rise
								};
								this.$api.weekGuessHandle(params).then(res => {
									let { code } = res;
									if(code == 0){
										uni.showToast({
											title: `竞猜成功,${riseToStr[rise]}`
										});
										this.weekGuessCodes = [];
										this.weekGuessList();
										this.weekGuessCurren();
									};
								});
							}
						}
					})
				}
			},
			// 获取周竞猜数据
			weekGuessCurren(){
				this.$api.weekGuessCurren().then(res => {
					let { data } = res;
					this.weekGuessCurrenData = data;
					this.weekGuessShowCheck = !data.black_tip_message;
				});
			},
			// 获取市场数据
			equityMarket(){
				this.$api.equityMarket().then(res => {
					let { data } = res;
					this.marketData = data;
				});
				this.articlesList();
			},
			// 独家解析
			articlesList(){
				this.$api.articlesList({page: 1, size: 15}).then(res => {
					let { data } = res;
					this.articlesListData = data.list;
				});
			},
			// 获取 线索 组合数据
			cluesList(){
				let params = {
					page: 1,
					pageSize: 10,
					is_history: '',
					hashKey: '',
					group: 1
				}
				this.$api.cluesList(params).then(res => {
					let { data } = res;
					this.cluesListData = data;
				});
			},
			// 监听数据, tab 不同监听的数据不同
			wsSendCode(open = true){
				let { wsCodeList } = this;
				if(wsCodeList && wsCodeList.length > 0){
					let codeArr = [];
					wsCodeList.map(item => {
						codeArr.push(item.equities_code);
					});
					let _hasSh = codeArr.indexOf('sh000001') >= 0;
					codeArr = _hasSh ? codeArr : [...codeArr, 'sh000001'];
					let codeArrToStr = codeArr.join(',');
					// 发起数据监听  // 切换tabs或者离开页面时 关闭监听
					if(open){
						this.wsSendMsg('join-new-price', {"code": codeArrToStr});
					}else{
						this.wsSendMsg('leave-new-price', {"code": codeArrToStr});
					}
				}
			},
			// websocket 数据
			wsOnMsg(res){
				let [ event, data ] = res;
				if(event == 'new-price-msg'){
					let { tabsCurrent } = this;
					let list;
					if(tabsCurrent == 1){
						list = this.historyListData;
					}
					else if(tabsCurrent == 2){
						list = this.stockListData;
					}
					else if(tabsCurrent == 3){
						list = this.weekGuessListData;
					}
					let { code } = data;
					list.map(item => {
						if(item.equities_code == code){
							let { price, range_ratio } = data;
							item.newing = price;
							item.fluctuate_val = range_ratio;
							if(code == 'sh000001'){
								this.marketStatusData.market.newPrice = price;
								this.marketStatusData.market.range_ratio = range_ratio;
							}
						}
						return item;
					});
					if(tabsCurrent == 1){
						this.historyListData = list;
					}
					else if(tabsCurrent == 2){
						this.stockListData = list;
					}
					else if(tabsCurrent == 3){
						this.weekGuessListData = list;
					}
				}
			},
			showRedEven(){
				this.isShowRedEven = true;
			},
			// 红包关闭
			redEvenClose(isOpen){
				// 是否打开了的红包 再关闭的
				if(isOpen){
					this.isShowRedEven = false;
					this.homeData();
				}else{
					this.$api.redDebrisClose().then(res => {
						this.isShowRedEven = false;
						this.homeData();
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './stock.scss';
</style>
