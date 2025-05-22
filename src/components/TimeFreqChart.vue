<script setup lang="ts">
import type { CWTSample } from '~/types'
import * as d3 from 'd3'

const props = defineProps<{
  data: CWTSample
}>()

const chartRef = ref(null)
onMounted(() => {
  render()
})

function render() {
  const width = 600
  const height = 400
  // const data = transformData(props.data)
  const x = props.data.time_axis.length
  const y = props.data.frequency_axis.length
  // 获取画布元素
  const canvas = d3.select('#heatmap')
    .attr('width', width)
    .attr('height', height)
    .node()

  const ctx = canvas.getContext('2d')

  // 颜色比例尺
  const colorScale = d3.scaleSequential(d3.interpolateViridis)
    .domain([0, 1])

  // 每个单元格的尺寸
  const cellWidth = width / x
  const cellHeight = height / y

  // 绘制热力图
  props.data.cwt_coefficients.forEach((row, i) => {
    row.forEach((value, j) => {
      ctx.fillStyle = colorScale(value)
      ctx.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight)
    })
  })
}

watch(() => props.data, () => {
  render()
})
</script>

<template>
  <div class="chart-container relative">
    <canvas id="heatmap" ref="chartRef" />
    <div class="text-xs transform bottom--4 left-[50%] absolute">
      时间
    </div>
    <div class="text-xs translate-y-[-50%] rotate-[-90deg] transform top-[50%] absolute -left-6">
      频率
    </div>
  </div>
</template>

<style scoped>
/* 可以在这里添加图表的样式 */
</style>
