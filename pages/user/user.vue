<template>
	<view class="user page tabPage" 
		:style="{'padding-top': v_navBarHeight + 'px'}">
		<view class="pageBg" :style="{'transform': 'scale(' + setPageBgScale + ')'}">
			<view class="bottom"></view>
		</view>
		<view class="main">
			<Navbar :hasBack="false" class="navbar" bgColor="none">
				<view class="set"></view>
			</Navbar>
			<UserInfo 
				/>
			<PowerList 
				/>
			<view class="cellBox">
				<CellList 
					:list="cellListData"
					/>
			</view>
			
			<image class="logo" :src="$imgUrl('/images/equities/product/mine_bg_search.png')" mode=""></image>
		</view>
		<!-- 底部tab -->
		<Tabbar 
			:selected="2"
			/>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex';
	import UserInfo from './compontents/UserInfo.vue'
	import PowerList from './compontents/PowerList.vue'
	export default {
		components:{
			UserInfo,
			PowerList
		},
		computed: {
			...mapGetters(['v_navBarHeight']),
			setPageBgScale(){
				let { scrollTop } = this;
				let scale = 1;
				if(scrollTop < 0){
					scrollTop = scrollTop * -1;
					scale = 1 + scrollTop / 100;
				};
				return scale;
			}
		},
		onPageScroll(e) {
			uni.$u.debounce( () =>{
			    let { scrollTop }    = e;
			    this.scrollTop = scrollTop;
			    this.showBackTop = scrollTop > 80;
			}, 30)
		},
		data() {
			return {
				scrollTop: 0,
				cellListData: [
					{ title: '全部设置', id: 1 },
					{ title: '客服中心', id: 2 },
					{ title: '关于趣看行情', id: 3 },
				]
			};
		}
	}
</script>

<style lang="scss" scoped>
	@import  './user.scss';
</style>
