<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <div>
    <t-tabs :default-value="1">
      <t-tab-panel :value="1" label="模块1">
        <ModuleOne />
      </t-tab-panel>
      <t-tab-panel :value="2" label="模块2">
        <ModuleTwo />
      </t-tab-panel>
    </t-tabs>
  </div>
</template>
