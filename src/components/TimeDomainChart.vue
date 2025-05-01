<script setup lang="ts">
import type { TimeFrequencyData } from '~/types'
import { Chart } from '@antv/g2'
import { setChartConfig } from '~/composables/chart'

const props = defineProps<{
  data: TimeFrequencyData[]
}>()

const chartRef = ref(null)
const chart = shallowRef<Chart | null>(null)
onMounted(() => {
  chart.value = new Chart({
    container: chartRef.value,
    autoFit: true,
  })
  setValue()
})

function setValue() {
  setChartConfig(chart.value!, props.data, 'time', 'amplitude')
}

watch(() => props.data, () => {
  chart.value!.changeData(props.data)
})
</script>

<template>
  <div ref="chartRef" />
</template>

<style scoped>
/* 可以在这里添加图表的样式 */
</style>
