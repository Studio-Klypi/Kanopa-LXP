export default defineNuxtRouteMiddleware(async () => {
  const store = useAuth();
  const { isLoggedIn } = storeToRefs(store);

  if (isLoggedIn.value) return;
  await store.recover();
});
