<template>
	<view class="redEven">
		<view class="main" :class="{open: isOpen}">
			<view class="before">
				<image :src="$imgUrl('/images/equities/product/202205101130268438.png')"  mode="" class="itemBg"></image>
				<image @click="open()" :src="$imgUrl('/images/equities/product/202205101130417454.png')" mode="" class="btnOpen"></image>
			</view>
			<view class="after">
				<view class="title">现金红包</view>
				<view class="subTitle">直接到账微信零钱</view>
				<view class="moneyBox">
					<template v-if="isOpen">
						<view class="fontMiddle">
							<u-count-to
								ref="uCountTo"
								fontSize="inherit"
								color="inherit"
								:start-val="0.1" 
								:end-val="amount" 
								:duration="1300" 
								:useEasing="false" 
								:decimals="2"
								/>
						</view>
					</template>
					<view class="unit">元</view>
				</view>
				<view class="btnRecord">查看领取记录></view>
			</view>
		</view>
		<image :src="$imgUrl('/images/equities/product/202112311605235919.png')" @click="close" class="close" mode="widthFix"></image>
	</view>
</template>

<script>
	export default {
		name:"RedEven",
		data(){
			return {
				isOpen: false,
				amount: 0
			}
		},
		methods:{
			open(){
				this.$api.openRedEven().then(res => {
					let { data, code } = res;
					if(code == 0){
						this.isOpen = true;
						this.amount = data.guess_total_amount;
						this.$nextTick(()=>{
							this.$refs.uCountTo.start();
						})
					}
				});
			},
			close(){
				let { isOpen } = this;
				this.$emit('close', isOpen);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.redEven{
		.main{
			position: relative;
			perspective: 400;
			display: block;
			width: 512rpx;
			height: 680rpx;
			&.open{
				.before{
					transform: rotateY(-180deg);
				}
				.after{
					transform: rotateY(0);
				}
			}
			.before,.after{
				position: absolute;
				left: 0;
				width: 100%;
				height: 100%;
				transform-style: preserve-3d;
				transition: all .8s;
				backface-visibility: hidden;
				box-shadow: 0px 0px 20rpx 0px rgba(243, 85, 67, 1), 0px 0px 20rpx 0px rgba(243, 85, 67, 0.3);
				border-radius: 42rpx;
			}
			.before{
				transform: rotateY(0);
				z-index: 2;
				.itemBg{
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
				}
				.btnOpen{
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					border-radius: 50%;
					box-shadow: 0px 0px 18rpx 0px rgba(255, 255, 255, 0.4);
					width: 248rpx;
					height: 248rpx;
					bottom: 64rpx;
				}
			}
			.after{
				transform: rotateY(180deg);
				z-index: 1;
				background-color: #F35D4C;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				color: #FFE2B1;
				.title{
					font-size: 48rpx;
					letter-spacing: 5rpx;
				}
				.subTitle,.btn{
					margin-top: 20rpx;
					font-size: 28rpx;
					opacity: 0.5;
					letter-spacing: 5rpx;
				}
				.moneyBox{
					margin-top: 30rpx;
					font-size: 144rpx;
					display: flex;
					.unit{
						font-size: 42rpx;
						margin-left: 10rpx;
						margin-top: 105rpx;
					}
				}
				.btnRecord{
					position: absolute;
					left: 0;
					bottom: 30rpx;
					width: 100%;
					text-align: center;
					font-size: 24rpx;
					opacity: 0.7;
				}
			}
		}
		.close{
			display: block;
			margin: 50rpx auto 0;
			width: 52rpx;
			height: 52rpx;
		}
	}
</style>
