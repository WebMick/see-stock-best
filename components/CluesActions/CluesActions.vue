<template>
	<view class="cluesActions">
		<view class="btnItem" :class="{act: sData.commendType == 2}" @click="action(2)">
			<view class="iconBox">
				<image :src="$imgUrl('/images/equities/product/202201101901181492.png')" v-if="sData.commendType != 2" class="icon" mode=""></image>
				<image :src="$imgUrl('/images/equities/product/202205131041452153.png')" v-if="sData.commendType == 2" class="icon" mode=""></image>
			</view>
			<view class="text">反对 <text class="num">{{sData.downCount}}</text></view>
		</view>
		<view class="btnItem" :class="{act: sData.commendType == 1}" @click="action(1)">
			<view class="iconBox">
				<image :src="$imgUrl('/images/equities/product/202201101901097353.png')" v-if="sData.commendType != 1" class="icon" mode=""></image>
				<image :src="$imgUrl('/images/equities/product/202205131040557555.png')" v-if="sData.commendType == 1" class="icon" mode=""></image>
			</view>
			<view class="text">支持 <text class="num">{{sData.upCount}}</text></view>
		</view>
		<!-- <view class="btnItem" v-if="collection">
			<view class="iconBox"></view>
			<view class="text">收藏 <text class="num">{{collection}}</text></view>
		</view> -->
	</view>
</template>

<script>
	export default {
		name:"CluesActions",
		props: {
			sData: {
				type: Object,
				default: function(){
					return {}
				}
			}
		},
		methods: {
			action(type){
				let { sData } = this;
				let { id } = sData;
				let params = {
					id,
					type
				};
				this.$api.cluesAction(params).then(res => {
					this.$emit('action')
				});
				
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
			&.act{
				color: #D9A23E;
			}
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
