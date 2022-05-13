<template>
	<view class="cluesActions">
		<view class="btnItem">
			<view class="iconBox">
				<image :src="$imgUrl('/images/equities/product/202201101901181492.png')" v-if="commendType != 2" class="icon" mode=""></image>
				<image :src="$imgUrl('/images/equities/product/202205131041452153.png')" v-if="commendType == 2" class="icon" mode=""></image>
			</view>
			<view class="text">反对 <text class="num">{{down}}</text></view>
		</view>
		<view class="btnItem">
			<view class="iconBox">
				<image :src="$imgUrl('/images/equities/product/202201101901097353.png')" v-if="commendType != 1" class="icon" mode=""></image>
				<image :src="$imgUrl('/images/equities/product/202205131040557555.png')" v-if="commendType == 1" class="icon" mode=""></image>
			</view>
			<view class="text">支持 <text class="num">{{up}}</text></view>
		</view>
		<view class="btnItem" v-if="collection">
			<view class="iconBox"></view>
			<view class="text">收藏 <text class="num">{{collection}}</text></view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"CluesActions",
		props: {
			commendType: {
				type: [Number, String],
				default: ''
			},
			down: {
				type: [Number, String],
				default: ''
			},
			up: {
				type: [Number, String],
				default: ''
			},
			collection: {
				type: [Number, String],
				default: ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cluesActions{
		display: flex;
		.btnItem{
			font-size: 24rpx;
			flex: 1;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #8694AA;
			.iconBox{
				width: 64rpx;
				height: 64rpx;
				.icon{
					display: block;
					width: 100%;
					height: 100%;
				}
			}
			.text{
				.num{
					margin-left: 6rpx;;
				}
			}
		}
	}
</style>
