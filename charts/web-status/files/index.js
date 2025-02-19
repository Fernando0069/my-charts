const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const app = express();
const PORT = 8080;

const PROTOCOL = "https://";

// Obtener el dominio dinámicamente desde la variable de entorno o del hostname
const fullDomain = process.env.APP_DOMAIN || require('os').hostname();
let cleanDomain = fullDomain;
if (fullDomain.startsWith("web-status-")) {
    cleanDomain = fullDomain.replace(/^web-status-/, '');
}

console.log("Dominio detectado en backend:", cleanDomain);

// Datos de las aplicaciones
const applications = [
    { label: 'Tools', name: 'Google', statusUrl: 'https://www.google.com', url: 'https://www.google.com' },
    { label: 'Tools', name: 'CyberChef' },
	{ label: 'Tools', name: 'CyberChef', statusUrl: 'http://localhost:8080/status-ko', url: 'https://cyberchef.openshift.com' },
    { label: 'Training', name: 'DO180-PHP-HelloWorld' },
    { label: 'Training', name: 'DO180-PHP-HelloWorld', statusUrl: 'http://localhost:8080/status-ok', url: 'https://app5.openshift.com' }
];

// Datos de las aplicaciones
//const applications = [
//    { label: 'Tools', name: 'Google', statusUrl: 'https://google.com', url: 'https://google.com' },
//    { label: 'Tools', name: 'CyberChef' },
//    { label: 'Tools', name: 'ReverseShellGenerator' },
//    { label: 'Tools', name: 'Web-Spectral' },
//    { label: 'Training', name: 'DO180-PHP-HelloWorld'' },
//    { label: 'Training', name: 'DO180-NodeJS-HelloWorld' },
//    { label: 'Training', name: 'DO180-PHP-Temperature' },
//    { label: 'Training', name: 'DO180-NodeJS-App' },
//    { label: 'Training', name: 'DO180-ToDo-HTML5' },
//    { label: 'Training', name: 'App_10' }
//];

// Rellenar datos de las aplicaciones sin modificar los ya definidos, generar `url` y `statusUrl` SOLO si NO están definidos
applications.forEach(app => {
    if (!app.url) {
        const subdomain = app.name.toLowerCase().replace(/\s+/g, '-');
        app.url = `${PROTOCOL}${subdomain}-${cleanDomain}`;
    }
    if (!app.statusUrl) {
        app.statusUrl = app.url; // Si no hay statusUrl, tomamos el mismo valor de url
    }
    console.log(`Configuración de ${app.name}: statusUrl=${app.statusUrl}, url=${app.url}`);
});

console.log("Aplicaciones configuradas:", applications);

// Ruta para obtener el estado de las aplicaciones
taskCheckStatus = async (app) => {
    return new Promise(resolve => {
        exec(`curl -k -s -o /dev/null -w "%{http_code}" --max-time 5 --connect-timeout 3 -L ${app.statusUrl}`,
            (error, stdout) => {
                console.log(`Respuesta de ${app.statusUrl}: ${stdout}`);
                if (error) {
                    console.error(`Error al consultar ${app.name} (${app.statusUrl}):`, error.message);
                    return resolve({ label: app.label, name: app.name, status: 'KO', message: 'Error de conexión', url: app.url, statusUrl: app.statusUrl });
                }
                const statusCode = parseInt(stdout, 10);
                const status = statusCode === 200 ? 'OK' : 'KO';
                resolve({ label: app.label, name: app.name, status, message: `HTTP ${statusCode}`, url: app.url, statusUrl: app.statusUrl });
            }
        );
    });
};

	
app.get('/status', async (req, res) => {
    const results = await Promise.all(applications.map(app => taskCheckStatus(app)));
    console.log("Enviando datos a la web:", results);
    res.json(results);
});

// Servir archivos estáticos
app.use(express.static('public'));

// Definir la ruta para la raíz
app.get('/', (req, res) => {
    res.send('Web de status funcionando.');
});

// Manejar rutas no encontradas (404)
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'error.html'));
});

// Manejador global de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).sendFile(path.join(__dirname, 'public', 'error.html'));
});

// Iniciar el servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
