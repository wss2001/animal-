<script setup lang="ts">

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import * as echarts from "echarts";
import { onMounted,provide } from 'vue'

provide("echarts", echarts);
</script>

<template>
  <Header></Header>
  <router-view></router-view>
  <Footer></Footer>
</template>

<style scoped>

</style>
