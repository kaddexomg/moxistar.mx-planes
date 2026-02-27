# moxistar.mx-planes

Portal Movistar México enfocado en contratación de **planes**, **equipos**, **recargas** y **portabilidad**, con estética tipo iOS/macOS (glassmorphism, fondos difuminados y animaciones fluidas).

## Estructura
- `index.html`: layout principal y secciones funcionales.
- `styles.css`: estilos avanzados, fondos difuminados animados, responsive UI.
- `netcure.js`: utilidades de sanitización, intención y formato (`NetCure.js`).
- `app.js`: lógica de navegación, filtros, formularios y asistente IA frontend.
- `backend/python/app.py`: API Flask (planes, recomendación y asistente).
- `backend/java/src/main/java/com/moxistar/PlanQualityController.java`: endpoints Spring para score y validación de recarga.

## Funcionalidades incluidas
- Navegación por secciones de negocio real de Movistar.
- Contratación simulada de planes y flujo para portabilidad.
- Catálogo de equipos con filtro por marca.
- Recargas con validaciones front.
- Asistente IA para consultas de servicios.

## Ejecutar frontend
Abre `index.html` o sirve el sitio:
```bash
python -m http.server 8000
```

## Ejecutar backend Python
```bash
pip install flask
python backend/python/app.py
```

## Java (Spring)
Integrar `PlanQualityController` dentro de tu proyecto Spring Boot y exponer rutas `/api/quality-score` y `/api/recharge/validate`.
