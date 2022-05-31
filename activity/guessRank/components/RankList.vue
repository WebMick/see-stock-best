<template>
	<view class="rankList">
		<view class="item head">
			<view class="col1">排名</view>
			<view class="col2">昵称</view>
			<view class="col3">累计收益(元)</view>
		</view>
		<view class="list">
			<scroll-view class="scrollBox" scroll-x="false" scroll-y="true">
				<view class="item" v-for="(item, index) in list" :key="index">
					<view class="col1">
						{{item.index}}
					</view>
					<view class="col2">
						<image class="headimg" :src="item.headimgurl" mode=""></image>
						<text class="name">{{item.nickname}}</text>
					</view>
					<view class="col3">
						{{item.score}}
					</view>
				</view>
			</scroll-view>
		</view>
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
	.rankList{
		display: flex;
		flex-direction: column;
		height: 100%;
		.list{
			flex: 1;
			position: relative;
			.scrollBox{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
		}
		
		.item{
			display: flex;
			align-items: center;
			padding: 0 20rpx;
			font-size: 24rpx;
			&.head{
				color: #909399;
				font-size: 24rpx;
				line-height: 70rpx;
				.col2{
					padding-left: 68rpx;
				}
			}
			.col1{
				width: 150rpx;
				padding-left: 20rpx;
			}
			.col2{
				flex: 1;
				display: flex;
				align-items: center;
				height: 80rpx;
				.headimg{
					width: 52rpx;
					height: 52rpx;
					border-radius: 50%;
					overflow: hidden;
					border: 2rpx solid #FFFFFF;
					margin-right: 16rpx;
				}
				.name{
					font-size: 24rpx;
				}
			}
			.col3{
				width: 240rpx;
				text-align: center;
			}
		}
	}
</style>