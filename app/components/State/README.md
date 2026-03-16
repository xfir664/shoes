# State/

Компоненты для отображения состояний: загрузка, ошибка, пустые данные.

## Компоненты

### AppLoading

Индикатор загрузки с тремя вариантами отображения.

| Проп | Тип | По умолчанию | Описание |
|------|-----|-------------|----------|
| variant | "spinner" \| "skeleton" \| "dots" | "spinner" | Вид индикатора |
| size | number | 32 | Размер в px |

```vue
<AppLoading />
<AppLoading variant="skeleton" />
<AppLoading variant="dots" :size="24" />
```

### AppError

Блок ошибки с возможностью повтора.

| Проп | Тип | Описание |
|------|-----|----------|
| title | string (!) | Заголовок ошибки |
| message | string | Подробности |
| retryable | boolean | Показать кнопку "Повторить" |

Emit: `retry` — срабатывает при клике на "Повторить".

```vue
<AppError title="Ошибка загрузки" message="Сервер недоступен" retryable @retry="fetchData" />
```

### AppEmpty

Заглушка для пустых состояний.

| Проп | Тип | Описание |
|------|-----|----------|
| title | string (!) | Заголовок |
| message | string | Подробности |
| icon | string | CSS-класс иконки (MDI) |

```vue
<AppEmpty title="Нет данных" message="Попробуйте изменить фильтры" icon="mdi mdi-database-off" />
```

## Паттерн использования

```vue
<AppLoading v-if="pending" />
<AppError v-else-if="error" :title="error.message" retryable @retry="refresh" />
<AppEmpty v-else-if="!data.length" title="Список пуст" />
<div v-else>
  <!-- Контент -->
</div>
```
