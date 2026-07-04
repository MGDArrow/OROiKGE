// middleware/guest.ts
import { getCookie } from 'h3';

export default defineNuxtRouteMiddleware(async (to) => {
  if (process.server) {
    const event = useRequestEvent();
    if (!event) return;
    const authCookie = getCookie(event, 'auth');
    if (authCookie === 'true') {
      return navigateTo('/admin');
    }
  } else {
    try {
      const data = await $fetch<{ authenticated: boolean }>('/api/auth/status');
      if (data.authenticated) {
        return navigateTo('/admin');
      }
    } catch {
      // не авторизован – остаёмся на странице
    }
  }
});
