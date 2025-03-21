# DO180-Pacman charts


## Install dependencies

```
npm install
```

## Getting started

```
npm run start
```

## Development

```
npm run dev
```

## Create Application Container Image

### Docker Container Image

The [Dockerfile](docker/Dockerfile) performs the following steps:

1. It is based on Node.js LTS Version 6 (Boron).
1. It then clones the Pac-Man game into the configured application directory.
1. Exposes port 8080 for the web server.
1. Starts the Node.js application using `npm start`.

To build the image run:

```
cd docker
docker build -t <registry>/<user>/pacman-nodejs-app .
```

You can test the image by running:

```
docker run -p 8000:8080 <registry>/<user>/pacman-nodejs-app
```

And going to `http://localhost:8000/` to see if you get the Pac-Man game.

Once you're satisfied you can push the image to the container registry.

```
docker push <registry>/<user>/pacman-nodejs-app
```

### Building using an s2i image

```
s2i build . centos/nodejs-6-centos7 pacman
```











# DO180-Pacman charts

En la carpeta "app" está los archivos para la creación de la aplicacion mediante una imagen.
En la carpeta "helm" está los archivos para la creación de la aplicación mediante Helm.

Creamos de manera automática una imágen la cual lleva el contenido del directorio "src".

Para crear la aplicación "pacman" del curso DO180 de Red Hat podemos hacerlo de dos maneras diferentes pero siempre con los mismos archivos.


## helm

Para crear la aplicación "DO180-Pacman" debemos ejecutar los siguiente comandos:
```
  1.- helm repo add apps https://fernando0069.github.io/my-charts/                                  # Creación del repositorio donde vamos a descargar la aplicación.
  2.- helm install pacman apps/DO180-Pacman                                                         # Instalar la aplicación "DO180-Pacman" con el nombre "pacman".
  3.- curl -vvv https://pacman-fernando0069-dev.apps.rm2.thpm.p1.openshiftapps.com                  # Verificar la URL. 
```

Para eliminar la aplicación "DO180-Pacman" debemos ejecutar los siguiente comandos:
```
  1.- helm uninstall pacman                          # Desinstalar la aplicación con el nombre "pacman" ("DO180-Pacman").
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
  oc new-app --name=pacman https://github.com/Fernando0069/my-charts.git --context-dir=apps/do180-pacman/app/src -l app=pacman
  oc create route edge --service=pacman     # crea ruta segura del tipo edge
  curl -vvv https://pacman-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
  oc delete all -l app=pacman
```

Usando imagestream con la versión del compilador:
```
  oc new-app -S nodejs
  oc new-app --image-stream=openshift/nodejs:20-ubi9-minimal --name pacman https://github.com/Fernando0069/my-charts.git --context-dir=apps/do180-pacman/app/src -l app=pacman
  oc create route edge --service=pacman     # crea ruta segura del tipo edge
  curl -vvv https://pacman-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
  oc delete all -l app=pacman
```

Los objetos que se crean son los siguientes:
```
  1.- Imagestream.
  2.- BuildConfig.
  3.- Deployment.
  4.- Service.
  5.- Route.
```


### Con DB





s2i build . openshift/nodejs-mongo-example pacman