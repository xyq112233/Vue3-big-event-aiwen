<script setup>
  import { ref, nextTick } from 'vue'
  import ChannelSelect from './ChannelSelect.vue'
  import { Plus } from '@element-plus/icons-vue'
  import { QuillEditor } from '@vueup/vue-quill'
  import '@vueup/vue-quill/dist/vue-quill.snow.css'
  import { artPublishService, updateArticleService, ArtEditService } from '@/api/article'
  import { baseURL } from '@/utils/request'
  import axios from 'axios'
  const drawerVisible = ref(false)//抽屉显示隐藏

//默认数据
const defaultData = {
  title: '',
  cate_id: '',
  cover_img: '',
  content: '',
  state: ''
}
//准备数据
const formModel = ref({...defaultData})
const rules = ref({
  title: [
    { required: true, message: '文章标题不能为空', trigger: ['blur'] }
  ],
  cate_id: [
    { required: true, message: '请选择文章分类', trigger: ['blur'] }
  ]
})

//图片上传逻辑
const imageUrl = ref('')
const onSelectFile = (uploadFile) => {
  // console.log(uploadFile);
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
  formModel.value.cover_img = uploadFile.raw
}

// 发布文章
const emit = defineEmits(['success'])
const onPublish = async (state) => {
  // 将已发布还是草稿状态，存入 state
  formModel.value.state = state

  // 转换 formData 数据
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }

  if (formModel.value.id) {
    // console.log('编辑操作')
    // 编辑请求
    await ArtEditService(fd)
    ElMessage.success('编辑成功')
    drawerVisible.value = false
    emit('success', 'edit')
  } else {
    // 添加请求
    await artPublishService(fd)
    ElMessage.success('添加成功')
    drawerVisible.value = false
    emit('success', 'add')
  }
}
  // 打开抽屉
  const formRef = ref(null)
  const editorRef = ref(null)
  const open = async (row) => {
    drawerVisible.value = true
    await nextTick()
    if(row?.id){
      // console.log('bianji');
      // 编辑操作
      const res = await updateArticleService(row.id)
      // console.log(res);
      formModel.value = res.data.data
      // 处理图片显示
      imageUrl.value = baseURL + formModel.value.cover_img
      // 提交给后台，需要的是 file 格式的，将网络图片，转成 file 格式
    // 网络图片转成 file 对象, 需要转换一下
    formModel.value.cover_img = await 
    imageUrlToFile(imageUrl.value, formModel.value.cover_img)
      
    }else{
      formModel.value = {...defaultData}
      imageUrl.value = ''//清空图片url
      editorRef.value.setHTML('')//清空编辑器内容
      
    }
    console.log(row);
    
  }
  defineExpose({
    open
  })
  // 将网络图片地址转换为File对象
async function imageUrlToFile(url, fileName) {
  try {
    // 第一步：使用axios获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const imageData = response.data;

    // 第二步：将图片数据转换为Blob对象
    const blob = new Blob([imageData], { type: response.headers['content-type'] });

    // 第三步：创建一个新的File对象
    const file = new File([blob], fileName, { type: blob.type });

    return file;
  } catch (error) {
    console.error('将图片转换为File对象时发生错误:', error);
    throw error;
  }
}
</script>
<template>
  <!-- 抽屉 -->
  <el-drawer v-model="drawerVisible" title="添加文章" :direction="rtl" size="40%">
  <el-form :model="formModel" :rules="rules" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select
          v-model="formModel.cate_id"
          width="100%"
        ></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img"> 
        <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="onSelectFile"
  >       
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <quill-editor ref="editorRef" v-model:content="formModel.content" content-type="html" theme="snow"></quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onPublish('已发布')">发布</el-button>
        <el-button type="info" @click="onPublish('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
</el-drawer>
</template>

<style lang="scss" scoped>
  .avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>