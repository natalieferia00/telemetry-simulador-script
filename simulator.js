
const API_URL = 'http://localhost:5136/api/gps';

const vehicles = [
    { id: 'VH-001', lat: 4.6097, lng: -74.0817, speed: 0.0005, isStopped: false },
    { id: 'VH-002', lat: 4.6584, lng: -74.0936, speed: 0.0003, isStopped: false },
    { id: 'VH-003', lat: 4.7110, lng: -74.0721, speed: 0.0000, isStopped: true }
];

async function sendGpsData(vehicle) {
    if (!vehicle.isStopped) {
        vehicle.lat += (Math.random() - 0.5) * vehicle.speed;
        vehicle.lng += (Math.random() - 0.5) * vehicle.speed;
    }

   
    const payload = {
        VehicleId: vehicle.id,
        Lat: parseFloat(vehicle.lat.toFixed(6)),
        Lng: parseFloat(vehicle.lng.toFixed(6)),
        Timestamp: new Date().toISOString() 
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log(`[🚀 ENVIADO] ${vehicle.id} -> Lat: ${payload.Lat}, Lng: ${payload.Lng} | Timestamp: ${payload.Timestamp} (Status: ${response.status})`);
        } else {
            console.error(`[❌ ERROR API] ${vehicle.id} -> Estado ${response.status}. Revisa la consola de Rider.`);
        }
    } catch (error) {
        console.error(`[🚨 ERROR] No se pudo conectar a la API:`, error.message);
    }
}

console.log('🛰️  Simulador de Telemetría GPS iniciado...');
console.log(`Enviando datos en tiempo real a: ${API_URL}\n`);


vehicles.forEach(sendGpsData);

setInterval(() => {
    vehicles.forEach(v => {
        if (Math.random() < 0.10) {
            v.isStopped = !v.isStopped;
        }
        sendGpsData(v);
    });
}, 10000);