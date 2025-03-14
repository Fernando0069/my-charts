# DO180-Weather-React charts

URL: https://github.com/bmorelli25/React-Weather-App

En la carpeta "app" está los archivos para la creación de la aplicacion mediante una imagen.
En la carpeta "helm" está los archivos para la creación de la aplicación mediante Helm.

Creamos de manera automática una imágen la cual lleva el contenido del directorio "src".

Para crear la aplicación "weather-react" del curso DO180 de Red Hat podemos hacerlo de dos maneras diferentes pero siempre con los mismos archivos.


## helm

Para crear la aplicación "DO180-Weather-React" debemos ejecutar los siguiente comandos:
```
  1.- helm repo add apps https://fernando0069.github.io/my-charts/                                         # Creación del repositorio donde vamos a descargar la aplicación.
  2.- helm install weather-react apps/DO180-Weather-React                                                  # Instalar la aplicación "DO180-Weather-React" con el nombre "weather-react".
  3.- curl -vvv https://weather-react-fernando0069-dev.apps.rm2.thpm.p1.openshiftapps.com                  # Verificar la URL. 
```

Para eliminar la aplicación "DO180-Weather-React" debemos ejecutar los siguiente comandos:
```
  1.- helm uninstall weather-react                          # Desinstalar la aplicación con el nombre "weather-react" ("DO180-Weather-React").
  2.- helm repo remove apps                                 # Eliminación del repositorio de aplicaciones.
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

Sin el uso de image o imagestream:
```
  oc new-app --name=weather-react https://github.com/Fernando0069/my-charts.git --context-dir=apps/do180-weather-react/app/src -l app=weather-react
  oc patch deployment weather-react --type='json' -p '[{"op": "replace", "path": "/spec/template/spec/containers/0/ports/0/containerPort", "value": 3000}]'
  oc patch service weather-react --type='json' -p '[{"op": "replace", "path": "/spec/ports/0/targetPort", "value": 3000}]'
  oc create route edge --service=weather-react     # crea ruta segura del tipo edge
  curl -vvv https://weather-react-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
  oc delete all -l app=weather-react
```

Usando imagestream con la versión del compilador:
```
  oc new-app -S nodejs
  oc new-app --image-stream=nodejs:20-ubi9-minimal --name=weather-react https://github.com/Fernando0069/my-charts.git --context-dir=apps/do180-weather-react/app/src -l app=weather-react
  oc patch deployment weather-react --type='json' -p '[{"op": "replace", "path": "/spec/template/spec/containers/0/ports/0/containerPort", "value": 3000}]'
  oc patch service weather-react --type='json' -p '[{"op": "replace", "path": "/spec/ports/0/targetPort", "value": 3000}]'
  oc create route edge --service=weather-react     # crea ruta segura del tipo edge
  curl -vvv https://weather-react-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
  oc delete all -l app=weather-react
```

Los objetos que se crean son los siguientes:
```
  1.- Imagestream.
  2.- BuildConfig.
  3.- Deployment.
  4.- Service.
  5.- Route.
```
