# Dockerfile для Nuxt продакшена
FROM node:22-alpine

# Установка pnpm
RUN npm install -g pnpm

# Рабочая директория
WORKDIR /app

# Копируем файлы зависимостей
COPY package.json ./

# Устанавливаем зависимости
RUN pnpm install

# Копируем исходный код
COPY . .

# Собираем приложение для продакшена
RUN pnpm run build

# Команда для продакшена
CMD ["pnpm", "run", "start"]
