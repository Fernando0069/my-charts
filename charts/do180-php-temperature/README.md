# DO180-PHP-Temperature charts

Para crear la aplicación "php-temperature" del curso DO180 de Red Hat podemos hacerlo de dos maneras diferentes pero siempre manteniendo los mismos ficheros.

Punto 1 (helm):

Se crea la imagen con un fichero llamado "index.php" (BuildConfig) y con tecnología Helm desplegamos el pod el cual además tendrá un ConfigMap con el archivo "phpinfo.php" que será montado en "/opt/app-root/src/" a través del deployment.
Para crear la aplicación DO180-PHP-Temperature debemos ejecutar los siguiente comandos:
```
  helm repo add apps https://fernando0069.github.io/my-charts/
  helm install do180-php-temperature apps/DO180-PHP-Temperature
  curl -vvv https://php-temperature-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
```

Punto 2 (cli):
  Creamos de manera automática una imágen la cual lleva todo el código (index.php), mediante la CLI de Openshift (oc):
```
Sin el uso de image o imagestream:
  oc new-app --name=php-temperature https://github.com/Fernando0069/my-charts.git --context-dir=charts/do180-php-temperature/files -l app=php-temperature
  oc expose service/php-temperature
  curl -vvv https://php-temperature-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/


Usando imagestream con la versión del compilador:
  oc new-app -S php
  oc new-app --image-stream=openshift/php:8.1-ubi9 --name php-temperature https://github.com/Fernando0069/my-charts.git --context-dir=charts/do180-php-temperature/files -l app=php-temperature
  oc expose service/php-temperature
  curl -vvv https://php-temperature-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
```
