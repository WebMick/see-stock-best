<template>
	<view class="stock">
		<scroll-view class="list" scroll-y="true" 
			@scrolltolower="scrolltolower">
			<StockList 
				:list="list" 
				:showOptions="true"
				@action="action"
				>
			</StockList>
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
			scrolltolower(){
				this.$emit('scrolltolower');
			},
			action({item, oItem}){
				this.$emit('action', {item, oItem})
			}
		}
	}
</script>
 
<style lang="scss" scoped>
	.stock,.list{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
