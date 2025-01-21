# ReverseShellGenerator charts

Se crea la imágen desde el fichero Dockerfile con los ficheros de /files y se guarda en "docker.io/fernando0069/web-spectral:latest".

Para crear la aplicación ReverseShellGenerator debemos ejecutar los siguiente comandos:
```
  1.- helm repo add apps https://fernando0069.github.io/my-charts/         # Creación del repositorio donde vamos a descargar la aplicación
  2.- helm install reverseshellgenerator apps/ReverseShellGenerator        # Instalar la aplicación "ReverseShellGenerator" con el nombre "reverseshellgenerator".
```

Para eliminar la aplicación ReverseShellGenerator debemos ejecutar los siguiente comandos:
```
  1.- helm uninstall reverseshellgenerator                             # Desinstalar la aplicación con el nombre "reverseshellgenerator" ("ReverseShellGenerator").
  2.- helm repo remove apps                                            # Eliminación del repositorio de aplicaciones.
```

Los objetos que se crean son los siguientes:
```
  1.- Crear el Dockerfile en git.
  2.- Crear el ImageStream.
  3.- Crear los secrets (2) para los webhook.
  4.- Crear el BuildConfig.
  5.- Crear el Deployment.
  6.- Crear el HorizontalPodAutoscalers (hpa).
  7.- Crear el PodDisruptionBudget (pdb).
  8.- Crear el Service.
  9.- Crear el Route.
Extra:
  vpa
```




Hay que revisar los ficheros:
```
  1.- Revisar el values.yaml.
  2.- Revisar el Chart.yaml.
```
