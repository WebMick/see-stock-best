<template>
	<view class="subpage" :class="{show: isShowSubpage}" :style="{height: pageHeight}">
		<view class="topBox" @click.stop="isShowSubpageFn">
			<view class="line"></view>
			<view class="title">摘要数据</view>
			<image class="arrow" :src="$imgUrl('/images/equities/product/202202231108392741.png')" mode=""></image>
		</view>
		<view class="tabsBox">
			<Tabs :list="tabList[type].list" :current="tabList[type].activeId" @change="change" />
			<view class="arrowBox" @click.stop="isShowSubpageFn">
				<image class="arrow" :src="$imgUrl('/images/equities/product/202202231108392741.png')" mode=""></image>
			</view>
		</view>
		<view class="swiperBox">
			<swiper class="swiper" :indicator-dots="false" :current="swiperCurrent" :autoplay="false"  @change="swiperChange">
				<swiper-item v-for="(item, index) in tabList[type].list" class="swiperItem" :key="index">
					<template v-if="item.id == 0">
						<About 
							:aboutData="aboutData"
							/>
					</template>
					<template v-if="item.id == 2">
						<News 
							:list="newsListData"
							/>
					</template>
					<template v-if="item.id == 3">
						<Notice 
							:list="companyBulletinListData"
							/>
					</template>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>
 
<script>
	import { mapGetters } from 'vuex';
	import About from './About.vue';
	import News from './News.vue';
	import Notice from './Notice.vue';
	export default {
		name: '',
		components: {
			About,
			News,
			Notice
		},
		props: {
			isShowSubpage: {
				type: Boolean,
				default: false
			},
			code: {
				default: String,
				default: ''
			},
			// 1 指数  2 个股
			type: {
				default: String,
				default: ''
			}
		},
		computed: {
			...mapGetters(['v_navBarHeight']),
			pageHeight(){
				let { v_navBarHeight } = this;
				return `calc(100vh - ${v_navBarHeight}px)`
			}
		},
		data(){
			return {
				tabList: {
					1: {
						list: [
							{name: '新闻', id: 2},
							{name: '笔记', id: 4}
						],
						activeId: 2
					},
					2: {
						list: [
							{name: '简况', id: 0},
							{name: '财务', id: 1},
							{name: '新闻', id: 2},
							{name: '公告', id: 3},
							{name: '笔记', id: 4}
						],
						activeId: 0
					}
				},
				swiperCurrent: 0,
				aboutData: '',
				newsListData: '',
				companyBulletinListData: ''
			}
		},
		methods:{
			change({id}){
				let { type } = this;
				this.tabList[type].activeId = id;
				this.swiperCurrent = this.tabList[type].list.findIndex((item) => item.id == id);
				this.getDataById();
			},
			swiperChange(e){
				let { type } = this;
				let { detail: { current } } = e;
				let { id } = this.tabList[type].list[current]
				this.tabList[type].activeId = id;
				this.getDataById()
			},
			getDataById(id){
				let { type } = this;
				let { activeId } = this.tabList[type];
				if(activeId == 0){
					this.equityBriefInfo();
				}
				else if(activeId == 1){
					
				}
				else if(activeId == 2){
					this.equityNewsList();
				}
				else if(activeId == 3){
					this.companyBulletinList();
				}
				else if(activeId == 4){
					
				}
			},
			isShowSubpageFn(){
				let { isShowSubpage, type, tabList } = this;
				if(!isShowSubpage){
					let { activeId }  = tabList[type];
					this.change({id: activeId})
				}
				this.$emit('isShowSubpageFn');
			},
			// 获取 简况数据
			equityBriefInfo(){
				let { code } = this;
				this.$api.equityBriefInfo({code}).then(res => {
					let { data } = res;
					this.aboutData = data;
				});
			},
			// 获取新闻数据
			equityNewsList(){
				let { code } = this;
				let params = {
					code,
					page:1,
					page_size: 20
				};
				this.$api.equityNewsList(params).then(res => {
					let { data } = res;
					this.newsListData = data;
				});
			},
			// 获取公告数据
			companyBulletinList(){
				let { code } = this;
				let params = {
					code,
					page:1,
					limit: 20
				};
				this.$api.companyBulletinList(params).then(res => {
					let { data } = res;
					data.map(item => {
						item.from_show = '趣看行情';
						item.created_at = item.day_date;
						return item;
					});
					this.companyBulletinListData = data;
				});
			}
		}
	}
</script>
 
<style lang="scss" scoped>
	.subpage{
		background: #fff;
		box-shadow: 0 -10rpx 12rpx 0 rgba(74,76,80,0.08);
		position: relative;
		display: flex;
		flex-direction: column;
		&.show{
			padding-top: 14rpx;
			box-shadow: none;
			.topBox{
				display: none;
			}
			.line{
				top: initial;
				bottom: calc(env(safe-area-inset-bottom) + 20rpx);
			}
		}
		.line{
			position: absolute;
			top: 10rpx;
			left: 50%;
			width: 120rpx;
			margin-left: -60rpx;
			height: 6rpx;
			border-radius: 10rpx;
			background-color: #909399;
			transition: all .5s;
			z-index: 9;
		}
		.topBox{
			padding: 0 24rpx;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;
			.arrow{
				width: 30rpx;
				height: 20rpx;
				transform: rotate(180deg);
			}
		}
		.tabsBox{
			padding: 0 24rpx;
			position: relative;
			.arrowBox{
				position: absolute;
				right: 0;
				top: 0;
				width: 70rpx;
				height: 70rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				.arrow{
					width: 30rpx;
					height: 20rpx;
					
				}
			}
		}
		.swiperBox{
			flex: 1;
			position: relative;
			border-top: #f4f5f6 solid 1px;
			.swiper{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
