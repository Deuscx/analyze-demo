<script setup lang="ts">
import type { AnalysisData } from '~/types'

defineProps<{
  data: AnalysisData
}>()

// mean：均值；rms：均方根值；std：标准差；kurtosis：峰度；skew：偏度；peak：峰值
const dataLabels = {
  mean: '均值',
  rms: '均方根值',
  std: '标准差',
  kurtosis: '峰度',
  skew: '偏度',
  peak: '峰值',
}
</script>

<template>
  <div class="gap-2 grid grid-cols-2">
    <div v-for="(value, key) in data" :key="key" class="flex w-full items-center justify-start">
      <span class="text-lg">{{ dataLabels[key] }}: </span>
      <span class="text-green-500">{{ value }}</span>
    </div>
  </div>
</template>

<style scoped>

</style>
