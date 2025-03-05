# DO180-Alges-Escapade charts

Para crear la aplicación "alges-escapade" del curso DO180 de Red Hat podemos hacerlo de dos maneras diferentes pero siempre con los mismos archivos.

La aplicación "alges-escapade" dispone de dos puertos en activo (8080 y 8888) por eso a la hora de crear el servicio o la ruta hay que hacerlo de una determinada manera.

Punto 1 (helm):

Para crear la aplicación DO180-Alges-Escapade debemos ejecutar los siguiente comandos:
```
  1.- helm repo add apps https://fernando0069.github.io/my-charts/                                    # Creación del repositorio donde vamos a descargar la aplicación
  2.- helm install alges-escapade apps/DO180-Alges-Escapade                                           # Instalar la aplicación "DO180-Alges-Escapade" con el nombre "alges-escapade".
  3.- curl -vvv https://alges-escapade-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/    # Verificar la URL. 
```

Para eliminar la aplicación DO180-Alges-Escapade debemos ejecutar los siguiente comandos:
```
  1.- helm uninstall alges-escapade       # Desinstalar la aplicación con el nombre "alges-escapade" ("DO180-Alges-Escapade").
  2.- helm repo remove apps               # Eliminación del repositorio de aplicaciones.
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

Creamos de manera automática una imágen la cual lleva el contenido del directorio "files".

Como la aplicación es JavaScript puro (no Node.js), OpenShift no sabe cómo ejecutarla automáticamente porque "oc new-app" está diseñado para aplicaciones tipo servidor como Node.js, Python, Java, etc.

Dado que OpenShift espera un entorno para ejecutar código, pero JavaScript puro (HTML/CSS/JS) no necesita un servidor backend, se necesita una estrategia diferente.

Usando imagestream con la versión del compilador:
```
  oc new-app --name=game-off-2012 httpd~https://github.com/Fernando0069/my-charts.git --context-dir=charts/do180-game-off-2012/files -l app=game-off-2012
  oc expose svc game-off-2012 --name=game-off-2012-8080
  oc create route edge game-off-2012-8443 --service=game-off-2012
  curl -vvv http://game-off-2012-8080-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
  curl -vvv https://game-off-2012-8443-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
  oc delete all -l app=game-off-2012
```

Los objetos que se crean son los siguientes:
```
  1.- Imagestream.
  2.- BuildConfig.
  3.- Deployment.
  4.- Service.
  5.- Route.
```
