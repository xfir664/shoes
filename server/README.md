# server/ - Серверная часть приложения (Nitro)

Папка `server/` содержит серверную часть Nuxt приложения, работающую на **Nitro** - универсальном JavaScript сервере.

## 📁 Структура папки

```
server/
├── api/              # API endpoints (RESTful API)
└── middleware/       # Серверные middleware
```

## 🎯 Назначение папки

### 1. **API Endpoints**
Создание backend API для взаимодействия с базами данных, внешними сервисами и бизнес-логикой.

### 2. **Server-side логика**
Выполнение кода на сервере:
- Работа с базами данных
- Аутентификация и авторизация
- Обработка форм
- Проксирование запросов

### 3. **Middleware**
Обработка запросов перед их выполнением:
- Логирование
- CORS
- Проверка токенов
- Rate limiting

### 4. **Full-stack возможности**
Nuxt + Nitro = полноценный full-stack фреймворк без необходимости отдельного backend сервера.

## 🔧 API Endpoints (server/api/)

### Создание API endpoint

#### Простой GET endpoint

```typescript
// server/api/hello.ts
export default defineEventHandler((event) => {
  return {
    message: 'Hello World!',
    timestamp: Date.now()
  };
});
```

**Доступ:** `GET /api/hello`

**Использование в компонентах:**
```vue
<script setup lang="ts">
const { data } = await useFetch('/api/hello');
console.log(data.value); // { message: 'Hello World!', timestamp: ... }
</script>
```

#### POST endpoint с телом запроса

```typescript
// server/api/users.post.ts
export default defineEventHandler(async (event) => {
  // Чтение тела запроса
  const body = await readBody(event);
  
  // Валидация
  if (!body.name || !body.email) {
    throw createError({
      statusCode: 400,
      message: 'Name and email are required'
    });
  }
  
  // Сохранение в БД (пример)
  // const user = await db.users.create(body);
  
  return {
    success: true,
    user: body
  };
});
```

**Доступ:** `POST /api/users`

**Использование:**
```typescript
const { data } = await $fetch('/api/users', {
  method: 'POST',
  body: {
    name: 'John',
    email: 'john@example.com'
  }
});
```

#### Динамические маршруты

```typescript
// server/api/users/[id].get.ts
export default defineEventHandler(async (event) => {
  // Получаем параметр из URL
  const id = getRouterParam(event, 'id');
  
  // Загрузка из БД
  // const user = await db.users.findById(id);
  
  if (!id) {
    throw createError({
      statusCode: 404,
      message: 'User not found'
    });
  }
  
  return {
    id,
    name: 'John Doe',
    email: 'john@example.com'
  };
});
```

**Доступ:** `GET /api/users/123`

#### Обработка всех HTTP методов

```typescript
// server/api/posts/[id].ts
export default defineEventHandler(async (event) => {
  const method = event.method;
  const id = getRouterParam(event, 'id');
  
  switch (method) {
    case 'GET':
      // Получить пост
      return await getPost(id);
      
    case 'PUT':
      // Обновить пост
      const body = await readBody(event);
      return await updatePost(id, body);
      
    case 'DELETE':
      // Удалить пост
      return await deletePost(id);
      
    default:
      throw createError({
        statusCode: 405,
        message: 'Method not allowed'
      });
  }
});
```

### Работа с query параметрами

```typescript
// server/api/search.get.ts
export default defineEventHandler((event) => {
  const query = getQuery(event);
  
  // GET /api/search?q=nuxt&page=1
  const searchTerm = query.q as string;
  const page = parseInt(query.page as string) || 1;
  
  return {
    query: searchTerm,
    page,
    results: []
  };
});
```

### Работа с cookies

```typescript
// server/api/auth/login.post.ts
export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  
  // Проверка credentials
  const token = await authenticateUser(email, password);
  
  // Установка cookie
  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7 // 7 дней
  });
  
  return { success: true };
});
```

Чтение cookie:
```typescript
// server/api/auth/me.get.ts
export default defineEventHandler((event) => {
  const token = getCookie(event, 'auth_token');
  
  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    });
  }
  
  return { user: decodeToken(token) };
});
```

### Работа с headers

```typescript
// server/api/data.get.ts
export default defineEventHandler((event) => {
  // Чтение headers
  const userAgent = getHeader(event, 'user-agent');
  const authToken = getHeader(event, 'authorization');
  
  // Установка headers
  setHeader(event, 'X-Custom-Header', 'value');
  
  return { userAgent };
});
```

## 🛡️ Server Middleware (server/middleware/)

Middleware выполняется для каждого запроса перед API handlers.

### Создание middleware

```typescript
// server/middleware/logger.ts
export default defineEventHandler((event) => {
  const startTime = Date.now();
  const method = event.method;
  const url = event.path;
  
  console.log(`→ ${method} ${url}`);
  
  // Продолжаем выполнение
  event.node.req.on('close', () => {
    const duration = Date.now() - startTime;
    console.log(`← ${method} ${url} - ${duration}ms`);
  });
});
```

### CORS middleware

```typescript
// server/middleware/cors.ts
export default defineEventHandler((event) => {
  setHeaders(event, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  
  // Обработка preflight запросов
  if (event.method === 'OPTIONS') {
    return 'OK';
  }
});
```

### Auth middleware

```typescript
// server/middleware/auth.ts
export default defineEventHandler((event) => {
  // Пропускаем публичные роуты
  if (event.path.startsWith('/api/public')) {
    return;
  }
  
  // Проверяем токен
  const token = getCookie(event, 'auth_token') || 
                getHeader(event, 'authorization')?.replace('Bearer ', '');
  
  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'Authentication required'
    });
  }
  
  try {
    // Валидация токена
    const user = verifyToken(token);
    
    // Добавляем пользователя в контекст
    event.context.user = user;
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: 'Invalid token'
    });
  }
});
```

### Rate limiting middleware

```typescript
// server/middleware/rate-limit.ts
const requestCounts = new Map<string, number[]>();

export default defineEventHandler((event) => {
  const ip = event.node.req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 минута
  const maxRequests = 100;
  
  // Получаем историю запросов для IP
  const requests = requestCounts.get(ip) || [];
  
  // Удаляем старые запросы
  const recentRequests = requests.filter(time => now - time < windowMs);
  
  // Проверяем лимит
  if (recentRequests.length >= maxRequests) {
    throw createError({
      statusCode: 429,
      message: 'Too many requests'
    });
  }
  
  // Добавляем текущий запрос
  recentRequests.push(now);
  requestCounts.set(ip, recentRequests);
});
```

## 🗄️ Работа с базами данных

### Redis пример

```typescript
// server/api/cache.get.ts
import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379')
});

export default defineEventHandler(async (event) => {
  const key = getQuery(event).key as string;
  
  // Получаем из кэша
  const cached = await redis.get(key);
  
  if (cached) {
    return { source: 'cache', data: JSON.parse(cached) };
  }
  
  // Загружаем данные
  const data = await fetchDataFromDB();
  
  // Сохраняем в кэш
  await redis.set(key, JSON.stringify(data), 'EX', 3600); // 1 час
  
  return { source: 'database', data };
});
```

### MySQL/MariaDB пример

```typescript
// server/api/users.get.ts
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

export default defineEventHandler(async (event) => {
  const [rows] = await pool.execute('SELECT * FROM users LIMIT 10');
  
  return { users: rows };
});
```

### MongoDB пример

```typescript
// server/api/posts.get.ts
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017');
const db = client.db('myapp');

export default defineEventHandler(async (event) => {
  const posts = await db.collection('posts')
    .find({})
    .limit(10)
    .toArray();
  
  return { posts };
});
```

## 💡 Примеры реальных API

### Форма обратной связи

```typescript
// server/api/contact.post.ts
import nodemailer from 'nodemailer';

export default defineEventHandler(async (event) => {
  const { name, email, message } = await readBody(event);
  
  // Валидация
  if (!name || !email || !message) {
    throw createError({
      statusCode: 400,
      message: 'All fields are required'
    });
  }
  
  // Отправка email
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.CONTACT_EMAIL,
    subject: `Contact form: ${name}`,
    text: `From: ${name} (${email})\n\n${message}`
  });
  
  return { success: true };
});
```

### Загрузка файлов

```typescript
// server/api/upload.post.ts
import { writeFile } from 'fs/promises';
import { join } from 'path';

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);
  
  if (!formData) {
    throw createError({
      statusCode: 400,
      message: 'No file uploaded'
    });
  }
  
  const file = formData.find(item => item.name === 'file');
  
  if (!file || !file.data) {
    throw createError({
      statusCode: 400,
      message: 'File is required'
    });
  }
  
  // Сохранение файла
  const filename = `${Date.now()}-${file.filename}`;
  const filepath = join(process.cwd(), 'uploads', filename);
  
  await writeFile(filepath, file.data);
  
  return {
    success: true,
    filename,
    url: `/uploads/${filename}`
  };
});
```

### Proxy к внешнему API

```typescript
// server/api/proxy/[...path].ts
export default defineEventHandler(async (event) => {
  const path = event.path.replace('/api/proxy', '');
  const query = getQuery(event);
  
  // Проксируем к внешнему API
  const response = await $fetch(`https://api.example.com${path}`, {
    method: event.method,
    query,
    headers: {
      'Authorization': `Bearer ${process.env.EXTERNAL_API_KEY}`
    }
  });
  
  return response;
});
```

## 🎯 Best Practices

### 1. Используйте TypeScript

```typescript
// types/api.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

// server/api/users.get.ts
export default defineEventHandler(async (event): Promise<{ users: User[] }> => {
  const users: User[] = await fetchUsers();
  return { users };
});
```

### 2. Обработка ошибок

```typescript
export default defineEventHandler(async (event) => {
  try {
    const data = await riskyOperation();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    
    throw createError({
      statusCode: 500,
      message: 'Internal server error'
    });
  }
});
```

### 3. Валидация входных данных

```typescript
// Используйте библиотеку валидации (zod, yup, joi)
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  age: z.number().int().min(18).optional()
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  
  // Валидация
  const result = userSchema.safeParse(body);
  
  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: 'Validation error',
      data: result.error.flatten()
    });
  }
  
  // Работа с валидированными данными
  const user = result.data;
  return { user };
});
```

### 4. Разделение логики

```typescript
// server/utils/db.ts
export const getUserById = async (id: number) => {
  // Логика работы с БД
  return await db.users.findById(id);
};

// server/api/users/[id].get.ts
export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '');
  const user = await getUserById(id);
  return { user };
});
```

### 5. Переменные окружения

```typescript
// server/api/config.get.ts
export default defineEventHandler(() => {
  const config = useRuntimeConfig();
  
  // Публичные переменные
  return {
    apiUrl: config.public.apiUrl,
    // Приватные НЕ возвращаем клиенту
    // dbPassword: config.dbPassword ❌
  };
});
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    // Приватные (только на сервере)
    dbPassword: process.env.DB_PASSWORD,
    apiKey: process.env.API_KEY,
    
    // Публичные (доступны и на клиенте)
    public: {
      apiUrl: process.env.PUBLIC_API_URL
    }
  }
});
```

## 🧪 Тестирование API

```typescript
// test/api/users.test.ts
import { describe, it, expect } from 'vitest';
import { setup, $fetch } from '@nuxt/test-utils';

describe('Users API', async () => {
  await setup();
  
  it('should return users list', async () => {
    const response = await $fetch('/api/users');
    
    expect(response).toHaveProperty('users');
    expect(Array.isArray(response.users)).toBe(true);
  });
  
  it('should create user', async () => {
    const response = await $fetch('/api/users', {
      method: 'POST',
      body: {
        name: 'John',
        email: 'john@example.com'
      }
    });
    
    expect(response).toHaveProperty('success', true);
  });
});
```

## 📚 Дополнительные ресурсы

- [Nitro Documentation](https://nitro.unjs.io/)
- [Nuxt Server Routes](https://nuxt.com/docs/guide/directory-structure/server)
- [H3 Event Handlers](https://github.com/unjs/h3)

---

[← Назад к главному README](../README.md)

