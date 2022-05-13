<template>
	<view class="tabbar">
		<view class="item"
			v-for="(item, index) in tabbarData"
			:key="index"
			@click="switchTab(item)" 
			:class="{selected: selected == item.id}" >
			<image class="icon" v-show="selected == item.id" :src="$imgUrl(item.selectedIconPath)" mode=""></image>
			<image class="icon" v-show="selected != item.id" :src="$imgUrl(item.iconPath)" mode=""></image>
			<text class="text">{{item.title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"Tabbar",
		props: {
			selected: {
				type: [String, Number],
				default: 1
			}
		},
		data() {
			return {
				tabbarData: [
					{ 
						id: 1, 
						title: '自选', 
						pagePath: '/pages/stock/stock',
						iconPath: '/images/equities/product/202204271624002116.png',
						selectedIconPath: '/images/equities/product/202204271624178466.png'
					},
					{
						id: 2, 
						pagePath: '/pages/user/user',
						title: '我的', 
						iconPath: '/images/equities/product/202204271624259975.png',
						selectedIconPath: '/images/equities/product/202204271624374225.png'
					}
				]
			};
		},
		methods: {
			switchTab(item) {
				this.$uniApi.navTo({
					that: this,
					url: item.pagePath,
					type: 'switchTab'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabbar{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding-bottom: env(safe-area-inset-bottom);
		background: rgba(255, 255, 255, 0.75);
		box-shadow: 0 -4px 6px 0 rgba(74,76,80,0.04);
		box-sizing: content-box;
		height: 98rpx;
		display: flex;
		z-index: 99;
		.item{
			position: relative;
			z-index: 3;
			flex: 1;
			.icon{
				position: absolute;
				top: 8rpx;
				left: 50%;
				transform: translateX(-50%);
				width: 56rpx;
				height: 56rpx;
			}
			.text{
				position: absolute;
				top: 68rpx;
				left: 0;
				width: 100%;
				text-align: center;
				font-size: 20rpx;
			}
		}
	}
</style>
