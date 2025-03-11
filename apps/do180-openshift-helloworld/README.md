# DO180-Openshift-HelloWorld charts

Para crear la aplicación "openshift-helloworld" del curso DO180 de Red Hat podemos hacerlo de dos maneras diferentes pero siempre con los mismos archivos.

La aplicación "openshift-helloworld" dispone de dos puertos en activo (8080 y 8888) por eso a la hora de crear el servicio o la ruta hay que hacerlo de una determinada manera.

Punto 1 (helm):

Para crear la aplicación DO180-Openshift-HelloWorld debemos ejecutar los siguiente comandos:
```
  1.- helm repo add apps https://fernando0069.github.io/my-charts/                                                # Creación del repositorio donde vamos a descargar la aplicación
  2.- helm install openshift-helloworld apps/DO180-Openshift-HelloWorld                                           # Instalar la aplicación "DO180-Openshift-HelloWorld" con el nombre "openshift-helloworld".
  3.- curl -vvv https://https://openshift-helloworld-8080-fernando0069-dev.apps.rm2.thpm.p1.openshiftapps.com/    # Verificar la URL.
  3.- curl -vvv https://https://openshift-helloworld-8888-fernando0069-dev.apps.rm2.thpm.p1.openshiftapps.com/    # Verificar la URL.
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
  3.- Deployment.
  4.- Service (2).
  5.- Route (2).
```


Punto 2 (cli):

Creamos de manera automática una imágen la cual lleva el contenido del directorio "files".

Usando imagestream con la versión del compilador:
```
  oc new-app -S golang
  oc new-app --name=openshift-helloworld golang~https://github.com/Fernando0069/my-charts.git --context-dir=apps/do180-openshift-helloworld/app/src -l app=openshift-helloworld
  oc expose deployment openshift-helloworld --port=8080 --target-port=8080 --name=openshift-helloworld-8080
  oc expose deployment openshift-helloworld --port=8888 --target-port=8888 --name=openshift-helloworld-8888
  oc create route edge openshift-helloworld-8080 --service=openshift-helloworld-8080 --port=8080
  oc create route edge openshift-helloworld-8888 --service=openshift-helloworld-8888 --port=8888
  curl -vvv https://openshift-helloworld-88080-fernando0069-dev.apps.rm2.thpm.p1.openshiftapps.com/
  curl -vvv https://openshift-helloworld-8888-fernando0069-dev.apps.rm2.thpm.p1.openshiftapps.com/
  oc delete all -l app=openshift-helloworld
```

Los objetos que se crean son los siguientes:
```
  1.- Imagestream.
  2.- BuildConfig.
  3.- Deployment.
  4.- Service (2).
  5.- Route (2).
```
