<template>
  <button
    class="vk-button
    shadow-sm inline-flex items-center justify-center
     disabled:opacity-50 disabled:pointer-events-none"
    :class="[colorClasses, sizeClasses]"
    :disabled="disabled || loading"
  >
    <Icon :icon="iconWithLoading" class="mr-2" v-if="iconWithLoading" />
    <slot></slot>
  </button>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

export type ButtonColor = 'green' | 'purple'
export type ButtonSize = 'large' | 'small'

export interface ButtonProps {
  color?: ButtonColor;
  size?: ButtonSize;
  plain?: boolean;
  disabled?: boolean;
  loading?: boolean;
  iconName?: string;
}

defineOptions({
  name: 'VkButton'
})

const props = withDefaults(defineProps<ButtonProps>(), {
  color: 'green'
})
const colorVariants: Record<ButtonColor, any> = {
  'green' : {
    plain: 'bg-green-50 text-green-700 hover:bg-green-700 border border-green-700 hover:text-white',
    normal: 'bg-green-700 text-white hover:bg-green-700/90 border border-green-700'
  },
  'purple': {
    plain: 'bg-purple-50 text-purple-700 hover:bg-purple-700 border border-purple-700 hover:text-white',
    normal: 'bg-purple-700 text-white hover:bg-purple-700/90 border border-purple-700'
  }
}
const iconWithLoading = computed(() => {
  if (props.loading) {
    return 'line-md:loading-loop'
  } else {
    return props.iconName
  }
})
const colorClasses = computed(() => {
  if (props.plain) {
    return colorVariants[props.color].plain
  } else {
    return colorVariants[props.color].normal
  }
})
const sizeClasses = computed(() => {
  if (!props.size) {
    return 'h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]' 
  } else {
    if (props.size === 'large') {
      return 'h-[40px] py-[12px] px-[19px] rounded-[4px] text-base'
    } else {
      return 'h-[24px] py-[11px] px-[5px] rounded-[3px] text-xs'
    }
  }
})
</script>