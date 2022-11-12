import { onMounted,ref } from 'vue'

// 图形验证码
let identifyCodes = "1234567890"
let identifyCode = ref('3212')
const randomNum = (min: any, max: any) => {
  return Math.floor(Math.random() * (max - min) + min)
}
const makeCode = (o: any, l: any) => {
  for (let i = 0; i < l; i++) {
    identifyCode.value += o[
      randomNum(0, o.length)
    ];
  }
}
const refreshCode = () => {
  identifyCode.value = "";
  makeCode(identifyCodes, 4);
}
onMounted(() => {
  identifyCode.value = "";
  makeCode(identifyCodes, 4);
})