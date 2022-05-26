<template>
	<view class="componentStock">
		<view class="head">
			<ContentHead title="成分股" :hasMoreArrow="false" />
		</view>
		<StockList :list="listData"></StockList>
	</view>
</template>
 
<script>
	export default {
		name: '',
		props: {
			// 股票/指数code
			code: {
				default: String,
				default: ''
			}
		},
		data(){
			return {
				listParams: {
					code: '',
					page: 1,
					page_size: 2000,
					new_price_sort: 0,
					range_ratio_sort: 2
				},
				listData: []
			}
		},
		mounted() {
			this.equityConstituentStockList();
		},
		methods:{
			equityConstituentStockList(){
				let { code } = this;
				this.listParams.code = code;
				this.$api.equityConstituentStockList(this.listParams).then(res => {
					let { data } = res;
					this.listData = data;
				});
			}
		}
	}
</script>
 
<style lang="scss" scoped>
	.componentStock{
		margin-top: 24rpx;
		padding: 24rpx 0 calc(env(safe-area-inset-bottom) + 120rpx) 0;
		background: #fff;
		overflow: hidden;
		.head{
			padding: 0 32rpx 24rpx;
		}
	}
</style>