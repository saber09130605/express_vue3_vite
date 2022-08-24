import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
const app = createApp(App)


// axios 接口
import axios from 'axios'
// 服务端地址
axios.defaults.baseURL = "http://localhost:8080/"
// axios.defaults.baseURL = "http://112.74.108.89/"
app.provide("axios", axios)

// vue-router 路由管理
import { router } from './common/router'
app.use(router);

// pinia 模块管理
import { createPinia } from "pinia";
app.use(createPinia());




import { 
    Swipe, 
    SwipeItem,
    Tab, 
    Tabs,
    NavBar,
    Search,
    Lazyload,
    Image as VanImage,
    List,
    Cell,
    Grid, 
    GridItem,
    Popover,
    Notify,
    Form, 
    Field, 
    CellGroup,
    Icon,
    Uploader,
    Divider,
    ActionSheet,
    Tag 
} from 'vant';
import 'vant/es/toast/style/index';
import 'vant/es/dialog/style/index';
app.use(Swipe)
app.use(SwipeItem)
app.use(Tab)
app.use(Tabs)
app.use(NavBar)
app.use(Search)
app.use(Lazyload)
app.use(VanImage)
app.use(List)
app.use(Cell)
app.use(Grid)
app.use(GridItem)
app.use(Popover)
app.use(Notify)
app.use(Form);
app.use(Field);
app.use(CellGroup)
app.use(Icon);
app.use(Uploader);
app.use(Divider);
app.use(ActionSheet);
app.use(Tag);

//自动登录
import {UserStore} from "./common/UserStore";
const userStore = UserStore()
const autoLogin = async (values) => {
    if (localStorage.getItem("account") && localStorage.getItem("password")) {
        let result = await axios.post("/user/login", {
            account: localStorage.getItem("account"),
            password: localStorage.getItem("password")
        });
        if (result.data.code < 500) {
            userStore.setUserInfo(result.data.data)
        }
    }
};
autoLogin()

import {ArticleStore} from "./common/ArticleStore";
const getArticlTypeList = async (values) => {
    let result = await axios.get("/article/typelist");
    ArticleStore().typeList = result.data.data
};
getArticlTypeList()
app.mount('#app')