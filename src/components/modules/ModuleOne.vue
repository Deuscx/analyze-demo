<script setup lang="ts">
import type { FrequencySample, TimeFrequencyData } from '~/types'
import { LoadingPlugin } from 'tdesign-vue-next'
import { generateTimeFrequencyData, getFrequencyData, getTimeDatas } from '~/composables/data'
import { delay } from '~/utils'

const data = ref<TimeFrequencyData[]>([])
const selectedIndex = ref(0)
const dataList = ref<any[]>([])
const frequencyDataList = ref<FrequencySample[]>([])
const selectedFrequencyData = computed(() => {
  return frequencyDataList.value[selectedIndex.value]
})
const selectedData = computed(() => {
  return dataList.value[selectedIndex.value]
})

const totalLength = computed(() => {
  return dataList.value.length
})
async function onSubmit() {
  LoadingPlugin(true)
  await delay(Math.random() * 1000)
  LoadingPlugin(false)
  const sampleData = generateTimeFrequencyData()
  const timeData = getTimeDatas()
  const data2 = getFrequencyData()
  frequencyDataList.value = data2
  dataList.value = timeData
  data.value = sampleData.data
}
</script>

<template>
  <header>
    <t-form layout="inline" @submit="onSubmit">
      <t-form-item label="采样频率" name="frequency">
        <t-input placeholder="请输入内容" />
      </t-form-item>
      <t-form-item label="转速" name="speed">
        <t-input placeholder="请输入内容" />
      </t-form-item>
      <t-form-item label="轴承型号" name="bearing">
        <t-input placeholder="请输入内容" />
      </t-form-item>
      <t-form-item label="设备型号" name="device">
        <t-input placeholder="请输入内容" />
      </t-form-item>
      <t-form-item>
        <t-space size="small">
          <t-button theme="primary" type="submit">
            提交
          </t-button>
        </t-space>
      </t-form-item>
    </t-form>
  </header>
  <section v-if="data.length">
    <div class="mt-2 flex gap-2 items-center justify-between">
      <div class="text-zinc flex gap-2 whitespace-nowrap items-center">
        数据读取完毕，一共有 {{ totalLength }}样本
      </div>
      <t-select
        v-model="selectedIndex"
        auto-width
        :options="dataList.map((item, index) => ({
          label: `第${index + 1}样本`,
          value: index,
        }))"
      />
    </div>
    <div class="gap-4 grid grid-cols-2">
      <div>
        <TimeDomainChart :data="selectedData" />
      </div>
      <div>
        <AnalyzeCard :data="selectedData.statistics" />
      </div>
      <div>
        <FreqDomainChart :data="selectedFrequencyData" />
      </div>
      <div>
        <TimeFreqChart :data="data" />
      </div>
    </div>
  </section>
  <div v-else class="mt-4 flex min-h-80vh items-center justify-center">
    <t-empty />
  </div>
</template>

<style scoped>

</style>
