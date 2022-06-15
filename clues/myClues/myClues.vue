<template>
	<view class="myClues page" :style="{'padding-top': v_navBarHeight + 'px'}">
		<Navbar bgColor="#fff9f1" title="我的自选组合"></Navbar>
		<GroupList :listData="groupListData"></GroupList>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex';
	import GroupList from './components/GroupList.vue';
	export default {
		components: {
			GroupList
		},
		computed: {
			...mapGetters(['v_navBarHeight']),
			
		},
		data() {
			return {
				groupListData: []
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
					let { data } = res;
					this.groupListData = data;
				});
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import './myClues.scss';
</style>
