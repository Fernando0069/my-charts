# ReverseShellGenerator charts

En la carpeta "app" está los archivos para la creación de la aplicacion mediante una imagen.
En la carpeta "helm" está los archivos para la creación de la aplicación mediante Helm.

Esta aplicación solo se puede ejecutar con Helm.

Para crear la aplicación ReverseShellGenerator debemos ejecutar los siguiente comandos:
```
  1.- helm repo add apps https://fernando0069.github.io/my-charts/                                              # Creación del repositorio donde vamos a descargar la aplicación
  2.- helm install reverseshellgenerator apps/ReverseShellGenerator                                             # Instalar la aplicación "ReverseShellGenerator" con el nombre "reverseshellgenerator".
  3.- curl -vvv https://reverseshellgenerator-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/       # Verificar la URL.
```

Para eliminar la aplicación ReverseShellGenerator debemos ejecutar los siguiente comandos:
```
  1.- helm uninstall reverseshellgenerator                             # Desinstalar la aplicación con el nombre "reverseshellgenerator" ("ReverseShellGenerator").
  2.- helm repo remove apps                                            # Eliminación del repositorio de aplicaciones.
```

Los objetos que se crean son los siguientes:
```
  0.- Dockerfile.
  1.- ImageStream.
  2.- Secrets (2).
  3.- BuildConfig.
  4.- Deployment.
  5.- HorizontalPodAutoscalers (hpa).
  6.- PodDisruptionBudget (pdb).
  7.- Service.
  8.- Route.
```
