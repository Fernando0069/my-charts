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
    { label: 'Tools', name: 'CyberChef', statusUrl: 'http://localhost:8080/status-ko', url: 'https://cyberchef.openshift.com' },
    { label: 'Training', name: 'DO180-PHP-HelloWorld' },
    { label: 'Training', name: 'DO180-PHP-HelloWorld', statusUrl: 'http://localhost:8080/status-ok', url: 'https://app5.openshift.com' }
];

// Datos de las aplicaciones
//const applications = [
//    { label: 'Tools', name: 'Google', statusUrl: 'https://google.com', url: 'https://google.com' },
//    { label: 'Tools', name: 'CyberChef', statusUrl: 'http://localhost:8080/status-ko', url: 'https://cyberchef.openshift.com' },
//    { label: 'Tools', name: 'ReverseShellGenerator', statusUrl: 'http://localhost:8080/status-ok', url: 'https://reverserhellgenerator.openshift.com' },
//    { label: 'Tools', name: 'Web-Spectral-CON', statusUrl: `${PROTOCOL}web-spectral-${cleanDomain}/status`, url: `${PROTOCOL}web-spectral-${cleanDomain}` },
//    { label: 'Training', name: 'DO180-PHP-HelloWorld', statusUrl: 'http://localhost:8080/status-ok', url: 'https://app5.openshift.com' },
//    { label: 'Training', name: 'DO180-NodeJS-HelloWorld', statusUrl: 'http://localhost:8080/status-ko', url: 'https://nodejs-helloworld.openshift.com' },
//    { label: 'Training', name: 'DO180-PHP-Temperature', statusUrl: 'http://localhost:8080/status-ok', url: 'https://php-temperature.openshift.com' },
//    { label: 'Training', name: 'DO180-NodeJS-App', statusUrl: 'http://localhost:8080/status-ko', url: 'https://nodejs-app.openshift.com' },
//    { label: 'Training', name: 'DO180-ToDo-HTML5', statusUrl: 'http://localhost:8080/status-ok', url: 'https://todo-html5.openshift.com' },
//    { label: 'Training', name: 'App 10', statusUrl: 'http://localhost:8080/status-ko', url: 'https://app10.openshift.com' }
//];

// Obtener el dominio dinámicamente desde la variable de entorno o del hostname del servidor
const fullDomain = process.env.APP_DOMAIN || require('os').hostname();
let cleanDomain = fullDomain;
if (fullDomain.startsWith("web-status-")) {
    cleanDomain = fullDomain.replace(/^web-status-/, '');
}

console.log("Dominio detectado en backend:", cleanDomain);

// Rellenamos los campos faltantes de cada aplicación de manera dinámica
applications.forEach(app => {
    if (!app.url) {
        const SUBDOMAIN = app.name.toLowerCase().replace(/\s+/g, '-'); // Formatear el nombre como subdominio
        app.url = `${PROTOCOL}${SUBDOMAIN}-${cleanDomain}`;
    }
    if (!app.statusUrl) {
        app.statusUrl = `${app.url}`;
    }
});

// Ruta para obtener el estado de las aplicaciones
app.get('/status', async (req, res) => {
    const results = await Promise.all(applications.map(app => {
        return new Promise(resolve => {
            console.log(`Verificando ${app.name}: statusUrl=${app.statusUrl}, url=${app.url}`);
            exec(`curl -k -s -o /dev/null -w "%{http_code}" --max-time 5 --connect-timeout 3 -L ${app.statusUrl}`,
                (error, stdout) => {
                    console.log(`Respuesta de ${app.statusUrl}: ${stdout}`);
                    if (error) {
                        console.error(`Error al consultar ${app.name} (${app.statusUrl}):`, error.message);
                        return resolve({ label: app.label, name: app.name, status: 'KO', message: 'Error de conexión', url: app.url });
                    }
                    const statusCode = parseInt(stdout, 10);
                    console.log(`Código HTTP recibido para ${app.statusUrl}: ${statusCode}`);
                    const status = statusCode === 200 ? 'OK' : 'KO';
                    resolve({ label: app.label, name: app.name, status, message: `HTTP ${statusCode}`, url: app.url });
                }
            );
        });
    }));

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
    console.error(err.stack); // Registra el error en la consola para depuración
    res.status(500).sendFile(path.join(__dirname, 'public', 'error.html'));
});

// Iniciar el servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});