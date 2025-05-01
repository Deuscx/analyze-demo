<script setup lang="ts">
import type { AnalysisData } from '~/types'

defineProps<{
  data: AnalysisData
}>()

const dataLabels = {
  avg: '均值',
  peak: '峰值',
  rms: '均方根',
  margin: '裕度',
  std: '标准差',
  variance: '方差',
  kurtosis: '峭度',
  skewness: '偏度',
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
