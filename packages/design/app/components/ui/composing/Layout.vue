<script setup lang="ts">
import type { ComposingProps } from './index.ts';
import { cn } from '~/lib/utils';

const props = withDefaults(
  defineProps<ComposingProps>(),
  {
    name: 'default',
  },
);
</script>

<template>
  <div
    :data-layout="name"
    :class="cn('@container/layout flex flex-col min-h-dvh', props.class)"
  >
    <slot />
  </div>
</template>
