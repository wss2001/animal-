<script setup lang="ts">

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import * as echarts from "echarts";
import { onMounted,provide } from 'vue'
import { useRoute} from "vue-router";
const route = useRoute()
console.log(route.meta)

provide("echarts", echarts);
</script>

<template>
  <Header v-show="route.meta.showHeader"></Header>
  <router-view></router-view>
  <Footer v-show="route.meta.showFooter"></Footer>
</template>

<style scoped>

</style>
