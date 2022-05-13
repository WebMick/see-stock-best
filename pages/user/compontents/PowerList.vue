<template>
	<view class="powerList">
		<view class="powerTitle">
			<ContentHead title="专属特权" />	
		</view>
		<view class="list">
			<view class="item" v-for="(item, index) in powerList" :key="index">
				<image :src="$imgUrl(item.icon)" class="icon" mode=""></image>
				<view class="title">
					{{item.title}}
				</view>
			</view>
		</view>
	</view>
</template>
 
<script>
	import { mapGetters } from 'vuex';
	export default {
		name: '',
		computed: {
			...mapGetters(['v_userInfo']),
			powerList(){
				let { v_userInfo: { power }, iconList } = this;
				let list = [];
				for (let key in power) {
					list.push({title: power[key], icon: iconList[key]});
				}
				return list;
			}
		},
		data(){
			return {
				iconList: {
					1: '/images/equities/privilege/1/xinxiu.png',
					2: '/images/equities/privilege/2/xinxiu.png',
					3: '/images/equities/privilege/3/xinxiu.png',
					4: '/images/equities/privilege/4/xinxiu.png',
					5: '/images/equities/privilege/5/xinxiu.png',
					6: '/images/equities/privilege/6/xinxiu.png',
					7: '/images/equities/privilege/7/xinxiu.png',
					8: '/images/equities/privilege/8/xinxiu.png'
				}
			}
		},
		methods:{
			
		}
	}
</script>
 
<style lang="scss" scoped>
	.powerList{
		margin: 32rpx 0 0;
		overflow: hidden;
		background: #fff;
		border-radius: 28rpx 28rpx 0 0;
		.powerTitle{
			padding: 20rpx 32rpx;
		}
		.list{
			overflow: hidden;
			.item{
				float: left;
				width: 25%;
				padding-bottom: 20rpx;
				.icon{
					width: 60rpx;
					height: 60rpx;
					margin: 0 auto;
					display: block;
				}
				.title{
					font-size: 28rpx;
					color: #606266;
					text-align: center;
					margin-top: 24rpx;
				}
			}
		}
	}
</style>
