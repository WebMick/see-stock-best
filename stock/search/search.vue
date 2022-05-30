<template>
	<view class="page search">
		<view class="iptBox">
			<SearchInput
				@change="change"
				/>
		</view>
		<view class="main">
			<SearchList
				:list.sync="searchListData"
				/>
		</view>
	</view>
</template>

<script>
	import SearchInput from './components/SearchInput.vue'
	import SearchList from './components/SearchList.vue'
	export default {
		components:{
			SearchInput,
			SearchList
		},
		data() {
			return {
				searchListData: [],
				searchParams: {
					page: 1,
					page_size: 20,
					keyword: "",
				}
			};
		},
		methods: {
			change(keyword){
				this.searchParams.keyword = keyword;
				this.favorSearch();
			},
			favorSearch(){
				let { searchParams } = this;
				this.$api.favorSearch(searchParams).then(res => {
					let { data } = res;
					this.searchListData = data;
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './search.scss';
</style>
