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
				:sData.sync="equitySecurityInfoData"
				/>
			<KlineBox
				:sData="equitySecurityInfoData"
				:code="code"
				/>
			<template v-if="equityBigInfoData.point.content">
				<NoticeBar 
				:text="equityBigInfoData.point.content"
				
				/>
			</template>
				
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
			<!-- 小浮窗 -->
			<Fab 
				:fabData.sync="fabData" 
				:minuteNewPrice="minuteNewPrice"
				@init="init"
				@noteInputShow="noteInputShow"
				/>
			<!-- 笔记输入框 -->
			<u-popup :show="isShowNoteInput" 
				:round="16" 
				:closeable="true" 
				:closeOnClickOverlay="false"
				@close="noteInputShow" 
				mode="bottom">
				<NoteInput 
					ref="noteInput"
					:commonInfo="fabData"
					:minuteNewPrice="minuteNewPrice"
					@close="noteInputShow"
					/>
			</u-popup>
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
	import NoticeBar from './components/NoticeBar.vue';
	import Fab from './components/Fab.vue';
	import NoteInput from './components/NoteInput.vue';
	export default {
		components: {
			NumBox,
			KlineBox,
			MustSee,
			ComponentStock,
			Subpage,
			NoticeBar,
			Fab,
			NoteInput
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
			},
			// 最新价格
			minuteNewPrice(){
				let { equitySecurityInfoData } = this;
				let data;
				if(equitySecurityInfoData){
					let { minute_line, base_info: { range_ratio } } = equitySecurityInfoData;
					data = minute_line[minute_line.length - 1];
					data.push(range_ratio);
				}
				return data;
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
				isShowSubpage: false,
				isShowNoteInput: false, // 输入笔记
				fabData: '', //  + 浮窗数据
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
					if(data){
						let { common_info, base_info } = data;
						this.fabData = {
							code: common_info.code,
							type: common_info.type,
							name: common_info.name,
							user_have_favor: common_info.user_have_favor
						};
					}
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
			},
			noteInputShow(){
				this.isShowNoteInput = !this.isShowNoteInput;
				// 关闭弹窗的时候 操作一下 输入框的内容
				if(this.$refs.noteInput){
					setTimeout(()=>{
						this.$refs.noteInput.getFocus(this.isShowNoteInput);
						if(!this.isShowNoteInput){
							this.$refs.noteInput.reset();
						}
					},10)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './stockDetail.scss';
</style>
