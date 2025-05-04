<script setup lang="ts">
import type { SNESample } from '~/types'
import { Chart } from '@antv/g2'

const props = defineProps<{
  data: any
}>()

const chartRef = ref(null)
const chart = shallowRef<Chart>()
function transformData(data: any) {
  const value = data.value as SNESample
  const result = []
  for (let i = 0; i < value.label.length; i++) {
    result.push({
      x: value['2D_feats'][i][0],
      y: value['2D_feats'][i][1],
      label: value.label[i],
    })
  }
  return result
}

onMounted(() => {
  chart.value = new Chart({
    container: chartRef.value!,
    autoFit: true,
  })

  chart.value
    .point()
    .data({
      type: 'custom',
      value: props.data,
      callback: transformData,
    })
    // .transform({ type: 'sortX', channel: 'x' })
    // .transform({ type: 'jitterX' })
    .encode('x', 'x')
    .encode('y', 'y')
    // .encode('shape', 'hollow')
    .encode('color', 'label')
    .scale('x', { type: 'point' })
    .scale('color', { type: 'ordinal' })

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
