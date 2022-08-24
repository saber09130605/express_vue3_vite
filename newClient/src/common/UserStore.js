import { defineStore } from 'pinia'
import { getTime } from './common';
export const UserStore = defineStore("user", {
    state: () => ({
        id: 0,
        account: "",
        token: "",
        name:"",
        create_time:0
    }),
    actions: {
        setUserInfo(userInfo) {
            if(!userInfo) {
                this.account = ""
                this.id = 0
                this.token = ""
                return
            }
            Object.assign(this, userInfo);
            localStorage.setItem("account", this.account)
            localStorage.setItem("password", this.password)
        }
    },
    getters: {
        getTimeTxt:(state) => {
            return state.create_time != 0?getTime(state.create_time):""
        }
    }
})