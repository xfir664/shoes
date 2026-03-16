# 🧠 TECH & PRODUCT DESIGN SPEC v3

## Интернет-магазин обуви (Nuxt 4)

---

# 🎯 Цель

Разработать современный интернет-магазин обуви уровня коммерческого production продукта.

Основные задачи:

* максимально быстрый выбор товара
* высокая конверсия в покупку
* удобство на мобильных
* минималистичный корпоративный премиальный стиль

Сайт должен ощущаться **как брендовый ecommerce**, а не шаблон.

---

# 👥 Целевая аудитория

* возраст 16+
* mobile first аудитория
* средний ценовой сегмент
* быстрые импульсные покупки
* важны акции и популярные товары

---

# ⚙️ Технологии

* Nuxt 4
* script setup
* Composition API
* TypeScript
* SSR / Hybrid rendering
* Nuxt Icon
* Swiper (галерея)
* Pinia (cart state)
* SCSS modules или Tailwind

---

# 🧱 Архитектура проекта

app/

layouts/

* default.vue

pages/

* index.vue
* catalog/index.vue
* catalog/[slug].vue
* delivery.vue
* contacts.vue
* promotions.vue
* cart.vue

components/

ui/

* UiButton
* UiInput
* UiSelect
* UiCheckbox
* UiBadge
* UiModal
* UiTabs
* UiDrawer
* UiSkeleton
* UiPagination
* UiToast

product/

* ProductCard
* ProductGallery
* ProductSizes
* ProductInfo
* ProductSimilar

catalog/

* CatalogFilters
* CatalogSort
* CatalogGrid

layout/

* Header
* Footer
* SearchBar
* ThemeSwitcher

map/

* StoreMap

---

# 🎨 Дизайн система

## Themes

### Dark

bg-primary: #000
bg-secondary: #E8DCCB
accent: #8B6F2A

text: #fff

### Light

bg-primary: #E8DCCB
bg-secondary: #000
accent: #8B6F2A

text: #000

---

# 🔤 Typography

Heading → Roboto
Body → PT Sans

Scale:

* h1 48
* h2 36
* h3 28
* body 16
* small 14

---

# 🧩 UI KIT

## Button

Variants:

* primary (gold)
* secondary (outline)
* ghost

States:

* hover → slight scale + color deepen
* active → scale down
* loading → spinner
* disabled → opacity 0.4

Sizes:

* sm
* md
* lg

---

## Input

* rounded
* focus ring gold
* placeholder fade

---

## Product Card

Contains:

* image
* name
* price
* quick add button
* hover reveal overlay

Hover:

* image zoom 1.05
* shadow elevation

---

## Badge

* sale
* new
* popular

---

## Modal

* backdrop blur
* scale in animation

---

## Drawer

* mobile filters
* slide from right

---

## Tabs

* underline gold
* animated switch

---

## Skeleton

* shimmer animation

---

# 🧭 Layout

## Header

Sticky.

Contains:

* logo
* nav
* search
* phone
* cart icon badge

On scroll:

* background blur
* shrink height

---

## Footer

* navigation
* delivery link
* phone
* copyright
* theme switch

---

# 🏠 Главная

## Hero

* big lifestyle shoe image
* headline
* subtitle
* CTA catalog
* CTA promotions

---

## Categories Grid

8 cards

hover → overlay + CTA

---

## Promotions slider

---

## Popular products slider

---

## Store Map block

---

# 📦 Каталог

Desktop:

* left filters sidebar
* right grid

Mobile:

* filters button → drawer

---

## Filters

* availability
* category
* gender
* lining material
* insole material
* composition
* color
* size
* season
* price range slider

---

## Sort

Dropdown.

---

## Grid

4 / 3 / 2 columns.

---

## Pagination

numbers + next.

---

# 👟 Product Page

Layout split.

Left:

* big image
* thumbnails swiper

Right:

* title
* price
* color select
* size grid

Unavailable:

* disabled
* diagonal strike

---

## Size table

Modal.

---

## Add to cart

Sticky on mobile.

---

## Tabs block

* description
* characteristics
* delivery

---

## Similar products

Based on category.

---

# 🛒 Cart Page

List items.

Each item:

* image
* title
* size
* quantity stepper
* remove

If same product different size → separate rows.

---

## Summary

* total price
* checkout CTA

---

# 🎁 Promotions

Grid image cards.

---

# 📞 Contacts

* phones
* address
* map embed

---

# 🚚 Delivery

* conditions
* сроки
* стоимость

---

# ✨ UX Requirements

* lazy loading images
* skeleton loaders
* toast on add cart
* hover feedback
* smooth transitions 200ms
* scroll animations
* empty states
* error states
* loading states

---

# 📱 Mobile UX

* sticky add to cart
* swipe gallery
* bottom safe padding
* big tap areas
* drawer filters

---

# 🧠 Commerce Logic

Cart composable:

* add
* remove
* update qty
* total

Filters composable:

* reactive filtering
* query sync

---

# 🔎 SEO

* dynamic meta
* product schema
* breadcrumbs

---

# 🚀 Optional Advanced

* wishlist
* recently viewed
* fake API mock
* theme persistence
* route transitions
* page preload
