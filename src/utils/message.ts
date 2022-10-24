import { ElMessage } from 'element-plus'
export const open2 = (str:string) => {
  ElMessage({
    message: str,
    type: 'success',
  })
}
export const open4 = (str:string) => {
  ElMessage.error(str)
}
