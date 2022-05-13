<template>
	<view class="marketBox">
		<view class="left">
			<view class="numBox" 
				v-if="marketStatusData.market && marketStatusData.market.range_ratio"
				:class="[$setClass(marketStatusData.market.range_ratio)]">
				<view class="fontRegular price">
					{{marketStatusData.market.newPrice}}
				</view>
				<view class="fontRegular ratio">
					{{$setAddSymbol(marketStatusData.market.range_ratio)}}%
				</view>
			</view>
			<view class="info">
				<view class="name">{{marketStatusData.market.name}}</view>
				<view class="status">{{v_wsStatus.name}}</view>
			</view>
		</view>
		<view class="right">
			<view class="guessCount">
				本期还可以猜
				<text class="textUp fontMiddle">{{marketStatusData.last_guess_count || 0}}</text>
				次
			</view>
			<view class="countdownBox">
				<template v-if="marketStatusData.guessStatus == 0">
					<text>精彩结束，开奖倒计时：</text>
				</template>
				<template v-if="marketStatusData.guessStatus != 0">
					<text>竞猜倒计时：</text>
				</template>
				<view class="countdown">
					<UniCountdown class="countdown fontLight" :showDay="true"
						@timeup="timeup"
						color="#fff" 
						splitorColor="rgba(134, 148, 170, .6)" 
						backgroundColor="rgba(134, 148, 170, .6)" 
						:hour="marketStatusData.last_hour" 
						:minute="marketStatusData.last_minute" 
						:second="marketStatusData.last_second"
						/>
				</view>
			</view>
		</view>
	</view>
</template>
 
<script>
	import { mapGetters } from 'vuex';
	export default {
		name: '',
		computed:{
			...mapGetters(['v_wsStatus'])
		},
		props: {
			marketStatusData: {
				type: Object,
				default: function(){
					return {}
				}
			}
		},
		methods:{
			timeup(){
				this.$emit('timeup');
			}
		}
	}
</script>
 
<style lang="scss" scoped>
	.marketBox{
		display: flex;
		align-items: center;
		padding: 0 32rpx;
		height: 100rpx;
		justify-content: space-between;
		.left{
			.numBox{
				display: flex;
				align-items: center;
				.price{
					font-size: 32rpx;
				}
				.ratio{
					margin-left: 10rpx;
					font-size: 24rpx;
				}
			}
			.info{
				margin-top: 10rpx;
				display: flex;
				align-items: flex-end;
				.name{
					font-weight: bold;
					font-size: 24rpx;
				}
				.status{
					margin-left: 10rpx;
					font-size: 20rpx;
				}
			}
		}
		.right{
			font-size: 22rpx;
			.guessCount{
				display: flex;
				align-items: center;
				justify-content: flex-end;
				.textUp{
					font-size: 30rpx;
					margin: 0 8rpx;
				}
			}
			.countdownBox{
				display: flex;
				align-items: center;
				margin-top: 10rpx;
			}
		}
	}
</style>
