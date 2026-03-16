---
name: ui-ux-design
description: Визуальное качество интерфейса — цвета, отступы, скругления, состояния, типографика, доступность. Используй когда нужно улучшить внешний вид компонентов, создать визуально привлекательный UI, проверить доступность или консистентность дизайна.
---

# UI/UX дизайн

Скил для визуальной полировки компонентов. Отвечает за **внешний вид**, а не архитектуру токенов (за это отвечает скил `design-system`).

## Цветовая палитра вариантов

| Вариант | Роль | Текст | Фон | Граница |
|---------|------|-------|-----|---------|
| base | Нейтральное действие | `--c-base-text` | `--c-base-bg` | нет или `transparent` |
| primary | Основное действие (CTA) | `--c-primary-text` (белый) | `--c-primary` | нет |
| secondary | Вторичное / outline | `--c-primary` | `transparent` | `1px solid --c-primary` |

Контраст текст / фон — минимум **4.5:1** (WCAG AA).

## Отступы

Все интерактивные элементы **обязаны** иметь padding:

| Элемент | Padding |
|---------|---------|
| Кнопка | `var(--spacing-sm) var(--spacing-md)` (8px 16px) |
| Инпут, селект, поиск | `var(--spacing-sm) var(--spacing-md)` (8px 16px) |
| Ссылка, навлинк | `var(--spacing-xs) var(--spacing-sm)` (4px 8px) |
| Пагинация | `var(--spacing-xs) var(--spacing-sm)` (4px 8px) |

Min touch-target на мобильных — **44×44px** (`min-height: var(--component-height-md)`).

## Скругления

| Элемент | Радиус |
|---------|--------|
| Кнопка, инпут, селект, поиск | `var(--radius-md)` (8px) |
| Ссылка, навлинк, пагинация | `var(--radius-sm)` (4px) |
| Checkbox | `var(--radius-sm)` (4px) |
| Radio | `50%` |
| Карточка, dropdown | `var(--radius-md)` (8px) |

## Состояния

Каждый интерактивный элемент **обязан** иметь:

| Состояние | Визуал |
|-----------|--------|
| hover | Фон на 1 ступень темнее |
| focus-visible | `outline: none` + `box-shadow: 0 0 0 3px var(--c-focus-ring)` |
| active | Фон на 2 ступени темнее |
| disabled | `opacity: 0.5` + `cursor: not-allowed` |

Focus ring — всегда через `box-shadow`, не `outline`.

## Типографическая иерархия

| Уровень | Desktop | Weight | Когда использовать |
|---------|---------|--------|--------------------|
| title | 24–33px | 700 | Заголовки секций, H1–H2 |
| subtitle | 18–23px | 600 | Подзаголовки, H3–H4 |
| text | 14–16px | 400 | Основной текст, параграфы |

Разные уровни **обязаны** визуально отличаться размером и весом.

## Формы

### Инпуты

- `border: 1px solid var(--c-border)` в дефолте
- Focus: `border-color: var(--c-primary)` + focus ring
- `min-height: var(--component-height-md)` (40px)

### Checkbox

- `appearance: none`, `border: 2px solid var(--c-border)`, `border-radius: var(--radius-sm)`
- Checked: `bg = var(--c-primary)`, `border-color = var(--c-primary)`, галочка через `::before`

### Radio

- `appearance: none`, `border: 2px solid var(--c-border)`, `border-radius: 50%`
- Checked: `border-color = var(--c-primary)`, точка через `::before` с `var(--c-primary)`

## Консистентность

1. Все кнопки одного варианта — одной высоты
2. Все инпуты — одной высоты
3. Один размер шрифта для всех вариантов одного компонента (варианты меняют цвет, не размер)
4. Между секциями одинаковые отступы

## Чеклист

- [ ] Padding задан (не 0)
- [ ] Border-radius задан
- [ ] Все состояния работают (hover, focus, active, disabled)
- [ ] Focus ring виден на клавиатурной навигации
- [ ] Disabled визуально отличим
- [ ] Варианты визуально различимы между собой
- [ ] Контраст текст/фон >= 4.5:1
- [ ] Цвета из токенов, не хардкод
- [ ] Тёмная тема учтена
