# 🎤 Migrar sin contexto: CRA → Next.js con IA

## Cómo usé inteligencia artificial para avanzar en una migración que ya había comenzado

---

## 👋 Introducción

- Me integré a mitad de una migración.
- No tomé decisiones de arquitectura.
- No conocía el código legacy.
- Herramientas: **ChatGPT** y **GitHub Copilot**.
- Esta es mi experiencia usando IA para sobrevivir (y acelerar).

---

## 🧭 Dónde entré yo

- App legacy: **Create React App + Sass + JavaScript**.
- Nuevo stack: **Next.js + Tailwind + TypeScript**.
- Las decisiones ya estaban tomadas.
- El código legacy era completamente desconocido para mí.
- Tuve que aprender y producir al mismo tiempo.

---

## 🔥 Mi reto real

- Entender arquitectura sobre la marcha.
- Migrar sin romper lo ya hecho.
- Navegar una base de código sin documentación.
- Replicar visuales desde la app legacy (no había Figma).
- Reestructurar componentes con lógica mezclada.

---

## 🤖 Cómo me ayudó la IA (de verdad)

- **Modo agente de ChatGPT**: acceso completo al repo, podía responder con contexto real.
- Subía **capturas de pantalla** ➝ me organizaba jerarquía + nombres de componentes.
- Extraía textos automáticamente para `i18n`.
- Refactor y tipado asistido (de JS a TS).
- Generación y mejora de tests.
- Explicaciones de código legacy: "¿qué hace esto?".

---

## ✅ Lo que me funcionó bien

- GPT me ayudó a nombrar y estructurar componentes más rápido de lo normal.
- Pude internacionalizar sin perder tiempo recorriendo manualmente todos los textos.
- Refactor de componentes grandes con muchos props.
- Migración efectiva de `utils` y `helpers` sin dependencias pesadas.
- Generación de tests que ayudaron a subir el coverage.

💡 _Avancé sin bloquearme ni depender 100% del equipo._

---

## ⚠️ Lo que no repetiría

- Copiar y pegar componentes completos desde el legacy sin entender sus dependencias.
- Migrar código con 10 imports cruzados sin analizar qué se usa.
- Esperar demasiado por un output perfecto del agente.
- Dejar que Copilot repita mocks en cada test sin estructura.

---

## 📈 Curva de aprendizaje usando IA

| Semana | Velocidad | Confianza  | IA como... |
| ------ | --------- | ---------- | ---------- |
| 1      | Baja      | Incierta   | Explorador |
| 3      | Media     | Clara      | Compañero  |
| 5+     | Alta      | Automática | Acelerador |

💡 _Una vez le agarras el ritmo, la IA te hace volar._

---

## ⚡ Impacto real en productividad

Pasé de hacer 1–2 tareas por día a 5–8 con IA bien utilizada.

| Tarea                    | IA ayudó |
| ------------------------ | -------- |
| Nombrar y estructurar UI | ✅       |
| Tipar componentes        | ✅       |
| Traducir estilos Sass    | ⚠️       |
| Refactor de helpers      | ✅       |
| Generar tests            | ✅       |

---

## 🔍 Dónde la IA brilla y dónde no tanto

| IA brilla en...            | No tanto en...                         |
| -------------------------- | -------------------------------------- |
| Refactorizar código simple | Diseñar desde cero sin referencia      |
| Nombrar componentes        | Migrar lógica con side effects ocultos |
| Traducir JS ➝ TS           | Sass con lógica condicional compleja   |
| Explicar código viejo      | UX sin diseño claro                    |
| Generar tests simples      | Validación de estados complicados      |

---

## 🧠 Mi forma de trabajar con IA

- Darle **tiempos límite** por intento (10–15 min).
- Si no produce algo funcional ➝ sigo manual y vuelvo luego.
- Reutilizar prompts que me funcionaron.
- Documentar respuestas útiles de GPT.
- Usar IA como **pair programmer**, no como generador automático.

---

## 🧪 Sobre los tests generados por IA

✅ Aumentan el **code coverage**.  
😅 Pero no siempre validan bien el comportamiento real.  
⚠️ Copilot tiende a **repetir mocks** en cada test → mejora pendiente.

💡 _Un test útil valida lo importante, no solo ejecuta código._

---

## 🧪 Cómo medir si un test generado vale la pena

| Criterio                 | ¿Está cumplido? |
| ------------------------ | --------------- |
| Asserts claros y útiles  | ✅ / ❌         |
| Cubre casos límite       | ✅ / ❌         |
| Reutiliza mocks          | ✅ / ❌         |
| Nombres descriptivos     | ✅ / ❌         |
| Falla si hay un bug real | ✅ / ❌         |

---

## 🔬 Técnicas que estoy explorando

- **Modo agente con ambos proyectos abiertos** (legacy y nuevo).
- Pedir a GPT que migre un componente con todo el contexto.
- Delegar sugerencias en PRs.
- Generar la estructura inicial de una pantalla completa desde una captura.

---

## 🧠 Lecciones que me llevo

- La IA acelera, pero no decide por ti.
- Si en 10–15 min no te ayuda, avanza y vuelve después.
- Migrar sin entender = migrar mal.
- Avanzar funcional > esperar la solución perfecta.
- Entender primero, optimizar después.

---

## 💡 ¿Qué podríamos hacer como equipo?

- Crear una **librería interna de prompts útiles**.
- Usar capturas para diseñar estructuras de pantalla colaborativamente.
- Aprovechar el **modo agente** para debugging cruzado.
- Establecer estructuras de mocks y tests reutilizables.
- Usar IA de forma **estratégica, no solo puntual**.

---

## 💬 Q&A y espacio abierto

- ¿Cómo usan ustedes la IA en sus flujos?
- ¿Qué técnicas o prompts les han funcionado?
- ¿Qué podemos probar juntos como equipo?

---

## 📎 Recursos y extras

- Prompt templates útiles
- Cheatsheet de migración CRA → Next.js
- Ejemplos antes/después (si se pueden compartir)
- Mi contacto (Slack, GitHub, etc.)

---
