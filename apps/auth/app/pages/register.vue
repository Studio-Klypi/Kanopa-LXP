<script setup lang="ts">
import { LoaderCircle } from '@lucide/vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { registerSchema } from '~/types/forms/register.form.ts';

const { locale, setLocale, locales } = useI18n();

const company = useSubdomain();
const companyName = computed(
  () => company.value?.split('-').join(' ') ?? 'Kanopa',
);
const initials = computed(() => {
  const parts = company.value?.split('-');
  return parts ? `${parts[0]![0]}${parts[1]![0]}` : 'KA';
});

async function changeLocale(val: 'fr') {
  await setLocale(val);
}

const store = useAuth();
const { loading } = storeToRefs(store);

const invitationCode = useRoute().query.ic as string | undefined;

const form = useForm({
  validationSchema: toTypedSchema(registerSchema),
  initialValues: {
    invitationCode,
  },
});
const submit = form.handleSubmit(async (values) => {
  await store.register(values);
});
</script>

<template>
  <UiPage
    name="register"
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
          {{ $t("register.title") }}
        </h1>
        <p class="text-lg max-w-md">
          {{ $t("register.description") }}
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
            {{ $t("register.subtitle") }}
          </h2>
          <i18n-t
            tag="p"
            keypath="register.precision[0]"
          >
            <template #link>
              <NuxtLink
                to="/login"
                class="text-primary underline-offset-4 hover:underline"
              >
                {{ $t("register.precision[1]") }}
              </NuxtLink>
            </template>
          </i18n-t>
        </header>

        <form
          class="flex flex-col gap-6"
          @submit="submit"
        >
          <div
            class="grid grid-cols-1 @sm/wrapper:grid-cols-2 gap-6 items-center"
          >
            <UiFormField
              v-slot="{ componentField }"
              name="firstName"
            >
              <UiFormItem>
                <UiFormLabel>{{ $t("fields.first-name.label") }}</UiFormLabel>
                <UiFormControl>
                  <UiInput
                    v-bind="componentField"
                    :placeholder="$t('fields.first-name.placeholder')"
                  />
                </UiFormControl>
              </UiFormItem>
            </UiFormField>

            <UiFormField
              v-slot="{ componentField }"
              name="lastName"
            >
              <UiFormItem>
                <UiFormLabel>{{ $t("fields.last-name.label") }}</UiFormLabel>
                <UiFormControl>
                  <UiInput
                    v-bind="componentField"
                    :placeholder="$t('fields.last-name.placeholder')"
                  />
                </UiFormControl>
              </UiFormItem>
            </UiFormField>
          </div>

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
              <UiFormLabel>{{ $t("fields.password.label") }}</UiFormLabel>
              <UiFormControl>
                <UiInput
                  type="password"
                  v-bind="componentField"
                  :placeholder="$t('fields.password.placeholder')"
                />
              </UiFormControl>
              <UiFormDescription class="text-xs">
                {{ $t("fields.password.description") }}
              </UiFormDescription>
            </UiFormItem>
          </UiFormField>

          <UiFormField
            v-slot="{ componentField }"
            name="invitationCode"
          >
            <UiFormItem>
              <UiFormLabel>
                {{
                  $t("fields.invitation-code.label")
                }}
              </UiFormLabel>
              <UiFormControl>
                <UiInput
                  v-bind="componentField"
                  :placeholder="$t('fields.invitation-code.placeholder')"
                  :disabled="!!invitationCode"
                />
              </UiFormControl>
            </UiFormItem>
          </UiFormField>

          <UiFormField
            v-slot="{ componentField }"
            name="accept"
          >
            <UiFormItem class="space-y-0 flex items-center gap-2">
              <UiFormControl>
                <UiSwitch
                  :model-value="componentField.modelValue"
                  @update:model-value="componentField['onUpdate:modelValue']"
                />
              </UiFormControl>
              <UiFormLabel>
                <i18n-t
                  tag="span"
                  keypath="fields.accept-terms[0]"
                >
                  <template #terms>
                    <NuxtLink
                      to="/register"
                      class="text-primary underline-offset-4 hover:underline"
                    >
                      {{ $t("fields.accept-terms[1]") }}
                    </NuxtLink>
                  </template>
                  <template #privacy>
                    <NuxtLink
                      to="/register"
                      class="text-primary underline-offset-4 hover:underline"
                    >
                      {{ $t("fields.accept-terms[2]") }}
                    </NuxtLink>
                  </template>
                </i18n-t>
              </UiFormLabel>
            </UiFormItem>
          </UiFormField>

          <footer class="flex flex-col gap-6">
            <UiButton :disabled="loading.register">
              {{ $t("register.action") }}
              <LoaderCircle
                v-if="loading.register"
                class="animate-spin"
              />
            </UiButton>
            <p class="text-muted-foreground text-sm text-center">
              {{ $t("register.mail-sent") }}
            </p>
          </footer>
        </form>
      </UiContainer>
    </section>
  </UiPage>
</template>
