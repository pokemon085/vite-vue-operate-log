<template>
  <div class="card-wrap">
    <div :class="['icon', data.color]">
      <el-icon v-if="iconMap[data.icon]" :size="25">
        <component :is="iconMap[data.icon]" />
      </el-icon>
    </div>
    <div class="right-wrap">
      <div class="name">{{ data.name }}</div>
      <div class="value">
        {{ data.value }}
        <span class="unit">{{ data.unit }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Document, Warning, User } from '@element-plus/icons-vue'
import type { Component } from 'vue'
import type { TodayOperationLogData } from '@/types/operateHistory'

defineProps<{
  data: TodayOperationLogData
}>()

const iconMap: Record<string, Component> = {
  Document,
  Warning,
  User,
}
</script>
<style lang="scss" scoped>
.card-wrap {
  padding: 20px;
  background: var(--background1-color);
  display: flex;
  gap: 10px;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  flex: 1;
}

.icon {
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  &.primary {
    background-color: var(--primary-background-color);
    color: var(--primary-color);
  }

  &.danger {
    background-color: var(--danger-background-color);
    color: var(--danger-color);
  }

  &.success {
    background-color: var(--success-background-color);
    color: var(--success-color);
  }
}

.name {
  font-size: 13px;
  color: var(--text2-color);
  margin-bottom: 4px;
}

.value {
  font-size: 22px;
  font-weight: bold;
  color: var(--text1-color);

  .unit {
    font-size: 13px;
    color: var(--text2-color);
  }
}
</style>
