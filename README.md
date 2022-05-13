### pages
> 主包页面内容

|  目录  |  名称  |  备注  |
|  ----  | ----  | ---- |
| home  | 首页 |
| clue  | 线索 | 需要权限  |
| optional  | 自选 |
| user  | 我的 |
### static
> 主包静态资源目录介绍

|  目录  |  名称  |  备注  |
|  ----  | ----  | ---- |
| images  | 图片 | 优先使用CDN路径 |
| style  | 样式文件 |   |
| font  | 自定义字体文件 |

### request(OBJECT)
> 发起网络请求，在各个小程序平台运行时，网络相关的 API 在使用前需要配置域名白名单。
> 在uni.request基础上进行了二次封装
#### 接口参数说明
|  参数名  |  类型  |  必填  | 默认值 | 备注 |
|  ----  | ----  | ---- | ----  | ---- |
|  url  |  string  |  是  |  | 请求路径，config中设置默认api地址 |
| data | Object | 否 | | 请求的参数 |
| method | String | 否 | POST | 有效值：POST/GET |
| type | String | 否 | api | 自定义请求类型，有效值: api、dot |
| requestType | String | 否 | request | 网络请求方式, 有效值：request、uploadFile、downloadFile |
| encryption | Boolean | 否 | false | 是否加密，有效值：true、false |
#### 网络状态code说明
| code  |  说明  |  备注  |
|  ----  | ----  | ---- |
| 200  |  请求发送成功  |    |
| 301  |  资源被转移  |    |
| 401  |  未登录  |    |
| 403  |  暂无权限访问该资源  |    |
| 404  |  请求内容不存在  |    |
| 500  |  服务器错误, 请稍后重试  |    |
| 502  |  服务开小差。  |    |
| 503  |  服务暂不可用, 请稍后重试  |    |
| default  |  网络出小差  |    |
#### 状态200，返回code说明
| code  |  说明  |  备注  |
|  ----  | ----  | ---- |
|  0  | 成功  | 正常返回数据 |
|  100008  | 不在白名单  | 需要开通白名单才可以调用小程序数据 |
|  100009  |  小程序升级 |  |
|  100010  | 账号异常  | 触发图形验证码 |
|  100011  |  滑动失败次数已达上限 |  |
|  401016  |  获取手机号失败 |  |
|  401029  | 手机号码重复  | 提示用户提交资料申请 |
#### 返回数据格式说明
```javascript
    code: 0
    data: { }
    msg: ''
````
#### 示例
```javascript
    // API 封装
    import { request } from "./request.js";
    const test = (data) => {
        return request({
            url: 'test/test',
            data,
            method: 'POST',
            type: 'API',
            requestType: 'request',
            encryption: true
        });
    };
    export{
        test
    }
    // 页面中使用
    import { test } from 'api.js';
    test(data).then(res => {
        console.log({res})
    });
```

### store
> vuex、storage混合使用
> main.js中全局引用, 设置为：$store
#### 设置vuex时，params参数说明
| 参数 | 类型 | 说明 | 备注 |
| ---- | ---- | ---- | ---- |
| key | String、Array  | vuex中设置的key| 类型与data类型对应 | 
| data | String、Array | 需要存储的内容| 类型与key类型对应 |
| setStorage | Boolean | vuex中存储时是否加入缓存 | 默认：false,可选: true。为true，获取时优先获取缓存中的数据。 |
```javascript
    // 需引入 封装后的 uniApi
    // store内封装内容说明
    const mutations = {
        setStoreData (state, params) {
            let {key, data, setStorage = false} = params;
            if(Array.isArray(key) && Array.isArray(data)){
                key.map((item, index) => {
                    let storeData = typeof data[index] == Object ? JSON.stringify(data[index]) : data[index];
                    setStorage && uniApi.storage().set(item, storeData)
                    state[item] = data[index];
                });
                return;
            }
            let storeData = typeof data == Object ? JSON.stringify(data) : data;
            setStorage && uniApi.storage().set(key, storeData);
            state[key] = data;
        }
    }
    // 使用方式
    this.$store.commit('setStoreData',{
        key,
        data,
        setStorage
    });
};
```

### uniApi
> 对UNIAPP原生API二次封装，对API错误、异常情况做出统一处理;
> 对获取设备信息相关数据，如：系统信息、网络状态、胶囊信息等数据，进行全局同步(vuex);
> main.js中全局引用, 设置为：$uniApi
#### storage
> 数据缓存，**同步**

| 参数名 | 类型 | 说明 |
| ---- | ---- | ---- |
| key | String | 本地缓存中的指定的 key |
| data | any | 需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象 |
##### 设置
```javascript
    this.$uniApi.storage().set(key,data);
```
##### 获取
```javascript
    this.$uniApi.storage().get(key);
```
##### 删除
```javascript
    this.$uniApi.storage().remove(key);
```
##### 清空
```javascript
    this.$uniApi.storage().clear();
```

#### getSystemInfo
> 获取系统信息, **异步**。
> 返回参数同uniapp参数，获取成功后会直接获取胶囊信息(getMenuButtonBoundingClientRect())
> 系统信息、胶囊信息都获取到之后，根据数据生成客户端平台、头部高度字段
> vuex存储数据：系统信息(v_systemInfo)、胶囊信息(v_menuBtnInfo)、客户端平台(v_platform)、头部高度(v_navBarHeight)
```javascript
this.$uniApi.getSystemInfo().then(res => {
    console.log({res});
});
```

#### getNetworkType
> 获取网络状态, **异步**。
> 获取到网络状态后，将状态值存入vuex中，且异步返回状态值
> vuex中字段名: v_networkType
```javascript
this.$uniApi.getNetworkType().then(res => {
    console.log({res});
});
```

#### navTo(object)
> 路由与页面跳转
> 跳转方式底层依旧使用uniApp中的方式
> 路由监听、拦截
> 页面跳转传参方式，Object 替代 原生字符串拼接方式

| 参数名 | 类型 | 说明 |
| ---- | ---- | ---- |
| that | this | 当前页面vuex的this实例 |
| url | String | 跳转页面路由地址 |
| params | Object | 跳转参数，tabBar页面携带参数、不会处理 |
| type | String | 跳转方式，同uniApp原生，有效值： navigateTo(默认)、redirectTo、reLaunch、switchTab |

### utils
> 公共函数封装。
