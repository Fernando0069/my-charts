# DO180-ToDo-NodeJS charts

Para crear la aplicación "ToDo-NodeJS" del curso DO180 de Red Hat podemos hacerlo de dos maneras diferentes pero siempre manteniendo los mismos ficheros.

Punto 1 (helm):

Se crea la imagen con el BuildConfig con el Dockerfile y con todos los ficheros necesarios que serán montados en "/var/www/html/" a través del deployment.
Para crear la aplicación ToDo-NodeJS debemos ejecutar los siguiente comandos:
```
  1.- helm repo add apps https://fernando0069.github.io/my-charts/                                       # Creación del repositorio donde vamos a descargar la aplicación
  2.- helm install todo-nodejs apps/DO180-ToDo-NodeJS                                                    # Instalar la aplicación "DO180-ToDo-NodeJS" con el nombre "todo-nodejs".
  3.- curl -vvv https://todo-nodejs-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/          # Verificar la URL. 
```

Para eliminar la aplicación ToDo-NodeJS debemos ejecutar los siguiente comandos:
```
  1.- helm uninstall todo-nodejs                             # Desinstalar la aplicación con el nombre "todo-nodejs" ("DO180-ToDo-NodeJS").
  2.- helm repo remove apps                                  # Eliminación del repositorio de aplicaciones.
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
  oc new-app --name=todo-nodejs https://github.com/Fernando0069/my-charts.git --context-dir=charts/do180-todo-nodejs/files -l app=todo-nodejs
  oc patch deployment todo-nodejs --type='json' -p '[{"op": "replace", "path": "/spec/template/spec/containers/0/ports/0/containerPort", "value": 30080}]'
  oc patch service todo-nodejs --type='json' -p '[{"op": "replace", "path": "/spec/ports/0/targetPort", "value": 30080}]'
  oc create route edge todo-nodejs --service=todo-nodejs

  curl -vvv https://todo-nodejs-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
  oc delete all -l app=todo-nodejs
```

Usando imagestream con la versión del compilador:
```
  oc new-app -S nodejs
  oc new-app --image-stream=openshift/nodejs:20-ubi9 --name todo-nodejs https://github.com/Fernando0069/my-charts.git --context-dir=charts/do180-todo-nodejs/files -l app=todo-nodejs
  oc expose service/todo-nodejs
  curl -vvv https://todo-nodejs-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
  oc delete all -l app=todo-nodejs
```
