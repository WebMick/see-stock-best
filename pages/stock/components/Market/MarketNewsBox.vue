<template>
	<view class="marketNews">
		<ContentHead title="独家解析" moreText="MORE" />
		<MarketNews 
			:list="list"
			/>
		<view class="tips">查看更多独家解析..</view>
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
		methods:{
			
		}
	}
</script>
 
<style lang="scss" scoped>
	.marketNews{
		margin-top: 32rpx;
		padding: 0 32rpx;
		.tips{
			color: #909399;
			border-top: #F4F5F6 solid 1px;
			text-align: center;
			line-height: 3;
			font-size: 26rpx;
		}
	}
</style>
