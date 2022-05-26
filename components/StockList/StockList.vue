<template>
	<view class="list">
		<template v-if="list && list.length >0">
			<template v-for="(item, index) in list">
				<view class="item" :class="{showOptions: showOptions}" @click="clickItem(item)" :key="index">
					<view class="checkBox" v-if="showCheck" @click.stop="check(item, index)">
						<image v-if="!item.isCheck && checkLength < 3" :src="$imgUrl('/images/equities/product/202203301057439318.png')" class="icon" mode=""></image>
						<image v-if="item.isCheck" :src="$imgUrl('/images/equities/product/202203301058109310.png')" class="icon" mode=""></image>
						<image v-if="checkLength >= 3 && !item.isCheck" :src="$imgUrl('/images/equities/product/202203301058183691.png')" class="icon" mode=""></image>
					</view>
					<view class="info">
						<view class="name">{{item.equities_name}}</view>
						<view class="code">{{item.equities_code}}</view>
					</view>
					<view class="new fontRegular" :class="[$setClass(item.fluctuate_val)]">{{item.newing}}</view>
					<view class="ratio fontRegular" :class="[$setClass(item.fluctuate_val)]">{{$setAddSymbol(item.fluctuate_val)}}%</view>
					<view class="options" v-if="showOptions">
						<template v-if="!item.user_guess">
							<view class="btnItem"
								v-for="(oItem, oIndex) in options"
								:key="oIndex"
								@click.stop="action(item, oItem)"
								:class="{guessEd: item.user_guess}"
								>
								{{oItem.text}}
							</view>
						</template>
						<template v-if="item.user_guess">
							<view class="btnItem guessEd">猜了({{item.user_guess == 1 ? '涨' : '跌'}})</view>
						</template>
					</view>
				</view>
			</template>
		</template>
		<template v-else>
			<Empty 
				height="500rpx"
				title="暂无数据"
				subTitle="请添加更多自选股"
				/>
		</template>
	</view>
</template>

<script>
	export default {
		name:"StockList",
		props: {
			list: {
				type: Array,
				default: () => []
			},
			showOptions: {
				type: Boolean,
				default: false
			},
			showCheck: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			checkLength(){
				let { list } = this;
				let	length = 0;
				list.map(item => {
					if(item.isCheck) length++;
				})
				return length;
			}
		},
		data() {
			return {
				options: [
					{ text: '猜跌', rise: 2 },
					{ text: '猜涨', rise: 1 },
				]
			};
		},
		methods: {
			clickItem(item){
				let { equities_code } = item;
				this.$uniApi.navTo({
					url: '/stock/stockDetail/stockDetail',
					params: {
						code: equities_code
					}
				});
				this.$emit('clickItem', item);
			},
			check(item, index){
				this.$emit('check', {item, index});
			},
			action(item, oItem){
				let { user_guess } = item;
				if(user_guess) return;
				this.$emit('action', {item, oItem});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list{
		.item{
			padding: 0 32rpx;
			display: flex;
			align-items: center;
			border-bottom: #f4f5f6 solid 1px;
			height: 88rpx;
			&.showOptions{
				padding: 0 10rpx 0 32rpx;
			}
			.checkBox{
				width: 32rpx;
				padding-right: 20rpx;
				box-sizing: content-box;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				.icon{
					width: 32rpx;
					height: 32rpx;
				}
			}
			.info{
				flex: 1;
				.name{
					font-size: 30rpx;
				}
				.code{
					margin-top: 8rpx;
					font-size: 24rpx;
					color: #BCBEC2;
				}
			}
			.new{
				width: 110rpx;
				text-align: right;
				font-size: 30rpx;
			}
			.ratio{
				margin-left: 50rpx;
				width: 120rpx;
				text-align: right;
				font-size: 30rpx;
				display: flex;
				align-items: center;
				color: #fff;
				justify-content: center;
				height: 48rpx;
				border-radius: 5rpx;
				&.textUp{
					background: #FE5269;
				}
				&.textDown{
					background: #02BD85;
				}
				&.textFlat{
					background: #8694AA;
				}
			}
			.options{
				width: 160rpx;
				display: flex;
				height: 48rpx;
				margin-left: 30rpx;
				border-radius: 5rpx;
				overflow: hidden;
				.btnItem{
					flex: 1;
					display: flex;
					align-items: center;
					color: #fff;
					font-size: 26rpx;
					justify-content: center;
					&:nth-child(1){
						background: #02BD85;
					}
					&:nth-child(2){
						background: #FE5269;
					}
					&.guessEd{
						background: #8694AA;
					}
				}
			}
		}
	}
</style>
