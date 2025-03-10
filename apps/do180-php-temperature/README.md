# DO180-PHP-Temperature charts

Para crear la aplicación "php-temperature" del curso DO180 de Red Hat podemos hacerlo de dos maneras diferentes pero siempre manteniendo los mismos ficheros.

Punto 1 (helm):

Se crea la imagen con un fichero llamado "index.php" (BuildConfig) y con tecnología Helm desplegamos el pod el cual además tendrá un ConfigMap con el archivo "phpinfo.php" que será montado en "/opt/app-root/src/" a través del deployment.
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


Punto 2 (cli):

Sin el uso de image o imagestream:
```
  oc new-app --name=php-temperature https://github.com/Fernando0069/my-charts.git --context-dir=charts/do180-php-temperature/files -l app=php-temperature
  oc expose service/php-temperature
  curl -vvv https://php-temperature-fernando0069-dev.apps.rm2.thpm.p1.openshiftapps.com
  curl -vvv https://php-temperature-fernando0069-dev.apps.rm2.thpm.p1.openshiftapps.com/phpinfo.php
  oc delete all -l app=php-temperature
```

Usando imagestream con la versión del compilador:
```
  oc new-app -S php
  oc new-app --image-stream=openshift/php:8.1-ubi9 --name php-temperature https://github.com/Fernando0069/my-charts.git --context-dir=charts/do180-php-temperature/files -l app=php-temperature
  oc expose service/php-temperature
  curl -vvv https://php-temperature-fernando0069-dev.apps.rm2.thpm.p1.openshiftapps.com
  curl -vvv https://php-temperature-fernando0069-dev.apps.rm2.thpm.p1.openshiftapps.com/phpinfo.php
  oc delete all -l app=php-temperature
```

Los objetos que se crean son los siguientes:
```
  1.- Imagestream.
  2.- BuildConfig.
  3.- Deployment.
  4.- Service.
  5.- Route.
```
