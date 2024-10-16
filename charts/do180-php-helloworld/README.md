# DO180-php-helloworld charts

Para crear la aplicación "php-helloworld" del curso DO180 de Red Hat podemos hacerlo de dos maneras:

1.- Mediante la CLI de Openshift (oc):
```
  oc new-app --name=php-helloworld https://github.com/Fernando0069/my-charts.git --context-dir=charts/do180-php-helloworld/files -l app=php-helloworld
  oc expose service/php-helloworld
  curl -vvv https://php-fer-fer-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
    ...
    Hello, World! php version is 8.0.13
    ...


Si queremos definir la versión del compilador con imagestream:
  oc new-app -S php
  oc new-app --image-stream=openshift/php:8.1-ubi9 --name php-helloworld https://github.com/Fernando0069/my-charts.git --context-dir=charts/do180-php-helloworld/files -l app=php-helloworld
  oc expose service/php-helloworld
  curl -vvv https://php-helloworld-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
    ...
    Hello, World! php version is 8.1.27
    ...
```


2.- Mediante Helm:
```
  helm repo add apps https://fernando0069.github.io/my-charts/
  helm install do180-php-helloworld apps/do180-php-helloworld
```