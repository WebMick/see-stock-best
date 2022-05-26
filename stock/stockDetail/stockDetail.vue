<template>
	<view class="page stockDetail" :style="{'padding-top': v_navBarHeight + 'px'}">
		<template v-if="equitySecurityInfoData && equityBigInfoData">
			<Navbar class="navbar">
				<view class="titleBox">
					<view class="title">{{navBarTitle}}</view>
					<view class="subTitle">{{equitySecurityInfoData.base_info.tip_msg}}</view>
				</view>
			</Navbar>
			<NumBox 
				:sData="equitySecurityInfoData"
				/>
			<KlineBox
				:sData="equitySecurityInfoData"
				:code="code"
				/>
			<template v-if="equitySecurityInfoData.common_info.type == 1">
				<ComponentStock
					:code="code"
					/>
			</template>
			<template v-if="equitySecurityInfoData.common_info.type == 2">
				<MustSee
					:mustSeeData="equityBigInfoData"
					/>
			</template>
			<view class="subpageBox" :style="{top: subpageTop}">
				<Subpage 
					:code="code"
					:type="equitySecurityInfoData.common_info.type"
					:isShowSubpage="isShowSubpage"
					@isShowSubpageFn="isShowSubpageFn"
					/> 
			</view>
			<view class="insetBottom"></view>
		</template>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex';
	import NumBox from './components/NumBox.vue';
	import KlineBox from './components/KlineBox.vue';
	import MustSee from './components/MustSee.vue';
	import Subpage from './components/Subpage/index.vue';
	import ComponentStock from './components/ComponentStock.vue';
	export default {
		components: {
			NumBox,
			KlineBox,
			MustSee,
			ComponentStock,
			Subpage
		},
		computed: {
			...mapGetters(['v_navBarHeight', 'v_systemInfo']),
			navBarTitle(){
				let { equitySecurityInfoData } = this;
				let title = '趣看行情';
				if(equitySecurityInfoData && equitySecurityInfoData.common_info){
					let { common_info: { name } } = equitySecurityInfoData;
					let { code } = this;
					title = `${name} ${code.substr(2,7)}.${code.substr(0,2).toLocaleUpperCase()}`
					return title;
				}
			},
			subpageTop(){
				let { isShowSubpage, v_navBarHeight } = this;
				let top;
				if(isShowSubpage){
					top = v_navBarHeight + 'px'
				}else{
					top = `calc(100vh - env(safe-area-inset-bottom) - 100rpx)`
				}
				return top;
			}
		},
		onLoad(options) {
			let { code } = options;
			this.code = code;
		},
		onShow() {
			this.init();
		},
		data() {
			return {
				defaultActiveId: 0, // 底部默认选择tab
				code: '', // 股票code
				equitySecurityInfoData: '', // 当前股票数据
				equityBigInfoData: '', // 必看数据
				isShowSubpage: false
			};
		},
		methods: {
			init(){
				this.equitySecurityInfo();
				this.equityBigInfo();
			},
			equitySecurityInfo(){
				let { code } = this;
				this.$api.equitySecurityInfo({code}).then(res => {
					let { data } = res;
					this.equitySecurityInfoData = data;
				});
			},
			equityBigInfo(){
				let { code } = this;
				this.$api.equityBigInfo({code}).then(res => {
					let { data } = res;
					this.equityBigInfoData = data;
				})
			},
			isShowSubpageFn(){
				this.isShowSubpage = !this.isShowSubpage;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './stockDetail.scss';
</style>
