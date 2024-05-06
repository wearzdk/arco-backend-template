<script lang="ts" setup>
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'
import GlobalSetting from '@/components/global-setting/index.vue'
</script>

<template>
  <a-config-provider :locale="zhCN">
    <router-view />
    <GlobalSetting />
  </a-config-provider>
</template>
