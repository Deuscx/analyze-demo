<script setup lang="ts">
import { Chart } from '@antv/g2'

const chartRef = ref(null)

function generateLabelData() {
  const count = 10
  const per = 2
  const data = []
  for (let i = 0; i < count; i++) {
    data.push(...Array.from({ length: per }, (_, _index) => ({
      index: i * per + _index,
      value: i,
    })))
  }
  return data
}

onMounted(() => {
  const chart = new Chart({
    container: chartRef.value!,
    autoFit: true,
    axis: {
      x: { title: '样本编号' },
      y: { title: '故障类别' },
    },
  })

  chart
    .point()
    .data({
      type: 'inline',
      value: generateLabelData(),
    })
    .encode('x', 'index')
    .encode('y', 'value')
    .encode('color', 'value')
    .scale('color', {
      type: 'ordinal',
      range: ['#7593ed', '#95e3b0', '#6c7893', '#e7c450', '#7460eb'],
    })

  chart.render()
})
</script>

<template>
  <div ref="chartRef" />
</template>

<style scoped>

</style>
