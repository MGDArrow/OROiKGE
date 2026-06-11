# Dockerfile
FROM node:24-alpine AS builder

WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./
RUN npm ci

# Копируем исходный код и собираем приложение
COPY . .
RUN npm run generate

# Финальный образ
# FROM node:24-alpine

# WORKDIR /app

# # Копируем только необходимые файлы из стадии builder
# COPY --from=builder /app/.output ./.output
# # COPY --from=builder /app/node_modules ./node_modules
# # COPY --from=builder /app/package.json ./package.json

# # Указываем переменные окружения
# ENV NUXT_HOST=0.0.0.0
# ENV NUXT_PORT=3000

# EXPOSE 3000

# CMD ["node", ".output/server/index.mjs"]


FROM nginx:alpine

# Копируем сгенерированную статику из builder'а
COPY --from=builder /app/dist /usr/share/nginx/html

# (Опционально) Копируем свой конфиг nginx, если нужно.
# По умолчанию nginx на alpine слушает порт 80 и отдаёт /usr/share/nginx/html
# Если вам нужен порт 3000 — измените конфиг или пробросьте порты при запуске.
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

# Nginx сам запускается в режиме foreground, команда CMD уже задана в образе.