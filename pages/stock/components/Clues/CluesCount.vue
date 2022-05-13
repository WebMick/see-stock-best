<template>
	<view class="cluesCount">
		<view class="top">
			<view class="title">组合盈亏状况</view>
			<view class="tips">更新于05-12 15:54</view>
		</view>
		<view class="count">
			<view class="textBox">
				<view class="text">
					盈利组合占比 <text class="num fontMiddle textUp">45.84%</text>
				</view>
				<view class="text">
					亏损组合占比 <text class="num fontMiddle textDown">53.89%</text>
				</view>
			</view>
			<view class="score">
				<view class="item up"></view>
				<view class="item flat"></view>
				<view class="item down"></view>
			</view>
			<view class="name">
				<view class="item">
					<view class="icon up"></view>
					<text class="text">盈利 10.26万个</text>
				</view>
				<view class="item">
					<view class="icon flat"></view>
					<text class="text">平盘 10.26万个</text>
				</view>
				<view class="item">
					<view class="icon down"></view>
					<text class="text">亏损 10.26万个</text>
				</view>
			</view>
		</view>
	</view>
</template>
 
<script>
	export default {
		name: '',
		data(){
			return {
				
			}
		},
		methods:{
			
		}
	}
</script>
 
<style lang="scss" scoped>
	.cluesCount{
		margin: 24rpx 24rpx 0;
		box-shadow: 0 0 12rpx 0 rgba(74, 76, 80, 0.1);
		border-radius: 16rpx;
		background: #fff;
		padding: 24rpx;
		.top{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.title{
				font-size: 28rpx;
				font-weight: bold;
			}
			.tips{
				font-size: 22rpx;
				color: #8694aa;
			}
		}
		.count{
			margin-top: 30rpx;
			.textBox{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.text{
					font-size: 24rpx;
					.num{
						font-size: 28rpx;
						margin-left: 15rpx;
					}
				}
			}
			.score{
				margin-top: 24rpx;
				display: flex;
				.item{
					height: 12rpx;
					min-width: 10rpx;
					max-width: 80%;
					&.up{
						width: 60%;
						background-color: #FE5269;
						border-radius: 6rpx 0 0 6rpx;
					}
					&.flat{
						flex: 1;
						background-color: #8694aa;
						margin: 0 4rpx;
					}
					&.down{
						width: 30%;
						border-radius: 0 6rpx 6rpx 0;
						background-color: #02BD85;
					}
				}
			}
			.name{
				margin-top: 24rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				.item{
					margin: 0 10rpx;
					display: flex;
					align-items: center;
					font-size: 22rpx;
					font-weight: bold;
					.icon{
						width: 6rpx;
						height: 6rpx;
						border-radius: 50%;
						margin-right: 10rpx;
						&.up{
							background-color: #FE5269;
						}
						&.flat{
							background-color: #8694aa;
						}
						&.down{
							background-color: #02BD85;
						}
					}
				}
			}
		}
	}
</style>
