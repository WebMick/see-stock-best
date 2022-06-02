import Vue from 'vue'
import App from './App'
import store from './store/store';
import { api } from './request/api';
import { uniApi } from 'uniApi/uniApi.js';
import uView from 'uview-ui';
import { setClass, imgUrl, setAddSymbol } from 'utils/utils.js';
import share from 'utils/share.js'
import webSocket from 'request/webSocket.js'
Vue.use(uView);

Vue.mixin(share);
Vue.mixin(webSocket);

Vue.prototype.$api = api;
Vue.prototype.$uniApi = uniApi;
Vue.prototype.$setClass = setClass;
Vue.prototype.$imgUrl = imgUrl;
Vue.prototype.$setAddSymbol = setAddSymbol;

App.mpType = 'app';

const app = new Vue({
    ...App,
	store
})
app.$mount()
