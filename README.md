# my-charts

Se ha creado un repositorio con todas las aplicaciones preparadas para instalar y ser usadas.

# List applications 
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
    helm install web-spectral apps/Web-Spectral
```
## Uninstall Application:
```
helm uninstall [NAME_APP]
    helm uninstall cyberchef 
```

# Architecture
```
my-charts/
│── apps/                  # Todas las aplicaciones dentro de este directorio
│   ├── cyberchef          # Aplicación CyberChef
│   │   ├── helm/          # Chart de Helm específico para CyberChef
│   │   │   ├── Chart.yaml 
│   │   │   ├── values.yaml
│   │   │   └── templates/
│   │   ├── app/           # Código fuente de la aplicación
│   │   │   ├── src/       # Código fuente (HTML, CSS, JS, etc.)
│   │   │   └── Dockerfile # Archivo Docker para construir la imagen de la app
│   │   └── README.md      # Documentación específica de la app
│   └── web-status         # Aplicación Web Status
│       ├── helm/          # Chart de Helm específico para Web Status
│       │   ├── Chart.yaml 
│       │   ├── values.yaml
│       │   └── templates/
│       ├── app/           # Código fuente de la aplicación
│       │   ├── src/       # Código fuente (HTML, CSS, JS, etc.)
│       │   └── Dockerfile # Archivo Docker para construir la imagen de la app
│       └── README.md      # Documentación específica de la app
│── charts/                # Directorio global para almacenar los paquetes Helm
│   ├── CyberChef-0.1.0.tgz
│   ├── DO180-Alges-Escapade-0.1.0.tgz
│   ├── DO180-NodeJS-App-0.1.0.tgz
│   ├── DO180-NodeJS-HelloWorld-0.1.0.tgz
│   ├── DO180-Openshift-HelloWorld-0.1.0.tgz
│   ├── DO180-PHP-HelloWorld-0.1.0.tgz
│   ├── DO180-PHP-Temperature-0.1.0.tgz
│   ├── DO180-ToDo-HTML5-0.1.0.tgz
│   ├── DO180-ToDo-NodeJS-0.1.0.tgz
│   ├── ReverseShellGenerator-0.1.0.tgz
│   ├── Web-Spectral-0.1.0.tgz
│   ├── Web-Status-0.1.0.tgz
│   └── README.md              # Documentación de las aplicaciones preparadas.
│── ToDo                   # Directorio donde están las aplicaciones pendientes de realizar.
│── .gitignore             # Para evitar que Helm empaquete archivos innecesarios
│── global-configs/        # Configuraciones generales de todas las apps (si aplica)
└── README.md              # Documentación del repositorio
```