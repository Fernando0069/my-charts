# DO180-php-helloworld charts

Para crear la aplicación "php-helloworld" del curso DO180 de Red Hat podemos hacerlo de tres maneras diferentes pero siempre manteniendo los mismos ficheros.

Punto 1
  Creamos de manera automática una imágen la cual lleva todo el código (index.php), mediante la CLI de Openshift (oc):
```
Sin el uso de image o imagestream:
  oc new-app --name=php-helloworld https://github.com/Fernando0069/my-charts.git --context-dir=charts/do180-php-helloworld/files -l app=php-helloworld
  oc expose service/php-helloworld
  curl -vvv https://php-helloworld-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/

Usando imagestream con la versión del compilador:
  oc new-app -S php
  oc new-app --image-stream=openshift/php:8.1-ubi9 --name php-helloworld https://github.com/Fernando0069/my-charts.git --context-dir=charts/do180-php-helloworld/files -l app=php-helloworld
  oc expose service/php-helloworld
  curl -vvv https://php-helloworld-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
```


Punto 2:
  Desplegampos con tecnología Helm y se añade un ConfigMap con un fichero llamado "phpinfo.php" el cual montamos como el fichero "phpinfo.php", en "/opt/app-root/src", el fichero index.php es añadido a la imagen durante la construcción.
```
  helm repo add apps https://fernando0069.github.io/my-charts/
  helm install do180-php-helloworld apps/DO180-PHP-HelloWorld
  curl -vvv https://php-helloworld-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
```