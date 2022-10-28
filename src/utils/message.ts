import { ElMessage } from 'element-plus'
export const open2 = (str:string='操纵成功') => {
  ElMessage({
    message: str,
    type: 'success',
  })
}
export const open4 = (str:string='操作失败') => {
  ElMessage.error(str)
}
