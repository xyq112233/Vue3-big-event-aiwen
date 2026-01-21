<script setup>
  import {getArticleChannelList} from '@/api/article'
  import { ref, onMounted } from 'vue'
  defineProps({
    modelValue:{
      type:[Number,String]
    }
  })
  const emit = defineEmits(['update:modelValue'])
  const channelList = ref([])
    const getChannelList = async () => {
    const res = await getArticleChannelList()
    channelList.value = res.data.data
  }
  onMounted(() => {
    getChannelList()
  })
</script>
<template>
  <el-select :modelValue="modelValue" @update:modelValue="emit('update:modelValue', $event)" style="width: 200px;" size="small">
          <el-option v-for="channel in channelList" 
          :key="channel.id"
          :label="channel.cate_name" 
          :value="channel.id">
        </el-option>
  </el-select>
</template>