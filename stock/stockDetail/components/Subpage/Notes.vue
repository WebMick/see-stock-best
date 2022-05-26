<template>
	<view class="subpage notes">
		<scroll-view class="scrollBox" scroll-y="true">
			<view class="main">
				<view class="list" v-if="list && list.length > 0">
					<view class="item" v-for="(item, index) in list" :key="index">
						<view class="day">{{item.createTime}}</view>
						<view class="itemList">
							<view class="cItem" 
								v-for="(cItem, cIndex) in item.child" 
								:key="cIndex">
								
								<view class="textBox" :class="['type' + cItem.type]">
									<template  v-if="cItem.title && cItem.price">
										<view class="title">{{cItem.time}} {{cItem.title}} {{cItem.price}}</view>
										<view class="content">{{cItem.content}}</view>
									</template>
									<template v-else>
										<text class="time">{{cItem.time}}</text>
										<text class="content">{{cItem.content}}</text>
									</template>
								</view>
							</view>
						</view>
					</view>
				</view>
				<template v-if="!(list && list.length > 0)">
					<Empty 
						title="暂无笔记"
						subTitle="快来记录更多笔记吧"
						/>		
				</template>
			</view>
		</scroll-view>
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
			
		}
	}
</script>
 
<style lang="scss" scoped>
	@import  './common.scss';
	.notes{
		.main{
			.list{
				overflow: hidden;
				.item{
					display: flex;
					.day{
						font-size: 26rpx;
						padding: 33rpx 0;
						margin-right: 8rpx;
					}
					.itemList{
						flex: 1;
						.cItem{
							font-size: 28rpx;
							align-items: center;
							margin-bottom: 20rpx;
							display: flex;
							.time{
								margin-right:  8rpx;
								color: #909399;
								font-size: 26rpx;
							}
							.textBox{
								flex: 1;
								padding: 26rpx 15rpx;
								line-height: 40rpx;
								border-radius: 8rpx;
								&.type0{
									background: #F3F9FE;
								}
								&.type1{
									background: #FFF6F7;
									.title{
										color: #FE5269;
									}
								}
								&.type2{
									background: #F2FBF9;
									.title{
										color: #02BD85;
									}
								}
								.content{
									color: #606266;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
