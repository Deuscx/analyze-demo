<script setup lang="ts">
import { Chart } from '@antv/g2'

const props = defineProps<{
  data: any[][]
}>()
const chartRef = ref(null)
const chart = shallowRef<Chart | null>(null)
function transformData(item: any) {
  const data = item.value
  const result = []
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      result.push({
        x: i,
        y: j,
        value: data[i][j],
      })
    }
  }
  return result
}

onMounted(() => {
  chart.value = new Chart({
    container: chartRef.value!,
    height: 300,
  })

  chart.value!
    .data({
      type: 'custom',
      value: props.data,
      callback: transformData,
    })
    .axis('y', { labelAutoRotate: false })
    .axis('x', {
      position: 'top',
    })
    .cell()
    .scale('color', { palette: 'gnBu' })
    .encode('x', 'x')
    .encode('y', 'y')
    .encode('color', 'value')
    .style('stroke', '#000')
    .label({
      text: 'value',
      fontWeight: 'bold',
      offset: 14,
    })
  chart.value.render()
})

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

</style>
