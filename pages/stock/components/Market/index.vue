<template>
	<view class="market">
		<scroll-view class="scrollBox" scroll-y="true">
			<MarketSwiper 
				:list="marketData.stock"
				/>
			<MarketCount 
				:count="marketData.count"
				:up="marketData.up"
				:down="marketData.down"
				:flat="marketData.flat"
				/>
			<MarketHot 
				:industry="marketData.industry[0]"
				/>
			<MarketNewsBox 
				:list="articlesListData"
				/>
		</scroll-view>
	</view>
</template>
 
<script>
	import MarketSwiper from './MarketSwiper.vue'
	import MarketCount from './MarketCount.vue'
	import MarketHot from './MarketHot.vue'
	import MarketNewsBox from './MarketNewsBox.vue'
	export default {
		name: '',
		props: {
			marketData: {
				type: Object,
				default: function(){
					return {}
				}
			},
			articlesListData: {
				type: Array,
				default: () => []
			}
		},
		components: {
			MarketSwiper,
			MarketCount,
			MarketHot,
			MarketNewsBox
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
	
	.market,.scrollBox{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
