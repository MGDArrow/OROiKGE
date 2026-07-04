// middleware/auth.ts
import { getCookie } from 'h3';

export default defineNuxtRouteMiddleware(async (to) => {
  if (process.server) {
    const event = useRequestEvent();
    if (!event) return navigateTo('/login');
    const authCookie = getCookie(event, 'auth');
    if (authCookie !== 'true') {
      return navigateTo('/login');
    }
  } else {
    try {
      const data = await $fetch<{ authenticated: boolean }>('/api/auth/status');
      if (!data.authenticated) {
        return navigateTo('/login');
      }
    } catch {
      return navigateTo('/login');
    }
  }
});
