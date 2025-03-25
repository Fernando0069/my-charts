# my-charts

Se ha creado un repositorio con todas las aplicaciones preparadas para instalar y ser usadas.

## List applications 
```
List applications: 
    Tools:
        CyberChef
        ReverseShellGenerator
        Web-Spectral
        Web-Status

    Training:
        DO180-Openshift-HelloWorld
        DO180-PHP-HelloWorld
        DO180-NodeJS-HelloWorld
        DO180-PHP-Temperature
        DO180-NodeJS-App
        DO180-ToDo-HTML5 - App not functional (no DB available) but install OK.
        DO180-ToDo-NodeJS - App not functional (no DB available) but install OK.
        DO180-Alges-Escapade
        DO180-Retro-Games
        DO180-AntiPacMan
        DO180-O
        DO180-Tic-Tac-Toe
        DO180-Tetris-JS
        DO180-Super-Mario-HTML5
        DO180-Lord-of-the-Rings
        DO180-Lilo-and-Stitch
        DO180-Hangman-Game
        DO180-Weather-React
        DO180-Pacman-NodeJS
```

# Repository
## Add the Repository "apps" to Helm:
```
helm repo add [NAME_REPO] [URL_REPO]
    helm repo add apps https://fernando0069.github.io/my-charts/
```
## Remove the Repository "apps" to Helm:
```
helm repo remove [NAME_REPO]
    helm repo remove apps
```

# Application
## Install Application:
```
helm install [NAME_APP] [NAME_APP]/[NAME_APP]
    helm install web-status apps/Web-Status
```
## Uninstall Application:
```
helm uninstall [NAME_APP]
    helm uninstall cyberchef 
```

# Architecture
```
my-charts/                      # Directorio global para almacenar el código de las aplicaciones
│── apps/                       # Todas las aplicaciones dentro de este directorio
│   ├── [APP_NAME]              # Nombre de la aplicación en minúsculas
│   │   ├── app/                # Código para la creación de la aplicación
│   │   │   ├── src/            # Código fuente (HTML, CSS, JS, etc.)
│   │   │   └── Dockerfile      # Archivo Docker para construir la imagen de la aplicación
│   │   ├── helm/               # Chart de Helm específico para la aplicación
│   │   │   ├── Chart.yaml      # Metadatos del chart de Helm (nombre, versión, descripción)
│   │   │   ├── values.yaml     # Valores configurables del chart (puertos, imágenes, réplicas)
│   │   │   └── templates/      # Plantillas YAML para los recursos de Kubernetes (Deployments, Services, Ingress)
│   │   └── README.md           # Documentación específica de la aplicación
│   └── web-status
│       ├── app/
│       │   ├── src/
│       │   └── Dockerfile
│       ├── helm/
│       │   ├── Chart.yaml 
│       │   ├── values.yaml
│       │   └── templates/
│       └── README.md
│── charts/                                # Directorio global para almacenar los paquetes Helm
│   ├── [APP_NAME]-[VERSION_CHART].tgz     # Todas las aplicaciones tienen este formato.
│   ├── Web-Status-0.1.0.tgz               # Aplicación Web-Status enpaquetada.
│   └── README.md                          # Documentación de las aplicaciones preparadas.
│── ToDo                   # Directorio donde están las aplicaciones pendientes de realizar.
│── .gitignore             # Para evitar que Helm empaquete archivos innecesarios
│── global-configs/        # Configuraciones generales de todas las apps (si aplica)
└── README.md              # Documentación del repositorio
```

# License
His project is licensed under the GNU Affero General Public License v3 (AGPL-3.0). For more details, see the [LICENSE](LICENSE) file.