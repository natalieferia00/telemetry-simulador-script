# Simulador de Telemetría GPS

Este proyecto es un pequeño simulador en Node.js que envía datos de posición GPS a una API REST en tiempo real.

## ¿Qué hace?

El script:

- define tres vehículos de ejemplo,
- genera coordenadas GPS aleatorias dentro de un rango pequeño,
- envía cada actualización mediante una petición `POST` a la API,
- repite el envío cada 10 segundos,
- alterna el estado de movimiento/parada de forma aleatoria para simular tráfico o vehículos detenidos.

## Requisitos

- Node.js 18 o superior
- Una API disponible en:

  `http://localhost:5136/api/gps`

## Estructura del proyecto

- `simulator.js`: script principal que genera y envía los datos.

## Cómo ejecutarlo

1. Abre una terminal en la raíz del proyecto.
2. Ejecuta:

```bash
node simulator.js
```

3. El simulador comenzará a enviar datos automáticamente.

## Formato de datos enviado

Cada vehículo envía un payload con esta forma:

```json
{
  "VehicleId": "VH-001",
  "Lat": 4.609700,
  "Lng": -74.081700,
  "Timestamp": "2026-07-10T12:00:00.000Z"
}
```

## Personalización

Puedes modificar estas partes en `simulator.js`:

- `API_URL`: dirección de la API receptora.
- `vehicles`: lista de vehículos simulados, con su posición inicial, velocidad y estado.
- `setInterval(...)`: intervalo de envío en milisegundos.

## Salida esperada

La consola mostrará mensajes como:

```text
🛰️  Simulador de Telemetría GPS iniciado...
[🚀 ENVIADO] VH-001 -> Lat: 4.609700, Lng: -74.081700 | Timestamp: ...
```

## Nota

Este simulador está pensado para pruebas locales o de desarrollo con una API REST que reciba el endpoint indicado.
