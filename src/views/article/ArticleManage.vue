<script setup>
import ChannelSelect from '@/views/article/components/ChannelSelect.vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import { getArticleList, deleteArticleService } from '@/api/article'
import { formatTime } from '@/utils/format'
import ArticleEdit from '@/views/article/components/ArticleEdit.vue'
import { ref } from 'vue'

const articleList = ref([])//// 文章列表
const total = ref(0)//// 文章总数
const loading = ref(false)
//定义请求参数对象
const params = ref({
  pagenum:1,
  pagesize:5,
  cate_id:'',
  state:''
})
//文章:获取文章列表
const artGetArticleList = async () => {
  loading.value = true
  const res = await getArticleList(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
artGetArticleList()

// 搜索逻辑
const onSearch = () => {
  params.value.pagenum = 1
  artGetArticleList()
}
// 重置逻辑
const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  artGetArticleList()
}
const articleEditRef = ref()
//添加逻辑
const onAddArtivle = () => {
  articleEditRef.value.open()
}
//编辑逻辑
const onEditArticle = (row) => {
  // console.log(row)
  articleEditRef.value.open(row)
}
//删除逻辑
const onDeleteArticle = async (row) => {
  await ElMessageBox.confirm('你确认删除该文章信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await deleteArticleService(row.id)
  ElMessage({ type: 'success', message: '删除成功' })
  artGetArticleList()
}
//处理分页逻辑
const onSizeChange = (size) => {
  // console.log('当前每页条数', size); 
  params.value.pagenum = 1
  params.value.pagesize = size
  artGetArticleList()
}
const onCurrentChange = (current) => {
  // console.log('当前页码', current);
  params.value.pagenum = current
  artGetArticleList()
}
// 添加修改成功
const onSuccess = (type) => {
  if (type === 'add') {
    // 如果是添加，需要跳转渲染最后一页，编辑直接渲染当前页
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  artGetArticleList()
}
</script>
<template>
  <page-container title="文章管理"> 
    <template #extra>
      <el-button type="primary" @click="onAddArtivle">添加文章</el-button>
    </template>
    <!-- 表单区域 -->
     <el-form :inline="true">
      <el-form-item label="文章分类:">
        <ChannelSelect v-model="params.cate_id"></ChannelSelect>
      </el-form-item>
      <el-form-item label="发布状态:">
        <el-select style="width: 200px;" size="small" v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
     </el-form>
     <!-- 表格区域 -->
      <el-table :data="articleList" v-loading="loading">
        <el-table-column label="文章标题" prop="title">
          <template #default="{row}">
            <!-- underline是下划线 -->
            <el-link type="primary" underline="never">{{ row.title }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="文章分类" prop="cate_name"></el-table-column>
        <el-table-column label="发布时间" prop="pub_date">
          <template #default="{row}">
            {{ formatTime(row.pub_date) }}
          </template>
        </el-table-column>
        <el-table-column label="发布状态" prop="state"></el-table-column>
        <el-table-column label="操作">
          <template #default="{row}">
            <el-button circle plain type="primary" :icon="Edit" @click="onEditArticle(row)"></el-button>
            <el-button circle plain type="danger" :icon="Delete" @click="onDeleteArticle(row)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 10]"
      layout="jumper, total, sizes, prev, pager, next"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end;"
    />

    <!-- 抽屉 -->
      <ArticleEdit ref="articleEditRef" @success="onSuccess"></ArticleEdit>
  </page-container>
</template>
<style lang="scss" scoped></style>