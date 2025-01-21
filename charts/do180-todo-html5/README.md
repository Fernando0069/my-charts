# DO180-ToDo-HTML5 charts

Para crear la aplicación "ToDo-HTML5" del curso DO180 de Red Hat podemos hacerlo de tres maneras diferentes pero siempre manteniendo los mismos ficheros.

Punto 1
  Creamos de manera automática una imágen (deteccion de lenguaje de programación) la cual lleva todos los ficheros mediante la CLI de Openshift (oc):
```
  oc new-app --name=todo-html5 https://github.com/Fernando0069/my-charts.git --context-dir=charts/do180-todo-html5/files -l app=todo-html5
  oc expose service/todo-html5
  curl -vvv https://todo-html5-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
```

Punto 2:
  Usamos imagestream con la versión del compilador deseada:
```
  oc new-app -S php
  oc new-app --image-stream=openshift/php:8.1-ubi9 --name todo-html5 https://github.com/Fernando0069/my-charts.git --context-dir=charts/do180-todo-html5/files -l app=todo-html5
  oc expose service/todo-html5
  curl -vvv https://todo-html5-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
```

Punto 3:
  Desplegampos con tecnología Helm y se añade un ConfigMap con un fichero llamado "phpinfo.php" el cual montamos como el fichero "index.php", en "/opt/app-root/src" y no es añadido en la imagen.
```
  helm repo add apps https://fernando0069.github.io/my-charts/
  helm install do180-todo-html5 apps/DO180-ToDo-HTML5
  curl -vvv https://todo-html5-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
```