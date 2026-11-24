export default function useStepper<T = unknown>(input: MaybeRefOrGetter<T[]>) {
  const steps = toValue(input);

  const currentStepIndex = ref<number>(1);
  const currentStep = computed<T>(() => steps[currentStepIndex.value - 1]!);

  const canGoNext = computed<boolean>(() => currentStepIndex.value < steps.length);
  const canGoPrev = computed<boolean>(() => currentStepIndex.value > 1);

  function next() {
    currentStepIndex.value = Math.min(currentStepIndex.value + 1, steps.length);
  }
  function prev() {
    currentStepIndex.value = Math.max(currentStepIndex.value - 1, 0);
  }

  return {
    currentStepIndex,
    currentStep,
    canGoNext,
    canGoPrev,

    next,
    prev,
  };
}
