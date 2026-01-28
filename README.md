# ConectaPro IA — Sitio Web (HTML/CSS/JS)

Este ZIP contiene un sitio web estático (sin frameworks) para **ConectaPro IA**, diseñado para:
- Dar confianza y contexto (sin sobreprometer)
- Explicar el problema y la solución
- Informar el **estado real del proyecto** (pruebas controladas en Biobío)
- Indicar cobertura inicial y un contacto

## Estructura

- `index.html` — Landing principal (semántica y accesible)
- `css/styles.css` — Estilos (mobile-first, responsive)
- `js/main.js` — JS mínimo (menú móvil + año en footer)
- `assets/` — Logo y favicon livianos (SVG)
- `.htaccess` — Reglas básicas de seguridad para Apache (opcional)

## Cómo desplegar (hosting estático)

Opción A: hosting / servidor estático
1. Sube el contenido del ZIP tal cual (mantener carpetas).
2. Asegúrate de que `index.html` quede en la raíz pública.

Opción B: GitHub Pages
1. Crea un repo (por ejemplo `conectaproia-website`).
2. Sube el contenido del ZIP.
3. Settings → Pages → Branch (root).
4. Espera la URL pública.

Opción C: Netlify / Cloudflare Pages
1. Sube la carpeta del sitio.
2. Build command: (vacío)
3. Publish directory: `/`

## Cómo escalar en el futuro (sin romper lo actual)

- Agregar `/privacidad.html` y `/terminos.html` (cuando corresponda).
- Agregar “waitlist” real cuando exista un proceso interno para manejarlo.
- Agregar mapa de cobertura cuando sea necesario.
- Agregar página de “Actualizaciones” para transparencia (útil en fase temprana).

## Notas de integridad (importante)

Este sitio evita:
- Prometer funcionalidades no existentes
- Testimonios falsos
- Mensajes marketineros agresivos
- Precios o ventas

Está alineado con un producto en pruebas controladas.
