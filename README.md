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
        DO180-ToDo-NodeJS - App not functional (no DB available) but install OK
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
