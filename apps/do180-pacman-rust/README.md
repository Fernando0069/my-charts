# Pacman

A simple Pacman clone made with ggez.

## Controls

- Arrow keys or WASD to move.

## Run the game

```
cargo run
```










# DO180-Pacman-Rust charts

En la carpeta "app" está los archivos para la creación de la aplicacion mediante una imagen.
En la carpeta "helm" está los archivos para la creación de la aplicación mediante Helm.

Para crear la aplicación "pacman-rust" del curso DO180 de Red Hat podemos hacerlo de dos maneras diferentes pero siempre con los mismos archivos.

## helm

Para crear la aplicación DO180-Pacman-Rust debemos ejecutar los siguiente comandos:
```
  1.- helm repo add apps https://fernando0069.github.io/my-charts/                                   # Creación del repositorio donde vamos a descargar la aplicación
  2.- helm install pacman-rust apps/DO180-Pacman-Rust                                                # Instalar la aplicación "DO180-Pacman-Rust" con el nombre "pacman-rust".
  3.- curl -vvv https://pacman-rust-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/      # Verificar la URL. 
```

Para eliminar la aplicación DO180-Pacman-Rust debemos ejecutar los siguiente comandos:
```
  1.- helm uninstall pacman-rust          # Desinstalar la aplicación con el nombre "pacman-rust" ("DO180-Pacman-Rust").
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

Creamos de manera automática una imágen la cual lleva el contenido del directorio "src".

Como la aplicación es JavaScript puro (no Node.js), OpenShift no sabe cómo ejecutarla automáticamente porque "oc new-app" está diseñado para aplicaciones tipo servidor como Node.js, Python, Java, etc.

Dado que OpenShift espera un entorno para ejecutar código, pero JavaScript puro (HTML/CSS/JS) no necesita un servidor backend, se necesita una estrategia diferente.

Usando imagestream con la versión del compilador:
```
  oc new-app --name=pacman-rust httpd~https://github.com/Fernando0069/my-charts.git --context-dir=apps/do180-pacman-rust/app/src -l app=pacman-rust
  oc create route edge --service=pacman-rust     # crea ruta segura del tipo edge
  curl -vvv https://pacman-rust-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
  oc delete all -l app=pacman-rust
```

Los objetos que se crean son los siguientes:
```
  1.- Imagestream.
  2.- BuildConfig.
  3.- Deployment.
  4.- Service.
  5.- Route.
```





docker.io/library/rust





Usando imagestream con la versión del compilador:
```
  oc new-app -S rust
  oc new-app --image-stream=rust:latest --name=pacman-rust httpd~https://github.com/Fernando0069/my-charts.git --context-dir=apps/do180-pacman-rust/app/src -l app=pacman-rust



    oc new-app --image=docker.io/library/rust --name=pacman-rust httpd~https://github.com/Fernando0069/my-charts.git --context-dir=apps/do180-pacman-rust/app/src -l app=pacman-rust



  oc new-app docker.io/library/rust:latest~httpd~https://github.com/Fernando0069/my-charts.git --context-dir=apps/do180-pacman-rust/app/src -l app=pacman-rust



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











oc new-build --name=pacman-rust https://github.com/Fernando0069/my-charts.git --context-dir=apps/do180-pacman-rust/app/ --strategy=docker
  oc new-build --name=pacman-rust https://github.com/Fernando0069/my-charts.git --context-dir=apps/do180-pacman-rust/app/ --strategy=docker --binary
oc start-build pacman-rust --from-dir=. --follow

