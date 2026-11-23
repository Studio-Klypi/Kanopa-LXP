<script setup lang="ts">
import type { PageProps } from './index.ts';
import { cn } from '~/lib/utils';

const props = withDefaults(
  defineProps<PageProps>(),
  {
    name: 'home',
  },
);
</script>

<template>
  <main
    :data-page="name"
    :class="cn('@container/page flex-1 min-h-0 flex flex-col', props.class)"
  >
    <slot />
  </main>
</template>
