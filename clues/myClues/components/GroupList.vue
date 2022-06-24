<template>
	<view class="groupList">
		<view class="item" 
			v-for="(item, index) in listData"
			 :class="{open: item.isOpen}"
			:key="index">
			<view class="head" 
				@longpress.stop="longpress(item, index)"
				@click.stop="toggle(item,index)">
				<view class="left">
					<view class="title">
						<view class="text">{{item.nickname}}</view>
						<image v-if="item.rise == 1" class="icon" :src="$imgUrl('/images/equities/product/202112141606544660.png')" mode="" lazy-load="false" > </image>
						<image v-if="item.rise == 2" class="icon" :src="$imgUrl('/images/equities/product/202112141604303577.png')" mode="" lazy-load="false" > </image>
					</view>
					<view class="time">{{item.day}}</view>
				</view>
				<view class="right">
					<view class="text">本周涨幅</view>
					<view class="num fontRegular" :class="[$setClass(item.this_week_range)]">{{$setAddSymbol(item.this_week_range)}}%</view>
					<image class="icon" :src="$imgUrl('/images/equities/product/202202231108392741.png')" mode="" lazy-load="false" > </image>
				</view>
				<view class="del" @click.stop="del(item, index)" v-if="item.isShowDel">×</view>
			</view>
			<view class="list">
				<StockList
					:list="item.equities_list" 
					/>
			</view>
		</view>
	</view>
</template>
 
<script>
	export default {
		name: '',
		props:{
			listData: {
				type: Array,
				default: () => []
			}
		},
		methods:{
			toggle(item, index){
				let { listData } = this;
				if(listData[index].isShowDel){
					listData[index].isShowDel = false;
				}else{
					listData[index].isOpen = !listData[index].isOpen;
				}
				this.$emit('update:listData', listData);
			},
			longpress(item, index){
				let { listData } = this;
				listData[index].isShowDel = !listData[index].isShowDel;
				this.$emit('update:listData', listData);
			},
			del(item, index){
				let { uid: clues_uid } = item;
				let params = {
					clues_uid
				};
				uni.showModal({
					content: '要删除自选组合吗?',
					showCancel: true,
					cancelText: '取消',
					confirmText: '删除',
					success: (result) => {
						if(result.confirm){
							this.$api.cluesFollowDel(params).then(res => {
								let { listData } = this;
								listData.splice(index, 1);
								this.$emit('update:listData', listData);
							});
						}
					}
				});
			}
		}
	}
</script>
 
<style lang="scss" scoped>
	.groupList{
		padding: 24rpx 24rpx 0;
		.item{
			margin-bottom: 24rpx;
			background-color: #fff;
			border-radius: 16rpx;
			box-shadow: 0 0 12rpx 0 rgba(74, 76, 80, 0.1);
			.head{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 24rpx;
				position: relative;
				.del{
					position: absolute;
					right: -15rpx;
					top: -15rpx;
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
					background-color: #fff;
					box-shadow: 0 0 12rpx 0 rgba(74, 76, 80, 0.1);
					display: flex;
					align-items: center;
					justify-content: center;
					color: #606266;
				}
				.left{
					.title{
						display: flex;
						align-items: center;
						.text{
							font-size: 30rpx;
							font-weight: bold;
						}
						.icon{
							margin-left: 8rpx;
							width: 64rpx;
							height: 36rpx;
						}
					}
					.time{
						margin-top: 16rpx;
						font-size: 24rpx;
						color: #606266;
						display: flex;
						align-items: center;
						.icon{
							width: 22rpx;
							height: 16rpx;
							margin-left: 10rpx;
						}
					}
				}
				.right{
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					.text{
						color: #606266;
						font-size: 22rpx;
					}
					.num{
						font-size: 28rpx;
						margin: 8rpx 0;
					}
					.icon{
						width: 22rpx;
						height: 16rpx;
						transition: all .3s;
					}
				}
			}
			.list{
				overflow: hidden;
				max-height: 0;
				transition: all .5s;
			}
			&.open{
				.right{
					.icon{
						transform: rotate(180deg);
					}
				}
				.list{
					max-height: 100vh;
				}
			}
		}
	}
</style>