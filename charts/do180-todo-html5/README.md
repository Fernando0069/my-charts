# DO180-ToDo-HTML5 charts

Para crear la aplicación "ToDo-HTML5" del curso DO180 de Red Hat podemos hacerlo de dos maneras diferentes pero siempre manteniendo los mismos ficheros.

Punto 1 (helm):

Se crea la imagen con el BuildConfig con el Dockerfile y con todos los ficheros necesarios que serán montados en "/var/www/html/" a través del deployment.
Para crear la aplicación ToDo-HTML5 debemos ejecutar los siguiente comandos:
```
  1.- helm repo add apps https://fernando0069.github.io/my-charts/                                      # Creación del repositorio donde vamos a descargar la aplicación
  2.- helm install todo-html5 apps/DO180-ToDo-HTML5                                                     # Instalar la aplicación "DO180-ToDo-HTML5" con el nombre "todo-html5".
  3.- curl -vvv https://todo-html5-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/          # Verificar la URL. 
```

Para eliminar la aplicación ToDo-HTML5 debemos ejecutar los siguiente comandos:
```
  1.- helm uninstall todo-html5                             # Desinstalar la aplicación con el nombre "todo-html5" ("DO180-ToDo-HTML5").
  2.- helm repo remove apps                                 # Eliminación del repositorio de aplicaciones.
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
  oc new-app --name=todo-html5 https://github.com/Fernando0069/my-charts.git --context-dir=charts/do180-todo-html5/files -l app=todo-html5
  oc expose service/todo-html5
  curl -vvv https://todo-html5-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
  oc delete all -l app=todo-html5
```

Usando imagestream con la versión del compilador:
```
  oc new-app -S php
  oc new-app --image-stream=openshift/php:8.1-ubi9 --name todo-html5 https://github.com/Fernando0069/my-charts.git --context-dir=charts/do180-todo-html5/files -l app=todo-html5
  oc expose service/todo-html5
  curl -vvv https://todo-html5-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
  oc delete all -l app=todo-html5
```
