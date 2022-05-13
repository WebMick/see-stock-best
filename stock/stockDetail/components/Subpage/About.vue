<template>
	<view class="subpage about">
		<scroll-view class="scrollBox" scroll-y="true">
			<view class="main">
				<view class="aboutInfo">
					<ContentHead title="公司简介" />
					<view class="item">
						<view class="label">公司名称</view>
						<view class="info">
							<view class="text">{{aboutData.company_info.name}}</view>
						</view>
					</view>
					<view class="item">
						<view class="label">所属行业</view>
						<view class="info">
							<view class="text">{{aboutData.company_info.industry}}</view>
							<view class="text">{{aboutData.company_info.sub_industry}}</view>
						</view>
					</view>
					<view class="item">
						<view class="label">上市日期</view>
						<view class="info">
							<view class="text">{{aboutData.company_info.listed_date}}</view>
						</view>
					</view>
					<view class="item">
						<view class="label">发行价格</view>
						<view class="info">
							<view class="text">{{aboutData.company_info.offering_price}}</view>
						</view>
					</view>
					<view class="item">
						<view class="label">主营业务</view>
						<view class="info">
							<view class="text">{{aboutData.company_info.main_business}}</view>
						</view>
					</view>
				</view>
				<view class="analysis">
					<ContentHead title="经营分析" />
					<view class="list">
						<view class="item head">
							<view class="label"></view>
							<view class="infoBox">
								<view class="infoItem">
									<view class="name">名称</view>
									<view class="income">收入</view>
									<view class="ratio">占比</view>
								</view>
							</view>
							<view class="chart"></view>
						</view>
						<view class="item" v-for="(item, key, index) in aboutData.company_income" :key="index">
							<view class="label">
								<text v-if="key == 1">行业</text>
								<text v-if="key == 2">产品</text>
								<text v-if="key == 3">地区</text>
							</view>
							<view class="infoBox">
								<view class="infoItem" v-for="(cItem, cIndex) in item" :key="cIndex">
									<view class="name">
										<view class="icon" :class="'icon' + cIndex"></view>
										<text class="text">{{cItem.title}}</text>
									</view>
									<view class="income">{{cItem.operating_income}}</view>
									<view class="ratio">{{cItem.income_ratio}}%</view>
								</view>
							</view>
							<view class="chart">
								
							</view>
						</view>
					</view>
				</view>
				<view class="shareholder">
					<ContentHead title="股本股东" />
					<view class="list">
						<view class="item">
							<view class="label">总股本</view>
							<view class="text">{{aboutData.company_equity.total}}</view>
						</view>
						<view class="item">
							<view class="label">流通A股</view>
							<view class="text">{{aboutData.company_equity.circulation_a}}</view>
						</view>
						<view class="item">
							<view class="label">股东人数</view>
							<view class="text">{{aboutData.company_equity.total_number}}户</view>
						</view>
						<view class="item">
							<view class="label">人均持股</view>
							<view class="text">{{aboutData.company_equity.people_avg}}股</view>
						</view>
					</view>
				</view>
				<view class="bonus">
					<ContentHead title="分红送配" :hasMore="false" />
					<view class="list">
						<view class="item head">
							<view class="name">年度</view>
							<view class="text">方案</view>
							<view class="day">除权日</view>
						</view>
						<view class="item" v-for="(item, index) in aboutData.company_bonus" :key="index">
							<view class="name">{{item.report_date}}</view>
							<view class="text">{{item.instructions}}</view>
							<view class="day">{{item.ex_right_date}}</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>
 
<script>
	export default {
		name: '',
		props: {
			aboutData: {
				type: Object,
				default: function() {
					return {}
				}
			}
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
	@import  './common.scss';
	.main{
		
		.aboutInfo{
			.item{
				display: flex;
				line-height: 1.5;
				font-size: 26rpx;
				margin-top: 15rpx;
				.label{
					min-width: 148rpx;
					max-width: 148rpx;
					color: #909399;
				}
			}
		}
		.analysis{
			margin-top: 40rpx;
			.list{
				.item{
					display: flex;
					align-items: center;
					font-size: 26rpx;
					line-height: 1.5;
					border-bottom: #f4f5f6 solid 1px;
					padding: 10rpx 0;
					&.head{
						color: #909399;
						font-size: 24rpx;
						.chart{
							height: 0;
						}
					}
					.label{
						width: 40rpx;
						line-height: 40rpx;
						color: #909399;
					}
					.infoBox{
						flex: 1;
						margin-right: 20rpx;
						.infoItem{
							display: flex;
							margin-bottom: 10rpx;
							align-items: center;
							&:last-child{
								margin-bottom: 0;
							}
							.name{
								flex: 1;
								display: flex;
								align-items: center;
								.icon{
									min-width: 12rpx;
									min-height: 12rpx;
									border-radius: 4rpx;
									margin-right: 10rpx;
									&.icon0{
										background: #FF8300;
									}
									&.icon1{
										background: #1988F4;
									}
									&.icon2{
										background: #0A447D;
									}
									&.icon3{
										background: #909399;
									}
								}
							}
							.income,.ratio{
								text-align: right;
								width: 130rpx;
							}
						}
					}
					.chart{
						width: 160rpx;
						height: 160rpx;
					}
				}
			}
		}
		.shareholder{
			margin-top: 40rpx;
			.list{
				.item{
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 30rpx;
					font-size: 26rpx;
					.label{
						color: #909399;
					}
				}
			}
		}
		.bonus{
			margin-top: 40rpx;
			padding-bottom: 30rpx;
			.list{
				.item{
					display: flex;
					align-items: center;
					margin-top: 30rpx;
					font-size: 26rpx;
					&.head{
						color: #909399;
					}
					.name{
						width: 200rpx;
					}
					.text{
						flex: 1;
					}
					.day{
						text-align: right;
						width: 200rpx;
					}
				}
			}
		}
	}
</style>
