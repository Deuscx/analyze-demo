import type { Chart } from '@antv/g2'

// 设置图表的配置
export function setChartConfig(chart: Chart, data: any, x: string, y: string) {
  if (!data || !chart)
    return
  chart
    .line()
    .data(data)
    .encode('x', x)
    .encode('y', y)
    .transform({
      type: 'sample',
      //   thresholds: 200,
      //   strategy: 'max',
    })

  chart.render()
}

export function setChartConfig2(chart: Chart, data: any, x: string, y: string) {
  if (!data || !chart)
    return
  chart
    .area()
    .data(data)
    // .scale('x', x)
    // .scale('y', y)
    .scale('color', { palette: 'turbo' })
    .encode('x', x)
    .encode('y', y)
    // .encode('shape', 'hvh')
    .encode('color', 'amplitude')
    .encode('series', () => undefined)
    .style('gradient', 'x')
    // .style('lineWidth', 2)
    // .style('lineJoin', 'round')
    // .axis('x', { title: 'date' })

  chart.render()
}
