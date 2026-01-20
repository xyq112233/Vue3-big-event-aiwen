import { userGetInfoService } from "@/api/user"
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

    //获取用户信息
    const user = ref({})
    const getUser = async () => {
        const res = await userGetInfoService()
        user.value = res.data.data
    }
    const setUser = (obj) => {
        user.value = obj
    }
    return{
        token,
        user,
        setToken,
        removeToken,
        getUser,
        setUser
    }
},{
    persist: true,//持久化
})