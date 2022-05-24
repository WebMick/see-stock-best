<template>
	<view class="empty" :style="{height,backgroundColor}">
		<view class="emptyMain">
			<view class="iconBox">
				<image :src="$imgUrl(src)" class="icon" mode="scaleToFill"></image>
			</view>
			<view class="title" v-if="title">{{title}}</view>
			<view class="subTitle" v-if="subTitle">{{subTitle}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "Empty",
		/**
		 * src： 图标
		 * title: 主标题
		 * subTitle： 副标题
		 * height： 总高度
		 * iconWidth： 图标宽度
		 * iconHeight： 图标高度
		 * backgroundColor： 当前盒子背景色
		 * */
		props: {
			src: {
				default: '/images/equities/product/202109291552038159.png',
				type: String
			},
			title: {
				default: '暂无数据',
				type: String
			},
			subTitle: {
				default: '',
				type: String
			},
			height: {
				default: 'auto',
				type: String
			},
			backgroundColor: {
				default: '#fff',
				type: String
			}
		}
	}
</script>

<style lang="scss" scoped>
	.empty{
		display: flex;
		align-items: center;
		justify-content: center;
		.emptyMain{
			text-align: center;
			.iconBox{
				margin: 0 auto 16rpx;
				width: 200rpx;
				height: 200rpx;
				.icon{
					display: block;
					width: 100%;
					height: 100%;
				}
			}
			.title{
				font-size: 30rpx;
				margin-bottom: 24rpx;
			}
			.subTitle{
				color: #909399;
				font-size: 24rpx;
			}
		}
	}
</style>
