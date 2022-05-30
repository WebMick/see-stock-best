<template>
	<view class="cluesNav">
		<view class="item" @click="toPage('/clues/myClues/myClues')">
			<view class="title">
				<image class="icon" :src="$imgUrl('/images/equities/product/202205121801333997.png')" mode=""></image>
				<text class="text">自选组合</text>
			</view>
			<view class="sub">我关注的自选</view>
		</view>
		<view class="item" @click="toPage(2)">
			<view class="title">
				<image class="icon" :src="$imgUrl('/images/equities/product/202205121802532201.png')" mode=""></image>
				<text class="text">搜索查找组合</text>
			</view>
			<view class="sub">发现优质组合</view>
		</view>
		<view class="item" @click="toPage()">
			<view class="title">
				<image class="icon" :src="$imgUrl('/images/equities/product/202205121803046210.png')" mode=""></image>
				<text class="text">组合排行榜</text>
			</view>
			<view class="sub">趣看实力组合</view>
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
			toPage(url){
				this.$uniApi.navTo({
					url
				})
			}
		}
	}
</script>
 
<style lang="scss" scoped>
	.cluesNav{
		margin: 24rpx 24rpx 0;
		display: flex;
		.item{
			flex: 1;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			border-radius: 15rpx;
			&:nth-child(1){
				background: #fff9f1;
			}
			&:nth-child(2){
				background: #f2f6ff;
				margin: 0 15rpx;
			}
			&:nth-child(3){
				background: #feeeef;
			}
			.title{
				display: flex;
				align-items: center;
				justify-content: center;
				.icon{
					width: 26rpx;
					height: 26rpx;
					margin-right: 10rpx;
				}
				.text{
					font-size: 24rpx;
					font-weight: bold;
				}
			}
			.sub{
				font-size: 22rpx;
				color: #8694aa;
				margin-top: 20rpx;
			}
		}
	}
</style>
