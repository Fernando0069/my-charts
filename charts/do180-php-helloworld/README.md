# do180-php-helloworld charts

Para crear la aplicación "php-helloworld" del curso DO180 de Red Hat podemos hacerlo de dos maneras:
```
1.- Mediante la CLI de Openshift (oc):

  oc new-app php:https://github.dev/Fernando0069/my-charts.git#main --context-dir=do180-php-helloworld/index.html -l training=do180

2.- Mediante Helm:

  helm repo add apps https://fernando0069.github.io/my-charts/
  helm install do180-php-helloworld apps/do180-php-helloworld
```
