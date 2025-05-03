<script setup lang="ts">
import { LoadingPlugin } from 'tdesign-vue-next'
import { delay } from '~/utils'

async function onSubmit() {
  LoadingPlugin(true)
  await delay(Math.random() * 1000)
  LoadingPlugin(false)
}

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
    <section class="gap-4 grid grid-cols-2">
      <div>
        <ConfusionChart />
      </div>
      <div>
        <ScatterChart />
      </div>
      <div>
        <LabelChart />
      </div>
    </section>
  </div>
</template>

<style scoped>

</style>
