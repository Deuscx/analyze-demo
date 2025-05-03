<script setup lang="ts">
import { Chart } from '@antv/g2'

const props = defineProps<{
  data: any
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

function transformData(data: any) {
  const value = data.value
  const len = value.time.length
  const newData = Array.from({ length: len }, (_, i) => ({
    time: value.time[i],
    magnitude: value.magnitude[i],
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
      callback: item => transformData(item),
    })
    .encode('x', 'time')
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
    callback: item => transformData(item),
  })
})
</script>

<template>
  <div ref="chartRef" />
</template>

<style scoped>
/* 可以在这里添加图表的样式 */
</style>
