<template>
	<view class="myClues">
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onShow(){
			this.init();
		},
		methods: {
			init(){
				this.cluesFollowClues();
			},
			cluesFollowClues(){
				this.$api.cluesFollowClues().then(res => {

				});
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import './myClues.scss';
</style>
