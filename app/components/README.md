# components/

Vue-компоненты приложения. Nuxt автоматически импортирует все компоненты — явный import не нужен.

## Структура

```
components/
  UI/          # Переиспользуемые UI-компоненты (12 шт.)
  Layout/      # Шаблонные компоненты (AppHeader, AppFooter)
  State/       # Компоненты состояний (Loading, Error, Empty)
```

## Конвенции

- UI-компоненты: `MyName` (префикс `My`), папка `UI/MyName/MyName.vue` + `_config.scss`
- Layout-компоненты: `AppName` (префикс `App`), папка `Layout/`
- State-компоненты: `AppName`, папка `State/`
- Стили: `<style scoped lang="scss">`, BEM-классы
- Варианты: prop `variant` + SCSS map в `_config.scss`, генерация через `@each`

## Использование

```vue
<template>
  <MyBtn variant="primary" type="button" @click="handleClick">
    Кнопка
  </MyBtn>
  <AppLoading variant="spinner" />
</template>
```

Подробнее о каждой группе — в README внутри UI/, Layout/, State/.
