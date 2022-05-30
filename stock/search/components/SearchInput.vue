<template>
	<view class="searchInput">
		<view class="main">
			<image :src="$imgUrl('/images/equities/product/202112291033013959.png')" class="icon" mode=""></image>
			<u-input type="text" 
				v-model="keyword" 
				placeholder="搜索股票/指数" 
				class="ipt" 
				@change="change"
				placeholder-style="font-size: 13px;"
				custom-style="font-size: 13px;color: #303133;"
				confirm-type="搜索"
				/>
		</view>
	</view>
</template>
 
<script>
	export default {
		name: '',
		data(){
			return {
				keyword: ''
			}
		},
		methods:{
			change(){
				clearTimeout(this.timer);
				this.timer = setTimeout(()=>{
					let { keyword } = this;
					this.$emit('change', keyword);
				}, 200);
			}
		}
	}
</script>
 
<style lang="scss" scoped>
	.searchInput{
		overflow: hidden;
		background: #fff;
		.main{
			margin: 20rpx 32rpx;
			display: flex;
			height: 64rpx;
			align-items: center;
			padding: 0 20rpx;
			background: rgba(144, 147, 153, 0.08);
			border-radius: 32rpx;
			.icon{
				width: 48rpx;
				height: 48rpx;
			}
			.ipt{
				flex: 1;
				font-size: 26rpx;
				height: 100%;
			}
		}
	}
</style>