# MongoDB

El despliegue de la apliacación de MongoDB se va a realizar de manera "persistente" en los todos casos (helm y deployment).

vi mongodb-pvc.yaml
```
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mongodb-pvc
  namespace: fernando0069-dev
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
```
oc apply -f mongodb-pvc.yaml


## Helm

** Revisar si se quiere un servicio y una ruta  **

Para crear la base de datos MongoDB debemos ejecutar los siguiente comandos:
```
  1.- helm repo add apps https://fernando0069.github.io/my-charts/                                    # Creación del repositorio donde vamos a descargar la aplicación
  2.- helm install mongodb apps/MongoDB                                                               # Instalar la aplicación "MongoDB" con el nombre "alges-escapade".
  3.- curl -vvv https://alges-escapade-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/    # Verificar la URL. 
```

Para eliminar la base de datos MongoDB debemos ejecutar los siguiente comandos:
```
  1.- helm uninstall alges-escapade       # Desinstalar la aplicación con el nombre "alges-escapade" ("MongoDB").
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


## cli
Para crear la base de datos MongoDB debemos ejecutar los siguiente comandos:

vi deployment-mongodb.yaml
```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongodb
  namespace: fernando0069-dev
  labels:
    app: mongodb
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mongodb
  template:
    metadata:
      labels:
        app: mongodb
    spec:
      containers:
        - name: mongodb-enterprise-server
          image: mongodb/mongodb-enterprise-server:latest
          imagePullPolicy: Always
          ports:
            - name: mongodb
              protocol: TCP
              containerPort: 27017
          env:
            - name: MONGO_INITDB_ROOT_USERNAME
              value: "admin"
            - name: MONGO_INITDB_ROOT_PASSWORD
              value: "adminpassword"
            - name: MONGO_INITDB_DATABASE
              value: "miappdb"
          volumeMounts:
            - name: mongodb-storage
              mountPath: /data/db
      volumes:
        - name: mongodb-storage
          persistentVolumeClaim:
            claimName: mongodb-pvc
```
oc apply -f deployment-mongodb.yaml


vi poddisruptionbudget-mongodb.yaml
```
kind: PodDisruptionBudget
apiVersion: policy/v1
metadata:
  name: mongodb
  namespace: fernando0069-dev
  labels:
    app: mongodb
    app.kubernetes.io/component: mongodb
    enviroment: pro
    layer: tools
spec:
  minAvailable: 1
  selector:
    matchLabels:
      app: mongodb
```
oc apply -f poddisruptionbudget-mongodb.yaml


vi service-mongodb.yaml
```
apiVersion: v1
kind: Service
metadata:
  name: mongodb
  namespace: fernando0069-dev
  labels:
    app: mongodb
spec:
  selector:
    app: mongodb
  ports:
    - protocol: TCP
      port: 27017
      targetPort: 27017
```
oc apply -f service-mongodb.yaml


Los objetos que se crean son los siguientes:
```
  1.- PersistentVolumeClaim.
  2.- Deployment.
  3.- PodDisruptionBudget.
  4.- Service.
```


## Template

oc get templates -A | grep -i mongodb


Crear plantilla y se usa para desplegar la app:
    vi mitemplate.yml
    oc create -f mitemplate.yml
    oc get templates || oc get templates -n openshift
    oc new-app --name XXX --template=mongo-custom
    oc get pod 
    oc get dc
Ver parametros de la plantilla:
    oc process --parameters nodejs-mongo-persistent -n openshift
Exportar plantilla:
    oc get template mysql-persistent -n openshift -o yaml


[root@Pro-lanzadera ~]# oc get templates -A | grep -i mongodb
openshift   nodejs-mongodb-example                              An example Node.js application with a MongoDB database. For more information...    18 (4 blank)      8
[root@Pro-lanzadera ~]#

[root@Pro-lanzadera ~]# oc process --parameters nodejs-mongodb-example -n openshift
NAME                      DESCRIPTION                                                                                               GENERATOR           VALUE
NAME                      The name assigned to all of the frontend objects defined in this template.                                                    nodejs-mongodb-example
NAMESPACE                 The OpenShift Namespace where the ImageStream resides.                                                                        openshift
NODEJS_VERSION            Version of NodeJS image to be used (10, 12, or latest).                                                                       12
MONGODB_VERSION           Version of MongoDB image to be used (3.6 or latest).                                                                          3.6
MEMORY_LIMIT              Maximum amount of memory the Node.js container can use.                                                                       512Mi
MEMORY_MONGODB_LIMIT      Maximum amount of memory the MongoDB container can use.                                                                       512Mi
SOURCE_REPOSITORY_URL     The URL of the repository with your application source code.                                                                  https://github.com/sclorg/nodejs-ex.git
SOURCE_REPOSITORY_REF     Set this to a branch name, tag or other ref of your repository if you are not using the default branch.
CONTEXT_DIR               Set this to the relative path to your project if it is not in the root of your repository.
APPLICATION_DOMAIN        The exposed hostname that will route to the Node.js service, if left blank a value will be defaulted.
GITHUB_WEBHOOK_SECRET     Github trigger secret.  A difficult to guess string encoded as part of the webhook URL.  Not encrypted.   expression          [a-zA-Z0-9]{40}
GENERIC_WEBHOOK_SECRET    A secret string used to configure the Generic webhook.                                                    expression          [a-zA-Z0-9]{40}
DATABASE_SERVICE_NAME                                                                                                                                   mongodb
DATABASE_USER             Username for MongoDB user that will be used for accessing the database.                                   expression          user[A-Z0-9]{3}
DATABASE_PASSWORD         Password for the MongoDB user.                                                                            expression          [a-zA-Z0-9]{16}
DATABASE_NAME                                                                                                                                           sampledb
DATABASE_ADMIN_PASSWORD   Password for the database admin user.                                                                     expression          [a-zA-Z0-9]{16}
NPM_MIRROR                The custom NPM mirror URL
[root@Pro-lanzadera ~]#

connect to mongodb:
  mongodb://admin:adminpassword@mongodb:27017/miappdb
  oc rsh deploy/mongodb
  mongo -u admin -p adminpassword --authenticationDatabase admin
