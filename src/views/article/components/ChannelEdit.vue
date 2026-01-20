<script setup>
 import { ref } from 'vue'
 import { addArticleChannel, updateArticleChannel } from '@/api/article'
  //弹窗是否显示
  const dialogVisible = ref(false)

  //暴露一个open方法
  const open = (row) => {
    //将row赋值给弹窗的data
    // console.log(row);
    dialogVisible.value = true
    //将row赋值给formModel
    formModel.value = {...row}
  }
  //向外暴露open方法
  defineExpose({
    open
  })
  //表单数据模型
  const formModel = ref({
    cate_name:'',
    cate_alias:''
  })
  //表单规则
  const rules = ref({
    cate_name:[
      { required: true, message: '请输入分类名称', trigger: 'blur' },
      {pattern:/^\S{1,10}$/,message:'分类名称必须为1-10个非空字符',trigger:'blur'}
    ],
    cate_alias:[
      { required: true, message: '请输入分类别名', trigger: 'blur' },
      {pattern: /^[a-zA-Z0-9]{1,15}$/,message:'分类别名必须为1-15个字母数字',trigger:'blur'}
    ]
  })
  const emit = defineEmits(['success'])
  //确认和编辑分类
  const refForm = ref()
  const onSubmit = async () => {
    await refForm.value.validate()
    if(formModel.value.id){
      //编辑分类
      await updateArticleChannel(formModel.value)
      ElMessage.success('编辑分类成功')
    }else{
      //添加分类
      await addArticleChannel(formModel.value)
      ElMessage.success('添加分类成功')
    }
    //关闭弹窗
    dialogVisible.value = false
    emit('success')
  }
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑分类' : '添加分类'"
    width="30%"
  >
  <el-form ref="refForm" :model="formModel" :rules="rules" label-width="100px" style="padding-right: 30px">
    <el-form-item label="分类名称" prop="cate_name">
      <el-input size="small" v-model="formModel.cate_name" placeholder="请输入分类名称"></el-input>
    </el-form-item>
    <el-form-item label="分类别名" prop="cate_alias">
      <el-input size="small" v-model="formModel.cate_alias" placeholder="请输入分类别名"></el-input>
    </el-form-item>
  </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-row type="flex" justify="center">
          <el-col :span="10">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="onSubmit">
              确认
            </el-button>
          </el-col>
        </el-row>
      </div>
    </template>
  </el-dialog>
</template>