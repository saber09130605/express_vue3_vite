<template>
    <van-nav-bar
        title="发布文章"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        class="head-bar"
    />

    <van-cell-group inset class="articles-box">
        <van-uploader v-model="fileList" multiple :max-count="3" class="upload-box" />
        <van-field v-model="aTitle" label="标题" placeholder="请输入标题" />
        <van-field
            v-model="message"
            rows="2"
            autosize
            label="发言"
            type="textarea"
            maxlength="100"
            placeholder="请输入发言"
            show-word-limit
        />
        <van-cell is-link :title="curArticleTypeName" @click="show = true" />
    </van-cell-group>
    
    <van-action-sheet v-model:show="show" :actions="ArticleStore().typeList" @select="onSelect" />
    <div class="post-article-btn-box">
        <van-button round block type="primary" class="post-article-btn" @click="postArticles">
            发布文章
        </van-button>
    </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import {ArticleStore} from "../../common/ArticleStore";
import {UserStore} from "../../common/UserStore";
import { Toast } from 'vant';
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const axios = inject("axios")
const onClickLeft = () => history.back();
const fileList = ref([]);
const message = ref("")
const aTitle = ref("")
let curArticleTypeID = 0
const postArticles = async () => {
    if (aTitle.value == "") {
        Toast("请输入正确的title")
        alert("请输入正确的title")
        return
    }
    if (message.value == "") {
        Toast("请输入正确的message")
        alert("请输入正确的message")
        return
    }
    if (curArticleTypeID == 0) {
        Toast("请输入正确的 curArticleTypeID")
        alert("请输入正确的 curArticleTypeID")
        return
    }
    if (fileList.value.length == 0) {
        Toast("请输入正确的 图片")
        alert("请输入正确的 图片")
        return
    }
    let cover = []
    fileList.value.forEach(element => {
        cover.push(element.content)
    });
    
    alert(cover[0])
    let result = await axios.post("/article/postarticle", {
        owner: UserStore().id,
        content:message.value,
        type:curArticleTypeID,
        cover:cover[0],
        title:aTitle.value
    });
    Toast(result.data.msg)
    let articleId = result.data.data.articleId
    if (cover.length > 1) {
       for (let index = 1; index < cover.length; index++) {
            const element = cover[index];
            let imgresult = await axios.post("/article/postarticleimg", {
                owner: articleId,
                img:element
            });
        }
    }
    router.push({path:"/articlescontent",query:{id:articleId}})
}

const show = ref(false);
const curArticleTypeName = ref("分类")
const onSelect = (item) => {
    show.value = false;
    curArticleTypeID = item.id
    curArticleTypeName.value = item.name
};
</script>

<style lang="scss" scoped>
.articles-box {
    margin-top: 10px;
    .upload-box {
        padding: 10px;
    }
}
.post-article-btn-box {
    display: flex;
    margin-top: 20px;
    .post-article-btn {
        margin: 0 36px;
    }
}

</style>