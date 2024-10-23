# my-charts
my-charts

Se ha creado un repositorio con todas las aplicaciones preparadas para instalar y se usadas

# Repository
## Add the Repository "apps" to Helm:
```
helm repo add apps https://fernando0069.github.io/my-charts/
```

## Remove the Repository "apps" to Helm:
```
helm repo remove apps
```



# Tools
## Install Web Application:
```
helm install web apps/Web
```

## Install CyberChef Application:
```
helm install cyberchef apps/CyberChef
```

## Install ReverseShellGenerator Application:
```
helm install reverseshellgenerator apps/ReverseShellGenerator
```



# Training
## DO180 Applications
### Install DO180-NodeJS-HelloWorld Application:
```
helm install do180-nodejs-helloworld apps/DO180-NodeJS-HelloWorld
```

### Install DO180-NodeJS-App Application:
```
helm install do180-nodejs-app apps/DO180-NodeJS-App
```

### Install DO180-PHP-HelloWorld Application:
```
helm install do180-php-helloworld apps/DO180-PHP-HelloWorld
```

### Install DO180-PHP-Temperature Application:
```
helm install do180-php-temperature apps/DO180-PHP-Temperature
```



## DO280 Applications
### Install DO280-XXX-XXX Application:
```
helm install do280-XXX-XXX apps/DO280-XXX-XXX
```

## DO285 Applications
### Install DO285-XXX-XXX Application:
```
helm install do285-XXX-XXX apps/DO285-XXX-XXX
```

## Extra Applications
### Install XXX-XXX Application:
```
helm install XXX-XXX apps/DO180-XXX-XXX
```



## Working
### Install DO180-ToDo-HTML5 Application:
```
helm install do180-todo-html5 apps/DO180-ToDo-HTML5
```
### Install DO180-ToDo-NodeJS Application:
```
helm install do180-todo-nodejs apps/DO180-ToDo-NodeJS
```
### Install DO180-ToDo-NodeJS-API Application:
```
helm install do180-todo-nodejs-api apps/DO180-ToDo-NodeJS-API
```

### Install DT-100 Application:
```
helm install dt100 apps/DT-100
```



# Sample Applications
### Install Application 1:
```
helm install app1 apps/app1
```
### Install Application 2:
```
helm install app2 apps/app2
```