<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '~/lib/utils';
import { computed, onBeforeUnmount, ref, watch } from 'vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<{
  modelValue?: File;
  accept?: string;
  disabled?: boolean;
  class?: HTMLAttributes['class'];
}>(), {
  accept: 'image/png, image/svg+xml',
});

const emits = defineEmits<{
  (e: 'update:modelValue', payload: File | undefined): void;
}>();

const fileInputRef = ref<HTMLInputElement>();

const previewUrl = computed(() => {
  if (!props.modelValue) return undefined;
  return URL.createObjectURL(props.modelValue);
});

watch(previewUrl, (_, oldValue) => {
  if (oldValue) URL.revokeObjectURL(oldValue);
});
onBeforeUnmount(() => {
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
});

function onChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  emits('update:modelValue', file ?? undefined);
}

function triggerPick() {
  fileInputRef.value?.click();
}
</script>

<template>
  <div
    data-slot="avatar-picker"
    class="flex items-center gap-3 flex-wrap"
  >
    <Avatar :class="cn('size-14', props.class)">
      <AvatarImage :src="previewUrl ?? ''" />
      <AvatarFallback>
        <slot name="fallback" />
      </AvatarFallback>
    </Avatar>

    <input
      ref="fileInputRef"
      type="file"
      hidden
      :accept="accept"
      :disabled="disabled"
      class="fixed top-0 left-0 invisible -z-1"
      v-bind="$attrs"
      @change="onChange"
    >

    <Button
      type="button"
      variant="outline"
      :disabled="disabled"
      @click="triggerPick"
    >
      <slot />
    </Button>
  </div>
</template>
