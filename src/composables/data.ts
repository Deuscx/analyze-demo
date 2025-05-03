import type { SampleData } from '~/types'
import cwt from '~/data/cwt.json'
import frequency from '~/data/frequency.json'
import timeData from '~/data/time.json'

export function getTimeDatas() {
  return timeData
}

export function getFrequencyData() {
  return frequency
}

export function getTimeFrequencyData() {
  return cwt
}

export function generateTimeFrequencyData() {
  const timeSteps = 1024
  const frequencySteps = 30
  const data = []
  for (let t = 0; t < timeSteps; t++) {
    const f = Math.random() * frequencySteps
    // 简单示例，幅值根据时间和频率计算
    const amplitude = Math.sin(t * 0.1) * Math.cos(f * 0.2)
    data.push({
      time: t,
      frequency: f,
      amplitude,
    })
  }

  const analysis = {
    avg: 0,
    peak: 0,
    rms: 0,
    margin: 0,
    std: 0,
    variance: 0,
    kurtosis: 0,
    skewness: 0,
  }

  const sampleData: SampleData = {
    data,
    analysis,
  }
  return sampleData
}
