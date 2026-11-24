<script setup lang="ts">
import type { AvatarFallbackProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { cn } from 'cn';
import { AvatarFallback } from 'reka-ui';

const props = defineProps<AvatarFallbackProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = reactiveOmit(props, 'class');
</script>

<template>
  <AvatarFallback
    data-slot="avatar-fallback"
    v-bind="delegatedProps"
    :class="cn('bg-muted flex text-sm font-semibold text-muted-foreground size-full uppercase items-center justify-center ', props.class)"
  >
    <slot />
  </AvatarFallback>
</template>
