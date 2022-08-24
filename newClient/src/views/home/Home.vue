<template>
    <van-nav-bar>
        <template #title>
            <van-search v-model="searchVal" placeholder="请输入搜索关键词" />
        </template>
        <template #right>
           <van-image
                round
                width="36"
                height="36"
                src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
                @click="headImgClick"
            />
        </template>
    </van-nav-bar>
    <van-tabs v-model:active="active" swipeable @change="tabsOnChange">
        <van-tab title="推荐" name="0">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item>可投放广告1</van-swipe-item>
                <van-swipe-item>可投放广告2</van-swipe-item>
                <van-swipe-item>可投放广告3</van-swipe-item>
                <van-swipe-item>可投放广告4</van-swipe-item>
            </van-swipe>
        </van-tab>
        <van-tab v-for="item of ArticleStore().typeList" :title="item.name" :name="item.id"></van-tab>
    </van-tabs>
    <van-grid :column-num="2">
        <van-grid-item v-for="value of showList" :key="value.id" @click="goToDetails(value.id)">
            <div class="grid-item-cover-box">
                <van-image
                    :src="value.cover"
                    class="grid-item-cover"
                />
            </div>
            
            <p  class="van-multi-ellipsis--l3"> 
                {{value.title}}
            </p>
        </van-grid-item>
    </van-grid>
    <p class="home-bottom-tips">暂无更多资讯</p>
</template>

<script setup>
import { ref,inject } from 'vue';
import { UserStore } from '../../common/UserStore'
import { ArticleStore } from '../../common/ArticleStore'
import { useRouter, useRoute } from 'vue-router'
const pUseRouter = useRouter()
const userStore = UserStore()
const active = ref(0);
const searchVal = ref('');
const axios = inject("axios")
const headImgClick = ()=> {
    if (userStore.id) {
        pUseRouter.push("/userinfo")
    } else {
        pUseRouter.push("/login")
        // pUseRouter.push("/userinfo")
    }
}
const curType = ref(0)
const showList = ref([])
const tabsOnChange = (name,title) => {
    curType.value = name
    setList()
}
const setList = async (name,title) => {
    let Result = await axios.get("/article/articlelist?type=" + curType.value);
    showList.value = Result.data.data
}
const goToDetails = (id) => {
    pUseRouter.push({path:"/articlescontent",query:{id:id}})
}
</script>

<style lang="scss" scoped>
    .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        background-color: #39a9ed;
    }
    .grid-item-cover-box {
        display: flex;
        justify-content: center;
        align-content: center;
        min-height: 224px;
        .grid-item-cover {
            display: block;
            width: 100%;
            height: 100%;
            img {
                object-fit: contain;
            }
        }
    }
    .van-multi-ellipsis--l3 {
        font-size: 20px;
    }
    .home-bottom-tips {
        text-align: center;
        padding: 20px;
    }
</style>