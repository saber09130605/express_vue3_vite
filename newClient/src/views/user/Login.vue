<template>
    <div class="main-box">
        <van-nav-bar
            title="登录"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            class="head-bar"
            right-text="注册"
            @click-right="onClickRight"
        />
        <van-form @submit="onSubmit" class="form-box">
            <van-cell-group inset>
                <van-field
                v-model="account"
                name="account"
                label="账号"
                placeholder="账号"
                :rules="[{ required: true, message: '请填写账号' }]"
                />
                <van-field
                v-model="password"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
                />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    登录
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { UserStore } from '../../common/UserStore'
import { Toast } from 'vant';
const userStore = UserStore()
const pUseRouter = useRouter()
const axios = inject("axios")
const onClickLeft = () => history.back();
const onClickRight = () => pUseRouter.push("/createuser");
const account = ref('');
const password = ref('');
const onSubmit = async (values) => {
    let result = await axios.post("/user/login", {
        account: account.value,
        password: password.value
    });
    Toast(result.data.msg)
    if (result.data.code < 500) {
        userStore.setUserInfo(result.data.data)
        history.back()
    }
};
</script>

<style lang="scss" scoped>
.main-box {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .head-bar {
        position: fixed;
        top: 0;
        width: 100vw;
    }
    .form-box {
        flex-basis: 1;
    }
}

</style>