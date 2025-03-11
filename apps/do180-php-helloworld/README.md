# DO180-PHP-HelloWorld charts

Para crear la aplicación "php-helloworld" del curso DO180 de Red Hat podemos hacerlo de dos maneras diferentes pero siempre con los mismos archivos.

Punto 1 (helm):

Se crea la imagen con un fichero llamado "index.html" (BuildConfig) y con tecnología Helm desplegamos con varias cosas más como un ConfigMap con un fichero llamado "phpinfo.php" el cual montamos como el fichero "phpinfo.php", en "/opt/app-root/src", el fichero index.php también esta en el ConfigMap pero no se usa ya que fué añadido a la imagen durante la construcción.
Para crear la aplicación DO180-PHP-HelloWorld debemos ejecutar los siguiente comandos:
```
  1.- helm repo add apps https://fernando0069.github.io/my-charts/                                          # Creación del repositorio donde vamos a descargar la aplicación
  2.- helm install php-helloworld apps/DO180-PHP-HelloWorld                                                 # Instalar la aplicación "DO180-PHP-HelloWorld" con el nombre "php-helloworld".
  3.- curl -vvv https://php-helloworld-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/          # Verificar la URL. 
  4.- curl -vvv https://php-helloworld-fernando0069-dev.apps.rm2.thpm.p1.openshiftapps.com/phpinfo.php      # Verificar la URL. --> phpinfo.php
```

Para eliminar la aplicación DO180-PHP-HelloWorld debemos ejecutar los siguiente comandos:
```
  1.- helm uninstall php-helloworld                                      # Desinstalar la aplicación con el nombre "php-helloworld" ("DO180-PHP-HelloWorld").
  2.- helm repo remove apps                                              # Eliminación del repositorio de aplicaciones.
```

Los objetos que se crean son los siguientes:
```
  1.- Imagestream.
  2.- BuildConfig.
  3.- ConfigMap.
  4.- Deployment.
  5.- PodDisruptionBudget.
  6.- Service.
  7.- Route.
```


Punto 2 (cli):

Creamos de manera automática una imágen la cual lleva todo el código (index.php), mediante la CLI de Openshift (oc), no se añade el ConfigMap que se realizó en el "Punto 1 (helm)":

Sin usar image o imagestream:
```
  oc new-app --name=php-helloworld https://github.com/Fernando0069/my-charts.git --context-dir=apps/do180-php-helloworld/app/src -l app=php-helloworld
  oc expose service/php-helloworld
  curl -vvv https://php-helloworld-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
  oc delete all -l app=php-helloworld
```

Usando imagestream con la versión del compilador:
```
  oc new-app -S php
  oc new-app --image-stream=openshift/php:8.1-ubi9 --name php-helloworld https://github.com/Fernando0069/my-charts.git --context-dir=apps/do180-php-helloworld/app/src -l app=php-helloworld
  oc expose service/php-helloworld
  curl -vvv https://php-helloworld-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
  oc delete all -l app=php-helloworld
```

Los objetos que se crean son los siguientes:
```
  1.- Imagestream.
  2.- BuildConfig.
  3.- Deployment.
  4.- Service.
  5.- Route.
```
