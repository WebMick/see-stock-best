<template>
	<view class="marketSwiper">
		<swiper class="swiperBox" 
			:indicator-dots="false"
			:current="current"
			@change="swiperChange"
			:autoplay="false">
			<swiper-item v-for="(item, index) in newList" class="swiperItem" :key="index">
				<view class="cItem" 
					:class="[$setClass(cItem.ratio)]"
					v-for="(cItem, cIndex) in item" :key="cIndex">
					<view class="name">
						{{cItem.name}}
					</view>
					<view class="price fontMiddle">
						{{cItem.newPrice}}
					</view>
					<view class="rangeBox fontMiddle">
						<view class="rangePrice">{{$setAddSymbol(cItem.rangePrice)}}</view>
						<view class="rangeRatio">{{$setAddSymbol(cItem.ratio)}}%</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="indicatorBox">
			<u-swiper-indicator
				:length="newListLength" 
				indicatorActiveColor="#1988F4"
				indicatorInactiveColor="#D8D8D8"
				:current="current" 
				/>
		</view>
	</view>
</template>
 
<script>
	export default {
		name: '',
		props:{
			list: {
				type: Array,
				default: () => []
			}
		},
		computed:{
			newList(){
				let { list, list: { length } } = this;
				let newList = [],
					index   = 0,
					group   = 3;
				if(list && length > 0){
					length = Math.ceil(length / group);
					for(let i = 0; i < length; i++){
						newList.push(list.slice(index, (index += group)));
					}
				};
				return newList;
			},
			newListLength(){
				let { newList: { length = 0 } } = this;
				return length;
			}
		},
		data(){
			return {
				current: 0
			}
		},
		methods:{
			swiperChange(e){
				let { detail: { current } } = e;
				this.current = current;
			}
		}
	}
</script>
 
<style lang="scss" scoped>
	.marketSwiper{
		padding: 10rpx 32rpx 0;
		overflow: hidden;
		.swiperBox{
			height: 164rpx;
			.swiperItem{
				display: flex;
				.cItem{
					flex: 1;
					border-radius: 8rpx;
					text-align: center;
					&:nth-child(2){
						margin: 0 16rpx;
					}
					&.textUp{
						background: linear-gradient(180deg, rgba(254, 82, 105, 0.1) 0%, rgba(255, 189, 203, 0.1) 100%);
					}
					&.textFlat{
						background: linear-gradient(180deg, rgba(134,148,170,0.10) 1%, rgba(200,209,224,0.10) 100%);
					}
					&.textDown{
						background: linear-gradient(180deg, rgba(2, 189, 133, 0.1) 0%, rgba(135, 255, 235, 0.1) 100%);
					}
					.name{
						color: #303133;
						font-size: 26rpx;
						margin-top: 28rpx;
					}
					.price{
						margin: 12rpx 0;
						font-size: 36rpx;
					}
					.rangeBox{
						font-size: 24rpx;
						display: flex;
						justify-content: center;
						.rangeRatio{
							margin-left: 16rpx;
						}
					}
				}
			}
		}
		.indicatorBox{
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 20rpx 0;
		}
	}
</style>
