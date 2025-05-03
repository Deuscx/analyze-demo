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
      'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
    })
    .encode('x', 'height')
    .encode('y', 'weight')
    .encode('color', 'gender')

  chart.render()
})
</script>

<template>
  <div ref="chartRef" />
</template>

<style scoped>

</style>
