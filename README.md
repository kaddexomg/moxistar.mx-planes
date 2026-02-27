# moxistar.mx-planes

Landing modernizada con estética tipo iOS/macOS, animaciones suaves y lógica de recomendación inteligente en frontend.

## Stack incluido
- **Frontend:** HTML + CSS moderno (glassmorphism, gradientes, micro-interacciones) + JavaScript para recomendaciones dinámicas.
- **Python (`backend/python/app.py`):** endpoint Flask para recomendar plan por consumo.
- **Java (`backend/java/src/main/java/com/moxistar/PlanQualityController.java`):** endpoint Spring para score de calidad/fiabilidad.

## Ejecutar frontend
Abre `index.html` en tu navegador.

## Ejecutar backend Python
```bash
pip install flask
python backend/python/app.py
```

## Backend Java
Integrar `PlanQualityController` dentro de un proyecto Spring Boot existente.
