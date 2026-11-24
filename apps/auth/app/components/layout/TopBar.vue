<script setup lang="ts">
const name = 'Camille Laurent';
</script>

<template>
  <header class="sticky top-0 bg-background h-16 flex items-center">
    <UiContainer class="max-w-7xl flex items-center justify-between">
      <p class="text-lg font-semibold">
        kan<span class="text-primary">o</span>pa<span class="text-primary">.</span>
      </p>

      <div class="flex items-center gap-3">
        <p class="text-sm text-muted-foreground">
          {{ $t('common.labels.logged-as', { name }) }}
        </p>

        <UiButton
          variant="outline"
          size="sm"
        >
          {{ $t('common.buttons.leave') }}
        </UiButton>
      </div>
    </UiContainer>
  </header>
</template>
