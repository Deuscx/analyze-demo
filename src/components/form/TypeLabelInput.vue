<script setup lang="ts">
interface TypeLabelValue {
  type: string
  label: string
}
const props = defineProps<{
  value: TypeLabelValue
}>()

const emit = defineEmits<{
  (e: 'update:value', value: TypeLabelValue): void
  (e: 'change', value: TypeLabelValue): void
}>()

const data = useVModel(props, 'value')

function handleTypeChange(value: string) {
  const newValue = {
    type: value,
    label: data.value!.label,
  }
  emit('change', newValue)
//   data.value = newValue
}

function handleLabelChange(value: string, _context: any) {
  const newValue = {
    type: data.value!.type,
    label: value,
  }
  emit('change', newValue)
//   data.value = newValue
}
</script>

<template>
  <div class="flex gap-1 items-center">
    <t-input v-model:value="data.type" placeholder="请输入故障类型" class="w-100px!" @change="handleTypeChange" />
    <t-input v-model:value="data.label" placeholder="请输入标签" class="w-100px!" @change="handleLabelChange" />
  </div>
</template>
