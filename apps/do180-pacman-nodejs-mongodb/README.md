# DO180-Pacman-NodeJS-MongoDB charts

En la carpeta "app" está los archivos para la creación de la aplicacion mediante una imagen.
En la carpeta "helm" está los archivos para la creación de la aplicación mediante Helm.

Creamos de manera automática una imágen la cual lleva el contenido del directorio "src".

Para crear la aplicación "pacman-nodejs-mongodb" del curso DO180 de Red Hat podemos hacerlo de dos maneras diferentes pero siempre con los mismos archivos.

## helm

Para crear la aplicación "DO180-Pacman-NodeJS-MongoDB" debemos ejecutar los siguiente comandos:
```
  1.- helm repo add apps https://fernando0069.github.io/my-charts/                                         # Creación del repositorio donde vamos a descargar la aplicación.
  2.- helm install pacman-nodejs-mongodb apps/DO180-Pacman-NodeJS-MongoDB                                  # Instalar la aplicación "DO180-Pacman-NodeJS-MongoDB" con el nombre "pacman-nodejs-mongodb".
  3.- curl -vvv https://pacman-nodejs-mongodb-fernando0069-dev.apps.rm2.thpm.p1.openshiftapps.com          # Verificar la URL. 
```

Para eliminar la aplicación "DO180-Pacman-NodeJS-MongoDB" debemos ejecutar los siguiente comandos:
```
  1.- helm uninstall pacman-nodejs-mongodb           # Desinstalar la aplicación con el nombre "pacman-nodejs-mongodb" ("DO180-Pacman-NodeJS-MongoDB").
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

Sin el uso de image o imagestream:
```
  vi mongodb-pvc.yaml
    apiVersion: v1
    kind: PersistentVolumeClaim
    metadata:
      name: mongodb-pvc
      namespace: fernando0069-dev
      labels:
        app: pacman-nodejs-mongodb
    spec:
      accessModes:
        - ReadWriteOnce
      volumeMode: Filesystem
      resources:
        requests:
          storage: 1Gi
  oc apply -f mongodb-pvc.yaml
  oc new-app mongodb/mongodb-enterprise-server --name=pacman-mongodb -e MONGODB_INITDB_ROOT_USERNAME=pacman-db -e MONGODB_INITDB_ROOT_PASSWORD=P4cM4n-DB -l app=pacman-nodejs-mongodb
  oc set volume deployment/pacman-mongodb --remove --name=pacman-mongodb-volume-2
  oc set volume deployment/pacman-mongodb --add --name=pacman-mongodb-volume-2 --claim-name=mongodb-pvc --mount-path=/data/db
  vi secret-nodejs.yaml
    kind: Secret
    apiVersion: v1
    metadata:
      name: conect
      namespace: fernando0069-dev
      labels:
        app: pacman-nodejs-mongodb
    data:
      MONGO_SERVICE_HOST=cGFjbWFuLW1vbmdvZGI=
      MONGO_DATABASE=cGFjbWFuLWRi
      MONGO_AUTH_USER=cGFjbWFuLWRi
      MONGO_AUTH_PWD=UDRjTTRuLURC
      MONGO_PORT=MjcwMTc=
    type: Opaque
  oc apply -f secret-nodejs.yaml
  oc new-app --name=pacman-nodejs https://github.com/Fernando0069/my-charts.git --context-dir=apps/do180-pacman-nodejs-mongodb/app/src -l app=pacman-nodejs-mongodb
  oc set env deployment/pacman-nodejs --from=secret/conect
  oc create route edge pacman-nodejs-mongodb --service=pacman-nodejs
  curl -vvv https://pacman-nodejs-mongodb-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
  oc delete all -l app=pacman-nodejs-mongodb
```


  
  
  

Usando imagestream con la versión del compilador:
```
  oc new-app -S nodejs
  oc new-app --image-stream=openshift/nodejs:20-ubi9-minimal --name pacman-nodejs-mongodb https://github.com/Fernando0069/my-charts.git --context-dir=apps/do180-pacman-nodejs-mongodb/app/src -l app=pacman-nodejs-mongodb
  oc create route edge --service=pacman-nodejs-mongodb     # crea ruta segura del tipo edge
  curl -vvv https://pacman-nodejs-mongodb-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
  oc delete all -l app=pacman-nodejs-mongodb
```

Los objetos que se crean son los siguientes:
```
  1.- Imagestream.
  2.- BuildConfig.
  3.- Deployment.
  4.- Service.
  5.- Route.
```
