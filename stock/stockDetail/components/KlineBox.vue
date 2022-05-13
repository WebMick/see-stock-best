<template>
	<view class="klineBox">
		<view class="klineHead">
			<Tabs :list="tabList" :current="activeId" @change="change" />
			<view class="setBox"></view>
		</view>
		<!-- 内容区 -->
		<view class="main">
			<!-- 分时图 -->
			<template v-if="activeId == 1">
				<view class="item minuteBox">
					<view class="minuteKline">
						<Achart
							:code="code"
							v-if="sData.minute_line && sData.minute_line.length > 0"
							type="minute"
							:canvasId="['minute', 'vol']"
							:height="[404, 144]"
							:chartData="sData.minute_line"
							:yestClose="sData.base_info.prev_close_px"
							/>
					</view>
					<!-- <template v-if="sData && sData.common_info && sData.common_info.type == 2">
						<view class="fiveBox fz24">
							<view class="title">五档</view>
							<template v-if="fiveData">
								<view class="fiveItem" v-for="(item, index) in fiveData" :key="index">
									<view class="cItem" v-for="(cItem, cIndex) in item" :key="cIndex">
										<view class="col1">卖<text class="fontLight">{{5 - index}}</text></view>
										<view class="col2 fontLight" :class="[$setClass(cItem[0], sData.base_info.prev_close_px)]">{{cItem[0]}}</view>
										<view class="col3 fontLight">{{cItem[1]}}</view>
									</view>
								</view>
							</template>
						</view>
					</template> -->
				</view>
			</template>
			<!-- 五日图 -->
			<template v-if="activeId == 2">
				<view class="item fiveDayKline">
					<Achart
						:code="code"
						v-if="fiveDayData && fiveDayData.length > 0"
						type="fiveDay"
						:canvasId="['fiveDay', 'vol']"
						:height="[404, 144]"
						:chartData="fiveDayData"
						:yestClose="fiveDayYestClose"
						:timeArr="fiveDayTime"
						ref="fiveDay"
						:xAxisLen="249"
						/>
				</view>
			</template>
			<!-- 日K图 -->
			<template v-if="activeId == 3">
				<view class="item">
					<template v-if="sData.common_info">
						<Achart
							:code="code"
							type="kline"
							:height="[404, 144]"
							:canvasId="['kline', 'vol']"
							:issuePrice="sData.common_info.issue_price"
							/>
					</template>
				</view>
			</template>
			<!-- 周K图 -->
			<template v-if="activeId == 4">
				<view class="item">
					<template v-if="sData.common_info">
						<Achart
							:code="code"
							:canvasId="['weekLine', 'vol']"
							type="weekLine"
							:height="[404, 144]"
							:issuePrice="sData.common_info.issue_price"
							/>
					</template>
				</view>
			</template>
			<!-- 月K图 -->
			<template v-if="activeId == 5">
				<view class="item">
					<template v-if="sData.common_info">
						<Achart
							:code="code"
							type="monthKline"
							:canvasId="['monthKline', 'vol']"
							:height="[404, 144]"
							:issuePrice="sData.common_info.issue_price"
							/>
					</template>
				</view>
			</template>
		</view>
	</view>
</template>
 
<script>
	import Achart from '@/components/AChart/AChart.vue'
	export default {
		name: '',
		components: {
			Achart
		},
		props: {
			// 股票/指数code
			code: {
				default: String,
				default: ''
			},
			// 数据
			sData: {
				type: Object,
				default: function(){
					return {}
				}
			}
		},
		computed: {
			fiveData(){
				let { sData } = this;
				if(!sData || JSON.stringify(sData) == '{}') return;
				let { base_info } = sData;
				if(!base_info || JSON.stringify(base_info) == '{}') return;
				let { level } = base_info;
				if(!level || level.length == 0) return;
				level = level.reverse();
				level[0] = level[0].reverse();
				return level;
			}
		},
		data(){
			return {
				tabList: [
					{name: '分时', id: 1},
					{name: '五日', id: 2},
					{name: '日K', id: 3},
					{name: '周K', id: 4},
					{name: '月K', id: 5}
				],
				activeId: 1,
				fiveDayData: [], // 五日数据
				fiveDayTime: [], // 五日时间数据
				fiveDayYestClose: ''
			}
		},
		methods:{
			change({id}){
				this.activeId = id;
				if(id == 2){
					this.equityFiveKlineSix();
				}
			},
			// 获取五日数据
			equityFiveKlineSix(){
				let { code } = this;
				let params = {
					code,
					point_num: 5
				};
				this.$api.equityFiveKlineSix(params).then(res => {
					let { data } = res;
					let { list, six_day_close_price } = data;
					this.fiveDayYestClose = six_day_close_price;
					this.fiveDayTime = [];
					this.fiveDayData = [];
					for(let key in list){
						let time = key.substr(4,2) + '-' + key.substr(6,2)
						this.fiveDayTime.push(time);
						let item = [...list[key], '']
						this.fiveDayData = [...this.fiveDayData,...item]
					};
					this.fiveDayData = this.fiveDayData.splice(0,this.fiveDayData.length - 2);
					this.$nextTick(()=>{
						this.$refs.fiveDay.init();
					}) 
				});
			}
		}
	}
</script>
 
<style lang="scss" scoped>
	.klineBox{
		background: #fff;
		margin-top: 24rpx;
		.klineHead{
			padding: 0 22rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: #f4f5f6 solid 1px;
			.setBox{
				width: 64rpx;
				height: 64rpx;
			}
		}
		.main{
			.item{
				padding: 0 22rpx;
				$border:  rgba(244, 245, 246, 0.6) solid 1px;
				height: 628rpx;
				&.minuteBox{
					display: flex;
					.minuteKline{
						flex: 1;
						border: $border;
						border-top: none;
					}
					.fiveBox{
						width: 226rpx;
						border: $border;
						border-left: none;
						color: $uni-color-subtitle;
						display: flex;
						flex-direction: column;
						margin-bottom: 30rpx;
						.title{
							border-bottom: $border;
							text-align: center;
							line-height: 40rpx;
							height: 40rpx;
						}
						.fiveItem{
							flex: 1;
							border-bottom: $border;
							display: flex;
							flex-direction: column;
							&:last-child{
								border-bottom: none;
							}
							.cItem{
								flex: 1;
								display: flex;
								align-items: center;
								padding: 0 10rpx;
								.col1{
									width: 64rpx;
								}
								.col2{
									flex: 1;
								}
								.col3{
									width: 80rpx;
									text-align: right;
								}
							}
						}
					}
				}
			}
		}
		
	}
</style>
