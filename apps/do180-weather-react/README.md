### React Weather Application
**Find the current weather and 5 day forecast of any city on earth with this simple little web app**

##### [Live Demo](http://react-current-weather.herokuapp.com/) on Heroku

-------------

Simple [React](https://facebook.github.io/react/) web application written with jsx that returns the current weather. The app utilizes:
* [OpenWeatherMap's ](http://openweathermap.org/) API.
* [Webpack](https://webpack.github.io/) for bundling
* [React Router](https://github.com/reactjs/react-router)
* [Axios](https://github.com/mzabriskie/axios) for easy http requests
* [Express](https://expressjs.com/) for a simple server to run our application
* [Foundation](http://foundation.zurb.com/) for styling
* [Sass Loader](https://github.com/jtangelder/sass-loader) & [node-sass](https://github.com/sass/node-sass)

-------------

### HACKTOBERFEST!
**This project was featured during DigitalOcean's 2016 HACKTOBERFEST!** Thanks to everyone who contributed in both discussion and coding!

-------------

How to run the app locally:

1. Run ```npm install``` to install all needed dependencies.
2. Navigate to [OpenWeatherMap's ](http://openweathermap.org/) and get a free API key. Then, create a file named ```.env``` in the project root and add the following line: ```API_KEY=yourkeyhere```. This will give you access to API_KEY as a global variable anywhere in the client. It allows you to use your API Key while keeping it secret from everyone else.
3. Get a key to access the [Google Places API](https://developers.google.com/places/web-service/get-api-key).
  * Open `index.html` and replace this url on line 11:
  `https://maps.googleapis.com/maps/api/js?key=AIzaSyBvieYHDi4AvoL33XpHgCUrYr3tEfOz6kQ&libraries=places`
  with your own version of the link. Your API key should go after the `=` and before the `&`. See below:
  `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`
4. If you don't have webpack installed on your machine, run ```npm install webpack -g```.
5. Open up two command prompts. In one, run ```webpack -w```. This lets webpack watch for changes to your files. After any saved changes, webpack automatically runs and updates your ```bundle.js``` file.
6. In the other command prompt run ```npm start``` or ```node server.js```. These commands do the same thing: Starting your server to host the web app.
7. Navigate to ```localhost:3000``` to see the app in action






# DO180-Weather-React charts

En la carpeta "app" está los archivos para la creación de la aplicacion mediante una imagen.
En la carpeta "helm" está los archivos para la creación de la aplicación mediante Helm.

Creamos de manera automática una imágen la cual lleva el contenido del directorio "src".

                        Como la aplicación es JavaScript puro (no Node.js), OpenShift no sabe cómo ejecutarla automáticamente porque "oc new-app" está diseñado para aplicaciones tipo servidor como Node.js, Python, Java, etc.

                        Dado que OpenShift espera un entorno para ejecutar código, pero JavaScript puro (HTML/CSS/JS) no necesita un servidor backend, se necesita una estrategia diferente.

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
  oc create route edge --service=weather-react     # crea ruta segura del tipo edge
  curl -vvv https://weather-react-fernando0069-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/
  oc delete all -l app=weather-react
```

Usando imagestream con la versión del compilador:
```
  oc new-app -S httpd
  oc new-app --name=weather-react httpd~https://github.com/Fernando0069/my-charts.git --context-dir=apps/do180-weather-react/app/src -l app=weather-react
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
