<template>
	<view class="weekGuess">
		<scroll-view class="list" scroll-y="true"
			@scrolltolower="scrolltolower">
			<StockList 
				:list="list" 
				:showCheck="showCheck"
				@check="check"
				>
			</StockList>
		</scroll-view>
		<view class="actionBox" v-if="showCheck">
			<view class="btnItem down" @click="weekGuessHandler(4)">0%~2%</view>
			<view class="btnItem down" @click="weekGuessHandler(6)">2.01%~5%</view>
			<view class="btnItem down" @click="weekGuessHandler(8)">5%以上</view>
			<view class="btnItem up" @click="weekGuessHandler(3)">0%~2%</view>
			<view class="btnItem up" @click="weekGuessHandler(5)">2.01%~5%</view>
			<view class="btnItem up" @click="weekGuessHandler(7)">5%以上</view>
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
			},
			showCheck: {
				type: Boolean,
				default: true
			}
		},
		data(){
			return {
				
			}
		},
		methods:{
			check({item, index}){
				this.$emit('check', {item, index});
			},
			scrolltolower(){
				this.$emit('scrolltolower');
			},
			weekGuessHandler(rise){
				this.$emit('weekGuessHandler', rise);
			}
		}
	}
</script>
 
<style lang="scss" scoped>
	.weekGuess{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #fff;
		.list{
			position: absolute;
			bottom: 100rpx;
			top: 0;
			left: 0;
			right: 0;
		}
		.actionBox{
			border-top: #f4f5f6 solid 1px;
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			padding: 0 10rpx;
			.btnItem{
				height: 60rpx;
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #fff;
				font-size: 22rpx;
				margin: 0 1rpx;
				&.down{
					background-color: #02BD85;
				}
				&.up{
					background-color: #FE5269;
				}
				&:first-child{
					border-radius: 25rpx 0 0 25rpx;
				}
				&:last-child{
					border-radius: 0 25rpx 25rpx 0;
				}
			}
		}
	}
</style>
