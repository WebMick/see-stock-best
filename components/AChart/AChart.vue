<template>
	<view class="chart">
		<!-- 日K 周K 月K 组件 -->
		<Kline 
			ref="chart"
			v-if="type == 'kline' || type == 'weekLine' || type == 'monthKline'" 
			:code="code" 
			:height="height" 
			:issuePrice="issuePrice"
			:type="type"
			:canvasId="canvasId"
			/>
		<!-- 分时图 -->
		<Minute 
			ref="chart"
			v-if="type == 'minute' || type == 'fiveDay'"
			:height="height" 
			:chartData="chartData"
			:yestClose="yestClose"
			:type="type"
			:timeArr="timeArr"
			:xAxisLen="xAxisLen"
			:canvasId="canvasId"
			/>
		<!-- 饼图 -->
		
	</view>
</template>

<script>
	// 传入CODE
	// canvas数据在组件内获取
	// 日K 周K 月K 公用一个组件、一个接口，参数不同
	// 分时 组件 单独组件、接口
	// 五日 组件 单独组件、接口
	import Kline from './components/Kline.vue';
	import Minute from './components/Minute.vue';
	export default {
		/**
		 * type: 
		 * */
		name:"AChart",
		components: {
			Kline,
			Minute
		},
		props: {
			// 股票cod
			code: {
				default: '',
				type: String
			},
			// 图 类型 日K kline  周K weekLine 月K monthKline 分时 minute 五日 fiveDay 饼图 pie
			type: {
				default: 'kline',
				type: String
			},
			// canvas 的id 顺序对应 高度的顺序
			canvasId: {
				type: Array,
				default: () => ['kline', 'vol'],
			},
			// 发行价
			issuePrice: {
				default: '',
				type: String
			},
			// 高度 支持多个高度
			height: {
				default: () => [404, 184],
				type: Array
			},
			// 图标 数据
			chartData: {
				default: () => [],
				type: Array
			},
			// 昨收价 
			yestClose: {
				type: Number,
				default: 0
			},
			// 一屏显示的条数
			xAxisLen: {
				type: Number,
				default: 241
			},
			// 底部时间
			timeArr: {
				default: () => [],
				type: Array
			},
		},
		data() {
			return {
				
			};
		},
		mounted() {
		},
		methods: {
			init(){
				// chart 重新绘制时，调用对应的组件
				this.$nextTick(()=>{
					this.$refs.chart.init();
				})
			}
		}
	}
</script>

<style lang="scss">
	.chart{
		height: 100%;
	}
</style>
