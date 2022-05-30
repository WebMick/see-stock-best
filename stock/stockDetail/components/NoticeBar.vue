<template>
	<view class="noticeBar">
		<u-notice-bar 
			:text="'[趣看观点] ' + text"
			bgColor="#fff"
			color="#FF8300"
			/>
	</view>
</template>
 
<script>
	export default {
		name: '',
		props: {
			text: {
				type: String,
				default: ''
			}
		},
		methods:{
			
		}
	}
</script>
 
<style lang="scss" scoped>

</style>