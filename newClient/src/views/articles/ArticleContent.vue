<template>
    <van-nav-bar
        :title="userName"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        class="head-bar"
    />
    <van-swipe class="my-swipe" indicator-color="white">
        <van-swipe-item v-for="data in swipeImg" class="swipe-item">
            <img :src="data.img" />
        </van-swipe-item>
    </van-swipe>
    <van-cell-group class="content-box">
        <h2>{{contentData.title}}</h2>
        <p>{{contentData.content}}</p>
        <div class="tips-box">
            <span>{{createTimeTxt}}</span>
            <van-tag type="primary">{{ArticleStore().getTypeName(contentData.type)}}</van-tag>
        </div>
    </van-cell-group>
    
</template>

<script setup>
import { ref, inject, computed  } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { getTime } from '../../common/common'; 
import { ArticleStore } from '../../common/ArticleStore';
const router = useRouter()
const route = useRoute()
const axios = inject("axios")

const articleId = route.query.id
const userName = ref("")
const swipeImg = ref([])
const contentData = ref({
    title:"",
    content:"",
    create_time:0,
    type:0
})
const createTimeTxt = computed(() => {  // 传递函数
    return getTime(contentData.value.create_time)
})

const onClickLeft = () => router.push("/");
const getArticleContent = async () => {
    let contentResult = await axios.get("/article/articlecontent?id=" + articleId);
    contentData.value = contentResult.data.data
    
    let userNameResult = await axios.get("/user/userName?id=" + contentData.value.owner);
    userName.value = userNameResult.data.data.name
    let swipeImgResult = await axios.get("/article/articleimg?owner=" + contentData.value.id);
    swipeImg.value = swipeImgResult.data.data
}
getArticleContent()
</script>

<style lang="scss" scoped>
.my-swipe {
    background-color: #fff;
    border-bottom: dashed;
}
.swipe-item {
    height: 300px;
    display: flex;
    justify-content: center;
    align-content: center;
    overflow: hidden;
    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}
.content-box {
    padding: 10px 20px;
    h2 {
        
        font-size: 26px;
    }
    p {
        margin: 10px 0;
        font-size: 20px;
    }
    .tips-box {
        display: flex;
        justify-content: space-between;
        align-content: center;
    }
}
</style>