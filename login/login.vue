<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onShow(){
			this.$uniApi.getSystemInfo();
			this.login();
		},
		methods: {
			login(){
				let params = {
					pfid: '',
					shareUid: ''
				}
				this.$api.login(params).then(res => {
					let { data } = res;
					this.$api.config().then(res => {
						let config = res.data;
						this.$store.commit('setStoreData', {
							key: ['v_userInfo', 'v_config'],
							data: [data, config],
							setStorage: true
						});
						this.$uniApi.navTo({
							that: this,
							type: 'switchTab',
							url: '/pages/stock/stock'
						});
					});
				});
			}
		},
	}
</script>

<style lang="scss">

</style>
