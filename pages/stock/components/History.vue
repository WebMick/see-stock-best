<template>
	<view class="history">
		<scroll-view class="list" scroll-y="true" >
			<StockList :list="list"></StockList>
			<template v-if="list && list.length > 0">
				<view class="tips" @click="clearHistory">清空浏览记录</view>
			</template>
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
			clearHistory(){
				uni.showModal({
					content: '清空当前的浏览记录吗？',
					success: (res) => {
						let { confirm, cancel } = res;
						if(confirm){
							this.$api.favorHistoryDetailDel({is_all: 1}).then(res =>{
								this.$emit('clearHistory');
							});
						}
						else if(cancel){
							
						}
					}
				})
			}
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
			font-size: 24rpx;
		}
	}
</style>
