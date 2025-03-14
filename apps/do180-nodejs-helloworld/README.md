# DO180-NodeJS-HelloWorld charts

En la carpeta "app" está los archivos para la creación de la aplicacion mediante una imagen.
En la carpeta "helm" está los archivos para la creación de la aplicación mediante Helm.

Para crear la aplicación "nodejs-helloworld" del curso DO180 de Red Hat podemos hacerlo de dos maneras diferentes pero siempre manteniendo los mismos ficheros.

Punto 1 (helm):

Desplegampos con tecnología Helm, en la construccion de la imagen añadimos los ficheros "app.js" y "package.json" los cual se montan en "/opt/app-root/src".
Para crear la aplicación DO180-NodeJS-HelloWorld debemos ejecutar los siguiente comandos:
```
  1.- helm repo add apps https://fernando0069.github.io/my-charts/                                             # Creación del repositorio donde vamos a descargar la aplicación
  2.- helm install nodejs-helloworld apps/DO180-NodeJS-HelloWorld                                              # Instalar la aplicación "DO180-NodeJS-HelloWorld" con el nombre "nodejs-helloworld".
  3.- curl -vvv https://nodejs-helloworld-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/          # Verificar la URL.
```

Para eliminar la aplicación DO180-NodeJS-HelloWorld debemos ejecutar los siguiente comandos:
```
  1.- helm uninstall nodejs-helloworld    # Desinstalar la aplicación con el nombre "nodejs-helloworld" ("DO180-NodeJS-HelloWorld").
  2.- helm repo remove apps               # Eliminación del repositorio de aplicaciones.
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

Creamos de manera automática una imágen la cual lleva todo el código (app.js y package.json), mediante la CLI de Openshift (oc):

Sin usar image o imagestream:
```
  oc new-app --name=nodejs-helloworld https://github.com/Fernando0069/my-charts.git --context-dir=apps/do180-nodejs-helloworld/app/src -l app=nodejs-helloworld
  oc expose service/nodejs-helloworld
  curl -vvv https://nodejs-helloworld-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
  oc delete all -l app=nodejs-helloworld
```

Usando imagestream con la versión del compilador:
```
  oc new-app -S nodejs
  oc new-app --image-stream=openshift/nodejs:20-ubi9-minimal --name nodejs-helloworld https://github.com/Fernando0069/my-charts.git --context-dir=apps/do180-nodejs-helloworld/app/src -l app=nodejs-helloworld
  oc expose service/nodejs-helloworld
  curl -vvv https://nodejs-helloworld-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
  oc delete all -l app=nodejs-helloworld
```
  
Los objetos que se crean son los siguientes:
```
  1.- Imagestream.
  2.- BuildConfig.
  3.- Deployment.
  4.- Service.
  5.- Route.
```
