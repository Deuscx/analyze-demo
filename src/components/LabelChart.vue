<script setup lang="ts">
import { Chart } from '@antv/g2'

const props = defineProps<{
  model: string
}>()
const chartRef = ref(null)
const chart = shallowRef<Chart>()

const data1 = [0, 0, 1, 1, 2, 2, 3, 3, 4, 7, 5, 5, 6, 6, 4, 7, 8, 8, 9, 9].map((value, index) => {
  return {
    index,
    value,
  }
})

function getDataByType() {
  if (['SVM', 'KNN'].includes(props.model)) {
    return data1
  }

  return generateLabelData()
}
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
  chart.value = new Chart({
    container: chartRef.value!,
    autoFit: true,
    axis: {
      x: { title: '样本编号' },
      y: { title: '故障类别' },
    },
  })

  chart.value!
    .point()
    .data({
      type: 'inline',
      value: getDataByType(),
    })
    .encode('x', 'index')
    .encode('y', 'value')
    .encode('color', 'value')
    .scale('color', {
      type: 'ordinal',
      range: ['#7593ed', '#95e3b0', '#6c7893', '#e7c450', '#7460eb'],
    })

  chart.value!.render()
})

watch(() => props.model, () => {
  chart.value!.changeData({
    type: 'inline',
    value: getDataByType(),
  })
})
</script>

<template>
  <div ref="chartRef" />
</template>

<style scoped>

</style>
