<script setup lang="ts">
import { LoaderCircle } from '@lucide/vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { resetPasswordSchema } from '~/types/forms/reset-password.form.ts';

const { locale, locales, setLocale } = useI18n();
async function changeLocale(value: 'fr') {
  await setLocale(value);
}

definePageMeta({
  layout: 'empty',
});

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

const email = useRoute().query.e as string | undefined;

const form = useForm({
  validationSchema: toTypedSchema(resetPasswordSchema),
  initialValues: {
    logout: true,
  },
});
const submit = form.handleSubmit(async (values) => {
  await store.resetPassword(values);
});
</script>

<template>
  <UiPage
    name="reset-password"
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
          {{ $t("reset-password.title") }}
        </h1>
        <p class="text-lg max-w-md">
          {{ $t("reset-password.description") }}
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
            {{ $t("reset-password.subtitle") }}
          </h2>
          <i18n-t
            tag="p"
            keypath="reset-password.precision"
          >
            <template #email>
              <strong class="font-semibold">{{ email }}</strong>
            </template>
          </i18n-t>
        </header>

        <form
          class="flex flex-col gap-6"
          @submit="submit"
        >
          <UiFormField
            v-slot="{ componentField }"
            name="new"
          >
            <UiFormItem>
              <UiFormLabel>
                {{ $t("reset-password.fields.new-password") }}
              </UiFormLabel>
              <UiFormControl>
                <UiInput
                  type="password"
                  v-bind="componentField"
                  :placeholder="$t('fields.password.placeholder')"
                />
              </UiFormControl>
            </UiFormItem>
          </UiFormField>

          <UiFormField
            v-slot="{ componentField }"
            name="confirm"
          >
            <UiFormItem>
              <UiFormLabel>
                {{ $t("reset-password.fields.confirm-password") }}
              </UiFormLabel>
              <UiFormControl>
                <UiInput
                  type="password"
                  v-bind="componentField"
                  :placeholder="$t('fields.password.placeholder')"
                />
              </UiFormControl>
            </UiFormItem>
          </UiFormField>

          <UiFormField
            v-slot="{ componentField }"
            name="logout"
          >
            <UiFormItem class="flex items-center gap-2.5">
              <UiFormControl>
                <UiCheckbox
                  :model-value="componentField.modelValue"
                  @update:model-value="componentField['onUpdate:modelValue']"
                />
              </UiFormControl>
              <UiFormLabel>
                {{ $t("reset-password.fields.logout") }}
              </UiFormLabel>
            </UiFormItem>
          </UiFormField>

          <footer class="flex flex-col gap-3">
            <UiButton :disabled="loading.resetPassword">
              {{ $t("reset-password.action") }}
              <LoaderCircle
                v-if="loading.resetPassword"
                class="animate-spin"
              />
            </UiButton>
          </footer>
        </form>
      </UiContainer>
    </section>
  </UiPage>
</template>
