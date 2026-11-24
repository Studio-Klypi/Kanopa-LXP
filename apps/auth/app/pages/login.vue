<script setup lang="ts">
import { LoaderCircle } from '@lucide/vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { loginSchema } from '~/types/forms/login.form.ts';

const { locale, setLocale, locales } = useI18n();
async function changeLocale(val: 'fr') {
  await setLocale(val);
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

const form = useForm({
  validationSchema: toTypedSchema(loginSchema),
});
const submit = form.handleSubmit(async (values) => {
  await store.login(values);
});
</script>

<template>
  <UiPage
    name="login"
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
          {{ $t("login.title") }}
        </h1>
        <p class="text-lg max-w-md">
          {{ $t("login.description") }}
        </p>
      </article>
      <article class="flex flex-col justify-end">
        <p class="text-sm opacity-50">
          {{ $t("boosted") }}
        </p>
      </article>
    </section>

    <section class="flex flex-col justify-center py-8">
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
            {{ $t("login.subtitle") }}
          </h2>
          <i18n-t
            tag="p"
            keypath="login.precision"
          >
            <template
              v-if="companyName"
              #name
            >
              <span class="capitalize">{{ companyName }}</span>
            </template>
          </i18n-t>
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
              <UiFormLabel>{{ $t("fields.email.label") }}</UiFormLabel>
              <UiFormControl>
                <UiInput
                  type="email"
                  v-bind="componentField"
                  :placeholder="$t('fields.email.placeholder')"
                />
              </UiFormControl>
            </UiFormItem>
          </UiFormField>

          <UiFormField
            v-slot="{ componentField }"
            name="password"
          >
            <UiFormItem>
              <div class="flex items-center justify-between">
                <UiFormLabel>{{ $t("fields.password.label") }}</UiFormLabel>
                <NuxtLink
                  :to="{
                    path: 'forgot-password',
                    query: {
                      email: form.values.email,
                    },
                  }"
                  class="text-sm text-primary underline-offset-4 hover:underline"
                >
                  {{ $t("fields.password.forgot") }}
                </NuxtLink>
              </div>
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
            name="keep"
          >
            <UiFormItem class="space-y-0 flex items-center gap-2">
              <UiFormControl>
                <UiSwitch
                  :model-value="componentField.modelValue"
                  @update:model-value="componentField['onUpdate:modelValue']"
                />
              </UiFormControl>
              <UiFormLabel>
                {{ $t("fields.keep-session") }}
              </UiFormLabel>
            </UiFormItem>
          </UiFormField>

          <footer class="flex flex-col gap-6">
            <UiButton :disabled="loading.login">
              {{ $t("login.action") }}
              <LoaderCircle
                v-if="loading.login"
                class="animate-spin"
              />
            </UiButton>
            <div
              class="flex items-center gap-4 text-sm text-muted-foreground lowercase"
            >
              <UiSeparator class="flex-1" />
              <p>{{ $t("common.labels.or") }}</p>
              <UiSeparator class="flex-1" />
            </div>
            <UiButton
              variant="outline"
              type="button"
            >
              {{ $t("login.other-way") }}
            </UiButton>
            <i18n-t
              tag="p"
              keypath="login.register[0]"
              class="text-sm text-center text-muted-foreground"
            >
              <template #link>
                <NuxtLink
                  to="/register"
                  class="text-primary underline-offset-4 hover:underline"
                >
                  {{ $t("login.register[1]") }}
                </NuxtLink>
              </template>
            </i18n-t>
          </footer>
        </form>
      </UiContainer>
    </section>
  </UiPage>
</template>
