<script setup lang="ts">
import { Chart } from '@antv/g2'

const chartRef = ref(null)
onMounted(() => {
  const chart = new Chart({
    container: chartRef.value!,
    autoFit: true,
  })

  chart
    .point()
    .data({
      type: 'fetch',
      value:
      'https://gw.alipayobjects.com/os/bmw-prod/2c813e2d-2276-40b9-a9af-cf0a0fb7e942.csv',
    })
    .transform({ type: 'sortX', channel: 'x' })
    .transform({ type: 'jitterX' })
    .encode('y', 'Horsepower')
    .encode('x', 'Cylinders')
    .encode('shape', 'hollow')
    .encode('color', 'Cylinders')
    .scale('x', { type: 'point' })
    .scale('color', { type: 'ordinal' })

  chart.render()
})
</script>

<template>
  <div ref="chartRef" />
</template>

<style scoped>

</style>
