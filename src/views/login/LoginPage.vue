<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { userRegisterService,userLoginService } from '@/api/user'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'

const isRegister = ref(true)

// 登录页表单数据对象
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})
// 登录页表单校验规则对象
const rules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名长度必须在3到10位之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {pattern: /^[a-zA-Z0-9]{6,12}$/, message: '密码必须是6到12位字母或数字', trigger: 'blur'}
  ],
  repassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {pattern: /^[a-zA-Z0-9]{6,12}$/, message: '密码必须是6到12位字母或数字', trigger: 'blur'},
    {validator:(rules,value,callback) => {
      if(value !== formModel.value.password){
        callback(new Error('两次输入密码不一致'))
      }else{
        callback()
      }
    },
    trigger: 'blur'
  }
  ]
})
const form = ref()
//点击注册
const register = async () => {
  await form.value.validate()
  // console.log('1111');
 await userRegisterService(formModel.value)
 ElMessage.success('注册成功')
 isRegister.value = false
}
//点击登录
const userStore = useUserStore()
const router = useRouter()
const login = async () => {
  await form.value.validate()
  // 登录
  const res = await userLoginService(formModel.value)
  userStore.setToken(res.data.token)
  ElMessage.success('登录成功')
  router.push('/')
}

//重置表单
import { watch } from 'vue'
watch(isRegister, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})
</script>

<template>
<el-row class="login-page">
  <el-col :span="12" class="bg"></el-col>
  <el-col :span="6" :offset="3" class="form">
    <el-form 
     :model="formModel"
     :rules="rules"
     ref="form" 
     size="large" 
     autocomplete="off" 
     v-if="isRegister">
    <el-form-item>
      <h1>注册</h1>
    </el-form-item>
    <el-form-item prop="username">
      <el-input v-model="formModel.username" :prefix-icon="User" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="formModel.password" show-password :prefix-icon="Lock" type="password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item prop="repassword">
      <el-input v-model="formModel.repassword" :prefix-icon="Lock" type="password" placeholder="请再次输入密码"></el-input>
    </el-form-item>
    <el-form-item>
          <el-button @click="register" class="button" type="primary" auto-insert-space>
            注册
          </el-button>
        </el-form-item>
    <el-form-item class="flex">
      <el-link type="info" :underline="false" @click="isRegister = false">
        ← 返回
      </el-link>
    </el-form-item>
  </el-form>
  <el-form :model="formModel" :rules="rules" ref="form" size="large" autocomplete="off" v-else>
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="formModel.username" :prefix-icon="User" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" class="button" type="primary" auto-insert-space
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
  </el-col>
</el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background: url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>