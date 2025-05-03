<script setup lang="ts">
import { Chart } from '@antv/g2'

const chartRef = ref(null)

onMounted(() => {
  const chart = new Chart({
    container: chartRef.value!,
    height: 300,
  })

  chart
    .cell()
    .data({
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/seattle-weather.json',
    })
    .transform({ type: 'group', color: 'max' })
    .encode('x', d => new Date(d.date).getUTCDate())
    .encode('y', d => new Date(d.date).getUTCMonth())
    .encode('color', 'temp_max')
    .style('inset', 0.5)
    .scale('color', { palette: 'gnBu' })
    .animate('enter', { type: 'fadeIn' })

  chart.render()
})
</script>

<template>
  <div ref="chartRef" />
</template>

<style scoped>

</style>
