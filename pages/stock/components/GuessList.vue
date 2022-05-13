<template>
	<view class="guessList" v-if="list && list.length > 0 || (weekGuessCurrenData && weekGuessCurrenData.black_tip_message)">
		<view class="title">我的竞猜</view>
		<view class="list"
			v-if="list && list.length > 0">
			<view class="item">日: </view>
			<view class="item" v-for="(item, index) in list" :key="index">
				<view class="name" :class="[$setClass(item.range_ratio)]">{{item.name}}</view>
				<view class="split">-</view>
				<view class="guess" :class="{textUp: item.user_guess == 1,textDown: item.user_guess == 2}">
					({{item.user_guess == 1 ? '涨' : '跌'}})
				</view>
			</view>
		</view>
		<view class="list" 
			v-if="weekGuessCurrenData && weekGuessCurrenData.black_tip_message"
			>
			<view class="item">周: </view>
			<view class="item">
				<view class="name">{{weekGuessCurrenData.black_tip_message}}</view>
				<view class="value" :class="{textUp: weekGuessCurrenData.guess_range.rise == 1,textDown: weekGuessCurrenData.guess_range.rise == 2}">
					猜:{{weekGuessCurrenData.guess_range.value}}
				</view>
				<view class="value" :class="[$setClass(weekGuessCurrenData.current_range.value)]">
					当前:{{weekGuessCurrenData.current_range.value}}
				</view>
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
			},
			weekGuessCurrenData: {
				type: Object,
				default: function(){
					return {}
				}
			}
		},
		methods:{
			
		}
	}
</script>
 
<style lang="scss" scoped>
	.guessList{
		overflow: hidden;
		padding: 15rpx 0;
		border-bottom: #f4f5f6 solid 1px;
		.title{
			
			font-size: 26rpx;
		}
		.list{
			overflow: hidden;
			.item{
				float: left;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 10rpx 15rpx 0 0;
				font-size: 24rpx;
				.split{
					color: #BCBEC2;
				}
				.value{
					margin-left: 10rpx;
				}
			}
		}
	}
</style>
