<template>
  <div class="list">
    <el-card class="box-card" v-for="item in rr.cwBaseArr">
      <template #header>
        <div class="card-header">
          <span>{{ item.baseName }}</span>
          <el-button type="warning" text @click="handleShow(item._id)">删除该基地</el-button>
        </div>
      </template>
      <div class="content">
        <p>手机号：{{ item.phoneNumber }}</p>
        <p>共有宠物:{{ item.baseCw.length }}</p>
        <p>地址:{{ item.address }}</p>
        <p>救助：{{ item.income }}</p>
      </div>
      <!-- <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div> -->
    </el-card>
  </div>

  <el-dialog v-model="dialogVisible" title="删除基地" width="30%" :before-close="handleClose">
    <span>确定要删除该基地么</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="remove">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref, reactive } from "vue";
import { reqGetCwBase, reqRemoveCwBase } from '@/api/index'
import { ElMessage } from 'element-plus'
const router = useRouter()
let rr = reactive({
  cwBaseArr: [{
    baseName: "",
    baseCw: [],
    phoneNumber: '',
    address: '',
    _id: "",
    income: 0
  }]
})
const getBase = async ()=>{
  try {
    let { data, status } = await reqGetCwBase()
    if (status == 0) {
      rr.cwBaseArr = data
    }
  } catch (error) {
    console.log(error)
  }
}
onMounted(async () => {
  getBase()
})
const dialogVisible = ref(false)
let baseid = ref('')
const handleShow = (id: string) => {
  console.log(id)
  baseid.value = id;
  dialogVisible.value = true
}
const handleClose = () => {
  dialogVisible.value = false
}
const remove = async () => {
  dialogVisible.value = false
  const id = baseid.value
  if (id == '') {
    return
  } else {
    try {
      const { data, status } = await reqRemoveCwBase(id)
      if (status == 200) {
        getBase()
        ElMessage({
          message: '删除成功',
          grouping: true,
          type: 'success',
        })
      } else {
        ElMessage({
          message: data,
          grouping: true,
          type: 'success',
        })
      }
    } catch (error) {
      console.log(error)
      ElMessage({
        message: '删除失败',
        grouping: true,
        type: 'success',
      })
    }

  }
}

</script>
<style lang="less" scoped>
.list {
  display: grid;
  grid-template-columns: repeat(3, 30%);
  grid-gap: 30px;

  // grid-template-rows: ;
  p {
    margin-bottom: 5px;
  }
}

@media only screen and (min-width:0px) and (max-width:900px) {
  .list {
    display: grid;
    grid-template-columns: repeat(2, 46%);
    grid-gap: 30px;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 300px;
}
</style>