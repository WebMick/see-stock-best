<template>
	<view class="guessRank page">
		<Navbar bgColor="none"></Navbar>
		<view class="header" :style="{'padding-top': v_navBarHeight + 'px'}">
			<image class="title" :src="$imgUrl('/images/equities/product/202112231427051854.png')" mode="" lazy-load="false" > </image>
			<view class="bg"></view>
		</view>
		<view class="rankList">
			<RankList 
				:list="rankListData"
				/>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex';
	import RankList from './components/RankList.vue';
	export default {
		components: {
			RankList
		},
		computed: {
			...mapGetters(['v_navBarHeight']),
			
		},
		data() {
			return {
				rankListData: []
			};
		},
		onShow(){
			this.init()
		},
		onPageScroll (e) {
		},
		methods: {
			init(){
				this.rank();
			},
			rank(){
				this.$api.rank().then(res =>{
					let { data } = res;
					this.rankListData = data.rankList.list;
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import './guessRank.scss';
</style>
