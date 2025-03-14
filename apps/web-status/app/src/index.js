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
	{ label: 'Tools', name: 'ReverseShellGenerator' },
	{ label: 'Tools', name: 'Web-Spectral' },
	{ label: 'Tools', name: 'IT-Tools' },
	{ label: 'Tools', name: 'Web-Status' },
	{ label: 'Training', course: 'DO180', name: 'Openshift-HelloWorld', ports: [8080, 8888] },
	{ label: 'Training', course: 'DO180', name: 'PHP-HelloWorld' },
	{ label: 'Training', course: 'DO180', name: 'NodeJS-HelloWorld' },
	{ label: 'Training', course: 'DO180', name: 'PHP-Temperature' },
	{ label: 'Training', course: 'DO180', name: 'NodeJS-App' },
	{ label: 'Training', course: 'DO180', name: 'ToDo-HTML5' },
	{ label: 'Training', course: 'DO180', name: 'ToDo-NodeJS' },
	{ label: 'Training', course: 'DO180', name: 'Alges-Escapade' },
	{ label: 'Training', course: 'DO180', name: 'Retro-Games', games: ['Asteroids', 'Lunar Lander', 'Snake', 'Space Invaders'] },
	{ label: 'Training', course: 'DO180', name: 'AntiPacMan' },
	{ label: 'Training', course: 'DO180', name: 'O' },
	{ label: 'Training', course: 'DO180', name: 'Tic-Tac-Toe' },
	{ label: 'Training', course: 'DO180', name: 'Tetris-JS' },
	{ label: 'Training', course: 'DO180', name: 'Super-Mario-HTML5' },
	{ label: 'Training', course: 'DO180', name: 'Lord-of-the-Rings' },
	{ label: 'Training', course: 'DO180', name: 'Lilo-and-Stitch' },
	{ label: 'Training', course: 'DO180', name: 'Weather-React' },
	{ label: 'Training', course: 'DO180', name: 'Pacman' },
	{ label: 'Training', course: 'DO180', name: 'Hangman-Game' }
];
console.log("Aplicaciones configuradas (1):", applications);

// Ruta para obtener el estado de las aplicaciones
app.get('/status', async (req, res) => {
	const queryDomain = req.query.domain;
	if (queryDomain) {
		cleanDomain = queryDomain;
		console.log("Dominio actualizado desde frontend:", cleanDomain);
	}

	let expandedApps = [];
	applications.forEach(app => {
		if (app.games) {
			app.games.forEach(game => {
				let gameName = game.toLowerCase().replace(/\s+/g, '-');
				let fullUrl = `${PROTOCOL}retro-games-${gameName}-${cleanDomain}`;
				expandedApps.push({ label: app.label, course: app.course, name: `Retro-Games (${game})`, url: fullUrl, statusUrl: fullUrl });
			});
		} else if (app.statusUrl && app.url) {
			expandedApps.push(app);
		} else if (app.ports) {
			app.ports.forEach(port => {
				let subdomain = `${app.name.toLowerCase().replace(/\s+/g, '-')}-${port}`;
				let fullUrl = `${PROTOCOL}${subdomain}-${cleanDomain}`;
				expandedApps.push({ label: app.label, course: app.course, name: `${app.name} (${port})`, url: fullUrl, statusUrl: fullUrl });
			});
		} else {
			let subdomain = app.name.toLowerCase().replace(/\s+/g, '-');
			let fullUrl = `${PROTOCOL}${subdomain}-${cleanDomain}`;
			expandedApps.push({ label: app.label, course: app.course, name: app.name, url: fullUrl, statusUrl: fullUrl });
		}
	});

	console.log("Aplicaciones configuradas (2):", expandedApps);

	const results = await Promise.all(expandedApps.map(app => taskCheckStatus(app)));
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
				resolve({ label: app.label, course: app.course, name: app.name, status, message: `HTTP ${statusCode}`, url: app.url, statusUrl: app.statusUrl });
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
