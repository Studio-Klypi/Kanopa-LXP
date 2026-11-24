<script setup lang="ts">
const { locale } = useI18n();

const props = withDefaults(
  defineProps<{
    plan: {
      id: string;
      name: Record<'fr', string>;
      description: Record<'fr', string>;
      price: {
        monthly: number;
        yearly: number;
      };
      popular?: boolean;
    };
    period?: 'monthly' | 'yearly';
    selected?: boolean;
  }>(),
  {
    selected: false,
    period: 'monthly',
  },
);
defineEmits<{
  click: [string];
}>();

const monthPriced = computed(() => {
  switch (props.period) {
    case 'monthly':
      return props.plan.price.monthly;
    case 'yearly':
      return Math.round((props.plan.price.yearly / 12) * 100) / 100;
    default:
      return 0;
  }
});
</script>

<template>
  <UiCard
    class="relative cursor-pointer select-none"
    :class="{ 'border-primary!': selected }"
    @click="() => $emit('click', plan.id)"
  >
    <p
      v-if="plan.popular"
      class="absolute top-0 left-1/2 -translate-1/2 rounded-lg py-1 px-2 bg-primary text-xs text-primary-foreground font-medium"
    >
      {{ $t("common.labels.popular") }}
    </p>

    <UiCardHeader>
      <UiCardTitle>{{ plan.name[locale] }}</UiCardTitle>
      <UiCardDescription>{{ plan.description[locale] }}</UiCardDescription>
    </UiCardHeader>

    <UiCardFooter class="mt-auto">
      <p
        v-if="period === 'monthly'"
        class="text-xl font-semibold"
      >
        {{ plan.price.monthly }} € HT/{{
          $t("common.labels.billing-period.unit.month")
        }}
      </p>
      <div
        v-else-if="period === 'yearly'"
        class="flex flex-col"
      >
        <p class="text-sm text-muted-foreground">
          {{ monthPriced }} € HT/{{
            $t(`common.labels.billing-period.unit.month`)
          }}
        </p>
        <p class="text-xl font-semibold">
          {{ plan.price.yearly }} € HT/{{
            $t(`common.labels.billing-period.unit.year`)
          }}
        </p>
      </div>
    </UiCardFooter>
  </UiCard>
</template>
