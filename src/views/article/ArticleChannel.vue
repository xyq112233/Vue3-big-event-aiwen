<script setup>
  import { getArticleChannelList,deleteArticleChannel } from '@/api/article'
  import {ref} from 'vue'
  import { Edit, Delete } from '@element-plus/icons-vue'
  import ChannelEdit from '@/views/article/components/ChannelEdit.vue'
import { ElMessageBox } from 'element-plus'
  //分类编辑弹窗引用
  const dialog = ref()
  //定义分类列表
  const channelList = ref([])
  //加载中
  const loading = ref(false)
  //获取文章分类列表
  const getChannelList = async () => {
    loading.value = true
    const res = await getArticleChannelList()
    channelList.value = res.data.data
    loading.value = false
  }
  getChannelList()
  //编辑分类
  const onEditChannel = (row) => {
    // console.log(row,index)
     dialog.value.open(row)
  }
  //删除分类
  const onDeleteChannel =async (row) => {
    // console.log(row,index)
    await ElMessageBox.confirm('确定删除该分类吗？', '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await deleteArticleChannel(row.id)
    ElMessage.success('删除分类成功')
    getChannelList()
   
  }
  //添加分类
  const onAddChannel = () => {
    dialog.value.open()
  }
  //分类编辑弹窗成功回调
  const onSuccess = () => {
    getChannelList()
  }
</script>
<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel">添加分类</el-button>
    </template>
    <el-table :data="channelList" style="width: 100%" v-loading="loading">
      <el-table-column type="index" label="序号" width="100" />
      <el-table-column prop="cate_name" label="分类名称" />
      <el-table-column prop="cate_alias" label="分类别名" />
      <el-table-column label="操作" width="100">
        <template #default="{row, $index}">
            <el-button plain :icon="Edit" circle type="primary"  @click="onEditChannel(row,$index)"></el-button>
            <el-button plain :icon="Delete" circle type="danger" @click="onDeleteChannel(row,$index)"></el-button>
        </template>
      </el-table-column>

      <template #empty>
        <el-empty description="暂无数据"></el-empty>
      </template>
    </el-table>
    <!-- 分类编辑弹窗 -->
    <ChannelEdit ref="dialog" @success="onSuccess"></ChannelEdit>
  </page-container>
</template>
<style lang="scss" scoped></style>
