# UI/

12 переиспользуемых UI-компонентов с системой вариантов.

## Компоненты

| Компонент | Назначение | Ключевые пропсы |
|-----------|-----------|-----------------|
| MyBtn | Кнопка | type!, variant?, disabled? |
| MyInput | Текстовое поле | v-model, type?, variant? |
| MySearch | Поле поиска | variant?, disabled? |
| MySelect | Выпадающий список | variant?, disabled? |
| MySelectOption | Опция для MySelect | variant? |
| MyCheckboxInput | Чекбокс | checked?, variant? |
| MyRadioInput | Радиокнопка | variant?, disabled? |
| MyFileInput | Загрузка файла | variant?, disabled? |
| MyIcon | SVG-иконка из спрайта | id?, href?, variant? |
| MyLink | Внешняя ссылка | href?, target?, variant? |
| MyNavLink | Навигационная ссылка (NuxtLink) | to?, variant? |
| MyPagination | Пагинация | variant?, disabled? |

Все компоненты поддерживают варианты: `base`, `primary`, `secondary`.

## Архитектура

Каждый компонент — папка с двумя файлами:

```
UI/MyBtn/
  MyBtn.vue          # Vue SFC
  _btn.config.scss   # SCSS map вариантов
```

### Как работают варианты

1. `_config.scss` содержит SCSS map с цветами, размерами для каждого варианта
2. В `<style scoped>` — `@each` цикл по map + миксины генерируют классы
3. Prop `variant` добавляет CSS-класс `component--variant`

### Добавление нового варианта

1. Добавь ключ в SCSS map `_config.scss`
2. Добавь значение в union type prop `variant`
3. Класс сгенерируется автоматически

## Использование

```vue
<MyBtn variant="primary" type="button" @click="save">Сохранить</MyBtn>
<MyInput v-model="email" variant="base" placeholder="Email" />
<MyCheckboxInput :checked="agreed" variant="primary" @change="agreed = $event" />
```
