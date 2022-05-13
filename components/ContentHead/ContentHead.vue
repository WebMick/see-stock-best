<template>
	<view class="contentHead">
		<view class="title">{{title}}</view>
		<view class="more" v-if="hasMore">
			<view class="text">
				<slot name="more">
					{{moreText}}
				</slot>
			</view>
			<view class="arrow" v-if="hasMoreArrow">
				<image class="icon" :src="$imgUrl('/images/equities/product/202205091045363558.png')" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"ContentHead",
		props: {
			title: {
				type: String,
				default: '内容标题'
			},
			moreText: {
				type: String,
				default: ''
			},
			hasMore: {
				type: Boolean,
				default: true
			},
			hasMoreArrow: {
				type: Boolean,
				default: true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contentHead{
		display: flex;
		$height: 40rpx;
		align-items: center;
		justify-content: space-between;
		.title{
			font-size: 32rpx;
			font-weight: bold;
		}
		.more{
			display: flex;
			align-items: center;
			padding-left: 20rpx;
			.text{
				font-size: 22rpx;
				color: #8694aa;
			}
			.arrow{
				margin-left: 5rpx;
				height: $height;
				display: flex;
				align-items: center;
				justify-content: center;
				.icon{
					width: 18rpx;
					height: 26rpx;
				}
			}
		}
	}
</style>
