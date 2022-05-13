<template>
	<view class="firstTabs">
		<view class="item" 
			v-for="(item, index) in list"
			:key="index"
			:class="{current: setCurrent(item)}"
			@click="change(item)"
			>
			{{item.name}}
		</view>
	</view>
</template>
 
<script>
	export default {
		name: '',
		props: {
			list: {
				type: Array,
				default: () => []
			},
			current: {
				type: [Number, String],
				default: 1
			}
		},
		computed:{
			setCurrent(){
				return (item) => {
					let { current } = this;
					let { id } = item;
					if(Array.isArray(id)){
						return id.indexOf(current) >= 0;
					}else{
						return id == current;
					}
				}
			}
		},
		methods:{
			change(item){
				this.$emit('change', item);
			}
		}
	}
</script>
 
<style lang="scss" scoped>
	.firstTabs{
		display: flex;
		align-items: flex-end;
		.item{
			margin-right: 50rpx;
			transition: all .3s;
			font-size: 28rpx;
			&.current{
				font-size: 44rpx;
				font-weight: bold;
			}
		}
	}
</style>
