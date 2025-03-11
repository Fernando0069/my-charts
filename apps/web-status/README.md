# Web-Status charts

En la carpeta "app" está los archivos para la creación de la aplicacion mediante una imagen.
En la carpeta "helm" está los archivos para la creación de la aplicación mediante Helm.

Esta aplicación solo se puede ejecutar con Helm.

Se crea la imágen desde el archivo Dockerfile ubicado en app/Dockerfile.

Para crear la aplicación Web-Status debemos ejecutar los siguiente comandos:
```
  1.- helm repo add apps https://fernando0069.github.io/my-charts/                                      # Creación del repositorio donde vamos a descargar la aplicación
  2.- helm install web-status apps/Web-Status                                                           # Instalar la aplicación "Web-Status" con el nombre "web-web-status".
  3.- curl -vvv https://web-web-status-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/      # Verificar la URL.
```

Para eliminar la aplicación Web-Status debemos ejecutar los siguiente comandos:
```
  1.- helm uninstall web-web-status                                    # Desinstalar la aplicación con el nombre "web-web-status" ("Web-Status").
  2.- helm repo remove apps                                            # Eliminación del repositorio de aplicaciones.
```

Los objetos que se crean son los siguientes:
```
  0.- Dockerfile.
  1.- ImageStream.
  2.- BuildConfig.
  3.- Deployment.
  4.- HorizontalPodAutoscalers (hpa).
  5.- PodDisruptionBudget (pdb).
  6.- Service.
  7.- Route.
```
