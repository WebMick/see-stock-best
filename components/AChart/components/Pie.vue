<template>
	<view class="pie" :style="{height: height[0] + 'rpx'}">
		<canvas
			class="canvas"
			type='2d'
		    :id="canvasId[0]"
		    disable-scroll="true"
			/>
	</view>
</template>
 
<script>
	import { Mixins } from './Mixins.js';
	export default {
		name: '',
		mixins: [Mixins],
		props: {
			// canvas 的id 顺序对应 高度的顺序
			canvasId: {
				type: Array,
				default: () => ['pie']
			},
			// 高度
			height: {
				default: () => [],
				type: Array
			},
			// 数据
			chartData: {
				default: () => [],
				type: Array
			}
		},
		data(){
			return {
				
			}
		},
		mounted() {
			this.init();
		},
		methods:{
			async init(){
				this.fontSize = 14;
				let { canvasId, pixelRatio } = this;
				let canvasDom = await this.getCanvasDom(canvasId[0]);
				let {width, height, node} = canvasDom;
				const canvas = node;
				const ctx = canvas.getContext('2d');
				width = width * pixelRatio;
				height = height * pixelRatio;
				canvas.width  = width;
				canvas.height = height;
				
				this.canvasWidth = width;
				this.canvasHeight = height;
			},
			
		}
	}
</script>
 
<style lang="scss" scoped>
	.pie{
		position: relative;
		.canvas{
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
		}
	}
</style>
