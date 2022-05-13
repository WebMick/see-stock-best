<template>
	<view class="marketCount">
		<ContentHead title="市场总览" />
		<view class="rectBox">
			<view class="rectItem" 
				v-for="(item, index) in rectListData" 
				:key="index">
				<view class="num fontMiddle">{{item.num}}</view>
				<view class="rect" :class="{down: index < 5, flat: index == 5, up: index > 5}" :style="{height: setHeight(item.num)}"></view>
				<view class="title">{{item.title}}</view>
			</view>
		</view>
		<view class="countBox">
			<view class="numBox">
				<image class="icon" :src="$imgUrl('/images/equities/product/202201131712414916.png')" mode=""></image>
				<view class="text fontMiddle textDown">{{down}}</view>
			</view>
			<view class="scoreBox">
				<view class="item" :style="{width: setWidth(down)}"></view>
				<view class="item"></view>
				<view class="item" :style="{width: setWidth(up)}"></view>
			</view>
			<view class="numBox">
				<view class="text fontMiddle textUp">{{up}}</view>
				<image class="icon" :src="$imgUrl('/images/equities/product/202201131713109891.png')" mode=""></image>
			</view>
		</view>
	</view>
</template>
 
<script>
	export default {
		name: '',
		props:{
			count: {
				type: [Number, String],
				default: 100
			},
			up: {
				type: [Number, String],
				default: 100
			},
			flat: {
				type: [Number, String],
				default: 100
			},
			down: {
				type: [Number, String],
				default: 100
			}
		},
		computed:{
			setWidth(){
				return (num = 1) => {
					let { count } = this;
					let wid = num / count * 100 + '%';
					return wid;
				}
			},
			setHeight(){
				return (num) => {
					let { count } = this;
					let height = num / count * 100 + 5 + 'rpx';
					return height;
				}
			}
		},
		data(){
			return {
				rectListData: [
					{ num: 30, title: '跌停' },
					{ num: 7, title: '>7' },
					{ num: 26, title: '5-7' },
					{ num: 73, title: '3-5' },
					{ num: 692, title: '0-3' },
					{ num: 83, title: '0' },
					{ num: 2889, title: '0-3' },
					{ num: 6221, title: '3-5' },
					{ num: 146, title: '5-7' },
					{ num: 150, title: '>7' },
					{ num: 126, title: '涨停' }
				]
			}
		},
		methods:{
			
		}
	}
</script>
 
<style lang="scss" scoped>
	.marketCount{
		padding: 0 32rpx;
		.rectBox{
			margin: 20rpx 0;
			display: flex;
			height: 184rpx;
			.rectItem{
				flex: 1;
				margin: 0 10rpx;
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				text-align: center;
				&:first-child{
					margin-left: 0;
				}
				&:last-child{
					margin-right: 0;
				}
				.num{
					font-size: 24rpx;
				}
				.rect{
					margin: 10rpx 0;
					border-radius: 5rpx 5rpx 0 0;
					transition: all .5s;
					&.down{
						background-color: #02BD85;
					}
					&.flat{
						background-color: #8694AA;
					}
					&.up{
						background-color: #FE5269;
					}
				}
				.title{
					font-size: 20rpx;
				}
			}
		}
		.countBox{
			height: 32rpx;
			display: flex;
			align-items: center;
			.numBox{
				width: 80rpx;
				display: flex;
				align-items: center;
				.icon{
					width: 12rpx;
					height: 20rpx;
				}
				.text{
					flex: 1;
					text-align: center;
					font-size: 26rpx;
				}
			}
			.scoreBox{
				flex: 1;
				display: flex;
				align-items: center;
				.item{
					height: 12rpx;
					max-width: 80%;
					min-width: 6%;
					&:nth-child(1){
						background-color: #02BD85;
						border-radius: 6rpx 0 0 6rpx;
					}
					&:nth-child(2){
						margin: 0 6rpx;
						background-color: #8694AA;
						flex: 1;
					}
					&:nth-child(3){
						background-color: #FE5269;
						border-radius: 0 6rpx 6rpx 0;
					}
				}
			}
		}
	}
</style>
