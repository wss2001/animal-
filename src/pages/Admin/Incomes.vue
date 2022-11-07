<template>
  收益
</template>
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref } from "vue";
import { reqGetIncome,reqGetMsgMoney} from "@/api/index";
const router =useRouter()
onMounted(async () => {
  const {data,status} = await reqGetIncome()
  if(status==200){
    console.log(data)
  }
})


</script>
<style lang="less" scoped>
  
</style>