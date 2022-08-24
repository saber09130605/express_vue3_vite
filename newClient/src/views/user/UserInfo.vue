<template>
    <van-nav-bar
        title="用户信息"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        class="head-bar"
        right-text="登出"
        @click-right="onClickRight"
    />
    <van-cell-group class="user-basic-info">
        <van-image
            round
            width="60"
            height="60"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            @click="headImgClick"
        />
        <div class="user-info-1">
            <div class="user-name">{{userStore.name}}  <van-icon name="records" /></div>
            <div class="create-time">创建时间：{{userStore.getTimeTxt}}</div>
        </div>
    </van-cell-group>
    <van-divider />
    <div class="post-article-btn-box">
        <van-button round block type="primary" class="post-article-btn" @click="pushPostArticles">
            发布文章
        </van-button>
    </div>
    
</template>

<script setup>
import { inject } from 'vue';
import { Dialog,Toast } from 'vant';
import { useRouter, useRoute } from 'vue-router'
import { UserStore } from '../../common/UserStore'
const userStore = UserStore()
const pUseRouter = useRouter()
const axios = inject("axios")
const onClickLeft = () => history.back();
const onClickRight = () => {
    Dialog.confirm({
        title: '登出',
        message:'你确定是否登出？',
    })
    .then(() => {
        // on confirm
        outLogin()
    })
    .catch(() => {
        // on cancel
    });
};
const outLogin = async () => {
    let result = await axios.post("/user/outLogin", {
        account: userStore.account,
        password: userStore.password
    });
    Toast(result.data.msg)
    if (result.data.code < 500) {
        userStore.setUserInfo()
        pUseRouter.push("/")
    }
};
const pushPostArticles = () => {
    pUseRouter.push("postarticles")
}
</script>

<style lang="scss" scoped>
.user-basic-info {
    padding: 10px;
    display: flex;
    .user-info-1 {
        margin-left: 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .user-name {
            font-size: 24px;
        }
        .create-time {
            font-size: 18px;
        }
    }
}
.post-article-btn-box {
    display: flex;
    .post-article-btn {
        margin: 0 36px;
    }
}

</style>