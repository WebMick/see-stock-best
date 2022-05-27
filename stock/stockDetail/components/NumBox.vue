<template>
	<view class="numBox" v-if="sData && sData.common_info">
		<view class="topBox">
			<view class="left">
				<view class="newPriceBox">
					<view class="newPrice">
						<view class="text fontMiddle" :class="[$setClass(sData.base_info.new_price, sData.base_info.prev_close_px)]">{{sData.base_info.new_price}}</view>
						<view class="bg"></view>
					</view>
				</view>
				<view class="ratioBox">
					<view class="ratioNum">
						<text class="text fontRegular" :class="[$setClass(sData.base_info.new_price, sData.base_info.prev_close_px)]">{{$setAddSymbol(sData.base_info.range_price)}}</text>
						<text class="text fontRegular" :class="[$setClass(sData.base_info.new_price, sData.base_info.prev_close_px)]">{{$setAddSymbol(sData.base_info.range_ratio)}}%</text>
					</view>
					<template v-if="sData.common_info.type == 2">
						<view class="line"></view>
						<view class="module" :class="[$setClass(sData.common_info.bk_range_ratio)]">
							<text class="name">{{sData.common_info.bk_name}}</text>
							<text class="text fontLight">{{$setAddSymbol(sData.common_info.bk_range_ratio)}}%</text>
							<image class="arrow" :src="$imgUrl('/images/equities/product/202202221704215733.png')" mode=""></image>
						</view>
					</template>
				</view>
			</view>
			<view class="btn" @click="addOrDel" :class="{ed: sData.common_info.user_have_favor}">
				<template v-if="sData.common_info.user_have_favor">
					<text>已添加</text>
				</template>
				<template v-if="!sData.common_info.user_have_favor">
					<image class="icon" :src="$imgUrl('/images/equities/product/202202221738024621.png')" mode=""></image>
					<text>自选</text>
				</template>
			</view>
		</view>
		<view class="numList" @click.stop="showMore" :class="{more: more}">
			<!-- 指数 -->
			<template v-if="sData.common_info.type == 1">
				<view class="item">
					<view class="left">
						<text class="title">今开</text>
					</view>
					<view class="text fontLight" :class="[$setClass(sData.base_info.today_open_px, sData.base_info.prev_close_px)]">{{sData.base_info.today_open_px}}</view>
				</view>
				<view class="item">
					<view class="left">
						<text class="title">最高</text>
					</view>
					<view class="text fontLight" :class="[$setClass(sData.base_info.max_price, sData.prev_close_px)]">{{sData.base_info.max_price}}</view>
				</view>
				<view class="item">
					<view class="left">
						<text class="title">成交量</text>
					</view>
					<view class="text fontLight">{{sData.base_info.total_volume_trade}}</view>
				</view>
				<view class="item">
					<view class="left">
						<text class="title">昨收</text>
					</view>
					<view class="text fontLight">{{sData.base_info.prev_close_px}}</view>
				</view>
				<view class="item">
					<view class="left">
						<text class="title">最低</text>
					</view>
					<view class="text fontLight" :class="[$setClass(sData.base_info.min_price, sData.base_info.prev_close_px)]">{{sData.base_info.min_price}}</view>
				</view>
				<view class="item">
					<view class="left">
						<text class="title">成交额</text>
					</view>
					<view class="text fontLight">{{sData.base_info.total_value_trade}}</view>
				</view>
				<view class="item">
					<view class="left">
						<text class="title">上涨</text>
					</view>
					<view class="text fontLight">{{sData.base_info.constituent_count.t0}}</view>
				</view>
				<view class="item">
					<view class="left">
						<text class="title">平盘</text>
					</view>
					<view class="text fontLight">{{sData.base_info.constituent_count.t1}}</view>
				</view>
				<view class="item">
					<view class="left">
						<text class="title">下跌</text>
					</view>
					<view class="text fontLight">{{sData.base_info.constituent_count.t2}}</view>
				</view>
			</template>
			<!-- 个股 -->
			<template v-if="sData.common_info.type == 2">
				<view class="item">
					<view class="left">
						<text class="title">今开</text>
					</view>
					<view class="text fontLight" :class="[$setClass(sData.base_info.today_open_px, sData.base_info.prev_close_px)]">{{sData.base_info.today_open_px}}</view>
				</view>
				<view class="item">
					<view class="left">
						<text class="title">最高</text>
					</view>
					<view class="text fontLight" :class="[$setClass(sData.base_info.max_price, sData.prev_close_px)]">{{sData.base_info.max_price}}</view>
				</view>
				<view class="item">
					<view class="left">
						<text class="title">成交量</text>
					</view>
					<view class="text fontLight">{{sData.base_info.total_volume_trade}}</view>
				</view>
				<view class="item">
					<view class="left">
						<text class="title">昨收</text>
					</view>
					<view class="text fontLight">{{sData.base_info.prev_close_px}}</view>
				</view>
				<view class="item">
					<view class="left">
						<text class="title">最低</text>
					</view>
					<view class="text fontLight" :class="[$setClass(sData.base_info.min_price, sData.base_info.prev_close_px)]">{{sData.base_info.min_price}}</view>
				</view>
				<view class="item">
					<view class="left">
						<text class="title">成交额</text>
					</view>
					<view class="text fontLight">{{sData.base_info.total_value_trade}}</view>
				</view>
				<view class="item" @click.stop="showModal(changeHandTips)">
					<view class="left">
						<text class="title">换手率</text>
						<image :src="$imgUrl('/images/equities/product/202202231111498303.png')" class="icon" mode=""></image>
					</view>
					<view class="text fontLight">{{sData.base_info.change_hands}}</view>
				</view>
				<view class="item">
					<view class="left">
						<text class="title">市盈(动)</text>
					</view>
					<view class="text fontLight">{{sData.base_info.per_dynamic}}</view>
				</view>
				<view class="item">
					<view class="left">
						<text class="title">流通市值</text>
					</view>
					<view class="text fontLight">{{sData.base_info.move_market_value}}</view>
				</view>
				<template v-if="more">
					<view class="item">
						<view class="left">
							<text class="title">均价</text>
						</view>
						<view class="text fontLight">{{sData.base_info.ave_price}}</view>
					</view>
					<view class="item">
						<view class="left">
							<text class="title">市值</text>
						</view>
						<view class="text fontLight">{{sData.base_info.market_value}}</view>
					</view>
					<view class="item" @click.stop="showModal(perStaticTips)">
						<view class="left">
							<text class="title">市盈(静)</text>
							<image :src="$imgUrl('/images/equities/product/202202231111498303.png')" class="icon" mode=""></image>
						</view>
						<view class="text fontLight">{{sData.base_info.per_static}}</view>
					</view>
				</template>
			</template>
			<image class="arrow" :src="$imgUrl('/images/equities/product/202202231108392741.png')" mode=""></image>
			
		</view>
	</view>
</template>
 
<script>
	export default {
		name: '',
		props: {
			sData: {
				type: Object,
				default: function() {
					return {}
				}
			},
			code: {
				default: String,
				default: ''
			}
		},
		data(){
			return {
				more: false,
				changeHandTips: '换手率(实)=成交量/自由流通数*100%',
				perStaticTips: '市盈率(静)=总市值/上一年度净利润'
			}
		},
		methods:{
			showMore(){
				this.more = !this.more;
			},
			// 显示文本提示
			showModal(content){
				uni.showModal({
					content,
					showCancel: false,
					confirmText: '我知道了',
					confirmColor: '#1988F4',
					success: (res) => {
						
					}
				})
			},
			// 加/删自选
			addOrDel(){
				let { common_info: { code, user_have_favor } } = this.sData;
				if(user_have_favor){
					uni.showModal({
						content: '确定要删除该自选股吗?',
						success: (res) => {
							let { confirm } = res;
							if(confirm){
								this.$api.favorDelete({ids: [code]}).then(res => {
									let { sData } = this;
									sData.common_info.user_have_favor = false;
									uni.showToast({
										title: '已成功删除该自选股！',
										icon: 'none'
									});
									this.$emit('update:sData', sData);
								});
							}
						}
					});
				}else{
					this.$api.favorAdd({equities_code: code}).then(res => {
						let { sData } = this;
						sData.common_info.user_have_favor = true;
						uni.showToast({
							title: '已成功添加该自选股！',
							icon: 'none'
						})
						this.$emit('update:sData', sData);
					});
				};
			}
		}
	}
</script>
 
<style lang="scss" scoped>
	.numBox{
		background: #fff;
		.topBox{
			display: flex;
			justify-content: space-between;
			padding: 6rpx 32rpx 20rpx 28rpx;
			align-items: center;
			.left{
				.newPriceBox{
					display: flex;
					.newPrice{
						position: relative;
						padding: 0 8rpx;
						.text{
							position: relative;
							z-index: 3;
							font-size: 64rpx;
						}
						.bg{
							position: absolute;
							left: 0;
							top: 0;
							width: 100%;
							height: 100%;
							&.up{
								background: linear-gradient(-90deg, #FFFFFF 0%, #FE5269 100%);
							}
							&.down{
								background: linear-gradient(-90deg, #FFFFFF 0%, #02BD85 100%);
							}
						}
					}
				}
				.ratioBox{
					display: flex;
					align-items: center;
					.ratioNum{
						display: flex;
						align-items: center;
						.text{
							margin-right: 16rpx;
							font-size: 28rpx;
						}
					}
					.line{
						width: 1rpx;
						height: 20rpx;
						background: #BCBEC2;
						margin-right: 20rpx;
					}
					.module{
						display: flex;
						align-items: center;
						padding: 4rpx 8rpx;
						color: #8694AA;
						&.textUp{
							background: rgba(254, 82, 105, 0.05);
							border-radius: 2px;
							border: 1px solid rgba(254, 82, 105, 0.07);
							.text{
								color: #FE5269;
							}
						}
						&.textFlat{
							background: rgba(#8694AA, 0.07);
							border: 1px solid rgba(#8694AA, 0.07);
							.text{
								color: #8694AA;
							}
						}
						&.textDown{
							background: rgba(#02BD85, 0.07);
							border: 1px solid rgba(#02BD85, 0.07);
							.text{
								color: #02BD85;
							}
						}
						.name{
							font-size: 22rpx;
						}
						.text{
							margin-top: 4rpx;
							margin-left: 10rpx;
							font-size: 24rpx;
						}
						.arrow{
							width: 16rpx;
							height: 24rpx;
							margin-left: 4rpx;
						}
					}
				}
			}
			.btn{
				border-radius: 4rpx;
				border: 1px solid #1988F4;
				padding: 12rpx 24rpx;
				color: #1988F4;
				display: flex;
				align-items: center;
				font-size: 24rpx;
				.icon{
					width: 24rpx;
					height: 24rpx;
					margin-right: 4rpx;
				}
				&.ed{
					color: #909399;
					border-color: #BCBEC2;
				}
			}
		}
		.numList{
			overflow: hidden;
			padding: 0 32rpx 12rpx;
			position: relative;
			&.more{
				.arrow{
					transform: rotate(180deg);
				}
			}
			.item{
				float: left;
				width: 32%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;
				font-size: 24rpx;
				&:nth-child(3n+2){
					margin-left: 2%;
					margin-right: 2%;
				}
				.left{
					display: flex;
					align-items: center;
					.title{
						color: #8694AA;
					}
					.icon{
						width: 22rpx;
						height: 22rpx;
						margin-left: 4rpx;
					}
				}
				.text{
					font-size: 28rpx;
				}
			}
			.arrow{
				position: absolute;
				bottom: 8rpx;
				left: 50%;
				margin-left: -11rpx;
				width: 22rpx;
				height: 16rpx;
			}
		}
	}
</style>
