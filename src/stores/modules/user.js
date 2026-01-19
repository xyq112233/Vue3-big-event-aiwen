import { defineStore } from "pinia"
import {ref} from 'vue'
//定义user模块的store
//用户模块 token setToken removeToken
export const useUserStore = defineStore('user', () => {
    //定义token
    const token = ref('')
    //定义setToken方法
    const setToken = (newToken) => {
        token.value = newToken
    }
    //定义removeToken方法
    const removeToken = () => {
        token.value = ''
    }
    return{
        token,
        setToken,
        removeToken
    }
},{
    persist: true,//持久化
})