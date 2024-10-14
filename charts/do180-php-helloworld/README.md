# do180-php-helloworld charts

Para crear la aplicación "php-helloworld" del curso DO180 de Red Hat podemos hacerlo de dos maneras:

1.- Mediante la CLI de Openshift (oc):
```
  # oc new-app php:https://github.dev/Fernando0069/my-charts.git#main --context-dir=charts/do180-php-helloworld/index.html -l training=do180
  # oc new-app php-82:latest~https://github.dev/Fernando0069/my-charts.git#main --context-dir=charts/do180-php-helloworld/files/index.php -l training=do180

  vi index-php
    <?php
    print "Hello, World! php version is " . PHP_VERSION . "\n";
    print "\n";
    print "Today is going to be a great day.";
    ?>
  oc create configmap index-php --from-file=./index.php
  oc new-app --name php-helloworld php:8.2 -l training=do180
  oc set volume deployment/php-helloworld --add --name=index-php --mount-path=/var/www/html/index.php --configmap-name=index-php
```

2.- Mediante Helm:
```
  helm repo add apps https://fernando0069.github.io/my-charts/
  helm install do180-php-helloworld apps/do180-php-helloworld
```