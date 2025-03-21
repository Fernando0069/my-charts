# DO180-Pacman-NodeJS charts

En la carpeta "app" está los archivos para la creación de la aplicacion mediante una imagen.
En la carpeta "helm" está los archivos para la creación de la aplicación mediante Helm.

Creamos de manera automática una imágen la cual lleva el contenido del directorio "src".

Para crear la aplicación "pacman-nodejs" del curso DO180 de Red Hat podemos hacerlo de dos maneras diferentes pero siempre con los mismos archivos.


## helm

Para crear la aplicación "DO180-Pacman-NodeJS" debemos ejecutar los siguiente comandos:
```
  1.- helm repo add apps https://fernando0069.github.io/my-charts/                                  # Creación del repositorio donde vamos a descargar la aplicación.
  2.- helm install pacman-nodejs apps/DO180-Pacman-NodeJS                                                         # Instalar la aplicación "DO180-Pacman-NodeJS" con el nombre "pacman-nodejs".
  3.- curl -vvv https://pacman-nodejs-fernando0069-dev.apps.rm2.thpm.p1.openshiftapps.com                  # Verificar la URL. 
```

Para eliminar la aplicación "DO180-Pacman-NodeJS" debemos ejecutar los siguiente comandos:
```
  1.- helm uninstall pacman-nodejs                          # Desinstalar la aplicación con el nombre "pacman-nodejs" ("DO180-Pacman-NodeJS").
  2.- helm repo remove apps                          # Eliminación del repositorio de aplicaciones.
```

Los objetos que se crean son los siguientes:
```
  1.- Imagestream
  2.- BuildConfig.
  3.- Deployment.
  4.- Service.
  5.- Route.
```


## cli

### Sin DB
Sin el uso de image o imagestream:
```
  oc new-app --name=pacman-nodejs https://github.com/Fernando0069/my-charts.git --context-dir=apps/do180-pacman-nodejs/app/src -l app=pacman-nodejs
  oc create route edge --service=pacman-nodejs     # crea ruta segura del tipo edge
  curl -vvv https://pacman-nodejs-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
  oc delete all -l app=pacman-nodejs
```

Usando imagestream con la versión del compilador:
```
  oc new-app -S nodejs
  oc new-app --image-stream=openshift/nodejs:20-ubi9-minimal --name pacman-nodejs https://github.com/Fernando0069/my-charts.git --context-dir=apps/do180-pacman-nodejs/app/src -l app=pacman-nodejs
  oc create route edge --service=pacman-nodejs     # crea ruta segura del tipo edge
  curl -vvv https://pacman-nodejs-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
  oc delete all -l app=pacman-nodejs
```

Los objetos que se crean son los siguientes:
```
  1.- Imagestream.
  2.- BuildConfig.
  3.- Deployment.
  4.- Service.
  5.- Route.
```
