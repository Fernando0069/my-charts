# ReverseShellGenerator charts

A través del "BuildConfig" creamos una "Image" y una "ImageStream", las cuales serán usadas en el "Deployment".

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
  0.- Disponer del archivo Dockerfile en git.
  1.- Crear el ImageStream.
  2.- Crear los secrets (2) para los webhook.
  3.- Crear el BuildConfig.
  4.- Crear el Deployment.
  5.- Crear el HorizontalPodAutoscalers (hpa).
  6.- Crear el PodDisruptionBudget (pdb).
  7.- Crear el Service.
  8.- Crear el Route.
```
