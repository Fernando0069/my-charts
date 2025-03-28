# Web-Spectral charts

En la carpeta "app" está los archivos para la creación de la aplicacion mediante una imagen.
En la carpeta "helm" está los archivos para la creación de la aplicación mediante Helm.

Esta aplicación solo se puede ejecutar con Helm.

Se crea la imágen desde el fichero Dockerfile con los ficheros de "files" y se guarda en 
La imagen que usamos (docker.io/fernando0069/web-spectral:latest) está creada desde el Dockerfile y con los archivos de "files".

Para crear la aplicación Web-Spectral debemos ejecutar los siguiente comandos:
```
  1.- helm repo add apps https://fernando0069.github.io/my-charts/                                    # Creación del repositorio donde vamos a descargar la aplicación
  2.- helm install web-spectral apps/Web-Spectral                                                     # Instalar la aplicación "Web-Spectral" con el nombre "web-spectral".
  3.- curl -vvv https://web-spectral-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/      # Verificar la URL.
```

Para eliminar la aplicación Web-Spectral debemos ejecutar los siguiente comandos:
```
  1.- helm uninstall web-spectral                                      # Desinstalar la aplicación con el nombre "web-spectral" ("Web-Spectral").
  2.- helm repo remove apps                                            # Eliminación del repositorio de aplicaciones.
```

Los objetos que se crean son los siguientes:
```
  1.- Crear el Deployment.
  2.- Crear el PodDisruptionBudget (pdb).
  3.- Crear el Service.
  4.- Crear el Route.
```
