<template>
	<view class="clues">
		<scroll-view class="scrollBox" scroll-y="true">
			<CluesCount 
				/>
			<CluesNav 
				/> 
			<CluesList 
				:list="cluesListData.list"
				@action="action"
				/>
		</scroll-view>
	</view>
</template>
 
<script>
	import CluesCount from './CluesCount.vue';
	import CluesNav from './CluesNav.vue';
	import CluesList from './CluesList.vue';
	export default {
		name: '',
		components: {
			CluesCount,
			CluesNav,
			CluesList
		},
		props: {
			cluesListData: {
				type: Object,
				default: function(){
					return {}
				}
			}
		},
		data(){
			return {
			}
		},
		methods:{
			clickNav(type){
				
			},
			action(){
				this.$emit('action');
			}
		}
	}
</script>
 
<style lang="scss" scoped>
	.clues,.scrollBox{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
