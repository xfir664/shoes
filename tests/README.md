# Тесты Nuxt-Template

---
**ОБНОВЛЕНО:** 2025-12-18

---

## 📁 Структура

```
tests/
├── logs/                    # Логи тестирования
│   ├── DD-MM-YYYY_HH-MM-SS/ # Результаты каждого запуска
│   ├── log_history.md       # История всех тестов
│   └── README.md            # Документация логов
├── test_unit_*.py           # Unit тесты
├── test_integration_*.py    # Интеграционные тесты
├── test_load_*.py           # Нагрузочные тесты
├── resource_monitor.py      # Мониторинг ресурсов
├── conftest.py              # Pytest конфиг
└── README.md                # Этот файл
```

---

## 🚀 Запуск

### Один тест

```bash
python tests/test_unit_main.py
```

### Все тесты

```bash
pytest tests/ -v
```

### С мониторингом ресурсов

```bash
python tests/test_load_performance.py
# Результаты: tests/logs/
```

---

## 📋 Тесты

| Файл | Тип | Описание |
|------|-----|----------|
| `test_unit_main.py` | Unit | Основные функции |
| `test_integration_api.py` | Integration | API endpoints |
| `test_load_performance.py` | Load | Производительность |

---

## 📊 Логи

После запуска тестов с мониторингом:

```bash
# Посмотреть последний отчет
cat tests/logs/$(ls -t tests/logs/ | head -1)/result.md

# История всех тестов
cat tests/logs/log_history.md
```

---

## СМ. ТАКЖЕ

- **Правила:** `agent-docs/rules/testing/testing-rules.md`
- **Пример:** `services/sisyich-coder/tests/`

