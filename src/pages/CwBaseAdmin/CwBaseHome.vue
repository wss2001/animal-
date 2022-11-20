<template>
  <div>基地首页</div>
</template>
<script lang="ts" setup>
import {useRouter,useRoute} from 'vue-router'
import {onMounted,reactive,ref} from 'vue'
import {reqGetCwBaseInfo} from '@/api/index'
const route = useRoute()
const router = useRouter()
const id = route.query.id as string
const result = reactive({
  cwArr:[{}],
  base:{}
})
onMounted(async () => {
  try {
    const {data,status} = await reqGetCwBaseInfo(id)
    if(status==0){
      result.cwArr = data 
    }
  } catch (error) {
    console.log(error)
  }
  
})
console.log(id)
</script>
<style lang="less" scoped>
  
</style>