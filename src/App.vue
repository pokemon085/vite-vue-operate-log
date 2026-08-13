<template>
  <el-config-provider :locale="zhTw">
    <div class="wrapper">
      <router-view />
    </div>
  </el-config-provider>
</template>
<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhTw from 'element-plus/es/locale/lang/zh-tw'
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 1rem;
}
</style>
