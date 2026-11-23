<script setup lang="ts">
const company = useSubdomain();
const companyName = computed(
  () => company.value?.split('-').join(' ') ?? 'Kanopa',
);
const initials = computed(() => {
  const parts = company.value?.split('-');
  return parts ? `${parts[0]![0]}${parts[1]![0]}` : 'KA';
});
</script>

<template>
  <UiLayout
    name="split"
    class="grid grid-cols-2"
  >
    <section
      class="bg-primary text-primary-foreground grid grid-rows-3 p-8 relative overflow-hidden isolate"
    >
      <div
        class="absolute bottom-0 right-0 w-3/4 -z-1 aspect-square translate-x-1/4 translate-y-1/3"
      >
        <span
          class="absolute inset-0 block aspect-square bg-current/10 rounded-full"
        />
        <span
          class="absolute size-1/3 top-10 left-10 block aspect-square bg-current/10 rounded-full"
        />
      </div>

      <article class="flex flex-col">
        <div class="flex items-center gap-3">
          <div
            class="aspect-square grid place-items-center size-8 bg-primary-foreground text-primary rounded-lg"
          >
            <p class="text-sm font-bold uppercase">
              {{ initials }}
            </p>
          </div>
          <p class="text-lg font-semibold capitalize">
            {{ companyName }}
          </p>
        </div>
      </article>
      <article class="flex flex-col gap-2 justify-center">
        <h1 class="text-5xl font-bold text-white">
          Content de vous revoir.
        </h1>
        <p class="text-lg">
          Retrouvez vos cohortes, vos séances et vos badges.
        </p>
      </article>
      <article class="flex flex-col justify-end">
        <p class="text-sm opacity-50">
          Propulsé par Kanopa
        </p>
      </article>
    </section>

    <section class="flex flex-col">
      <NuxtPage />
    </section>
  </UiLayout>
</template>
