// server/api/login.post.ts
import { z } from 'zod';
import { setCookie } from 'h3';
import { scryptSync, timingSafeEqual } from 'node:crypto';

const bodySchema = z.object({
  password: z.string().min(1),
});

const config = useRuntimeConfig();
const STORED_HASH = Buffer.from(config.authHash, 'hex');
const SALT = config.authSalt;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = bodySchema.safeParse(body);

  if (!result.success) {
    throw createError({ statusCode: 400, message: 'Неверный формат запроса' });
  }

  const { password } = result.data;

  // Вычисляем хеш от введённого пароля и сравниваем с эталонным
  const inputHash = scryptSync(password, SALT, 64);
  const isValid = timingSafeEqual(inputHash, STORED_HASH);

  if (!isValid) {
    throw createError({ statusCode: 401, message: 'Неверный пароль' });
  }

  // Устанавливаем httpOnly куку
  setCookie(event, 'auth', 'true', {
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  return { success: true };
});
