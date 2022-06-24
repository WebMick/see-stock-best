<template>
	<view class="myClues page" :style="{'padding-top': v_navBarHeight + 'px'}">
		<Navbar bgColor="#fff9f1" title="我的自选组合"></Navbar>
		<template v-if="groupListData && groupListData.length > 0">
			<GroupList :listData.sync="groupListData"></GroupList>
			<view class="tips">提示：长按可删除自选组合</view>
		</template>
		<template v-else>
			<Empty
				height="500rpx"
				title="暂无线索组合"
				subTitle="请添加更多线索组合"
				/>
		</template>
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
		onLoad(){
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
