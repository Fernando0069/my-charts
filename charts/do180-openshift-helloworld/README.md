# DO180-Openshift-HelloWorld charts

Para crear la aplicación "openshift-helloworld" del curso DO180 de Red Hat podemos hacerlo de dos maneras diferentes pero siempre con los mismos archivos.

Punto 1 (helm):

Para crear la aplicación DO180-Openshift-HelloWorld debemos ejecutar los siguiente comandos:
```
  1.- helm repo add apps https://fernando0069.github.io/my-charts/                                          # Creación del repositorio donde vamos a descargar la aplicación
  2.- helm install openshift-helloworld apps/DO180-Openshift-HelloWorld                                     # Instalar la aplicación "DO180-Openshift-HelloWorld" con el nombre "openshift-helloworld".
  3.- curl -vvv https://openshift-helloworld-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/    # Verificar la URL. 
```

Para eliminar la aplicación DO180-Openshift-HelloWorld debemos ejecutar los siguiente comandos:
```
  1.- helm uninstall openshift-helloworld       # Desinstalar la aplicación con el nombre "openshift-helloworld" ("DO180-Openshift-HelloWorld").
  2.- helm repo remove apps                     # Eliminación del repositorio de aplicaciones.
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

Sin usar image o imagestream:
```
  oc new-app --name=openshift-helloworld https://github.com/Fernando0069/my-charts.git --context-dir=charts/do180-openshift-helloworld/files -l app=openshift-helloworld
  oc expose service/openshift-helloworld
  curl -vvv https://openshift-helloworld-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
  oc delete all -l app=openshift-helloworld
```

Usando imagestream con la versión del compilador:
```
  oc new-app -S go
  oc new-app --image-stream=openshift/golang:1.18-ubi9 --name openshift-helloworld https://github.com/Fernando0069/my-charts.git --context-dir=charts/do180-openshift-helloworld/files -l app=openshift-helloworld
  oc expose service/openshift-helloworld
  curl -vvv https://openshift-helloworld-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
  oc delete all -l app=openshift-helloworld
```

Los objetos que se crean son los siguientes:
```
  1.- Imagestream.
  2.- BuildConfig.
  3.- Deployment.
  4.- Service.
  5.- Route.
```
