<template>
	<view class="subpage news">
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
	.news{
		.main{
			padding-top: 0;
		}
	}
</style>
