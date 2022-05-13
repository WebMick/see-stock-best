<template>
	<view class="mustSee">
		<view class="mTitle">
			<ContentHead title="必看行情" :hasMoreArrow="false" :moreText="mustSeeData.quantify.tipMsg" />
		</view>
		<view class="relatedPlate">
			<view class="title">相关板块</view>
			<view class="list" v-if="mustSeeData && mustSeeData.industry">
				<scroll-view class="scrollBox" :scroll-x="true" :scroll-y="false" >
					<view class="item" v-for="(item, index) in mustSeeData.industry" :key="index">
						<view class="name">{{item.bk_name}}</view>
						<view class="ratio fontMiddle" :class="[$setClass(item.bk_range_ratio)]">{{$setAddSymbol(item.bk_range_ratio)}}%</view>
						<view class="recommendBox">
							<view class="recommendItem" v-for="(cItem, cIndex) in item.recommend" :key="index">
								<view class="recommendName">{{cItem.title}}</view>
								<view class="recommendRatio fontMiddle" :class="[$setClass(cItem.ratio)]">{{$setAddSymbol(cItem.ratio)}}%</view>
							</view>
						</view>
						<view class="rank">行业排名 {{item.bk_rank}}/{{item.bk_count}}</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="priceBox">
			<view class="item">
				<image :src="$imgUrl('/images/equities/product/202202081459026530.png')" class="bg" mode=""></image>
				<view class="text label">短线压力位</view>
				<view class="text num">{{mustSeeData.analysis.pressure.value}}</view>
			</view>
			<view class="item">
				<image :src="$imgUrl('/images/equities/product/202202081459181564.png')" class="bg" mode=""></image>
				<view class="text label">短线支撑位</view>
				<view class="text num">{{mustSeeData.analysis.support.value}}</view>
			</view>
		</view>
		<view class="numberBox">
			<view class="list" v-if="mustSeeData && mustSeeData.analysis && mustSeeData.analysis.data">
				<view class="item" 
					v-for="(item, index) in mustSeeData.analysis.data" 
					:class="{first: index == 0, fontLight: index != 0}"
					:key="index">
					<view class="col " v-for="(cItem, cIndex) in item" :key="cIndex">
						<view class="text" v-if="cItem.dataType == 2">{{cItem.value}}</view>
						<view class="text textUp" v-if="cItem.dataType == 3">{{cItem.value}}</view>
						<view class="text textFlat" v-if="cItem.dataType == 4">{{cItem.value}}</view>
						<view class="text textDown" v-if="cItem.dataType == 5">{{cItem.value}}</view>
						<view class="text" v-if="cItem.dataType == 7">
							<template v-if="cItem.valueGroup && cItem.valueGroup.length > 2">
								<text class="textUp">{{cItem.valueGroup[0]}}</text>/
								<text class="textFlat">{{cItem.valueGroup[1]}}</text>/
								<text class="textDown">{{cItem.valueGroup[2]}}</text>
							</template>
							<template v-else>
								<text class="textUp">{{cItem.valueGroup[0]}}</text>/
								<text class="textDown">{{cItem.valueGroup[1]}}</text>
							</template>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
 
<script>
	export default {
		name: '',
		props: {
			mustSeeData: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		methods:{
			
		}
	}
</script>
 
<style lang="scss" scoped>
	.mustSee{
		margin-top: 24rpx;
		padding: 0 24rpx 24rpx;
		padding-bottom: calc(env(safe-area-inset-bottom) + 120rpx); 
		background: #fff;
		overflow: hidden;
		.mTitle{
			margin-top: 24rpx;
		}
		.relatedPlate{
			height: 192rpx;
			margin-top: 24rpx;
			display: flex;
			.title{
				width: 48rpx;
				float: left;
				color: #909399;
				font-size: 26rpx;
				line-height: 40rpx;
				padding: 16rpx 0;
			}
			.list{
				flex: 1;
				position: relative;
				.scrollBox{
					position: absolute;
					left: 0;
					top: 0;
					width: calc(100% + 24rpx);
					height: 100%;
					white-space: nowrap;
					.item{
						display: inline-block;
						margin-right: 16rpx;
						width: 212rpx;
						height: 192rpx;
						background: rgba(25,136,244,0.01);
						border: 1px solid rgba(25,136,244,0.10);
						border-radius: 8rpx;
						padding: 22rpx 0 0 16rpx;
						.name{
							font-size: 26rpx;
							font-weight: bold;
						}
						.ratio{
							margin-top: 13rpx;
							font-size: 30rpx;
						}
						.recommendBox{
							margin-top: 13rpx;
							.recommendItem{
								display: flex;
								align-items: center;
								.recommendName{
									font-size: 22rpx;
									color: #606266;
								}
								.recommendRatio{
									font-size: 22rpx;
									margin-left: 10rpx;
								}
							}
						}
						.rank{
							margin-top: 22rpx;
							font-size: 22rpx;
							display: flex;
							color: #909399;
						}
					}
				}
			}
			
		}
		.priceBox{
			margin-top: 24rpx;
			display: flex;
			.item{
				flex: 1;
				height: 80rpx;
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				background: rgba(25, 136, 244, 0.03);
				.bg{
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
				}
				&:nth-child(2){
					margin-left: 18rpx;
				}
				.text{
					position: relative;
					z-index: 3;
					color: #1988F4;
					font-size: 28rpx;
					font-weight: bold;
				}
				.num{
					margin-left: 20rpx;
				}
			}
		}
		.numberBox{
			margin-top: 24rpx;
			.list{
				display: flex;
				border-bottom: rgba(25,136,244,0.10) solid 1px;
				border-left: rgba(25,136,244,0.10) solid 1px;
				.item{
					flex: 1;
					display: flex;
					flex-direction: column;
					margin: 0;
					min-width: 123rpx;
					max-width: 123rpx;
					&.first{
						min-width: 98rpx;
						max-width: 98rpx;
						.col{
							justify-content: flex-start;
							padding-left: 12rpx;
							font-size: 22rpx;
						}
					}
					.col{
						position: relative;
						white-space: pre-line;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 26rpx;
						line-height: 30rpx;
						max-height: 80rpx;
						min-height: 80rpx;
						border-top: rgba(25,136,244,0.10) solid 1px;
						border-right: rgba(25,136,244,0.10) solid 1px;
					}
				}
			}
		}
	}
</style>
