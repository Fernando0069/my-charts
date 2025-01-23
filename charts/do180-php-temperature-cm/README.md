# DO180-PHP-Temperature-CM charts

Para crear la aplicación "php-temperature-cm" del curso DO180 de Red Hat podemos hacerlo de dos maneras diferentes pero siempre manteniendo los mismos ficheros.

Punto 1 (helm):

Desplegampos con tecnología Helm y se añade un ConfigMap con un fichero llamado "phpinfo.php" el cual montamos como el fichero "index.php", en "/opt/app-root/src" y no es añadido en la imagen.
```
  helm repo add apps https://fernando0069.github.io/my-charts/
  helm install do180-php-temperature-cm apps/DO180-PHP-Temperature-CM
  curl -vvv https://php-temperature-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
```

Punto 2 (cli):    REVISAR !!! podemos crear la aplicacion y luego añadirle un configmap 








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
