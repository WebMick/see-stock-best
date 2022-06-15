<template>
	<view class="groupList">
		<view class="item" v-for="(item, index) in listData" :key="index">
			<view class="head">
				<view class="left">
					<view class="title">
						<view class="text">{{item.nickname}}</view>
					</view>
				</view>
				<view class="right">
					<view class="text">本周涨幅</view>
					<view class="num" :class="[$setClass(item.this_week_range)]">{{$setAddSymbol(item.this_week_range)}}%</view>
				</view>
			</view>
		</view>
	</view>
</template>
 
<script>
	export default {
		name: '',
		props:{
			listData: {
				type: Array,
				default: () => []
			}
		},
		methods:{
			
		}
	}
</script>
 
<style lang="scss" scoped>
	.groupList{
		padding: 24rpx 24rpx 0;
		.item{
			margin-bottom: 24rpx;
			background-color: #fff;
			border-radius: 16rpx;
			padding: 24rpx 24rpx 0;
			box-shadow: 0 0 12rpx 0 rgba(74, 76, 80, 0.1);
		}
	}
</style>