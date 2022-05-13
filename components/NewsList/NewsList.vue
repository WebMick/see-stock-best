<template>
	<view class="list">
		<view class="item" 
			v-for="(item, index) in list" 
			:key="index">
			<view class="title">{{item.title}}</view>
			<view class="infoBox">
				<view class="from">{{item.from_show}}</view>
				<view class="time">{{item.created_at}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"NewsList",
		props: {
			list: {
				type: Array,
				default: () => []
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list{
		.item{
			padding: 15rpx 0;
			border-bottom: #f4f5f6 solid 1px;
			.title{
				font-size: 28rpx;
				line-height: 1.5;
				display:-webkit-box;
				overflow:hidden;	
				text-overflow:ellipsis;     //省略号
				-webkit-line-clamp:2;       //2行
				-webkit-box-orient:vertical;
			}
			.infoBox{
				margin-top: 15rpx;
				display: flex;
				align-items: center;
				font-size: 24rpx;
				color: #909399;
				.from{
					margin-right: 15rpx;
				}
			}
		}
	}
</style>
