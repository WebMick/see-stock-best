<template>
	<view class="list">
		<view class="item" v-for="(item, index) in list" :key="index">
			<view class="info">
				<view class="name">{{item.name}}</view>
				<view class="code">{{item.code}}</view>
			</view>
			<view class="btnBox" @click="favorAdd(item, index)">
				<image v-if="item.user_have == 0" :src="$imgUrl('/images/equities/product/202204081730241031.png')" class="icon" mode=""></image>
				<text v-else class="text">已添加</text>
			</view>
		</view>
	</view>
</template>
 
<script>
	export default {
		name: '',
		props: {
			list: {
				type: Array,
				default: () => []
			}
		},
		methods:{
			favorAdd(item, index){
				let { code, user_have } = item;
				if(user_have != 0) return;
				this.$api.favorAdd({equities_code: code}).then(res => {
					let { list } = this;
					list[index].user_have = 1;
					uni.showToast({
						title: '已成功添加该自选股！',
						icon: 'none'
					})
					this.$emit('update:list', list);
				});
			}
		}
	}
</script>
 
<style lang="scss" scoped>
	.list{
		.item{
			margin: 0 32rpx;
			display: flex;
			align-items: center;
			border-bottom: #f4f5f6 solid 1px;
			height: 88rpx;
			&:last-child{
				border-bottom: none;
			}
			.info{
				flex: 1;
				.name{
					font-size: 28rpx;
				}
				.code{
					margin-top: 8rpx;
					font-size: 24rpx;
					color: #BCBEC2;
				}
			}
			.btnBox{
				width: 88rpx;
				height: 88rpx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				.icon{
					width: 40rpx;
					height: 40rpx;
				}
				.text{
					font-size: 24rpx;
					color: #909399;
				}
			}
		}
		
	}
</style>