<template>
	<view class="navbar" 
		:style="navbarStyle">
		<view class="back" 
			v-if="hasBack" 
			@click="back"
			:style="{width: backSize + 'px', height: backSize + 'px'}">
			<image :src="$imgUrl('/images/equities/product/202205101602441677.png')" class="icon" mode=""></image>
		</view>
		<view class="main">
			<slot>
				<vire class="title">{{title}}</vire>
			</slot>
		</view>
		<view class="bg" :style="bgColorStyle"></view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex';
	export default {
		name:"Navbar",
		props: {
			title: {
				type: String,
				default: '趣看行情'
			},
			hasBack: {
				type: Boolean,
				default: true
			},
			bgColor: {
				type: String,
				default: '#fff'
			}
		},
		computed: {
			...mapGetters(['v_navBarHeight', 'v_statusBarHeight']),
			navbarStyle(){
				let { v_navBarHeight, v_statusBarHeight, hasBack, backSize } = this;
				let plr = hasBack ? backSize + 'px' : 0;
				let style = `padding-top: ${v_statusBarHeight}px;padding-left: ${plr};padding-right: ${plr};height: ${v_navBarHeight}px`
				return style;
			},
			backSize(){
				let { v_navBarHeight, v_statusBarHeight } = this;
				let size = v_navBarHeight - v_statusBarHeight;
				return size;
			},
			bgColorStyle(){
				let { bgColor } = this;
				let style = `background: ${bgColor}`;
				return style;
			}
		},
		methods: {
			back(){
				let pages = getCurrentPages();
				if(pages.length == 1){
					this.$uniApi.navTo({
						that: this,
						url: '/pages/stock/stock',
						type: 'switchTab'
					})
				}else{
					uni.navigateBack();
				}
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.navbar{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 99;
		display: flex;
		.back{
			position: absolute;
			left: 0;
			bottom: 0;
			z-index: 8;
			display: flex;
			align-items: center;
			justify-content: center;
			.icon{
				width: 24rpx;
				height: 48rpx;
			}
		}
		.main{
			position: relative;
			z-index: 9;
			flex: 1;
			display: flex;
			align-items: center;
			.title{
				font-size: 30rpx;
				flex: 1;
				text-align: center;
			}
		}
		.bg{
			position: absolute;
			z-index: 7;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
		}
	}
</style>
