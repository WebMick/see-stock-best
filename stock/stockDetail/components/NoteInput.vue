<template>
	<view class="noteInput" :style="{'padding-bottom': keyHeight + 'px'}">
		<view class="title">
			<template v-if="sign == 1">
				<image :src="$imgUrl('/images/equities/product/202202081338321194.png')" class="icon" mode=""></image>
				<view class="text textUp">标记想买 <text class="num fontRegular">{{price}}</text></view>
			</template>
			<template v-if="sign == 2">
				<image :src="$imgUrl('/images/equities/product/202202081338491739.png')" class="icon" mode=""></image>
				<view class="text textDown">标记想卖 <text class="num fontRegular">{{price}}</text></view>
			</template>
		</view>
		<view class="iptBox">
			<u--textarea v-model="content" 
				height="164rpx"
				maxlength="150" 
				:adjustPosition="false"
				:holdKeyboard="true"
				:focus="isFocus"
				count 
				confirmType="发布"
				placeholder="请输入内容"
				/>
		</view>
		<view class="btnBox">
			<view class="left">
				<template v-if="commonInfo && commonInfo.type == 2">
					<view class="item" @click="signHandler(1)">
						<image v-if="sign != 1" :src="$imgUrl('/images/equities/product/202202081323161190.png')" class="icon" mode=""></image>
						<image v-if="sign == 1" :src="$imgUrl('/images/equities/product/202202081323593887.png')" class="icon" mode=""></image>
						<view class="text">标记想买</view>
					</view>
					<view class="item" @click="signHandler(2)">
						<image v-if="sign != 2" :src="$imgUrl('/images/equities/product/202202081326492251.png')" class="icon" mode=""></image>
						<image v-if="sign == 2" :src="$imgUrl('/images/equities/product/202202081326572276.png')" class="icon" mode=""></image>
						<view class="text">标记想卖</view>
					</view>
				</template>
			</view>
			<view class="btnSave" @click="save" :class="{dis: !content}">保存</view>
		</view>
	</view>
</template>
 
<script>
	export default {
		name: '',
		props: {
			commonInfo: {
				type: Object,
				default: function(){
					return {}
				}
			},
			minuteNewPrice: {
				type: Array,
				default: () => []
			}
		},
		data(){
			return {
				price: '',
				time: '',
				isFocus: false,
				content: '',
				keyHeight: 0,
				sign: 0
			}
		},
		mounted() {
			uni.onKeyboardHeightChange(res => {
				let { height } = res;
				this.keyHeight = height;
			});
		},
		destroyed() {
			this.reset();
		},
		methods:{
			getFocus(focus){
				this.isFocus = focus;
			},
			signHandler(sign){
				this.sign = this.sign == sign ? 0 : sign;
				if(this.sign){
					this.price = this.minuteNewPrice[1];
					this.time = this.minuteNewPrice[0];
				}
			},
			reset(){
				uni.offKeyboardHeightChange();
				this.isFocus = false;
				this.content = '';
				this.keyHeight = 0;
				this.sign = 0;
			},
			// 提交笔记
			save(){
				let { sign, content, commonInfo: { code }, price, time } =  this;
				let params = {
					type: sign,
					content,
					price,
					time,
					code
				};
				if(!time){
					params.time = this.minuteNewPrice[0];
				}
				this.$api.equityCommitNote(params).then(res => {
					let { code } = res;
					if(code == 0){
						uni.showToast({
							title: '笔记发布成功！',
							icon: 'none',
							success: () => {
								this.$emit('close');
							}
						})
					}
				});
			}
		}
	}
</script>
 
<style lang="scss" scoped>
	.noteInput{
		overflow: hidden;
		padding: 0 20rpx;
		.title{
			height: 95rpx;
			display: flex;
			align-items: center;
			font-size: 30rpx;
			.icon{
				width: 20rpx;
				height: 20rpx;
				margin-right: 12rpx;
			}
			.text{
				font-weight: bold;
				.num{
					margin-left: 8rpx;
					font-weight: normal;
				}
			}
		}
		.iptBox{
			height: 200rpx;
			overflow: hidden;
			border: #F9FAFC solid 1px;
			border-radius: 10rpx;
		}
		.btnBox{
			margin-top: 20rpx;
			margin-bottom: 40rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.left{
				display: flex;
				.item{
					padding: 0 36rpx;
					.icon{
						display: block;
						width: 56rpx;
						height: 56rpx;
						margin: 0 auto;
					}
					.text{
						font-size: 24rpx;
						line-height: 24rpx;
						margin-top: 12rpx;
					}
				}
			}
			.btnSave{
				width: 200rpx;
				height: 72rpx;
				border-radius: 36rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				line-height: 32rpx;
				font-size: 32rpx;
				color: #fff;
				background: #1988F4;
				&.dis{
					opacity: 0.2;
				}
			}
		}
	}
</style>