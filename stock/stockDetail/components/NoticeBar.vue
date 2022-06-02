<template>
	<view class="noticeBar">
		<u-notice-bar 
			:text="'[趣看观点] ' + text"
			bgColor="#fff"
			color="#FF8300"
			@click="showPoint"
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
			showPoint(){
				let { text } = this;
				uni.showModal({
					content: text,
					title: '趣看观点',
					confirmText: '支持一下',
					confirmColor: '#1988F4',
					success: (res) => {
						let { confirm } = res;
					}
				})
			}
		}
	}
</script>
 
<style lang="scss" scoped>

</style>