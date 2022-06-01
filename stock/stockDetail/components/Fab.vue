<template>
	<view class="fabBox" :class="{open: isOpen, showGuess: isGuess}">
		<view class="btnIsShow" @click="change">
			<image :src="$imgUrl('/images/equities/product/202206011122556762.png')" class="icon" mode=""></image>
		</view>
		<view class="main">
			<view class="list">
				<view class="btnItem" @click="addOrDel">
					<image :src="$imgUrl('/images/equities/product/202206011144146448.png')" class="icon" mode=""></image>
					<view class="text">{{fabData && fabData.user_have_favor ? '已添加' : '加自选'}}</view>
				</view>
				<view class="btnItem" @click="noteInputShow">
					<image :src="$imgUrl('/images/equities/product/202206011144013073.png')" class="icon" mode=""></image>
					<view class="text">写笔记</view>
				</view>
				<view class="btnItem guess" @click="showGuess">
					<image :src="$imgUrl('/images/equities/product/202206011423311535.png')" class="icon" mode=""></image>
					<view class="text">猜涨跌</view>
				</view>
				<button open-type="share" id="fabShare" :data-params="fabData" class="btnItem">
					<image :src="$imgUrl('/images/equities/product/202206011144076760.png')" class="icon" mode=""></image>
					<view class="text">去分享</view>
				</button>
			</view>
		</view>
		<view class="btnGuess up" @click="guessHandler(1)">涨</view>
		<view class="btnGuess down" @click="guessHandler(2)">跌</view>
	</view>
</template>
 
<script>
	export default {
		name: '',
		props: {
			fabData: {
				type: Object,
				default: function(){
					return {}
				}
			}
		},
		data(){
			return {
				isOpen: false,
				isGuess: false
			}
		},
		methods:{
			change(){
				this.isOpen = !this.isOpen;
				if(!this.isOpen) this.isGuess = false;
			},
			// 写笔记
			noteInputShow(){
				this.isGuess = false;
				this.$emit('noteInputShow');
			},
			// 添加、删除自选
			addOrDel(){
				let { user_have_favor, code } = this.fabData;
				if(user_have_favor){
					uni.showModal({
						content: '确定要删除该自选股吗?',
						success: (res) => {
							let { confirm } = res;
							if(confirm){
								this.$api.favorDelete({ids: [code]}).then(res => {
									uni.showToast({
										title: '已成功删除该自选股！',
										icon: 'none'
									});
									this.$emit('init');
								});
							}
						}
					});
				}else{
					this.$api.favorAdd({equities_code: code}).then(res => {
						uni.showToast({
							title: '已成功添加该自选股！',
							icon: 'none'
						})
						this.$emit('init');
					});
				};
			},
			showGuess(){
				// 是否竞猜过，没猜显示按钮，猜了显示toast
				let { code } = this.fabData;
				this.$api.guessStockDetail({code}).then(res =>{
					let { data } = res;
					let { can_guess } = data;
					if(can_guess == 0){
						let { guess_info: { user_have_guess }, lastGuessCount, blue_tip_message, tip_message } = data;
						let title = blue_tip_message || tip_message;
						if(user_have_guess){
							if(user_have_guess == 1){
								title = '已经猜了 涨！'
							}
							else if(user_have_guess == 2){
								title = '已经猜了 跌！'
							}
						}else{
							if(lastGuessCount == 0){
								title = '竞猜次数已用完!'
							}
						}
						uni.showToast({
							title,
							icon: 'none'
						});
					}else{
						this.isGuess = !this.isGuess;
					}
				})
			},
			guessHandler(rise){
				let { code } = this.fabData;
				let params = {
					code,
					rise
				};
				uni.showModal({
					content: `想清楚没，居然猜${rise == 1 ? '涨' : '跌'}?`,
					success: (res) => {
						let { confirm, cancel } = res;
						if(confirm){
							this.$api.guessHandle(params).then(res => {
								let { code, data } = res;
								if(code == 0){
									uni.showToast({
										title: data.tip_message,
										icon: 'none'
									});
								}
							})
						}
					}
				})
			}
		}
	}
</script>
 
<style lang="scss" scoped>
	.fabBox{
		$size: 80rpx;
		position: fixed;
		right: 18rpx;
		bottom: 200rpx;
		z-index: 999;
		width: $size;
		height: $size;
		.btnIsShow{
			position: absolute;
			left: 0;
			top: 0;
			width: $size;
			height: $size;
			overflow: hidden;
			border-radius: 50%;
			z-index: 9;
			transition: all .3s;
			background-color: #1988F4;
			border: #1988F4 solid 1px;
			display: flex;
			align-items: center;
			justify-content: center;
			.icon{
				width: 75%;
				height: 75%;
			}
		}
		.main{
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			overflow: hidden;
			background-color: #fff;
			border: #fff solid 1px;
			border-radius: $size;
			max-height: $size;
			transition: all .3s;
			box-shadow: 0 1px 5px 2px rgba(0,0,0,.3);
			.list{
				padding-top: 10rpx;
				padding-bottom: $size;
				.btnItem{
					height: 90rpx;
					font-size: 20rpx;
					background-color: rgba(0,0,0,0);
					color: #606266;
					padding: 0;
					line-height: 1;
					position: relative;
					&:after{
						display: none;
					}
					.icon{
						display: block;
						width: 40rpx;
						height: 40rpx;
						margin: 10rpx auto;
					}
					.text{
						text-align: center;
					}
					
				}
			}
		}	
		.btnGuess{
			position: absolute;
			left: 0;
			top: 0;
			width: $size;
			height: $size;
			border-radius: 50%;
			color: #fff;
			font-size: 30rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			opacity: 0;
			transition: all .3s;
			&.up{
				background: #FE5269;
				left: -100rpx;
			}
			&.down{
				background: #02BD85;
				left: -200rpx;
			}
		}
		&.open{
			.btnIsShow{
				transform: rotate(135deg);
			}
			.main{
				max-height: 480rpx;
				
			}
			&.showGuess{
				.btnGuess{
					animation: btnGuessAni .3s ease both;
					&.down{
						animation-delay: .15s;
					}
				}
				.guess{
					.icon{
						animation: guessAni .5s ease both;
					}
				}
			}
		}
	}
	@keyframes btnGuessAni{
		0%{
			transform: translateY(400%);
			opacity: 0;
		}
		100%{
			transform: translateY(0);
			opacity: 1;
		}
	}
	@keyframes guessAni{
		0%,50%,100%{
			transform: translateY(0%);
		}
		25%{
			transform: translateY(-20%);
		}
		75%{
			transform: translateY(-10%);
		}
	}
</style>