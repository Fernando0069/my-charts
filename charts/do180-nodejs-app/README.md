# DO180-NodeJS-App charts

Para crear la aplicación "nodejs-app" del curso DO180 de Red Hat podemos hacerlo de dos maneras diferentes pero siempre manteniendo los mismos ficheros.

Punto 1 (helm):

Desplegampos con tecnología Helm, Se contruye la imagen y en ella añadimos los ficheros "app.js" y "package.json" los cual se montan en "/opt/app-root/src/" a través del deployment. Para crear la aplicación NodeJS-App debemos ejecutar los siguiente comandos:
```
  1.- helm repo add apps https://fernando0069.github.io/my-charts/
  2.- helm install nodejs-app apps/DO180-NodeJS-App
  3.- curl -vvv https://nodejs-app-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
```

Para eliminar la aplicación NodeJS-App debemos ejecutar los siguiente comandos:
```
  1.- helm uninstall nodejs-app                                   # Desinstalar la aplicación con el nombre "nodejs-app" ("DO180-NodeJS-App").
  2.- helm repo remove apps                                            # Eliminación del repositorio de aplicaciones.
```

Punto 2 (cli):

Creamos de manera automática una imágen la cual lleva todo el código (app.js y package.json), mediante la CLI de Openshift (oc):
```
Sin el uso de image o imagestream:
  oc new-app --name=nodejs-app https://github.com/Fernando0069/my-charts.git --context-dir=charts/do180-nodejs-app/files -l app=nodejs-app
  oc expose service/nodejs-app
  oc create route edge nodejs-app --service=nodejs-app    # crea ruta segura del tipo edge
      oc expose service nodejs-app
  curl -vvv https://nodejs-app-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
  oc delete all -l app=nodejs-app

Usando imagestream con la versión del compilador:
  oc new-app -S nodejs
  oc new-app --image-stream=openshift/nodejs:18-ubi9-minimal --name nodejs-app https://github.com/Fernando0069/my-charts.git --context-dir=charts/do180-nodejs-app/files -l app=nodejs-app
  oc expose service/nodejs-app
  oc create route edge nodejs-app --service=nodejs-app    # crea ruta segura del tipo edge
      oc expose service nodejs-app
  curl -vvv https://nodejs-app-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
  oc delete all -l app=nodejs-app
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
