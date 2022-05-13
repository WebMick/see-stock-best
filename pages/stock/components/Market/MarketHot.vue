<template>
	<view class="marketHot">
		<ContentHead title="今日热门" />
		<view class="listBox">
			<view class="item" 
				v-for="(item, index) in industry" 
				:class="[$setClass(item.ratio)]"
				:key="index">
				<view class="infoBox">
					<view class="name">{{item.name}}</view>
					<view class="ratio fontMiddle">{{$setAddSymbol(item.ratio)}}%</view>
				</view>
				<view class="recommendBox">
					<view class="recommendItem" 
						v-for="(cItem, cIndex) in item.recommend" 
						:key="cIndex">
						<view class="recommendName">{{cItem.name}}</view>
						<view class="recommendRatio fontMiddle">{{$setAddSymbol(cItem.nowRatio)}}%</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
 
<script>
	export default {
		name: '',
		props: {
			industry: {
				type: Array,
				default: () => []
			}
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
	.marketHot{
		margin-top: 32rpx;
		padding: 0 32rpx;
		.listBox{
			margin-top: 24rpx;
			height: 256rpx;
			overflow: hidden;
			.item{
				float: left;
				border-radius: 8rpx;
				padding: 20rpx 16rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				&:nth-child(1){
					height: 100%;
					width: 214rpx;
				}
				&:nth-child(2),&:nth-child(3){
					width: 228rpx;
					height: 142rpx;
					margin-left: 8rpx;
				}
				&:nth-child(4){
					height: 106rpx;
					width: 464rpx;
					margin: 8rpx 0 0 8rpx;
					padding-top: 16rpx;
					.infoBox{
						display: flex;
						align-items: center;
						.ratio{
							margin-left: 8rpx;
						}
					}
					.recommendBox{
						.recommendItem{
							margin-top: 14rpx;
						}
					}
				}
				&.textUp{
					background: rgba(#FE5269, .05);
				}
				&.textFlat{
					background: rgba(#8694AA, .05);
				}
				&.textFlat{
					background: rgba(#02BD85, .05);
				}
				.infoBox{
					.name{
						font-size: 30rpx;
						color: #303133;
						overflow:hidden;
						text-overflow:ellipsis;   
						white-space: nowrap;
					}
					.ratio{
						font-size: 30rpx;
						margin-top: 8rpx;
					}
				}
				.recommendBox{
					.recommendItem{
						display: flex;
						align-items: center;
						margin-top: 26rpx;
						.recommendName{
							font-size: 22rpx;
							color: #606266;
							margin-right: 8rpx;
						}
						.recommendRatio{
							font-size: 22rpx;
						}
					}
				}
			}
		}
	}
</style>
