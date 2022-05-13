<template>
	<view class="tabs">
		<template v-for="(item, index) in list">
			<view class="item"
				v-if="!item.hide"
				:key="index"
				:class="{current: current == item.id}"
				@click="change(item)"
				>
				<view class="text">{{item.name}}</view>
			</view>
		</template>
		
	</view>
</template>

<script>
	export default {
		name:"Tabs",
		props: {
			list: {
				type: Array,
				default: () => []
			},
			current: {
				type: [Number, String],
				default: 0
			}
		},
		methods: {
			change(item){
				this.$emit('change', item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabs{
		display: flex;
		align-items: center;
		.item{
			height: 70rpx;
			font-size: 26rpx;
			display: flex;
			align-items: center;
			padding: 0 22rpx;
			&.current{
				font-weight: bold;
			}
			&:first-child{
				padding-left: 0;
			}
		}
	}
</style>
