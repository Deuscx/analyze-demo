<template>
  <main font-sans p="x-4" text="center gray-700 dark:gray-200">
    <t-tabs :default-value="1">
      <t-tab-panel :value="1" label="模块1">
        <ModuleOne />
      </t-tab-panel>
      <t-tab-panel :value="2" label="模块2">
        <ModuleTwo />
      </t-tab-panel>
    </t-tabs>
  </main>
</template>
