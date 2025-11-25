# Sistema de Persistencia del Test Vocacional

## Cómo Funciona

### Al Iniciar el Test

1. **Usuario hace clic en "Empezar Test"**
   - Se crea un nuevo registro en `test_runs` con `status: "in_progress"`
   - Se obtiene el `run_id` que se usa para toda la sesión

### Durante el Test

2. **Usuario completa cada mundo** (Intereses, Personalidad, etc.)
   - Al completar cada mundo, se guarda automáticamente en `test_answers`
   - Usa `upsert` por `(run_id, section)` para evitar duplicados
   - Si el usuario cierra el navegador y vuelve, puede continuar

### Al Volver

3. **Usuario vuelve a entrar al test**
   - Se busca si tiene un `test_run` con `status: "in_progress"`
   - Si existe, se recuperan todas las respuestas de `test_answers`
   - Se reconstruye el estado: respuestas, mundos completados, badges, XP
   - Se calcula en qué fase debería estar (siguiente mundo no completado)
   - Se muestra directamente esa fase

### Al Completar

4. **Usuario completa el último mundo (Propósito)**
   - Se marca el `test_run` como `status: "completed"`
   - Se guarda el resultado final en `test_results` con el perfil vocacional
   - El usuario ve su resultado final

## Estructura de Base de Datos

### `test_runs`
```sql
- id (uuid, PK)
- user_id (uuid, FK -> usuarios)
- status (text: "in_progress" | "completed")
- started_at (timestamp)
- completed_at (timestamp, nullable)
```

### `test_answers`
```sql
- id (uuid, PK)
- user_id (uuid, FK -> usuarios)
- run_id (uuid, FK -> test_runs)
- section (text: "intereses" | "personalidad" | "valores" | "talentos" | "escenarios" | "proposito")
- answer (jsonb) -- Todas las respuestas del mundo
- created_at (timestamp)
- UNIQUE (run_id, section) -- Evita duplicados
```

### `test_results`
```sql
- id (uuid, PK)
- user_id (uuid, FK -> usuarios)
- run_id (uuid, FK -> test_runs)
- profile_type (text) -- ID del perfil vocacional
- strengths (text) -- Fortalezas separadas por comas
- recommended_careers (text) -- Carreras recomendadas separadas por comas
- score_json (jsonb) -- Datos adicionales del análisis
- created_at (timestamp)
```

## Funciones de Base de Datos

### Funciones de Lectura

- `getActiveTestRun()` - Obtiene la corrida activa del usuario
- `getTestAnswers(runId)` - Obtiene todas las respuestas de una corrida
- `getTestResult(runId)` - Obtiene el resultado final de una corrida

### Funciones de Escritura

- `startTestRun()` - Crea una nueva corrida
- `saveAnswer(runId, section, answer)` - Guarda/actualiza una respuesta
- `completeTestRun(runId)` - Marca la corrida como completada
- `saveFinalResult(runId, profileType, ...)` - Guarda el resultado final

## Flujo de Usuario

```
Usuario entra
    ↓
¿Tiene test en progreso?
    ├── SÍ → Cargar progreso → Continuar desde último mundo
    └── NO → Mostrar bienvenida → Iniciar nuevo test
         ↓
    Completar mundos (auto-save después de cada uno)
         ↓
    Análisis final
         ↓
    Guardar resultado → Marcar como completado
         ↓
    Mostrar perfil vocacional
```

## Migraciones Necesarias

Ejecuta la migración en Supabase:
```bash
supabase db push
```

O manualmente en el SQL Editor de Supabase:
- `supabase/migrations/20251124000000_add_unique_constraint_test_answers.sql`

## Notas Importantes

1. **Unique Constraint**: `test_answers` tiene constraint único en `(run_id, section)` para permitir upsert
2. **Índices**: Se crearon índices para mejorar queries frecuentes
3. **Auto-save**: Cada mundo se guarda automáticamente, no se pierde progreso
4. **Estado Local**: El estado se mantiene en React durante la sesión, pero se sincroniza con BD
5. **Reinicio**: Si el usuario quiere empezar de nuevo, debe completar primero el test actual

## Testing

Para probar el sistema:
1. Inicia el test y completa 1-2 mundos
2. Cierra el navegador
3. Vuelve a entrar - deberías ver tu progreso recuperado
4. Continúa desde donde dejaste
