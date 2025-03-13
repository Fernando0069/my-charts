# O!
O! is a minimalistic game and a demo game for [Cut.js](http://cutjs.org/) library. You can [play it online or download mobile apps](http://piqnt.com/o/).

## Developer

### Prerequisites
O! is a JavaScript game so familiarity with JavaScript is required. It is also recommended that you have git and bower installed.

### Getting started

Use git or the download button (on the right) to download the game source code. Dependencies are only [Cut.js](https://github.com/piqnt/cut.js) and [Extra.js](https://github.com/piqnt/extra.js) which are included.

Open `src/index.html` with your browser, the game should start, if not check errors with your browser debugging utility.

### Graphics/Textures
The game graphics are packed in `media/base.png` texture (sprite-sheet) and image cutouts (sprites) are defined in `textures.js`.

### Architecture
The game consists of two main layers: model and view. Model consists of game logics and objects. View consists of Cut.js components which compose and renders graphics. View layer communicate with model by refrenceing it and extending model's uiXXX methods.

### Publish
Cut.js apps are compatible with modern browsers, they can also be published for mobile devices using specific loaders, for example there are PhoneGap/Corova loader (for iOS, etc.) and FastCanvas loader for Android.

### License
Source codes, expect graphics and images, are available under the MIT license, but please do not use/reuse the game graphics and images.
In short you are encouraged to publish/distribute this game with or without modification to source code but with alternative graphics.
















# DO180-O charts

En la carpeta "app" está los archivos para la creación de la aplicacion mediante una imagen.
En la carpeta "helm" está los archivos para la creación de la aplicación mediante Helm.

Creamos de manera automática una imágen la cual lleva el contenido del directorio "src".

Como la aplicación es JavaScript puro (no Node.js), OpenShift no sabe cómo ejecutarla automáticamente porque "oc new-app" está diseñado para aplicaciones tipo servidor como Node.js, Python, Java, etc.

Dado que OpenShift espera un entorno para ejecutar código, pero JavaScript puro (HTML/CSS/JS) no necesita un servidor backend, se necesita una estrategia diferente.

Para crear la aplicación "o" del curso DO180 de Red Hat podemos hacerlo de dos maneras diferentes pero siempre con los mismos archivos.


## helm

Para crear la aplicación O debemos ejecutar los siguiente comandos:
```
  1.- helm repo add apps https://fernando0069.github.io/my-charts/                       # Creación del repositorio donde vamos a descargar la aplicación.
  2.- helm install o apps/DO180-O                                                        # Instalar la aplicación "DO180-O" con el nombre "o".
  3.- curl -vvv https://o-fernando0069-dev.apps.rm2.thpm.p1.openshiftapps.com            # Verificar la URL. 
```

Para eliminar la aplicación O debemos ejecutar los siguiente comandos:
```
  1.- helm uninstall o                                   # Desinstalar la aplicación con el nombre "o" ("DO180-O").
  2.- helm repo remove apps                              # Eliminación del repositorio de aplicaciones.
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
  oc new-app --name=o-game httpd~https://github.com/Fernando0069/my-charts.git --context-dir=apps/do180-o/app/src -l app=o-game
  oc create route edge --service=o-game     # crea ruta segura del tipo edge
  curl -vvv https://o-game-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
  oc delete all -l app=o-game
```

Los objetos que se crean son los siguientes:
```
  1.- Imagestream.
  2.- BuildConfig.
  3.- Deployment.
  4.- Service.
  5.- Route.
```
