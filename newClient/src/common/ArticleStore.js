import { defineStore } from 'pinia'

export const ArticleStore = defineStore("article",{
    state:() => {
        typeList:[]
    },
    actions:{
        
    },
    getters: {
        getTypeName:(state) => {
            return (type) => {

                return state.typeList[type - 1]?state.typeList[type - 1].name:"未定义"
            }
        }
    }
})