<script setup lang="ts">
import type { AnalysisData, TimeFrequencyData } from '~/types'
import { LoadingPlugin } from 'tdesign-vue-next'
import { generateTimeFrequencyData } from '~/composables/data'
import { delay } from '~/utils'

const data = ref<TimeFrequencyData[]>([])
const analysis = ref<AnalysisData>({} as any)

async function onSubmit() {
  LoadingPlugin(true)
  await delay(Math.random() * 1000)
  LoadingPlugin(false)
  const sampleData = generateTimeFrequencyData()
  data.value = sampleData.data
  analysis.value = sampleData.analysis
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
    <div class="gap-4 grid grid-cols-2">
      <div>
        <TimeDomainChart :data="data" />
      </div>
      <div>
        <AnalyzeCard :data="analysis" />
      </div>
      <div>
        <FreqDomainChart :data="data" />
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
