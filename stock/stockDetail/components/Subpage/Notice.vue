<template>
	<view class="subpage notice">
		<scroll-view class="scrollBox" scroll-y="true">
			<view class="main">
				<NewsList 
					:list="list"
					/>
			</view>
		</scroll-view>
	</view>
</template>
 
<script>
	export default {
		name: '',
		props: {
			list: {
				type: Array,
				default: () => []
			}
		},
		methods:{
			
		}
	}
</script>
 
<style lang="scss" scoped>
	@import  './common.scss';
	.notice{
		.main{
			padding-top: 0;
		}
	}
</style>
