<script setup lang="ts">
import type { FrequencySample } from '~/types'
import { Chart } from '@antv/g2'

const props = defineProps<{
  data: FrequencySample
}>()

const chartRef = ref(null)
const chart = shallowRef<Chart | null>(null)
onMounted(() => {
  chart.value = new Chart({
    container: chartRef.value!,
    autoFit: true,
    axis: {
      x: { title: '频率' },
      y: { title: '幅值' },
    },
  })
  setValue()
})

function transformData(data: any) {
  const value = data.value as FrequencySample
  const len = value.frequency_domain.frequencies.length
  const newData = Array.from({ length: len }, (_, i) => ({
    frequency: value.frequency_domain.frequencies[i],
    magnitude: value.frequency_domain.magnitude[i],
  }))
  return newData
}

function setNewConfig(chart: Chart, data: any) {
  if (!data || !chart)
    return

  chart
    .line()
    .data({
      type: 'custom',
      value: data,
      callback: transformData,
    })
    .encode('x', 'frequency')
    .encode('y', 'magnitude')
    .transform({
      type: 'sample',
      //   thresholds: 200,
      //   strategy: 'max',
    })

  chart.render()
}

function setValue() {
  setNewConfig(chart.value!, props.data)
}

watch(() => props.data, () => {
  chart.value!.changeData({
    type: 'custom',
    value: props.data,
    callback: transformData,
  })
})
</script>

<template>
  <div ref="chartRef" />
</template>

<style scoped>
/* 可以在这里添加图表的样式 */
</style>
