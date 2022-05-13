<template>
</template>

<script>
	// 通过 mixins 方便处理 每个页面的连接 事件
	// 且 不需要每次获取页面 实例
	import { mapGetters } from 'vuex';
	import { APIROOT } from './config.js';
	export default{
		computed:{
			...mapGetters(['v_userInfo', 'v_wsStatus'])
		},
		
		onShow() {
			// 每个引入的页面都会处理一次 是否需要连接 ws
			this.wsInit();
		},
		methods:{
			wsInit(){
				let { v_userInfo: { token } } = this;
				let timer;
				// 无token处理
				if(token){
					clearTimeout(timer);
					// 创建之前 判断是否已连接
					if(!this.isOpen){
						let url = APIROOT.wss;
						uni.connectSocket({
						  url: url + '/socket.io/?token=' + token,
						  method: 'GET',
						  header:{
						    'content-type': 'application/json',
						    'AppVersion': APIROOT.appVersion
						  }
						});
					};
					uni.onSocketOpen(()=>{
						this.wsOpen();
					});
					// 接收消息
					uni.onSocketMessage((res) => {
						// 引入页面需 加入 同一的 事件 wsOnMsg()
						let { data = '' } = res;
						if(data && this.wsOnMsg){
							let _resStart = data.indexOf('[');
							if(_resStart >= 0 && _resStart < 10){
								data = JSON.parse(data.slice(_resStart));
								let [ event, wsData ] = data;
								// 股市状态变化监听
								if(event == 'dateStatus-msg'){
									let { v_wsStatus } = this;
									if(v_wsStatus.status){
										// 页面添加函数 init  数据页面初始化
										this.init();
									}
									// 更新 ws 状态数据
									this.$store.commit('setStoreData', {
										key: 'v_wsStatus',
										data: wsData
									});
								}else{
									this.wsOnMsg(data);
								}
							}
						}
					});
				}
				else{
					timer = setTimeout(()=>{
						this.wsInit();
					},1500)
				}
			},
			wsOpen(){
				this.isOpen = true;
				this.wsHeartBeat();
				// 发送失败的消息处理
				let { socketMsgQueue } = this;
				if(socketMsgQueue && socketMsgQueue.length > 0){
					for (var i = 0; i < socketMsgQueue.length; i++) {
						this.wsSendMsg(socketMsgQueue[i][0],socketMsgQueue[i][1]);
					}
					this.socketMsgQueue = [];
				}
			},
			wxClose(){
				uni.onSocketClose((res) =>{
					this.isOpen = false;
					this.socketMsgQueue = [];
					clearInterval(this.heartBeatTimer);
				});
			},
			wsSendMsg(event, params = ''){
				if(!this.isOpen){
					if(!this.socketMsgQueue) this.socketMsgQueue = [];
					this.socketMsgQueue.push([event, params])
				}else{
					if(params){
						let msg = JSON.stringify([event, params]);
						uni.sendSocketMessage({
							data: '420' + msg
						});
					}else{
						uni.sendSocketMessage({
							data: event
						});
					}
				}
			},
			wsHeartBeat(){
				this.heartBeatTimer = setInterval(()=>{
					this.wsSendMsg(2);
				}, 3000);
			},
		}
	}
</script>

<style>
</style>
