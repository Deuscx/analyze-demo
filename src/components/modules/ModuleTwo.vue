<script setup lang="ts">
import { LoadingPlugin } from 'tdesign-vue-next'
import { getAllCmData, getSneData } from '~/composables/data'
import { delay } from '~/utils'

const modelList = ['SVM', 'CNN', 'KNN', 'ViT']
const modelOptions = modelList.map(item => ({
  label: item,
  value: item,
}))
const selectedModel = ref('SVM')
const groupModelData = ref<Record<string, any>>({})
const selectedModelCMData = computed(() => groupModelData.value[selectedModel.value])

const groupModelSneData = ref<Record<string, any>>({})
const selectedModelSneData = computed(() => groupModelSneData.value[selectedModel.value])
const formData = reactive<any>({
  frequency: '',
  speed: '',
  bearing: '',
  device: '',
  tagAlias: [],
})

function addTagAlias() {
  formData.tagAlias.push({
    type: '',
    label: '',
  })
}

function removeTagAlias(index: number) {
  formData.tagAlias.splice(index, 1)
}

async function onSubmit() {
  LoadingPlugin(true)
  await delay(Math.random() * 1000)
  LoadingPlugin(false)
  const data1 = getAllCmData()
  groupModelData.value = data1.reduce<Record<string, any>>((acc, item) => {
    acc[item.model] = item.cm
    return acc
  }, {})

  const data2 = getSneData()
  groupModelSneData.value = data2.reduce<Record<string, any>>((acc, item) => {
    acc[item.model] = item
    return acc
  }, {})
}
</script>

<template>
  <div>
    <header>
      <div class="mb-1 ml-auto flex gap-1 w-full justify-end">
        <t-button theme="primary" @click="addTagAlias">
          添加故障类型
        </t-button>
        <t-button theme="primary" type="submit" @click="onSubmit">
          提交
        </t-button>
      </div>
      <t-form :data="formData" layout="inline">
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

        <t-form-item name="tagAlias" label="故障类型">
          <div v-for="(item, index) in formData.tagAlias" :key="item" class="flex gap-1 items-center">
            <!-- 重点阅读：数组里面，注意 name 定义，用于区分不同的字段 -->
            <!-- 重点阅读：name 表示当前字段在 formData 中的路径，ruleName 表示当前字段在 rules 中的名称 -->
            <TypeLabelInput v-model:value="formData.tagAlias[index]" />
            <t-button shape="circle" variant="outline" @click="removeTagAlias(index)">
              <template #icon>
                <div class="i-carbon-close" />
              </template>
            </t-button>
          </div>
        </t-form-item>
      </t-form>
    </header>
    <div class="flex gap-2 items-center">
      <div class="flex gap-2 items-center">
        <span class="text-sm whitespace-nowrap">模型：</span>
        <t-select v-model="selectedModel" :options="modelOptions" auto-width />
      </div>
    </div>
    <section v-if="selectedModelCMData" class="gap-4 grid grid-cols-2">
      <div>
        <ConfusionChart :data="selectedModelCMData" />
      </div>
      <div>
        <ScatterChart :data="selectedModelSneData" />
      </div>
      <div>
        <LabelChart :model="selectedModel" />
      </div>
    </section>
    <div v-else class="mt-4 flex min-h-80vh items-center justify-center">
      <t-empty />
    </div>
  </div>
</template>

<style scoped>

</style>
