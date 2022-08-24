<template>
    <div class="main-box">
        <van-nav-bar
            title="注册"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            class="head-bar"
        />
        <van-form @submit="onSubmit" class="form-box">
            <van-cell-group inset>
                <van-field
                v-model="account"
                name="account"
                label="账号"
                placeholder="请输入账号"
                :rules="[{ required: true, message: '请填写账号' }]"
                />
                <van-field
                v-model="password"
                type="password"
                name="password"
                label="密码"
                placeholder="请输入密码"
                :rules="[{ required: true, message: '请填写密码' }]"
                />
                 <van-field
                v-model="password2"
                type="password"
                name="password2"
                label="确认密码"
                placeholder="请输入密码"
                :rules="[{ required: true, message: '请填写密码' }]"
                />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    注册
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
const account = ref('');
const password = ref('');
const password2 = ref('');
const onSubmit = async (values) => {
    if (password.value != password2.value) {
        Toast.fail('密码请保持一致');
        return
    }
    let result = await axios.post("/user/create", {
        account: account.value,
        password: password.value
    });
    Toast(result.data.msg)
    if (result.data.code < 500) {
        userStore.setUserInfo(result.data.data)
        pUseRouter.push("/")
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