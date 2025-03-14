# DO180-Hangman-Game charts

![An image of the game](app/src/assets/images/hangman.png)

This is a simple hangman game with an old-school terminal theme. It was written in Javascript, without any libraries or APIs (not even jQuery). 
To play, just guess a letter by typing your guess on your keyboard. If you guess incorrectly 9 times, you lose. If you guess the word before that happens, you win. After you win or lose, you can restart the game by pressing any key on the keyboard

En la carpeta "app" está los archivos para la creación de la aplicacion mediante una imagen.
En la carpeta "helm" está los archivos para la creación de la aplicación mediante Helm.

Creamos de manera automática una imágen la cual lleva el contenido del directorio "src".

Como la aplicación es JavaScript puro (no Node.js), OpenShift no sabe cómo ejecutarla automáticamente porque "oc new-app" está diseñado para aplicaciones tipo servidor como Node.js, Python, Java, etc.

Dado que OpenShift espera un entorno para ejecutar código, pero JavaScript puro (HTML/CSS/JS) no necesita un servidor backend, se necesita una estrategia diferente.

Para crear la aplicación "hangman-game" del curso DO180 de Red Hat podemos hacerlo de dos maneras diferentes pero siempre con los mismos archivos.


## helm

Para crear la aplicación "DO180-Hangman-Game" debemos ejecutar los siguiente comandos:
```
  1.- helm repo add apps https://fernando0069.github.io/my-charts/                                         # Creación del repositorio donde vamos a descargar la aplicación.
  2.- helm install hangman-game apps/DO180-Hangman-Game                                                    # Instalar la aplicación "DO180-Hangman-Game" con el nombre "hangman-game".
  3.- curl -vvv https://hangman-game-fernando0069-dev.apps.rm2.thpm.p1.openshiftapps.com                   # Verificar la URL. 
```

Para eliminar la aplicación "DO180-Hangman-Game" debemos ejecutar los siguiente comandos:
```
  1.- helm uninstall hangman-game                           # Desinstalar la aplicación con el nombre "hangman-game" ("DO180-Hangman-Game").
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
  oc new-app --name=hangman-game httpd:2.4-ubi9~https://github.com/Fernando0069/my-charts.git --context-dir=apps/do180-hangman-game/app/src -l app=hangman-game
  oc create route edge --service=hangman-game     # crea ruta segura del tipo edge
  curl -vvv https://hangman-game-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
  oc delete all -l app=hangman-game
```

Los objetos que se crean son los siguientes:
```
  1.- Imagestream.
  2.- BuildConfig.
  3.- Deployment.
  4.- Service.
  5.- Route.
```
