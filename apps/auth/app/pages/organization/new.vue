<script setup lang="ts">
import {
  AppWindow,
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Gift,
  Info,
  type LucideIcon,
  Palette,
  Plus,
  Scale,
} from '@lucide/vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { watchDebounced } from '@vueuse/core';
import { createOrganizationSchema } from '~/types/forms/create-organization.form.ts';

const steps = [
  {
    key: 'organization',
    icon: BriefcaseBusiness,
  },
  {
    key: 'appearance',
    icon: Palette,
  },
  {
    key: 'terms',
    icon: Scale,
  },
  {
    key: 'subscription',
    icon: AppWindow,
  },
];

const types = ['of', 'company', 'freelance'] as const;
const periods = ['monthly', 'yearly'];
const activePeriod = ref<'monthly' | 'yearly'>('yearly');

const plans = useMockPlans();

const { currentStepIndex, currentStep, canGoNext, canGoPrev, next, prev }
  = useStepper<{ key: string; icon: LucideIcon }>(steps);

const form = useForm({
  validationSchema: toTypedSchema(createOrganizationSchema),
  initialValues: {
    type: 'of',
    country: 'fr',
    plan: plans[1]!.id,
  },
  keepValuesOnUnmount: true,
});
const submit = form.handleSubmit(console.log);
watchDebounced(
  () => form.values.name,
  (value) => {
    if (form.isFieldTouched('alias')) return;
    form.resetField('alias', {
      value: value?.split(' ').join('-').toLowerCase() ?? undefined,
    });
  },
  {
    debounce: 300,
  },
);
</script>

<template>
  <UiPage
    name="organization.new"
    class="py-8"
  >
    <UiContainer class="max-w-4xl flex flex-col gap-8">
      <header class="flex justify-center">
        <UiStepper
          :model-value="currentStepIndex"
          class="flex-wrap gap-8"
        >
          <UiStepperItem
            v-for="(step, index) in steps"
            :key="step.key"
            :step="index + 1"
          >
            <UiStepperTrigger class="flex flex-row items-center gap-2">
              <UiStepperIndicator>
                <component :is="step.icon" />
              </UiStepperIndicator>
              <UiStepperTitle>
                {{ $t(`organization.new.steps[${index}]`) }}
              </UiStepperTitle>
            </UiStepperTrigger>
          </UiStepperItem>
        </UiStepper>
      </header>

      <main>
        <form
          class="flex flex-col gap-6"
          @submit="submit"
        >
          <UiCard>
            <UiCardHeader
              class="flex flex-col gap-2 @xl/wrapper:flex-row @xl/wrapper:items-center @xl/wrapper:justify-between"
            >
              <div class="grid gap-2 auto-rows-min">
                <UiCardTitle class="text-2xl">
                  {{ $t(`organization.new.title.${currentStep.key}`) }}
                </UiCardTitle>
                <UiCardDescription>
                  {{ $t(`organization.new.description.${currentStep.key}`) }}
                </UiCardDescription>
              </div>

              <div
                v-if="currentStepIndex === 4"
                class="flex font-medium flex-row-reverse items-center gap-2 @xl/wrapper:flex-row"
              >
                <p
                  v-if="activePeriod === 'yearly'"
                  class="text-sm text-primary"
                >
                  {{ $t("organization.new.fields.plan.reduction") }}
                </p>
                <UiTabs v-model="activePeriod">
                  <UiTabsList>
                    <UiTabsTrigger
                      v-for="period in periods"
                      :key="period"
                      :value="period"
                    >
                      {{ $t(`common.labels.billing-period.label.${period}`) }}
                    </UiTabsTrigger>
                  </UiTabsList>
                </UiTabs>
              </div>
            </UiCardHeader>

            <UiCardContent class="flex flex-col gap-6">
              <template v-if="currentStepIndex === 1">
                <UiFormField
                  v-slot="{ componentField }"
                  name="name"
                >
                  <UiFormItem>
                    <UiFormLabel>
                      {{ $t("organization.new.fields.name.label") }}
                    </UiFormLabel>
                    <UiFormControl>
                      <UiInput
                        v-bind="componentField"
                        :placeholder="
                          $t('organization.new.fields.name.placeholder')
                        "
                      />
                    </UiFormControl>
                  </UiFormItem>
                </UiFormField>

                <UiFormField
                  v-slot="{ componentField }"
                  name="alias"
                >
                  <UiFormItem>
                    <UiFormLabel>
                      {{ $t("organization.new.fields.alias.label") }}
                    </UiFormLabel>
                    <UiFormControl>
                      <div
                        class="flex border rounded-lg overflow-hidden aria-invalid:rind-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                      >
                        <div
                          class="flex items-center px-3 bg-muted text-muted-foreground border-r"
                        >
                          <p class="text-sm font-medium">
                            https://
                          </p>
                        </div>
                        <UiInput
                          v-bind="componentField"
                          :placeholder="
                            $t('organization.new.fields.alias.placeholder')
                          "
                          class="w-full! min-w-0! border-none! rounded-none!"
                        />
                        <div
                          class="flex items-center px-3 bg-muted text-muted-foreground border-l"
                        >
                          <p class="text-sm font-medium">
                            .kanopa.app
                          </p>
                        </div>
                      </div>
                    </UiFormControl>
                  </UiFormItem>
                </UiFormField>

                <div class="flex flex-col gap-2">
                  <UiLabel>
                    {{ $t("organization.new.fields.type.label") }}
                  </UiLabel>
                  <div
                    class="flex flex-col @2xl/wrapper:flex-row gap-6 *:flex-1"
                  >
                    <UiCard
                      v-for="type in types"
                      :key="type"
                      class="flex select-none cursor-pointer transition-colors duration-100"
                      :class="{ 'border-primary': form.values.type === type }"
                      @click="form.setFieldValue('type', type)"
                    >
                      <UiCardHeader>
                        <UiCardTitle>
                          {{
                            $t(
                              `organization.new.fields.type.options.${type}.title`,
                            )
                          }}
                        </UiCardTitle>
                        <UiCardDescription>
                          {{
                            $t(
                              `organization.new.fields.type.options.${type}.description`,
                            )
                          }}
                        </UiCardDescription>
                      </UiCardHeader>
                    </UiCard>
                  </div>
                </div>
              </template>
              <template v-else-if="currentStepIndex === 2">
                <UiFormField
                  v-slot="{ componentField }"
                  name="logo"
                >
                  <UiFormItem>
                    <UiFormControl>
                      <UiAvatarPicker v-bind="componentField">
                        {{ $t("organization.new.fields.logo.label") }}
                        <template #fallback>
                          {{ form.values?.name?.substring(0, 2) || "--" }}
                        </template>
                      </UiAvatarPicker>
                    </UiFormControl>
                    <UiFormDescription>
                      {{ $t("organization.new.fields.logo.precision") }}
                    </UiFormDescription>
                  </UiFormItem>
                </UiFormField>
              </template>
              <template v-else-if="currentStepIndex === 3">
                <div class="grid grid-cols-1 @xl/wrapper:grid-cols-2 gap-6">
                  <UiFormField
                    v-slot="{ componentField }"
                    name="businessName"
                  >
                    <UiFormItem>
                      <UiFormLabel class="inline-flex items-center gap-3">
                        {{ $t("organization.new.fields.business-name.label") }}

                        <UiTooltip>
                          <UiTooltipTrigger>
                            <Info
                              class="text-primary size-4 opacity-60 hover:opacity-100 transition-opacity duration-75"
                            />
                          </UiTooltipTrigger>
                          <UiTooltipContent>
                            <p class="whitespace-pre-line">
                              {{
                                $t(
                                  "organization.new.fields.business-name.tooltip",
                                )
                              }}
                            </p>
                          </UiTooltipContent>
                        </UiTooltip>
                      </UiFormLabel>
                      <UiFormControl>
                        <UiInput
                          v-bind="componentField"
                          :placeholder="
                            $t(
                              'organization.new.fields.business-name.placeholder',
                            )
                          "
                        />
                      </UiFormControl>
                    </UiFormItem>
                  </UiFormField>

                  <UiFormField
                    v-slot="{ componentField }"
                    name="siret"
                  >
                    <UiFormItem>
                      <UiFormLabel>
                        {{ $t("organization.new.fields.siret.label") }}
                      </UiFormLabel>
                      <UiFormControl>
                        <UiInput
                          v-bind="componentField"
                          inputmode="numeric"
                          :placeholder="
                            $t('organization.new.fields.siret.placeholder')
                          "
                        />
                      </UiFormControl>
                    </UiFormItem>
                  </UiFormField>
                </div>

                <div class="grid grid-cols-1 @xl/wrapper:grid-cols-2 gap-6">
                  <UiFormField
                    v-if="form.values.type === 'of'"
                    v-slot="{ componentField }"
                    name="activityNumber"
                  >
                    <UiFormItem>
                      <UiFormLabel>
                        {{
                          $t("organization.new.fields.activity-number.label")
                        }}
                      </UiFormLabel>
                      <UiFormControl>
                        <UiInput
                          v-bind="componentField"
                          inputmode="numeric"
                          :placeholder="
                            $t(
                              'organization.new.fields.activity-number.placeholder',
                            )
                          "
                        />
                      </UiFormControl>
                    </UiFormItem>
                  </UiFormField>

                  <UiFormField
                    v-slot="{ componentField }"
                    name="country"
                  >
                    <UiFormItem>
                      <UiFormLabel>
                        {{ $t("organization.new.fields.country.label") }}
                      </UiFormLabel>
                      <UiSelect
                        v-bind="componentField"
                        disabled
                      >
                        <UiFormControl>
                          <UiSelectTrigger class="w-full">
                            <UiSelectValue
                              :placeholder="
                                $t(
                                  'organization.new.fields.country.placeholder',
                                )
                              "
                            />
                          </UiSelectTrigger>
                        </UiFormControl>

                        <UiSelectContent>
                          <UiSelectItem value="fr">
                            France
                          </UiSelectItem>
                        </UiSelectContent>
                      </UiSelect>
                    </UiFormItem>
                  </UiFormField>
                </div>

                <UiFormField
                  v-if="form.values.type === 'of'"
                  v-slot="{ componentField }"
                  name="qualiopiCertified"
                >
                  <UiFormItem class="flex items-center gap-2.5">
                    <UiFormControl>
                      <UiCheckbox
                        :model-value="componentField.modelValue"
                        @update:model-value="
                          componentField['onUpdate:modelValue']
                        "
                      />
                    </UiFormControl>
                    <UiFormLabel>
                      {{
                        $t("organization.new.fields.qualiopi-certified.label")
                      }}
                    </UiFormLabel>
                  </UiFormItem>
                </UiFormField>
              </template>
              <template v-else-if="currentStepIndex === 4">
                <UiAlert>
                  <Gift />
                  <UiAlertTitle>
                    {{ $t("organization.new.free-trial.title") }}
                  </UiAlertTitle>
                  <UiAlertDescription>
                    {{ $t("organization.new.free-trial.description") }}
                  </UiAlertDescription>
                </UiAlert>

                <div class="grid grid-cols-1 @2xl/wrapper:grid-cols-3 gap-6">
                  <PlanCard
                    v-for="plan in plans"
                    :key="plan.id"
                    :plan
                    :period="activePeriod"
                    :selected="form.values.plan === plan.id"
                    @click="
                      (value: string) => form.setFieldValue('plan', value)
                    "
                  />
                </div>

                <p class="text-sm text-muted-foreground italic">
                  {{ $t("organization.new.fields.plan.description") }}
                </p>
              </template>
            </UiCardContent>
          </UiCard>

          <footer class="flex gap-2 justify-between">
            <div>
              <UiButton
                v-if="canGoPrev"
                type="button"
                variant="secondary"
                @click="prev"
              >
                <ArrowLeft />
                {{ $t("common.buttons.previous") }}
              </UiButton>
            </div>
            <div>
              <UiButton
                v-if="canGoNext"
                type="button"
                @click="next"
              >
                {{ $t("common.buttons.next") }}
                <ArrowRight />
              </UiButton>
              <UiButton
                v-else
                type="submit"
              >
                {{ $t("organization.new.action") }}
                <Plus />
              </UiButton>
            </div>
          </footer>
        </form>
      </main>
    </UiContainer>
  </UiPage>
</template>
