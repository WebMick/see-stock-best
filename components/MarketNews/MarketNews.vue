<template>
	<view class="list">
		<view class="item" v-for="(item, index) in list" :key="index">
			<view class="title">{{item.title}}</view>
			<view class="content">{{item.content}}</view>
			<view class="infoBox">
				<view class="type">
					<image class="icon" :src="$imgUrl(item.catUrl)" mode="heightFix"></image>
				</view>
				<view class="time">{{item.pushTime}}</view>
			</view>
			<view class="stockList" v-if="item.equities && item.equities.length > 0">
				<view class="stockItem" 
					v-for="(cItem, cIndex) in item.equities"
					:class="[$setClass(cItem.ratio)]"
					:key="cIndex"
					>
					{{cItem.name}}
					<text class="fontMiddle ratio">{{$setAddSymbol(cItem.ratio)}}%</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"MarketNews",
		props: {
			list: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.list{
		.item{
			padding: 24rpx 0;
			border-bottom: #F4F5F6 solid 1px;
			&:last-child{
				border-bottom: none;
			}
			.title{
				font-size: 30rpx;
				line-height: 1.5;
			}
			.content{
				font-size: 28rpx;
				line-height: 1.5;
				color: #606266;
				display:-webkit-box;
				overflow:hidden;	
				text-overflow:ellipsis;     //省略号
				-webkit-line-clamp:2;       //2行
				-webkit-box-orient:vertical;
			}
			.infoBox{
				margin-top: 10rpx;
				display: flex;
				align-items: center;
				.type{
					height: 32rpx;
					margin-right: 10rpx;
					.icon{
						height: 32rpx;
					}
				}
				.time{
					color: #909399;
					font-size: 24rpx;
				}
			}
			.stockList{
				margin-top: 10rpx;
				display: flex;
				align-items: center;
				.stockItem{
					display: flex;
					align-items: center;
					height: 36rpx;
					padding: 0 8rpx;
					font-size: 24rpx;
					margin-right: 10rpx;
					.ratio{
						margin-left: 10rpx;
					}
					&.textUp{
						border: 1px solid rgba(254,82,105,0.08);
						background: rgba(254,82,105,0.05);
					}
					&.textDown{
						background: rgba(2,189,133,0.05);
						border: 1px solid rgba(2,189,133,0.06);
					}
				}
			}
		}
	}
</style>
