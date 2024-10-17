# DO180-NodeJs-HelloWorld charts

Para crear la aplicación "nodejs-helloworld" del curso DO180 de Red Hat podemos hacerlo de tres maneras diferentes pero siempre manteniendo los mismos ficheros.

Punto 1:
  Creamos de manera automática una imágen la cual lleva todo el código (app.js y package.json), mediante la CLI de Openshift (oc):
```
Sin el uso de image o imagestream:
  oc new-app --name=nodejs-helloworld https://github.com/Fernando0069/my-charts.git --context-dir=charts/do180-nodejs-helloworld/files -l app=nodejs-helloworld
  oc expose service/nodejs-helloworld
  curl -vvv https://nodejs-helloworld-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/

Usando imagestream con la versión del compilador:
  oc new-app -S nodejs
  oc new-app --image-stream=openshift/nodejs:20-ubi9-minimal --name nodejs-helloworld https://github.com/Fernando0069/my-charts.git --context-dir=charts/do180-nodejs-helloworld/files -l app=nodejs-helloworld
  oc expose service/nodejs-helloworld
  curl -vvv https://nodejs-helloworld-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
```


Punto 2:
  Desplegampos con tecnología Helm, en la construccion de la imagen añadimos los ficheros "app.js" y "package.json" los cual se montan en "/opt/app-root/src".
```
  helm repo add apps https://fernando0069.github.io/my-charts/
  helm install do180-nodejs-helloworld apps/DO180-NodeJs-HelloWorld
  curl -vvv https://nodejs-helloworld-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
```