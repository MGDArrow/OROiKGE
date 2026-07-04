export default defineEventHandler((event) => {
  const authCookie = getCookie(event, 'auth');
  return {
    authenticated: authCookie === 'true',
  };
});
