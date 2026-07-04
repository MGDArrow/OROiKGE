<template>
  <div class="login-page">
    <h2>Вход в систему</h2>
    <form @submit.prevent="handleSubmit" class="login-form">
      <UIInput
        v-model="password"
        label="Пароль"
        placeholder="Введите пароль"
        required
      />
      <UIButton type="submit" :loading="loading"> Войти </UIButton>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
  const { loading, login } = useAuth();

  definePageMeta({
    middleware: 'guest',
  });

  const password = ref('');
  const errorMessage = ref<string | null>(null);

  async function handleSubmit() {
    errorMessage.value = null;
    try {
      await login(password.value);
      await navigateTo('/admin');
    } catch (err: any) {
      if (err.statusCode === 401) {
        errorMessage.value = 'Неверный пароль. Попробуйте снова.';
      } else {
        errorMessage.value = err.message || 'Произошла ошибка при входе';
      }
    }
  }
</script>

<style scoped lang="scss">
  .login-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 40vh;
    padding: 6px;
    h2 {
      margin-bottom: 6px;
      color: var(--accent);
      text-transform: uppercase;
    }
    .login-form {
      width: 100%;
      max-width: 400px;
      .error-message {
        margin-top: 10px;
        padding: 2px 10px;
        color: var(--color-error-500);
        font-size: var(--font-size-sm);
        text-align: center;
        background: var(--color-error-100);
        border: 1px solid var(--color-border-error);
        border-radius: var(--radius-md);
      }
      :deep(.ui-button) {
        margin-top: 10px;
      }
    }
  }

  @media (width <= 768px) {
    .login-page {
      padding: var(--space-4);
      .login-form {
        max-width: 100%;
      }
    }
  }
</style>
