import type { Ref } from 'vue';

export const useAuth = () => {
  const authenticated = ref<boolean | null>(null);
  const loading = ref(false);

  // const fetchStatus = async () => {
  //   loading.value = true;
  //   try {
  //     const data = await $fetch<{ authenticated: boolean }>('/api/auth/status');
  //     authenticated.value = data.authenticated;
  //   } catch {
  //     authenticated.value = false;
  //   } finally {
  //     loading.value = false;
  //   }
  // };

  const login = async (password: string) => {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: { password },
    });
    // await fetchStatus(); // обновляем состояние
  };

  return {
    authenticated: readonly(authenticated) as Ref<boolean | null>,
    loading: readonly(loading),
    login,
    // fetchStatus,
  };
};
