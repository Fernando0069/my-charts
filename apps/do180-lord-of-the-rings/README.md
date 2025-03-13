# DO180-Lord-of-the-Rings charts

En la carpeta "app" está los archivos para la creación de la aplicacion mediante una imagen.
En la carpeta "helm" está los archivos para la creación de la aplicación mediante Helm.

Creamos de manera automática una imágen la cual lleva el contenido del directorio "src".

Como la aplicación es JavaScript puro (no Node.js), OpenShift no sabe cómo ejecutarla automáticamente porque "oc new-app" está diseñado para aplicaciones tipo servidor como Node.js, Python, Java, etc.

Dado que OpenShift espera un entorno para ejecutar código, pero JavaScript puro (HTML/CSS/JS) no necesita un servidor backend, se necesita una estrategia diferente.

Para crear la aplicación "lord-of-the-rings" del curso DO180 de Red Hat podemos hacerlo de dos maneras diferentes pero siempre con los mismos archivos.


## helm

Para crear la aplicación "Lord-of-the-Rings" debemos ejecutar los siguiente comandos:
```
  1.- helm repo add apps https://fernando0069.github.io/my-charts/                                         # Creación del repositorio donde vamos a descargar la aplicación.
  2.- helm install lord-of-the-rings apps/DO180-Lord-of-the-Rings                                          # Instalar la aplicación "DO180-Lord-of-the-Rings" con el nombre "lord-of-the-rings".
  3.- curl -vvv https://lord-of-the-rings-fernando0069-dev.apps.rm2.thpm.p1.openshiftapps.com              # Verificar la URL. 
```

Para eliminar la aplicación "Lord-of-the-Rings" debemos ejecutar los siguiente comandos:
```
  1.- helm uninstall lord-of-the-rings                      # Desinstalar la aplicación con el nombre "lord-of-the-rings" ("DO180-Lord-of-the-Rings").
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

Usando imagestream con la versión del compilador:
```
  oc new-app -S httpd
  oc new-app --name=lord-of-the-rings httpd~https://github.com/Fernando0069/my-charts.git --context-dir=apps/do180-lord-of-the-rings/app/src -l app=lord-of-the-rings
  oc create route edge --service=lord-of-the-rings     # crea ruta segura del tipo edge
  curl -vvv https://lord-of-the-rings-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
  oc delete all -l app=lord-of-the-rings
```

Los objetos que se crean son los siguientes:
```
  1.- Imagestream.
  2.- BuildConfig.
  3.- Deployment.
  4.- Service.
  5.- Route.
```
