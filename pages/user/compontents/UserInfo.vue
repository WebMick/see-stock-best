<template>
	<view class="userInfo">
		<view class="top">
			<view class="headImg">
				<image v-if="v_userInfo.headimgurl" class="img" :src="v_userInfo.headimgurl" mode=""></image>
				<image v-if="!v_userInfo.headimgurl" class="img" :src="v_userInfo.default_user_icon" mode=""></image>
			</view>
			<view class="info">
				<view class="name">{{v_userInfo.nickname}}</view>
				<view class="score">当前股力值： <view class="textUp">{{v_userInfo.score}}</view></view>
			</view>
		</view>
		<view class="btnBox">
			<view class="btnItem">
				<image class="icon" :src="$imgUrl('/images/equities/product/202205091614287372.png')" mode=""></image>
				<view class="text">竞猜记录</view>
			</view>
			<view class="line"></view>
			<view class="btnItem">
				<image class="icon" :src="$imgUrl('/images/equities/product/202205091616544307.png')" mode=""></image>
				<view class="text">我的笔记</view>
			</view>
			<view class="line"></view>
			<view class="btnItem">
				<image class="icon" :src="$imgUrl('/images/equities/product/202205091623439495.png')" mode=""></image>
				<view class="text">我的积分</view>
			</view>
		</view>
		<view class="bgBox"></view>
	</view>
</template>
 
<script>
	import { mapGetters } from 'vuex';
	export default {
		name: '',
		computed: {
			...mapGetters(['v_userInfo'])
		},
		data(){
			return {
				
			}
		},
		methods:{
			
		}
	}
</script>
 
<style lang="scss" scoped>
	.userInfo{
		height: 180rpx;
		margin: 40rpx 32rpx 0;
		background-color: #Fff;
		border-radius: 16rpx;
		box-shadow: 0 1px 8px 0 rgba(134,148,170,0.10);
		.top{
			padding: 0 24rpx;
			display: flex;
			height: 90rpx;
			align-items: center;
			.headImg{
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				overflow: hidden;
				border: #fff solid 2px;
				margin-top: -30rpx;
				background: #fff;
				.img{
					display: block;
					width: 100%;
					height: 100%;
				}
			}
			.info{
				margin-left: 20rpx;
				.name{
					font-size: 30rpx;
				}
				.score{
					font-size: 24rpx;
					color: #8694aa;
					margin-top: 8rpx;
					display: flex;
					align-items: center;
				}
			}
		}
		.btnBox{
			display: flex;
			align-items: center;
			margin-top: 5rpx;
			.line{
				height: 32rpx;
				width: 1rpx;
				background: #BCBEC2;
				border-radius: 1rpx;
				opacity: 0.4;
			}
			.btnItem{
				flex: 1;
				height: 80rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				.icon{
					width: 35rpx;
					height: 35rpx;
				}
				.text{
					margin-left: 10rpx;
					font-size: 28rpx;
				}
			}
		}
	}
</style>
