const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const app = express();
const PORT = 8080;

// Datos de las aplicaciones
const applications = [
    { label: 'Tools', name: 'Google', statusUrl: 'https://google.com', url: 'https://google.com' },
    { label: 'Tools', name: 'CyberChef', statusUrl: 'http://localhost:8080/status-ko', url: 'https://cyberchef.openshift.com' },
    { label: 'Tools', name: 'ReverseShellGenerator', statusUrl: 'http://localhost:8080/status-ok', url: 'https://reverserhellgenerator.openshift.com' },
    { label: 'Tools', name: 'Web-Spectral', statusUrl: 'http://localhost:8080/status-ko', url: 'https://web-spectral.openshift.com' },
    { label: 'Training', name: 'DO180-PHP-HelloWorld', statusUrl: 'http://localhost:8080/status-ok', url: 'https://app5.openshift.com' },
    { label: 'Training', name: 'DO180-NodeJS-HelloWorld', statusUrl: 'http://localhost:8080/status-ko', url: 'https://nodejs-helloworld.openshift.com' },
    { label: 'Training', name: 'DO180-PHP-Temperature', statusUrl: 'http://localhost:8080/status-ok', url: 'https://php-temperature.openshift.com' },
    { label: 'Training', name: 'DO180-NodeJS-App', statusUrl: 'http://localhost:8080/status-ko', url: 'https://nodejs-app.openshift.com' },
    { label: 'Training', name: 'DO180-ToDo-HTML5', statusUrl: 'http://localhost:8080/status-ok', url: 'https://todo-html5.openshift.com' },
    { label: 'Training', name: 'App 10', statusUrl: 'http://localhost:8080/status-ko', url: 'https://app10.openshift.com' }
];

// Ruta para obtener el estado de las aplicaciones
app.get('/status', async (req, res) => {
    const results = await Promise.all(applications.map(app => {
        return new Promise(resolve => {
            exec(`curl -s -o /dev/null -w "%{http_code}" --max-time 5 -L ${app.statusUrl}`,
                (error, stdout) => {
                    if (error) {
                        console.error(`Error al consultar ${app.name}:`, error.message);
                        return resolve({ label: app.label, name: app.name, status: 'KO', message: 'Error de conexión', url: app.url });
                    }
                    const statusCode = parseInt(stdout, 10);
                    const status = statusCode === 200 ? 'OK' : 'KO';
                    resolve({ label: app.label, name: app.name, status, message: `HTTP ${statusCode}`, url: app.url });
                }
            );
        });
    }));

    console.log("Enviando datos a la web:", results);
    res.json(results);
});

// Estado OK para las pruebas de las aplicaciones
app.get('/status-ok', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'El servidor SI esta en funcionamiento.' });
});

// Estado KO para las pruebas de las aplicaciones
app.get('/status-ko', (req, res) => {
    res.status(500).json({ status: 'KO', message: 'El servidor NO esta en funcionamiento.' });
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
