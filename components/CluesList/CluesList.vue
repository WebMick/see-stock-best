<template>
	<view class="list">
		<view class="item" v-for="(item, index) in list" :key="index">
			<view class="head">
				<view class="title">
					<text class="text">{{item.nickName}}</text>
					<image class="icon" v-if="item.guessType == 1" :src="$imgUrl('/images/equities/product/202203011659051093.png')" mode=""></image>
					<image class="icon" v-if="item.guessType == 2" :src="$imgUrl('/images/equities/product/202203011658567879.png')" mode=""></image>
				</view>
				<view class="tips">
					本周涨幅:
					<text class="text fontMiddle" :class="[$setClass(item.weekRatio)]">{{$setAddSymbol(item.weekRatio)}}%</text>
				</view>
			</view>
			<view class="typeList">
				<template v-for="(cItem, cIndex) in item.guessIndustry">
					<view class="typeItem" v-if="cIndex < 3" :key="cIndex">
						<image class="icon" :src="$imgUrl(cItem.img)" mode="aspectFit"></image>
						<view class="text">{{cItem.title}}</view>
					</view>
				</template>
			</view>
			<view class="actionBox">
				<CluesActions 
					:sData="item"
					@action="action"
					/>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		name:"CluesList",
		props: {
			list: {
				type: Array,
				default: () => []
			}
		},
		methods: {
			action(type){
				this.$emit('action')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list{
		.item{
			margin-bottom: 24rpx;
			background-color: #fff;
			border-radius: 16rpx;
			padding: 24rpx 24rpx 0;
			box-shadow: 0 0 12rpx 0 rgba(74, 76, 80, 0.1);
			&:last-child{
				margin-bottom: 0;
			}
			.head{
				padding-bottom: 24rpx;
				display: flex;
				border-bottom: #F4F5F6 solid 1px;
				justify-content: space-between;
				align-items: center;
				.title{
					display: flex;
					align-items: center;
					.text{
						font-weight: bold;
						font-size: 28rpx;
					}
					.icon{
						width: 64rpx;
						height: 36rpx;
						margin-left: 8rpx;
					}
				}
				.tips{
					font-size: 24rpx;
					color: #8694aa;
					.text{
						font-size: 32rpx;
						margin-left: 10rpx;
					}
				}
			}
			.typeList{
				display: flex;
				.typeItem{
					flex: 1;
					position: relative;
					height: 100rpx;
					min-width: 170rpx;
					margin-left: 20rpx;
					overflow: hidden;
					border-radius: 10rpx;
					&:first-child{
						margin-left: 0;
					}
					.icon{
						width: 100%;
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
					}
					.text{
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%,-50%);
						text-shadow: 0px 2px 12px rgba(0, 0, 0, 0.2);
						font-size: 26rpx;
						font-weight: bold;
						color: #fff;
						white-space: nowrap;
					}
				}
			}
			.actionBox{
				
			}
		}
	}
</style>
