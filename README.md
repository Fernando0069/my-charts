# my-charts
my-charts

## Installing Charts from this Repository
### Add the Repository "apps" to Helm:
```
helm repo add apps https://fernando0069.github.io/my-charts/
```

### Install Web Application:
```
helm install web apps/Web
```

### Install CyberChef Application:
```
helm install cyberchef apps/CyberChef
```

### Install ReverseShellGenerator Application:
```
helm install reverseshellgenerator apps/ReverseShellGenerator
```

### Install Application 1:
```
helm install app1 apps/app1
```

### Install Application 2:
```
helm install app2 apps/app2
```

### Remove the Repository "apps" to Helm:
```
helm repo remove apps
```
