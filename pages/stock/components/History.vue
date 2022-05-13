<template>
	<view class="history">
		<scroll-view class="list" scroll-y="true" >
			<StockList :list="list"></StockList>
			<view class="tips">清空浏览记录</view>
		</scroll-view>
	</view>
</template>
 
<script>
	export default {
		name: '',
		props: {
			list: {
				type: Array,
				default: () => []
			}
		},
		data(){
			return {
				
			}
		},
		methods:{
			
		}
	}
</script>
 
<style lang="scss" scoped>
	.history,.list{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		.tips{
			color: #909399;
			text-align: center;
			line-height: 3;
			font-size: 26rpx;
		}
	}
</style>
