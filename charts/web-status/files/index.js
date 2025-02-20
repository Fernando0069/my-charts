const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const app = express();
const PORT = 8080;
const PROTOCOL = "https://";


// Datos de las aplicaciones
const applications = [
	{ label: 'Tools', name: 'Google', statusUrl: 'https://www.google.com', url: 'https://www.google.com' },
	{ label: 'Tools', name: 'CyberChef' },
	{ label: 'Training', name: 'DO180-PHP-HelloWorld' }
];
console.log("Aplicaciones configuradas (1):", applications);


// Ruta para obtener el estado de las aplicaciones
app.get('/status', async (req, res) => {
    const queryDomain = req.query.domain;
    if (queryDomain) {
        cleanDomain = queryDomain; // Sobrescribir con el dominio correcto
        console.log("Dominio actualizado desde frontend:", cleanDomain);
    }

	// Rellenar datos de las aplicaciones
	applications.forEach(app => {
		if (!app.url) {
			const subdomain = app.name.toLowerCase().replace(/\s+/g, '-');
			app.url = `${PROTOCOL}${subdomain}-${cleanDomain}`;
		}
		if (!app.statusUrl) {
			app.statusUrl = app.url;
		}
	});
	console.log("Aplicaciones configuradas (2):", applications);

	const results = await Promise.all(applications.map(app => taskCheckStatus(app)));
	console.log("Enviando datos a la web:", results);
	res.json(results);
});	


// Comprobación de estado de las aplicaciones
const taskCheckStatus = async (app) => {
	return new Promise(resolve => {
		exec(`curl -k -s -o /dev/null -w "%{http_code}" --max-time 5 --connect-timeout 3 -L ${app.statusUrl}`,
			(error, stdout) => {
				console.log(`Respuesta de ${app.statusUrl}: ${stdout}`);
				if (error) {
					console.error(`Error al consultar ${app.name} (${app.statusUrl}): ${error.message}`);
					return resolve({ label: app.label, name: app.name, status: 'KO', message: 'Error de conexión', url: app.url, statusUrl: app.statusUrl });
				}
				const statusCode = parseInt(stdout, 10);
				const status = statusCode === 200 ? 'OK' : 'KO';
				resolve({ label: app.label, name: app.name, status, message: `HTTP ${statusCode}`, url: app.url, statusUrl: app.statusUrl });
			}
		);
	});
};

// Servir archivos estáticos
app.use(express.static('public'));

// Definir la ruta para la raíz
app.get('/', (req, res) => {
	res.send('Web de status funcionando.');
});

// Manejar rutas no encontradas (404)
app.use((req, res, next) => {
	res.status(404).json({ error: 'Ruta no encontrada', code: 404 });
});

// Manejador global de errores
app.use((err, req, res, next) => {
	console.error('Error interno del servidor:', err.stack);
	res.status(500).json({ error: 'Error interno del servidor', code: 500 });
});

// Iniciar el servidor
app.listen(PORT, '0.0.0.0', () => {
	console.log(`Servidor escuchando en http://localhost:${PORT}`);
});