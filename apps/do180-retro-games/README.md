# DO180-Retro-Games charts

Versiones esqueléticas de Asteroids, Lunar Lander, Space Invaders y Snake en JavaScript.
Escrito como práctica para el taller de Strange Loop 2014.
   

En la carpeta "app" está los archivos para la creación de la aplicacion mediante una imagen.
En la carpeta "helm" está los archivos para la creación de la aplicación mediante Helm.

Para crear la aplicación "retro-games" del curso DO180 de Red Hat podemos hacerlo de dos maneras diferentes pero siempre manteniendo los mismos ficheros.

## helm

Para crear la aplicación PHP-Temperature debemos ejecutar los siguiente comandos:
```
  1.- helm repo add apps https://fernando0069.github.io/my-charts/                                   # Creación del repositorio donde vamos a descargar la aplicación
  2.- helm install php-temperature apps/DO180-PHP-Temperature                                        # Instalar la aplicación "DO180-PHP-Temperature" con el nombre "php-temperature".
  3.- curl -vvv https://php-temperature-fernando0069-dev.apps.rm2.thpm.p1.openshiftapps.com          # Verificar la URL. 
```

Para eliminar la aplicación PHP-Temperature debemos ejecutar los siguiente comandos:
```
  1.- helm uninstall php-temperature                                   # Desinstalar la aplicación con el nombre "php-temperature" ("DO180-PHP-Temperature").
  2.- helm repo remove apps                                            # Eliminación del repositorio de aplicaciones.
```

Los objetos que se crean son los siguientes:
```
  1.- Imagestream.
  2.- BuildConfig.
  3.- Deployment.
  4.- PodDisruptionBudget.
  5.- Service.
  6.- Route.
```


## cli

Asteroids:
![Screenshot of Asteroids](app/src/asteroids/screenshot.png)

Sin el uso de image o imagestream:
```
  oc new-app --name=retro-games-asteroids https://github.com/Fernando0069/my-charts.git --context-dir=apps/do180-retro-games/app/src/asteroids -l app=retro-games-asteroids
  oc expose service/retro-games-asteroids
  curl -vvv https://retro-games-asteroids-fernando0069-dev.apps.rm2.thpm.p1.openshiftapps.com
  oc delete all -l app=retro-games-asteroids
```

Usando imagestream con la versión del compilador:
```
  oc new-app -S php
  oc new-app --image-stream=openshift/php:8.1-ubi9 --name=retro-games-asteroids https://github.com/Fernando0069/my-charts.git --context-dir=apps/do180-retro-games/app/src/asteroids -l app=retro-games-asteroids
  oc expose service/retro-games-asteroids
  curl -vvv https://retro-games-asteroids-fernando0069-dev.apps.rm2.thpm.p1.openshiftapps.com
  oc delete all -l app=retro-games-asteroids
```

Los objetos que se crean son los siguientes:
```
  1.- Imagestream.
  2.- BuildConfig.
  3.- Deployment.
  4.- Service.
  5.- Route.
```

![Screenshot of Asteroids](asteroids/screenshot.png)

![Screenshot of Lunar Lander](lunar-lander/screenshot.png)

![Screenshot of Space Invaders](space-invaders/screenshot.png)

![Screenshot of Snake](snake/screenshot.png)