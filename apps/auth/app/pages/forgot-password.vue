<script setup lang="ts">
import { LoaderCircle } from '@lucide/vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { forgotPasswordSchema } from '~/types/forms/forgot-password.form.ts';

const { locale, locales, setLocale } = useI18n();
async function changeLocale(value: 'fr') {
  await setLocale(value);
}

const company = useSubdomain();
const companyName = computed(
  () => company.value?.split('-').join(' ') ?? 'Kanopa',
);
const initials = computed(() => {
  const parts = company.value?.split('-');
  return parts ? `${parts[0]![0]}${parts[1]![0]}` : 'KA';
});

const store = useAuth();
const { loading } = storeToRefs(store);

const email = useRoute().query.email as string | undefined;

const form = useForm({
  validationSchema: toTypedSchema(forgotPasswordSchema),
  initialValues: {
    email,
  },
});
const submit = form.handleSubmit(async (values) => {
  await store.forgotPassword(values);
});
</script>

<template>
  <UiPage
    name="forgot-password"
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
          {{ $t("forgot-password.title") }}
        </h1>
        <p class="text-lg max-w-md">
          {{ $t("forgot-password.description") }}
        </p>
      </article>
      <article class="flex flex-col justify-end">
        <p class="text-sm opacity-50">
          {{ $t("boosted") }}
        </p>
      </article>
    </section>

    <section class="flex flex-col justify-center">
      <UiContainer class="max-w-sm flex flex-col gap-8">
        <header class="flex flex-col">
          <UiSelect
            :model-value="locale"
            @update:model-value="(val) => changeLocale(val as 'fr')"
          >
            <UiSelectTrigger class="self-end mb-4">
              <UiSelectValue />
            </UiSelectTrigger>

            <UiSelectContent align="end">
              <UiSelectItem
                v-for="loc in locales"
                :key="loc.code"
                :value="loc.code"
              >
                {{ loc.name }}
              </UiSelectItem>
            </UiSelectContent>
          </UiSelect>

          <h2 class="text-3xl font-semibold">
            {{ $t("forgot-password.subtitle") }}
          </h2>
          <p>{{ $t('forgot-password.precision') }}</p>
        </header>

        <form
          class="flex flex-col gap-6"
          @submit="submit"
        >
          <UiFormField
            v-slot="{ componentField }"
            name="email"
          >
            <UiFormItem>
              <UiFormLabel>{{ $t('fields.email.label') }}</UiFormLabel>
              <UiFormControl>
                <UiInput
                  type="email"
                  v-bind="componentField"
                  :placeholder="$t('fields.email.placeholder')"
                />
              </UiFormControl>
            </UiFormItem>
          </UiFormField>

          <footer class="flex flex-col gap-3">
            <UiButton :disabled="loading.forgotPassword">
              {{ $t('forgot-password.action') }}
              <LoaderCircle
                v-if="loading.forgotPassword"
                class="animate-spin"
              />
            </UiButton>
            <UiButton
              type="button"
              variant="link"
              as-child
            >
              <NuxtLink to="/login">
                {{ $t('forgot-password.back-to-login') }}
              </NuxtLink>
            </UiButton>
          </footer>
        </form>
      </UiContainer>
    </section>
  </UiPage>
</template>
