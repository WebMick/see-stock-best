<template>
	<view class="cellList">
		<view class="item" 
			v-for="(item, index) in list" 
			:key="index">
			<view class="title">{{item.title}}</view>
			<image class="icon" :src="$imgUrl('/images/equities/product/202205091045363558.png')" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		name:"CellList",
		props: {
			list: {
				type: Array,
				default: () => []
			}
		}
	}
</script>

<style lang="scss">
	.cellList{
		.item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 88rpx;
			border-bottom: 1px solid #F4F5F6;
			&:last-child{
				border-bottom: none;
			}
			.title{
				font-size: 30rpx;
			}
			.icon{
				width: 18rpx;
				height: 26rpx;
			}
		}
	}
</style>
