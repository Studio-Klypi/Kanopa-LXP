<script setup lang="ts">
import type { ComposingProps } from './index.ts';
import { cn } from '~/lib/utils';

const props = defineProps<ComposingProps>();
</script>

<template>
  <div :class="cn('@container/wrapper mx-auto w-[calc(100%-4rem)]', props.class)">
    <slot />
  </div>
</template>
