<template>
	<view class="cluesList">
		<ContentHead title="热门组合" moreText="查看更多" />
		<view class="list">
			<CluesList :list="list" @action="action"></CluesList>
		</view>
		<view class="tips" v-if="list && list.length > 0">查看更多线索</view>
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
			action(){
				this.$emit('action');
			}
		}
	}
</script>
 
<style lang="scss" scoped>
	.cluesList{
		padding: 0 24rpx;
		margin-top: 40rpx;
		.list{
			margin-top: 24rpx;
		}
		.tips{
			color: #909399;
			text-align: center;
			line-height: 3;
			font-size: 26rpx;
		}
	}
</style>
